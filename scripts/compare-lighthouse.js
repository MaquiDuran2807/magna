const fs = require('fs');

const [spaFile, ssgFile] = process.argv.slice(2);

if (!spaFile || !ssgFile) {
    console.error('Uso: node compare-lighthouse.js <spa.json> <ssg.json>');
    process.exit(1);
}

const spa = JSON.parse(fs.readFileSync(spaFile, 'utf-8'));
const ssg = JSON.parse(fs.readFileSync(ssgFile, 'utf-8'));

const categories = [
    { key: 'performance', name: 'Performance' },
    { key: 'accessibility', name: 'Accessibility' },
    { key: 'best-practices', name: 'Best Practices' },
    { key: 'seo', name: 'SEO' },
];

const TARGET = 93;

console.log('\n=== Lighthouse Score Comparison ===\n');

console.log('┌───────────────────┬───────┬───────┬────────┬───────┐');
console.log('│ Category          │  SPA  │  SSG  │ Target │ Pass? │');
console.log('├───────────────────┼───────┼───────┼────────┼───────┤');

let allPass = true;
const results = [];

for (const cat of categories) {
    const spaScore = Math.round((spa.categories[cat.key]?.score || 0) * 100);
    const ssgScore = Math.round((ssg.categories[cat.key]?.score || 0) * 100);
    const pass = ssgScore >= TARGET;
    const diff = ssgScore - spaScore;
    if (!pass) allPass = false;

    results.push({ name: cat.name, spa: spaScore, ssg: ssgScore, diff, pass });

    const passMark = pass ? ' ✓' : ' ✗';
    console.log(
        `│ ${cat.name.padEnd(17)} │ ` +
        `${String(spaScore).padStart(3)}  │ ` +
        `${String(ssgScore).padStart(3)}  │ ` +
        `${String(TARGET).padStart(4)}   │` +
        `${passMark}   │`
    );
}

console.log('└───────────────────┴───────┴───────┴────────┴───────┘');
console.log('');

console.log('=== Resumen ===');
for (const r of results) {
    const arrow = r.diff > 0 ? '↑' : r.diff < 0 ? '↓' : '=';
    console.log(`  ${r.name}: ${r.spa} → ${r.ssg} (${arrow}${Math.abs(r.diff)}) ${r.pass ? '✓' : '✗'}`);
}

console.log('\n=== Web Vitals ===');
const metrics = {
    'FCP': 'first-contentful-paint',
    'LCP': 'largest-contentful-paint',
    'TBT': 'total-blocking-time',
    'CLS': 'cumulative-layout-shift',
};

for (const [label, auditKey] of Object.entries(metrics)) {
    const spaAudit = spa.audits?.[auditKey];
    const ssgAudit = ssg.audits?.[auditKey];
    if (spaAudit && ssgAudit) {
        console.log(`  ${label}: ${spaAudit.displayValue} → ${ssgAudit.displayValue}`);
    }
}

console.log('');
if (allPass) {
    console.log('✅ RESULTADO: TODAS LAS MÉTRICAS ≥ 93');
    process.exit(0);
} else {
    console.log('❌ RESULTADO: HAY MÉTRICAS POR DEBAJO DE 93');
    process.exit(1);
}
