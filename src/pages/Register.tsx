import {
  Typography,
  Space,
  Button,
  Form,
  Input,
  message,
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.scss';

const Register = () => {
  return (
    <div className={style.login}>
      <Space style={{ width: '400px', justifyContent: 'flex-end' }}>
        <Typography.Title>
          <UserAddOutlined />
        </Typography.Title>
        <Typography.Title>Register New User</Typography.Title>
      </Space>
      <div >
        <FormInput />
      </div>
    </div>
  );
};

const FormInput = () => {
  // password replay
  const [form] = Form.useForm();
  useEffect(() => {
    if (localStorage.getItem('USER_INFO')) {
      const { username, passwordBase64 } = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
      // console.log(username, passwordBase64)
      form.setFieldsValue({ username, password: atob(passwordBase64), remember: true });
      // console.log(form.getFieldValue("remember"))
    }
  });

  // form submission finish
  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const { username, password, remember } = values;
    // if remember,saved
    if (remember) {
      // 密码加密
      const passwordBase64 = btoa(password);
      localStorage.setItem(
        'USER_INFO',
        JSON.stringify({ username, passwordBase64 }),
      );
    } else {
      // else remove
      localStorage.removeItem('USER_INFO');
    }
    onFinishFailed({}, { content: 'Register success', type: 'success' });
  };

  // form submission failed
  type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
  const [messageApi, contextHolder] = message.useMessage();
  const onFinishFailed = (
    _errorInfo?: any,
    messgae?: { content: string; type: NoticeType },
  ) => {
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
      wrapperCol={{ span: 20 }}
      style={{ width: '400px' }}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
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
              console.log(getFieldValue('password'), value);

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

      <Form.Item label="Nickname" >
        <Form.Item
          name="nickname"
          noStyle
          rules={[{ required: true, message: 'Please input the nickname you got!' }]}
        >
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