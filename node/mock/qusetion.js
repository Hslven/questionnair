import Mock from 'mockjs';

const Random = Mock.Random;

module.exports = [
    {
        url: '/api/question/:id',
        methods: 'get',
        response: () => {
            return {
                code: 200,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                    content: Random.cparagraph(),
                }
            }
        }
        
    }
]