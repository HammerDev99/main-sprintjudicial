# Sprint Judicial — Roadmap General

> Última actualización: 2026-03-10

## Visión

Evolucionar Sprint Judicial de una landing page estática a una **plataforma integral de LegalTech**
para abogados litigantes en Colombia, con IA y automatización como diferenciadores centrales.

---

## Fase 0: Landing Page v2 (Actual)
**Estado**: 🔄 En progreso
**Objetivo**: Mejorar la landing page actual en UX/UI, arquitectura y performance.

| Tarea | Prioridad | Estado | Spec/Plan |
|-------|-----------|--------|-----------|
| Separar archivos (CSS/JS/HTML) | P0 | ⬜ Planificado | PLAN-002, PLAN-003 (Fase 0) |
| CSS Architecture (tokens, BEM, ITCSS) | P0 | ⬜ Planificado | PLAN-003 (Fase 1) |
| JS Patterns (state, navbar, animations) | P0 | ⬜ Planificado | PLAN-003 (Fase 2) |
| Accesibilidad (ARIA, focus, skip-nav) | P0 | ⬜ Planificado | PLAN-003 (Fase 3) |
| Hamburger menu mobile | P0 | ⬜ Planificado | PLAN-004 (#2) |
| Scroll animations (IntersectionObserver) | P0 | ⬜ Planificado | PLAN-004 (#1) |
| Counter animation en stats | P0 | ⬜ Planificado | PLAN-004 (#5) |
| Actualizar a 6 servicios + status badges | P1 | ⬜ Planificado | PLAN-004 (#3, #4) |
| Sección "Cómo funciona" (4 pasos) | P1 | ⬜ Planificado | PLAN-004 (#8) |
| Footer mejorado (4 columnas) | P1 | ⬜ Planificado | PLAN-004 (#10) |
| Credenciales con glassmorphism | P1 | ⬜ Planificado | PLAN-004 (#9) |
| Open Graph + Twitter Card meta tags | P1 | ⬜ Planificado | PLAN-004 (#12) |
| CTAs verdes para conversión | P1 | ⬜ Planificado | PLAN-004 (#11) |
| Trust bar post-hero | P1 | ⬜ Planificado | PLAN-003 (Fase 5) |
| Performance (critical CSS, fonts, defer) | P2 | ⬜ Planificado | PLAN-003 (Fase 4) |
| Scalability (data-attrs, config, templates) | P2 | ⬜ Planificado | PLAN-003 (Fase 6) |
| robots.txt + sitemap.xml + Schema.org | P2 | ⬜ Planificado | PLAN-003 (Fase 7) |

## Fase 1: Contenido y Confianza
**Estado**: ⬜ Planificación
**Objetivo**: Agregar elementos de prueba social, casos de éxito y contenido educativo.

| Tarea | Prioridad | Estado | Spec/Plan |
|-------|-----------|--------|-----------|
| Sección de testimonios / casos de éxito | P0 | ⬜ Pendiente | SPEC-001 |
| Video demo embebido (3 min) | P1 | ⬜ Pendiente | SPEC-001 |
| FAQ con preguntas de abogados escépticos | P1 | ⬜ Pendiente | SPEC-001 |
| Comparativa "Sprint Judicial vs SaaS genéricas" | P1 | ⬜ Pendiente | SPEC-001 |
| Blog feed (últimos 3 artículos) | P2 | ⬜ Pendiente | SPEC-001 |
| Calculadora de ahorro de tiempo | P2 | ⬜ Pendiente | SPEC-001 |

## Fase 2: Nuevos Servicios y Plataforma
**Estado**: ⬜ Investigación
**Objetivo**: Ampliar oferta de servicios basados en la investigación de mercado.

| Servicio | Prioridad | Estado | Spec |
|----------|-----------|--------|------|
| Copiloto Procesal con Memoria por Expediente | P0 | ⬜ Investigación | SPEC-002 |
| Portal Autoservicio Ciudadano | P0 | ⬜ Investigación | SPEC-002 |
| Plataforma No-Code de Flujos Legales | P1 | ⬜ Investigación | SPEC-002 |
| Monitoreo Normativo con IA | P1 | ⬜ Investigación | SPEC-002 |
| Agentes de Calidad de Expedientes | P2 | ⬜ Investigación | SPEC-002 |
| Simulador de Audiencias Adversariales | P2 | ⬜ Investigación | SPEC-002 |
| Fábrica de Agentes On-Premise | P2 | ⬜ Investigación | SPEC-002 |

## Fase 3: Escalabilidad
**Estado**: ⬜ Futuro
**Objetivo**: Migrar a framework (Astro/Next.js), multi-página, dashboard de cliente.

| Tarea | Prioridad | Estado | Spec |
|-------|-----------|--------|------|
| Migrar a Astro o Next.js | P0 | ⬜ Futuro | SPEC-003 |
| Dashboard de cliente | P1 | ⬜ Futuro | SPEC-003 |
| Sistema de pagos integrado | P1 | ⬜ Futuro | SPEC-003 |
| API pública para integraciones | P2 | ⬜ Futuro | SPEC-003 |

---

## Modelo de Pricing Objetivo (4 tiers)

| Tier | Público | Precio | Servicios |
|------|---------|--------|-----------|
| **Gratuito** | Ciudadanos | $0 | Buscador básico, generador tutelas básico |
| **Profesional** | Abogados individuales | $99K-199K COP/mes | Buscador avanzado, asistente IA, documentos |
| **Firma** | Firmas 3-15 abogados | $299K-499K COP/usuario/mes | Todo + copiloto + monitoreo |
| **Enterprise** | Gobierno/grandes | Cotización | On-premise, agentes custom, SLA |
