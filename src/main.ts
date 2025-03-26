import { createApp } from 'vue'
import App from './App.vue'
// 引入elementUI组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置Element UI国际化
//@ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入 SVG 注册脚本
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index.ts'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
import './permission'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

//安装自定义插件
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
