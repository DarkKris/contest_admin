<template>
  <div id="__root">
    <side-menu></side-menu>
    <div id="__right-content">
      <account-bar/>
      <keep-alive>
        <router-view id="__content-box"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import AccountBar from "components/account-bar/account-bar";
import SideMenu from "components/side-menu/side-menu";

export default {
  components: { SideMenu, AccountBar },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch("initUserInfo");
  },
  methods: {

  }
}
</script>

<style lang="less">
@import "./App.less";
</style>