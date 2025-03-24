// 登录接口需要携带参数类型
export interface loginForm {
  username: String,
  password: String
}

interface dataType {
  token: String
}

// 登录接口返回的数据类型
export interface loginResponseData {
  code: number,
  data: dataType
}

interface userInfo {
  userId: number,
  avatar: String,
  username: String,
  password: String,
  desc: String,
  roles: String[],
  buttons: String[],
  routes: String[],
  token: String,
}

interface user {
  checkUser: userInfo
}

// 服务器返回用户信息相关数据类型
export interface userResponseData {
  code: number,
  data: user
}