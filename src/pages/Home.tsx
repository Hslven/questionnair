import style from './Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { Typography, Divider, Button } from 'antd'

const Home: React.FC = () => {
  const nav = useNavigate()
  function manageJump() {
    nav('/manage/list')
  }

  return (
    <div className={style.contain}>
      <Typography.Title level={2}>问卷调查 | 在线投票</Typography.Title>
      <Typography.Text >已累计创建问卷1090,发布问卷100份,收到答卷10000份</Typography.Text>
      <Divider style={{ border: 'none' }} />
      <Button type='primary' size="large" onClick={manageJump}>开始使用</Button>
      
    </div>
  )

}

export default Home
