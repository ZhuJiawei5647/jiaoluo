<template>
	<div class="page-shouye">
		<swiper :list="images" :auto="true" :aspect-ratio="0.64"></swiper>
		<list-load :page.sync="page" :size="size" :list-add="articles" @loadMore="getArticles" style="margin-bottom: 20px;">
			<article-item slot-scope="props" :article="props.item" style="margin: 6px 0;" container=".page-shouye"></article-item>
		</list-load>
	</div>
</template>
<script>
import { Swiper } from 'vux'
import ListLoad from '@/components/ListLoad'
import ArticleItem from '@/components/ArticleItem'

export default {
	data () {
		return {
			page: 1,
			size: 5,
			articles: []
		}
	},
	components: { Swiper, ListLoad, ArticleItem },
	computed: {
		images () {
			var list = [
				require('@/assets/shouye/shouye1.jpg'),
				require('@/assets/shouye/shouye2.jpg')
			]
			return list.map((one, index) => ({
				url: "javascript:",
				img: one
			}))
		}
	},
	methods: {
		getArticles () {
			this.$store.dispatch('GET_ARTICLES', { page: this.page, size: this.size }).then(data => {
				var arr = data.data;
				this.articles = arr;
			})
		}
	},
	created () {
		this.getArticles();
	}
}
</script>
<style>
	
</style>