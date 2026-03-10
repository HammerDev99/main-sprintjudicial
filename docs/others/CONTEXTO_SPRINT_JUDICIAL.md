# SPRINT JUDICIAL — Contexto del Proyecto Landing Page

## 1. Visión General

Sprint Judicial es la marca comercial de Daniel Arbelaez Alvarez, ingeniero de software con más de 10 años de experiencia dentro de la Rama Judicial de Colombia. El landing page es la cara pública de un ecosistema de 6 servicios de IA y automatización dirigidos a abogados litigantes y firmas de abogados en Colombia.

**URL del sitio**: sprintjudicial.com
**Blog**: blog.sprintjudicial.com
**Links**: links.sprintjudicial.com
**Documentación Sherlock**: docs.sherlock.sprintjudicial.com

---

## 2. Filosofía y Posicionamiento

### Principio central
> "La IA asiste, no decide. Todo dato extraído requiere validación humana."

### Posicionamiento frente al mercado
Sprint Judicial NO es una plataforma SaaS genérica. Se diferencia de competidores (Clio, Smokeball, LegalSoftApp, Smiofi, Gavel) en 4 ejes:

1. **Hecho desde adentro**: Desarrollado por alguien que ha trabajado dentro de juzgados colombianos (Escribiente, Citador, Asistente Judicial, Técnico en Sistemas). No es tecnología importada.
2. **Seguridad como obsesión**: Todo funciona en local o en servidores privados. Ningún dato del cliente sale de su infraestructura. Cumplimiento con Ley 1581/2012, CONPES 3975 y Acuerdo PCSJA24-12243.
3. **Código abierto / caja blanca**: El cliente puede auditar, modificar y migrar. Sin vendor lock-in. Sin dependencia del proveedor.
4. **Adaptado a Colombia**: Normatividad colombiana, flujos judiciales colombianos, realidad operativa colombiana. No es un producto gringo tropicalizado.

### Tono de comunicación
- **Profesional pero cercano**: No somos una corporación. Somos un ingeniero que entiende su problema porque lo ha vivido.
- **Directo y sin rodeos**: El abogado no tiene tiempo. Vamos al grano: qué problema resuelve, cómo funciona, cuánto cuesta.
- **Confianza a través de evidencia**: No prometemos. Mostramos métricas reales, productos en producción, reconocimientos verificables.
- **Educativo sin ser condescendiente**: Muchos abogados no entienden la IA. Explicamos sin simplificar de más.

---

## 3. Público Objetivo

### Primario
- **Abogados litigantes independientes** en Colombia que manejan múltiples casos y pierden tiempo en tareas administrativas y de investigación.
- **Firmas pequeñas y medianas** (3-15 abogados) que quieren sistematizar sus procesos internos sin depender de plataformas SaaS costosas.

### Secundario
- **Departamentos legales internos** de empresas que necesitan automatizar gestión documental y búsqueda de precedentes.
- **Entidades del sector justicia** (juzgados, tribunales) que buscan innovación tecnológica.

### Perfil del visitante típico
- Abogado colombiano, 30-55 años
- Poco conocimiento técnico pero curiosidad por IA
- Escéptico pero abierto si ve evidencia real
- Valora: ahorro de tiempo, seguridad de datos, resultados concretos
- Rechaza: jerga técnica, promesas vacías, dependencia tecnológica

---

## 4. Los 6 Servicios (Ecosistema)

### Servicio 1: Asistente Legal IA
- **Qué es**: Asistente virtual privado entrenado en normatividad y jurisprudencia de la especialidad del abogado
- **Tecnología**: OpenAI API, Streamlit, corpus personalizado
- **Estado**: En producción (TutelaBot, TYBABot publicados)
- **Modelo de precio**: Suscripción mensual ($150K-$1.2M COP/mes según plan)
- **Diferenciador**: Trabaja con documentos propios, servidor seguro o local

