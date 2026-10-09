# SPEC-004: Reposicionamiento Académico — Portada sin Oferta Comercial

> Fecha: 2026-10-08
> Estado: ✅ Implementada (2026-10-09)
> Prioridad: P0
> Rama: `feat/reposicionamiento-academico`
> Dependencias: ninguna
> Reemplaza: la dirección comercial de SPEC-003 (evolución estratégica) para lo que sirve sprintjudicial.com
> Origen: prompt de rediseño del autor + sesión de brainstorming del 2026-10-08

---

## 1. Objetivo

Reescribir la portada de sprintjudicial.com para que deje de ser una oferta comercial de servicios LegalTech y pase a ser el **espacio personal y académico** de un ingeniero de software que investiga, enseña y publica software libre sobre automatización en el sector justicia colombiano.

Se conserva la identidad visual (tema oscuro, design tokens, Source Serif 4 + Inter, navbar, footer). Cambian contenido, secciones, llamados a la acción, metadatos y los archivos públicos que describen el sitio.

**Criterio de éxito:** la página y los archivos públicos del alcance no contienen precios, botones de pago, la palabra "servicios" en sentido comercial, "consultoría", "cotización", claims de adopción nacional, el premio 2025 ni datos del lugar de trabajo, y `npm test` lo comprueba de forma automática.

## 2. Marco que se debe respetar

El autor es servidor de la Rama Judicial. El prompt de origen cita como marco:

- Ley 270 de 1996, art. 151 num. 3 y 4 (incompatibilidad con la calidad de comerciante y con la gestión profesional de negocios) y art. 154 num. 17 (prohibición de ejercer el comercio).
- Constitución, art. 127 (prohibición de contratar con entidades públicas).
- Código de Comercio, art. 13 num. 3 (se presume comerciante quien "se anuncie al público como comerciante por cualquier medio").
- Ley 270 de 1996, art. 151 parágrafo (docencia en materias jurídicas, investigación y conferencias a título personal).

Esta spec traduce ese marco en reglas verificables de contenido. **No es un concepto jurídico**; la interpretación de la norma corresponde al autor y a su asesor.

### 2.1 Prohibido en la página

- Precios, planes, tarifas, "desde $", "setup", "pago único", botones de compra, pago, suscripción o cotización.
- Consultoría, automatización por proyecto, desarrollos a la medida, servicios "para empresas" o "para despachos".
- Presentar al autor como proveedor, agencia, estudio o empresa; verbos de venta ("contrata", "adquiere", "compra", "solicita una cotización").
- Adopciones o premios no verificables. Permitido: "Ganador JusticIALab 2024 (equipo Marduk)". Prohibido: "JusticIALab 2025", "implementada a nivel nacional", "institucional en todo el país".
- La dependencia donde trabaja el autor, su cargo exacto, nombres de colegas o detalles del lugar de trabajo.
- Donaciones, PayPal, Vaki, Patreon o cualquier mecanismo de recaudo.

### 2.2 Reglas de redacción

- Español neutro, directo, frases cortas, segunda persona del singular (tú).
- Sin superlativos ni promesas de resultado.
- Toda afirmación cuantitativa tiene fuente verificable o se elimina.
- El manifiesto "Naturaleza → Código" no existe en este repo ni en los repos públicos del autor: se omite.

## 3. Decisiones de la sesión de diseño

| # | Decisión | Motivo |
|---|----------|--------|
| D1 | Alcance: lo que sirve sprintjudicial.com (`index.html`, CSS/JS, metadatos, `llms.txt`, `humans.txt`, `sitemap.xml`) + `README.md` + `package.json` | Es lo que el público ve en la web y en GitHub. Docs internos y otros repos van a una spec aparte (§10) |
| D2 | Mentoría por el grupo comunitario de WhatsApp existente; sin formulario | El sitio no tiene backend; un formulario propio activaría obligaciones de la Ley 1581 |
| D3 | Herramientas: AgilEx, TYBABot y DisciplinaJudicialAI | Son públicas, con licencia MIT y sin datos del lugar de trabajo (TYBABot y DisciplinaJudicialAI verificados; AgilEx se verifica en implementación, RV-06) |
| D4 | Relevo, PrismaRPA y HabeasSafe se agregan después | Relevo no tiene licencia y su README usa nombres de pila como ejemplo; PrismaRPA es privado, sin licencia y menciona la sede de trabajo; HabeasSafe tiene el repo privado y su sitio publica cifras y afirmaciones de cumplimiento sin fuente, y su versión web procesa datos personales en un servidor propio y en un modelo en la nube de terceros |
| D5 | Sherlock, GexCom, justicia-sana y TutelaBot quedan fuera | Privado / menciona la sede / nombra a un colega / es fork de otro autor |
| D6 | Contacto: correo + LinkedIn. Se eliminan teléfono, WhatsApp personal y botón flotante | Las invitaciones académicas se tramitan por canales formales |
| D7 | No se menciona la experiencia docente universitaria ni la institución; la trayectoria vive en portfolio.sprintjudicial.com | Decisión del autor |
| D8 | Los temas de docencia son los del prompt: informática jurídica, automatización de trámites, gobernanza de IA en la justicia | Decisión del autor |
| D9 | Se elimina la sección "Sobre mí" | Evita por construcción cargos y dependencias |
| D10 | Se elimina la trust-bar con logos institucionales | El logo de la Rama Judicial puede leerse como aval de la entidad |
| D11 | El Mapa de Innovación Legal 2023 se cita como texto, sin enlace y sin reproducir la etiqueta "LAW - Daniel Arbeláez" | legalhackerscolombia.org ya no existe y no hay copia archivada. La única copia disponible es una descarga de Studocu con el correo personal del autor en cada página. El mapa es de Legal Hackers Medellín y ALTCO (no de "Legal Hackers Colombia"); la etiqueta se omite porque se lee como nombre de firma |
| D12 | El taller 2026 se cita sin organizador ni coautores y sin enlace | No hay fuente pública; el kit nombra a un colega |
| D13 | Licencia de los contenidos: CC BY 4.0 | Requisito del prompt (licencia de los contenidos en el pie) |
| D14 | Se mantiene el wordmark "Sprint Judicial" como nombre del sitio | El prompt pide conservar la identidad visual; el hero abre con el nombre del autor |

