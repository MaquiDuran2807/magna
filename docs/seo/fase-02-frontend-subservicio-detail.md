# Fase 2: Frontend — Pagina de detalle de subservicio

## Que se hizo

Se creo la pagina `/servicios/:serviceSlug/:subServiceSlug` con Helmet que lee `meta_description` desde la BD, breadcrumbs con JSON-LD, canonical URL, OG tags, y enlaces a proyectos relacionados.

## Por que se hizo

Cada subservicio necesita una URL unica indexable por Google con su propia meta description, breadcrumbs y JSON-LD para que los buscadores entiendan la jerarquia del sitio.

## Impacto

- 1 nueva pagina (lazy-loaded)
- 1 nueva consulta API por visita (`GET /servicios/subservicio/<slug>/`)
- Meta description editable desde admin
- Breadcrumbs visibles para usuario y crawlers

## Tests

Verificar manualmente:
1. Navegar a `/servicios/topografia/levantamiento-planimetrico` (o cualquier subservicio con slug)
2. View source debe mostrar `<title>` personalizado, `<meta name="description">` con el texto de la BD, JSON-LD BreadcrumbList, y canonical URL

## Como probar en interfaz

1. Ir a cualquier pagina de servicio: `/servicios/topografia`
2. Hacer click en un subservicio del sidebar
3. La pagina debe mostrar: breadcrumbs (Servicios > Topografia > Subservicio), titulo personalizado, descripcion, imagen, y proyectos relacionados
4. View source debe tener: meta description desde BD, JSON-LD, canonical URL, OG tags
