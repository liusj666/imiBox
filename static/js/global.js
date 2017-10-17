window.driverType = ''

window.webSocket = ''
//        服务端地址
// var address = 'ws://10.200.188.60:8902'
var address = 'ws://127.0.0.1:8902'
//        实例化WebSocket对象
window.webSocket = new WebSocket(address)

// 对象转成字符串
window.encode = function (val) {
  return val === undefined || typeof val === 'function' ? val + '' : JSON.stringify(val)
}

// 字符串转对象
window.decode = function (val) {
  return val === undefined || val === '' || typeof val === 'function' ? val + '' : JSON.parse(val)
}

window.onunload = function () {
  this.$axios.get('box/logout').then(response => {
    window.clearCookie('_ncfa')
    // success callback
  }, response => {
    // error callback
  })
}

window.setCookie = function (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}

window.clearCookie = function (name) {
  window.setCookie(name, '', -1)
}
