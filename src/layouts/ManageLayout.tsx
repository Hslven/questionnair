import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Space, Divider } from "antd";
import {
  PlusOutlined,
  StarOutlined,
  AlignLeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const manageSide: React.CSSProperties = {
  backgroundColor: "rgba(0,0,0,0)",
  // 居中
  display: "flex",
  justifyContent: "center",
  padding: "20px 0",
};
const ManageLayout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  function jump(URL: string) {
    nav(URL);
  }
  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider width={250} style={manageSide}>
        <Space direction="vertical">
          <Button type="primary" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ border: "none", margin: "15px 0" }} />
          <Button
            onClick={()=>jump("list")}
            type={pathname.includes("list") ? "default" : "text"}
            icon={<AlignLeftOutlined />}
          >
            我的问卷
          </Button>
          <Button
            onClick={()=>jump("star")}
            type={pathname.includes("star") ? "default" : "text"}
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            onClick={()=>jump("trash")}
            type={pathname.includes("trash") ? "default" : "text"}
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </Layout.Sider>
      <Outlet></Outlet>
    </Layout>
  );
};
export default ManageLayout;