## 4. Requisitos de contenido

Los textos entre comillas son el copy final. Los marcados como **literal** no se pueden reformular.

### RC-01: Navbar

- [x] Wordmark `Sprint<span>Judicial</span>` (sin cambios).
- [x] Enlaces: "Qué hago" (`#que-hago`), "Herramientas" (`#herramientas`), "Mentoría" (`#mentoria`), "Docencia" (`#docencia`), "Escritos" (`#escritos`).
- [x] Botón CTA: "Invitarme" → `#docencia`.

### RC-02: Hero

- [x] Etiqueta: "Daniel Arbeláez Álvarez · Ingeniero de software".
- [x] `<h1>` (único en la página): "Enseño y documento cómo automatizar trámites judiciales con software libre."
- [x] Párrafo: "Investigo y divulgo automatización en el sector justicia colombiano. Publico el código, explico cómo funciona y acompaño a quien quiera aprender a usarlo. La IA asiste; la decisión es humana."
- [x] CTA primario: "Ver las herramientas (código abierto)" → `#herramientas`.
- [x] CTA secundario: "Invitarme a dar una clase o conferencia" → `#docencia`.
- [x] Se conserva el indicador de scroll. Sin rotador, sin cifras, sin badge.

### RC-03: Qué hago (`#que-hago`)

- [x] Etiqueta "Qué hago". Título: "Enseñar, construir y escribir".
- [x] Descripción: "Tres actividades con un mismo propósito: que más personas del sector justicia entiendan la automatización y la usen con criterio."
- [x] Tarjeta **Enseño**: "Doy clases invitadas, talleres y conferencias sobre informática jurídica, automatización de trámites y gobernanza de IA en la justicia."
- [x] Tarjeta **Construyo software libre**: "Publico herramientas con licencia MIT para tareas repetitivas del trabajo judicial. Puedes leer el código, usarlo y mejorarlo."
- [x] Tarjeta **Investigo y escribo**: "Escribo en el blog y en revistas académicas sobre automatización de trámites y uso responsable de la IA."

### RC-04: Herramientas de código abierto (`#herramientas`)

- [x] Etiqueta "Código abierto". Título: "Herramientas libres".
- [x] Descripción: "Software gratuito con licencia MIT. Cada herramienta tiene su repositorio público y su documentación."
- [x] Tarjeta **AgilEx** (con `src/Agilex-logo.png`, alt "Logo de AgilEx"):
  - "Automatiza la creación y el diligenciamiento del índice electrónico de un expediente a partir de los archivos de una carpeta, según el protocolo de expediente electrónico del Acuerdo PCSJA20-11567 de 2020."
  - Datos: "Licencia MIT · Versión 1.5.1 (abril de 2026) · Primera versión publicada: octubre de 2022".
  - Enlaces: "Repositorio" → `https://github.com/HammerDev99/GestionExpedienteElectronico_Version1`; "Documentación" → `https://docs.agilex.sprintjudicial.com/`.
- [x] Tarjeta **TYBABot**:
  - "Asistente conversacional que orienta sobre el uso de Justicia XXI Web (TYBA): documentos electrónicos, actuaciones, memoriales, notificaciones y firmas."
  - Datos: "Licencia MIT · Demo pública".
  - Enlaces: "Repositorio" → `https://github.com/HammerDev99/TYBABot`; "Probar la demo" → `https://tybabot.streamlit.app`.
- [x] Tarjeta **DisciplinaJudicialAI**:
  - "Orientador normativo sobre el régimen disciplinario de los servidores judiciales: etapas del proceso, faltas, sanciones y derechos del investigado. No reemplaza la asesoría de un abogado."
  - Datos: "Licencia MIT · Demo pública".
  - Enlaces: "Repositorio" → `https://github.com/HammerDev99/disciplinajudicialai`; "Probar la demo" → `https://disciplinajudicialai.streamlit.app/`.
- [x] Aviso: "Las demos usan servicios de IA de terceros. No ingreses datos personales ni información de procesos reales." (Aquí "servicios" no tiene sentido comercial; el aviso entra en la lista de permitidos de RV-01.)
- [x] Subtítulo "Reconocimientos", con dos ítems:
  - "**Ganador JusticIALab 2024 (equipo Marduk)** — categoría Justicia Basada en Datos, Primer Concurso de Innovación de la Rama Judicial." (literal la parte en negrita). Enlace "Ver la fuente" → nota de ramajudicial.gov.co del 13-dic-2024 (§11).
  - "Incluido en el Mapa de Innovación Legal en Colombia (Legal Hackers Medellín y ALTCO, 2023), categoría Automatización documental y de procesos." Sin enlace (D11).
- [x] Enlace: "Más proyectos en GitHub" → `https://github.com/HammerDev99`.

### RC-05: Mentoría abierta (`#mentoria`)

- [x] Etiqueta "Mentoría abierta". Título: "Aprende a automatizar con herramientas libres".
- [x] Descripción: "Acompañamiento sin costo para servidores judiciales y estudiantes que quieren aprender a usar AgilEx y a diseñar automatizaciones responsables."
- [x] Paso 1 **Únete al grupo**: "Entra al grupo comunitario de innovación legal en WhatsApp. Allí se hacen y se responden las preguntas."
- [x] Paso 2 **Participa en las sesiones abiertas**: "Las sesiones públicas se anuncian en el grupo. Puedes llegar con tu duda o con un trámite que quieras automatizar."
- [x] Paso 3 **Usa el material gratuito**: "La documentación de AgilEx y los artículos del blog están disponibles para cualquiera."
- [x] CTA: "Unirme al grupo de WhatsApp" → `https://chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ` (`target="_blank" rel="noopener noreferrer"`).
- [x] Aviso: "Es un grupo comunitario, no un canal oficial de la Rama Judicial. Al unirte, los demás miembros pueden ver tu número. La mentoría no tiene costo."

