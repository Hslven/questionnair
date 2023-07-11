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
  },
  // Get a single questionnaire
  {
    url: '/mock/api/question/:id',
    methods: "get",
    response: () => {
      return{
        error:0,
        data: {
          id: Random.id(),
          title: Random.ctitle(5, 10),
          description: Random.csentence(10, 20),
        }
      }
    }
  },
  // Update questionnaire information
  {
    url: '/mock/api/question/:id',
    methods: "put",
    response: () => {
      return{
        error:0,
        data: {
          id: Random.id(),
          title: Random.ctitle(5, 10),
        }
      }
    }
  },
  // Capacity delete the questionnaire
  {
    url: '/mock/api/question',
    methods: "delete",
    response: () => {
      return{
        error:0,
        data: {
          id: Random.id(),
        }
      }
    }
  }
  // Get questionnaire list
  // {
  //   url: '/mock/api/questionnaire/:id',
  //   methods: "get",
  //   response: () => {
  //     return{
  //       error:0,
  //       data: {
  //         id: Random.id(),
  //         title: Random.ctitle(5, 10),
  //         description: Random.csentence(10, 20),
  //       }
  //     }
  //   }
  // },
  
// Restful API
]
export default arr