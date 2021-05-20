<template>
  <div class="report-page">
    <div class="page-top">
      <h2 class="page-title">举报信息管理</h2>
    </div>
    <el-table class="report-table" :data="tableData" border>
      <el-table-column prop="create_time" label="举报时间" width="100"/>
      <el-table-column label="举报文章">
        <template slot-scope="scope">
          <el-link type="info" :href="scope.row.article_id">{{ scope.row.article_id }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.is_handled ? "已处理" : "未处理" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="330">
        <template slot-scope="scope">
          <el-button size="mini" @click="goLink(scope.row.link)">查看详情</el-button>
          <el-button type="danger" @click="deleteArticle" size="mini">删除举报文章</el-button>
          <el-button type="primary" @click="confirmReport(scope.row.id, scope.row)" size="mini">确认已处理</el-button>
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
import { getAllReports, setReportComplete } from "api/report";
export default {
  name: "report-page",
  data() {
    return {
      tableData: [{
        id: "",
        reporter_uid: "",
        article_id: "",
        reason: "",
        is_handled: "",
        has_attachment: "",
        create_time: "",
      }],
      countTotal: 0,
    }
  },
  created() {
    this.getReports();
  },
  methods: {
    goLink(link) {
      window.open(link);
    },
    pageChange(page) {
      this.getReports(page);
    },
    async getReports(page = 1) {
      const token = this.$store.state.userInfo.token;
      const resp = await getAllReports(page, token);

      if (resp.success) {
        const data = resp.data;
        this.countTotal = data.total_count;

        this.tableData = [...data.reports];
      } else {
        this.$message({
          type: "error",
          message: "获取举报列表失败，" + resp.err_msg
        });
      }
    },
    deleteArticle() {
      this.$confirm('此操作将永久删除该举报文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
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
    confirmReport(id, rowData) {
      const token = this.$store.state.userInfo.token;
      this.$confirm('确认已处理举报吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const resp = await setReportComplete(id, token);
        if (resp.success) {
          rowData.is_handled = true;
          this.$message({
            type: 'success',
            message: '确认处理成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '确认处理失败，' + resp.err_msg
          });
        }
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