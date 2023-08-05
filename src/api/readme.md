## 包装剥离一些高频接口调用方法
>借助自主封装的axio文件，包装接口调用方法

```js
// login.vue
login().then(() => {});
```

```js
// src/api/user.js
export function login() {
  return request.post();
}