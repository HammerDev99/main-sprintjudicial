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
- Secciones: 100px de padding vertical (dar aire)
- Cards: 32px de padding interno
- Entre grupos: 48px
- Container: 1100px máximo (no stretchar en ultrawides)

---

## Patrones de Navegación

### Scroll-based Navigation
- Smooth scroll para anchor links
- Active state en navbar según sección visible (IntersectionObserver)
- Navbar con backdrop-blur que cambia opacidad al scrollear

### Mobile Navigation
- Hamburger menu en < 768px
- Full-screen overlay con links
- Cerrar al: click en link, click fuera, ESC key
- Focus trap dentro del menú abierto (accesibilidad)

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
- aria-expanded en hamburger menu
- aria-current en nav link activo
- sr-only class para texto solo para screen readers

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
