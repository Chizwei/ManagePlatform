<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="updateData"></el-button>
      <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button size="small" icon="Setting" circle></el-button>
      <img :src="userStore.avatar" style="width: 24px;height: 24px;margin:0 10px 0 20px;  border-radius: 50%;">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userStore.username}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useLayOutSettingStore from '../../../store/modules/setting';
import useUserStore from '../../../store/modules/user';

// 获取用户信息
let userStore = useUserStore()


let layoutSettingStore = useLayOutSettingStore()

const updateData = ()=>{
  layoutSettingStore.refesh = !layoutSettingStore.refesh
}


const fullScreen = ()=>{
  // dom对象的一个属性，用于判断是否全屏（全屏：true，否：false）
  // 也有一些插件实现，使用时需要考虑兼容性问题
  let full = document.fullscreenElement
  if(!full){
    // 根据文档根节点方法实现全屏
    document.documentElement.requestFullscreen()
  }else{
    //退出全屏模式
    document.exitFullscreen()
  }
}

let router = useRouter()
let route = useRoute()
// 退出登录
const logout = async ()=>{
  // 1、向服务器发起请求，退出登录接口
  // 2、仓库清空用户相关数据
  await userStore.userLogout()
  // 3、跳转到登录页面
  router.push({path:'/login',query:{redirect:route.path}})
}


</script>

<style scoped>


</style>