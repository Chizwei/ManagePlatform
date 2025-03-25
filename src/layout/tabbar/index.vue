<template>
  <div class="tabbar">
    <!-- 左侧部分 -->
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>

    <!-- 右侧部分 -->
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue';
import Setting from './setting/index.vue'

// 组件命名
defineOptions({
  name:'Tabbar'
})

</script>

<style scoped lang="scss">
.tabbar{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right,rgb(199, 197, 197),rgb(216, 198, 198),rgb(206, 197, 197));

  .tabbar_left{
    display: flex;
    align-items: center;
    margin: 20px;
  }

  .tabbar_right{
    display: flex;
    align-items: center;
    margin-right:10px; 
  }
}

</style>