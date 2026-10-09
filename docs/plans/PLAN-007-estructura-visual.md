# PLAN-007: Estructura Visual y Dinamismo — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Devolver a la portada estructura modular, jerarquía y dinamismo (hero rotativo accesible, tarjetas con acento y etiquetas, banda de reconocimientos, pasos con línea, Docencia y Escritos en dos columnas, microinteracciones) sin cambiar el contenido aprobado en SPEC-004.

**Architecture:** El rotador vive en un módulo propio y testeable (`js/rotator.js`, objeto global `HeroRotator` con `create(options)`, exportable a Node). `main.js` solo lo conecta al DOM. `index.html` reorganiza las secciones en bloques contenidos; `css/styles.css` reemplaza los bloques de presentación (BEM) y corrige la especificidad del hover frente a `animations.css`.

**Tech Stack:** HTML5, CSS3 (BEM, custom properties), JavaScript ES2022 sin dependencias, tests Node nativos (`tests/*.js`, formato `PASS`/`FAIL`, runner `tests/run-all.js`).

**Spec:** `docs/specs/SPEC-005-estructura-visual.md` (y SPEC-004 para el copy y las restricciones de contenido)

## Global Constraints

- Rama `feat/estructura-visual`. Commits en español `tipo(alcance): descripción`, **sin** línea `Co-Authored-By` ni otra atribución. Sin push.
- El copy de SPEC-004 no cambia; los textos literales (nota de transparencia, aviso de jornada, aviso de demos, aviso del grupo, "Ganador JusticIALab 2024 (equipo Marduk)") siguen idénticos. `tests/test-compliance.js` no se modifica y debe seguir en 0 FAIL.
- Microcopy nuevo permitido (SPEC-005 §2): "Código abierto", "Demo pública", "MIT", "v1.5.1", "Desde 2022", "Artículo académico · 2024", "Grupo comunitario de innovación legal", "¿Organizas una clase o evento académico?", "Enseño", "Construyo", "Escribo", "Pausar animación"/"Reanudar animación", "Visita el blog", "3 herramientas MIT", "Mentoría abierta", "JusticIALab 2024 · equipo Marduk", y las cuatro frases del rotador.
- `index.html` con entidades HTML para acentos; JS con escapes `\uXXXX` en cadenas no ASCII (idiom de `main.js`); tokens de `:root` sin cambios; BEM compatible con `.stylelintrc.json`.
- Un solo `<h1>`. WCAG 2.1 AA: 2.2.2 (pausa del rotador), 1.4.1, 1.4.3, 2.4.4. Mobile first 320 → 768 → 1024.
- Sin clases CSS sin uso (`tests/test-css-usage.js`) y sin selectores de JS sin destino (`tests/test-js-selectors.js`).

## Review Focus

1. **Frases de distinto largo** → el `<h1>` no debe cambiar de alto ni empujar el contenido al rotar (todas las frases comparten celda de grid), y desde 768 px cada frase ocupa una sola línea, sin hueco antes de "con software libre." (medido en la prueba en seco: 63 px a 1280, 54 px a 1024, 41 px a 768). En móvil la celda toma el alto de la frase más larga y las cortas quedan centradas. *Medición en Task 4.*
2. **El usuario pausó y luego pasa el puntero por el título** → al salir, la animación debe seguir pausada. *Test en Task 1.*
3. **`rotator.js` no carga (bloqueado o error)** → la página muestra la frase aprobada, el botón de pausa sigue oculto y `main.js` no lanza errores. *Test en Task 2.*
4. **Movimiento reducido** → sin rotación, sin botón, la línea de pasos aparece completa y las tarjetas no se desplazan. *Test en Task 1 (rotador) y verificación en Task 4.*
5. **Enlaces de las fichas del hero a `#reconocimientos`** → el ancla existe en cada estado intermedio de la rama (Task 2 y Task 3). *Test de anclas existente en `test-links.js`.*

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `js/rotator.js` | Crear | Lógica del rotador (`HeroRotator.create`) sin dependencias del DOM real |
| `tests/test-rotator.js` | Crear | Pruebas unitarias del rotador con elementos y temporizadores simulados |
| `tests/run-all.js` | Modificar | Registrar `test-rotator.js` |
| `js/main.js` | Modificar | `initHeroRotator()` conecta el rotador al DOM |
| `index.html` | Modificar | Hero (Task 2) y secciones (Task 3) |
| `css/styles.css` | Modificar | Rotador y fichas (Task 2); bloques de secciones, hover y responsive (Task 3) |
| `tests/test-accessibility.js` | Modificar | Requisitos del hero accesible |
| `tests/test-css-usage.js` | Modificar | Leer también `js/rotator.js` |
| `docs/specs/SPEC-004-…md`, `docs/specs/SPEC-005-…md` | Modificar | Nota de modificación y cierre |

---

### Task 1: Módulo del rotador (`js/rotator.js`) con pruebas

**Files:**
- Create: `js/rotator.js`
- Create: `tests/test-rotator.js`
- Modify: `tests/run-all.js` (lista `TESTS`)

**Interfaces:**
- Produces: global `HeroRotator` con `HeroRotator.create(options)`; `options = { items: Element[], toggle?: Element, toggleText?: Element, hoverTarget?: Element, doc?: Document, reducedMotion?: boolean, interval?: number (3500), timers?: { set(fn, ms): id, clear(id) } }`. Devuelve `null` si hay menos de 2 ítems; si no, `{ current(): number, isRunning(): boolean }`. Clases que usa: `is-active` (ítems), `is-paused` (botón). Atributos que escribe en el botón: `aria-pressed`, `aria-label` ("Pausar animación del título" / "Reanudar animación del título"), propiedad `hidden`; texto de `toggleText`: "Pausar animación" / "Reanudar animación". En Node, `require('js/rotator.js')` devuelve el mismo objeto.

- [ ] **Step 1: Escribir el test**

Crear `tests/test-rotator.js`:

