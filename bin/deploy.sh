#!/usr/bash
#deploy.sh

#@todo: create ci branch on github, create ci pipeline somewhere
#copy src deploy version
echo "RSYNC APP"

rsync -avzh --delete \
      --exclude 'var/cache' \
      --exclude '.git' \
      --exclude 'node_modules' \
      --exclude 'vendor' \
      --exclude 'docker-compose.yml' \
      --exclude 'public/media' \
      --e "ssh -i ~/.ssh/id_rsa" \
       ./*.* ubuntu@ns35222:/var/www/karimmoussouni

# ~/.ssh/id.pub
#run make build
echo "MAKE APP"
ssh -i ~/.ssh/id_rsa ubuntu@ns35222 -C "cd /var/www/karimmoussouni && make start
                                        && make fixperm
                                        && docker exec -udev -i php composer i
                                        && docker exec -udev -i php yarn
                                        && yarn build"
