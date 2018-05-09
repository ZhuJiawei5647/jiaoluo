<template>
	<div>
		<ul>
			<li v-for="(item, index) in list" :key="index">
				<slot :item="item" :index="index"></slot>
				<slot name="del" @click="del(index)"></slot>
			</li>
		</ul>
		<div class="load-more">
			<p v-show="isloading">加载中&nbsp;<inline-loading></inline-loading></p>
			<p v-show="!isloading" @click="loadMore">{{ text }}</p>
		</div>
	</div>
</template>
<script>
	import { InlineLoading } from 'vux'

	export default {
		data () {
			return {
				isloading: true,
				isfull: false,
				list: []
			}
		},
		computed: {
			text () {
				return this.isfull? this.loadText[1] : this.loadText[0]
			}
		},
		props: {
			page: {
				type: Number,
				default: 1
			},
			size: {
				type: Number,
				default: 10
			},
			loadText: {
				type: Array,
				default () {
					return ['加载更多', '已加载完']
				}
			},
			listAdd: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		components: {InlineLoading},
		watch: {
			listAdd (arr) {
				// if (this.page === 1) {
				// 	this.list = [];
				// 	this.isfull = false;
				// };
				this.list.push(...arr);
				this.isloading = false;
				if (arr.length < this.size) {
					this.isfull = true;
				}else {
					var page = this.page + 1
					this.$emit('update:page', page)
				}
			}
		},
		methods: {
			loadMore () {
				if (this.isfull) return
				this.isloading = true;
				this.$emit('loadMore')
			},
			del (index) {
				console.log(index)
			}
		}
	}
</script>
<style scoped>
	li {
		position: relative;
	}
	.load-more p{
		text-align: center;
		line-height: 30px;
		font-size: 14px;
	}
</style>