<template>
	<div>
		<header class="header">
			<div class="xny-item" v-if="article.author">
				<user-head style="float:left" :userid="article.author.userid" :imgurl="article.author.userheadimageurl" haslink></user-head>
				<div class="xny-item-body">
					<div class="xny-art">
						<span class="xny-art-title">{{ article.author.username }}</span>
					</div>
					<div class="">
						<div class="xny-cor-content" v-if="article.corner">
							<img src="@/assets/dizhi.png"><span class="xny-cor-name">{{ article.corner.name }}</span><span class="xny-cor-address">{{ article.corner.placeaddress }}</span>
						</div>
						<div class="xny-msg"><span class="xny-msg-item time">{{ getFullDate(article.created) }}</span><span class="xny-msg-item distance"></span></div>
					</div>
				</div>
				<div class="button-box"><button></button></div>
				<div class="hide-box"></div>
			</div>
		</header>
		<section class="content">
				<img v-if="article.imageurl" :src="article.imageurl">
				<p v-for="text in texts">{{ text }}</p>
		</section>
		<div class="zhan">
			<p>探索角落的秘密</p>
			<img src="@/assets/evlop.png">
		</div>
		<section class="comment" id="comment">
			<header class="comment-header">
				<h2 class="comment-title">
					<img src="@/assets/pinglun2.png">最新评论(<span class="comnum"></span>条)
				</h2>
			</header>
			<list-load class="comment-list" :page.sync="page" :size="10" :list-add="comments" @loadMore="getComments" style="margin-bottom: 20px;">
				<comment-item slot-scope="props" :comment="props.item"></comment-item>
			</list-load>
			<div class="more-box"></div>
		</section>
		<footer class="xny-footer">
			<comment-input @send="publish"></comment-input>
		</footer>
	</div>
</template>
<script>
	import { dateFormat } from 'vux'
	import store from '@/vuex/store'
	import ListLoad from '@/components/ListLoad'
	import UserHead from '@/components/tmpls/UserHead'
	import CommentItem from '@/components/CommentItem'
	import CommentInput from '@/components/CommentInput'

	export default {
		data() {
			return {
				article: {},
				comments: [],
				page: 1
			}
		},
		computed: {
			texts () {
				if (this.article.content)
					return this.article.content.split('$*$')
				else return []
			}
		},
		components: { UserHead, CommentItem, ListLoad, CommentInput },
		methods: {
			getComments () {
				this.$store.dispatch('GET_COMMENTS', {
					id: this.article.articleid,
					page: this.page,
					size: 10
				}).then(data => {
					this.comments = data.data;
				})
			},
			getFullDate (datetime) {
				return dateFormat(new Date(datetime), 'YY/MM/DD')
			},
			publish (text) {
				this.$store.dispatch('SEND_COMMENTS', {
					id: this.article.articleid,
					text
				}).then(data => {
					this.page = 1;
					this.getComments();
				})
			}
		},
		beforeRouteEnter (to, from, next ) {
			store.dispatch('GET_ARTICLE', to.params.id).then(data => {
				next(vm => {
					console.log(data.data)
					vm.article = data.data,
					vm.comments = data.data.comment
				});
			})
		}
	}
</script>
<style type="text/css">
	.xny-h2{
		font-size: 18px;
		line-height: 30px;
		background-color: #fff;
		text-indent: 10px;
	}
	.xny-footer{
		height: 40px;
	}

	/* header */
	.header{
		overflow: hidden;
		position: relative;
		background: url(../../assets/webwxgetmsgimg.jpg);
		background-size: 100% 100%;
	}
	.header .xny-item{
		overflow: hidden;
		position: relative;
		background: url(../../assets/webwxgetmsgimg.jpg); 
		background-size: 100% 100%;
	}
	.header .xny-user-img img{
		background-color: white;
	}
	.header .xny-art{
		height: auto;
		border: none;
	}
	.header .xny-art-title{
		color: #2650ae;
	}
	.header .xny-cor-content{
		line-height: 24px;
	}
	.header .xny-cor-content img{
		height: 18px;
	}
	.header .xny-cor-content .xny-cor-name{
		line-height: 24px;
	}
	.button-box{
		position: absolute;
		top: 15px;
		right: 15px;
	}
	.hide-box{
		position: absolute;
		top: 50px;
		right: 15px;
	}
	.button-box button{
		height: 40px;
		line-height: 40px;
		font-size : 1rem;
		padding: 0 10px;
	}

	/* content */
	.content {
		margin: 10px 0;
		padding: 0 40px;
	}
	.content>img{
		width: 100%;
	}
	.content p{
		margin: 10px 0;
		text-align: left;
		text-indent: 28px;
		font-size: 14px;
		line-height: 20px;
	}
	.xny-icon-list{
		background-color: #fff;
	}
	.favor-box .xny-icon img, .like-box .xny-icon img{
		height: 22px;
	}

	/* comment */
	.comment{

	}
	.comment-header{
		overflow: hidden;
		line-height: 32px;
		background-color: #fff;
	}
	.comment-header .like-box{
		float: right;
	}
	.comment-header .xny-icon span{
		margin: 0 10px;
	}
	.comment-title{
		font-size: 14px;
		line-height: 32px;
	}
	.comment-title img{
		height: 16px;
		margin: 0 12px -3px 12px;
	}
	.comment-title .comment-title-msg{
		font-size: 12px;
		color: #4c4c4c;
	}
	.comment-title .comment-title-msg i{
		font-style: normal;
	}
	/* comment-item */
	.comment-item{
		padding-bottom: 10px;
	}
	.comment-item .xny-user-img{
		padding: 11px;
	}
	.comment-item .xny-user-img img{
		width: 40px;
		height: 40px;
	}
	.comment-item .xny-art{
		border:none;
		height: auto;
		padding-right: 2px;
		line-height: 36px;
	}
	.comment-item .xny-art .xny-art-title{
		color: #2650ae;
	}
	.comment-item .zan-box .xny-icon{
		float: right;
	}
	.comment-item .zan-box .xny-icon span{
		margin-right: 5px;
	}
	.comment-item .zan-box .xny-icon img{
		height: 14px;
		margin-top: -5px;
	}
	.comment-item .xny-art-title{
		font-size: 14px;
		line-height: 36px;
	}
	.comment-item .xny-comment{

	}
	.comment-item .xny-comment .xny-comment-content{
		font-size: 14px;
		line-height: 18px;
	}
	.comment-item .xny-reply{
		margin-top: 10px;
		width: 200px;
		padding: 5px 14px;
		background-color: #f6e4e5;
	}
	.comment-item .xny-reply li{
		font-size: 14px;
		line-height: 20px;
	}
	.comment-item .xny-reply .xny-reply-username{
		color: #2650ae;
	}
	.more{
		text-align: center;
		line-height: 40px;
		font-size: 14px;
	}
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
