import { useLocation, useParams, useSearchParams } from 'react-router-dom';
const Edit = () => {
  // console.log(useLocation(), 'useLocation')
  // console.log(useParams(), 'useParams')
  const [searchParams, setSearchParams] = useSearchParams();
  for (const [key, value] of searchParams.entries()) {
    console.log(`${value}`);
  }
  return (
    <>
      <h1>
        Edit
      </h1>
    </>
  );
};
export default Edit;