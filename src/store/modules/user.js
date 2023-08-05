import store2 from "store2";
import {login} from "@/api/user"

export default {
    namespaced: true,
    state: {
        token:store2.get("token")||"",//用户令牌
        info:null,//用户信息对象
      
    },
    mutations: {
        setToken(state, payload){
            state.token=payload;
            store2.set("token",payload)
        },
        setInfo(state, payload){
            state.info=payload
        }
    },
    actions:{
        // 准备登录动作，并且在仓库中存取token
        async login({commit},payload){
            const res=await login(payload);
            commit("setToken", res.token);
            return res

        }
    }
  };
  