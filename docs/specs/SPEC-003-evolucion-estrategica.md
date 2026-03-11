# SPEC-003: Evolución Estratégica — Landing Page Comercial

> Fecha: 2026-03-10
> Estado: 🔄 En progreso (~75%)
> Prioridad: P0
> Dependencias: SPEC-001 (landing page v2 — ✅ completada), RES-002 (análisis estratégico)
> Origen: Recomendaciones de `docs/research/RES-002-analisis-estrategico.md`

---

## 1. Objetivo

Transformar la landing page técnica en una **máquina de conversión para abogados litigantes colombianos**, aplicando los patrones identificados en el análisis comparativo con Aline.co, Harvey, CoCounsel, Briefpoint, EvenUp y Lexroom.ai.

**Principio rector (de RES-002):**
> "Sprint Judicial ya tiene la sustancia técnica y la credibilidad de producción real. Lo que falta es traducir esa sustancia en un lenguaje que los abogados colombianos entiendan, confíen y compren."

## 2. Requisitos Funcionales

### RF-01: Hero Section — Headline Rotativo
**Referente:** Aline.co (headline rotativo con resultados cuantificados)

- [x] Headline rotativo animado con 4 value propositions orientadas a resultado
- [x] Rotación cada 3.5s con transición suave
- [x] Respeta `prefers-reduced-motion` (detiene rotación si usuario prefiere)
- [x] Subheadline fijo con diferenciador de autenticidad ("10+ años en la Rama Judicial")
- [x] CTA doble: "Agenda una demo gratuita" (WhatsApp) + "Prueba el asistente →" (Streamlit)
- [ ] Badge "Tecnología Legal Colombiana" (comentado por decisión editorial — reevaluar)
- [ ] Video de 60-90 segundos: Daniel explica Sprint Judicial + demo rápida TutelaBot

### RF-02: Trust Bar — Barra de Credenciales
**Referente:** Aline.co (marquee scrolling de logos de clientes)

- [x] Franja horizontal post-hero con logos institucionales
- [x] 4 logos: JusticIALab 2024, Legal Hackers Colombia, Rama Judicial, Agilex
- [x] Logos en PNGs transparentes (sin fondo)
- [ ] Uniformar estilo visual de logos (monocromático vs colores originales)

### RF-03: Pipeline Visual — Ciclo del Litigio Inteligente
**Referente:** RES-002 "Pipeline Story" — evolución de herramientas puntuales a plataforma integrada

- [x] 4 fases: INVESTIGAR → REDACTAR → PROTEGER → AUTOMATIZAR
- [x] Cada fase con ícono, verbo, nombre del servicio y resultado
- [x] Grid responsive: 1 columna (mobile) → 2 columnas (tablet) → 4 columnas (desktop)
- [x] Título unificador: "Una plataforma para todo tu litigio"
- [ ] Fases clickeables que expandan descripción del servicio (interacción avanzada)

### RF-04: Service Cards — Framework Dolor/Resultado
**Referente:** EvenUp, Briefpoint (resultados medibles, no features técnicos)

Estructura por servicio:
1. Nombre del servicio
2. Dolor que resuelve (frase empática)
3. Resultado concreto (métrica cuantificada)
4. CTA

- [x] 6 tarjetas con `.service-card__pain` + `.service-card__result`
- [x] Badge de estado: "En producción" / "En desarrollo"
- [x] CTAs duales en servicios clave: card 1 (TutelaBot → Streamlit) y card 6 (DisciplinaJudicial → Streamlit)
- [x] Hover effects con glassmorphism
- [x] Precio "desde" visible en cada tarjeta ($150K, $80K, $200K, $500K, $800K, $300K)
- [ ] "Cómo funciona" per servicio: 3 pasos simples sin jerga técnica (RES-002 §Presentación de servicios)
- [ ] Testimonio/métrica de uso real por servicio

### RF-05: Sección "Cómo Funciona"
- [x] 4 pasos: Agende demo → Evaluamos necesidad → Implementamos → Soporte continuo
- [x] Diseño tipo steps con iconografía consistente

### RF-06: Comparativa "Antes vs. Después"
- [x] Tabla visual mostrando el contraste sin IA vs. con Sprint Judicial
- [x] Ubicada entre "Cómo Funciona" y "Credenciales"

