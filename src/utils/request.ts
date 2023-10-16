import axios from 'axios';
import { message } from 'antd';
import { getToken } from './user-token';
const $axios = axios.create({
  // 开发环境下使用
  baseURL: import.meta.env.VITE_API_URL,
  // node环境下使用
  // baseURL: 'http://localhost:3001',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json', 'request-ajax': true },
});

// 每次请求带上token
$axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; //JWT固定格式
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response 拦截：统一处理error和msg
$axios.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as ResType;
    const { error, data, msg } = resData;
    if (error !== 0) {
      // 错误提示
      if (msg) {
        message.error(msg);
      }
      throw new Error(msg);
    }
    return data as any;
  },
  (error) => {
    message.error(error.message);
    // return Promise.reject(error);
  },
);

export default $axios;

export type ResType = {
  error: number;
  data?: ResDataType;
  msg?: string;
};
export type ResDataType = {
  [key: string]: any;
};

// const request = function (query: object) {
//   return $axios.request(query)
//     .then((res) => {
//       // console.log(res.data);
//       return Promise.resolve(res.data);
//     })
//     .catch((e) => {
//       message.error(e.message);
//       return Promise.reject(e.message);
//     });
// };

// type requestProps = {
//   url: string;
//   params?: object;
//   data?: object;
// }
// const post = function ({
//   url,
//   params,
//   data,
// }: requestProps) {
//   const query = {
//     url: url,
//     method: 'post',
//     withCredentials: true,
//     params,
//     data,
//     headers: { 'Content-Type': 'application/json', 'request-ajax': true },
//   };
//   return request(query);
// };

// const get = function ({
//   url,
//   params,
//   data,
// }: requestProps) {
//   const query = {
//     url: url,
//     method: "get",
//     withCredentials: true,
//     params,
//     data,
//     headers: { "Content-Type": "application/json", "request-ajax": true },
//   };
//   return request(query);
// };
// export default request;
// export { post, get };
