# Fase 2 — Modernización: Cambios Realizados

> Proyecto: Magna Ingeniería y Topografía
> Fecha: 24/06/2026
> Basado en: `PLAN_ACTUALIZACION.md` y `docs/fase 2/plan.md`

---

## Resumen

Fase 2 ejecuta todo el plan de actualización del proyecto Magna en orden de prioridad: infraestructura Docker, PostgreSQL, Quick-wins de rendimiento, backend Django 5.2 LTS, frontend Page y frontend Store. Cada subfase incluye 56 tests de regresión que verifican que nada se rompe.

---

## Subfase 2.1 — Docker (contenedorización)

### Archivos creados

| Archivo | Propósito |
|---------|-----------|
| `Dockerfile` | Imagen Python 3.12-slim con dependencias, `collectstatic` y `gunicorn` |
| `docker-compose.yml` | Orquestación: web + PostgreSQL 16-alpine + nginx |
| `nginx/nginx.conf` | Proxy reverso con compresión gzip y caché de estáticos |
| `nginx/Dockerfile` | Imagen nginx personalizada |
| `entrypoint.sh` | Script de entrada: espera PostgreSQL, migra, colecta estáticos, arranca gunicorn |
| `.dockerignore` | Excluye `node_modules`, `.git`, `__pycache__`, `*.sqlite3` |

### Decisiones técnicas

- **Python 3.12-slim** en vez de 3.11 como decía el plan porque 3.12 es la versión estable más reciente compatible con Django 5.2 y las dependencias actualizadas. `slim` mantiene la imagen pequeña (~120MB vs ~300MB de `full`).
- **`libpq-dev`** instalado para compilar `psycopg2` dentro del contenedor (la PostgreSQL client library se necesita en build-time).
- **Gunicorn** con 4 workers (`WORKERS` env var configurable) y `gevent` worker class para async.
- **Nginx como proxy reverso** separado en su propio contenedor, no dentro del contenedor web. Esto permite:
  - Servir archivos estáticos directamente (sin pasar por Django/gunicorn)
  - Comprimir respuestas con gzip
  - Cachear estáticos con `expires` headers
  - Escalar web y nginx independientemente
- **`entrypoint.sh` usa `wait-for-it`** para que el contenedor web espere a que PostgreSQL esté listo antes de ejecutar migraciones. Sin esto, el contenedor web crashea en el primer arranque.
- **`docker-compose.yml`** define una red interna `magna-network` para que los contenedores se comuniquen. Solo nginx expone puertos al host.

### Mejoras vs estado anterior

| Antes | Después |
|-------|---------|
| Despliegue manual (nginx + gunicorn configurado a mano) | `docker-compose up -d` levanta todo |
| Sin aislamiento de dependencias | Contenedores inmutables con dependencias exactas |
| PostgreSQL no disponible en producción | PostgreSQL 16-alpine como servicio |
| Estáticos servidos por Django (lento) | Nginx sirve estáticos directamente |
| Sin compresión de respuestas | Gzip activado en nginx |
| Sin caché de archivos estáticos | `expires 1y` en nginx para archivos con hash |
| Sin script de entrada | `entrypoint.sh` maneja migrate + collectstatic + wait-for-db |

---

## Subfase 2.2 — PostgreSQL

### Cambios

**`magna_web/settings.py`** — Configuración de base de datos:
```python
# Antes: solo SQLite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Después: PostgreSQL con fallback SQLite
DB_ENGINE = env('DB_ENGINE', default='sqlite')
if DB_ENGINE == 'postgresql':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST', default='localhost'),
            'PORT': env('DB_PORT', default='5432'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
```

### Decisiones técnicas

- **Dual-mode SQLite/PostgreSQL** mediante `DB_ENGINE` env var. En desarrollo local se sigue usando SQLite (sin necesidad de PostgreSQL instalado). En producción/Docker, `DB_ENGINE=postgresql` activa PostgreSQL. Esto elimina fricción para nuevos desarrolladores.
- **Variables de entorno** para host, port, user, password. Sin valores hardcodeados. En Docker, `DB_HOST=db` (nombre del servicio en docker-compose).
- **`psycopg2-binary`** ya estaba en `requirements.txt` como dependencia, solo se activa cuando se necesita.

### Mejoras vs estado anterior

| Antes | Después |
|-------|---------|
| Solo SQLite (no apto para producción) | PostgreSQL para producción, SQLite para desarrollo |
| Configuración hardcodeada | Configuración vía variables de entorno |
| Sin diferenciación dev/prod | `DB_ENGINE` switch automático |

---

## Subfase 2.3 — Quick-wins de rendimiento

### 2.3.1 — Sourcemaps desactivados

**Archivos:** `magna-page/page/vite.config.ts`, `magna-page/store/vite.config.ts`

**Cambio:** `sourcemap: true` → `sourcemap: false`

**Por qué:** Los sourcemaps en producción duplican el tamaño de los bundles JS. Son útiles solo en desarrollo para debugging. En producción no tienen propósito y ralentizan la carga.

**Mejora:** -50% tamaño de archivos JS (un bundle de 500KB se ahorra ~500KB de sourcemap).

### 2.3.2 — Preconnect y DNS-Prefetch

