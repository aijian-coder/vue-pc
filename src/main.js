import { createApp } from 'vue'
import App from './App.vue'
//导入Element-plus，先在npm上下载，然后use它
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import store from '@/store';

//导入路由，并用use路由
import router from "./router";

//导入一个全局清除样式的Scss文件
import "./global.scss"

const app=createApp(App)

// 将 icon 图标组件全部都注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

app.use(ElementPlus).use(router).use(store).mount('#app')
