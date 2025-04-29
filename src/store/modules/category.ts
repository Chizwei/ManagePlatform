// 商品分类组件仓库

import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "../../api/product/attr";
import type { CategoryResponseData } from "../../api/product/attr/type";
import type { CategoryState } from "./types";


let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类数据
      c1Arr: [],
      // 存储一级分类的id
      c1Id: '',

      c2Arr: [],
      c2Id: '',

      c3Arr: [],
      c3Id: '',

    }
  },

  actions: {
    // 获取一级分类
    async getC1() {
      // 发请求获取一级分类数据
      let res: CategoryResponseData = await reqC1()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    async getC2() {
      let res: CategoryResponseData = await reqC2(this.c1Id as number)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },

    async getC3() {
      let res: CategoryResponseData = await reqC3(this.c2Id as number)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    }
  },
  getters: {}

})

export default useCategoryStore