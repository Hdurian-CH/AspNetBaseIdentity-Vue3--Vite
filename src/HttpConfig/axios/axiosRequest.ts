import {ErrorResponse} from "./errorResponse.ts";
import axios, {AxiosInstance} from "axios";

//后端返回的所有错误均是状态码400，并且axios拦截器中会自动给与通知
export const APIPostRequest = async (url: string, postData: any):Promise<any>=> {
    try {
        let axiosExample = getAxiosExample()
        return await axiosExample.post(url, postData)
    } catch (error) {
        return Promise.reject("error")
    }
}

export const APIGetRequest = async (url: string):Promise<any>=>{
    try{
        let axiosExample = getAxiosExample()
        return await axiosExample.get(url);
    }catch (error) {
        return Promise.reject("error")
    }
}

const getAxiosExample = ():AxiosInstance=>{
    let token = localStorage.getItem("token")?.replace(/["']/g, '');
    let baseHeader = "Bearer "
    let authHeader = baseHeader + token
    let axiosExample = axios.create({
        baseURL: '/api',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json charset=utf-8',
            Authorization : authHeader
        }
    })

    axiosExample.interceptors.request.use(
        config =>{
            return config
        },
        error =>{
            ElMessage.error("请求失败")
            return Promise.reject(error)
        }
    )

    axiosExample.interceptors.response.use(
        response =>{
            return response.data
        },
        async(error) =>{
            if(error.response.status === 401){
                return Promise.reject()
            }
            else{
                let data = error.response.data as ErrorResponse
                for (const key in data.errors) {
                    if (data.errors.hasOwnProperty(key)) {
                        const errorMessages = data.errors[key];
                        errorMessages.forEach((errorMessage:any) => {
                            ElMessage.error(errorMessage)
                        })
                    }
                }
                return Promise.reject()
            }

        }
    )
    return axiosExample
}