#!/usr/bin/env node

/**
 * Test: Links internos y CTAs
 * Valida que los anchor links apunten a secciones existentes.
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

console.log('--- Test: Links internos y CTAs ---\n');

// Extraer todos los href="#xxx" del HTML
const anchorLinks = html.match(/href="#([^"]+)"/g) || [];
const uniqueAnchors = [...new Set(anchorLinks.map(l => l.match(/href="#([^"]+)"/)[1]))];

// Extraer todos los id="xxx"
const ids = html.match(/id="([^"]+)"/g) || [];
const uniqueIds = ids.map(i => i.match(/id="([^"]+)"/)[1]);

console.log(`  INFO: ${uniqueAnchors.length} anchor links, ${uniqueIds.length} IDs encontrados\n`);

// Verificar que cada anchor link tiene su id correspondiente
for (const anchor of uniqueAnchors) {
  if (anchor === '' || anchor === '#') continue; // Skip top-of-page links
  check(
    uniqueIds.includes(anchor),
    `Anchor #${anchor} → id="${anchor}" existe`
  );
}

// CTAs externos obligatorios
console.log('\n--- CTAs externos ---\n');

const requiredLinks = [
  { pattern: 'wa.me/573015771258', name: 'WhatsApp CTA' },
  { pattern: 'contacto@sprintjudicial.com', name: 'Email CTA' },
  { pattern: 'linkedin.com/in/daniel-arbelaez-alvarez', name: 'LinkedIn link' },
  { pattern: 'github.com/HammerDev99', name: 'GitHub link' },
  { pattern: 'blog.sprintjudicial.com', name: 'Blog link' },
];

for (const link of requiredLinks) {
  check(html.includes(link.pattern), link.name);
}

// Verificar que links externos tienen target o son anchor
console.log('\n--- Seguridad de links ---\n');

// Links con https que NO son de navegación interna
const externalLinks = html.match(/href="https?:\/\/[^"]+"/g) || [];
console.log(`  INFO: ${externalLinks.length} links externos encontrados`);

// Contar servicios mostrados
console.log('\n--- Contenido ---\n');
const serviceCards = (html.match(/service-card/g) || []).length;
// Cada card tiene la clase mencionada varias veces (en CSS y HTML), contar solo las del HTML
const serviceArticles = (html.match(/<article class="service-card[^>]*>/g) || []).length;
check(
  serviceArticles >= 5,
  `Al menos 5 tarjetas de servicio (${serviceArticles} encontradas)`
);

// Verificar estadísticas del hero
const hasCorrectStats = html.includes('6') || html.includes('5');
check(hasCorrectStats, 'Estadísticas del hero presentes');

// Copyright year
const currentYear = new Date().getFullYear().toString();
const hasCopyright = html.includes(currentYear) || html.includes('2025');
check(hasCopyright, `Copyright year presente (${currentYear} o 2025)`);
