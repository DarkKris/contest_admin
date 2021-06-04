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
      <el-table-column fixed="right" label="操作" width="245">
        <template slot-scope="scope">
          <el-button size=mini @click="getFiles(scope.row.uid)">获取附件</el-button>
          <el-button type="danger" @click="rejectTeacher(scope.row.uid)" size="mini">拒绝</el-button>
          <el-button type="primary" @click="confirmTeacher(scope.row.uid)" size="mini">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-bottom">
      <el-pagination layout="prev, pager, next"
        :total="countTotal"
        :page-size="10"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { getAllTeacher, getTeacherFile, hanldeTeacherApply } from "api/teacher";

export default {
  name: "teacher-page",
  data() {
    return {
      tableData: [{
        date: "2021-05-12 16:42:05",
        account: "Yihong Wang",
        file: "http://deanti.wang/Article?id=21"
      }],
      countTotal: 0,
    }
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    pageChange(page) {
      this.getTeacherList(page);
    },
    async getTeacherList(page = 1) {
      const token = this.$store.state.userInfo.token;
      const resp = await getAllTeacher(page, token);

      if (resp.success) {
        const data = resp.data;
        this.tableData = [...data.applications];
        this.countTotal = data.total_count;
      } else {
        this.$message({
          type: "error",
          message: "获取申请列表失败，" + resp.err_msg
        });
      }
    },
    async getFiles(uid) {
      const token = this.$store.state.userInfo.token;
      const resp = await getTeacherFile(uid, token);

      this.downloadFile(await resp.blob, resp.filename);
    },
    downloadFile(data, filename) {
      let a = document.createElement('a');
      let url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    async handleApply(uid, isAgree) {
      const token = this.$store.state.userInfo.token;
      const resp = await hanldeTeacherApply(uid, isAgree, token);

      if (resp.success) {
        this.tableData = [...this.tableData.filter(val => val.uid !== uid)];
        this.$message({
          type: 'success',
          message: `${isAgree ? '通过' : '拒绝'}申请成功!`
        });
      } else {
        this.$message({
          type: 'success',
          message: `${isAgree ? '通过' : '拒绝'}申请失败，${resp.err_msg}}`
        });
      }
    },
    rejectTeacher(id) {
      this.$confirm('确认拒绝该申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleApply(id, false);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    confirmTeacher(id) {
      this.$confirm('确认通过该申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleApply(id, true);
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