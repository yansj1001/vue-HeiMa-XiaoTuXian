import httpInstance from "@/utils/http";
export function getDetailsAPI(id){
    return httpInstance({
        url:'/goods',
        params:{
            id
        }
    })
}