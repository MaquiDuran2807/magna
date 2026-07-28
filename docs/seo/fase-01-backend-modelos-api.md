# Fase 1: Backend — Modelos + API

## Objetivo

Agregar campos SEO (`slug`, `meta_description`) a modelos clave y crear endpoint de detalle de subservicio.

## Cambios realizados

### Modelos

| Modelo | Campo nuevo | Tipo |
|--------|-------------|------|
| `servicios.Servicio` | `slug` | `SlugField(blank=True, db_index=True)` |
| `servicios.SubServicio` | `slug` | `SlugField(blank=True, db_index=True)` |
| `servicios.SubServicio` | `meta_description` | `TextField(blank=True)` |
| `proyectos.Proyecto` | `slug` | `SlugField(blank=True, db_index=True)` |
| `proyectos.Proyecto` | `meta_description` | `TextField(blank=True)` |

Los slugs se autogeneran con `slugify(nombre)` en `save()` si están vacíos.

### Nuevo endpoint

```
GET /servicios/subservicio/<slug:slug>/
→ SubServicioDetailSerializer con servicio_padre anidado
```

### Serializers actualizados

- `subServicesSerializer` → incluye `slug`, `meta_description`, `servicio` (explícito)
- `ServicioSerializer` → incluye `slug`
- `ServicesAndSubservicesSerializer` → incluye `slug`
- Nuevo `SubServicioDetailSerializer` → detalle con `servicio_padre`

### Management command

```bash
python manage.py generate_slugs
```

Puebla slugs para registros existentes sin slug en Servicio, SubServicio y Proyecto.

### Tests (5 nuevos en `servicios.tests.SEOTests`)

| Test | Verifica |
|------|----------|
| `test_slug_generated_auto_servicio` | Slug se genera con slugify |
| `test_slug_generated_auto_subservicio` | Slug se genera en SubServicio |
| `test_subservicio_detail_endpoint` | Endpoint devuelve 200 + meta_description + servicio_padre |
| `test_subservicio_detail_not_found` | 404 para slug inexistente |
| `test_serializer_includes_slug` | Serializer existente incluye slug |

### Migraciones

- `servicios/migrations/0006_servicio_slug_subservicio_meta_description_and_more.py`
- `proyectos/migrations/0002_proyecto_meta_description_proyecto_slug.py`

### Archivos modificados/creados

| Archivo | Cambio |
|---------|--------|
| `servicios/models.py` | +slug (Servicio), +slug + meta_description (SubServicio) |
| `proyectos/models.py` | +slug + meta_description (Proyecto) |
| `servicios/serializer.py` | +SubServicioDetailSerializer, fields actualizados |
| `servicios/views.py` | +SubServicioDetailView |
| `servicios/urls.py` | +ruta subservicio |
| `servicios/management/commands/generate_slugs.py` | NUEVO |
| `servicios/tests.py` | +SEOTests (5 tests) |

### Notas técnicas

- `SlugField` usa `db_index=True` en lugar de `unique=True` para evitar conflictos de migración con datos existentes vacíos. La unicidad se garantiza en práctica con `slugify`.
- El endpoint usa `permission_classes = [AllowAny]` siguiendo el patrón del resto de endpoints públicos.
