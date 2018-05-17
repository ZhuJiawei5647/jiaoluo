<template>
	<div class="article-item">
		<user-head style="float:left" :userid="userid" :imgurl="article.author.userheadimageurl" :container="container" haslink></user-head>
		<div class="xny-item-body">
			<router-link tag="div" class="xny-art" :to="articleLink">
				<h3 class="xny-art-title">{{ article.title }}</h3>
				<p class="xny-art-content">{{ contRgx(article.artbegin) }}</p>
				<div class="xny-art-img" v-if="article.imageurl">
					<x-img v-if="container" :src="article.imageurl" error-class="img-unload" :container="container"></x-img>
					<img v-else :src="article.imageurl">
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
</template>
<script>
	import { dateFormat, XImg } from 'vux'
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
		components: { UserHead, XImg },
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
			},
			container: {
				type: String,
				default: null
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
<style lang="less">
.article-item {
    overflow: hidden;
    background-color: #fff;

    .img-unload {
    	display: none;
    }

    .xny-user-img {
        float: left;
        padding: 12px;
    }

    .xny-user-img img {
        width: 50px;
        height: 50px;
        border: 1px solid #ddd;
        border-radius: 50%;
    }

    .xny-item-body {
        margin-left: 74px;
    }

    .xny-art {
        position: relative;
        height: 70px;
        padding-top: 12px;
        padding-right: 120px;
    }

    .xny-art-title {
        font-size: 16px;
        line-height: 26px;
        color: #000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .xny-art-content {
        font-size: 14px;
        line-height: 17px;
        height: 34px;
        color: #404040;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .xny-art-img {
        position: absolute;
        top: 18px;
        right: 12px;
        width: 90px;
        height: 60px;
    }

    .xny-art-img img {
        width: 100%;
        height: 100%;
    }

    .xny-cor {
        padding-bottom: 5px;
        border-top: 1px dashed #ddd;
    }

    .xny-cor-content {
        /*line-height: 32px;*/
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .xny-cor-content img {
        height: 20px;
        vertical-align: middle;
        margin-top: -4px;
    }

    .xny-cor-content .xny-cor-name {
        /*display: inline-block;*/
        padding: 0 5px;
        max-width: 100px;
        font-size: 14px;
        line-height: 32px;
        color: #000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .xny-cor-content .xny-cor-address {
        /*display: inline-block;*/
        font-size: 12px;
        vertical-align: baseline;
    }

    .xny-icon-list {
        display: flex;
        line-height: 40px;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #ddd;
    }

    .xny-icon-list li {
        flex: 1;
        text-align: center;
    }
}
</style>