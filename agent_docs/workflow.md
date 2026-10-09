# Workflow CDAID — Sprint Judicial

CDAID (Contract Driven AI Development) es el flujo del proyecto: primero el contrato (spec), después el plan, después el código. Así se ejecutaron SPEC-004 y SPEC-005.

```
brainstorming → SPEC → PLAN → ejecución con TDD → revisión final → merge a main → push
```

## Pasos

### 1. Brainstorming
Se aclara la intención y las restricciones antes de escribir nada. En SPEC-004 la restricción central fue que el autor es servidor de la Rama Judicial: el sitio no puede ofrecer servicios comerciales. Las investigaciones (`RES-XXX`) quedan en `docs/research/` (p. ej. RES-003, revisión de diseño de la portada).

### 2. Spec (`docs/specs/SPEC-XXX-nombre.md`)
Define requisitos, criterios de aceptación y qué queda fuera. Estados: Pendiente, En progreso, Implementada. Una spec que cambia a otra se anota en ambas (SPEC-005 modificó la presentación definida en SPEC-004). SPEC-001 a SPEC-003 están superadas.

### 3. Plan (`docs/plans/PLAN-XXX-nombre.md`)
Tareas ordenadas, con archivos a tocar y comprobaciones. Un commit por tarea. PLAN-006 ejecuta SPEC-004 y PLAN-007 ejecuta SPEC-005.

### 4. Ejecución con TDD
Por cada tarea: escribir o ampliar la prueba en `tests/`, verla fallar, implementar, verla pasar y limpiar. Las suites son scripts de Node que leen `index.html`, CSS y JS como texto (ver `verification_metrics.md`). Ejemplos de reglas convertidas en prueba: sin clases CSS muertas, selectores de JS existentes en el HTML, rotador con temporizadores falsos, reglas de contenido de SPEC-004.

### 5. Revisión final
Al terminar el plan: `npm test` sin fallos, linters sin reglas nuevas respecto a la línea base, revisión visual en 320, 768, 1024 y 1280 px, y revisión de código y de contenido (restricciones editoriales). Los hallazgos se corrigen en commits `fix` y la spec se cierra con el estado "Implementada".

### 6. Merge y despliegue
La rama de trabajo se integra a `main` y se hace push. **El push a `main` dispara un webhook al panel del autor (`panel.sprintjudicial.com`), que redepliega con Docker y nginx.** No hay GitHub Actions. Por eso nada llega a `main` sin pasar la revisión final.

## Rama y commits

- Trabajo en ramas (`feat/...`, `docs/...`), nunca directo en `main`.
- Commits en español, `tipo(alcance): descripción`, sin atribución. Detalle en `code_conventions.md`.
- Intentos de arreglo repetidos se agrupan en un solo commit antes de subir.

## Carpetas locales ignoradas

`.superpowers/` (sesiones de brainstorming y borradores del flujo) y `.ui-design/` (revisiones de diseño) están en `.gitignore`; también `.claude/`, `node_modules/` y `dist/`. No se versionan ni se despliegan.

## Documentación

- `CLAUDE.md` es el mapa del proyecto y enlaza estas guías (divulgación progresiva).
- Nomenclatura: `SPEC-XXX-`, `RES-XXX-`, `ADR-XXX-`, `PLAN-XXX-` más nombre en minúsculas con guiones.
- Campos de cada documento: fecha, estado, prioridad y dependencias.
- Estados en `docs/ROADMAP.md`: pendiente, en progreso, completado, descartado.
- Vigentes: SPEC-004, SPEC-005, PLAN-006, PLAN-007, RES-003, ADR-001 y PLAN-005 (referencia operativa del servidor). Históricos: SPEC-001 a SPEC-003, RES-001, RES-002 y PLAN-001 a PLAN-004.

## Compactación

Compactar al cerrar cada tarea y limpiar contexto al cambiar de spec. Al compactar se conservan las reglas críticas de `CLAUDE.md`, las restricciones del proyecto, los tokens de diseño y las convenciones de commits.

## Antes de tocar contenido

Revisar las restricciones editoriales de SPEC-004: nada de precios, planes, consultoría, claims de adopción, cifras sin fuente, datos del lugar de trabajo, nombres de colegas ni contacto personal. `test-compliance.js` detecta las más comunes, pero no sustituye la lectura.
