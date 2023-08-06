import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from 'antd';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { LIST_SEARCH_PARAM_KEY } from '@/constant/index';
import style from './Components.module.scss';

interface SearchProps {
  onClick: () => void;
}

const Search: React.FC<SearchProps> = ({ onClick }) => {
  // Search button event
  const [value, setValue] = useState<string>('');
  // Clear button event
  const [visible, setVisible] = useState<boolean>(false);
  const searchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clearSearchValue = (_: React.MouseEvent<HTMLSpanElement>) => {
    setValue('');
    nav(pathname)

  };
  // 搜索按钮点击添加查询参数
  const nav = useNavigate();
  const { pathname } = useLocation();

  const searchHandle = () => {
    // 没有搜索内容则返回
    // if (!value) {
    //   return nav(pathname);
    // }
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };


  // 获取url参数，并设置到input
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log(1)
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);

  // 监听是否显示清空按钮
  useEffect(() => {
    if (value === '') {
      // nav(pathname)
      setVisible(false);
    }
    if (value) {
      setVisible(true);
    }
  }, [value]); // 依赖于visible,只有visible变化时才执行


  useEffect(() => {
    const keyHandle = (e: KeyboardEvent) => {
      // 监听enter建查询
      if (e.key === 'Enter') {
        searchHandle();
      }
      // 监听esc键清空输入框
      if (e.key === 'Escape') {
        setValue('');
      }
    };
    document.addEventListener('keydown', keyHandle);
    return () => {
      document.removeEventListener('keydown', keyHandle);
    };
  }); // 这里不用改变，还是要把keyHandle作为依赖项


  return (<div className={style.search}>
    <input placeholder="Searth the internet..." type="text" onChange={searchValueChange} className={style.input} value={value} />
    <Button icon={<SearchOutlined />} className={style.searchIcon} onClick={searchHandle} />
    {visible && <CloseCircleOutlined className={style.clearIcon} onClick={clearSearchValue} />}
  </div>);
};

export default Search;