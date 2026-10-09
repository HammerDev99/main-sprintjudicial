# PLAN-006: Reposicionamiento Académico — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescribir la portada de sprintjudicial.com como espacio personal y académico (mentoría abierta, docencia, divulgación y software libre), sin oferta comercial, y dejar un test que lo verifique.

**Architecture:** Sitio estático de una sola página (HTML + CSS BEM + JS vanilla en IIFE). Se reescribe `index.html` completo, se adelgaza `css/styles.css` (bloques renombrados, nuevos y eliminados), se quita JS muerto y se alinean los archivos públicos. La verificación son tests Node sin dependencias (`tests/*.js`, formato `PASS`/`FAIL`, runner `tests/run-all.js`).

**Tech Stack:** HTML5, CSS3 (BEM, custom properties), JavaScript ES2022 sin dependencias, Node 18+ para tests, nginx (sin cambios).

**Spec:** `docs/specs/SPEC-004-reposicionamiento-academico.md`

## Global Constraints

- Rama: `feat/reposicionamiento-academico`. Commits en español con formato `tipo(alcance): descripción`, **sin** línea `Co-Authored-By` (la atribución está desactivada por el autor).
- Cero dependencias JS en producción. Sin frameworks. Los tests usan solo módulos nativos de Node (`fs`, `path`).
- HTML semántico; caracteres acentuados como entidades HTML (`&aacute;`, `&ntilde;`…) en `index.html`; en JSON-LD, escapes `\uXXXX`.
- CSS: BEM `.block__element--modifier`, que cumpla `selector-class-pattern` de `.stylelintrc.json`; tokens de `:root` sin cambios; mobile first (320 → 768 → 1024 → 1440).
- Accesibilidad WCAG 2.1 AA: un solo `<h1>`, skip-link, `aria-label` donde el texto visible no basta, foco visible, contraste 4.5:1.
- Copy **literal** (no reformular):
  - Nota de transparencia: "Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad."
  - Aviso de jornada: "Las actividades docentes se realizan por fuera de mi jornada laboral y conforme al régimen aplicable a los servidores judiciales."
  - Premio: "Ganador JusticIALab 2024 (equipo Marduk)".
- Prohibido en archivos públicos: lo que lista la spec en §2.1 (precios, venta, consultoría, claims de adopción, "JusticIALab 2025", datos del lugar de trabajo, recaudo). `tests/test-compliance.js` lo hace cumplir.
- **No tocar** (spec §10, fuera de alcance): `CLAUDE.md`, `docs/others/*`, `docs/specs/SPEC-002*`, `docs/specs/SPEC-003*`, `docs/research/*`, `docs/ROADMAP.md`, `agent_docs/*`, `nginx/default.conf`, `Dockerfile`.

## Precisiones sobre la spec

Decisiones de implementación que concretan la spec sin cambiar su intención:

1. **`.cta-section` y `.text-center` se eliminan** (RT-02 los listaba como "se conservan"): el nuevo HTML no los usa y la spec prohíbe CSS muerto. `test-css-usage.js` lo verifica.
2. **`.publication` se generaliza como `.entries`**: el mismo bloque sirve para reconocimientos, charlas y publicaciones.
3. **Etiqueta del hero con `.section__label`** en vez de un bloque nuevo; `.hero__badge` se elimina como pide RT-02.
4. **Bloque genérico de sección ampliado**: `.section__subtitle` (h3 de subsección), `.section__actions` (fila de botones), `.section__link` (enlace destacado) y el modificador `.section--alt` (fondo alterno).
5. **Títulos de tarjetas del blog pasan de `h3` a `h4`** en `initBlogFeed`, porque ahora cuelgan del subtítulo `h3` "Blog".
6. **El botón "Invitarme" de Docencia lleva `aria-label="Invitarme por correo electrónico"`**: el CTA de la navbar también dice "Invitarme" pero lleva a `#docencia`. Un mismo nombre accesible no puede apuntar a dos destinos.
7. **`type="button"`** en los dos `<button>` (menú y volver arriba).
8. **Regla `prefers-reduced-motion` para la flecha del hero** (`.hero__scroll-indicator svg`), que hoy rebota aunque el usuario pida movimiento reducido.
9. **Linters con línea base** (RV-03): `node_modules` no está instalado y la línea base (`be5e17f`) ya tiene hallazgos (p. ej. `no-var` en `main.js`). Criterio: **ninguna regla nueva** frente a la línea base.
10. **Enlace de Google Scholar sin `&hl=es`**, para evitar escapar `&` en atributos.

## Review Focus

Entradas o condiciones que la spec implica y que ningún test funcional ejercita por sí solo; cada una queda fijada en la tarea indicada:

1. **Términos prohibidos escritos con entidades HTML, escapes `\uXXXX`, mayúsculas o partidos por etiquetas** (p. ej. `Consultor&iacute;a`, `producci&oacute;n <strong>nacional</strong>`) → el test de cumplimiento debe detectarlos. *Autoprueba en Task 1.*
2. **Enlaces con el mismo texto visible y destinos distintos** ("Repositorio →", "Probar la demo →", "Invitarme") → cada destino con nombre accesible propio. *Test en Task 2; `aria-label` en Task 3.*
3. **Feed del blog caído** (CORS, red, timeout de 8 s) → debe quedar visible el enlace "Visitar el blog". *Test estático en Task 2; verificación manual en Task 7.*
4. **Assets locales rotos o huérfanos** (un logo referenciado que no existe o logos institucionales que quedan en `src/`) → cero referencias rotas y cero archivos sin uso. *Test en Task 2; borrado en Task 3.*
5. **Pantallas de 320 px** → el `<h1>` largo y el botón "Invitarme a dar una clase o conferencia" no deben producir scroll horizontal. *Verificación manual en Task 7.*

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `tests/test-compliance.js` | Crear | Reglas de contenido de SPEC-004 sobre archivos públicos (RV-01) |
| `tests/test-js-selectors.js` | Crear | Cada selector que usa `main.js` existe en `index.html` (sin JS muerto) |
| `tests/test-css-usage.js` | Crear | Cada clase de `styles.css` se usa en HTML o JS (sin CSS muerto) |
| `tests/run-all.js` | Modificar | Registrar los tres tests nuevos |
| `tests/test-accessibility.js` | Modificar | Ids y enlaces de la nueva estructura; nombres accesibles únicos |
| `tests/test-links.js` | Modificar | CTAs externos nuevos, tarjetas de herramientas, assets locales, respaldo del blog |
| `index.html` | Reescribir | Portada nueva (RC-01..RC-09, RT-01, RT-05, RT-06) |
| `src/*.png` | Borrar 3 | Logos institucionales (RT-04) |
| `js/main.js` | Modificar | Quitar rotador y contadores; `h4` en tarjetas del blog (RT-03) |
| `css/styles.css` | Modificar | Bloques nuevos, renombrados y eliminados (RT-02) |
| `README.md`, `llms.txt`, `humans.txt`, `sitemap.xml`, `package.json` | Modificar | Archivos públicos (RT-07) |
| `docs/specs/SPEC-004-reposicionamiento-academico.md` | Modificar | Estado, checkboxes y Anexo B con evidencia |

---

### Task 1: Test de cumplimiento (RED)

**Files:**
- Create: `tests/test-compliance.js`
- Modify: `tests/run-all.js:12-18`

**Interfaces:**
- Consumes: nada.
- Produces: `tests/test-compliance.js`, que imprime una línea `PASS:`/`FAIL:` por archivo × grupo, más las de contenido obligatorio y autoprueba. Constantes `TRANSPARENCY_NOTE`, `WORKING_HOURS_NOTE`, `DEMOS_NOTE` (los textos literales que Task 3 debe poner en `index.html`).

- [ ] **Step 1: Escribir el test**

Crear `tests/test-compliance.js`:

```js
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
    patterns: [/\$\s?\d/, /\bcop\b/, /\bprecios?\b/, /\btarifas?\b/, /\bsetup\b/, /pago unico/, /\bpagos?\b/, /\bsuscripci/, /\bplanes? de\b/]
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

console.log('--- Test: Cumplimiento (SPEC-004) ---\n');

for (const file of SCANNED_FILES) {
  const raw = readFile(file);
  if (raw === null) {
    check(false, `[${file}] el archivo existe`);
    continue;
  }
  const texts = {
    full: removeAllowed(normalize(raw)),
    text: removeAllowed(normalize(stripTags(stripUrls(raw))))
  };
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
  { input: 'T&Eacute;CNICO EN SISTEMAS', group: 'Lugar de trabajo' }
];

for (const { input, group } of SELF_TEST_CASES) {
  const rule = FORBIDDEN.find((candidate) => candidate.group === group);
  const text = rule.scope === 'full' ? normalize(input) : normalize(stripTags(stripUrls(input)));
  check(findMatches(text, rule.patterns).length > 0, `Detecta ${group} en «${input}»`);
}
```

