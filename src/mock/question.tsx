import Mock from "mockjs";
// eslint-disable-next-line react-refresh/only-export-components
const Random = Mock.Random;

const arr = [
  // Get questionnaire list 
  {
    url: /\/mock\/api\/question\/*/,
    methods: "get",
    response: (data: any) => {
      let list = [
        {
            "id": "330000197312114938",
            "title": "和几感际业",
            "isPublished": false,
            "isStar": false,
            "answerCount": 375,
            "createdAt": "1980-08-03 19:11:15"
        },
        {
            "id": "520000198005193314",
            "title": "展确主六",
            "isPublished": false,
            "isStar": true,
            "answerCount": 228,
            "createdAt": "2011-09-14 12:00:16"
        },
        {
            "id": "620000200108052139",
            "title": "收市",
            "isPublished": false,
            "isStar": true,
            "answerCount": 480,
            "createdAt": "2003-12-11 15:13:21"
        },
        {
            "id": "540000200707223497",
            "title": "光来空并北",
            "isPublished": false,
            "isStar": true,
            "answerCount": 228,
            "createdAt": "2010-10-29 04:09:16"
        },
        {
            "id": "520000200404177223",
            "title": "变细题",
            "isPublished": false,
            "isStar": true,
            "answerCount": 777,
            "createdAt": "2008-03-01 07:28:52"
        }
    ]
      // for (let i = 1; i < 10; i++) {
      //   list.push({
      //     id: Random.id(),
      //     title: Random.ctitle(2, 5),
      //     isPublished: Random.boolean(),
      //     isStar: Random.boolean(),
      //     answerCount: Random.integer(0, 1000),
      //     createdAt: Random.datetime(),
      //   })
      // }
      if (!data.url.includes('?'))return  { list:list.splice(0, 5), total: 100, page:  1, pageSize: 5 }
      const str = data.url.split('?')[1].replace("=", ":")
      const key = "\"" + str.split(':')[0] + "\""
      const object = JSON.stringify(decodeURIComponent(str.split(':')[1]))
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