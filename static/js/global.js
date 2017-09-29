window.url = 'http://10.200.188.92'

window.driverType = ''

window.webSocket = ''
//        服务端地址
// var address = 'ws://10.200.188.92:8902'
var address = 'ws://127.0.0.1:8902'
//        实例化WebSocket对象
window.webSocket = new WebSocket(address)

// 对象转成字符串
var encode = function (val) {
  return val === undefined || typeof val === 'function' ? val + '' : JSON.stringify(val)
}

// 字符串转对象
const decode = function (val) {
  return val === undefined || val === '' || typeof val === 'function' ? val + '' : JSON.parse(val)
}
