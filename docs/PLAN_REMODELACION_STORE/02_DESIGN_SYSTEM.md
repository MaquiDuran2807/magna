# Fase 02 — Design System (Store en Unified)

## Objetivo

Re-escribir `src/store-pages/index.css` usando los mismos tokens de diseño que `src/page/index.css` (colores, tipografía, sombras, etc.). El store actualmente tiene su propio CSS independiente que no usa los design tokens del proyecto.

---

## Archivos a Modificar

| Ruta en Unified | Acción |
|-----------------|--------|
| `magna-page/unified/src/store-pages/index.css` | Reescribir usando design tokens |
| `magna-page/unified/src/store-pages/main.tsx` | Verificar orden de imports CSS |
| `magna-page/unified/index.store.html` | Mantener sin CDN (ya debe estar limpio) |

---

## Skills Necesarias

- **`frontend-design`** — sistema de tokens, paleta, tipografía

---

## Evaluación de DESIGN.md

- [ ] **§7.1** Colores: copiar exactamente de `src/page/index.css`
- [ ] **§7.2** Tipografía: Poppins + Inter, escala completa
- [ ] **§7.3** Espaciado: `--space-1` a `--space-24`
- [ ] **§7.4** Breakpoints: mismos que page
- [ ] **§7.5** Sombras: `--shadow-sm` a `--shadow-xl`
- [ ] **§7.6** Bordes: `--radius-sm` a `--radius-full`
- [ ] **§7.7** Componentes UI: botones, cards
- [ ] **§7.9** Animaciones: framer-motion ya instalado

---

## Instrucciones Detalladas

### 1. `src/store-pages/index.css` — Reescribir

**NO repetir** los tokens CSS (ya están en `src/page/index.css` y se cargan globalmente). En su lugar, el store debe contener **solo estilos específicos** del store, usando las variables ya definidas:

```css
/* ========================================
   STORE-SPECIFIC STYLES
   Usa las CSS variables de src/page/index.css
   ======================================== */

/* --- Product Card Hover --- */
.hover-overlay {
  transition: background-color 0.3s ease;
}

.card:hover .hover-overlay {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.card:hover .hover-overlay span {
  opacity: 1 !important;
}

/* --- Cart Badge --- */
.cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  background: var(--color-secondary, #d69e2e);
  color: white;
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-bold, 700);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- Sidebar --- */
.side-navbar {
  width: 280px;
  height: 100%;
  position: fixed;
  left: -300px;
  top: 0;
  background: white;
  z-index: 1050;
  transition: left 0.3s ease;
  box-shadow: var(--shadow-xl, 0 20px 25px rgba(0,0,0,0.15));
  overflow-y: auto;
}

.side-navbar.active-nav {
  left: 0;
}

.side-navbar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1049;
}

/* --- Checkout Steps --- */
.checkout-step {
  border-bottom: 3px solid var(--color-gray-200, #e2e8f0);
  color: var(--color-gray-400, #a0aec0);
  font-size: var(--text-sm, 0.875rem);
  transition: all 0.3s ease;
}

.checkout-step.active {
  border-bottom-color: var(--color-secondary, #d69e2e);
  color: var(--color-primary, #1a365d);
  font-weight: var(--font-semibold, 600);
}

/* --- Search Box --- */
.search-box-input {
  border-radius: var(--radius-full, 9999px) 0 0 var(--radius-full, 9999px);
  border-color: var(--color-gray-300, #cbd5e0);
}

.search-box-btn {
  border-radius: 0 var(--radius-full, 9999px) var(--radius-full, 9999px) 0;
  background: var(--color-secondary, #d69e2e);
  color: white;
  border: none;
}

/* --- Sub-header categories --- */
.sub-header {
  background: var(--color-primary, #1a365d);
  padding: var(--space-2, 0.5rem) 0;
}

.sub-header .nav-link {
  color: white;
  font-weight: var(--font-light, 300);
  white-space: nowrap;
  padding: var(--space-1, 0.25rem) var(--space-3, 0.75rem);
  transition: transform 0.2s ease;
}

.sub-header .nav-link:hover {
  transform: scale(1.05);
}

/* --- Store link (back to main page) --- */
.store-link {
  border: 1px solid var(--color-primary, #1a365d);
  border-radius: var(--radius-full, 9999px);
  padding: var(--space-1, 0.25rem) var(--space-4, 1rem) !important;
  font-weight: var(--font-medium, 500);
  color: var(--color-primary, #1a365d) !important;
}

.store-link:hover {
  background: var(--color-primary, #1a365d);
  color: white !important;
}

/* --- Product Slider --- */
.swiper-button-next,
.swiper-button-prev {
  color: var(--color-secondary, #d69e2e) !important;
}

.swiper-pagination-bullet-active {
  background: var(--color-secondary, #d69e2e) !important;
}

/* --- Dark mode overrides for store --- */
body.dark-mode .side-navbar {
  background: var(--color-gray-800, #1a202c);
}

body.dark-mode .search-box-input {
  background: var(--color-gray-700);
  color: var(--color-gray-100);
  border-color: var(--color-gray-600);
}
```