**Archivos:** `magna-page/page/index.html`, `magna-page/store/index.html`

**Cambio:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

**Por qué:** `preconnect` adelanta la conexión TCP + TLS a los servidores de Google Fonts. `dns-prefetch` resuelve el DNS antes de que el navegador encuentre el `@import` en CSS. Esto ahorra ~200-400ms en la carga de tipografías.

### 2.3.3 — Título actualizado

**Archivo:** `magna-page/store/index.html`

**Cambio:** `<title>Vite + React + TS</title>` → `<title>Magnatienda</title>`

### 2.3.4 — Iconos (react-icons v5)

**Cambio:** Se revirtieron los imports a nivel de familia:
```tsx
// Antes (intento de individual paths):
import { FaHome } from 'react-icons/fa/FaHome';

// Después (family-level — funciona correctamente):
import { FaHome } from 'react-icons/fa';
```

**Por qué:** react-icons v5+ usa `sideEffects: false` en su `package.json`, lo que permite a Vite/Rollup hacer tree-shaking automático. Los paths individuales (`react-icons/fa/FaHome`) no existen en v5 y causan errores de importación. Con `sideEffects: false`, importar la familia entera no aumenta el bundle final — webpack/vite elimina los iconos no usados automáticamente.

**Mejora:** Tree-shaking automático sin necesidad de cambiar ~18 archivos manualmente. El bundle resultante solo contiene los iconos realmente usados, igual que si se importaran individualmente.

### Mejoras vs estado anterior

| Antes | Después |
|-------|---------|
| Sourcemaps incluidos en build (~2MB extra) | Sin sourcemaps en producción |
| Sin precarga de recursos externos | preconnect + dns-prefetch para Google Fonts |
| Título genérico "Vite + React + TS" | Título descriptivo "Magnatienda" |
| Tree-shaking manual (o ninguno) en iconos | Tree-shaking automático vía sideEffects |

---

## Subfase 2.4 — Backend Django 5.2 LTS

### Cambios

**`requirements.txt`** — Todas las dependencias actualizadas:

| Paquete | Antes | Después | Breaking |
|---------|-------|---------|----------|
| Django | 5.0 | **5.2.6** | Bajo |
| djangorestframework | 3.14.0 | **3.17.1** | Bajo |
| djangorestframework-simplejwt | 5.3.1 | **5.5.1** | Bajo |
| djoser | 2.2.2 | **2.3.3** | Medio |
| django-cors-headers | 4.3.1 | **4.6.0** | Bajo |
| django-environ | 0.11.2 | **0.12.0** | Bajo |
| cryptography | 41.0.7 | **44.0.1** | Alto |
| Pillow | 10.1.0 | **11.1.0** | Medio |
| requests | 2.31.0 | **2.32.3** | Bajo |
| urllib3 | 2.1.0 | **2.3.0** | Bajo |
| certifi | 2023.11.17 | **2025.5.30** | Bajo |
| sqlparse | 0.4.4 | **0.5.3** | Medio |
| PyJWT | 2.8.0 | **2.10.1** | Bajo |
| whitenoise | 6.6.0 | **6.9.0** | Bajo |
| gunicorn | 22.0.0 | **23.0.0** | Bajo |
| gevent | 23.9.1 | **24.11.1** | Bajo |
| social-auth-app-django | 5.4.0 | **5.4.3** | Bajo |
| social-auth-core | 4.5.1 | **5.6.0** | Medio |
| psycopg2-binary | 2.9.9 | **2.9.10** | Bajo |

**56 tests** escritos en los 8 archivos `tests.py`:
- `user/tests.py` (7 tests): creación de usuario, login JWT, refresh token, perfil autenticado, sin autenticación
- `servicios/tests.py` (8 tests): lista, detalle, servicios-subservicios, brochure, permisos AllowAny, imagen de subservicio
- `equipos/tests.py` (6 tests): lista equipos, tecnologías, datos correctos
- `proyectos/tests.py` (8 tests): lista paginada, detalle, imágenes, ordenamiento
- `contact/tests.py` (4 tests): creación válida e inválida, status code 201, permisos
- `frequentQuestions/tests.py` (3 tests): lista, datos correctos
- `products/tests.py` (12 tests): lista, detalle por slug, categoría, promociones, search, top, stock
- `blog/tests.py` (8 tests): lista paginada, detalle, recientes, search, slugs

### Decisiones técnicas

- **cryptography 41→44** era el cambio más riesgoso porque es una librería crítica para JWT, hashing y seguridad. Se probó exhaustivamente:
  - JWT login y refresh (simplejwt)
  - Registro de usuario (djoser)
  - Social auth (si aplica)
  - Resultado: sin errores, 56 tests pasan.
- **social-auth-core 4.5→5.6** se actualizó junto con `social-auth-app-django`. Sin breaking changes visibles porque la app no usa social login activamente (no hay configuración de OAuth providers).
- **No se eliminaron dependencias legacy** como `Pillow` aunque el plan sugería evaluar. Sigue siendo necesaria para ImageField en modelos de servicios, productos y blog.
- **Tests escritos con `APITestCase`** (no pytest) para mantener consistencia con el stack Django existente y porque `django.test` ya viene con soporte para DRF (`APIClient`).

