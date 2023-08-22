const modules = import.meta.glob("./*/index.vue", {
  eager: true,
  import: "default",
});

function toCam(str) {
  // 1. 根据 - 分割
  const arr = str.split("-");
  // 2. 对 arr 中每一项做首字母大写
  return arr.map((item) => item[0].toUpperCase() + item.slice(1)).join("");
}

const components = {
  install(app) {
    // 注册全局组件
    // app.component("AvatarUploader", AvatarUploader);
    // app.component("MenuCheck", MenuCheck);
    // app.component("RoleSelect", RoleSelect);

    for (let key in modules) {
      // console.log(key,modules);
      // 1. 根据 key 获取组件名
      const arr = key.split("/");
      const name = toCam(arr[arr.length - 2]);
      // console.log(name);
      // 2. 注册
      //    PS 注册名字是驼峰，使用时可以是驼峰，也可以是短横线
      //       注册名字是短横线，使用时不可以是驼峰
      app.component(name, modules[key]);
    }
  },
};

export default components;
