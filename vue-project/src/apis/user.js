//封装用户相关的API
import httpInstance from "@/utils/http";
export const loginAPI = ({account,password}) => {
    return httpInstance({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}