# Convenciones de Código — Sprint Judicial

Idioma: texto y documentación en español; identificadores de código en inglés.

## HTML

- Etiquetas semánticas: `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, `<footer>`.
- `lang="es"`. Todo `<img>` con `alt`, `width`, `height` y `loading="lazy"`.
- **Entidades HTML** para caracteres no ASCII en `index.html`: `&aacute;`, `&ntilde;`, `&middot;`, `&rarr;`. El JSON-LD usa escapes JSON.
- Ids en kebab-case en español: `que-hago`, `herramientas`, `mentoria`, `docencia`, `escritos`, `reconocimientos`.
- `aria-label` solo en controles sin texto visible o para distinguir enlaces repetidos. Las listas con `role="list"` se mantienen a propósito (VoiceOver pierde la semántica de lista con `list-style: none`).
- Enlaces externos: `target="_blank" rel="noopener noreferrer"`.
- Sin estilos ni manejadores en línea: la CSP no los permite.
- Ganchos de JS: `data-animate` (entrada al hacer scroll) y `data-stagger` (hijos escalonados).

## CSS

- **BEM**: `.bloque__elemento--modificador`. El patrón lo impone stylelint (`selector-class-pattern`).
- Colores, fuentes, espacios y radios salen de custom properties de `:root`.
- Organización ITCSS en `styles.css`: Settings, Generic, Elements, Objects, Components, Utilities y media queries.
- **Mobile first**: estilos base para 320 px y solo `@media (min-width: 768px)` y `(min-width: 1024px)`. No se usa `max-width`.
- Transiciones de tarjetas y enlaces: 0,2 s. Todo movimiento nuevo necesita su regla en el bloque `prefers-reduced-motion`.
- Sin `!important` salvo en `.sr-only`.
- nginx sirve CSS y JS con caché de 7 días y sin huella en el nombre: al cambiar `styles.css` o `animations.css`, sube el `?v=AAAAMMDD` de su `<link>` en **todas** las páginas (`index.html`, `privacidad/index.html`) o los visitantes recurrentes verán la versión anterior.
- Sin clases sin uso: `tests/test-css-usage.js` falla si una clase de `styles.css` no aparece en `index.html` o en JS.
- El ícono "i" de `.notice` usa `content: 'i' / ''` (texto alternativo vacío) para que no se anuncie.

## JavaScript

- Module Pattern (IIFE) o fábrica; sin dependencias ni `import`.
- Módulos nuevos: `const`/`let`, funciones flecha, `'use strict'`, lógica separada de los selectores del DOM y dependencias inyectables para probarla en Node (como `HeroRotator`). `main.js` conserva por herencia `var` y `function`; no se reescribe sin necesidad.
- **Escapes `\uXXXX`** para caracteres no ASCII dentro de cadenas JS, de modo que los archivos queden en ASCII.
- Eventos con `addEventListener`; nada de `onclick` en el HTML.
- Contenido externo (RSS) solo con `createElement` y `textContent`, nunca `innerHTML`.
- `IntersectionObserver` para animaciones de entrada; un solo listener de scroll con `requestAnimationFrame`.
- Nombres: camelCase, constantes en UPPER_SNAKE, booleanos con `is`/`has`.
- Todo selector que use JS debe existir en `index.html`; lo verifica `test-js-selectors.js`.

## Linters y criterio

Dependencias de desarrollo (`npm install --no-package-lock`): html-validate, stylelint, eslint. Hay hallazgos heredados (`no-var` en `main.js`, `no-redundant-role` por el `role="list"` intencional, prefijos `-webkit-`). **Criterio: un cambio no puede introducir reglas nuevas respecto a esa línea base**; no se exige dejar los linters en cero.

## Tests

`npm test` ejecuta `tests/run-all.js`, que corre cada suite y suma las líneas `PASS:` y `FAIL:`. Una suite nueva imprime ese formato y se registra en el arreglo `TESTS` de `run-all.js`. El resultado esperado es `0 failed`.

## Commits

```
tipo(alcance): descripción en español
```

- Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`.
- Alcances habituales: `hero`, `landing`, `css`, `js`, `specs`, `docs`, `seo`, `a11y`.
- **Sin línea `Co-Authored-By` ni otra atribución.**
- Un commit por tarea; los intentos de arreglo se agrupan antes de subir.

Ejemplos reales: `feat(hero): frase rotativa accesible con pausa y fichas de acceso`, `fix(css): hover de tarjetas en 0,2 s`, `docs(specs): cerrar SPEC-005`.

## Contenido

El sitio no ofrece servicios comerciales. En la página y en los documentos no van precios, planes, consultoría, claims de adopción, cifras sin fuente, datos del lugar de trabajo ni teléfono personal. `tests/test-compliance.js` lo verifica sobre `index.html`, `llms.txt`, `humans.txt`, `README.md` y `package.json`.
