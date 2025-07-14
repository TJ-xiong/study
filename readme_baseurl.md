
---

# Vue 项目 Docker 镜像运行时动态配置 README

## 概述

本项目演示如何构建一个 Vue 应用的 Docker 镜像，支持运行时通过环境变量动态注入 `BASE_URL` 配置，实现“一次构建，多环境运行”。

利用静态文件中的占位符和启动脚本，在容器启动时替换配置，无需针对不同环境重新构建镜像。

---

## 目录结构示例

```
.
├── dist/                   # Vue 构建产物
├── docker-entrypoint.sh    # 运行时配置注入脚本
├── nginx.conf              # Nginx 配置，支持 SPA 路由
├── config.json             # 带占位符的运行时配置文件
├── Dockerfile              # 镜像构建文件
├── package.json            # 项目配置与构建命令
├── scripts/
│   └── post-build.cjs      # 构建后脚本，插入动态配置加载
└── README.md
```

---

## 运行时动态配置原理

* `config.json` 中写入类似 `"baseURL": "__BASE_URL__"` 的占位符。
* Docker 启动脚本读取环境变量 `BASE_URL`，替换 `config.json` 中占位符。
* Vue 应用启动时从 `/config.json` 拉取配置，动态注入应用。
* Nginx 配置支持 SPA 路由，避免 404 和 MIME 类型错误。

---

## 快速开始

### 1. 构建 Vue 应用

```bash
npm run build-only
npm run postbuild
```

> `postbuild` 脚本会修改 `dist/index.html`，插入加载运行时配置的代码。

---

### 2. 构建 Docker 镜像

```bash
docker build -t vue-runtime-config-app .
```

---

### 3. 运行容器，指定运行时 Base URL

```bash
docker run -d -p 8080:80 -e BASE_URL=http://test.com --name vue-runtime-container vue-runtime-config-app
```

访问 `http://localhost:8080`，应用将使用 `http://test.com` 作为 API 基础地址。

---

## 关键文件示例

### docker-entrypoint.sh

```sh
#!/bin/sh
BASE_URL=${BASE_URL:-http://default-base-url.com}
sed -i "s|__BASE_URL__|$BASE_URL|g" /usr/share/nginx/html/config.json
exec "$@"
```

### nginx.conf

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### config.json (模板)

```json
{
  "baseURL": "__BASE_URL__"
}
```

---

## 常见问题及解决

* **`require is not defined`**：构建后处理脚本需改用 `.cjs` 后缀，或用 ES Module `import` 语法。
* **镜像删除失败**：先删除依赖该镜像的容器或用 `docker rmi -f` 强制删除。
* **静态资源加载 404 或 MIME 错误**：确认 Nginx 配置正确，特别是 `try_files` 支持 SPA 路由。
* **构建警告大 chunk**：建议使用动态导入拆分代码或配置 `manualChunks`。

---

## 参考链接

* [Vite 配置手册](https://vitejs.dev/config/)
* [Docker 官方文档](https://docs.docker.com/)
* [Nginx 配置 SPA 路由示例](https://www.nginx.com/blog/using-nginx-ingress-controller-for-kubernetes/)
