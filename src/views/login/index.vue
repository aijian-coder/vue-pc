<template>
  <div class="page">
    <el-form
      class="login-form"
      ref="form"
      label-width="100"
      :model="model"
      :rules="rules"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="model.password" />
      </el-form-item>
      <el-form-item label="VerifyCode" class="captcha" prop="verifyCode">
        <el-input class="captcha__input" v-model="model.verifyCode" @keyup.enter="handleLogin" />
        <Captcha ref="captcha" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loading"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import Captcha from "./components/captcha.vue";
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";

export default {
  name: "Login",
  components: {
    Captcha,
  },
  data() {
    return {
      // 是否正在登录中
      loading: false,
      // 表单数据
      model: {
        // 用户名
        username: "admin",
        // 密码
        password: "123456",
        // 验证码
        verifyCode: "",
      },

      rules: {
        username: [{ required: true, message: "请输入" }],
        password: [{ min: 6, required: true, message: "请输入6位以上" }],
        verifyCode: [{ required: true, message: "请输入" }],
      },
    };
  },

  methods: {
    async handleLogin() {
      await this.$refs.form.validate();
      this.$refs.captcha.refresh();
      // 表单完整填写
      //组装调用参数的data
      const params = {
        ...this.model,
        captchaId: this.$refs.captcha.captchaId,
      };
      // console.log(params);
      //派发登录动作
      //   console.log(this.$route);
      try {
        const data = await this.$store.dispatch("user/login", params);
        await this.$store.dispatch("user/getPerson");
        this.loading = true;
        ElMessage({
          message: "登录成功",
          duration: 1000,
          type: "success",
          onClose: () => {
            // 消息关闭时的回调函数
            // 跳转页面
            // console.log(this.$route.query);
            const redirect = this.$route.query.redirect || "/";
            this.$router.replace(redirect);
            this.loading = false;
          },
        });
      } catch (error) {
        this.model.verifyCode=''
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #ccc;
}

.login-form {
  padding: 16px;
  box-sizing: border-box;
  width: 360px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(99, 97, 97);
  background-color: #fff;
}

.captcha {
  ::v-deep(.el-form-item__content) {
    display: flex;
    justify-content: space-between;
  }

  &__input {
    width: 70px;
  }
}
</style>
