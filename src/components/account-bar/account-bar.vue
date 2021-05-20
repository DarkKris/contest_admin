<template>
  <div class="account-bar">
    <template v-if="!isLogin">
      <el-button type="text" @click="callLogin">未登录</el-button>
    </template>
    <template v-else>
      <el-button type="text" @click="doLogut">注销</el-button>
      <span class="account-name">{{ username }}</span>
      <el-avatar>{{ username }}</el-avatar>
    </template>
  </div>
</template>

<script>
export default {
  name: "account-bar",
  data() {
    return {}
  },
  methods: {
    callLogin() {
      if (this.isLogin || this.$route.path.includes("/login")) return;
      this.$router.push("/login");
    },
    doLogout() {
      this.$store.dispatch("changeLoginStatus", false);
    }
  },
  computed: {
    username() {
      const { username } = this.$store.state.userInfo;
      return username;
    },
    isLogin() {
      const { isLogin } = this.$store.state.userInfo;
      return isLogin;
    }
  }
}
</script>

<style lang="less" scoped>
@import "./account-bar";
</style>