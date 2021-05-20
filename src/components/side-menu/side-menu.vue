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
        <span slot="title">比赛管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>日志导出</span>
        </template>
        <el-menu-item index="" @click.stop.native="exportLog('one')">
          <i class="el-icon-document"></i>
          <span>第一项日志</span>
        </el-menu-item>
        <el-menu-item index="" @click="exportLog('two')">
          <i class="el-icon-document"></i>
          <span>第二项日志</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
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
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
@import "./side-menu.less";
</style>