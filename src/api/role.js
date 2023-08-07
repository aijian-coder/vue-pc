import request from "@/utils/request";


/**
 * /admin/base/sys/role/list 列表
 * /admin/base/sys/role/page 分页
 * /admin/base/sys/role/add  添加
 * /admin/base/sys/role/update 编辑
 * /admin/base/sys/role/delete 删除
 */
/**
 * 获取角色列表
 */
export function getRoleList() {
  return request.post("/admin/base/sys/role/list");
}

/**
 * 获取角色列表-分页
 */
export function getRolePage() {
  return request.post("/admin/base/sys/role/page");
}

/**
 * 角色新增
 */
export function addRole(data) {
  return request.post("/admin/base/sys/role/add", data);
}

/**
 * 角色删除
 */
export function delRole(data) {
  return request.post("/admin/base/sys/role/delete", data);
}

/**
 * 角色更新
 */
export function updRole(data) {
  return request.post("/admin/base/sys/role/update", data);
}
