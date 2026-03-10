#!/usr/bin/env node

/**
 * Test: SEO y meta tags
 * Valida que los meta tags de SEO estén presentes y correctos.
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

console.log('--- Test: SEO y meta tags ---\n');

// Title
check(html.includes('<title>'), 'Tag <title> presente');
check(
  html.includes('Sprint Judicial'),
  'Title contiene "Sprint Judicial"'
);

// Meta description
check(
  html.includes('name="description"'),
  'Meta description presente'
);

// Canonical (pendiente)
const hasCanonical = html.includes('rel="canonical"');
if (hasCanonical) {
  console.log('  PASS: Canonical URL presente');
} else {
  console.log('  PENDING: Canonical URL (agregar en optimización SEO)');
}

// Open Graph
console.log('\n--- Open Graph ---\n');
const ogChecks = [
  ['og:title', 'OG title'],
  ['og:description', 'OG description'],
  ['og:image', 'OG image'],
  ['og:url', 'OG URL'],
  ['og:type', 'OG type'],
  ['og:locale', 'OG locale'],
];

for (const [prop, name] of ogChecks) {
  const exists = html.includes(`property="${prop}"`);
  if (exists) {
    console.log(`  PASS: ${name}`);
  } else {
    console.log(`  PENDING: ${name} (implementar en PLAN-004 #12)`);
  }
}

// Twitter Card
console.log('\n--- Twitter Card ---\n');
const twitterChecks = [
  ['twitter:card', 'Twitter card type'],
  ['twitter:title', 'Twitter title'],
  ['twitter:description', 'Twitter description'],
];

for (const [prop, name] of twitterChecks) {
  const exists = html.includes(`name="${prop}"`);
  if (exists) {
    console.log(`  PASS: ${name}`);
  } else {
    console.log(`  PENDING: ${name} (implementar en PLAN-004 #12)`);
  }
}

// Schema.org
console.log('\n--- Schema.org ---\n');
const hasSchema = html.includes('application/ld+json');
if (hasSchema) {
  console.log('  PASS: Schema.org JSON-LD presente');
} else {
  console.log('  PENDING: Schema.org JSON-LD (implementar en PLAN-003 Fase 7)');
}

// Preconnect
check(
  html.includes('preconnect') && html.includes('fonts.googleapis.com'),
  'Preconnect a Google Fonts'
);

// font-display swap
check(
  html.includes('display=swap'),
  'font-display: swap en Google Fonts URL'
);

// Heading hierarchy para SEO
const headings = html.match(/<h[1-6][^>]*>/g) || [];
check(headings.length >= 5, `Suficientes headings para SEO (${headings.length} encontrados)`);
