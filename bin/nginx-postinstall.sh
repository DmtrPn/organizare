#!/bin/sh
# Nginx config file automatic linker

if [ -f /opt/environment.sh ]; then
    source /opt/environment.sh
fi

TARGET_FILE="/etc/nginx/sites-enabled/hellomyfriend.ru"
SOURCE_FILE="/opt/hmf_bot/environment/nginx/hellomyfriend.ru"

echo "[NGINX POSTINSTALL HOOK]: Making new Nginx config link..."
if [ -f $TARGET_FILE ]; then
    rm $TARGET_FILE;
fi

ln -s $SOURCE_FILE $TARGET_FILE

echo "[NGINX POSTINSTALL HOOK]: Done."

echo "[NGINX POSTINSTALL HOOK]: Test Nginx configuration file..."
sudo service nginx configtest
echo "[NGINX POSTINSTALL HOOK]: Done."

echo "[NGINX POSTINSTALL HOOK]: Restarting Nginx..."
sudo service nginx restart
echo "[NGINX POSTINSTALL HOOK]: Done."
