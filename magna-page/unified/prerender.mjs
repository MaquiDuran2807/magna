import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { spawn } from 'child_process';

const DIST_DIR = resolve(import.meta.dirname, 'dist');
const PRERENDER_DIR = resolve(DIST_DIR, 'prerendered');
const DJANGO_PORT = parseInt(process.env.PRERENDER_PORT, 10) || 8000;
const BASE_URL = `http://localhost:${DJANGO_PORT}`;

const STATIC_ROUTES = [
    { path: '/', file: 'index.html' },
    { path: '/aboutUs', file: 'aboutUs/index.html' },
    { path: '/contact', file: 'contact/index.html' },
    { path: '/servicios', file: 'servicios/index.html' },
    { path: '/projects', file: 'projects/index.html' },
    { path: '/blog', file: 'blog/index.html' },
];

const HELMET_DEFAULT_TITLE = 'Magna Ingeniería y Topografía';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startDjango() {
    const projectRoot = resolve(import.meta.dirname, '..', '..');
    const django = spawn('python', ['manage.py', 'runserver', `0.0.0.0:${DJANGO_PORT}`], {
        stdio: 'pipe',
        shell: true,
        cwd: projectRoot,
    });

    django.stderr.on('data', (data) => {
        const msg = data.toString();
        if (msg.includes('Error')) {
            console.error('[prerender] Django stderr:', msg);
        }
    });

    for (let i = 0; i < 30; i++) {
        try {
            const res = await fetch(`${BASE_URL}/servicios/servicios-and-subservicios/`);
            if (res.ok) break;
        } catch {}
        await sleep(1000);
    }

    return django;
}

async function discoverDynamicRoutes() {
    const routes = [];

    try {
        const res = await fetch(`${BASE_URL}/servicios/servicios-and-subservicios/`);
        const servicios = await res.json();
        for (const servicio of servicios) {
            if (servicio.slug) {
                routes.push({ path: `/servicios/${servicio.slug}`, file: `servicios/${servicio.slug}/index.html` });
            }
            for (const sub of (servicio.subservicios || [])) {
                if (sub.slug && servicio.slug) {
                    routes.push({ path: `/servicios/${servicio.slug}/${sub.slug}`, file: `servicios/${servicio.slug}/${sub.slug}/index.html` });
                }
            }
        }
    } catch (err) {
        console.warn('[prerender] Warning: no se pudieron obtener servicios:', err.message);
    }

    try {
        const res = await fetch(`${BASE_URL}/proyectos/`);
        const proyectos = await res.json();
        for (const p of (proyectos.results || [])) {
            routes.push({ path: `/projects/${p.id}`, file: `projects/${p.id}/index.html` });
        }
    } catch (err) {
        console.warn('[prerender] Warning: no se pudieron obtener proyectos:', err.message);
    }

    try {
        const res = await fetch(`${BASE_URL}/blog/`);
        const blog = await res.json();
        for (const post of (blog.results || [])) {
            routes.push({ path: `/blog/${post.id}`, file: `blog/${post.id}/index.html` });
        }
    } catch (err) {
        console.warn('[prerender] Warning: no se pudieron obtener posts:', err.message);
    }

    return routes;
}

function parseArgs() {
    const args = process.argv.slice(2);
    if (args.length === 0) return { mode: 'all' };
    if (args[0] === '--route' && args[1]) return { mode: 'route', path: args[1] };
    if (args[0] === '--batch' && args[1]) return { mode: 'batch', batch: args[1] };
    console.error('Uso: node prerender.mjs [--route /path | --batch servicios|projects|blog]');
    process.exit(1);
}

async function prerender() {
    const opts = parseArgs();
    const consoleErrors = [];

    console.log('[prerender] Iniciando Django...');
    const django = await startDjango();
    console.log('[prerender] Django listo');

    console.log('[prerender] Iniciando Puppeteer...');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    page.on('console', (msg) => {
        if (msg.type() === 'error') {
            const text = msg.text();
            if (!text.includes('ERR_BLOCKED') && !text.includes('favicon')) {
                consoleErrors.push(text);
            }
        }
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    page.setDefaultNavigationTimeout(20000);
    page.setDefaultTimeout(15000);

    let allRoutes;
    if (opts.mode === 'route') {
        const path = opts.path;
        const file = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
        allRoutes = [{ path, file }];
        console.log(`[prerender] Ruta única: ${path}\n`);
    } else if (opts.mode === 'batch') {
        const dynamicRoutes = await discoverDynamicRoutes();
        const staticFiltered = STATIC_ROUTES.filter(r => r.path.startsWith('/' + opts.batch));
        const dynamicFiltered = dynamicRoutes.filter(r => r.path.startsWith('/' + opts.batch));
        allRoutes = [...staticFiltered, ...dynamicFiltered];
        console.log(`[prerender] Lote "${opts.batch}": ${allRoutes.length} rutas\n`);
    } else {
        allRoutes = [...STATIC_ROUTES, ...(await discoverDynamicRoutes())];
        console.log(`[prerender] ${allRoutes.length} rutas totales\n`);
    }

    let success = 0;
    let failed = 0;

    for (let idx = 0; idx < allRoutes.length; idx++) {
        const route = allRoutes[idx];
        const url = `${BASE_URL}${route.path}`;
        const outputPath = resolve(PRERENDER_DIR, route.file);
        const maxAttempts = route.path === '/' ? 3 : 1;

        process.stdout.write(`[${idx + 1}/${allRoutes.length}] ${route.path}... `);

        let ok = false;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                if (attempt > 1) {
                    await sleep(2000);
                    process.stdout.write(` (intento ${attempt})... `);
                }

                await page.goto(url, { waitUntil: 'networkidle0' });

                await page.waitForFunction(
                    () => (document.querySelector('#root')?.children?.length ?? 0) > 0,
                    { timeout: 10000 }
                );

                await sleep(200);

                const html = await page.content();
                mkdirSync(dirname(outputPath), { recursive: true });
                writeFileSync(outputPath, html, 'utf-8');

                console.log('✓');
                success++;
                ok = true;
                break;
            } catch (err) {
                if (attempt === maxAttempts) {
                    console.log('✗');
                    console.warn(`  Error: ${err.message}`);

                    if (consoleErrors.length > 0) {
                        for (const ce of [...new Set(consoleErrors)].slice(-5)) {
                            console.warn(`  Console error: ${ce.slice(0, 200)}`);
                        }
                        consoleErrors.length = 0;
                    }

                    try {
                        const html = await page.content();
                        if (html && html.length > 100) {
                            mkdirSync(dirname(outputPath), { recursive: true });
                            writeFileSync(outputPath, html, 'utf-8');
                        }
                    } catch {}
                    failed++;
                }
            }
        }
    }

    await browser.close();
    django.kill('SIGTERM');

    console.log(`\n=== Prerendering: ${success} éxitos, ${failed} fallos ===`);
    if (failed > 0) process.exit(1);
}

prerender();