- [ ] **Step 2: Registrar el test en el runner**

En `tests/run-all.js`, reemplazar:

```js
const TESTS = [
  { name: 'Estructura de archivos', script: 'tests/test-structure.js' },
  { name: 'HTML semántico y accesibilidad', script: 'tests/test-accessibility.js' },
  { name: 'SEO y meta tags', script: 'tests/test-seo.js' },
  { name: 'CSS validación', script: 'tests/test-css.js' },
  { name: 'Links internos', script: 'tests/test-links.js' },
];
```

por:

```js
const TESTS = [
  { name: 'Estructura de archivos', script: 'tests/test-structure.js' },
  { name: 'HTML semántico y accesibilidad', script: 'tests/test-accessibility.js' },
  { name: 'SEO y meta tags', script: 'tests/test-seo.js' },
  { name: 'CSS validación', script: 'tests/test-css.js' },
  { name: 'Links internos', script: 'tests/test-links.js' },
  { name: 'Cumplimiento SPEC-004', script: 'tests/test-compliance.js' },
];
```

- [ ] **Step 3: Ejecutar y verificar que falla**

Run: `node tests/test-compliance.js`

Expected:
- `FAIL` en `[index.html] Sin Precios` (p. ej. `$150.000`), `Sin Venta` (`servicios`, `consultoria`), `Sin Claims` (`produccion nacional`), `Sin Lugar de trabajo` (`escribiente`), `Sin Contacto comercial` (`wa.me/`), `Sin Schema comercial` (`professionalservice`).
- `FAIL` en `[README.md]` (Venta, Claims, Lugar de trabajo, Contacto comercial) y `[llms.txt]` (Venta, Contacto comercial).
- `PASS` en todas las líneas de `[humans.txt]` y `[package.json]`, y en `[index.html] Sin Recaudo`.
- "Contenido obligatorio": solo `Correo de contacto` en `PASS`; las otras 9 líneas en `FAIL`.
- `PASS` en las 5 líneas de "Autoprueba del normalizador". Si alguna autoprueba falla, corregir `normalize`/`stripTags` antes de seguir.

- [ ] **Step 4: Commit**

```bash
git add tests/test-compliance.js tests/run-all.js
git commit -m "test(cumplimiento): agregar test de cumplimiento de SPEC-004"
```

---

### Task 2: Tests de estructura, enlaces y assets (RED)

**Files:**
- Modify: `tests/test-accessibility.js:38-58`
- Modify: `tests/test-links.js:43-83`

**Interfaces:**
- Consumes: nada de Task 1.
- Produces: exigencias que `index.html` (Task 3) debe cumplir: ids `que-hago`, `herramientas`, `mentoria`, `docencia`, `escritos`; enlaces `#herramientas` y `#docencia`; exactamente 3 `<article class="tool-card…">`; `#blog-fallback` con enlace a `https://blog.sprintjudicial.com`; cada `src` local existe; cada archivo de `src/` está referenciado; un mismo nombre de enlace no lleva a dos destinos.

- [ ] **Step 1: Actualizar `tests/test-accessibility.js`**

Reemplazar el bloque:

```js
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
```

por:

```js
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
check(!html.includes('wa.me/'), 'Sin enlaces a WhatsApp personal');

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
```

- [ ] **Step 2: Actualizar `tests/test-links.js` (CTAs externos)**

Reemplazar:

```js
const requiredLinks = [
  { pattern: 'wa.me/573015771258', name: 'WhatsApp CTA' },
  { pattern: 'contacto@sprintjudicial.com', name: 'Email CTA' },
  { pattern: 'linkedin.com/in/daniel-arbelaez-', name: 'LinkedIn link' },
  { pattern: 'github.com/HammerDev99', name: 'GitHub link' },
  { pattern: 'blog.sprintjudicial.com', name: 'Blog link' },
];
```

por:

```js
const requiredLinks = [
  { pattern: 'chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ', name: 'Grupo de mentoría' },
  { pattern: 'contacto@sprintjudicial.com', name: 'Email CTA' },
  { pattern: 'linkedin.com/in/daniel-arbelaez-', name: 'LinkedIn link' },
  { pattern: 'github.com/HammerDev99', name: 'GitHub link' },
  { pattern: 'blog.sprintjudicial.com', name: 'Blog link' },
  { pattern: 'portfolio.sprintjudicial.com', name: 'Portafolio link' },
  { pattern: 'scholar.google.com/citations?user=T5zXXTcAAAAJ', name: 'Google Scholar link' },
];
```

- [ ] **Step 3: Actualizar `tests/test-links.js` (contenido y assets)**

Reemplazar desde `// Contar servicios mostrados` hasta el final del archivo:

```js
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
```

por:

```js
// Herramientas de código abierto (SPEC-004 RC-04)
console.log('\n--- Contenido ---\n');
const toolArticles = (html.match(/<article class="tool-card[^"]*"/g) || []).length;
check(toolArticles === 3, `Tres tarjetas de herramientas (${toolArticles} encontradas)`);

// Respaldo visible si el feed del blog falla
check(
  /id="blog-fallback"[\s\S]*?href="https:\/\/blog\.sprintjudicial\.com"/.test(html),
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
```

- [ ] **Step 4: Ejecutar y verificar que fallan**

Run: `node tests/test-accessibility.js; node tests/test-links.js`

Expected:
- `test-accessibility`: `FAIL` en los 5 ids nuevos, en `#herramientas`, `#docencia`, `Link al grupo de mentoría` y `Sin enlaces a WhatsApp personal`. `Cada nombre de enlace lleva a un solo destino` → `PASS`.
- `test-links`: `FAIL` en `Grupo de mentoría`, `Portafolio link`, `Google Scholar link` y `Tres tarjetas de herramientas (0 encontradas)`. `PASS` en assets (los 4 logos están referenciados) y en el respaldo del blog.

- [ ] **Step 5: Commit**

```bash
git add tests/test-accessibility.js tests/test-links.js
git commit -m "test(estructura): actualizar tests de accesibilidad y enlaces a la nueva estructura"
```

---

### Task 3: Reescribir `index.html` y retirar logos institucionales (GREEN para la portada)

**Files:**
- Modify (reescritura completa): `index.html`
- Delete: `src/JusticiaLab-Logo-sf.png`, `src/Legal-Hackers-Logo-sf.png`, `src/Rama-Judicial-Logo-sf.png`

**Interfaces:**
- Consumes: exigencias de Task 1 (textos literales y enlaces obligatorios) y Task 2 (ids, enlaces, 3 `tool-card`, `#blog-fallback`, assets).
- Produces (lo usan Task 4 y Task 5):
  - Ids: `main-content`, `nav-menu`, `que-hago`, `herramientas`, `mentoria`, `docencia`, `escritos`, `blog-feed`, `blog-fallback`, `tool-agilex`, `tool-tybabot`, `tool-disciplina`.
  - Clases: `navbar`, `navbar__container`, `navbar__logo`, `navbar__logo-accent`, `navbar__toggle`, `navbar__toggle-bar`, `navbar__links`, `navbar__link`, `navbar__cta`, `hero`, `hero__container`, `hero__content`, `hero__title`, `hero__subtitle`, `hero__actions`, `hero__scroll-indicator`, `btn`, `btn--primary`, `btn--outline`, `container`, `section__label`, `section__label--center`, `section__title`, `section__title--center`, `section__description`, `section__description--center`, `section__subtitle`, `section__actions`, `section__link`, `section--alt`, `pillars`, `pillars__card`, `pillars__icon`, `pillars__title`, `pillars__desc`, `tool-grid`, `tool-card`, `tool-card__logo`, `tool-card__icon`, `tool-card__title`, `tool-card__desc`, `tool-card__meta`, `tool-card__actions`, `tool-card__link`, `notice`, `entries`, `entries__item`, `entries__link`, `steps`, `steps__item`, `steps__number`, `steps__title`, `steps__desc`, `topics`, `topics__item`, `topics__title`, `topics__desc`, `blog`, `blog__grid`, `blog__fallback`, `footer`, `footer__grid`, `footer__brand`, `footer__brand-desc`, `footer__column`, `footer__column-title`, `footer__column-links`, `footer__bottom`, `footer__notice`, `footer__copy`, `footer__license-link`, `back-to-top`, `sr-only`.
  - Atributos que usa `main.js`: `data-animate`, `data-stagger`, `href^="#"`.

- [ ] **Step 1: Reemplazar `index.html` completo**

