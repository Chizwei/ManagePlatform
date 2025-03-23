//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'

//全局对象
const allGlobalComponent = { SvgIcon, Pagination }

// 对外暴露插件对象
export default {
  //一定要叫 install 方法
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach(item => {
      // 注册为全局组件
      app.component(item, allGlobalComponent[item])
    })
  }
}
// 后续则无需再引入，直接使用这些组件