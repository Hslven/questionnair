// import { useEffect,useState } from "react";
import {useParams} from 'react-router-dom'
import questionAPI from '@/api/questionAPI'
import { useRequest } from "ahooks";
// import useLoadQuestionData from '@/hooks/useLoadQuestionData'
const Edit = () => {
  // const {loading , data} = useLoadQuestionData()
  // const {id = ''} = useParams()
  // const [questionData,setQuestionData] = useState(Object)
  // const [loading,setLoading] = useState(true)
  // useEffect(() => {
  //   questionAPI.singleQuestionnaire({id}).then(res => {
  //     setQuestionData(res.data)
  //     setLoading(false)
  //   })
  // },[])
  const { id = '' } = useParams()

  const load= ()=>{
    return questionAPI.getQuestionnaireList({id}).then(res => {
      console.log(res.data);
      return res.data
    })
  }
  const {loading,error,data}= useRequest(load)
  return (
    <>
      <p>edit page</p>
       {loading ? 'loading':JSON.stringify(data)}
    </>
  );
};
export default Edit;