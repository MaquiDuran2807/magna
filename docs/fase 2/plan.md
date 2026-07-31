# Fase 2 — Modernización Completa

> Proyecto: Magna Ingeniería y Topografía
> Fecha: 23/06/2026
> Basado en: `PLAN_ACTUALIZACION.md`

---

## Resumen

Después de corregir los bugs críticos (Fase 1), esta fase ejecuta el resto del plan de actualización en orden de prioridad: infraestructura (Docker, PostgreSQL), rendimiento rápido, actualización de backend, frontends, y mejoras opcionales.

Cada subfase incluye **escribir pruebas primero** para capturar el comportamiento actual, luego aplicar los cambios, y finalmente ejecutar las pruebas para verificar que nada se rompió.

---

## Estrategia de Pruebas

### Estado actual
- **0% cobertura** — los 8 archivos `tests.py` están vacíos (solo boilerplate de Django)
- **Sin tests de frontend** — no existe ningún `*.test.*` ni `__tests__/`
- No hay suite de pruebas que ejecutar antes de empezar

### Enfoque: Test-First para cada subfase

Antes de cada subfase se deben escribir **tests de línea base (baseline)** que capturen el comportamiento actual del sistema. Luego de aplicar los cambios, se ejecutan esos mismos tests para confirmar que el comportamiento se conserva.

```
Para cada subfase:
  1. Escribir tests baseline (capturar comportamiento actual) → commit
  2. Aplicar cambios de la subfase
  3. Ejecutar tests baseline (verificar que nada se rompió) → commit con cambios
  4. Agregar tests nuevos si la subfase agrega funcionalidad
```

### Tests baseline recomendados por app

| App | Tests mínimos |
|-----|--------------|
| `user` | Crear usuario vía API, login JWT, refresh token, perfil de usuario autenticado |
| `servicios` | GET lista de servicios, GET detalle por ID, GET servicios-and-subservicios, GET brochure |
| `equipos` | GET lista de equipo + tecnologías |
| `proyectos` | GET lista paginada, GET imágenes de proyectos |
| `contact` | POST crear contacto (válido), POST con datos inválidos |
| `frequentQuestions` | GET todas las preguntas |
| `products` | GET lista productos, GET por slug, GET por categoría, GET promociones, GET search |
| `blog` | GET lista paginada, GET detalle por ID, GET recientes, GET search |

---

## Subfase 2.1 — 🚀 Dockerizar y Desplegar (P0)

**Tiempo:** 4-6 horas · **Prioridad: MÁXIMA**

### Archivos a crear

| Archivo | Propósito |
|---------|-----------|
| `Dockerfile` | Imagen Python 3.11-slim + dependencias + gunicorn |
| `docker-compose.yml` | Orquestación: web + db (postgres) + nginx |
| `nginx/nginx.conf` | Proxy reverso (renombrado desde `gunicorn.conf`) |
| `nginx/Dockerfile` | Imagen nginx con configuración |
| `entrypoint.sh` | migrate + collectstatic + exec gunicorn |
| `.dockerignore` | Excluir node_modules, .git, __pycache__, etc. |

### Acciones

1. Crear `Dockerfile` con python:3.11-slim, libpq-dev, pip install, collectstatic
2. Crear `entrypoint.sh` con `set -e`, migrate, collectstatic --clear, exec gunicorn
3. Crear `docker-compose.yml` con servicios web, db (postgres:16-alpine), nginx
4. Mover `gunicorn.conf` → `nginx/nginx.conf` (agregando caché y gzip de los Quick-wins)
5. Crear `nginx/Dockerfile`
6. Crear `.dockerignore`
7. Buildear imagen y probar local: `docker-compose up -d`

### Pruebas antes de empezar

```bash
# Verificar que el sitio funciona actualmente
python manage.py check
python manage.py runserver &  # probar endpoints manuales

# Tests baseline de APIs (usando pytest o manage.py test)
python manage.py test
```

Escribir tests baseline para todos los endpoints (ver tabla arriba) **antes** de tocar infraestructura.

