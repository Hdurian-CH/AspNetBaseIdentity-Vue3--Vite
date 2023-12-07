import { createRouter, createWebHashHistory, Router} from "vue-router";
import {routers} from "./routers.ts";
import useAuthStore from "../piniaStore/auth/auth.ts";
import {ElMessage} from "element-plus";



const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: routers,
    scrollBehavior(){
        return{
            left: 0,
            top: 0
        }
    }
})



//守护路由
router.beforeEach(async (to:any, _fromL: any, next: any)=>{
    const authStore = useAuthStore()
    //检查token，如果返回了401，那么axios会导航到/login
    if(to.meta.requireAuth){
        if(localStorage.getItem("token")){
            if(await authStore.checkToken()) {
                next()
            }
            else{
                next({name: 'login'})
            }
        }else{
            next({name: 'login'})
        }
    }
    //无需鉴权页面的判断
    else{
            if(localStorage.getItem("token")){
                if(await authStore.checkToken()){
                    next({name: 'home'})
                }
                else{
                    next()
                }
            }
            else{
                next()
            }
    }
})
export default router