<template>
    <div class="page">
        <el-form class="login-form" ref="form" label-width="100">
            <el-form-item label="Username">
                <el-input v-model="model.username"/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="model.password"/>
            </el-form-item>
            <el-form-item label="VerifyCode" class="captcha">
                <el-input class="captcha__input" v-model="model.verifyCode" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

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

        }
    },

    methods: {
        handleLogin() {

        }
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
}
</style>