<template>
  <el-upload
    class="avatar-uploader"
    accept=".png,.jpg,.jpeg"
    :show-file-list="false"
    :http-request="onHttpRequest"
  >
    <div v-if="modelValue" class="avatar">
      <img :src="modelValue" alt="" />
      <div class="handle" @click.stop="handleDelete">
        <el-icon class="icon-delete">
          <Delete />
        </el-icon>
      </div>
    </div>

    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script>
import request from "@/utils/request";
import { ElMessage } from "element-plus";
export default {
  name: "avatar-uploader",
  props: {
    // 自定义两个prop，用来做数据的双向绑定
    modelValue: {
      type: String,
      required: true,
    },

    // 文件大小限制，2M
    //  M => KB => b
    limit: {
      type: Number,
      default() {
        return 2 * 1024 * 1024;
      },
    },

    // 文件类型限制
    accept: {
      type: Array,
      default() {
        return ["image/jpeg", "image/jpg", "image/png"];
      },
    },
  },
  emits: ["update:modelValue"],
  methods: {
    handleDelete() {
      this.$emit("update:modelValue", "");
    },
    fileCheck(size, type) {
      if (size > this.limit || !this.accept.includes(type)) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求
     * 传入的自定义回调onHttpRequest，处理上传行为
     * @param {Object} options 请求相关的配置项
     */
    onHttpRequest(options) {
      // console.log(options);
      //1.先验证传入的文件类型
      if (!this.fileCheck(options.file.size, options.file.type)) {
        ElMessage.error("文件大小或类型有误");
      }
      const file = options.file;
      //验证通过
      //2.准备上传、
      request.post(
        "/app/base/comm/upload",
        {
          file,
        },
        {
          headers: {
            // 文件上传：需匹配此格式数据，form-data类型的数据
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((data)=>{
        console.log(data);
        // 触发自定义事件，准备回显
        this.$emit("update:modelValue", data);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  .avatar {
    position: relative;
    width: 120px;
    height: 120px;
    display: block;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .handle {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: default;
    }

    .icon-delete {
      font-size: 28px;
      color: #fff;
      cursor: pointer;
    }

    &:hover {
      .handle {
        display: flex;
      }
    }
  }
}

.avatar-uploader ::v-deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader ::v-deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>