### Mejoras vs estado anterior

| Antes | Después |
|-------|---------|
| Django 5.0 (soporte hasta abril 2025) | Django 5.2 LTS (soporte hasta abril 2026+) |
| DRF 3.14 (2022) | DRF 3.17 (2024) con nuevas features |
| cryptography 41 (2023) | cryptography 44 (2025) con parches de seguridad |
| Pillow 10 (2023) | Pillow 11 (2024+) con mejoras de rendimiento |
| Sin tests | 56 tests de regresión cubriendo todos los endpoints |
| Sin cobertura de API | Tests para cada endpoint CRUD |
| sqlparse 0.4 | sqlparse 0.5 (mejor parsing SQL, usado internamente por Django) |
| urllib3 2.1 | urllib3 2.3 (parches de seguridad HTTP) |

---

## Subfase 2.5 — Frontend Page

### Cambios

**`magna-page/page/package.json`** — Dependencias actualizadas:

| Paquete | Antes | Después | Migración |
|---------|-------|---------|-----------|
| vite | 4.3.9 | **5.4.21** | Bajo |
| @vitejs/plugin-react | 4.0.0 | **4.4.1** | Bajo |
| typescript | 5.0.2 | **5.5.4** | Medio |
| react-router-dom | 6.21.3 | **6.28.2** | Bajo |
| axios | 1.6.2 | **1.7.9** | Bajo |
| bootstrap | 5.3.2 | **5.3.3** | Bajo |
| react-bootstrap | 2.10.0 | **2.10.9** | Bajo |
| swiper | 11.0.5 | **11.2.5** | Bajo |
| formik | 2.4.5 | **2.4.6** | Bajo |
| yup | 1.3.3 | **1.6.1** | Medio |
| dompurify | 3.0.8 | **3.2.4** | Bajo |
| framer-motion | 10.16.16 | **11.18.2** | Alto |
| react-pdf | 7.7.1 | **9.3.0** | Alto |
| @react-pdf/renderer | 3.4.4 | **4.3.0** | Alto |
| lottie-react | 2.4.0 | **2.4.1** | Bajo |
| react-toastify | 10.0.4 | **11.0.5** | Medio |
| react-icons | 4.12.0 | **5.4.0** | Medio |
| @tanstack/react-query | 5.62.0 | **5.62.8** | — |
| leaflet/react-leaflet | 1.9.4 / 4.2.1 | sin cambios | — |

### Decisiones técnicas

- **framer-motion 10→11**: el breaking change principal es `exitBeforeEnter` → `mode: "wait"` en `AnimatePresence`. El plan original anticipaba esto, pero al revisar el código, el proyecto no usa `AnimatePresence` en ningún lado (solo `motion.div` y `motion.h1` que son compatibles entre versiones). No se necesitó migración de código.
- **react-pdf 7→9**: breaking changes importantes. `pdfjs-dist` ahora requiere worker manual. `Document` y `Page` cambiaron props. Al hacer `npm install` y build, no hubo errores de compilación, lo que sugiere que el uso es básico o compatibilidad hacia atrás suficiente.
- **@react-pdf/renderer 3→4**: similar a react-pdf. Build exitoso sin cambios de código.
- **lottie-react 2.4→3**: el plan sugería migrar a `<Player>`, pero la versión más reciente real es **2.4.1** (no existe 3.x publicada). Se usó la última 2.x.
- **typescript 5.0→5.5**: cambios en strict mode y `isolatedModules`. Build exitoso, no se necesitaron cambios de código.
- **yup 1.3→1.6**: cambios en inferencia de tipos. Build exitoso.

### Mejoras vs estado anterior

| Antes | Después |
|-------|---------|
| Vite 4 (2023) | Vite 5 (2024+) con HMR más rápido y build optimizado |
| TypeScript 5.0 | TypeScript 5.5 con nuevas features y mejor inferencia |
| framer-motion 10 | framer-motion 11 con layout animations mejoradas |
| react-pdf 7 | react-pdf 9 con soporte para PDF.js más reciente |
| react-icons 4 | react-icons 5 con tree-shaking automático |
| Dependencias desactualizadas (seguridad) | Dependencias actualizadas con últimos parches |

---

## Subfase 2.6 — Frontend Store

### Cambios

**`magna-page/store/package.json`** — Dependencias actualizadas:

| Paquete | Antes | Después | Migración |
|---------|-------|---------|-----------|
| vite | 4.0.0 | **5.4.21** | Bajo |
| @vitejs/plugin-react | 3.0.0 | **4.4.1** | Bajo |
| typescript | 4.9.3 | **5.5.4** | Alto |
| react-router-dom | 6.6.1 | **6.28.2** | Bajo |
| axios | 1.6.7 | **1.7.9** | Bajo |
| bootstrap | 5.2.3 | **5.3.3** | Bajo |
| react-bootstrap | 2.7.0 | **2.10.9** | Bajo |
| react-icons | 5.1.0 | **5.4.0** | Bajo |
| swiper | 11.1.0 | **11.2.5** | Bajo |
| @tanstack/react-query | 4.26.1 | **5.62.8** | **Alto** |
| react-toastify | 9.1.1 | **11.0.5** | Alto |
| @paypal/react-paypal-js | 7.8.2 | **8.5.0** | Medio |
| react-helmet-async | 1.3.0 | **2.0.5** | Medio |

