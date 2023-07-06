import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Space, Typography } from "antd";
import style from "./Layout.module.scss";
import Title from "@/components/Title";
const { Header, Footer, Content } = Layout;
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  function loginJump() {
    navigate("/login");
  }

  return (
    <Layout className={style.mainLayout}>
      <Header style={{ zIndex: 9, overflow: "hidden" }}>
        <Space align="center" className={style.head}>
          {/* 艾卡问卷 */}
          <Title style={{ color: "#fff" }}></Title>
          <div onClick={loginJump} style={{ color: "#0092dc" }}>
            登录
          </div>
        </Space>
      </Header>
      <Content style={{ minHeight: "599px" }}>
        <Outlet />
      </Content>
      <Footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 9,
        }}
      >
        <Typography.Text>
          艾卡问卷 &nbsp; &copy;2023 - present. Created by <p>lven</p>
        </Typography.Text>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
