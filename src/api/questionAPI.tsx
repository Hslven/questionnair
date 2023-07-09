import { post, get } from "@/utils/request";
/**
 * @description: 传入params参数是携带query，传入data是携带body
 * @param {object} params
 * */

export default {
  // Create questionnaire
  newQuestionnaire: (params: object = {}) => post({ url: "/api/question", params }),
};
