# Sprint Judicial: contexto vigente

**Última actualización**: 2026-10-09
**Fuente de verdad del enfoque**: `docs/specs/SPEC-004-reposicionamiento-academico.md` y `docs/specs/SPEC-005-estructura-visual.md`.

## 1. Qué es el sitio

sprintjudicial.com es el espacio personal y académico de Daniel Arbeláez Álvarez, ingeniero de software y divulgador. Enseña y documenta cómo automatizar trámites judiciales con software libre. No es una oferta comercial.

- Sitio: sprintjudicial.com
- Blog: blog.sprintjudicial.com
- Enlaces: links.sprintjudicial.com
- Documentación de AgilEx: docs.agilex.sprintjudicial.com

El sitio no publica cargo, dependencia ni ciudad de trabajo del autor.

## 2. Propósito

1. Divulgar el uso responsable de la IA y la automatización en la justicia.
2. Publicar herramientas de software libre (licencia MIT) con documentación abierta.
3. Ofrecer mentoría abierta a quienes quieran aprender a automatizar sus propios procesos.
4. Recibir invitaciones académicas de docencia y conferencias.
5. Difundir escritos: entradas de blog y un artículo académico.

## 3. Público

- Servidores judiciales interesados en automatizar tareas.
- Estudiantes de derecho e ingeniería.
- Universidades y escuelas judiciales.
- Organizadores de eventos académicos.

## 4. Restricciones legales

Resumen operativo para quien edite el sitio. No es concepto jurídico.

El autor es servidor de la Rama Judicial. Rigen, entre otras, la Ley 270 de 1996 (arts. 151 y 154), la Constitución (art. 127) y el Código de Comercio (art. 13.3). En consecuencia, en el contenido vivo del sitio no deben aparecer:

- Precios, planes, cotizaciones, consultoría ni oferta de servicios comerciales.
- Afirmaciones de adopción institucional (por ejemplo, uso "a nivel nacional" o "en producción").
- Cifras sin fuente verificable.
- Datos del lugar de trabajo, cargos ni nombres de colegas.
- Teléfono o WhatsApp personal, ni donaciones.

La docencia y las conferencias son el único canal remunerado admitido y se presentan como invitación académica. El pie del sitio lleva esta nota de transparencia: "Este sitio no ofrece servicios comerciales ni recibe pagos. Las herramientas publicadas son software libre; su uso en entidades públicas corresponde a los canales institucionales de cada entidad."

## 5. Qué se ofrece sin costo

- **Herramientas MIT**: AgilEx, TYBABot y DisciplinaJudicialAI.
- **Mentoría abierta**: grupo comunitario de WhatsApp, con un proceso de tres pasos para unirse.
- **Escritos**: blog (se lee por RSS) y artículo en Cuaderno Activa 16(1), 2024.

## 6. Docencia y conferencias

Se presenta como invitación académica por correo o LinkedIn.

- Temas: informática jurídica, automatización de trámites judiciales, gobernanza de IA en la justicia.
- Charlas registradas: taller 2026 en Medellín; conferencia del 18 de octubre de 2024 en Medellín.

## 7. Herramientas

| Herramienta | Dato verificable |
|-------------|------------------|
| AgilEx | Licencia MIT. Versión 1.0.0 en octubre de 2022; versión 1.5.1 en abril de 2026. Documentación en docs.agilex.sprintjudicial.com |
| TYBABot | Software libre, licencia MIT |
| DisciplinaJudicialAI | Software libre, licencia MIT |

Regla para publicar una herramienta nueva: repositorio público, licencia explícita y ningún dato laboral. Relevo, PrismaRPA y HabeasSafe están pendientes de cumplirla.

## 8. Reconocimientos verificables

- **Ganador JusticIALab 2024, equipo Marduk.** Fuente: nota de ramajudicial.gov.co del 13 de diciembre de 2024.
- **Mapa de Innovación Legal 2023** de Legal Hackers Medellín y ALTCO. Se menciona sin enlace.

Solo se publican reconocimientos con fuente. No se agregan cifras de impacto sin respaldo.

## 9. Principio rector

**La IA asiste; la decisión es humana.** Aplica al copy, a la UX y a las herramientas: ninguna salida automatizada reemplaza el criterio del servidor judicial o del abogado.

## 10. Identidad visual

- Tema oscuro fijo, sin modo claro.
- Tipografía: Source Serif 4 (títulos) e Inter (texto), con `font-display: swap`.
- Tokens principales:

```css
--deep: #0B1D33;  --navy: #152A4A;  --accent: #3B82F6;
--accent-light: #60A5FA;  --teal: #06B6D4;  --gold: #F59E0B;
--green: #10B981;  --surface: #0F2440;  --surface-light: #1A3558;
--text: #E2E8F0;  --text-muted: #94A3B8;  --white: #FFFFFF;
```

Detalle en `agent_docs/design_system.md`.

## 11. Canales

- Correo: contacto@sprintjudicial.com
- LinkedIn: linkedin.com/in/daniel-arbelaez-
- Grupo comunitario de WhatsApp (mentoría abierta), enlazado desde el sitio.

## 12. Pendientes

- Imagen `og-image.png` para redes sociales.
- Foto profesional para la sección del autor.
- Agregar Relevo, PrismaRPA y HabeasSafe cuando cumplan la regla de la sección 7.
- Mantener al día las versiones publicadas de AgilEx.

## 13. Documentos históricos

SPEC-001, SPEC-002, SPEC-003, RES-001, RES-002 y PLAN-001 a PLAN-004 describen la etapa comercial anterior. Están superados y se conservan solo como registro. PLAN-005 y ADR-001 siguen vigentes como referencia de seguridad del servidor.
