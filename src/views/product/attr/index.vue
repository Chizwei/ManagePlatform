<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>

    <el-card style="margin:20px 0;">
      <div v-if="scene == 0">
        <el-button type="primary" size="large" icon="Plus" :disabled="CategoryStore.c3Id?false:true" round @click="addAttr">添加属性</el-button>

        <el-table border style="margin:10px 0" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{row,$index}">
              <el-tag style="margin:0 5px" v-for="(item,index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <!-- row表示已有的属性对象 -->
            <template #="{row,$index}">
              <el-button type="primary" size="default" icon="Edit" circle @click="updateAttr"></el-button>
              <el-button type="danger" size="default" icon="Delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-else>
        <!-- 添加属性与修改的解构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValue" :disabled="attrParams.attrName?false:true" type="primary" size="default" icon="Plus">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性名称"  align="center">
            <!-- row即为当前属性值对象 -->
            <!-- row相当于item -->
            <template #="{row,$index}">
              <el-input :ref="(vc:any)=>inputArr[$index]=vc" v-if="row.flag" placeholder="请输入属性值名称" v-model="row.valueName" @blur="toLook(row,$index)"></el-input>
              <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="160px" >
            <template #="{row,$index}">
              <el-button size="small" circle icon="Delete"
              type="danger" @click="attrParams.attrValueList.splice($index,1)"></el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue';
import useCategoryStore from '../../../store/modules/category';
import { reqAddOrUpdateAttr, reqAttr } from '../../../api/product/attr';
import { ElMessage } from 'element-plus';
import type { Attr, AttrResponseData, AttrValue } from '../../../api/product/attr/type';

let CategoryStore = useCategoryStore()

// 存储已有的属性和属性值
let attrArr = ref<Attr[]>([])
// 定义卡片内容切换变量
let scene = ref<number>(1) //0显示table，1显示属性修改的界面

// 收集新增的属性数据
let attrParams = reactive<Attr>({
  attrName:'', //新增属性的名称
  attrValueList:[], //新增属性值数组
  categoryId:'', //三级分类ID
  categoryLevel:3 
})


let inputArr = ref<any>([])

watch(()=>CategoryStore.c3Id,()=>{
  // 三级分类发生变化，清空上一次查询的结果
  attrArr.value = []
  // 确保三级分类存在
  if(CategoryStore.c3Id){
    getAttr()
  }
})

// 获取已有属性和属性值方法
const getAttr = async ()=>{
  // 数据解构
  const {c1Id,c2Id,c3Id} = CategoryStore
  let res:AttrResponseData = await reqAttr(c1Id,c2Id,c3Id)
  if(res.code == 200){
    attrArr.value = res.data
    ElMessage({
      type:'success',
      message:'获取属性成功'
    })
    console.log(attrArr.value);
  }else{
    ElMessage({
      type:'error',
      message:'获取属性失败'
    })
  }
}

// 添加属性按钮
const addAttr = ()=>{
  // 先清空数据,在进行收集
  Object.assign(attrParams,{

    attrName:'', //新增属性的名称
    attrValueList:[], //新增属性值数组
    categoryId:CategoryStore.c3Id, //三级分类ID
    categoryLevel:3 
  })

  scene.value = 1

  // 收集三级分类id，也可以在上面进行id收集
  // attrParams.categoryId = CategoryStore.c3Id

}

// 修改属性按钮
const updateAttr = ()=>{
  scene.value = 1
}

// 取消按钮回调
const cancel = ()=>{
  scene.value = 0
}

// 添加属性值
const addAttrValue = ()=>{
  attrParams.attrValueList.push({
    valueName:'',
    flag:true,//控制编辑与查看模式的切换
  })

  // 获取最后一个input组件，进行聚焦
  nextTick(()=>{
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存按钮回调
const save = async ()=>{
  let res:any = await reqAddOrUpdateAttr(attrParams as any)
  // 成功
  if(res.code == 200){
    scene.value = 0//切换场景
    ElMessage({
      type:'success',
      message:attrParams.id?'修改成功':'添加成功'
    })
    // 获取全部已有属性
    getAttr()
  }else{
    ElMessage({
      type:'error',
      message:attrParams.id?'修改失败':'添加失败'
    })
  }
}

// 切换查看模式
const toLook = (row:AttrValue,$index:number)=>{
  // 非法情况判断1
  if(row.valueName.trim()==''){
    // 删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index,1)
    // 提示信息
    ElMessage({
      type:'error',
      message:'属性值不能为空'
    })
    return
  }

  // 非法情况判断2
  // 防止重复值
  let repeat = attrParams.attrValueList.find((item)=>{
    // 切记把当前失去焦点属性值对象从当前数组中扣除，在进行判断
    if(item!=row){
      return item.valueName === row.valueName
    }
  })

  if(repeat){
    // 将重复的属性值从当前数组中删除
    attrParams.attrValueList.splice($index,1)
    ElMessage({
      type:'error',
      message:'出现重复值',
    })
    return
  }


  row.flag = false

}

// 切换编辑模式
const toEdit = (row:AttrValue,$index:number)=>{
  row.flag = true

  // 标签更新
  // nextTick响应式数据发生变化，获取更新的DOM
  nextTick(()=>{
    inputArr.value[$index].focus()
  })

}

</script>

<style scoped>
</style>