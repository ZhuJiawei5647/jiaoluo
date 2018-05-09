<template>
	<div class="img-box">
		<router-link class="img-contener" :to="link" :style="{width: size, height: size}">
			<img :src="imgurl? imgurl : headimg">
		</router-link>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				headimg: require('@/assets/userhead.png')
			}
		},
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
			}
		},
		created () {
		}
	}
</script>
<style scoped>
	.img-box{
		padding: 10px;
	}
	.img-contener{
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
</style>