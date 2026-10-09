# Patrones UX/UI — Sprint Judicial

Patrones vigentes de la portada. El sitio es un espacio personal y académico: informa, enseña y deja el código a la vista. No persuade con urgencia ni promete resultados.

## Público

- Servidores judiciales, estudiantes y docentes interesados en automatizar trámites con criterio.
- Perfil mixto: poca jerga técnica, curiosidad por la IA, cautela ante promesas.
- Necesitan: ver el código, entender qué hace cada herramienta, saber qué no hace y a quién preguntar.

## Principios de contenido

1. **La IA asiste; la decisión es humana.** Aparece en el subtítulo del hero y en las descripciones de herramientas.
2. **Mostrar, no prometer.** Licencia, versión y fechas de cada herramienta, con enlace al repositorio.
3. **Transparencia.** El pie declara que el sitio no ofrece servicios comerciales ni recibe pagos. Los avisos aclaran cuándo algo es una demo pública o un grupo comunitario y no un canal oficial.
4. **Un solo canal remunerado, presentado como invitación académica:** docencia y conferencias.

## Patrones de interfaz

### Rotador del hero, pausable (WCAG 2.2.2)
La frase destacada del título cambia cada 3,5 s. Un botón "Pausar animación" (con `aria-pressed` y etiqueta que cambia a "Reanudar") la detiene. También se detiene con hover o foco en el título y con la pestaña oculta. El título tiene una versión completa `sr-only` y el rotador es `aria-hidden`, así el lector de pantalla lee una frase estable. Con movimiento reducido no rota y el botón no se muestra. Sin JS queda visible la primera frase.

### Fichas de acceso
Tres fichas bajo los botones del hero ("3 herramientas MIT", "Mentoría abierta", "JusticIALab 2024 · equipo Marduk") enlazan a `#herramientas`, `#mentoria` y `#reconocimientos`. Cada una lleva un ícono de color y una flecha.

### Tarjetas con acento
`pillars__card` (Qué hago) y `tool-card` (herramientas) elevan 2 px en hover con transición de 0,2 s. `tool-card` tiene una línea superior de color (azul, turquesa, dorado) y pastillas de estado y licencia. Las acciones de cada una son dos enlaces: repositorio y documentación o demo.

### Banda de reconocimientos
Bloque `#reconocimientos` dentro de Herramientas, con tarjetas pequeñas e íconos de color. Solo reconocimientos verificables.

### Pasos con línea
Mentoría abierta usa una lista ordenada de tres pasos. Desde 768 px una línea con gradiente se dibuja de izquierda a derecha al entrar en pantalla.

### Callouts
`callout` agrupa la invitación y su botón (grupo de WhatsApp en Mentoría; correo y LinkedIn en Docencia). `callout--stacked` apila el contenido en el segundo caso.

### Avisos con ícono
`notice` lleva una "i" dorada decorativa (sin texto alternativo, para que no se lea). `notice--inline` va dentro del callout, sin caja. Se usa para aclarar que el grupo es comunitario y que las demos usan IA de terceros.

### Docencia en dos columnas
Desde 1024 px, `teaching` muestra temas (tarjetas con ícono) y charlas realizadas (`events`) lado a lado; `writings` hace lo mismo con el blog y la publicación académica. En móvil se apilan.

### Respaldo del blog
El feed se construye por RSS (hasta 3 entradas). Si el RSS falla por red o CORS, o pasan 8 s, se oculta la rejilla y queda visible el bloque "Visita el blog" con su botón.

## Navegación y teclado

- **Skip-link** "Saltar al contenido principal" como primer elemento; es `sr-only` y aparece al recibir foco.
- **Enlaces internos con foco:** al activar un ancla el scroll descuenta la altura del navbar y el foco pasa al destino (`tabindex="-1"`).
- **Menú móvil:** botón con `aria-expanded` y `aria-controls`, Escape lo cierra y devuelve el foco al botón, focus trap con Tab y Shift+Tab, cierre al elegir un enlace o al pasar a escritorio. Se muestra con `display: flex` (no con `visibility`).
- **Navegación activa:** el enlace de la sección visible recibe `.is-active` (en escritorio, borde inferior).
- **Volver arriba:** botón flotante que aparece tras desplazarse.
- Foco visible global con contorno azul claro de 2 px.

## Accesibilidad (WCAG 2.1 AA mínimo)

- Contraste de texto 4,5:1 o más; botón primario 4,61:1 con texto `--deep`.
- Un `h1`, jerarquía sin saltos, `aria-labelledby` en las tarjetas de herramientas.
- Enlaces repetidos distinguidos con `aria-label` ("Repositorio de AgilEx en GitHub").
- Listas con `role="list"` para conservar la semántica en VoiceOver.
- Íconos decorativos con `aria-hidden="true"`; imágenes con `alt`, `width` y `height`.
- Movimiento reducido respetado en CSS y JS.
- `tests/test-accessibility.js` y `test-links.js` cubren la base automática; la revisión manual de teclado y lector de pantalla sigue siendo necesaria.

## Responsive (mobile first)

| Ancho | Comportamiento |
|-------|----------------|
| 320 px (base) | Una columna, menú overlay, fichas apiladas, padding de sección 64 px |
| 768 px | Navegación en línea, cuadrículas de 2 columnas, línea de pasos, padding 100 px |
| 1024 px | Herramientas y pilares en 3 columnas; Docencia y Escritos en dos columnas |
| 1280 px | Contenedor limitado a 1100 px; revisar solo que nada se desborde |

Detalles de iOS: pseudo-elementos decorativos y grano de fondo ocultos en móvil, hero con `100dvh` y respaldo `100vh`.

## Qué evitar

- Urgencia, escasez, contadores o testimonios inventados.
- Precios, planes, cotizaciones o lenguaje de consultoría.
- Claims de adopción o cifras sin fuente.
- Datos del lugar de trabajo, nombres de colegas o teléfonos personales.
- Animaciones que no se puedan pausar o que ignoren `prefers-reduced-motion`.
