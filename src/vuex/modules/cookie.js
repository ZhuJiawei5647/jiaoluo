const state = {
	token: null,
	userInfo: {
		username: ''
	}
}

const mutations = {
	SET_TOKEN ( state, token ) {
		state.token = token;
		sessionStorage.setItem('token', token);
	},
	SET_USER_INFO ( state, info ) {
		state.userInfo = info;
		console.log(state.userInfo)
		for ( var key in info ) {
			sessionStorage.setItem(key, info[key])
		}
	},
	GET_TOKEN (state) {
		state.token = sessionStorage.getItem('token');
	},
	GET_USER_INFO (state) {
		var info = state.info;
		for ( var key in info) {
			info[key] = sessionStorage.getItem(key)
		}
	}
}

export default { /*namespaced:true,*/ state, mutations}