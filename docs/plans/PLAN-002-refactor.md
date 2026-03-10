# PLAN-002: Refactoring y Arquitectura

> Fecha: 2026-03-10
> Estado: En progreso
> Spec asociada: SPEC-001-landing-v2
> Ejecutor: Agente de Arquitectura (worktree aislado)
> Skills utilizados: `.claude/skills/refactoring/`, `.claude/skills/design-patterns/`

---

## Objetivo

Refactorizar el proyecto de single-file HTML a una arquitectura mantenible y escalable,
aplicando técnicas de refactoring y patrones de diseño apropiados para frontend puro.

## Code Smells Identificados (del skill refactoring)

| Smell | Ubicación | Técnica de refactoring |
|-------|-----------|----------------------|
| **Large Class** (God file) | index.html (490 líneas con HTML+CSS+JS) | Extract Class → separar en archivos |
| **Long Method** | Bloque `<style>` (~310 líneas de CSS inline) | Extract Method → css/styles.css |
| **Data Clumps** | CSS custom properties repetidas | Introduce Parameter Object → design tokens |
| **Divergent Change** | Un solo archivo cambia por razones de estilo, estructura y comportamiento | Extract Class → separar concerns |
| **Speculative Generality** | (No detectado — el código actual es mínimo) | N/A |

## Patrones de Diseño Aplicables (del skill design-patterns)

| Patrón | Aplicación en Frontend | Componente |
|--------|----------------------|------------|
| **Observer** | Intersection Observer para scroll animations | js/main.js |
| **Module** | IIFE o módulos para encapsular funcionalidad | js/main.js |
| **Strategy** | Diferentes tipos de animaciones según elemento | js/main.js |
| **Singleton** | Estado de la app (mobile menu, active section) | js/main.js |
| **Facade** | API simplificada para animaciones y UI | js/main.js |

## Tareas de Refactoring

### P0 — Separación de archivos

| # | Tarea | Estado |
|---|-------|--------|
| R1 | Extraer CSS a `css/styles.css` | 🔄 En progreso |
| R2 | Extraer animaciones a `css/animations.css` | 🔄 En progreso |
| R3 | Crear `js/main.js` con lógica de UI | 🔄 En progreso |
| R4 | Crear `js/analytics.js` (placeholder) | 🔄 En progreso |
| R5 | Limpiar index.html (solo HTML semántico) | 🔄 En progreso |

### P1 — Mejora de estructura

| # | Tarea | Estado |
|---|-------|--------|
| R6 | Aplicar BEM naming convention a todas las clases CSS | ⬜ Pendiente |
| R7 | Organizar CSS con ITCSS (Settings → Tools → Generic → Elements → Objects → Components → Utilities) | ⬜ Pendiente |
| R8 | Agregar HTML semántico (main, article, header, nav) | ⬜ Pendiente |
| R9 | Agregar roles ARIA donde corresponda | ⬜ Pendiente |

### P2 — Archivos de soporte

| # | Tarea | Estado |
|---|-------|--------|
| R10 | Crear robots.txt | 🔄 En progreso |
| R11 | Crear sitemap.xml | 🔄 En progreso |
| R12 | Crear .htaccess con headers de seguridad | 🔄 En progreso |

---

## JavaScript: Estructura Modular Objetivo

```javascript
// js/main.js — Module Pattern

const SprintJudicial = (() => {
  // === State (Singleton) ===
  const state = { menuOpen: false, activeSection: 'hero' };

  // === Scroll Animations (Observer Pattern) ===
  function initScrollAnimations() { /* IntersectionObserver */ }

  // === Mobile Menu (State Pattern) ===
  function initMobileMenu() { /* toggle, close on click outside */ }

  // === Counter Animation (Strategy Pattern) ===
  function initCounters() { /* animate numbers on viewport entry */ }

  // === Navbar Scroll (Observer) ===
  function initNavbarScroll() { /* change bg on scroll */ }

  // === Smooth Scroll ===
  function initSmoothScroll() { /* anchor links */ }

  // === Public API (Facade) ===
  return {
    init() {
      initScrollAnimations();
      initMobileMenu();
      initCounters();
      initNavbarScroll();
      initSmoothScroll();
    }
  };
})();

document.addEventListener('DOMContentLoaded', SprintJudicial.init);
```

## Métricas de Verificación Post-Refactor

- [ ] La página se ve idéntica visualmente (comparación screenshot)
- [ ] 0 errores en consola del navegador
- [ ] Todos los links internos funcionan
- [ ] Mobile menu funciona correctamente
- [ ] Lighthouse Performance ≥ 90
- [ ] W3C HTML Validator: 0 errores
- [ ] CSS separado carga correctamente
- [ ] JS separado ejecuta correctamente
