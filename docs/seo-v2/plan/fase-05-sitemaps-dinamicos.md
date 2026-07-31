# Fase 5: Sitemap dinámico con django.contrib.sitemaps

## Objetivo
Configurar un sitemap.xml dinámico usando `django.contrib.sitemaps` que incluya todas las URLs relevantes del sitio: páginas estáticas, servicios (con slugs), subservicios, proyectos, y posts del blog. Reemplazar el sitemap actual basado en React (`src/page/sitemap/sitemap.tsx`) que no indexa correctamente las rutas dinámicas.

## Archivos a modificar/crear

| Archivo | Acción |
|---|---|
| `magna_web/sitemaps.py` | Crear — clases Sitemap para cada modelo |
| `magna_web/urls.py` | Agregar ruta `/sitemap.xml` |
| `magna_web/settings/base.py` | Agregar `'django.contrib.sitemaps'` a INSTALLED_APPS |
| `magna-page/unified/src/page/sitemap/sitemap.tsx` | Eliminar o deshabilitar (ya no es necesario) |
| `magna-page/unified/src/page/main.tsx` | Eliminar ruta `/sitemap.xml` del router de React |

## Skills requeridas (cargar antes de empezar)

1. **`django-expert`** — Para sitemaps, URL routing
2. **`seo`** — Para asegurar que el sitemap cubre todas las URLs importantes

## Referencias

- **AGENTS.md**: §Key Models (Servicio, Slide, Brochure, Post, Product, Proyecto)
- API endpoints existentes: `servicios/servicios-and-subservicios/`, `proyectos/`, `blog/`
- Los modelos `Servicio` y `SubServicio` tienen campo `slug`
- **DESIGN.md**: No aplica

## Instrucciones detalladas

### 1. Crear `magna_web/sitemaps.py`

```python
from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from servicios.models import Servicio, SubServicio
from proyectos.models import Proyecto
from blog.models import Post


class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = 'monthly'

    def items(self):
        return ['index', 'aboutUs', 'contact', 'blog', 'projects', 'servicios']

    def location(self, item):
        if item == 'index':
            return '/'
        return f'/{item}'


class ServicioSitemap(Sitemap):
    priority = 0.9
    changefreq = 'weekly'

    def items(self):
        return Servicio.objects.all()

    def lastmod(self, obj):
        return obj.updated_at if hasattr(obj, 'updated_at') else None


class SubServicioSitemap(Sitemap):
    priority = 0.7
    changefreq = 'monthly'

    def items(self):
        return SubServicio.objects.select_related('servicio').all()

    def location(self, obj):
        return f'/servicios/{obj.servicio.slug}/{obj.slug}'


class ProyectoSitemap(Sitemap):
    priority = 0.7
    changefreq = 'monthly'

    def items(self):
        return Proyecto.objects.all()

    def lastmod(self, obj):
        return obj.updated_at if hasattr(obj, 'updated_at') else None


class BlogSitemap(Sitemap):
    priority = 0.6
    changefreq = 'weekly'

    def items(self):
        return Post.objects.all()

    def lastmod(self, obj):
        return obj.updated_at if hasattr(obj, 'updated_at') else None
```

### 2. Modificar `magna_web/urls.py`

```python
from django.contrib.sitemaps.views import sitemap
from magna_web.sitemaps import (
    StaticViewSitemap, ServicioSitemap, SubServicioSitemap,
    ProyectoSitemap, BlogSitemap
)

sitemaps = {
    'static': StaticViewSitemap,
    'servicios': ServicioSitemap,
    'subservicios': SubServicioSitemap,
    'proyectos': ProyectoSitemap,
    'blog': BlogSitemap,
}

urlpatterns = [
    # ... rutas existentes ...
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
```

### 3. Modificar `magna_web/settings/base.py`

Agregar `'django.contrib.sitemaps'` a `INSTALLED_APPS`.

### 4. Limpiar frontend

- Eliminar o deshabilitar `src/page/sitemap/sitemap.tsx`
- Eliminar la ruta `/sitemap.xml` del router en `main.tsx` (actualmente es `{ path: '/sitemap.xml', element: <Sitemap /> }`)

### 5. Probar

```bash
# Verificar que el sitemap se genera correctamente
curl http://localhost:8000/sitemap.xml

# Debe devolver XML con todas las URLs
# Verificar que incluye:
# - /, /aboutUs, /contact, /servicios, /projects, /blog
# - /servicios/{slug} para cada servicio
# - /servicios/{servicio_slug}/{subservicio_slug} para cada subservicio
# - /projects/{id} para cada proyecto
# - /blog/{id} para cada post
```

## Criterios de éxito

- [ ] `magna_web/sitemaps.py` creado con clases para todos los modelos
- [ ] `/sitemap.xml` responde con XML válido
- [ ] El sitemap incluye URLs estáticas + dinámicas
- [ ] `django.contrib.sitemaps` en INSTALLED_APPS
- [ ] Sitemap basado en React eliminado del frontend
- [ ] Google puede rastrear el sitemap correctamente
- [ ] No hay URLs duplicadas ni rotas en el sitemap

## Documentación de resultados

Al finalizar, crear `docs/seo-v2/resultados/fase-05-sitemaps-dinamicos.md` con:
- Archivos creados/modificados
- Número de URLs en el sitemap
- Ejemplo de XML generado
- Tests de validación
- Tiempo total
