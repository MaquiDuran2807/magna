# Fase 1: Eliminar SSG/prerender — Restaurar SPA puro

## Resumen

Se eliminó por completo el sistema de prerenderizado SSG (Static Site Generation) y se restauró el modelo SPA clásico donde Django sirve el `index.page.html` del build de Vite directamente mediante un `TemplateView`, sin lógica de prerendered ni rutas SSG.

## ¿Por qué?

El SSG/prerender agregaba complej innecesaria:
- `indexView` personalizado con lógica de búsqueda de HTML prerendered
- Ruta `/ssg/` para desarrollo
- Scripts `prerender.mjs` y `test-prerender.mjs` con Puppeteer
- Dependencia de `puppeteer` en producción solo para prerender
- Tests que mockeaban el sistema de archivos para validar prerendered

Con SPA puro, React Router maneja todo el renderizado client-side y las APIs se consumen via fetch, simplificando drasticamente el stack.

## Archivos modificados (Fase 1 — SSG)

| Archivo | Cambio |
|---|---|
| `magna_web/urls.py` | `indexView` → `TemplateView` simple; eliminada ruta `/ssg/`; catch-all simplificado a `^(?!media/|admin/).*$` |
| `magna-page/unified/package.json` | Eliminado script `build:ssg` |
| `docs/seo/prerender-scripts/prerender.mjs` | Archivado (movido desde `magna-page/unified/`) |
| `docs/seo/prerender-scripts/test-prerender.mjs` | Archivado (movido desde `magna-page/unified/`) |
| `magna_web/tests/test_seo_views.py` | Tests actualizados: eliminados 4 tests de prerender, agregados 2 tests nuevos (SSG route falls to SPA, media no interceptada) |

## Líneas modificadas/eliminadas

```
 magna-page/unified/package.json       |   1 -
 magna-page/unified/prerender.mjs      | 214 ----------------------------------
 magna-page/unified/test-prerender.mjs |  92 ---------------
 magna_web/tests/test_seo_views.py     |  86 +++-----------
 magna_web/urls.py                     |  26 +----
 5 files changed, 21 insertions(+), 398 deletions(-)
```

- **398 líneas eliminadas**, 21 agregadas
- 2 archivos archivados (prerender.mjs, test-prerender.mjs)
- 2 scripts removidos del package.json

## Build

- `npm run build` exitoso en 8.41s
- `dist/` pesa ~5.1 MB (125 archivos)
- Sin directorio `prerendered/` en el build
- `puppeteer` y `sharp` siguen en devDependencies pero ya no se usan en build

## Tests

- **71 tests, 0 fallos** (antes: 71 tests, 4 fallos por tests de prerender obsoletos)
- Tests de SEO actualizados para reflejar el comportamiento SPA puro
- Suite completa ejecutada en 3.76s

## Verificación manual (SPA)

| Ruta | Status | Contenido |
|---|---|---|
| `/` | 200 | SPA HTML (index.page.html) |
| `/servicios/topografia` | 200 | SPA HTML (React Router client-side) |
| `/api/` | 200 | API response |
| `/admin/` | Admin (no SPA) | Catch-all no intercepta admin |
| `/ssg/` | 200 (SPA) | Ruta SSG ya no existe; cae al catch-all |

## Impacto

- **Stack simplificado**: eliminada dependencia de prerender + Puppeteer en el flujo de build
- **Sin cambios en API**: todas las rutas de API siguen funcionando
- **Sin cambios en frontend**: el bundle de Vite es idéntico (solo se eliminó el script `build:ssg`)
- **Development**: `npm run dev` sigue funcionando (no se modificó)
- **Production**: Django sirve el mismo `index.page.html`; nginx no requiere cambios

---

# Sesión de Restauración Completa (30–31 Julio 2026)

> Trabajo adicional en la misma sesión para restaurar funcionalidades perdidas en la fusión de ramas (SEO-SSG) y devolver el sitio a un estado totalmente operativo, equivalente al de producción.

