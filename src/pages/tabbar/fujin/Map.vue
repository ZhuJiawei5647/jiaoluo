<template>
	<div :id="name" style="height: 100%; width: 100%;"></div>
</template>
<script>
	import BMapMixin from '@/mixins/BMapMixin'

	export default {
		data () {
			return {
				currentMarker: null,
				markerArr: []
			}
		},
		computed:{
			markers () {
				return this.points.map( point => ({ point, icon: this.markerIcon}))
			}
		},
		props: {
			points: {
				type: Array,
				default () {
					return []
				}
			},
			markerIcon: {
				type: Object,
				default () {
					return {
						url: require('@/assets/location.png'),
						size: {
							width: 30,
							height: 30
						},
						imageSize: {
							width: 60,
							height: 30
						}
					}
				}
			},
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
			showCenter: {
				type: Boolean,
				default: false
			},
			active: {
				type: Number,
				default: 0
			}
		},
		watch: {
			map (map) {
				this.centerAndZoom(14)
				if (!this.showCenter) {
					map.addOverlay(this.getMarker({point: this.center, icon: this.centerIcon}))
				} 
				this.setMarkers()
			},
			markers () {
				this.setMarkers()
			},
			active (index) {
				var marker = this.markerArr[index],
					currentMarker = this.currentMarker;

				if (currentMarker === marker) return;
				
				this.mapCenter = this.points[index]
				
				this.setMarkerOffset(currentMarker, {
					width: 0,
					height: 0
				},false)
				this.setMarkerOffset(marker, {
					width: -1 * this.markerIcon.size.width,
					height: 0
				},true)

				this.currentMarker = marker
			}
		},
		methods: {
			setMarkers () {
				this.markers.forEach((opt, index) => {
					var marker = this.getMarker(opt)
					marker.addEventListener('click', () => {
						this.$emit('update:active', index)
					})

					this.markerArr.push(marker)

					this.map.addOverlay(marker);

					if (this.active === index) {
						this.currentMarker = marker
						this.mapCenter = opt.point
						this.setMarkerOffset(marker, {
							width: -1 * this.markerIcon.size.width,
							height: 0
						})
					}
				})
			},
			setMarkerOffset (marker, size, istop) {
				this.map.removeOverlay(marker)
				if (istop) marker.setTop(true)
				marker.getIcon().setImageOffset(this.getSize(size))
				this.map.addOverlay(marker)
			}
		},
		mixins: [BMapMixin]
	}
</script>