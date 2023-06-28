import { RouterProvider } from 'react-router-dom'
import routerConfig from '@/router'
import { Button, ConfigProvider } from 'antd';


function App() {
  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>

        <RouterProvider router={routerConfig} />
      </ConfigProvider>
    </>

  )
}

export default App
