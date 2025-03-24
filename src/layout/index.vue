<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbal">
        <!-- 菜单组件 -->
         <el-menu background-color="#001529" text-color="white">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <el-sub-menu index="3">
            <template #title>权限管理</template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
          
         </el-menu>

      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout_tabbar">456</div>

    <!-- 内容展示区 -->
    <div class="layout_main">
      <p style="height: 10000px; background: red;"></p>
    </div>

  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'



</script>

<style scoped lang="scss">
.layout_container{
  width: 100%;
  height: 100vh;
  .layout_slider{
    width: variable.$base-menu-width;
    height: 100vh;
    background: variable.$base-menu-background;
  }
  .layout_tabbar{
    position: fixed;
    top: 0;
    left: variable.$base-menu-width;
    width:calc(100% - variable.$base-menu-width);
    height: variable.$base-tabbar-height;
    background: #bd9e9e;
  }
  .layout_main{
    position: absolute;
    width:calc(100% - variable.$base-menu-width);
    height: calc(100vh - variable.$base-tabbar-height);
    background: skyblue;
    left: variable.$base-menu-width;
    top: variable.$base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
  .scrollbal{
    height: calc(100vh - variable.$base-menu-logo-height);
  }
}

</style>