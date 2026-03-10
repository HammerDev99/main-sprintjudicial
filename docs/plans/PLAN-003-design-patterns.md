# PLAN-003: Design Patterns y Mejores Prácticas

> Fecha: 2026-03-10
> Estado: Completado (Fases 0-7 implementadas)
> Spec asociada: SPEC-001-landing-v2
> Ejecutor: Agente Design Patterns
> Skills utilizados: `.claude/skills/design-patterns/`, `.claude/skills/refactoring/`

---

## Diagnóstico del Estado Actual

El proyecto es un **single-file HTML de 491 líneas** con CSS inline (317 líneas) y **cero JavaScript**.

### Defectos concretos encontrados

| # | Defecto | Línea | Impacto |
|---|---------|-------|---------|
| 1 | Dice "5 Herramientas" pero contexto habla de 6 | L347 | Inconsistencia de contenido |
| 2 | Nav links se ocultan en mobile sin hamburger menu | L312 | Sitio no navegable en móvil |
| 3 | Estilos inline rompen separación de concerns | L404, 406, 439, 452 | Mantenibilidad |
| 4 | Falta `preconnect` a `fonts.gstatic.com` con crossorigin | L7 | Performance |
| 5 | Cero JavaScript: no hay interactividad | — | UX pobre |
| 6 | Cero atributos ARIA | — | Accesibilidad nula |
| 7 | Colores de cards dependen de `nth-child` (frágil) | L209-213 | Mantenibilidad |
| 8 | Copyright dice 2025 | L486 | Contenido desactualizado |

---

## FASE 0: Reestructuración de Archivos (P0 — Prerequisito)

| # | Tarea | Estado |
|---|-------|--------|
| 0.1 | Extraer CSS a `css/styles.css` + `css/animations.css` | ✅ |
| 0.2 | Crear estructura: `css/`, `js/`, `assets/` | ✅ |
| 0.3 | Eliminar todos los estilos inline | ✅ |

---

## FASE 1: CSS Architecture Patterns (P0)

### 1.1 Design Tokens — 3 Capas
```
Capa 1: Primitivos (valores raw: --color-blue-900, --space-4)
Capa 2: Semánticos (intenciones: --bg-primary, --text-accent, --cta-bg)
Capa 3: Componente (específicos: --card-padding, --nav-height)
```

### 1.2 BEM Naming Refactor

| Actual | BEM |
|--------|-----|
| `.service-card h3` | `.service-card__title` |
| `.service-card p` | `.service-card__description` |
| `.service-tag` | `.service-card__tag` |
| `.service-icon` | `.service-card__icon` |
| `.nav-links` | `.navbar__links` |
| `.nav-cta` | `.navbar__cta` |
| `.hero-badge` | `.hero__badge` |
| `.hero-sub` | `.hero__subtitle` |
| `.hero-buttons` | `.hero__actions` |
| `.stat-number` | `.stat__value` |
| `.stat-label` | `.stat__label` |
| `.cred-item` | `.credential__item` |
| `.about-name` | `.about-card__name` |
| `.btn-primary` | `.btn--primary` |
| `.btn-outline` | `.btn--outline` |

### 1.3 ITCSS Organization
```
1. Settings   → tokens.css (variables, sin output CSS)
2. Generic    → base.css (reset, box-sizing)
3. Elements   → base.css (h1-h6, a, p, body)
4. Objects    → objects.css (.container, .grid)
5. Components → components.css (.btn, .service-card, .navbar)
6. Utilities  → utilities.css (.sr-only, .text-center)
```

### 1.4 Reemplazar nth-child por data-attributes
```html
<article class="service-card" data-color-scheme="blue">
```
```css
.service-card[data-color-scheme="blue"]::before {
  background: linear-gradient(90deg, var(--accent), var(--teal));
}
```

---

## FASE 2: JavaScript Design Patterns (P0)

### 2.1 Singleton — App State Manager
```javascript
const AppState = (() => {
  const state = {
    isMobileMenuOpen: false,
    activeSection: 'hero',
    isNavScrolled: false,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };
  // subscribe/notify pattern para desacoplamiento
  return { get, set, subscribe, notify };
})();
```

