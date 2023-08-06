<!-- 此处使用递归组件的方式，动态生成的菜单 -->
<!-- 
    为什么要用递归组件：
    一旦菜单的目录很多层
    要一条条添加显然不合理
    我们发现，目录是有规律的，都是下拉嵌套普通
    那么就可借助vue提供的递归组件的解决方案，来动态的借助后端数据，递归生成相应的目录
    路由同样也可以动态生成动态路由，递归生成
 -->
<template>
  <div class="app-menu-item">
    <!-- 有孩子，把它搞成下拉框 -->
    <el-sub-menu v-if="hasChild" :index="index">
      <template #title>
        <el-icon v-if="model.icon">
          <component :is="model.icon" />
        </el-icon>
        <span class="title">{{ model.name }}</span>
      </template>

      <template #default>
        <!-- 递归组件 -->
        <AppMenuItem v-for="item in model.children" :model="item" />
      </template>
    </el-sub-menu>

    <!-- 如果没有孩子，表示它是一个普通的menu，不是下拉菜单 -->
    <el-menu-item v-else :index="index">
      <el-icon v-if="model.icon">
        <component :is="model.icon" />
      </el-icon>
      <span class="title">{{ model.name }}</span>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: "AppMenuItem",

  props: ["model"],

  computed: {
    hasChild() {
      //传过来的model数据就是每一个menu，有孩子的话，就递归的去逐层生成内嵌的菜单
      return this.model.children && this.model.children.length > 0;
    },

    index() {
      //有路由路径就返回路径，没有就 给一个id值作为index，保证，点击选中的时候不会影响别的菜单
      return this.model.router || "" + this.model.id;
    },
  },
};
</script>
