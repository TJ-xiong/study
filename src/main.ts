import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "highlight.js/styles/atom-one-dark.css"; // 样式
import "highlight.js/lib/common"; // 依赖包
import hljsVuePlugin from "@highlightjs/vue-plugin"; // 支持vue3的组件
import adaptiveText from "@/directives/AdaptiveText.ts"; // 导入指令
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import App from "./App.vue";
import router from "./router";
import resizeAdaptiveText from "@/directives/ResizeAdaptiveText.ts";

const app = createApp(App);

app.use(hljsVuePlugin); // 引入代码高亮，并进行全局注册
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.directive("adaptive-text", adaptiveText);
app.directive("resize-adaptive-text", resizeAdaptiveText);
// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
