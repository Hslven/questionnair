import { Typography, Space, Button, Form, Input, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Home.module.scss';
import api from '@/api/user.ts';
import { useRequest } from 'ahooks';

const Register = () => {
  return (
    <div className={style.login}>
      <Space style={{ width: '400px', justifyContent: 'flex-end' }}>
        <Typography.Title>
          <UserAddOutlined />
        </Typography.Title>
        <Typography.Title>Register New User</Typography.Title>
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
  // useNavigate
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('USER_INFO')) {
      const { username, passwordBase64 } = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
      // console.log(username, passwordBase64)
      form.setFieldsValue({ username, password: atob(passwordBase64), remember: true });
      // console.log(form.getFieldValue("remember"))
    }
  });

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

  // form submission finish
  // const onFinish = (values: any) => {
  //   run(values);
  // };

  // register useRequest
  const { run } = useRequest(
    (values) => {
      const { username, password, nickname } = values;
      messageApi.open({
        type: 'loading',
        content: 'Register in progress..',
        duration: 0,
      });
      return api.registerApi(username, password, nickname);
    },
    {
      manual: true,
      onSuccess: (result) => {
        // Dismiss manually and asynchronously
        setTimeout(() => {
          messageApi.destroy;
          nav('/login', { replace: true });
        }, 1500);
        // onFinishFailed({}, { content: 'Register success', type: 'success' });
      },
    },
  );

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 20 }}
      style={{ width: '400px' }}
      initialValues={{ remember: false }}
      onFinish={run}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="comfirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('New passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Nickname">
        <Form.Item name="nickname" noStyle rules={[{ required: true, message: 'Please input the nickname you got!' }]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space size={20}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Link to="/login" style={{ fontSize: '14px' }}>
            I have an account!
          </Link>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default Register;
