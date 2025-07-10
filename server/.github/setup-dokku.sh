# remove default nginx page
rm /etc/nginx/sites-enabled/default

# create apps
dokku apps:create client
dokku apps:create server

# add ssh-key to dokku
echo $PUBLIC_KEY | dokku ssh-keys:add admin

# add env variables
JWT_ACCESS_SECRET=$(openssl rand -base64 16)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)
dokku config:set server JWT_ACCESS_SECRET=$JWT_ACCESS_SECRET JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET

# setup ports and domains
dokku proxy:ports-add client http:80:3000
dokku proxy:ports-add server http:80:3001
ufw allow 3001

dokku domains:report client | grep packer | awk '{print $NF}' | xargs -I {} dokku domains:remove client {}
dokku domains:report server | grep packer | awk '{print $NF}' | xargs -I {} dokku domains:remove server {}
dokku domains:add client $CLIENT_DOMAIN
dokku domains:add server api-$CLIENT_DOMAIN

# SETUP SSL
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:set client email devs@citi.org.br
dokku letsencrypt:set server email devs@citi.org.br
dokku letsencrypt:enable client
dokku letsencrypt:enable server
dokku letsencrypt:cron-job --add
dokku letsencrypt:auto-renew client
dokku letsencrypt:auto-renew server

# setup swap memory

cd /var
touch swap.img
chmod 600 swap.img

dd if=/dev/zero of=/var/swap.img bs=1024k count=1000
mkswap /var/swap.img
swapon /var/swap.img
free

echo "/var/swap.img    none    swap    sw    0    0" >> /etc/fstab

# setup database
dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku postgres:create server-db
dokku postgres:link server-db server

# allow password authentication
sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
sed -i 's/KbdInteractiveAuthentication no/KbdInteractiveAuthentication yes/g' /etc/ssh/sshd_config
systemctl restart ssh