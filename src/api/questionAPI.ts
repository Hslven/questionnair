import { post, get } from "@/utils/request";
/**
 * @description: 传入params参数是携带query，传入data是携带body
 * @param {object} params
 * */

type QuestionnaireListParams = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  id?:string | number
}

export default {
  // 获取单个问卷
  getQuestionService: (id:string) => get({ url: `/api/question/${id}`}),
// 创建问卷
  createQuestionService: () => post({ url: "/api/question"}),
  //  获取查询列表
  getQuestionListService: () => get({ url: "/api/question"}),
};
