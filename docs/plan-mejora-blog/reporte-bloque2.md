# Reporte Bloque 2 — Frontend Page (F2 + F3)

## Resumen

Se ejecutaron 19 cambios en frontend (F2: 12 fixes de lógica, F3: 7 mejoras CSS).
Lint pasa sin nuevos warnings; build exitoso en 8.33s. Los cambios son compatibles
con el backend modificado en Bloque 1.

## Archivos Modificados

| Archivo | Líneas antes | Líneas después | Δ neto |
|---------|-------------|----------------|--------|
| `magna-page/page/src/pages/blog.tsx` | 111 | 98 | -13 |
| `magna-page/page/src/pages/blogDetail.tsx` | 148 | 131 | -17 |
| `magna-page/page/src/components/blogCards.tsx` | 82 | 80 | -2 |
| `magna-page/page/src/components/sidebarBolgs.tsx` | 48 | 47 | -1 |
| `magna-page/page/src/layouts/blogLayout.tsx` | 43 | 40 | -3 |
| `magna-page/page/src/api/blog.tsx` | 64 | 40 | -24 |
| `magna-page/page/src/pages/styles/blogs.css` | 185 | 179 | -6 |

**Total:** ~66 líneas netas eliminadas (código muerto, try/catch, estilos hardcodeados).

> **Fix posterior:** `blogLayout.tsx` usaba `navbar2.tsx` (navbar diferente del resto del sitio). Se reemplazó por `navBar.tsx` (el mismo que usa `PagesLayout` en el resto de páginas), cargado con `React.lazy()` para consistencia.

---

## F2 — Lógica Frontend (F1–F12)

### F1 — Observer wrapper innecesario

**Archivos:** `pages/blog.tsx:100-108`, `pages/blogDetail.tsx:140-148`

**Qué:** Se eliminaron los wrappers `LazyBlog` y `LazyBlogDetailPage`. Ahora se exporta el componente directamente (`export default Blog` / `export default BlogDetailPage`).

**Por qué:** `React.lazy()` en `main.tsx` ya hace code splitting. El `useIntersectionObserver` postergaba el render innecesariamente.

**Impacto:** -25 líneas netas. Elimina el import de `useLazyload` en ambos archivos.

### F2 — Typo `setFilterBlogst`

**Archivo:** `pages/blog.tsx:15,36`

**Qué:** `setFilterBlogst` → `setFilterBlogs`.

**Por qué:** El nombre tenía una 't' de más. No causaba error funcional porque se usaba consistentemente, pero violaba convenciones de nomenclatura.

### F3 — `return` sin valor

**Archivo:** `pages/blog.tsx:48`

**Qué:** `return` → `return null`.

**Por qué:** `return` sin expresión retorna `undefined`, React no renderiza nada pero el tipo esperado es `ReactNode`.

### F4 — `refetchInterval` redundante

**Archivos:** `pages/blog.tsx:23`, `pages/blogDetail.tsx:21`, `components/sidebarBolgs.tsx:13`

**Qué:** Se eliminó `refetchInterval: 1000*60*30` de todas las queries de blog.

**Por qué:** `staleTime` de 30 min ya evita refetch innecesario. `refetchInterval` forza polling constante incluso con datos frescos, consumiendo ancho de banda y batería.

**Impacto:** Elimina ~36 peticiones/hora en cada página abierta.

### F5 — `refetch()` duplicado en blogDetail

**Archivo:** `pages/blogDetail.tsx:25-27`

**Qué:** Se eliminó `useEffect(() => { refetch(); }, [id])`.

**Por qué:** `useQuery` ya refetch automáticamente al cambiar `queryKey`. El efecto era redundante.

### F6 — Fecha duplicada en blogDetail

**Archivo:** `pages/blogDetail.tsx:126-128`

**Qué:** Se eliminó el bloque duplicado de fecha de publicación.

**Por qué:** La fecha se mostraba dos veces (línea 82 y línea 127).

### F7 — Comentarios sobrantes

**Archivo:** `pages/blogDetail.tsx:55,131`

**Qué:** Se eliminaron líneas comentadas (código legacy de regex de imágenes y autor hardcodeado).

### F8 — `description.slice()` crash si null

**Archivo:** `components/blogCards.tsx:29,70`

**Qué:** `blog.description.slice(0, 200)` → `blog.description?.slice(0, 200) ?? ''`.

