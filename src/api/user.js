import request from "utils/request"
/**
 * 登入
 * /admin/base/open/login
 * post
 * @returns 
 */
export function login(data) {
    return request.post("/admin/base/open/login", data);
  }

/**
 * /admin/base/comm/logout
 * 登出API方法
 * post
 */
export function logout() {
    return request.post("/admin/base/comm/logout");
  }


/**
 * 获取用户信息API方法
 * /admin/base/comm/person
 * @returns 
 * Authorization:Token
 */
export function getUserInfo() {
    return request.get("/admin/base/comm/person");
  }