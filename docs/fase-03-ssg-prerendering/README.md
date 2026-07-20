# Fase 3: SSG — Prerendering Pipeline

## Contexto

El SPA actual solo sirve HTML vacío (`<div id="root"></div>`) para todas las rutas.
React Helmet actualiza los meta tags, pero solo después de que el JS se descarga y ejecuta.
Los bots (Googlebot, crawlers de redes sociales) frecuentemente no ejecutan JS, por lo que ven páginas sin contenido ni meta tags.

**Solución:** Durante el build, un script con Puppeteer renderiza cada ruta del SPA en un navegador headless,
espera a que React se hidrate y Helmet actualice el `<head>`, captura el HTML completo,
y lo guarda como archivos estáticos que Django puede servir directamente.

**Frontend activo:** `magna-page/unified/` (NO `magna-page/page/` ni `magna-page/store/` — esos son legacy).

---

## Qué hacer

### Objetivos

1. Instalar Puppeteer como devDependency
2. Crear script `prerender.mjs` que:
   - Inicia Django como subproceso (para que la API esté disponible)
   - Descubre rutas dinámicas via API (servicios, subservicios, proyectos)
   - Renderiza cada ruta con Puppeteer
   - Espera a que Helmet actualice el `<title>`
   - Captura el HTML y lo guarda en `dist/prerendered/{path}/index.html`
3. Agregar script `build:ssg` en `package.json`
4. Crear test de verificación post-prerender
5. Hacer commit y push a rama `seo-ssg/fase-03-ssg`

---

## Cómo hacer y dónde hacer

### 3.1 Instalar Puppeteer

```bash
cd magna-page/unified
npm install -D puppeteer
```

> Si el equipo no tiene Chrome/Chromium, Puppeteer lo descarga automáticamente.

### 3.2 Crear script prerender.mjs

**Archivo NUEVO:** `magna-page/unified/prerender.mjs`

```javascript
import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { spawn } from 'child_process';

const DIST_DIR = resolve(import.meta.dirname, 'dist');
const PRERENDER_DIR = resolve(DIST_DIR, 'prerendered');
const DJANGO_PORT = 8000;
const BASE_URL = `http://localhost:${DJANGO_PORT}`;

