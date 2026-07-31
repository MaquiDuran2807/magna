import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

const PRERENDER_DIR = resolve(import.meta.dirname, 'dist', 'prerendered');
const ERROR_PATTERNS = [
    'Unexpected Application Error',
    'TypeError:',
    'RangeError:',
    'Cannot read properties',
    'Invalid time value',
    'Internal Server Error',
];

const requiredFiles = [
    'index.html',
    'servicios/index.html',
    'projects/index.html',
    'blog/index.html',
    'aboutUs/index.html',
    'contact/index.html',
];

let total_checks = 0;
let passed_checks = 0;
let failed_files = 0;
let total_files = 0;

console.log('=== Verificación de archivos prerendered ===\n');

function check(condition, name) {
    total_checks++;
    if (condition) { passed_checks++; return true; }
    return false;
}

function hasErrorContent(html) {
    for (const pattern of ERROR_PATTERNS) {
        if (html.includes(pattern)) return pattern;
    }
    return null;
}

function getBodyLength(html) {
    const match = html.match(/<div id="root">([\s\S]*?)<\/div>/);
    return match ? match[1].trim().length : 0;
}

for (const file of requiredFiles) {
    const fullPath = resolve(PRERENDER_DIR, file);
    total_files++;

    if (!existsSync(fullPath)) {
        console.log(`✗ ${file} — FALTA EL ARCHIVO`);
        failed_files++;
        continue;
    }

    const html = readFileSync(fullPath, 'utf-8');
    const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
    const bodyLen = getBodyLength(html);
    const isIndex = file === 'index.html';

    const errors = [];
    if (!check(html.includes('<title>'), 'Tiene <title>')) errors.push('Falta <title>');
    if (!check(html.includes('<meta name="description"'), 'Tiene meta description')) errors.push('Falta meta description');
    if (!check(html.includes('<div id="root">'), 'Tiene <div id="root">')) errors.push('Falta <div id="root">');
    if (!check(bodyLen > 500, `Body con contenido (${bodyLen} chars)`)) errors.push(`Body muy pequeño (${bodyLen} chars)`);
    if (!check(html.includes('type="module"'), 'Tiene script module')) errors.push('Falta script module');

    const errorFound = hasErrorContent(html);
    if (!check(!errorFound, 'Sin errores JS')) errors.push(`Contiene error: ${errorFound}`);

    const defaultTitle = '<title>Magna Ingeniería y Topografía</title>';
    if (!check(isIndex || !html.includes(defaultTitle), 'Title personalizado')) errors.push('Title es el default');

    if (errors.length === 0) {
        console.log(`✓ ${file} (${sizeKB} KB, body ${bodyLen}B) — sin errores`);
    } else {
        console.log(`✗ ${file} (${sizeKB} KB) — falló:`);
        for (const e of errors) console.log(`    - ${e}`);
        failed_files++;
    }
}

const dynamicDirs = ['servicios', 'projects', 'blog'];
for (const dir of dynamicDirs) {
    const dirPath = resolve(PRERENDER_DIR, dir);
    if (!existsSync(dirPath)) continue;

    const entries = readdirSync(dirPath);
    const subdirs = entries.filter(e => existsSync(resolve(dirPath, e, 'index.html')));

    for (const sub of subdirs) {
        const subPath = resolve(dirPath, sub, 'index.html');
        const html = readFileSync(subPath, 'utf-8');
        const bodyLen = getBodyLength(html);
        total_files++;

        const errors = [];
        if (!check(html.includes('<title>'), `${dir}/${sub}: title`)) errors.push('Falta <title>');
        if (!check(html.includes('<div id="root">'), `${dir}/${sub}: root`)) errors.push('Falta <div id="root">');
        if (!check(bodyLen > 500, `${dir}/${sub}: body`)) errors.push(`Body muy pequeño (${bodyLen} chars)`);

        const errorFound = hasErrorContent(html);
        if (!check(!errorFound, `${dir}/${sub}: sin errores`)) errors.push(`Contiene error: ${errorFound}`);

        if (errors.length > 0) {
            console.log(`✗ ${dir}/${sub}/index.html — ${errors.join(', ')}`);
            failed_files++;
        }
    }

    if (subdirs.length > 0) {
        console.log(`  ✓ ${dir}/: ${subdirs.length} subdirectorios OK`);
    }
}

console.log(`\n=== Resumen ===`);
console.log(`Archivos: ${total_files - failed_files}/${total_files} OK`);
console.log(`Checks: ${passed_checks}/${total_checks}`);
console.log(`Fallos: ${failed_files}`);

if (failed_files > 0) {
    console.log('\n❌ Verificación NO pasada');
    process.exit(1);
} else {
    console.log('\n✅ Verificación pasada — todos los prerendered válidos');
}
