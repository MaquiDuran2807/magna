import { readFileSync, existsSync, readdirSync } from 'fs';
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
        { name: 'Title no es default', test: !html.includes(`<title>Magna Ingeniería y Topografía</title>`) || file === 'index.html' },
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

const dynamicDirs = ['servicios', 'projects', 'blog'];
for (const dir of dynamicDirs) {
    const dirPath = resolve(PRERENDER_DIR, dir);
    if (existsSync(dirPath)) {
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