### RF-07: Sección "¿Por qué Sprint Judicial?"
**Referente:** Aline.co (diferenciadores en 4 columnas con íconos)

- [x] 4 diferenciadores:
  1. "Construido desde adentro" — 10+ años en la Rama Judicial
  2. "100% privado y local" — datos no salen del servidor
  3. "Hecho para Colombia" — no es producto gringo tropicalizado
  4. "Código abierto, sin dependencia" — sin vendor lock-in
- [x] Grid responsive: 1 → 2 → 4 columnas

### RF-08: Sección "Seguridad y Cumplimiento"
**Referente:** Aline.co (página /security dedicada)

- [x] Ley 1581/2012 (Protección de Datos Personales)
- [x] CONPES 3975 (Política Nacional de IA)
- [x] Procesamiento 100% local
- [x] Sin entrenamiento con datos del usuario
- [ ] Enlace a página /seguridad dedicada (requiere multi-página — Fase 3)

### RF-09: Sección "Tu Primer Mes"
**Referente:** Aline.co (timeline "30 días" de onboarding)

- [x] Timeline visual: Hoy → Día 3 → Día 7 → Día 30
- [x] Cada step con descripción de qué sucede

### RF-10: Testimonios y Prueba Social
**Referente:** Aline.co (10 testimonios nominales con foto, cargo, empresa y logo)

- [ ] Mínimo 3 testimonios con nombre, cargo, cita específica y resultado cuantificado
- [ ] Formato: foto + nombre + cargo + cita de 2 líneas + logo institución
- [ ] Contactar usuarios de TutelaBot, Sherlock, Agilex para obtener citas

### RF-11: CTA Final
- [x] Frase de cierre orientada a acción
- [x] CTA doble: "Agenda demo" + "WhatsApp"

### RF-12: WhatsApp Flotante
**Referente:** RES-002 ("en Colombia WhatsApp es el canal dominante de comunicación profesional")

- [x] Botón flotante fijo en esquina inferior
- [x] CSS puro con tooltip
- [x] Enlace directo a wa.me con mensaje pre-armado

### RF-13: Garantía de Calidad / Confiabilidad IA
**Referente:** RES-002 §"El miedo a las alucinaciones" — Lexroom.ai, EvenUp, CoCounsel

RES-002 propone una sección visible titulada "¿Cómo garantizamos la calidad?" con 4 puntos:
- [ ] "Cada respuesta incluye la fuente normativa y jurisprudencial citada"
- [ ] "Nuestros modelos están entrenados exclusivamente en normas y jurisprudencia colombiana verificada"
- [x] "Tus datos nunca salen de tu servidor. Nunca entrenan modelos de terceros" (cubierto en §Seguridad)
- [x] "El criterio final siempre es del abogado" (cubierto en FAQ: "la IA asiste, no decide")

**Estado:** Parcialmente cubierto entre FAQ y Seguridad, pero NO existe como sección dedicada con alta visibilidad. Evaluar si se crea sección propia o se fortalecen las existentes.

### RF-14: Nombre del Ecosistema / Branding de Plataforma
**Referente:** RES-002 §"El nombre del ecosistema" — Clio Suite, EvenUp Claims Intelligence Platform, Aline AI Legal OS

- [ ] Definir nombre unificador del ecosistema (sugerencias RES-002: "La Plataforma de Litigio Inteligente" o "El Sistema Operativo Legal para Abogados Colombianos")
- [ ] Incorporar en hero, pipeline y footer como identidad de marca

**Estado:** No implementado. Pipeline usa "Plataforma integral" como label pero sin nombre propio.

### RF-15: Elementos Adicionales de Conversión
**Referente:** Aline.co (demos, trials, lead magnets)

- [ ] Página de precios transparentes (/precios) con rangos y calculador ROI
- [ ] Lead magnet: guía descargable "5 formas en que la IA ahorra tiempo a abogados litigantes"
- [ ] Spotlight/feature dedicado para TutelaBot como producto estrella ("la cuña") con screenshot/GIF + 3 bullets de resultado + CTA trial 7 días
- [ ] Screenshots o GIFs animados de interfaces de productos
- [ ] Caso de estudio Agilex: "Cómo automatizamos procesos en 293+ iteraciones para la Rama Judicial"

