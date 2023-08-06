<!-- menu,左侧菜单页 -->
<template>
  <div class="app-menu">
    <el-menu
      :collapse="collapsed"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <!-- 动态渲染的menu的菜单页面 -->
      <!-- 借助一个prop 往子组件传递menu菜单的数据，prop的键名叫model，键值就是menu，每一个菜单的值 -->
      <AppMenuItem v-for="menu in menus" :model="menu"></AppMenuItem>
    </el-menu>
  </div>
</template>
<script>
import AppMenuItem from "./app-menu-item.vue";
import { mapState } from "vuex";
export default {
  name: "app-menu",
  components: {
    AppMenuItem,
  },
  
  computed: {
    ...mapState("app", ["collapsed"]),
    ...mapState("user", ["menus"]),
  },
  methods: {
    // menu组件的方法，当某个组件的menu被选中高亮时，就会触发该方法，可以用来做路由跳转
    //此处的index就是组件的每一个条目我主动携带的路由的值：menu.router
    handleSelect(index) {
      console.log("handleSelect", index);
      this.$router.push({
        path: index,
      });
    },
    handleOpen() {},
    handleClose() {},
  },
};
</script>
<style lang="scss" scoped></style>