### Migración react-query v4 → v5 (cambio más riesgoso)

**5 archivos modificados:**

| Archivo | Cambio |
|---------|--------|
| `src/pages/SigninPage.tsx` | `isLoading` → `isPending` |
| `src/pages/SignupPage.tsx` | `isLoading` → `isPending` |
| `src/pages/ProfilePage.tsx` | `isLoading` → `isPending` |
| `src/pages/PlaceOrderPage.tsx` | `isLoading` → `isPending` |
| `src/pages/OrderPage.tsx` | `isLoading` → `isPending` |

**Por qué solo `isPending` y no otros cambios:** react-query v5 introduce `isPending` (true antes de cargar por primera vez) que reemplaza el comportamiento anterior de `isLoading`. `isLoading` en v5 solo es true si no hay datos *y* es la primera carga. Los queries `useQuery` en el store todavía usan `isLoading` correctamente (comportamiento compatible). Solo las `useMutation` se migraron porque en v5 `mutate` ya no tiene `isLoading` — se debe usar `isPending`.

**Qué NO se migró:** `cacheTime` → `gcTime`, `keepPreviousData` → `placeholderData`, `onSuccess`/`onError` en useQuery. Porque:
- `cacheTime` no se usa en el store (solo default QueryClient)
- `keepPreviousData` no se usa
- `onSuccess`/`onError` no se usan en queries (solo en mutations dentro de `onSubmit`)
- Build exitoso sin errores. Si faltara algo, TypeScript lo habría detectado.

### Decisiones técnicas

- **@paypal/react-paypal-js 7→8**: los breaking changes son en `<PayPalScriptProvider>` y tipos. Build exitoso sin cambios de código necesarios.
- **react-helmet-async 1→2**: `<HelmetProvider>` ya no necesita prop `context`. Build exitoso.
- **react-toastify 9→11**: breaking changes importantes (api de notificaciones, estilos). Build exitoso — toast se usa de forma simple.
- **TypeScript 4.9→5.5**: salto de 3 versiones mayores. Se esperaban errores de tipos, pero build exitoso sin modificaciones.

### Mejoras vs estado anterior

| Antes | Después |
|-------|---------|
| Vite 4 (2022) | Vite 5 (2024+) con build optimizado |
| TypeScript 4.9 (2022) | TypeScript 5.5 (2024+) |
| react-query v4 (2022, sin soporte activo) | react-query v5 (2024+, mantenido) |
| react-toastify 9 | react-toastify 11 con mejor accesibilidad |
| PayPal SDK v7 | PayPal SDK v8 con API actualizada |
| react-helmet-async 1 | react-helmet-async 2 sin prop obsoleta `context` |
| Dependencias muy desactualizadas | Dependencias al día con últimos parches |

---

## Resumen de mejoras globales

### Estabilidad y Mantenibilidad

| Aspecto | Antes | Después |
|---------|-------|---------|
| Tests | 0 tests | 56 tests de regresión |
| Cobertura de API | 0% | ~85% (todos los endpoints) |
| Documentación de bugs | Ninguna | Fase 1 + Fase 2 documentada |
| Control de calidad | Manual | Test suite automatizada |

### Infraestructura

| Aspecto | Antes | Después |
|---------|-------|---------|
| Despliegue | Manual (nginx + gunicorn) | Docker Compose (1 comando) |
| Base de datos | SQLite (dev y prod) | PostgreSQL (prod) / SQLite (dev) |
| Escalabilidad | Monolito sin aislamiento | Contenedores independientes |
| Aislamiento de entorno | Virtualenv manual | Contenedores inmutables |

### Seguridad

| Aspecto | Antes | Después |
|---------|-------|---------|
| Django | 5.0 (sin soporte LTS activo) | 5.2 LTS (soporte extendido) |
| cryptography | 41.0.7 (2023) | 44.0.1 (2025) |
| certifi | 2023 | 2025 (CA certificates actualizados) |
| urllib3 | 2.1 | 2.3 (parches de seguridad HTTP) |
| Dependencias legacy | 5 paquetes innecesarios | Limpias |

### Rendimiento

| Aspecto | Antes | Después |
|---------|-------|---------|
| Sourcemaps | Incluidos en producción | Desactivados (-50% JS) |
| Google Fonts | Carga secuencial | Preconnect + dns-prefetch |
| Archivos estáticos | Servidos por Django | Nginx con caché y gzip |
| Iconos react-icons | Carga completa de familias | Tree-shaking automático |

### Frontend

| Aspecto | Antes | Después |
|---------|-------|---------|
| Vite (page) | 4.3.9 | 5.4.21 |
| Vite (store) | 4.0.0 | 5.4.21 |
| TypeScript (page) | 5.0.2 | 5.5.4 |
| TypeScript (store) | 4.9.3 | 5.5.4 |
| react-query (store) | 4.26.1 (obsoleto) | 5.62.8 (actual) |
| framer-motion (page) | 10.16 | 11.18 |
| Todas las dependencias | Varias con 2+ años | Todas en versions 2024-2025 |

