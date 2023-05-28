import httpInstance from "@/utils/http";

//获取订单详情的接口
export const getOrderAPI = (id) => {
    return httpInstance({
        url:`/member/order/${id}`
    })
}

//获取我的订单
/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/


export const getUserOrderAPI = (params) => {
    return httpInstance({
      url:'/member/order',
      method:'GET',
      params
    })
  } 