### Servicio 2: Buscador Inteligente y Memoria Institucional
- **Qué es**: Sistema de búsqueda por similitud con dos motores: interno (documentos de la firma) y externo (jurisprudencia nacional)
- **Tecnología**: Sherlock (MinHash LSH + TF-IDF + Entity Matching), OCR (Tesseract + PaddleOCR), NER (SpaCy)
- **Estado**: Motor Sherlock en producción en CSJ Bello. 981 tests, NER F1: 85.3%, latencia 80-200ms con caché
- **Modelo de precio**: Desde $80K COP/50 consultas (solo jurisprudencia) hasta setup de $5M-$12M + mensualidad (firma completa)
- **Diferenciador**: Pipeline híbrido de 3 niveles, OCR para escaneados, detección de duplicados, cumplimiento PCSJA24-12243

### Servicio 3: Anonimizador de Documentos Legales
- **Qué es**: Herramienta que detecta y reemplaza automáticamente datos personales sensibles en Word, PDF y Excel
- **Tecnología**: Python, regex + patrones inteligentes, procesamiento local
- **Estado**: En desarrollo avanzado (cuestionario de requisitos completado)
- **Modelo de precio**: Pago único ($200K-$3.5M COP según plan)
- **Diferenciador**: 100% local, coherencia semántica, registro auditable, cumple Ley 1581/2012

### Servicio 4: Automatización de Procesos a Medida
- **Qué es**: Desarrollo de software personalizado que automatiza tareas administrativas específicas de la firma
- **Tecnología**: Python, Power Automate, PowerBI, Excel VBA, APIs
- **Estado**: Agilex en producción a nivel nacional (293+ commits, 8 releases)
- **Modelo de precio**: Proyecto puntual ($500K-$8M COP) o retainer mensual ($800K-$2M COP/mes)
- **Diferenciador**: A medida (no genérico), código fuente entregado, conocimiento de flujos judiciales reales
- **Caso de éxito clave**: Agilex — reducción ≈200% tiempo de protocolización expedientes electrónicos

### Servicio 5: Generador Inteligente de Documentos
- **Qué es**: Entrevistas guiadas que producen documentos legales completos (tutelas, demandas, contratos) en minutos
- **Tecnología**: Docassemble (Python, YAML, Markdown), servidor propio
- **Estado**: Servidor Docassemble operativo, referente: Suffolk LIT Lab (EE.UU.)
- **Modelo de precio**: Setup ($800K-$10M COP) + mensualidad hosting ($80K-$800K COP/mes)
- **Diferenciador**: Código abierto, sin lock-in, precio fijo por línea (no por usuario), adaptado al derecho colombiano

### Servicio 6: Anonimizador de Documentos Legales
(Ya descrito en Servicio 3)

**Nota**: Los servicios se venden individual o como ecosistema. Un cliente puede entrar por uno y escalar a los demás.

---

## 5. Credenciales y Prueba Social

Estos son los elementos verificables que generan confianza. Deben estar visibles y prominentes:

| Credencial | Detalle | Link/Verificación |
|---|---|---|
| **Ganador JusticIALab** | Primer Concurso Nacional de Innovación de la Rama Judicial — Proyecto MARDUK, categoría Justicia Basada en Datos (2024) | Verificable |
| **Mapa de Innovación Legal** | Incluido por Legal Hackers Colombia en sección "Automatización Documental y de Procesos" (2023) | Verificable |
| **Conferencista** | Jornada Académica sobre IA y Justicia — Colegio de Jueces y Fiscales de Antioquia, ASOJUDICIALES, ACMJ (2024) | Verificable |
| **Agilex en producción** | Implementado a nivel nacional en la Rama Judicial. 293+ commits, 8 releases, código abierto | github.com/HammerDev99 |
| **Sherlock en producción** | Sistema de procesamiento de documentos en CSJ Bello. 981 tests, NER F1: 85.3% | docs.sherlock.sprintjudicial.com |
| **Experiencia Rama Judicial** | +10 años: Escribiente, Citador, Asistente Judicial, Técnico en Sistemas | CV verificable |
| **Formación** | Ing. Software (TdeA), Esp. IA (UNIR, en curso), Diplomado Delitos Informáticos (U. Externado), Diplomado Ciencia de Datos (ESAP) | Certificados disponibles |

