<template>
  <el-form label-width="100" ref="form" :model="model" :rules="rules">

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="名称" prop="name">
          <el-input placeholder="请填写名称" v-model="model.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="标识" prop="label">
          <el-input placeholder="请填写标识" v-model="model.label"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input placeholder="请填写备注" v-model="model.remark"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="权限">
          <el-input placeholder="输入关键字进行过滤" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item>
          <div class="btn" style="width: 100%; text-align: right">
            <el-button @click="handleCancel">取消</el-button>
            <el-button @click="handleConfirm" type="primary"> 确认 </el-button>
          </div>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import { addRole, updRole } from "@/api/role";

export default {
  name: "UpsertForm",
  data() {
    return {
      model: {
        id: 0, // 为 0 为新增，否则为编辑
        name: "",
        label: "",
        remark: "",
        menuIdList: [],
      },
      rules: {
        name: [{ required: true, message: "必填" }],
        label: [{ required: true, message: "必填" }],
      },

    };
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },

    handleConfirm() {
      this.$emit("success");
    }
  }
};
</script>
