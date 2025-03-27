// 统一管理用户相关接口
import request from "../../utils/request";
import type { loginFormData, loginResponseData, userInfoResponseData } from "./type";

// 用户相关的请求地址
enum API {
  LOGIN_URL = "http://sph-api.atguigu.cn/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout"
}

// 登录接口
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

//获取用户信息 
export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

// 退出登录
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