### RF-16: Blog Estratégico
**Referente:** RES-002 §"Elementos adicionales" — SEO + thought leadership

- [ ] Redirigir contenido del blog hacia temas que buscan abogados (no desarrolladores)
- [ ] Ejemplos: "5 formas de usar IA en tu práctica de tutelas", "Cómo buscar jurisprudencia más rápido en 2026"
- [x] Blog ya separado en blog.sprintjudicial.com
- [x] Feed RSS integrado en landing (últimos 3 artículos)

## 3. Requisitos No Funcionales

### RNF-01: Copywriting orientado a abogados
**Referente:** RES-002 sección "El lenguaje que convence a abogados escépticos"

- [x] Lenguaje de resultados, no de features técnicos
- [x] Tono profesional-cercano, sin jerga técnica
- [x] Posicionamiento: "IA asiste, no decide" — amplificación, no reemplazo
- [x] Frases clave usadas:
  - [x] "Construido desde adentro" (variante de "Diseñado desde adentro") — §¿Por qué?
  - [x] "Sus datos nunca salen de su servidor" — §¿Por qué? + §Seguridad
  - [ ] "Tu criterio, amplificado por IA" — **NO encontrada en el sitio**
  - [ ] "Menos de lo que cuesta una hora de un asociado" (ancla de precio) — **NO encontrada**
  - [ ] "Sin contratos largos. Cancela cuando quieras." (reducción de riesgo) — **NO encontrada**
- [x] Frases a evitar (todas AUSENTES del sitio ✅):
  - ✅ No usa "inteligencia artificial de última generación"
  - ✅ No usa "machine learning" ni "procesamiento de lenguaje natural"
  - ✅ No usa "disruptivo" ni "revolucionario"
  - ✅ No usa "reemplaza horas de trabajo" (usa "reduce", que es correcto)

### RNF-02: Bug Fixes Técnicos (previos a evolución)
- [x] JSON-LD: Medellín con UTF-8 correcto (tilde)
- [x] og:url: trailing slash consistente
- [x] Dead code: COUNTER_FPS eliminado
- [x] Dead code: countersAnimated eliminado
- [x] Blog feed: AbortController con timeout 8s
- [x] Blog feed: innerHTML → DOM API (previene XSS)

### RNF-03: Security Hardening
- [x] nginx/default.conf con security headers OWASP (HSTS, CSP, X-Frame-Options, etc.)
- [x] Dockerfile actualizado con nginx config
- [x] Plan de remediación de servidor documentado (PLAN-005)

## 4. Orden de Secciones (19 total)

```
1.  Navbar (sticky, scroll-aware)
2.  Hero (headline rotativo + CTA doble)
3.  Trust Bar (4 logos institucionales)
4.  Pipeline Visual (4 fases del litigio)
5.  Servicios (6 cards dolor/resultado)
6.  Cómo Funciona (4 pasos)
7.  Comparativa (Antes vs. Después)
8.  ¿Por qué Sprint Judicial? (4 diferenciadores)
9.  Credenciales (métricas glassmorphism)
10. CTA Mid (conversión intermedia)
11. Seguridad y Cumplimiento (Ley 1581, CONPES)
12. Sobre Mí (Daniel Arbelaez)
13. Tu Primer Mes (timeline onboarding)
14. FAQ (preguntas de abogados escépticos)
15. Blog (últimos 3 artículos vía RSS)
16. CTA Final (WhatsApp + agenda demo)
17. Footer (4 columnas, links a secciones)
18. WhatsApp Float (botón fijo)
19. Back-to-top (botón scroll)
```

## 5. Criterios de Aceptación

