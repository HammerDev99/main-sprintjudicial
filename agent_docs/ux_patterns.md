# Patrones UX/UI — Sprint Judicial (LegalTech B2B)

## Público objetivo

- Abogados colombianos, 30-55 años
- Poco conocimiento técnico pero curiosidad por IA
- Escépticos pero abiertos si ven evidencia real
- Valoran: ahorro de tiempo, seguridad de datos, resultados concretos
- Rechazan: jerga técnica, promesas vacías, dependencia tecnológica

---

## Patrones de Trust (Confianza)

### 1. Trust Signals Above the Fold
- Badge "Ganador JusticIALab 2024" visible en el hero
- Estadísticas numéricas verificables (10+ años, 6 herramientas, Nacional)
- NO prometer, MOSTRAR: métricas reales, productos en producción

### 2. Social Proof Escalado
```
Nivel 1 (actual): Reconocimientos institucionales (JusticIALab, Legal Hackers)
Nivel 2 (futuro): Testimonios de clientes con nombre, cargo y empresa
Nivel 3 (futuro): Logos de entidades que usan los productos
Nivel 4 (futuro): Case studies con métricas de ROI
```

### 3. Disclaimer Legal Visible
"Sprint Judicial es una herramienta de asistencia. No reemplaza el consejo legal profesional."
Paradójicamente, esto AUMENTA la confianza en el sector legal.

### 4. Seguridad como Mensaje
- Menciones visibles a Ley 1581/2012, CONPES 3975
- "100% local / on-premise" como diferenciador
- "Código abierto / auditable" como trust signal

---

## Patrones de Conversión

### CTA Hierarchy
1. **CTA Primario**: WhatsApp (canal preferido del abogado colombiano)
2. **CTA Secundario**: Email
3. **CTA Terciario**: Teléfono (texto en nota)

### Frecuencia de CTA
- Hero: 2 CTAs (demo + ver servicios)
- Post-servicios: CTA implícito (las tarjetas educan, el CTA final convierte)
- Final: CTA explícito con WhatsApp prominente

### Reducción de Fricción
- "20 minutos" — tiempo concreto, no ambiguo
- "Sin costo, sin compromiso" — elimina barreras
- "Con un caso real de su especialidad" — personalización prometida
- WhatsApp pre-cargado con mensaje — zero effort para el usuario

---

## Patrones de Layout

### F-Pattern (actual)
El abogado escanea:
1. Hero: título + CTA (lectura horizontal)
2. Servicios: tarjetas en grid (escaneo vertical)
3. Credenciales: badges centrados (escaneo horizontal)
4. CTA: centrado (punto focal)

### Spacing Pattern
- Secciones: 64px padding vertical en mobile, 100px en desktop (768px+)
- Cards: 32px de padding interno
- Entre grupos: 48px
- Container: 1100px máximo (no stretchar en ultrawides)

---

## Patrones de Navegación

### Scroll-based Navigation
- Smooth scroll para anchor links
- Active state en navbar según sección visible (IntersectionObserver)
- Indicador visual en nav link activo: `border-bottom: 2px solid var(--accent-light)` (solo desktop)
- Navbar con backdrop-blur que cambia opacidad al scrollear

### Mobile Navigation
- Hamburger menu en < 768px con animación → X al abrir (`.navbar--menu-open .navbar__toggle-bar`)
- Full-screen overlay con links (`display: none` / `display: flex` con `.is-open`)
- Cerrar al: click en link, click fuera, ESC key
- Focus trap dentro del menú abierto (Tab/Shift+Tab ciclan entre toggle + links)
- **Caveat CSS**: `.navbar` usa `backdrop-filter` que crea un containing block. Al abrir el menú, se agrega `.navbar--menu-open` que desactiva el `backdrop-filter` para que el overlay con `position: fixed` cubra el viewport completo
- **No usar** `visibility: hidden` / `opacity: 0` para ocultar el menú — causa ghost text en iOS Safari

---

## Patrones de Accesibilidad (WCAG 2.1 AA)

### Navegación por teclado
- Tab order lógico (izq→der, arriba→abajo)
- Focus visible en TODOS los interactivos (outline 2px accent)
- Skip-to-content link como primer elemento focusable
- ESC cierra modales/menús

### Screen Readers
- Heading hierarchy: un solo h1, h2 por sección, h3 por card
- aria-label en links/botones con solo iconos
- aria-label únicos en CTAs de servicios ("Solicitar demo de [servicio]")
- aria-expanded en hamburger menu
- aria-current en nav link activo
- sr-only class para texto solo para screen readers (contexto en comparativa Antes/Después)
- role="list" en listas con `list-style: none` (fix VoiceOver/Safari)
- Footer link columns envueltas en `<nav aria-label="...">`

