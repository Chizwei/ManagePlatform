// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入登录接口
import { reqLogin } from "../../api/user";
import type { loginForm, loginResponseData } from "../../api/user/type";
import type { UserState } from "../../store/modules/types"
import { GET_TOKEN, SET_TOKEN } from "../../utils/token";

let useUserStore = defineStore('User', {
  // 小仓库，存储数据的地方
  state: (): UserState => {

    return {
      token: GET_TOKEN(),//用户唯一标识token,持久化
    }
  },

  //  异步|逻辑处理
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      let res: loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        // 通过pinia仓库存储一下token
        // pinia|vueX 存储数据都是利用js对象存储，不会持久拥有
        this.token = res.data.token as string
        // 还需要本地存储，持久化
        SET_TOKEN(res.data.token as string)
        // 保证当前async函数返回一个成功的promise
        return 'ok'

      } else {
        // 这里的error是服务的error 和 axios中的error不一样
        // axios中的是http网络的错误
        return Promise.reject(new Error(res.data.message))
      }
    }
  },
  getters: {

  }
})


export default useUserStore