<template>
	<div class="comment-item">
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
<style lang="less">
.comment-item{
	padding-bottom: 10px;
	background-color: #fff;

	.xny-user-img{
		padding: 11px;
	}
	.xny-user-img img{
		width: 40px;
		height: 40px;
	}
	.xny-art{
		border:none;
		height: auto;
		padding-right: 2px;
		line-height: 36px;
	}
	.xny-art .xny-art-title{
		color: #2650ae;
	}
	.zan-box .xny-icon{
		float: right;
	}
	.zan-box .xny-icon span{
		margin-right: 5px;
	}
	.zan-box .xny-icon img{
		height: 14px;
		margin-top: -5px;
	}
	.xny-art-title{
		font-size: 14px;
		line-height: 36px;
	}
	.xny-comment{

	}
	.xny-comment .xny-comment-content{
		font-size: 14px;
		line-height: 18px;
	}
	.xny-reply{
		margin-top: 10px;
		width: 200px;
		padding: 5px 14px;
		background-color: #f6e4e5;
	}
	.xny-reply li{
		font-size: 14px;
		line-height: 20px;
	}
	.xny-reply .xny-reply-username{
		color: #2650ae;
	}
}
</style>