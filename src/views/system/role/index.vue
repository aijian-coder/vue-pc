<template>
  <div class="page">
    <div class="page__body">
      <!-- 也分上下两部分，上面有一些按钮，一些其他的操作 -->
      <div class="toolbar">
        <!-- 分左右 -->
        <div class="toolbar-left">
          <el-button type="info" @click="refresh()">刷新</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
          <el-button
            type="danger"
            @click="handleDelete(checkedIds)"
            :disabled="checkedIds.length <= 0"
            >删除</el-button
          >
        </div>
        <div class="toolbar-right">
          <el-input class="w-50 m-2" placeholder="搜索关键字" />
          <el-button type="primary" class="search">搜索</el-button>
        </div>
      </div>

      <!-- 要渲染出来的表格 -->
      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
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
              <el-button size="small" @click="handleEdit">编辑</el-button>
              <!-- 此处点删除可以做一个漂亮的提示 -->
              <el-popconfirm
                title="你确认要删除吗？"
                @confirm="handleDelete(row.id)"
              >
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 弹窗 -->
      <el-dialog v-model="dialog.visible" :title="dialog.title" width="30%" destroy-on-close>
        <UpsertForm @cancel="dialog.visible=false" @success="handleSucc"/>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, delRole } from "@/api/role";
import { ElMessage } from "element-plus";
import UpsertForm from "./components/update_form.vue"

export default {
  name: "RoleList",
  components:{
    UpsertForm  
  },
  data() {
    return {
      // 数据请求中
      loading: false,
      tableData: [],
      checkedIds: [],
      dialog: {
        visible: true,
        title: "新增",
      },
    };
  },
  methods: {
    /**
     * 获取数据，并用新数据调用接口
     */
    refresh() {
      this.loading = true;
      getRoleList()
        .then((data) => {
          this.tableData = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * 新增数据
     */
    handleAdd() {
      //弹窗新增。此处方法剥离到弹窗里面
      this.dialog.visible = true;
      this.dialog.title = "新增";
    },
    /**
     * 编辑
     */
    handleEdit() {
      //弹窗新增。此处方法剥离到弹窗里面
      this.dialog.visible = true;
      this.dialog.title = "编辑";
    },

    /**
     * 删除
     */
    handleDelete(checkedId) {
      console.log(checkedId);
      //有可能是多选的删除，也有可能是单个的，此处调用接口，传递的是一个id的数组
      delRole({ ids: Array.isArray(checkedId) ? checkedId : [checkedId] }).then(
        () => {
          this.refresh(), ElMessage.success("删除成功");
        }
      );
    },

    /**
     * handleSelectionChange
     */
    handleSelectionChange(rows) {
      //是Element+给选框提供的APi方法
      //会传递一个rows，表示一行的数据
      //rows是一个数组，表示选择的一整行全部的数据
      // console.log(rows);
      this.checkedIds = rows.map((item) => item.id);
    },

    /**
     * 弹窗成功
     */
     handleSucc(){
      this.dialog.visible=false
     }
  },
  created() {
    this.refresh();
  },
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
