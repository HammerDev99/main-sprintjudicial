---

# REPORTE CONSOLIDADO DE VULNERABILIDADES
## Escaneo de Seguridad — Host: www.sprintjudicial.com

---

## 1. INFORMACIÓN GENERAL DEL ESCANEO

**Herramienta:** Tenable Nessus Essentials (Advanced Scan)

**Objetivo (Host):**
- **DNS:** www.sprintjudicial.com
- **IP:** 31.97.146.7
- **Sistema Operativo:** Linux Kernel 6.8.0-101-generic en Ubuntu 24.04
- **Scanner:** Local Scanner
- **Método de autenticación:** Pass (credenciales exitosas)
- **Base de severidad:** CVSS v3.0
- **Inicio del escaneo:** 7:06 PM
- **Fin del escaneo:** 7:33 PM
- **Duración:** 27 minutos

---

## 2. RESUMEN EJECUTIVO

El escaneo identificó un total de **74 grupos de vulnerabilidades** que al desglosarse contienen **más de 1,400 hallazgos individuales**. El grupo más grande corresponde a paquetes del sistema operativo Canonical Ubuntu Linux con 1,286 vulnerabilidades sin parche (CVEs pendientes). La distribución por severidad revela que aproximadamente el 63% son de severidad **Media**, seguidas por vulnerabilidades **Altas** (~15%), **Informativas** (~18%), **Críticas** (~2%) y **Bajas** (~2%).

El host opera como un servidor web con múltiples servicios expuestos, incluyendo un entorno Docker Swarm, servidor de correo (SMTP/IMAP/POP3), servidores web (nginx) y SSH. Se detectaron certificados SSL próximos a vencer y configuraciones SSL deficientes.

---

## 3. PUERTOS Y SERVICIOS ABIERTOS

El escaneo con Netstat vía SSH reveló **16 puertos abiertos:**

| Puerto | Protocolo | Servicio |
|--------|-----------|----------|
| 22/tcp | SSH | Acceso remoto seguro |
| 25/tcp | SMTP | Servidor de correo |
| 80/tcp | HTTP (www) | Servidor web |
| 110/tcp | POP3 | Correo electrónico |
| 143/tcp | IMAP | Correo electrónico |
| 443/tcp | HTTPS (www) | Servidor web seguro |
| 465/tcp | SMTPS | Correo seguro |
| 587/tcp | Submission | Envío de correo |
| 993/tcp | IMAPS | IMAP seguro |
| 995/tcp | POP3S | POP3 seguro |
| 2377/tcp | Docker Swarm | Gestión de contenedores |
| 3000/tcp | HTTP (www) | Aplicación web (posiblemente panel de administración) |
| 4190/tcp | ManageSieve | Gestión de filtros de correo |
| 4789/udp | VXLAN | Red overlay Docker |
| 7946/tcp+udp | Docker Swarm | Comunicación entre nodos |

---

## 4. VULNERABILIDADES POR CATEGORÍA DE SEVERIDAD

### 4.1 VULNERABILIDADES CRÍTICAS (CVSS 9.0–10.0)

Se encontraron **16 vulnerabilidades críticas** en paquetes del sistema Ubuntu sin parche:

**CVE-2026-21636 — CVSS 10.0 (Máxima severidad)**
Falla en el modelo de permisos de Node.js que permite conexiones Unix Domain Socket (UDS) que evaden restricciones de red. Un atacante puede conectarse a sockets locales arbitrarios vía net, tls o undici/fetch, lo que habilita escalación de privilegios, exposición de datos o ejecución local de código. Paquete afectado: nodejs_22.22.0-1nodesource1. **No existe solución conocida.**

**CVE-2016-9843 — CVSS 9.8**
Vulnerabilidad en la función crc32_big de zlib 1.2.8 que permite a atacantes tener impacto no especificado mediante cálculos CRC big-endian. Paquetes afectados: klibc-utils y libklibc. **No existe solución conocida.**

**Otros CVEs Críticos (CVSS 9.1–9.8):** CVE-2021-3773, CVE-2024-56180, CVE-2025-40242, CVE-2025-40244, CVE-2025-40251, CVE-2025-40262, CVE-2026-1584, CVE-2026-1788, CVE-2025-12464, CVE-2023-45927, CVE-2023-45929, CVE-2025-27558, CVE-2025-55130, CVE-2026-0964.

### 4.2 VULNERABILIDADES ALTAS (CVSS 7.0–8.9)

Se identificaron numerosas vulnerabilidades de severidad Alta, incluyendo:

**CVE-2020-26559 — CVSS 8.8** — Vulnerabilidad en Bluetooth Mesh Provisioning que permite a un dispositivo cercano completar el provisionamiento sin necesidad del AuthValue. Paquetes afectados: linux-tools-common y linux-libc-dev.

Otros CVEs destacados: CVE-2024-52005 (Git), CVE-2024-56737, CVE-2025-34034, CVE-2025-55157, CVE-2025-55158, CVE-2025-62525, CVE-2025-71089, CVE-2022-3872, CVE-2024-35948, CVE-2025-0689, y más de 30 CVEs adicionales con CVSS entre 7.0 y 8.8.

### 4.3 VULNERABILIDADES MEDIAS (CVSS 4.0–6.9)

**SSL Certificate Cannot Be Trusted — CVSS 6.5 (Puertos 2377/tcp y 8834/tcp)**
El certificado X.509 del servidor no es confiable. En el puerto 2377 el certificado está firmado por una autoridad desconocida con Subject de Docker Swarm (swarm-manager). En el puerto 8834 el certificado es de Nessus Server auto-firmado. Esto facilita ataques man-in-the-middle. **Solución:** Adquirir o generar certificados SSL válidos para estos servicios.

