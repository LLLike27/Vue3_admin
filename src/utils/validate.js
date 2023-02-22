/*
 *@description：封装方法：判断是否为外部资源
 *@variable1: path 路径
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
