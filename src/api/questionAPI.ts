import axios , { ResDataType } from "@/utils/request";
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

export default {
  // 获取单个问卷
  // getQuestionService: (id:string):Promise<ResDataType> => get({ url: `/api/question/${id}`}),
  getQuestionService: async (id:string):Promise<ResDataType> => {
    const url = `/api/question/${id}`
    const data =(await axios.get(url) as ResDataType)
    return data
  }, 
  // 创建问卷
  createQuestionService: async ():Promise<ResDataType> => {
    const url = `/api/question/`
    const data =(await axios.post(url) as ResDataType)
    return data
  },
  // //  获取查询列表
  // getQuestionListService: () => get({ url: "/api/question"}),
  getQuestionListService: async ():Promise<ResDataType> => {
    const url = `/api/question/`
    const data =(await axios.get(url) as ResDataType)
    return data
  },
};
