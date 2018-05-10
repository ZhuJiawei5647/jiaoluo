<template>
	<div>
		<div class="xny-item">
			<user-head style="float:left" :userid="userid" :imgurl="article.author.userheadimageurl" haslink></user-head>
			<div class="xny-item-body">
				<router-link tag="div" class="xny-art" :to="articleLink">
					<h3 class="xny-art-title">{{ article.title }}</h3>
					<p class="xny-art-content">{{ contRgx(article.artbegin) }}</p>
					<div class="xny-art-img">
						<img v-if="article.imageurl" :src="article.imageurl">
					</div>
				</router-link>
				<div v-if="hascorner && article.corner" class="xny-cor">
					<router-link tag="div" v-if="article.corner" class="xny-cor-content" :to="cornerLink">
						<img src="@/assets/art_csendclick3.png">
						<span class="xny-cor-name">{{ article.corner.name }}</span>
						<span class="xny-cor-address">{{ article.corner.placeaddress }}</span>
					</router-link>
					<div class="xny-msg" style="margin: 0">
						<span class="xny-msg-item">{{ getFullDate(article.created) }}</span>
					</div>
				</div>
			</div>
			<ul v-if="hasicon" class="xny-icon-list">
				<li>
					<div class="xny-icon">
						<img src="@/assets/yuedu.png"><span>{{ article.readtime }}</span>
					</div>
				</li>
				<li>
					<div class="xny-icon">
						<img src="@/assets/36x36hongxin.png"><span>{{ article.favor }}</span>
					</div>
				</li>
				<li>
					<router-link tag="div" class="xny-icon" :to="commentLink">
						<img src="@/assets/pinglun.png"><span>{{ article.comments }}</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { dateFormat } from 'vux'
	import UserHead from './tmpls/UserHead'

	export default {
		computed: {
			userid () {
				return this.article.author.userid
			},
			corner () {
				return this.article.corner.cornerid
			},
			articleLink () {
				return {
					path: '/detail/' + this.article.articleid
				}
			},
			cornerLink () {
				return {
					path: '/cornermap',
					params: {
						cornerid: this.article.corner.cornerid
					}
				}
			},
			commentLink () {
				return {
					path: '/detail/'+ this.article.articleid +'#comment',
					params: {
						tocomment: true
					}
				}
			}
		},
		components: { UserHead },
		props: {
			article: {
				type: Object,
				default () {
					return {}
				}
			},
			hascorner: {
				type: Boolean,
				default: true
			},
			hasicon: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			contRgx (str) {
				return str.replace(/\\$\\*\\$/g,"&nbsp;")
			},
			getFullDate (datetime) {
				return dateFormat(new Date(datetime), 'YY/MM/DD')
			}
		},
		mixin: []
	}
</script>
<style>
	
</style>