```js
#!/usr/bin/env node

/**
 * Test: Rotador del hero (SPEC-005 RV5-02, RT5-03)
 * Prueba HeroRotator con elementos y temporizadores simulados.
 */

const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

function check(condition, message) {
  if (condition) {
    console.log(`  PASS: ${message}`);
  } else {
    console.log(`  FAIL: ${message}`);
  }
}

console.log('--- Test: Rotador del hero ---\n');

const rotatorPath = path.join(ROOT, 'js', 'rotator.js');
if (!fs.existsSync(rotatorPath)) {
  check(false, 'js/rotator.js existe');
  process.exit(0);
}

const HeroRotator = require(rotatorPath);

function fakeElement() {
  const classes = new Set();
  const attrs = {};
  const listeners = {};
  return {
    hidden: true,
    textContent: '',
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      contains: (name) => classes.has(name),
      toggle: (name, force) => {
        const on = force === undefined ? !classes.has(name) : force;
        if (on) {
          classes.add(name);
        } else {
          classes.delete(name);
        }
        return on;
      }
    },
    setAttribute: (key, value) => {
      attrs[key] = String(value);
    },
    getAttribute: (key) => (key in attrs ? attrs[key] : null),
    addEventListener: (type, fn) => {
      listeners[type] = (listeners[type] || []).concat(fn);
    },
    dispatch: (type) => (listeners[type] || []).forEach((fn) => fn())
  };
}

function fakeTimers() {
  let nextId = 1;
  const active = new Map();
  return {
    set: (fn, ms) => {
      const id = nextId++;
      active.set(id, { fn, ms });
      return id;
    },
    clear: (id) => active.delete(id),
    tick: () => [...active.values()].forEach((timer) => timer.fn()),
    count: () => active.size,
    firstMs: () => ([...active.values()][0] || {}).ms
  };
}

function setup(reducedMotion) {
  const items = [0, 1, 2, 3].map(() => fakeElement());
  items[0].classList.add('is-active');
  const toggle = fakeElement();
  toggle.setAttribute('aria-pressed', 'false');
  const toggleText = fakeElement();
  const hoverTarget = fakeElement();
  const doc = fakeElement();
  doc.hidden = false;
  const timers = fakeTimers();
  const api = HeroRotator.create({ items, toggle, toggleText, hoverTarget, doc, timers, reducedMotion });
  return { items, toggle, toggleText, hoverTarget, doc, timers, api };
}

const activeIndexes = (items) => items
  .map((el, index) => (el.classList.contains('is-active') ? index : -1))
  .filter((index) => index >= 0);

// Rotación normal
{
  const s = setup(false);
  check(s.api !== null, 'create devuelve una API con cuatro frases');
  check(HeroRotator.create({ items: [fakeElement()] }) === null, 'create devuelve null con menos de dos frases');
  check(s.timers.count() === 1 && s.timers.firstMs() === 3500, 'Arranca un intervalo de 3500 ms');
  check(s.toggle.hidden === false, 'El botón de pausa se muestra cuando hay rotación');
  s.timers.tick();
  check(activeIndexes(s.items).join() === '1', 'Tras un intervalo la frase activa es la segunda');
  s.timers.tick();
  s.timers.tick();
  s.timers.tick();
  check(activeIndexes(s.items).join() === '0', 'Tras cuatro intervalos vuelve a la primera frase (una sola activa)');
  check(s.api.current() === 0, 'current() refleja la frase activa');
}

// Botón de pausa (WCAG 2.2.2)
{
  const s = setup(false);
  s.toggle.dispatch('click');
  check(s.toggle.getAttribute('aria-pressed') === 'true', 'Pausar pone aria-pressed="true"');
  check(s.toggle.getAttribute('aria-label') === 'Reanudar animación del título', 'Pausar cambia el aria-label a "Reanudar animación del título"');
  check(s.toggleText.textContent === 'Reanudar animación', 'Pausar cambia el texto visible a "Reanudar animación"');
  check(s.toggle.classList.contains('is-paused'), 'Pausar agrega la clase is-paused al botón');
  check(s.timers.count() === 0 && s.api.isRunning() === false, 'Pausar detiene el intervalo');
  s.toggle.dispatch('click');
  check(s.toggle.getAttribute('aria-pressed') === 'false' && s.timers.count() === 1, 'Reanudar vuelve a rotar');
  check(s.toggle.getAttribute('aria-label') === 'Pausar animación del título', 'Reanudar restablece el aria-label');
}

// Puntero, foco y visibilidad de la pestaña
{
  const s = setup(false);
  s.hoverTarget.dispatch('mouseenter');
  check(s.timers.count() === 0, 'Pasar el puntero sobre el título pausa');
  s.hoverTarget.dispatch('mouseleave');
  check(s.timers.count() === 1, 'Salir del título reanuda');
  s.hoverTarget.dispatch('focusin');
  check(s.timers.count() === 0, 'El foco dentro del título pausa');
  s.hoverTarget.dispatch('focusout');
  s.doc.hidden = true;
  s.doc.dispatch('visibilitychange');
  check(s.timers.count() === 0, 'Pestaña oculta pausa');
  s.doc.hidden = false;
  s.doc.dispatch('visibilitychange');
  check(s.timers.count() === 1, 'Pestaña visible reanuda');
  s.toggle.dispatch('click');
  s.hoverTarget.dispatch('mouseenter');
  s.hoverTarget.dispatch('mouseleave');
  check(s.timers.count() === 0, 'Salir del título no reanuda si el usuario pausó');
}

// Movimiento reducido
{
  const s = setup(true);
  check(s.timers.count() === 0, 'Con movimiento reducido no arranca el intervalo');
  check(s.toggle.hidden === true, 'Con movimiento reducido el botón queda oculto');
  check(activeIndexes(s.items).join() === '0', 'Con movimiento reducido queda la frase aprobada');
}
```

Registrar en `tests/run-all.js`, agregando al final del arreglo `TESTS`:

```js
  { name: 'Rotador del hero', script: 'tests/test-rotator.js' },
```

- [ ] **Step 2: Ejecutar y verificar que falla**

Run: `node tests/test-rotator.js`
Expected: `FAIL: js/rotator.js existe`.

- [ ] **Step 3: Implementar el módulo**

Crear `js/rotator.js`:

```js
'use strict';

/* ========================================
   Sprint Judicial — Hero Rotator
   Rota la frase destacada del título del hero.
   Pausable (WCAG 2.2.2) y sin rotación con movimiento reducido.
   ======================================== */

const HeroRotator = (() => {

  const DEFAULT_INTERVAL = 3500;

  const LABELS = {
    pause: 'Pausar animación del título',
    resume: 'Reanudar animación del título'
  };

  const TEXTS = {
    pause: 'Pausar animación',
    resume: 'Reanudar animación'
  };

  function create(options) {
    const items = options.items || [];
    if (items.length < 2) {
      return null;
    }

    const toggle = options.toggle || null;
    const toggleText = options.toggleText || null;
    const hoverTarget = options.hoverTarget || null;
    const doc = options.doc || null;
    const interval = options.interval || DEFAULT_INTERVAL;
    const timers = options.timers || {
      set: (fn, ms) => setInterval(fn, ms),
      clear: (id) => clearInterval(id)
    };

    let current = 0;
    let timerId = null;
    let userPaused = false;
    let hoverPaused = false;

    function show(index) {
      items[current].classList.remove('is-active');
      current = index;
      items[current].classList.add('is-active');
    }

    function next() {
      show((current + 1) % items.length);
    }

    function canRun() {
      return !userPaused && !hoverPaused && !(doc && doc.hidden);
    }

    function start() {
      if (timerId === null && canRun()) {
        timerId = timers.set(next, interval);
      }
    }

    function stop() {
      if (timerId !== null) {
        timers.clear(timerId);
        timerId = null;
      }
    }

    function setUserPaused(paused) {
      userPaused = paused;
      if (toggle) {
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.setAttribute('aria-label', paused ? LABELS.resume : LABELS.pause);
        toggle.classList.toggle('is-paused', paused);
      }
      if (toggleText) {
        toggleText.textContent = paused ? TEXTS.resume : TEXTS.pause;
      }
      if (paused) {
        stop();
      } else {
        start();
      }
    }

    function setHoverPaused(paused) {
      hoverPaused = paused;
      if (paused) {
        stop();
      } else {
        start();
      }
    }

    const api = {
      current: () => current,
      isRunning: () => timerId !== null
    };

    if (options.reducedMotion) {
      if (toggle) {
        toggle.hidden = true;
      }
      return api;
    }

    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener('click', () => setUserPaused(!userPaused));
    }

    if (hoverTarget) {
      hoverTarget.addEventListener('mouseenter', () => setHoverPaused(true));
      hoverTarget.addEventListener('mouseleave', () => setHoverPaused(false));
      hoverTarget.addEventListener('focusin', () => setHoverPaused(true));
      hoverTarget.addEventListener('focusout', () => setHoverPaused(false));
    }

    if (doc) {
      doc.addEventListener('visibilitychange', () => {
        if (doc.hidden) {
          stop();
        } else {
          start();
        }
      });
    }

    start();
    return api;
  }

  return { create };

})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HeroRotator;
}
```

