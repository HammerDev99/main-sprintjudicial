# Arquitectura — Sprint Judicial

Sitio estático de una sola página: espacio personal y académico de Daniel Arbeláez Álvarez sobre automatización de trámites judiciales con software libre. No tiene build, backend ni dependencias en producción.

## Estructura

```
index.html              Página única (secciones en <main id="main-content">)
css/styles.css          ITCSS + BEM; tokens en :root
css/animations.css      Keyframes y .reveal* (entrada al hacer scroll)
js/rotator.js           HeroRotator.create(options), exportable a Node
js/main.js              IIFE SprintJudicial (UI) y arranque en DOMContentLoaded
src/Agilex-logo.png     Logo de AgilEx (tarjeta de herramienta)
nginx/default.conf      CSP estricta, HSTS y demás cabeceras
Dockerfile              nginx:alpine; copia cada archivo público
llms.txt humans.txt robots.txt sitemap.xml security.txt  Archivos públicos
tests/                  9 suites Node nativo + run-all.js
```

Carga: `index.html` enlaza los dos CSS en `<head>` y los dos JS al final, `rotator.js` antes de `main.js` (main consulta `HeroRotator` si está definido).

## Secciones de la portada

Navbar → Hero (frase rotativa, botón de pausa, 3 fichas) → Qué hago → Herramientas (con banda `#reconocimientos`) → Mentoría abierta → Docencia y conferencias → Escritos → Pie. Los ids de ancla son `que-hago`, `herramientas`, `reconocimientos`, `mentoria`, `docencia`, `escritos`. Las restricciones editoriales están en `docs/specs/SPEC-004-reposicionamiento-academico.md`.

## Módulos JS

### `HeroRotator` (`js/rotator.js`)
Fábrica `create(options)` con dependencias inyectables (`items`, `toggle`, `toggleText`, `hoverTarget`, `doc`, `interval`, `timers`, `reducedMotion`). Devuelve `null` si hay menos de 2 elementos y, si no, una API `{ current, isRunning }`.
- Intervalo por defecto 3500 ms.
- Se detiene por pausa del usuario, por hover o foco en el título, y con la pestaña oculta.
- Con `reducedMotion` no rota y mantiene oculto el botón.
- Se exporta con `module.exports` para probarlo en Node con temporizadores falsos (`tests/test-rotator.js`).

### `SprintJudicial` (`js/main.js`)
IIFE con estado privado y un `init()` público, invocado en `DOMContentLoaded`. Orden de inicialización:

1. `initNavbar`: menú móvil con `aria-expanded`, Escape para cerrar, cierre al elegir enlace y focus trap.
2. `initUnifiedScroll`: un solo listener de scroll con `requestAnimationFrame` (fondo del navbar, botón volver arriba).
3. `initScrollAnimations`: `IntersectionObserver` sobre `[data-animate]`; añade `.reveal` y `.reveal--visible`, y `.reveal--stagger` si hay `data-stagger`.
4. `initSmoothScroll`: los enlaces `a[href^="#"]` descuentan `--nav-height`, mueven el foco al destino (`tabindex="-1"` si hace falta) y usan scroll instantáneo con movimiento reducido.
5. `initResizeHandler`: cierra el menú móvil al pasar a escritorio.
6. `initActiveNav`: marca `.is-active` en el enlace de la sección visible.
7. `initHeroRotator`: conecta `.rotator__item`, `.rotator__toggle` y `.hero__title` con `HeroRotator`.
8. `initBlogFeed`: lee el RSS del blog (máximo 3 entradas, `AbortController` a 8 s) y construye las tarjetas con la DOM API.

## Principios

1. **Sin build.** Los archivos se sirven tal cual.
2. **Mejora progresiva.** Sin JS el contenido y los enlaces funcionan: el título tiene una versión `sr-only` completa y el primer elemento del rotador queda activo; el botón de pausa nace con `hidden` y el script lo muestra.
3. **Separación de responsabilidades.** HTML estructura, CSS presenta, JS se comporta. Sin estilos ni manejadores en línea (la CSP los bloquea).
4. **Mobile first estricto.** Solo `min-width`: base 320, 768 y 1024.
5. **Sin clases muertas.** Toda clase de `styles.css` se usa en `index.html` o en JS; lo verifica `test-css-usage.js`. `animations.css` queda fuera de esa regla porque contiene utilidades reutilizables.
6. **Enlaces internos con foco.** Un ancla interna debe llevar el foco al destino, no solo el scroll.

## Decisiones vigentes

| ADR | Decisión | Alternativa descartada | Razón |
|-----|----------|------------------------|-------|
| 001 | HTML/CSS/JS puro | Astro, Next.js | Sin build, despliegue simple, rendimiento |
| 002 | BEM | Tailwind, CSS Modules | Sin build, legibilidad |
| 003 | Module Pattern (IIFE) | ES Modules | Sin bundler; `rotator.js` se exporta con `module.exports` solo para pruebas |
| 004 | Google Fonts por CDN con `font-display: swap` | Fuentes propias | Caché y simplicidad; la CSP lo permite de forma explícita |
| 005 | Una sola página | Multipágina | El contenido cabe en una portada |
| 006 | Menú móvil con `display: none/flex` | `visibility`/`opacity` | Texto fantasma en iOS Safari por el compositor GPU |
| 007 | Desactivar `backdrop-filter` con `.navbar--menu-open` | Sacar el menú del DOM | `backdrop-filter` crea un containing block y rompe `position: fixed` de los hijos |
| 008 | Rotador accesible y pausable (`HeroRotator`) | `setInterval` suelto en main.js | WCAG 2.2.2: botón de pausa, pausa por hover, foco y pestaña oculta, sin rotación con movimiento reducido; lógica probable en Node |
| 009 | Título con texto completo `sr-only` y rotador `aria-hidden` | `aria-live` en el rotador | El lector de pantalla lee una frase estable, sin anuncios repetidos |
| 010 | Foco movido al destino en enlaces internos | Solo `scrollTo` | WCAG 2.4.1: el teclado continúa desde la sección elegida |
| 011 | `AbortController` (8 s) y bloque de respaldo en el feed del blog | Esperar sin límite | Si falla CORS o la red, queda el enlace "Visitar el blog" |
| 012 | DOM API (`createElement`, `textContent`) para contenido externo | `innerHTML` | Previene XSS desde el RSS |
| 013 | Test de clases CSS sin uso | Revisión manual | Evita acumular CSS muerto tras rediseños |
| 014 | Tests con Node nativo, sin framework | Jest, Playwright | Sin dependencias; leen el código fuente como texto |

## Despliegue

Un push a `main` en GitHub dispara un webhook al panel del autor (`panel.sprintjudicial.com`), que redepliega con Docker y nginx. No hay GitHub Actions. El Dockerfile copia cada archivo público: al agregar un directorio o archivo nuevo hay que añadir su `COPY` (un `src/` olvidado dio 404 en producción). nginx repite las cabeceras de seguridad dentro de cada `location` porque `add_header` en un bloque hijo reemplaza las del padre. Referencia operativa del servidor: `docs/plans/PLAN-005-security-remediation.md`.

## Historia

SPEC-001 a SPEC-003 (landing comercial) quedaron superadas por SPEC-004 (reposicionamiento académico) y SPEC-005 (estructura visual y dinamismo). RES-001 y RES-002 son históricos. Ver `docs/ROADMAP.md`.
