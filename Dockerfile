# Dockerfile para sitio Hugo estático (ya compilado)
FROM nginx:alpine

# Copiar archivos HTML estáticos
COPY . /usr/share/nginx/html

# Configuración Nginx para Hugo
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ $uri.html /index.html; \
    } \
    \
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    gzip on; \
    gzip_types text/plain text/css application/javascript; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80