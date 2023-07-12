import Mock from "mockjs";
// eslint-disable-next-line react-refresh/only-export-components
const Random = Mock.Random;

const arr = [
  // Get questionnaire list 
  {
    url: /\/mock\/api\/question\/*/,
    methods: "get",
    response: (data: any) => {
      let list = []
      for (let i = 1; i < 10; i++) {
        list.push({
          id: Random.id(),
          title: Random.ctitle(2, 5),
          isPublished: Random.boolean(),
          isStar: Random.boolean(),
          answerCount: Random.integer(0, 1000),
          createdAt: Random.datetime(),
        })
      }
      console.log(data.url.includes('?'))
      if (!data.url.includes('?'))return  { list:list.splice(0, 5), total: 100, page:  1, pageSize: 5 }

      const params = new URLSearchParams();
      console.log(params)

      const str = data.url.split('?')[1].replace("=", ":")
      const key = "\"" + str.split(':')[0] + "\""
      const object = str.split(':')[1]
      const json = JSON.parse('{' + key + ":" + object + '}')
      console.log(json)
      if (json.page) {
        list = list.splice(json.pageSize * (json.page - 1), json.pageSize)
      } else {
        list = list.splice(0, 5)
      }
      if (json.query) {
        list = list.filter((item: any) => item.title.includes(json.query) || item.id.includes(json.query) || item.createdAt.includes(json.query))
      }
      return { list, total: 100, page: json.page || 1, pageSize: json.pageSize || 5 }
    }
  },
  // Create questionnaire
  {
    url: '/mock/api/question',
    methods: "post",
    response: () => {
      return {
        error: 0,
        data: {
          id: 123
        },
      };
    }
  },
  // Get a single questionnaire
  // {
  //   url: /\/mock\/api\/question\/*/,
  //   methods: "get",
  //   response: () => {
  //     return {
  //       error: 0,
  //       data: {
  //         id: Random.id(),
  //         title: Random.ctitle(5, 10),
  //         description: Random.csentence(10, 20),
  //       }
  //     }
  //   }
  // },
  // Update questionnaire information
  {
    url: '/mock/api/question/:id',
    methods: "put",
    response: () => {
      return {
        error: 0,
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
      return {
        error: 0,
        data: {
          id: Random.id(),
        }
      }
    }
  },


  // Restful API
]
export default arr