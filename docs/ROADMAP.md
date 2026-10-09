# Sprint Judicial — Roadmap

> Última actualización: 2026-10-09

## Visión

Mantener sprintjudicial.com como espacio personal y académico: software libre, mentoría abierta, docencia y escritos sobre automatización de trámites judiciales. El sitio no ofrece servicios comerciales ni recibe pagos.

## Fases completadas

| Fase | Resultado | Fecha | Referencia |
|------|-----------|-------|------------|
| Landing v2 | Separación CSS/JS, BEM, accesibilidad, SEO, headers de seguridad nginx | 2026-03-10 | SPEC-001 (superada), PLAN-005 |
| Reposicionamiento académico | Contenido reescrito como espacio personal; reglas de contenido verificadas por tests | 2026-10-09 | SPEC-004, PLAN-006 |
| Estructura visual y dinamismo | Secciones en bloques con tarjetas, banda de reconocimientos, hero con frase rotativa pausable, microinteracciones | 2026-10-09 | SPEC-005, PLAN-007, RES-003 |

## Próximos pasos

| Tarea | Estado | Nota |
|-------|--------|------|
| Agregar Relevo, PrismaRPA y HabeasSafe a Herramientas | Pendiente | Solo con repo público, licencia y sin datos laborales |
| Revisar docs en otros repos y sitios | Pendiente | links.sprintjudicial.com, portfolio.sprintjudicial.com, hammerdev99.github.io, repos Relevo, justicia-sana y gexcom-docs-site |
| og-image para redes sociales | Pendiente | Requiere el asset |
| Linters: reducir hallazgos heredados | Opcional | no-var en main.js, prefijos -webkit- |

## Métricas actuales

| Métrica | Valor |
|---------|-------|
| Tests (`npm test`) | 235 passed, 0 failed (9 archivos) |
| Secciones de la portada | Hero, Qué hago, Herramientas (con Reconocimientos), Mentoría abierta, Docencia y conferencias, Escritos, Pie |
| Herramientas publicadas | 3 (AgilEx, TYBABot, DisciplinaJudicialAI), licencia MIT |
| Dependencias en producción | 0 |

## Histórico

Las fases comerciales anteriores (servicios nuevos, plataforma, migración a framework) quedaron fuera del alcance con SPEC-004. Su contexto sigue en SPEC-002, SPEC-003, RES-001 y RES-002.
