#!/usr/bin/env node

/**
 * Test: Cumplimiento del reposicionamiento (SPEC-004, RV-01)
 * Verifica que los archivos públicos no anuncien servicios comerciales,
 * precios, claims no verificables ni datos del lugar de trabajo.
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

const SCANNED_FILES = ['index.html', 'llms.txt', 'humans.txt', 'README.md', 'package.json'];

const TRANSPARENCY_NOTE = 'Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad.';
const WORKING_HOURS_NOTE = 'Las actividades docentes se realizan por fuera de mi jornada laboral y conforme al régimen aplicable a los servidores judiciales.';
const DEMOS_NOTE = 'Las demos usan servicios de IA de terceros. No ingreses datos personales ni información de procesos reales.';

// Frases donde una palabra prohibida no tiene sentido comercial
const ALLOWED_SENTENCES = [TRANSPARENCY_NOTE, DEMOS_NOTE];

const NAMED_ENTITIES = {
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú',
  ntilde: 'ñ', Ntilde: 'Ñ', uuml: 'ü', iquest: '¿', iexcl: '¡',
  laquo: '«', raquo: '»', mdash: '—', ndash: '–', middot: '·',
  bull: '•', rarr: '→', copy: '©', nbsp: ' ', amp: '&', quot: '"',
  apos: "'", lt: '<', gt: '>'
};

// scope 'text': sin etiquetas ni URLs (evita falsos positivos como %C3%B3)
// scope 'full': texto completo, URLs incluidas
const FORBIDDEN = [
  {
    group: 'Precios',
    scope: 'text',
    patterns: [/\$\s?\d/, /\bcop\b/, /\bprecios?\b/, /\btarifas?\b/, /\bsetup\b/, /pago unico/, /\bpagos?\b/, /\bsuscripci/, /\bplanes?\b de/]
  },
  {
    group: 'Venta',
    scope: 'text',
    patterns: [/\bcotiza/, /\bconsultor(ia|ias|a|es)?\b/, /\bcontrat(a|ar|e|en|es)\b/, /\badquier/, /\bcompr(a|ar|e)\b/, /demo gratuita/, /\bagend(a|ar|e)\b/, /para empresas/, /para despachos/, /a la medida/, /por proyecto/, /\bretainer\b/, /\bservicios?\b/]
  },
  {
    group: 'Claims',
    scope: 'text',
    patterns: [/nivel nacional/, /produccion nacional/, /en todo el pais/, /todas las dependencias/, /justicialab 2025/, /\d+\s?%/, /en segundos/, /\bahorr/, /revolucion/]
  },
  {
    group: 'Lugar de trabajo',
    scope: 'full',
    patterns: [/\bbello\b/, /centro de servicios/, /\bcsj\b/, /juzgado primero/, /tecnico en sistemas/, /\bescribiente\b/, /\bcitador\b/, /asistente judicial/, /\bdiego\b/, /\bbeltran\b/, /\bleonardo\b/]
  },
  {
    group: 'Contacto comercial',
    scope: 'full',
    patterns: [/wa\.me\//, /3015771258/, /301 577 1258/]
  },
  {
    group: 'Recaudo',
    scope: 'text',
    patterns: [/paypal/, /\bvaki\b/, /patreon/, /\bdona(r|cion|ciones)\b/, /\bnequi\b/, /daviplata/]
  },
  {
    group: 'Schema comercial',
    scope: 'full',
    files: ['index.html'],
    patterns: [/professionalservice/, /servicetype/, /areaserved/, /"telephone"/]
  }
];

const REQUIRED_IN_INDEX = [
  { label: 'Nota de transparencia literal', text: TRANSPARENCY_NOTE },
  { label: 'Aviso de jornada laboral literal', text: WORKING_HOURS_NOTE },
  { label: 'Premio con atribución al equipo', text: 'Ganador JusticIALab 2024 (equipo Marduk)' },
  { label: 'Licencia de los contenidos', text: 'CC BY 4.0' },
  { label: 'Licencia MIT de las herramientas', text: 'Licencia MIT' },
  { label: 'Enlace al grupo de mentoría', text: 'chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ', exact: true },
  { label: 'Correo de contacto', text: 'contacto@sprintjudicial.com', exact: true },
  { label: 'Enlace al portafolio', text: 'portfolio.sprintjudicial.com', exact: true },
  { label: 'Enlace a Google Scholar', text: 'scholar.google.com/citations?user=T5zXXTcAAAAJ', exact: true },
  { label: 'Enlace al artículo de Cuaderno Activa', text: 'ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858', exact: true }
];

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name] ?? match)
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
}

function normalize(text) {
  return decodeEntities(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function stripUrls(text) {
  return text
    .replace(/(href|src)="[^"]*"/g, ' ')
    .replace(/(https?:\/\/|mailto:)[^\s"'<>)]+/g, ' ');
}

function stripTags(text) {
  return text.replace(/<[^>]+>/g, ' ');
}

function removeAllowed(text) {
  return ALLOWED_SENTENCES.reduce(
    (acc, sentence) => acc.split(normalize(sentence)).join(' '),
    text
  );
}

function findMatches(text, patterns) {
  return patterns
    .map((pattern) => {
      const match = text.match(pattern);
      if (!match) {
        return null;
      }
      const start = Math.max(0, match.index - 30);
      const snippet = text.slice(start, match.index + match[0].length + 30).trim();
      return `${pattern} → «${snippet}»`;
    })
    .filter(Boolean);
}

function readFile(file) {
  const fullPath = path.join(ROOT, file);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : null;
}

function buildTexts(raw) {
  return {
    full: removeAllowed(normalize(raw)),
    text: removeAllowed(
      normalize(stripUrls(raw)) + ' \n ' + normalize(stripTags(stripUrls(raw)))
    )
  };
}

console.log('--- Test: Cumplimiento (SPEC-004) ---\n');

for (const file of SCANNED_FILES) {
  const raw = readFile(file);
  if (raw === null) {
    check(false, `[${file}] el archivo existe`);
    continue;
  }
  const texts = buildTexts(raw);
  for (const rule of FORBIDDEN) {
    if (rule.files && !rule.files.includes(file)) {
      continue;
    }
    const matches = findMatches(texts[rule.scope], rule.patterns);
    const detail = matches.length ? `: ${matches.join(' | ')}` : '';
    check(matches.length === 0, `[${file}] Sin ${rule.group}${detail}`);
  }
}

console.log('\n--- Contenido obligatorio en index.html ---\n');

const index = readFile('index.html') || '';
const indexText = normalize(stripTags(index));
for (const item of REQUIRED_IN_INDEX) {
  const found = item.exact ? index.includes(item.text) : indexText.includes(normalize(item.text));
  check(found, item.label);
}

console.log('\n--- Autoprueba del normalizador ---\n');

const SELF_TEST_CASES = [
  { input: 'Consultor&iacute;a LegalTech', group: 'Venta' },
  { input: 'Desde &#36;80.000 COP', group: 'Precios' },
  { input: '\\u00bfCu\\u00e1nto cuesta? Desde $150.000', group: 'Precios' },
  { input: 'Agilex en <strong>producci&oacute;n nacional</strong>', group: 'Claims' },
  { input: 'T&Eacute;CNICO EN SISTEMAS', group: 'Lugar de trabajo' },
  { input: '<meta name="description" content="Consultoria y precios desde $80.000">', group: 'Precios' },
  { input: '<a href="#x" aria-label="Cotizar servicio">Ver</a>', group: 'Venta' }
];

for (const { input, group } of SELF_TEST_CASES) {
  const rule = FORBIDDEN.find((candidate) => candidate.group === group);
  const text = buildTexts(input)[rule.scope];
  check(findMatches(text, rule.patterns).length > 0, `Detecta ${group} en «${input}»`);
}
