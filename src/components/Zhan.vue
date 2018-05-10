<template>
	<div class="zhan" @click="zhan">
		<p style="line-height: 40px;">探索角落的秘密</p>
		<img src="@/assets/evlop.png" width="40px">
	</div>
</template>
<script>
	export default {
		props: {
			cornerid: {
				type: Number
			}
		},
		methods: {
			zhan () {
				if (!this.cornerid) return;
				this.$router.push({
					path: '/secret',
					query: {
						cornerid: this.cornerid
					}
				})
			}
		}
	}
</script>
<style>
	.zhan{
		text-align: center;
		background-color: #fff;
	}
	.zhan span{
		font-size: 16px;
		display: inline-block;
		line-height: 30px;
	}
</style>