# Métricas de Verificación — Sprint Judicial

## Lighthouse (objetivo > 90 en cada categoría)

| Categoría | Objetivo | Actual | Estado |
|-----------|----------|--------|--------|
| Performance | > 90 | — | ⬜ No medido |
| Accessibility | > 90 | — | ⬜ No medido |
| Best Practices | > 90 | — | ⬜ No medido |
| SEO | > 90 | — | ⬜ No medido |

## HTML Validation

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| W3C Errors | 0 | — |
| W3C Warnings | < 5 | — |

## Accesibilidad (WCAG 2.1 AA)

| Criterio | Objetivo | Actual |
|----------|----------|--------|
| Contraste texto normal | ≥ 4.5:1 | ✅ 5.4:1 (text-muted) |
| Contraste texto grande | ≥ 3:1 | ✅ |
| Keyboard navigable | 100% | ⬜ Pendiente |
| aria-labels completos | 100% | ⬜ Pendiente |
| Focus visible | 100% | ⬜ Pendiente |
| Skip-to-content | Presente | ⬜ Pendiente |
| Heading hierarchy | Correcto | ✅ |

## Responsive

| Breakpoint | Layout correcto | Menú funcional | CTAs visibles |
|-----------|----------------|----------------|---------------|
| 320px | ⬜ | ⬜ | ⬜ |
| 480px | ⬜ | ⬜ | ⬜ |
| 768px | ⬜ | ⬜ | ⬜ |
| 1024px | ⬜ | ⬜ | ⬜ |
| 1440px | ⬜ | ⬜ | ⬜ |

## Performance

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| FCP (First Contentful Paint) | < 1.5s | — |
| LCP (Largest Contentful Paint) | < 2.5s | — |
| CLS (Cumulative Layout Shift) | < 0.1 | — |
| TBT (Total Blocking Time) | < 200ms | — |
| Page weight | < 200KB | ~25KB (HTML only) |
| Requests | < 10 | 3 (HTML + 2 fonts) |

## SEO

| Criterio | Estado |
|----------|--------|
| title tag | ✅ |
| meta description | ✅ |
| Open Graph tags | ⬜ Pendiente |
| Twitter Cards | ⬜ Pendiente |
| Schema.org JSON-LD | ⬜ Pendiente |
| robots.txt | ⬜ Pendiente |
| sitemap.xml | ⬜ Pendiente |
| Canonical URL | ⬜ Pendiente |
| HTTPS | ✅ (hosting) |

## Cómo Medir

```bash
# Lighthouse CLI
npx lighthouse https://sprintjudicial.com --output=json --output-path=./lighthouse.json

# HTML Validation
npx html-validate index.html

# Accesibilidad
npx pa11y https://sprintjudicial.com

# Performance (local)
python -m http.server 8000
# Luego abrir Chrome DevTools → Lighthouse
```
