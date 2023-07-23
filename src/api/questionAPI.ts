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
  newQuestionnaire: () => post({ url: "/api/question"}),
  // 
  getQuestionnaireList: (params:QuestionnaireListParams={}) => get({ url: "/api/question",params}),
};
