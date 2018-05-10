<template>
	<div style="height: 100%; width: 100%; overflow: hidden;">
		<group>
			<x-textarea style="margin: 0;" :height="150" @on-change="textChange"></x-textarea>
		</group>
		<group>
			<image-cut v-model="imageurl" style="width: 120px; height: 80px; margin: 5px 10px;"></image-cut>
		</group>
		<group>
			<cell title="标题">
				<img slot="icon" src="@/assets/biaoti.png" style="width: 20px; height: 20px; margin: 0 5px -2px 0;">
				<input slot="child" style="height: 100%; font-size: 16px;" @input="titleChange"></input>
			</cell>
			<cell :title="address" class="choosePosition">
				<img slot="icon" src="@/assets/dizhi2.png" style="width: 20px; height: 20px; margin: 0 5px -2px 0;">
			</cell>
			<cell title="圈子">
				<img slot="icon" src="@/assets/jiaoluo.png" style="width: 20px; height: 20px; margin: 0 5px -2px 0;">
				<checker slot="child" v-model="quanId" default-item-class="checker-default" selected-item-class="checker-selected">
					<checker-item :value="0">附近</checker-item
					><checker-item v-for="(item, index) in quanList" :key="index" :value="item.taglibid">{{ item.taglib }}</checker-item>
				</checker>
			</cell>
		</group>
		<footer class="footer">
			<ul>
				<li style="background-color: #323f4f; color: #ddd;" @click="publish">发布</li>
				<li style="background-color: #d9d9d9; color: #000;" @click="save">保存</li>
			</ul>
		</footer>
		<local-position v-model="cp" :center="center" @choosePosition="getPosition"></local-position>
	</div>