- [ ] **Step 4: Verificar**

Run: `node tests/test-rotator.js && node --check js/rotator.js`
Expected: las 23 líneas en `PASS`, `node --check` sin salida.

- [ ] **Step 5: Commit**

```bash
git add js/rotator.js tests/test-rotator.js tests/run-all.js
git commit -m "feat(hero): agregar módulo de rotador accesible con pruebas"
```

---

### Task 2: Hero con rotador, botón de pausa y fichas

**Files:**
- Modify: `index.html` (bloque HERO y `<script>` del final; `id="reconocimientos"` provisional)
- Modify: `css/styles.css` (después de `.hero__scroll-indicator svg {…}`; bloque de movimiento reducido)
- Modify: `js/main.js` (nueva `initHeroRotator`, llamada en `init`)
- Modify: `tests/test-accessibility.js`, `tests/test-css-usage.js`, `tests/test-rotator.js`

**Interfaces:**
- Consumes: `HeroRotator.create(options)` de Task 1.
- Produces: clases `rotator`, `rotator__item`, `rotator__toggle`, `rotator__toggle-icon`, `rotator__toggle-text`, `hero-chips`, `hero-chips__item`, `hero-chips__icon`, `hero-chips__icon--teal|blue|gold`, `hero-chips__arrow`; id `reconocimientos` (en Task 2 sobre el `<h3>` de Reconocimientos; Task 3 lo mueve a la banda).

- [ ] **Step 1: Escribir los tests**

En `tests/test-accessibility.js`, inmediatamente **después** de la línea `check(h2Count >= 3, \`Al menos 3 <h2> para secciones (encontrados: ${h2Count})\`);`, agregar:

```js

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
```

En `tests/test-rotator.js`, agregar al final:

```js

// Integración: main.js no falla si rotator.js no carga
{
  const mainJs = fs.readFileSync(path.join(ROOT, 'js', 'main.js'), 'utf-8');
  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');
  check(mainJs.includes("typeof HeroRotator === 'undefined'"), 'main.js comprueba que HeroRotator exista antes de usarlo');
  check(/function init[\s\S]*initHeroRotator\(\);/.test(mainJs), 'init() llama a initHeroRotator()');
  const rotatorTag = indexHtml.indexOf('<script src="js/rotator.js" defer></script>');
  const mainTag = indexHtml.indexOf('<script src="js/main.js" defer></script>');
  check(rotatorTag !== -1 && rotatorTag < mainTag, 'index.html carga rotator.js antes que main.js');
}
```

En `tests/test-css-usage.js`, reemplazar:

```js
const js = fs.readFileSync(path.join(ROOT, 'js', 'main.js'), 'utf-8');
```

por:

```js
const js = ['main.js', 'rotator.js']
  .map((file) => path.join(ROOT, 'js', file))
  .filter((file) => fs.existsSync(file))
  .map((file) => fs.readFileSync(file, 'utf-8'))
  .join('\n');
```

- [ ] **Step 2: Ejecutar y verificar que fallan**

Run: `node tests/test-accessibility.js | grep FAIL; node tests/test-rotator.js | grep FAIL`
Expected: FAIL en las 6 líneas nuevas de accesibilidad y en las 3 de integración de `test-rotator.js`.

- [ ] **Step 3: Reemplazar el hero en `index.html`**

Reemplazar desde la línea `        <h1 class="hero__title" data-animate>Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre.</h1>` hasta el cierre `        </div>` de `hero__actions` (inclusive), es decir el bloque:

```html
        <h1 class="hero__title" data-animate>Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre.</h1>

        <p class="hero__subtitle" data-animate>
          Investigo y divulgo automatizaci&oacute;n en el sector justicia colombiano. Publico el c&oacute;digo, explico c&oacute;mo funciona y acompa&ntilde;o a quien quiera aprender a usarlo. <strong>La IA asiste; la decisi&oacute;n es humana.</strong>
        </p>

        <div class="hero__actions" data-animate>
          <a href="#herramientas" class="btn btn--primary">Ver las herramientas (c&oacute;digo abierto) &rarr;</a>
          <a href="#docencia" class="btn btn--outline">Invitarme a dar una clase o conferencia</a>
        </div>
```

por:

```html
        <h1 class="hero__title" data-animate>
          <span class="sr-only">Ense&ntilde;o y documento c&oacute;mo automatizar tr&aacute;mites judiciales con software libre.</span>
          <span aria-hidden="true">Ense&ntilde;o y documento c&oacute;mo automatizar <span class="rotator"><span class="rotator__item is-active">tr&aacute;mites judiciales</span><span class="rotator__item">el expediente electr&oacute;nico</span><span class="rotator__item">la gesti&oacute;n documental judicial</span><span class="rotator__item">tareas repetitivas del despacho</span></span> con software libre.</span>
        </h1>

        <p class="hero__subtitle" data-animate>
          Investigo y divulgo automatizaci&oacute;n en el sector justicia colombiano. Publico el c&oacute;digo, explico c&oacute;mo funciona y acompa&ntilde;o a quien quiera aprender a usarlo. <strong>La IA asiste; la decisi&oacute;n es humana.</strong>
        </p>

        <div class="hero__actions" data-animate>
          <a href="#herramientas" class="btn btn--primary">Ver las herramientas (c&oacute;digo abierto) &rarr;</a>
          <a href="#docencia" class="btn btn--outline">Invitarme a dar una clase o conferencia</a>
        </div>

        <button type="button" class="rotator__toggle" aria-pressed="false" aria-label="Pausar animaci&oacute;n del t&iacute;tulo" hidden><span class="rotator__toggle-icon" aria-hidden="true"></span><span class="rotator__toggle-text">Pausar animaci&oacute;n</span></button>

        <ul class="hero-chips" role="list" data-animate data-stagger>
          <li>
            <a href="#herramientas" class="hero-chips__item"><span class="hero-chips__icon hero-chips__icon--teal" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>3 herramientas MIT<span class="hero-chips__arrow" aria-hidden="true">&rarr;</span></a>
          </li>
          <li>
            <a href="#mentoria" class="hero-chips__item"><span class="hero-chips__icon hero-chips__icon--blue" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>Mentor&iacute;a abierta<span class="hero-chips__arrow" aria-hidden="true">&rarr;</span></a>
          </li>
          <li>
            <a href="#reconocimientos" class="hero-chips__item"><span class="hero-chips__icon hero-chips__icon--gold" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>JusticIALab 2024 &middot; equipo Marduk<span class="hero-chips__arrow" aria-hidden="true">&rarr;</span></a>
          </li>
        </ul>
```

