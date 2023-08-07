import store2 from "store2";
import { login, getUserInfo, logout } from "@/api/user";
import router from "@/router";
import { deepTree } from "@/utils";

export default {
  namespaced: true,
  state: {
    token: store2.get("token") || "", //用户令牌
    info: store2.get("info"), // 用户信息
    menus: store2.get("menus") || [], // 用户有权限的菜单数据
    routes: store2.get("routes") || [], // 用户有权限的路由数据
    isAdd: false,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
      store2.set("token", payload);
    },
    setInfo(state, payload) {
      state.info = payload;
      store2.set("info", payload);
    },
    setMenu(state, payload) {
      state.menus = payload;
      store2.set("menus", payload);
    },
    setRoutes(state, payload) {
      state.routes = payload;
      store2.set("routes", payload);
    },
    setIsAdd(state, flag = false) {
      state.isAdd = flag;
    },
  },
  actions: {
    /**
     * 登入
     * 准备登录动作，并且在仓库中存取token
     */
    async login({ commit }, payload) {
      const res = await login(payload);
      commit("setToken", res.token);
      return res;
    },

    /**
     * 登出
     */
    async logout({ commit }, flag = true) {
      //如果是request里面的401传过来的，会携带一个错误的token，使用错误token会导致logout()调用错误，又会回到401，从而导致死循环
      //此时传一个false过来，如果是401来的logout，就不执行53这里的代码。就不会导致死循环了
      flag && (await logout());

      // 清理数据
      commit("setIsAdd", false);
      //此处要清理掉isadd，如果不清理的话，会导致每次刷新，都会动态添加路由
      store2.clearAll();
      // 跳转路由
      router.replace("/login");
    },

    /**
     * 获取个人信息
     */
    async getPerson({ commit }, payload) {
      const data = await getUserInfo(payload);
      //此处返回的data有两个键值对，一个info，一个menus
      commit("setInfo", data.info);
      //在此处顺便把menus给搞定
      // 过滤掉 type = 2 的 `按钮` 菜单
      const list = data.menus.filter((item) => item.type !== 2);
      commit("setMenu", deepTree(list));
      //此处做动态路由
      //此处返回的data有两个键值对，一个info，一个menus
      // menus里面有一个键值对，router:“路由的值”
      // 先过滤出type为1的，里面才有 路由值
      // 再映射出router
      const routes = data.menus
        .filter((item) => item.type === 1)
        .map((item) => item.router);
      commit("setRoutes", routes);

      return data.menus.filter((item) => item.type === 1);
    },
  },
};
