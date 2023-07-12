import ListCompoment from '@/components/List';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import questionAPI from '@/api/questionAPI'
import { useRequest } from 'ahooks'
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
  const { loading, data: json } = useRequest(() => {
    return questionAPI.getQuestionnaireList().then(res => {
      console.log(res)
      return res
    })
  })
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
