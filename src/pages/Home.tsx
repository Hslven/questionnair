import style from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { Typography, Divider, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '@/utils/counterSlice';
const Home: React.FC = () => {
  const nav = useNavigate();
  function manageJump() {
    nav('/manage/list');
  }
  const count = useSelector<{ counter: Number }>((state) => state.counter) as number;
  const dispatch = useDispatch();
  return (
    <div className={style.contain}>
      <span>{count}</span>
      <Button onClick={() => dispatch(increment())}>increment</Button>
      <Button onClick={() => dispatch(decrement())}>increment</Button>
      <Typography.Title level={2}>问卷调查 | 在线投票</Typography.Title>
      <Typography.Text>已累计创建问卷1090,发布问卷100份,收到答卷10000份</Typography.Text>
      <Divider style={{ border: 'none' }} />
      <Button type="primary" size="large" onClick={manageJump}>
        开始使用
      </Button>
    </div>
  );
};

export default Home;
