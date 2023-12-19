import request from "../utils/request";

export default function getProduction(data) {
  debugger
  const url = `/api/app/productionMain/ProductionMains`;
  return request({
    url: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "get",
    params: data,
  });
}
