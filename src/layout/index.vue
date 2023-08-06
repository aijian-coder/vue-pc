<template>
  <!-- <div>HELLO WORLD</div> -->
  <div class="app-layout">
    <div class="app-layout__left">
      <!-- 左侧菜单栏 -->
      <AppMenu></AppMenu>
    </div>
    <div class="app-layout__right">
      <div class="app-layout__right--top">
        <!-- 右侧顶部信息栏 -->
        <AppHeader />
      </div>
      <div class="app-layout__right--container">
        <!-- 渲染子路由 使用RouterView -->
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<!-- 
  lang="scss" 启用 scss 语法
  scoped      启用 私有化 样式，该样式只对当前组件生效
    如何表现的：
      审查元素：
        1. 这里写的样式，都会变成带有属性选择器的语法
          .button[data-xxx-yyy] {
            color: red;
          }
        2. 当前组件模板里面的 标签元素上 会增加 data-xxx-yyy 的属性

    规则：
        1. 当前组件的 data-v-xxx 的自定义属性，会在子组件的根元素上也携带
 -->
<script>
import AppHeader from "./components/app-header.vue";
import AppMenu from "./components/app-menu.vue";
export default {
  name: "layout",
  components: {
    AppHeader,
    AppMenu,
  },
};
</script>
<style lang="scss" scoped>
.app-layout {
  display: flex;
  height: 100%;
  background-color: red;

  &__left {
    background:rgb(84 92 100);
    width: 200px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: yellowgreen;
    overflow: hidden;

    &--top {
      background: #ccc;
      height: 64px;
    }

    &--container {
      background: rgb(237, 97, 97);
      flex: 1;
    }
  }
}
</style>
