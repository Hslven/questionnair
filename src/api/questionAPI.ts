import axios, { ResDataType } from '@/utils/request';
/**
 * @description: 传入params参数是携带query，传入data是携带body
 * @param {object} params
 * */

// type QuestionnaireListParams = {
//   page?: number;
//   pageSize?: number;
//   keyword?: string;
//   id?:string | number
// }
type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDelete: boolean;
  page: number | String;
  pageSize: number | String;
};
export default {
  // 获取单个问卷
  // getQuestionService: (id:string):Promise<ResDataType> => get({ url: `/api/question/${id}`}),
  getQuestionService: async (id: string): Promise<ResDataType> => {
    const url = `/api/question/${id}`;
    const data = (await axios.get(url)) as ResDataType;
    return data;
  },
  // 创建问卷
  createQuestionService: async (): Promise<ResDataType> => {
    const url = `/api/question/`;
    const data = (await axios.post(url)) as ResDataType;
    return data;
  },
  //  获取查询列表
  getQuestionListService: async (opt: Partial<SearchOption>): Promise<ResDataType> => {
    const url = `/api/question/`;
    const data = (await axios.get(url, { params: opt })) as ResDataType;
    return data;
  },
  //  更新问卷ho
  updateQuestionService: async (id: string, opt: { [key: string]: any }): Promise<ResDataType> => {
    const url = `/api/question/${id}`;
    const data = (await axios.put(url, opt)) as ResDataType;
    return data;
  },
  //  复制
  duplicateQuestionService: async (id: string): Promise<ResDataType> => {
    const url = `/api/question/duplicate/${id}`;
    const data = (await axios.post(url)) as ResDataType;
    return data;
  },
  // 删除
  deleteQuestionService: async (ids:string[]): Promise<ResDataType> => {
    const url = `/api/question`;
    const data = (await axios.delete(url,{data:ids})) as ResDataType;
    return data;
  },
};
