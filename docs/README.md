# Sprint Judicial — Índice de documentación

Especificaciones, planes, investigaciones y decisiones del sitio bajo enfoque Spec Driven Development. Desde SPEC-004 (2026-10-09) el sitio es un espacio personal y académico; los documentos de la etapa comercial se conservan como histórico.

## Estados

- **Vigente**: describe el sitio actual.
- **Histórico**: contexto de una etapa anterior, no guía el desarrollo.
- **Superado**: reemplazado por otro documento.

## Specs (`specs/`)

| Documento | Tema | Estado |
|-----------|------|--------|
| SPEC-001-landing-v2 | Landing v2 | Superado por SPEC-004 |
| SPEC-002-services | Nuevos servicios | Superado por SPEC-004 |
| SPEC-003-evolucion-estrategica | Evolución estratégica comercial | Superado por SPEC-004 |
| SPEC-004-reposicionamiento-academico | Reposicionamiento académico (reglas de contenido) | Vigente (presentación modificada por SPEC-005) |
| SPEC-005-estructura-visual | Estructura visual y dinamismo | Vigente |

## Plans (`plans/`)

| Documento | Tema | Estado |
|-----------|------|--------|
| PLAN-001-ux-ui, PLAN-002-refactor, PLAN-003-design-patterns, PLAN-004-ux-improvements | UX, refactor, patrones | Histórico |
| PLAN-005-security-remediation | Remediación de seguridad del servidor | Vigente (referencia operativa) |
| PLAN-006-reposicionamiento-academico | Ejecución de SPEC-004 | Vigente |
| PLAN-007-estructura-visual | Ejecución de SPEC-005 | Vigente |

## Research (`research/`)

| Documento | Tema | Estado |
|-----------|------|--------|
| RES-001-legaltech-benchmark | Benchmark LegalTech | Histórico |
| RES-002-analisis-estrategico | Análisis estratégico comercial | Histórico |
| RES-003-revision-diseno-portada | Revisión de diseño de la portada | Vigente |

## Architecture (`architecture/`)

| Documento | Tema | Estado |
|-----------|------|--------|
| ADR-001-informe-seguridad | Informe de seguridad (Nessus) | Vigente |

## Others (`others/`)

Material de contexto y archivo (`CONTEXTO_SPRINT_JUDICIAL.md`, `index_old.html`, notas de investigación). Histórico: refleja la etapa comercial.

## Otros archivos

- `ROADMAP.md`: hoja de ruta y estado de fases.
- Documentación técnica por tema: `../agent_docs/`.

## Convenciones

- **SPEC-XXX** qué se construye, **RES-XXX** investigaciones, **ADR-XXX** decisiones técnicas, **PLAN-XXX** ejecución.
- La investigación informa la spec, la spec genera el plan y el ROADMAP consolida el estado.
- Commits: `docs(alcance): descripción` en español.
