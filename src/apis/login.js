import request from "../utils/request";
export default function login(data) {
  return request({
    url: "/api/app/Account/ErpSystematicLoginAccount",
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    params: data,
  });
}