### RC-06: Docencia y conferencias (`#docencia`)

- [x] Etiqueta "Docencia y conferencias". Título: "Invítame a tu clase o evento académico".
- [x] Descripción: "Participo como docente invitado o conferencista en universidades, escuelas judiciales y eventos académicos."
- [x] Subtítulo "Temas" con tres ítems:
  - **Informática jurídica**: "Cómo funcionan los sistemas de información judicial y qué cambia con el expediente electrónico."
  - **Automatización de trámites judiciales**: "Cómo identificar tareas repetitivas y automatizarlas sin perder controles: entrevistas guiadas, plantillas y robots de escritorio."
  - **Gobernanza de IA en la justicia**: "Uso responsable de la IA en el trabajo judicial con el Acuerdo PCSJA24-12243 de 2024 como marco: criterio propio, verificación, protección de datos y transparencia."
- [x] Subtítulo "Charlas y talleres recientes":
  - "Taller práctico «IA para el trabajo judicial: menos carga operativa, mayor capacidad de control». Servidores judiciales, Medellín, 2026." (sin enlace)
  - "Conferencia «Casos de estudio nacionales: experiencias de Colombia en la incorporación de IA en la justicia». Jornada Académica sobre Inteligencia Artificial y su Impacto en la Justicia, Medellín, 18 de octubre de 2024." Enlace "Ver el programa" (§11).
- [x] Enlace: "Trayectoria académica y profesional" → `https://portfolio.sprintjudicial.com/`.
- [x] CTA primario: "Invitarme" → `mailto:contacto@sprintjudicial.com?subject=Invitaci%C3%B3n%20acad%C3%A9mica`.
- [x] CTA secundario: "Escribirme por LinkedIn" → `https://www.linkedin.com/in/daniel-arbelaez-`.
- [x] Aviso **literal**: "Las actividades docentes se realizan por fuera de mi jornada laboral y conforme al régimen aplicable a los servidores judiciales."

### RC-07: Escritos (`#escritos`)

- [x] Etiqueta "Escritos". Título: "Lo que publico".
- [x] Subtítulo "Blog": las 3 últimas entradas por RSS (comportamiento actual de `initBlogFeed`) y enlace de respaldo "Visitar el blog".
- [x] Subtítulo "Publicaciones académicas":
  - "Arbeláez Álvarez, D. (2024). Entrevistas guiadas para la optimización de procesos judiciales: un enfoque desde el LegalTech. *Cuaderno Activa*, 16(1), 37–47." Enlace "Leer el artículo" (§11).
  - Enlace "Perfil en Google Scholar" (§11).

### RC-08: Pie

- [x] Marca + descripción: "Espacio personal de Daniel Arbeláez Álvarez sobre automatización, software libre e IA responsable en la justicia colombiana."
- [x] Columna "Sitio": Qué hago, Herramientas, Mentoría, Docencia, Escritos.
- [x] Columna "Enlaces": Blog, Portafolio, GitHub, Google Scholar, LinkedIn.
- [x] Columna "Contacto": Correo (`mailto:contacto@sprintjudicial.com`), Grupo de mentoría.
- [x] Licencia: "© 2026 Daniel Arbeláez Álvarez. Los contenidos de este sitio se publican bajo licencia CC BY 4.0. El código de cada herramienta conserva su propia licencia." con enlace a `https://creativecommons.org/licenses/by/4.0/deed.es`.
- [x] Nota de transparencia **literal**: "Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad."

### RC-09: Elementos que desaparecen

Pipeline, Servicios, Cómo funciona, Comparativa, ¿Por qué Sprint Judicial?, Credenciales, CTA intermedio, Seguridad, Sobre mí, Tu primer mes, FAQ, Contacto, trust-bar, rotador del hero, cifras del hero, botón flotante de WhatsApp, enlace a links.sprintjudicial.com (pendiente de revisión, §10). El botón "volver arriba" se conserva.

## 5. Requisitos técnicos

### RT-01: HTML (`index.html`)

- [x] Estructura: `header > nav`, `main#main-content` con `section` por bloque, `footer`. Un solo `<h1>`; `<h2>` por sección; `<h3>` en tarjetas y subtítulos.
- [x] Ids: `que-hago`, `herramientas`, `mentoria`, `docencia`, `escritos`, `blog-feed`, `blog-fallback`, `nav-menu`, `main-content`.
- [x] Se conservan skip-link, `aria-expanded`/`aria-controls` del menú, `aria-hidden` en íconos y `data-animate`/`data-stagger`.
- [x] Enlaces externos con `target="_blank" rel="noopener noreferrer"`.
- [x] Se mantiene el idiom actual de entidades HTML para caracteres acentuados.

### RT-02: CSS (`css/styles.css`, `css/animations.css`)

- [x] **Se conservan**: tokens, base, grain, navbar, botones, hero (sin `.stat`, `.hero__stats`, `.hero__rotator*`, `.hero__badge`), cabeceras de sección, `.blog`, `.cta-section`, `.footer`, `.back-to-top`, `.sr-only`, `.container` y todo `animations.css`.
- [x] **Se renombran y adelgazan**:
  - `.differentiators` → `.pillars` (Qué hago, 3 tarjetas).
  - `.service-card` → `.tool-card` (título, logo opcional, descripción, lista de datos, acciones). Sin `__pain`, `__result`, `__tag`, `__status*` ni variantes de color que no se usen.
  - `.timeline` → `.steps` (pasos de la mentoría).
