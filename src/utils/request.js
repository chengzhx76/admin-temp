import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

import { Notice } from 'iview';

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // console.log('----------request/request----------');
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  }, error => {
    console.log(error)
    Promise.reject(error)
  });

service.interceptors.response.use(
  response => {
    // console.log('----------request/response----------');
    // console.log(response);
    const res = response.data.meta;
    if (res.code !== 200) {
      Notice.error({
        title: '请求发生错误',
        desc: res.msg
      });
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error)
    Notice.error({
      title: '网络请求错误'
    });
    return Promise.reject(error)
  }
)

export default service
