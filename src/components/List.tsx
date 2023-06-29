import { FC, useEffect, useState } from "react";
import { Divider, Button, Space,Tag } from "antd";
import { EditOutlined, DotChartOutlined, DeleteOutlined, CopyOutlined, StarOutlined } from "@ant-design/icons";
import style from "./List.module.scss";
type Props = {
  _id: number
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount?: number;
  createdAt?: string
  onClickEdit: () => void;
  onClickStat: () => void;
};
const Demo: FC<Props> = ({ title, isPublished, isStar, _id, onClickEdit, onClickStat }) => {
  // 获取当前日期和时间
  const time = new Date().toLocaleString();
  return (
    <div className={style.list} >
      <div className={style.header}>
        <span>
          {/* StarOutlined修改红色 */}
          <Space>
            {title}
            {isStar ? <StarOutlined style={{ color: "red" }} /> : ''}
          </Space>
        </span>
        <div>
          <span style={{ marginRight: '5px' }}>{!isPublished ? <Tag>未发布</Tag> :<Tag color="#87d068">已发布</Tag>}</span>
          <span>答卷:0 {time}</span>
        </div>
      </div>
      <Divider style={{ border: 'none' }} />
      <div className={style.cardFoot}>
        <div style={{ flex: 6 }}>
          <Button type="text" icon={<EditOutlined />} onClick={onClickEdit}>编辑问卷</Button>
          <Button type="text" icon={<DotChartOutlined />} onClick={onClickStat} disabled={!isPublished}>问卷统计</Button>
        </div>
        <div
          style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
        >
          <Button type="text" icon={<StarOutlined />} size="small">{!isStar ? "标星" : "取消标星"}</Button>
          <Button type="text" icon={<CopyOutlined />} size="small">复制</Button>
          <Button type="text" icon={<DeleteOutlined />} size="small">删除</Button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