Sobrescribir `index.html` con:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daniel Arbel&aacute;ez &Aacute;lvarez | Sprint Judicial</title>
  <meta name="description" content="Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre: herramientas de c&oacute;digo abierto, mentor&iacute;a abierta y docencia sobre IA en la justicia.">

  <!-- Canonical -->
  <link rel="canonical" href="https://sprintjudicial.com/">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- Open Graph -->
  <meta property="og:title" content="Daniel Arbel&aacute;ez &Aacute;lvarez | Sprint Judicial">
  <meta property="og:description" content="Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre: herramientas de c&oacute;digo abierto, mentor&iacute;a abierta y docencia sobre IA en la justicia.">
  <meta property="og:url" content="https://sprintjudicial.com/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CO">
  <meta property="og:site_name" content="Sprint Judicial">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Daniel Arbel&aacute;ez &Aacute;lvarez | Sprint Judicial">
  <meta name="twitter:description" content="Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre: herramientas de c&oacute;digo abierto, mentor&iacute;a abierta y docencia sobre IA en la justicia.">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://sprintjudicial.com/#autor",
        "name": "Daniel Arbeláez Álvarez",
        "jobTitle": "Ingeniero de software",
        "url": "https://sprintjudicial.com/",
        "knowsAbout": [
          "Informática jurídica",
          "Automatización de trámites judiciales",
          "Gobernanza de IA en la justicia"
        ],
        "award": "Ganador JusticIALab 2024 (equipo Marduk)",
        "sameAs": [
          "https://www.linkedin.com/in/daniel-arbelaez-",
          "https://github.com/HammerDev99",
          "https://scholar.google.com/citations?user=T5zXXTcAAAAJ",
          "https://blog.sprintjudicial.com",
          "https://portfolio.sprintjudicial.com/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://sprintjudicial.com/#sitio",
        "name": "Sprint Judicial",
        "url": "https://sprintjudicial.com/",
        "inLanguage": "es-CO",
        "author": { "@id": "https://sprintjudicial.com/#autor" },
        "license": "https://creativecommons.org/licenses/by/4.0/deed.es"
      }
    ]
  }
  </script>

  <!-- RSS -->
  <link rel="alternate" type="application/rss+xml" title="Sprint Judicial Blog" href="https://blog.sprintjudicial.com/index.xml">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700;8..60,800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body>

<a href="#main-content" class="sr-only">Saltar al contenido principal</a>

<!-- ===== NAVBAR ===== -->
<header>
  <nav class="navbar" aria-label="Navegaci&oacute;n principal">
    <div class="navbar__container">
      <a href="/" class="navbar__logo">Sprint<span class="navbar__logo-accent">Judicial</span></a>

      <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir men&uacute; de navegaci&oacute;n">
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
      </button>

      <div class="navbar__links" id="nav-menu">
        <a href="#que-hago" class="navbar__link">Qu&eacute; hago</a>
        <a href="#herramientas" class="navbar__link">Herramientas</a>
        <a href="#mentoria" class="navbar__link">Mentor&iacute;a</a>
        <a href="#docencia" class="navbar__link">Docencia</a>
        <a href="#escritos" class="navbar__link">Escritos</a>
        <a href="#docencia" class="navbar__cta">Invitarme</a>
      </div>
    </div>
  </nav>
</header>

