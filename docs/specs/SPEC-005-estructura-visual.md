# SPEC-005: Estructura Visual y Dinamismo de la Portada

> Fecha: 2026-10-09
> Estado: 📝 Diseño aprobado — pendiente de implementación
> Prioridad: P1
> Rama: `feat/estructura-visual`
> Dependencias: SPEC-004 (✅ implementada)
> Modifica: SPEC-004 RC-02 (hero), RC-04 a RC-07 (presentación), RT-02 y RT-03
> Origen: revisión de diseño `docs/research/RES-003-revision-diseno-portada.md` y mockups aprobados en el visual companion (2026-10-09)

---

## 1. Objetivo

Devolver a la portada la estructura modular, la jerarquía y el dinamismo del diseño anterior (commit `be5e17f`) **sin cambiar el contenido aprobado en SPEC-004**. Hoy la página se percibe "de corrido": subsecciones sin jerarquía, listas en prosa, secciones largas sin contenedores, tarjetas iguales y un hero estático.

**Criterio de éxito:** cada sección tiene encabezado centrado y bloques contenidos (tarjetas, bandas o recuadros); el hero rota la frase clave de forma accesible; las tarjetas responden al puntero; `npm test` pasa (incluido `test-compliance.js`, sin cambios en sus reglas) y la revisión visual a 320/768/1024/1280 px no muestra scroll horizontal.

## 2. Restricciones heredadas (no cambian)

- Todo SPEC-004 §2.1 (contenido prohibido) y §2.2 (redacción). Los textos literales de SPEC-004 se mantienen palabra por palabra.
- Tokens de `:root`, tipografía, BEM, entidades HTML, JS vanilla en IIFE, sin dependencias, WCAG 2.1 AA, mobile first.
- Microcopy nuevo permitido (solo etiquetas): "Código abierto", "Demo pública", "MIT", "v1.5.1", "Artículo académico · 2024", "Grupo comunitario de innovación legal", "¿Organizas una clase o evento académico?", "Enseño", "Construyo", "Escribo", "Pausar animación"/"Reanudar animación", "Visita el blog", "3 herramientas MIT", "Mentoría abierta", "JusticIALab 2024 · equipo Marduk", y las cuatro frases del rotador (§3.1).

## 3. Requisitos de diseño

### RV5-01: Patrón general

- [ ] Todos los encabezados de sección (`section__label`, `section__title`, `section__description`) centrados.
- [ ] Fondo alterno (`section--alt`) en Qué hago, Mentoría y Escritos; Herramientas y Docencia sobre `--deep`.
- [ ] Los avisos dejan de ser recuadros amarillos sueltos: `.notice` pasa a nota con ícono "ⓘ" (borde y fondo sutiles) y se ubica **dentro** del bloque al que pertenece. Los textos de los avisos no cambian.
- [ ] `.section__subtitle` se usa solo donde haga falta y con jerarquía visible (etiqueta en mayúsculas con color de acento o encabezado de bloque).

### RV5-02: Hero con rotador accesible

- [ ] El `<h1>` contiene, dentro de `<span class="sr-only">`, la frase aprobada: "Enseño y documento cómo automatizar trámites judiciales con software libre."
- [ ] La versión visible (`aria-hidden="true"`) es: "Enseño y documento cómo automatizar ⟨frase⟩ con software libre.", con ⟨frase⟩ rotando en este orden: "trámites judiciales" → "el expediente electrónico" → "la gestión documental judicial" → "tareas repetitivas del despacho". La primera es la inicial y la que queda sin JS o con movimiento reducido.
- [ ] La frase rotativa usa el degradado `--accent-light` → `--teal` (como `be5e17f`); el ancho se reserva con CSS Grid (todas las frases en la misma celda) para evitar saltos de layout.
- [ ] Rotación cada 3,5 s con transición de opacidad + `translateY` (≈400 ms, easing de salida).
- [ ] Botón de pausa (WCAG 2.2.2): `<button type="button" class="rotator__toggle" aria-pressed="false" aria-label="Pausar animación del título">` con ícono; al activarlo cambia a `aria-pressed="true"` y `aria-label="Reanudar animación del título"`.
- [ ] La rotación se pausa mientras el puntero o el foco están sobre el título, y cuando `document.hidden` es verdadero.
- [ ] Con `prefers-reduced-motion: reduce`: no rota y el botón queda oculto (`hidden`).
- [ ] Debajo de los CTA, tres fichas con ícono (`.hero-chips`), que son enlaces: "3 herramientas MIT" → `#herramientas`, "Mentoría abierta" → `#mentoria`, "JusticIALab 2024 · equipo Marduk" → `#reconocimientos`.

### RV5-03: Qué hago

- [ ] Etiqueta de verbo en mayúsculas sobre cada tarjeta: "Enseño", "Construyo", "Escribo" (como `pipeline__verb` del diseño anterior). Títulos y textos sin cambios.

### RV5-04: Herramientas (opción A)

