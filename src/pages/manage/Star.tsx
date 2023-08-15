import {useTitle} from "ahooks";
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListComponent from '@/components/List';

interface Item {
  id: number;
  isStar: boolean;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}
const Star = () => {
  useTitle("小木问卷 - 星标问卷");

  const {data={},loading} = useLoadQuestionListData({isStar:true})
  const {list ={},total=0} = data
  console.log(list)
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
   </div>
  );
};
export default Star;