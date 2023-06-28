import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from 'antd'

const MainLayout: FC = () => {
  return (
    <>
      <div>
        MainLayout
        <Button type="primary">Button</Button>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        MainFooter
      </div>

    </>
  )
}
export default MainLayout