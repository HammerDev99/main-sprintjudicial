#!/usr/bin/env node

/**
 * Test: CSS validación
 * Valida design tokens, paleta de colores y convenciones CSS.
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

console.log('--- Test: CSS validación ---\n');

// Gather all CSS sources
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const hasExternalCSS = fs.existsSync(path.join(ROOT, 'css', 'styles.css'));
const hasAnimCSS = fs.existsSync(path.join(ROOT, 'css', 'animations.css'));
let css = '';
if (hasExternalCSS) {
  css += fs.readFileSync(path.join(ROOT, 'css', 'styles.css'), 'utf-8');
}
if (hasAnimCSS) {
  css += '\n' + fs.readFileSync(path.join(ROOT, 'css', 'animations.css'), 'utf-8');
}
if (!css) {
  css = indexHtml;
}

const source = hasExternalCSS ? 'css/styles.css + css/animations.css' : 'index.html (inline)';
console.log(`  INFO: Leyendo CSS desde ${source}\n`);

// Design tokens obligatorios
const requiredTokens = [
  '--deep', '--navy', '--accent', '--accent-light', '--teal',
  '--gold', '--green', '--surface', '--surface-light',
  '--text', '--text-muted', '--white', '--border'
];

for (const token of requiredTokens) {
  check(css.includes(token), `Design token ${token} definido`);
}

// Colores correctos (paleta del CONTEXTO)
const colorMap = {
  '--deep': '#0B1D33',
  '--navy': '#152A4A',
  '--accent': '#3B82F6',
  '--teal': '#06B6D4',
  '--gold': '#F59E0B',
  '--green': '#10B981',
};

console.log('\n--- Colores de la paleta ---\n');
for (const [token, value] of Object.entries(colorMap)) {
  check(css.includes(value), `${token} = ${value}`);
}

// Fuentes
check(css.includes('Playfair Display'), 'Font display: Playfair Display');
check(css.includes('DM Sans'), 'Font body: DM Sans');

// Responsive
check(css.includes('@media'), 'Media queries presentes');
check(css.includes('768px') || css.includes('max-width'), 'Breakpoint mobile/tablet');

// Clamp para tipografía responsive
check(css.includes('clamp('), 'Tipografía responsive con clamp()');

// scroll-behavior
check(css.includes('scroll-behavior: smooth'), 'Scroll suave habilitado');

// Animaciones
check(css.includes('@keyframes'), 'Keyframes de animación definidos');
check(css.includes('fadeUp') || css.includes('fade-up'), 'Animación fadeUp definida');

// No !important (excepto en utilities)
const importantCount = (css.match(/!important/g) || []).length;
check(importantCount <= 20, `Uso limitado de !important (${importantCount} encontrados, max 20)`);

// Post-refactor checks
console.log('\n--- Checks post-refactor ---\n');
if (hasExternalCSS) {
  check(true, 'CSS separado en archivo externo');

  const hasAnimCSS = fs.existsSync(path.join(ROOT, 'css', 'animations.css'));
  if (hasAnimCSS) {
    console.log('  PASS: animations.css separado');
  } else {
    console.log('  PENDING: animations.css aún no separado');
  }
} else {
  console.log('  PENDING: CSS aún está inline en index.html (Fase 0 refactor)');
}
