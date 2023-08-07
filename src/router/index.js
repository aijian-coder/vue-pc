//导入路由
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import routesStatic from "./router_static";

//createRouter实例化路由对象
const router = createRouter({
  //历史记录模式选择createWebHistory
  history: createWebHistory(),
  routes: routesStatic,
});

//设置路由拦截

// 白名单路由 name 集合。在这里配置的是不需要登录的
const whiteNames = ["login", "403", "404"];
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
        name: "login",
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

    /**
     * 搞动态路由
     * 先解决刷新就消失
     * 再解决重定向
     */
    const isAdd = store.state.user.isAdd;
    // 没有动态添加过时,才需要动态添加
    if (!isAdd) {
      // 0. 修改 isAdd 为 true,提交突变，修改isAdd
      store.commit("user/setIsAdd", true);
      // 1. 获取用户的个人信息, 并返回当前用户的路由权限数据
      const routes = await store.dispatch("user/getPerson");
      //getPerson的返回值传递给了我路径信息
        // 2. 循环routes, 动态添加路由
        routes.forEach((route) => {
          //addRoute是路由器的一个api方法可以添加路由
          router.addRoute("index", {
            path: route.router,
            component: () => import(`../${route.viewPath}`),
          });
        });
        // 3. 触发重定向
        return to.fullPath;

    }
  }
});
//导出路由
export default router;
