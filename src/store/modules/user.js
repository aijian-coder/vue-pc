import store2 from "store2";
import {login,getUserInfo,logout} from "@/api/user"
import router from "@/router";

export default {
    namespaced: true,
    state: {
        token:store2.get("token")||"",//用户令牌
        info: store2.get("info"), // 用户信息
      
    },
    mutations: {
        setToken(state, payload){
            state.token=payload;
            store2.set("token",payload)
        },
        setInfo(state, payload){
            state.info=payload
            ; store2.set("info",payload)
        }
    },
    actions:{
        // 准备登录动作，并且在仓库中存取token
        async login({commit},payload){
            const res=await login(payload);
            commit("setToken", res.token);
            return res
        },
       /**
        * 登出
        */
       async logout({commit},payload){
       await logout();

       // 清理数据
    
      store2.clearAll();
      // 跳转路由
      router.replace("/login");
      
    },

        /**
         * 获取个人信息
         */
        async getPerson({commit},payload){
            const res=await getUserInfo(payload);
            commit("setInfo", res.info);
            return res
        }
    }
  };
  