## Contexto

La rama de trabajo (`seo-ssg/fase-05-tests`) tenía pérdidas de código respecto a `deploy/julio-2026`:
- App `about/` eliminada (solo quedaban `__pycache__/` y `migrations/`)
- App `contact/` con envío de correos eliminado
- Slide sin registro en admin
- Modelos sin generación de variantes de imagen
- Archivos multimedia faltantes en disco
- Página `/politica-de-datos` como placeholder vacío
- CSS purgado incorrectamente por PurgeCSS

## Tiempos estimados por tarea

| # | Tarea | Tiempo estimado |
|---|-------|-----------------|
| 1 | Fase 1 — Eliminar SSG/restaurar SPA | 45 min |
| 2 | Slides: registro en admin + generación de variantes + srcSet/sizes | 30 min |
| 3 | Restauración app `about/` completa + ruta + INSTALLED_APPS | 25 min |
| 4 | Diagnóstico y restauración de media files desde producción | 50 min |
| 5 | Fix error 500 en `/equipos/` (height_field/width_field + migration) | 15 min |
| 6 | Sección `about-destacado` + PurgeCSS (mover CSS a `aboutUs.css`) | 35 min |
| 7 | Componente compartido `InfoCard` (destacado + valores unificados) | 20 min |
| 8 | Fix logo en tarjetas de equipo (especificidad CSS z-index) | 20 min |
| 9 | Restauración envío de correos de contacto + SMTP + template email | 40 min |
| 10 | Restauración página `/politica-de-datos` + checkbox consentimiento | 25 min |
| 11 | Blog images (24 SVGs placeholder) | 10 min |
| 12 | Debug SMTP (load_dotenv ruta absoluta, limpiar __pycache__) | 30 min |
| | **TOTAL** | **~5.8 horas** |

## Detalle de trabajos realizados

### 2. Slides — Admin + Variantes de imagen + srcSet

| Archivo | Cambio |
|---|---|
| `servicios/admin.py` | Registrado `SlideAdmin` (list_display: nombre, orden, activo, created_at; list_editable: orden, activo) |
| `servicios/models.py` | Agregado `Slide.save()` que genera `imagen_tablet` (75%) e `imagen_celular` (50%) en WebP quality 90 |
| `slider.tsx` | Corregido `srcSet`/`sizes` → `sizes="100vw"` (antes usaba 280px/736px/1024px que causaban imágenes borrosas) |

### 3. Restauración app `about/`

La app existía solo como migraciones y `__pycache__`. Restaurados todos los archivos desde `deploy/julio-2026`:
- `models.py` (About, Valor), `admin.py` (AboutAdmin con ValorInline), `views.py` (AboutDetail), `serializer.py` (AboutSerializer), `urls.py`, `apps.py`
- Agregado `'about'` a `INSTALLED_APPS` y ruta `path('about/', include('about.urls'))` en `urls.py`

**Resultado:** `/about/` devuelve 200 con descripción, misión, visión y 8 valores.

### 4. Restauración de media files desde producción

Archivos faltantes en disco pero referenciados en BD, copiados desde el servidor de producción (solo lectura, sin tocar nada en prod):

| Directorio | Archivos restaurados |
|---|---|
| `media/equipos/` | `juan_edited.webp`, `Gemini_Generated_Image_dvl1aidvl1aidvl1.webp`, `Paula3.webp`, `Juana.webp`, `ceo_AJY5IlY.webp` |
| `media/tecnologias/` | 13 archivos `.webp` (creados desde `.png` de producción) |
| `media/servicios/` | `1f20bce4-38e4-4545-8542-46026263da42.webp` |
| `media/slides/` | Imagen desktop del slide activo |

### 5. Fix error 500 en `/equipos/`