<!-- ===== MAIN ===== -->
<main id="main-content">

  <!-- HERO -->
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <p class="section__label" data-animate>Daniel Arbel&aacute;ez &Aacute;lvarez &middot; Ingeniero de software</p>

        <h1 class="hero__title" data-animate>Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre.</h1>

        <p class="hero__subtitle" data-animate>
          Investigo y divulgo automatizaci&oacute;n en el sector justicia colombiano. Publico el c&oacute;digo, explico c&oacute;mo funciona y acompa&ntilde;o a quien quiera aprender a usarlo. <strong>La IA asiste; la decisi&oacute;n es humana.</strong>
        </p>

        <div class="hero__actions" data-animate>
          <a href="#herramientas" class="btn btn--primary">Ver las herramientas (c&oacute;digo abierto) &rarr;</a>
          <a href="#docencia" class="btn btn--outline">Invitarme a dar una clase o conferencia</a>
        </div>
      </div>
    </div>

    <div class="hero__scroll-indicator" aria-hidden="true">
      <span>Scroll</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </section>

  <!-- QUÉ HAGO -->
  <section id="que-hago" class="section--alt">
    <div class="container">
      <span class="section__label section__label--center" data-animate>Qu&eacute; hago</span>
      <h2 class="section__title section__title--center" data-animate>Ense&ntilde;ar, construir y escribir</h2>
      <p class="section__description section__description--center" data-animate>
        Tres actividades con un mismo prop&oacute;sito: que m&aacute;s personas del sector justicia entiendan la automatizaci&oacute;n y la usen con criterio.
      </p>

      <ul class="pillars" role="list" data-animate data-stagger>
        <li class="pillars__card">
          <div class="pillars__icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <h3 class="pillars__title">Ense&ntilde;o</h3>
          <p class="pillars__desc">Doy clases invitadas, talleres y conferencias sobre inform&aacute;tica jur&iacute;dica, automatizaci&oacute;n de tr&aacute;mites y gobernanza de IA en la justicia.</p>
        </li>

        <li class="pillars__card">
          <div class="pillars__icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <h3 class="pillars__title">Construyo software libre</h3>
          <p class="pillars__desc">Publico herramientas con licencia MIT para tareas repetitivas del trabajo judicial. Puedes leer el c&oacute;digo, usarlo y mejorarlo.</p>
        </li>

        <li class="pillars__card">
          <div class="pillars__icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 class="pillars__title">Investigo y escribo</h3>
          <p class="pillars__desc">Escribo en el blog y en revistas acad&eacute;micas sobre automatizaci&oacute;n de tr&aacute;mites y uso responsable de la IA.</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- HERRAMIENTAS -->
  <section id="herramientas">
    <div class="container">
      <span class="section__label" data-animate>C&oacute;digo abierto</span>
      <h2 class="section__title" data-animate>Herramientas libres</h2>
      <p class="section__description" data-animate>
        Software gratuito con licencia MIT. Cada herramienta tiene su repositorio p&uacute;blico y su documentaci&oacute;n.
      </p>

      <div class="tool-grid" data-animate data-stagger>
        <article class="tool-card" aria-labelledby="tool-agilex">
          <img class="tool-card__logo" src="src/Agilex-logo.png" alt="Logo de AgilEx" width="48" height="48" loading="lazy">
          <h3 class="tool-card__title" id="tool-agilex">AgilEx</h3>
          <p class="tool-card__desc">Automatiza la creaci&oacute;n y el diligenciamiento del &iacute;ndice electr&oacute;nico de un expediente a partir de los archivos de una carpeta, seg&uacute;n el protocolo de expediente electr&oacute;nico del Acuerdo PCSJA20-11567 de 2020.</p>
          <p class="tool-card__meta">Licencia MIT &middot; Versi&oacute;n 1.5.1 (abril de 2026) &middot; Primera versi&oacute;n publicada: octubre de 2022</p>
          <div class="tool-card__actions">
            <a href="https://github.com/HammerDev99/GestionExpedienteElectronico_Version1" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Repositorio de AgilEx en GitHub">Repositorio &rarr;</a>
            <a href="https://docs.agilex.sprintjudicial.com/" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Documentaci&oacute;n de AgilEx">Documentaci&oacute;n &rarr;</a>
          </div>
        </article>

        <article class="tool-card" aria-labelledby="tool-tybabot">
          <div class="tool-card__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <h3 class="tool-card__title" id="tool-tybabot">TYBABot</h3>
          <p class="tool-card__desc">Asistente conversacional que orienta sobre el uso de Justicia XXI Web (TYBA): documentos electr&oacute;nicos, actuaciones, memoriales, notificaciones y firmas.</p>
          <p class="tool-card__meta">Licencia MIT &middot; Demo p&uacute;blica</p>
          <div class="tool-card__actions">
            <a href="https://github.com/HammerDev99/TYBABot" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Repositorio de TYBABot en GitHub">Repositorio &rarr;</a>
            <a href="https://tybabot.streamlit.app" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Probar la demo de TYBABot">Probar la demo &rarr;</a>
          </div>
        </article>

        <article class="tool-card" aria-labelledby="tool-disciplina">
          <div class="tool-card__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 class="tool-card__title" id="tool-disciplina">DisciplinaJudicialAI</h3>
          <p class="tool-card__desc">Orientador normativo sobre el r&eacute;gimen disciplinario de los servidores judiciales: etapas del proceso, faltas, sanciones y derechos del investigado. No reemplaza la asesor&iacute;a de un abogado.</p>
          <p class="tool-card__meta">Licencia MIT &middot; Demo p&uacute;blica</p>
          <div class="tool-card__actions">
            <a href="https://github.com/HammerDev99/disciplinajudicialai" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Repositorio de DisciplinaJudicialAI en GitHub">Repositorio &rarr;</a>
            <a href="https://disciplinajudicialai.streamlit.app/" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Probar la demo de DisciplinaJudicialAI">Probar la demo &rarr;</a>
          </div>
        </article>
      </div>

      <p class="notice" data-animate>Las demos usan servicios de IA de terceros. No ingreses datos personales ni informaci&oacute;n de procesos reales.</p>

      <h3 class="section__subtitle" data-animate>Reconocimientos</h3>
      <ul class="entries" role="list" data-animate>
        <li class="entries__item">
          <strong>Ganador JusticIALab 2024 (equipo Marduk)</strong> &mdash; categor&iacute;a Justicia Basada en Datos, Primer Concurso de Innovaci&oacute;n de la Rama Judicial.
          <a href="https://www.ramajudicial.gov.co/web/consejo-superior-de-la-judicatura/-/construimos-la-justicia-del-futuro-con-el-primer-concurso-de-innovaci%C3%B3n-de-la-rama-judicial" class="entries__link" target="_blank" rel="noopener noreferrer">Ver la fuente &rarr;</a>
        </li>
        <li class="entries__item">
          Incluido en el Mapa de Innovaci&oacute;n Legal en Colombia (Legal Hackers Medell&iacute;n y ALTCO, 2023), categor&iacute;a Automatizaci&oacute;n documental y de procesos.
        </li>
      </ul>

      <p data-animate>
        <a href="https://github.com/HammerDev99" class="section__link" target="_blank" rel="noopener noreferrer">M&aacute;s proyectos en GitHub &rarr;</a>
      </p>
    </div>
  </section>

  <!-- MENTORÍA ABIERTA -->
  <section id="mentoria" class="section--alt">
    <div class="container">
      <span class="section__label" data-animate>Mentor&iacute;a abierta</span>
      <h2 class="section__title" data-animate>Aprende a automatizar con herramientas libres</h2>
      <p class="section__description" data-animate>
        Acompa&ntilde;amiento sin costo para servidores judiciales y estudiantes que quieren aprender a usar AgilEx y a dise&ntilde;ar automatizaciones responsables.
      </p>

      <ol class="steps" role="list" data-animate data-stagger>
        <li class="steps__item">
          <span class="steps__number" aria-hidden="true">1</span>
          <h3 class="steps__title">&Uacute;nete al grupo</h3>
          <p class="steps__desc">Entra al grupo comunitario de innovaci&oacute;n legal en WhatsApp. All&iacute; se hacen y se responden las preguntas.</p>
        </li>
        <li class="steps__item">
          <span class="steps__number" aria-hidden="true">2</span>
          <h3 class="steps__title">Participa en las sesiones abiertas</h3>
          <p class="steps__desc">Las sesiones p&uacute;blicas se anuncian en el grupo. Puedes llegar con tu duda o con un tr&aacute;mite que quieras automatizar.</p>
        </li>
        <li class="steps__item">
          <span class="steps__number" aria-hidden="true">3</span>
          <h3 class="steps__title">Usa el material gratuito</h3>
          <p class="steps__desc">La documentaci&oacute;n de AgilEx y los art&iacute;culos del blog est&aacute;n disponibles para cualquiera.</p>
        </li>
      </ol>

      <div class="section__actions" data-animate>
        <a href="https://chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Unirme al grupo de WhatsApp &rarr;</a>
      </div>

      <p class="notice" data-animate>Es un grupo comunitario, no un canal oficial de la Rama Judicial. Al unirte, los dem&aacute;s miembros pueden ver tu n&uacute;mero. La mentor&iacute;a no tiene costo.</p>
    </div>
  </section>

  <!-- DOCENCIA Y CONFERENCIAS -->
  <section id="docencia">
    <div class="container">
      <span class="section__label" data-animate>Docencia y conferencias</span>
      <h2 class="section__title" data-animate>Inv&iacute;tame a tu clase o evento acad&eacute;mico</h2>
      <p class="section__description" data-animate>
        Participo como docente invitado o conferencista en universidades, escuelas judiciales y eventos acad&eacute;micos.
      </p>

      <h3 class="section__subtitle" data-animate>Temas</h3>
      <ul class="topics" role="list" data-animate data-stagger>
        <li class="topics__item">
          <h4 class="topics__title">Inform&aacute;tica jur&iacute;dica</h4>
          <p class="topics__desc">C&oacute;mo funcionan los sistemas de informaci&oacute;n judicial y qu&eacute; cambia con el expediente electr&oacute;nico.</p>
        </li>
        <li class="topics__item">
          <h4 class="topics__title">Automatizaci&oacute;n de tr&aacute;mites judiciales</h4>
          <p class="topics__desc">C&oacute;mo identificar tareas repetitivas y automatizarlas sin perder controles: entrevistas guiadas, plantillas y robots de escritorio.</p>
        </li>
        <li class="topics__item">
          <h4 class="topics__title">Gobernanza de IA en la justicia</h4>
          <p class="topics__desc">Uso responsable de la IA en el trabajo judicial con el Acuerdo PCSJA24-12243 de 2024 como marco: criterio propio, verificaci&oacute;n, protecci&oacute;n de datos y transparencia.</p>
        </li>
      </ul>

      <h3 class="section__subtitle" data-animate>Charlas y talleres recientes</h3>
      <ul class="entries" role="list" data-animate>
        <li class="entries__item">
          Taller pr&aacute;ctico &laquo;IA para el trabajo judicial: menos carga operativa, mayor capacidad de control&raquo;. Servidores judiciales, Medell&iacute;n, 2026.
        </li>
        <li class="entries__item">
          Conferencia &laquo;Casos de estudio nacionales: experiencias de Colombia en la incorporaci&oacute;n de IA en la justicia&raquo;. Jornada Acad&eacute;mica sobre Inteligencia Artificial y su Impacto en la Justicia, Medell&iacute;n, 18 de octubre de 2024.
          <a href="https://www.asojudiciales.org/wp-content/uploads/2024/10/PROGRAMACION-JORNADA-ACADEMICA-SOBRE-IA-MEDELLIN-18-OCT-2024-1.pdf" class="entries__link" target="_blank" rel="noopener noreferrer">Ver el programa &rarr;</a>
        </li>
      </ul>

      <p data-animate>
        <a href="https://portfolio.sprintjudicial.com/" class="section__link" target="_blank" rel="noopener noreferrer">Trayectoria acad&eacute;mica y profesional &rarr;</a>
      </p>

      <div class="section__actions" data-animate>
        <a href="mailto:contacto@sprintjudicial.com?subject=Invitaci%C3%B3n%20acad%C3%A9mica" class="btn btn--primary" aria-label="Invitarme por correo electr&oacute;nico">Invitarme &rarr;</a>
        <a href="https://www.linkedin.com/in/daniel-arbelaez-" class="btn btn--outline" target="_blank" rel="noopener noreferrer">Escribirme por LinkedIn</a>
      </div>

      <p class="notice" data-animate>Las actividades docentes se realizan por fuera de mi jornada laboral y conforme al r&eacute;gimen aplicable a los servidores judiciales.</p>
    </div>
  </section>

  <!-- ESCRITOS -->
  <section id="escritos" class="blog section--alt">
    <div class="container">
      <span class="section__label" data-animate>Escritos</span>
      <h2 class="section__title" data-animate>Lo que publico</h2>

      <h3 class="section__subtitle" data-animate>Blog</h3>
      <div class="blog__grid" id="blog-feed" data-animate data-stagger>
        <!-- JS populates this from RSS -->
      </div>

      <div class="blog__fallback" id="blog-fallback">
        <a href="https://blog.sprintjudicial.com" class="btn btn--outline" target="_blank" rel="noopener noreferrer">Visitar el blog &rarr;</a>
      </div>

      <h3 class="section__subtitle" data-animate>Publicaciones acad&eacute;micas</h3>
      <ul class="entries" role="list" data-animate>
        <li class="entries__item">
          Arbel&aacute;ez &Aacute;lvarez, D. (2024). Entrevistas guiadas para la optimizaci&oacute;n de procesos judiciales: un enfoque desde el LegalTech. <cite>Cuaderno Activa</cite>, 16(1), 37&ndash;47.
          <a href="https://ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858" class="entries__link" target="_blank" rel="noopener noreferrer">Leer el art&iacute;culo &rarr;</a>
        </li>
      </ul>

      <p data-animate>
        <a href="https://scholar.google.com/citations?user=T5zXXTcAAAAJ" class="section__link" target="_blank" rel="noopener noreferrer">Perfil en Google Scholar &rarr;</a>
      </p>
    </div>
  </section>

</main>

