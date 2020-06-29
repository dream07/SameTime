import axios from 'axios'
import qs from 'qs'
// 引入基础参数文件  和  baseURL配置文件
// 默认的全局配置
axios.defaults.baseURL = 'https://store.galaxyhigh.cn'
axios.defaults.timeout = 10000
// 请求发送之前拦截，进行处理（根据业务需求进行拦截处理）
axios.interceptors.request.use(success => {
  return success
}, error => {
  return reject(error)
})
// then,catch处理之前，进行拦截处理（根据业务需求进行拦截处理）
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})
// 导出post请求
export function post (url, data, withBaseParams = false) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(res => successHandle(res, resolve))   // 将数据处理之后传给页面
      .catch(err => errorHandle(err, reject))
  })
}
// 导出get请求
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params,
      headers: {}
    })
      .then(res => successHandle(res, resolve))
      .catch(err => errorHandle(err, reject))
  })
}
// then处理执行了successHandle
function successHandle(data, resolve) {
  if (res.success && res.errorCode == '60000') {
    resolve(res)
  } else {
    // 弹出toast报错
    Toast({
      message: res.msg,
      duration: 2000
    })
  }
}
// catch处理执行了errorHandle
function errorHandle(err, reject) {
  reject(err)
}