Agregar el id provisional al subtítulo de Reconocimientos: reemplazar

```html
      <h3 class="section__subtitle" data-animate>Reconocimientos</h3>
```

por

```html
      <h3 class="section__subtitle" id="reconocimientos" data-animate>Reconocimientos</h3>
```

Cargar el módulo: reemplazar

```html
<script src="js/main.js" defer></script>
```

por

```html
<script src="js/rotator.js" defer></script>
<script src="js/main.js" defer></script>
```

- [ ] **Step 4: Estilos del rotador y las fichas**

Primero, en `css/styles.css`, ampliar el contenido del hero y ajustar el tamaño del título para que las cuatro frases quepan en una línea desde 768 px (medido: con 750 px y 3,8 rem, "la gestión documental judicial" ocupaba dos líneas a 1280 px y dejaba un hueco). Reemplazar:

```css
.hero__content {
  max-width: 750px;
}

.hero__title {
  margin-bottom: var(--space-lg);
}
```

por:

```css
.hero__content {
  max-width: 900px;
}

.hero__title {
  font-size: clamp(1.9rem, 4.6vw, 3.4rem);
  margin-bottom: var(--space-lg);
}
```

Luego, en `css/styles.css`, reemplazar:

```css
.hero__scroll-indicator svg {
  animation: bounce 2s ease-in-out infinite;
}
```

por:

```css
.hero__scroll-indicator svg {
  animation: bounce 2s ease-in-out infinite;
}

/* ----- Rotator (hero) ----- */

.rotator {
  display: grid;
  align-items: center;
}

.rotator__item {
  grid-area: 1 / 1;
  opacity: 0;
  transform: translateY(0.35em);
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: linear-gradient(135deg, var(--accent-light), var(--teal));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rotator__item.is-active {
  opacity: 1;
  transform: none;
}

.rotator__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.rotator__toggle:hover {
  color: var(--white);
  border-color: var(--accent-light);
}

.rotator__toggle[hidden] {
  display: none;
}

.rotator__toggle-icon {
  width: 9px;
  height: 10px;
  border-left: 3px solid currentcolor;
  border-right: 3px solid currentcolor;
}

.rotator__toggle.is-paused .rotator__toggle-icon {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid currentcolor;
  border-right: 0;
}

/* ----- Hero chips ----- */

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-md);
  margin-top: var(--space-xl);
}

.hero-chips__item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px 10px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 600;
  transition: border-color 0.2s, transform 0.2s;
}

.hero-chips__item:hover,
.hero-chips__item:focus-visible {
  border-color: rgba(96, 165, 250, 0.5);
  transform: translateY(-2px);
}

.hero-chips__icon {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-chips__icon--teal {
  background: rgba(6, 182, 212, 0.15);
  color: var(--teal);
}

.hero-chips__icon--blue {
  background: rgba(59, 130, 246, 0.15);
  color: var(--accent-light);
}

.hero-chips__icon--gold {
  background: rgba(245, 158, 11, 0.15);
  color: var(--gold);
}

.hero-chips__arrow {
  color: var(--accent-light);
  transition: transform 0.2s;
}

.hero-chips__item:hover .hero-chips__arrow,
.hero-chips__item:focus-visible .hero-chips__arrow {
  transform: translateX(3px);
}
```

En el bloque final `@media (prefers-reduced-motion: reduce) { … }` de `css/styles.css`, reemplazar:

```css
  .hero__scroll-indicator svg {
    animation: none;
  }
}
```

por:

```css
  .hero__scroll-indicator svg {
    animation: none;
  }

  .rotator__item,
  .hero-chips__item,
  .hero-chips__arrow {
    transition: none;
  }

  .hero-chips__item:hover,
  .hero-chips__item:focus-visible,
  .hero-chips__item:hover .hero-chips__arrow,
  .hero-chips__item:focus-visible .hero-chips__arrow {
    transform: none;
  }
}
```

- [ ] **Step 5: Conectar el rotador en `main.js`**

En `js/main.js`, reemplazar:

```js
  // --- Public API ---
```

por:

```js
  // --- Hero Rotator ---

  function initHeroRotator() {
    var rotator = $('.rotator');
    if (!rotator || typeof HeroRotator === 'undefined') return;

    HeroRotator.create({
      items: $$('.rotator__item', rotator),
      toggle: $('.rotator__toggle'),
      toggleText: $('.rotator__toggle-text'),
      hoverTarget: $('.hero__title'),
      doc: document,
      reducedMotion: state.prefersReducedMotion
    });
  }

  // --- Public API ---
```

y reemplazar:

```js
      initActiveNav();
      initBlogFeed();
```

por:

```js
      initActiveNav();
      initHeroRotator();
      initBlogFeed();
```

- [ ] **Step 6: Verificar**

Run: `npm test`
Expected: `0 failed` (incluye compliance, a11y, links, js-selectors, css-usage y rotador). Además `node --check js/main.js`.

- [ ] **Step 7: Commit**

```bash
git add index.html css/styles.css js/main.js tests/test-accessibility.js tests/test-css-usage.js tests/test-rotator.js
git commit -m "feat(hero): frase rotativa accesible con pausa y fichas de acceso"
```

---

### Task 3: Secciones en bloques (Qué hago, Herramientas, Mentoría, Docencia, Escritos)

**Files:**
- Modify: `index.html` (desde `  <!-- QUE HAGO -->` hasta `</main>`)
- Modify: `css/styles.css` (bloque de encabezados, bloque de componentes desde Pillars hasta Footer, sección RESPONSIVE)

**Interfaces:**
- Consumes: clases e id del hero (Task 2); `#reconocimientos` pasa del `<h3>` a la banda `div.recognitions`.
- Produces: clases `pillars__verb`, `tool-card--blue|teal|gold`, `pills`, `pill`, `pill--status`, `notice--inline`, `recognitions*`, `section__more`, `callout`, `callout--stacked`, `callout__body`, `callout__title`, `callout__actions`, `teaching`, `block-heading`, `topics__icon*`, `events`, `event*`, `writings`, `blog__fallback-title`, `publication*`. Se eliminan `entries*`, `section__subtitle`, `section__actions`.

