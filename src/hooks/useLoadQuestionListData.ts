import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import {LIST_SEARCH_PARAM_KEY} from '@/constant/index'
import api from '@/api/questionAPI'

type OptionType = {
    isStar:boolean
    isDelete:boolean
}
function useLoadQuestionListData(opt:Partial<OptionType>={}){
    const {isStar,isDelete} = opt
    const [searchParams] = useSearchParams()
    const {data,loading,error} = useRequest(async ()=>{
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        const data = await api.getQuestionListService({keyword,isStar,isDelete})
        return data
    },
    {
        // 当searchParams变动后发生请求
        refreshDeps:[searchParams] //刷新的依赖项
    })
    return {data,loading,error}
}
export default useLoadQuestionListData