# SPEC-002: Nuevos Servicios — Expansión del Ecosistema

> Fecha: 2026-03-10
> Estado: Investigación
> Prioridad: P1 (Fase 2)
> Dependencias: SPEC-001 (landing page v2 — ✅ completada 2026-03-10)

---

## 1. Objetivo

Definir las especificaciones de los nuevos servicios que Sprint Judicial puede ofrecer,
basados en la investigación de mercado internacional (RES-001) y los gaps identificados
en el ecosistema LegalTech colombiano.

## 2. Servicios Propuestos (priorizados)

### SRV-01: Copiloto Procesal con Memoria por Expediente
- **Prioridad**: P0
- **Referentes**: Harvey AI + Clio
- **Descripción**: Asistente IA que mantiene contexto completo de cada expediente del abogado.
  Permite preguntas como "¿Cuál es el estado de la reconvención en el caso X?" y recibe
  respuesta con contexto completo del expediente.
- **Funcionalidades**:
  - Memoria persistente por expediente (RAG sobre documentos del caso)
  - Sugerencias proactivas ("Vence el término de contestación en 3 días")
  - Resumen automático de expedientes de 500+ folios
  - Timeline automático del proceso
- **Stack tentativo**: Python + LangChain/LlamaIndex + ChromaDB/Qdrant + Streamlit
- **Pricing objetivo**: $150K-500K COP/usuario/mes (tiered por expedientes activos)
- **Oportunidad**: No existe en LATAM

### SRV-02: Portal de Autoservicio Ciudadano
- **Prioridad**: P0
- **Referentes**: Josef (chatbots), e-gov Estonia, UK GOV.UK
- **Descripción**: Portal web donde un ciudadano puede generar documentos legales básicos
  (tutelas, derechos de petición) sin abogado, mediante entrevistas guiadas.
- **Funcionalidades**:
  - Generador de tutelas paso a paso (alta demanda, proceso estandarizado)
  - Consulta de estado de procesos en lenguaje simple
  - Calculadora de derechos laborales, pensiones, alimentos
  - Guía paso a paso para procesos de mínima cuantía
- **Stack tentativo**: Docassemble (ya operativo) + frontend React/Next.js
- **Pricing objetivo**: B2G (contratos con alcaldías, gobernaciones) + freemium ciudadanos
- **Oportunidad**: 48M personas con bajo acceso a justicia en Colombia

### SRV-03: Plataforma No-Code de Flujos Legales con IA
- **Prioridad**: P1
- **Referentes**: BRYTER + Josef
- **Descripción**: Builder visual para que departamentos legales construyan flujos de trabajo
  automatizados sin programar. Adaptado a derecho colombiano.
- **Funcionalidades**:
  - Builder drag-and-drop de flujos legales
  - Condicionales basados en normatividad colombiana
  - Integración con Sherlock (búsqueda) y Asistente IA
  - Templates pre-construidos (tutela, ejecutivo, laboral)
- **Stack tentativo**: React + Node.js + motor de flujos (custom o n8n adaptado)
- **Pricing objetivo**: SaaS freemium + profesional ($99K-299K COP/mes)
- **Oportunidad**: Zero oferta similar en Colombia

### SRV-04: Monitoreo Normativo y Jurisprudencial con IA
- **Prioridad**: P1
- **Referentes**: OneAdvanced + Thomson Reuters Regulatory Intelligence
- **Descripción**: Agentes IA que monitorean cambios en legislación, jurisprudencia y
  regulaciones, y notifican automáticamente al abogado si afectan sus expedientes.
- **Funcionalidades**:
  - Monitoreo de Diario Oficial y gacetas
  - Alertas: "La Corte cambió la línea jurisprudencial sobre X"
  - Análisis de impacto: "Este decreto afecta 15 de sus expedientes activos"
  - Vinculación automática con asuntos, contratos y matrices de riesgo
- **Stack tentativo**: Python + scrapers + NLP + sistema de alertas
- **Pricing objetivo**: $50K-150K COP/área de práctica/mes
- **Oportunidad**: Alto volumen regulatorio en Colombia sin rastreo automatizado

### SRV-05: Agentes de Calidad de Expedientes y Compliance
- **Prioridad**: P2
- **Referentes**: OneAdvanced (compliance agents)
- **Descripción**: Agentes IA que revisan automáticamente la completitud y calidad de
  expedientes judiciales, detectando documentos faltantes y términos vencidos.
- **Funcionalidades**:
  - Revisión automática de completitud de expedientes judiciales
  - Alertas de vencimiento de términos procesales
  - Verificación de requisitos formales de demandas
  - Checklist de cumplimiento por tipo de proceso
- **Pricing objetivo**: Por expediente revisado o suscripción por despacho judicial

### SRV-06: Simulador de Audiencias con Agentes Adversariales
- **Prioridad**: P2
- **Referentes**: Sin referente directo (innovación pura, papers: AgentCourt)
- **Descripción**: Simulador con agentes IA que representan roles (juez, fiscal, defensa)
  para que abogados practiquen audiencias orales.
- **Funcionalidades**:
  - Práctica de interrogatorios y contrainterrogatorios
  - Simulación de audiencia de conciliación con agente contraparte
  - Entrenamiento para sistema penal acusatorio
  - Feedback automatizado sobre desempeño
- **Pricing objetivo**: Licencias educativas universidades + suscripción individual

### SRV-07: Fábrica de Agentes Legales On-Premise
- **Prioridad**: P2
- **Referentes**: Harvey AI (modelos custom por firma)
- **Descripción**: Servicio de desarrollo y despliegue de agentes IA personalizados
  que operan completamente on-premise en la infraestructura del cliente.
- **Funcionalidades**:
  - Agentes de intake y clasificación de solicitudes
  - Agentes de control de términos procesales
  - Agentes de checklist de cumplimiento
  - Despliegue 100% on-premise (Docker/Kubernetes)
- **Pricing objetivo**: Setup $5M-15M COP + mensualidad $800K-3M COP

## 3. Criterios de Selección para MVP

Para decidir qué servicio desarrollar primero como MVP:

| Criterio | Peso |
|----------|------|
| Demanda del mercado (validada en entrevistas) | 30% |
| Alineación con stack técnico existente | 25% |
| Tiempo de desarrollo estimado | 20% |
| Potencial de ingresos recurrentes | 15% |
| Diferenciación vs. competencia | 10% |

## 4. Próximos Pasos

1. Validar prioridades con entrevistas a 10-15 abogados target
2. Definir MVP del servicio P0 seleccionado
3. Crear SPEC detallada del MVP (SPEC-003 o SPEC-004)
4. Prototipar UI/UX del servicio
5. Desarrollar e iterar
