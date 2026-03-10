# Workflow CDAID — Sprint Judicial

## Contract Driven AI Development

Este proyecto sigue un flujo **Spec Driven Development** donde:

1. La **investigación** (RES-XXX) informa las **especificaciones** (SPEC-XXX)
2. Las **especificaciones** generan **decisiones de arquitectura** (ADR-XXX)
3. Las **decisiones** se ejecutan mediante **planes** (PLAN-XXX)
4. El **ROADMAP** consolida la visión y el estado de cada fase

```
RES (Research) → SPEC (Contract) → ADR (Decision) → PLAN (Execution) → CODE → VERIFY
```

---

## Flujo de Trabajo por Feature

### 1. Especificación (obligatorio antes de codificar)
- Verificar si existe SPEC para la feature
- Si no existe, crear una en `docs/specs/`
- La SPEC define: requisitos funcionales, no funcionales, criterios de aceptación

### 2. Planificación
- Verificar si existe PLAN con las tareas
- Si no existe, crear uno en `docs/plans/`
- El PLAN define: tareas ordenadas, dependencias, prioridades

### 3. Implementación
- Seguir el PLAN tarea por tarea
- Commits atómicos (una tarea = un commit)
- No mezclar refactoring con features nuevas

### 4. Verificación
- HTML: W3C Validator
- CSS: sin errores en consola
- JS: sin errores en consola
- Accesibilidad: contraste, aria, keyboard nav
- Responsive: probar en 320px, 768px, 1024px
- Performance: Lighthouse > 90

---

## Checklist Pattern

Para tareas con >3 items, crear checklist operativo:

```markdown
## Sprint N — Checklist

- [x] Item completado
- [ ] Item pendiente
- [ ] Item pendiente
```

Actualizar en tiempo real. No es documentación post-hoc sino tracking activo.

---

## Compactación Deliberada

- `/compact` al terminar cada fix/feature
- `/clear` al cambiar de sprint/planning/tema
- `/compact focus on [tema actual]` al iniciar tarea compleja

---

## Trazas de Delegación

Registrar decisiones de delegación en los PLANs:

```markdown
| Decisión | Propuesta IA | Aprobación Humano | Notas |
|----------|-------------|-------------------|-------|
| Separar CSS/JS | Sí, 3 archivos | Aprobada | — |
| Agregar React | Sí | Rechazada | Over-engineering para landing |
```

---

## Skills Disponibles para Revisión

| Skill | Cuándo usar | Path |
|-------|-------------|------|
| **Design Patterns** | Al diseñar arquitectura JS, detectar code smells → pattern | `.claude/skills/design-patterns/SKILL.md` |
| **Refactoring** | Al revisar código, identificar smells, mejorar estructura | `.claude/skills/refactoring/SKILL.md` |

### Workflow con Design Patterns Skill
1. Identificar el problema (flexibilidad, extensibilidad, desacoplamiento)
2. Consultar smell map en el skill
3. Verificar si Python simplification aplica (para backend futuro)
4. Implementar patrón adecuado

### Workflow con Refactoring Skill
1. Leer `references/smell-technique-matrix.md` para mapeo completo
2. Escanear código buscando smells
3. Priorizar: Duplicate Code, Long Method, Large Class primero
4. Aplicar técnica del catálogo paso a paso
5. Verificar que nada se rompió

---

## Convenciones de Documentación

### Nomenclatura de archivos
- `SPEC-XXX-nombre.md` — Especificaciones contractuales
- `RES-XXX-nombre.md` — Investigaciones y análisis
- `ADR-XXX-nombre.md` — Architecture Decision Records
- `PLAN-XXX-nombre.md` — Planes de ejecución

### Campos obligatorios en cada documento
```markdown
> Fecha: YYYY-MM-DD
> Estado: Pendiente | En progreso | Completado
> Prioridad: P0 | P1 | P2
> Dependencias: lista de docs relacionados
```

### Estados del ROADMAP
- ⬜ Pendiente / Futuro
- 🔄 En progreso
- ✅ Completado
- ❌ Descartado
