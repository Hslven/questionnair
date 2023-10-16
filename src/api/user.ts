import axios, { ResDataType } from '@/utils/request';
export default {
  // 获取用户信息
  getUserInfoApi: async (): Promise<ResDataType> => {
    const url = `/api/user/info`;
    const data = (await axios.get(url)) as ResDataType;
    return data;
  },
  // 注册用户
  registerApi: async (username: string, password: string, nickname?: string): Promise<ResDataType> => {
    const url = `/api/user/register`;
    const body = { username, password, nickname: nickname || username };
    const data = (await axios.post(url, body)) as ResDataType;
    return data;
  },
  // 登录
  loginApi: async (username: string, password: string): Promise<ResDataType> => {
    const url = `/api/user/login`;
    const body = { username, password };
    const data = (await axios.post(url, body)) as ResDataType;
    return data;
  },
};
