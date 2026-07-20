# Fase 4: Django sirve HTML prerendered

## Contexto

Actualmente `indexView` es un `TemplateView` que siempre sirve `unified/dist/index.page.html`
(el shell vacío del SPA) para TODAS las rutas capturadas por el catch-all `^(?!media/|admin/).*$`.

La Fase 3 ya genera archivos prerendered en `unified/dist/prerendered/{path}/index.html`.
Necesitamos que Django verifique si existe un prerendered para la ruta solicitada y, de ser así,
lo sirva en lugar del shell vacío.

También necesitamos una ruta `/ssg/` en desarrollo para comparar la versión SPA original vs la SSG.

---

## Qué hacer

### Objetivos

1. Modificar `indexView` de `TemplateView` a un `View` personalizado que:
   - Tome el path de la request
   - Busque `prerendered/{path}/index.html`
   - Si existe → sirva ese HTML con `HttpResponse`
   - Si no → sirva `index.page.html` (fallback SPA)
2. Agregar ruta `/ssg/{path}` en modo DEBUG para comparación
3. Escribir tests unitarios
4. Hacer commit y push a rama `seo-ssg/fase-04-django`

---

## Cómo hacer y dónde hacer

### 4.1 Modificar indexView

**Archivo:** `magna_web/urls.py`

```python
"""
URL configuration for magna_web project.
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.http import HttpResponse
from django.conf import settings
from pathlib import Path


class indexView(TemplateView):
    template_name = 'unified/dist/index.page.html'

    def get_template_names(self):
        path = self.request.path.strip('/')

        # Para /ssg/*, quitar el prefijo
        if path.startswith('ssg/'):
            path = path[4:]

        prerender_dir = Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist' / 'prerendered'

        if not path:
            candidate = prerender_dir / 'index.html'
        else:
            candidate = prerender_dir / path / 'index.html'

        if candidate.exists():
            return [str(candidate.relative_to(Path(settings.BASE_DIR) / 'magna-page'))]

        return ['unified/dist/index.page.html']


class storeView(TemplateView):
    template_name = 'unified/dist/index.store.html'


class Robots(TemplateView):
    template_name = 'unified/dist/robot.txt'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('robots.txt', Robots.as_view(), name='robots'),
    re_path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.jwt')),
    re_path('auth/', include('djoser.social.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('servicios/', include('servicios.urls')),
    path('equipos/', include('equipos.url')),
    path('proyectos/', include('proyectos.urls')),
    path('frequentQuestions/', include('frequentQuestions.urls')),
    path('contact/', include('contact.urls')),
    path("products/", include("products.urls")),
    path("blog/", include("blog.urls")),
    path('about/', include('about.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^store/', storeView.as_view(), name='store')]

# Ruta /ssg/ para comparación (solo dev)
if settings.DEBUG:
    urlpatterns += [re_path(r'^ssg/', indexView.as_view(), name='index-ssg')]

# Catch-all principal — debe ir AL FINAL
urlpatterns += [re_path(r'^(?!media/|admin/).*$', indexView.as_view(), name='index')]


admin.site.site_header = 'Administrador de Magna'
```

> **Alternativa más explícita (sin TemplateView):**

Si se prefiere un control más directo, se puede usar `View` directamente:

```python
class indexView(View):
    def get(self, request, *args, **kwargs):
        path = request.path.strip('/')

        if path.startswith('ssg/'):
            path = path[4:]

        prerender_dir = Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist' / 'prerendered'
        candidate = prerender_dir / 'index.html' if not path else prerender_dir / path / 'index.html'

        if candidate.exists():
            return HttpResponse(candidate.read_text(encoding='utf-8'))

        spa = Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist' / 'index.page.html'
        return HttpResponse(spa.read_text(encoding='utf-8'))
```

Esta versión es más explícita y fácil de testear. Se recomienda esta.

### 4.2 Verificar que el DIRS de templates incluya magna-page

**Archivo:** `magna_web/settings/base.py`

