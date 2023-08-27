import { Divider, Button, Space, Tag, message, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { EditOutlined, DotChartOutlined, DeleteOutlined, CopyOutlined, StarOutlined } from '@ant-design/icons';
import style from './Components.module.scss';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import api from '@/api/questionAPI';
type Props = {
  id: number;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount?: number;
  createdAt?: string;
  [key: string]: any;
};

const Demo: React.FC<Props> = (props) => {
  // 保存组件中传过来的isStar
  const [demoIsStarState, setDemoIsStarState] = useState(false);
  const handleStarStateChanged = (val) => {
    setDemoIsStarState(val);
  };
  // 保存组件中换过来的isDelete
  const [demoIsDelete, setDemoIsDelete] = useState(false);
  const handleDeleteStateChanged = (val) => {
    setDemoIsDelete(val);
  };
  //在星标问卷，同步isStar和demoIsStarState
  useEffect(() => {
    handleStarStateChanged(props.isStar);
  }, [props.isStar]);

  // 已经删除的卡片不渲染
  if (demoIsDelete) return null;
  // 获取当前日期和时间
  return (
    <div className={style.list}>
      <Head {...props} demoIsStarState={demoIsStarState} />
      <Divider style={{ border: 'none' }} />
      <Footer
        {...props}
        onStarStateChanged={handleStarStateChanged}
        handleDeleteStateChanged={handleDeleteStateChanged}
      />
    </div>
  );
};

const Head: React.FC<Props> = ({ title, isPublished, demoIsStarState }) => {
  const time = new Date().toLocaleString();
  return (
    <div className={style.header}>
      <span>
        <Space>
          {title}
          {demoIsStarState ? <StarOutlined style={{ color: 'red' }} /> : ''}
        </Space>
      </span>
      <div>
        <span style={{ marginRight: '0.3125rem' }}>
          {!isPublished ? <Tag>未发布</Tag> : <Tag color="#87d068">已发布</Tag>}
        </span>
        <span>答卷:0 {time}</span>
      </div>
    </div>
  );
};
const Footer = ({ handleDeleteStateChanged, onStarStateChanged, isPublished, isStar, id }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();
  const [isStarState, setIsStarState] = useState(isStar);

  const { loading, run: changeStar } = useRequest(
    async () => api.updateQuestionService(id + '', { isStarState: !isStarState }),
    {
      manual: true,
      onSuccess: () => {
        onStarStateChanged(!isStarState);
        setIsStarState(!isStarState);
      },
    },
  );
  const { run: duplicate } = useRequest(async () => api.duplicateQuestionService(id + ''), {
    manual: true,
    onSuccess: (result) => {
      messageApi.success('复制成功');
      console.log(result);
      nav({
        pathname: `/question/edit/${result.id}`,
      });
    },
  });

  // const [isDelete, setIsDelete] = useState(false);
  const { run: deleteQuestion } = useRequest(async () => api.updateQuestionService(id + '', { isDelete: true }), {
    manual: true,
    onSuccess: () => {
      setIsModalOpen(false);
      handleDeleteStateChanged(true);
      message.success('删除成功');
    },
  });

  return (
    <div className={style.cardFoot}>
      <div style={{ flex: 6 }}>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            console.log(123);
          }}
        >
          编辑问卷
        </Button>
        <Button type="text" icon={<DotChartOutlined />} disabled={!isPublished}>
          问卷统计
        </Button>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="text" icon={<StarOutlined />} size="small" onClick={() => changeStar()} disabled={loading}>
          {!isStarState ? '标星' : '取消标星'}
        </Button>
        <Button onClick={duplicate} type="text" icon={<CopyOutlined />} size="small">
          复制
        </Button>
        <Button onClick={() => setIsModalOpen(true)} type="text" icon={<DeleteOutlined />} size="small">
          删除
        </Button>
      </div>
      {/* 消息提示 */}
      {contextHolder}
      <Modal
        title="删除提醒"
        open={isModalOpen}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            返回
          </Button>,
          <Button key="delete" type="primary" danger onClick={deleteQuestion}>
            删除
          </Button>,
        ]}
      >
        是否确定放入回收站？
      </Modal>
    </div>
  );
};

export default Demo;
