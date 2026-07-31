# Fase 3: Recuperar sistema de deploy (Docker + docker-compose + entrypoint)

## Objetivo
Restaurar los archivos de deploy que se perdieron durante las fases SEO-SSG: Dockerfile, docker-compose.yml completo (con PostgreSQL, web y nginx), entrypoint.sh, y DEPLOY.md. Todo adaptado al frontend unificado `magna-page/unified/`.

## Archivos a modificar/crear

| Archivo | Acción |
|---|---|
| `Dockerfile` | Recuperar desde `deploy/julio-2026`, adaptar a unified |
| `docker-compose.yml` | Reescribir con PostgreSQL + web + nginx |
| `entrypoint.sh` | Recuperar desde `deploy/julio-2026` (con `collectstatic`) |
| `DEPLOY.md` | Recuperar y actualizar |
| `.dockerignore` | Verificar que existe y excluye `node_modules`, `.git`, etc. |
| `magna_web/settings/prod.py` | Asegurar que usa variables de entorno para DB (PostgreSQL) |

## Skills requeridas (cargar antes de empezar)

1. **`django-expert`** — Para entrypoint y settings de producción
2. **`django-security`** — Para config segura en Docker
3. **`bash-defensive-patterns`** — Para entrypoint.sh robusto

## Referencias

- **AGENTS.md**: §Deploy, §Key Gotchas, §Credenciales Docker Hub, §Deployment rápido
- Rama de referencia: `deploy/julio-2026` — Dockerfile, docker-compose.yml, entrypoint.sh, DEPLOY.md
- `infrastructure/docker-compose.prod.yml` — compose de producción real en AWS
- **DESIGN.md**: No aplica (infraestructura)

## Instrucciones detalladas

### 1. Recuperar `Dockerfile`

Desde `deploy/julio-2026:Dockerfile`. Cambios necesarios:
- El `collectstatic` ya funciona con `STATICFILES_DIRS` apuntando a `unified/dist`
- La línea `COPY . .` copia todo el proyecto (incluye `magna-page/unified/dist/` que debe existir antes del build)
- **Importante**: el build de Docker ahora requiere que el frontend ya esté compilado. El flujo es:
  1. `cd magna-page/unified && npm run build`
  2. `docker build -t mquiroga2807/magna-web:latest .`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN python manage.py collectstatic --no-input

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "magna_web.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
```

### 2. Reescribir `docker-compose.yml`

Debe incluir:
- Servicio `db`: PostgreSQL 16-alpine con volumen persistente
- Servicio `web`: build del Dockerfile, con variables de entorno para PostgreSQL, `DJANGO_SETTINGS_MODULE=magna_web.settings.prod`, `DJANGO_ENV=production`
- Servicio `nginx`: solo con profile `production`, con SSL y reverse proxy
- Volúmenes: `postgres_data`, `static_volume`, `media_volume`

```yaml
services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=magna
      - POSTGRES_USER=magna
      - POSTGRES_PASSWORD=magna_secret
    restart: unless-stopped

  web:
    build: .
    image: mquiroga2807/magna-web:latest
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    env_file:
      - .env
    environment:
      - DJANGO_SETTINGS_MODULE=magna_web.settings.prod
      - DJANGO_ENV=production
      - DB_ENGINE=django.db.backends.postgresql
      - DB_NAME=magna
      - DB_USER=magna
      - DB_PASSWORD=magna_secret
      - DB_HOST=db
      - DB_PORT=5432
    ports:
      - "8000:8000"
    depends_on:
      - db
    restart: unless-stopped

  nginx:
    build:
      context: ./nginx
    profiles:
      - production
    # ...
```

### 3. Recuperar `entrypoint.sh`

```bash
#!/bin/bash
set -e

python manage.py migrate --no-input
python manage.py collectstatic --no-input

exec "$@"
```

### 4. Actualizar `DEPLOY.md`

Basado en el original de `deploy/julio-2026:DEPLOY.md`, con los pasos actualizados:
- Build del frontend unified
- Build de Docker
- Push a Docker Hub
- SSH al servidor y actualizar

### 5. Probar build Docker local

```powershell
cd magna-page/unified; npm run build; cd ../..
docker build -t magna-web-test .
docker compose up
# Probar http://localhost:8000
```

## Criterios de éxito

- [ ] `Dockerfile` existe y compila sin errores
- [ ] `docker-compose.yml` levanta PostgreSQL + web
- [ ] `entrypoint.sh` ejecuta migrate + collectstatic
- [ ] La web responde en `localhost:8000` dentro del contenedor
- [ ] `DEPLOY.md` tiene los pasos actualizados para unified
- [ ] `DJANGO_ENV=production` funciona dentro del contenedor

## Documentación de resultados

Al finalizar, crear `docs/seo-v2/resultados/fase-03-recuperar-deploy.md` con:
- Archivos restaurados y modificados
- Tamaño de la imagen Docker (antes vs después)
- Tiempo de build
- Tests de integración (Django tests)
- Tiempo total
