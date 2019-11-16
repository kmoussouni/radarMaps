ARG PHP_TAG=${PHP_TAG}
ARG XDEBUG_ENABLE
ARG SYMFONY_APP_PATH="${SYMFONY_APP_PATH}"

FROM kmoussouni/php73-fpm:${PHP_TAG}

RUN echo "127.0.0.1    uni.local" >> /etc/hosts;
RUN echo "127.0.0.1    shop.uni.local" >> /etc/hosts;
RUN echo "127.0.0.1    www.uni.local" >> /etc/hosts;
RUN echo "127.0.0.1    coin.uni.local" >> /etc/hosts;

RUN cat /etc/passwd
RUN echo /var/www/symfony
RUN chown -Rf dev:www-data /var/www/symfony
RUN chmod -Rf 775 /var/www/symfony

## yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get -y update && apt-get -y install yarn

# Application
WORKDIR /var/www/symfony

#CMD /usr/bin/php-fpm



