<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select style="width:300px" v-model="CategoryStore.c1Id" @change="handler" :disabled="scene == 0?false:true">
          <!-- option，label是显示的文字，label为收集到的id -->
          <el-option v-for="(c1,index) in CategoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select style="width:300px" v-model="CategoryStore.c2Id" @change="handler1" :disabled="scene == 0?false:true">
          <el-option v-for="(c2,index) in CategoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select style="width:300px" v-model="CategoryStore.c3Id" :disabled="scene == 0?false:true">
          <el-option v-for="(c3,index) in CategoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
  </el-card>

</template>

<script setup lang="ts">
// 引入分类请求
import { onMounted,ref } from 'vue';
import useCategoryStore from '../../store/modules/category';

let CategoryStore = useCategoryStore()
defineProps(['scene']) //父组件传递的值

onMounted(()=>{
  getC1()
})

const getC1 = ()=>{
  CategoryStore.getC1()
}

// 一级分类下拉菜单change事件，选中值触发
const handler = ()=>{
  // 清空后面的数据
  CategoryStore.c2Id = ''
  CategoryStore.c3Id = ''
  CategoryStore.c3Arr = []


  CategoryStore.getC2()
}
const handler1 = ()=>{
  // 清空后面的数据
  CategoryStore.c3Id = ''

  CategoryStore.getC3()
}


</script>

<style scoped>

</style>