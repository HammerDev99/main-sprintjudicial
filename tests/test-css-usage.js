#!/usr/bin/env node

/**
 * Test: Uso de clases CSS (SPEC-004, RT-02)
 * Cada clase definida en css/styles.css debe usarse en index.html
 * o en js/main.js. animations.css se excluye (utilidades reutilizables).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(ROOT, 'css', 'styles.css'), 'utf-8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
const js = fs.readFileSync(path.join(ROOT, 'js', 'main.js'), 'utf-8');

function check(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
  } else {
    console.log(`  FAIL: ${message}`);
  }
}

function classesDefinedIn(source) {
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const classes = new Set();
  for (const [, selector] of withoutComments.matchAll(/([^{}]+)\{/g)) {
    if (selector.trim().startsWith('@')) {
      continue;
    }
    for (const [, name] of selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
      classes.add(name);
    }
  }
  return classes;
}

function classesUsedInHtml(source) {
  const classes = new Set();
  for (const [, value] of source.matchAll(/class="([^"]+)"/g)) {
    value.split(/\s+/).filter(Boolean).forEach((name) => classes.add(name));
  }
  return classes;
}

function classesUsedInJs(source) {
  const classes = new Set();
  for (const [, name] of source.matchAll(/classList\.(?:add|remove|toggle)\(\s*'([^']+)'/g)) {
    classes.add(name);
  }
  for (const [, value] of source.matchAll(/className\s*=\s*'([^']+)'/g)) {
    value.split(/\s+/).filter(Boolean).forEach((name) => classes.add(name));
  }
  for (const [, literal] of source.matchAll(/'([^'\n]*)'/g)) {
    for (const [, name] of literal.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
      classes.add(name);
    }
  }
  return classes;
}

console.log('--- Test: Uso de clases CSS ---\n');

const defined = classesDefinedIn(css);
const used = new Set([...classesUsedInHtml(html), ...classesUsedInJs(js)]);
const unused = [...defined].filter((name) => !used.has(name)).sort();

check(defined.size > 0, `Clases definidas en styles.css (${defined.size})`);
check(unused.length === 0, `Sin clases CSS sin uso${unused.length ? ': ' + unused.join(', ') : ''}`);
