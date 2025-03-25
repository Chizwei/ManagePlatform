<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
     <!-- 标签动态类 -->
    <div class="layout_slider" :class="{fold:layOutSettingStore.fold?true:false}">
      <Logo></Logo>
      <el-scrollbar class="scrollbal">
        <!-- 菜单组件 -->
        <el-menu 
          background-color="#001529" 
          text-color="white"
          :default-active="router.path"
          :collapse="layOutSettingStore.fold"
          :collapse-transition="layOutSettingStore.fold"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{fold:layOutSettingStore.fold?true:false}">
      <Tabbar></Tabbar>
    </div>

    <!-- 内容展示区 -->
    <div class="layout_main" :class="{fold:layOutSettingStore.fold?true:false}">
      <Main></Main>
    </div>

  </div>
</template>

<script setup lang="ts">
import useUserStore from '../store/modules/user';
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue' //右侧内容展示区
import { useRoute } from 'vue-router'; //获取路由对象
import Tabbar from './tabbar/index.vue'
import useLayOutSettingStore from '../store/modules/setting';

let layOutSettingStore = useLayOutSettingStore() //菜单折叠控制器


// 获取用户相关小仓库
let userStore = useUserStore()

const router = useRoute()



// 组件命名
defineOptions({
  name:'Layout'
})

</script>


<style scoped lang="scss">
.layout_container{
  width: 100%;
  height: 100vh;

  .layout_slider{
    width: variable.$base-menu-width;
    height: 100vh;
    background: variable.$base-menu-background;
    transition: all 0.5s;

    .scrollbal{
      height: calc(100vh - variable.$base-menu-logo-height);
      .el-menu{
        border:none;
      }

    }
  }

  .fold{
    width:variable.$base-menu-min-width;
  }

  .layout_tabbar{
    position: fixed;
    top: 0;
    left: variable.$base-menu-width;
    width:calc(100% - variable.$base-menu-width);
    height: variable.$base-tabbar-height;
    transition: all 0.5s;

    &.fold{
      width:calc(100% - variable.$base-menu-min-width) ;
      left:variable.$base-menu-min-width;
    }
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
    transition: all 0.5s;

    &.fold{
      width:calc(100% - variable.$base-menu-min-width) ;
      left:variable.$base-menu-min-width;
    }
  }

}

</style>