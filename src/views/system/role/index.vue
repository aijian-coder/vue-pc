<template>
  <div class="page">
    <!-- 也分上下两部分，上面有一些按钮，一些其他的操作 -->
    <div class="toolbar">
      <!-- 分左右 -->
      <div class="toolbar-left">
        <el-button type="info">刷新</el-button>
        <el-button type="primary">新增</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <div class="toolbar-right">
        <el-input
          class="w-50 m-2"
          placeholder="搜索关键字"
          :prefix-icon="Search"
        />
        <el-button type="primary" class="search">搜索</el-button>
      </div>
    </div>

    <!-- 要渲染出来的表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="label" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button>编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getRoleList, delRole } from "@/api/role";
import { ElMessage } from "element-plus";

export default {
  name:"role",
  data(){
    return{
      tableData:[],
      checkedIds:[],
    }
  },
  methods:{
      /**
     * 获取数据
     */
    refresh(){
      //此处要调接口
      getRoleList().then(data=>{
        console.log(data);
        this.tableData = data;
      })
    },
  },
  created(){
    this.refresh()
  }

};
</script>

<style lang="scss" scoped>
.page {
  background: rgb(174, 218, 237);
  height: 100%;
}
.toolbar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-right {
    display: flex;
    align-items: center;
    height: 40px;
    .search {
      margin-left: 10px;
    }
  }
}
</style>