---

## 6. Estructura de la Landing Page

### Secciones requeridas (en orden)

1. **Navbar**: Logo SprintJudicial + links de navegación + CTA "Agendar Demo"
2. **Hero**: Headline principal + subtítulo + 2 botones (demo y servicios) + estadísticas clave (10+ años, 6 herramientas, despliegue nacional)
3. **Servicios**: Tarjetas de los 6 servicios con nombre, descripción corta, precio de referencia y diferenciador
4. **Credenciales**: Grid de reconocimientos (JusticIALab, Mapa Innovación, Conferencista, Agilex/Sherlock en producción)
5. **Sobre mí**: Bio de Daniel con perfil profesional, lista de formación y links (LinkedIn, GitHub, Blog)
6. **CTA final**: Agendar demo con botón WhatsApp pre-cargado + email
7. **Footer**: Links de navegación + copyright

### Elementos opcionales para futuras iteraciones
- Sección de testimonios / casos de éxito con métricas
- Video demo embebido (3 min)
- FAQ con preguntas comunes de abogados escépticos
- Blog feed (últimos 3 artículos de blog.sprintjudicial.com)
- Comparativa "Sprint Judicial vs. plataformas SaaS genéricas"
- Calculadora de ahorro de tiempo

---

## 7. Directrices de Diseño

### Estética general
- **Tema oscuro**: Transmite seriedad, tecnología y sofisticación. No es un producto casual.
- **Paleta dominante**: Azules profundos (navy/deep blue) con acentos de azul claro y teal. Verde para CTAs o indicadores positivos. Dorado/amber para badges de reconocimiento.
- **Tipografía**: Display font con personalidad (serif como Playfair Display) para títulos. Sans-serif limpia (DM Sans o similar) para cuerpo. NUNCA usar Arial, Inter o Roboto solos.
- **Espaciado**: Generoso. Dar aire a cada sección. El abogado está acostumbrado a documentos densos; la web debe ser lo opuesto.
- **Animaciones**: Sutiles y con propósito. Fade-up al scroll, hover states en tarjetas. Nada excesivo.

### Paleta CSS actual
```css
:root {
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
}
```

### Lo que el diseño debe comunicar
1. **Confianza**: Esto no es un experimento. Es tecnología probada.
2. **Accesibilidad**: No necesitas ser técnico para entender lo que ofrecemos.
3. **Exclusividad**: No somos para todos. Somos para abogados que quieren ventaja competitiva.
4. **Seguridad**: Tus datos están seguros. Eso se refleja en el diseño (oscuro, sólido, sin frivolidad).

### Lo que el diseño NO debe ser
- No debe parecer un template genérico de SaaS (evitar el estilo "hero + 3 features + pricing + footer" sin personalidad)
- No debe usar iconografía clipart ni ilustraciones IA genéricas
- No debe tener colores pastel ni estética "startup friendly" — el público son abogados, no millennials tech
- No debe ser sobrecargado — el abogado valora la claridad sobre el espectáculo

---

## 8. Información de Contacto

| Canal | Dato |
|---|---|
| **WhatsApp** | +57 301 577 1258 |
| **Email** | daniel.arbelaez.alvarez@gmail.com |
| **LinkedIn** | linkedin.com/in/daniel-arbelaez- |
| **GitHub** | github.com/HammerDev99 |
| **Blog** | blog.sprintjudicial.com |
| **Links** | links.sprintjudicial.com |
| **Ubicación** | Bello, Antioquia, Colombia |

