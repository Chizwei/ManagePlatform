// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入登录接口
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";

import type { UserState } from "../../store/modules/types"
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "../../utils/token";
// 引入路由（常量路由）
import { constantRoute } from "../../router/routers";
import type { loginFormData, loginResponseData, userInfoResponseData } from "../../api/user/type";


let useUserStore = defineStore('User', {
  // 小仓库，存储数据的地方
  state: (): UserState => {

    return {
      token: GET_TOKEN(), //用户唯一标识token,持久化
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: '',
    }
  },

  //  异步|逻辑处理
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      // 登录请求
      let res: loginResponseData = await reqLogin(data)
      // 登录请求：成功200->token
      // 登录请求：失败201->登录失败错误信息
      if (res.code === 200) {
        // pinia仓库存储token
        // 由于pinia存储其实是利用js对象存储
        this.token = (res.data as string)
        // 所以需要本地存储一下
        SET_TOKEN((res.data as string))
        // 保证当前async函数返回一个成功的promise
        return 'ok'

      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息，存储到仓库中
      let res: userInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        // 返回成功promise对象
        return 'ok'

      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //退出登录 
    async userLogout() {
      // 退出登录请求
      let res: any = await reqLogout()
      if (res.code === 200) {
        // 1.目前没有退出接口，否则告知服务器，token失效
        // 2.清空仓库
        this.token = ''
        this.username = ''
        this.avatar = ''
        // 在本地存储中删除token 
        REMOVE_TOKEN()
        return 'ok' //返回成功的Promise
      } else {
        return Promise.reject(new Error(res.message))
      }




    }

  },
  getters: {

  }
})


export default useUserStore