# Convenciones de Código — Sprint Judicial

## HTML

### Estructura semántica
```html
<header>     <!-- Navbar -->
<main>       <!-- Contenido principal -->
  <section>  <!-- Cada sección temática -->
  <article>  <!-- Contenido independiente (cards, posts) -->
<footer>     <!-- Pie de página -->
```

### Atributos obligatorios
- `lang="es"` en `<html>`
- `alt` en todas las `<img>` (descriptivo, no "imagen de...")
- `aria-label` en botones/links con solo iconos
- `role` solo cuando el HTML semántico no es suficiente
- `id` en secciones para navegación por anchor

### Naming de IDs
- kebab-case: `sobre-mi`, `como-funciona`, `contacto`
- Sin prefijos ni sufijos innecesarios

---

## CSS

### Metodología BEM
```css
/* Bloque */
.service-card { }

/* Elemento */
.service-card__icon { }
.service-card__title { }
.service-card__description { }
.service-card__tag { }

/* Modificador */
.service-card--featured { }
.service-card--production { }
.service-card__tag--green { }
```

### Organización (ITCSS simplificado)
```css
/* 1. Settings: custom properties, design tokens */
/* 2. Generic: reset, box-sizing */
/* 3. Elements: h1-h6, a, p, body */
/* 4. Objects: .container, .grid */
/* 5. Components: .hero, .service-card, .cred-item */
/* 6. Utilities: .sr-only, .text-center */
```

### Reglas
- Custom properties para TODOS los colores, fuentes, espaciados y radios
- Mobile first: estilos base para mobile, `@media (min-width:)` para desktop
- No `!important` excepto en utilities (.sr-only)
- Unidades: `rem` para font-size, `px` para borders/shadows, `%` o `vw/vh` para layout
- `clamp()` para tipografía responsive

---

## JavaScript

### Module Pattern
```javascript
const ModuleName = (() => {
  // Private state
  const state = {};

  // Private methods
  function privateHelper() {}

  // Public API
  return {
    init() {},
    destroy() {}
  };
})();
```

### Reglas
- `'use strict'` implícito (o explícito si no hay module)
- `const` por defecto, `let` solo si re-asignación necesaria, nunca `var`
- Arrow functions para callbacks, function declarations para métodos principales
- Event listeners con `addEventListener`, nunca inline `onclick`
- `document.querySelector` / `querySelectorAll`, no `getElementById`
- Intersection Observer para scroll animations (no scroll events)

### Naming
- camelCase para variables y funciones: `initMobileMenu`, `scrollOffset`
- UPPER_SNAKE para constantes: `ANIMATION_DURATION`, `BREAKPOINT_TABLET`
- Prefijo `is`/`has` para booleanos: `isMenuOpen`, `hasScrolled`

---

## Commits

### Formato
```
tipo(alcance): descripción en español

[cuerpo opcional]
```

### Tipos
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Refactoring sin cambio funcional
- `style`: Cambios de estilo CSS/formato
- `docs`: Documentación
- `perf`: Mejoras de performance
- `a11y`: Mejoras de accesibilidad
- `seo`: Mejoras de SEO

### Alcances
- `hero`, `nav`, `services`, `credentials`, `about`, `cta`, `footer`
- `css`, `js`, `html`
- `docs`, `config`

### Ejemplos
```
feat(services): agregar badge de estado en tarjetas de servicios
fix(nav): corregir menú hamburguesa que no cierra al hacer click en link
refactor(css): separar estilos a archivo externo css/styles.css
a11y(hero): agregar aria-labels en botones del hero
seo(meta): agregar Open Graph tags para compartir en redes
```
