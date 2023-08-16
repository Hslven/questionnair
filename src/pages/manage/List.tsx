import ListComponent from '@/components/List';
import { useNavigate} from 'react-router-dom';
// import { Pagination } from 'antd';
import { useTitle } from 'ahooks'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
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
  useTitle("小木问卷 - 我的问卷");

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

  
  
  // const {json = {},loading} = useRequest(questionAPI.getQuestionListService)
  // const { list = [], total = 0 } = json;
  
  // const [json,setJson] = useState(Object)
  // const [total,setTotal] = useState(0)
  // const [loading,setLoading] = useState(true)
  const {data={},loading} = useLoadQuestionListData({})
  const {list ={},total=0} = data
  
  return (
    <div style={{paddingBottom:'80px'}}>
     {loading && <div className="loader"></div>}
      {!loading &&
        list.map((item: Item) => {
          return (
            <ListComponent
              key={item.id}
              {...item}
              // onClickEdit={() => editJump(item.id)}
              // onClickStat={() => statJump(item.id)}
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