- [x] **Se crean**: `.topics` (temas de docencia), `.publication` (escritos académicos), `.notice` (avisos).
- [x] **Se eliminan** con sus reglas responsive: `.stat`, `.process`, `.credentials`/`.credential`, `.about`, `.trust-bar*`, `.cta-mid`, `.comparison`, `.faq`, `.pipeline`, `.security`, `.whatsapp-float`, `.services-grid`, `.btn--green` (si queda sin uso).
- [x] Mobile first (320 → 768 → 1024 → 1440). Contraste AA con los tokens actuales.

### RT-03: JS (`js/main.js`)

- [x] Se eliminan `initHeroRotator`, `initCounters`, `animateCounter`, `easeOutQuad` y `ANIMATION_DURATION`.
- [x] Sin cambios en navbar, scroll, animaciones, smooth scroll, nav activo, resize y blog feed. No se agrega JS.

### RT-04: Assets

- [x] Se eliminan `src/JusticiaLab-Logo-sf.png`, `src/Legal-Hackers-Logo-sf.png` y `src/Rama-Judicial-Logo-sf.png`.
- [x] Se conserva `src/Agilex-logo.png`. El `Dockerfile` no cambia.

### RT-05: Metadatos (`<head>`)

- [x] `<title>`: "Daniel Arbeláez Álvarez | Sprint Judicial".
- [x] `meta description`, `og:description`, `twitter:description`: "Enseño y documento cómo automatizar trámites judiciales con software libre: herramientas de código abierto, mentoría abierta y docencia sobre IA en la justicia."
- [x] `og:title` y `twitter:title` iguales al `<title>`.
- [x] Se eliminan `og:image` y `twitter:image` (apuntan a `assets/og-image.png`, que no existe). `twitter:card` pasa a `summary`.
- [x] Se conservan canonical, favicon, `og:url`, `og:type`, `og:locale`, `og:site_name`, RSS, preconnect y fuentes.

### RT-06: Schema.org

- [x] Se eliminan los bloques `ProfessionalService` y `FAQPage`.
- [x] Un bloque JSON-LD con `@graph`:
  - `Person` (`@id` `https://sprintjudicial.com/#autor`): `name` "Daniel Arbeláez Álvarez", `jobTitle` "Ingeniero de software", `url`, `knowsAbout` [Informática jurídica, Automatización de trámites judiciales, Gobernanza de IA en la justicia], `award` "Ganador JusticIALab 2024 (equipo Marduk)", `sameAs` [LinkedIn, GitHub, Google Scholar, blog, portafolio].
  - `WebSite` (`@id` `https://sprintjudicial.com/#sitio`): `name` "Sprint Judicial", `url`, `inLanguage` "es-CO", `author` → `#autor`, `license` CC BY 4.0.
- [x] Sin `telephone`, `address`, `areaServed`, `serviceType` ni `email`. Caracteres no ASCII con escapes `\uXXXX` (idiom actual).

### RT-07: Archivos públicos

- [x] `llms.txt`: reescrito con el posicionamiento, las tres herramientas (con repo), la mentoría, la docencia, los escritos, la licencia y la nota de transparencia. Se elimina el enlace roto `wa.me/573128abordar`.
- [x] `humans.txt`: se agrega `Content license: CC BY 4.0`.
- [x] `sitemap.xml`: `lastmod` a la fecha de implementación.
- [x] `package.json`: `description` → "Sitio personal y académico de Daniel Arbeláez Álvarez: software libre y docencia sobre automatización judicial".
- [x] `README.md`: reescribir la descripción, eliminar la tabla "Servicios del ecosistema", reemplazar "Credenciales verificables" por las herramientas y el reconocimiento verificable, quitar cargos, "CSJ Bello", "nivel nacional" y el WhatsApp. Corregir la estructura de carpetas (no existen `js/analytics.js` ni `assets/`).
- [x] `nginx/default.conf`: sin cambios (los enlaces externos y `mailto:` son navegación; la CSP no los restringe).

## 6. Requisitos de verificación (TDD)

### RV-01: `tests/test-compliance.js` (se escribe primero y debe fallar contra `be5e17f`)

- **Archivos**: `index.html`, `llms.txt`, `humans.txt`, `README.md`, `package.json`.
- **Normalización** antes de comparar: decodificar entidades HTML (nombradas y numéricas) y escapes `\uXXXX`; minúsculas; quitar tildes (NFD); colapsar espacios.
- **Lista de permitidos** (se retira del texto antes de buscar prohibidos): la nota de transparencia literal (RC-08) y el aviso de demos (RC-04).
- **Texto evaluado por grupo**: "Precios", "Venta", "Claims" y "Recaudo" se evalúan sobre el texto **sin URLs** (los valores de `href`/`src` y las URLs sueltas se retiran, para evitar falsos positivos con codificaciones como `%C3%B3`). "Lugar de trabajo", "Contacto comercial" y "Schema comercial" se evalúan sobre el texto **completo**, URLs incluidas.
- **Prohibidos** (regex sobre texto normalizado):

