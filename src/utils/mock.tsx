import Mock from 'mockjs';

Mock.mock('/mock/api/user?name=123', 'post', {
  name: '@name',
  'age|1-10': 5,
});
Mock.mock('/mock/api/user', 'post', (data) => {
  console.log(data);
  return {
    name: '@name',
    'age|1-10': 5,
  };
});
