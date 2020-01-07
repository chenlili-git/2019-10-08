import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.config.productionTip = false;

console.log('11111')
import Home from "./components/home";
import About from "./components/about";
import Public from "./components/public";

const routes=[
  {
    path:'/',
    component:Home
  },
  {
    path:'/about',
    component:About
  },
  {
    path:'/public',
    component:Public
  }
];

const router=new VueRouter({
  mode:'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
