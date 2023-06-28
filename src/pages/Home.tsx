import style from './Home.module.scss'
import List from '@/components/List'
import { useNavigate } from 'react-router-dom'

function Home() {
  const nav = useNavigate()
  function ClickHandle() {
    nav('/manageLayout/list')
  }

  return (
    <button onClick={ClickHandle}>登录</button>
  )
  // const inputRef = useRef<HTMLInputElement>(null)
  // const json = [
  //   { title: '新建卷1', isPublic: false },
  //   { title: '新建卷2', isPublic: true },
  //   { title: '新建卷3', isPublic: false },
  //   { title: '新建卷4', isPublic: true },
  // ]
  // function handleSearch() {
  //   // 如果空值，就聚焦
  //   if (!inputRef.current?.value) return inputRef.current?.focus()
  // }
  // return (
  //   <div className={style.app}>
  //     <div className={style.header}>
  //       <h2 style={{ margin: '0', color: '#000' }}>我的♨问卷</h2>
  //       <div>
  //         <input ref={inputRef} style={{ height: '2rem' }} type="text" name="" placeholder='请输入标题...' id="" />
  //         <button onClick={handleSearch}>搜索</button>
  //       </div>
  //     </div>
  //     <div className={style.contain}>
  //       {json.map(({ title, isPublic }, index) => {
  //         return <List title={title} isPublic={isPublic} key={index}></List>
  //       })}
  //     </div>
  //     <div className={style.footer}>

  //     </div>
  //   </div>
  // )
}

export default Home