**Causa:** `ImageField` con `height_field`/`width_field` intentaba abrir `juan_edited.webp` (no existía) en el `post_init` → `FileNotFoundError`.

**Fix:** Eliminados `height_field`/`width_field` de `Equipo.imagen` y `Tenologias.imagen` + migration `equipos/0002_alter_*`. El endpoint pasa de 500 a 200.

### 6. Sección `about-destacado`

Componente `AboutDestacado` en `AboutContent.tsx` con 4 tarjetas (Tecnología de vanguardia, Información confiable, Acompañamiento técnico, Altos estándares de calidad).

**Problema PurgeCSS:** los estilos se eliminaban del build. Solución: mover el CSS a `aboutUs.css` (que sí sobrevive) en lugar de `aboutContent.css`.

### 7. Componente compartido `InfoCard`

Creado `InfoCard.tsx` que recibe `icon`, `title`, `description`. Usado tanto en destacado como en valores → iconos de 64px unificados, mismo estilo de tarjeta, sin duplicación de código.

### 8. Fix logo en tarjetas de equipo

**Causa raíz:** `.workers-equip img` (especificidad 0,1,1) pisaba `z-index: 2` de `.logo-1` (0,1,0) → el logo quedaba oculto bajo la imagen.

**Fix:** Selector `.equip-1 .logo-1, .workers-equip .logo-1` (0,2,0) + `position: relative` en `.equip-1` + `top: 8px; right: 8px; width: 50px; z-index: 2`.

### 9. Envío de correos de contacto

Restaurado desde `deploy/julio-2026`:
- `contact/views.py`: `_enviar_notificacion()` con `EmailMultiAlternatives` + `render_to_string`
- `contact/templates/contact/email_notification.html`: template corporativo completo (azul #163E73)
- `contact/views.py`: incluye `consentimiento_datos` en el contexto del template → el correo muestra "✓ Aceptó la política de tratamiento de datos personales"
- `magna_web/settings.py`: SMTP real desde `.env` (Gmail) con fallback a consola

**SMTP:**
```
EMAIL_HOST=smtp.gmail.com, EMAIL_PORT=587, EMAIL_USE_TLS=True
EMAIL_HOST_USER=infoventas8080@gmail.com
CONTACT_NOTIFICATION_EMAIL=info@magnaingenieriaytopografia.com
```
- Destinatario TO: `info@magnaingenieriaytopografia.com`
- BCC: `infoventas8080@gmail.com`

**Debug del problema "el correo sale en consola":** causado por `load_dotenv()` sin ruta absoluta + `__pycache__` con settings viejas. Fix: `load_dotenv(Path(__file__).resolve().parent.parent / '.env')` + limpiar `__pycache__`.

### 10. Página `/politica-de-datos` + consentimiento

Restaurados desde commit `753a7be`:
- `politicaDatos.tsx`: página completa con SEO, secciones legales (Ley 1581/2012, derechos del titular, procedimiento, vigencia)
- `politicaDatos.css`: estilos con safelist `/^politica-/` en PurgeCSS
- Formulario de contacto: checkbox "Acepto la política de tratamiento de datos" con enlace y validación Yup (`oneOf([true])`)

### 11. Blog images

Creados 24 SVGs placeholder (`seed_blog_00.svg`–`seed_blog_23.svg`) en `media/blog_images/` para los posts de seed data. Antes daban 404.

## Estado final (sesión completa)

| Endpoint | Estado |
|---|---|
| `/` (SPA) | 200 |
| `/about/` | 200 (descripción, misión, visión, 8 valores) |
| `/equipos/` | 200 (antes 500) |
| `/contact/` POST | 201 + email SMTP con consentimiento |
| `/media/equipos/*` | 200 (imágenes restauradas) |
| `/media/tecnologias/*` | 200 (imágenes restauradas) |
| `/media/blog_images/seed_blog_*.svg` | 200 |
| `/politica-de-datos` | Restaurada |
| Slide admin | Registrado y editable |
