import axios from 'axios';
import { MessageBox } from 'element-ui';

const instance = axios.create({
  baseURL: "http://localhost:44376/",
  timeout: 50000
});

instance.interceptors.request.use(
  function (config) {
    config.headers.token = '123456';
    config.headers.info = 'lxy';
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    const res = response.data;
    if (response.status === 500) {
      MessageBox.alert('系统未登录，请重新登录', '错误', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        // 处理重新登录的逻辑
      });
      return Promise.reject(new Error('系统未登录，请重新登录'));
    } else if (res.errno === 502) {
      MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
        confirmButtonText: '确定',
        type: 'error'
      });
      return Promise.reject(new Error('系统内部错误，请联系管理员维护'));
    }
    return res;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export function get(url, params) {
  return instance.get(url, { params });
}

export function post(url, data) {
  return instance.post(url, data);
}

export default instance;