# Plan General de Remodelación — Store (Proyecto Unificado)

> **Propósito**: Remodelar la tienda online dentro del proyecto frontend unificado (`magna-page/unified/`) para que sea visualmente coherente con el sitio corporativo, con mejor SEO, rendimiento, UX y mantenibilidad.
>
> **Contexto**: La unificación de frontends (rama `feature/unified-frontend`) ya fusionó `page/` y `store/` en un solo proyecto Vite multi-entry. Este plan actúa **sobre el proyecto ya unificado**.
>
> **Rama activa**: `feature/unified-frontend`
> 
> **Fecha**: Julio 2026

---

## Archivos del Store en el Proyecto Unificado

| Rol | Ruta en Unified |
|-----|----------------|
| Entry HTML | `magna-page/unified/index.store.html` |
| Router + Providers | `magna-page/unified/src/store-pages/main.tsx` |
| Layout | `magna-page/unified/src/store-pages/App.tsx` |
| Context (carrito) | `magna-page/unified/src/store-pages/Store.tsx` |
| CSS | `magna-page/unified/src/store-pages/index.css` |
| API Client | `magna-page/unified/src/store-pages/apiClient.ts` |
| Hooks | `magna-page/unified/src/store-pages/hooks/` |
| Componentes | `magna-page/unified/src/store-pages/components/` |
| Páginas | `magna-page/unified/src/store-pages/pages/` |
| Tipos | `magna-page/unified/src/store-pages/types/` |
| Assets | `magna-page/unified/src/store-pages/assets/` |
| Shared components | `magna-page/unified/src/shared/components/` |

---

## Estructura del Plan

| Fase | Nombre | Archivos clave en unified | Skills |
|------|--------|---------------------------|--------|
| **01** | Foundation y Config | `index.store.html`, `vite.config.ts`, `src/store-pages/apiClient.ts` | `frontend-design`, `seo` |
| **02** | Design System | `src/store-pages/index.css`, `src/page/index.css` | `frontend-design` |
| **03** | Layout Shell | `src/store-pages/App.tsx`, `src/shared/components/Footer.tsx`, `src/shared/components/FloatWhatsapp.tsx` | `frontend-design` |
| **04** | Product Cards | `src/store-pages/components/ProductItem.tsx`, `src/store-pages/types/Product.ts` | `frontend-design` |
| **05** | Homepage + Slider | `src/store-pages/pages/HomePage.tsx`, `src/store-pages/components/slider.tsx` | `frontend-design`, `seo` |
| **06** | Search y Filters | `src/store-pages/components/SearchBox.tsx`, `src/store-pages/pages/searchPage.tsx`, nuevo `ProductFilters.tsx` | `frontend-design` |
| **07** | Product Detail | `src/store-pages/pages/ProductPage.tsx` | `frontend-design`, `seo` |
| **08** | Cart y Checkout | `src/store-pages/pages/CartPage.tsx`, checkout pages (6) | `frontend-design` |
| **09** | Auth y Profile | `src/store-pages/pages/SigninPage.tsx`, `src/store-pages/pages/ProfilePage.tsx` | `frontend-design` |
| **10** | Backend | `products/serializers.py`, `products/views.py`, `products/urls.py` | `django-expert`, `django-security` |
| **11** | Performance y Cleanup | `src/store-pages/main.tsx`, `vite.config.ts`, varios | `frontend-design` |
| **12** | Limpieza Post-Unificación | Solo cuando todo esté probado y aprobado por el cliente | `frontend-design` |

---

## Principios Rectores

1. **Coherencia visual total** con `src/page/` (colores, tipografía, sombras, animaciones compartidas)
2. **SEO first**: meta tags, Open Graph, structured data, sitemap, analytics
3. **Performance**: code splitting ya implementado, falta lazy loading de rutas store
4. **Mobile-first**: imágenes adaptativas, sin scroll horizontal
5. **Sin hardcoding**: datos desde API o variables de entorno
6. **Código limpio**: sin `console.log`, sin imports no usados, español consistente
7. **Eliminar duplicados**: footer, whatsapp, useLazyload ya existen en `src/shared/`
8. **Tests profundos**: cada fase incluye verificación funcional y visual

---

## Patrón de Referencias por Fase

Cada fase MD referencia explícitamente:
- **AGENTS.md** — convenciones (español, sin comentarios, fields explícitos, etc.)
- **DESIGN.md** — sección 7 (UI/UX): colores §7.1, tipografía §7.2, espaciado §7.3, breakpoints §7.4, sombras §7.5, bordes §7.6, iconografía §7.8, animaciones §7.9
- **`docs/fase 3-4-5/resultados-unificacion.md`** — estado actual del unificado
- **Skills específicas** a cargar antes de empezar
- **Tests** a ejecutar para verificar

---

## Glosario

| Término | Significado |
|---------|-------------|
| **unified** | `magna-page/unified/` — proyecto frontend único con multi-entry |
| **store-pages** | `src/store-pages/` — subdirectorio del store dentro del unified |
| **shared** | `src/shared/` — componentes, hooks y API compartidos |
| **page** | `src/page/` — sitio corporativo dentro del unified |
