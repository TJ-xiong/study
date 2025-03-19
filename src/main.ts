import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'highlight.js/styles/atom-one-dark.css' // 样式
import 'highlight.js/lib/common' // 依赖包
import hljsVuePlugin from '@highlightjs/vue-plugin' // 支持vue3的组件

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(hljsVuePlugin) // 引入代码高亮，并进行全局注册
app.use(createPinia())
app.use(router)

app.mount('#app')
