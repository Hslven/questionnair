import { FC, useEffect, useState } from "react";
import style from "./List.module.scss";
type Props = {
  title?: string;
  isPublic?: boolean;
};

const questionCard: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const Demo: FC<Props> = ({ title = "null", isPublic = false }) => {
  // 获取当前日期和时间
  const time = new Date().toLocaleString();
  return (
    <div className={style.list}>
      <div className={style.header}>
        <span>
          {title} {time}
        </span>
        <div>
          {!isPublic ? <p>未发布</p> : <p>已发布</p>}
          <span>答卷:0 {time}</span>
        </div>
      </div>
      <hr />
      <div style={questionCard}>
        <div style={{ flex: 6 }}>
          <button>编辑问卷</button>
          <span>数据统计</span>
        </div>
        <div
          style={{ flex: 1, display: "flex", justifyContent: "space-between" }}
        >
          <p>标星</p>
          <p>复制</p>
          <p>删除</p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
