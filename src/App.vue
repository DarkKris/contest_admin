<template>
  <div id="__root">
    <side-menu></side-menu>
    <div>
      <account-bar/>
      <keep-alive>
        <router-view/>
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
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import "./App.less";
</style>