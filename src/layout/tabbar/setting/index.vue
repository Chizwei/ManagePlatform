<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle @click="updateData"></el-button>
      <el-button size="small" icon="FullScreen" circle></el-button>
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


</script>

<style scoped>


</style>