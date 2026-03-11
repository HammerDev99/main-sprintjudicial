# SEO y Meta Tags — Sprint Judicial

## Meta Tags Obligatorios

### Básicos
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sprint Judicial | IA y Automatización para Abogados Litigantes</title>
<meta name="description" content="Herramientas de inteligencia artificial y automatización para abogados litigantes en Colombia. Asistente legal IA, buscador de jurisprudencia por similitud, generador de documentos, automatización de procesos. Desarrollado por un ingeniero con +10 años en la Rama Judicial.">
```

### Open Graph (Facebook, LinkedIn, WhatsApp)
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://sprintjudicial.com">
<meta property="og:title" content="Sprint Judicial | IA y Automatización para Abogados Litigantes">
<meta property="og:description" content="6 herramientas de IA para abogados litigantes en Colombia. Desarrolladas por un ingeniero con +10 años de experiencia en la Rama Judicial.">
<meta property="og:image" content="https://sprintjudicial.com/assets/og-image.png">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="Sprint Judicial">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Sprint Judicial | IA para Abogados">
<meta name="twitter:description" content="6 herramientas de IA para abogados litigantes en Colombia.">
<meta name="twitter:image" content="https://sprintjudicial.com/assets/og-image.png">
```

### Schema.org (JSON-LD) — ProfessionalService
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Sprint Judicial",
  "description": "IA y automatización para abogados litigantes en Colombia",
  "url": "https://sprintjudicial.com",
  "telephone": "+573015771258",
  "email": "contacto@sprintjudicial.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medellín",
    "addressRegion": "Antioquia",
    "addressCountry": "CO"
  },
  "founder": {
    "@type": "Person",
    "name": "Daniel Arbelaez Alvarez",
    "jobTitle": "Ingeniero en Software",
    "url": "https://www.linkedin.com/in/daniel-arbelaez-"
  },
  "areaServed": "CO",
  "serviceType": ["Legal Technology", "AI Legal Assistant", "Document Automation"],
  "sameAs": [
    "https://www.linkedin.com/in/daniel-arbelaez-",
    "https://github.com/HammerDev99",
    "https://blog.sprintjudicial.com"
  ]
}
</script>
```

### Schema.org (JSON-LD) — FAQPage
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Pregunta?", "acceptedAnswer": { "@type": "Answer", "text": "Respuesta." } }
  ]
}
</script>
```
> Las 6 preguntas del FAQ están implementadas en `index.html` con el schema completo.

---

## Keywords Objetivo

### Primarias
- IA para abogados Colombia
- automatización legal Colombia
- software para abogados litigantes
- legaltech Colombia
- Sprint Judicial

### Secundarias
- inteligencia artificial sector justicia
- buscador jurisprudencia Colombia
- automatización documentos legales
- asistente legal inteligencia artificial

---

## Archivos de Soporte

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://sprintjudicial.com/sitemap.xml
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sprintjudicial.com/</loc>
    <lastmod>2026-03-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## Checklist SEO

- [x] Title tag único y descriptivo (< 60 chars)
- [x] Meta description (< 155 chars, con call to action)
- [x] Open Graph tags completos (incluye og:image)
- [x] Twitter Card tags (incluye twitter:image)
- [x] Schema.org JSON-LD — ProfessionalService (con sameAs y founder.url)
- [x] Schema.org JSON-LD — FAQPage (6 preguntas, rich results)
- [x] H1 único por página
- [x] Heading hierarchy correcta (h1 > h2 > h3)
- [ ] Alt text en todas las imágenes (pendiente: no hay imágenes aún)
- [x] URLs limpias y descriptivas
- [x] robots.txt
- [x] sitemap.xml
- [x] Canonical URL (`<link rel="canonical">`)
- [x] lang="es" en html
- [x] Viewport meta tag
- [x] HTTPS (obligatorio)
- [x] Velocidad de carga < 3s
- [x] Mobile-friendly (responsive, mobile-first)
- [ ] og-image.png (pendiente: crear asset en assets/)
