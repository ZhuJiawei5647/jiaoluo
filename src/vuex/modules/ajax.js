import axios from 'axios'
import router from '@/router'

var ajax = axios.create({
	baseURL: '/api/', // 开发环境
	// baseURL: '/', // 生产环境
	// timeout: 2500,
	validateStatus: function (status) {
		console.log(status)
		return status >= 200 && status < 300; // 默认的
	},
})

const reqErr = err => {
	ajax.get('user/needlogin').then(res => {
		console.log(res)
		if (res.data.status === 201) {
			router.push('./login')
			throw new Error(res.data.msg)
		}else{
			throw err
		}
	})
	return Promise.reject('请求出现错误')
}

const actions = {
	//首页获取文章列表
	GET_ARTICLES (context, {page, size}) {
		console.log(page)
		return ajax.get('article/index/list?page='+ page +'&size='+ size).then(r => r.data).catch(reqErr)
	},
	//获取用户等级
	GET_RANK (context, userid){
		return ajax.get('record/user/rank?userid=' + userid).then(r => r.data).catch(reqErr)
	},
	//获取未读消息
	GET_UNREAD (context) {
		return ajax.get('notify/getunread').then(r => r.data).catch(reqErr)
	},
	//获取附近列表信息
	GET_NEARBY_LIST (context, {lat, lng}) {
		return ajax.get('corner/inter/nearby/list', {
			params: {
				lat,
				log: lng,
				page: 1,
				size: 500
			}
		}).then(r => r.data).catch(reqErr)
	},
	//获取已加入的圈子的信息
	GET_QUAN_JOINED_LIST (context) {
		return ajax.get('taglib/getUserTagList').then(r => r.data).catch(reqErr)
	},

	GET_ARTICLE (context, id){
		return ajax.get('article/inter/articleInfo', {
			params: {
				articleid: id
			}
		}).then(r => r.data).catch(reqErr)
	},

	DIAN_ZAN (context, id) {
		return ajax.get('action/comment/zan', {
			params: {
				commentid: id
			}
		}).then(r => r.data).catch(reqErr)
	},

	GET_COMMENTS (context, {id, page, size}) {
		return ajax.get('record/article/comment', {
			params: {
				articleid: id,
				page,
				size
			}
		}).then(r => r.data).catch(reqErr)
	},

	SEND_COMMENTS (context, {id, text}){
		return ajax.get('action/article/comment', {
			params: {
				articleid: id,
				commentcontent: text
			}
		}).then(r => r.data).catch(reqErr)
	},

	GET_TAGLIST_NAME (context) {
		return ajax.get('/taglib/getUserTagListName').then(r => r.data).catch(reqErr)
	}
}

export default {actions}