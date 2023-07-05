import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Space, Divider } from "antd";
import {
  PlusOutlined,
  StarOutlined,
  AlignLeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Search from '@/components/Search'

const manageSide: React.CSSProperties = {
  backgroundColor: "rgba(0,0,0,0)",
  // 居中
  display: "flex",
  justifyContent: "center",
  padding: "1.25rem 0",
};
const manageContentTitle: React.CSSProperties = {
  padding: '0 0.625rem',
  color: '#000',
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1.25rem",
}
const ManageLayout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [headText, setHeadText] = useState('我的问卷')
  function jump(URL: string) {
    nav(URL);
    switch (URL) {
      case "list":
        setHeadText('我的问卷')
        break;
      case "star":
        setHeadText('星标问卷')
        break;
      case "trash":
        setHeadText('回收站')
        break;
      default:
        break;
    }
  }
  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider width={250} style={manageSide}>
        <Space direction="vertical">
          <Button type="primary" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ border: "none", margin: "0.9375rem 0" }} />
          <Button
            onClick={() => jump("list")}
            type={pathname.includes("list") ? "default" : "text"}
            icon={<AlignLeftOutlined />}
          >
            我的问卷
          </Button>
          <Button
            onClick={() => jump("star")}
            type={pathname.includes("star") ? "default" : "text"}
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            onClick={() => jump("trash")}
            type={pathname.includes("trash") ? "default" : "text"}
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </Layout.Sider>
      <Layout.Content style={{ padding: "1.25rem 1.25rem" }}>
        <div style={manageContentTitle}>
          <span>{headText}</span>
          <Search></Search>
        </div>
        <Outlet></Outlet>
      </Layout.Content>
    </Layout>
  );
};
export default ManageLayout;