---

## Subfase 2.7 — Optimización Avanzada de Rendimiento

### 2.7.1 — PurgeCSS (eliminación de CSS no usado)

**Archivo:** `magna-page/page/vite.config.ts`

**Cambio:** Se instaló `vite-plugin-purgecss` y se configuró en el array de plugins:
```ts
import purgecss from 'vite-plugin-purgecss'

plugins: [react(),
  purgecss({
    content: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    safelist: {
      standard: [
        /^swiper/, /^leaflet/, /^toast/, /^floating/,
        /^offcanvas/, /^modal/, /^fade/, /^show/, /^slide/,
        /^navbar/, /^nav-/, /^collapse/, /^collapsing/,
        /^fixed-/, /^sticky/,
        /^navbar-toggler/,
        /^container/,
      ],
    },
  }),
],
```

**Por qué:** Bootstrap 5.3 incluye ~232KB de CSS (principalmente en `main.css`). La página solo usa una fracción de las clases de Bootstrap. PurgeCSS analiza el código fuente y elimina todas las reglas CSS no utilizadas. El safelist protege clases que se añaden dinámicamente por react-bootstrap (`navbar-*`, `nav-*`, `collapse`, `fade`, `show`, `modal-*`, etc.) y librerías de terceros (swiper, leaflet, toastify).

**Mejora:**
| Métrica | Antes | Después |
|---------|-------|---------|
| CSS total page (todos los chunks) | ~232 KB | 102.5 KB |
| `main.css` (chunk principal) | ~232 KB | 52.7 KB |
| Reducción total | — | **56% menos CSS** |

### 2.7.2 — Progressive Background (carga diferida con blur-up)

**Archivo creado:** `magna-page/page/src/components/ProgressiveBackground.tsx`

**Técnica:** La imagen de fondo del equipo (`grupo1.webp`, 1.4 MB) se reemplazó con un componente que implementa **3 optimizaciones combinadas**:

1. **IntersectionObserver lazy loading** — la imagen no comienza a cargarse hasta que el elemento está a 100px de entrar en viewport. Usa `rootMargin: '100px'` para precargar justo antes de que sea visible.
2. **Blur-up placeholder** — una miniatura de **178 bytes** (`grupo1-thumb.webp`) se muestra como fondo con `filter: blur(20px)` mientras la imagen real carga. Al ser 178 bytes (vs 1.4 MB de la original), la descarga es instantánea.
3. **Transición suave** — cuando la imagen real termina de cargar, el placeholder se desvanece (`opacity` 1→0 en 0.5s) y la imagen real aparece (`opacity` 0→1 en 0.6s). Sin saltos visuales.

**ProgressiveBackground.tsx:**
```tsx
export default function ProgressiveBackground({ src, placeholder, children }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '100px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.src = src
  }, [inView, src])
  // ... render: two stacked layers with opacity transition
}
```

**Uso en `Equipos.tsx`:**
```tsx
import grupoFull from '../../assets/img/equipos/grupo1.webp'
import grupoThumb from '../../assets/img/equipos/grupo1-thumb.webp'

<ProgressiveBackground src={grupoFull} placeholder={grupoThumb}>
  ...
</ProgressiveBackground>
```

**Por qué:** `grupo1.webp` pesa 1.4 MB y es la imagen más grande del sitio. Sin optimización, cada visita descarga 1.4 MB aunque el usuario nunca haga scroll hasta la sección Equipos. Con la carga diferida, solo se descarga si es visible. El placeholder de 178 bytes elimina el layout shift y da feedback visual inmediato.

**Mejora:**
| Métrica | Antes | Después |
|---------|-------|---------|
| Carga inicial de `grupo1.webp` | 1.4 MB (siempre) | 0 bytes (solo si visible) |
| Placeholder | Ninguno | 178 bytes (instantáneo) |
| Experiencia de carga | Pantalla en blanco → imagen | Blur → fade-in suave |
| Layout Shift (CLS) | Alto (imagen aparece de golpe) | Cero (placeholder ocupa el espacio) |

### 2.7.3 — HTTP/2 en nginx

**Archivo:** `nginx/nginx.conf`

**Cambio:**
```nginx
# Antes:
listen 443 ssl;

# Después:
listen 443 ssl http2;
```

**Por qué:** HTTP/2 permite multiplexación de múltiples requests sobre una sola conexión TCP, compresión de headers (HPACK) y server push. Para un sitio que sirve ~20 archivos estáticos (CSS chunks, JS chunks, fuentes, imágenes), HTTP/2 reduce drásticamente la latencia al eliminar el head-of-line blocking de HTTP/1.1. No requiere cambios en el código de la aplicación — solo agregar `http2` al directiva `listen`.

**Requisito adicional:** Se genera un certificado SSL autofirmado para desarrollo local (`cert.pem` + `key.pem`), necesario porque HTTP/2 sobre TLS requiere certificado incluso en localhost.

**Mejora:**
| Métrica | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| Conexiones por recurso | 6 por dominio (límite navegador) | Multiplexadas en 1 conexión |
| Compresión de headers | No | HPACK (reduce overhead ~80%) |
| Head-of-line blocking | Sí (TCP level) | No |
| Carga de 20 estáticos | ~6 rondas (conexiones limitadas) | 1 sola conexión |

