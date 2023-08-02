//导入路由
import { createRouter, createWebHistory } from "vue-router";


//实力化路由对象
const router= createRouter({
    //历史记录模式选择createWebHistory
    history: createWebHistory(),

})

//导出路由
export default router;