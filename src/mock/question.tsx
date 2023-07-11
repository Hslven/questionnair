import Mock from "mockjs";
// eslint-disable-next-line react-refresh/only-export-components
const Random = Mock.Random;

const arr = [
  // Create questionnaire
  {
    url: '/mock/api/question',
    methods: "post",
    response: () => {
      return {
        error: 0,
        data: {
          id: Random.id(),
        },
      };
    }
  }
]
export default arr