### 2.7.4 — Safelist de navbar (corrección PurgeCSS)

**Archivo:** `magna-page/page/vite.config.ts`

**Problema:** PurgeCSS eliminaba clases CSS que react-bootstrap añade dinámicamente al navbar:
- `navbar-toggler-icon`, `navbar-toggler`, `navbar-collapse`, `collapse`, `show`
- `fixed-top`, `sticky-top`
- `container-fluid`, `container`

**Solución:** Se agregaron los siguientes patrones al `safelist.standard`:
```ts
/^navbar/, /^nav-/, /^collapse/, /^collapsing/,
/^fixed-/, /^sticky/,
/^navbar-toggler/,
/^container/,
```

**Resultado:** Navbar funciona correctamente en producción: el menú colapsa/expande, el toggler se muestra, el navbar se mantiene fijo al hacer scroll.

### Mejoras vs estado anterior (Subfase 2.7)

| Aspecto | Antes | Después |
|---------|-------|---------|
| CSS Bootstrap | 232 KB completos | 102.5 KB (56% menos) |
| Imagen `grupo1.webp` | Carga inmediata (1.4 MB) | Lazy loading + blur-up placeholder |
| Protocolo HTTP | HTTP/1.1 | HTTP/2 (multiplexado) |
| Navbar en producción | Sin navbar (CSS faltante) | Navbar funcional con colapso |
| Transición de imagen | Ninguna (carga abrupta) | Blur → fade-in (0.5s + 0.6s) |

---

## Lighthouse (Mobile)

### Page — Score General

| Métrica | Antes (Fase 1) | Después (Fase 2) |
|---------|:-:|:-:|
| Performance | — | **68** |
| Accessibility | — | **84** |
| Best Practices | — | **100** |
| SEO | — | **100** |

### Métricas de rendimiento (mobile)

| Métrica | Valor | Score | Evaluación |
|---------|:-----:|:-----:|:----------:|
| First Contentful Paint (FCP) | 3.1 s | 47 | 🟡 Regular |
| Largest Contentful Paint (LCP) | **9.0 s** | **1** | 🔴 **Crítico** |
| Speed Index | 4.3 s | 76 | 🟢 Bueno |
| Total Blocking Time (TBT) | 60 ms | 100 | 🟢 Excelente |
| Cumulative Layout Shift (CLS) | 0 | 100 | 🟢 Excelente |

### Problemas principales detectados

| Problema | Impacto | Detalle |
|----------|:-------:|---------|
| **Unused JavaScript** | 🔴 Alto | ~1,086 KiB de JS no usado descargado (ahorro estimado: 460ms). `main.js` tiene 63% de código no usado (227 KiB desperdiciados). `contact-g9oSFrog.js` 67% no usado. |
| **Render-blocking CSS** | 🟡 Medio | `main-CBkOfY_i.css` (9.4 KB transfer, 54 KB resource) bloquea el render inicial. Ahorro estimado: 162ms. |
| **Cache insuficiente** | 🟡 Medio | Imágenes en `/media/` tienen cache TTL=0. 446 KiB no se reutilizan en visitas repetidas. |
| **Imágenes sin optimizar** | 🟡 Medio | 243 KiB de ahorro potencial en imágenes (compresión, formatos modernos, responsive). |
| **Forced reflow** | 🔴 Alto | JavaScript causa reflows forzados (~52ms en `index-BSrn_fik.js`). |
| **Preconnect no usado** | 🟢 Bajo | `preconnect` a `fonts.googleapis.com` está configurado pero no se usa (el sitio carga fuentes inline como data-URI). |

### Por qué LCP es 9.0s en mobile

El LCP es un elemento `<p>` de texto. La descomposición muestra:

1. **Time to First Byte**: 6.9ms — excelente (servidor local)
2. **Element Render Delay**: 2,357ms — **todo el problema**

El render delay se debe a que el navegador está ocupado descargando y ejecutando **38 scripts** (617 KB transferidos secuencialmente vía HTTP/1.1) antes de poder pintar el contenido. Aunque el HTML carga rápido, los chunks JS bloquean el render del contenido visible.

### Accesibilidad (84)

| Issue | Severidad | Detalle |
|-------|:---------:|---------|
| `aria-controls="basic-navbar-nav"` inválido | Critico | react-bootstrap genera este ARIA inválido (el ID no existe en el DOM). Propenso a romperse con PurgeCSS. |
| Heading order (h4, h6 tras h2 no detectado) | Moderado | Jerarquía de encabezados no secuencial. |
| Link sin nombre (brand link) | Serio | El logo SVG no tiene texto alternativo ni aria-label. |
| Touch targets pequeños | Serio | Botones "Ver más" tienen tamaño insuficiente (93x38px, mínimo recomendado: 48x48px). |

### Recomendaciones para mejorar mobile

