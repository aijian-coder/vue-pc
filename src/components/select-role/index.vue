<template>
  <div class="role-select">
    <el-select
      :modelValue="modelValue"
      multiple
      :multiple-limit="limit"
      placeholder="请选择角色"
      @update:modelValue="handleUpdateModelValue"
    >
      <el-option
        v-for="item in list"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getRoleList } from "@/api/role";
export default {
  name: "role-select",
  props: {
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    limit: {
      type: Number,
      default: 3,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      value1: [],
      // 角色列表数据
      list: [],
    };
  },
  methods: {
    refresh() {
      getRoleList().then((data) => {
        this.list = data;
      });
    },
    handleUpdateModelValue(item) {
      console.log(item);
      // 将 item 做为参数，通知给我的父组件
      this.$emit("update:modelValue", item);
    },
  },
  created() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.role-select {
  width: 100%;

  .el-select {
    width: 100%;

  }
}
</style>
