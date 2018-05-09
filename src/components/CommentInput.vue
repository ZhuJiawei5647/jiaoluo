<template>
	<div class="xny-publish">
		<div class="xny-input-box">
			<div class="xny-input-wei">
				<span v-show="text">{{ text }}</span>
				<span v-show="!text">1</span>
			</div>
			<textarea class="xny-input" placeholder="评论" v-model="text"></textarea>
		</div>
		<div class="xny-btn-box">
			<button class="xny-button" @click="publish()">发布</button>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				text: ''
			}
		},
		methods: {
			publish () {
				this.$emit('send', this.text)
				this.text = ''
			}
		}
	}
</script>
<style>
	
	.xny-publish{
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		min-height: 40px;
		line-height: 40px;
		background-color: #e0e0e0;
	}
	.xny-publish .xny-input-box{
		position: relative;
		width: calc(100% - 80px);
		margin: 2px 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: white;
		overflow: hidden;
	}
	.xny-publish .xny-input-box .xny-input{
		font-family: Verdana, "华文细黑";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: calc(100% + 20px);
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		/*padding: 3px 5px;*/
		font-size: 14px;
		line-height: 20px;
		padding: 7px 5px;
		padding-right: 25px;
		vertical-align: middle;
	    white-space:pre-wrap;
	    white-space:-moz-pre-wrap;
	    white-space:-pre-wrap;
	    white-space:-o-pre-wrap;
	    word-wrap:break-word;
	    word-break: break-all;
	}
	.xny-publish .xny-input-box .xny-input-wei{
		font-family: Verdana, "华文细黑";
		margin: 0;
		padding: 0;
		/*min-height: 34px;*/
		max-height: 74px;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		font-size: 14px;
		line-height: 20px;
		padding: 7px 5px;
		vertical-align: middle;
	    white-space:pre-wrap;
	    white-space:-moz-pre-wrap;
	    white-space:-pre-wrap;
	    white-space:-o-pre-wrap;
	    word-wrap:break-word;
	    word-break: break-all;
	    visibility: hidden;
	}
	/*.xny-publish .xny-input-box .xny-input-wei span{
		display: block;
		font-size: 14px;
		line-height: 20px;
	}*/
	.xny-publish .xny-btn-box{
		position: absolute;
		right: 0;
		bottom: 0;
		height: 34px;
		width: 50px;
		padding: 3px 10px;
		line-height: 34px;
		border-radius: 5px;
	}
	.xny-publish .xny-btn-box .xny-button{
		color: #fff;
		background-color: #34dbfe;
	}
</style>