const fs = require('fs')
const path = require('path')
const express = require('express');  
const wechat = require('wechat');  
const wechatApi = require('wechat-api')
const sha1 = require('sha1')
const request = require('request')
  
const config = require('./config.js')

const router = express.Router();  
const api = new wechatApi(config.appId, config.appSecret)

var menu = fs.readFileSync(path.resolve(__dirname, './menu.json'));  
if(menu) {  
  menu = JSON.parse(menu);
  api.createMenu(menu, function (a, b) {
  	console.log(a)
  	console.log(b)
  })
}

router.use(express.query());
router.post('/', wechat(config, wechat.text(function(message, req, res, next) {  
    console.log(message);
    if (message.Content === '1') {
        res.reply('hehe');
    }  
})));

router.get('/jssdk', (req, res) => {
	const grant_type = 'client_credential'
	const appid = config.appId
	const secret = config.appSecret
	console.log(123)

	request('https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grant_type + '&appid=' + appid + '&secret=' + secret, (err, response, body) => {
		let access_token = JSON.parse(body).access_token
		console.log(access_token)
		request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi', (err, response, body) => {
			let jsapi_ticket = JSON.parse(body).ticket
			console.log(jsapi_ticket)
			let nonce_str = '123456'  // 密钥，字符串任意，可以随机生成
			let timestamp = new Date().getTime() // 时间戳
			console.log(req.query)
			let url = req.query.url  // 使用接口的url链接，不包含#后的内容

			// 将请求以上字符串，先按字典排序，再以'&'拼接，如下：其中j > n > t > u，此处直接手动排序
			let str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url 
			
			// 用sha1加密
			let signature = sha1(str)
			res.send({
				appId: appid,
				timestamp: timestamp,
				nonceStr: nonce_str,
				signature: signature,
			})
		})
	})
})

module.exports = router;