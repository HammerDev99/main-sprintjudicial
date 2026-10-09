# Design Review: Portada sprintjudicial.com (post SPEC-004)

**Review ID:** portada_20261009_063030
**Reviewed:** 2026-10-09 06:30
**Target:** index.html + css/styles.css + js/main.js (commit 709c45e) vs. diseño anterior (commit be5e17f)
**Focus:** Visual (jerarquía, ritmo, separación) + Usabilidad/interacción (dinamismo del hero, microinteracciones)
**Contexto:** página personal/académica de consumo de contenido; responsive (320 → 1440)
**Método:** ambas versiones servidas en local y comparadas a 1280×880 sección por sección.

## Summary

La reescritura de SPEC-004 conservó tokens y tipografía, pero perdió el vocabulario visual que daba estructura al diseño anterior: frase destacada y rotativa en el hero, franja de datos, tarjetas con acentos de color y etiquetas, línea de proceso, insignias de fecha, tarjetas de credenciales y banda de llamada a la acción. Las secciones largas (Herramientas, Docencia, Escritos) encadenan tarjetas, avisos, subtítulos pequeños y listas en prosa sin contenedores propios, por eso la lectura se percibe "de corrido".

**Issues Found:** 12 — Critical 0 · Major 6 · Minor 4 · Suggestions 2

## Major Issues

### 1. Hero plano: sin frase destacada, sin rotación ni franja de datos
**Location:** index.html:110-125 · css/styles.css (hero) · js/main.js (rotador eliminado)
**Problem:** el diseño anterior tenía la frase clave con degradado azul→turquesa que rotaba cada 3,5 s y una franja de datos con separador superior. Hoy el h1 es todo blanco y estático y debajo de los botones no hay nada.
**Impact:** se pierde el punto focal y la sensación de producto vivo; el hero no "presenta" nada concreto.
**Recommendation:** reintroducir la frase rotativa (accesible: texto estático para lectores de pantalla, pausa en hover/foco, botón de pausa, sin rotación con movimiento reducido) y una franja de 3 datos verificables.

### 2. Subsecciones sin jerarquía (`.section__subtitle`)
**Location:** css/styles.css (`.section__subtitle` 1.05rem) · index.html (Reconocimientos, Temas, Charlas, Blog, Publicaciones)
**Problem:** los h3 de subsección tienen casi el mismo tamaño y peso que el cuerpo y no tienen ícono, línea ni contenedor.
**Impact:** el ojo no encuentra dónde empieza cada bloque; las secciones se leen como un solo texto.

### 3. Listas en prosa (`.entries`) para reconocimientos, charlas y publicaciones
**Location:** index.html:225-236, 296-305, 343-348
**Problem:** párrafos con borde izquierdo de 2 px y enlace al final. El diseño anterior presentaba lo equivalente como tarjetas con ícono (credenciales) o con insignia de fecha (timeline).
**Impact:** baja escaneabilidad; el premio (dato más fuerte del sitio) queda escondido en una línea de texto.

### 4. Secciones largas sin contenedores internos
**Location:** #herramientas (tarjetas → aviso → h3 → lista → enlace), #docencia (h3 → tarjetas → h3 → lista → enlace → botones → aviso), #escritos
**Problem:** 5–7 bloques heterogéneos apilados sin agrupación visual.
**Impact:** sensación de "texto de corrido"; los CTA de Docencia quedan perdidos al final.

### 5. Tarjetas de herramientas uniformes y poco escaneables
**Location:** `.tool-card` (un solo degradado), `.tool-card__meta` (frase)
**Problem:** el diseño anterior diferenciaba cada tarjeta con color de acento, etiqueta tipo "pill" y estado con punto. Hoy licencia/versión/demo van en una frase gris.
**Impact:** las tres herramientas se ven iguales; los datos clave no se leen de un vistazo.

### 6. Microinteracciones de tarjetas anuladas
**Location:** css/animations.css (`.reveal--stagger.reveal--visible > *:nth-child(n)` especificidad 0,3,0) vs. `.pillars__card:hover`, `.tool-card:hover` (0,2,0)
**Problem:** el `translateY(-4px)` del hover nunca se aplica y la transición queda reemplazada.
**Impact:** las tarjetas no responden al puntero; la página se siente estática.

## Minor Issues

7. **Alineación inconsistente:** "Qué hago" centrado; el resto alineado a la izquierda (el diseño anterior centraba casi todos los encabezados).
8. **Tres avisos amarillos idénticos** (demos, grupo, jornada) repiten el mismo bloque y cortan el ritmo; mejor integrarlos en el bloque al que pertenecen.
9. **Respaldo del blog:** si el feed falla queda un botón solo; falta una tarjeta de respaldo.
10. **Pasos de la mentoría** sin la línea de conexión que tenía "Cómo funciona"; se ven como tres tarjetas sueltas.

## Suggestions

11. Banda de llamada a la acción para Docencia (como el antiguo CTA intermedio con brillo radial), con los botones y el aviso de jornada dentro.
12. Etiquetas de acción en las tarjetas de "Qué hago" (como los verbos INVESTIGAR/REDACTAR del pipeline).

## Positive Observations

- Tokens, tipografía, navbar, foco visible y contraste AA se mantienen; no hay scroll horizontal en 320–1440.
- "Qué hago" ya usa el patrón de tarjetas centradas con ícono y funciona bien.
- Las animaciones de entrada por sección (`data-animate`) siguen activas y respetan movimiento reducido.

## Next Steps

1. Recuperar el vocabulario visual anterior (componentes) con el contenido nuevo: hero rotativo + franja de datos, tarjetas con acento y etiquetas, credenciales, línea de pasos, insignias de fecha, banda CTA.
2. Reorganizar las secciones largas en bloques contenidos y encabezados centrados consistentes.
3. Corregir la especificidad del hover y revisar el ritmo con capturas a 320/768/1280.
