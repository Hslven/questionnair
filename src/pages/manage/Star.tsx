import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import ListComponent from '@/components/List';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useDebounceFn, useRequest } from 'ahooks';
import api from '@/api/questionAPI';
import { Empty } from 'antd';

interface Item {
  id: number;
  isStar: boolean;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}

const Star = () => {
  // const {data={},loading} = useLoadQuestionListData({isStar:true})
  // const {list ={},total=0} = data
  const [started, setStarted] = useState(false); // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    setList([]);
    setTotal(0);
    setPage(1);
    setStarted(false);
  }, [keyword]);

  // 执行加载接口
  const { run: load, loading } = useRequest(
    async () => {
      const data = await api.getQuestionListService({ isStar:true ,page, pageSize: 10, keyword: searchParams.get('keyword') || '' });
      return data;
    },
    {
      manual: true,
      onSuccess: (res) => {
        const { list: l = [], total = 0 } = res;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  const LoadMoreContentElm = useMemo(() => {
    if (!started || loading) return <div className="loader"></div>;
    if (total === 0 || !haveMoreData) return <Empty description="没有更多数据了"></Empty>;
    return <span>开始加载下一页</span>;
  }, [started, loading, total, haveMoreData]);

  const targetDom = useRef<HTMLInputElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const element = targetDom.current;
      console.log(element);
      if (element === null) return;
      const domRef = element.getBoundingClientRect();
      const { bottom } = domRef;
      console.log(bottom, window.innerHeight);
      if (bottom < window.innerHeight) {
        load();
        // setStarted(true)
      }
    },
    {
      wait: 500,
    },
  );
  useEffect(() => {
    tryLoadMore(); // 以确保事件监听后能立即触发。
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  return (
    <div>
      <div>
        {/* {loading && <div className="loader"></div>} */}
        {list.map((item: Item) => {
          return (
            <ListComponent
              key={item.id}
              {...item}
              // onClickEdit={() => editJump(item.id)}
              // onClickStat={() => statJump(item.id)}
            />
          );
        })}
        {/* {!loading &&<Paginate total={total} />} */}
      </div>
      <div ref={targetDom} style={{ color: '#000' }}>
        {LoadMoreContentElm}
      </div>
    </div>
  );
};
export default Star;
