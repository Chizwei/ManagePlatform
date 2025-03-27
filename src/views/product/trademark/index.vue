<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" size="default">添加品牌</el-button>

      <!-- 表格组件展示已有数据 -->
      <el-table style="margin:10px 0" border :data="trademarkArr">

        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <!-- 图片展示，服务器目前请求超时 -->
          <!-- <template #="{row,column,$index}">
            <img :src="row.logoUrl" alt="没找到图片" style="width:100px;height: 100px;">
          </template> -->
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{row,column,$index}">
            <el-button type="primary" size="small" icon="Edit" circle></el-button>
            <el-button type="danger" size="small" icon="Delete" circle></el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :disabled="disabled"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '../../../api/product/trademark'

const currentPage = ref<number>(1) //当前页码
const pageSize = ref<number>(3) //每页展示数据数量
const disabled = ref(false)

// 存储已有品牌数据总数
let total = ref<number>(0)

// 存储已有品牌数据
let trademarkArr = ref<any[]>([])


// 挂载时需要调用请求，修改页面也需要调用请求
// 可以把请求封装函数
const getHasTrademark = async ()=>{
  let res = await reqHasTrademark(currentPage.value,pageSize.value)
  if(res.code === 200){
    // 存储已有品牌总数
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}



onMounted(()=>{
  getHasTrademark()
})
</script>

<style scoped>
.demo-pagination-block {
  margin-top: 25px;
}

</style>