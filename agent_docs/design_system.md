# Design System — Sprint Judicial

## Paleta de Colores

### Colores principales
| Token | Valor | Uso |
|-------|-------|-----|
| `--deep` | `#0B1D33` | Background principal (body) |
| `--navy` | `#152A4A` | Background alternativo |
| `--surface` | `#0F2440` | Fondo de cards y componentes |
| `--surface-light` | `#1A3558` | Fondo de cards hover/elevados |

### Colores de acento
| Token | Valor | Uso |
|-------|-------|-----|
| `--accent` | `#3B82F6` | CTAs, links activos, elementos interactivos |
| `--accent-light` | `#60A5FA` | Hover de accent, badges, texto destacado |
| `--teal` | `#06B6D4` | Acento secundario, gradientes |
| `--gold` | `#F59E0B` | Badges de reconocimiento, premios |
| `--green` | `#10B981` | Estado positivo, "en producción", checks |

### Colores de texto
| Token | Valor | Contraste vs --deep | Uso |
|-------|-------|-------------------|-----|
| `--white` | `#FFFFFF` | 15.5:1 | Títulos, texto principal fuerte |
| `--text` | `#E2E8F0` | 12.2:1 | Texto de cuerpo |
| `--text-muted` | `#94A3B8` | 5.4:1 | Texto secundario, labels, descriptions |

### Bordes y overlays
| Token | Valor | Uso |
|-------|-------|-----|
| `--border` | `rgba(255,255,255,0.08)` | Bordes sutiles en cards, separadores |
| `--glass-bg` | `rgba(15,36,64,0.7)` | Glassmorphism para cards elevados |
| `--glass-border` | `rgba(255,255,255,0.12)` | Bordes glass |

---

## Tipografía

### Font Families
| Token | Fuente | Peso disponible | Uso |
|-------|--------|----------------|-----|
| `--font-display` | Source Serif 4 | 600, 700, 800 | h1, h2, stats, logo |
| `--font-body` | Inter | 400, 500, 600, 700 | Todo el resto |

### Escala tipográfica
| Elemento | Size | Weight | Font |
|----------|------|--------|------|
| h1 | `clamp(2.5rem, 5vw, 3.8rem)` | 800 | Display |
| h2 | `clamp(1.8rem, 3.5vw, 2.6rem)` | 700 | Display |
| h3 | `1.15rem` | 700 | Body |
| body | `1rem` (16px) | 400 | Body |
| small/label | `0.85-0.92rem` | 500-600 | Body |
| badge/tag | `0.78-0.82rem` | 600-700 | Body |

### Line Height
- Títulos: `1.15 - 1.2`
- Cuerpo: `1.6 - 1.7`

---

## Spacing

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-xs` | `4px` | Micro gaps |
| `--space-sm` | `8px` | Padding interno pequeño |
| `--space-md` | `16px` | Padding estándar |
| `--space-lg` | `24px` | Gap entre elementos relacionados |
| `--space-xl` | `32px` | Padding de componentes |
| `--space-2xl` | `48px` | Gap entre secciones internas |
| `--space-3xl` | `64px` | Gap entre secciones principales |
| `--space-4xl` | `100px` | Padding vertical de secciones |

---

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `8px` | Botones, inputs |
| `--radius-md` | `12px` | Icon containers |
| `--radius-lg` | `16px` | Cards |
| `--radius-xl` | `20px` | Cards grandes |
| `--radius-full` | `100px` | Pills, badges |

---

## Breakpoints

| Token | Valor | Descripción |
|-------|-------|-------------|
| `--bp-mobile` | `480px` | Teléfonos grandes |
| `--bp-tablet` | `768px` | Tablets, menú hamburguesa threshold |
| `--bp-desktop` | `1024px` | Desktop |
| `--bp-wide` | `1440px` | Desktop ancho |

Container max-width: `1100px` con padding lateral `24px`.

---

## Componentes

### Botones
```css
.btn                  /* Base: padding 14px 28px, radius-sm, font-weight 600 */
.btn--primary         /* accent bg, white text */
.btn--outline         /* transparent bg, border, text color */
.btn--primary:hover   /* accent-light bg, translateY(-2px), box-shadow */
```

### Cards
```css
.service-card         /* surface bg, border, radius-lg, padding 32px */
.service-card:hover   /* translateY(-4px), shadow, border glow */
.cred-item            /* text-align center, padding 24px */
```

### Badges
```css
.hero__badge          /* accent bg opacity, border, radius-full, small text */
.service-card__tag    /* white bg 6%, radius-full, small text */
.service-card__status /* green/gold bg, status indicator */
```

---

## Animaciones

### Principios
- Duración: 300-800ms
- Easing: ease (entradas), ease-out (salidas)
- Scroll animations: fade-up con 24px de recorrido
- Hover: translateY(-2px a -4px), box-shadow, border glow
- Delay escalonado: 0.1s entre elementos en grupo

### Keyframes definidos
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## Reglas de Diseño (del CONTEXTO)

### HACER
- Comunicar confianza a través de evidencia
- Espaciado generoso (opuesto a documentos legales)
- Tema oscuro que transmita seriedad y tecnología
- Directo y sin rodeos (el abogado no tiene tiempo)

### NO HACER
- No parecer template genérico de SaaS
- No iconografía clipart ni ilustraciones IA genéricas
- No colores pastel ni estética "startup friendly"
- No sobrecargado — claridad sobre espectáculo
