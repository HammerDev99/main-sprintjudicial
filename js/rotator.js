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
