import request from "utils/request";
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

/**
 * 获取用户列表
 * @returns
 */
export function getUserList() {
  return request.post("/admin/base/sys/user/list");
}

/**
 * /admin/base/sys/user/page
 * 获取用户列表分页
 * @returns
 */
export function getUserPage() {
  return request.post("/admin/base/sys/user/page");
}

/**
 * 用户修改
 */
export function updUser(data) {
  return request.post("/admin/base/sys/user/update", data);
}


/**
 * 用户删除
 */
export function delUser(data) {
  return request.post("/admin/base/sys/user/delete", data);
}


/**
 * 用户新增
 */
export function addUser(data) {
  return request.post("/admin/base/sys/user/add", data);
}
