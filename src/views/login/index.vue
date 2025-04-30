<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form 
          class="login_form" 
          :model="loginForm" 
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到甄选管理平台</h2>

          <el-form-item class="item" prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" style="width: 350px;"></el-input>
          </el-form-item>

          <el-form-item class="item" prop="password">
            <el-input 
              type="password" 
              v-model="loginForm.password" 
              :prefix-icon="Lock" 
              style="width: 350px;"
              show-password
              ></el-input>
          </el-form-item>

          <el-form-item class="item">
            <el-button 
              class="login_btn" 
              type="primary" 
              size="default" 
              @click="login"
              :loading="loading"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
import { reactive,ref } from 'vue';
import useUserStore from '../../store/modules/user';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElNotification } from 'element-plus';

// 表单数据
let loginForm = reactive({
  username:'admin',
  password:'111111'
})

let useStore = useUserStore()
let router = useRouter()
let loading = ref(false) //控制按钮加载效果
// 获取表单元素
let loginForms = ref()
let route = useRoute()
// 登录按钮事件
const login = async ()=>{
  // 发起请求之前保证所有校验通过
  await loginForms.value.validate()
  // 开始加载，加载效果
  loading.value = true
  try{
    await useStore.userLogin(loginForm)
    // 跳转到首页
    // 添加判断，有query参数，往query跳转
    let redirect:any = route.query.redirect
    if(!redirect){
      router.push('/')
    }else{
      router.push(redirect)
    }

    let msg = getTime()
    
    ElNotification({
      title:`hi! ${msg}好！`,
      message:'欢迎回来',
      type:'success',
      duration:1500,
    })
    // 登录成功,结束加载
    loading.value = false

  }catch(error){
    // 登录失败,结束加载
    loading.value = false
    ElMessage({
      message:(error as Error).message,
      type:'error'
    })
  }
}

// 封装函数，获取时间：早上|上午|下午|晚上
const getTime = ()=>{
  let message = ''
  // 通过内置构造函数获取
  let hours = new Date().getHours()
  if(hours <= 9){
    message = '早上'
  }else if(hours <= 12){
    message = '上午'
  }else if(hours <= 18){
    message = '下午'
  }else{
    message = '晚上'
  }
  return message
}

// 自定义校验规则
const checkUserName = (rule:any,value:any,callback:any)=>{
  // rule即为数组的校验规则对象
  // value即为表单元素文本内容
  // callback函数，符合条件放行，不符条件注入错误信息
  if(value.length>=5){
    callback()
  }else{
    callback(new Error('账号长度至少5位'))
  }
}

const checkPassword = (rule:any,value:any,callback:any)=>{
  // rule即为数组的校验规则对象
  // value即为表单元素文本内容
  // callback函数，符合条件放行，不符条件注入错误信息
  if(value.length>=6){
    callback()
  }else{
    callback(new Error('密码长度至少6位'))
  }
}

// 表单校验
const rules = {
  username:[
    {validator:checkUserName,trigger:'change'}
  ],
  password:[
    {validator:checkPassword,trigger:'blur'}
  ]
}

</script>

<style scoped lang="scss">
.login_container{
  width: 100%;
  height: 100vh;
  background:url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form{
    position: relative;
    width: 80%;
    top:40vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    padding:40px;
    h1{
      color:white;
      font-size: 40px;
    }
    h2{
      font-size:20px;
      color:white;
      margin:20px 0px;
    }
    .item{
      margin-left:50px;
    }
    .login_btn{
      
      width: 350px;
      background-color: skyblue;
    }
  }
}

</style>