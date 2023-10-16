/**
 * @description 获取/存储用户token
 * @author llt
 */

const KEY = 'User-Token';

export function setToken(token: string) {
  localStorage.setItem(KEY, token);
}
export function getToken() {
  return localStorage.getItem(KEY) || '';
}
export function removeToken() {
  localStorage.removeItem(KEY);
}
