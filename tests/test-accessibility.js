#!/usr/bin/env node

/**
 * Test: HTML semántico y accesibilidad
 * Valida elementos de accesibilidad en index.html.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');

function check(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
  } else {
    console.log(`  FAIL: ${message}`);
  }
}

console.log('--- Test: HTML semántico y accesibilidad ---\n');

// HTML básico
check(html.includes('lang="es"'), 'Atributo lang="es" en <html>');
check(html.includes('charset="UTF-8"') || html.includes('charset=UTF-8'), 'Meta charset UTF-8');
check(html.includes('viewport'), 'Meta viewport presente');

// Elementos semánticos
check(html.includes('<nav'), 'Elemento <nav> presente');
check(html.includes('<footer'), 'Elemento <footer> presente');

// Heading hierarchy
const h1Count = (html.match(/<h1[\s>]/g) || []).length;
check(h1Count === 1, `Exactamente un <h1> (encontrados: ${h1Count})`);

const h2Count = (html.match(/<h2[\s>]/g) || []).length;
check(h2Count >= 3, `Al menos 3 <h2> para secciones (encontrados: ${h2Count})`);

// Secciones con id para navegación
const sectionIds = ['servicios', 'credenciales', 'sobre-mi', 'contacto'];
for (const id of sectionIds) {
  check(html.includes(`id="${id}"`), `Sección con id="${id}" presente`);
}

// Links y botones
check(html.includes('href="#servicios"'), 'Link de navegación a #servicios');
check(html.includes('href="#contacto"'), 'Link de navegación a #contacto');

// WhatsApp CTA
check(html.includes('wa.me/573015771258'), 'Link de WhatsApp correcto');

// Email CTA
check(
  html.includes('contacto@sprintjudicial.com'),
  'Email de contacto presente'
);

// Accesibilidad avanzada (marcados como PENDING si no se implementan aún)
console.log('\n--- Accesibilidad avanzada ---\n');

const advancedChecks = [
  [html.includes('skip') || html.includes('Skip'), 'Skip-to-content link'],
  [html.includes('<main'), 'Elemento <main> presente'],
  [html.includes('aria-label'), 'Al menos un aria-label'],
  [html.includes('aria-expanded'), 'aria-expanded en menú mobile'],
  [html.includes('aria-hidden'), 'aria-hidden en iconos decorativos'],
  [html.includes(':focus-visible') || html.includes('focus-visible'), 'Estilos :focus-visible'],
  [html.includes('role="menubar"') || html.includes('role="navigation"'), 'Roles ARIA en navegación'],
];

for (const [condition, message] of advancedChecks) {
  if (condition) {
    console.log(`  PASS: ${message}`);
  } else {
    console.log(`  PENDING: ${message} (implementar en Fase 3 accesibilidad)`);
  }
}