**SSL Certificate with Wrong Hostname — CVSS 5.3 (Puerto 2377/tcp)**
El atributo commonName del certificado SSL no corresponde al hostname del servidor. El certificado muestra CN=7iondtrn9nhhfrqv7hrii9o9h (nombre interno de Docker Swarm) en lugar del hostname real. **Solución:** Generar un certificado SSL con el hostname correcto.

**HSTS Missing From HTTPS Server (RFC 6797) — CVSS 6.5 (Puerto 80/tcp)**
El servidor web no envía el header HTTP Strict-Transport-Security, lo que permite ataques de downgrade, SSL-stripping man-in-the-middle y debilita las protecciones contra robo de cookies. **Solución:** Configurar HSTS en el servidor web nginx.

**Vim < 9.1.2132 Buffer Overflow — CVSS 6.6**
La versión de Vim instalada (9.1) es anterior a 9.1.2132 y es susceptible a desbordamiento de buffer en el heap al procesar la opción 'helpfile' en la resolución de archivos de etiquetas. Afecta a /usr/bin/vim.tiny y /usr/bin/vim.basic. **Solución:** Actualizar Vim a la versión 9.1.2132 o posterior.

**Vulnerabilidades de Redhat Advanced Virtualization (QEMU/KVM):**
- CVE-2019-12067 — CVSS 6.5
- CVE-2024-8354 — CVSS 5.5
- CVE-2021-3735 — CVSS 4.4

### 4.4 VULNERABILIDADES BAJAS (CVSS < 4.0)

- CVE-2024-8612 — CVSS 3.8 (Virtualización)
- CVE-2020-25741 — CVSS 3.2 (Virtualización)
- CVE-2020-25743 — CVSS 3.2 (Virtualización)

### 4.5 INFORMATIVAS DESTACADAS

- **Certificados SSL próximos a expirar:** El certificado de www.sprintjudicial.com en puertos 443 y 80 vence el **9 de mayo de 2026**. El certificado Docker Swarm en puerto 2377 vence el **2 de mayo de 2026**.
- **Docker y Containerd** detectados en el sistema.
- **Apache Log4j** instalado en el sistema (requiere verificación de versión).
- **Node.js** detectado (versión 22.22.0).
- **Servicios sin cifrado post-cuántico** (9 instancias).
- **Enumeración de usuarios Linux** disponible.

---

## 5. SOFTWARE DETECTADO EN EL HOST

| Software | Observación |
|----------|-------------|
| Ubuntu 24.04 LTS | Sistema operativo base |
| Linux Kernel 6.8.0-101 | Kernel del sistema |
| nginx | Servidor web HTTP |
| Node.js 22.22.0 | Runtime JavaScript |
| Docker + Docker Swarm | Plataforma de contenedores |
| Containerd | Runtime de contenedores |
| OpenSSH | Servidor SSH |
| OpenSSL | Biblioteca criptográfica |
| Vim 9.1 | Editor de texto |
| Apache Log4j | Biblioteca de logging Java |
| SQLite | Base de datos embebida |
| curl / libcurl | Cliente HTTP |
| Libgcrypt | Biblioteca criptográfica |

---

## 6. HALLAZGOS CLAVE Y RIESGOS PRINCIPALES

1. **Paquetes del sistema gravemente desactualizados:** 1,286 vulnerabilidades sin parche en paquetes de Ubuntu representan el riesgo más significativo. Muchas carecen de solución del vendedor, lo que sugiere paquetes heredados o componentes que requieren migración.

2. **Node.js con vulnerabilidad CVSS 10.0:** La versión de Node.js tiene una falla que permite evadir completamente el modelo de permisos, permitiendo acceso a servicios locales privilegiados.

3. **Docker Swarm expuesto en puerto 2377:** El servicio de orquestación de contenedores está accesible con certificados auto-firmados y no confiables, lo que expone la infraestructura de contenedores a ataques.

4. **Certificados SSL deficientes:** Certificados auto-firmados, con hostname incorrecto y próximos a expirar reducen la confianza y facilitan ataques de interceptación.

5. **Ausencia de HSTS:** La falta del header Strict-Transport-Security debilita la protección contra ataques de degradación de protocolo.

6. **Superficie de ataque amplia:** 16 puertos abiertos con servicios de correo, web, SSH, Docker y administración aumentan significativamente la superficie de ataque.

---

## 7. RECOMENDACIONES PRIORITARIAS

**Prioridad Inmediata (Crítica):**
- Aplicar todas las actualizaciones de seguridad pendientes del sistema operativo Ubuntu 24.04 mediante `apt update && apt upgrade`.
- Actualizar Node.js a la versión más reciente que corrija CVE-2026-21636.
- Restringir el acceso al puerto 2377 (Docker Swarm) mediante firewall, limitándolo solo a nodos de confianza.

**Prioridad Alta:**
- Configurar el header HSTS en nginx para todos los virtualhost HTTPS.
- Renovar los certificados SSL antes de su vencimiento (mayo 2026).
- Reemplazar los certificados auto-firmados por certificados de una CA reconocida.
- Actualizar Vim a la versión 9.1.2132 o superior.

**Prioridad Media:**
- Revisar si todos los puertos abiertos son necesarios y cerrar los que no se requieran.
- Evaluar la necesidad de Log4j y si está en una versión segura.
- Implementar cifrado post-cuántico donde sea posible.
- Auditar la configuración de Docker y los contenedores en ejecución.

---

*Reporte generado a partir del escaneo Nessus Essentials realizado el 3 de octubre de 2026 sobre el host www.sprintjudicial.com (31.97.146.7).*