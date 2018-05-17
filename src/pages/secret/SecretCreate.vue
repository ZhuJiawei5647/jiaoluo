<template>
	<div class="page-secret-create">
		<div class="box">
			<form class="" onsubmit="return false;">
				<div class="textarea-box">
					<textarea id="content" name="secretdec" placeholder="秘密" @input="textChange"></textarea>
				</div>
				<div class="img-box">
					<div class="icon"></div>
					<div class="img-container">
						<image-cut v-model="imageurl" style="width: 100%; height: 100%;"></image-cut>
					</div>
				</div>
				<ul class="button-list">
					<li class="save" @click="save"></li>
					<li class="send" @click="send"></li>
				</ul>
			</form>
		</div>
	</div>
</template>
<script>
	import {XTextarea} from 'vux'
	import ImageCut from '@/components/ImageCut'
	export default {
		data () {
			return {
				imageurl: '',
				form: {}
			}
		},
		components: { ImageCut, XTextarea },
		methods: {
			textChange (event) {
				this.form.secretdec = $(event.target).val()
			},
			save () {
				this.$http({
				  url: '/api/secret/add/secret',
				  method: 'post',
				  data: this.form,
				  transformRequest: [function (data) {
				    // Do whatever you want to transform the data
				    let ret = ''
				    for (let it in data) {
				      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				    }
				    return ret.slice(0, ret.length - 1)
				  }],
				  headers: {
				    'Content-Type': 'application/x-www-form-urlencoded'
				  }
				})
			},
			send () {
				this.$router.push({
					path: '/secret/order',
					query: this.form
				})
			}
		},
		watch: {
			imageurl (url) {
				this.form.secretimg = url
			}
		},
		beforeRouteEnter (to, from, next) {
			var cornerid = to.query.cornerid;
			next(vm => {
				vm.form.cornerid = cornerid
			})
		}
	}
</script>
<style lang="less">
.page-secret-create {
	width: 100%;
	height: 100%;
	background: url(../../assets/bj-gezi.png) top left repeat;
	background-size: 90%;
	overflow: hidden;

	.box {
		width: 80%;
		max-width: 300px;
		margin: 100px auto 0;
		padding: 30px 0;
		background-color: #fff;
		border-radius: 5px;
	}
	.textarea-box textarea{
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		width: 100%;
		height: 100px;
		padding: 0 30px;
		font-size: 17px;
		line-height: 26px;
		background-color: #fff;
	}

	.img-box{
		padding: 0;
		position: relative;
		margin: 10px;
		height: 140px;
		background: url(../../assets/camera.png) center center no-repeat;
		background-size: 60px 50px;
		background-color: #fff;
		box-sizing: border-box;
		border: 2px solid #2da297;
	}

	.img-box .img-container{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.img-box .img-container img{
		width: 100%;
	}

	.img-box .icon {
		position: absolute; 
		top:-10px; 
		left: -2px; 
		width: 87px; 
		height: 46px; 
		background: url(../../assets/ltsanjiao.png) 0 0 no-repeat; 
		background-size: 100% 100%;
	}

	.button-list {
		overflow: hidden;
	}

	.button-list li {
		float: left;
		width: 50%;
		height: 50px;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 95px 50px;
	}

	.save {
		background-image: url(../../assets/cai_btn1.png)
	}

	.send {
		background-image: url(../../assets/cai_btn2.png)
	}

	.article-box{
		margin: 20px 40px;
		text-align: center;
	}

	.article-box span{
		display: inline-block;
		padding: 0 10px;
		font-size: 18px;
		line-height: 20px;
	}

	.btn-container{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.btn-container .xny-btn-box{
		line-height: 40px;
		width: 100%;
		height: 40px;
	}
	.btn-container .xny-btn-box .xny-button{
		border-radius: 0;
		color: #333;
		background: url(../../assets/cai2_fabu.png) 0 0 no-repeat;
		background-size: 100% 100%;
	}
}
</style>