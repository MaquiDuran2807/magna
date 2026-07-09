# Plan de Actualización — Magna Ingeniería y Topografía

> Proyecto: Django + React (Vite) · Creado: 2023-2024 · Revisión: Junio 2026

---

## Índice

1. [Resumen del Proyecto](#1-resumen-del-proyecto)
2. [Diagnóstico Actual](#2-diagnóstico-actual)
3. [Análisis Lighthouse (Performance)](#3-análisis-lighthouse-performance)
4. [Orden de Ejecución Priorizado](#4-orden-de-ejecución-priorizado)
5. [✅ Fase 1 — Bugs Críticos (Completado)](#5-fase-1--bugs-críticos-completado)
6. [🚀 Fase 7 — Dockerizar y Desplegar (P0)](#6-fase-7--dockerizar-y-desplegar-p0)
7. [🗄️ Fase 6 — Migración a PostgreSQL (P1)](#7-fase-6--migración-a-postgresql-p1)
8. [⚡ Quick-Wins de Rendimiento (P2)](#8-quick-wins-de-rendimiento-p2)
9. [🔧 Fase 2 — Actualización Backend Django 5.2 (P3)](#9-fase-2--actualización-backend-django-52-p3)
10. [🎨 Fase 3 + 4 — Frontends (P4)](#10-fase-3--4--frontends-p4)
11. [🔗 Fase 5 — Unificación de Frontends (P5)](#11-fase-5--unificación-de-frontends-p5)
12. [🚀 Fase 8 — Rendimiento Profundo (P6)](#12-fase-8--rendimiento-profundo-p6)
13. [Resumen de Tiempos e Impactos](#13-resumen-de-tiempos-e-impactos)
14. [📅 Plan de Ejecución Medio Tiempo (4h/día) con Entregas Progresivas](#14-plan-de-ejecución-medio-tiempo-4hdía-con-entregas-progresivas)

---

## 1. Resumen del Proyecto

**Stack actual (2023-2024):**

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Python 3.11 + Django 5.0 + DRF 3.14 | 2023 |
| Frontend (page) | React 18 + TypeScript 5.0 + Vite 4 | 2023 |
| Frontend (store) | React 18 + TypeScript 4.9 + Vite 4 | 2023 |
| Base de datos | SQLite3 | — |
| Proxy/Servidor | nginx + gunicorn + Let's Encrypt | — |
| Auth | JWT (simplejwt) + djoser + social-auth | — |

**Stack objetivo (2026):**

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Python 3.11 / 3.12 + Django 5.2 LTS + DRF 3.17 | 2026 |
| Frontend (unificado) | React 18 + TypeScript 5.5+ + Vite 5 | 2026 |
| Base de datos | PostgreSQL 16 | 2026 |
| Contenedores | Docker + docker-compose | — |
| Proxy | nginx (contenedorizado) + Let's Encrypt | — |

---

## 2. Diagnóstico Actual

### Problemas críticos (bloqueantes)

| # | Problema | Archivo | Riesgo |
|---|----------|---------|--------|
| C1 | `cors==1.0.1` es un paquete erróneo | `requirements.txt:10` | La app no arranca o comportamiento impredecible |
| C2 | SECRET_KEY hardcodeada en el repo | `settings.py:28` | **Seguridad**: cualquiera con acceso al repo puede firmar tokens JWT |
| C3 | Email backend en console | `settings.py:206` | No se envían correos (registro, reset pass, etc.) |
| C4 | Falta `@tanstack/react-query` como dependencia directa en page | `page/package.json` | Se rompe si se actualiza devtools (dependencia transitiva frágil) |
| C5 | `get_object()` duplicado en user/views.py | `user/views.py:17-25` | Dead code que puede causar confusión |

### Problemas de mantenibilidad

| # | Problema | Detalle |
|---|----------|---------|
| M1 | Build artifacts en el repo | `page/dist/` y `store/dist/` commiteados — inflan el repo |
| M2 | `virtualenv`, `virtualenv-clone` en requirements | Herramientas de desarrollo, no dependencias de producción |
| M3 | `defusedxml==0.8.0rc2` | Release candidate, no versión estable |
| M4 | `gunicorn.conf` mal nombrado | En realidad es configuración de nginx |
| M5 | Múltiples SQLite duplicados | `db.4sqlite3`, `db1.sqlite3`, `db2.sqlite3`, `db3.sqlite3` |
| M6 | Dos frontends separados | Dependencias duplicadas (axios, bootstrap, react-router, etc.) |

### Dependencias backend desactualizadas

| Paquete | Actual | Destino | Breaking? | Prioridad |
|---------|--------|---------|-----------|-----------|
| Django | 5.0 | **5.2 LTS** | Bajo | Alta |
| djangorestframework | 3.14.0 | **3.17.1** | Bajo | Alta |
| djangorestframework-simplejwt | 5.3.1 | **5.5.1** | Bajo | Alta |
| djoser | 2.2.2 | **2.3.3** | Medio | Alta |
| Django CORS Headers | 4.3.1 | **4.6.0** | Bajo | Alta |
| django-environ | 0.11.2 | **0.12.0** | Bajo | Alta |
| social-auth-app-django | 5.4.0 | **5.4.3** | Bajo | Media |
| social-auth-core | 4.5.1 | **4.5.4** | Bajo | Media |
| cryptography | 41.0.7 | **44.0.x** | **Alto** | **Crítica** |
| Pillow | 10.1.0 | **11.1.0** | Medio | Alta |
| requests | 2.31.0 | **2.32.3** | Bajo | Alta |
| urllib3 | 2.1.0 | **2.3.0** | Bajo | Alta |
| certifi | 2023.11.17 | **2025.x** | Bajo | Alta |
| sqlparse | 0.4.4 | **0.5.3** | Bajo | Media |
| PyJWT | 2.8.0 | **2.10.1** | Bajo | Media |
| whitenoise | 6.6.0 | **6.9.0** | Bajo | Media |
| gunicorn | 22.0.0 | **23.0.0** | Bajo | Media |
| gevent | 23.9.1 | **24.11.x** | Bajo | Media |
| psycopg2-binary | 2.9.9 | **2.9.10** | Bajo | Media |
| protobuf | 3.20.3 | **28.x** | **Alto** | Baja (no se usa activamente) |
| numpy | 1.26.1 | **2.2.x** | **Alto** | Baja (no se usa activamente) |

### Dependencias frontend page desactualizadas

| Paquete | Actual | Destino | Breaking? |
|---------|--------|---------|-----------|
| vite | 4.3.9 | **5.4.x** | Medio |
| @vitejs/plugin-react | 4.0.0 | **4.3.x** | Bajo |
| typescript | 5.0.2 | **5.5.x** | Medio |
| eslint | 8.56.0 | **9.x** | **Alto** (flat config) |
| @typescript-eslint/* | v5 | **v8.x** | **Alto** |
| framer-motion | 10.16.16 | **11.x** | **Alto** |
| react-pdf | 7.7.1 | **9.x** | **Alto** |
| @react-pdf/renderer | 3.4.4 | **4.x** | **Alto** |
| lottie-react | 2.4.0 | **3.x** | **Alto** |
| react-toastify | 10.0.4 | **11.x** | Medio |
| react-icons | 4.12.0 | **5.x** | Medio |
| react-router-dom | 6.21.3 | **6.28.x** | Bajo |
| swiper | 11.0.5 | **11.2.x** | Bajo |
| axios | 1.6.2 | **1.7.x** | Bajo |
| bootstrap | 5.3.2 | **5.3.3** | Bajo |
| react-bootstrap | 2.10.0 | **2.10.x** | Bajo |
| formik | 2.4.5 | **2.4.x** | Bajo |
| yup | 1.3.3 | **1.6.x** | Bajo |
| dompurify | 3.0.8 | **3.2.x** | Bajo |
| leaflet + react-leaflet | 1.9.4 + 4.2.1 | Sin cambios | — |
| pdfjs-dist | 4.1.392 | **4.10.x** | Medio |

### Dependencias frontend store desactualizadas

| Paquete | Actual | Destino | Breaking? |
|---------|--------|---------|-----------|
| vite | 4.0.0 | **5.4.x** | Medio |
| @vitejs/plugin-react | 3.0.0 | **4.3.x** | Medio |
| typescript | 4.9.3 | **5.5.x** | **Alto** |
| @tanstack/react-query | 4.26.1 | **5.62.x** | **Muy alto** |
| react-toastify | 9.1.1 | **11.x** | **Alto** |
| @paypal/react-paypal-js | 7.8.2 | **8.x** | **Alto** |
| react-helmet-async | 1.3.0 | **2.x** | Medio |
| react-router-dom | 6.6.1 | **6.28.x** | Bajo |
| axios | 1.6.7 | **1.7.x** | Bajo |
| bootstrap | 5.2.3 | **5.3.3** | Bajo |
| react-bootstrap | 2.7.0 | **2.10.x** | Bajo |
| react-icons | 5.1.0 | **5.4.x** | Bajo |
| swiper | 11.1.0 | **11.2.x** | Bajo |

---

## 3. Análisis Lighthouse (Performance)

**Score general: 56/100** (medido en local)

| Métrica | Valor | Score |
|---------|-------|-------|
| LCP (Largest Contentful Paint) | **16.2s** | 0/100 |
| FCP (First Contentful Paint) | **3.8s** | 2/100 |
| TTI (Time to Interactive) | **16.3s** | 0/100 |
| TBT (Total Blocking Time) | **2.9s** | 3/100 |
| CLS (Cumulative Layout Shift) | 0.06 | 96/100 |
| Peso total de recursos | **18.4 MB** | — |

### Causas raíz identificadas

| # | Problema | Detalle | Impacto |
|---|----------|---------|---------|
| L1 | **react-icons** carga familias enteras en chunks separados | Material Design (3MB), FontAwesome 6 (2.2MB), FontAwesome 4 (1.9MB), Bootstrap (2.4MB), Octicons (590KB) | ~**11MB** innecesarios |
| L2 | **lottie-web** cargado completo | 307KB para animaciones posiblemente subutilizadas | 307KB |
| L3 | **framer-motion** cargado completo | 97KB de librería de animaciones | 97KB |
| L4 | **Sin headers de caché** | Ningún recurso estático tiene `Cache-Control` | Cada visita descarga todo |
| L5 | **95% del CSS no se usa** | 233KB transferidos, 222KB desperdiciados | 222KB |
| L6 | **Sourcemaps inline en producción** | `sourcemap: 'inline'` en `magna-page/page/vite.config.ts:16` | Infla JS ~30% |

---

## 4. Orden de Ejecución Priorizado

La estrategia prioriza **llegar a producción rápido** sobre la actualización exhaustiva de dependencias.

```
Prioridad  | Fase                           | Estado
-----------|--------------------------------|------------------------
✅ P0      | Fase 1 — Bugs críticos         | COMPLETADO
🚀 P0      | Fase 7 — Dockerizar y desplegar | ⬅️ PRÓXIMO A EJECUTAR
🗄️ P1      | Fase 6 — Migrar a PostgreSQL   | Pendiente
⚡ P2      | Quick-wins de rendimiento      | Pendiente
🔧 P3      | Fase 2 — Backend Django 5.2    | Pendiente
🎨 P4      | Fase 3+4 — Frontends           | Pendiente
🔗 P5      | Fase 5 — Unificación frontends | Pendiente
🚀 P6      | Fase 8 — Rendimiento profundo  | Pendiente
```

### Justificación del orden

1. **Fase 7 primero**: Tener Docker + deploy funcionando permite iterar rápido y desplegar cambios incrementales sin depender del entorno manual actual
2. **PostgreSQL antes que actualizar backend**: Es mejor migrar la base de datos con Django 5.0 (actual) que arriesgar problemas de compatibilidad entre la migración y Django 5.2
3. **Quick-wins antes de Django 5.2**: Cambios como `sourcemap: false` y caché nginx son seguros, sin riesgo, y mejoran la experiencia inmediata
4. **Backend 5.2 después**: Una vez que el sitio ya está dockerizado y en PostgreSQL, actualizar Django es más seguro
5. **Frontends al final**: Son los cambios con más riesgo de breaking, y se benefician de tener el pipeline de deploy funcionando

---

## 5. Fase 1 — Bugs Críticos (Completado)

**Tiempo estimado:** 2-3 horas · **Estado: ✅ COMPLETADO**

| # | Archivo | Cambio | Resultado |
|---|---------|--------|-----------|
| 1.1 | `requirements.txt` | Eliminar `cors==1.0.1` (línea 10) | ✅ |
| 1.2 | `requirements.txt` | Eliminar `defusedxml==0.8.0rc2` (línea 12). Cambiar por `defusedxml==0.7.1` — o eliminar si no se usa | ✅ |
| 1.3 | `requirements.txt` | Eliminar `distlib==0.3.6`, `virtualenv==20.17.0`, `virtualenv-clone==0.5.7` (líneas 13, 56, 57) | ✅ |
| 1.4 | `settings.py:28` | Mover SECRET_KEY a variable de entorno con django-environ | ✅ |
| 1.5 | `settings.py:206` | Cambiar EMAIL_BACKEND a SMTP real con variables de entorno | ✅ |
| 1.6 | `user/views.py` | Eliminar el primer bloque `get_object()` (líneas 17-25). Mantener solo `return self.request.user` | ✅ |
| 1.7 | `page/package.json` | Agregar `"@tanstack/react-query": "^5.62.0"` como dependencia directa | ✅ |
| 1.8 | `.gitignore` | Agregar exclusiones para dist/, *.sqlite3 | ✅ |

---

## 6. Fase 7 — Dockerizar y Desplegar (P0)

**Tiempo estimado:** 4-6 horas · **Prioridad: 🚀 MÁXIMA — ejecutar ahora**

**Impacto**: Medio — cambia el flujo de deploy pero lo hace reproducible y portable.

### 6.1 Estructura propuesta

```
magna/
├── docker-compose.yml          → Orquestación: web + db + nginx
├── Dockerfile                  → Imagen para Django + gunicorn
├── Dockerfile.frontend         → Imagen para build de React (multi-stage)
├── .dockerignore
├── nginx/
│   ├── nginx.conf              → El que hoy está en gunicorn.conf (renombrado)
│   ├── Dockerfile
│   └── ssl/                    → Certificados Let's Encrypt (volumen)
├── .env                        → Variables de entorno (NO commiteado)
├── .env.example                → Template de variables (commiteado)
└── entrypoint.sh               → Script de inicio (migrate + collectstatic + gunicorn)
```

### 6.2 docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    env_file: .env
    restart: unless-stopped

  web:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    env_file: .env
    depends_on:
      - db
    restart: unless-stopped

  nginx:
    build:
      context: ./nginx
    volumes:
      - static_volume:/static
      - media_volume:/media
      - ./nginx/ssl:/etc/letsencrypt
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

### 6.3 Dockerfile (Backend)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Build frontend (multi-stage o build aparte)
# COPY --from=frontend-builder /app/magna-page/page/dist ./magna-page/page/dist
# COPY --from=frontend-builder /app/magna-page/store/dist ./magna-page/store/dist

RUN python manage.py collectstatic --no-input

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "magna_web.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
```

### 6.4 entrypoint.sh

```bash
#!/bin/bash
set -e

python manage.py migrate --no-input
python manage.py collectstatic --no-input --clear

exec "$@"
```

### 6.5 Beneficios

- **Reproducible**: Mismo entorno en dev, staging y producción
- **Aislado**: No contamina el sistema anfitrión
- **Escalable**: Fácil agregar workers, Redis, etc.
- **CI/CD ready**: Se integra con GitHub Actions, GitLab CI, etc.
- **Rollback simple**: `docker-compose down && docker-compose up -d` con imagen anterior

---

## 7. Fase 6 — Migración a PostgreSQL (P1)

**Tiempo estimado:** 2-4 horas · **Prioridad: 🗄️ ALTA**

**Impacto**: Medio — requiere detener el sitio durante la migración de datos.

### 7.1 Por qué PostgreSQL

| Aspecto | SQLite | PostgreSQL |
|---------|--------|------------|
| Concurrencia | Una escritura a la vez | Múltiples escrituras concurrentes |
| Escalabilidad | 1GB-10GB recomendado | TB sin problema |
| Funciones avanzadas | Limitadas | JSON, arrays, full-text search, índices avanzados |
| Backups | Copia de archivo | `pg_dump`, WAL, PITR |
| Production-ready | NO | SÍ |

### 7.2 Configuración

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST', default='localhost'),
        'PORT': env('DB_PORT', default='5432'),
        'CONN_MAX_AGE': env.int('DB_CONN_MAX_AGE', default=600),
    }
}
```

### 7.3 Procedimiento

1. Configurar PostgreSQL como servicio en docker-compose (Fase 7 ya lo incluye)
2. Ajustar `settings.py` para usar PostgreSQL
3. `python manage.py dumpdata --natural-foreign --natural-primary > datadump.json`
4. `python manage.py migrate`
5. `python manage.py loaddata datadump.json`
6. Verificar datos

### 7.4 Rollback

```bash
git checkout settings.py  # revertir a SQLite
python manage.py migrate
python manage.py loaddata datadump.sqlite.json
```

---

## 8. Quick-Wins de Rendimiento (P2)

**Tiempo estimado:** 1-2 horas · **Prioridad: ⚡ ALTA (sin riesgo)**

Estos cambios se pueden aplicar en cualquier momento porque son seguros y reversibles.

| # | Acción | Archivo | Impacto | Tiempo |
|---|--------|---------|---------|--------|
| Q1 | `sourcemap: 'inline'` → `false` | `magna-page/page/vite.config.ts:16` | -30% tamaño build JS | 5 min |
| Q2 | Importar iconos específicos en vez de familias enteras | Múltiples archivos `.tsx` | Elimina ~11MB de bundles | 30 min |
| Q3 | Configurar cabeceras de caché en nginx para assets con hash | `nginx/nginx.conf` (antes `gunicorn.conf`) | Evita redescargar en cada visita | 15 min |
| Q4 | Agregar compresión gzip en nginx | `nginx/nginx.conf` | -70% transferencia | 10 min |
| Q5 | Agregar `preconnect` y `dns-prefetch` | `index.html` de ambos frontends | Reduce latencia de conexión | 15 min |

### 8.1 Detalle Q2 — Importar iconos específicos

**Problema**: Los imports como `import { FaHome } from 'react-icons/fa'` cargan **toda** la familia FontAwesome.

**Solución**: Cambiar a `import { FaHome } from 'react-icons/fa/FaHome'` — esto carga solo el icono necesario.

Archivos a modificar (buscar imports de react-icons y convertirlos):

| Archivo | Iconos usados |
|---------|--------------|
| `page/src/components/footer1.tsx` | FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok, FaWhatsapp |
| `page/src/components/navBar.tsx` | FaBars, FaTimes, FaChevronDown, FaPhone, FaUser, FaShoppingCart |
| `page/src/components/sections/statistics.tsx` | FiUsers, FiAward, FiBriefcase, FiCheckCircle |
| `page/src/components/sections/Servicios.tsx` | FaChevronRight, FaTools, FaHardHat, FaRuler |
| `page/src/components/sections/clients.tsx` | FaStar, FaQuoteLeft, FaQuoteRight |
| `page/src/components/sections/contact.tsx` | FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock |
| `page/src/components/sections/proyectos.tsx` | FaFolder, FaExternalLinkAlt |
| `page/src/components/acordeon.tsx` | FaChevronDown, FaChevronUp |
| `page/src/components/slider.tsx` | FaChevronLeft, FaChevronRight |
| `page/src/components/floawhatsapp.tsx` | FaWhatsapp |
| `page/src/components/LogoCarrusel.tsx` | FaAnglesLeft, FaAnglesRight |
| `page/src/components/BotonesSwiper.tsx` | FaChevronLeft, FaChevronRight |
| `page/src/pages/blog.tsx` | FaSearch, FaCalendar, FaUser, FaTag |
| `page/src/pages/contact.tsx` | FaPaperPlane, FaSpinner |
| `page/src/pages/servecesDetail.tsx` | FaCheckCircle, FaArrowLeft |
| `page/src/pages/projects.tsx` | FaFilter, FaThLarge, FaList |
| `page/src/pages/projecsDetail.tsx` | FaArrowLeft, FaDownload, FaExpand |
| `page/src/pages/cotizador.tsx` | FaCalculator, FaFileInvoice, FaPrint |
| `page/src/pages/login.tsx` | FaUser, FaLock, FaEye, FaEyeSlash |

### 8.2 Detalle Q3 — Caché nginx

Agregar en `nginx.conf`:

```nginx
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /media/ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

---

## 9. Fase 2 — Actualización Backend Django 5.2 (P3)

**Tiempo estimado:** 4-6 horas · **Prioridad: 🔧 MEDIA**

### 9.1 Objetivo

Migrar de Django 5.0 → **Django 5.2 LTS** (soporte extendido hasta ~abril 2026 con parches de seguridad hasta ~2027).

> Se eligió Django 5.2 LTS en lugar de Django 6.0 porque:
> - 5.2 es **LTS** con soporte de seguridad prolongado
> - Django 6.0 es muy reciente y muchas librerías (djoser, social-auth) pueden no tener compatibilidad total
> - 5.2 es una evolución directa desde 5.0 con cambios mínimos

### 9.2 Paquetes a actualizar

Actualizar `requirements.txt`:

```txt
Django==5.2.*        # 5.0 → 5.2 (última LTS)
djangorestframework==3.17.*  # 3.14 → 3.17
djangorestframework-simplejwt==5.5.*  # 5.3 → 5.5
djoser==2.3.*         # 2.2 → 2.3
django-cors-headers==4.6.*  # 4.3 → 4.6
django-environ==0.12.*  # 0.11 → 0.12
django-ckeditor==6.7.*  # sin cambios mayores (verificar compatibilidad)
cryptography==44.0.*  # 41.0 → 44.0 (breacking: revisar)
Pillow==11.1.*        # 10.1 → 11.1
requests==2.32.*      # 2.31 → 2.32
urllib3==2.3.*        # 2.1 → 2.3
certifi==2025.*       # 2023 → 2025
sqlparse==0.5.*       # 0.4 → 0.5
PyJWT==2.10.*         # 2.8 → 2.10
whitenoise==6.9.*     # 6.6 → 6.9
gunicorn==23.0.*      # 22.0 → 23.0
gevent==24.11.*       # 23.9 → 24.11
social-auth-app-django==5.4.*  # 5.4 → 5.4 (parche)
social-auth-core==4.5.*        # 4.5 → 4.5 (parche)
psycopg2-binary==2.9.*  # 2.9 → 2.9 (parche)
# Eliminar: cors, defusedxml, distlib, virtualenv, virtualenv-clone
# Opcional: eliminar protobuf, numpy, mysql-connector si no se usan
```

### 9.3 Procedimiento

1. Actualizar `requirements.txt`
2. Ejecutar en entorno virtual limpio:
   ```bash
   pip install -r requirements.txt
   python manage.py check --deploy
   python manage.py test
   python manage.py runserver
   ```
3. Verificar cada endpoint manualmente
4. Revisar deprecation warnings con `python -W all manage.py check`

### 9.4 Posibles breaking changes

| Cambio | Riesgo | Mitigación |
|--------|--------|------------|
| Django 5.0 → 5.2 | Bajo | Revisar `login_required` decorator (deprecado en 5.1, 5.2 igual) |
| cryptography 41→44 | **Alto** | Verificar que no se use API interna de cryptography. Prueba de JWT y djoser |
| Pillow 10→11 | Medio | Revisar procesamiento de imágenes en CKEditor |
| DRF 3.14→3.17 | Bajo | Revisar `@action` decorator y `DefaultRouter` |
| simplejwt 5.3→5.5 | Bajo | Sin cambios mayores |
| djoser 2.2→2.3 | Medio | Revisar serializers de usuario |

---

## 10. Fase 3 + 4 — Frontends (P4)

**Tiempo estimado:** 12-18 horas · **Prioridad: 🎨 MEDIA-BAJA**

> **Nota**: Se ejecutan en paralelo porque no dependen entre sí. El store tiene mayor riesgo (react-query v4→v5).

### 10.1 Estrategia

- Actualizar Vite 4 → **Vite 5** (Vite 6 es muy reciente y los plugins pueden no estar listos)
- TypeScript 5.0/4.9 → **5.5** (verificar errores de tipo nuevos)
- Las librerías con breaking changes se evalúan caso por caso
- **eslint** se actualiza hacia el final (breaking grande)

### 10.2 Paquetes seguros (sin breaking) — Page

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "axios": "^1.7.9",
  "bootstrap": "^5.3.3",
  "react-bootstrap": "^2.10.7",
  "swiper": "^11.2.0",
  "dompurify": "^3.2.3",
  "@types/dompurify": "^3.0.5",
  "formik": "^2.4.6",
  "yup": "^1.6.1",
  "react-floating-whatsapp": "^5.1.6",
  "react-ga4": "^2.1.0",
  "react-intersection-observer": "^9.13.0",
  "react-lazy-load-image-component": "^1.6.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1"
}
```

### 10.3 Paquetes con breaking changes — Page

| Paquete | Versión actual | Destino | Cambios necesarios |
|---------|---------------|---------|-------------------|
| **framer-motion** | 10.16.16 | **11.x** | `AnimatePresence` cambió `exitBeforeEnter` → `mode: "wait"` |
| **react-pdf** | 7.7.1 | **9.x** | `Document` y `Page` cambiaron props. `pdfjs-dist` requiere worker manual |
| **@react-pdf/renderer** | 3.4.4 | **4.x** | Cambios en `Document`, `Font.register`, manejo de estilos |
| **lottie-react** | 2.4.0 | **3.x** | `<Lottie>` → `<Player>`. El API de animaciones cambió |
| **react-toastify** | 10.0.4 | **11.x** | `toast()` ya no acepta `className` directamente |
| **react-icons** | 4.12.0 | **5.x** | Algunos iconos renombrados |
| **eslint** | 8.56 | **9.x** | Migración a flat config (`eslint.config.js`) |
| **@typescript-eslint/** | v5 | **v8.x** | Nuevas reglas, requiere eslint 9 |

### 10.4 Paquetes con breaking changes — Store

| Paquete | v actual | Destino | Cambios necesarios |
|---------|----------|---------|-------------------|
| **vite** | 4.0.0 | **5.4.x** | Actualizar @vitejs/plugin-react 3→4 también |
| **typescript** | 4.9.3 | **5.5.x** | Muchos errores de tipo nuevos |
| **@tanstack/react-query** | 4.26.1 | **5.62.x** | Migración grande — ver sección 10.5 |
| **react-toastify** | 9.1.1 | **11.x** | Migración v9 → v11 (pasar por v10) |
| **@paypal/react-paypal-js** | 7.8.2 | **8.x** | `<PayPalScriptProvider>` cambió props |
| **react-helmet-async** | 1.3.0 | **2.x** | `<HelmetProvider>` ya no necesita `context` prop |

### 10.5 Migración react-query v4 → v5

| v4 | v5 | Detalle |
|----|----|---------|
| `cacheTime` | `gcTime` | Renombrado |
| `keepPreviousData` | `placeholderData: keepPreviousData` | Importar de `@tanstack/react-query` |
| `onSuccess` en `useQuery`/`useMutation` | ❌ Eliminado | Mover a `queryClient` defaults o `useEffect` |
| `onError` en `useQuery` | ❌ Eliminado | Usar `queryClient.getDefaultOptions()` o meta |
| `isLoading` | `isPending` (nuevo) | Verificar semántica |
| `useQueries` | Firma cambió | Ahora recibe objeto `{queries: [...]}` |
| `retry` | Sigue igual | Sin cambios |

---

## 11. Fase 5 — Unificación de Frontends (P5)

**Tiempo estimado:** 8-16 horas · **Prioridad: 🔗 BAJA (opcional)**

**Impacto**: **Alto** — Cambia estructura del proyecto pero mejora radicalmente la mantenibilidad.

### 11.1 Situación actual

Actualmente hay dos proyectos Vite separados:

```
magna-page/
├── page/        → Sitio web principal (React + Bootstrap + framer-motion)
│   ├── src/     → ~30 componentes, 12 rutas
│   └── package.json
└── store/       → E-commerce (React + Bootstrap + react-query v4)
    ├── src/     → ~15 componentes, 14 rutas
    └── package.json
```

### 11.2 Solución propuesta

Unificar en un solo proyecto Vite con múltiples entry points:

```
magna-page/
├── src/
│   ├── main.tsx          → Entry point de website (page)
│   ├── store-main.tsx    → Entry point de e-commerce (store)
│   ├── components/       → Componentes compartidos
│   ├── hooks/            → Hooks compartidos
│   ├── utils/            → Utilidades compartidas
│   ├── pages/            → Páginas del website
│   └── store-pages/      → Páginas del e-commerce
├── vite.config.ts        → Configuración unificada
├── tsconfig.json
└── package.json          → Dependencias unificadas
```

### 11.3 Riesgos y mitigación

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Conflictos de estilo entre page y store | Media | Namespaces de CSS o módulos |
| Error de rutas al unificar routers | Media | Usar `createBrowserRouter` con prefijos |
| Estado global de auth incompatible | Alta | Normalizar a un solo patrón (localStorage con `userInfo` conteniendo `access` + `refresh`) |
| Build más grande (code splitting) | Baja | Lazy loading por ruta |

---

## 12. Fase 8 — Rendimiento Profundo (P6)

**Tiempo estimado:** 4-8 horas · **Prioridad: 🚀 BAJA (post-deploy)**

| # | Acción | Archivos | Impacto estimado | Tiempo |
|---|--------|----------|-----------------|--------|
| 8.1 | Code splitting con `React.lazy()` | `page/src/App.tsx` y rutas | -40% bundle inicial | 2h |
| 8.2 | `select_related`/`prefetch_related` en views | `servicios/views.py`, `proyectos/views.py`, `blog/views.py` | Elimina queries N+1 | 1h |
| 8.3 | Cache headers en DRF (`@cache_page`) | `servicios/views.py`, `frequentQuestions/views.py` | Reduce latencia 50-80% | 1h |
| 8.4 | Convertir imágenes a WebP | `media/` | -30% peso imágenes | 1h |
| 8.5 | Lazy loading nativo en imágenes | Componentes React | -50% imágenes cargadas inicialmente | 30 min |
| 8.6 | Evaluar si `@react-pdf/renderer` es necesario | — | Podría ahorrar ~1.5MB en bundle | 30 min |

---

## 13. Resumen de Tiempos e Impactos

### Tiempos estimados totales

| Prioridad | Fase | Descripción | Tiempo mínimo | Tiempo máximo |
|-----------|------|-------------|--------------|--------------|
| ✅ P0 | 1 | Bugs críticos | **COMPLETADO** | **COMPLETADO** |
| 🚀 P0 | 7 | Dockerizar y desplegar | 4h | 6h |
| 🗄️ P1 | 6 | Migrar a PostgreSQL | 2h | 4h |
| ⚡ P2 | QW | Quick-wins de rendimiento | 1h | 2h |
| 🔧 P3 | 2 | Backend Django 5.2 | 4h | 6h |
| 🎨 P4 | 3+4 | Frontends (page + store) | 12h | 18h |
| 🔗 P5 | 5 | Unificación frontends | 8h | 16h |
| 🚀 P6 | 8 | Rendimiento profundo | 4h | 8h |
| **Total restante** | | | **35h** | **60h** |

### Impacto en disponibilidad del sitio

| Fase | Tiempo de inactividad | ¿Requiere detener el sitio? |
|------|----------------------|----------------------------|
| 1 | 0 | No — ✅ COMPLETADO |
| 7 | 30 min-1h | Sí, cambio de infraestructura |
| 6 | 30 min-1h | Sí, migración de datos |
| QW | 0 | No |
| 2 | 30 min | Sí, para probar |
| 3+4 | 0 | No (build y deploy nuevo) |
| 5 | 1-2h | Sí, para migración y pruebas |
| 8 | 0 | No |

### Riesgos y probabilidad de breaking

| Fase | Probabilidad | Severidad | Mitigación |
|------|-------------|-----------|------------|
| 7 | **10%** | Baja | Docker aísla, fácil rollback |
| 6 | **15%** | Media | dump/load de datos debe verificarse |
| QW | **5%** | Baja | Cambios incrementales, fáciles de revertir |
| 2 | **15%** | Media | Revisar deprecation warnings, probar endpoints |
| 3+4 | **35%** | Media-alta | react-query v4→v5 es la migración más riesgosa |
| 5 | **35%** | Alta | Unificar estados de auth requiere cuidado |
| 8 | **5%** | Baja | Cambios incrementales, fáciles de revertir |

### Plan de contingencia

1. **Si la Fase 3+4 (frontends) rompe la UI**: Revertir npm packages problemáticos (framer-motion, react-pdf) a versión anterior
2. **Si la Fase 3+4 rompe react-query**: Mantener react-query v4 y actualizar solo el resto. Dejar la migración v4→v5 para después
3. **Si la Fase 5 (unificación) es muy compleja**: Posponer. Primero hacer Fases 1-4 con los dos frontends separados
4. **Si la Fase 6 (PostgreSQL) falla**: `git checkout settings.py` y restaurar SQLite desde backup
5. **Si la Fase 7 (Docker) tiene problemas**: El deploy actual (nginx + gunicorn directo) sigue funcionando

---

## 14. 📅 Plan de Ejecución Medio Tiempo (4h/día) con Entregas Progresivas

**Ritmo de trabajo**: ~4 horas por día hábil · Cada fase concluye con un deploy a producción.

### Semana 1 — Deploy inicial 🚀

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 7 — Dockerizar**: Crear Dockerfile, entrypoint.sh, .dockerignore | No (aún no) |
| Mar | 4h | **Fase 7 — Dockerizar**: Crear docker-compose.yml, nginx/Dockerfile, nginx.conf | No |
| Mié | 4h | **Fase 7 — Probar**: Build de imagen, docker-compose up, verificar que funciona | No |
| Jue | 4h | **Fase 7 — Deploy**: Pasar docker-compose al servidor, migrar de deploy manual a Docker | **✅ SÍ — Entrega 1** |

**Resultado Semana 1**: Sitio corriendo en Docker. Rollback más rápido. Base para todo lo siguiente.

### Semana 2 — Base de datos y quick-wins 🗄️⚡

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 6 — PostgreSQL**: Instalar PostgreSQL, dump de datos desde SQLite | No |
| Mar | 4h | **Fase 6 — PostgreSQL**: Configurar settings.py, migrate, loaddata, verificar | No |
| Mié | 4h | **Fase 6 — Probar**: Verificar datos migrados, probar endpoints, correr tests | No |
| Jue | 4h | **Fase 6 — Deploy**: Actualizar docker-compose, migrar a PostgreSQL en producción | **✅ SÍ — Entrega 2** |

**Resultado Semana 2**: Base de datos PostgreSQL en producción. Backups con `pg_dump`.

### Semana 3 — Quick-wins de rendimiento ⚡

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 2h | **QW-Q1**: Desactivar sourcemaps inline (`sourcemap: false`) | No |
| Lun | 2h | **QW-Q3/Q4**: Configurar caché y gzip en nginx | No |
| Mar | 4h | **QW-Q2**: Importar iconos específicos de react-icons (~18 archivos) | No |
| Mié | 2h | **QW-Q5**: Agregar preconnect/dns-prefetch en index.html | No |
| Mié | 2h | **Probar build**: `npm run build`, verificar tamaños reducidos | No |
| Jue | 4h | **QW — Deploy**: Buildear frontend, deployar todo | **✅ SÍ — Entrega 3** |

**Resultado Semana 3**: Site carga ~30% más rápido. Sourcemaps fuera. Caché funcionando. Iconos optimizados.

### Semana 4 — Backend Django 5.2 🔧

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 2**: Actualizar requirements.txt, instalar dependencias nuevas | No |
| Mar | 4h | **Fase 2**: Probar `manage.py check --deploy`, correr tests, verificar endpoints | No |
| Mié | 4h | **Fase 2**: Probar en staging (docker-compose local). Verificar auth, admin, API | No |
| Jue | 4h | **Fase 2 — Deploy**: Buildear nueva imagen Docker, deployar | **✅ SÍ — Entrega 4** |

**Resultado Semana 4**: Backend actualizado a Django 5.2 LTS. Seguridad mejorada.

### Semana 5 — Frontend Page 🎨

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 3·1**: Vite 5 + TypeScript 5.5 + paquetes seguros | No |
| Mar | 2h | **Fase 3·2**: framer-motion 11 — corregir breaking changes | No |
| Mar | 2h | **Fase 3·3**: react-pdf 9 + pdfjs-dist — corregir worker | No |
| Mié | 2h | **Fase 3·4**: lottie-react 3 — migrar a `<Player>` | No |
| Mié | 2h | **Fase 3·5**: react-toastify 11 — corregir API | No |
| Jue | 4h | **Fase 3 — Deploy + QA**: Revisar visualmente el sitio completo, deployar | **✅ SÍ — Entrega 5** |

**Resultado Semana 5**: Frontend page actualizado. Animaciones, PDFs, notificaciones funcionando.

### Semana 6 — Frontend Store 🎨

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 4·1**: react-query v4→v5 — migrar `cacheTime`→`gcTime`, `isLoading`→`isPending` | No |
| Mar | 2h | **Fase 4·2**: Vite 5 + TypeScript 5.5 + paquetes seguros store | No |
| Mar | 2h | **Fase 4·3**: react-toastify 11, @paypal/react-paypal-js 8, react-helmet-async 2 | No |
| Mié | 4h | **Fase 4 — Probar**: Probar flujo completo de e-commerce (carrito, checkout, PayPal) | No |
| Jue | 4h | **Fase 4 — Deploy**: Buildear ambos frontends, deployar | **✅ SÍ — Entrega 6** |

**Resultado Semana 6**: Tienda funcionando con dependencias actualizadas. react-query v5.

### Semana 7 — Unificación frontends (opcional) 🔗

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 5**: Crear estructura unificada, migrar page/ | No |
| Mar | 4h | **Fase 5**: Migrar store/, unificar routers, resolver conflictos | No |
| Mié | 4h | **Fase 5**: Unificar auth, probar ambos entry points | No |
| Jue | 4h | **Fase 5 — Deploy**: Build unificado, deployar | **✅ SÍ — Entrega 7** |

**Resultado Semana 7**: (Opcional) Un solo frontend. Mantenibilidad muy mejorada.

### Semana 8 — Rendimiento profundo (opcional) 🚀

| Día | Horas | Actividad | ¿Se deploya a prod? |
|-----|-------|-----------|---------------------|
| Lun | 4h | **Fase 8**: Code splitting con `React.lazy()` por ruta | No |
| Mar | 4h | **Fase 8**: select_related/prefetch_related en views + caché DRF | No |
| Mié | 4h | **Fase 8**: WebP, lazy loading imágenes, evaluar react-pdf | No |
| Jue | 4h | **Fase 8 — Deploy + Lighthouse**: Correr Lighthouse, verificar mejora, deployar | **✅ SÍ — Entrega 8** |

**Resultado Semana 8**: (Opcional) Performance >80/100 en Lighthouse.

---

### Calendario general (medio tiempo · 4h/día)

```
         ┌────────────────────────────────────────────────────────────┐
         │  SEM 1    SEM 2    SEM 3    SEM 4    SEM 5    SEM 6       │
         │  F7       F6       QW       F2       F3       F4          │
         │  Docker   Postgres Quick    Django   Page     Store       │
         │           │        │        │        │        │           │
         │───────────│────────│────────│────────│────────│───        │
Producción│  🚀 E1   │  🚀 E2  │ 🚀 E3  │ 🚀 E4  │ 🚀 E5  │ 🚀 E6   │
         │  Docker  │  PG DB  │ Cache   │ D52     │ Page    │ Store   │
         └──────────┴────────┴─────────┴─────────┴────────┴─────────┘

         ┌──────────────────────────────────────────────────┐
         │  SEM 7*   SEM 8*          *Opcional              │
         │  F5       F8                                      │
         │  Unificar Rendimiento                             │
         │           │                                       │
         │───────────│────────                               │
         │  🚀 E7   │  🚀 E8                                 │
         │  Mono    │  80+ LH                                 │
         └──────────┴────────────────────────────────────────┘
```

### Resumen de entregas a producción

| Entrega | Semana | Contenido | Tiempo acumulado |
|---------|--------|-----------|-----------------|
| 🚀 **E1** | Sem 1 | Sitio dockerizado (infraestructura moderna) | ~16h |
| 🚀 **E2** | Sem 2 | PostgreSQL en producción (datos seguros) | ~32h |
| 🚀 **E3** | Sem 3 | Caché, sourcemaps, iconos optimizados (rendimiento) | ~44h |
| 🚀 **E4** | Sem 4 | Django 5.2 LTS (seguridad, LTS) | ~60h |
| 🚀 **E5** | Sem 5 | Frontend page actualizado | ~76h |
| 🚀 **E6** | Sem 6 | Frontend store actualizado | ~92h |
| 🚀 **E7** | Sem 7\* | Frontend unificado (opcional) | ~108h |
| 🚀 **E8** | Sem 8\* | Rendimiento profundo (opcional) | ~124h |

**Beneficio clave**: Después de la **Semana 1**, el sitio ya está en Docker y cada semana siguiente suma una mejora concreta a producción. No hay meses de desarrollo sin ver resultados.

---

## Apéndice A: Archivos a modificar (actualizado)

| Archivo | Fases |
|---------|-------|
| `requirements.txt` | 1 ✅, 2 |
| `magna_web/settings.py` | 1 ✅, 2, 6, 8 |
| `magna_web/urls.py` | 5 |
| `.env` (nuevo) | 1 ✅ |
| `.env.example` (nuevo) | 1 ✅, 7 |
| `.gitignore` | 1 ✅ |
| `user/views.py` | 1 ✅ |
| `magna-page/page/package.json` | 1 ✅, 3, 5 |
| `magna-page/page/vite.config.ts` | QW, 3, 5 |
| `magna-page/page/.eslintrc.cjs` | 3 |
| `magna-page/store/package.json` | 4, 5 |
| `magna-page/store/vite.config.ts` | QW, 4, 5 |
| `magna-page/store/tsconfig.json` | 4 |
| `build.sh` | 7 |
| `gunicorn.conf` → `nginx/nginx.conf` | QW, 7 |
| `Dockerfile` (nuevo) | 7 |
| `Dockerfile.frontend` (nuevo) | 7 |
| `docker-compose.yml` (nuevo) | 7 |
| `entrypoint.sh` (nuevo) | 7 |
| `.dockerignore` (nuevo) | 7 |

## Apéndice B: Comandos útiles

```bash
# Verificar deprecation warnings de Django
python -W all manage.py check

# Ver paquetes desactualizados
pip list --outdated

# Verificar seguridad de dependencias
pip-audit

# Probar build frontend sin errores de tipo
npx tsc --noEmit

# Verificar tamaño de bundle
npx vite build --mode production

# Docker
docker-compose up -d
docker-compose logs -f
docker-compose down
```

---

> **Nota final**: Este plan está priorizado para **llegar a producción rápido** con entregas semanales. Cada semana termina con un deploy a producción que agrega valor tangible. La Fase 1 (bugs críticos) ya está completada. El siguiente paso es Dockerizar (Semana 1), migrar a PostgreSQL (Semana 2), y luego ir actualizando capa por capa.
