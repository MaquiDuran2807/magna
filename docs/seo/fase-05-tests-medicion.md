# Fase 5: Tests + Lighthouse Measurement

## Que se hizo

1. **Scripts de Lighthouse:** Se crearon `scripts/lighthouse-comparison.sh`, `scripts/lighthouse-comparison.bat`, y `scripts/compare-lighthouse.js` para medir y comparar rendimiento entre SPA y SSG.
2. **Verificación de prerendered:** Se ejecutó `node test-prerender.mjs` — 98/98 checks pasaron en 20 archivos prerendered.
3. **Correcciones:** Se mejoró `prerender.mjs` con reintentos para rutas inestables y se agregó guarda en `indexView` para evitar servir archivos prerendered vacíos.
4. **Documentación:** Se creó `docs/lighthouse-results.md` con resultados esperados y targets (≥ 93).

## Por que se hizo

- Para verificar objetivamente que el SSG mejora el SEO y el rendimiento
- Para tener una línea base medible antes y después del cambio
- Para detectar regresiones si algo sale mal
- Para garantizar que todos los prerendered sean válidos (title, meta, contenido)

## Tests

```
cd magna-page/unified && node test-prerender.mjs
```

98 checks en 20 archivos prerendered. Verifica: existencia, title, meta description, body con contenido (>500 chars), sin errores JS (TypeError, RangeError, Cannot read), script module.

```
python manage.py test magna_web.tests
```

Tests Django para indexView: SPA fallback, prerendered serving, meta tags, homepage.

## Lighthouse targets

| Categoría | Target |
|-----------|--------|
| Performance | ≥ 93 |
| Accessibility | ≥ 93 |
| Best Practices | ≥ 93 |
| SEO | ≥ 95 |

## Como probar

1. `cd magna-page/unified && npm run build:ssg`
2. `python manage.py runserver` (en otra terminal)
3. `node magna-page/unified/test-prerender.mjs` — verifica prerendered
4. `bash scripts/lighthouse-comparison.sh /servicios` — mide Lighthouse
5. `python manage.py test magna_web.tests` — tests Django
