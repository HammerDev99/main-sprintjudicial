# Arquitectura — Sprint Judicial

## Arquitectura Actual (Fase 0)

Landing page estática HTML/CSS/JS puro. Zero dependencias de build.

```
Browser
  └── index.html
       ├── css/styles.css        (estilos BEM)
       ├── css/animations.css    (keyframes)
       ├── js/main.js            (UI logic)
       └── js/analytics.js       (tracking)
```

## Principios Arquitectónicos

### 1. Zero Build
No webpack, no bundler, no transpiler. Los archivos se sirven tal cual.
Razón: simplicidad, velocidad de deploy, cero dependencias de CI/CD.

### 2. Progressive Enhancement
La página DEBE funcionar sin JavaScript. JS agrega animaciones y mejoras,
pero el contenido, la navegación y los CTAs funcionan sin él.

### 3. Separation of Concerns
- **HTML**: Estructura y semántica (qué es)
- **CSS**: Presentación visual (cómo se ve)
- **JS**: Comportamiento e interactividad (qué hace)

Nunca inline styles en HTML. Nunca lógica de presentación en JS.

### 4. Mobile First (estricto)
**100% mobile-first**. Todos los estilos base son para mobile (320px+).
Se usan SOLO `min-width` media queries. NO hay `max-width` queries.

Breakpoints:
- Base: 0px+ (mobile)
- `min-width: 768px` (tablet)
- `min-width: 1024px` (desktop)

```css
/* Base: mobile (hidden, overlay) */
.navbar__links { display: none; position: fixed; ... }
.navbar__links.is-open { display: flex; }

/* Tablet: inline navigation */
@media (min-width: 768px) {
  .navbar__links { display: flex; position: static; ... }
}
```

Decisiones clave:
- Pseudo-elements decorativos: `display: none` en base, `display: block` en 768px+ (iOS Safari los renderiza como bloques sólidos en mobile)
- `body::before` (grain texture): oculto en mobile por rendimiento iOS
- Hero: `min-height: 100dvh` con fallback `100vh`
- Section padding: 64px mobile, 100px desktop
- **Navbar mobile overlay**: `display: none` / `display: flex` con `.is-open` (no `visibility`/`opacity` — causa ghost text en iOS)
- **`backdrop-filter` containing block**: `.navbar` tiene `backdrop-filter` que crea un containing block CSS. Los hijos con `position: fixed` se posicionan relativo al navbar, no al viewport. Fix: `.navbar--menu-open` desactiva `backdrop-filter` al abrir el menú

## Patrones de Diseño Aplicados

### Observer Pattern — Scroll Animations
```javascript
// IntersectionObserver para animar elementos al entrar en viewport
const observer = new IntersectionObserver(callback, { threshold: 0.1 });
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### Module Pattern — Encapsulación
```javascript
const SprintJudicial = (() => {
  const state = { menuOpen: false };
  // ... lógica privada
  return { init() { /* público */ } };
})();
```

### Strategy Pattern — Animaciones
```javascript
// Diferentes estrategias de animación según data attribute
const animations = {
  'fade-up': (el) => el.classList.add('animate--fade-up'),
  'fade-in': (el) => el.classList.add('animate--fade-in'),
  'counter': (el) => animateCounter(el),
};
```

### Singleton — Estado Global
```javascript
// Un solo estado de la aplicación
const state = { menuOpen: false, activeSection: 'hero', scrolled: false };
```

## Decisiones de Arquitectura (ADRs)

| ADR | Decisión | Alternativa descartada | Razón |
|-----|----------|----------------------|-------|
| ADR-001 | HTML/CSS/JS puro | Astro, Next.js | Zero build, performance máxima, deploy simple |
| ADR-002 | BEM para CSS | Tailwind, CSS Modules | No build step, legibilidad, metodología madura |
| ADR-003 | Module Pattern JS | ES Modules | Compatibilidad sin bundler, encapsulación |
| ADR-004 | Google Fonts CDN | Self-hosted fonts | Cacheo CDN, simplicidad |
| ADR-005 | Single page | Multi-page | Un solo producto (landing), no necesita routing |
| ADR-006 | `display: none/flex` para menú móvil | `visibility/opacity` | `visibility: hidden` causa ghost text en iOS Safari por compositor GPU |
| ADR-007 | Desactivar `backdrop-filter` al abrir menú | Mover `.navbar__links` fuera del DOM | `backdrop-filter` crea containing block, rompe `position: fixed` de hijos |

## Arquitectura Objetivo (Fase 3)

```
Browser
  └── Astro / Next.js SSG
       ├── pages/
       │   ├── index.astro        (landing)
       │   ├── servicios/[slug]   (detalle servicio)
       │   ├── blog/              (feed blog)
       │   └── demo/              (demos interactivas)
       ├── components/            (UI components)
       ├── styles/                (design tokens + CSS)
       └── api/                   (serverless functions)
```

Migrar a framework solo cuando:
- Se necesiten múltiples páginas (detalle de servicios, blog integrado)
- Se agreguen demos interactivas (calculadora, buscador)
- Se necesite SSR para SEO dinámico

## Diagrama de Flujo del Landing

```
Visitante llega
  ├── Hero (identifica el dolor)
  │     └── CTA: "Agendar demo" / "Ver servicios"
  ├── Servicios (muestra soluciones)
  │     └── 6 tarjetas con precio referencia
  ├── Cómo Funciona (reduce fricción)
  │     └── 4 pasos simples
  ├── Credenciales (genera confianza)
  │     └── Reconocimientos verificables
  ├── Sobre Mí (conexión personal)
  │     └── Perfil + links
  └── CTA Final (conversión)
        └── WhatsApp (primario) / Email (secundario)
```