### Pruebas después de Docker

```bash
# Build y levantar contenedores
docker-compose build
docker-compose up -d

# Verificar que todos los contenedores están running
docker-compose ps

# Verificar logs sin errores
docker-compose logs web | Select-String -Pattern "ERROR|CRITICAL"

# Probar endpoints vía curl
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/admin/
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/servicios/servicio/
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/blog/

# Ejecutar tests baseline dentro del contenedor
docker-compose exec web python manage.py test

# Verificar que archivos estáticos se sirven
curl -s -o /dev/null -w "%{http_code}" http://localhost/static/
```

### Rollback

```bash
docker-compose down
rm docker-compose.yml Dockerfile entrypoint.sh .dockerignore
git checkout gunicorn.conf  # restaurar nginx.conf original (si se movió)
```

---

## Subfase 2.2 — 🗄️ Migrar a PostgreSQL (P1)

**Tiempo:** 2-4 horas · **Prioridad: ALTA**

### Cambios en archivos existentes

| Archivo | Cambio |
|---------|--------|
| `magna_web/settings.py` | Cambiar `DATABASES` a PostgreSQL con env vars |
| `.env` | Agregar `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` |
| `docker-compose.yml` | (ya incluye servicio db, ajustar si es necesario) |

### Acciones

1. Configurar PostgreSQL como servicio (ya incluido en docker-compose de 2.1)
2. Ajustar `settings.py`: `ENGINE` → `django.db.backends.postgresql`, host/port/user/password desde env
3. Dump datos desde SQLite:
   ```bash
   python manage.py dumpdata --natural-foreign --natural-primary > datadump.json
   ```
4. Migrar a PostgreSQL:
   ```bash
   python manage.py migrate
   python manage.py loaddata datadump.json
   ```
5. Verificar datos: login, contenido, relaciones
6. Eliminar `db.sqlite3` y backups obsoletos

### Pruebas antes de empezar

```bash
# Dump de datos actual como respaldo
python manage.py dumpdata --natural-foreign --natural-primary > datadump.pre-pg.json

# Ejecutar tests baseline (en SQLite)
python manage.py test
```

### Pruebas después de migrar

```bash
# Verificar que Django se conecta a PostgreSQL
python manage.py check --database default

# Ejecutar tests baseline (ahora contra PostgreSQL)
python manage.py test

# Verificar datos migrados
python manage.py shell -c "
from servicios.models import Servicio
print(f'Servicios: {Servicio.objects.count()}')
from proyectos.models import Proyecto
print(f'Proyectos: {Proyecto.objects.count()}')
from blog.models import BlogPost
print(f'Blog posts: {BlogPost.objects.count()}')
from products.models import Product
print(f'Productos: {Product.objects.count()}')
"
```

### Rollback

```bash
git checkout magna_web/settings.py  # revertir a SQLite
python manage.py migrate
python manage.py loaddata datadump.pre-pg.json
```

---

## Subfase 2.3 — ⚡ Quick-wins de Rendimiento (P2)

**Tiempo:** 1-2 horas · **Prioridad: ALTA** (sin riesgo)

### Cambios en archivos

| Archivo | Cambio |
|---------|--------|
| `magna-page/page/vite.config.ts` | `sourcemap: 'inline'` → `false` |
| `magna-page/store/vite.config.ts` | `sourcemap: true` → `false` |
| `magna-page/page/index.html` | Agregar `<link rel="preconnect">` y `<link rel="dns-prefetch">` |
| `magna-page/store/index.html` | Agregar `<link rel="preconnect">` y `<link rel="dns-prefetch">` |
| `nginx/nginx.conf` | Agregar `expires` headers y `gzip` |
| ~18 archivos `.tsx` | Cambiar imports de react-icons a rutas específicas |

### Q2 — Optimización de iconos (la más tediosa)

Cambiar imports como:
```tsx
// ANTES (carga toda la familia):
import { FaHome } from 'react-icons/fa';

// DESPUÉS (carga solo el icono):
import { FaHome } from 'react-icons/fa/FaHome';
```

