import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../views/sys/User.vue'
import Role from '../views/sys/Role.vue'
import Menu from '../views/sys/Menu.vue'

import axios from "../axios";
import store from "../store"
import el from "element-ui/src/locale/lang/el";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: "首页"
                },
                component: Index
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                meta: {
                    title: "个人中心"
                },
                component: () => import('@/views/UserCenter.vue')
            }

        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    let hasRoute = store.state.menu.hasRoute

    let token = localStorage.getItem("token")

    if (to.path == '/login') {
        next()

    } else if (!token) {
        next({path: '/login'})


    } else if(token && !hasRoute) {
        // 需要等待异步请求完成，所以不在这里调用 next()
        axios.get("/sys/menu/nav", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {

            console.log(res.data.data)

            // 拿到menuList - 注意：接口返回的是 navs（复数）
            const navs = res.data.data.navs || []
            store.commit("setMenuList", navs)

            // 拿到用户权限
            store.commit("setPermList", res.data.data.authoritys)

            console.log(store.state.menu.menuList)

            // 动态绑定路由
            let newRoutes = router.options.routes

            navs.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {

                        // 转成路由
                        let route = menuToRoute(e)

                        // 把路由添加到路由管理中
                        if (route) {
                            newRoutes[0].children.push(route)
                        }

                    })
                }
            })

            console.log("newRoutes")
            console.log(newRoutes)
            router.addRoutes(newRoutes)

            hasRoute = true
            store.commit("changeRouteState", hasRoute)
            
            // 菜单数据加载完成后再进行路由跳转
            next()
        }).catch(error => {
            console.error('获取菜单数据失败:', error)
            // 如果获取菜单失败，跳转到登录页
            next({path: '/login'})
        })
    } else {
        // 如果已经加载过路由，直接放行
        next()
    }
})


// 导航转成路由
const menuToRoute = (menu) => {

    // 根据接口返回的数据，component 字段为 null，但 icon 字段包含组件路径
    // 例如：icon: "sys/User" 应该对应 component: "sys/User"
    const componentPath = menu.component || menu.icon
    
    if (!componentPath || !menu.path) {
        return null
    }

    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/views/' + componentPath +'.vue')

    return route
}

export default router
