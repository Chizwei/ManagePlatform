<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{Component}">
      <!-- 添加过渡动画 -->
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="!flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import useLayOutSettingStore from '../../store/modules/setting';

// 组件命名
defineOptions({
  name:'Main'
})
// 控制组件是否销毁
let flag = ref(false)

let layoutSettingStore = useLayOutSettingStore()
// 监听仓库内部数据是否发生变化
watch(()=>layoutSettingStore.refesh,()=>{
  // 点击刷新按钮，销毁组件
  // 还可以点击刷新按钮,重新发起请求
  flag.value = true

  // dom更新完毕,重新创建
  // 不要使用延时器,时间无法控制
  console.log(layoutSettingStore.refesh);
  
  nextTick(()=>{
    flag.value = false
  })
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