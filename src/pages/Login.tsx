import { Typography, Space, Button, Checkbox, Form, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
const { Title } = Typography;
import style from './Home.module.scss'
const Login = () => {
  return (
    <div className={style.login}>
      <Space>
        <Title><UserAddOutlined /></Title>
        <Title>Register new user</Title>
      </Space>
      <div>
        <FormInput />
      </div>
    </div>
  )
}
const FormInput = () => {
  const onFinish = (values: object) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 1200 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox style={{userSelect:'none'}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16}}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to='/register'>
            注册新用户
          </Link>
        </Space>
      </Form.Item>
    </Form>
  )

}
export default Login