import request from '../utils/request'
export default function login(data) {
    debugger
    return request({
      url: "/api/app/Account/ErpSystematicLoginAccount",
      method: "get",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, //给接口添加请求头
      data,
      // post请求接口后面拼接参数
      params: data
    });
  }
