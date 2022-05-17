FROM nginx:stable

COPY ./build/ /var/www/
COPY ./nginx.conf /etc/nginx/conf.d/microservice.conf

CMD ["nginx", "-g", "daemon off;" ]