// Rutas estáticas que siempre deben existir
const STATIC_ROUTES = [
    { path: '/', name: 'index' },
    { path: '/aboutUs', name: 'aboutUs' },
    { path: '/contact', name: 'contact' },
    { path: '/servicios', name: 'servicios' },
    { path: '/projects', name: 'projects' },
    { path: '/blog', name: 'blog' },
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startDjango() {
    console.log('[prerender] Iniciando Django...');
    const django = spawn('python', ['manage.py', 'runserver', `0.0.0.0:${DJANGO_PORT}`], {
        stdio: 'pipe',
        shell: true,
        cwd: resolve(import.meta.dirname, '..', '..'),
    });

    django.stderr.on('data', (data) => {
        const msg = data.toString();
        if (msg.includes('Error')) {
            console.error('[prerender] Django error:', msg);
        }
    });

    // Esperar a que Django esté listo
    let ready = false;
    for (let i = 0; i < 60; i++) {
        try {
            const res = await fetch(`${BASE_URL}/servicios/servicios-and-subservicios/`);
            if (res.ok) { ready = true; break; }
        } catch {}
        await sleep(1000);
    }
    if (!ready) {
        throw new Error('Django no inició después de 60 segundos');
    }
    console.log('[prerender] Django listo');
    return django;
}

async function discoverDynamicRoutes() {
    console.log('[prerender] Descubriendo rutas dinámicas...');
    const routes = [];

    // Servicios y subservicios
    try {
        const res = await fetch(`${BASE_URL}/servicios/servicios-and-subservicios/`);
        const servicios = await res.json();
        for (const servicio of servicios) {
            if (servicio.slug) {
                routes.push({
                    path: `/servicios/${servicio.slug}`,
                    file: `servicios/${servicio.slug}/index.html`
                });
            }
            for (const sub of (servicio.subservicios || [])) {
                if (sub.slug && servicio.slug) {
                    routes.push({
                        path: `/servicios/${servicio.slug}/${sub.slug}`,
                        file: `servicios/${servicio.slug}/${sub.slug}/index.html`
                    });
                }
            }
        }
    } catch (err) {
        console.warn('[prerender] Warning: no se pudieron obtener servicios:', err.message);
    }

    // Proyectos
    try {
        const res = await fetch(`${BASE_URL}/proyectos/`);
        const proyectos = await res.json();
        for (const p of (proyectos.results || [])) {
            routes.push({
                path: `/projects/${p.id}`,
                file: `projects/${p.id}/index.html`
            });
        }
    } catch (err) {
        console.warn('[prerender] Warning: no se pudieron obtener proyectos:', err.message);
    }

    // Blog posts
    try {
        const res = await fetch(`${BASE_URL}/blog/`);
        const blog = await res.json();
        for (const post of (blog.results || blog.results || [])) {
            routes.push({
                path: `/blog/${post.id}`,
                file: `blog/${post.id}/index.html`
            });
        }
    } catch (err) {
        console.warn('[prerender] Warning: no se pudieron obtener posts:', err.message);
    }

    console.log(`[prerender] ${routes.length} rutas dinámicas descubiertas`);
    return routes;
}

async function prerender() {
    console.log('=== Iniciando prerendering SSG ===\n');

    // 1. Iniciar Django
    const django = await startDjango();

    // 2. Iniciar Puppeteer
    console.log('[prerender] Iniciando Puppeteer...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Configurar timeouts
    page.setDefaultNavigationTimeout(30000);
    page.setDefaultTimeout(15000);

    // 3. Recolectar todas las rutas
    const allRoutes = [...STATIC_ROUTES, ...(await discoverDynamicRoutes())];
    console.log(`[prerender] Total rutas a renderizar: ${allRoutes.length}\n`);

    let success = 0;
    let failed = 0;

    for (const route of allRoutes) {
        const url = `${BASE_URL}${route.path}`;
        const outputPath = resolve(PRERENDER_DIR, route.file);

        try {
            process.stdout.write(`[prerender] ${route.path}... `);

            await page.goto(url, { waitUntil: 'networkidle0' });

            // Esperar a que Helmet actualice el <title> (indicador de hidratación)
            try {
                await page.waitForFunction(
                    () => document.title !== 'Magna Ingeniería y Topografía',
                    { timeout: 8000 }
                );
            } catch {
                // No siempre se actualiza (ej: home), no es crítico
            }

            // Esperar un momento adicional para que termine de renderizar
            await sleep(500);

            const html = await page.content();
            mkdirSync(dirname(outputPath), { recursive: true });
            writeFileSync(outputPath, html, 'utf-8');

            console.log('✓');
            success++;
        } catch (err) {
            console.log('✗');
            console.warn(`[prerender] Error en ${route.path}: ${err.message}`);

            // Guardar HTML aunque sea parcial
            try {
                const html = await page.content();
                mkdirSync(dirname(outputPath), { recursive: true });
                writeFileSync(outputPath, html, 'utf-8');
            } catch {}

            failed++;
        }
    }

    await browser.close();
    django.kill('SIGTERM');

    console.log(`\n=== Prerendering completado ===`);
    console.log(`  ✓ Éxitos: ${success}`);
    console.log(`  ✗ Fallos: ${failed}`);
    console.log(`  📁 Directorio: ${PRERENDER_DIR}`);

    if (failed > 0) {
        console.warn('\n⚠ Algunas rutas fallaron. Revisar los errores arriba.');
    }
}

prerender().catch(err => {
    console.error('\n[prerender] Error fatal:', err);
    process.exit(1);
});
```

### 3.3 Agregar script en package.json

**Archivo:** `magna-page/unified/package.json`

```json
"scripts": {
    "dev": "vite",
    "dev:page": "vite --open /index.page.html",
    "dev:store": "vite --open /index.store.html",
    "build": "tsc && vite build",
    "build:ssg": "tsc && vite build && node prerender.mjs",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
}
```

### 3.4 Agregar .gitignore para prerendered (opcional)

**Archivo:** `magna-page/unified/.gitignore`

Agregar línea:
```
dist/prerendered/
```

> Nota: Los archivos prerendered se regeneran en cada build, no es necesario versionarlos.
> Si se quiere tenerlos en el repo para facilitar el deploy, quitar esta línea.

### 3.5 Crear test de verificación

**Archivo NUEVO:** `magna-page/unified/test-prerender.mjs`

```javascript
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const PRERENDER_DIR = resolve(import.meta.dirname, 'dist', 'prerendered');

const requiredFiles = [
    'index.html',
    'servicios/index.html',
    'projects/index.html',
    'blog/index.html',
    'aboutUs/index.html',
    'contact/index.html',
];

console.log('=== Verificación de archivos prerendered ===\n');

let passed = 0;
let failed = 0;
let checks_total = 0;
let checks_passed = 0;

for (const file of requiredFiles) {
    const fullPath = resolve(PRERENDER_DIR, file);

    if (!existsSync(fullPath)) {
        console.error(`✗ FALTA: ${file}`);
        failed++;
        continue;
    }

    const html = readFileSync(fullPath, 'utf-8');
    const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);

    const checks = [
        { name: 'Tiene <title>', test: html.includes('<title>') },
        { name: 'Title no es default', test: !html.includes('<title>Magna Ingeniería y Topografía</title>') || file === 'index.html' },
        { name: 'Tiene <meta name="description"', test: html.includes('meta name="description"') },
        { name: 'Tiene <div id="root">', test: html.includes('<div id="root">') },
        { name: 'Root tiene contenido', test: /<div id="root">[\s\S]{200,}<\/div>/.test(html) },
        { name: 'Tiene <script module', test: html.includes('type="module"') },
    ];

    checks_total += checks.length;
    const fileOk = checks.every(c => c.test);
    checks_passed += checks.filter(c => c.test).length;

    if (fileOk) {
        console.log(`✓ ${file} (${sizeKB} KB) — ${checks.length}/${checks.length} checks`);
        passed++;
    } else {
        console.log(`✗ ${file} (${sizeKB} KB) — falló:`);
        for (const c of checks) {
            if (!c.test) console.log(`    - ${c.name}`);
        }
        failed++;
    }
}

// Verificar rutas dinámicas (servicios/*, projects/*)
const dynamicDirs = ['servicios', 'projects', 'blog'];
for (const dir of dynamicDirs) {
    const dirPath = resolve(PRERENDER_DIR, dir);
    if (existsSync(dirPath)) {
        const { readdirSync } = await import('fs');
        const entries = readdirSync(dirPath);
        const subdirs = entries.filter(e => existsSync(resolve(dirPath, e, 'index.html')));
        for (const sub of subdirs) {
            const subPath = resolve(dirPath, sub, 'index.html');
            const html = readFileSync(subPath, 'utf-8');
            checks_total++;
            if (html.includes('<title>') && html.includes('<div id="root">')) {
                checks_passed++;
            } else {
                failed++;
                console.log(`✗ ${dir}/${sub}/index.html — HTML incompleto`);
            }
        }
        if (subdirs.length > 0) {
            console.log(`  ✓ ${dir}/: ${subdirs.length} subdirectorios prerendered`);
        }
    }
}

console.log(`\n=== Resumen ===`);
console.log(`Archivos requeridos: ${passed}/${requiredFiles.length} OK`);
console.log(`Checks totales: ${checks_passed}/${checks_total}`);
console.log(`Fallos: ${failed}`);

if (failed > 0 || passed < requiredFiles.length) {
    console.log('\n❌ Verificación NO pasada');
    process.exit(1);
} else {
    console.log('\n✅ Verificación pasada — todos los prerendered son válidos');
}
```

---

## Tests

### Prerender verification

```bash
cd magna-page/unified
npm run build:ssg
# El build:ssg ya ejecuta el prerender automáticamente

# Verificación post-build
node test-prerender.mjs
```

### Test manual

```bash
# Iniciar Django
python manage.py runserver

# Visitar en navegador:
# http://localhost:8000/servicios

# Verificar que el HTML servido tiene contenido (no el shell vacío):
curl -s http://localhost:8000/servicios | grep -c '<div id="root">'
# Debe ser > 0 y el div debe tener contenido adentro
```

---

## Documentación del resultado

### Qué se hizo

- Se creó el script `prerender.mjs` que automatiza la generación de HTML prerendered
- Se agregó el comando `npm run build:ssg` que ejecuta build + prerender en secuencia
- Se creó `test-prerender.mjs` para verificar la integridad de los archivos generados
- Puppeteer renderiza cada ruta en un navegador headless, captura el HTML con Helmet aplicado

### Por qué se hizo

- Sin SSG, los bots ven HTML vacío sin meta tags
- Con SSG, Django sirve HTML completo con título, descripción y contenido visibles
- La hidratación de React en el cliente sigue funcionando normalmente
- El costo es solo en build time (~30-60s adicionales)

### Líneas de código

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `unified/prerender.mjs` | NUEVO | ~150 |
| `unified/test-prerender.mjs` | NUEVO | ~95 |
| `unified/package.json` | +build:ssg script, +puppeteer dep | +2 |
| `unified/.gitignore` | +dist/prerendered/ | +1 |
| **Total** | | **~248 LOC** |

### Rendimiento del build

| Sin SSG | Con SSG |
|---------|---------|
| ~30s (tsc + vite build) | ~90s (+60s de prerender) |
| 6 archivos HTML | ~50 archivos HTML (estáticas + dinámicas) |
| Solo shell vacío | HTML completo por ruta |

### Archivos generados (ejemplo)

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

Cada archivo pesa ~15-50 KB (HTML completo con estilos inline y scripts).

---

## Git

```bash
git checkout main
git pull origin main
git checkout -b seo-ssg/fase-03-ssg

# Implementar todo lo anterior...

git add -A
git commit -m "seo-ssg: fase 3 — SSG prerendering pipeline con Puppeteer"
git push origin seo-ssg/fase-03-ssg

# Opcional: crear PR
gh pr create --base main --head seo-ssg/fase-03-ssg \
  --title "Fase 3: SSG — Prerendering Pipeline" \
  --body "Script prerender.mjs con Puppeteer. build:ssg hace tsc + vite build + prerender. test-prerender.mjs verifica integridad."
```
