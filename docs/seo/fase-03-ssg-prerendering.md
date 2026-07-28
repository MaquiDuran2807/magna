# Fase 3: SSG — Prerendering Pipeline

## Objetivo

Generar HTML completo para cada ruta del SPA durante el build usando Puppeteer, para que bots y crawlers vean contenido renderizado sin depender de JS.

## Cambios realizados

### Nuevos archivos

| Archivo | Descripción | LOC |
|---------|-------------|-----|
| `unified/prerender.mjs` | Script que inicia Django, descubre rutas, renderiza con Puppeteer y guarda HTML | ~150 |
| `unified/test-prerender.mjs` | Verifica integridad de archivos prerendered post-build | ~95 |

### Archivos modificados

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `unified/package.json` | +devDependency puppeteer, +script `build:ssg` | +2 |
| `unified/.gitignore` | +`dist/prerendered/` | +1 |
| **Total** | | **~248 LOC** |

## Scripts

```bash
# Build + prerender
cd magna-page/unified
npm run build:ssg

# Verificar prerendered
node test-prerender.mjs
```

### `npm run build:ssg`

Ejecuta en secuencia:
1. `tsc` — typecheck TypeScript
2. `vite build` — build del SPA
3. `node prerender.mjs` — prerendering con Puppeteer

## Pipeline de prerender

1. Inicia Django en `localhost:8000` (subproceso, API disponible)
2. Lanza Puppeteer (Chromium headless)
3. Descubre rutas dinámicas via API:
   - Servicios y subservicios: `GET /servicios/servicios-and-subservicios/`
   - Proyectos: `GET /proyectos/`
   - Blog posts: `GET /blog/`
4. Renderiza cada ruta (estáticas + dinámicas)
5. Espera a que React Helmet actualice el `<title>`
6. Captura HTML y lo guarda en `dist/prerendered/{path}/index.html`
7. Cierra Puppeteer y mata Django

## Archivos generados (ejemplo)

```
dist/prerendered/
├── index.html
├── servicios/index.html
├── servicios/topografia/index.html
├── servicios/topografia/levantamiento-planimetrico/index.html
├── servicios/ingenieria/index.html
├── proyectos/index.html
├── proyectos/1/index.html
├── proyectos/2/index.html
├── blog/index.html
├── blog/1/index.html
├── aboutUs/index.html
└── contact/index.html
```

## Verificación

`test-prerender.mjs` corre 6 checks por archivo estático:
- Tiene `<title>`
- Title no es el default de Helmet (excepto index)
- Tiene `<meta name="description"`
- Tiene `<div id="root">`
- Root tiene contenido (≥200 chars)
- Tiene `<script type="module"`

Y verifica que subdirectorios dinámicos (servicios/*, projects/*, blog/*) tengan HTML con `<title>` y `<div id="root">`.
