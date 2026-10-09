# Métricas de Verificación — Sprint Judicial

Estado al 2026-10-09.

## Pruebas automáticas

`npm test` ejecuta `tests/run-all.js` (Node nativo, sin dependencias, salida `PASS:`/`FAIL:`).

| Suite | Pruebas | Qué verifica |
|-------|---------|--------------|
| test-structure | 32 | Archivos esperados, orden de secciones, ids, scripts y estilos enlazados |
| test-accessibility | 28 | HTML semántico, skip-link, `aria-*`, alt, jerarquía de encabezados |
| test-seo | 16 | Título, descripción, canonical, Open Graph, Twitter, JSON-LD |
| test-css | 33 | Tokens, mobile first, reduced motion, microinteracciones |
| test-links | 22 | Anclas internas, CTAs, assets existentes, `rel="noopener"` |
| test-compliance | 52 | Reglas de contenido SPEC-004 sobre `index.html`, `llms.txt`, `humans.txt`, `README.md`, `package.json` |
| test-js-selectors | 24 | Todo selector de `main.js` existe en el HTML |
| test-css-usage | 2 | Ninguna clase de `styles.css` sin uso |
| test-rotator | 26 | `HeroRotator` con temporizadores falsos: pausa, hover, pestaña oculta, movimiento reducido |
| **Total** | **235** | **0 fallos** |

Cada suite también se corre sola, por ejemplo `npm run test:seo`.

## Linters

Se instalan con `npm install --no-package-lock`.

```bash
npx html-validate index.html
npx stylelint "css/**/*.css"
npx eslint js/
```

Hay hallazgos heredados: `no-var` en `main.js`, `no-redundant-role` por el `role="list"` intencional (VoiceOver) y prefijos `-webkit-`. **Criterio: no introducir reglas nuevas respecto a esa línea base.** Los scripts `lint:css` y `lint:js` usan `--fix`; revisar el diff antes de aceptar.

## Revisión visual manual

Antes de cerrar una spec, revisar la portada en cuatro anchos:

| Ancho | Qué mirar |
|-------|-----------|
| 320 px | Sin desbordamiento horizontal; menú móvil abre, atrapa el foco y cierra con Escape; fichas y botones legibles |
| 768 px | Navegación en línea; cuadrículas de 2 columnas; línea de pasos visible |
| 1024 px | Herramientas y pilares en 3 columnas; Docencia y Escritos en dos columnas |
| 1280 px | Contenedor de 1100 px centrado; sin saltos de diseño |

Además: rotador (pausa, reanudar, hover), hover de tarjetas, entrada al scroll y comportamiento con `prefers-reduced-motion` activado.

## Accesibilidad

| Criterio | Estado |
|----------|--------|
| Contraste de texto normal (4,5:1) | Cumple; botón primario 4,61:1 |
| Skip-link con foco | Presente |
| Foco visible | Contorno global de 2 px |
| Pausa de contenido en movimiento (2.2.2) | Botón en el rotador |
| Movimiento reducido | Respetado en CSS y JS |
| Teclado y lector de pantalla | Revisión manual pendiente en cada cambio de interacción |

## Lighthouse y rendimiento

No hay mediciones registradas todavía. Objetivo: más de 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.

```bash
npx lighthouse https://sprintjudicial.com --output=json --output-path=./lighthouse.json
```

Registrar aquí el resultado y la fecha de la primera medición. Peso esperado: HTML, 2 CSS, 2 JS, 1 logo y fuentes de Google.

## SEO

Todo lo de `seo.md` está completo salvo la imagen social (`og-image.png`), pendiente.

## Seguridad

Cabeceras definidas en `nginx/default.conf` (CSP sin `unsafe-inline`, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). Verificar en producción con `curl -I https://sprintjudicial.com`. La remediación del servidor está en `docs/plans/PLAN-005-security-remediation.md`.