| Grupo | Patrones |
|-------|----------|
| Precios | `\$\s?\d`, `\bcop\b`, `\bprecios?\b`, `\btarifas?\b`, `\bsetup\b`, `pago unico`, `\bpagos?\b`, `\bsuscripci`, `\bplanes?\b de` |
| Venta | `\bcotiza`, `\bconsultor(ia|ias|a|es)?\b`, `\bcontrat(a|ar|e|en|es)\b`, `\badquier`, `\bcompr(a|ar|e)\b`, `demo gratuita`, `\bagend(a|ar|e)\b`, `para empresas`, `para despachos`, `a la medida`, `por proyecto`, `\bretainer\b`, `\bservicios?\b` |
| Claims | `nivel nacional`, `produccion nacional`, `en todo el pais`, `todas las dependencias`, `justicialab 2025`, `\d+\s?%`, `en segundos`, `\bahorr`, `revolucion` |
| Lugar de trabajo | `\bbello\b`, `centro de servicios`, `\bcsj\b`, `juzgado primero`, `tecnico en sistemas`, `\bescribiente\b`, `\bcitador\b`, `asistente judicial`, `\bdiego\b`, `\bbeltran\b`, `\bleonardo\b` |
| Contacto comercial | `wa\.me/`, `3015771258`, `301 577 1258` |
| Recaudo | `paypal`, `\bvaki\b`, `patreon`, `\bdona(r|cion|ciones)\b`, `\bnequi\b`, `daviplata` |
| Schema comercial (solo `index.html`) | `professionalservice`, `servicetype`, `areaserved`, `"telephone"` |

- **Obligatorios** en `index.html`: nota de transparencia literal; aviso de jornada laboral literal; "Ganador JusticIALab 2024 (equipo Marduk)"; "CC BY 4.0"; "MIT"; `chat.whatsapp.com/CvZSCpQPKl5GWJsb5yhhWJ`; `contacto@sprintjudicial.com`; `portfolio.sprintjudicial.com`; `scholar.google.com/citations?user=T5zXXTcAAAAJ`; `ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858`.
- Imprime `PASS`/`FAIL` por verificación, con el archivo y el fragmento que coincidió (formato de los tests actuales). Se registra en `tests/run-all.js`.

### RV-02: Tests existentes que cambian

- [x] `test-accessibility.js`: los ids exigidos pasan de `servicios`, `credenciales`, `sobre-mi`, `contacto` a `que-hago`, `herramientas`, `mentoria`, `docencia`, `escritos`; los enlaces exigidos a `#herramientas` y `#docencia`; deja de exigir `wa.me/573015771258` y pasa a exigir el grupo de WhatsApp.
- [x] `test-links.js`: CTAs externos exigidos = grupo de WhatsApp, correo, LinkedIn, GitHub, blog, portafolio, Google Scholar.
- [x] `test-seo.js`, `test-css.js`, `test-structure.js`: sin cambios funcionales (`og:image` pasará a `PENDING`, que es el comportamiento previsto del test).

### RV-03: Suite completa

- [x] `npm test` sin `FAIL`.
- [x] `npx html-validate index.html`, `npx stylelint "css/**/*.css"` y `npx eslint js/` sin errores (si las dependencias no están instaladas, se reporta y no se da por verificado). (criterio aplicado: sin reglas nuevas respecto de `be5e17f`; persisten errores preexistentes de estilo)

### RV-04: Enlaces externos

- [ ] Cada URL de §11 y de RC-04/05/06/08 responde 2xx o 3xx (las demos de Streamlit responden 303 por diseño). (pendiente: LinkedIn responde 999 a clientes automatizados, verificar a mano; resto 200/303)

### RV-05: Revisión visual

- [x] `python -m http.server 8000`; revisar a 320, 768, 1024 y 1440 px; navegación por teclado; menú móvil (abrir, cerrar con Esc, foco atrapado); feed del blog; `prefers-reduced-motion`. Revisión visual en Chrome local (2026-10-09): 320/375/768/1024/1440 sin scroll horizontal; menú móvil abre, Esc cierra y devuelve el foco; respaldo del blog visible si falla el feed; reduced-motion verificado por CSS.

### RV-06: Repos enlazados

- [ ] Buscar `Bello`, `Centro de Servicios`, `Técnico en Sistemas`, `Citador`, `Escribiente` en `GestionExpedienteElectronico_Version1` y `AgilEx-Docs`. Si aparecen, reportarlo al autor antes de publicar (no se corrige en esta spec). (no cerrado: "Bello" aparece 1 vez en `src/assets/JUZGADOS.csv` de `GestionExpedienteElectronico_Version1`; reportado al autor)

### RV-07: Revisión de código

- [ ] Agente `code-reviewer` sobre el diff completo; se atienden hallazgos CRITICAL y HIGH. (pendiente: revisión final de rama)

## 7. Entregables

1. Contenido listo para commit (RT-01 a RT-07).
2. Inventario de eliminaciones con razón (Anexo A), contrastado contra el diff final.
3. Checklist final (Anexo B) marcado solo con evidencia.

## 8. Acción del autor antes de publicar

- [ ] Activar "Aprobar nuevos participantes" en el grupo de WhatsApp. Al publicar el enlace, cualquier persona puede entrar y ver los números de los miembros. — pendiente del autor

## 9. Despliegue

Fuera de esta spec. El despliegue a producción lo hace el autor. El `Dockerfile` y `nginx/default.conf` no cambian.

## 10. Fuera de alcance → spec aparte ("otros repos y docs")

- Docs internos con precios en este repo público: `CLAUDE.md`, `docs/others/CONTEXTO_SPRINT_JUDICIAL.md`, `docs/specs/SPEC-002-services.md`, `docs/specs/SPEC-003-evolucion-estrategica.md`, `docs/research/RES-002-analisis-estrategico.md`, `docs/ROADMAP.md`, `docs/others/index_old.html`, `agent_docs/*`.
- El historial de git, que conserva el contenido anterior. Alternativa rápida sin código: volver privado el repo.
- Relevo: nombres de pila en el README y falta de licencia.
- justicia-sana: nombra a un colega y tiene `docs/cliente/`.
- gexcom-docs-site: menciona la sede de trabajo.
- links.sprintjudicial.com, portfolio.sprintjudicial.com y hammerdev99.github.io: revisar con las mismas reglas de §2.1.
- PrismaRPA: licencia y saneamiento antes de publicarlo.
- HabeasSafe: hacer público el repo, retirar del sitio las cifras y afirmaciones de cumplimiento sin fuente y orientar el uso con documentos reales hacia la versión de escritorio sin conexión.
- Imagen `og-image.png` para redes sociales.
- Fuente pública oficial para el Mapa de Innovación Legal 2023 (D11). Si aparece, se evalúa enlazarla.

