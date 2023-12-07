import { defineStore } from "pinia";
import {APIGetRequest, APIPostRequest} from "../../HttpConfig/axios/axiosRequest.ts";
import {CheckTokenResponse} from "../../dto/response/auth/checkTokenResponse.ts";
import {RsaKeyResponse} from "../../dto/response/auth/rsaKeyResponse.ts";
import loginRequest from "../../dto/request/auth/loginRequest.ts";
import {LoginResponse} from "../../dto/response/auth/loginResponse.ts";
import {ElMessage} from "element-plus";


const useAuthStore = defineStore("authStore",{
    state: ()=>{
        return{
            rsaPublicKey: "",
            userName: ""
        }
    },
    actions:{
        async checkToken():Promise<boolean>{
            try{
                let result:CheckTokenResponse = await APIPostRequest('/Auth/CheckToken',{});
                localStorage.setItem("token",result.token)
                return true
            }catch (e) {
               return false
            }
        },
        async getPublicKey():Promise<boolean>{
            try{
                let result: RsaKeyResponse = await APIGetRequest('/Auth/GetPublicKey')
                this.rsaPublicKey = result.publicKey
                return true
            }catch (e) {
                ElMessage.error('error')
                return false
            }
        },
        async login(form: loginRequest):Promise<boolean>{
            try{
                let result: LoginResponse = await APIPostRequest('/Auth/Login',form)
                localStorage.setItem("token",result.token)
                localStorage.setItem("userName",form.userName)
                this.userName = form.userName
                return true
            }catch (e) {
                return false
            }
        }
    },
    getters: {
        getRsaPublicKey: state => {
            return state.rsaPublicKey
        },
        getUserName: state => {
            return state.userName
        }
    }
})

export default useAuthStore