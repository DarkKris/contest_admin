export default {
  state: {
    userInfo: {
      isLogin: false,
      token: "",
      // ... somelse user info
    }
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = Object.assign({}, state.userInfo, payload);
    }
  },
  actions: {
    changeLoginStatus(context, isLogin) {
      context.commit("SET_USER_INFO", { isLogin });
    },
    setUserInfo(context, payload) {
      context.commit("SET_USER_INFO", payload);
    }
  }
}