import { RouterProvider } from 'react-router-dom'
import routerConfig from '@/router'
import { ConfigProvider } from 'antd';
import React, { useEffect } from "react";

function App() {

  function updateFontSize() {
    // 获取设备的宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    // 设置宽度
    // 按750计算（普遍是750），超出也按750适配
    if (deviceWidth >= 1980) deviceWidth = 1980;
    if (deviceWidth <= 320) deviceWidth = 320;
    // 设置rem
    // 750px --> 1rem = 75px,375px --> 1rem = 37.5px
    document.documentElement.style.fontSize = deviceWidth / 10 + "px";

    // 设置字体大小
    // 0.3 * 37.5 = 15px
    document.querySelector("body")!.style.fontSize = "0.3rem";
    console.log("rem", document.documentElement.style.fontSize)
  }

  // 在组件挂载时添加事件监听器
  // useEffect(() => {
  //   // window.addEventListener("resize", updateFontSize);
  //   return () => {
  //     window.removeEventListener("resize", updateFontSize);
  //   };
  // }, []);
  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <RouterProvider router={routerConfig} />
      </ConfigProvider>
    </>
  )
}

export default App
