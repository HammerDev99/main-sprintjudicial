#!/usr/bin/env node

/**
 * Test: Selectores de JS (SPEC-004, RT-03)
 * Cada clase, id o atributo que js/main.js busca en el DOM debe existir
 * en index.html. Un selector sin destino indica código muerto.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const js = fs.readFileSync(path.join(ROOT, 'js', 'main.js'), 'utf-8');

function check(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
  } else {
    console.log(`  FAIL: ${message}`);
  }
}

console.log('--- Test: Selectores de JS ---\n');

const knownClasses = new Set();
for (const [, value] of html.matchAll(/class="([^"]+)"/g)) {
  value.split(/\s+/).filter(Boolean).forEach((name) => knownClasses.add(name));
}
// Clases que main.js crea en tiempo de ejecución (tarjetas del blog)
for (const [, value] of js.matchAll(/className\s*=\s*'([^']+)'/g)) {
  value.split(/\s+/).filter(Boolean).forEach((name) => knownClasses.add(name));
}

const lookups = [...js.matchAll(/(\$\$?|querySelector(?:All)?|getElementById)\(\s*'([^']+)'/g)];
check(lookups.length > 0, `Búsquedas en el DOM encontradas en main.js (${lookups.length})`);

for (const [, fn, selector] of lookups) {
  if (fn === 'getElementById') {
    check(html.includes(`id="${selector}"`), `#${selector} existe en index.html`);
    continue;
  }
  for (const [, name] of selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    check(knownClasses.has(name), `.${name} existe en index.html`);
  }
  for (const [, id] of selector.matchAll(/#([a-zA-Z][\w-]*)/g)) {
    check(html.includes(`id="${id}"`), `#${id} existe en index.html`);
  }
  for (const [, attr] of selector.matchAll(/\[([a-zA-Z-]+)/g)) {
    check(new RegExp(`\\s${attr}(=|\\s|>)`).test(html), `[${attr}] existe en index.html`);
  }
}
