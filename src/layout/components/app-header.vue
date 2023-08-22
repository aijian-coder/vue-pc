<!-- 此组为右侧头部个人信息 -->
<template>
  <div class="app-header">
    <!-- 渲染左侧按钮，以及面包屑.. -->
    <div class="app-header__left">
      <div class="box2" @click="setCollapsed(!collapsed)">
        <el-icon size="24">
          <Expand v-if="collapsed" />
          <Fold v-else />
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>组件库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 渲染右侧头像、昵称 -->
    <div class="app-header__right">
      <el-dropdown  trigger="click">
        <template #default>
          <div class="box1">
            <p class="nickname">{{ info.nickName }}</p>
            <img class="avatar" :src="info.headImg" alt="" />
          </div>
        </template>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">
                <i class="iconfont icon-exit"></i>
                退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>

      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "app-header",
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("app", ["collapsed"]),
  },
  methods: {
    // this.setCollapsed(payload)  => this.$store.commit('app/setCollapsed', payload)
    ...mapMutations("app", ["setCollapsed"]),
    handleLogout(){
        this.$store.dispatch("user/logout");
    }
  },
};
</script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 16px;

  &__right {
    display: flex;
    align-items: center;
  }
  &__left {
    display: flex;
    align-items: center;
  }
}
.box1 {
  height: 100%;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.nickname {
  margin-right: 15px;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.box2 {
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
}
.el-breadcrumb {
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
}
</style>
