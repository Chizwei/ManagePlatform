// 路由鉴权，（一个路由什么条件下可以访问，什么条件下不能访问）
import router from "./router";
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

import useUserStore from "./store/modules/user";
import pinia from "./store";
import setting from "./setting";

let userStore = useUserStore(pinia) //组件外访问仓库，需要引入仓库名

nprogress.configure({ showSpinner: false })//关闭加载圈
/*
  1.问题一：进度条样式
  2.问题二：路由鉴权，组件访问权限
    全部路由组件：登录、404、任意路由、首页、数据大屏、权限管理(3个子路由)、商品管理(4个子路由)

    用户未登录：可以访问login，其余不能访问，跳转到login
    登录成功：不能访问login，跳转到首页，其余可以访问，
*/


// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // 访问某一个路由之前守卫，next()放行
  // 进度条开始
  nprogress.start()

  let token = userStore.token

  if (token) {
    // 已登录
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //登录成功访问其他路由

      if (userStore.username) {
        next()
      } else {
        // 没有用户信息，发起请求获取信息
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期 或者 用户手动修改本地存储token
          // 退出登录
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }

    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

})


// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 访问某一个路由之后守卫

  // 修改页面标题
  document.title = `${setting.title} - ${to.meta.title}`

  // 进度条结束
  nprogress.done()



})

