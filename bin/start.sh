#!/bin/bash -e

# Provide 8080 as default for PORT
export PORT=${PORT:-8080} 

# Add port to nginx config
envsubst < default.conf > /etc/nginx/conf.d/default.conf 

# Start nginx
exec nginx -g 'daemon off;'