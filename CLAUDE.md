# CLAUDE.md — Sprint Judicial

Espacio personal y académico de Daniel Arbeláez Álvarez (ingeniero de software) en sprintjudicial.com. Enseña y documenta cómo automatizar trámites judiciales con software libre. No es un sitio comercial: no vende, no cotiza, no recibe pagos.

## Restricciones de contenido (obligatorias)

El autor es servidor de la Rama Judicial (Ley 270/1996 art. 151 y 154; Const. art. 127; C.Co. art. 13.3). En documentos vivos (index.html, llms.txt, humans.txt, README.md, package.json) NO debe aparecer:

- Precios, planes, "servicios" comerciales, consultoría ni cotizaciones.
- Claims de adopción ("nivel nacional", "en producción nacional") ni cifras sin fuente.
- Datos del lugar de trabajo (Bello, Centro de Servicios, cargos), nombres de colegas.
- WhatsApp o teléfono personal, donaciones.

La docencia y las conferencias son el único canal remunerado admitido y se presentan como invitación académica (correo contacto@sprintjudicial.com y LinkedIn). La nota de transparencia del pie es literal y no se reescribe. `tests/test-compliance.js` hace cumplir estas reglas.

Principios de fondo: **IA asiste, no decide** (reflejado en copy y UX) y **seguridad como mensaje** (todo diseño comunica confianza).

## Stack

- HTML5 / CSS3 (BEM, tokens en `:root`) / JavaScript vanilla, sin dependencias en producción.
- Tipografía Source Serif 4 + Inter. Tema oscuro fijo, sin modo claro.
- nginx (alpine) en Docker. Sin Google Analytics.
- Producción: sprintjudicial.com | blog.sprintjudicial.com | portfolio.sprintjudicial.com | docs.agilex.sprintjudicial.com

## Convenciones (obligatorias)

- Responder en español, código en inglés. Texto con entidades HTML (`&aacute;`, etc.) como en el resto del HTML.
- HTML semántico: `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`.
- CSS: BEM, custom properties, ITCSS, mobile first (base 320 → 768 → 1024).
- JS: Module Pattern (IIFE), sin dependencias. `js/rotator.js` exporta `HeroRotator.create(options)` y también a Node.
- Commits en español: `tipo(alcance): descripción`.
- Accesibilidad: WCAG 2.1 AA mínimo (rotador pausable, WCAG 2.2.2; sin rotación con prefers-reduced-motion), contraste 4,5:1.
- Performance: font-display: swap, sin frameworks.

> Detalle: `agent_docs/code_conventions.md`

## Estructura

```
main-sprintjudicial/
├── CLAUDE.md                # Este archivo (mapa del proyecto)
├── README.md                # Presentación pública del repo
├── index.html               # Portada (página única)
├── css/
│   ├── styles.css           # Estilos ITCSS + BEM, tokens
│   └── animations.css       # Keyframes y .reveal*
├── js/
│   ├── main.js              # IIFE SprintJudicial: navbar, animaciones, scroll, nav activa, feed RSS, rotador
│   └── rotator.js           # HeroRotator (frase rotativa pausable)
├── src/                     # Logo de AgilEx
├── nginx/default.conf       # CSP estricta, HSTS, gzip, cache
├── tests/                   # 9 tests Node + run-all.js
├── agent_docs/              # Documentación técnica por tema
├── docs/                    # specs, plans, research, architecture, others
├── Dockerfile
└── llms.txt, humans.txt, robots.txt, sitemap.xml, security.txt
```

Secciones de la portada: Hero (frase rotativa, botón "Pausar animación", 3 fichas) → Qué hago → Herramientas (AgilEx, TYBABot, DisciplinaJudicialAI, MIT; banda `#reconocimientos`) → Mentoría abierta → Docencia y conferencias → Escritos (blog RSS + artículo) → Pie (CC BY 4.0, nota de transparencia).

## Quick Start, tests y despliegue

```bash
python -m http.server 8000            # servir localmente
docker build -t sprint-judicial . && docker run -p 80:80 sprint-judicial
npm test                              # 9 tests Node, formato PASS/FAIL
npm install --no-package-lock         # solo para linters
npx html-validate index.html && npx stylelint "css/**/*.css" && npx eslint js/
```

