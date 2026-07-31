# Fase 4: Django sirve HTML prerendered

## Que se hizo

Se modifico el `indexView` en `magna_web/urls.py` para que primero busque el archivo prerendered en `dist/prerendered/{path}/index.html`. Si existe, lo sirve directamente con `content-type: text/html`. Si no existe, cae al SPA original. Se agrego la ruta `/ssg/` para comparar la version prerendered vs la SPA en desarrollo.

## Por que se hizo

Los archivos prerendered de la Fase 3 estaban en disco pero Django no los servia. Sin este cambio, los bots seguian viendo el SPA shell. Ahora Django sirve el HTML prerendered cuando existe, y el SPA normal cuando no.

## Impacto

- Sin aumento de tiempo de response (solo un `path.exists()` antes de servir)
- Las rutas con prerendered se sirven instantaneamente (archivo estatico)
- Las rutas sin prerendered siguen funcionando con el SPA normal
- La ruta `/ssg/` permite comparar visualmente SPA vs SSG

## Tests

```
python manage.py test
```

Verifica que las rutas prerendered devuelvan 200 con HTML completo.

## Como probar en interfaz

1. Iniciar Django: `python manage.py runserver`
2. Visitar `http://localhost:8000/servicios/topografia`
3. View source debe mostrar HTML completo (no el shell `<div id="root"></div>`)
4. El HTML debe tener meta tags, titulo especifico, y contenido dentro de `<div id="root">`
5. Visitar `http://localhost:8000/ssg/servicios/topografia` para ver la misma pagina prerendered (para comparar con la SPA en `http://localhost:8000/servicios/topografia` sin `/ssg/`)
6. Visitar una ruta sin prerendered (ej: `/login`) y verificar que carga el SPA normal
