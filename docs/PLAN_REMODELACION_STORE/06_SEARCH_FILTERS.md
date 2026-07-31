# Fase 06 — Search y Filters (Store en Unified)

Archivos: `src/store-pages/components/SearchBox.tsx`, `src/store-pages/pages/searchPage.tsx`, nuevo `src/store-pages/components/ProductFilters.tsx`

Skills: `frontend-design`

### Archivos en Unified

| Componente | Ruta |
|------------|------|
| SearchBox | `magna-page/unified/src/store-pages/components/SearchBox.tsx` |
| searchPage | `magna-page/unified/src/store-pages/pages/searchPage.tsx` |
| searchPageStr | `magna-page/unified/src/store-pages/pages/searchPageStr.tsx` (ELIMINAR) |
| ProductFilters (nuevo) | `magna-page/unified/src/store-pages/components/ProductFilters.tsx` |
| Hooks | `magna-page/unified/src/store-pages/hooks/productHooks.ts` |

### Cambios respecto al plan original

- `searchPageStr.tsx` se elimina (unificar rutas en `main.tsx`)
- SearchBox navega a `/store/search?q=...` (no `/store/search/byname/...`)
- Filtros usan categorías desde API + sorting client-side
- Chips de categoría con `border-radius: var(--radius-full)`
- Select de ordenamiento estilizado

### Tests

- [ ] Búsqueda con debounce funciona
- [ ] Filtro por categoría (chips) funciona
- [ ] Ordenamiento funciona
- [ ] Mobile toggle filtros funciona
- [ ] Sin resultados muestra mensaje
- [ ] Build exitoso
