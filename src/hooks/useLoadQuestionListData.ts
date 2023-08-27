import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import {LIST_SEARCH_PARAM_KEY,LIST_PAGE_SIZE,LIST_PAGE_PARAM_KEY,LIST_PAGESIZE_PARAM_KEY} from '@/constant/index'
import api from '@/api/questionAPI'

type OptionType = {
    isStar:boolean
    isDelete:boolean
}
function useLoadQuestionListData(opt:Partial<OptionType>={}){
    const {isStar,isDelete} = opt
    const [searchParams] = useSearchParams()
    const {data,loading,error,refresh} = useRequest(async ()=>{
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        const page = searchParams.get(LIST_PAGE_PARAM_KEY || '') || 1
        const pageSize = searchParams.get(LIST_PAGESIZE_PARAM_KEY || '') || LIST_PAGE_SIZE
        const data = await api.getQuestionListService({keyword,isStar,isDelete,page,pageSize})
        return data
    },
    {
        // 当searchParams变动后发生请求
        refreshDeps:[searchParams] //刷新的依赖项
    })
    return {data,loading,error,refresh}
}
export default useLoadQuestionListData