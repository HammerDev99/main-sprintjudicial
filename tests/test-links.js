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

// Página de privacidad (exigida por la app de LinkedIn)
console.log('\n--- Página de privacidad ---\n');
const privacyPath = path.join(ROOT, 'privacidad', 'index.html');
const privacyHtml = fs.existsSync(privacyPath) ? fs.readFileSync(privacyPath, 'utf-8') : '';
check(privacyHtml.length > 0, 'privacidad/index.html existe');
check(html.includes('href="/privacidad/"'), 'El pie de index.html enlaza a /privacidad/');
check(
  privacyHtml.includes('<link rel="canonical" href="https://sprintjudicial.com/privacidad/">'),
  'Canonical de la página de privacidad'
);
check(/<title>[^<]+<\/title>/.test(privacyHtml), 'Title de la página de privacidad');
check(privacyHtml.includes('name="description"'), 'Meta description de la página de privacidad');
check(privacyHtml.includes('id="main-content"'), 'Destino del enlace para saltar al contenido');
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf-8');
check(sitemap.includes('<loc>https://sprintjudicial.com/privacidad/</loc>'), 'sitemap.xml incluye /privacidad/');
const dockerfile = fs.readFileSync(path.join(ROOT, 'Dockerfile'), 'utf-8');
check(dockerfile.includes('COPY privacidad/'), 'El Dockerfile copia privacidad/');
const privacyBlank = privacyHtml.match(/<a\s[^>]*target="_blank"[^>]*>/g) || [];
check(
  privacyBlank.every((tag) => /rel="noopener noreferrer"/.test(tag)),
  `${privacyBlank.length} enlaces externos de privacidad llevan rel="noopener noreferrer"`
);

// Caché del CSS: nginx lo guarda 7 días, así que todas las páginas
// deben pedir la misma versión (?v=) de styles.css
const cssVersion = (source) => (source.match(/styles\.css\?v=(\d{8})"/) || [])[1];
check(
  Boolean(cssVersion(html)) && cssVersion(html) === cssVersion(privacyHtml),
  `index.html y privacidad/index.html piden la misma versión de styles.css (${cssVersion(html)} / ${cssVersion(privacyHtml)})`
);

// Analítica: Umami autoalojado en ambas páginas y permitido por la CSP
console.log('\n--- Analítica (Umami) ---\n');
const UMAMI = '<script defer src="https://analytics.sprintjudicial.com/script.js" data-website-id="02c8c902-1147-46f5-94ab-06f68558a945"></script>';
check(html.includes(UMAMI), 'index.html carga Umami con el website-id del sitio');
check(privacyHtml.includes(UMAMI), 'privacidad/index.html carga Umami con el website-id del sitio');
const nginxConf = fs.readFileSync(path.join(ROOT, 'nginx', 'default.conf'), 'utf-8');
const csp = (nginxConf.match(/Content-Security-Policy "([^"]+)"/) || [, ''])[1];
check(/script-src [^;]*https:\/\/analytics\.sprintjudicial\.com/.test(csp), 'La CSP permite el script de Umami (script-src)');
check(/connect-src [^;]*https:\/\/analytics\.sprintjudicial\.com/.test(csp), 'La CSP permite el envío de eventos a Umami (connect-src)');
const scriptTags = (html + privacyHtml).match(/<script[^>]*>/g) || [];
check(!scriptTags.some((tag) => /googletagmanager|google-analytics/.test(tag)), 'Sin scripts de Google Analytics');

