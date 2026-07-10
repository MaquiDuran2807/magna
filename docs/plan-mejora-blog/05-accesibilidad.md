# Fase 5 — Accesibilidad

Contexto: componentes `.tsx` dentro de `magna-page/page/src/` y `blogs.css`.

---

## A1 — Alt texts descriptivos

**Archivos:** `components/blogCards.tsx:25-26`, `components/sidebarBolgs.tsx:30`

Asegurar que todos los `<img>` tengan `alt` descriptivo y único:

```tsx
// blogCards.tsx línea 25
<img src={blog.image} className="img-fluid small-image" alt={blog.title} />

// sidebarBolgs.tsx línea 30
<img src={blog.image} alt={blog.title} className="sidebar-thumb" />
```

(Actualmente ya tienen `alt={blog.title}`, verificar que todos los casos
lo tengan.)

---

## A2 — `aria-label` en enlaces a blog

**Archivos:** `components/blogCards.tsx`, `components/sidebarBolgs.tsx`

```tsx
// blogCards.tsx
<Link to={`/blog/${blog.id}`} aria-label={`Leer artículo: ${blog.title}`} className='link-blogs'>

// sidebarBolgs.tsx
<Link to={`/blog/${blog.id}`} aria-label={`Leer artículo: ${blog.title}`}>
```

---

## A3 — Botón "Cargar más" sin aria-label

**Archivo:** `pages/blog.tsx:78-90`

```tsx
<button
    onClick={() => fetchNextPage()}
    className="btn btn-primary"
    type="button"
    disabled={!hasNextPage || isFetchingNextPage}
    aria-label={
        isFetchingNextPage
            ? 'Cargando más artículos'
            : hasNextPage
            ? 'Cargar más artículos del blog'
            : 'No hay más artículos disponibles'
    }
>
```

---

## A4 — Contraste de color

**Archivo:** `pages/styles/blogs.css`

**Problema:** Texto blanco (`#f8f8f8 ≈ var(--color-white)`) sobre gradiente
que transiciona de azul oscuro (`#0D3B72`) a blanco (`#FFF`). Donde el
gradiente se aclara (< 4.5:1 ratio), el texto es ilegible.

**Solución:** Asegurar fondo oscuro hasta el final del gradiente:

```css
.blog-container {
    background: linear-gradient(
        180deg,
        var(--color-primary) 0%,
        rgba(13, 58, 114, 0.85) 70%,
        rgba(13, 58, 114, 0.6) 100%
    ),
    url("../../assets/img/app/fondoblog2.webp") no-repeat;
    background-size: cover;
    background-position: 35% 55%;
    color: var(--color-white);
}
```

Opción alternativa: agregar `text-shadow` para garantizar legibilidad:

```css
.blog-container h1,
.blog-container h3,
.blog-container p {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
```

---

## A5 — Focus visible en sidebar

**Archivo:** `components/sidebarBolgs.tsx`

**Solución:** Agregar estilos `:focus-visible` en CSS:

```css
.blog-sidebar ul li a:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
    border-radius: 4px;
}
```

---

## A6 — Semántica HTML

**Archivo:** `pages/blog.tsx`, `pages/blogDetail.tsx`

- Asegurar que el blog list use `<main>` como contenedor principal
- Los artículos en listado deberían usar `<article>` en vez de `<div class="card">`
- Los encabezados deben seguir jerarquía: `h1` → `h2` → `h3` sin saltos

```tsx
// blogCards.tsx — cada blog card
<article key={blog.id} className={sizeClass}>
    <Link to={`/blog/${blog.id}`} aria-label={`Leer artículo: ${blog.title}`} className='link-blogs'>
        <div className={`card card-blog mt-3 ${cardClass}`}>
            ...
        </div>
    </Link>
</article>
```
