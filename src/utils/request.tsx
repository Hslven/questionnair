import axios from "axios";
import { Spin, message } from "antd";
const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: 'http://localhost:5173',
  timeout: 100000,
  headers: { "Content-Type": "application/json", "request-ajax": true },
});

const request = function (query: object,_loadtip?: boolean) {
  return $axios.request(query)
    .then((res) => {
      console.log(res.data);
      return Promise.resolve(res.data);
    })
    .catch((e) => {
      message.error(e.message);
      return Promise.reject(e.message);
    });
};

const post = function ({
  url,
  params,
  data,
}: {
  url: string;
  params?: object;
  data?: object;
}) {
  const query = {
    url: url,
    method: "post",
    withCredentials: true,
    params,
    data,
    headers: { "Content-Type": "application/json", "request-ajax": true },
  };
  return request(query);
};
// export default request;
export { post };
