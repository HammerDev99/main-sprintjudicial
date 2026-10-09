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

// Hero rotativo accesible (SPEC-005 RV5-02)
const h1Html = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
check(
  h1Html.includes('<span class="sr-only">Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre.</span>'),
  'El h1 expone la frase aprobada a lectores de pantalla'
);
check(/<span aria-hidden="true">[\s\S]*class="rotator"/.test(h1Html), 'La parte rotativa del h1 está oculta para lectores de pantalla');
check((h1Html.match(/class="rotator__item/g) || []).length === 4, 'El rotador tiene cuatro frases');
check(h1Html.includes('<span class="rotator__item is-active">tr&aacute;mites judiciales</span>'), 'La frase inicial activa es la aprobada');
check(
  html.includes('<button type="button" class="rotator__toggle" aria-pressed="false" aria-label="Pausar animaci&oacute;n del t&iacute;tulo" hidden>'),
  'Botón de pausa accesible y oculto hasta que el JS lo active'
);
check(html.includes('id="reconocimientos"'), 'Ancla #reconocimientos presente');

// Secciones con id para navegación (SPEC-004 RT-01)
const sectionIds = ['que-hago', 'herramientas', 'mentoria', 'docencia', 'escritos'];
for (const id of sectionIds) {
  check(html.includes(`id="${id}"`), `Sección con id="${id}" presente`);
}

// Links y botones
check(html.includes('href="#herramientas"'), 'Link de navegación a #herramientas');
check(html.includes('href="#docencia"'), 'Link de navegación a #docencia');

// Mentoría por grupo comunitario, sin WhatsApp personal (SPEC-004 D2, D6)
check(html.includes('chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ'), 'Link al grupo de mentoría');
check(!/wa\.me\/|api\.whatsapp\.com\/send|wa\.link\//.test(html),'Sin enlaces a WhatsApp personal');

// Un mismo nombre accesible no puede llevar a destinos distintos (WCAG 2.4.4)
const hrefsByName = new Map();
for (const [, attrs, inner] of html.matchAll(/<a\s([^>]*)>([\s\S]*?)<\/a>/g)) {
  const href = (attrs.match(/href="([^"]+)"/) || [])[1] || '';
  const label = (attrs.match(/aria-label="([^"]+)"/) || [])[1];
  const name = (label || inner.replace(/<[^>]+>/g, ' '))
    .replace(/&rarr;|→/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!name) {
    continue;
  }
  hrefsByName.set(name, new Set([...(hrefsByName.get(name) || []), href]));
}
const ambiguousNames = [...hrefsByName].filter(([, hrefs]) => hrefs.size > 1).map(([name]) => name);
check(
  ambiguousNames.length === 0,
  `Cada nombre de enlace lleva a un solo destino${ambiguousNames.length ? ': ' + ambiguousNames.join(', ') : ''}`
);

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
