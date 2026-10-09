# Sprint Judicial

**Espacio personal y académico de Daniel Arbeláez Álvarez sobre automatización de trámites judiciales con software libre.**

Este repositorio contiene el sitio [sprintjudicial.com](https://sprintjudicial.com): herramientas de código abierto, mentoría abierta, docencia y escritos.

La portada abre con una frase rotativa que se puede pausar con el botón "Pausar animación" y que no rota si el sistema pide movimiento reducido (`js/rotator.js`). Sigue con las secciones Qué hago, Herramientas, Mentoría abierta, Docencia y conferencias y Escritos.

> Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad.

---

## Herramientas de código abierto

| Herramienta | Qué hace | Licencia | Enlaces |
|-------------|----------|----------|---------|
| AgilEx | Crea y diligencia el índice electrónico de un expediente a partir de los archivos de una carpeta | MIT | [Repositorio](https://github.com/HammerDev99/GestionExpedienteElectronico_Version1) · [Documentación](https://docs.agilex.sprintjudicial.com/) |
| TYBABot | Orienta sobre el uso de Justicia XXI Web (TYBA) | MIT | [Repositorio](https://github.com/HammerDev99/TYBABot) · [Demo](https://tybabot.streamlit.app) |
| DisciplinaJudicialAI | Orienta sobre el régimen disciplinario de los servidores judiciales | MIT | [Repositorio](https://github.com/HammerDev99/disciplinajudicialai) · [Demo](https://disciplinajudicialai.streamlit.app/) |

## Reconocimientos

- Ganador JusticIALab 2024 (equipo Marduk), categoría Justicia Basada en Datos — [fuente](https://www.ramajudicial.gov.co/web/consejo-superior-de-la-judicatura/-/construimos-la-justicia-del-futuro-con-el-primer-concurso-de-innovaci%C3%B3n-de-la-rama-judicial).
- Incluido en el Mapa de Innovación Legal en Colombia (Legal Hackers Medellín y ALTCO, 2023), categoría Automatización documental y de procesos.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 / CSS3 / JavaScript vanilla |
| Tipografía | Source Serif 4 + Inter |
| Servidor | nginx (alpine) con security headers OWASP |
| Deploy | Docker / hosting estático |
| Analítica | Sin Google Analytics (privacy-first) |

Zero dependencias JS. No jQuery, no Bootstrap, no React.

---

## Quick start

```bash
# Opción 1: servidor local (sin instalación)
python -m http.server 8000
# Abrir http://localhost:8000

# Opción 2: Docker
docker build -t sprint-judicial .
docker run -p 80:80 sprint-judicial
# Abrir http://localhost
```

## Tests

```bash
# Suite completa (solo Node, sin dependencias): 9 archivos de test
npm test

# Linters (requieren instalar las devDependencies)
npm install --no-package-lock
npx html-validate index.html
npx stylelint "css/**/*.css"
npx eslint js/
```

Los linters ya reportaban hallazgos antes de SPEC-004 (por ejemplo no-var en main.js); el criterio es no introducir reglas nuevas. Los role="list" son intencionales: restauran la semántica de lista en VoiceOver cuando se usa list-style: none (html-validate los marca como no-redundant-role).

Los 9 tests (`tests/`): `test-structure`, `test-accessibility`, `test-seo`, `test-css`, `test-links`, `test-compliance`, `test-js-selectors`, `test-css-usage` y `test-rotator`. El runner es `tests/run-all.js`.

`tests/test-compliance.js` verifica las reglas de contenido de `docs/specs/SPEC-004-reposicionamiento-academico.md` sobre los archivos públicos.

---

## Estructura del repositorio

```
main-sprintjudicial/
├── index.html              # Página única
├── css/
│   ├── styles.css          # Estilos BEM + design tokens
│   └── animations.css      # Keyframes y animaciones
├── js/
│   ├── rotator.js          # Frase rotativa del hero (pausable, exportable a Node)
│   └── main.js             # Lógica de UI (Module Pattern)
├── src/                    # Logo de AgilEx
├── nginx/
│   └── default.conf        # Security headers + gzip + cache
├── tests/                  # 9 tests Node + run-all.js (estructura, a11y, SEO, CSS,
│                           #   enlaces, cumplimiento, selectores JS, CSS sin uso, rotador)
├── docs/                   # Specs, research, plans, ADRs
├── agent_docs/             # Documentación técnica para desarrollo con IA
├── Dockerfile
├── robots.txt
├── sitemap.xml
├── llms.txt
├── humans.txt
├── security.txt
└── CLAUDE.md               # Instrucciones para Claude Code
```

---

## Design tokens

```css
--deep: #0B1D33;        /* Fondo principal */
--navy: #152A4A;        /* Superficies */
--accent: #3B82F6;      /* Azul primario */
--teal: #06B6D4;        /* Acentos secundarios */
--gold: #F59E0B;        /* Avisos y reconocimientos */
--green: #10B981;       /* Estados positivos */
--text: #E2E8F0;        /* Texto principal */
--text-muted: #94A3B8;  /* Texto secundario */
```

---

## Convenciones de código

- **CSS**: metodología BEM (`.block__element--modifier`), custom properties para tokens
- **JS**: Module Pattern (IIFE), sin dependencias externas
- **HTML**: semántico — `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`
- **Accesibilidad**: WCAG 2.1 AA mínimo, `aria-label`, contraste 4.5:1, `skip-to-content`
- **Responsive**: mobile-first (320px → 768px → 1024px → 1440px)
- **Commits**: `tipo(alcance): descripción en español`

---

## Documentación

| Necesitas... | Consulta |
|-------------|----------|
| Convenciones de código | `agent_docs/code_conventions.md` |
| Arquitectura y decisiones técnicas | `agent_docs/architecture.md` |
| Design system completo | `agent_docs/design_system.md` |
| Patrones UX / accesibilidad | `agent_docs/ux_patterns.md` |
| SEO y meta tags | `agent_docs/seo.md` |
| Reposicionamiento del sitio | `docs/specs/SPEC-004-reposicionamiento-academico.md` |
| Estructura visual y dinamismo | `docs/specs/SPEC-005-estructura-visual.md` |
| Índice y hoja de ruta | `docs/README.md` · `docs/ROADMAP.md` |

---

## Seguridad

- CSP estricto, HSTS, X-Frame-Options, Permissions-Policy (ver `nginx/default.conf`)
- Sin inline event handlers
- Contenido externo insertado con DOM API (no `innerHTML`)
- Auditoría Nessus documentada en `docs/architecture/ADR-001-informe-seguridad.md`

---

## Licencia

Los contenidos del sitio se publican bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es). El código de cada herramienta conserva su propia licencia.

## Contacto

**Daniel Arbeláez Álvarez** — Ingeniero de software

- Correo: [contacto@sprintjudicial.com](mailto:contacto@sprintjudicial.com)
- LinkedIn: [linkedin.com/in/daniel-arbelaez-](https://www.linkedin.com/in/daniel-arbelaez-)
- GitHub: [github.com/HammerDev99](https://github.com/HammerDev99)
- Blog: [blog.sprintjudicial.com](https://blog.sprintjudicial.com)
- Portafolio: [portfolio.sprintjudicial.com](https://portfolio.sprintjudicial.com/)
- Google Scholar: [perfil](https://scholar.google.com/citations?user=T5zXXTcAAAAJ)

---

*"La IA asiste; la decisión es humana."*