<!-- ===== FOOTER ===== -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid" data-animate>

      <div class="footer__brand">
        <a href="/" class="navbar__logo">Sprint<span class="navbar__logo-accent">Judicial</span></a>
        <p class="footer__brand-desc">Espacio personal de Daniel Arbel&aacute;ez &Aacute;lvarez sobre automatizaci&oacute;n, software libre e IA responsable en la justicia colombiana.</p>
      </div>

      <div class="footer__column">
        <h4 class="footer__column-title">Sitio</h4>
        <nav aria-label="Secciones del sitio">
          <div class="footer__column-links">
            <a href="#que-hago">Qu&eacute; hago</a>
            <a href="#herramientas">Herramientas</a>
            <a href="#mentoria">Mentor&iacute;a</a>
            <a href="#docencia">Docencia</a>
            <a href="#escritos">Escritos</a>
          </div>
        </nav>
      </div>

      <div class="footer__column">
        <h4 class="footer__column-title">Enlaces</h4>
        <nav aria-label="Enlaces externos">
          <div class="footer__column-links">
            <a href="https://blog.sprintjudicial.com" target="_blank" rel="noopener noreferrer">Blog</a>
            <a href="https://portfolio.sprintjudicial.com/" target="_blank" rel="noopener noreferrer">Portafolio</a>
            <a href="https://github.com/HammerDev99" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://scholar.google.com/citations?user=T5zXXTcAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <a href="https://www.linkedin.com/in/daniel-arbelaez-" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </nav>
      </div>

      <div class="footer__column">
        <h4 class="footer__column-title">Contacto</h4>
        <nav aria-label="Contacto">
          <div class="footer__column-links">
            <a href="mailto:contacto@sprintjudicial.com">Correo</a>
            <a href="https://chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ" target="_blank" rel="noopener noreferrer">Grupo de mentor&iacute;a</a>
          </div>
        </nav>
      </div>

    </div>

    <div class="footer__bottom">
      <p class="footer__notice">Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades p&uacute;blicas corresponde a los canales institucionales de cada entidad.</p>
      <p class="footer__copy">&copy; 2026 Daniel Arbel&aacute;ez &Aacute;lvarez. Los contenidos de este sitio se publican bajo licencia <a href="https://creativecommons.org/licenses/by/4.0/deed.es" class="footer__license-link" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. El c&oacute;digo de cada herramienta conserva su propia licencia.</p>
    </div>
  </div>
</footer>

<button type="button" class="back-to-top" aria-label="Volver al inicio">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
</button>

<script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Borrar los logos institucionales**

```bash
git rm src/JusticiaLab-Logo-sf.png src/Legal-Hackers-Logo-sf.png src/Rama-Judicial-Logo-sf.png
```

- [ ] **Step 3: Ejecutar los tests**

Run: `npm test`

Expected:
- `HTML semántico y accesibilidad`, `SEO y meta tags`, `Links internos`, `Estructura de archivos`, `CSS validación` → 0 failed (en SEO, `OG image` pasa a `PENDING`, que no cuenta como fallo).
- `Cumplimiento SPEC-004` → todas las líneas de `[index.html]`, `[humans.txt]`, "Contenido obligatorio" y "Autoprueba" en `PASS`. Siguen en `FAIL` solo `[README.md]` y `[llms.txt]`; se corrigen en Task 6.

Si alguna línea de `[index.html]` falla, el fragmento impreso señala la palabra; corregir el copy sin tocar los textos literales.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(landing): reescribir portada como espacio académico y de software libre"
```

(Los borrados de `src/` ya quedan preparados por `git rm` y entran en este commit.)

---

### Task 4: Quitar JS muerto (rotador y contadores)

**Files:**
- Create: `tests/test-js-selectors.js`
- Modify: `tests/run-all.js` (lista `TESTS`)
- Modify: `js/main.js:11`, `js/main.js:23-25`, `js/main.js:151-207`, `js/main.js:428`, `js/main.js:461-482`, `js/main.js:491`, `js/main.js:495`

**Interfaces:**
- Consumes: ids, clases y atributos de `index.html` (Task 3).
- Produces: `SprintJudicial.init()` sin `initCounters` ni `initHeroRotator`; las tarjetas del blog creadas como `<a class="blog__card">` con título `<h4 class="blog__card-title">`.

- [ ] **Step 1: Escribir el test**

Crear `tests/test-js-selectors.js`:

```js
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
```

Registrar en `tests/run-all.js`, agregando al final de `TESTS`:

```js
  { name: 'Selectores de JS', script: 'tests/test-js-selectors.js' },
```

- [ ] **Step 2: Ejecutar y verificar que falla**

Run: `node tests/test-js-selectors.js`

Expected: `FAIL` en `[data-count-target] existe en index.html`, `.hero__rotator existe en index.html` y `.hero__rotator-item existe en index.html`. El resto en `PASS`.

- [ ] **Step 3: Eliminar la constante y el helper sin uso**

En `js/main.js`, reemplazar:

```js
  const SCROLL_THRESHOLD = 50;
  const ANIMATION_DURATION = 2000;
  const OBSERVER_THRESHOLD = 0.15;
```

por:

```js
  const SCROLL_THRESHOLD = 50;
  const OBSERVER_THRESHOLD = 0.15;
