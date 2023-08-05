//导入路由
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";


//createRouter实例化路由对象
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
            children:[
                {
                    path: "dashboard/monitor",
                    name: "dashboard_monitor",
                    component: () => import("../views/dashboard/monitor.vue"),
                },
                {
                    path: "dashboard/console",
                    name: "dashboard_console",
                    component: () => import("../views/dashboard/console.vue"),
                },
                {
                    path: "dashboard/workplace",
                    name: "dashboard_workplace",
                    component: () => import("../views/dashboard/workplace.vue"),
                },
            ]
        }
    ]

})

//设置路由拦截

// 白名单路由 name 集合。在这里配置的是不需要登录的
const whiteNames = ["login"];
//使用路由前置守卫
router.beforeEach(async (to, from) => {
    // 非白名单的路由
    if (!whiteNames.includes(to.name)) {
      // 要做登录状态的校验
      // 1. 获取 token
      const token = store.state.user.token;
      // 2. 判断 token 是否存在
      if (!token) {
        // 去登录
        return {
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        };
      }
  
      // // 判断路由权限
      // const routes = store.state.user.routes;
      // if (to.name !== "index" && !routes.includes(to.path)) {
      //   // 没有访问权限
      //   return { name: "403" };
      // }
  
     
    }
  });
//导出路由
export default router;