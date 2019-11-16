FROM really/nginx-certbot

RUN echo '127.0.0.1		karimmoussouni.local' >> /etc/hosts
RUN echo '127.0.0.1		www.karimmoussouni.local' >> /etc/hosts
RUN echo '127.0.0.1		kibana.karimmoussouni.local' >> /etc/hosts
RUN echo '127.0.0.1		adminer.karimmoussouni.local' >> /etc/hosts

COPY symfony.conf /etc/nginx/conf.d/default.conf
COPY kibana.conf /etc/nginx/conf.d/kibana.conf
COPY rabbit.conf /etc/nginx/conf.d/rabbit.conf
COPY adminer.conf /etc/nginx/conf.d/adminer.conf

# DEV:
#RUN openssl req -newkey rsa:2048 -nodes -keyout ./docker/nginx/certs/symfony.local.key -x509 -days 365 -out ./docker/nginx/certs/symfony.local.crt -subj '/CN=symfony.local'
# RUN openssl req -newkey rsa:2048 -nodes -keyout /var/www/symfony/docker/nginx/certs/symfony.local.key -x509 -days 365 -out /var/www/symfony/docker/nginx/certs/symfony.local.crt -subj '/CN=symfony.local'
#RUN certbot --nginx -n --agree-tos --email mouss38@gmail.com --domains www.symfony.local
