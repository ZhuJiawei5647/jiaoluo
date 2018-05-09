<template>
	<div style="height: 100%;">
		<view-box style="overflow-x: hidden;">
			<transition :name="slideName">
				<keep-alive>
					<router-view class="view"></router-view>
				</keep-alive>
			</transition>
			<tabbar class="tabbar" slot="bottom" icon-class="icon-style" v-model="tabbarIndex">
				<tabbar-item v-for="(item, index) in tabbarItem" :key="index" :link="item.url">
					<template v-if="index !== 2">
						<img slot="icon" :src="item.icon">
						<img slot="icon-active" :src="item.iconActive">
						<span slot="label">{{ item.label }}</span>
					</template>
					<img id="addicon" v-else slot="icon" :src="item.icon">
				</tabbar-item>
			</tabbar>
		</view-box>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem, ViewBox } from 'vux'

	export default {
		data () {
			return {
				tabbarIndex: 0,
				tabbarItem: [{
					icon: require('@/assets/tabbar/art_csend4.png'),
					iconActive: require('@/assets/tabbar/art_csendclick4.png'),
					label: '首页',
					url: '/shouye'
				},{
					icon: require('@/assets/tabbar/art_csend3.png'),
					iconActive: require('@/assets/tabbar/art_csendclick3.png'),
					label: '附近',
					url: '/fujin'
				},{
					icon: require('@/assets/zhu_fabu.png'),
					url: '/publish'
				},{
					icon: require('@/assets/tabbar/art_csend1.png'),
					iconActive: require('@/assets/tabbar/art_csendclick1.png'),
					label: '圈子',
					url: '/quan'
				},{
					icon: require('@/assets/tabbar/art_csend2.png'),
					iconActive: require('@/assets/tabbar/art_csendclick2.png'),
					label: '用户',
					url: '/user'
				}],
				slideName: 'slide-left'
			}
		},
		components: {
			Tabbar,
			TabbarItem,
			ViewBox,
		},
		beforeRouteEnter (to, from, next) {
			console.log('enter-to: '+ to.path)
			next(vm => {
				vm.routeChange(to.path)
			})
		},
		beforeRouteUpdate (to, from, next) {
			this.routeChange(to.path)
			next()
		},
		beforeRouteLeave (to, from, next) {
			console.log('leave-to: ' + to.path)
			next()
		},
		watch: {
			$route (to, from) {
				this.slideName = to.meta.i < from.meta.i ? 'slide-right' : 'slide-left'
			}
		},
		methods: {
			routeChange (path) {
				switch (path) {
					case '/shouye':
						if (this.tabbarIndex !== 0) {
							this.tabbarIndex = 0
						}
						break;
					case '/fujin':
						if (this.tabbarIndex !== 1) {
							this.tabbarIndex = 1
						}
						break;
					case '/quan':
						if (this.tabbarIndex !== 3) {
							this.tabbarIndex = 3
						}
						break;
					case '/user':
						if (this.tabbarIndex !== 4) {
							this.tabbarIndex = 4
						}
						break;
				}
			}
		}
	}
</script>
<style>
	.tabbar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
		color: #008c8c
	}
	#addicon{
		position: relative;
		width: 50px;
		height: 50px;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.iconstyle{
		height: 20px;
		width: 20px;
	}
	.view {
		position: absolute;
		top: 0;
		left: 0;
		width:100%; 
		height:100%; 
		padding-bottom: 55px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow:scroll;
	}

	.slide-left-enter-active, .slide-left-leave-active {
	  	transition: all .5s;
	}
	.slide-left-enter {
		transform: translateX(100%) translateY(0);
	}
	.slide-left-leave-to {
		transform: translateX(-100%);
	}
	.slide-right-enter-active, .slide-right-leave-active {
	  	transition: all .5s;
	}
	.slide-right-enter {
		transform: translateX(-100%) translateY(0);
	}
	.slide-right-leave-to {
		transform: translateX(100%);
	}
</style>