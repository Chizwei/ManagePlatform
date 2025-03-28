<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button 
        type="primary" 
        icon="Plus" 
        size="default"
        @click="addTrademark"
      >添加品牌</el-button>

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
          <template #="{row,$index}">
            <el-button 
              type="primary" 
              size="small" 
              icon="Edit" 
              circle 
              @click="updateTrademark"
            ></el-button>

            <el-button 
              type="danger" 
              size="small" 
              icon="Delete" 
              circle 
              @click="deleteTrademark"
            ></el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :disabled="disabled"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getHasTrademark"
          @size-change="sizeChange"
        />
      </div>
    </el-card>

    <!-- 弹出窗 -->
     <!-- v-model 控制显示与隐藏-->
    <el-dialog v-model="dialogFormVisible" title="添加品牌" >
      <el-form>
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="请输入品牌名称" style="width: 80%;" v-model="trademarkParams.tmName">
          </el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <!-- 上传图片 -->
           <!-- action是图片的上传路径，需要写/api -->
            <!-- before-upload可以限制文件类型 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="info" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { reqHasTrademark } from '../../../api/product/trademark'
import type { Records, TradeMark, TradeMarkResponseData } from '../../../api/product/trademark/type'


const currentPage = ref<number>(1) //当前页码
const pageSize = ref<number>(3) //每页展示数据数量
const disabled = ref(false)

// 存储已有品牌数据总数
let total = ref<number>(0)

// 存储已有品牌数据
let trademarkArr = ref<Records>([])


// 挂载时需要调用请求，修改页面也需要调用请求
// 可以把请求封装函数
const getHasTrademark = async ()=>{
  let res:TradeMarkResponseData = await reqHasTrademark(currentPage.value,pageSize.value)
  if(res.code === 200){
    // 存储已有品牌总数
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

// 可以直接把请求作为事件函数，无需再写额外的一个函数
// 分页器当前页码发生变化
// const changePageNo = ()=>{
//   // 当前页码变化，再次发起请求
//   getHasTrademark()
// }


// 当下拉菜单发生变化，触发
const sizeChange = ()=>{
  //  当每页数据量变化，需要将当前页返回第一页
  currentPage.value = 1
  getHasTrademark()

}

// 控制对话框显示隐藏
let dialogFormVisible = ref<boolean>(false)

// 收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName:'',
  logoUrl:''
})

// 添加品牌按钮回调
const addTrademark = ()=>{
  dialogFormVisible.value = true

}


// 修改已有品牌按钮回调
const updateTrademark = ()=>{
  dialogFormVisible.value = true

} 

// 删除已有品牌按钮回调
const deleteTrademark = ()=>{
  dialogFormVisible.value = true

}

// 对话框按钮
const cancel = ()=>{

  // 关闭对话框
  dialogFormVisible.value = false
}

const confirm = ()=>{

  dialogFormVisible.value = false
}

// 上传图片组件之前触发的函数
// 可以限制文件类型和大小
const beforeAvatarUpload:UploadProps['beforeUpload']  = (rawFile)=>{
  if(rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif'){
    if(rawFile.size/1024/1024 < 4){
      return true
    }else{
      ElMessage({
        type:'error',
        message:'上传文件大小必须小于4MB'
      })
    }
  }else{
    ElMessage({
      type:'error',
      message:'上传文件类型必须是JPG/PNG/GIF'
    })
  }
  return false
}

// 上传成功钩子
const handleAvatarSuccess:UploadProps['onSuccess'] = (res,uploadFile)=>{
  //res：即为上传图片请求返回的数据
  // 收集上传图片的地址，添加一个新品牌时带给服务器
  trademarkParams.logoUrl = res.data

}


onMounted(()=>{
  getHasTrademark()
})
</script>

<style scoped>
.demo-pagination-block {
  margin-top: 25px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>