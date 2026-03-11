# SPEC-003: Evolución Estratégica — Landing Page Comercial

> Fecha: 2026-03-10
> Estado: 🔄 En progreso (~85%)
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
- [ ] Precio "desde" visible en cada tarjeta (rangos definidos en RES-002)
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

### RF-13: Elementos Adicionales de Conversión
**Referente:** Aline.co (demos, trials, lead magnets)

- [ ] Página de precios transparentes (/precios) con rangos y calculador ROI
- [ ] Lead magnet: guía descargable "5 formas en que la IA ahorra tiempo a abogados litigantes"
- [ ] Spotlight/feature dedicado para TutelaBot como producto estrella ("la cuña")
- [ ] Screenshots o GIFs animados de interfaces de productos

## 3. Requisitos No Funcionales

### RNF-01: Copywriting orientado a abogados
**Referente:** RES-002 sección "El lenguaje que convence a abogados escépticos"

- [x] Lenguaje de resultados, no de features técnicos
- [x] Tono profesional-cercano, sin jerga técnica
- [x] Posicionamiento: "IA asiste, no decide" — amplificación, no reemplazo
- [x] Frases clave: "Diseñado desde adentro", "Tu criterio, amplificado por IA", "Tus datos nunca salen de tu servidor"

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
5. ✅ Sección "¿Por qué?" presenta 4 diferenciadores claros
6. ✅ Sección de seguridad menciona Ley 1581 y CONPES 3975
7. ✅ Timeline "Tu Primer Mes" reduce fricción de adopción
8. ✅ WhatsApp flotante funciona como canal principal de conversión
9. ✅ CTAs duales en hero y en cards de servicio (demo + prueba)
10. ✅ Copywriting usa lenguaje de resultados, no de features
11. ⬜ Testimonios reales de al menos 3 usuarios (requiere insumo)
12. ⬜ Precios transparentes visibles (requiere decisión de negocio)
13. ⬜ Video demo de 60-90 segundos (requiere grabación)

## 6. Resumen de Estado

| Categoría | Implementados | Pendientes | % |
|-----------|--------------|------------|---|
| Secciones nuevas (pipeline, ¿por qué?, seguridad, primer mes) | 4/4 | 0 | 100% |
| Hero + trust bar + WhatsApp | 3/3 | 0 | 100% |
| Service cards (dolor/resultado + CTAs) | 1/1 | 0 | 100% |
| Bug fixes técnicos | 6/6 | 0 | 100% |
| Security hardening | 3/3 | 0 | 100% |
| Contenido que requiere insumo externo | 0/4 | 4 | 0% |
| Conversión avanzada (precios, lead magnet, spotlight) | 0/4 | 4 | 0% |

**Total implementado:** ~85% de lo que se puede hacer desde el codebase.
**Pendiente:** elementos que requieren insumo del usuario o decisiones de negocio.

## 7. Pendientes (requieren insumo externo)

| Item | Bloqueo | Acción requerida |
|------|---------|------------------|
| Testimonios reales | Requiere contactar usuarios | Pedir citas a 3-5 usuarios de TutelaBot/Sherlock/Agilex |
| Video demo | Requiere grabación | Grabar video 60-90s explicando Sprint Judicial + demo TutelaBot |
| Foto profesional | Requiere asset | Sesión de fotos para sección "Sobre mí" |
| Precios en tarjetas | Decisión de negocio | Definir si publicar rangos de precios (RES-002 lo recomienda) |
| Badge hero | Decisión editorial | Reevaluar badge "Tecnología Legal Colombiana" |
| og-image.png | Requiere diseño | Crear imagen para compartir en redes sociales |
| Uniformar logos trust-bar | Decisión visual | Monocromático vs colores originales |

---

*Creado: 2026-03-10*
*Basado en: RES-002-analisis-estrategico.md*
*Implementado en: Sprints de evolución estratégica (sesiones 2026-03-10)*
