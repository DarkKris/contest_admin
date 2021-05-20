<template>
  <div class="teacher-page">
    <div class="page-top">
      <h2 class="page-title">教师认证管理</h2>
    </div>
    <el-table class="teacher-table" :data="tableData" border>
      <el-table-column prop="date" label="申请时间" width="160"/>
      <el-table-column prop="account" label="申请人" width="160"/>
      <el-table-column prop="file" label="材料附件">
        <template slot-scope="scope">
          <el-link :href="scope.row.file">{{ scope.row.file }}</el-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="148">
        <template slot-scope="scope">
          <el-button type="danger" @click="rejectTeacher" size="mini">拒绝</el-button>
          <el-button type="primary" @click="confirmTeacher" size="mini">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "teacher-page",
  data() {
    return {
      tableData: [{
        date: "2021-05-12 16:42:05",
        account: "Yihong Wang",
        file: "http://deanti.wang/Article?id=21"
      }]
    }
  },
  methods: {
    async rejectTeacher() {
      this.$confirm('确认拒绝该申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO api
        this.$message({
          type: 'success',
          message: '拒绝成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    async confirmTeacher() {
      this.$confirm('确认通过该申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO api
        this.$message({
          type: 'success',
          message: '通过申请成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "./teacher.less";
</style>