- [ ] **Step 1: Reemplazar las secciones en `index.html`**

Reemplazar todo desde la línea `  <!-- QUE HAGO -->` hasta la línea `</main>` (inclusive) por:

```html
  <!-- QUE HAGO -->
  <section id="que-hago" class="section--alt">
    <div class="container">
      <span class="section__label section__label--center" data-animate>Qu&eacute; hago</span>
      <h2 class="section__title section__title--center" data-animate>Ense&ntilde;ar, construir y escribir</h2>
      <p class="section__description section__description--center" data-animate>
        Tres actividades con un mismo prop&oacute;sito: que m&aacute;s personas del sector justicia entiendan la automatizaci&oacute;n y la usen con criterio.
      </p>

      <ul class="pillars" role="list" data-animate data-stagger>
        <li class="pillars__card">
          <span class="pillars__verb">Ense&ntilde;o</span>
          <div class="pillars__icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <h3 class="pillars__title">Ense&ntilde;o</h3>
          <p class="pillars__desc">Doy clases invitadas, talleres y conferencias sobre inform&aacute;tica jur&iacute;dica, automatizaci&oacute;n de tr&aacute;mites y gobernanza de IA en la justicia.</p>
        </li>

        <li class="pillars__card">
          <span class="pillars__verb">Construyo</span>
          <div class="pillars__icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <h3 class="pillars__title">Construyo software libre</h3>
          <p class="pillars__desc">Publico herramientas con licencia MIT para tareas repetitivas del trabajo judicial. Puedes leer el c&oacute;digo, usarlo y mejorarlo.</p>
        </li>

        <li class="pillars__card">
          <span class="pillars__verb">Escribo</span>
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
      <span class="section__label section__label--center" data-animate>C&oacute;digo abierto</span>
      <h2 class="section__title section__title--center" data-animate>Herramientas libres</h2>
      <p class="section__description section__description--center" data-animate>
        Software gratuito con licencia MIT. Cada herramienta tiene su repositorio p&uacute;blico y su documentaci&oacute;n.
      </p>

      <div class="tool-grid" data-animate data-stagger>
        <article class="tool-card tool-card--blue" aria-labelledby="tool-agilex">
          <img class="tool-card__logo" src="src/Agilex-logo.png" alt="Logo de AgilEx" width="48" height="48" loading="lazy">
          <h3 class="tool-card__title" id="tool-agilex">AgilEx</h3>
          <ul class="pills" role="list">
            <li class="pill pill--status">C&oacute;digo abierto</li>
            <li class="pill">MIT</li>
            <li class="pill">v1.5.1</li>
            <li class="pill">Desde 2022</li>
          </ul>
          <p class="tool-card__desc">Automatiza la creaci&oacute;n y el diligenciamiento del &iacute;ndice electr&oacute;nico de un expediente a partir de los archivos de una carpeta, seg&uacute;n el protocolo de expediente electr&oacute;nico del Acuerdo PCSJA20-11567 de 2020.</p>
          <p class="tool-card__meta">Licencia MIT &middot; Versi&oacute;n 1.5.1 (abril de 2026) &middot; Primera versi&oacute;n publicada: octubre de 2022</p>
          <div class="tool-card__actions">
            <a href="https://github.com/HammerDev99/GestionExpedienteElectronico_Version1" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Repositorio de AgilEx en GitHub">Repositorio &rarr;</a>
            <a href="https://docs.agilex.sprintjudicial.com/" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Documentaci&oacute;n de AgilEx">Documentaci&oacute;n &rarr;</a>
          </div>
        </article>

        <article class="tool-card tool-card--teal" aria-labelledby="tool-tybabot">
          <div class="tool-card__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <h3 class="tool-card__title" id="tool-tybabot">TYBABot</h3>
          <ul class="pills" role="list">
            <li class="pill pill--status">Demo p&uacute;blica</li>
            <li class="pill">MIT</li>
          </ul>
          <p class="tool-card__desc">Asistente conversacional que orienta sobre el uso de Justicia XXI Web (TYBA): documentos electr&oacute;nicos, actuaciones, memoriales, notificaciones y firmas.</p>
          <p class="tool-card__meta">Licencia MIT &middot; Demo p&uacute;blica</p>
          <div class="tool-card__actions">
            <a href="https://github.com/HammerDev99/TYBABot" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Repositorio de TYBABot en GitHub">Repositorio &rarr;</a>
            <a href="https://tybabot.streamlit.app" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Probar la demo de TYBABot">Probar la demo &rarr;</a>
          </div>
        </article>

        <article class="tool-card tool-card--gold" aria-labelledby="tool-disciplina">
          <div class="tool-card__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 class="tool-card__title" id="tool-disciplina">DisciplinaJudicialAI</h3>
          <ul class="pills" role="list">
            <li class="pill pill--status">Demo p&uacute;blica</li>
            <li class="pill">MIT</li>
          </ul>
          <p class="tool-card__desc">Orientador normativo sobre el r&eacute;gimen disciplinario de los servidores judiciales: etapas del proceso, faltas, sanciones y derechos del investigado. No reemplaza la asesor&iacute;a de un abogado.</p>
          <p class="tool-card__meta">Licencia MIT &middot; Demo p&uacute;blica</p>
          <div class="tool-card__actions">
            <a href="https://github.com/HammerDev99/disciplinajudicialai" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Repositorio de DisciplinaJudicialAI en GitHub">Repositorio &rarr;</a>
            <a href="https://disciplinajudicialai.streamlit.app/" class="tool-card__link" target="_blank" rel="noopener noreferrer" aria-label="Probar la demo de DisciplinaJudicialAI">Probar la demo &rarr;</a>
          </div>
        </article>
      </div>

      <p class="notice" data-animate>Las demos usan servicios de IA de terceros. No ingreses datos personales ni informaci&oacute;n de procesos reales.</p>

      <div id="reconocimientos" class="recognitions" data-animate>
        <h3 class="recognitions__title">Reconocimientos</h3>
        <ul class="recognitions__grid" role="list">
          <li class="recognitions__card">
            <span class="recognitions__icon recognitions__icon--gold" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </span>
            <p class="recognitions__name"><strong>Ganador JusticIALab 2024 (equipo Marduk)</strong></p>
            <p class="recognitions__desc">Categor&iacute;a Justicia Basada en Datos, Primer Concurso de Innovaci&oacute;n de la Rama Judicial.</p>
            <a href="https://www.ramajudicial.gov.co/web/consejo-superior-de-la-judicatura/-/construimos-la-justicia-del-futuro-con-el-primer-concurso-de-innovaci%C3%B3n-de-la-rama-judicial" class="recognitions__link" target="_blank" rel="noopener noreferrer">Ver la fuente &rarr;</a>
          </li>
          <li class="recognitions__card">
            <span class="recognitions__icon recognitions__icon--teal" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
            </span>
            <p class="recognitions__name">Mapa de Innovaci&oacute;n Legal en Colombia</p>
            <p class="recognitions__desc">Incluido en el Mapa de Innovaci&oacute;n Legal en Colombia (Legal Hackers Medell&iacute;n y ALTCO, 2023), categor&iacute;a Automatizaci&oacute;n documental y de procesos.</p>
          </li>
        </ul>
      </div>

      <p class="section__more" data-animate>
        <a href="https://github.com/HammerDev99" class="section__link" target="_blank" rel="noopener noreferrer">M&aacute;s proyectos en GitHub &rarr;</a>
      </p>
    </div>
  </section>

  <!-- MENTORIA ABIERTA -->
  <section id="mentoria" class="section--alt">
    <div class="container">
      <span class="section__label section__label--center" data-animate>Mentor&iacute;a abierta</span>
      <h2 class="section__title section__title--center" data-animate>Aprende a automatizar con herramientas libres</h2>
      <p class="section__description section__description--center" data-animate>
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

      <div class="callout" data-animate>
        <div class="callout__body">
          <h3 class="callout__title">Grupo comunitario de innovaci&oacute;n legal</h3>
          <p class="notice notice--inline">Es un grupo comunitario, no un canal oficial de la Rama Judicial. Al unirte, los dem&aacute;s miembros pueden ver tu n&uacute;mero. La mentor&iacute;a no tiene costo.</p>
        </div>
        <div class="callout__actions">
          <a href="https://chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Unirme al grupo de WhatsApp &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- DOCENCIA Y CONFERENCIAS -->
  <section id="docencia">
    <div class="container">
      <span class="section__label section__label--center" data-animate>Docencia y conferencias</span>
      <h2 class="section__title section__title--center" data-animate>Inv&iacute;tame a tu clase o evento acad&eacute;mico</h2>
      <p class="section__description section__description--center" data-animate>
        Participo como docente invitado o conferencista en universidades, escuelas judiciales y eventos acad&eacute;micos.
      </p>

      <div class="teaching">
        <div>
          <h3 class="block-heading" data-animate>Temas</h3>
          <ul class="topics" role="list" data-animate data-stagger>
            <li class="topics__item">
              <span class="topics__icon topics__icon--blue" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
              <div>
                <h4 class="topics__title">Inform&aacute;tica jur&iacute;dica</h4>
                <p class="topics__desc">C&oacute;mo funcionan los sistemas de informaci&oacute;n judicial y qu&eacute; cambia con el expediente electr&oacute;nico.</p>
              </div>
            </li>
            <li class="topics__item">
              <span class="topics__icon topics__icon--teal" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>
              <div>
                <h4 class="topics__title">Automatizaci&oacute;n de tr&aacute;mites judiciales</h4>
                <p class="topics__desc">C&oacute;mo identificar tareas repetitivas y automatizarlas sin perder controles: entrevistas guiadas, plantillas y robots de escritorio.</p>
              </div>
            </li>
            <li class="topics__item">
              <span class="topics__icon topics__icon--gold" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></span>
              <div>
                <h4 class="topics__title">Gobernanza de IA en la justicia</h4>
                <p class="topics__desc">Uso responsable de la IA en el trabajo judicial con el Acuerdo PCSJA24-12243 de 2024 como marco: criterio propio, verificaci&oacute;n, protecci&oacute;n de datos y transparencia.</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="block-heading" data-animate>Charlas y talleres recientes</h3>
          <ul class="events" role="list" data-animate data-stagger>
            <li class="event">
              <span class="event__badge">2026 &middot; Medell&iacute;n</span>
              <h4 class="event__title">Taller pr&aacute;ctico</h4>
              <p class="event__desc">&laquo;IA para el trabajo judicial: menos carga operativa, mayor capacidad de control&raquo;. Servidores judiciales.</p>
            </li>
            <li class="event">
              <span class="event__badge">18 oct 2024 &middot; Medell&iacute;n</span>
              <h4 class="event__title">Conferencia</h4>
              <p class="event__desc">&laquo;Casos de estudio nacionales: experiencias de Colombia en la incorporaci&oacute;n de IA en la justicia&raquo;. Jornada Acad&eacute;mica sobre Inteligencia Artificial y su Impacto en la Justicia.</p>
              <a href="https://www.asojudiciales.org/wp-content/uploads/2024/10/PROGRAMACION-JORNADA-ACADEMICA-SOBRE-IA-MEDELLIN-18-OCT-2024-1.pdf" class="event__link" target="_blank" rel="noopener noreferrer">Ver el programa &rarr;</a>
            </li>
          </ul>

          <div class="callout callout--stacked" data-animate>
            <h3 class="callout__title">&iquest;Organizas una clase o evento acad&eacute;mico?</h3>
            <div class="callout__actions">
              <a href="mailto:contacto@sprintjudicial.com?subject=Invitaci%C3%B3n%20acad%C3%A9mica" class="btn btn--primary" aria-label="Invitarme por correo electr&oacute;nico">Invitarme &rarr;</a>
              <a href="https://www.linkedin.com/in/daniel-arbelaez-" class="btn btn--outline" target="_blank" rel="noopener noreferrer">Escribirme por LinkedIn</a>
            </div>
            <p class="notice notice--inline">Las actividades docentes se realizan por fuera de mi jornada laboral y conforme al r&eacute;gimen aplicable a los servidores judiciales.</p>
            <a href="https://portfolio.sprintjudicial.com/" class="section__link" target="_blank" rel="noopener noreferrer">Trayectoria acad&eacute;mica y profesional &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ESCRITOS -->
  <section id="escritos" class="blog section--alt">
    <div class="container">
      <span class="section__label section__label--center" data-animate>Escritos</span>
      <h2 class="section__title section__title--center" data-animate>Lo que publico</h2>

      <div class="writings">
        <div>
          <h3 class="block-heading" data-animate>Blog</h3>
          <div class="blog__grid" id="blog-feed" data-animate data-stagger>
            <!-- JS populates this from RSS -->
          </div>

          <div class="blog__fallback" id="blog-fallback">
            <p class="blog__fallback-title">Visita el blog</p>
            <a href="https://blog.sprintjudicial.com" class="btn btn--outline" target="_blank" rel="noopener noreferrer">Visitar el blog &rarr;</a>
          </div>
        </div>

        <div>
          <h3 class="block-heading" data-animate>Publicaciones acad&eacute;micas</h3>
          <article class="publication" data-animate>
            <span class="publication__badge">Art&iacute;culo acad&eacute;mico &middot; 2024</span>
            <p class="publication__cite">Arbel&aacute;ez &Aacute;lvarez, D. (2024). Entrevistas guiadas para la optimizaci&oacute;n de procesos judiciales: un enfoque desde el LegalTech. <cite>Cuaderno Activa</cite>, 16(1), 37&ndash;47.</p>
            <a href="https://ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858" class="btn btn--outline" target="_blank" rel="noopener noreferrer">Leer el art&iacute;culo &rarr;</a>
            <a href="https://scholar.google.com/citations?user=T5zXXTcAAAAJ" class="section__link" target="_blank" rel="noopener noreferrer">Perfil en Google Scholar &rarr;</a>
          </article>
        </div>
      </div>
    </div>
  </section>

</main>
```

