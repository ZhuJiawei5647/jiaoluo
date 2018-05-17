<template>
	<div class="user-head">
		<router-link class="img-contener" :to="link" :style="{width: size, height: size}">
			<x-img v-if="imgurl && container" :src="imgurl" :default-src="headimg" :container="container" error-class="img-unload"></x-img>
			<img v-else :src="imgurl? imgurl : headimg">
		</router-link>
	</div>
</template>
<script>
	import { XImg } from 'vux'

	export default {
		data () {
			return {
				headimg: require('@/assets/userhead.png')
			}
		},
		components: { XImg },
		computed: {
			link () {
				if (this.haslink) {
					return {
						path: '/author',
						params: {
							authorid: this.userid
						}
					}
				} else {
					return ''
				}
			}
		},
		props: {
			imgurl: {
				type: String,
				validator (url) {
					if(url==""||url=="Null"
				    	||url=="NULL"||url=="null"||url=="undefined"){
						return null
					}
					return url
				}
			},
			userid: {
				type: Number
			},
			haslink: {
				type: Boolean,
				default: false
			},
			tab: {
				type: Number,
				default: 0
			},
			size: {
				type: String,
				default: '50px'
			},
			container: {
				type: String,
				default: null
			}
		},
		created () {
		}
	}
</script>
<style lang="less">
.user-head{
	padding: 10px;

	.img-unload {
		background: url('../../assets/userhead.png') 0 0 no-repeat;
		background-size: 100% 100%;
	}
	.img-contener {
		display: block;
		margin: 0 auto;
		border-radius: 50%;
		border: 1px solid #ddd;
		overflow: hidden;
	}
	.img-contener img {
	    width: 100%;
	    height: 100%;
	}
}
</style>