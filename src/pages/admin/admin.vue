<template>
  <div class="admin-page">
    <div class="page-top">
      <h2 class="page-title">管理员信息管理</h2>
      <div class="operate-btns">
        <el-button type="primary" @click="callAddAdminModal">添加管理员</el-button>
      </div>
    </div>
    <el-table class="admin-table" :data="tableData" border>
      <el-table-column prop="account" label="账号名"/>
      <el-table-column prop="date" label="创建时间"/>
      <el-table-column fixed="right" label="操作" width="auto">
        <template slot-scope="scope">
          <el-button @click="callEditAdmin" size="mini">编辑</el-button>
          <el-button @click="deleteAdmin" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="add-admin-dialog"
      :visible="dialogVisible"
      @close="closeDialog"
    >
      <template>
        <el-form label-position="right" label-width="80px" :model="createForm">
          <el-form-item label="账号名">
            <el-input v-model="createForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="createForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="createForm.check"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <span slot="title">添加管理员</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doAddAdmin">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "admin-page",
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        account: 'Fuqian Liu',
        date: '2016-05-02',
      }, {
        account: 'Yihong Wang',
        date: '2016-05-02',
      }, {
        account: 'Dongdong Zhao',
        date: '2016-05-02',
      }],
      createForm: {
        account: "",
        password: "",
        check: ""
      }
    }
  },
  methods: {
    callAddAdminModal() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    async doAddAdmin() {

    },
    callEditAdmin() {

    },
    async deleteAdmin() {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO api
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "./admin.less";
</style>