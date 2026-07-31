# Fase 3 — CSS / Alineación con DESIGN.md

Archivo objetivo: `magna-page/page/src/pages/styles/blogs.css`

---

## C1 — Usar variables CSS del design system

Reemplazar valores hardcodeados por las CSS custom properties definidas en `DESIGN.md` §7.

| Actual | Reemplazar por |
|--------|---------------|
| `#0D3B72`, `#163E73`, `#0D3A72` | `var(--color-primary)` / `var(--color-primary-dark)` |
| `rgb(248, 248, 248)` | `var(--color-white)` |
| `aliceblue` | `var(--color-gray-50)` |
| `#000000` (box-shadow) | `var(--color-gray-900)` con opacidad |
| Font weights: `700` | `var(--font-bold)` |
| Font weights: `400` | `var(--font-regular)` |

Ejemplo:

```css
/* Antes */
.blog-container {
    background: linear-gradient(180deg, #0D3B72 0%, rgba(13, 58, 114, 0.383) 77%, #FFF 90%),
                url("../../assets/img/app/fondoblog2.webp") no-repeat;
    background-size: cover;
    background-position: 35% 55%;
    margin: 0;
    color: rgb(248, 248, 248);
}

/* Después */
.blog-container {
    background: linear-gradient(180deg, var(--color-primary) 0%, rgba(13, 58, 114, 0.383) 77%, var(--color-white) 90%),
                url("../../assets/img/app/fondoblog2.webp") no-repeat;
    background-size: cover;
    background-position: 35% 55%;
    margin: 0;
    color: var(--color-white);
}
```

---

## C2 — `margin: 0%` → `margin: 0`

**Línea 7:** Usar `0` sin unidad.

---

## C3 — Sidebar ul width 110% → overflow horizontal

**Línea 58:**

```css
.blog-sidebar ul {
    list-style: none;
    width: 100%;  /* was 110% */
}
```

---

## C4 — `.small-card` fixed width rompe responsive

**Líneas 169-171:**

```css
.small-card {
    width: 100%;
    max-width: 240px;
}
```

---

## C5 — Hover states en cards

Agregar transiciones suaves:

```css
.card-blog {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-blog:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.link-blogs:hover {
    color: var(--color-secondary);
}
```

---

## C6 — Media queries responsivos

Agregar según breakpoints de DESIGN.md §7.4:

```css
/* Tablet (≤768px) */
@media screen and (max-width: 768px) {
    .blog-cards {
        margin: 2%;
    }

    .blog-search {
        width: 80%;
    }

    .small-card {
        max-width: 100%;
    }

    .blog-sidebar ul {
        width: 100%;
    }
}

/* Mobile (≤576px) */
@media screen and (max-width: 576px) {
    .blog-header h1 {
        font-size: 1.8em;
    }

    .blog-cards {
        flex-direction: column;
        align-items: center;
    }

    .blog-sidebar h3 {
        font-size: 1.5rem;
    }
}
```

---

## C7 — Gradiente con imagen de fondo

**Líneas 2-9:** Asegurar compatibilidad mobile. Considerar:

```css
.blog-container {
    background: linear-gradient(180deg, var(--color-primary) 0%, rgba(13, 58, 114, 0.383) 77%, var(--color-white) 90%),
                url("../../assets/img/app/fondoblog2.webp") no-repeat;
    background-size: cover;
    background-position: 35% 55%;
    background-attachment: fixed;  /* opcional, pero testear en iOS */
    margin: 0;
    color: var(--color-white);
}
```

---

## Resumen de cambios CSS

| Regla | Línea | Cambio |
|-------|-------|--------|
| `.blog-container` | 2-9 | Usar vars, `margin: 0` |
| `.blog-header h1` | 11-17 | Usar `var(--font-bold)` |
| `.blog-cards` | 19-24 | Usar vars |
| `.card-blog` | 30-35 | Usar vars, agregar transition |
| `.blog-sidebar ul` | 57-59 | `width: 100%` |
| `.blog-search` | 83-86 | Responsive width |
| `.small-card` | 169-171 | `max-width` en vez de fixed |
| `.small-image` | 173-178 | Mantener |
| `.big-image` | 180-185 | Mantener |
| Nuevo | — | Media queries para 768px y 576px |
| Nuevo | — | Hover states en cards |
| Nuevo | — | `.sidebar-thumb` para F10 |
