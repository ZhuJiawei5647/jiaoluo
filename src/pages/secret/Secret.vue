<template>
	<section class="page-secret">
		<!-- <button style="position: absolute; top: 0; right: 0; width: 40px; height: 40px; background: url(../images/cancel.png) center center no-repeat; background-size: 30px 30px;" data-event="close"></button> -->
		<div class="box">
			<div class="secret-dec">
				<h4>Dire friend</h4>
				<p>
					<!-- {{= status == 200? data.secretdec : msg }} -->
				</p>
				<span>
					<!-- -{{= status == 200? data.author.username : '鲁迅' }} -->
				</span>
			</div>
			<div class="secret-img">
				<div class="secret-img-box">
					<img src="">
				</div>
				<i></i>
			</div>
			<ul class="button-list">
				<li>
					<button @click="share">分享</button>
				</li>
				<li>
					<button @click="reply">回应</button>
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
	export default {
		data () {
			return {
				cornerid: 0
			}
		},
		methods: {
			share () {
				this.$router.push('/secret/share')
			},
			reply () {
				this.$router.push({
					path: '/secret/create',
					query: {
						cornerid: this.cornerid
					}
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			var cornerid = to.query.cornerid;
			next(vm => {
				vm.cornerid = cornerid
			})
		}
	}
</script>
<style lang="less">
.page-secret {
	width: 100%; 
	box-sizing: border-box; 
	padding: 0 20px; 
	height: 100%; 
	background-color: #ccc; 
	background: url(../../assets/bj-gezi.png) left top repeat; 
	background-size: 90%; 
	overflow: hidden;

	.box {
		margin: 100px auto; 
		max-width: 260px; 
		padding: 30px 15px; 
		background-color: #fff; 
		border-radius: 5px;
	}
	.secret-dec{
		overflow: hidden;
	}
	.secret-dec h4 {
		font-size: 18px; 
		font-family: 'Segoe Print'; 
		font-style: italic;
	}
	.secret-dec p {
		padding: 10px 30px; 
		font-size: 17px; 
		font-family: 'PingFang SC Medium';
	}
	.secret-dec span {
		float: right; 
		font-size: 18px;
	}
	.secret-img {
		margin: 15px 0; 
		position: relative; 
		box-sizing: border-box; 
		border: 2px solid #2da297;
	}
	.secret-img-box {
		height: 140px; 
		overflow: hidden;
	}
	.secret-img-box img {
		width: 100%;
	}
	.secret-img i{
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
		width: 80%; 
		margin: auto;
	}
	.button-list li {
		float: left; 
		width: 50%;
	}
	.button-list li button {
		display: block; 
		margin: 0 auto; 
		width: 60px; 
		line-height: 30px; 
		font-size: 18px; 
		color: #fff; 
		background-color: #d76e53; 
		border-radius: 4px;
	}
}
	
</style>