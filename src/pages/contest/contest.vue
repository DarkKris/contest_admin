<template>
  <div class="contest-page">
    <div class="page-top">
      <h2 class="page-title">比赛管理</h2>
      <div class="operate-btns">
        <el-button type="primary" @click="callAddContest">添加比赛</el-button>
      </div>
    </div>
    <el-table class="contest-table" :data="tableData" border>
      <el-table-column prop="date" label="创建时间" width="160"/>
      <el-table-column prop="name" label="比赛名称" width="300"/>
      <el-table-column prop="files" label="比赛文件"/>
      <el-table-column fixed="right" label="操作" width="77">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteContest" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
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
      <span slot="title">添加比赛</span>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doCreateContest">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "contest-page",
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        date: "2021-05-12 16:42:05",
        name: "2021年第二届武汉理工大学ACM-ICPC校赛",
        files: "http://deanti.wang/Article?id=21"
      }],
      createForm: {

      }
    }
  },
  methods: {
    callAddContest() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    async doCreateContest() {
      
    },
    async deleteContest() {
      this.$confirm('确认删除该比赛吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO api
        this.$message({
          type: 'success',
          message: '删除比赛成功!'
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
@import "./contest.less";
</style>