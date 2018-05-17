<template>
	<div class="page-login">
		<div class="img-box">
			<img src="@/assets/logo.png">
		</div>
		<div class="errmsg" v-if="errmsg">{{errmsg}}</div>
		<group>
			<x-input v-model="username" title="用户" name="username" placeholder="请输入用户名称" is-type="china-name"></x-input>
		</group>
		<group>
			<x-input v-model="password" title="密码" name="password" placeholder="请输入密码" :type="passwordType">
				<span @click="typeChange" class="show-item" slot="right">{{typeChangeTitle}}</span>
			</x-input>
		</group>
		<div style="padding: 15px">
			<x-button @click.native="login" type="primary">登录</x-button>
		</div>
	</div>
</template>
<script>
	import { XInput, Group, XButton } from 'vux'
	export default {
		data () {
			return {
				username: '',
				password: '',
				passwordType: 'password',
				typeChangeTitle: '显示密码',
				logined: false,
				errmsg: ''
			}
		},
		components: { XInput, Group, XButton },
		methods: {
			typeChange () {
				this.passwordType = this.passwordType === 'password'? 'text' : 'password'
				this.typeChangeTitle = this.typeChangeTitle === '显示密码'? '隐藏密码' : '显示密码'
			},
			login () {
				this.$http.get('/api/login/user/login?username='+this.username+'&password='+this.password+'&userfrom=3').then(request => {
					var data = request.data
					if (data.status == 200) {
						this.getUserInfo(() => {

						}, e => {

						})
					} else {
						this.errmsg = data.msg;
					}
				})
			},
			getUserInfo (success, fail) {
				this.$http.get('/api/user/getuserinfo').then(request => {
					var data = request.data;
					if (data.status === 200) {
						this.$store.commit('SET_TOKEN', data.data.token)
						this.$store.commit('SET_USER_INFO', data.data)

						var redirect = this.$route.query.redirect;
						if (redirect) {
							this.$router.replace(this.$route.query.redirect)
						}else {
							this.$router.go(-1)
						}
						
						success()
					}else{
						fail(data.msg)
					}
				}, err => {
					fail(err)
				})
			}
		},
		created () {
			this.getUserInfo(() => {
				console.log('success')
			}, e => {
				console.log('fail')
			})
		},
		mounted () {
			
		}
	}
</script>
<style lang="less">
.page-login {
	.img-box{
		text-align: center;
		padding-top: 40px;
	}
	.img-box img{
		width: 50%;
	}
	.errmsg{
		text-align: center;
		padding-top: 20px;
		font-size: 14px;
		color: red;
	}
	.show-item {
		display: inline-block;
		height: 100%;
	}
}
</style>