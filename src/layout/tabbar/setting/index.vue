<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="updateData"></el-button>
      <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button size="small" icon="Setting" circle></el-button>
      <img src="../../../../public/logo.png" style="width: 24px;height: 24px;margin:0 10px 0 20px;  ">
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '../../../store/modules/setting';


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



</script>

<style scoped>


</style>