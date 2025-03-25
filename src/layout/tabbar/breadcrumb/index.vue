<template>
  <div class="tabbar_left">
    <!-- 图标 -->
      <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="layOutSettingStore.fold? 'Fold' : 'Expand' "/>
      </el-icon>

      <!-- 面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <!-- 动态管理名字 -->
        <el-breadcrumb-item 
          v-for="(item,index) in route.matched" 
          :key="index"
          v-show="item.meta.title"
          :to="item.path"
        > 
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span style="margin:0 5px;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '../../../store/modules/setting';

let route = useRoute()

// 定义一个响应式数据控制图标切换
//控制菜单折叠
let layOutSettingStore = useLayOutSettingStore()

// 改变图标
const changeIcon = ()=>{
  layOutSettingStore.fold = !layOutSettingStore.fold
}




</script>

<style scoped>

</style>