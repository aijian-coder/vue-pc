<template>
  <el-form>
    
    <el-form-item>
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleConfirm" type="primary">
        确认
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "UpsertForm",
  data(){
    return{}
  },
  methods:{
    handleCancel(){
        this.$emit("cancel")
    },
    handleConfirm(){
        this.$emit("success")
    }
  }

};
</script>
