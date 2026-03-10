# Sprint Judicial — Contract Driven AI Development

## Estructura de documentación

Este directorio contiene toda la documentación de especificaciones, planificación y análisis
que guía el desarrollo de Sprint Judicial bajo un enfoque **Spec Driven Development**.

```
docs/
├── README.md                    # Este archivo
├── ROADMAP.md                   # Hoja de ruta general del proyecto
├── specs/
│   ├── SPEC-001-landing-v2.md   # Especificación: Landing Page v2
│   ├── SPEC-002-services.md     # Especificación: Nuevos servicios
│   └── SPEC-003-platform.md     # Especificación: Evolución a plataforma
├── research/
│   ├── RES-001-legaltech-benchmark.md  # Benchmarking internacional
│   └── RES-002-colombia-market.md      # Estado del mercado colombiano
├── architecture/
│   ├── ADR-001-tech-stack.md    # Decision Record: Stack tecnológico
│   ├── ADR-002-file-structure.md # Decision Record: Estructura de archivos
│   └── PATTERNS.md              # Patrones de diseño aplicados
└── plans/
    ├── PLAN-001-ux-ui.md        # Plan: Mejoras UX/UI
    ├── PLAN-002-refactor.md     # Plan: Refactoring y arquitectura
    └── PLAN-003-new-features.md # Plan: Nuevas funcionalidades
```

## Convenciones

- **SPEC-XXX**: Especificaciones contractuales (qué se debe construir)
- **RES-XXX**: Investigaciones y análisis de mercado
- **ADR-XXX**: Architecture Decision Records (decisiones técnicas)
- **PLAN-XXX**: Planes de ejecución con tareas priorizadas

## Flujo de trabajo

1. La investigación (RES) informa las especificaciones (SPEC)
2. Las especificaciones generan decisiones de arquitectura (ADR)
3. Las decisiones se ejecutan mediante planes (PLAN)
4. El ROADMAP consolida la visión general y el estado de cada fase

## Skills disponibles para desarrollo

- `.claude/skills/design-patterns/` — GoF patterns, SOLID, code smell → pattern mapping
- `.claude/skills/refactoring/` — 22 code smells, 66 técnicas de refactoring
