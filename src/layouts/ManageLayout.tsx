import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Button, Space, Divider } from 'antd';
import {
  PlusOutlined,
  StarOutlined,
  AlignLeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Search from '@/components/Search'
import questionAPI from '@/api/questionAPI';
import { useRequest } from 'ahooks'

const manageSide: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0)',
  // 居中
  display: 'flex',
  justifyContent: 'center',
  padding: '1.25rem 0',
};
const manageContentTitle: React.CSSProperties = {
  padding: '0 0.625rem',
  color: '#000',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1.25rem',
};
const ManageLayout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [headText, setHeadText] = useState('我的问卷')
  // Jump the corresponding page to modify the head text as the corresponding text
  function jump(URL: string) {
    nav(URL);
    switch (URL) {
      case 'list':
        setHeadText('我的问卷');
        break;
      case 'star':
        setHeadText('星标问卷');
        break;
      case 'trash':
        setHeadText('回收站');
        break;
      default:
        break;
    }
  }
  // Click the new questionnaire jump to the new questionnaire editing page
  // const [isDisabled, setIsDisabled] = useState(false)
  // function handleToNewQuestionnaire() {
  //   setIsDisabled(true)
  //   questionAPI.newQuestionnaire().then(res => {
  //     const { id } = res.data
  //     if (res.error === 0) {
  //       nav(`/question/edit/${id}`)
  //     }
  //     setIsDisabled(false)
  //   })
  // }
  const { loading:isDisabled, run: handleToNewQuestionnaire} = useRequest(questionAPI.newQuestionnaire, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      const { id } = res.data
      if (res.error === 0) {
        nav(`/question/edit/${id}`)
      }
    }
  })
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider width={250} style={manageSide}>
        <Space direction="vertical">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleToNewQuestionnaire} disabled={isDisabled}>
            新建问卷
          </Button>
          <Divider style={{ border: 'none', margin: '0.9375rem 0' }} />
          <Button
            onClick={() => jump('list')}
            type={pathname.includes('list') ? 'default' : 'text'}
            icon={<AlignLeftOutlined />}
          >
            我的问卷

          </Button>
          <Button
            onClick={() => jump('star')}
            type={pathname.includes('star') ? 'default' : 'text'}
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            onClick={() => jump('trash')}
            type={pathname.includes('trash') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </Layout.Sider>
      <Layout.Content style={{ padding: '1.25rem 1.25rem' }}>
        <div style={manageContentTitle}>
          <span>{headText}</span>
          <Search />
        </div>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
export default ManageLayout;