<template>
  <el-menu default-active="1" class="side-menu"> 
    <el-menu-item index="1" @click="goLink" data-link="/admin">
      <i class="el-icon-user-solid"></i>
      <span slot="title">管理员信息</span>
    </el-menu-item>
    <el-menu-item index="2" @click="goLink" data-link="/report">
      <i class="el-icon-phone"></i>
      <span slot="title">举报管理</span>
    </el-menu-item>
    <el-menu-item index="3" @click="goLink" data-link="/teacher">
      <i class="el-icon-user"></i>
      <span slot="title">教师认证</span>
    </el-menu-item>
    <el-menu-item index="4" @click="goLink" data-link="/contest">
      <i class="el-icon-menu"></i>
      <span slot="title">比赛管理</span>
    </el-menu-item>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-document-copy"></i>
        <span>日志导出</span>
      </template>
      <el-menu-item index="5-1" @click="exportLog">
        <i class="el-icon-document"></i>
        <span>第一项日志</span>
      </el-menu-item>
      <el-menu-item index="5-2" @click="exportLog">
        <i class="el-icon-document"></i>
        <span>第二项日志</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
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
    exportLog(vnode) {
      console.log("🚀 exportLog", vnode.$el);
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
@import "./side-menu.less";
</style>