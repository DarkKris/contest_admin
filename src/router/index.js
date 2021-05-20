import VueRouter from "vue-router";
import routes from "./routes";

const router = new VueRouter({
  mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  return;
  if (!to.meta.visitor) { // 游客不能访问
    // 检查登录状态
    if (localStorage.getItem('isLogin') !== "true") {
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