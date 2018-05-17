<template>
	<div class="page-fujin" style="height: 100%">
		<header class="header" style="height: 7%">
			<div class="header-left">
			    <button class="location">
			        <a href="javascript:;">
			            <i></i><span>{{city}}</span>
			        </a>
			    </button>
			</div>
			<div class="header-right">
			    <button class="change-btn" @click="tabChange">
			        <span>{{ tab === 1? '切换为列表' : '切换为地图' }}</span>
			    </button>
			</div>
		</header>
		<section v-if="tab === 1" style="height: 93%">
			<div  style="width: 100%; height: calc(100% - 229px);">
				<baidu-map :center="center" :points="points" :active.sync="active"></baidu-map>
			</div>
			<swiper v-model="active" :show-dots="false" loop height="229px">
				<swiper-item v-for="(item, index) in articles" :key="index">
					<article-item :article="item" :hasicon="false"></article-item>
					<zhan :cornerid="item.corner.cornerid" style="border-top: 1px solid #ddd"></zhan>
				</swiper-item>
			</swiper>
		</section>
		<section v-else class="fujin-tab2" style="height: 93%; overflow:scroll;">
			<ul>
				<li v-for="(item, index) in articles" :key="index" style="margin: 10px 0">
					<article-item :article="item" :hasicon="false" container=".fujin-tab2"></article-item>
					<zhan :cornerid="item.corner.cornerid" style="border-top: 1px solid #ddd"></zhan>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
	import BaiduMap from './Map'
	import ArticleItem from '@/components/ArticleItem'
	import Zhan from '@/components/Zhan'
	import { Swiper, SwiperItem } from 'vux'
    import store from '@/vuex/store'

	export default {
		data () {
			return {
				center: {
					lng: this.$store.state.location.lng,
					lat: this.$store.state.location.lat
				},
				points: [],
				articles: [],
				active: 0,
				tab: 1,
				city: '杭州'
			}
		},
		components: {BaiduMap, Swiper, SwiperItem, ArticleItem, Zhan},
		watch: {
			active (active) {

			}
		},
		methods: {
			setPoints (arr) {
				this.points = arr.map(data => ({
					lat: data.placelatitude,
					lng: data.placelongitude
				}))
			},
			setArticles (arr) {
				this.articles = arr.map(data => {
					var article = data.article;
					article.corner = data;
					return article;
				})
			},
			tabChange () {
				this.tab = this.tab === 1? 2 : 1;
			}
		},
		activated () {
        	var center = store.state.location
        	store.dispatch('GET_NEARBY_LIST', center).then(data => {
			    this.center = center;
			    this.setPoints(data.data);
			    this.setArticles(data.data);
			})
		},
        beforeRouteEnter: (() => {
            let initNum = 0;
            return (to, from, next) => {
                if (initNum === 1) return initNum++;
                if (initNum === 2) return next();
                initNum++;
	        	var center = {
		        		lng: store.state.location.lng,
		        		lat: store.state.location.lat
		        	},
	        		city = store.state.location.city

	        	store.dispatch('GET_NEARBY_LIST', center).then(data => {
					next(vm => {
						vm.city = city;
					    vm.center = center;
					    vm.setPoints(data.data);
					    vm.setArticles(data.data);
					})
				})
	        }
        })()
	}
</script>
<style lang="less">
.page-fujin{
	.header{
	    position: relative;
	    background-color: #fff;
	}
	.header-left {
	    float: left;
	    width: 65%;
	    height: 100%;
	    padding: 4px 0;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	}
	.header-left .location{
	    position: relative;
	    height: 100%;
	    width: 97%;
	    margin-left: 3%;
	    border-radius: 4px;
	    text-align: left;
	    box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    border: 1px solid #ddd;
	}
	.header-left .location a{
	    position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	    color: #000;
	    line-height: 20px;
	}
	.header-left .location a i {
	    display: inline-block;
	    height: 20px;
	    width: 20px;
	    vertical-align: top;
	    background: url(../../../assets/dizhi2.png) center center no-repeat;
	    background-size: 16px 16px;
	}
	.header-left .location a span {
	    vertical-align: top;
	}
	.header-right {
	    float: left;
	    width: 35%;
	    height: 100%;
	    padding: 4px 0;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	}
	.header-right .change-btn{
	    position: relative;
	    display: block;
	    height: 100%;
	    width: 90%;
	    max-height: 40px;
	    margin: 0 5%;
	    background-color: #35dbfe;
	    border-radius: 4px;
	}
	.header-right .change-btn span{
	    position: absolute;
	    top: 50%;
	    left: 0;
	    width: 100%;
	    transform: translateY(-50%);
	    color: #eee;
	    text-align: center;
	}
}
</style>