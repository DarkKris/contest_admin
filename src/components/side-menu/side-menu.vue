<template>
  <div class="side-menu">
    <div class="system-logo">比赛管理系统后台</div>
    <el-menu :default-active="$route.path" router>
      <el-menu-item index="/admin">
        <i class="el-icon-user-solid"></i>
        <span slot="title">管理员信息</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <i class="el-icon-phone"></i>
        <span slot="title">举报管理</span>
      </el-menu-item>
      <el-menu-item index="/teacher">
        <i class="el-icon-user"></i>
        <span slot="title">教师认证</span>
      </el-menu-item>
      <el-menu-item index="/contest">
        <i class="el-icon-menu"></i>
        <span slot="title">文件比赛管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>日志导出</span>
        </template>
        <el-menu-item index="" @click.stop.native="exportLog('server')">
          <i class="el-icon-document"></i>
          <span>服务器日志</span>
        </el-menu-item>
        <el-menu-item index="" @click="exportLog('error')">
          <i class="el-icon-document"></i>
          <span>错误日志</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getServerLog, getErrorLog } from "api/log";
export default {
  name: "side-menu",
  data() {
    return {}
  },
  methods: {
    goLink(vnode) {
      const { link } = vnode.$el.dataset;
      console.log(link, this.$route.path.includes(link));
      if (link && !this.$route.path.includes(link)) {
        this.$router.push(link);
      }
    },
    exportLog(type) {
      console.log("🚀 exportLog %s", type);
      switch (type) {
        case "server":
          this.getLog();
          break;
        case "erorr":
          this.getErrors();
          break;
        default:
      }
    },
    async getLog() {
      const token = this.$store.state.userInfo.token;
      const resp = await getServerLog(token);

      if (!resp.success) {
        this.$message({
          type: 'error',
          message: "获取服务器日志失败，" + resp.err_msg
        });
      }
    },
    async getErrors() {
      const token = this.$store.state.userInfo.token;
      const resp = await getErrorLog(token);

      if (!resp.success) {
        this.$message({
          type: 'error',
          message: "获取错误日志失败，" + resp.err_msg
        });
      } 
    }
  },
}
</script>

<style lang="less" scoped>
@import "./side-menu.less";
</style>