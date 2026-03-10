# PLAN-004: Mejoras UX/UI Detalladas (del Agente UX/UI)

> Fecha: 2026-03-10
> Estado: Completado
> Spec asociada: SPEC-001-landing-v2
> Origen: Agente UX/UI (no pudo escribir código, plan capturado)

---

## Mejoras planificadas (10 áreas)

### 1. Scroll Animations
- Clase `.reveal` con IntersectionObserver
- Todas las secciones se animan al entrar en viewport (no solo hero)
- Animaciones escalonadas en grids (delay por hijo)

### 2. Hamburger Menu Mobile
- Botón `.hamburger` con 3 barras animadas (X al abrir)
- Overlay `.mobile-menu` full-screen
- JS toggle con soporte ESC key
- `aria-expanded` y `aria-controls`

### 3. Servicios actualizados a 6
- Heading: "6 soluciones que transforman su práctica jurídica"
- Hero stat: "5" → "6"
- 6ta tarjeta: "Consultoría en LegalTech e IA" (o verificar con CONTEXTO)
- Hover effects con radial gradient overlay + icon scaling

### 4. Status indicators en servicios
- Badges `.service-status` con dot animado
- Verde: "En producción" (Asistente IA, Sherlock, Agilex, Docassemble)
- Ámbar: "En desarrollo" (Anonimizador)

### 5. Counters animados
- `data-target` y `data-suffix` en stat numbers
- Animación con easeOutQuad timing
- Trigger con IntersectionObserver (anima una sola vez)

### 6. Accesibilidad
- Skip-to-content link
- `<main>` wrapper con `id="main-content"`
- `aria-label` en secciones
- `aria-hidden="true"` en iconos decorativos (emojis)
- `:focus-visible` styles

### 7. Scroll indicator en Hero
- Chevron animado (bounce) al fondo del hero
- Fade out al hacer scroll (opacity vinculada a scrollY)

### 8. Sección "Cómo Funciona"
- 4 pasos numerados con connecting gradient line
- 1: Agende demo → 2: Evaluamos necesidad → 3: Implementamos → 4: Soporte continuo
- Layout horizontal en desktop, vertical en mobile
- Reveal animations individuales por paso

### 9. Credenciales con Glassmorphism
- `backdrop-filter: blur(10px)` en `.cred-item`
- Fondo translúcido `rgba(15,36,64,0.7)`
- Border sutil `rgba(255,255,255,0.12)`
- Hover: lift + shadow

### 10. Footer mejorado
- Grid 4 columnas: Brand | Servicios | Recursos | Contacto
- Columna Brand: logo + descripción corta + social icons (LinkedIn, GitHub)
- Bottom bar con copyright + links legales
- Responsive: stack en mobile

### 11. CTAs verdes
- Botones primarios de conversión en verde (`--green: #10B981`)
- "Agendar demo gratuita" y "Escribir por WhatsApp" en verde
- Botones de navegación/exploración en azul (accent)

### 12. Meta tags
- Open Graph: og:title, og:description, og:image, og:url, og:locale
- Twitter Card: summary_large_image
- Preconnect a fonts.gstatic.com con crossorigin
- font-display: swap (ya presente vía URL param)