Verificar que `TEMPLATES[0]['DIRS']` incluya `BASE_DIR / 'magna-page'`:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'magna-page',
        ],
        'APP_DIRS': True,
        # ...
    },
]
```

Si se usa la versión con `View` (la recomendada), no es necesario porque leemos los archivos directamente con `Path.read_text()`.

### 4.3 Escribir tests

**Archivo NUEVO:** `magna_web/tests/__init__.py` (vacío)
**Archivo NUEVO:** `magna_web/tests/test_seo_views.py`

```python
from django.test import TestCase, override_settings
from django.conf import settings
from unittest.mock import patch, MagicMock
from pathlib import Path
import tempfile
import shutil


class IndexViewTests(TestCase):
    def setUp(self):
        # Crear estructura temporal simulando dist/
        self.temp_dir = Path(tempfile.mkdtemp())
        self.prerendered = self.temp_dir / 'prerendered'
        self.prerendered.mkdir()

        # SPA fallback simulado
        self.spa_file = self.temp_dir / 'index.page.html'
        self.spa_file.write_text(
            '<html><head><title>Magna Ingeniería y Topografía</title></head>'
            '<body><div id="root"></div></body></html>'
        )

        # Prerendered para /servicios
        servicios_dir = self.prerendered / 'servicios'
        servicios_dir.mkdir(parents=True)
        (servicios_dir / 'index.html').write_text(
            '<html><head><title>Servicios | Magna</title>'
            '<meta name="description" content="Servicios de topografía"></head>'
            '<body><div id="root"><h1>Servicios</h1></div></body></html>'
        )

        # Prerendered para homepage
        (self.prerendered / 'index.html').write_text(
            '<html><head><title>Magna Ingeniería</title></head>'
            '<body><div id="root"><h1>Bienvenidos</h1></div></body></html>'
        )

    def tearDown(self):
        shutil.rmtree(self.temp_dir)

    @patch('magna_web.urls.Path')
    def test_spa_fallback_when_no_prerendered(self, mock_path):
        """Sin prerendered, se sirve el SPA shell original"""
        # Simular que el path base apunta a nuestro temp_dir
        mock_path.return_value = self.temp_dir

        with patch.object(Path, 'exists', return_value=False):
            response = self.client.get('/ruta-inexistente')
            self.assertEqual(response.status_code, 200)
            content = response.content.decode()
            self.assertIn('<div id="root"></div>', content)
            self.assertIn('Magna Ingeniería y Topografía</title>', content)

    def test_prerendered_served_when_exists(self):
        """Cuando existe prerendered, se sirve ese HTML"""
        with patch.object(Path, 'exists') as mock_exists, \
             patch.object(Path, 'read_text') as mock_read:

            mock_exists.return_value = True
            mock_read.return_value = (
                '<html><head><title>Servicios | Magna</title></head>'
                '<body><div id="root"><h1>Servicios</h1></div></body></html>'
            )

            response = self.client.get('/servicios')
            self.assertEqual(response.status_code, 200)
            content = response.content.decode()
            self.assertIn('Servicios | Magna</title>', content)
            self.assertIn('<h1>Servicios</h1>', content)

    def test_ssg_route_dev_mode(self):
        """La ruta /ssg/ en dev sirve prerendered"""
        with patch.object(Path, 'exists') as mock_exists, \
             patch.object(Path, 'read_text') as mock_read:

            mock_exists.return_value = True
            mock_read.return_value = (
                '<html><head><title>Servicios SSG | Magna</title></head>'
                '<body><div id="root"><h1>Servicios (SSG)</h1></div></body></html>'
            )

            response = self.client.get('/ssg/servicios')
            self.assertEqual(response.status_code, 200)
            content = response.content.decode()
            self.assertIn('Servicios SSG', content)

    def test_prerendered_has_meta_description(self):
        """El HTML prerendered debe tener meta description"""
        with patch.object(Path, 'exists') as mock_exists, \
             patch.object(Path, 'read_text') as mock_read:

            mock_exists.return_value = True
            mock_read.return_value = (
                '<html><head><title>Servicios | Magna</title>'
                '<meta name="description" content="Servicios de topografía">'
                '</head><body><div id="root">...</div></body></html>'
            )

            response = self.client.get('/servicios')
            content = response.content.decode()
            self.assertIn('meta name="description"', content)
            self.assertIn('Servicios de topografía', content)

    def test_homepage_prerendered(self):
        """Homepage sirve prerendered cuando existe"""
        with patch.object(Path, 'exists') as mock_exists, \
             patch.object(Path, 'read_text') as mock_read:

            mock_exists.return_value = True
            mock_read.return_value = (
                '<html><head><title>Magna Ingeniería</title></head>'
                '<body><div id="root"><h1>Bienvenidos</h1></div></body></html>'
            )

            response = self.client.get('/')
            content = response.content.decode()
            self.assertIn('Magna Ingeniería</title>', content)
            self.assertIn('Bienvenidos', content)