## 11. Fuentes de verificación

| Dato | Fuente |
|------|--------|
| Ganador JusticIALab 2024, proyecto Marduk, categoría Justicia Basada en Datos | https://www.ramajudicial.gov.co/web/consejo-superior-de-la-judicatura/-/construimos-la-justicia-del-futuro-con-el-primer-concurso-de-innovaci%C3%B3n-de-la-rama-judicial (nota del 13-dic-2024: "el ganador fue el proyecto Marduk") |
| Conferencia del 18-oct-2024 | https://www.asojudiciales.org/wp-content/uploads/2024/10/PROGRAMACION-JORNADA-ACADEMICA-SOBRE-IA-MEDELLIN-18-OCT-2024-1.pdf |
| Artículo Cuaderno Activa 16(1), 37–47 (2024) | https://ojs.tdea.edu.co/index.php/cuadernoactiva/article/view/1858 |
| Perfil académico | https://scholar.google.com/citations?user=T5zXXTcAAAAJ&hl=es |
| AgilEx: MIT, v1.0.0 (26-oct-2022), v1.5.1 (20-abr-2026) | https://github.com/HammerDev99/GestionExpedienteElectronico_Version1/releases |
| AgilEx: documentación | https://docs.agilex.sprintjudicial.com/ |
| TYBABot: MIT | https://github.com/HammerDev99/TYBABot |
| DisciplinaJudicialAI: MIT | https://github.com/HammerDev99/disciplinajudicialai |
| Taller 2026 | Material del autor (sin fuente pública) |
| Mapa de Innovación Legal en Colombia 2023, Legal Hackers Medellín y ALTCO, categoría Automatización documental y de procesos (p. 5, entrada "LAW - DANIEL ARBELÁEZ") | Copia del autor descargada de Studocu (sin fuente pública; no se enlaza, D11) |

---

## Anexo A: Inventario de eliminaciones

Números de línea de los archivos en el commit `be5e17f`. Se contrastan con el diff final antes de cerrar la spec.

**Códigos de razón**

| Código | Razón |
|--------|-------|
| R1 | Precio, tarifa o modelo de cobro |
| R2 | Oferta de servicios, consultoría, desarrollo a la medida o presentación como proveedor |
| R3 | Claim de adopción, cumplimiento, título o autoría no verificable |
| R4 | Dato del lugar de trabajo, cargo o colegas |
| R5 | CTA o verbo de venta |
| R6 | Cifra o promesa de resultado sin fuente |
| R7 | Canal de contacto comercial o dato de contacto personal |
| R8 | Logo institucional que puede sugerir aval |
| R9 | Decisión editorial: fuera de la nueva estructura, reubicado o código muerto |
| T | Referencia técnica rota |

### A.1 `index.html` — `<head>`

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 6, 17, 27 | "IA y Automatización para Abogados Litigantes" (title, og, twitter) | R2 |
| 7, 18, 28 | Descriptions: "Herramientas … para abogados litigantes … Asistente legal IA, buscador de jurisprudencia, generador de documentos. +10 años de experiencia en la Rama Judicial" | R2 |
| 23, 29 | `og:image` / `twitter:image` → `assets/og-image.png` (no existe) | T |
| 35 | `"@type": "ProfessionalService"` | R2 |
| 39 | `"telephone": "+573015771258"` | R7 |
| 41–46 | `address` (Medellín, Antioquia) en ficha de negocio | R2 |
| 50 | `jobTitle` "Especialista en LegalTech e IA" (la especialización está en curso) | R3 |
| 53–54 | `areaServed`, `serviceType` (incluye "Consultoría LegalTech") | R2 |
| 63–119 | `FAQPage` completo (ver A.13) | R1, R2, R3, R5 |

### A.2 Navbar

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 150 | "Servicios" | R2 |
| 151 | "Cómo Funciona" (proceso de venta) | R2 |
| 152–154 | "Credenciales", "Sobre mí", "FAQ" | R9 |
| 155 | "Agendar Demo" | R5 |

### A.3 Hero

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 168–170 | Badge comentado "Ganador JusticIALab 2024" (se reubica con "(equipo Marduk)") | R9 |
| 175 | "redacta tutelas en 15 minutos" | R6 |
| 176 | "encuentra jurisprudencia en segundos" | R6 |
| 177 | "automatiza lo repetitivo de su práctica" | R2 |
| 178 | "protege los datos de sus clientes" | R2 |
| 183 | "Herramientas para abogados litigantes … que reducen horas de trabajo administrativo a minutos …" | R2, R6 |
| 187 | "Agendar demo gratuita" | R5 |
| 188 | "Prueba el asistente" → TutelaBot (fork de otro autor, sin crédito) | R3 |
| 192–194 | Cifra "10+ años de experiencia en la Rama Judicial" | R9 |
| 196–198 | "6 Herramientas especializadas" | R2 |
| 200–202 | "Nacional — Agilex implementado en el país" | R3 |

### A.4 Trust bar (218–239)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 222–223 | Logo JusticIALab + "Ganador JusticIALab 2024" (se reubica en RC-04 con atribución al equipo) | R8 |
| 226–227 | Logo Legal Hackers + "Mapa de Innovación Legal" (se reubica en RC-04 como texto con atribución correcta, D11) | R8 |
| 230–231 | Logo Rama Judicial + "+10 años en la Rama Judicial" | R8 |
| 234–235 | Logo Agilex con alt "Sistema en producción nacional" + "Agilex en producción nacional" | R3 |

