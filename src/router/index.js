import VueRouter from "vue-router";
import routes from "./routes";

const router = new VueRouter({
  mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  next();
  return;
  // TODO upon is debug codes, please remove when product release
  if (to.path !== "/login") {
    // 检查登录状态
    if (localStorage.getItem('ContestAdmin-isLogin') !== "true") {
      next({
        path: '/login',
        redirect: true,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;