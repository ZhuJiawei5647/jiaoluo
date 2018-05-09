<template>
	<div >
		<tab active-color="#00b0ff" bar-active-color="#00b0ff" v-model="tabIndex">
			<tab-item selected>我的</tab-item>
			<tab-item>发现</tab-item>
		</tab>
		<transition :name="slideName">
			<section class="xny-body" v-show="tabIndex === 0">
				<div class="qz-create-item">
					<p>创建圈子</p>
					<button class="qz-create">
						<img src="@/svg/plus.svg">
					</button>
				</div>
				<ul class="my-qz">
					<li v-for="(item, index) in quanList" :key="index" class="qz-list-item">
						<div class="qz-slider">
							<div class="qz-slider-title">
								<div class="xny-item-left" @click="slidedown(item, index)">
									<transition name="rotate-acw">
										<i v-show="item.slidedown" class="qz-slider-icon">
											<img src="@/svg/down.svg">
										</i>
									</transition>
									<transition name="rotate-cw">
										<i v-show="!item.slidedown" class="qz-slider-icon">
											<img src="@/svg/right.svg">
										</i>
									</transition>
									<h3>{{ item.taglib.taglib }}</h3>
								</div>
								<div class="qz-icon">
									<span><i>{{ item.unreadAno + item.unreadRem }}</i></span>
								</div>
							</div>
							<transition name="slide-down">
								<div v-show="item.slidedown" class="qz-slider-content">
									<router-link tag="div" :to="getDetailLink(item.taglib.taglibid)" class="qz-quan-item">
										<div class="row qz-user">
											<user-head style="float:left; padding:3px" :imgurl="item.taglib.author.userheadimageurl"  size="26px"></user-head>
											<span class="qz-username">{{ item.taglib.author.username }}</span>
											<i class="qz-icon">圈主</i>
										</div>
										<div class="row qz-announce">群公告：{{ item.lastAnno }}</div>					
										<div class="row" style="border: none;">
											<span class="xny-msg-item">成员数：{{ item.taglib.memberscount}}</span>
											<span class="xny-msg-item">文章数：{{ item.taglib.articlescount}}</span>
											<span class="xny-msg-item">{{ getFullDate(item.created) }}</span>
										</div>
									</router-link>
								</div>
							</transition>
						</div>
						<article-item v-if="item.taglib.article" :article="item.taglib.article" :hascorner="false"></article-item>
						<p v-else style="font-size:0.9rem; padding: 5px 10px;">还未创建文章</p>
					</li>
				</ul>
			</section>
		</transition>
		<transition :name="slideName">
			<section class="xny-body" v-show="tabIndex === 1">
				<h2 class="xny-h2">周边圈子</h2>
				<ul class="oth-qz">
					<li>
						
					</li>
				</ul>
			</section>
		</transition>
	</div>
</template>
<script>
	import { Tab, TabItem, dateFormat } from 'vux'
	import ArticleItem from '@/components/ArticleItem'
	import UserHead from '@/components/tmpls/UserHead'
    import store from '@/vuex/store'
	export default {
		data () {
			return {
				tabIndex: 0,
				quanList: [],
				quanNearList: []
			}
		},
		components: { Tab, TabItem, ArticleItem, UserHead },
		computed: {
			slideName () {
				return this.tabIndex === 0 ? 'slide-right' : 'slide-left'
			}
		},
		methods: {
			getDetailLink (id) {
				return {
					path: '/quan/detail',
					params: { id }
				}
			},
			getFullDate (datetime) {
				return dateFormat(new Date(datetime), 'YY/MM/DD')
			},
			slidedown (item, index) {
				item.slidedown = !item.slidedown
				this.$set(this.quanList, index, item)
			},
			rotateName (slidedown) {
				return slidedown ? 'rotate-acw' : 'rotate-cw'
			}
		},
		watch: {
			tabIndex (value) {
			}
		},
        activated () {
            store.dispatch('GET_QUAN_JOINED_LIST').then(data => {
            	data.data.forEach((item, index) => {
    				item.slidedown = false
    				this.$set(this.quanList, index, item)
    			})
	        })
        },
        beforeRouteEnter: (() => {
            let initNum = 0;
            return (to, from, next) => {
                if (initNum === 2) return next();
                if (initNum === 1) return initNum++;
                initNum++;
	        	store.dispatch('GET_QUAN_JOINED_LIST').then(data => {
	        		console.log(data.data)
	        		next(vm => {
	        			console.log(123)
	        			data.data.forEach((item, index) => {
	        				item.slidedown = true
	        				vm.quanList.push(item)
	        			})
	        		})
	        	})
	        }
        })()
	}
</script>
<style scoped>
	.slide-down-enter-active, .slide-down-leave-active {
	  	transition: height .5s;
		height: 110px;
	}
	.slide-down-enter, .slide-down-leave-to{
		height: 0;
	}

	.rotate-cw-enter-active{
	  	transition: all .5s;
	}
	.rotate-cw-enter{
		transform: rotate(90deg);
	}

	.rotate-acw-enter-active{
	  	transition: all .5s;
	}
	.rotate-acw-enter{
		transform: rotate(-90deg);
	}

	.slide-left-enter-active, .slide-left-leave-active {
	  	transition: all .5s;
	}
	.slide-left-enter {
		transform: translateX(100%);
	}
	.slide-left-leave-to {
		transform: translateX(-100%);
	}
	.slide-right-enter-active, .slide-right-leave-active {
	  	transition: all .5s;
	}
	.slide-right-enter {
		transform: translateX(-100%);
	}
	.slide-right-leave-to {
		transform: translateX(100%);
	}

	.xny-body{
		position: absolute;
		top: 44px;
		left: 0;
	}
</style>