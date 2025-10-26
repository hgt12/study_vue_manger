import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Menu from "@/views/sys/Menu.vue";
import Role from "@/views/sys/Role.vue";
import User from "@/views/sys/User.vue";
import axios from 'axios';
import store from '../store';
import menu from "@/store/modules/menu";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/index',
        name:'Index',
        component:Index
      },
      // {
      //   path:'sys/menus',
      //   name:'SysMenu',
      //   component:Menu
      // },
      // {
      //   path:'sys/roles',
      //   name:'SysRole',
      //   component:Role
      // },
      // {
      //   path:'sys/users',
      //   name:'SysUser',
      //   component:User
      // },
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
router.beforeEach((to, from, next) => {
  let hasRoute = store.state.menu.hasRoute
  let token = localStorage.getItem("token")

  if (to.path == '/login') {
    next()
  }else if (!token) {
    next({path:'/login'})
  }else
  if (token &&!hasRoute)
  {
    axios.get("/sys/menu/nav",{
      headers:{
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log("路由中响应了的数据: ",res.data.data.nav)
      store.commit("setMenuList", res.data.data.nav)
      store.commit("setPermList", res.data.data.authoritys)
      console.log("是否set到store中 :", store.state.menu.menuList)
      let newRouters = router.options.routes
      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            //1.转换路由
            let route = menuToRouter(e)
            //2.将路由添加到路由管理中
            if (route) {
              newRouters[0].children.push(route)
            }
          })
        }
        //console.log("newRouters：", newRouters)
        router.addRoutes(newRouters)

        hasRoute = true
        store.commit("changeRouteState", hasRoute)
      })
    })
  }
  next()
})
const menuToRouter = (menu) => {
  if (!menu.component) {
    return null
  }

  let route = {
    name:menu.name,
    path:menu.path,
    meta:{
      icon:menu.icon,
      title:menu.title
    }
  }
  route.component = () => import('../views/'+menu.component+'.vue')
  return route
}

export default router
