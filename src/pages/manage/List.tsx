import ListCompoment from '@/components/List';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';
import questionAPI from '@/api/questionAPI'
// import { useRequest } from 'ahooks'
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
  const [searchParams] = useSearchParams();
  // const queryUrl = searchParams.get('page') || 1
  const [loading,setLoading] = useState(true)
  const [json,setJson] = useState(Object)

  function getData(obj?:object){
    setLoading(true)
    questionAPI.getQuestionnaireList(obj).then(res => {
      console.log(res)
      setJson(res.data)
      setLoading(false)
      return res
    })
  }
  useEffect(()=>{
    getData()
  },[])

  const nav = useNavigate();
  function editJump(id: number) {
    nav(`/question/edit/${id}`);
  }
  function statJump(id: number) {
    nav(`/question/stat/${id}`);
  }

  function paginationChange(page:number,pageSize:number){
    nav({
      search:[`page=${page}`,`pageSize=${pageSize}`].join('&'),
    })
    getData({page,pageSize})
  }
  return (
    <div >
     {loading && <div className="loader"></div>}
      {!loading &&
        json.list.map((item: Item) => {
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
      {!loading && 
      <Pagination style={{padding:'30px 0 300px',textAlign: 'center'}} onChange={paginationChange} defaultCurrent={json.page} total={json.total} pageSize={json.pageSize} />}
    </div>
  );
};
export default List;
