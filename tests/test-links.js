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
  { pattern: 'chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ', name: 'Grupo de mentoría' },
  { pattern: 'contacto@sprintjudicial.com', name: 'Email CTA' },
  { pattern: 'linkedin.com/in/daniel-arbelaez-', name: 'LinkedIn link' },
  { pattern: 'github.com/HammerDev99', name: 'GitHub link' },
  { pattern: 'blog.sprintjudicial.com', name: 'Blog link' },
  { pattern: 'portfolio.sprintjudicial.com', name: 'Portafolio link' },
  { pattern: 'scholar.google.com/citations?user=T5zXXTcAAAAJ', name: 'Google Scholar link' },
];

for (const link of requiredLinks) {
  check(html.includes(link.pattern), link.name);
}

// Verificar que links externos tienen target o son anchor
console.log('\n--- Seguridad de links ---\n');

// Links con https que NO son de navegación interna
const externalLinks = html.match(/href="https?:\/\/[^"]+"/g) || [];
console.log(`  INFO: ${externalLinks.length} links externos encontrados`);

// Todo enlace con target="_blank" debe llevar rel con noopener y noreferrer
const blankAnchors = html.match(/<a\s[^>]*target="_blank"[^>]*>/g) || [];
const unsafeBlankHrefs = blankAnchors
  .filter((tag) => {
    const rel = (tag.match(/\srel="([^"]*)"/) || [, ''])[1].split(/\s+/);
    return !(rel.includes('noopener') && rel.includes('noreferrer'));
  })
  .map((tag) => (tag.match(/\shref="([^"]*)"/) || [, tag])[1]);
check(
  blankAnchors.length > 0 && unsafeBlankHrefs.length === 0,
  `${blankAnchors.length} enlaces con target="_blank" llevan rel="noopener noreferrer"` +
    (unsafeBlankHrefs.length ? `: sin rel seguro → ${unsafeBlankHrefs.join(', ')}` : '')
);

// Herramientas de código abierto (SPEC-004 RC-04)
console.log('\n--- Contenido ---\n');
const toolArticles = (html.match(/<article class="tool-card[^"]*"/g) || []).length;
check(toolArticles === 3, `Tres tarjetas de herramientas (${toolArticles} encontradas)`);

// Respaldo visible si el feed del blog falla
const fallbackMatch = html.match(/id="blog-fallback"[^>]*>([\s\S]*?)<\/div>/);
check(
  Boolean(fallbackMatch) && fallbackMatch[1].includes('href="https://blog.sprintjudicial.com"'),
  'El respaldo del blog enlaza al blog'
);

// Copyright year
const currentYear = new Date().getFullYear().toString();
const hasCopyright = html.includes(currentYear) || html.includes('2025');
check(hasCopyright, `Copyright year presente (${currentYear} o 2025)`);

// Assets locales: sin referencias rotas ni archivos huérfanos en src/
console.log('\n--- Assets locales ---\n');
const localSources = [...html.matchAll(/src="(?!https?:)([^"]+)"/g)].map(([, src]) => src);
for (const src of localSources) {
  check(fs.existsSync(path.join(ROOT, src)), `Asset referenciado existe: ${src}`);
}
for (const file of fs.readdirSync(path.join(ROOT, 'src'))) {
  check(localSources.includes(`src/${file}`), `Asset de src/ en uso: ${file}`);
}
