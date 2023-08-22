<template>
  <div>
    <el-form label-width="100" ref="form" :model="model" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="头像" prop="headImg">
            <AvatarUploader v-model="model.headImg" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请填写姓名" v-model="model.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input placeholder="请填写昵称" v-model="model.nickName" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input placeholder="请填写用户名" v-model="model.username" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请填写密码" v-model="model.password" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色"  prop="roleIdList" >
            <SelectRole v-model="model.roleIdList" />
          </el-form-item  >
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone">
            <el-input placeholder="请填写手机号码" v-model="model.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请填写邮箱" v-model="model.email" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              placeholder="请填写备注"
              v-model="model.remark"
              type="textarea"
              style="min-height: 31px"
         
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="状态">
            <el-radio-group v-model="model.status">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
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
import { addUser, updUser } from "@/api/user";
// import AvatarUploader from "@/components/avatar-uploader/index.vue";
//导入写好的权限组件，权限组件是一个组件树

export default {
  name: "UpsertForm",

  // components: {
  //   AvatarUploader,
  // },

  data() {
    return {
      model: {
        id: 0,
        headImg: "", // 头像
        name: "", // 姓名 必填
        nickName: "", // 昵称 必填
        username: "", // 用户名 必填
        password: "", // 密码  必填
        roleIdList: [], // 角色ID列表  必填
        status: 1, // 状态 0-关闭 1-开启  必填
        remark: "", // 备注
        email: "", // 邮箱
        phone: "", // 手机号码
      },
    };
  },

  computed: {
    // 是否编辑模式
    isEditMode() {
      return this.model.id !== 0;
    },
    //规则
    rules() {
      return {
        name: [{ required: true, message: "必填" }],
        nickName: [{ required: true, message: "必填" }],
        username: [{ required: true, message: "必填" }],
        roleIdList: [{ required: true, message: "必填" }],

        // 编辑模式修改密码非必填
        password: [{ required: !this.isEditMode, message: "必填" }],
        phone: [{ pattern: /^1\d{10}$/, message: "请输入正确的手机号码" }], //11位以1开头的数字
        email: [{ type: "email", message: "请输入正确的邮箱" }],
      };
    },
  },

  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handelOk() {
      this.$refs.MenuCheck.set(this.model.menuIdList);
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
      // console.log(this.model);
      // return false;
      //获取MenuCheck的里面的menuList的值
      if (this.isEditMode) {
        // console.log("编辑");
        //编辑
        //调用接口 要传递一个参数
        await updUser(this.model);
      } else {
        //新增
        // 新增
        const { id, ...model } = this.model;
        await addUser(model);
      }

      this.$emit("success");
    },
  },
};
</script>
