import {
  Typography,
  Space,
  Button,
  Checkbox,
  Form,
  Input,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const { Title } = Typography;
import style from "./Home.module.scss";
const Login = () => {
  // const [form] = Form.useForm();
  // useEffect(() => {
  // 密码还原
  return (
    <div className={style.login}>
      <Space>
        <Title>
          <UserAddOutlined />
        </Title>
        <Title>User Login</Title>
      </Space>
      <div>
        <FormInput />
      </div>
    </div>
  );
};

const FormInput = () => {
  // form submission finish
  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const { username, password, remember } = values;
    if (remember) {
      // 密码加密
      const passwordBase64 = btoa(password);
      localStorage.setItem(
        "USER_INFO",
        JSON.stringify({ username, passwordBase64 })
      );
    }
    onFinishFailed({},{content:"登录成功",type:"success"});
  };

  /*   const [messageApi, contextHolder] = message.useMessage();
  const onFinishFailed = (
    _errorInfo?: object,
    messgae?: { content: string,type: string }
    ) => {
      if(message)return{
        
      }
      console.log("Failed:", _errorInfo);
    };
    */
  // form submission failed
  type NoticeType = "info" | "success" | "error" | "warning" | "loading";
  const [messageApi, contextHolder] = message.useMessage();
  const onFinishFailed = (
    _errorInfo?: object,
    messgae?: { content: string; type: NoticeType }
  ) => {
    if (messgae) {
      return messageApi.open({
        type: messgae.type || "error",
        content: messgae.content || "",
      });
    }
    console.log("Failed:", _errorInfo);
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
      {contextHolder}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox style={{ userSelect: "none" }}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to="/register" style={{ fontSize: "12px" }}>
            Register new user
          </Link>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default Login;
