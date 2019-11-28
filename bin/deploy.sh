#!/usr/bash
#deploy.sh

#@todo: create ci branch on github, create ci pipeline somewhere
#copy src deploy version
rsync -avzh -e ssh ./* ubuntu@ns35222:/var/www/karimmoussouni

# ~/.ssh/id.pub
#run make build
#ssh ubuntu@uni.karimmoussouni -C "cd /var/www/karimmoussouni && make update"
#ssh ubuntu@uni.karimmoussouni.com
