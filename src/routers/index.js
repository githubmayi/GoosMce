import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login-form";
import Main from '../views/main/main-form';
import Production from '../views/production/production-form';

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      redirect: '/Main'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      redirect: '/Main/Home',
      children: [
        {
          path: '/Main/Home',
          name: 'Home',
          component:() => import('../views/home/home-form')
        },
        {
          path: '/Main/ProductionOrder',
          name: 'ProductionOrder',
          component: Production
        }
      ]
    },
    
  ];

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

export default router;
