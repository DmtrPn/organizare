upstream hmf_bot {
    server                      127.0.0.1:3007;
    keepalive                   16;
}

server {
    listen 80;

    server_name hellomyfriend.ru;

    return 301 https://$host$request_uri;
}

server {
    listen                      443 ssl;
    server_name                 hellomyfriend.ru;

    access_log                  /var/log/nginx/hellomyfriend.access.log combined;
    error_log                   /var/log/nginx/v.error.log warn;

    charset                     utf-8;
    client_max_body_size        100M;
    client_body_buffer_size     100M;

    gzip            on;
    gzip_types      text/plain text/css application/json application/x-javascript application/xml+rss text/javascript application/javascript;

    ssl_certificate /etc/letsencrypt/live/hellomyfriend.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hellomyfriend.ru/privkey.pem; # managed by Certbot

    location /bot/ {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;

        proxy_pass              http://hmf_bot;
        proxy_redirect          off;
    }

    location /telegraf/ {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;

        proxy_pass              http://hmf_bot;
        proxy_redirect          off;
    }

}