- [ ] **Step 2: Encabezados — quitar `section__subtitle`/`section__actions` y agregar `section__more`**

Ejecutar desde la raíz (falla si no encuentra el marcador):

```bash
node -e "
const fs = require('fs');
const file = 'css/styles.css';
let css = fs.readFileSync(file, 'utf8');
const start = css.indexOf('.section__subtitle {');
const end = css.indexOf('.section__link {', start);
if (start < 0 || end < 0) { throw new Error('Marcadores de encabezados no encontrados'); }
css = css.slice(0, start) + '.section__more {\n  text-align: center;\n  margin-top: var(--space-xl);\n}\n\n' + css.slice(end);
fs.writeFileSync(file, css);
"
```

- [ ] **Step 3: Reemplazar los bloques de componentes**

Ejecutar desde la raíz para borrar desde `/* ----- Pillars (Qué hago) ----- */` hasta justo antes de `/* ----- Footer ----- */`:

```bash
node -e "
const fs = require('fs');
const file = 'css/styles.css';
let css = fs.readFileSync(file, 'utf8');
const start = css.indexOf('/* ----- Pillars (Qu');
const end = css.indexOf('/* ----- Footer ----- */', start);
if (start < 0 || end < 0) { throw new Error('Marcadores de componentes no encontrados'); }
fs.writeFileSync(file, css.slice(0, start) + '/* @@COMPONENTES@@ */\n\n' + css.slice(end));
"
```

