import { Table, Tag, message, Modal } from 'antd';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import { useState, useEffect } from 'react';
// import Paginate from '@/components/Paginate'
import { Button, Space } from 'antd';
import { useRequest } from 'ahooks';
import api from '@/api/questionAPI';

const Trash = () => {
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDelete: true });
  const { list = [], total = 0 } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (_) => <Tag color={_ ? 'green' : 'red'}>{_ ? '已发布' : '未发布'}</Tag>,
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ];

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(list);
  }, [loading]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const onSelectChange = {
    selectedRowKeys,
    onChange: (val) => {
      setSelectedRowKeys(val);
    },
  };

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedRowKeys) {
        await api.updateQuestionService(id, { isDelete: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess: () => {
        message.success('恢复成功');
        setSelectedRowKeys([]);
        refresh(); //手动刷新
      },
    },
  );
  const {  run: deleteQuestion } = useRequest(async () => await api.deleteQuestionService(selectedRowKeys), {
    manual: true,
    debounceWait: 500, // 防抖
    onSuccess: (data) => {
      setIsModalOpen(false);
      console.log(data)
      message.success('删除成功');
      setSelectedRowKeys([]);
      refresh(); //手动刷新
    },
  });

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      {loading && <div className="loader"></div>}
      {!loading && (
        <Space direction="vertical" style={{ display: 'flex' }}>
          <Space>
            <Button type="primary" disabled={!hasSelected} onClick={recover}>
              恢复
            </Button>
            <Button danger disabled={!hasSelected} onClick={() => setIsModalOpen(true)}>
              彻底删除
            </Button>
          </Space>
          <Table rowSelection={onSelectChange} rowKey="id" dataSource={tableData} columns={columns} />
        </Space>
      )}
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
        该选项会把问卷彻底删除，是否确定？
      </Modal>
    </div>
  );
};
export default Trash;
