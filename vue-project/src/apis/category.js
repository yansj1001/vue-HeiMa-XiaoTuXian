import httpInstance from "@/utils/http";
export function getCateAPI(id){
    return httpInstance({
        url:'/category',
        params:{
            id
        }
    })
}