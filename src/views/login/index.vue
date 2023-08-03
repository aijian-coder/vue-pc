<template>
    <div class="page">
        <el-form class="login-form" ref="form" label-width="100" :model="model" :rules="rules">
            <el-form-item label="Username" prop="username" >
                <el-input v-model="model.username" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="model.password" />
            </el-form-item>
            <el-form-item label="VerifyCode" class="captcha" prop="verifyCode">
                <el-input class="captcha__input" v-model="model.verifyCode" />
                <div class="captcha__cap" @click="refresh()" v-html="svg"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">Login</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "Login",

    data() {
        return {
            // 表单数据
            model: {
                // 用户名
                username: "",
                // 密码
                password: "",
                // 验证码
                verifyCode: "",
            },
            svg: "",
            rules: {
                username: [{ required: true, message: "请输入" }],
                password: [{min:6, required: true, message: "请输入6位以上" }],
                verifyCode: [{ required: true, message: "请输入" }],
            }

        }
    },

    methods: {
        handleLogin() {

        },
        refresh() {
        axios
          .get("/api/admin/base/open/captcha")
          .then((response) => {
            // console.log("response", response);
            const { data } = response;
            // 判断业务状态码
            if (data.code !== 1000) {
              return alert(data.message);
            }
            // 将 data.data.data => this.svg
            this.svg = data.data.data;

            // console.log("this.svg", this.svg);
          })
          .catch((error) => {
            console.log("error", error);
          });
    },
    },

    created(){
        this.refresh()
    }


}

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
    &__input {
        width: 70px;
    }
    &__cap{
        width: 140px;
        height: 40px;
        background: #ccc;
    }
}

</style>