# Plan de Mejora — Blog Magna

Plan integral para corregir bugs, optimizar rendimiento y alinear el blog
con los estándares de `DESIGN.md` y `AGENTS.md`.

## Archivos del Plan

| Archivo | Fase | Descripción |
|---------|------|-------------|
| `00-bugs-criticos.md` | Fase 0 | Bugs críticos (backend + frontend) |
| `01-backend.md` | Fase 1 | Backend: models, views, serializers, caché |
| `02-frontend-logica.md` | Fase 2 | Frontend: lógica, estados, patrones correctos |
| `03-css-diseno.md` | Fase 3 | CSS: alineación con sistema de diseño |
| `04-seo.md` | Fase 4 | SEO: Open Graph, JSON-LD, sitemap |
| `05-accesibilidad.md` | Fase 5 | Accesibilidad: WCAG, ARIA, contraste |
| `06-testing.md` | Fase 6 | Tests: cobertura de bugs y nuevos casos |

## Orden de Ejecución

### Bloque 1 — Backend (F0 + F1)
Contexto: `blog/models.py`, `blog/serializers.py`, `blog/views.py`, `blog/urls.py`

### Bloque 2 — Frontend Page (F2 + F3)
Contexto: `magna-page/page/src/pages/blog.tsx`, `magna-page/page/src/pages/blogDetail.tsx`,
`magna-page/page/src/components/blogCards.tsx`, `magna-page/page/src/components/sidebarBolgs.tsx`,
`magna-page/page/src/components/search.tsx`, `magna-page/page/src/layouts/blogLayout.tsx`,
`magna-page/page/src/api/blog.tsx`, `magna-page/page/src/types/blog.tsx`,
`magna-page/page/src/pages/styles/blogs.css`

### Bloque 3 — SEO + Accesibilidad (F4 + F5)
Contexto: mismos archivos que Bloque 2 (se reusa contexto)

### Bloque 4 — Tests (F6)
Contexto: `blog/tests.py`

## Skills Requeridas

| Bloque | Skill |
|--------|-------|
| Bloque 1 | `django-expert` |
| Bloque 2 | `frontend-design` |
| Bloque 3 | `seo`, `accessibility` |
| Bloque 4 | `python-testing-patterns` |

## Dependencias

- F0 debe ejecutarse antes que F1 (comparten archivos)
- F2 debe ejecutarse antes que F3 (CSS referencia componentes)
- F4 y F5 pueden ejecutarse en paralelo
- F6 debe ejecutarse después de F0 y F1 (tests validan los fixes)
