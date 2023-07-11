import { post } from '@/utils/request';
/**
 * @description: 传入params参数是携带query，传入data是携带body
 * @param {object} params
 * */


export default {
  test: (params: any) => post({ url: '/api/user', params }),
  test1: (data: any) => post({ url: '/api/user', data }),
};
