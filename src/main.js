// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { AlertPlugin, ToastPlugin, AjaxPlugin, LoadingPlugin, WechatPlugin } from 'vux'
import store from './vuex/store'
import FastClick from 'fastclick'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)

function isWeiXin(){
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
  	return true;
  }else{
  	return false;
  }
}

router.beforeEach((() => {
	var timer = null
	return function (to, from, next) {
		if (timer) {clearTimeout(timer)}
		Vue.$vux.loading.show({
		 text: 'Loading'
		})

		function locationTo() {
			if (to.meta.requireAuth) {
				if (store.state.cookie.token){
					next();
				}
				else {
					next({
						path: '/login',
						query: {redirect: to.fullPath} // 将跳转的路由用path作为参数，登入成功后跳转到该路由。
					})
				}
			}
			next()
		}

		timer = setTimeout(locationTo, 200)
	}
})())

router.afterEach((to, from) => {
	Vue.$vux.loading.hide()
	if (isWeiXin() && to.meta.jsApiList && to.meta.jsApiList.length > 0) {
		var err = false;
		Vue.wechat.error((res) => {
			console.log('error')
			console.log(res)
			err = true;
			alert('微信验证失败')
		})
		Vue.wechat.ready(() => {
			console.log('ready')
			if (err) {
				Vue.prototype.isWeiXin = false;
			}else {
				Vue.prototype.isWeiXin = true;
			}
		})
		Vue.http.get('/wechat/jssdk', {params: {
			url: location.href.split('#')[0]/* + '#' + to.fullPath*/
		}}).then(({data}) => {
			console.log(data)
			Vue.wechat.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature,// 必填，签名，见附录1
				jsApiList: to.meta.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		})
	} else {
		Vue.prototype.isWeiXin = false;
	}
})

function setCenter() {
	store.commit('SET_CENTER')
	setTimeout(setCenter, 5000)
}
setCenter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
