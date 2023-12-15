import request from "../utils/request";
export default function menu(data) {
    const url = `/api/app/ErpMenu/ErpMenuInformation`;
    return request({
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      data: data.reloIdKeyS,
      params: {
        sysKey: data.sysKey,
        isAll: data.isAll
      }
    });
  }