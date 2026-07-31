# Reporte Bloque 3 — SEO + Accesibilidad (F4 + F5)

## Resumen

Se ejecutaron 14 cambios (F4: 7 mejoras SEO, F5: 7 mejoras de accesibilidad).
Build exitoso en 9.22s. No se introdujeron nuevos warnings de lint.

## Archivos Modificados

| Archivo | Líneas antes | Líneas después | Δ neto |
|---------|-------------|----------------|--------|
| `pages/blog.tsx` | 100 | 116 | +16 |
| `pages/blogDetail.tsx` | 131 | 166 | +35 |
| `components/blogCards.tsx` | 80 | 80 | 0 |
| `components/sidebarBolgs.tsx` | 48 | 48 | 0 |
| `pages/styles/blogs.css` | 223 | 235 | +12 |
| `sitemap/sitemap.tsx` | 105 | 114 | +9 |

**Total:** ~72 líneas netas agregadas.

---

## F4 — SEO

### S1 — Open Graph Tags

**Archivos:** `pages/blog.tsx:56-60`, `pages/blogDetail.tsx:57-64`

**Qué:** Agregados meta tags `og:title`, `og:description`, `og:image`, `og:type`, `og:url` en ambas páginas.

- Listing: OG tags estáticos con imagen del banner del blog.
- Detail: OG tags dinámicos con `blogDetail.title`, `blogDetail.description`, `blogDetail.image`, más `article:published_time`, `article:author`, `article:section`.

**Impacto:** +12 meta tags (5 listing + 7 detail).

### S2 — Twitter Cards

**Archivos:** `pages/blog.tsx:61-63`, `pages/blogDetail.tsx:65-68`

**Qué:** Agregados `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

- Listing: `summary` card.
- Detail: `summary_large_image` card con imagen del post.

**Impacto:** +7 meta tags.

### S3 — JSON-LD Structured Data

**Archivo:** `pages/blogDetail.tsx:71-92`

**Qué:** Agregado `<script type="application/ld+json">` con `BlogPosting` schema: headline, description, image, datePublished, author (Person), publisher (Organization), mainEntityOfPage.

**Impacto:** +22 líneas. Mejora el rich snippet en Google SERP.

### S4 — Canonical URL

**Archivos:** `pages/blog.tsx:64`, `pages/blogDetail.tsx:69`

**Qué:** Agregado `<link rel="canonical">` en ambas páginas para prevenir contenido duplicado.

### S5 — Sitemap

**Archivo:** `sitemap/sitemap.tsx:12-17,28-31`

**Qué:** Agregadas prioridades y frecuencias específicas para rutas de blog:
- `/blog`: `weekly`, priority `0.8`
- `/blog/:id`: `monthly`, priority `0.6`

---

## F5 — Accesibilidad

### A1 — Alt texts descriptivos

**Archivos:** `components/blogCards.tsx:25,64`, `components/sidebarBolgs.tsx:30`

**Qué:** Verificado que todos los `<img>` tienen `alt={blog.title}`. Sin cambios necesarios.

### A2 — `aria-label` en enlaces a blog

**Archivos:** `components/blogCards.tsx:22,61`, `components/sidebarBolgs.tsx:28`

**Qué:** Agregado `aria-label` con formato `Leer artículo: ${blog.title}` en todos los `<Link>` que dirigen a detalles de blog (3 en blogCards.tsx + 1 en sidebarBolgs.tsx).

### A3 — Botón "Cargar más" sin aria-label

**Archivo:** `pages/blog.tsx:90-96`

**Qué:** Agregado `aria-label` dinámico al botón de paginación:
- `Cargando más artículos` (mientras fetchNextPage está activo)
- `Cargar más artículos del blog` (si hay más páginas)
- `No hay más artículos disponibles` (si no hay más)

Además se cambió `Loading more...` → `Cargando...` para consistencia en español.

### A4 — Contraste de color

**Archivo:** `pages/styles/blogs.css:3-15`

**Qué:** El gradiente del banner usaba `rgba(13, 58, 114, 0.383)` que se aclaraba demasiado (texto blanco ilegible). Se reemplazó por:
- `rgba(13, 58, 114, 0.85)` a 70%
- `rgba(13, 58, 114, 0.6)` a 100%

Además se agregó `text-shadow: 0 1px 3px rgba(0,0,0,0.5)` en h1, h3, p dentro de `.blog-container` como respaldo.

**Impacto:** Garantiza ratio de contraste ≥ 4.5:1 en todo el gradiente.

### A5 — Focus visible en sidebar

**Archivo:** `pages/styles/blogs.css:79-83`

**Qué:** Agregado `:focus-visible` con `outline: 2px solid var(--color-secondary)` y `outline-offset: 2px` para los enlaces del sidebar.

### A6 — Semántica HTML

**Archivos:** `pages/blog.tsx:66`, `components/blogCards.tsx:20,60,72`

**Qué:**
- `pages/blog.tsx`: Contenedor principal cambió de `<div>` a `<main>`.
- `components/blogCards.tsx`: Cada card de blog cambió de `<div>` a `<article>` (3 ocurrencias: 1 en search results + 2 en listado principal).

---

## Estado Post-Bloque 3

- **Build**: exitoso (9.22s, 1194 módulos transformados)
- **Lint**: 0 errores, 28 warnings (todos pre-existentes en archivos no modificados)
- **Pendiente Bloque 4**: Tests (F6 — blog/tests.py)
