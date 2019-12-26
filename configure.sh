# configure script

# Clean
# rm -Rf web/uploads/images/*
rm -Rf var/cache/*

# Doctrine
rm -Rf app/DoctrineMigrations/*

#php bin/console doctrine:database:drop --force
#php bin/console doctrine:database:create

php bin/console doctrine:mig:diff
php bin/console doctrine:mig:mig -n

php bin/console doctrine:fixtures:load --quiet

php bin/console fos:user:create admin mouss38@gmail.com 1234
php bin/console fos:user:promote admin ROLE_ADMIN

#php bin/console app:image:import ~/Documents/Charlie
#php bin/console app:image:import ~/Pictures/Maison

php bin/console asset:install

# Webpack
./node_modules/.bin/encore dev

# Translations
# php bin/console lexik:trans:export --locales=fr --format=yml
php bin/console trans:extra fr --dir=./src --output-dir=./app/Resources/translations --output-format=yml
php bin/console lexik:trans:import --force
