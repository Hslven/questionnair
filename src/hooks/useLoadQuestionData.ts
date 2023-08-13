// import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import questionAPI from '@/api/questionAPI'
import { useRequest } from "ahooks";


const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  // const [questionData, setQuestionData] = useState(Object)
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   questionAPI.singleQuestionnaire({id}).then(res => {
  //     setQuestionData(res.data)
  //     setLoading(false)
  //   })
  // }, [])
  const load= async ()=>{
    const data = await questionAPI.getQuestionService(id)
    // return questionAPI.getQuestionService(id).then(res => {
      console.log(data,123124);
      // console.log(res.data);
    return data
    // })
  }
  const {loading,error,data}= useRequest(load)
    // return questionAPI.getQuestionService(id).then(res => {
    //   // console.log(res.data);
    //   return res.data
    // })
  
  return {loading, error,data}
}
export default useLoadQuestionData