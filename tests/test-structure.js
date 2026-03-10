#!/usr/bin/env node

/**
 * Test: Estructura de archivos del proyecto
 * Valida que existan los archivos requeridos y la estructura sea correcta.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function check(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
  } else {
    console.log(`  FAIL: ${message}`);
  }
}

console.log('--- Test: Estructura de archivos ---\n');

// Archivos obligatorios
const requiredFiles = [
  'index.html',
  'CLAUDE.md',
  'docs/others/CONTEXTO_SPRINT_JUDICIAL.md',
  'Dockerfile',
  'docs/ROADMAP.md',
  'docs/README.md',
];

for (const file of requiredFiles) {
  check(fs.existsSync(path.join(ROOT, file)), `Archivo existe: ${file}`);
}

// Directorios obligatorios
const requiredDirs = [
  'docs',
  'docs/specs',
  'docs/research',
  'docs/plans',
  'agent_docs',
  'tests',
];

for (const dir of requiredDirs) {
  check(fs.existsSync(path.join(ROOT, dir)) && fs.statSync(path.join(ROOT, dir)).isDirectory(), `Directorio existe: ${dir}/`);
}

// Archivos de documentación CDAID
const cdaidFiles = [
  'agent_docs/code_conventions.md',
  'agent_docs/architecture.md',
  'agent_docs/design_system.md',
  'agent_docs/ux_patterns.md',
  'agent_docs/seo.md',
  'agent_docs/workflow.md',
  'agent_docs/verification_metrics.md',
];

for (const file of cdaidFiles) {
  check(fs.existsSync(path.join(ROOT, file)), `Agent doc existe: ${file}`);
}

// Specs y plans
const specFiles = [
  'docs/specs/SPEC-001-landing-v2.md',
  'docs/specs/SPEC-002-services.md',
  'docs/research/RES-001-legaltech-benchmark.md',
  'docs/plans/PLAN-001-ux-ui.md',
  'docs/plans/PLAN-002-refactor.md',
  'docs/plans/PLAN-003-design-patterns.md',
  'docs/plans/PLAN-004-ux-improvements.md',
];

for (const file of specFiles) {
  check(fs.existsSync(path.join(ROOT, file)), `Doc existe: ${file}`);
}

// Verificar que index.html no está vacío
const indexSize = fs.existsSync(path.join(ROOT, 'index.html'))
  ? fs.statSync(path.join(ROOT, 'index.html')).size
  : 0;
check(indexSize > 1000, `index.html tiene contenido (${indexSize} bytes)`);

// Archivos futuros (post-refactor) — marcar como pendientes si no existen
const futureFiles = [
  'css/styles.css',
  'css/animations.css',
  'js/main.js',
  'robots.txt',
  'sitemap.xml',
];

console.log('\n--- Archivos post-refactor (Fase 0) ---\n');
for (const file of futureFiles) {
  const exists = fs.existsSync(path.join(ROOT, file));
  if (exists) {
    console.log(`  PASS: ${file} existe`);
  } else {
    console.log(`  PENDING: ${file} aún no creado (esperado en Fase 0)`);
  }
}
