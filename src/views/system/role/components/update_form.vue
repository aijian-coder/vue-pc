<template>
  <div >
    <el-form label-width="100" ref="form" :model="model" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input placeholder="请填写名称" v-model="model.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标识" prop="label">
            <el-input placeholder="请填写标识" v-model="model.label" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input placeholder="请填写备注" v-model="model.remark" type="textarea" style="min-height: 31px"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="功能权限">
            <MenuCheck ref="MenuCheck" @ok="handelOk"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <div class="btn" style="width: 100%; text-align: right">
              <el-button @click="handleCancel">取消</el-button>
              <el-button @click="handleConfirm" type="primary">
                确认
              </el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addRole, updRole } from "@/api/role";
import MenuCheck from "@/components/menu-check/index.vue"
//导入写好的权限组件，权限组件是一个组件树

export default {
  name: "UpsertForm",
  components:{
    MenuCheck
  },
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

  computed: {
    // 是否编辑模式
    isEditMode() {
      return this.model.id !== 0;
    },
  },

  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handelOk(){
      this.$refs.MenuCheck.set(this.model.menuIdList)
    },
    setmodel(model) {
      //数据回显，需要上级组件传递数据model，然后用model的值，来覆盖我的this.model
      // this.model = model;
      // 该操作不合适，会直接覆盖到我原本的 this.model, 导致一些属性不存在了,此时会把我的id给覆盖掉
      //借助assign赋值的运算符
      Object.assign(this.model, model);
      // console.log(this.model.menuIdList.Array.form);
      //是异步的，set函数里面还没搞完
      // this.$refs.MenuCheck.set(model.menuIdList)

    },

    async handleConfirm() {
      // 1. 表单校验
      await this.$refs.form.validate();
      //获取MenuCheck的里面的menuList的值
      const menuIdList =this.$refs.MenuCheck.get()
      console.log(menuIdList);
      if (this.isEditMode) {
        // console.log("编辑");
        //编辑
        //调用接口 要传递一个参数
        await updRole({ ...this.model,menuIdList });
      } else {
        //新增
        console.log("编辑");
        await addRole({ ...this.model,menuIdList });
      }

      this.$emit("success");
    },
  },
};
</script>


