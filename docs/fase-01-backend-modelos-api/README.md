# Fase 1: Backend — Modelos + API

## Contexto

Actualmente los modelos no tienen campos para SEO:

- `SubServicio` no tiene `meta_description` ni `slug`
- `Servicio` no tiene `slug`
- `Proyecto` no tiene `meta_description` ni `slug`

El `slug` es necesario para URLs limpias tipo `/servicios/topografia/levantamiento-planimetrico`.
El `meta_description` en `SubServicio` permite al admin personalizar la descripción que ven los buscadores.

No existe un endpoint para obtener el detalle de un subservicio individual (solo se devuelven anidados dentro de servicios).

**Frontend activo:** `magna-page/unified/` (NO `magna-page/page/` ni `magna-page/store/` — esos son legacy).

---

## Qué hacer

### Objetivos

1. Agregar `slug` (autogenerado con `slugify`) a `Servicio`, `SubServicio`, `Proyecto`
2. Agregar `meta_description` a `SubServicio` y `Proyecto`
3. Crear endpoint `GET /servicios/subservicio/<slug:slug>/` que devuelva subservicio + servicio padre
4. Actualizar serializers para incluir los nuevos campos
5. Crear management command para poblar slugs de datos existentes
6. Escribir tests
7. Hacer commit y push a rama `seo-ssg/fase-01-backend`

---

## Cómo hacer y dónde hacer

### 1.1 Agregar campos a modelos

**Archivo:** `servicios/models.py`

Agregar en `Servicio`:
```python
slug = models.SlugField(max_length=100, unique=True, blank=True)
```

En el método `save()` de `Servicio`, al inicio:
```python
from django.utils.text import slugify
# ...
if not self.slug:
    self.slug = slugify(self.nombre)
```

Agregar en `SubServicio`:
```python
meta_description = models.TextField(blank=True, verbose_name='Meta Description (SEO)')
slug = models.SlugField(max_length=100, unique=True, blank=True)
```

En el método `save()` de `SubServicio`, al inicio:
```python
if not self.slug:
    self.slug = slugify(self.nombre)
```

**Archivo:** `proyectos/models.py`

Agregar en `Proyecto`:
```python
meta_description = models.TextField(blank=True, verbose_name='Meta Description (SEO)')
slug = models.SlugField(max_length=150, unique=True, blank=True)
```

En el método `save()` de `Proyecto`, al inicio:
```python
if not self.slug:
    self.slug = slugify(self.nombre)
```

### 1.2 Crear migraciones

```bash
python manage.py makemigrations servicios proyectos
python manage.py migrate
```

### 1.3 Crear serializador de detalle

**Archivo:** `servicios/serializer.py`

Agregar:
```python
class SubServicioDetailSerializer(serializers.ModelSerializer):
    servicio_padre = serializers.SerializerMethodField()

    class Meta:
        model = SubServicio
        fields = [
            'id', 'nombre', 'descripcion', 'meta_description',
            'slug', 'imagen', 'imagen_tablet', 'imagen_celular',
            'servicio', 'servicio_padre',
        ]

    def get_servicio_padre(self, obj):
        return {
            'nombre': obj.servicio.nombre,
            'slug': obj.servicio.slug,
            'id': obj.servicio.id,
        }
```

Actualizar `subServicesSerializer` para incluir `slug` y `meta_description` en `fields`.

Actualizar `ServicioSerializer` para incluir `slug` en `fields`.

### 1.4 Crear vista de detalle

**Archivo:** `servicios/views.py`

```python
from rest_framework.generics import RetrieveAPIView

class SubServicioDetailView(RetrieveAPIView):
    queryset = SubServicio.objects.all()
    serializer_class = SubServicioDetailSerializer
    lookup_field = 'slug'
```

### 1.5 Agregar URL

**Archivo:** `servicios/urls.py`

```python
path('subservicio/<slug:slug>/', SubServicioDetailView.as_view()),
```

### 1.6 Crear management command para poblar slugs

**Archivo NUEVO:** `servicios/management/commands/generate_slugs.py`

```python
from django.core.management.base import BaseCommand
from servicios.models import Servicio, SubServicio
from proyectos.models import Proyecto

class Command(BaseCommand):
    help = 'Genera slugs para Servicio, SubServicio y Proyecto existentes que no tengan slug'

    def handle(self, *args, **options):
        count = 0
        for s in Servicio.objects.filter(slug=''):
            s.save()
            count += 1
            self.stdout.write(f'  Servicio: {s.nombre} → {s.slug}')
        for s in SubServicio.objects.filter(slug=''):
            s.save()
            count += 1
            self.stdout.write(f'  SubServicio: {s.nombre} → {s.slug}')
        for p in Proyecto.objects.filter(slug=''):
            p.save()
            count += 1
            self.stdout.write(f'  Proyecto: {p.nombre} → {p.slug}')
        self.stdout.write(self.style.SUCCESS(f'Total generados: {count}'))
```