</template>
<script>
	import {Cell, Group, XTextarea, XInput, Checker, CheckerItem} from 'vux'
	import ImageCut from '@/components/ImageCut'
	import store from '@/vuex/store'
	import LocalPosition from '@/components/LocalPosition'

	export default {
		data () {
			return {
				center: {
					lng: this.$store.state.location.lng,
					lat: this.$store.state.location.lat
				},
				quanList: [],
				quanId: 0,
				form: {
					quanId: 0,
					imageurl: ''
				},
				imageurl: '',
				cp: false,
				address: '角落所在的位置'
			}
		},
		components: {Cell, Group, XTextarea, XInput, Checker, CheckerItem, ImageCut, LocalPosition},
		methods: {
			titleChange (event) {
				this.form.title = $(event.target).val();
			},
			textChange (value) {
				// if (value)
					this.form.content = value;
				// else 
				// 	this.form.content = '$*$'
			},
			choosePosition () {
				this.cp = true;
				console.log(this.cp)
			},
			getPosition (position) {
				Object.assign(this.form, position)
				console.log(this.form)
				this.address = position.placename;
			},
			publish () {
				this.$http.post('/api/article/inter/distribute', this.stringfy(this.form), {
					headers: {
						'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					// if(data.status == 208){
					// 		POST('/article/inter/save', obj, function(){
					// 			$(location).attr('href', '/page/invite');
					// 		})
					// 	}
					// 	if(confirm('本月发布次数不足,是否保存到草稿箱')){
					// }
					// if (data.status == 200 && data.msg=="发布成功") {
					// 	$(location).attr('href', 'article?tab=1');
					// }
					// else{xny.alert(data.msg)}
				})
			},
			save () {
				this.$http.post('/api/article/inter/save', this.stringfy(this.form), {
					headers: {
						'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(res => {
					console.log(res)
					// if(data.status == 208){
					// 		POST('/article/inter/save', obj, function(){
					// 			$(location).attr('href', '/page/invite');
					// 		})
					// 	}
					// 	if(confirm('本月发布次数不足,是否保存到草稿箱')){
					// }
					// if (data.status == 200 && data.msg=="发布成功") {
					// 	$(location).attr('href', 'article?tab=1');
					// }
					// else{xny.alert(data.msg)}
				})
			},
			stringfy (obj) {
				var str = "";
				for(var key in obj) {
					str += (key + '=' + (obj[key] == null? '' : obj[key]) + '&');
				}
				return str.slice(0, str.length-1)
			}
		},
		watch: {
			imageurl (value) {
				this.form.imageurl = value;
			},
			quanId (value) {
				this.form.quanId = value;
			}
		},
		beforeRouteEnter (to, from, next) {
			store.dispatch('GET_TAGLIST_NAME').then(data => {
				next(vm => {
					console.log(data.data)
					vm.quanList = data.data
				})
			})
		},
		mounted () {
			$('.choosePosition').on('click', () => {
				this.choosePosition()
			})
		}
	}
</script>
<style socped>
	.footer {
		position: static;
		height: 40px;
		background: none;
	}
	.footer ul {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 40px;
		width: 100%;
		overflow: hidden;
	}
	.footer ul li {
		float: left;
		width: 50%;
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		text-align: center;
	}




	/* */
	.checker-default{
		padding: 0 5px;
		height: 20px;
		margin: 4px;
		font-size: 0.9rem;
		line-height: 20px;
		text-align: center;
		border: 1px solid #aaa;
		border-radius: 3px;
		border-color: green;
		color: green;
	}
	.checker-selected{
		padding: 0 5px;
		height: 20px;
		margin: 4px;
		font-size: 0.9rem;
		line-height: 20px;
		text-align: center;
		border: 1px solid #aaa;
		border-radius: 3px;
		border-color: #fe0000;
		color: #fe0000;
	}
	/* form */
	.xny-form-item{
		display: block;
		width: 100%;
		position: relative;
		overflow: hidden;
		padding: 8px 0;
		border-top: 1px solid #ddd;
		background-color: #fff;
	}
	.xny-item-img{
		width: 55px;
		text-align: center;
	}
	.xny-item-img img{
		width: 30px;
		height: 30px;
	}
	.xny-form-item .xny-label{
		float: left;
		width: 100px;
		font-size: 16px;
		line-height: 30px;
		text-align: left;
		overflow: hidden;
	}
	.xny-form-item .xny-label{
		vertical-align: top;
	}
	.xny-form-item .xny-label .xny-item-img{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		vertical-align: top;
	}
	.xny-form-item .xny-input-block{
		margin-left: 100px;
		line-height: 30px;
		font-size: 16px;
		position: relative;
	}
	.xny-input-block input{
		width: 90%;
		height: 30px;
		padding: 0 5px;
		font-size: 16px;
		line-height: 30px;
	}

	

	/*  */
	.textarea-box{
		width: 100%;
		height: 180px;
		background-color:#fff;
	}
	textarea{
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 5px 10px;
		font-size: 16px;
		line-height: 24px;
	}

	.radio-box{
		display: block;
		position: relative;
		margin: 0 5px;
		float: left;
	}
	.radio-box input{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		opacity: 0;
		z-index: 10;
	}
	.radio-box span{
		display: inline-block;
		padding: 0 5px;
		height: 20px;
		margin: 4px 0;
		color: #aaa;
		font-size: 0.9rem;
		line-height: 20px;
		text-align: center;
		border: 1px solid #aaa;
		border-radius: 3px;
	}
	.radio-box span.default{
		border-color: green;
		color: green;
	}
	.radio-box input:checked+span{
		border-color: #fe0000;
		color: #fe0000;
	}

	.btn-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40px;
		z-index: 10000;
	}
	.btn-list{
		display: flex;
		width: 100%;
		height: 100%;
	}
	.btn-list li.xny-btn-box{
		flex: 1;
		border-radius: 0;
		line-height: 40px;
		height: 40px;
	}
	.btn-list li.xny-btn-box .xny-button{
		font-size: 18px;
		border-radius: 0;
	}
</style>