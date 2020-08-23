ARG PHP_TAG=${PHP_TAG}
ARG XDEBUG_ENABLE
ARG SYMFONY_APP_PATH="${SYMFONY_APP_PATH}"

FROM kmoussouni/php-fpm:${PHP_TAG}

RUN pecl install mongodb-1.8.0
RUN echo "extension=mongodb.so" >> /usr/local/etc/php/conf.d/mongodb.ini

RUN echo "127.0.0.1    radar.local" >> /etc/hosts;

RUN usermod -aG www-data dev

RUN mkdir -p /var/www/symfony
RUN chown -Rf dev:www-data /var/www/symfony
RUN chmod -Rf 775 /var/www/symfony

# Application
WORKDIR /var/www/symfony

CMD ["php-fpm"]



