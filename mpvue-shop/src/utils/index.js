function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 封装请求
const host = 'http://localhost:3001/web/api'
export {
  host
}

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中...'
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: method,
      success: (result) => {
        wx.hideLoading();
        resolve(result.data)
      },
      fail: (err) => {
        wx.hideLoading();
        reject(err)
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  });
}
export function get(url, data) {
  return request(url, 'get', data)
}
export function post(url, data) {
  return request(url, 'post', data);
}

export default {
  formatNumber,
  formatTime
}
