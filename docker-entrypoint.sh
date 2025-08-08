#!/bin/sh

# 默认值，如果未提供环境变量 BASE_URL
BASE_URL=${BASE_URL:-http://47.109.151.83:9999}

echo "🔧 Injecting BASE_URL=$BASE_URL into config.json..."
sed -i "s|__BASE_URL__|$BASE_URL|g" /usr/share/nginx/html/config.json

echo "🚀 Starting Nginx..."
exec "$@"
