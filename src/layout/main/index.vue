<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{Component}">
      <!-- 添加过渡动画 -->
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
// 组件命名
defineOptions({
  name:'Main'
})


</script>

<style scoped>
.fade-enter-from{
  opacity: 0;

}

.fade-enter-active{
  transition: all .5s;
  
}

.fade-enter-to{
  opacity: 1;
}



</style>