### 1.7 Escribir tests

**Archivo:** `servicios/tests.py` (agregar al final)

```python
class SEOTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.servicio = Servicio.objects.create(
            nombre='Topografía',
            descripcion='Servicios topográficos'
        )
        self.sub = SubServicio.objects.create(
            servicio=self.servicio,
            nombre='Levantamiento Planimétrico',
            descripcion='Descripción del servicio',
            meta_description='SEO: Levantamiento topográfico planimétrico con drones y estación total'
        )
        self.proyecto = Proyecto.objects.create(
            nombre='Proyecto Test',
            descripcion='Descripción',
        )

    def test_slug_generated_auto_servicio(self):
        """El slug se genera automáticamente desde el nombre"""
        s = Servicio.objects.create(nombre='Topografía y Geodesia')
        self.assertEqual(s.slug, 'topografia-y-geodesia')

    def test_slug_generated_auto_subservicio(self):
        s = SubServicio.objects.create(
            servicio=self.servicio,
            nombre='Curvas de Nivel'
        )
        self.assertEqual(s.slug, 'curvas-de-nivel')

    def test_subservicio_detail_endpoint(self):
        """El endpoint devuelve datos correctos"""
        response = self.client.get(f'/servicios/subservicio/{self.sub.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('servicio_padre', response.data)
        self.assertEqual(response.data['meta_description'], self.sub.meta_description)
        self.assertEqual(response.data['servicio_padre']['nombre'], 'Topografía')

    def test_subservicio_detail_not_found(self):
        response = self.client.get('/servicios/subservicio/slug-inexistente/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_serializer_includes_slug(self):
        response = self.client.get('/servicios/servicios-and-subservicios/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        if len(response.data) > 0:
            self.assertIn('slug', response.data[0])
```

### 1.8 Ejecutar tests

```bash
python manage.py test servicios.tests.SEOTests
```

### 1.9 Ejecutar management command

```bash
python manage.py generate_slugs
```

---

## Tests esperados

| Test | Verifica |
|------|----------|
| `test_slug_generated_auto_servicio` | Slug se genera con `slugify(nombre)` |
| `test_slug_generated_auto_subservicio` | Slug se genera en SubServicio |
| `test_subservicio_detail_endpoint` | Endpoint devuelve meta_description + servicio_padre |
| `test_subservicio_detail_not_found` | 404 para slug inexistente |
| `test_serializer_includes_slug` | Serializer existente incluye slug |

---

## Documentación del resultado

### Qué se hizo

- Se agregaron campos `slug` y `meta_description` a los modelos `Servicio`, `SubServicio`, `Proyecto`
- Se creó el endpoint `GET /servicios/subservicio/<slug:slug>/`
- Se actualizaron serializers para exponer los nuevos campos
- Se creó el management command `generate_slugs`
- Se escribieron 5 tests

### Por qué se hizo

- `slug`: necesario para URLs SEO-friendly y para el SSG (mapear rutas a archivos)
- `meta_description`: permite al admin controlar el texto que ven los buscadores por subservicio
- Endpoint de detalle: necesario para que la nueva página de subservicio (Fase 2) consuma los datos

### Líneas de código

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `servicios/models.py` | +slug, +meta_description | +6 |
| `proyectos/models.py` | +slug, +meta_description | +6 |
| `servicios/serializer.py` | +SubServicioDetailSerializer, +fields | +20 |
| `servicios/views.py` | +SubServicioDetailView | +6 |
| `servicios/urls.py` | +ruta subservicio | +1 |
| `servicios/management/commands/generate_slugs.py` | NUEVO | +25 |
| `servicios/tests.py` | +SEOTests | +55 |
| **Total** | | **~119 LOC** |

### Migraciones

```bash
servicios/migrations/XXXX_add_slug_meta.py
proyectos/migrations/XXXX_add_slug_meta.py
```

### Rendimiento

- El nuevo endpoint es una consulta simple: `SELECT * FROM subservicio WHERE slug = ?` (con índice único)
- Sin impacto medible en rendimiento

---

## Git

```bash
# Crear rama desde main (o desde el branch anterior si estamos acumulando)
git checkout -b seo-ssg/fase-01-backend

# Implementar todo lo anterior...

git add -A
git commit -m "seo-ssg: fase 1 — modelos + API (slug, meta_description, endpoint subservicio)"
git push origin seo-ssg/fase-01-backend

# Opcional: crear PR
gh pr create --base main --head seo-ssg/fase-01-backend \
  --title "Fase 1: Backend — Modelos + API" \
  --body "Agrega slug, meta_description a Servicio/SubServicio/Proyecto. Endpoint GET /servicios/subservicio/<slug:slug>/. Tests. Management command generate_slugs."
```
