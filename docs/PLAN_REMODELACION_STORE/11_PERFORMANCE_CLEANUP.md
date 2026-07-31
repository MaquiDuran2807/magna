# Fase 11 — Performance y Cleanup (Store en Unified)

Archivos en Unified:

| Archivo | Ruta |
|---------|------|
| Store router | `magna-page/unified/src/store-pages/main.tsx` |
| Vite config | `magna-page/unified/vite.config.ts` |
| CSS | `magna-page/unified/src/store-pages/index.css` |
| ProgressiveBackground | `magna-page/unified/src/store-pages/components/ProgressiveBackground.tsx` |

Skills: `frontend-design`

### Lo que YA existe en el unificado (no repetir)

- ✅ `manualChunks` con 15+ chunks de vendor
- ✅ PurgeCSS con safelist
- ✅ `base: '/static/'`
- ✅ `envDir: '../../'`
- ✅ framer-motion instalado
- ✅ react-icons con tree-shaking
- ✅ `react-helmet-async`

### Lo que FALTA en el store

1. **Lazy loading de rutas**: `main.tsx` carga todo eager. Migrar a `React.lazy()`
2. **Eliminar `console.log`** de todos los `.tsx` en `store-pages/`
3. **Eliminar import `parse` de `path`** en `utils.ts`
4. **Eliminar objeto `variantes`** no usado en `slider.tsx`
5. **ProgressiveBackground** para lazy loading de imágenes
6. **Verificar safelist de PurgeCSS** para clases del store

### 1. Lazy routes en `main.tsx`

```tsx
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
// ... todas las rutas

// Fallback:
function PageLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <Spinner animation="border" style={{ color: 'var(--color-secondary)' }} />
    </div>
  )
}
```

### 2. Console.log cleanup

Buscar en `src/store-pages/`:
```bash
find . -name "*.tsx" -o -name "*.ts" | xargs grep -l "console.log"
```

Esperado: ~8-10 archivos con `console.log` (App.tsx, SearchBox, slider, ProductItem, CartPage, searchPage, etc.)

### 3. Tests

- [ ] `npm run build` produce chunks separados
- [ ] Lazy loading: cada ruta store carga su chunk
- [ ] Sin `console.log` en producción
- [ ] Sin import `parse` de `path`
- [ ] Spinner visible durante carga de ruta
- [ ] ProgressiveBackground muestra placeholder
