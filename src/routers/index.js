import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/login-form";
import Main from '../views/main/main-form'

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
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
  ];

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

export default router;
