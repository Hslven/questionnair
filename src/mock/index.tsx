import Mock from 'mockjs';
import question from './question';
const mockList = [...question]


// 设置全局延迟时间
Mock.setup({
  timeout: 1000, // 延迟 1 秒钟
});
// 遍历 mockList 数组，设置每个接口的模拟数据
mockList.forEach((item) => {
  const { url, methods, response } = item;
  Mock.mock(url, methods, response);
});