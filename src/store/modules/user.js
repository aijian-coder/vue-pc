import store2 from "store2";

export default {
    namespaced: true,
    status: {
        token:"",//用户令牌
        info:null,//用户信息对象
      
    },
    mutations: {
        setToken(state, payload){
            state.token=payload
        },
        setInfo(state, payload){
            state.info=payload
        }
    },
    actions:{
        
    }
  };
  