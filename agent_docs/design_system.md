# Design System — Sprint Judicial

Tema oscuro único (no hay modo claro). Los valores salen de `:root` en `css/styles.css`; esta guía resume su uso. Si algo difiere, manda el CSS.

## Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--deep` | #0B1D33 | Fondo de página; texto sobre botón primario |
| `--navy` | #152A4A | Fondos de apoyo |
| `--surface` | #0F2440 | Tarjetas |
| `--surface-light` | #1A3558 | Tarjetas elevadas y hover |
| `--accent` | #3B82F6 | Acción principal, bordes activos |
| `--accent-light` | #60A5FA | Foco, hover, énfasis del rotador |
| `--teal` | #06B6D4 | Acento secundario (tarjeta TYBABot, iconos) |
| `--gold` | #F59E0B | Acento terciario, ícono de avisos |
| `--green` `--purple` `--red` | #10B981 #8B5CF6 #EF4444 | Reservados |
| `--text` | #E2E8F0 | Texto de cuerpo |
| `--text-muted` | #94A3B8 | Texto secundario |
| `--white` | #FFFFFF | Títulos |
| `--border` | rgba(255,255,255,0.08) | Bordes finos |
| `--glass-bg` `--glass-border` | rgba(15,36,64,0.7) / rgba(255,255,255,0.12) | Navbar translúcido |

### Contraste (AA)

- Texto de cuerpo y `--text-muted` sobre `--deep` y `--surface` superan 4,5:1.
- Botón primario: texto `--deep` sobre `--accent`, 4,61:1. El texto blanco sobre `--accent` no cumple, por eso se usa `--deep`.
- Foco visible global: `outline: 2px solid var(--accent-light)` con `outline-offset: 3px`.
- No comunicar estado solo con color: las pastillas de estado llevan texto.

## Tipografía

- Títulos: Source Serif 4 (600, 700, 800) vía `--font-display`. Los `h3` usan la fuente de cuerpo.
- Cuerpo: Inter (400 a 700) vía `--font-body`.
- Carga con Google Fonts y `display=swap`.
- `h1`: `clamp(2.5rem, 5vw, 3.8rem)`; título del hero: `clamp(1.9rem, 4.6vw, 3.4rem)`; `h2`: `clamp(1.8rem, 3.5vw, 2.6rem)`; `h3`: 1,15 rem.
- Texto de apoyo: 0,75 a 0,92 rem. `line-height` base 1,7.

## Escalas

| Escala | Valores |
|--------|---------|
| Espaciado | `--space-xs` 4, `sm` 8, `md` 16, `lg` 24, `xl` 32, `2xl` 48, `3xl` 64, `4xl` 100 px |
| Radios | `--radius-sm` 8, `md` 12, `lg` 16, `xl` 20, `full` 100 px |
| Layout | `--container-max` 1100 px; `--nav-height` 64 px |
| Padding de sección | 64 px en móvil; 100 px desde 768 px |
| Breakpoints | Base 320; `min-width` 768 y 1024 |

## Catálogo de bloques BEM

| Bloque | Uso |
|--------|-----|
| `navbar` | Barra fija; `__toggle` hamburguesa, `__links`, `__cta`; `--scrolled`, `--menu-open` |
| `btn` | `--primary` (acción) y `--outline` (secundaria) |
| `hero` | Portada con `__title`, `__subtitle`, `__actions` |
| `rotator` | Frase rotativa dentro del título (`__item.is-active`) y botón `__toggle` de pausa |
| `hero-chips` | Fichas de acceso a Herramientas, Mentoría y Reconocimientos; icono `--teal`/`--blue`/`--gold` |
| `section` | `__label`, `__title`, `__description` (con `--center`), `__link`, `__more`; `--alt` para fondo alterno |
| `pillars` | Tres tarjetas de "Qué hago" con verbo, icono, título y descripción |
| `tool-card` | Tarjeta de herramienta con acento `--blue`/`--teal`/`--gold`, `__logo` o `__icon`, `__meta`, `__actions`, `__link` |
| `pills` / `pill` | Etiquetas de estado y licencia; `pill--status` |
| `notice` | Aviso con ícono "i" dorado; `--inline` sin caja |
| `recognitions` | Banda de reconocimientos (`__title`, `__grid`, `__card`, `__icon`) |
| `steps` | Lista ordenada de pasos con línea que se dibuja al entrar |
| `callout` | Caja de invitación con acción; `--stacked` apila el contenido |
| `teaching` | Dos columnas de Docencia: temas y charlas |
| `block-heading` | Subtítulo de bloque dentro de una sección |
| `topics` | Temas de docencia con icono de color |
| `events` / `event` | Charlas realizadas, con `__badge`, `__title`, `__desc`, `__link` |
| `writings` | Dos columnas de Escritos: blog y publicaciones |
| `blog` | Feed del blog (`__grid`, `__card`) y bloque de respaldo `__fallback` |
| `publication` | Cita del artículo académico |
| `footer` | Pie con navegación, enlaces externos, contacto y licencia |
| `back-to-top` | Botón flotante de volver arriba |
| `sr-only` | Texto solo para lector de pantalla; también el skip-link, visible al recibir foco |

Regla: antes de crear un bloque nuevo, reutilizar uno de la lista. Toda clase nueva debe usarse en el HTML o JS (`test-css-usage.js`).

## Movimiento

- **Rotador del hero:** cambia cada 3,5 s con transición de opacidad y desplazamiento de 0,4 s; es pausable con el botón, se detiene con hover, foco o pestaña oculta.
- **Hover de tarjetas y fichas:** transición de 0,2 s (elevación, sombra, borde). El acento superior de `tool-card` marca el color.
- **Entrada al scroll (`.reveal`):** opacidad y desplazamiento de 0,7 s; con `data-stagger` los hijos entran escalonados cada 0,05 s hasta el sexto. Línea de `steps`: 0,8 s.
- **Movimiento reducido:** `@media (prefers-reduced-motion: reduce)` desactiva `reveal`, transiciones, elevaciones al hover y animaciones decorativas; el rotador no rota y su botón queda oculto.
- Efectos decorativos de pseudo-elementos y el grano de fondo se ocultan en móvil (rendimiento en iOS).

## Reglas de uso

1. Colores, fuentes, espacios y radios siempre desde tokens.
2. Una sola jerarquía de encabezados: `h1` en el hero, `h2` por sección, `h3` por tarjeta.
3. Contraste mínimo AA en todo texto nuevo; verificar antes de agregar un color.
4. Sin imágenes decorativas pesadas; los iconos son SVG en línea con `aria-hidden="true"`.
