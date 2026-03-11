FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY src/ /usr/share/nginx/html/src/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/
COPY security.txt /usr/share/nginx/html/
COPY humans.txt /usr/share/nginx/html/
COPY llms.txt /usr/share/nginx/html/
COPY .well-known/ /usr/share/nginx/html/.well-known/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
