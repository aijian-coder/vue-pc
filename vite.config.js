import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  /**
   * 解析配置项
   */
  resolve: {
    /**
     * 路径别名
     */
    alias: {
      // "@": path.resolve(__dirname, "./src"),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8001/",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },

})