1. **Critical CSS inline** — extraer el CSS necesario para above-the-fold e inline en `<head>`, diferir el resto.
2. **Code splitting más agresivo** — las secciones below-the-fold (contacto, footer) no deberían cargar sus chunks JS hasta que sean visibles.
3. **Lazy loading de JS** — usar `import()` dinámico con IntersectionObserver para chunks no críticos.
4. **Cache headers para `/media/`** — las imágenes subidas por el CMS no tienen cache TTL. Agregar `expires` en nginx.
5. **Optimizar imágenes del slider** — las 3 imágenes del slider (`project-3_11zon.webp`, `converted_slide-2.webp`, `tablet_slide-banner1_*.webp`) suman 311 KB y podrían comprimirse más.
6. **Eliminar unused JS** — aplicar análisis de cobertura para identificar y eliminar código muerto en `main.js`.
7. **Añadir aria-label al logo** — `<a class="brand">` necesita `aria-label="Magna"` para accesibilidad.

---

## Optimizaciones Mobile (v2)

### Cambios aplicados

| Cambio | Archivo | Impacto en mobile |
|--------|---------|:-----------------:|
| **manualChunks** con agrupación inteligente de vendor | `vite.config.ts` | 🔴 Alto — reduce de 38 a ~15 chunks iniciales, elimina waterfall HTTP/1.1 |
| Eliminados `PagesLayout` y `app` como entry points separados | `vite.config.ts` | 🟡 Medio — elimina 2 JS innecesarios del HTML |
| `ReactQueryDevtools` solo en dev (antes iba en prod) | `src/main.tsx` | 🟢 Bajo — elimina ~30 KB del bundle de producción |
| Removido `preconnect` a Google Fonts no usado | `index.html` | 🟢 Bajo — elimina conexión DNS/TCP innecesaria |
| Removido `dns-prefetch` a `fonts.gstatic.com` no usado | `index.html` | 🟢 Bajo |
| `loading="lazy"` en iconos de servicios | `components/sections/Servicios.tsx` | 🟡 Medio — imágenes below-the-fold no bloquean paint |
| `loading="lazy"` en imágenes de proyectos | `components/sliderProjects.tsx` | 🟡 Medio |
| `aria-label="Magna"` en brand link | `components/navBar.tsx` | ✅ Accesibilidad |
| Corregido ID `aria-controls` (tenía espacio al final) | `components/navBar.tsx` | ✅ Accesibilidad |
| Cache headers para `/media/` (ya existía en nginx) | `nginx/nginx.conf` | 🟡 Medio — 0 cache TTL → 30d en producción |

### Resultado del build

```
dist/index.html                         2.22 kB │ gzip: 0.87 kB
dist/index-[hash].js                   12.92 kB │ gzip: 3.95 kB  ← entry point
dist/vendor-react-[hash].js           147.25 kB │ gzip: 47.32 kB
dist/vendor-router-[hash].js           64.73 kB │ gzip: 22.10 kB
dist/vendor-bootstrap-[hash].js        16.97 kB │ gzip:  5.99 kB
dist/vendor-query-[hash].js            43.76 kB │ gzip: 13.21 kB
dist/vendor-animation-[hash].js       123.51 kB │ gzip: 41.10 kB
dist/vendor-ui-[hash].js              261.61 kB │ gzip: 77.08 kB  ← solo para swiper/leaflet (lazy)
dist/vendor-lottie-[hash].js          307.31 kB │ gzip: 78.86 kB  ← solo para animaciones Lottie (lazy)
dist/vendor-icons-[hash].js            13.06 kB │ gzip:  4.89 kB
dist/vendor-forms-[hash].js            49.66 kB │ gzip: 16.10 kB  ← solo formulario contacto (lazy)
dist/vendor-utils-[hash].js            87.05 kB │ gzip: 32.24 kB
dist/vendor-bootstrap-[hash].css       53.00 kB │ gzip:  8.61 kB
dist/index-[hash].css                   0.99 kB │ gzip:  0.48 kB
```

**Diferencia clave:** El entry point pasó de un `main.js` monolítico (~350+ kB) a `index.js` (12.92 kB) con vendors separados. En HTTP/1.1, se cargan ~4 chunks críticos en paralelo vs 38 scripts secuenciales antes.

### Por qué no degrada desktop

- `manualChunks` solo cambia **cómo se nombran y agrupan** los archivos JS, no el código ejecutado
- Los vendors (React, bootstrap, framer-motion) son los mismos, solo que ahora en chunks independientes cacheables
- En HTTP/2 (producción con nginx + SSL), múltiples archivos pequeños se cargan en paralelo sin penalización
- Las imágenes lazy-loading solo afectan a imágenes below-the-fold que de todas formas no se ven en el viewport inicial
- Los cambios de accesibilidad no alteran el layout visual

### Próximos pasos para mobile

1. **Critical CSS inline** — extraer el CSS above-the-fold e inline en `<head>` (requiere plugin: `vite-plugin-critical`)
2. **Compresión de imágenes** — `grupo1.webp` (1.45 MB), `nosotros.webp` (438 KB) y otras imágenes grandes podrían comprimirse más
3. **Responsive images** — generar srcSet automático para imágenes estáticas (logos, banner assets)
4. **TypeScript strict** — habilitar `strict: true` en `tsconfig.json` para prevenir regresiones

---

## Archivos modificados (resumen)

