<template>
	<div style="height: 100%">
		<div style="width: 100%; height: 60%;">
			<baidu-map :center="center" :points="points" :active.sync="active"></baidu-map>
		</div>
		<swiper style="height: 40%" v-model="active" :show-dots="false" loop>
			<swiper-item v-for="(item, index) in articles" :key="index" style="height: 100%;">
				<article-item :article="item"></article-item>
			</swiper-item>
		</swiper>
	</div>
</template>
<script>
	import BaiduMap from './Map'
	import ArticleItem from '@/components/ArticleItem'
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
				active: 0
			}
		},
		components: {BaiduMap, Swiper, SwiperItem, ArticleItem},
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
	        	var center = store.state.location
	        	store.dispatch('GET_NEARBY_LIST', center).then(data => {
					next(vm => {
					    vm.center = center;
					    vm.setPoints(data.data);
					    vm.setArticles(data.data);
					})
				})
	        }
        })()
	}
</script>
<style scoped>
	
</style>