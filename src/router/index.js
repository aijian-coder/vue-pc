//导入路由
import { createRouter, createWebHistory } from "vue-router";


//实力化路由对象
const router= createRouter({
    //历史记录模式选择createWebHistory
    history: createWebHistory(),
    routes:[
        {
            path:"/login",
            name:"login",
            component: () => import("../views/login/index.vue")
        },
        {
            //先让根路径直接进入布局页面
            path: "/",
            name: "index",
            component: () => import("../layout/index.vue"),
        }
    ]

})

//导出路由
export default router;