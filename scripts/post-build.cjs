// scripts/post-build.cjs
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../docs');
const indexHtmlPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

// 1. 找出打包后的 JS 文件
const jsFile = fs.readdirSync(assetsDir).find(f => /^index-.*\.js$/.test(f));
const cssFile = fs.readdirSync(assetsDir).find(f => /^index-.*\.css$/.test(f));

if (!jsFile) {
    console.error('❌ Cannot find built JS file in assets/');
    process.exit(1);
}

// 2. 构建新的 index.html 内容
const html = `
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ''}
  </head>
  <body>
    <div id="app"></div>
    <script>
      fetch("/config.json")
        .then(res => res.json())
        .then(cfg => {
          window.__APP_CONFIG__ = cfg;
          const script = document.createElement("script");
          script.type = "module";
          script.src = "/assets/${jsFile}";
          document.body.appendChild(script);
        })
        .catch(err => {
          console.error("❌ Failed to load config.json", err);
        });
    </script>
  </body>
</html>
`;

// 3. 写入新 index.html
fs.writeFileSync(indexHtmlPath, html.trim());
console.log('✅ dist/index.html updated with dynamic script loader.');
