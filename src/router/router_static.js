/**
 * 该文件, 定义静态路由数组
 */

export default [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue"),
    },
    {
      // VueRouter@4 之前，写 *
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/error/404.vue"),
    },
    {
      path: "/",
      name: "index",
      component: () => import("../layout/index.vue"),
      children: [
        {
          path: "403",
          name: "403",
          component: () => import("@/views/error/403.vue"),
        },
        {
          path: "404",
          name: "404",
          component: () => import("@/views/error/404.vue"),
        },
      ],
    },
  ];
  