1. ✅ Hero rotativo funciona con 4 value props y respeta reduced-motion
2. ✅ Trust bar muestra logos institucionales reales (no emojis)
3. ✅ Pipeline visual comunica las 4 fases del ciclo de litigio
4. ✅ Service cards usan framework dolor/resultado (no features técnicos)
5. ✅ Precios "desde" visibles en las 6 tarjetas de servicio
6. ✅ Sección "¿Por qué?" presenta 4 diferenciadores claros
7. ✅ Sección de seguridad menciona Ley 1581 y CONPES 3975
8. ✅ Timeline "Tu Primer Mes" reduce fricción de adopción
9. ✅ WhatsApp flotante funciona como canal principal de conversión
10. ✅ CTAs duales en hero y en cards de servicio (demo + prueba)
11. ✅ Copywriting usa lenguaje de resultados, no de features
12. ✅ Ningún anti-pattern de copywriting presente (sin jerga técnica, sin hype)
13. ⬜ Testimonios reales de al menos 3 usuarios (requiere insumo)
14. ⬜ Video demo de 60-90 segundos (requiere grabación)
15. ⬜ Frases clave faltantes incorporadas ("Tu criterio, amplificado", "Menos de lo que cuesta una hora", "Sin contratos largos")
16. ⬜ Sección de garantía de calidad IA con alta visibilidad
17. ⬜ Nombre del ecosistema definido e incorporado
18. ⬜ "Cómo funciona" (3 pasos) por cada servicio

## 6. Resumen de Estado

| Categoría | Implementados | Pendientes | % |
|-----------|--------------|------------|---|
| Secciones nuevas (pipeline, ¿por qué?, seguridad, primer mes) | 4/4 | 0 | 100% |
| Hero + trust bar + WhatsApp | 3/3 | 0 | 100% |
| Service cards (dolor/resultado + CTAs + precios) | 3/3 | 0 | 100% |
| Bug fixes técnicos | 6/6 | 0 | 100% |
| Security hardening | 3/3 | 0 | 100% |
| Copywriting (tono, anti-patterns) | 2/2 | 0 | 100% |
| Frases clave de poder (RES-002) | 2/5 | 3 | 40% |
| "Cómo funciona" per servicio | 0/1 | 1 | 0% |
| Garantía calidad IA (sección dedicada) | 0/1 | 1 | 0% |
| Nombre ecosistema / branding | 0/1 | 1 | 0% |
| Contenido externo (testimonios, video, foto) | 0/3 | 3 | 0% |
| Conversión avanzada (pricing page, lead magnet, spotlight, caso estudio) | 0/5 | 5 | 0% |
| Blog estratégico (redirigir contenido) | 0/1 | 1 | 0% |

**Total:** 23/34 items implementados (**~68%**)
**Implementable desde codebase sin insumo externo:** frases clave, "cómo funciona" per servicio, nombre ecosistema, sección calidad IA
**Requiere insumo externo:** testimonios, video, foto, caso estudio, decisiones de negocio (pricing page, lead magnet)

## 7. Pendientes

### A) Implementables desde codebase (no requieren insumo externo)

| # | Item | Esfuerzo | RF |
|---|------|----------|-----|
| 1 | Agregar frases clave faltantes al copy | Bajo | RNF-01 |
| 2 | "Cómo funciona" (3 pasos) por servicio en cards | Medio | RF-04 |
| 3 | Sección/subsección "¿Cómo garantizamos la calidad?" | Medio | RF-13 |
| 4 | Definir e incorporar nombre del ecosistema | Bajo | RF-14 |
| 5 | Uniformar logos trust-bar | Bajo | RF-02 |
| 6 | Badge hero "Tecnología Legal Colombiana" | Bajo | RF-01 |

### B) Requieren insumo externo o decisiones de negocio

| # | Item | Bloqueo | Acción requerida |
|---|------|---------|------------------|
| 7 | Testimonios reales (3-5) | Contactar usuarios | Pedir citas a usuarios TutelaBot/Sherlock/Agilex |
| 8 | Video demo (60-90s) | Grabación | Grabar explicación + demo TutelaBot |
| 9 | Foto profesional | Sesión fotos | Para sección "Sobre mí" |
| 10 | og-image.png | Diseño | Imagen para redes sociales |
| 11 | Página de precios (/precios) | Decisión negocio | Publicar rangos + calculador ROI |
| 12 | Lead magnet (guía descargable) | Crear contenido | "5 formas IA ahorra tiempo a abogados" |
| 13 | Spotlight TutelaBot + screenshots/GIFs | Screenshots | Capturar interfaces de productos |
| 14 | Caso de estudio Agilex | Redactar | "293+ iteraciones para la Rama Judicial" |
| 15 | Blog estratégico (contenido legal) | Estrategia editorial | Redirigir blog a temas de abogados |

---

*Creado: 2026-03-10*
*Basado en: RES-002-analisis-estrategico.md*
*Implementado en: Sprints de evolución estratégica (sesiones 2026-03-10)*
