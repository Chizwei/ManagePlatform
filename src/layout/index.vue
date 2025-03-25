<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbal">
        <!-- 菜单组件 -->
        <el-menu background-color="#001529" text-color="white">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
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
import useUserStore from '../store/modules/user';
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'


// 获取用户相关小仓库
let userStore = useUserStore()



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
    .el-menu{
      border:none;
    }
  }
}

</style>