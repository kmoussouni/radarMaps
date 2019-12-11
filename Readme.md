#kmoussouni/karimmoussouni.com

# KarimMoussouni.com Project

##Install

**Wsl**

Register the Microsoft Windows Insider Program
Install Docker Desktop
https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly#ensure-volume-mounts-work

**Vagrant**

Install Vagrant and VirtualBox. 

**Install**
```
#Wsl
    wsl
#End Wsl

#Vagrant
    cp envvars.yml.dist envvars.yml
    vagrant plugin install vagrant-disksize
    vagrant plugin install vagrant-vbguest
    vagrant plugin install vagrant-winnfsd
    vagrant plugin install vagrant-faster
    vagrant plugin install vagrant-cachier
    vagrant up
    vagrant ssh
#End Vagrant

cd "APP_PATH"
cp .env.dist .env
make start
make ssh

./install.sh
```
add to your local hosts file
```
#Vagrant
192.168.99.100  karimmoussouni.local www.karimmoussouni.local kibana.karimmoussouni.local db smtp elasticsearch adminer.karimmoussouni.local
#Wsl
127.0.0.1       karimmoussouni.local www.karimmoussouni.local kibana.karimmoussouni.local db smtp elasticsearch adminer.karimmoussouni.local
```

test the urls:
www.karimmoussouni.local, www.karimmoussouni.local/api/docs, www.karimmoussouni.local

setup env variables in .env and envvars.yml (vm specs, git personnal account and token access, app specs)

####Vagrant plugins
```
vagrant plugin install vagrant-disksize
vagrant plugin install vagrant-cachier
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-faster
vagrant up - start from scratch
vagrant destroy -f - destroy your vm
vagrant halt-f - stop your vm
vagrant reload/resume - restart a poweroff/aborted vm
```

Osx/Linux
```
make help - show help (see above)
make start - start all containers
make start c=hello - start container hello
make stop - stop all containers
make ssh - ssh bash login 
make status - show list of containers with statuses
make clean - clean all data
```
 
###Yarn develop
```
yarn 
yarn front
yarn front-watch (for dev)
```

###Docker login
```
docker login --username=login --password=password
```

###Clean DataBase && Fixtures
```
composer install

php bin/console doc:dat:drop --force &&  
php bin/console doc:dat:create &&  
php bin/console doc:sch:upd --force && 
php bin/console ha:fix:load -n &&
php bin/console doc:mig:ver --add --all -n

php bin/console fos:elastica:reset &&
php bin/console fos:elastica:populate
```

###API
http://{wemeet_url}/api/fr/docs.html

###Tests
APP_ENV=test vendor/bin/behat

##### dump Js Routing
```
php bin/console fos:js-routing:dump --format=json --target=assets/js/fos_js_routes.json
```

##### Docx to MD
```
npm install -g mammoth
mammoth document.docx --output-format=markdown > output.md
```

##### dump workflow
```
php bin/console workflow:dump <workflow_name> | dot -Tpng -o <workflow_name>.png
```

##### Email Consomer
```
php bin/console messenger:consume async
```

####hydratation stats
add this to composer.json in extra section
```
"composer-overload-cache-dir": "var/cache",
      "composer-overload-class-dev": {
        "Doctrine\\ORM\\Internal\\Hydration\\ArrayHydrator": {
          "original-file": "vendor/doctrine/orm/lib/Doctrine/ORM/Internal/Hydration/ArrayHydrator.php",
          "overload-file": "vendor/steevanb/doctrine-stats/ComposerOverloadClass/Doctrine/ORM/Internal/ArrayHydrator.php"
        },
        "Doctrine\\ORM\\Internal\\Hydration\\ObjectHydrator": {
          "original-file": "vendor/doctrine/orm/lib/Doctrine/ORM/Internal/Hydration/ObjectHydrator.php",
          "overload-file": "vendor/steevanb/doctrine-stats/ComposerOverloadClass/Doctrine/ORM/Internal/ObjectHydrator.php"
        },
        "Doctrine\\ORM\\Internal\\Hydration\\ScalarHydrator": {
          "original-file": "vendor/doctrine/orm/lib/Doctrine/ORM/Internal/Hydration/ScalarHydrator.php",
          "overload-file": "vendor/steevanb/doctrine-stats/ComposerOverloadClass/Doctrine/ORM/Internal/ScalarHydrator.php"
        },
        "Doctrine\\ORM\\Internal\\Hydration\\SimpleObjectHydrator": {
          "original-file": "vendor/doctrine/orm/lib/Doctrine/ORM/Internal/Hydration/SimpleObjectHydrator.php",
          "overload-file": "vendor/steevanb/doctrine-stats/ComposerOverloadClass/Doctrine/ORM/Internal/SimpleObjectHydrator.php"
        },
        "Doctrine\\ORM\\Internal\\Hydration\\SingleScalarHydrator": {
          "original-file": "vendor/doctrine/orm/lib/Doctrine/ORM/Internal/Hydration/SingleScalarHydrator.php",
          "overload-file": "vendor/steevanb/doctrine-stats/ComposerOverloadClass/Doctrine/ORM/Internal/SingleScalarHydrator.php"
        }
      }
```

and in scripts section
```
        "pre-autoload-dump": [
            "steevanb\\ComposerOverloadClass\\OverloadClass::overload"
        ]
```
and in autoload-dev/psr-4 section
```
        "ComposerOverloadClass\\": "var/cache/ComposerOverloadClass"
```


php bin/console fos:oauth-server:create-client --redirect-uri="https://karimmoussouni.local" --grant-type="authorization_code" --grant-type="password" --grant-type="refresh_token" --grant-type="token" --grant-type="client_credentials" --grant-type="acces_token"


php bin/console fos:oauth-server:create-client --redirect-uri="https://api.mailingnewsrooms.me/v5/ha/ha_entrypoint" --grant-type="authorization_code" --grant-type="password" --grant-type="refresh_token" --grant-type="token" --grant-type="client_credentials" --grant-type="acces_token"

php bin/console trans:update --output-format=yml --force fr
