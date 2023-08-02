import { createApp } from 'vue'
import App from './App.vue'
//导入Element-plus，先在npm上下载，然后use它
import ElementPlus from "element-plus";

//导入路由，并用use路由
import router from "./router";

//导入一个全局清除样式的Scss文件
import "./global.scss"

createApp(App).use(ElementPlus).use(router).mount('#app')
