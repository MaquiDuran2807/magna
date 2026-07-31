# Fase 7: Validación final — Build, dev y producción

## Objetivo
Validar que todo el sistema funciona correctamente en los tres modos de operación: desarrollo frontend (Vite dev server), desarrollo backend (Django + build), y producción (Docker). Ejecutar tests automatizados, verificar rendimiento y documentar resultados finales.

## Modos a validar

| Modo | Comando | API apunta a |
|---|---|---|
| Dev frontend | `npm run dev` (puerto 5174) | `http://localhost:8000` vía `.env.development` |
| Dev Django + build | `python manage.py runserver` (puerto 8000) | `window.location.origin` |
| Producción | `docker compose up` + nginx | Mismo origen |

## Skills requeridas

1. **`python-testing-patterns`** — Para ejecutar y mejorar tests
2. **`django-expert`** — Para validar backend
3. **`frontend-design`** — Para validar frontend
4. **`seo`** — Para validar meta tags y sitemap

## Instrucciones detalladas

### 1. Validar modo Dev Frontend

```bash
# Terminal 1: Backend
python manage.py runserver

# Terminal 2: Frontend
cd magna-page/unified && npm run dev

# Verificar:
# - Abrir http://localhost:5174
# - La página carga con datos de la API (localhost:8000)
# - Navegación SPA funciona (rutas, links)
# - Helmet actualiza meta tags en cada ruta
# - Sitemap.xml funciona
```

### 2. Validar modo Dev Django + Build

```bash
# Build frontend
cd magna-page/unified && npm run build

# Iniciar Django (modo dev)
$env:DJANGO_ENV="development"
python manage.py runserver

# Verificar:
# - Abrir http://localhost:8000
# - Sirve el SPA desde unified/dist/
# - API calls funcionan (mismo origen)
# - Navegación SPA funciona
# - Meta tags Django se renderizan
# - Helmet reemplaza meta tags en navegación
```

### 3. Validar modo Producción

```bash
# Build frontend
cd magna-page/unified && npm run build

# Build Docker
docker build -t magna-prod-test .

# Iniciar compose
docker compose up -d

# Verificar:
# - Abrir http://localhost:8080 (nginx)
# - Sirve el SPA correctamente
# - PostgreSQL conectado
# - Static files servidos con cache headers
# - DEBUG=False
```

### 4. Ejecutar tests automatizados

```bash
# Tests Django
python manage.py test

# Tests de humo
curl -I http://localhost:8000/  # Debe responder 200
curl http://localhost:8000/sitemap.xml  # Debe devolver XML
curl -I http://localhost:8000/servicios/servicios-and-subservicios/  # API debe responder
```

### 5. Validar SEO

```bash
# Verificar meta tags en HTML inicial
curl http://localhost:8000/ | grep -E '<title|<meta name="description"'

# Verificar sitemap
curl http://localhost:8000/sitemap.xml

# Verificar robots.txt
curl http://localhost:8000/robots.txt

# Verificar que data-rh="true" está presente
curl http://localhost:8000/ | grep 'data-rh="true"'
```

### 6. Verificar performance

```bash
# Tamaño del build
du -sh magna-page/unified/dist/

# Tiempo de carga inicial (usando curl -w)
curl -w "%{time_total}\n" -o /dev/null http://localhost:8000/
```

## Criterios de éxito

- [ ] Modo dev frontend: funciona con hot reload, API calls a localhost:8000
- [ ] Modo dev Django: sirve SPA compilado, API calls funcionan
- [ ] Modo producción: Docker compose levanta sin errores
- [ ] `python manage.py test` — todos los tests pasan (mínimo 56 tests)
- [ ] `data-rh="true"` presente en HTML inicial
- [ ] Sitemap.xml devuelve XML válido
- [ ] Robots.txt accesible
- [ ] No hay errores 500 en ninguna ruta
- [ ] Frontend compila sin errores de TypeScript
- [ ] `npm run lint` sin warnings

## Documentación de resultados

Al finalizar, crear `docs/seo-v2/resultados/fase-07-validacion-final.md` con:
- Resultados de cada modo de validación
- Tests pasados/fallidos
- Tiempos de respuesta
- Tamaño del build
- Problemas encontrados y soluciones
- Conclusión general del proyecto
