export default {
  namespaced: true,
  state: {
    // 左侧菜单是否要收起
    collapsed: false,
  },
  mutations: {
    setCollapsed(state, payload) {
      state.collapsed = payload;
    },
  },
};


