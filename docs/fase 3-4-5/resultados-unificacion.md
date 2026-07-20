# Resultados de Unificación de Frontends (Fase 3+4+5)

> **Fecha:** 14/07/2026
> **Rama:** `feature/unified-frontend`
> **Commits:** `d240947` (unificación inicial), más parches posteriores

---

## 1. Resumen

Se unificaron los dos proyectos Vite/React separados (`magna-page/page/` y `magna-page/store/`) en un solo proyecto con múltiples entry points, compartiendo build, dependencias y componentes.

**Tiempo total estimado:** ~8 horas (Día 1-3 del plan)
**Tiempo real:** ~6 horas (incluyendo correcciones post-build)

---

## 2. Cambios realizados

### 2.1 Estructura de proyecto

| Antes | Después |
|-------|---------|
| `magna-page/page/` (Vite project) | `magna-page/unified/src/page/` |
| `magna-page/store/` (Vite project) | `magna-page/unified/src/store-pages/` |
| — | `magna-page/unified/src/shared/` |
| — | `magna-page/unified/src/auth/` |
| — | `magna-page/unified/src/store/` |

### 2.2 Archivos modificados (sesión actual)

| Archivo | Cambio |
|---------|--------|
| `magna-page/unified/index.page.html` | Ruta relativa `./src/page/main.tsx` |
| `magna-page/unified/index.store.html` | Ruta relativa `./src/store-pages/main.tsx` |
| `magna-page/unified/src/page/components/tarjetaEquipo.tsx` | `arriba`/`abajo` condicionales según tipo |
| `magna-page/page/src/components/tarjetaEquipo.tsx` | mismo fix (backup) |
| `magna-page/unified/src/page/components/styles/equipos.css` | `:not(.logo-1)` + `height: auto` |
| `magna_web/settings/base.py` | `STATICFILES_DIRS` → `unified/dist` |
| `magna_web/urls.py` | templates → `unified/dist/index.{page,store}.html` |

**Total:** 7 archivos, 12 inserciones, 12 eliminaciones

### 2.3 Commit inicial (unificación)

**233 archivos, 21,911 inserciones** — incluye:
- Estructura `unified/` completa
- Componentes compartidos extraídos (Footer, FloatWhatsapp, Logo, LogoOriginal, LogoFooter, useLazyload)
- API client unificado (`shared/api/client.ts`)
- AuthProvider unificado con soporte dual (token + userInfo)
- Vite multi-entry config + manualChunks + PurgeCSS
- Correcciones de tipos en store (PayPal v8, ApiError)

---

## 3. Problemas encontrados y soluciones

### 3.1 404 en chunks por hashes desactualizados

**Síntoma:** Al servir desde Django, el template anterior referenciaba hashes viejos.
**Causa:** `STATICFILES_DIRS` y `urls.py` aún apuntaban a `page/dist/` y `store/dist/`.
**Solución:** Actualizar ambas configuraciones para apuntar a `unified/dist/`.

### 3.2 Build fallaba con `%BASE_URL%`

**Síntoma:** Rollup no resolvía `/static/src/page/main.tsx` como path absoluto.
**Causa:** `%BASE_URL%` se reemplaza por `/static/` en build, generando path absoluto.
**Solución:** Usar ruta relativa `./src/page/main.tsx` en HTML — Vite maneja el prefijo automáticamente.

### 3.3 Logo gigante en tarjetas de personal admin

**Síntoma:** Logo de 50px se mostraba a 270px, solo visible esquina inferior izquierda.
**Causa:** El CSS unificado tenía `.workers-equip img { width: 270px }` que NO existía en el CSS original de `page/`. Por mayor especificidad, sobreescribía el `width: 50px` del `.logo-1`.
**Solución:** `:not(.logo-1)` para excluir el logo, y `height: auto` en `.logo-1`.

### 3.4 Decoraciones de topografía en personal admin

**Síntoma:** Las imágenes `arriba.png`/`abajo.png` con trazos de topografía aparecían en las tarjetas del personal administrativo.
**Causa:** Se renderizaban sin condición en `TarjetaEquipo`.
**Solución:** Render condicional solo cuando `tipo === 'tecnologia'`.

---

## 4. Beneficios

### 4.1 Dependencias