### A.5 Pipeline (242–288)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 244–247 | "Plataforma integral", "Una plataforma para todo su litigio", "cada fase de su trabajo tiene una herramienta especializada" | R2 |
| 257 | "Sentencias similares en segundos" | R6 |
| 266 | "Documentos completos con IA" | R6 |
| 275 | "Datos protegidos automáticamente" | R3 |
| 284 | "Elimine tareas repetitivas" | R6 |

### A.6 Servicios (291–387)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 293–296 | "Servicios", "6 soluciones que transforman su práctica jurídica", "libera su tiempo para lo que realmente importa: litigar" | R2, R6 |
| 305 | "Redacte una tutela en 15 minutos" | R6 |
| 306 | "asistente virtual privado entrenado … protege la confidencialidad de sus datos" | R3 |
| 307 | "Desde $150.000 COP/mes" | R1 |
| 309, 325, 351, 364, 377 | Estado "En producción" | R3 |
| 312, 327, 340, 353, 366, 380 | "Solicitar demo" | R5 |
| 313 | "Probar ahora" → TutelaBot sin crédito al autor original | R3 |
| 321 | "Encuentre jurisprudencia similar en 30 segundos" | R6 |
| 322 | Descripción del buscador (Sherlock, repo privado) | R3 |
| 323 | "Desde $80.000 COP / 50 consultas" | R1 |
| 334 | "Anonimice 200 páginas en 3 minutos" | R6 |
| 335 | "100% local … Cumple Ley 1581/2012" | R3, R6 |
| 336 | "Desde $200.000 COP (pago único)" | R1 |
| 345–348 | "Automatización de Procesos … Software construido alrededor de cómo usted trabaja hoy" | R2 |
| 349 | "Desde $500.000 COP por proyecto" | R1 |
| 358–361 | "Generador de Documentos … la misma tecnología usada por tribunales de EE.UU." | R2, R3 |
| 362 | "Setup desde $800.000 COP" | R1 |
| 371–374 | "Consultoría LegalTech e IA … sesiones personalizadas para firmas y despachos … implementación acompañada" | R2 |
| 375 | "Desde $300.000 COP/sesión" | R1 |
| 381 | "Ver demo IA" (DisciplinaJudicialAI se reubica en RC-04) | R9 |

### A.7 Cómo funciona (390–437)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 393–395 | "Del primer contacto a la solución en 4 pasos … empiece a ahorrar tiempo desde la primera semana" | R5, R6 |
| 405–406 | "Agende una demo de 20 min" | R5 |
| 413–430 | "Evaluamos su necesidad", "Implementamos la solución … capacitación incluida", "Soporte y evolución continua" | R2 |

### A.8 Comparativa (440–469)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 443–445 | "Antes vs. después de Sprint Judicial", "Resultados típicos de abogados que usan nuestras herramientas" | R6 |
| 452–464 | Tiempos "2-4 horas", "3-5 horas", "5 minutos", "15 minutos", "30 segundos", "en tiempo real" | R6 |

### A.9 ¿Por qué Sprint Judicial? (472–514)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 477 | "No somos una startup de Silicon Valley …" (se presenta como empresa) | R2 |
| 486 | "Más de 10 años … despachos" | R9 |
| 494 | "Sus datos nunca salen de su servidor. Cumplimiento con Ley 1581/2012" | R3 |
| 502 | "Adaptado al marco legal colombiano. No es un producto genérico importado" | R2 |
| 510 | "Sin vendor lock-in, sin suscripciones eternas. Usted es dueño de su tecnología" | R1, R2 |

### A.10 Credenciales (517–561)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 520–522 | "No es una promesa. Es un historial comprobado … reconocidas a nivel nacional" | R3 |
| 531–532 | "Ganador JusticIALab" sin año ni equipo (se reubica en RC-04) | R9 |
| 539–540 | "Incluido por Legal Hackers Colombia …" (atribución incorrecta; se reubica en RC-04 como Legal Hackers Medellín y ALTCO, D11) | R3, R9 |
| 547–548 | "Conferencista" (se reubica en RC-06) | R9 |
| 555–556 | "Agilex en Producción … implementada a nivel nacional en la Rama Judicial" | R3 |

### A.11 CTA intermedio y Seguridad (564–617)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 567 | "¿Listo para transformar su práctica jurídica?" | R5 |
| 568 | "ahorrarle horas de trabajo cada semana" | R6 |
| 569 | "Agendar demo gratuita" | R5 |
| 578–580 | "Sus datos están protegidos. Siempre." | R3 |
| 589 | "Cumplimiento total con la ley de protección de datos personales" | R3 |
| 597 | "Alineado con la política nacional de inteligencia artificial (CONPES 3975)" | R3 |
| 605 | "Funciona completamente en su computador" | R3 |
| 613 | "Sus documentos y consultas nunca se usan para entrenar modelos" | R3 |

### A.12 Sobre mí y Tu primer mes (620–687)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 627 | "No soy un desarrollador externo que intenta venderle tecnología al sector legal …" | R2 |
| 630 | "(desde Escribiente hasta Técnico en Sistemas)" | R4 |
| 631–634 | Formación y "Docente universitario en Sistemas Operativos, Algoritmos y Estructuras de Datos" (trayectoria → portafolio, D7) | R9 |
| 640 | "Especialista en LegalTech e IA" | R3 |
| 641 | "nace de un problema real que he vivido … dentro de los despachos judiciales" | R4 |
| 656–658 | "Tu primer mes con Sprint Judicial … De la demo a una práctica transformada en 30 días" | R5, R6 |
| 664–665 | "Demo personalizada … Sin costo" | R5 |
| 670–677 | "Configuramos su asistente", "Primer documento con IA" | R2 |
| 683 | "Horas ahorradas cada semana" | R6 |

