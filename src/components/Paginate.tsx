import React,{FC,useEffect,useState} from 'react';
import {Pagination} from 'antd';
import {LIST_PAGE_SIZE,LIST_PAGE_PARAM_KEY,LIST_PAGESIZE_PARAM_KEY} from '@/constant/index'
import { useSearchParams,useNavigate,useLocation } from 'react-router-dom';

type PropsType = {
  total: number;
}

const Paginate:FC<PropsType> = (props:PropsType)=> {
  const {total} = props;
  const [current,setCurrent] = useState(1)
  const [pageSize,setPageSize] = useState(LIST_PAGE_SIZE)

  const [searchParams] = useSearchParams()

  // 监听url变化修改分页
  useEffect(()=>{
    // 转成数字
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)

    const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY)|| '') || LIST_PAGE_SIZE
    setPageSize(pageSize)

  },[searchParams])

  const nav = useNavigate()
  const {pathname} = useLocation()
  // 点击分页执行功能
  function pageChangeHandle(page:number,pageSize:number){
    setCurrent(page)
    setPageSize(pageSize)
    searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
    searchParams.set(LIST_PAGESIZE_PARAM_KEY,pageSize.toString()) 
    
  nav({
    pathname,
    // search:`page=${page}pageSize=${pageSize}`
    search:searchParams.toString()
  })    

  }

  return (
    <div>
      <Pagination current={current} pageSize={pageSize} total={total} onChange={pageChangeHandle}/>
    </div>
  );
}

export default Paginate;
