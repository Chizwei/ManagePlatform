<template>
  <div v-for="(item) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由，但只有一个 -->
    <template v-if="item.children&&item.children.length==1">
      <el-menu-item 
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个子路由 -->
    <el-sub-menu  
      v-if="item.children&&item.children.length>1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 递归组件，自己调自己 -->
      <!-- 无需再遍历，对于未知个数的路由递归更方便 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>

  </div>
</template>

<script setup lang="ts">
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])

const goRoute = (vc:any)=>{
  // vc.index 即为后续跳转的路径

}


</script>


<script lang="ts">
// 递归组件可以通过vue2来实现
// 递归组件必须有名字
export default {
  name:'Menu',
  
}
</script>

<style scoped>

</style>