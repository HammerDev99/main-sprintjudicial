# SPEC-001: Landing Page v2

> Fecha: 2026-03-10
> Estado: En desarrollo
> Prioridad: P0
> Dependencias: ninguna

---

## 1. Objetivo

Transformar la landing page actual (HTML estático single-file) en una landing page profesional,
accesible, performante y con arquitectura mantenible que refleje el posicionamiento premium
de Sprint Judicial en el mercado LegalTech colombiano.

## 2. Estado Actual (as-is)

- Single file `index.html` (~490 líneas) con CSS inline y sin JavaScript
- 5 secciones: Hero, Servicios (5 tarjetas), Credenciales, Sobre mí, CTA
- Responsive básico (solo oculta nav links en mobile)
- Sin animaciones de scroll, sin menú mobile, sin counters animados
- Sin Open Graph tags, sin sitemap, sin robots.txt
- Performance: no medida (estimada ~85 Lighthouse)

## 3. Requisitos Funcionales

### RF-01: Navegación
- [ ] Menú hamburguesa funcional en mobile (< 768px)
- [ ] Navbar cambia background on scroll (más opaco al scrollear)
- [ ] Smooth scroll para anchor links
- [ ] Skip-to-content link para accesibilidad
- [ ] Logo clickeable lleva al hero

### RF-02: Hero Section
- [ ] Animaciones fade-up escalonadas (ya implementadas con CSS, activar con JS)
- [ ] Counter animation para estadísticas (10+, 6, Nacional)
- [ ] Actualizar "5 Herramientas" → "6 Herramientas" (el contexto define 6 servicios)
- [ ] Scroll indicator (chevron/flecha animada) al fondo del hero

### RF-03: Servicios
- [ ] Mostrar 6 servicios (agregar Anonimizador como servicio diferenciado si falta)
- [ ] Badge de estado por servicio: "En producción" / "En desarrollo"
- [ ] Hover effects mejorados con glassmorphism sutil
- [ ] Precio de referencia visible en cada tarjeta

### RF-04: Sección "Cómo Funciona" (NUEVA)
- [ ] 4 pasos: Agende demo → Evaluamos necesidad → Implementamos → Soporte continuo
- [ ] Diseño tipo timeline o steps horizontales
- [ ] Iconografía consistente con el design system
- [ ] Ubicar entre Servicios y Credenciales

### RF-05: Credenciales
- [ ] Cards con efecto glass/glassmorphism
- [ ] Métricas numéricas verificables (981 tests, 85.3% F1, <200ms, 293+ commits)
- [ ] Links de verificación donde sea posible

### RF-06: Sección Sobre Mí
- [ ] Mantener estructura actual (está bien lograda)
- [ ] Agregar links a certificaciones/verificaciones

### RF-07: CTA Final
- [ ] WhatsApp como CTA principal (ya implementado)
- [ ] Email como secundario
- [ ] Agregar opción de agendar por Calendly o similar (futuro)

### RF-08: Footer
- [ ] Rediseñar en 3-4 columnas: Navegación, Servicios, Contacto, Legal
- [ ] Logo + descripción breve de Sprint Judicial
- [ ] Links a redes sociales (LinkedIn, GitHub, Blog)
- [ ] Badges de seguridad/privacidad (Ley 1581)
- [ ] Copyright actualizado a 2026

## 4. Requisitos No Funcionales

### RNF-01: Performance
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] font-display: swap en Google Fonts
- [ ] CSS crítico inline, CSS no-crítico deferred

### RNF-02: SEO
- [ ] Open Graph meta tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card meta tags
- [ ] Schema.org structured data (Organization, LocalBusiness)
- [ ] robots.txt con reglas básicas
- [ ] sitemap.xml con URL principal

### RNF-03: Accesibilidad (WCAG 2.1 AA)
- [ ] Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande
- [ ] Todos los elementos interactivos alcanzables por teclado
- [ ] aria-labels en botones y links con iconos
- [ ] HTML semántico: main, article, section, header, footer, nav
- [ ] Skip-to-content link
- [ ] Focus visible en todos los elementos interactivos

### RNF-04: Responsive
- [ ] Mobile first: 320px → 768px → 1024px → 1440px
- [ ] Menú hamburguesa funcional en mobile
- [ ] Imágenes/gráficos responsive (si se agregan)
- [ ] Touch targets mínimo 44x44px en mobile

### RNF-05: Arquitectura
- [ ] Separar: index.html, css/styles.css, css/animations.css, js/main.js
- [ ] Metodología BEM para nombres de clases CSS
- [ ] CSS custom properties para design tokens
- [ ] JavaScript modular (sin dependencias externas)
- [ ] Comentarios de sección en cada archivo

## 5. Design Tokens (Contrato de Diseño)

```css
/* Colores */
--deep: #0B1D33;
--navy: #152A4A;
--accent: #3B82F6;
--accent-light: #60A5FA;
--teal: #06B6D4;
--gold: #F59E0B;
--green: #10B981;
--surface: #0F2440;
--surface-light: #1A3558;
--text: #E2E8F0;
--text-muted: #94A3B8;
--white: #FFFFFF;
--border: rgba(255,255,255,0.08);

/* Tipografía */
--font-display: 'Playfair Display', serif;  /* Títulos */
--font-body: 'DM Sans', sans-serif;         /* Cuerpo */

/* Breakpoints */
--bp-mobile: 480px;
--bp-tablet: 768px;
--bp-desktop: 1024px;
--bp-wide: 1440px;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 100px;

/* Border radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 100px;
```

## 6. Estructura de Archivos Objetivo

```
main-sprintjudicial/
├── index.html              # HTML semántico
├── css/
│   ├── styles.css          # Estilos principales (BEM)
│   └── animations.css      # Keyframes y animaciones
├── js/
│   ├── main.js             # Lógica principal
│   └── analytics.js        # Analytics (placeholder)
├── assets/
│   └── (imágenes futuras)
├── robots.txt
├── sitemap.xml
├── .htaccess               # Headers de seguridad
├── docs/                   # Esta documentación
├── Dockerfile
└── CONTEXTO_SPRINT_JUDICIAL.md
```

## 7. Criterios de Aceptación

1. ✅ La landing page se ve idéntica o mejor que la versión actual
2. ✅ El menú hamburguesa funciona en mobile
3. ✅ Las animaciones de scroll funcionan en todos los navegadores modernos
4. ✅ Los counters se animan al entrar en viewport
5. ✅ Lighthouse Performance > 90
6. ✅ Todos los textos pasan contraste WCAG AA
7. ✅ La página funciona sin JavaScript (degradación graceful)
8. ✅ Open Graph tags generan preview correcto al compartir
9. ✅ 0 errores en W3C HTML Validator
10. ✅ 6 servicios mostrados (no 5)
