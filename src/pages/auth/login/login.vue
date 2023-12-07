<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import {LoginRefProps} from "./loginRefProps.ts";
import loginRequest from "../../../dto/request/auth/loginRequest.ts";
import {FormInstance, FormRules} from "element-plus";
import {reactive} from "vue";
import useAuthStore from "@/piniaStore/auth/auth.ts";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const route = useRouter()
//#region 响应式定义

const loginClosure = reactive<LoginRefProps>(new LoginRefProps())
const loginLoadingRef = reactive({
  loginLoading:false
})
const loginForm = reactive<loginRequest>(new loginRequest())
const ruleLoginFormRef = ref<FormInstance>()
const rulesForm = reactive<FormRules<loginRequest>>({
  userName:[
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 50, message: '用户名长度应为5~50', trigger: 'blur' },
  ],
  passWord:[
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, max: 16, message: '密码长度应为8~16', trigger: 'blur' },
  ]
})

//#endregion

//#region 方法封装
const login = async(formEl: FormInstance | undefined)=>{
  if(!formEl) return
  loginLoadingRef.loginLoading = true
  await formEl.validate(async (valid) => {
    if (valid)
      if (await loginClosure.userLogin(authStore, loginForm))
        await route.push({
          name: 'home'
        })
  })
  loginLoadingRef.loginLoading = false
}
//#endregion

onMounted(async()=>{
  await loginClosure.getKey(authStore)
})

</script>

<template>
    <div class="login-container">
      <div class="login-form">
        <el-card  shadow="always" class="login-card">
          <template #header>
            <el-text style="font-size: 1.5rem;font-weight: bold;color: black;">登录</el-text>
          </template>
          <el-form status-icon ref="ruleLoginFormRef" :rules="rulesForm"  :model="loginForm">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" :prefix-icon="User" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input v-model="loginForm.passWord" type="password" placeholder="请输入密码"/>
            </el-form-item>
          </el-form>
          <el-form-item>
                <el-button type="primary" :loading="loginLoadingRef.loginLoading" @click="async()=>{
                  await login(ruleLoginFormRef)
                }">登录</el-button>
                <el-button type="info">注册</el-button>
          </el-form-item>
        </el-card>
      </div>
    </div>

</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: center;
  background-size: cover;
  background: url("/loginBackground.png") no-repeat fixed;
  align-items: center;
  .login-form{
    display: flex;
    .login-card{
      background: linear-gradient(#fec7cc,#fefafa);
      min-width: 22vw;
      border-radius: 20px;
      text-align: center;
    }
  }

}




</style>