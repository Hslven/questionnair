import ListCompoment from '@/components/List';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
interface Item {
  id: number;
  isStar: boolean;
  title: string;
  isPublished: boolean;
}
const List = () => {
  // const json: Array<Item>
  const json: Item[] = [
    { id: 1, title: '问卷1', isStar: false, isPublished: false },
    { id: 2, title: '问卷2', isStar: true, isPublished: true },
    { id: 3, title: '问卷3', isStar: false, isPublished: false },
  ];
  const nav = useNavigate();
  function editJump(id: number) {
    nav(`/question/edit/${id}`);
  }
  function statJump(id: number) {
    nav(`/question/stat/${id}`);
  }

  return (
    <>
      {json.length > 0 &&
        json.map((item) => {
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
        })}
      <Pagination defaultCurrent={1} total={50} style={{ textAlign: 'center' }} />
    </>
  );
};
export default List;
