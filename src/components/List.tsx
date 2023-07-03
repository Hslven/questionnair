import { Divider, Button, Space, Tag, message, Modal, Pagination } from "antd"; 
import { useState } from "react";
import {
  EditOutlined,
  DotChartOutlined,
  DeleteOutlined,
  CopyOutlined,
  StarOutlined,
} from "@ant-design/icons";
import style from "./Components.module.scss";
type Props = {
  _id: number;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount?: number;
  createdAt?: string;
  onClickEdit: () => void;
  onClickStat: () => void;
};
const Demo: React.FC<Props> = (props) => {
  // 获取当前日期和时间
  return (
    <div className={style.list}>
      <Head {...props}></Head>
      <Divider style={{ border: "none" }} />
      <Footer {...props}></Footer>
    </div>
  );
};

const Head: React.FC<Props> = ({ title, isStar, isPublished }) => {
  const time = new Date().toLocaleString();
  return (
    <div className={style.header}>
      <span>
        <Space>
          {title}
          {isStar ? <StarOutlined style={{ color: "red" }} /> : ""}
        </Space>
      </span>
      <div>
        <span style={{ marginRight: "5px" }}>
          {!isPublished ? <Tag>未发布</Tag> : <Tag color="#87d068">已发布</Tag>}
        </span>
        <span>答卷:0 {time}</span>
      </div>
    </div>
  );
};

const Footer = ({ onClickEdit, onClickStat, isPublished, isStar }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "复制成功",
      duration: 3,
    });
  };
  return (
    <div className={style.cardFoot}>
      <div style={{ flex: 6 }}>
        <Button type="text" icon={<EditOutlined />} onClick={onClickEdit}>
          编辑问卷
        </Button>
        <Button
          type="text"
          icon={<DotChartOutlined />}
          onClick={onClickStat}
          disabled={!isPublished}
        >
          问卷统计
        </Button>
      </div>
      <div
        style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Button type="text" icon={<StarOutlined />} size="small">
          {!isStar ? "标星" : "取消标星"}
        </Button>
        <Button
          onClick={success}
          type="text"
          icon={<CopyOutlined />}
          size="small"
        >
          复制
        </Button>
        <Button
          onClick={showModal}
          type="text"
          icon={<DeleteOutlined />}
          size="small"
        >
          删除
        </Button>
      </div>
      {contextHolder}
      <Modal
        title="删除提醒"
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            返回
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleOk}>
            删除
          </Button>,
        ]}
      >
        该选项会把问卷彻底删除，是否确定？
      </Modal>
    </div>
  );
};

export default Demo;
