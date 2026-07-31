# Fase 3: SSG — Prerendering Pipeline

## Que se hizo

Se creo el script `prerender.mjs` que durante el build inicia Django, descubre rutas via API, renderiza cada pagina con Puppeteer (navegador headless), espera a que React se hidrate y Helmet actualice el `<head>`, captura el HTML completo y lo guarda en `dist/prerendered/{path}/index.html`. Se agrego el comando `npm run build:ssg` y el test de verificacion `test-prerender.mjs`.

Tambien soporta prerender parcial:
- `node prerender.mjs --route /servicios/topografia` — renderiza una pagina especifica
- `node prerender.mjs --batch servicios` — renderiza un lote (servicios, projects, blog)
- `npm run build:ssg` o `node prerender.mjs` — renderiza todo

## Por que se hizo

Sin SSG, los bots ven HTML vacio (`<div id="root"></div>`). Con SSG, Django sirve HTML completo con titulo, descripcion y contenido visibles desde el primer response. La hidratacion de React sigue funcionando en el cliente.

## Impacto

- Build time: ~30s (tsc + vite) + ~60s (prerender) = ~90s total
- 45 archivos HTML generados (6 estaticos + 39 dinamicos)
- Cada archivo: 15-235 KB con HTML completo
- Prerender parcial: ~15s por ruta individual, ~30s por lote

## Tests

```
cd magna-page/unified
node test-prerender.mjs
```

98 checks en 20 archivos. Verifica: title personalizado, meta description, body con contenido (>500 chars), sin errores JS (TypeError, RangeError, Cannot read), script module.

## Como probar en interfaz

1. Ejecutar `cd magna-page/unified && npm run build:ssg`
2. Iniciar Django: `python manage.py runserver`
3. Visitar cualquier ruta: `/`, `/servicios/topografia`, `/projects/1`
4. View source debe mostrar HTML completo con contenido dentro de `<div id="root">`, no el shell vacio
5. El titulo de la pestana debe ser el especifico de cada pagina (ej: "Contacto | Magna..." no "Magna Ingenieria y Topografia")
6. View source no debe contener "Unexpected Application Error" ni "TypeError"

## Nota sobre produccion

Los HTML prerendered tienen rutas de imagenes y estilos hardcodeadas del momento del build. Si se actualizan imagenes en el server, los prerendered no se actualizan hasta el proximo build. Esto es intencional — el prerendered es un snapshot estatico para SEO. El contenido dinamico (como imagenes nuevas) se actualiza al ejecutar `npm run build:ssg` de nuevo.
