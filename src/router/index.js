import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Menu from "@/views/sys/Menu.vue";
import Role from "@/views/sys/Role.vue";
import User from "@/views/sys/User.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/index',
        name:'index',
        component:Index
      },
      {
        path:'sys/menus',
        name:'SysMenu',
        component:Menu
      },
      {
        path:'sys/roles',
        name:'SysRole',
        component:Role
      },
      {
        path:'sys/users',
        name:'SysUser',
        component:User
      },
      {
        path:'/userCenter',
        name:'UserCenter',
        component: () => import('@/views/UserCenter.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
