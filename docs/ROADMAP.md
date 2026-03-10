# Sprint Judicial — Roadmap General

> Última actualización: 2026-10-03

## Visión

Evolucionar Sprint Judicial de una landing page estática a una **plataforma integral de LegalTech**
para abogados litigantes en Colombia, con IA y automatización como diferenciadores centrales.

---

## Fase 0: Landing Page v2 (Actual)
**Estado**: ✅ Completada
**Objetivo**: Mejorar la landing page actual en UX/UI, arquitectura y performance.

| Tarea | Prioridad | Estado | Spec/Plan |
|-------|-----------|--------|-----------|
| Separar archivos (CSS/JS/HTML) | P0 | ✅ Completado | PLAN-002, PLAN-003 (Fase 0) |
| CSS Architecture (tokens, BEM, ITCSS) | P0 | ✅ Completado | PLAN-003 (Fase 1) |
| JS Patterns (state, navbar, animations) | P0 | ✅ Completado | PLAN-003 (Fase 2) |
| Accesibilidad (ARIA, focus, skip-nav) | P0 | ✅ Completado | PLAN-003 (Fase 3) |
| Hamburger menu mobile | P0 | ✅ Completado | PLAN-004 (#2) |
| Scroll animations (IntersectionObserver) | P0 | ✅ Completado | PLAN-004 (#1) |
| Counter animation en stats | P0 | ✅ Completado | PLAN-004 (#5) |
| Actualizar a 6 servicios + status badges | P1 | ✅ Completado | PLAN-004 (#3, #4) |
| Sección "Cómo funciona" (4 pasos) | P1 | ✅ Completado | PLAN-004 (#8) |
| Footer mejorado (4 columnas) | P1 | ✅ Completado | PLAN-004 (#10) |
| Credenciales con glassmorphism | P1 | ✅ Completado | PLAN-004 (#9) |
| Open Graph + Twitter Card meta tags | P1 | ✅ Completado | PLAN-004 (#12) |
| CTAs verdes para conversión | P1 | ✅ Completado | PLAN-004 (#11) |
| Trust bar post-hero | P1 | ✅ Completado | PLAN-003 (Fase 5) |
| FAQ para abogados escépticos | P1 | ✅ Completado | PLAN-001 (3.5) |
| CTA intermedio entre secciones | P1 | ✅ Completado | PLAN-003 (Fase 5) |
| favicon.ico + favicon.svg | P1 | ✅ Completado | — |
| security.txt, humans.txt, llms.txt | P2 | ✅ Completado | — |
| robots.txt + sitemap.xml + Schema.org | P2 | ✅ Completado | PLAN-003 (Fase 7) |
| Eliminar inline styles | P2 | ✅ Completado | — |
| Tipografía: Source Serif 4 + Inter | P1 | ✅ Completado | Investigación tipográfica |
| Comparativa "Antes vs. Después" | P1 | ✅ Completado | PLAN-003 (Fase 5) |
| Limpieza de secciones sin valor (hero visual, testimonios placeholder, calculadora) | P1 | ✅ Completado | Audit UX |

## Fase 1: Contenido y Confianza
**Estado**: 🔄 En progreso
**Objetivo**: Agregar elementos de prueba social, casos de éxito y contenido educativo.

| Tarea | Prioridad | Estado | Spec/Plan |
|-------|-----------|--------|-----------|
| Sección de testimonios / casos de éxito | P0 | ⬜ Pendiente (requiere contenido real) | SPEC-001 |
| Video demo embebido (3 min) | P1 | ⬜ Pendiente | SPEC-001 |
| FAQ con preguntas de abogados escépticos | P1 | ✅ Completado (movido a Fase 0) | SPEC-001 |
| Comparativa "Antes vs. Después" | P1 | ✅ Completado | SPEC-001 |
| CTAs en tarjetas de servicios | P1 | ✅ Completado | Audit UX |
| Active nav state (scroll tracking) | P1 | ✅ Completado | Audit UX |
| Botón "Volver arriba" | P2 | ✅ Completado | Audit UX |
| Blog feed (últimos 3 artículos) | P2 | ⬜ Pendiente | SPEC-001 |
| Foto profesional en "Sobre mí" | P2 | ⬜ Pendiente (requiere asset) | Audit UX |
| Email corporativo (@sprintjudicial.com) | P2 | ⬜ Pendiente (requiere config DNS) | Audit UX |

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
