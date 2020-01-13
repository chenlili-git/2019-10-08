import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:'/vuex_1',
    children:[
      {
        path:'vuex_1',//=>/about/b/1,
        name:'vuex_1',
        component:()=>import('../views/params/vuex_1.vue'),
      }    
    ] 
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log('只要切换路由就触发');
  next();
})
export default router
