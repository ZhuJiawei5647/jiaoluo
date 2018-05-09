<template>
	<div class="xny-item comment-item">
		<user-head style="float:left" size="40px" :userid="comment.userid" :imgurl="comment.user.userheadimageurl" haslink></user-head>
		<div class="xny-item-body" style="margin-left: 64px">
			<div class="xny-art">
				<div class="zan-box">
					<zan :haszan="comment.user.likeAuthor" :value="comment.zannumber" :id="comment.commentid"></zan>
				</div>
				<span class="xny-art-title">{{ comment.user.username }}</span>
			</div>
			<div class="xny-comment" :data-id="comment.commentid" :data-num="comment.commentAns.length">
				<p class="xny-comment-content">{{ comment.content }}</p>
				<div class="xny-msg">
					<div class="xny-msg-item">回复{{ comment.commentAns.length }}</div>
					<div class="xny-msg-item" style="float: right;">{{ getFullDate(comment.created )}}</div>
				</div>
				<ul v-if="comment.commentAns && comment.commentAns.length > 0" class="xny-reply">
					<li v-for="reply in replys"><span class="xny-reply-username">{{ reply.forUser.username }}:</span>{{ reply.anscomment }}</li>
					<li v-if="comment.commentAns.length > 3">查看更多回复</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import { dateFormat } from 'vux'
	import UserHead from './tmpls/UserHead'
	import Zan from './tmpls/Zan'

	export default {
		props: {
			comment: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			replys () {
				return this.comment.commentAns ? this.comment.commentAns.slice(0, 3) : null
			}
		},
		components: { UserHead, Zan },
		methods: {
			getFullDate (datetime) {
				return dateFormat(new Date(datetime), 'YY/MM/DD')
			}
		}
	}
</script>
<style>
	
</style>