Archivos a modificar (~18):

| Archivo | Iconos |
|---------|--------|
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

### Pruebas antes de empezar

```bash
# Build actual para medir tamaño de referencia
cd magna-page/page
npm run build
Get-ChildItem -Recurse dist/ | Measure-Object -Property Length -Sum
```

### Pruebas después

```bash
# Build y medir reducción
npm run build
Get-ChildItem -Recurse dist/ | Measure-Object -Property Length -Sum

# Verificar que la página carga sin errores de iconos (consola del navegador)
# Abrir http://localhost:5173 y revisar que no hay 404s de iconos

# Verificar headers de caché
curl -s -I http://localhost/static/js/main.*.js | Select-String -Pattern "Cache-Control"
```

### Rollback

Cada archivo es independiente. Revertir con `git checkout <file>`.

---

## Subfase 2.4 — 🔧 Backend Django 5.2 LTS (P3)

**Tiempo:** 4-6 horas · **Prioridad: MEDIA**

### Cambios en `requirements.txt`

Actualizar a las versiones objetivo:

| Paquete | Actual | Destino | Breaking |
|---------|--------|---------|----------|
| Django | 5.0 | **5.2 LTS** | Bajo |
| djangorestframework | 3.14.0 | **3.17.1** | Bajo |
| djangorestframework-simplejwt | 5.3.1 | **5.5.1** | Bajo |
| djoser | 2.2.2 | **2.3.3** | Medio |
| django-cors-headers | 4.3.1 | **4.6.0** | Bajo |
| django-environ | 0.11.2 | **0.12.0** | Bajo |
| cryptography | 41.0.7 | **44.0.x** | **Alto** |
| Pillow | 10.1.0 | **11.1.0** | Medio |
| requests | 2.31.0 | **2.32.3** | Bajo |
| urllib3 | 2.1.0 | **2.3.0** | Bajo |
| certifi | 2023.11.17 | **2025.x** | Bajo |
| sqlparse | 0.4.4 | **0.5.3** | Medio |
| PyJWT | 2.8.0 | **2.10.1** | Bajo |
| whitenoise | 6.6.0 | **6.9.0** | Bajo |
| gunicorn | 22.0.0 | **23.0.0** | Bajo |
| gevent | 23.9.1 | **24.11.x** | Bajo |
| social-auth-app-django | 5.4.0 | **5.4.3** | Bajo |
| social-auth-core | 4.5.1 | **4.5.4** | Bajo |
| psycopg2-binary | 2.9.9 | **2.9.10** | Bajo |

### Breaking changes a revisar

| Cambio | Riesgo | Verificar |
|--------|--------|-----------|
| cryptography 41→44 | Alto | JWT, djoser, social-auth |
| Pillow 10→11 | Medio | Procesamiento de imágenes en CKEditor, modelos con ImageField |
| djoser 2.2→2.3 | Medio | Serializers de usuario, endpoints de registro |
| DRF 3.14→3.17 | Bajo | `@action` decorator, routers, paginación |
| sqlparse 0.4→0.5 | Medio | Migraciones (Django lo usa internamente) |

### Pruebas antes

```bash
# Ejecutar tests baseline con versión actual
python manage.py test

# Verificar deprecation warnings actuales
python -W all manage.py check 2>&1 | Select-String -Pattern "Deprecation|Warning"

# Dump completo de datos
python manage.py dumpdata --natural-foreign --natural-primary > datadump.pre-django52.json
```

### Pruebas después

```bash
# Instalar nuevas dependencias
pip install -r requirements.txt

# Verificar compilación
python manage.py check --deploy

# Sin deprecation warnings
python -W all manage.py check 2>&1 | Select-String -Pattern "Deprecation|Warning" | Measure-Object -Line

# Tests
python manage.py test

# Verificar endpoints clave manualmente
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/admin/
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/servicios/servicio/
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/blog/

# Verificar auth
curl -s -X POST http://localhost:8000/auth/jwt/create/ -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"testpass"}' | Select-String -Pattern "access"

# Verificar imágenes (Pillow)
python manage.py shell -c "
from servicios.models import Servicio
s = Servicio.objects.first()
if s and s.imagen:
    print(f'OK: imagen {s.imagen.url} existe')
"
```

