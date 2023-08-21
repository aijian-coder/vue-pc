<template>
  <div>监控台</div>
  <el-button @click="fn1">点击获取选中</el-button>
  <el-button @click="fn2">点击设置选中</el-button>
  <a href="tel:10086">10086</a><h1>树形组件调试↓</h1>
  <hr />
  <MuneCheck  ref="menuCheck"/>
</template>
<script>
import MuneCheck from "@/components/menu-check/index.vue";

export default {
  name: "monitor",
  components: {
    MuneCheck,
  },
  methods:{
    fn1(){
      const res=this.$refs.menuCheck.get();
      console.log(res);

    },
    fn2(){
      this.$refs.menuCheck.set([5, 6, 9, 10, 11, 12]);
    },
  }
};
</script>
