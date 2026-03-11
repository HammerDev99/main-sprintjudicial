# PLAN-005: Remediacion de Seguridad — Hallazgos Nessus

> Fecha: 2026-03-10
> Estado: Pendiente
> Basado en: ADR-001-informe-seguridad.md (Nessus scan 2026-10-03)
> Servidor: www.sprintjudicial.com (31.97.146.7) — Ubuntu 24.04 LTS
> Ejecutor: Daniel Arbelaez Alvarez
> Ventana de mantenimiento sugerida: Fin de semana, fuera de horario laboral (Colombia UTC-5)

---

## Resumen Ejecutivo

El escaneo Nessus revelo 74 grupos de vulnerabilidades con mas de 1,400 hallazgos individuales. Este plan prioriza la remediacion en 4 sprints ordenados por riesgo e impacto, comenzando por los hallazgos criticos que pueden explotarse remotamente. La arquitectura del servidor es un sitio estatico servido por nginx dentro de Docker, lo que simplifica significativamente la remediacion: mucho del software detectado NO es necesario para la operacion del sitio.

**Principio rector:** Reducir la superficie de ataque eliminando lo innecesario antes de parchear lo que queda.

---

## Tabla de Contenido

1. [Analisis de Infraestructura](#1-analisis-de-infraestructura)
2. [Evaluacion de Riesgo por Hallazgo](#2-evaluacion-de-riesgo-por-hallazgo)
3. [Sprint 0 — Preparacion (antes de tocar nada)](#3-sprint-0--preparacion)
4. [Sprint 1 — P0 Critico (Dia 1)](#4-sprint-1--p0-critico)
5. [Sprint 2 — P1 Alto (Dia 1-2)](#5-sprint-2--p1-alto)
6. [Sprint 3 — P2 Medio (Semana 1)](#6-sprint-3--p2-medio)
7. [Sprint 4 — P3 Bajo/Mejora Continua (Semana 2+)](#7-sprint-4--p3-bajo)
8. [Respuestas a Preguntas Especificas](#8-respuestas-a-preguntas-especificas)
9. [Checklist de Verificacion Post-Remediacion](#9-checklist-de-verificacion)
10. [Riesgos y Rollback](#10-riesgos-y-rollback)

---

## 1. Analisis de Infraestructura

### Lo que sabemos del servidor

| Aspecto | Detalle |
|---------|---------|
| **OS** | Ubuntu 24.04 LTS, Kernel 6.8.0-101-generic |
| **Proposito** | Hosting de landing page estatica (HTML/CSS/JS puro) |
| **Web server** | nginx (probablemente dentro de Docker, basado en `Dockerfile` que usa `nginx:alpine`) |
| **Contenedores** | Docker + Docker Swarm (Containerd como runtime) |
| **Otros servicios** | SMTP/IMAP/POP3 (correo), OpenSSH, Nessus Scanner |
| **Software innecesario detectado** | Node.js 22.22.0, Apache Log4j, Vim, SQLite |
| **Puertos abiertos** | 16 puertos (22, 25, 80, 110, 143, 443, 465, 587, 993, 995, 2377, 3000, 4190, 4789, 7946) |

### Arquitectura inferida

```
Internet
  |
  +-- :80/:443 --> nginx (Docker container) --> static files (HTML/CSS/JS)
  |
  +-- :25/:465/:587/:110/:143/:993/:995/:4190 --> Mail server (probablemente Mailu o similar en Docker)
  |
  +-- :22 --> OpenSSH (host)
  |
  +-- :2377/:4789/:7946 --> Docker Swarm management (NO deberian ser publicos)
  |
  +-- :3000 --> Aplicacion web desconocida (panel admin? Grafana? Portainer?)
  |
  +-- :8834 --> Nessus Scanner (solo acceso local/VPN)
```

### Conclusion critica

El Dockerfile del proyecto (`FROM nginx:alpine`) confirma que el sitio es puramente estatico. Node.js, Log4j, SQLite y Vim en el host NO son dependencias del sitio web. Esto abre la posibilidad de **eliminar** software en lugar de solo parchearlo.

---

## 2. Evaluacion de Riesgo por Hallazgo

| # | Hallazgo | CVSS | Prioridad | Explotable remotamente | Impacto real para Sprint Judicial |
|---|----------|------|-----------|----------------------|----------------------------------|
| 1 | Node.js CVE-2026-21636 (permission bypass) | 10.0 | **P0** | Si (si Node.js escucha en red) | **CRITICO si Node.js sirve algo en :3000. ELIMINABLE si no se usa.** |
| 2 | Docker Swarm expuesto (:2377) con cert auto-firmado | 6.5 | **P0** | Si | **CRITICO** — acceso al orquestador permite tomar control de todos los contenedores |
| 3 | 1,286 paquetes Ubuntu sin parche | Mixto | **P0** | Varios si | **CRITICO** — incluye CVEs criticos del kernel y librerias de sistema |
| 4 | zlib CVE-2016-9843 (klibc) | 9.8 | **P1** | Indirecto | **ALTO** — klibc se usa en initramfs, explotacion requiere contexto especifico |
| 5 | HSTS ausente | 6.5 | **P1** | Si (MITM) | **ALTO** — permite SSL stripping, robo de cookies de sesion |
| 6 | Certificados SSL por expirar (mayo 2026) | Info | **P1** | N/A | **ALTO** — sitio inaccesible si expiran; faltan ~2 meses |
| 7 | Log4j detectado (version desconocida) | Hasta 10.0 | **P1** | Depende | **ALTO hasta verificar** — Log4Shell (CVE-2021-44228) es el peor caso |
| 8 | SSL cert wrong hostname (:2377) | 5.3 | **P2** | Si | **MEDIO** — solo relevante si :2377 queda expuesto (se cierra en P0) |
| 9 | Self-signed certs (:2377, :8834) | 6.5 | **P2** | Parcial | **MEDIO** — :2377 se cierra, :8834 es solo local |
| 10 | Vim < 9.1.2132 buffer overflow | 6.6 | **P2** | No (local) | **BAJO** — requiere que un usuario abra un archivo malicioso en Vim |
| 11 | Puerto :3000 expuesto | N/A | **P1** | Si | **ALTO** — servicio desconocido accesible publicamente |

---

## 3. Sprint 0 — Preparacion (antes de tocar nada)

**Objetivo:** Crear una red de seguridad para poder revertir cualquier cambio.
**Tiempo estimado:** 30-60 minutos.

### 3.1 Backup completo del servidor

```bash
# Conectarse al servidor
ssh usuario@31.97.146.7

# Crear directorio de backups
sudo mkdir -p /root/backups/$(date +%Y%m%d)

# Backup de configuraciones criticas
sudo tar czf /root/backups/$(date +%Y%m%d)/etc-backup.tar.gz /etc/

# Backup de configuracion Docker
sudo tar czf /root/backups/$(date +%Y%m%d)/docker-backup.tar.gz \
  /var/lib/docker/swarm/ \
  /etc/docker/

# Listar contenedores y stacks actuales (documentar estado)
sudo docker stack ls > /root/backups/$(date +%Y%m%d)/docker-stacks.txt
sudo docker service ls > /root/backups/$(date +%Y%m%d)/docker-services.txt
sudo docker ps -a > /root/backups/$(date +%Y%m%d)/docker-containers.txt
sudo docker images > /root/backups/$(date +%Y%m%d)/docker-images.txt

# Backup de la lista de paquetes instalados
dpkg --get-selections > /root/backups/$(date +%Y%m%d)/packages.txt
apt list --installed > /root/backups/$(date +%Y%m%d)/apt-installed.txt

# Backup de reglas de firewall actuales
sudo iptables -L -n > /root/backups/$(date +%Y%m%d)/iptables.txt
sudo ufw status verbose > /root/backups/$(date +%Y%m%d)/ufw-status.txt 2>/dev/null
```

### 3.2 Documentar que esta corriendo

```bash
# Que escucha en cada puerto
sudo ss -tlnp

# Que procesos consumen recursos
ps aux --sort=-%mem | head -20

# Version exacta de Node.js y donde esta
which node && node --version
# Verificar si Node.js esta sirviendo algo
sudo lsof -i :3000

# Verificar que corre en Docker
sudo docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"
```

### 3.3 Verificar que el sitio funciona (baseline)

```bash
# Desde otro equipo o localmente
curl -sI https://www.sprintjudicial.com | head -20
curl -sI http://www.sprintjudicial.com | head -20

# Verificar respuesta del sitio
curl -so /dev/null -w "%{http_code}" https://www.sprintjudicial.com
```

### 3.4 Si el proveedor de hosting ofrece snapshots

```bash
# Si es un VPS (DigitalOcean, Hetzner, Contabo, etc.):
# Crear un snapshot/imagen del servidor desde el panel del proveedor
# ANTES de hacer cualquier cambio.
# Esto permite restaurar el servidor completo en caso de desastre.
```

---

## 4. Sprint 1 — P0 Critico (Dia 1)

**Objetivo:** Cerrar las vulnerabilidades con mayor riesgo de explotacion inmediata.
**Tiempo estimado:** 2-4 horas.
**Requiere:** Ventana de mantenimiento (posible reinicio de servicios).

### 4.1 P0-A: Cerrar Docker Swarm al exterior (CVSS combinado: Critico)

**Riesgo:** Docker Swarm en :2377 esta accesible desde internet con certificados auto-firmados. Un atacante que acceda a este puerto puede controlar todos los contenedores, desplegar codigo malicioso, o exfiltrar datos.

**Esfuerzo:** 15 minutos.

```bash
# Opcion 1: UFW (si esta habilitado)
sudo ufw status

# Si UFW esta activo, bloquear puertos de Docker Swarm desde el exterior
sudo ufw deny in on eth0 to any port 2377 proto tcp comment "Block Docker Swarm mgmt"
sudo ufw deny in on eth0 to any port 7946 proto tcp comment "Block Docker Swarm gossip TCP"
sudo ufw deny in on eth0 to any port 7946 proto udp comment "Block Docker Swarm gossip UDP"
sudo ufw deny in on eth0 to any port 4789 proto udp comment "Block Docker VXLAN"

# NOTA: Reemplazar 'eth0' por la interfaz de red real del servidor.
# Verificar con: ip addr show

# Opcion 2: iptables directamente (si UFW no esta activo)
# Bloquear acceso externo pero permitir localhost
sudo iptables -A INPUT -p tcp --dport 2377 -s 127.0.0.1 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 2377 -j DROP
sudo iptables -A INPUT -p tcp --dport 7946 -s 127.0.0.1 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 7946 -j DROP
sudo iptables -A INPUT -p udp --dport 7946 -s 127.0.0.1 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 7946 -j DROP
sudo iptables -A INPUT -p udp --dport 4789 -s 127.0.0.1 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 4789 -j DROP

# Persistir reglas iptables
sudo apt install -y iptables-persistent
sudo netfilter-persistent save

# Verificar que los puertos ya no son accesibles desde afuera
# (Ejecutar desde OTRA maquina):
nmap -p 2377,7946,4789 31.97.146.7
```

**Verificacion:** Los puertos 2377, 7946, 4789 deben aparecer como "filtered" o "closed" desde el exterior.

### 4.2 P0-B: Investigar y asegurar puerto :3000

**Riesgo:** Un servicio HTTP desconocido esta expuesto publicamente.

**Esfuerzo:** 15-30 minutos.

```bash
# Identificar que proceso escucha en :3000
sudo lsof -i :3000
sudo ss -tlnp | grep 3000

# Si es un contenedor Docker:
sudo docker ps --filter "publish=3000"

# Verificar que es
curl -sI http://localhost:3000
```

**Acciones segun resultado:**
- **Si es Grafana/Portainer/panel admin:** Restringir con firewall a solo tu IP o acceso via VPN.
- **Si es una app de Node.js necesaria:** Ponerla detras de nginx como reverse proxy con autenticacion.
- **Si es innecesario:** Detener el servicio y bloquear el puerto.

```bash
# Si es innecesario — detener el contenedor
sudo docker stop <container_name>
sudo docker rm <container_name>

# Bloquear puerto en firewall
sudo ufw deny in on eth0 to any port 3000 proto tcp comment "Block unknown service"
```

### 4.3 P0-C: Evaluar y posiblemente eliminar Node.js (CVE-2026-21636, CVSS 10.0)

**Riesgo:** Vulnerabilidad maxima que permite bypass del modelo de permisos, escalacion de privilegios y ejecucion de codigo.

**Esfuerzo:** 30-60 minutos (incluye investigacion).

**Analisis previo critico:**

```bash
# Verificar si Node.js esta corriendo activamente
pgrep -la node
sudo lsof -i -P | grep node

# Verificar si algun servicio de Docker lo usa
sudo docker exec -it <container_name> node --version 2>/dev/null

# Verificar como se instalo (nodesource repo vs apt)
apt list --installed 2>/dev/null | grep -i node
dpkg -l | grep node

# Verificar dependencias inversas (que depende de Node.js)
apt rdepends nodejs 2>/dev/null
```

**Decision arbol:**

```
Node.js esta corriendo algun proceso?
  |
  +-- NO --> Es seguro desinstalarlo
  |           (El sitio es estatico nginx, no necesita Node.js)
  |
  +-- SI --> Que proceso?
              |
              +-- El servicio en :3000 --> Evaluar si es critico
              |    +-- Critico --> Actualizar Node.js inmediatamente
              |    +-- No critico --> Migrar servicio o eliminar
              |
              +-- Proceso de build --> No deberia correr en produccion
                                       Desinstalar
```

**Remediacion — Opcion A: Desinstalar Node.js (preferida si no se usa):**

```bash
# Verificar que nada depende de el
sudo apt-mark showmanual | grep node

# Desinstalar
sudo apt remove --purge nodejs
sudo apt autoremove

# Limpiar repositorio nodesource
sudo rm -f /etc/apt/sources.list.d/nodesource.list
sudo apt update
```

**Remediacion — Opcion B: Actualizar Node.js (si se necesita):**

```bash
# Verificar si hay una version parcheada disponible
apt list -a nodejs 2>/dev/null

# Si no hay parche en el repo de nodesource, instalar la ultima LTS
# NOTA: Verificar en https://nodejs.org si la version 22.x ya tiene parche para CVE-2026-21636
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Si CVE-2026-21636 no tiene parche aun (dice "No existe solucion conocida"):
# Mitigar restringiendo acceso de red a Node.js con firewall
# y ejecutarlo sin permisos de root
```

### 4.4 P0-D: Actualizar paquetes del sistema operativo (1,286 vulnerabilidades)

**Riesgo:** La mayoria de las vulnerabilidades del escaneo provienen de paquetes desactualizados. Esto incluye CVEs criticos del kernel, librerias de red y herramientas de sistema.

**Esfuerzo:** 1-2 horas (incluye reinicio).

**IMPORTANTE: Precauciones para `apt upgrade` en produccion** (ver seccion 8.2 para analisis detallado):

```bash
# PASO 1: Ver que se va a actualizar SIN instalar nada
sudo apt update
sudo apt list --upgradable

# PASO 2: Contar cuantos paquetes y revisar la lista
sudo apt list --upgradable 2>/dev/null | wc -l

# PASO 3: Verificar que no hay paquetes retenidos que puedan causar conflictos
apt-mark showhold

# PASO 4: Hacer un "dry run" para ver si hay conflictos
sudo apt upgrade --dry-run

# PASO 5: Si todo se ve limpio, proceder con la actualizacion
# Usar -y solo si el dry-run fue exitoso
sudo apt upgrade -y

# PASO 6: Si hay paquetes del kernel o librerias criticas
# que requieren reinicio de servicios:
sudo needrestart -r l
# (lista los servicios que necesitan reinicio sin reiniciarlos)

# PASO 7: Para actualizaciones que requieren eliminar/instalar paquetes
sudo apt full-upgrade --dry-run
# Solo ejecutar si el dry-run se ve seguro:
sudo apt full-upgrade -y

# PASO 8: Limpiar paquetes obsoletos
sudo apt autoremove -y
sudo apt autoclean

# PASO 9: Si se actualizo el kernel, programar reinicio
# Verificar si se necesita reinicio:
cat /var/run/reboot-required 2>/dev/null
# Si dice "*** System restart required ***":
sudo reboot
```

**Post-actualizacion:**

```bash
# Verificar que los servicios clave estan corriendo
sudo docker ps
sudo systemctl status nginx
sudo systemctl status ssh
curl -sI https://www.sprintjudicial.com | head -5
```

---

## 5. Sprint 2 — P1 Alto (Dia 1-2)

**Objetivo:** Cerrar vulnerabilidades de alto riesgo que requieren cambios de configuracion.
**Tiempo estimado:** 2-3 horas.

### 5.1 P1-A: Configurar HSTS en nginx (CVSS 6.5)

**Riesgo:** Sin HSTS, un atacante puede hacer SSL stripping para interceptar comunicaciones.

**Esfuerzo:** 15 minutos.

```bash
# Localizar la configuracion de nginx
# Si nginx corre en Docker:
sudo docker exec -it <nginx_container> cat /etc/nginx/nginx.conf
sudo docker exec -it <nginx_container> ls /etc/nginx/conf.d/

# Si nginx corre en el host:
cat /etc/nginx/sites-enabled/default
```

**Configuracion HSTS en nginx:**

```nginx
server {
    listen 443 ssl http2;
    server_name www.sprintjudicial.com sprintjudicial.com;

    # HSTS — instruye al navegador a usar HTTPS durante 1 ano
    # includeSubDomains aplica a blog.sprintjudicial.com, etc.
    # preload permite incluirse en la lista HSTS preload de navegadores
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Headers de seguridad adicionales recomendados
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://blog.sprintjudicial.com" always;

    # ... resto de la configuracion
}
```

**NOTA sobre `preload`:** Solo incluir `preload` si estas seguro de que TODO el dominio y subdominios soportan HTTPS. Una vez en la lista de preload, es dificil revertir. Comenzar sin `preload` y agregarlo despues si todo funciona.

```bash
# Verificar configuracion nginx valida
sudo docker exec -it <nginx_container> nginx -t
# o si esta en el host:
sudo nginx -t

# Recargar nginx sin downtime
sudo docker exec -it <nginx_container> nginx -s reload
# o:
sudo systemctl reload nginx

# Verificar que el header esta presente
curl -sI https://www.sprintjudicial.com | grep -i strict
# Debe mostrar: strict-transport-security: max-age=31536000; includeSubDomains
```

### 5.2 P1-B: Renovar certificados SSL (expiran mayo 2026)

**Riesgo:** Certificados expiran en ~2 meses. Si expiran, el sitio se vuelve inaccesible por HTTPS y los navegadores muestran advertencias de seguridad.

**Esfuerzo:** 30-60 minutos (primera vez); 5 minutos (renovaciones subsiguientes con auto-renewal).

**Verificar tipo de certificado actual:**

```bash
# Ver detalles del certificado actual
echo | openssl s_client -connect www.sprintjudicial.com:443 -servername www.sprintjudicial.com 2>/dev/null | openssl x509 -noout -issuer -subject -dates

# Si el issuer contiene "Let's Encrypt" o "R3" o "R10" o "E5":
# --> Es Let's Encrypt. Renovacion automatica con certbot.

# Si el issuer contiene otro nombre:
# --> Certificado comercial. Renovar con el proveedor.
```

**Si es Let's Encrypt (lo mas probable dado la infraestructura):**

```bash
# Verificar si certbot esta instalado
which certbot
certbot --version

# Si no esta instalado:
sudo apt install -y certbot python3-certbot-nginx

# Ver certificados actuales
sudo certbot certificates

# Renovar manualmente (dry-run primero)
sudo certbot renew --dry-run

# Si el dry-run pasa, renovar de verdad:
sudo certbot renew

# Configurar auto-renovacion (si no esta activa)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
sudo systemctl status certbot.timer

# Verificar que el timer esta programado
sudo systemctl list-timers | grep certbot
```

**Si certbot usa Docker (nginx en contenedor):**

```bash
# Certbot puede necesitar acceso a los volumenes de nginx
# Verificar si hay un servicio certbot en el Docker Swarm:
sudo docker service ls | grep cert
sudo docker stack ls

# Si no hay certbot en Docker, se puede correr standalone:
sudo certbot certonly --standalone -d www.sprintjudicial.com -d sprintjudicial.com --dry-run
# NOTA: Esto requiere parar nginx temporalmente en :80
```

**Crear script de auto-renovacion robusto:**

```bash
# Crear /etc/cron.d/certbot-renew (si no existe)
sudo tee /etc/cron.d/certbot-renew << 'CRON'
# Intentar renovar certificados dos veces al dia
0 3,15 * * * root certbot renew --quiet --deploy-hook "docker exec <nginx_container> nginx -s reload" >> /var/log/certbot-renew.log 2>&1
CRON
```

### 5.3 P1-C: Verificar Apache Log4j (potencial Log4Shell)

**Riesgo:** Log4Shell (CVE-2021-44228) es una de las vulnerabilidades mas criticas de la historia, permitiendo RCE con una sola cadena de texto. Si Log4j es la version vulnerable (< 2.17.1), la prioridad sube a P0 inmediato.

**Esfuerzo:** 30-60 minutos (investigacion).

```bash
# Buscar archivos de Log4j en el sistema
sudo find / -name "log4j*.jar" -type f 2>/dev/null
sudo find / -name "log4j*.jar" -type f -exec unzip -p {} META-INF/MANIFEST.MF \; 2>/dev/null | grep -i version

# Buscar dentro de contenedores Docker
for container in $(sudo docker ps -q); do
  echo "=== Container: $(sudo docker inspect --format '{{.Name}}' $container) ==="
  sudo docker exec $container find / -name "log4j*.jar" -type f 2>/dev/null
done

# Buscar JARs que contengan Log4j embebido (fat JARs / uber JARs)
sudo find / -name "*.jar" -type f -exec sh -c 'unzip -l "$1" 2>/dev/null | grep -l "log4j"' _ {} \; 2>/dev/null

# Herramienta dedicada de deteccion (recomendada):
# https://github.com/lunasec-io/lunasec/releases (log4shell scanner)
# O usar el script de CISA:
# https://github.com/cisagov/log4j-scanner

# Verificar version especifica
# Si encontraste un JAR, ver la version:
unzip -p /ruta/al/log4j-core-X.Y.Z.jar META-INF/MANIFEST.MF | grep -i "implementation-version"
```

**Interpretacion de resultados:**

| Version encontrada | Estado | Accion |
|-------------------|--------|--------|
| Log4j 1.x | End of life, tiene CVEs pero NO Log4Shell | Reemplazar si se usa, eliminar si no |
| Log4j 2.0 - 2.14.1 | **VULNERABLE a Log4Shell** | **URGENTE:** Actualizar a 2.17.1+ o eliminar |
| Log4j 2.15.0 | Parche incompleto, aun vulnerable | Actualizar a 2.17.1+ |
| Log4j 2.16.0 | Casi seguro, tiene CVE menor | Actualizar a 2.17.1+ |
| Log4j 2.17.1+ | Seguro contra Log4Shell | OK, mantener actualizado |

**Si Log4j no esta siendo usado por ninguna aplicacion activa:**

```bash
# Identificar que paquete lo instalo
dpkg -S /ruta/al/log4j.jar

# Si fue una dependencia de algo que ya no se usa:
sudo apt remove --purge <paquete_padre>

# O simplemente eliminar los JARs huerfanos
sudo rm /ruta/al/log4j*.jar
```

### 5.4 P1-D: Restringir puerto :3000 (si no se elimino en P0-B)

```bash
# Si se determino que :3000 es un servicio necesario (admin panel, etc.)
# Restringir a solo tu IP

# Obtener tu IP publica actual
curl -s ifconfig.me

# Permitir solo tu IP en ese puerto
sudo ufw allow from <TU_IP> to any port 3000 proto tcp comment "Admin panel - restricted"
sudo ufw deny in on eth0 to any port 3000 proto tcp comment "Block public access to :3000"
```

---

## 6. Sprint 3 — P2 Medio (Semana 1)

**Objetivo:** Cerrar hallazgos de riesgo medio y mejorar la postura general.
**Tiempo estimado:** 2-3 horas.

### 6.1 P2-A: Actualizar Vim (CVE buffer overflow, CVSS 6.6)

**Riesgo:** Bajo en la practica; requiere que alguien abra un archivo malicioso con Vim en el servidor.

**Esfuerzo:** 5 minutos.

```bash
# Verificar version actual
vim --version | head -1

# Actualizar Vim (normalmente se cubre con apt upgrade, pero verificar)
sudo apt install --only-upgrade vim vim-tiny vim-runtime

# Verificar nueva version
vim --version | head -1
# Debe ser >= 9.1.2132
```

### 6.2 P2-B: Revisar certificados Docker Swarm (si Swarm sigue en uso)

**Riesgo:** Mitigado si se cerraron los puertos en Sprint 1.

**Esfuerzo:** 30 minutos.

```bash
# Verificar si realmente necesitas Docker Swarm
# Si solo tienes UN servidor (no un cluster), Swarm es innecesario
sudo docker node ls

# Si hay un solo nodo: considerar salir de Swarm y usar docker-compose
# PRECAUCION: Esto detendra todos los stacks/services de Swarm
sudo docker stack ls
# Si no hay stacks criticos:
sudo docker swarm leave --force

# Si necesitas mantener Swarm, rotar los certificados:
sudo docker swarm ca --rotate
# Esto genera nuevos certificados TLS para la comunicacion interna
```

### 6.3 P2-C: Auditar y cerrar puertos innecesarios

```bash
# Revision de todos los puertos abiertos
sudo ss -tlnp

# Puertos que DEBEN estar abiertos (minimo):
# 22  - SSH (acceso administrativo)
# 80  - HTTP (redireccion a HTTPS)
# 443 - HTTPS (sitio web)

# Puertos que probablemente deben estar abiertos (si usas correo):
# 25, 465, 587 - SMTP (envio de correo)
# 110, 995     - POP3 (recepcion de correo)
# 143, 993     - IMAP (recepcion de correo)
# 4190         - ManageSieve (filtros de correo)

# Puertos que NO deben ser publicos:
# 2377, 7946, 4789 - Docker Swarm (ya cerrados en Sprint 1)
# 3000              - Servicio desconocido (ya evaluado en Sprint 1)
# 8834              - Nessus (solo local/VPN)

# Configuracion UFW recomendada (ejemplo completo)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment "SSH"
sudo ufw allow 80/tcp comment "HTTP"
sudo ufw allow 443/tcp comment "HTTPS"
# Solo si el servidor de correo es necesario:
sudo ufw allow 25/tcp comment "SMTP"
sudo ufw allow 465/tcp comment "SMTPS"
sudo ufw allow 587/tcp comment "Submission"
sudo ufw allow 110/tcp comment "POP3"
sudo ufw allow 143/tcp comment "IMAP"
sudo ufw allow 993/tcp comment "IMAPS"
sudo ufw allow 995/tcp comment "POP3S"
sudo ufw allow 4190/tcp comment "ManageSieve"
# Activar UFW
sudo ufw enable
sudo ufw status numbered
```

### 6.4 P2-D: Seguridad SSH (hardening)

```bash
# Backup de configuracion SSH
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%Y%m%d)

# Editar configuracion
sudo nano /etc/ssh/sshd_config

# Cambios recomendados (verificar cada uno contra tu uso):
# PermitRootLogin no              # Desactivar login como root
# PasswordAuthentication no        # Solo llaves SSH (asegurate de tener tu llave configurada primero!)
# MaxAuthTries 3                   # Maximo 3 intentos
# ClientAliveInterval 300          # Timeout de inactividad: 5 min
# ClientAliveCountMax 2            # 2 intentos de keepalive

# IMPORTANTE: Antes de desactivar PasswordAuthentication,
# asegurate de que tu llave SSH funciona:
# ssh -i ~/.ssh/tu_llave usuario@31.97.146.7

# Verificar configuracion valida
sudo sshd -t

# Recargar SSH (NO reiniciar — si hay error, pierdes acceso)
sudo systemctl reload sshd

# Instalar fail2ban para proteger contra fuerza bruta
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 7. Sprint 4 — P3 Bajo/Mejora Continua (Semana 2+)

**Objetivo:** Mejoras de postura de seguridad a largo plazo.
**Tiempo estimado:** Variable.

### 7.1 P3-A: Implementar actualizaciones automaticas de seguridad

```bash
# Instalar unattended-upgrades
sudo apt install -y unattended-upgrades

# Configurar para solo parches de seguridad
sudo dpkg-reconfigure -plow unattended-upgrades
# Seleccionar "Yes" para activar actualizaciones automaticas

# Verificar configuracion
cat /etc/apt/apt.conf.d/20auto-upgrades
# Debe contener:
# APT::Periodic::Update-Package-Lists "1";
# APT::Periodic::Unattended-Upgrade "1";

# Verificar que sources de seguridad estan habilitados
cat /etc/apt/apt.conf.d/50unattended-upgrades | grep -A5 "Allowed-Origins"
```

### 7.2 P3-B: Monitoreo de certificados

```bash
# Crear script de monitoreo de expiracion
sudo tee /usr/local/bin/check-ssl-expiry.sh << 'SCRIPT'
#!/bin/bash
DOMAIN="www.sprintjudicial.com"
EXPIRY=$(echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s)
NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))

if [ $DAYS_LEFT -lt 14 ]; then
  echo "ALERTA: Certificado SSL de $DOMAIN expira en $DAYS_LEFT dias ($EXPIRY)" | \
    mail -s "SSL Certificate Expiry Warning" contacto@sprintjudicial.com
fi
echo "$(date): $DOMAIN SSL cert expires in $DAYS_LEFT days" >> /var/log/ssl-check.log
SCRIPT

sudo chmod +x /usr/local/bin/check-ssl-expiry.sh

# Programar verificacion diaria
sudo tee /etc/cron.d/ssl-check << 'CRON'
0 8 * * * root /usr/local/bin/check-ssl-expiry.sh
CRON
```

### 7.3 P3-C: Considerar cifrado post-cuantico

El escaneo reporto 9 instancias de servicios sin cifrado post-cuantico. Esto es informativo y no urgente, pero vale la pena planificar:

```bash
# Verificar soporte de OpenSSL para algoritmos post-cuanticos
openssl version
# OpenSSL 3.x en Ubuntu 24.04 puede soportar X25519Kyber768

# En nginx, habilitar curvas post-cuanticas cuando esten soportadas:
# ssl_ecdh_curve X25519:X25519Kyber768Draft00:secp384r1;
```

### 7.4 P3-D: Escaneo periodico

```bash
# Programar escaneos regulares con Nessus (ya esta instalado en :8834)
# O usar herramientas open source:

# Lynis — auditor de seguridad para Linux
sudo apt install -y lynis
sudo lynis audit system

# Trivy — scanner de vulnerabilidades para contenedores
sudo docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image nginx:alpine

# OpenVAS — scanner de vulnerabilidades (alternativa open source a Nessus)
```

---

## 8. Respuestas a Preguntas Especificas

### 8.1 Que es el plan paso a paso ordenado por prioridad?

Resumen ejecutivo del plan:

| Paso | Sprint | Prioridad | Accion | Tiempo | Riesgo de no hacer |
|------|--------|-----------|--------|--------|---------------------|
| 0 | Prep | — | Backup completo + documentar estado | 30-60 min | Imposible revertir si algo sale mal |
| 1 | S1 | P0 | Cerrar Docker Swarm (:2377) al exterior | 15 min | Control total del servidor por atacante |
| 2 | S1 | P0 | Investigar/cerrar :3000 | 15-30 min | Servicio desconocido expuesto |
| 3 | S1 | P0 | Eliminar o actualizar Node.js | 30-60 min | Explotacion con CVSS 10.0 |
| 4 | S1 | P0 | apt update && apt upgrade | 1-2 hrs | 1,286 CVEs sin parche |
| 5 | S2 | P1 | Configurar HSTS en nginx | 15 min | SSL stripping / MITM |
| 6 | S2 | P1 | Renovar/auto-renovar certificados SSL | 30-60 min | Sitio inaccesible en mayo |
| 7 | S2 | P1 | Verificar version de Log4j | 30-60 min | Potencial RCE si es Log4Shell |
| 8 | S3 | P2 | Actualizar Vim | 5 min | Buffer overflow local |
| 9 | S3 | P2 | Auditar y cerrar puertos innecesarios | 30 min | Superficie de ataque amplia |
| 10 | S3 | P2 | Hardening SSH + fail2ban | 30 min | Fuerza bruta en SSH |
| 11 | S4 | P3 | Actualizaciones automaticas | 15 min | Vulnerabilidades futuras |
| 12 | S4 | P3 | Monitoreo de certificados | 15 min | Expiraciones inadvertidas |

**Tiempo total estimado:** 5-8 horas repartidas en 1-2 semanas.

### 8.2 Es seguro `apt update && apt upgrade` en produccion?

**Respuesta corta:** Si, es generalmente seguro en Ubuntu 24.04 LTS, pero con precauciones.

**Por que es seguro:**
- Ubuntu LTS prioriza estabilidad: los parches de seguridad son backports que no cambian versiones mayores.
- `apt upgrade` (sin `full-upgrade`) no elimina paquetes ni instala nuevos, solo actualiza existentes.
- Los paquetes criticos (kernel, OpenSSL, etc.) se prueban extensamente antes de publicarse en el canal `-security`.

**Precauciones obligatorias:**
1. **Hacer backup primero** (Sprint 0).
2. **Ejecutar `--dry-run`** para ver que se va a cambiar antes de aplicar.
3. **No ejecutar en hora pico** — hacerlo en ventana de mantenimiento.
4. **Verificar `apt-mark showhold`** — paquetes retenidos pueden causar conflictos.
5. **Monitorear despues** — verificar que nginx, Docker y correo siguen funcionando.
6. **Tener acceso alternativo** — consola IPMI/KVM del proveedor VPS en caso de que SSH no responda tras un reinicio.

**Riesgos reales (bajos pero existentes):**
- Actualizacion de kernel puede requerir reinicio (downtime de 2-5 minutos).
- Si Docker o containerd se actualizan, los contenedores pueden reiniciarse.
- Cambios en OpenSSL pueden afectar conexiones TLS temporalmente.

**Mitigacion:** `apt upgrade` es conservador. Para los paquetes que requieren cambios mas agresivos, usar `apt full-upgrade` por separado y con mas cuidado.

### 8.3 Son Let's Encrypt los certificados? Cual es el proceso de renovacion?

**Probablemente si.** Las senales que apuntan a Let's Encrypt:
- Expiran en ~90 dias (patron tipico de Let's Encrypt: emitidos ~9 feb, expiran 9 mayo).
- El servidor es un VPS con nginx (setup tipico de certbot).
- No hay evidencia de certificados comerciales (no hay archivos de proveedor en el repo).

**Verificacion definitiva:**

```bash
echo | openssl s_client -connect www.sprintjudicial.com:443 -servername www.sprintjudicial.com 2>/dev/null | openssl x509 -noout -issuer
# Si dice "C = US, O = Let's Encrypt, CN = R10" (o R3, E5, E6) → es Let's Encrypt
```

**Proceso de renovacion Let's Encrypt:**
1. `certbot renew --dry-run` (prueba sin cambiar nada).
2. `certbot renew` (renueva si faltan <30 dias).
3. Configurar timer/cron para auto-renovacion (ver seccion 5.2).

**El certificado de Docker Swarm (:2377)** es diferente: es auto-generado por Docker Swarm internamente. Se rota con `docker swarm ca --rotate`. No es un certificado publico y no necesita Let's Encrypt.

### 8.4 Es necesario Node.js? Se puede eliminar?

**Respuesta: Casi seguro que se puede eliminar del host.**

**Evidencia:**
- El `Dockerfile` del proyecto usa `nginx:alpine` — no hay Node.js en la imagen del sitio.
- El sitio es HTML/CSS/JS puro, sin build step, sin SSR, sin API backend en Node.
- El paquete detectado es `nodejs_22.22.0-1nodesource1`, instalado desde el repositorio de NodeSource (instalacion manual, no dependencia del sistema).

**Posibles razones por las que esta instalado:**
1. Se uso para desarrollo/testing y se olvido desinstalar.
2. Otro servicio (la app en :3000?) lo usa.
3. Una herramienta de deployment/CI lo instalo.

**Procedimiento seguro para eliminar:**
1. Verificar que no hay procesos Node corriendo (`pgrep -la node`).
2. Verificar que no hay servicios que dependan de el (`apt rdepends nodejs`).
3. Si :3000 usa Node, evaluar ese servicio primero.
4. Desinstalar con `apt remove --purge nodejs`.

**Beneficio de eliminar:** Se cierra la vulnerabilidad CVSS 10.0 sin necesidad de parche.

### 8.5 Como verificar la version de Log4j y si es vulnerable a Log4Shell?

**Metodo 1 — Buscar JARs:**

```bash
# Buscar todos los archivos log4j en el sistema
sudo find / -name "log4j-core*.jar" -o -name "log4j-api*.jar" 2>/dev/null

# La version esta en el nombre del archivo:
# log4j-core-2.14.1.jar → version 2.14.1 → VULNERABLE
# log4j-core-2.17.1.jar → version 2.17.1 → SEGURO
```

**Metodo 2 — Buscar dentro de JARs:**

```bash
# Si el JAR no tiene version en el nombre
unzip -p /ruta/log4j-core.jar META-INF/MANIFEST.MF | grep "Implementation-Version"
```

**Metodo 3 — Buscar la clase vulnerable especifica:**

```bash
# Log4Shell explota la clase JndiLookup. Si existe, es vulnerable.
# Si NO existe, no es vulnerable a Log4Shell (aunque puede tener otros CVEs).
sudo find / -name "log4j-core*.jar" -exec sh -c 'unzip -l "$1" 2>/dev/null | grep JndiLookup.class && echo "VULNERABLE: $1"' _ {} \;
```

**Metodo 4 — Usar scanner automatizado:**

```bash
# CISA Log4j Scanner
git clone https://github.com/cisagov/log4j-scanner.git
cd log4j-scanner
pip3 install -r requirements.txt
python3 log4j-scan.py -u https://www.sprintjudicial.com

# O localmente:
# https://github.com/google/log4jscanner
```

**Tabla de versiones vulnerables:**

| Version Log4j | CVE-2021-44228 (Log4Shell) | CVE-2021-45046 | CVE-2021-45105 | CVE-2021-44832 |
|---------------|---------------------------|-----------------|-----------------|-----------------|
| 2.0-beta9 a 2.14.1 | VULNERABLE | VULNERABLE | VULNERABLE | VULNERABLE |
| 2.15.0 | Parcheado (incompleto) | VULNERABLE | VULNERABLE | VULNERABLE |
| 2.16.0 | Seguro | Seguro | VULNERABLE | VULNERABLE |
| 2.17.0 | Seguro | Seguro | Seguro | VULNERABLE |
| 2.17.1+ | Seguro | Seguro | Seguro | Seguro |
| 1.x | No afectado por Log4Shell | N/A | N/A | N/A (tiene otros CVEs) |

**Contexto importante:** Nessus reporta "Apache Log4j detected" como informativa. Puede ser que Log4j este instalado como dependencia de Java/alguna herramienta pero no este siendo utilizado activamente. Si no hay ninguna aplicacion Java corriendo en el servidor, el riesgo es significativamente menor (pero no nulo — un atacante con acceso al servidor podria intentar usarlo).

### 8.6 Riesgo de NO parchear inmediatamente vs. ventana de mantenimiento planificada?

**Analisis de riesgo por tiempo sin parche:**

| Ventana | Riesgo P0 (Docker Swarm, Node.js) | Riesgo P1 (HSTS, certs, Log4j) | Riesgo P2 (Vim, puertos) |
|---------|----------------------------------|--------------------------------|--------------------------|
| **Hoy** | Activamente explotable | Explotable con esfuerzo | Bajo riesgo inmediato |
| **1-3 dias** | **INACEPTABLE** — Docker Swarm expuesto es un riesgo critico | Aceptable si no hay MITM activo | Aceptable |
| **1 semana** | **INACEPTABLE** | Creciente — mas tiempo = mas oportunidad de ataque | Aceptable |
| **1 mes** | **INACEPTABLE** | **Certificados expiran en ~2 meses, cortar fino** | Bajo pero creciente |
| **3 meses** | Compromiso probable | **Certificados EXPIRADOS = sitio caido** | Medio |

**Recomendacion:**
- **P0 (Docker Swarm + Node.js):** Hacer HOY. Los comandos de firewall tardan 2 minutos y no causan downtime del sitio web. No hay razon para esperar.
- **P1 (HSTS + certs + Log4j):** Hacer esta semana. HSTS es un cambio de configuracion sin riesgo. Certs tienen margen de 2 meses pero la auto-renovacion deberia configurarse ya.
- **P0 (apt upgrade):** Planificar para el proximo fin de semana. Es el unico cambio con riesgo de downtime.
- **P2-P3:** Dentro de las proximas 2 semanas.

**El escenario mas peligroso** es Docker Swarm expuesto (:2377). Un bot automatizado que escanee ese puerto puede tomar control del servidor en minutos. Cerrar ese puerto es la accion con mejor relacion impacto/esfuerzo de todo el plan.

### 8.7 Comandos especificos por cada paso de remediacion

Todos los comandos estan incluidos en las secciones de cada Sprint (secciones 3-7).

**Resumen de comandos criticos (los 5 mas importantes):**

```bash
# 1. Cerrar Docker Swarm (HACER AHORA — 2 minutos)
sudo ufw deny in on eth0 to any port 2377 proto tcp
sudo ufw deny in on eth0 to any port 7946
sudo ufw deny in on eth0 to any port 4789 proto udp

# 2. Verificar Node.js (5 minutos)
pgrep -la node && sudo lsof -i :3000

# 3. Desinstalar Node.js si no se usa (2 minutos)
sudo apt remove --purge nodejs && sudo apt autoremove

# 4. Actualizar todo (1-2 horas, hacer en ventana de mantenimiento)
sudo apt update && sudo apt upgrade --dry-run && sudo apt upgrade -y

# 5. Activar HSTS (2 minutos)
# Agregar a configuracion nginx:
# add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
# Luego: sudo nginx -t && sudo systemctl reload nginx
```

---

## 9. Checklist de Verificacion Post-Remediacion

Ejecutar despues de completar cada Sprint:

### Despues de Sprint 1 (P0)

- [ ] `nmap -p 2377,7946,4789,3000 31.97.146.7` → todos filtered/closed
- [ ] `curl -sI https://www.sprintjudicial.com` → responde 200
- [ ] `pgrep -la node` → sin resultados (si se desinstalo)
- [ ] `sudo docker ps` → contenedores nginx y correo corriendo
- [ ] Sitio web carga correctamente en navegador
- [ ] Correo electronico funciona (enviar/recibir test)

### Despues de Sprint 2 (P1)

- [ ] `curl -sI https://www.sprintjudicial.com | grep -i strict` → header HSTS presente
- [ ] `sudo certbot certificates` → certificados validos, auto-renovacion activa
- [ ] `sudo find / -name "log4j*.jar" 2>/dev/null` → eliminado o version >= 2.17.1
- [ ] Subdominios (blog.sprintjudicial.com) accesibles por HTTPS

### Despues de Sprint 3 (P2)

- [ ] `vim --version | head -1` → version >= 9.1.2132
- [ ] `sudo ufw status` → solo puertos necesarios abiertos
- [ ] `sudo systemctl status fail2ban` → activo
- [ ] `sudo ss -tlnp` → solo servicios esperados escuchando

### Despues de Sprint 4 (P3)

- [ ] `cat /etc/apt/apt.conf.d/20auto-upgrades` → auto-updates activos
- [ ] `sudo systemctl list-timers | grep certbot` → timer activo
- [ ] `sudo lynis audit system` → score mejorado vs. baseline

### Rescan Nessus Final

- [ ] Ejecutar nuevo scan Nessus completo
- [ ] Comparar hallazgos vs. ADR-001 original
- [ ] Documentar hallazgos residuales y plan para cada uno
- [ ] Actualizar ADR-001 con estado post-remediacion

---

## 10. Riesgos y Rollback

### Riesgos por accion

| Accion | Riesgo | Probabilidad | Rollback |
|--------|--------|--------------|----------|
| Cerrar puertos firewall | Bloquear servicio legitimo | Baja | `sudo ufw delete <rule_number>` |
| Desinstalar Node.js | Romper servicio dependiente | Baja-Media | `sudo apt install nodejs` |
| apt upgrade | Incompatibilidad de paquetes | Muy baja (LTS) | Restaurar snapshot del VPS |
| HSTS header | Subdominio sin HTTPS se vuelve inaccesible | Baja | Quitar header de nginx.conf |
| Certbot cambios | Configuracion SSL rota | Baja | Restaurar backup de `/etc/nginx/` |
| Salir de Docker Swarm | Detener todos los stacks | Media | `docker swarm init` + re-deploy |
| SSH hardening | Perder acceso SSH | Media | Usar consola KVM/IPMI del proveedor |

### Plan de rollback general

```bash
# Si el sitio web deja de funcionar:
# 1. Verificar nginx
sudo docker ps | grep nginx
sudo docker logs <nginx_container> --tail 50

# 2. Si Docker esta roto:
sudo systemctl restart docker

# 3. Si el servidor no responde:
# Acceder via consola del proveedor (panel web del VPS)
# Restaurar el snapshot creado en Sprint 0

# 4. Si perdiste acceso SSH:
# Usar consola web del proveedor
# Restaurar /etc/ssh/sshd_config desde backup
sudo cp /etc/ssh/sshd_config.bak.YYYYMMDD /etc/ssh/sshd_config
sudo systemctl restart sshd
```

---

## Apendice A: Matriz de Severidad Completa

| CVSS | Count | Categoria | Accion |
|------|-------|-----------|--------|
| 9.0-10.0 | 16 | Critica | Sprint 1 (P0) |
| 7.0-8.9 | ~210 | Alta | Sprint 1-2 (P0/P1) |
| 4.0-6.9 | ~882 | Media | Sprint 2-3 (P1/P2), mayoria cubierta por apt upgrade |
| 0.1-3.9 | ~28 | Baja | Sprint 4 (P3) |
| Info | ~264 | Informativa | Documentar, no requiere accion inmediata |

## Apendice B: Sobre Docker Swarm vs Docker Compose

Si el servidor es un solo nodo (no un cluster), Docker Swarm es innecesario y agrega complejidad + superficie de ataque. Considerar migrar a Docker Compose:

**Ventajas de salir de Swarm:**
- Elimina puertos 2377, 7946, 4789 (3 puertos menos expuestos).
- Elimina certificados auto-firmados de Swarm.
- Simplifica la gestion de contenedores.
- `docker-compose up -d` es mas simple que `docker stack deploy`.

**Desventajas:**
- Si en el futuro se necesita escalar a multiples nodos, habria que re-implementar Swarm o migrar a Kubernetes.
- Los stacks actuales de Swarm necesitarian convertirse a docker-compose.yml.

## Apendice C: Superficie de Correo Electronico

El escaneo revela un servidor de correo completo (SMTP, IMAP, POP3, ManageSieve) con 8 puertos abiertos. Si el correo se gestiona externamente (Gmail, Microsoft 365, Zoho, etc.), estos puertos deben cerrarse. Si es un servidor de correo self-hosted (Mailu, Mail-in-a-Box, etc.), necesita su propia auditoria de seguridad:

- Verificar si DKIM, SPF y DMARC estan configurados.
- Verificar si los certificados del correo tambien son Let's Encrypt.
- Considerar si el self-hosting de correo vale la complejidad vs. un servicio gestionado.

---

*Plan creado: 2026-03-10*
*Basado en: ADR-001-informe-seguridad.md (Nessus scan)*
*Proximo paso: Ejecutar Sprint 0 (backup) y Sprint 1 (P0 criticos)*