**Link de WhatsApp pre-cargado**:
```
https://wa.me/573015771258?text=Hola%20Daniel%2C%20me%20interesa%20conocer%20las%20herramientas%20de%20IA%20para%20abogados.
```

---

## 9. SEO y Meta

### Título
Sprint Judicial | IA y Automatización para Abogados Litigantes

### Descripción meta
Herramientas de inteligencia artificial y automatización para abogados litigantes en Colombia. Asistente legal IA, buscador de jurisprudencia por similitud, generador de documentos, automatización de procesos. Desarrollado por un ingeniero con +10 años en la Rama Judicial.

### Keywords objetivo
- IA para abogados Colombia
- automatización legal Colombia
- software para abogados litigantes
- inteligencia artificial sector justicia
- buscador jurisprudencia Colombia
- automatización documentos legales
- legaltech Colombia
- Sprint Judicial

---

## 10. Stack Técnico Sugerido para el Landing

El landing actual es un HTML/CSS/JS estático de una sola página. Para iterar con Claude Code se recomienda:

### Opción A: HTML/CSS/JS puro (actual)
- Ventaja: Cero dependencias, rápido de desplegar, funciona en cualquier hosting
- Desventaja: Más difícil de mantener si crece a múltiples páginas

### Opción B: Framework ligero (recomendado si va a escalar)
- Astro, 11ty, o Hugo para generación estática
- Tailwind CSS para estilos consistentes
- Despliegue en Netlify, Vercel o hosting actual

### Opción C: React/Next.js (solo si necesita interactividad compleja)
- Sobredimensionado para un landing page
- Considerar solo si se agregan demos interactivos, calculadoras o dashboards

### Consideraciones técnicas
- **Responsive**: Debe funcionar perfectamente en móvil (el abogado revisa WhatsApp y abre el link desde el celular)
- **Performance**: Lighthouse score > 90. Carga rápida sin frameworks pesados.
- **Accesibilidad**: Contraste suficiente en tema oscuro, etiquetas semánticas, navegación por teclado
- **Analytics**: Considerar Umami (privacy-first, ya usado en Agilex) en lugar de Google Analytics

---

## 11. Narrativa Principal (Storytelling)

El landing cuenta esta historia en 4 actos:

### Acto 1: Identificación (Hero)
"Usted pierde horas en tareas que una máquina puede hacer en segundos. Lo sé porque yo también las hacía — durante 10 años dentro de los juzgados."

### Acto 2: Solución (Servicios)
"Construí 6 herramientas que resuelven exactamente esos problemas. Cada una nació de un dolor real que viví en primera persona."

### Acto 3: Credibilidad (Credenciales + Sobre mí)
"No es una promesa. Estas herramientas ya están en producción. Ganaron un concurso nacional. Están en el mapa de innovación legal. Y las usan funcionarios judiciales a nivel nacional."

### Acto 4: Acción (CTA)
"Véalo usted mismo en 20 minutos. Sin costo. Sin compromiso. Le muestro cómo funciona con un caso real de su especialidad."

---

## 12. Métricas Clave para Mostrar

Números que generan impacto inmediato en el visitante:

| Métrica | Valor | Contexto |
|---|---|---|
| Años en Rama Judicial | 10+ | Desde 2014 |
| Herramientas disponibles | 6 | Ecosistema completo |
| Agilex: reducción de tiempo | ≈200% | Protocolización de expedientes |
| Sherlock: tests | 981 | Incluyendo PBT y gobernanza |
| Sherlock: precisión NER | 85.3% | F1 Score |
| Sherlock: latencia búsqueda | <200ms | Con caché, 10.000 docs |
| Agilex: commits | 293+ | Desarrollo activo |
| Agilex: releases | 8 | Producto maduro |
| Alcance Agilex | Nacional | Toda la Rama Judicial |

---

*Documento generado como contexto para desarrollo con Claude Code. Última actualización: 2026-03-10.*
