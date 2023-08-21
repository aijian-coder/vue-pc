import request from "@/utils/request";

/**
 * /admin/base/sys/menu/list
 * 获取菜单列表
 */
export function getMenuList() {
    return request.post("/admin/base/sys/menu/list");
  }