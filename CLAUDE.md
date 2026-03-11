# CLAUDE.md — Sprint Judicial

Plataforma LegalTech de IA y automatización para abogados litigantes en Colombia.
Landing page pública en sprintjudicial.com, ecosistema de 6 servicios.

## Stack

- **Frontend**: HTML5 / CSS3 / JavaScript vanilla (sin frameworks)
- **Diseño**: Tema oscuro premium, Source Serif 4 + Inter
- **Deploy**: Hosting estático (Dockerfile disponible)
- **Producción**: sprintjudicial.com
- **Subdominios**: blog.sprintjudicial.com | links.sprintjudicial.com | docs.sherlock.sprintjudicial.com

## Convenciones (obligatorias)

- Responder en español, código en inglés
- HTML semántico: `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`
- CSS: metodología BEM, custom properties para design tokens
- JS: Module Pattern (IIFE), sin dependencias externas
- Commits en español: `tipo(alcance): descripción`
- Accesibilidad: WCAG 2.1 AA mínimo, aria-labels, contraste 4.5:1
- Performance: Lighthouse > 90, font-display: swap

> **Detalle completo**: `agent_docs/code_conventions.md`

## Estructura

```
main-sprintjudicial/
├── CLAUDE.md                    # Este archivo (mapa del proyecto)
├── docs/others/CONTEXTO_SPRINT_JUDICIAL.md  # Contexto de negocio
├── agent_docs/                  # Documentación detallada por tema
├── index.html                   # Landing page principal
├── css/
│   ├── styles.css               # Estilos principales (BEM)
│   └── animations.css           # Keyframes y animaciones
├── js/
│   ├── main.js                  # Lógica de UI
│   └── analytics.js             # Tracking (placeholder)
├── nginx/
│   └── default.conf             # Security headers + performance (OWASP)
├── src/                         # Logos e imágenes de marca (trust-bar)
├── assets/                      # Imágenes y recursos
├── docs/                        # Specs, research, plans, ADRs
│   ├── ROADMAP.md               # Hoja de ruta general
│   ├── specs/                   # Especificaciones contractuales
│   ├── research/                # Investigaciones de mercado
│   ├── architecture/            # Architecture Decision Records
│   └── plans/                   # Planes de ejecución
├── .claude/skills/              # Skills de desarrollo
├── robots.txt
├── sitemap.xml
└── Dockerfile
```

## Quick Start

```bash
# Servir localmente
python -m http.server 8000
# o con Docker
docker build -t sprint-judicial . && docker run -p 80:80 sprint-judicial
```

## Restricciones del Proyecto

- **Zero dependencias JS**: No jQuery, no Bootstrap, no React. Vanilla only.
- **Single page**: Todo en una página (por ahora). Multi-página solo en Fase 3.
- **Tema oscuro**: Paleta fija definida en design tokens. No modo claro.
- **Privacidad**: No Google Analytics. Considerar Umami (privacy-first).
- **Seguridad como mensaje**: Todo diseño debe comunicar seguridad y confianza.
- **IA asiste, no decide**: Principio central del negocio, reflejado en copy y UX.

## Documentación por Tema (divulgación progresiva)

| Necesitas... | Consulta |
|-------------|----------|
| Convenciones código (BEM, JS, commits) | `agent_docs/code_conventions.md` |
| Arquitectura (estructura, patrones, decisiones) | `agent_docs/architecture.md` |
| Design system (tokens, paleta, tipografía, spacing) | `agent_docs/design_system.md` |
| UX/UI (patrones LegalTech, accesibilidad, responsive) | `agent_docs/ux_patterns.md` |
| Contexto de negocio (servicios, público, pricing) | `docs/others/CONTEXTO_SPRINT_JUDICIAL.md` |
| SEO y meta tags (OG, Twitter, Schema.org) | `agent_docs/seo.md` |
| Workflow CDAID (specs, checklists, compactación) | `agent_docs/workflow.md` |
| Estado proyecto (roadmap, sprints, métricas) | `docs/ROADMAP.md` |
| Investigación LegalTech (benchmarks, competidores) | `docs/research/RES-001-legaltech-benchmark.md` |
| Análisis estratégico (Aline.co, plan evolución) | `docs/research/RES-002-analisis-estrategico.md` |
| Especificaciones (contratos de lo que se debe construir) | `docs/specs/SPEC-001-landing-v2.md`, `SPEC-003` |
| Informe de seguridad (ADR, sprint futuro) | `docs/architecture/ADR-001-informe-seguridad.md` |
| Plan remediación seguridad servidor | `docs/plans/PLAN-005-security-remediation.md` |

## Design Tokens (referencia rápida)

```css
--deep: #0B1D33;  --navy: #152A4A;  --accent: #3B82F6;
--accent-light: #60A5FA;  --teal: #06B6D4;  --gold: #F59E0B;
--green: #10B981;  --surface: #0F2440;  --surface-light: #1A3558;
--text: #E2E8F0;  --text-muted: #94A3B8;  --white: #FFFFFF;
```

> **Detalle completo**: `agent_docs/design_system.md`

## Reglas Críticas (resumen)

1. **BEM**: Siempre `.block__element--modifier`, no clases genéricas
2. **Semántico**: HTML5 tags semánticos, no divs para todo
3. **Accesible**: aria-labels, focus visible, contraste AA, skip-to-content
4. **Performante**: No frameworks, font-display: swap, lazy loading
5. **Responsive**: Mobile first (320px → 768px → 1024px → 1440px)
6. **Seguro**: CSP headers (nginx/default.conf), HSTS, no inline event handlers, sanitizar inputs

## Skills Disponibles

| Skill | Uso |
|-------|-----|
| `.claude/skills/design-patterns/` | GoF patterns, SOLID, code smell → pattern mapping |
| `.claude/skills/refactoring/` | 22 code smells, 66 técnicas de refactoring |

## Estado Actual

```
Fase 0 - Landing v2:  [████████████████████] 100% ✅
Fase 1 - Contenido:   [███████████████████░] 95% (pendiente: testimonios, video, foto, uniformar logos trust-bar)
Fase 2 - Servicios:   [██░░░░░░░░░░░░░░░░░░] 10% (investigación)
```

| Métrica | Valor |
|---------|-------|
| Servicios definidos | 6 actuales + 7 propuestos |
| Specs completadas | SPEC-001 (landing), SPEC-002 (servicios), SPEC-003 (evolución estratégica ~85%) |
| Research completado | RES-001 (benchmark LegalTech), RES-002 (análisis estratégico) |
| Secciones landing | 19 (incluyendo pipeline, diferenciadores, seguridad, timeline) |
| Logos trust-bar | 4 (JusticIALab, Legal Hackers, Rama Judicial, Agilex) |

## Compact Instructions

Al compactar, SIEMPRE preservar:
- Las 6 reglas críticas de "Reglas Críticas"
- La tabla de divulgación progresiva (agent_docs/)
- El estado actual del proyecto (métricas y fases)
- Restricciones del proyecto
- Design tokens (paleta de colores)
- Convenciones de commits y código

---

**Versión**: 1.4
**Fecha**: 2026-03-10
