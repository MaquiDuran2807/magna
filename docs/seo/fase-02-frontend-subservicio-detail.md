# Fase 2: Frontend — Página de detalle de subservicio

## Objetivo

Crear página individual por subservicio con URL única indexable por Google, meta description desde BD, breadcrumbs, JSON-LD y canonical URL.

## Cambios realizados

### Tipos TypeScript

| Archivo | Cambio |
|---------|--------|
| `unified/src/page/types/types.ts` | +slug/meta_description en `Subservicio` y `Servicio2` |
| `unified/src/page/types/types.ts` | +`SubServicioDetailResponse` con `servicio_padre` anidado |

### API y hooks

| Archivo | Cambio |
|---------|--------|
| `unified/src/page/api/pagesInfo.tsx` | +`fetchSubServicioDetail(slug)` |
| `unified/src/page/hooks/getInfoPage.tsx` | +`useGetSubServicioDetail(slug)` |

### Página nueva

**Archivo:** `unified/src/page/pages/subServicioDetail.tsx`

- Helmet con `meta_description` desde BD (con fallback a primeros 160 chars de descripción)
- JSON-LD BreadcrumbList (Servicios > Servicio Padre > Subservicio)
- Canonical URL
- OG tags
- Breadcrumbs visibles para usuario
- Contenido completo (imagen responsive srcSet, descripción)
- Enlaces a proyectos relacionados (hasta 4)

### Router

**Archivo:** `unified/src/page/main.tsx`

- Lazy import de `LazySubServicioDetail`
- Nueva ruta: `/servicios/:serviceSlug/:subServiceSlug`

### Navegación actualizada

| Archivo | Cambio |
|---------|--------|
| `unified/src/page/components/sliderServices.tsx` | Slides navegan a `/servicios/:serSlug/:subSlug` cuando tienen slug |
| `unified/src/page/pages/servecesDetail.tsx` | Sidebar navega a detalle con slug si existe |

### Archivos modificados/creados

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `unified/src/page/types/types.ts` | +SubServicioDetailResponse, +slug/meta | +25 |
| `unified/src/page/api/pagesInfo.tsx` | +fetchSubServicioDetail | +5 |
| `unified/src/page/hooks/getInfoPage.tsx` | +useGetSubServicioDetail | +10 |
| `unified/src/page/pages/subServicioDetail.tsx` | NUEVO | ~130 |
| `unified/src/page/main.tsx` | +ruta lazy | +2 |
| `unified/src/page/components/sliderServices.tsx` | navegación a detalle | +10 |
| `unified/src/page/pages/servecesDetail.tsx` | sidebar navega a detalle | +5 |
| **Total** | | **~187 LOC** |

### Notas técnicas

- La página es lazy-loaded (solo se descarga cuando se visita)
- Una consulta API adicional (`GET /servicios/subservicio/<slug>/`) por visita
- Sin impacto en páginas existentes
- La meta description es editable desde admin (no hardcodeada)
- Los breadcrumbs ayudan a Google a entender la jerarquía del sitio
- Los proyectos relacionados mejoran el internal linking y la relevancia temática
