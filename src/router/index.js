import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Auth from "../views/Auth.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const whiteList = ["/auth"];
const hasToken = Cookies.get("token");

router.beforeEach(async (to, from, next) => {
  if (hasToken) {
    if (to.path === "/auth") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/auth?redirect=${to.path}`);
    }
  }
});

export default router;
