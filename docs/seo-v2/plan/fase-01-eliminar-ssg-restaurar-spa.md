# Fase 1: Eliminar SSG/prerender — Restaurar SPA puro

## Objetivo
Revertir el sistema de prerenderizado SSG en `urls.py` y volver al modelo SPA clásico donde Django sirve el `index.html` del build de Vite directamente, sin intermediarios. El HTML prerendered deja de servirse; React se encarga de todo el renderizado y fetching.

## Archivos a modificar

| Archivo | Acción |
|---|---|
| `magna_web/urls.py` | Reemplazar `indexView` (clase personalizada con lógica de prerendered) por un `TemplateView` simple |
| `magna-page/unified/prerender.mjs` | Eliminar (o archivar) |
| `magna-page/unified/test-prerender.mjs` | Eliminar (o archivar) |
| `magna-page/unified/package.json` | Eliminar script `build:ssg`, limpiar referencias a prerender |
| `magna_web/urls.py` | Eliminar ruta `/ssg/` y simplificar catch-all |

## Skills requeridas (cargar antes de empezar)

1. **`django-expert`** — Antes de tocar `urls.py`
2. **`frontend-design`** — Antes de tocar `package.json` o rutas del frontend

## Referencias

- **AGENTS.md**: `urls.py` está en `magna_web/` (Sección Project Structure). La rama `deploy/julio-2026` tiene la versión original del `TemplateView`.
- **DESIGN.md**: No existe en el repo. Los tokens de diseño están definidos en AGENTS.md §Visual Uniformity Rules.
- Rama de referencia: `deploy/julio-2026` — commit `784702c` para la estructura original.

## Instrucciones detalladas

### 1. Modificar `magna_web/urls.py`

**Estado actual:** `indexView` es una clase `View` personalizada que:
1. Toma `request.path`, verifica si empieza con `ssg/`
2. Busca HTML prerendered en `magna-page/unified/dist/prerendered/`
3. Si existe y pesa > 100 bytes, lo sirve
4. Si no, cae al SPA (`index.page.html`)
5. Tiene una ruta especial `/ssg/` para desarrollo

**Estado deseado:** `indexView` debe ser un `TemplateView` simple:

```python
from django.views.generic import TemplateView

class indexView(TemplateView):
    template_name = 'unified/dist/index.page.html'
```

Acciones concretas:
- Eliminar imports de `View`, `static_serve`, `HttpResponse`, `Path` (si no se usan más)
- Simplificar `storeView` y `Robots` si siguen igual
- Eliminar `urlpatterns += [re_path(r'^ssg/', ...)]`
- Simplificar catch-all a: `re_path(r'^(?!media/|admin/).*$', indexView.as_view(), name='index')`
- Eliminar las líneas de `static_serve` para media y static si ya las maneja Django (chequear si `STATICFILES_DIRS` + `runserver` ya sirve static en dev)

### 2. Limpiar scripts de prerender

- Mover `prerender.mjs` y `test-prerender.mjs` a `docs/seo/prerender-scripts/` como respaldo (no borrar, por si se necesita referencia)
- En `package.json`, eliminar el script `"build:ssg"`. También `"rerender_page"` y cualquier comando relacionado

### 3. Verificar que el SPA funciona

- Hacer `cd magna-page/unified && npm run build`
- Iniciar Django: `python manage.py runserver`
- Abrir `http://localhost:8000` — debe cargar el SPA y hacer fetch de datos de la API
- Abrir `http://localhost:8000/servicios/topografia` — debe funcionar la navegación SPA

## Criterios de éxito

- [ ] `urls.py` no tiene lógica de prerendered
- [ ] No existe ruta `/ssg/`
- [ ] El catch-all es simple y no excluye `static/`
- [ ] `prerender.mjs` y `test-prerender.mjs` están archivados
- [ ] `npm run build` genera el frontend correctamente
- [ ] Navegando en el SPA, las APIs responden con datos de la DB
- [ ] `npm run dev` sigue funcionando para desarrollo

## Documentación de resultados

Al finalizar esta fase, crear `docs/seo-v2/resultados/fase-01-eliminar-ssg-restaurar-spa.md` con:
- Resumen de lo que se hizo y por qué
- Commits realizados
- Tests ejecutados y resultados
- Líneas modificadas/eliminadas (usar `git diff --stat`)
- Impacto en peso del build (antes vs después)
- Tiempo total de desarrollo
