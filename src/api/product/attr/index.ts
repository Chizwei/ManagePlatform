// 属性相关API文件

import request from "../../../utils/request";
import type { AttrResponseData, CategoryResponseData } from "./type";

// 属性管理模块接口地址
enum API {

  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有属性
  ATTR_URL = '/admin/product/attrInfoList/',


  // 添加 or 修改已有属性接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo'


}

// 获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

// 获取二级分类的接口方法
export const reqC2 = (category1Id: number) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)

// 获取三级分类的接口方法
export const reqC3 = (category2Id: number) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id)

// 获取对应分类下已有属性和属性值接口
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)

// 添加 or 修改已有属性接口方法
export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

}