# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

machine = YAML.load_file('envvars.yml')

Vagrant.configure("2") do |config|
  config.vm.box = "vineetpalan/centos7-docker"
  config.vm.box_version = "1.0"
  config.vm.define machine['name']
  config.vm.box_check_update = false

  #config.disksize.size = "60GB"

  config.vm.hostname = machine['host']
  config.vm.network "private_network", ip: machine['ip']

  #config.vm.network "forwarded_port", guest: 25, host: 25
  #config.vm.network "forwarded_port", guest: 80, host: 80
  #config.vm.network "forwarded_port", guest: 443, host: 443
  #config.vm.network "forwarded_port", guest: 9001, host: 9001
  #config.vm.network "forwarded_port", guest: 2375, host: 2375
  #config.vm.network "forwarded_port", guest: 3306, host: 3306
  #config.vm.network "forwarded_port", guest: 5601, host: 5601
  #config.vm.network "forwarded_port", guest: 8080, host: 8088
  #config.vm.network "forwarded_port", guest: 11211, host: 11211

  #config.vm.network "forwarded_port", guest: 22, host: 22

  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.synced_folder machine['app_path'], machine['src_path'], type: "rsync", rsync__exclude:[ ".git/", ".idea/", "var/", "vendor/", "node_modules/", "public/bundles/", "public/media/", "public/assets/", "public/build/" ], rsync__chown: false, rsync__args: ["--quiet", "--archive", "--delete", "-z", "-O"]

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false

    vb.name = machine['host']

    # Customize the amount of memory on the VM:
    vb.memory = machine['memory']
    vb.cpus = machine['cpus']
  end

  # This provisioner runs on every `vagrant reload' (as well as the first
  # `vagrant up`), reinstalling from local directories
  config.vm.provision "recompose", type: "shell", env: {"docker_user" => machine['docker_user'], "docker_pass" => machine['docker_pass']}, run: "always", inline: <<-SHELL

      yum install -y yum-utils curl

      mkdir -p /backup
      mkdir -p /var/www/symfony
      mkdir -p /var/www/symfony/public/media/image
      mkdir -p /var/www/symfony/var/xdebug
      mkdir -p /var/www/symfony/public/media/image

      yum install epel-release -y
      yum install --enablerepo="epel" ufw -y
      ufw --force enable

      ufw allow 25;
      ufw allow 80;
      ufw allow 443;
      ufw allow  9001;
      ufw allow  2375;
   d   ufw allow  3306;
      ufw allow  5601;
      ufw allow  8088;
      ufw allow  11211;

      chown -Rf vagrant:vagrant /var/www/symfony
      chown -Rf vagrant:vagrant /backup
      chmod -Rf 765 /var/www/symfony
      chmod -Rf 775 /var/www/symfony/var

      /sbin/sysctl -w net.ipv4.ip_forward=1

      cd /var/www/symfony/

      sed -e 's#^ExecStart=.*#ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock#' /lib/systemd/system/docker.service > docker.service
      mv docker.service /lib/systemd/system/docker.service
      systemctl daemon-reload

      systemctl restart docker.service
      sysctl -w vm.max_map_count=262144

      openssl req -newkey rsa:2048 -nodes -keyout /var/www/symfony/docker/nginx/certs/uni.local.key -x509 -days 365 -out /var/www/symfony/docker/nginx/certs/uni.local.crt -subj '/CN=uni.local' -extensions EXT -config <( \
         printf "[dn]\nCN=uni.local\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:uni.local\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

  SHELL
end

