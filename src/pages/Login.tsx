import { Typography, Space, Button, Checkbox, Form, Input, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '@/utils/user-token.ts';
import api from '@/api/user.ts';
import style from './Home.module.scss';
const Login = () => {
  return (
    <div className={style.login}>
      <Space>
        <Typography.Title>
          <UserAddOutlined />
        </Typography.Title>
        <Typography.Title>User Login</Typography.Title>
      </Space>
      <div>
        <FormInput />
      </div>
    </div>
  );
};

const FormInput = () => {
  // password replay
  const [form] = Form.useForm();
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('USER_INFO')) {
      const { username, passwordBase64 } = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
      form.setFieldsValue({ username, password: atob(passwordBase64), remember: true });
    }
  });

  // register useRequest
  const { run: onFinish } = useRequest(
    (values) => {
      const { username, password, remember } = values;
      if (remember) {
        // 密码加密
        const passwordBase64 = btoa(password);
        localStorage.setItem('USER_INFO', JSON.stringify({ username, passwordBase64 }));
      } else {
        // else remove
        localStorage.removeItem('USER_INFO');
      }
      // if remember,saved
      messageApi.open({
        type: 'loading',
        content: 'Register in progress..',
        duration: 0,
        key: 'login',
      });
      return api.loginApi(username, password);
    },
    {
      manual: true,
      onSuccess: (result) => {
        setToken(result.token);
        // Dismiss manually and asynchronously
        messageApi.destroy('login');
        message.success('Login success');
        nav('/manage/list');
      },
    },
  );
  // form submission finish
  // const onFinish = (values: any) => {
  //   onFinishFailed({}, { content: 'Login success', type: 'success' });
  // };

  // form submission failed
  type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
  const [messageApi, contextHolder] = message.useMessage();
  const onFinishFailed = (_errorInfo?: any, messgae?: { content: string; type: NoticeType }) => {
    if (messgae) {
      return messageApi.open({
        type: messgae.type || 'error',
        content: messgae.content || '',
      });
    }

    if (_errorInfo.errorFields) {
      return messageApi.open({
        type: 'error',
        content: _errorInfo?.errorFields[0].errors[0],
      });
    }
  };
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 1200 }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox value={false} style={{ userSelect: 'none' }}>
          Remember me
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space size={20}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to="/register" style={{ fontSize: '14px' }}>
            register now!
          </Link>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default Login;
