#!/bin/bash


if [[ $# -eq 1 ]] ; then
   pecl channel-update pecl.php.net \
    && pecl install xdebug \
    && echo "zend_extension=xdebug.so" > /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.remote_enable=1" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.remote_autostart=1" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.remote_port=\"9001\"" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.remote_connect_back=0" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.idekey=\"PHPSTORM\"" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.remote_log=\"/var/www/symfony/var/log/xdebug/xdebug.log\"" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.cli_color=1" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini \
    && echo "xdebug.remote_host=host.docker.internal" >> /etc/php/7.2/fpm/conf.d/20-xdebug.ini
fi
