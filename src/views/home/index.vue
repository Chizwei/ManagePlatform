<template>
  <div>一级路由，登录成功后的页面</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

//  首页挂载完毕，发起请求，获取用户信息
onMounted(()=>{
  // userStore.userInfo() 无需再发起请求，再路由守卫中发起

})
</script>

<style scoped>

</style>