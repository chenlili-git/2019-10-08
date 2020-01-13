import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path:'b/:id',//=>/about/b/1,
        name:'bb',
        component:()=>import('../views/params/b.vue'),
        // beforeEnter(){
        //   //加在路由上
        //   console.log('组件进入的时候触发');

        // },
       props:true
      },
      {
        path:'a/:id',//=>/about/b/1,
        name:'aa',
        component:()=>import('../views/params/a.vue'),
        // beforeEnter(){
        //   //加在路由上
        //   console.log('组件进入的时候触发');

        // },
       props:true
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
