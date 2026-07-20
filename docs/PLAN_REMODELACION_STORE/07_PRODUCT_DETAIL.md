# Fase 07 — Product Detail (Store en Unified)

Archivo: `src/store-pages/pages/ProductPage.tsx`

Skills: `frontend-design`, `seo`

Layout 2 columnas (imagen + info), breadcrumbs, selector cantidad, productos relacionados, JSON-LD Product schema, Helmet dinámico.

### Ruta en Unified

```
magna-page/unified/src/store-pages/pages/ProductPage.tsx
```

### Cambios respecto al plan original

- Breadcrumb usa `Link` de react-router-dom
- JSON-LD inyectado con `<script>` via react-helmet
- Productos relacionados: misma categoría, excluyendo actual, max 4
- Imagen con `--radius-xl` y `--shadow-lg`
- Precio en formato COP
- Botón CTA con `--color-secondary`

### Tests

- [ ] Breadcrumb funcional
- [ ] Selector cantidad (+/-) respeta stock
- [ ] JSON-LD presente en el head
- [ ] Productos relacionados renderizan
- [ ] Helmet con title dinámico
- [ ] Build exitoso
