# 使用官方 nginx 作为基础镜像
FROM nginx:alpine

# 拷贝构建产物（在宿主机先执行 npm run build）
COPY docs/ /usr/share/nginx/html/

# 复制运行时配置入口脚本
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 可选：使用你自己的 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 启动容器时先执行入口脚本，再执行 nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