Luego, en `css/styles.css`, reemplazar la línea `/* @@COMPONENTES@@ */` por:

```css
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.pillars__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.pillars__verb {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-light);
  margin-bottom: var(--space-md);
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
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
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

.tool-card--teal::before {
  background: linear-gradient(90deg, var(--teal), var(--green));
}

.tool-card--teal:hover {
  border-color: rgba(6, 182, 212, 0.3);
}

.tool-card--gold::before {
  background: linear-gradient(90deg, var(--gold), var(--accent));
}

.tool-card--gold:hover {
  border-color: rgba(245, 158, 11, 0.3);
}

.tool-card--blue::before {
  background: linear-gradient(90deg, var(--accent), var(--teal));
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
  background: rgba(59, 130, 246, 0.15);
}

.tool-card--teal .tool-card__icon {
  background: rgba(6, 182, 212, 0.15);
}

.tool-card--gold .tool-card__icon {
  background: rgba(245, 158, 11, 0.15);
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
  font-size: 0.78rem;
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
  transition: color 0.2s;
}

.tool-card__link:hover {
  color: var(--white);
}

/* ----- Pills ----- */

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: var(--space-md);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 600;
}

.pill--status {
  background: rgba(16, 185, 129, 0.1);
  color: var(--green);
}

.pill--status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentcolor;
}

/* ----- Notice ----- */

.notice {
  display: flex;
  gap: var(--space-sm);
  align-items: flex-start;
  max-width: 720px;
  margin: var(--space-lg) auto 0;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.notice::before {
  content: 'i';
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--gold);
  font-size: 0.7rem;
  font-style: italic;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notice--inline {
  max-width: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
}

/* ----- Recognitions ----- */

.recognitions {
  margin-top: var(--space-2xl);
  padding: var(--space-xl);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.recognitions__title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-light);
  text-align: center;
  margin-bottom: var(--space-lg);
}

.recognitions__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.recognitions__card {
  text-align: center;
  padding: var(--space-lg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  transition: transform 0.2s, box-shadow 0.2s;
}

.recognitions__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.recognitions__icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-md);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recognitions__icon--gold {
  background: rgba(245, 158, 11, 0.15);
  color: var(--gold);
}

.recognitions__icon--teal {
  background: rgba(6, 182, 212, 0.15);
  color: var(--teal);
}

.recognitions__name {
  color: var(--white);
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.recognitions__desc {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.recognitions__link {
  display: inline-block;
  margin-top: var(--space-sm);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-light);
  text-decoration: underline;
}

/* ----- Steps (Mentoría) ----- */

.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 16.66%;
  right: 16.66%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), rgba(59, 130, 246, 0.15));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  display: none;
}

.steps.reveal--visible::before {
  transform: scaleX(1);
}

.steps__item {
  text-align: center;
  padding: 0 var(--space-md);
}

.steps__number {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 auto var(--space-md);
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: var(--surface);
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--accent-light);
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

/* ----- Callout ----- */

.callout {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-2xl);
  padding: var(--space-xl);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(6, 182, 212, 0.05));
}

.callout__body {
  flex: 1;
}

.callout__title {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--white);
  margin-bottom: var(--space-sm);
}

.callout__actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

/* ----- Teaching (Docencia) ----- */

.teaching {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
}

.block-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--white);
  margin-bottom: var(--space-lg);
}

.block-heading::before {
  content: '';
  width: 24px;
  height: 2px;
  background: var(--accent-light);
}

.topics {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

.topics__item {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
  padding: var(--space-lg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  transition: transform 0.2s, box-shadow 0.2s;
}

.topics__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.topics__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.topics__icon--blue {
  background: rgba(59, 130, 246, 0.15);
  color: var(--accent-light);
}

.topics__icon--teal {
  background: rgba(6, 182, 212, 0.15);
  color: var(--teal);
}

.topics__icon--gold {
  background: rgba(245, 158, 11, 0.15);
  color: var(--gold);
}

.topics__title {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.topics__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.events {
  display: grid;
  gap: var(--space-md);
}

.event {
  padding: var(--space-lg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  transition: transform 0.2s, box-shadow 0.2s;
}

.event:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.event__badge {
  display: inline-block;
  margin-bottom: var(--space-sm);
  padding: 3px 12px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: var(--radius-full);
  background: rgba(59, 130, 246, 0.12);
  color: var(--accent-light);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.event__title {
  font-family: var(--font-body);
  font-size: 1rem;
  margin-bottom: var(--space-xs);
}

.event__desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.event__link {
  display: inline-block;
  margin-top: var(--space-sm);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-light);
  text-decoration: underline;
}

/* ----- Writings (Escritos) ----- */

.writings {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  margin-top: var(--space-xl);
}

.blog {
  padding: var(--space-4xl) 0;
}

.blog__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

.blog__card {
  background: var(--deep);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  text-decoration: none;
  color: inherit;
}

.blog__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.blog__card-date {
  font-size: 0.78rem;
  color: var(--accent-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog__card-title {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1.4;
}

.blog__card-excerpt {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog__card-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-light);
  margin-top: auto;
  transition: color 0.2s;
}

.blog__card:hover .blog__card-link {
  color: var(--white);
}

.blog__fallback {
  padding: var(--space-xl);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--deep);
}

.blog__fallback-title {
  color: var(--white);
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.publication {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-xl);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--deep);
}

.publication__badge {
  padding: 3px 12px;
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-full);
  background: rgba(245, 158, 11, 0.12);
  color: var(--gold);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.publication__cite {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.publication__cite cite {
  color: var(--text);
}

/* Hover sobre .reveal--stagger: animations.css fija transform con especificidad (0,3,0) */
.reveal--stagger.reveal--visible > .pillars__card:hover,
.reveal--stagger.reveal--visible > .tool-card:hover,
.reveal--stagger.reveal--visible > .topics__item:hover,
.reveal--stagger.reveal--visible > .event:hover,
.reveal--stagger.reveal--visible > .blog__card:hover {
  transform: translateY(-4px);
}
```

