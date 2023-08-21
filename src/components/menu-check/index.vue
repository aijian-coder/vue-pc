<script>
import { getMenuList } from "@/api/menu.js";
import { deepTree } from "@/utils/index.js";
import {isLeaf} from "@/utils"; 
import menuList from "@/utils/menus.js";

//此处编辑树形组件
export default {
  name: "menu-check",
  data() {
    return {
      list:[],
      // defaultProps关联data数据，可自定义需要的value键值
      defaultProps: {
        children: "children",
        label: "name",
      },
      keyWord: "",
    };
  },
  computed:{
   data(){
     // 转树形格式
     return deepTree(this.list);
   }
  },
  watch: {
    keyWord(value) {
      this.$refs.tree.filter(value);
    },
  },
  methods: {
    handleNodeClick() {
      // 点击节点条目触发事件
      // console.log("handleNodeClick");
    },

    refresh() {
      /**
       * 调用全量菜单列表
       */
      getMenuList().then((res) => {
        // console.log(res);
        // console.log(data);
        // const Data = deepTree(menuList);
        this.list = res;
        //获取数据成功
        this.$emit("ok")
      });
    },

    /**
     * 一旦树形组件的filter调用，此函数执行，并且data里面的每一个对象都会进行数据比较
     * @param {*} value 调用树形组件的filter(value)会传递进来
     * @param {*} data data数据
     */
    filterNode(value, data) {
      // console.log(value, data);
      return data.name.includes(value);
    },
    
    /**
     * 返回当前选中的id
     */
    get() {
      const key1 = this.$refs.tree.getHalfCheckedKeys(); //获取半选的id
      const key2 = this.$refs.tree.getCheckedKeys(); //获取全选的id
      return [...key1, ...key2];
    },

    /**
     * 设置要选择的id，用来回显编辑模式下的权限列表
     * 接受的参数是叶子的集合
     */
    set(keys) {
      //设置勾选，组合需要的keys数组
      const newkeys=keys.filter((id)=>isLeaf(this.list,id));
      // console.log(newkeys,"",keys);
      this.$refs.tree.setCheckedKeys(newkeys);
      
    },

    // fn1() {
    //   // this.$refs.tree.getCheckedNodes()
    //   // 半选择 getHalfCheckedKeys
    //   console.log("getCheckedNodes", this.$refs.tree.getCheckedNodes()); //获取选中对象
    //   console.log("getCheckedKeys", this.$refs.tree.getCheckedKeys()); //获取选中id
    //   console.log("getHalfCheckedKeys", this.$refs.tree.getHalfCheckedKeys()); //获取半选id
    // },
  },

  mounted() {
    this.refresh();
  },
};
</script>
<template>
  <div class="menu-check">
    <el-input v-model="keyWord" placeholder="输入关键字进行过滤"></el-input>
    <div class="menu-check__box">
      <el-scrollbar max-height="200px">
        <el-tree
          ref="tree"
          :data="data"
          :props="defaultProps"
          :filter-node-method="filterNode"
          show-checkbox
          node-key="id"
          @node-click="handleNodeClick"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-check {
  width: 100%;
  &__box {
    margin-top: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px 0;
    background-color: #fff;
  }
}
</style>
