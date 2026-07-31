# Fase 4: SEO Híbrido — Django Template Inheritance + React Helmet-Async

## Objetivo
Implementar un sistema SEO híbrido donde Django pre-renderiza los metadatos en el `<head>` vía template inheritance con `data-rh="true"`, y React toma el control durante la navegación SPA con `react-helmet-async`. Esto asegura que los crawlers vean meta tags completos sin perder la reactividad del SPA.

## Arquitectura

```
Petición HTTP → Django URL routing
    ├── Si es ruta API → DRF ViewSet (respuesta JSON)
    └── Si es ruta SPA → indexView (TemplateView)
         └── Renderiza templates/index.html
              └── {% include "seo/meta.html" %}  ← Django inyecta <head> con data-rh="true"
              └── <div id="root"></div>           ← React hidrata
                   └── react-helmet-async reemplaza meta tags durante navegación SPA
```

**Regla clave:** Todas las etiquetas en `meta.html` DEBEN incluir `data-rh="true"` para que React Helmet las reconozca y pueda sobreescribirlas en navegaciones client-side.

## Archivos a modificar/crear

| Archivo | Acción |
|---|---|
| `magna_web/templates/seo/meta.html` | Crear — partial con <title>, <meta>, JSON-LD, OpenGraph |
| `magna_web/templates/index.html` | Crear — plantilla base SPA que incluye meta.html |
| `magna_web/views.py` | Crear — vista que construye contexto `seo` según la URL |
| `magna_web/urls.py` | Modificar — conectar la vista a las rutas SPA |
| `magna_web/sitemaps.py` | Crear — sitemap dinámico con django.contrib.sitemaps |
| `magna-page/unified/src/page/main.tsx` | Verificar HelmetProvider ya está configurado |
| `magna-page/unified/src/page/App.tsx` | Verificar que usa `<Helmet>` en cada página |

## Skills requeridas (cargar antes de empezar)

1. **`django-expert`** — Para views, templates, sitemaps
2. **`django-patterns`** — Para arquitectura de templates y herencia
3. **`seo`** — Para meta tags, structured data (JSON-LD), OpenGraph
4. **`frontend-design`** — Para tocar componentes React si es necesario

## Referencias

- **AGENTS.md**: §Key Models (Servicio, Slide, Brochure, Post, Product), §Style Conventions
- **DESIGN.md**: No existe. Ver AGENTS.md §Visual Uniformity Rules para tokens de diseño.
- `react-helmet-async`: ya instalado en `package.json`, ya usado en `main.tsx` y `App.tsx`
- Los componentes de página existentes en `src/page/pages/` ya usan `<Helmet>`

## Instrucciones detalladas

### 1. Crear `magna_web/templates/seo/meta.html`

```django
{% if seo %}
<title data-rh="true">{{ seo.title|default:"Magna Ingeniería y Topografía" }}</title>
<meta data-rh="true" name="description" content="{{ seo.description|default:'Servicios profesionales de ingeniería civil, topografía y consultoría en Ibagué, Tolima.' }}" />
<meta data-rh="true" name="keywords" content="{{ seo.keywords|default:'Magna, ingeniería, topografía, Ibagué, Tolima, Colombia' }}" />
<link data-rh="true" rel="canonical" href="{{ seo.canonical|default:request.build_absolute_uri }}" />
<meta data-rh="true" property="og:title" content="{{ seo.og_title|default:seo.title }}" />
<meta data-rh="true" property="og:description" content="{{ seo.og_description|default:seo.description }}" />
<meta data-rh="true" property="og:url" content="{{ seo.canonical|default:request.build_absolute_uri }}" />
<meta data-rh="true" property="og:type" content="{{ seo.og_type|default:'website' }}" />
{% if seo.json_ld %}
<script data-rh="true" type="application/ld+json">{{ seo.json_ld|safe }}</script>
{% endif %}
{% endif %}
```

### 2. Crear `magna_web/templates/index.html`

```django
{% load static %}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="{% static 'icono-magna.svg' %}" />
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    {% include "seo/meta.html" %}
    {% if seo.css %}
    {{ seo.css|safe }}
    {% endif %}
</head>
<body>
    <div id="root"></div>
    {# Los scripts los inyecta Vite en el build #}
</body>
</html>
```

### 3. Crear `magna_web/views.py`

Crear una vista que:
- Toma `request.path`
- Analiza la URL para determinar qué modelo consultar
- Construye un diccionario `seo` con los metadatos apropiados
- Renderiza `templates/index.html` con ese contexto
- Hace fallback a metadatos genéricos si no hay match

```python
from django.views.generic import TemplateView
from django.conf import settings
from django.urls import resolve, Resolver404

class SPAView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        path = self.request.path.strip('/')
        seo = self._build_seo(path)
        context['seo'] = seo
        return context

    def _build_seo(self, path):
        # Lógica para construir metadatos según la ruta
        # Consultar DB para rutas dinámicas (servicios, proyectos, blog)
        # Fallback a defaults
        pass
```

### 4. Modificar `urls.py`

Conectar `SPAView` como catch-all:

```python
from magna_web.views import SPAView

# Al final de urlpatterns:
urlpatterns += [re_path(r'^(?!media/|admin/).*$', SPAView.as_view(), name='index')]
```

### 5. Configurar `HelmetProvider` en React

Verificar que `main.tsx` ya tiene `<HelmetProvider>` (sí, ya existe). Verificar que cada página usa `<Helmet>` con `data-rh="true"`:

```tsx
<Helmet>
  <title data-rh="true">Servicios | Magna Ingeniería y Topografía</title>
  <meta data-rh="true" name="description" content="..." />
</Helmet>
```

### 6. Verificar que `data-rh="true"` funciona

El mecanismo es:
1. Django inyecta `<title data-rh="true">Servicios | Magna</title>` en el HTML inicial
2. React Helmet escanea el DOM, encuentra `data-rh="true"` y lo adopta
3. Cuando el usuario navega a otra ruta, React Helmet actualiza las etiquetas `data-rh="true"`
4. En navegación SPA, React Helmet maneja todo sin recargar

## Criterios de éxito

- [ ] `<title>` con `data-rh="true"` aparece en el HTML servido por Django
- [ ] `<meta name="description">` con `data-rh="true"` aparece
- [ ] JSON-LD con `data-rh="true"` aparece en páginas relevantes
- [ ] React Helmet reemplaza correctamente los meta tags en navegación SPA
- [ ] Crawler (Googlebot) ve los meta tags correctos en el HTML inicial
- [ ] No hay conflictos entre Django y React Helmet
- [ ] La navegación SPA sigue funcionando sin recargas

## Documentación de resultados

Al finalizar, crear `docs/seo-v2/resultados/fase-04-seo-hibrido-django-react.md` con:
- Archivos creados/modificados
- Cómo se resolvió el mecanismo data-rh
- Tests de crawler (curl, Chrome DevTools)
- Líneas de código
- Tiempo total
