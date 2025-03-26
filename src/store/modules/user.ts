// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入登录接口
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";

import type { UserState } from "../../store/modules/types"
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "../../utils/token";
// 引入路由（常量路由）
import { constantRoute } from "../../router/routers";


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
    async userLogin(data: any) {

      // 登录请求
      let res = await reqLogin(data)
      console.log(res);

    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息，存储到仓库中
      let res = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        // 返回成功promise对象
        return 'ok'

      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },
    //退出登录 
    userLogout() {
      // 1.目前没有退出接口，否则告知服务器，token失效
      // 2.清空仓库
      this.token = ''
      this.username = ''
      this.avatar = ''
      // 在本地存储中删除token 
      REMOVE_TOKEN()


    }

  },
  getters: {

  }
})


export default useUserStore