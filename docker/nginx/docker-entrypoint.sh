#!/usr/bin/env bash

# Make env variables substitution in the nginx.conf file
envsubst '${SERVER_NAME}' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf

exec "$@"
