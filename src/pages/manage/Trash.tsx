import { Table, Tag } from 'antd';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import { useState, useEffect } from 'react';

const Trash = () => {

  const { data = {}, loading } = useLoadQuestionListData({ isDelete: true })
  const { list = [], total = 0 } = data
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',

    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (_) => (
        <Tag color={_ ? 'green' : 'red'}>
          {_ ? '已发布' : '未发布'}
        </Tag>
      )
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
    setTableData(list)
  }, [loading]);
  console.log(tableData)

  return (
    <div style={{ paddingBottom: '80px' }}>
      {loading && <div className="loader"></div>}
      {!loading && <Table rowSelection={{
        type: 'checkbox'
      }} rowKey="id" dataSource={tableData} columns={columns} />}

    </div>
  );
};
export default Trash;