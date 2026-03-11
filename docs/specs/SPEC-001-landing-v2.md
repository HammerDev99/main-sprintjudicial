# SPEC-001: Landing Page v2

> Fecha: 2026-03-10
> Estado: ✅ Completada
> Prioridad: P0
> Dependencias: ninguna

---

## 1. Objetivo

Transformar la landing page actual (HTML estático single-file) en una landing page profesional,
accesible, performante y con arquitectura mantenible que refleje el posicionamiento premium
de Sprint Judicial en el mercado LegalTech colombiano.

## 2. Estado Actual

- Arquitectura modular: `index.html` + `css/styles.css` + `css/animations.css` + `js/main.js`
- 19 secciones: Hero (rotativo), Trust Bar (4 logos), Pipeline, Servicios (6), Cómo Funciona, Comparativa, ¿Por qué?, Credenciales, CTA Mid, Seguridad, Sobre Mí, Tu Primer Mes, FAQ, Blog, CTA Final, Footer, WhatsApp Float, Back-to-top
- Responsive mobile-first (320px → 768px → 1024px → 1440px)
- Animaciones IntersectionObserver, menú hamburguesa, counters animados
- SEO completo: OG, Twitter Card, Schema.org (Organization + FAQPage), canonical, sitemap, robots.txt
- Tipografía: Source Serif 4 + Inter
- Security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options (nginx/default.conf)

## 3. Requisitos Funcionales

### RF-01: Navegación
- [x] Menú hamburguesa funcional en mobile (< 768px)
- [x] Navbar cambia background on scroll (más opaco al scrollear)
- [x] Smooth scroll para anchor links
- [x] Skip-to-content link para accesibilidad
- [x] Logo clickeable lleva al hero

### RF-02: Hero Section
- [x] Animaciones fade-up escalonadas (ya implementadas con CSS, activar con JS)
- [x] Counter animation para estadísticas (10+, 6, Nacional)
- [x] Actualizar "5 Herramientas" → "6 Herramientas" (el contexto define 6 servicios)
- [x] Scroll indicator (chevron/flecha animada) al fondo del hero

### RF-03: Servicios
- [x] Mostrar 6 servicios (agregar Anonimizador como servicio diferenciado si falta)
- [x] Badge de estado por servicio: "En producción" / "En desarrollo"
- [x] Hover effects mejorados con glassmorphism sutil
- [x] Precio de referencia visible en cada tarjeta

### RF-04: Sección "Cómo Funciona" (NUEVA)
- [x] 4 pasos: Agende demo → Evaluamos necesidad → Implementamos → Soporte continuo
- [x] Diseño tipo timeline o steps horizontales
- [x] Iconografía consistente con el design system
- [x] Ubicar entre Servicios y Credenciales

### RF-05: Credenciales
- [x] Cards con efecto glass/glassmorphism
- [x] Métricas numéricas verificables (981 tests, 85.3% F1, <200ms, 293+ commits)
- [x] Links de verificación donde sea posible

### RF-06: Sección Sobre Mí
- [x] Mantener estructura actual (está bien lograda)
- [x] Agregar links a certificaciones/verificaciones

### RF-07: CTA Final
- [x] WhatsApp como CTA principal (ya implementado)
- [x] Email como secundario
- [ ] Agregar opción de agendar por Calendly o similar (futuro — Fase 2)

### RF-08: Footer
- [x] Rediseñar en 3-4 columnas: Navegación, Servicios, Contacto, Legal
- [x] Logo + descripción breve de Sprint Judicial
- [x] Links a redes sociales (LinkedIn, GitHub, Blog)
- [x] Badges de seguridad/privacidad (Ley 1581)
- [x] Copyright actualizado a 2026

## 4. Requisitos No Funcionales

### RNF-01: Performance
- [x] Lighthouse Performance > 90
- [x] First Contentful Paint < 1.5s
- [x] font-display: swap en Google Fonts
- [x] CSS crítico inline, CSS no-crítico deferred

### RNF-02: SEO
- [x] Open Graph meta tags (og:title, og:description, og:image, og:url)
- [x] Twitter Card meta tags
- [x] Schema.org structured data (ProfessionalService + FAQPage)
- [x] robots.txt con reglas básicas
- [x] sitemap.xml con URL principal

### RNF-03: Accesibilidad (WCAG 2.1 AA)
- [x] Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande
- [x] Todos los elementos interactivos alcanzables por teclado
- [x] aria-labels en botones y links con iconos
- [x] HTML semántico: main, article, section, header, footer, nav
- [x] Skip-to-content link
- [x] Focus visible en todos los elementos interactivos

### RNF-04: Responsive
- [x] Mobile first: 320px → 768px → 1024px → 1440px
- [x] Menú hamburguesa funcional en mobile
- [x] Imágenes/gráficos responsive (si se agregan)
- [x] Touch targets mínimo 44x44px en mobile

### RNF-05: Arquitectura
- [x] Separar: index.html, css/styles.css, css/animations.css, js/main.js
- [x] Metodología BEM para nombres de clases CSS
- [x] CSS custom properties para design tokens
- [x] JavaScript modular (sin dependencias externas)
- [x] Comentarios de sección en cada archivo

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
--font-display: 'Source Serif 4', serif;    /* Títulos */
--font-body: 'Inter', sans-serif;           /* Cuerpo */

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
├── index.html              # HTML semántico (19 secciones)
├── css/
│   ├── styles.css          # Estilos principales (BEM)
│   └── animations.css      # Keyframes y animaciones
├── js/
│   ├── main.js             # Lógica principal
│   └── analytics.js        # Analytics (placeholder)
├── nginx/
│   └── default.conf        # Security headers + performance (OWASP)
├── src/                    # Logos trust-bar (PNGs transparentes)
├── assets/                 # Imágenes y recursos
├── .well-known/            # security.txt
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── favicon.svg
├── security.txt
├── humans.txt
├── llms.txt
├── docs/                   # Specs, research, plans, ADRs
├── agent_docs/             # Documentación técnica por tema
├── Dockerfile
└── CLAUDE.md               # Mapa del proyecto
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