### Contraste mínimo
- Texto normal (< 18px): 4.5:1 ratio
- Texto grande (≥ 18px bold o ≥ 24px): 3:1 ratio
- `--text-muted` (#94A3B8) sobre `--deep` (#0B1D33): 5.4:1 (PASA AA)

---

## Patrones de Responsive

### Breakpoint Strategy (Mobile First)
```
320px  → Base: 1 columna, stack vertical, menú hamburguesa
480px  → Ajustes menores (stats en 2 columnas)
768px  → Grid 2 columnas, navbar links visibles
1024px → Grid completo, about-grid 2 columnas
1440px → Max-width container, sin cambios de layout
```

### Touch Targets
- Mínimo 44x44px para elementos táctiles
- Spacing mínimo 8px entre targets adyacentes
- Botones: padding mínimo 14px vertical

---

## Patrones Nuevos (Evolución Estratégica — RES-002)

### 5. Pipeline Visual (Ciclo del Litigio)
- 4 fases horizontales: INVESTIGAR → REDACTAR → PROTEGER → AUTOMATIZAR
- Cada fase es clickeable (smooth scroll a #servicios)
- Verbos en uppercase con letter-spacing como labels
- Grid responsive: 1 col mobile → 2 cols tablet → 4 cols desktop
- BEM: `.pipeline`, `.pipeline__phase`, `.pipeline__verb`, `.pipeline__icon`, `.pipeline__title`, `.pipeline__desc`

### 6. Dolor/Resultado en Service Cards
- Cada service card muestra: Pain (pregunta en italic) → Result (respuesta en verde bold) → Description
- Framework "dolor → resultado" inspirado en análisis de Aline.co y líderes LegalTech
- BEM: `.service-card__pain` (italic, muted), `.service-card__result` (green, bold)

### 7. Headline Rotativo (Hero)
- Parte fija "Inteligencia artificial que" + span rotativo con 4 value props
- `setInterval` cada 3500ms, respeta `prefers-reduced-motion`
- CSS: items `position: absolute` / activo `position: relative`, transición opacity
- A11y: `aria-live="polite"` en contenedor, `aria-hidden="true"` en items inactivos
- BEM: `.hero__rotator`, `.hero__rotator-item`, `.hero__rotator-item.is-active`

### 8. Sección Diferenciadores (¿Por qué?)
- 4 cards con icono SVG + título + descripción
- Grid responsive: 1→2→4 cols
- BEM: `.differentiators`, `.differentiators__card`, `.differentiators__icon`, `.differentiators__title`, `.differentiators__desc`

### 9. Sección Seguridad y Cumplimiento
- Fondo con gradiente verde sutil `rgba(16, 185, 129, 0.04)`
- 4 items: Ley 1581, CONPES 3975, procesamiento local, sin entrenamiento
- Border verde sutil en items: `rgba(16, 185, 129, 0.15)`
- BEM: `.security`, `.security__grid`, `.security__item`, `.security__icon`, `.security__title`, `.security__desc`

### 10. Timeline de Onboarding (Tu Primer Mes)
- 4 pasos: Hoy → Día 3 → Día 7 → Día 30
- Badges tipo pill (background accent, border accent) en vez de números
- Grid responsive: 1→2→4 cols
- BEM: `.timeline`, `.timeline__grid`, `.timeline__step`, `.timeline__badge`, `.timeline__title`, `.timeline__desc`

### 11. WhatsApp Flotante
- Botón fijo esquina inferior-izquierda (opuesto al back-to-top)
- Background #25D366, border-radius 50%, z-index 50
- Tooltip CSS puro con `::after` + `:hover`
- No requiere JS
- BEM: `.whatsapp-float`

### 12. Trust Bar con Logos Reales
- 3 logos institucionales como `<img>` con `filter: brightness(0) invert(1)` para tema oscuro
- 4to item (Agilex) mantiene SVG inline
- `loading="lazy"`, alt text descriptivo
- BEM: `.trust-bar__logo`

### 13. CTAs Duales (Streamlit Demos)
- Hero CTA secundario: link externo a TutelaBot Streamlit
- Service cards 1 y 6: segundo CTA "Probar ahora" / "Ver demo IA" con estilo outline teal
- Container `.service-card__actions` para 2 CTAs, `.service-card__cta--try` para estilo outline
