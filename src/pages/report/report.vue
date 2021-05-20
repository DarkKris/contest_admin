<template>
  <div class="report-page">
    <div class="page-top">
      <h2 class="page-title">举报信息管理</h2>
    </div>
    <el-table class="report-table" :data="tableData" border>
      <el-table-column prop="date" label="举报时间" width="100"/>
      <el-table-column prop="link" label="举报文章">
        <template slot-scope="scope">
          <el-link type="info" :href="scope.row.link">{{ scope.row.link }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="处理状态" width="80"/>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goLink(scope.row.link)">查看举报链接</el-button>
          <el-button type="danger" @click="deleteArticle" size="mini">删除举报文章</el-button>
          <el-button type="primary" @click="confirmReport" size="mini">确认已处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "report-page",
  data() {
    return {
      tableData: [{
        date: "2021-05-12",
        link: "http://deanti.wang/Article?id=9",
        state: "未处理",
      }, {
        date: "2021-05-18",
        link: "http://deanti.wang/Article?id=9",
        state: "未处理",
      }, {
        date: "2021-05-16",
        link: "http://deanti.wang/Article?id=9",
        state: "未处理",
      }]
    }
  },
  methods: {
    goLink(link) {
      window.open(link);
    },
    async deleteArticle() {
      this.$confirm('此操作将永久删除该举报文章, 是否继续?', '提示', {
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
    },
    async confirmReport() {
      this.$confirm('确认已处理举报吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // TODO api
        this.$message({
          type: 'success',
          message: '确认处理成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认'
        });          
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "./report.less";
</style>