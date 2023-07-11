import axios from "axios";
import { message } from "antd";
const $axios = axios.create({
  // 开发环境下使用
  baseURL: import.meta.env.VITE_API_URL,
  // node环境下使用
  // baseURL: 'http://localhost:3001', 
  timeout: 100000,
  headers: { 'Content-Type': 'application/json', 'request-ajax': true },
});

const request = function (query: object) {
  return $axios.request(query)
    .then((res) => {
      // console.log(res.data);
      return Promise.resolve(res.data);
    })
    .catch((e) => {
      message.error(e.message);
      return Promise.reject(e.message);
    });
};


type requestProps = {
  url: string;
  params?: object;
  data?: object;
}
const post = function ({
  url,
  params,
  data,
}: requestProps) {
  const query = {
    url: url,
    method: 'post',
    withCredentials: true,
    params,
    data,
    headers: { 'Content-Type': 'application/json', 'request-ajax': true },
  };
  return request(query);
};

const get = function ({
  url,
  params,
  data,
}: requestProps) {
  const query = {
    url: url,
    method: "get",
    withCredentials: true,
    params,
    data,
    headers: { "Content-Type": "application/json", "request-ajax": true },
  };
  return request(query);
};
// export default request;
export { post, get };
