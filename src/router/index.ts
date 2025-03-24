// 通过vue-router实现模板路由配置
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routers";

let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  // 切换新路由页面滚动到顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router