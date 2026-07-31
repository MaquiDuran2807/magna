# Fase 1: Backend — Modelos + API

## Que se hizo

Se agregaron campos `slug` y `meta_description` a los modelos Servicio, SubServicio y Proyecto. Se creo el endpoint `GET /servicios/subservicio/<slug:slug>/` para obtener detalle de subservicio con su servicio padre. Se creo el management command `generate_slugs` para poblar slugs existentes.

## Por que se hizo

Los slugs permiten URLs legibles y SEO-friendly (`/servicios/topografia` en vez de `/servicios/3`). La meta_description se almacena en BD para que cada pagina pueda tener su propia descripcion editable desde el admin. El endpoint de detalle es necesario para la pagina de subservicio individual.

## Impacto

- 3 modelos actualizados con campos SEO
- 1 nuevo endpoint publico
- 5 tests nuevos
- Sin impacto en rendimiento (los slugs tienen indice)

## Tests

```
python manage.py test servicios.tests.SEOTests
```

5 tests: slug autogenerado en Servicio, slug autogenerado en SubServicio, endpoint 200 con meta_description, 404 para slug inexistente, serializer incluye slug.

## Como probar en interfaz

1. Ir al admin de Django `/admin/` y verificar que Servicio, SubServicio y Proyecto tienen campos `slug` y `meta_description`
2. Visitar `http://localhost:8000/servicios/subservicio/topografia/` (o cualquier slug valido) y ver que devuelve JSON con `meta_description` y `servicio_padre`
3. Ejecutar `python manage.py generate_slugs --dry-run` para ver que slugs se generarian
