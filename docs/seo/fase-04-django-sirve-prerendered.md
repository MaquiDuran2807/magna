# Fase 4: Django sirve HTML prerendered

## Objetivo

Modificar `indexView` para que sirva archivos prerendered (generados en Fase 3) cuando existan, y caiga al SPA shell original como fallback. Agregar ruta `/ssg/` para comparar SPA vs SSG en desarrollo.

## Cambios realizados

### Archivos modificados

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `magna_web/urls.py` | indexView reescrito a `View` con lógica prerendered + `/ssg/` route + paths unified | +30 |

### Archivos nuevos

| Archivo | Descripción | LOC |
|---------|-------------|-----|
| `magna_web/tests/__init__.py` | Package de tests | +0 |
| `magna_web/tests/test_seo_views.py` | 5 tests unitarios de vistas SEO | +95 |
| **Total** | | **~125 LOC** |

## Detalle de implementación

### `magna_web/urls.py`

- `indexView` cambió de `TemplateView` a `View` personalizado
- Toma `request.path`, busca `prerendered/{path}/index.html`
- Si existe → `HttpResponse` con ese HTML
- Si no → `HttpResponse` con `index.page.html` (SPA fallback)
- `/ssg/{path}` activa el mismo view pero con prefijo `ssg/` removido
- `storeView` y `Robots` actualizados a paths de `unified/dist/`
- Se removieron constantes `BASE_DIR`, `PRERENDER_DIR`, `SPA_TEMPLATE` en favor de `settings.BASE_DIR` dinámico

### `magna_web/tests/test_seo_views.py`

Usa `@patch('magna_web.urls.Path')` para simular `settings.BASE_DIR` apuntando a un temp dir con estructura `magna-page/unified/dist/` y archivos prerendered.

| Test | Verifica |
|------|----------|
| `test_spa_fallback_when_no_prerendered` | Sin prerendered → SPA shell original |
| `test_prerendered_served_when_exists` | Con prerendered → se sirve ese HTML |
| `test_ssg_route_dev_mode` | `/ssg/` funciona (quita prefijo) |
| `test_prerendered_has_meta_description` | El HTML prerendered incluye meta tags |
| `test_homepage_prerendered` | Homepage sirve prerendered |

### Mapa de rutas

| URL | ¿Prerendered? | Sirve |
|-----|--------------|-------|
| `/` | Sí | `prerendered/index.html` |
| `/servicios` | Sí | `prerendered/servicios/index.html` |
| `/ruta-inventada` | No | `index.page.html` (SPA) |
| `/ssg/servicios` | Sí | Mismo prerendered (sin prefijo) |

### Cambios adicionales

- `Robots.template_name` actualizado de `'page/dist/robot.txt'` a `'unified/dist/robot.txt'`
- `storeView.template_name` actualizado de `'store/dist/index.html'` a `'unified/dist/index.store.html'`

## Ejecución

```bash
python manage.py test magna_web.tests.test_seo_views
python manage.py test
```

## Git

```bash
git checkout -b seo-ssg/fase-04-django
git add -A
git commit -m "seo-ssg: fase 4 — Django sirve prerendered + fallback SPA + ruta /ssg/ dev"
git push origin seo-ssg/fase-04-django
```
