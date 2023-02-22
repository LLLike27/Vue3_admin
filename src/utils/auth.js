/*
 *@description：封装方法 退出登录方案
 */
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from './storage'
/* 获取时间戳 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/* 设计时间戳 */
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now())
}

/* 判断是否超时 */
export function isCheckTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()

  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