- [ ] Tres tarjetas en fila (≥1024 px) con acento propio: AgilEx azul (`--accent`→`--teal`), TYBABot turquesa (`--teal`→`--green`), DisciplinaJudicialAI dorado (`--gold`→`--accent`), mediante modificadores `tool-card--blue|teal|gold` que tiñen la barra superior y el fondo del ícono.
- [ ] Los datos pasan de frase a etiquetas tipo pill (`.pill`): AgilEx: "● Código abierto", "MIT", "v1.5.1", "Desde 2022"; TYBABot y DisciplinaJudicialAI: "● Demo pública", "MIT". El dato completo de versión y fecha de AgilEx se conserva en el `title` o en texto visible de la tarjeta (no se pierde información de SPEC-004 RC-04).
- [ ] Nota de demos (texto literal de SPEC-004) como `.notice` con ícono bajo la fila de tarjetas.
- [ ] Banda de Reconocimientos (`<div id="reconocimientos" class="recognitions">`, fondo `--surface`) con dos tarjetas centradas con ícono: 🏆 "Ganador JusticIALab 2024 (equipo Marduk)" + categoría + "Ver la fuente →"; 🗺 "Mapa de Innovación Legal en Colombia" + "Legal Hackers Medellín y ALTCO, 2023" + categoría. Textos de SPEC-004 RC-04 sin cambios; los íconos son SVG `aria-hidden`.
- [ ] "Más proyectos en GitHub →" centrado bajo la banda.

### RV5-05: Mentoría

- [ ] Pasos numerados centrados unidos por una línea horizontal (≥768 px) que se dibuja de izquierda a derecha al entrar en pantalla (`transform: scaleX`), oculta en móvil.
- [ ] Recuadro destacado (`.callout`, borde `--accent` al 30 %, degradado sutil) con: título "Grupo comunitario de innovación legal", la nota de privacidad (texto literal) con ícono y el botón "Unirme al grupo de WhatsApp →".

### RV5-06: Docencia (opción B)

- [ ] Dos columnas desde 1024 px (`.teaching`, 1.2fr / 1fr), apiladas en móvil.
- [ ] Izquierda: "Temas" con tres tarjetas con ícono SVG (informática jurídica, automatización de trámites, gobernanza de IA).
- [ ] Derecha: "Charlas y talleres recientes" como tarjetas `.event` con insignia de fecha ("2026 · Medellín", "18 oct 2024 · Medellín"), y debajo el recuadro `.callout` "¿Organizas una clase o evento académico?" con "Invitarme →" (mailto, `aria-label` de SPEC-004), "Escribirme por LinkedIn", la nota de jornada (texto literal) y "Trayectoria académica y profesional →".

### RV5-07: Escritos

- [ ] Dos columnas desde 1024 px: Blog (izquierda, 2fr) y Publicaciones (derecha, 1fr); apiladas en móvil.
- [ ] Respaldo del blog como tarjeta (`.blog__fallback` con título "Visita el blog" y botón), visible si el feed falla o no hay JS.
- [ ] El artículo como tarjeta `.publication` con insignia "Artículo académico · 2024", cita (texto de SPEC-004 RC-07), botón "Leer el artículo →" y enlace "Perfil en Google Scholar →".

### RV5-08: Microinteracciones

- [ ] Se corrige la especificidad: el hover de tarjetas (`pillars__card`, `tool-card`, `topics__item`, `event`, `publication`, `blog__card`) aplica `translateY(-4px)` y sombra (≈200 ms) aunque estén dentro de `.reveal--stagger`.
- [ ] Fichas del hero: subrayado del texto y desplazamiento de la flecha al hover/foco.
- [ ] `prefers-reduced-motion`: sin desplazamientos ni rotación; transiciones anuladas.

## 4. Requisitos técnicos

- **RT5-01 `index.html`:** estructura nueva por bloque con el copy de SPEC-004 intacto (los textos literales siguen pasando `test-compliance.js`). Un solo `<h1>`. Ids nuevos: `reconocimientos`. Botón del rotador `type="button"`.
- **RT5-02 `css/styles.css`:** bloques BEM nuevos o renombrados: `rotator`, `hero-chips`, `pill`, `tool-card--blue|teal|gold`, `recognitions`, `callout`, `teaching`, `event`, `publication`, `writings`; ajustes de `steps`, `notice`, `section__*`. Sin clases muertas (`test-css-usage.js`). Sin cambios en `:root`.
- **RT5-03 `js/main.js`:** `initHeroRotator()` nuevo: rota `.rotator__item`, pausa con el botón (`aria-pressed`/`aria-label`), con hover/focus del título y con `visibilitychange`; no arranca con movimiento reducido (oculta el botón). Línea de pasos: clase al entrar en pantalla reutilizando el observer de animaciones. Sin dependencias.
- **RT5-04 Tests:**
  - `test-accessibility.js`: exige el `sr-only` del h1 con la frase aprobada, el rotador `aria-hidden="true"`, el botón con `aria-pressed` y `id="reconocimientos"`.
  - `tests/test-rotator.js` (nuevo, Node sin dependencias, DOM simulado mínimo): carga `main.js` y verifica que el rotador avanza al siguiente ítem tras el intervalo, que el botón alterna `aria-pressed` y detiene el avance, y que con `prefers-reduced-motion` no avanza y el botón queda oculto.
  - `test-js-selectors.js` y `test-css-usage.js` cubren los bloques nuevos; `test-compliance.js` sin cambios en sus reglas.
- **RT5-05 Documentación:** SPEC-004 recibe una nota en su encabezado ("Presentación modificada por SPEC-005"); README sin cambios de contenido salvo si un enlace interno cambia.

## 5. Verificación

- [ ] `npm test` con 0 failed.
- [ ] Revisión visual en Chrome a 320, 768, 1024 y 1280 px contra los mockups aprobados: sin scroll horizontal, rotación visible y pausable, hover activo, respaldo del blog visible si el feed falla.
- [ ] Linters sin reglas nuevas respecto a `709c45e`.
- [ ] Revisión de código de la rama.

## 6. Fuera de alcance

Cambios de contenido o de copy aprobado, nuevas herramientas (Relevo, PrismaRPA, HabeasSafe), docs internos (SPEC-004 §10), nginx y Dockerfile.
