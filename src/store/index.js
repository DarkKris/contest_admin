const LOGIN_KEY = "ContestAdmin-isLogin";
const INFO_KEY = "ContestAdmin-UserInfo";
const TOKEN_KEY = "ContestAdmin-UserToken";

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
      if (state.userInfo.isLogin) {
        localStorage.setItem(LOGIN_KEY, true);
        localStorage.setItem(INFO_KEY, state.userInfo);
        localStorage.setItem(TOKEN_KEY, state.userInfo.token);
      } else {
        localStorage.removeItem(LOGIN_KEY);
        localStorage.removeItem(INFO_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  },
  actions: {
    changeLoginStatus(context, isLogin) {
      context.commit("SET_USER_INFO", { isLogin });
    },
    setUserInfo(context, payload) {
      context.commit("SET_USER_INFO", payload);
    },
    initUserInfo(context) {
      const isLogin = (localStorage.getItem(LOGIN_KEY) == true);
      const userInfo = localStorage.getItem(INFO_KEY);

      if (isLogin && userInfo && userInfo.email && userInfo.token) {
        context.commit("SET_USER_INFO", Object.assign({}, userInfo, {
          isLogin: isLogin
        }));
      } else {
        context.dispatch("changeLoginStatus", false);
      }
    }
  }
}