```

y reemplazar:

```js
  // --- Helpers ---

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function $(selector, context) {
```

por:

```js
  // --- Helpers ---

  function $(selector, context) {
```

- [ ] **Step 4: Eliminar los contadores**

Ejecutar desde la raíz del repo (borra desde el marcador inicial hasta justo antes del final; falla si no encuentra un marcador):

```bash
node -e "
const fs = require('fs');
const file = 'js/main.js';
let js = fs.readFileSync(file, 'utf8');
const start = js.indexOf('  // --- Counter Animation ---');
const end = js.indexOf('  // --- Smooth Scroll ---', start);
if (start < 0 || end < 0) { throw new Error('Marcadores de contadores no encontrados'); }
fs.writeFileSync(file, js.slice(0, start) + js.slice(end));
"
```

Después del borrado, `initScrollAnimations` queda seguido directamente por `  // --- Smooth Scroll ---`.

- [ ] **Step 5: Eliminar el rotador**

```bash
node -e "
const fs = require('fs');
const file = 'js/main.js';
let js = fs.readFileSync(file, 'utf8');
const start = js.indexOf('  // --- Hero Rotator ---');
const end = js.indexOf('  // --- Public API ---', start);
if (start < 0 || end < 0) { throw new Error('Marcadores del rotador no encontrados'); }
fs.writeFileSync(file, js.slice(0, start) + js.slice(end));
"
```

- [ ] **Step 6: Actualizar `init`**

Reemplazar:

```js
    init: function () {
      initNavbar();
      initUnifiedScroll();
      initScrollAnimations();
      initCounters();
      initSmoothScroll();
      initResizeHandler();
      initActiveNav();
      initHeroRotator();
      initBlogFeed();
    }
```

por:

```js
    init: function () {
      initNavbar();
      initUnifiedScroll();
      initScrollAnimations();
      initSmoothScroll();
      initResizeHandler();
      initActiveNav();
      initBlogFeed();
    }
```

- [ ] **Step 7: Títulos del blog como `h4`**

En `initBlogFeed`, reemplazar:

```js
          var titleEl = document.createElement('h3');
```

por:

```js
          var titleEl = document.createElement('h4');
```

- [ ] **Step 8: Verificar**

Run: `node tests/test-js-selectors.js && node --check js/main.js && grep -nE "Counter|Rotator|easeOutQuad|ANIMATION_DURATION|data-count" js/main.js`

Expected: todas las líneas del test en `PASS`; `node --check` sin salida; `grep` sin coincidencias (código de salida 1).

- [ ] **Step 9: Commit**

```bash
git add tests/test-js-selectors.js tests/run-all.js js/main.js
git commit -m "refactor(js): eliminar rotador y contadores sin uso"
```

---

### Task 5: CSS — bloques nuevos, renombrados y eliminados

**Files:**
- Create: `tests/test-css-usage.js`
- Modify: `tests/run-all.js` (lista `TESTS`)
- Modify: `css/styles.css` (varias secciones; ver pasos)

**Interfaces:**
- Consumes: la lista de clases de Task 3 y las clases que `main.js` agrega en tiempo de ejecución (`is-open`, `is-active`, `is-visible`, `navbar--scrolled`, `navbar--menu-open`, `blog__card*`).
- Produces: `css/styles.css` sin clases sin uso y con estilos para todos los bloques de Task 3.

- [ ] **Step 1: Escribir el test**

Crear `tests/test-css-usage.js`:

```js
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
```

Registrar en `tests/run-all.js`, agregando al final de `TESTS`:

```js
  { name: 'Uso de clases CSS', script: 'tests/test-css-usage.js' },
```

- [ ] **Step 2: Ejecutar y verificar que falla**

Run: `node tests/test-css-usage.js`

Expected: `FAIL: Sin clases CSS sin uso: about__bio, about__card, …, whatsapp-float` (lista larga que incluye `service-card`, `trust-bar`, `faq__item`, `cta-section`, `text-center`, `hero__badge`, `stat__value`, `differentiators__card`, `timeline__step`).

- [ ] **Step 3: Cortar las secciones muertas con un script**

Ejecutar desde la raíz del repo. Cada `cut` borra desde el marcador inicial hasta justo antes del marcador final; si no encuentra un marcador, lanza un error y **no escribe nada**:

```bash
node -e "
const fs = require('fs');
const file = 'css/styles.css';
let css = fs.readFileSync(file, 'utf8');
function cut(from, to) {
  const start = css.indexOf(from);
  const end = css.indexOf(to, start + from.length);
  if (start < 0 || end < 0) { throw new Error('Marcador no encontrado: ' + from + ' -> ' + to); }
  css = css.slice(0, start) + css.slice(end);
}
cut('.btn--green {', '/* ----- Hero ----- */');
cut('.hero__badge {', '.hero__title {');
cut('.hero__title-highlight {', '.hero__subtitle {');
cut('.hero__stats {', '.hero__scroll-indicator {');
cut('/* ----- Stat ----- */', '/* ----- Section headers ----- */');
cut('/* ----- Service cards ----- */', '/* ----- Blog ----- */');
cut('/* ----- CTA Section ----- */', '/* ----- Footer ----- */');
cut('.footer__social {', '.footer__column-title {');
cut('/* ----- Trust Bar Logo ----- */', '/* ========================================\n   6. UTILITIES');
cut('.text-center {', '/* ----- Back to top ----- */');
fs.writeFileSync(file, css);
"
```

Qué elimina cada corte: `.btn--green` y `.btn--lg`; `.hero__badge`; `.hero__title-highlight`; `.hero__stats`; sección Stat; desde Service cards hasta antes de Blog (Service cards, Process, Credentials, About, Trust Bar, CTA Intermedio, Comparison, FAQ); CTA Section; `.footer__social` y sus reglas `a`/`:hover`; desde Trust Bar Logo hasta antes de UTILITIES (Trust Bar Logo, Hero Rotator, Service Card Actions, Pain/Result, Pipeline, Differentiators, Security, Timeline, WhatsApp Float); `.text-center`.

- [ ] **Step 4: Agregar el bloque genérico de sección y los bloques nuevos**

En `css/styles.css`, reemplazar:

```css
.section__description--center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
```

por:

```css
.section__description--center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section__subtitle {
  font-size: 1.05rem;
  color: var(--white);
  margin: var(--space-2xl) 0 var(--space-lg);
}

.section__actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  margin-top: var(--space-xl);
}

.section__link {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--accent-light);
  transition: color 0.3s;
}

.section__link:hover {
  color: var(--white);
}

.section--alt {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

/* ----- Pillars (Qué hago) ----- */

.pillars {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

.pillars__card {
  text-align: center;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: var(--deep);
  border: 1px solid var(--border);
  transition: transform 0.3s, box-shadow 0.3s;
}

.pillars__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.pillars__icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-md);
}

.pillars__title {
  font-size: 1.1rem;
  margin-bottom: var(--space-sm);
}

.pillars__desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ----- Tool cards ----- */

.tool-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.tool-card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  position: relative;
  overflow: hidden;
  transition: transform 0.4s, box-shadow 0.4s, border-color 0.4s;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--teal));
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-color: rgba(59, 130, 246, 0.3);
}

.tool-card__logo,
.tool-card__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}

.tool-card__logo {
  object-fit: contain;
}

.tool-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 182, 212, 0.15);
}

.tool-card__title {
  font-size: 1.15rem;
  margin-bottom: 10px;
}

.tool-card__desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.tool-card__meta {
  margin-top: var(--space-md);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.tool-card__actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: var(--space-md);
}

.tool-card__link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-light);
  transition: color 0.3s;
}

.tool-card__link:hover {
  color: var(--white);
}

/* ----- Notice ----- */

.notice {
  margin-top: var(--space-xl);
  padding: var(--space-md) var(--space-lg);
  border-left: 3px solid var(--gold);
  border-radius: var(--radius-sm);
  background: rgba(245, 158, 11, 0.06);
  font-size: 0.88rem;
  color: var(--text-muted);
  max-width: 720px;
}

/* ----- Entries (reconocimientos, charlas, publicaciones) ----- */

.entries {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-width: 820px;
  margin-bottom: var(--space-lg);
}

.entries__item {
  padding-left: var(--space-lg);
  border-left: 2px solid var(--border);
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.entries__item strong {
  color: var(--white);
}

.entries__link {
  font-weight: 600;
  color: var(--accent-light);
  white-space: nowrap;
  transition: color 0.3s;
}

.entries__link:hover {
  color: var(--white);
}

/* ----- Steps (Mentoría) ----- */

.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

.steps__item {
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: var(--deep);
  border: 1px solid var(--border);
}

.steps__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.15);
  border: 2px solid var(--accent);
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--accent-light);
  margin-bottom: var(--space-md);
}

.steps__title {
  font-size: 1.05rem;
  margin-bottom: var(--space-sm);
}

.steps__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ----- Topics (Docencia) ----- */

.topics {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.topics__item {
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}

.topics__title {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.topics__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}
```

- [ ] **Step 5: Agregar estilos del pie**

Reemplazar:

```css
.footer__copy {
  font-size: 0.82rem;
  color: var(--text-muted);
}
```

por:

```css
.footer__copy {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.footer__notice {
  font-size: 0.85rem;
  color: var(--text-muted);
  max-width: 720px;
  margin: 0 auto var(--space-md);
}

.footer__license-link {
  color: var(--accent-light);
  text-decoration: underline;
}
```

- [ ] **Step 6: Reemplazar la sección RESPONSIVE**

Primero, truncar el archivo justo antes de la sección RESPONSIVE:

```bash
node -e "
const fs = require('fs');
const file = 'css/styles.css';
const css = fs.readFileSync(file, 'utf8');
const start = css.indexOf('/* ========================================\n   7. RESPONSIVE');
if (start < 0) { throw new Error('Marcador RESPONSIVE no encontrado'); }
fs.writeFileSync(file, css.slice(0, start));
"
```

Después, agregar al final de `css/styles.css` (con `cat >> css/styles.css <<'EOF'` … `EOF`, o pegándolo en el editor):

```css
/* ========================================
   7. RESPONSIVE — Mobile first breakpoints
   ======================================== */

/* --- Tablet (768px) --- */

@media (min-width: 768px) {
  /* Restore desktop section padding */
  section {
    padding: var(--space-4xl) 0;
  }

  /* Navbar: switch from mobile overlay to inline */
  .navbar__toggle {
    display: none;
  }

  .navbar__links {
    display: flex;
    position: static;
    background: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    flex-direction: row;
    justify-content: flex-end;
    gap: 28px;
    z-index: auto;
    pointer-events: auto;
    transition: none;
  }

  .navbar__link {
    font-size: 0.9rem;
  }

  .navbar__link.is-active {
    color: var(--white);
    border-bottom: 2px solid var(--accent-light);
    padding-bottom: 2px;
  }

  .navbar__cta {
    font-size: 0.9rem;
    padding: 10px 22px;
  }

  /* Restore decorative pseudo-elements on larger screens */
  .hero::before,
  .hero::after {
    display: block;
  }

  .hero__scroll-indicator {
    display: flex;
  }

  .tool-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps {
    grid-template-columns: repeat(3, 1fr);
  }

  .blog__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--space-2xl);
  }
}

/* --- Desktop (1024px) --- */

@media (min-width: 1024px) {
  .pillars,
  .tool-grid,
  .topics {
    grid-template-columns: repeat(3, 1fr);
  }

  .blog__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* --- Reduced motion --- */

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-indicator svg {
    animation: none;
  }
}
```

- [ ] **Step 7: Verificar**

Run: `node tests/test-css-usage.js && node tests/test-css.js && grep -nE "service-card|trust-bar|whatsapp|differentiators|timeline|cta-mid|faq|comparison|pipeline|security__|credential|about__|stat__" css/styles.css`

Expected:
- `test-css-usage`: `PASS: Sin clases CSS sin uso`.
- `test-css`: 0 `FAIL` (tokens, `clamp(`, `scroll-behavior: smooth`, `@media`, `768px`, `@keyframes`, `fadeUp` siguen presentes).
- `grep`: sin coincidencias.
- `wc -l css/styles.css`: entre 900 y 1.150 líneas (antes 1.864).

- [ ] **Step 8: Commit**

```bash
git add tests/test-css-usage.js tests/run-all.js css/styles.css
git commit -m "refactor(css): renombrar bloques y eliminar estilos sin uso"
```

---

### Task 6: Archivos públicos (README, llms.txt, humans.txt, sitemap, package.json)

**Files:**
- Modify (reescritura): `README.md`, `llms.txt`
- Modify: `humans.txt`, `sitemap.xml:5`, `package.json:4`

**Interfaces:**
- Consumes: `tests/test-compliance.js` (Task 1) como verificación.
- Produces: archivos públicos alineados con SPEC-004 RT-07.

- [ ] **Step 1: Confirmar el estado RED**

Run: `node tests/test-compliance.js | grep FAIL`

Expected: solo líneas `[README.md]` y `[llms.txt]`.

- [ ] **Step 2: Reescribir `llms.txt`**

Sobrescribir `llms.txt` con:

```text
# Sprint Judicial

> Espacio personal y académico de Daniel Arbeláez Álvarez sobre automatización de trámites judiciales con software libre.

Daniel Arbeláez Álvarez es ingeniero de software. Investiga, enseña y publica software libre sobre automatización en el sector justicia colombiano. La IA asiste; la decisión es humana.

## Herramientas de código abierto (licencia MIT)

- AgilEx: crea y diligencia el índice electrónico de un expediente a partir de los archivos de una carpeta. Repositorio: https://github.com/HammerDev99/GestionExpedienteElectronico_Version1 — Documentación: https://docs.agilex.sprintjudicial.com/
- TYBABot: orienta sobre el uso de Justicia XXI Web (TYBA). Repositorio: https://github.com/HammerDev99/TYBABot
- DisciplinaJudicialAI: orienta sobre el régimen disciplinario de los servidores judiciales. Repositorio: https://github.com/HammerDev99/disciplinajudicialai

## Mentoría abierta

Acompañamiento sin costo para servidores judiciales y estudiantes, a través de un grupo comunitario: https://chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ

## Docencia y conferencias

Temas: informática jurídica, automatización de trámites judiciales y gobernanza de IA en la justicia. Invitaciones académicas: contacto@sprintjudicial.com

## Escritos

- Blog: https://blog.sprintjudicial.com
- Arbeláez Álvarez, D. (2024). Entrevistas guiadas para la optimización de procesos judiciales: un enfoque desde el LegalTech. Cuaderno Activa, 16(1), 37–47. https://ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858

## Transparencia

Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad.

## Licencia

Contenidos bajo CC BY 4.0. El código de cada herramienta conserva su propia licencia.
```

- [ ] **Step 3: Reescribir `README.md`**

Sobrescribir `README.md` con:

````markdown
# Sprint Judicial

**Espacio personal y académico de Daniel Arbeláez Álvarez sobre automatización de trámites judiciales con software libre.**

Este repositorio contiene el sitio [sprintjudicial.com](https://sprintjudicial.com): herramientas de código abierto, mentoría abierta, docencia y escritos.

> Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad.

---

## Herramientas de código abierto

| Herramienta | Qué hace | Licencia | Enlaces |
|-------------|----------|----------|---------|
| AgilEx | Crea y diligencia el índice electrónico de un expediente a partir de los archivos de una carpeta | MIT | [Repositorio](https://github.com/HammerDev99/GestionExpedienteElectronico_Version1) · [Documentación](https://docs.agilex.sprintjudicial.com/) |
| TYBABot | Orienta sobre el uso de Justicia XXI Web (TYBA) | MIT | [Repositorio](https://github.com/HammerDev99/TYBABot) · [Demo](https://tybabot.streamlit.app) |
| DisciplinaJudicialAI | Orienta sobre el régimen disciplinario de los servidores judiciales | MIT | [Repositorio](https://github.com/HammerDev99/disciplinajudicialai) · [Demo](https://disciplinajudicialai.streamlit.app/) |

## Reconocimientos

- Ganador JusticIALab 2024 (equipo Marduk), categoría Justicia Basada en Datos — [fuente](https://www.ramajudicial.gov.co/web/consejo-superior-de-la-judicatura/-/construimos-la-justicia-del-futuro-con-el-primer-concurso-de-innovaci%C3%B3n-de-la-rama-judicial).
- Incluido en el Mapa de Innovación Legal en Colombia (Legal Hackers Medellín y ALTCO, 2023), categoría Automatización documental y de procesos.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 / CSS3 / JavaScript vanilla |
| Tipografía | Source Serif 4 + Inter |
| Servidor | nginx (alpine) con security headers OWASP |
| Deploy | Docker / hosting estático |
| Analítica | Sin Google Analytics (privacy-first) |

Zero dependencias JS. No jQuery, no Bootstrap, no React.

---

## Quick start

```bash
# Opción 1: servidor local (sin instalación)
python -m http.server 8000
# Abrir http://localhost:8000

# Opción 2: Docker
docker build -t sprint-judicial .
docker run -p 80:80 sprint-judicial
# Abrir http://localhost
```

## Tests

```bash
# Suite completa (solo Node, sin dependencias)
npm test

# Linters (requieren instalar las devDependencies)
npm install --no-package-lock
npx html-validate index.html
npx stylelint "css/**/*.css"
npx eslint js/
```

`tests/test-compliance.js` verifica las reglas de contenido de `docs/specs/SPEC-004-reposicionamiento-academico.md` sobre los archivos públicos.

---

## Estructura del repositorio

```
main-sprintjudicial/
├── index.html              # Página única
├── css/
│   ├── styles.css          # Estilos BEM + design tokens
│   └── animations.css      # Keyframes y animaciones
├── js/
│   └── main.js             # Lógica de UI (Module Pattern)
├── src/                    # Logo de AgilEx
├── nginx/
│   └── default.conf        # Security headers + gzip + cache
├── tests/                  # Tests Node (estructura, a11y, SEO, CSS, enlaces, cumplimiento)
├── docs/                   # Specs, research, plans, ADRs
├── agent_docs/             # Documentación técnica para desarrollo con IA
├── Dockerfile
├── robots.txt
├── sitemap.xml
├── llms.txt
├── humans.txt
├── security.txt
└── CLAUDE.md               # Instrucciones para Claude Code
```

---

## Design tokens

```css
--deep: #0B1D33;        /* Fondo principal */
--navy: #152A4A;        /* Superficies */
--accent: #3B82F6;      /* Azul primario */
--teal: #06B6D4;        /* Acentos secundarios */
--gold: #F59E0B;        /* Avisos y reconocimientos */
--green: #10B981;       /* Estados positivos */
--text: #E2E8F0;        /* Texto principal */
--text-muted: #94A3B8;  /* Texto secundario */
```

---

## Convenciones de código

- **CSS**: metodología BEM (`.block__element--modifier`), custom properties para tokens
- **JS**: Module Pattern (IIFE), sin dependencias externas
- **HTML**: semántico — `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`
- **Accesibilidad**: WCAG 2.1 AA mínimo, `aria-label`, contraste 4.5:1, `skip-to-content`
- **Responsive**: mobile-first (320px → 768px → 1024px → 1440px)
- **Commits**: `tipo(alcance): descripción en español`

---

## Documentación

| Necesitas... | Consulta |
|-------------|----------|
| Convenciones de código | `agent_docs/code_conventions.md` |
| Arquitectura y decisiones técnicas | `agent_docs/architecture.md` |
| Design system completo | `agent_docs/design_system.md` |
| Patrones UX / accesibilidad | `agent_docs/ux_patterns.md` |
| SEO y meta tags | `agent_docs/seo.md` |
| Reposicionamiento del sitio | `docs/specs/SPEC-004-reposicionamiento-academico.md` |

---

## Seguridad

- CSP estricto, HSTS, X-Frame-Options, Permissions-Policy (ver `nginx/default.conf`)
- Sin inline event handlers
- Contenido externo insertado con DOM API (no `innerHTML`)
- Auditoría Nessus documentada en `docs/architecture/ADR-001-informe-seguridad.md`

---

## Licencia

Los contenidos del sitio se publican bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es). El código de cada herramienta conserva su propia licencia.

## Contacto

**Daniel Arbeláez Álvarez** — Ingeniero de software

- Correo: [contacto@sprintjudicial.com](mailto:contacto@sprintjudicial.com)
- LinkedIn: [linkedin.com/in/daniel-arbelaez-](https://www.linkedin.com/in/daniel-arbelaez-)
- GitHub: [github.com/HammerDev99](https://github.com/HammerDev99)
- Blog: [blog.sprintjudicial.com](https://blog.sprintjudicial.com)
- Portafolio: [portfolio.sprintjudicial.com](https://portfolio.sprintjudicial.com/)
- Google Scholar: [perfil](https://scholar.google.com/citations?user=T5zXXTcAAAAJ)

---

*"La IA asiste; la decisión es humana."*
````

- [ ] **Step 4: `humans.txt`, `sitemap.xml` y `package.json`**

En `humans.txt`, reemplazar:

```text
Software: Vanilla (zero dependencies)
```

por:

```text
Software: Vanilla (zero dependencies)
Content license: CC BY 4.0
```

En `sitemap.xml`, reemplazar `<lastmod>2026-03-10</lastmod>` por `<lastmod>` con la fecha del día (salida de `date +%F`, p. ej. `<lastmod>2026-10-09</lastmod>`).

En `package.json`, reemplazar:

```json
  "description": "Landing page - IA y Automatización para Abogados Litigantes",
```

por:

```json
  "description": "Sitio personal y académico de Daniel Arbeláez Álvarez: software libre y docencia sobre automatización judicial",
```

- [ ] **Step 5: Verificar**

Run: `npm test`

Expected: `Resultados: N passed, 0 failed` y código de salida 0. En la salida de `Cumplimiento SPEC-004`, todas las líneas en `PASS`.

- [ ] **Step 6: Commit**

```bash
git add README.md llms.txt humans.txt sitemap.xml package.json
git commit -m "docs(publico): alinear README, llms.txt y metadatos con el reposicionamiento"
```

---

### Task 7: Verificación final y cierre de la spec

**Files:**
- Modify: `docs/specs/SPEC-004-reposicionamiento-academico.md` (encabezado, checkboxes, Anexo B)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: evidencia de RV-01..RV-07 en el Anexo B y estado de la spec.

- [ ] **Step 1: Suite completa**

Run: `npm test`

Expected: `0 failed`, código de salida 0. Copiar la línea `Resultados: …` como evidencia.

- [ ] **Step 2: Linters contra la línea base (RV-03)**

```bash
npm install --no-package-lock
mkdir -p dist/baseline/css
git show be5e17f:index.html > dist/baseline/index.html
git show be5e17f:css/styles.css > dist/baseline/css/styles.css
git show be5e17f:js/main.js > dist/baseline/main.js
npx html-validate dist/baseline/index.html > dist/baseline/html.txt 2>&1
npx html-validate index.html > dist/html.txt 2>&1
npx stylelint dist/baseline/css/styles.css > dist/baseline/css.txt 2>&1
npx stylelint "css/**/*.css" > dist/css.txt 2>&1
npx eslint --stdin --stdin-filename js/main.js < dist/baseline/main.js > dist/baseline/js.txt 2>&1
npx eslint js/ > dist/js.txt 2>&1
rules() { grep -E '^\s+[0-9]+:[0-9]+' "$1" | awk '{print $NF}' | sort -u; }
for t in html css js; do echo "== Reglas nuevas en $t:"; comm -13 <(rules dist/baseline/$t.txt) <(rules dist/$t.txt); done
```

Expected: las tres listas "Reglas nuevas" vacías. Si aparece una regla nueva, corregir el código que la dispara y repetir. (`dist/` y `node_modules/` están en `.gitignore`.)

- [ ] **Step 3: Enlaces externos (RV-04)**

```bash
for u in \
  https://github.com/HammerDev99/GestionExpedienteElectronico_Version1 \
  https://docs.agilex.sprintjudicial.com/ \
  https://github.com/HammerDev99/TYBABot \
  https://tybabot.streamlit.app \
  https://github.com/HammerDev99/disciplinajudicialai \
  https://disciplinajudicialai.streamlit.app/ \
  "https://www.ramajudicial.gov.co/web/consejo-superior-de-la-judicatura/-/construimos-la-justicia-del-futuro-con-el-primer-concurso-de-innovaci%C3%B3n-de-la-rama-judicial" \
  https://www.asojudiciales.org/wp-content/uploads/2024/10/PROGRAMACION-JORNADA-ACADEMICA-SOBRE-IA-MEDELLIN-18-OCT-2024-1.pdf \
  https://ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858 \
  "https://scholar.google.com/citations?user=T5zXXTcAAAAJ" \
  https://portfolio.sprintjudicial.com/ \
  https://blog.sprintjudicial.com \
  https://github.com/HammerDev99 \
  https://www.linkedin.com/in/daniel-arbelaez- \
  https://chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ \
  https://creativecommons.org/licenses/by/4.0/deed.es; do
  printf "%s  %s\n" "$(curl -s -o /dev/null -L -m 20 -A 'Mozilla/5.0' -w '%{http_code}' "$u")" "$u"
done
```

Expected: `200` o `3xx` en todas. Las demos de Streamlit responden `303` por diseño. LinkedIn suele responder `999` a clientes automatizados: verificarlo a mano en el navegador.

- [ ] **Step 4: Repos enlazados sin datos del lugar de trabajo (RV-06)**

```bash
for r in GestionExpedienteElectronico_Version1 AgilEx-Docs; do
  for t in "Bello" "Centro de Servicios" "Técnico en Sistemas" "Citador" "Escribiente"; do
    printf "%-40s %-22s %s\n" "$r" "$t" "$(gh search code "$t" --repo HammerDev99/$r --json path --jq 'length')"
    sleep 7
  done
done
```

Expected: `0` en todas las filas. El `sleep` evita el límite de la API de búsqueda. Si alguna fila es distinta de 0, **reportarlo al autor** con las rutas (`--jq '.[].path'`) antes de publicar. No se corrige en esta spec.

- [ ] **Step 5: Revisión visual (RV-05 y Review Focus 3 y 5)**

Run: `python -m http.server 8000` y abrir `http://localhost:8000` en Chrome.

Verificar y anotar:
- [ ] A 320, 768, 1024 y 1440 px (DevTools → modo dispositivo): sin scroll horizontal. El `<h1>` y el botón "Invitarme a dar una clase o conferencia" se parten en varias líneas sin desbordar.
- [ ] Menú móvil (≤ 767 px): abre con el botón, cierra con Esc, el foco queda atrapado en el menú y vuelve al botón al cerrar.
- [ ] Navegación solo con teclado: el skip-link aparece con Tab; el foco es visible en todos los enlaces y botones.
- [ ] Feed del blog: carga 3 tarjetas. Luego, en DevTools → Network → bloquear el dominio `blog.sprintjudicial.com` y recargar: queda visible "Visitar el blog".
- [ ] DevTools → Rendering → `prefers-reduced-motion: reduce`: el contenido aparece sin animación y la flecha del hero no rebota.
- [ ] El logo de AgilEx se ve y las tres tarjetas de herramientas alinean sus enlaces abajo.

- [ ] **Step 6: Revisión de código (RV-07)**

Lanzar el agente `code-reviewer` sobre `git diff be5e17f...HEAD` con este encargo: revisar contra `docs/specs/SPEC-004-reposicionamiento-academico.md`, en especial copy literal, accesibilidad, BEM y CSS/JS muerto. Atender los hallazgos CRITICAL y HIGH y repetir `npm test`.

- [ ] **Step 7: Contrastar el Anexo A con el diff**

Run: `git diff be5e17f -- index.html README.md llms.txt package.json js/main.js | grep -E '^-' | grep -ciE 'COP|consultor|nacional|escribiente|wa\.me|servicios|demo gratuita'`

Expected: un número mayor que 0 (las líneas del Anexo A aparecen como eliminadas). Luego `git grep -niE 'COP/|consultor|nivel nacional|escribiente|wa\.me' -- index.html README.md llms.txt package.json` debe salir vacío.

- [ ] **Step 8: Cerrar la spec**

En `docs/specs/SPEC-004-reposicionamiento-academico.md`:
- Encabezado: `> Estado: ✅ Implementada (AAAA-MM-DD)` con la fecha del día.
- Marcar `[x]` los checkboxes de §4, §5 y §6 verificados en los pasos anteriores. Dejar sin marcar §8 (acción del autor) y anotar al lado "pendiente del autor".
- Anexo B: reemplazar cada `☐` por `✅` y escribir en "Evidencia" la línea `PASS` correspondiente de `test-compliance.js` (p. ej. `PASS: [index.html] Sin Precios`).

- [ ] **Step 9: Commit**

```bash
git add docs/specs/SPEC-004-reposicionamiento-academico.md
git commit -m "docs(specs): cerrar SPEC-004 con checklist y verificación"
```

- [ ] **Step 10: Informar al autor**

Resumir: resultado de `npm test`, linters (reglas nuevas: ninguna), enlaces, RV-06, revisión visual y hallazgos del revisor. Recordar las dos acciones pendientes del autor: activar "Aprobar nuevos participantes" en el grupo de WhatsApp y decidir sobre la spec "otros repos y docs" (§10 de SPEC-004). No hacer push ni merge sin pedido explícito.
