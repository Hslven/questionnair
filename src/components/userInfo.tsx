import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import api from '@/api/user.ts';
import { useRequest } from 'ahooks';
import { removeToken } from '@/utils/user-token';

function UserInfo() {
  const { data } = useRequest(api.getUserInfoApi);
  const { username, nickname } = data || {};
  const nav = useNavigate();
  function logout() {
    removeToken();
    nav('/login');
  }

  const UserInfo = (
    <>
      <div style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </div>
    </>
  );
  const Login = <Link to="/login">登录</Link>;
  return <div>{username ? UserInfo : Login}</div>;
}

export default UserInfo;
