<template>
	<popup v-model="show" style="height: 100%;">
		<div style="height: 100%; width: 100%; overflow: hidden;">
			<header class="xny-header">
				<button class="qz-button cancel" @click="cancel">取消</button>
				<button class="qz-button confirm" @click="confirm">确定</button>
				<h1>位置</h1>
			</header>
			<div class="xny-body">
				<div :id="name" class="map"></div>
				<ul class="locallist">
					<li  v-for="(item, index) in list" :class="{'active' : index === checkedIndex }" @click="positionChange(item, index)">
						<p>{{ item.title}}</p>
						<p>{{ item.address}}</p>
					</li>
				</ul>
			</div>
		</div>
	</popup>
</template>
<script>
	import BMapMixin from '@/mixins/BMapMixin.js'
	import { Popup } from 'vux'
	export default {
		data () {
			return {
				list: [],
				checkedIndex: 0,
				position: {},
				show: this.value
			}
		},
		props: {
			centerIcon: {
				type: Object,
				default () {
					return{
						url: require('@/assets/logo.png'),
						size: {
							width: 20,
							height: 20
						},
						imageSize: {
							width: 20,
							height: 20
						}
					}
				}
			},
			value: {
				type: Boolean,
				default: false
			}
		},
		components: { Popup },
		methods: {
			positionChange (item, index) {
				this.checkedIndex = index;
				this.setPosition(item)
			},
			getList () {
				this.getLocalMessage().then(r => {
					this.list = r.surroundingPois;
					this.setPosition( this.list[this.checkedIndex] )
				})
			},
			setPosition (pois) {
				var obj = {
					placecity: pois.city,
					placename: pois.title,
					placeaddress: pois.address,
					placelongitude: pois.point.lng,
					placelatitude: pois.point.lat
				};
				this.position = obj;
			},
			confirm () {
				this.$emit('choosePosition', this.position)
				this.$emit('input', false)
			},
			cancel () {
				this.$emit('input', false)
			}
		},
		mixins: [BMapMixin],
		watch: {
			value (val) {
				this.show = val;
				if (val) {
					setTimeout(() => {
						this.centerAndZoom(14)
						// if (!this.showCenter) {
							this.map.addOverlay(this.getMarker({point: this.center, icon: this.centerIcon}))
							this.getList()
						// }
					}, 200)
				}
			}
		}
	}
</script>
<style scoped>
	/* cornerpage */
	.xny-body {
		height: calc(100% - 40px)
	}
	.xny-header .cancel{
		position: absolute;
		top: 8px;
		left: 20px;
		height: 24px;
		line-height: 24px;
		color: white;
		background-color: green;
		padding: 0 5px;
		border-radius: 3px;
	}
	.xny-header .confirm{
		position: absolute;
		top: 8px;
		right: 20px;
		height: 24px;
		line-height: 24px;
		color: white;
		background-color: green;
		padding: 0 5px;
		border-radius: 3px;
	}
	.map{
		width: 100%;
		height: 200px;
	}
	.locallist{
		width: 100%;
		height: calc(100% - 200px);
		overflow-y: scroll;
	}
	.locallist li{
		padding: 10px;
		padding-right: 40px;
		border-bottom: 1px solid #ccc;
		background-color: #e3e3e3;
	}
	.locallist li.active{
		background: url(../assets/select.png) 95% 10px no-repeat;
		background-size: 40px;
		background-color: #fff;
	}
	.qz-openpage .qz-btn-box-left{
		top: 8px;
		left: 20px;
		right: none;
	}
</style>