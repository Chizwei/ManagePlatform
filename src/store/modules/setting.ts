// 关于layout组件相关小仓库

import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,//控制菜单折叠展开
      refesh: false,
    }
  }
})

export default useLayOutSettingStore