- [ ] **Step 4: Reemplazar la sección RESPONSIVE**

Truncar el archivo antes de la sección RESPONSIVE:

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

Agregar al final de `css/styles.css`:

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
    gap: 20px;
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

  .recognitions__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps {
    grid-template-columns: repeat(3, 1fr);
  }

  .steps::before {
    display: block;
  }

  .callout {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .callout--stacked {
    flex-direction: column;
    align-items: stretch;
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
  .tool-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .teaching {
    grid-template-columns: 1.2fr 1fr;
  }

  .writings {
    grid-template-columns: 2fr 1fr;
  }

  .navbar__links {
    gap: 28px;
  }
}

/* --- Reduced motion --- */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .hero__scroll-indicator svg {
    animation: none;
  }

  .rotator__item,
  .hero-chips__item,
  .hero-chips__arrow,
  .steps::before {
    transition: none;
  }

  .hero-chips__item:hover,
  .hero-chips__item:focus-visible,
  .hero-chips__item:hover .hero-chips__arrow,
  .hero-chips__item:focus-visible .hero-chips__arrow,
  .pillars__card:hover,
  .tool-card:hover,
  .topics__item:hover,
  .event:hover,
  .blog__card:hover,
  .recognitions__card:hover,
  .reveal--stagger.reveal--visible > .pillars__card:hover,
  .reveal--stagger.reveal--visible > .tool-card:hover,
  .reveal--stagger.reveal--visible > .topics__item:hover,
  .reveal--stagger.reveal--visible > .event:hover,
  .reveal--stagger.reveal--visible > .blog__card:hover {
    transform: none;
  }
}
```

- [ ] **Step 5: Verificar**

Run: `npm test && grep -nE "entries|section__subtitle|section__actions" css/styles.css index.html`
Expected: `0 failed`; `grep` sin coincidencias (código de salida 1). Si `test-css-usage` lista clases sin uso o `test-js-selectors` falla, corregir el HTML o el CSS de este task (no los tests).

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat(landing): secciones en bloques con tarjetas, banda de reconocimientos y columnas"
```

---

### Task 4: Verificación visual, linters y cierre de specs

**Files:**
- Modify: `docs/specs/SPEC-004-reposicionamiento-academico.md` (encabezado)
- Modify: `docs/specs/SPEC-005-estructura-visual.md` (estado y checkboxes)

**Interfaces:**
- Consumes: todo lo anterior.

- [ ] **Step 1: Suite completa**

Run: `npm test` → `0 failed`, código de salida 0.

- [ ] **Step 2: Linters contra la línea base `709c45e`**

```bash
npm install --no-package-lock
mkdir -p dist/baseline/css
git show 709c45e:index.html > dist/baseline/index.html
git show 709c45e:css/styles.css > dist/baseline/css/styles.css
git show 709c45e:js/main.js > dist/baseline/main.js
npx html-validate dist/baseline/index.html > dist/baseline/html.txt 2>&1
npx html-validate index.html > dist/html.txt 2>&1
npx stylelint dist/baseline/css/styles.css > dist/baseline/css.txt 2>&1
npx stylelint "css/**/*.css" > dist/css.txt 2>&1
npx eslint --stdin --stdin-filename js/main.js < dist/baseline/main.js > dist/baseline/js.txt 2>&1
npx eslint js/ > dist/js.txt 2>&1
rules() { grep -E '^\s+[0-9]+:[0-9]+' "$1" | awk '{print $NF}' | sort -u; }
for t in html css js; do echo "== Reglas nuevas en $t:"; comm -13 <(rules dist/baseline/$t.txt) <(rules dist/$t.txt); done
rm -rf dist
```

Expected: las tres listas vacías. Si aparece una regla nueva, corregir el código que la dispara.

- [ ] **Step 3: Revisión visual (controlador o autor, en Chrome)**

`python -m http.server 8000` y abrir `http://localhost:8000`. Verificar a 320, 768, 1024 y 1280 px:
- [ ] Sin scroll horizontal.
- [ ] La frase del hero rota cada 3,5 s; el alto del `<h1>` no cambia entre frases (medir `document.querySelector('.hero__title').offsetHeight` en cada frase).
- [ ] "Pausar animación" detiene la rotación y cambia a "Reanudar animación"; con DevTools → Rendering → `prefers-reduced-motion: reduce` no rota y el botón no aparece.
- [ ] Las fichas del hero llevan a Herramientas, Mentoría y la banda de Reconocimientos.
- [ ] Tarjetas (Qué hago, Herramientas, Temas, Charlas, Reconocimientos) suben al pasar el puntero.
- [ ] La línea de los pasos de Mentoría se dibuja al entrar en pantalla (≥768 px).
- [ ] Docencia y Escritos en dos columnas desde 1024 px y apiladas debajo.
- [ ] Bloqueando `blog.sprintjudicial.com`, se ve la tarjeta "Visita el blog".

- [ ] **Step 4: Cerrar specs**

En `docs/specs/SPEC-004-reposicionamiento-academico.md`, debajo de la línea `> Estado: ✅ Implementada …`, agregar la línea:

```markdown
> Presentación modificada por SPEC-005 (estructura visual y rotador); el contenido y las restricciones de esta spec siguen vigentes.
```

En `docs/specs/SPEC-005-estructura-visual.md`, cambiar el estado a `> Estado: ✅ Implementada (AAAA-MM-DD)` con la fecha del día y marcar `[x]` los requisitos verificados en los pasos 1–3.

- [ ] **Step 5: Commit**

```bash
git add docs/specs/SPEC-004-reposicionamiento-academico.md docs/specs/SPEC-005-estructura-visual.md
git commit -m "docs(specs): cerrar SPEC-005 y anotar la modificación en SPEC-004"
```