### 2.2 Observer — Scroll Animations (IntersectionObserver)
```javascript
const ScrollAnimator = (() => {
  function init() {
    if (state.get('prefersReducedMotion')) return; // Respeta accesibilidad
    const observer = new IntersectionObserver(callback, { threshold: 0.15 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }
  return { init };
})();
```

### 2.3 Strategy — Animation Strategies
```javascript
const strategies = {
  'fade-up': (el) => { /* translateY + opacity */ },
  'fade-in': (el) => { /* opacity only */ },
  'stagger': (el) => { /* children con delay incremental */ },
  'counter': (el) => { /* animación numérica */ }
};
```

### 2.4 Module — Navbar Controller
- Hamburger menu toggle con aria-expanded
- Scroll-aware background (opacity change)
- Active section tracking via IntersectionObserver
- ESC para cerrar, focus trap en menú abierto

### 2.5 Entry Point
```javascript
document.addEventListener('DOMContentLoaded', () => {
  NavbarController.init();
  ScrollAnimator.init();
});
```

---

## FASE 3: Accessibility Patterns (P0)

| # | Tarea | Estado |
|---|-------|--------|
| 3.1 | ARIA en navbar (aria-label, aria-expanded, aria-controls, role) | ✅ |
| 3.2 | Skip-to-content link como primer hijo de body | ✅ |
| 3.3 | ARIA en service cards (article, aria-labelledby, aria-hidden en emojis) | ✅ |
| 3.4 | Credenciales como `<ul role="list">` semántica | ✅ |
| 3.5 | Auditoría de contraste (text-muted sobre surface: 5.4:1 AA) | ✅ |
| 3.6 | Focus management (:focus-visible, focus trap en mobile menu) | ✅ |

---

## FASE 4: Performance Patterns (P1)

| # | Tarea | Estado |
|---|-------|--------|
| 4.1 | Critical CSS inline (nav + hero) + deferred load del resto | ⬜ (futuro) |
| 4.2 | Google Fonts: agregar crossorigin en segundo preconnect | ✅ |
| 4.3 | Image optimization prep (lazy, width/height, WebP, aspect-ratio) | ⬜ (sin imágenes aún) |
| 4.4 | Script loading: `<script src="js/main.js" defer>` | ✅ |
| 4.5 | Service Worker (P2, futuro) | ⬜ |

---

## FASE 5: UX Patterns LegalTech B2B (P1)

| # | Tarea | Estado |
|---|-------|--------|
| 5.1 | Hero: visual decorativo eliminado (redundante con trust bar) | ✅ (descartado) |
| 5.2 | Trust bar post-hero | ✅ |
| 5.3 | CTA intermedio entre credenciales y sobre mí | ✅ |
| 5.4 | SVGs reales en credenciales (reemplazaron emojis) | ✅ |
| 5.5 | Stats strip (integrado en hero como counters animados) | ✅ |
| 5.6 | Featured card: primera tarjeta span 2 cols en desktop | ✅ |

---

## FASE 6: Scalability Patterns (P1)

| # | Tarea | Estado |
|---|-------|--------|
| 6.1 | data-attributes para color schemes en cards (`data-color`) | ✅ |
| 6.2 | Config pattern: `js/config.js` con datos centralizados | ⬜ (futuro) |
| 6.3 | Template pattern: `<template>` nativo para cards repetitivas | ⬜ (futuro) |
| 6.4 | Preparar multi-página (CSS modular compartido) | ⬜ (Fase 3) |

---

## FASE 7: Mejoras Adicionales (P2)

| # | Tarea | Estado |
|---|-------|--------|
| 7.1 | Schema.org JSON-LD (ProfessionalService) | ✅ |
| 7.2 | Open Graph + Twitter Card meta tags | ✅ |
| 7.3 | Dark/Light theme prep (custom properties ya lo soportan) | ⬜ (futuro) |

---

## Grafo de Dependencias

```
FASE 0 (P0) ──→ FASE 1 (P0) ──→ FASE 3 (P0)
     │                │                │
     └──→ FASE 2 (P0) ┘               │
               │                       │
               └──→ FASE 4 (P1) ←──────┘
               │
               └──→ FASE 5 (P1) [parcialmente independiente]
               │
               └──→ FASE 6 (P1)
                        │
                        └──→ FASE 7 (P2)
```
