import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.css'
import * as echarts from 'echarts'
import Vuex from 'vuex'
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
