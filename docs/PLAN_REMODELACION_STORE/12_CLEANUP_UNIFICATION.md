# Fase 00 — Limpieza Post-Unificación

## Objetivo

Eliminar componentes duplicados que persisten en `store-pages/` después de la unificación. El proceso de unificación (Fase 3+4+5) ya creó versiones compartidas en `src/shared/components/`, pero los archivos viejos de `store/` se copiaron tal cual y nunca se limpiaron. Esta fase los elimina y actualiza los imports.

---

## Archivos a Modificar/Eliminar

| Archivo | Acción |
|---------|--------|
| `src/store-pages/components/footer1.tsx` | **ELIMINAR** (usar `shared/components/Footer.tsx`) |
| `src/store-pages/components/floawhatsapp.tsx` | **ELIMINAR** (usar `shared/components/FloatWhatsapp.tsx`) |
| `src/store-pages/components/styles/footer.css` | **ELIMINAR** (usar `shared/components/styles/footer.css`) |
| `src/store-pages/hooks/useLazyload.tsx` | **ELIMINAR** (usar `shared/hooks/useLazyload.ts`) |
| `src/store-pages/App.tsx` | Modificar imports (quitar referencias a archivos eliminados) |
| `src/page/components/footer1.tsx` | **ELIMINAR** (usar shared) |
| `src/page/components/floawhatsapp.tsx` | **ELIMINAR** (usar shared) |
| `src/page/hooks/useLazyload.tsx` | **ELIMINAR** (usar shared) |
| `src/page/auth/AuthProvider.tsx` | **ELIMINAR** (usar `src/auth/AuthProvider.tsx`) |
| `src/store-pages/main.tsx` | Verificar imports |
| `src/store-pages/apiClient.ts` | Considerar migrar a `shared/api/client.ts` |

---

## Skills Necesarias

- **`frontend-design`** — revisión de imports, verificación de build

---

## Evaluación de Resultados de Unificación

- [ ] `shared/components/Footer.tsx` ya existe y es funcional
- [ ] `shared/components/FloatWhatsapp.tsx` ya existe y es funcional
- [ ] `shared/hooks/useLazyload.ts` ya existe y es funcional
- [ ] `shared/api/client.ts` ya existe (pero store usa su propio apiClient)

---

## Instrucciones Detalladas

### 1. Verificar que shared components están bien importados en `App.tsx`

Leer `src/store-pages/App.tsx` y verificar qué imports usa:

```tsx
// DEBE usar (ya debería):
import Footer from '../shared/components/Footer'
import { FloatWhatsapp } from '../shared/components/FloatWhatsapp'

// NO debe usar:
// import Footer from './components/footer1'
// import { FloatWhatsapp } from './components/floawhatsapp'
```

### 2. Eliminar archivos duplicados

```bash
rm magna-page/unified/src/store-pages/components/footer1.tsx
rm magna-page/unified/src/store-pages/components/floawhatsapp.tsx
rm magna-page/unified/src/store-pages/components/styles/footer.css
rm magna-page/unified/src/store-pages/hooks/useLazyload.tsx

# Duplicados de page (si referencia compartida no se usa):
rm magna-page/unified/src/page/components/footer1.tsx
rm magna-page/unified/src/page/components/floawhatsapp.tsx
rm magna-page/unified/src/page/hooks/useLazyload.tsx
rm magna-page/unified/src/page/auth/AuthProvider.tsx
```

### 3. Verificar que `pagesLayouts.tsx` usa shared components

Leer `src/page/layouts/pagesLayouts.tsx` y confirmar que importa desde `shared/`.

### 4. Consolidar API clients (opcional)

El store tiene su propio `apiClient.ts` en `store-pages/` con `baseURL` hardcodeado. Evaluar si migrar a `shared/api/client.ts` que usa `window.location.origin`.

---

## Tests

- [ ] `npm run build` exitoso (sin errores de imports rotos)
- [ ] `npm run dev` carga store sin errores
- [ ] `npm run dev` carga page sin errores
- [ ] Footer visible en store (usando shared component)
- [ ] WhatsApp flotante visible en store
- [ ] Footer visible en page
- [ ] WhatsApp flotante visible en page

---

## Documentación de Resultados

| Métrica | Valor |
|---------|-------|
| **Archivos eliminados** | 7+ |
| **Líneas eliminadas** | |
| **Duplicados resueltos** | Footer, WhatsApp, useLazyload, footer.css, AuthProvider |
