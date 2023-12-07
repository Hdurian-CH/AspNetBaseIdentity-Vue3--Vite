<script setup lang="ts">
import {useRouter} from "vue-router";
import setting from "../../setting.ts";

interface menuType{
  title: string,
  index: string,
  icon: string,
  children?: Array<menuType>
}


const router = useRouter()
const removeToken = ()=>{
  localStorage.removeItem("token")
}
const userName = ref<string>(localStorage.getItem("userName")??"用户")
const menuList : Array<menuType> = [
  {
    title: '数据展示',
    index: '/main',
    icon: '',
    children :[
      {
        title: '流量统计',
        index : '/main/home',
        icon: ''
      }
    ]
  }
]


</script>

<template>
  <el-container>
      <el-header height="10vh">
        <el-row>
          <div class="left">
            <el-image src="/logo.png" class="logo" size="1rem" fit="scale-down"/>&#8195;
            <h1 style="display: inline-block;vertical-align: middle;color: white">{{ setting.title }}</h1>
          </div>
          <div class="right">
            <div class="toolbar" style="float: right;align-content: center">
              <el-dropdown>
                  <el-text style="color: #fec7cc;margin-top: 3vh"><el-icon style="padding-right: 1vw"><Setting /></el-icon>{{userName}}</el-text>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="()=>{
                      removeToken()
                      router.push({
                      name:'login'
                      })
                    }">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-row>
      </el-header>
    <el-container>
      <el-aside width="15%" style="min-height: 100vh">
        <el-scrollbar>
          <el-menu
              :default-openeds="[router.currentRoute.value.path.substring(0,router.currentRoute.value.path.lastIndexOf('/'))]"
              :default-active="router.currentRoute.value.path"
              class="el-menu"
              :router="true"
              :unique-opened="true"
              active-text-color="#ffd04b"
              background-color="#545c64"
              text-color="#fff"
              style="min-height: 100vh"
          >
            <el-sub-menu v-for="item in menuList" :index="item.index" :key="item.index">
              <template #title>
                <h3>{{item.title}}</h3>
              </template>
              <el-menu-item v-for="itm in item.children" :index="itm.index" :key="itm.index">
                <h4>{{itm.title}}</h4>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main width="85%" style="padding: 5vw">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>

  </el-container>
</template>

<style lang="scss" scoped>

.el-container{
  height: 100%;
  .el-header{
    position: relative;
    background-color: #545c64;
    width: 100vw;
    .left{
      width: 25%;
      .logo{
        display: inline-block;
        height: 10%;
        vertical-align: middle;
      }
    }
    .right{
      width: 75%;
      height: 100%;
      .toolbar{
        display: inline-flex;
        height: 10%;
      }
    }
  }

}

</style>