| Métrica | Antes (2 proyectos) | Después (1 proyecto) |
|---------|---------------------|---------------------|
| `package.json` | 2 | 1 |
| `node_modules` | 2 (~400 MB c/u) | 1 (~400 MB total) |
| `npm install` | 2 veces | 1 vez |
| `npm run build` | 2 veces | 1 vez |
| Configuración Vite | 2 archivos | 1 archivo |

### 4.2 Componentes compartidos

Se eliminaron duplicaciones de estos componentes que existían en ambos proyectos:

| Componente | Page | Store | Ahora |
|-----------|------|-------|-------|
| Footer | `footer1.tsx` | `footer1.tsx` (diferente) | `shared/components/Footer.tsx` |
| WhatsApp | `floawhatsapp.tsx` | `floawhatsapp.tsx` (diferente) | `shared/components/FloatWhatsapp.tsx` |
| Logo | `assets/img/logo.tsx` | — | `shared/components/Logo.tsx` |
| LogoOriginal | `assets/img/logoOriginal.tsx` | — | `shared/components/LogoOriginal.tsx` |
| LogoFooter | `assets/img/imgfooter.tsx` | `assets/imgfooter.tsx` | `shared/components/LogoFooter.tsx` |
| useLazyload | `hooks/useLazyload.tsx` | `hooks/useLazyload.tsx` | `shared/hooks/useLazyload.ts` |

### 4.3 Auth unificado

El nuevo `AuthProvider` escribe en ambos formatos de localStorage simultáneamente:
- `localStorage.token` + `localStorage.refreshToken` (formato page)
- `localStorage.userInfo` JSON (formato store)

El API client lee de ambos formatos según cual esté disponible.

### 4.4 Build

- **Antes:** `cd magna-page/page && npm run build` + `cd magna-page/store && npm run build`
- **Después:** `cd magna-page/unified && npm run build`
- **Chunks compartidos:** vendor-react, vendor-router, vendor-bootstrap, vendor-ui, vendor-query, vendor-forms, vendor-utils, vendor-icons, vendor-toast, vendor-animation, vendor-widgets, vendor-other — 12 chunks compartidos + chunks específicos de cada entry point.

---

## 5. Tests

**61 tests ejecutados, 61 OK** (4.183s)

```
blog.tests ............ 13 OK
contact.tests ......... 5 OK
equipos.tests ......... 3 OK
frequentQuestions.tests 3 OK
products.tests ........ 10 OK
proyectos.tests ....... 5 OK
servicios.tests ....... 10 OK
user.tests ............ 12 OK
```

Todos los tests pasan sin regresiones. Los cambios de frontend no afectan la API REST.

---

## 6. Rendimiento del build

| Entry point | JS total | CSS total | Chunks |
|-------------|----------|-----------|--------|
| **Page** (index.page.html) | ~469 KB (vendor-react) + chunks específicos | ~84 KB | 15+ chunks |
| **Store** (index.store.html) | ~469 KB (vendor-react) + chunks específicos | ~74 KB | 15+ chunks |
| **Compartido** | vendor-react, vendor-router, vendor-bootstrap, vendor-ui, vendor-query, vendor-utils, vendor-icons, vendor-toast, vendor-animation, vendor-widgets, vendor-other, vendor-forms | vendor-bootstrap.css, vendor-ui.css, vendor-toast.css | — |

**Tiempo de build:** ~7.5 segundos (1245 módulos transformados)

---

## 7. Configuración final

### Django (`base.py`)
```python
STATICFILES_DIRS = (
    BASE_DIR.joinpath('magna-page', 'unified/dist'),
)
TEMPLATES[0]['DIRS'] = [BASE_DIR / 'magna-page']
```

### Django (`urls.py`)
```python
class indexView(TemplateView):
    template_name = 'unified/dist/index.page.html'
class storeView(TemplateView):
    template_name = 'unified/dist/index.store.html'
```

### Vite (`vite.config.ts`)
- `base: '/static/'`
- Multi-entry: `index.page.html` → page, `index.store.html` → store
- `manualChunks` con 12+ categorías de vendors
- PurgeCSS con safelist para clases dinámicas de page y store

---

## 8. Pendientes

- [ ] Actualizar scripts de deploy (`deploy.bat`, `deploy.sh`, `infrastructure/ansible`)
- [ ] Actualizar nginx.conf (ya apunta a `/static/` que es el mismo)
- [ ] Marcar `page/` y `store/` como legacy tras verificación en producción
- [ ] Pruebas visuales manuales de todas las rutas (page + store)
