import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login-form";
import Main from "../views/main/main-form";
import Production from "../views/production/production-form";
import { getItem, removeItem } from "../utils/storage";
import { MessageBox } from "element-ui";
Vue.use(VueRouter);

const routes = [
  {
    path: "/", //首次访问的页面重定向到登录页面
    redirect: "/Login",
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Main",
    name: "Main",
    component: Main,
    redirect: "/Main/Home", //登录成功过后刷新重定向到首页
    children: [
      {
        path: "/Main/Home",
        name: "Home",
        component: () => import("../views/home/home-form"),
      },
      {
        path: "/Main/ProductionOrder",
        name: "ProductionOrder",
        component: Production,
      },
    ],
  },
  {
    path: "/:catchAll(.*)", //路由不存在访问的页面
    name: "NotFound",
    component: () => import("../views/view-404"),
  },
  {
    path: "/Unauthorized", //没有权限访问的页面
    name: "Unauthorized",
    component: () => import("../views/view-401"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//防止重定向循环调用
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  const token = getItem("token");
  if (to.path === "/Login") {
    next();
  } else {
    if (!token) {
      next("/Login");
    } else {
      //token有值 判断token是否过期
      const jwt = require("jsonwebtoken");
      const decodedToken = jwt.decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
          MessageBox.alert("授权已过期，请重新登录！").then(() => {
          removeItem("token");
          next("/Login");
        });
      } else {
        next();
      }
    }
  }
});

export default router;