Tests: structure, accessibility, seo, css, links, compliance, js-selectors, css-usage, rotator. Linters: no introducir reglas nuevas respecto a la línea base (heredados: no-var en main.js, no-redundant-role por `role="list"` intencional para VoiceOver, prefijos -webkit-).

Despliegue: un push a `main` en GitHub dispara un webhook al panel del autor (`panel.sprintjudicial.com`) que redepliega con Docker/nginx. No hay GitHub Actions. Verificar que el Dockerfile copie todos los directorios con assets (`src/`, `js/`, `css/`, `nginx/`).

## Documentación por tema (divulgación progresiva)

| Necesitas... | Consulta |
|-------------|----------|
| Convenciones (BEM, JS, commits) | `agent_docs/code_conventions.md` |
| Arquitectura | `agent_docs/architecture.md` |
| Design system | `agent_docs/design_system.md` |
| UX y accesibilidad | `agent_docs/ux_patterns.md` |
| SEO y meta tags | `agent_docs/seo.md` |
| Workflow CDAID | `agent_docs/workflow.md` |
| Métricas de verificación | `agent_docs/verification_metrics.md` |
| Índice y hoja de ruta | `docs/README.md`, `docs/ROADMAP.md` |
| Reposicionamiento académico (vigente) | `docs/specs/SPEC-004-reposicionamiento-academico.md`, `docs/plans/PLAN-006-reposicionamiento-academico.md` |
| Estructura visual y dinamismo (vigente) | `docs/specs/SPEC-005-estructura-visual.md`, `docs/plans/PLAN-007-estructura-visual.md`, `docs/research/RES-003-revision-diseno-portada.md` |
| Seguridad | `docs/architecture/ADR-001-informe-seguridad.md`, `docs/plans/PLAN-005-security-remediation.md` |
| Histórico (contexto comercial superado) | SPEC-001, SPEC-002, SPEC-003, RES-001, RES-002, PLAN-001..004 |

## Design Tokens (`:root` de css/styles.css)

```css
--deep: #0B1D33;  --navy: #152A4A;  --accent: #3B82F6;  --accent-light: #60A5FA;
--teal: #06B6D4;  --gold: #F59E0B;  --green: #10B981;  --purple: #8B5CF6;  --red: #EF4444;
--surface: #0F2440;  --surface-light: #1A3558;
--text: #E2E8F0;  --text-muted: #94A3B8;  --white: #FFFFFF;
--font-display: 'Source Serif 4', serif;  --font-body: 'Inter', sans-serif;
--container-max: 1100px;  --nav-height: 64px;
```

## Reglas Críticas

1. **BEM**: `.block__element--modifier`; sin clases muertas (test-css-usage).
2. **Semántico**: tags HTML5 semánticos.
3. **Accesible**: aria-labels, foco visible, contraste AA (botón primario 4,61:1), skip-to-content, animación pausable.
4. **Sin dependencias**: vanilla, sin frameworks.
5. **Mobile first**: 320 → 768 → 1024.
6. **Seguro**: CSP (nginx), HSTS, sin inline handlers, contenido externo con DOM API (nunca innerHTML).
7. **Contenido**: respetar las restricciones de arriba y correr `npm test` antes de commitear.

## Estado Actual

```
Reposicionamiento académico (SPEC-004):   ✅ 2026-10-09
Estructura visual y dinamismo (SPEC-005): ✅ 2026-10-09
Pendientes: Relevo / PrismaRPA / HabeasSafe (con repo público, licencia, sin datos laborales),
            revisión de docs en otros repos y sitios, og-image
```

| Métrica | Valor |
|---------|-------|
| Tests | 235 passed, 0 failed |
| Herramientas publicadas | 3 (AgilEx, TYBABot, DisciplinaJudicialAI), MIT |
| Secciones de la portada | Hero + 5 + pie |

## Compact Instructions

Al compactar, SIEMPRE preservar: restricciones de contenido, principios (IA asiste, no decide; seguridad como mensaje), reglas críticas, tabla de divulgación progresiva, estado actual (fases y pendientes), design tokens, convenciones de código y commits, y el flujo de despliegue por webhook.

---

**Versión**: 2.0
**Fecha**: 2026-10-09