### A.13 FAQ (690–744; mismo contenido que el `FAQPage` de 63–119)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 693–695 | "Las preguntas más comunes de abogados que evalúan nuestras herramientas" | R2 |
| 710 | "Absolutamente … cifrado punto a punto y cumple con la Ley 1581" | R3 |
| 717 | "incluimos capacitación personalizada" | R2 |
| 724 | "no es un SaaS genérico …" | R2 |
| 729–731 | "¿Cuánto cuesta …? … desde $80.000 COP … demo gratuita de 20 minutos" | R1, R5 |
| 738 | "El Asistente IA se puede entrenar con la jurisprudencia … de su área" | R2, R3 |

### A.14 Contacto, footer y flotantes (766–847)

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 768–771 | "Empecemos", "Agende una demo gratuita de 20 minutos … Sin costo, sin compromiso" | R5 |
| 774 | WhatsApp personal "me interesa conocer las herramientas de IA para abogados" | R7 |
| 777 | Asunto "Demo Sprint Judicial" | R5 |
| 779 | "También puede llamar al 301 577 1258" | R7 |
| 792 | "Herramientas … diseñadas para abogados litigantes en Colombia" | R2 |
| 800–808 | Columna "Servicios" (incluye "Consultoría LegalTech") | R2 |
| 817 | links.sprintjudicial.com (pendiente de revisión, §10) | R9 |
| 818–821 | Enlaces a secciones eliminadas | R9 |
| 830 | WhatsApp personal | R7 |
| 840 | "© 2026 Sprint Judicial — … Medellín, Antioquia, Colombia" | R9 |
| 845–847 | Botón flotante de WhatsApp personal | R7 |

### A.15 `js/main.js`

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 11, 23–25, 151–207 | `ANIMATION_DURATION`, `easeOutQuad`, `animateCounter`, `initCounters` | R9 |
| 461–482 | `initHeroRotator` | R9 |
| 491, 495 | Llamadas `initCounters()` e `initHeroRotator()` en `init` | R9 |

### A.16 `README.md`

| Línea(s) | Contenido eliminado | Razón |
|----------|---------------------|-------|
| 3 | "IA y automatización para abogados litigantes en Colombia" | R2 |
| 5 | "ecosistema de 6 herramientas LegalTech" | R2 |
| 13, 17 | "no es una plataforma SaaS genérica", "sin dependencia del proveedor" | R2 |
| 15 | "(Escribiente, Citador, Asistente Judicial, Técnico en Sistemas)" | R4 |
| 16 | "Ningún dato del cliente sale de su infraestructura. Cumple Ley 1581/2012, CONPES 3975 …" | R2, R3 |
| 36–45 | Tabla "Servicios del ecosistema" (incluye "En producción nacional" y "Consultoría") | R2, R3 |
| 74, 76 | `js/analytics.js` y `assets/` (no existen) | T |
| 128 | "Agilex en producción — Implementado a nivel nacional, 293+ commits, 8 releases" | R3 |
| 129 | "Sherlock en producción — CSJ Bello — 981 tests, NER F1: 85.3% …" | R4, R6 |
| 158 | "+10 años Rama Judicial de Colombia" | R9 |
| 163 | WhatsApp personal con mensaje comercial | R7 |

### A.17 `llms.txt` y `package.json`

| Archivo:línea | Contenido eliminado | Razón |
|---------------|---------------------|-------|
| `llms.txt`:3 | "IA y Automatización para Abogados Litigantes en Colombia" | R2 |
| `llms.txt`:5 | "plataforma LegalTech que ofrece herramientas …" | R2 |
| `llms.txt`:7–14 | Lista "Servicios" (productos que no corresponden a repos públicos) | R2, R3 |
| `llms.txt`:23 | `wa.me/573128abordar` (enlace roto) | R7, T |
| `package.json`:4 | "Landing page - IA y Automatización para Abogados Litigantes" | R2 |

---

## Anexo B: Checklist final

Se marca solo con evidencia (salida de `test-compliance.js` o búsqueda en el diff).

| # | La página no contiene… | Verificación automática | Evidencia |
|---|------------------------|-------------------------|-----------|
| 1 | Precios | Grupo "Precios" (RV-01) | ✅ PASS: [index.html] Sin Precios (y archivos públicos) |
| 2 | Botones de pago, compra o suscripción | Grupos "Precios" y "Venta" | ✅ PASS: [index.html] Sin Precios; PASS: [index.html] Sin Venta (y archivos públicos) |
| 3 | La palabra "servicios" en sentido comercial | `\bservicios?\b` con lista de permitidos | ✅ PASS: [index.html] Sin Venta (y archivos públicos) |
| 4 | "Consultoría" | `\bconsultor…` | ✅ PASS: [index.html] Sin Venta (y archivos públicos) |
| 5 | "Cotización" | `\bcotiza` | ✅ PASS: [index.html] Sin Venta (y archivos públicos) |
| 6 | Claims de adopción nacional | Grupo "Claims" | ✅ PASS: [index.html] Sin Claims (y archivos públicos) |
| 7 | El premio 2025 | `justicialab 2025` | ✅ PASS: [index.html] Sin Claims (y archivos públicos) |
| 8 | Datos del lugar de trabajo | Grupo "Lugar de trabajo" | ✅ PASS: [index.html] Sin Lugar de trabajo (y archivos públicos) |
| 9 | Donaciones o mecanismos de recaudo | Grupo "Recaudo" | ✅ PASS: [index.html] Sin Recaudo (y archivos públicos) |
| 10 | Verbos de venta | Grupo "Venta" | ✅ PASS: [index.html] Sin Venta (y archivos públicos) |
| 11 | Teléfono o WhatsApp personal | Grupo "Contacto comercial" | ✅ PASS: [index.html] Sin Contacto comercial (y archivos públicos) |
| 12 | Schema.org comercial | Grupo "Schema comercial" | ✅ PASS: [index.html] Sin Schema comercial |
