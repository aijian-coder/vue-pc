//创建仓库
import {createStore} from "vuex";
import user from "./modules/user"
import app from "./modules/app"
const store=createStore({
    //注册组件
    modules:{
        user,
        app
    }

});
export default store;