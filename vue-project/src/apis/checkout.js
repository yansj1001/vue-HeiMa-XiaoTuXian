import httpInstance from "@/utils/http";

//封装获取信息的接口
export const getCheckInfoAPI = () => {
    return httpInstance({
        url:'/member/order/pre'
    })
}

//创建订单的接口
export const createOrderAPI = (data) => {
    return httpInstance({
        url:'/member/order',
        method:'POST',
        data
    })
}