### Rollback

```bash
git checkout requirements.txt
pip install -r requirements.txt  # reinstalar versiones anteriores
python manage.py check
```

---

## Subfase 2.5 — 🎨 Frontend Page (P4)

**Tiempo:** 6-8 horas · **Prioridad: MEDIA-BAJA**

### Actualización de dependencias

**Seguras (sin breaking):**
- Vite 4.3.9 → 5.4.x (actualizar `@vitejs/plugin-react` 4.0.0 → 4.3.x)
- TypeScript 5.0.2 → 5.5.x
- react-router-dom 6.21.3 → 6.28.x
- axios 1.6.2 → 1.7.x
- bootstrap 5.3.2 → 5.3.3
- react-bootstrap 2.10.0 → 2.10.x
- swiper 11.0.5 → 11.2.x
- formik 2.4.5 → 2.4.x
- yup 1.3.3 → 1.6.x
- dompurify 3.0.8 → 3.2.x
- leaflet 1.9.4 (sin cambios)
- react-leaflet 4.2.1 (sin cambios)

**Con breaking changes:**

| Paquete | Actual | Destino | Migración |
|---------|--------|---------|-----------|
| framer-motion | 10.16.16 | **11.x** | `exitBeforeEnter` → `mode: "wait"` en `AnimatePresence` |
| react-pdf | 7.7.1 | **9.x** | Worker manual con `pdfjs-dist`, `Document` y `Page` props cambiadas |
| @react-pdf/renderer | 3.4.4 | **4.x** | `Document`, `Font.register`, manejo de estilos |
| lottie-react | 2.4.0 | **3.x** | `<Lottie>` → `<Player>` con nuevo API |
| react-toastify | 10.0.4 | **11.x** | `className` en `toast()` ya no funciona |
| react-icons | 4.12.0 | **5.x** | Algunos iconos renombrados |
| eslint | 8.56 | **9.x** | Flat config (`eslint.config.js`) |
| @typescript-eslint/* | v5 | **v8.x** | Nuevas reglas, eslint 9 requerido |

### Pruebas antes

```bash
# Build actual funciona
cd magna-page/page
npm run build

# TypeScript check
npx tsc --noEmit

# Verificar que la página carga visualmente
# (abrir navegador y revisar componentes principales)
```

Escribir tests de humo para componentes clave (opcional pero recomendado):
- `components/navBar.tsx` — renderiza, links funcionan
- `components/footer1.tsx` — renderiza, datos de contacto visibles
- `pages/servecesDetail.tsx` — carga servicios desde API
- `pages/projects.tsx` — carga proyectos con paginación

### Pruebas después

```bash
# Build exitoso sin errores
npm run build 2>&1 | Select-String -Pattern "error"  # debe dar vacío

# TypeScript check sin errores
npx tsc --noEmit 2>&1 | Measure-Object -Line  # debería ser 0 líneas de error

# Verificar visualmente:
# - Navegación entre páginas
# - Sliders/Swiper funcionan
# - Animaciones (framer-motion) funcionan
# - PDFs se visualizan (react-pdf)
# - Notificaciones (react-toastify)
# - Splash screen (lottie-react)
```

### Rollback

```bash
git checkout magna-page/page/package.json magna-page/page/vite.config.ts
rm -rf node_modules
npm install
```

---

## Subfase 2.6 — 🎨 Frontend Store (P4)

**Tiempo:** 6-8 horas · **Prioridad: MEDIA-BAJA**

### Actualización de dependencias

**Seguras (sin breaking):**
- Vite 4.0.0 → 5.4.x (`@vitejs/plugin-react` 3.0.0 → 4.3.x)
- TypeScript 4.9.3 → 5.5.x
- react-router-dom 6.6.1 → 6.28.x
- axios 1.6.7 → 1.7.x
- bootstrap 5.2.3 → 5.3.3
- react-bootstrap 2.7.0 → 2.10.x
- react-icons 5.1.0 → 5.4.x
- swiper 11.1.0 → 11.2.x

**Con breaking changes:**

| Paquete | Actual | Destino | Migración |
|---------|--------|---------|-----------|
| @tanstack/react-query | 4.26.1 | **5.62.x** | Ver sección 2.6.1 |
| react-toastify | 9.1.1 | **11.x** | Pasar por v10 intermedia |
| @paypal/react-paypal-js | 7.8.2 | **8.x** | `<PayPalScriptProvider>` props cambiaron |
| react-helmet-async | 1.3.0 | **2.x** | `<HelmetProvider>` ya no necesita `context` |

### 2.6.1 — Migración react-query v4 → v5

Este es el cambio más riesgoso de toda la Fase 2.

| v4 | v5 | Acción |
|----|----|--------|
| `cacheTime` | `gcTime` | Renombrar en todas las opciones de `useQuery` |
| `keepPreviousData` | `placeholderData: keepPreviousData` | Importar `keepPreviousData` desde `@tanstack/react-query` |
| `onSuccess` en `useQuery` | ❌ Eliminado | Mover a `queryClient.setQueryDefaults()` o `useEffect` |
| `onError` en `useQuery` | ❌ Eliminado | Usar `meta` o `queryClient.getDefaultOptions()` |
| `isLoading` | `isPending` (nuevo) | `isLoading` ahora solo true en primera carga sin datos |
| `useQueries([...])` | `useQueries({queries: [...]})` | Cambiar firma a objeto |

### Pruebas antes

```bash
# Build actual funciona
cd magna-page/store
npm run build

# TypeScript check
npx tsc --noEmit
```

Probar flujo completo de e-commerce manualmente:
1. Listado de productos en homepage
2. Búsqueda por categoría y nombre
3. Detalle de producto
4. Agregar al carrito
5. Flujo de checkout (shipping → payment → place order)
6. Historial de órdenes

### Pruebas después

```bash
# Build exitoso
npm run build 2>&1 | Select-String -Pattern "error"

# TS sin errores
npx tsc --noEmit 2>&1 | Measure-Object -Line

# Probar flujo completo de e-commerce:
# 1. Homepage carga productos y promociones
# 2. Búsqueda funciona
# 3. Carrito (add/remove/clear)
# 4. Checkout steps (shipping → payment → placeorder)
# 5. PayPal integration
```

### Rollback

```bash
git checkout magna-page/store/package.json magna-page/store/vite.config.ts
rm -rf node_modules
npm install
```

---

## Subfase 2.7 — 🔗 Unificación Frontends (P5 · Opcional)

**Tiempo:** 8-16 horas · **Prioridad: BAJA**

### Objetivo

Unificar `magna-page/page/` y `magna-page/store/` en un solo proyecto Vite con múltiples entry points.

### Estructura destino

```
magna-page/
├── src/
│   ├── main.tsx             → Entry point website (page)
│   ├── store-main.tsx       → Entry point e-commerce (store)
│   ├── components/          → Componentes compartidos
│   ├── hooks/               → Hooks compartidos
│   ├── utils/               → Utilidades compartidas
│   ├── pages/               → Páginas del website
│   └── store-pages/         → Páginas del e-commerce
├── vite.config.ts           → Multi-entry
├── tsconfig.json
└── package.json             → Dependencias unificadas
```

### Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| Conflictos de estilo page vs store | CSS modules o namespaces |
| Error de rutas al unificar routers | `createBrowserRouter` con prefijos |
| Estado global de auth incompatible | Normalizar a localStorage con `userInfo` |
| Build más grande | Lazy loading por ruta |

---

## Subfase 2.8 — 🚀 Rendimiento Profundo (P6 · Opcional)

**Tiempo:** 4-8 horas · **Prioridad: BAJA**

| # | Acción | Archivos | Impacto |
|---|--------|----------|---------|
| 8.1 | Code splitting `React.lazy()` | `page/src/App.tsx` y rutas | -40% bundle inicial |
| 8.2 | `select_related`/`prefetch_related` | `servicios/views.py`, `proyectos/views.py`, `blog/views.py` | Elimina N+1 queries |
| 8.3 | `@cache_page` en DRF | `servicios/views.py`, `frequentQuestions/views.py` | -50-80% latencia |
| 8.4 | WebP conversion | Imágenes en `media/` | -30% peso |
| 8.5 | Lazy loading nativo imágenes | Componentes React | -50% imágenes iniciales |
| 8.6 | Evaluar `@react-pdf/renderer` | — | Podría ahorrar ~1.5MB |

### Pruebas objetivo

```bash
# Lighthouse target >80/100
# LCP < 2.5s
# Bundle size < 500KB (initial JS)
```

---

## Resumen de archivos a modificar/crear

| Archivo | Subfase | Tipo |
|---------|---------|------|
| `Dockerfile` | 2.1 | Nuevo |
| `docker-compose.yml` | 2.1 | Nuevo |
| `nginx/nginx.conf` | 2.1, 2.3 | Renombrado + modificado |
| `nginx/Dockerfile` | 2.1 | Nuevo |
| `entrypoint.sh` | 2.1 | Nuevo |
| `.dockerignore` | 2.1 | Nuevo |
| `magna_web/settings.py` | 2.2, 2.4 | Modificado |
| `.env` | 2.2 | Modificado |
| `requirements.txt` | 2.4 | Modificado |
| `magna-page/page/vite.config.ts` | 2.3, 2.5 | Modificado |
| `magna-page/page/package.json` | 2.5 | Modificado |
| `magna-page/page/index.html` | 2.3 | Modificado |
| `magna-page/store/vite.config.ts` | 2.3, 2.6 | Modificado |
| `magna-page/store/package.json` | 2.6 | Modificado |
| `magna-page/store/index.html` | 2.3 | Modificado |
| ~18 archivos `.tsx` en page/src/ | 2.3 | Modificado |
| `user/tests.py` | **Todas** | Escritura |
| `servicios/tests.py` | **Todas** | Escritura |
| `proyectos/tests.py` | **Todas** | Escritura |
| `products/tests.py` | **Todas** | Escritura |
| `frequentQuestions/tests.py` | **Todas** | Escritura |
| `equipos/tests.py` | **Todas** | Escritura |
| `contact/tests.py` | **Todas** | Escritura |
| `blog/tests.py` | **Todas** | Escritura |

---

## Plan de ejecución semanal (4h/día)

| Semana | Subfase | Entrega a prod |
|--------|---------|---------------|
| 1 | 2.1 — Dockerizar | 🚀 Sitio dockerizado |
| 2 | 2.2 — PostgreSQL | 🚀 Base de datos production-ready |
| 3 | 2.3 — Quick-wins | 🚀 Site carga ~30% más rápido |
| 4 | 2.4 — Django 5.2 | 🚀 Backend LTS actualizado |
| 5 | 2.5 — Frontend Page | 🚀 Page actualizado |
| 6 | 2.6 — Frontend Store | 🚀 Store actualizado |
| 7* | 2.7 — Unificación | 🚀 Frontend unificado (opcional) |
| 8* | 2.8 — Rendimiento | 🚀 Lighthouse >80 (opcional) |

---

## Contingencia

| Problema | Acción |
|----------|--------|
| Docker no funciona | El deploy manual actual (nginx + gunicorn) sigue funcionando |
| PostgreSQL falla | `git checkout settings.py` y restaurar SQLite desde backup |
| react-query v4→v5 rompe | Mantener react-query v4, actualizar solo lo demás |
| Unificación muy compleja | Posponer. Hacer el resto con dos frontends separados |
| cryptography 41→44 rompe | Congelar cryptography en 41.x, actualizar el resto |
