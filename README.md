# Sprint Judicial

**IA y automatización para abogados litigantes en Colombia.**

Landing page pública de un ecosistema de 6 herramientas LegalTech construidas por un ingeniero con +10 años de experiencia dentro de la Rama Judicial.

**Sitio en producción**: [sprintjudicial.com](https://sprintjudicial.com)

---

## El proyecto

Sprint Judicial no es una plataforma SaaS genérica. Se diferencia en 4 ejes:

- **Hecho desde adentro** — desarrollado por alguien que ha trabajado en juzgados colombianos (Escribiente, Citador, Asistente Judicial, Técnico en Sistemas).
- **Seguridad como obsesión** — todo funciona en local o en servidores privados. Ningún dato del cliente sale de su infraestructura. Cumple Ley 1581/2012, CONPES 3975 y Acuerdo PCSJA24-12243.
- **Código abierto / caja blanca** — sin vendor lock-in, sin dependencia del proveedor.
- **Adaptado a Colombia** — normatividad, flujos judiciales y realidad operativa colombiana.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 / CSS3 / JavaScript vanilla |
| Tipografía | Source Serif 4 + Inter |
| Servidor | nginx (alpine) con security headers OWASP |
| Deploy | Docker / hosting estático |
| Analytics | Sin Google Analytics (privacy-first) |

Zero dependencias JS. No jQuery, no Bootstrap, no React.

---

## Servicios del ecosistema

| # | Servicio | Estado |
|---|----------|--------|
| 1 | Asistente Legal IA (TutelaBot, TYBABot) | En producción |
| 2 | Buscador Inteligente / Memoria Institucional (Sherlock) | En producción |
| 3 | Anonimizador de Documentos Legales | En desarrollo |
| 4 | Automatización de Procesos a Medida (Agilex) | En producción nacional |
| 5 | Generador Inteligente de Documentos | Servidor operativo |
| 6 | Consultoría y formación en IA legal | Activo |

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

---

## Estructura del repositorio

```
main-sprintjudicial/
├── index.html              # Landing page (single page)
├── css/
│   ├── styles.css          # Estilos BEM + design tokens
│   └── animations.css      # Keyframes y animaciones
├── js/
│   ├── main.js             # Lógica de UI (Module Pattern)
│   └── analytics.js        # Tracking placeholder
├── src/                    # Logos e imágenes de marca
├── assets/                 # Recursos estáticos
├── nginx/
│   └── default.conf        # Security headers + gzip + cache
├── docs/                   # Specs, research, plans, ADRs
│   ├── ROADMAP.md
│   ├── specs/
│   ├── research/
│   ├── architecture/
│   └── plans/
├── agent_docs/             # Documentación técnica para desarrollo con IA
├── Dockerfile
├── robots.txt
├── sitemap.xml
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
--gold: #F59E0B;        /* Badges y reconocimientos */
--green: #10B981;       /* CTAs y estados positivos */
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

## Credenciales verificables

| Credencial | Detalle |
|-----------|---------|
| Ganador JusticIALab 2024 | Primer Concurso Nacional de Innovación de la Rama Judicial — Proyecto MARDUK |
| Mapa de Innovación Legal 2023 | Legal Hackers Colombia, sección "Automatización Documental y de Procesos" |
| Conferencista 2024 | Jornada Académica sobre IA y Justicia — Colegio de Jueces y Fiscales de Antioquia |
| Agilex en producción | Implementado a nivel nacional, 293+ commits, 8 releases |
| Sherlock en producción | CSJ Bello — 981 tests, NER F1: 85.3%, latencia <200ms |

---

## Documentación

| Necesitas... | Consulta |
|-------------|----------|
| Convenciones de código | `agent_docs/code_conventions.md` |
| Arquitectura y decisiones técnicas | `agent_docs/architecture.md` |
| Design system completo | `agent_docs/design_system.md` |
| Patrones UX / accesibilidad | `agent_docs/ux_patterns.md` |
| SEO y meta tags | `agent_docs/seo.md` |
| Roadmap y estado del proyecto | `docs/ROADMAP.md` |
| Contexto de negocio | `docs/others/CONTEXTO_SPRINT_JUDICIAL.md` |

---

## Seguridad

- CSP estricto, HSTS, X-Frame-Options, Permissions-Policy (ver `nginx/default.conf`)
- Sin inline event handlers
- Inputs sanitizados con DOM API (no `innerHTML`)
- Auditoría Nessus documentada en `docs/architecture/ADR-001-informe-seguridad.md`

---

## Contacto

**Daniel Arbelaez Alvarez** — Ingeniero de Software, +10 años Rama Judicial de Colombia

- Blog: [blog.sprintjudicial.com](https://blog.sprintjudicial.com)
- LinkedIn: [linkedin.com/in/daniel-arbelaez-](https://linkedin.com/in/daniel-arbelaez-)
- GitHub: [github.com/HammerDev99](https://github.com/HammerDev99)
- WhatsApp: [+57 301 577 1258](https://wa.me/573015771258?text=Hola%20Daniel%2C%20me%20interesa%20conocer%20las%20herramientas%20de%20IA%20para%20abogados.)

---

*"La IA asiste, no decide. Todo dato extraído requiere validación humana."*