### 2. `main.tsx` — Verificar orden de imports

Asegurar que Bootstrap y page/index.css se cargan antes que store/index.css:

```tsx
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../page/index.css'     // ← design tokens globales
import './index.css'              // ← store-specific
```

---

## Tests

- [ ] Variables CSS disponibles en el store (ver DevTools)
- [ ] Cards tienen `--radius-xl` y `--shadow-sm`
- [ ] Botones con `--color-secondary`
- [ ] Sidebar con animación slide
- [ ] Cart badge dorado
- [ ] Sin errores en consola
- [ ] Build exitoso

---

## Documentación de Resultados

| Métrica | Valor |
|---------|-------|
| **Líneas en nuevo index.css** | 287 |
| **Líneas eliminadas** (viejo store index.css) | 200 → 287 (87 líneas agregadas: nuevos estilos store-link, search-box, hover-overlay, swiper overrides) |
| **Variables CSS reutilizadas** | 21 (`--color-primary`, `--color-primary-dark`, `--color-secondary`, `--color-white`, `--color-gray-100`, `--color-gray-300`, `--color-gray-400`, `--color-gray-500`, `--color-gray-600`, `--color-gray-700`, `--color-gray-800`, `--color-gray-900`, `--font-light`, `--font-medium`, `--font-bold`, `--font-semibold`, `--text-xs`, `--text-sm`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--shadow-xl`, `--radius-full`) |

## Resultados

### Archivos modificados (unified)
1. **`magna-page/unified/src/store-pages/index.css`** — Reesrito completamente: eliminado `:root` con tokens duplicados, todos los colores硬codificados reemplazados por `var(--...)` con fallbacks. Agregados estilos faltantes del plan (hover-overlay, search-box, store-link, swiper overrides, checkout step refinado).
2. **`magna-page/unified/src/store-pages/main.tsx`** — Agregado `import '../../page/index.css'` antes de `import './index.css'` para asegurar que los design tokens se carguen primero.

### Archivos modificados (standalone store)
3. **`magna-page/store/src/index.css`** — Misma reescritura que unified.
4. **`magna-page/store/index.html`** — Eliminados CDN de Bootstrap y FontAwesome; ahora todo se importa vía npm. Agregados meta tags OG y responsive. Cambiado `lang="en"` → `lang="es"`.
5. **`magna-page/store/src/main.tsx`** — Agregado `import '../../page/src/index.css'` para cargar design tokens.

### Cambios clave (Fase 02)
- Las variables `--space-*` se usan en `.sub-header`, `.sub-header .nav-link`, `.store-link`, `.search-box-input`, `.search-box-btn` y `.cart-badge`
- El `.cart-badge` ahora es un círculo dorado con `border-radius: 50%` en lugar de solo texto flotante
- El `.side-navbar` cambió de `position: absolute` a `position: fixed` con animación slide de 0.3s
- Se agregaron estilos para `.store-link` (enlace de vuelta a página principal) y `.search-box-*`
- Se agregaron overrides de Swiper (`--color-secondary` para bullets y flechas)
- Modo oscuro ahora usa variables (`--color-gray-600/700/800`) en lugar de valores hardcodeados

---

## Fase 02b — Rediseño Visual Completo (Julio 2026)

### Problemas encontrados y soluciones

| Problema | Solución |
|----------|----------|
| Scroll horizontal por sidebar | `position: absolute; left: -350px` → `transform: translateX(-100%)` |
| Espacio blanco arriba | `vh-100` → `min-vh-100`, eliminado `mb-5` del navbar |
| Navbar sin scroll sticky | Agregado `position: sticky; top: 0; z-index: 1030` |
| `section { padding: 50px 0 }` global afectaba store | `.store-layout section { padding: 0 }` |
| Cards sin diseño ni animación | Rediseño completo con overlay, zoom, shadow, entrance animation |
| Footer con colores hardcodeados | `footer.css` reescrito con CSS variables |

### Archivos modificados (segunda ronda)

| Archivo | Cambios |
|---------|---------|
| `store/src/App.tsx` | Layout: `min-vh-100`, sticky header, sidebar con transform, navbar compacto |
| `store/src/index.css` | Rewrite: animations, product-card system, sticky header, section fix |
| `store/src/components/ProductItem.tsx` | Card rediseñada con overlay, img-wrapper, entrance animation |
| `store/src/pages/HomePage.tsx` | Título "Nuestros Productos", Helmet mejorado |
| `store/src/components/styles/footer.css` | Hardcoded → CSS variables |
| `unified/src/store-pages/App.tsx` | Mismos cambios que store/ |
| `unified/src/store-pages/index.css` | Mismos cambios que store/ |
| `unified/src/store-pages/components/ProductItem.tsx` | Mismos cambios que store/ |
| `unified/src/store-pages/pages/HomePage.tsx` | Mismos cambios que store/ |
| `unified/src/shared/components/styles/footer.css` | Hardcoded → CSS variables |

### Métricas (Fase 02b)

| Métrica | Valor |
|---------|-------|
| **Líneas en index.css (store)** | ~430 |
| **Líneas en index.css (unified)** | ~430 |
| **Animaciones CSS** | 3 (`cardEntrance`, `fadeIn`, ripple `::after`) |
| **Clases nuevas de card** | 15 (`.product-card`, `.product-card-wrapper`, `.card-img-wrapper`, `.card-overlay`, `.view-details`, `.card-price`, `.card-rating`, `.btn-add-cart`, `.btn-disabled`, etc.) |
| **Variables CSS adicionales** | 7 (`--font-heading`, `--color-primary-dark`, `--color-gray-50`, `--color-gray-900`, `--radius-lg`, `--shadow-lg`, `--shadow-xl`) |
| **Build status** | ✅ Exitoso (unified, 7.5s) |

### Diseño de tarjetas (ProductItem)

```
┌─────────────────────────┐
│  ┌───────────────────┐  │
│  │     (imagen)      │  │  ← aspect-ratio: 1, scale(1.1) hover
│  │  ┌─────────────┐  │  │
│  │  │Ver detalles │  │  │  ← overlay con gradiente, aparece en hover
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
│  Nombre del Producto    │  ← font-heading, 2 líneas clamp
│  ★★★★☆ (12)            │  ← rating en --color-secondary
│  ┌───────────────────┐  │
│  │ Agregar al carrito │  │  ← gradiente, ripple click, hover lift
│  └───────────────────┘  │
└─────────────────────────┘
         ↑ entrance animation escalonada (0s → 0.35s)
```

### Fix: Simetría de tarjetas (Julio 2026)

| Problema | Solución |
|----------|----------|
| Botones "Agregar al carrito" desalineados entre tarjetas por títulos de distinta longitud | `margin-top: auto` en `.btn-add-cart`, `min-height: 2.6em` en `.card-title`, `min-height: 1.5rem` en `.card-rating` |

```css
.product-card .card-title {
  min-height: 2.6em;           /* fuerza 2 líneas exactas */
}
.product-card .card-rating {
  min-height: 1.5rem;          /* altura consistente aunque falten reviews */
}
.product-card .btn-add-cart {
  margin-top: auto;             /* botón siempre al fondo del card-body */
}
```

### Tests pendientes
- [ ] Verificar sticky navbar en scroll
- [ ] Verificar sidebar sin scroll horizontal
- [ ] Verificar cards entrance animation
- [ ] Verificar dark mode en cards
- [ ] Verificar responsive 4 columnas → 2 → 1
- [ ] Verificar que todos los botones estén a la misma altura en fila