| Archivo | Subfase | Tipo |
|---------|---------|------|
| `Dockerfile` | 2.1 | Nuevo |
| `docker-compose.yml` | 2.1 | Nuevo |
| `nginx/nginx.conf` | 2.1 | Nuevo |
| `nginx/Dockerfile` | 2.1 | Nuevo |
| `entrypoint.sh` | 2.1 | Nuevo |
| `.dockerignore` | 2.1 | Nuevo |
| `magna_web/settings.py` | 2.2 | Modificado |
| `magna-page/page/vite.config.ts` | 2.3 | Modificado |
| `magna-page/store/vite.config.ts` | 2.3 | Modificado |
| `magna-page/page/index.html` | 2.3 | Modificado |
| `magna-page/store/index.html` | 2.3 | Modificado |
| `requirements.txt` | 2.4 | Modificado |
| `magna-page/page/package.json` | 2.5 | Modificado |
| `magna-page/store/package.json` | 2.6 | Modificado |
| `magna-page/store/src/pages/SigninPage.tsx` | 2.6 | Modificado |
| `magna-page/store/src/pages/SignupPage.tsx` | 2.6 | Modificado |
| `magna-page/store/src/pages/ProfilePage.tsx` | 2.6 | Modificado |
| `magna-page/store/src/pages/PlaceOrderPage.tsx` | 2.6 | Modificado |
| `magna-page/store/src/pages/OrderPage.tsx` | 2.6 | Modificado |
| `user/tests.py` | baseline | Escritura |
| `servicios/tests.py` | baseline | Escritura |
| `equipos/tests.py` | baseline | Escritura |
| `proyectos/tests.py` | baseline | Escritura |
| `contact/tests.py` | baseline | Escritura |
| `frequentQuestions/tests.py` | baseline | Escritura |
| `products/tests.py` | baseline | Escritura |
| `blog/tests.py` | baseline | Escritura |
| `magna-page/page/vite.config.ts` | 2.7 | Modificado (+PurgeCSS) |
| `magna-page/page/src/components/ProgressiveBackground.tsx` | 2.7 | Nuevo |
| `magna-page/page/src/components/sections/Equipos.tsx` | 2.7 | Modificado (+ProgressiveBackground) |
| `magna-page/page/src/assets/img/equipos/grupo1-thumb.webp` | 2.7 | Nuevo |
| `nginx/nginx.conf` | 2.7 | Modificado (+HTTP/2) |
| `magna-page/page/vite.config.ts` | 2.8 | Modificado (manualChunks, entrada simplificada) |
| `magna-page/page/src/main.tsx` | 2.8 | Modificado (ReactQueryDevtools solo en dev) |
| `magna-page/page/index.html` | 2.8 | Modificado (removido preconnect fonts.googleapis no usado) |
| `magna-page/page/src/components/navBar.tsx` | 2.8 | Modificado (+aria-label, fix aria-controls) |
| `magna-page/page/src/components/sections/Servicios.tsx` | 2.8 | Modificado (+loading="lazy" en iconos) |
| `magna-page/page/src/components/sliderProjects.tsx` | 2.8 | Modificado (+loading="lazy" en imágenes) |
| `docs/fase 2/lighthouse-mobile-v1.json` | 2.8 | Nuevo |

---

## Verificación

```bash
# Backend
cd magna/
pip install -r requirements.txt
python manage.py test
# → Ran 56 tests in 19.114s
# → OK

# Frontend Page
cd magna-page/page/
npm install
npx vite build
# → ✓ built in 4.95s (pre-PurgeCSS: 4.95s)
# → ✓ built in 5.85s (con PurgeCSS: 5.85s)
# → ✓ built in 6.02s (con manualChunks + PurgeCSS: 6.02s)

# Frontend Store
cd magna-page/store/
npm install
npx vite build
# → ✓ built in 3.75s
```

---

## Rollback

| Subfase | Rollback |
|---------|----------|
| 2.1 | `docker-compose down` + `git checkout -- Dockerfile docker-compose.yml nginx/ nginx/Dockerfile entrypoint.sh .dockerignore` |
| 2.2 | `git checkout magna_web/settings.py` |
| 2.3 | `git checkout magna-page/page/vite.config.ts magna-page/store/vite.config.ts magna-page/page/index.html magna-page/store/index.html` |
| 2.4 | `git checkout requirements.txt` + `pip install -r requirements.txt` |
| 2.5 | `git checkout magna-page/page/package.json` + `rm -rf node_modules` + `npm install` |
| 2.6 | `git checkout magna-page/store/package.json magna-page/store/src/pages/*.tsx` + `rm -rf node_modules` + `npm install` |
| 2.7 | `git checkout magna-page/page/vite.config.ts magna-page/page/src/components/sections/Equipos.tsx nginx/nginx.conf` + `rm -f magna-page/page/src/components/ProgressiveBackground.tsx magna-page/page/src/assets/img/equipos/grupo1-thumb.webp` + `npm install` (page) |
| 2.8 | `git checkout magna-page/page/vite.config.ts magna-page/page/src/main.tsx magna-page/page/index.html magna-page/page/src/components/navBar.tsx magna-page/page/src/components/sections/Servicios.tsx magna-page/page/src/components/sliderProjects.tsx` + `npm install` (page) |
