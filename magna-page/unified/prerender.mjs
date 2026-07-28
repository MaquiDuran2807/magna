import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { spawn } from 'child_process';

const DIST_DIR = resolve(import.meta.dirname, 'dist');
const PRERENDER_DIR = resolve(DIST_DIR, 'prerendered');
const DJANGO_PORT = 8000;
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

async function prerender() {
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

    const allRoutes = [...STATIC_ROUTES, ...(await discoverDynamicRoutes())];
    console.log(`[prerender] ${allRoutes.length} rutas totales\n`);

    let success = 0;
    let failed = 0;

    for (let idx = 0; idx < allRoutes.length; idx++) {
        const route = allRoutes[idx];
        const url = `${BASE_URL}${route.path}`;
        const outputPath = resolve(PRERENDER_DIR, route.file);

        process.stdout.write(`[${idx + 1}/${allRoutes.length}] ${route.path}... `);

        try {
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
        } catch (err) {
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
                mkdirSync(dirname(outputPath), { recursive: true });
                writeFileSync(outputPath, html, 'utf-8');
            } catch {}
            failed++;
        }
    }

    await browser.close();
    django.kill('SIGTERM');

    console.log(`\n=== Prerendering: ${success} éxitos, ${failed} fallos ===`);
    if (failed > 0) process.exit(1);
}

prerender();
