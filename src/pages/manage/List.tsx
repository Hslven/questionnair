import ListCompoment from '@/components/List';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';
import questionAPI from '@/api/questionAPI'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
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
  const queryUrl = searchParams.get('query')
  const [loading,setLoading] = useState(true)
  const [json,setJson] = useState(Object)
  useEffect(()=>{
    setLoading(true)
    questionAPI.getQuestionnaireList({query:queryUrl || ''}).then(res => {

      setJson(res)
      setLoading(false)
      return res
    })
  },[queryUrl])

  // useEffect(() => {
  //   run()
  // }, [queryUrl])
  // , {
  //   onSuccess: (result) => {
  //     console.log(result)
  //   },
  // })



  const nav = useNavigate();
  function editJump(id: number) {
    nav(`/question/edit/${id}`);
  }
  function statJump(id: number) {
    nav(`/question/stat/${id}`);
  }

  return (
    <>
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
      {!loading && <div><Pagination defaultCurrent={1} total={json.total} pageSize={json.pageSize} style={{ textAlign: 'center' }} /></div>}
    </>
  );
};
export default List;
