import {RouteRecordRaw} from "vue-router";



export const routers: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/main/home',
        meta: {requireAuth: true}
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/login/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        redirect: '/main/home',
        component: () => import('../components/layout/baseLayout.vue'),
        meta: {requireAuth: true},
        children:[
            {
                path:'/main/home',
                name: 'home',
                component: () => import('../pages/home/main/home.vue'),
                meta: {requireAuth: true}
            }
        ]
    }
]