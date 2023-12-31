/**
 * 该文件，用于封装 axios
 */

import axios from "axios";
import store2 from "store2";
import { ElMessage } from "element-plus";
import store from "@/store";

// 创建一个 axios 的实例，并配置一些默认的参数
const instance = axios.create({
  // 设置一些默认配置项

  /**
   * 基准地址
   *    request.get('/api')       => http://127.0.0.1:5173/api
   *    request.get('/abcd')      => http://127.0.0.1:5173/abcd
   *    request.get('https://hello.com/api')    => https://hello.com/api
   *
   * TODO: 后续处理本地开发与生产上线的环境变量
   */
  //基准地址
  baseURL: "/api",

  /**
   * 超时时间，单位是 毫秒
   */
  timeout: 300,

  /**
   * 自定义请求头
   */
  headers: {
    hello: "aijc",
  },
});

/**
 * 可以给自定义的 axios 实例添加拦截器。
 * const instance = axios.create();
 * instance.interceptors.request.use(function () { .... });
 */
/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  /**
   * 成功的回调
   *    1. config 是请求的配置对象
   *    2. 必须返回该 config
   * 应用场景：
   *      1. 统一携带 token 到请求头中。
   */
  (config) => {
    //借助store插件，拿到token，调接口的时候压迫默认在请求头里面携带Authorization:"token"
    const token = store2.get("token");
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  /**
   * 失败的回调
   *    1. error 是请求失败的原因
   *    2. 必须返回 Promise.reject(error)
   *    触发时机：
   *        TODO
   */
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  /**
   * 成功的回调
   *    1. response 是 axios 的包装对象
   *    2. 必须要返回数据，返回的数据是 .then 的回调函数的参数'
   *
   *    触发时机：
   *      1. 接口请求成功，也就是 HTTP 状态码要为 2xx 或 304
   *      2. 会在业务代码的 .then 之前触发
   */
  (response) => {
    // 1. 解构 data
    const { data } = response;
    // 2. 判断业务状态码
    if (data.code === 1000) {
      // 业务成功，直接返回 data.data
      // ElMessage.success(data.message);
      return data.data;
    } else {
      // 业务失败，抛出错误，消息提示
      //Element—plus弹窗ElMessage
      ElMessage.error(data.message);
      return Promise.reject(response);
    }
  },
  /**
   * 失败的回调
   *    1. error 是失败的原因
   *    2. 必须要返回 Promise.reject(error)
   *    触发时机：
   *      1. HTTP 状态码 为 非 2xx 或 304
   */
  (error) => {
    // 根据 HTTP 状态码来处理不同的业务逻辑
    // console.log("error", error);
    //    1. 获取到 HTTP 状态码
    const { status } = error.response;
    //    2. 获取中文的错误描述
    const { message } = error.response.data;
    //    3. switch
    switch (status) {
      case 401:
        // 没有权限
        ElMessage.error(message);
         // 退出登录，重新进入登录页面 ，传递一个false
         store.dispatch("user/logout", false);
        break;
      case 502:
        // 没有权限
        ElMessage.error("网关错误");
        break;
      case 503:
        // 没有权限
        ElMessage.error("服务器异常，请稍后重试");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

// end 将 实例给暴露出去
export default instance;
