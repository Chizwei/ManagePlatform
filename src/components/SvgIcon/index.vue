<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix + name" :fill="color"> </use>
  </svg>
</template>

<script setup lang="ts">

const props = defineProps({
  // xlink:href属性值的前缀
  prefix:{
    type:String,
    default: '#icon-'
  },
  // 提供使用的图表名字
  name: {
    type:String,
    default:''
  },

  // 接收父组件传递颜色
  color:{
    type: String,
    default:''
  },
  //svg大小
  width:{
    type:String,
    default:'16px'
  },

  height:{
    type:String,
    default:'16px'
  }
})

</script>

<style scoped>


</style>