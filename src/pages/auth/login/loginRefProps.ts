import loginRequest from "../../../dto/request/auth/loginRequest.ts";
import {JSEncrypt} from "jsencrypt";

export class LoginRefProps{
     getKey = async(authStore:any):Promise<boolean>=>{
           if(!await authStore.getPublicKey()){
               console.log(authStore.getRsaPublicKey)
               ElMessage.error("error get key")
               return false
           }
           return true
    }
     userLogin = async(authStore:any,loginForm: loginRequest) :Promise<boolean>=>{
         const encryptRsa = new JSEncrypt()
         const publicKey = authStore.getRsaPublicKey
         if(publicKey === ""){
            ElMessage.error("not get key")
            return false
         }
         else {
            encryptRsa.setPublicKey(publicKey)
            const encryptedPassword = encryptRsa.encrypt(loginForm.passWord) || ''
            if(await authStore.login(new loginRequest(loginForm.userName, encryptedPassword))){
                ElMessage.success("login success")
                return true
            }
            else{
                return false
            }
         }
    }
}