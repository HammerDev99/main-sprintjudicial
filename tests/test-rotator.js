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
