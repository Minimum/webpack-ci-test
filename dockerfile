FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/
COPY build /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html