```

---

## Tests

```bash
# Ejecutar tests de vistas SEO
python manage.py test magna_web.tests.test_seo_views

# Ver cobertura
python -m coverage run manage.py test magna_web.tests
python -m coverage report -m
```

### Tests esperados

| Test | Verifica |
|------|----------|
| `test_spa_fallback_when_no_prerendered` | Sin prerendered → SPA shell original |
| `test_prerendered_served_when_exists` | Con prerendered → se sirve ese HTML |
| `test_ssg_route_dev_mode` | `/ssg/` funciona en dev mode |
| `test_prerendered_has_meta_description` | El HTML prerendered tiene meta tags |
| `test_homepage_prerendered` | Homepage sirve prerendered |

---

## Documentación del resultado

### Qué se hizo

- Se modificó `indexView` para servir archivos prerendered cuando existen
- Se agregó la ruta `/ssg/` en modo DEBUG para comparación SPA vs SSG
- Se escribieron 5 tests unitarios

### Por qué se hizo

- Para que Django sirva el HTML hidratado generado por el SSG
- El fallback a SPA asegura que rutas no prerendered sigan funcionando
- La ruta `/ssg/` permite comparar rendimiento entre ambas versiones en desarrollo

### Líneas de código

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `magna_web/urls.py` | indexView modificado, +ruta /ssg/ | +30 |
| `magna_web/tests/__init__.py` | NUEVO | +0 |
| `magna_web/tests/test_seo_views.py` | NUEVO | +95 |
| **Total** | | **~125 LOC** |

### Mapa de rutas

| URL | ¿Prerendered? | Sirve |
|-----|--------------|-------|
| `/` | Sí | `prerendered/index.html` |
| `/servicios` | Sí | `prerendered/servicios/index.html` |
| `/servicios/topografia` | Sí | `prerendered/servicios/topografia/index.html` |
| `/servicios/topografia/xxx` | Sí | `prerendered/servicios/topografia/xxx/index.html` |
| `/projects` | Sí | `prerendered/projects/index.html` |
| `/projects/1` | Sí | `prerendered/projects/1/index.html` |
| `/aboutUs` | Sí | `prerendered/aboutUs/index.html` |
| `/contact` | Sí | `prerendered/contact/index.html` |
| `/ruta-inventada` | No | `index.page.html` (SPA) |
| `/ssg/servicios` | Sí | Mismo prerendered (solo dev) |

---

## Git

```bash
git checkout main
git pull origin main
git checkout -b seo-ssg/fase-04-django

# Implementar todo lo anterior...

python manage.py test magna_web.tests.test_seo_views

git add -A
git commit -m "seo-ssg: fase 4 — Django sirve prerendered + fallback SPA + ruta /ssg/ dev"
git push origin seo-ssg/fase-04-django

# Opcional: crear PR
gh pr create --base main --head seo-ssg/fase-04-django \
  --title "Fase 4: Django sirve HTML prerendered" \
  --body "indexView busca prerendered/{path}/index.html. Fallback a SPA si no existe. Ruta /ssg/ para comparación en dev. Tests unitarios."
```
