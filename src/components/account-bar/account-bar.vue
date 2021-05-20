<template>
  <div class="account-bar">
    <template v-if="!isLogin">
      <a href="#" @click="doLogin">未登录</a>
    </template>
    <template v-else>
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
    async doLogin() {

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