**Por qué:** `description` es nullable en el modelo. Sin optional chaining, lanza `TypeError` en runtime.

### F9 — Helmet duplicado en layout

**Archivo:** `layouts/blogLayout.tsx:25-28`

**Qué:** Se eliminó el bloque `<Helmet>` del layout.

**Por qué:** `react-helmet-async` usa el último Helmet renderizado. El layout envuelve a las pages hijas, pisando sus meta tags.

**Impacto:** Ahora blog.tsx y blogDetail.tsx controlan su propio title/description sin interferencias.

### F10 — Inline styles en sidebar

**Archivo:** `components/sidebarBolgs.tsx:30`, `pages/styles/blogs.css`

**Qué:** `style={{width:"120px",borderRadius:"10px"}}` → `className="sidebar-thumb"`.

**Por qué:** Las `inline styles` dificultan mantenimiento, sobreescriben CSS del sistema, y no pueden ser responsive.

### F11 — `blog.author.last_name` inseguro

**Archivo:** `components/sidebarBolgs.tsx:34`

**Qué:** `blog.author.last_name` → `blog.author?.last_name ?? ''`.

**Por qué:** Si `author` o `last_name` son null/undefined, crashea. El tipo `Author` define `last_name` como string, pero datos reales pueden tener valores nulos.

### F12 — Errores silenciados en API layer

**Archivo:** `api/blog.tsx`

**Qué:** Se eliminaron los 3 bloques try/catch que retornaban `undefined` silenciosamente.

**Por qué:** El frontend no podía distinguir entre "sin datos" y "error de red". Ahora react-query captura el error y expone `isError` correctamente.

**Impacto:** -24 líneas. Las funciones quedaron más simples y predecibles.

---

## F3 — CSS / Alineación con DESIGN.md

### C1 — Variables CSS del design system

| Reemplazo | `var()` | Afecta |
|-----------|---------|--------|
| `#0D3B72`, `#163E73`, `#0D3A72` | `var(--color-primary)` | `.blog-container`, `.content-blog h2`, `.author`, `.header-post p` |
| `rgb(248, 248, 248)` | `var(--color-white)` | `.blog-container`, `.blog-header h1`, `.blog-sidebar h3`, `.blog-sidebar ul li a`, `.link-blogs` |
| `aliceblue` | `var(--color-gray-50)` | `.blog-izq` |
| `#000000` (box-shadow) | `var(--color-gray-900)` | `.card-blog` |
| `font-weight: 700` | `var(--font-bold)` | `.blog-header h1`, `.blog-sidebar h3`, `.blog-banner h3`, `.content-blog h2` |

### C2 — `margin: 0%` → `margin: 0`

**Archivo:** `blogs.css:7`

**Qué:** `margin: 0%` → `margin: 0`. Los porcentajes no son válidos para margin shorthand.

### C3 — Sidebar ul width 110%

**Archivo:** `blogs.css:58`

**Qué:** `width: 110%` → `width: 100%`.

**Por qué:** 110% causaba overflow horizontal en el sidebar.

### C4 — `.small-card` fixed width

**Archivo:** `blogs.css:169-171`

**Qué:** `width: 240px` → `width: 100%; max-width: 240px`.

**Por qué:** Width fijo rompía el layout responsive en pantallas pequeñas.

### C5 — Hover states en cards

**Archivo:** `blogs.css`

```css
.card-blog { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.card-blog:hover { transform: scale(1.02); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); }
.link-blogs:hover { color: var(--color-secondary); }
```

### C6 — Media queries responsivos

**Archivo:** `blogs.css`

- **Tablet (≤768px)**: `blog-cards` margin 2%, search width 80%, small-card max-width 100%
- **Mobile (≤576px)**: heading font-size 1.8em, cards flex-direction column, sidebar h3 1.5rem

### C7 — Gradiente con imagen de fondo

**Archivo:** `blogs.css`

**Qué:** Se mantiene el gradiente con overlay, usando `var(--color-primary)` y `var(--color-white)`.

---

## Estado Post-Bloque 2

- **Lint**: 0 errores, 28 warnings (todos pre-existentes en archivos no modificados)
- **Build**: exitoso (8.33s, 1196 módulos transformados)
- **Pendiente Bloque 3**: SEO + Accesibilidad (mismos archivos de frontend)
- **Pendiente Bloque 4**: Tests (blog/tests.py)
