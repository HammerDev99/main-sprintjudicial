# SEO y Meta Tags — Sprint Judicial

Estado de `index.html` al 2026-10-09. El sitio es un espacio personal y académico; el SEO describe a la persona y su trabajo, no una oferta de servicios. `tests/test-seo.js` verifica lo esencial de esta guía.

## `<head>`

### Básicos
- `lang="es"`, `charset` UTF-8, `viewport`.
- Título: `Daniel Arbeláez Álvarez | Sprint Judicial` (41 caracteres).
- Descripción: "Enseño y documento cómo automatizar trámites judiciales con software libre: herramientas de código abierto, mentoría abierta y docencia sobre IA en la justicia." (unos 160 caracteres).
- `<link rel="canonical" href="https://sprintjudicial.com/">`.
- Favicons: `/favicon.ico` y `/favicon.svg`.
- RSS: `<link rel="alternate" type="application/rss+xml">` hacia `https://blog.sprintjudicial.com/index.xml`.

En el HTML los caracteres acentuados van como entidades (`&aacute;`).

### Open Graph
`og:title`, `og:description` (igual que la meta description), `og:url`, `og:type=website`, `og:locale=es_CO`, `og:site_name=Sprint Judicial`. **No hay `og:image`**: la imagen está pendiente.

### Twitter
`twitter:card=summary` (sin imagen), con `twitter:title` y `twitter:description`. Cuando exista la imagen se pasará a `summary_large_image` y se agregará `twitter:image`.

### Schema.org (JSON-LD)
Un solo `<script type="application/ld+json">` con `@graph`:

- **Person** (`@id` `https://sprintjudicial.com/#autor`): nombre, `jobTitle` "Ingeniero de software", `url`, `knowsAbout` (informática jurídica, automatización de trámites judiciales, gobernanza de IA en la justicia), `award` (JusticIALab 2024, equipo Marduk) y `sameAs` (LinkedIn, GitHub, Google Scholar, blog y portafolio).
- **WebSite** (`@id` `.../#sitio`): nombre, `url`, `inLanguage` `es-CO`, `author` apuntando a la Person y `license` CC BY 4.0.

No se usan `ProfessionalService`, `FAQPage`, `telephone` ni `address`: el sitio no ofrece servicios comerciales ni publica datos de contacto personal. Los acentos van como escapes JSON (`á`).

## Archivos públicos

| Archivo | Contenido |
|---------|-----------|
| `robots.txt` | `Allow: /` y enlace al sitemap |
| `sitemap.xml` | Una URL (`https://sprintjudicial.com/`), `lastmod` 2026-10-09 |
| `llms.txt` | Resumen para modelos de lenguaje: herramientas MIT, mentoría abierta, docencia, escritos, nota de transparencia y licencia CC BY 4.0 |
| `humans.txt` | Autoría, estándares y licencia de contenidos |
| `security.txt` y `.well-known/` | Contacto de seguridad |

`llms.txt`, `humans.txt` y `README.md` están sujetos a las mismas reglas de contenido que la página (`test-compliance.js`). Actualizar `lastmod` del sitemap cuando cambie el contenido de la portada.

## Estructura de contenido

- Un solo `h1` (el título del hero, con texto completo para lectores de pantalla), `h2` por sección y `h3` por tarjeta o bloque.
- Alt descriptivo en el logo de AgilEx; iconos decorativos con `aria-hidden`.
- Enlaces externos con `rel="noopener noreferrer"`.
- Los datos de herramientas (licencia, versión, fechas) deben coincidir con los repositorios; no se publican cifras de uso sin fuente.

## Checklist

- [x] Título único y descriptivo
- [x] Meta description
- [x] Canonical
- [x] Open Graph y Twitter `summary`
- [x] JSON-LD `@graph` Person + WebSite
- [x] Un solo `h1` y jerarquía correcta
- [x] `robots.txt`, `sitemap.xml`, `llms.txt`
- [x] HTTPS con HSTS (nginx)
- [ ] **Pendiente:** `og-image.png` (1200x630) y paso a `summary_large_image`
- [ ] Medir Lighthouse (ver `verification_metrics.md`)

## Verificación

```bash
npm run test:seo
npx html-validate index.html
```

Validar el JSON-LD con el validador de datos estructurados de Schema.org tras cada cambio.
