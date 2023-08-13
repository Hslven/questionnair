import ListCompoment from '@/components/List';
import { useNavigate,useSearchParams } from 'react-router-dom';
// import { Pagination } from 'antd';
import questionAPI from '@/api/questionAPI'
import { useRequest } from 'ahooks'
import {useEffect,useState}from 'react'
interface Item {
  id: number;
  isStar: boolean;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}
const List = () => {
  // const json: Array<Item>
  // 获取路由查询参数
  // const [searchParams] = useSearchParams();
  // const queryUrl = searchParams.get('page') || 1
  // 跳转
  const nav = useNavigate();
  function editJump(id: number) {
    nav(`/question/edit/${id}`);
  }
  function statJump(id: number) {
    nav(`/question/stat/${id}`);
  }

  // 获取数据
  // console.log(data)
  // const {list=[],total=0} = data

  const [json,setJson] = useState(Object)
  const [total,setTotal] = useState(0)
  const [loading,setLoading] = useState(true)

  
  // const {data,loading} = useRequest(questionAPI.getQuestionListService)
  // const { list = [], total = 0 } = data;

  useEffect(()=>{
    async  function getData(){
      setLoading(true)
      const data = await questionAPI.getQuestionListService()
      console.log(data)
      const {list=[],total=0} = data
      setJson(list)
      setLoading(false)
      setTotal(total)
      return data
    }
    getData()
  },[])
 
  // 分页
  // function paginationChange(page:number,pageSize:number){
    // nav({
    //   search:[`page=${page}`,`pageSize=${pageSize}`].join('&'),
    // })
    // getData({page,pageSize})
  // }
  
  return (
    <div style={{paddingBottom:'80px'}}>
     {loading && <div className="loader"></div>}
      {!loading &&
        json.map((item: Item) => {
          return (
            <ListCompoment
              key={item.id}
              _id={item.id}
              isStar={item.isStar}
              title={item.title}
              isPublished={item.isPublished}
              onClickEdit={() => editJump(item.id)}
              onClickStat={() => statJump(item.id)}
            />
          );
        })
      }
      {/* {!loading && 
      <Pagination style={{padding:'30px 0 300px',textAlign: 'center'}}  defaultCurrent={json.page} total={json.total} pageSize={json.pageSize} />} */}
    </div>
  );
};
export default List;
