import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/login-form";

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Login
    },
  ];

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

export default router;
