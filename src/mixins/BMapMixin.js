import BMap from 'BMap'

export default {
	data () {
		return {
			map: null
		}
	},
	computed: {
		mapCenter: {
			get () {
				return this.center
			},
			set: (() => {
				var timer = null;
				return function (point) {
					if (timer) clearTimeout(timer)
					timer = setTimeout(() => {
						this.map.panTo(this.getPoint(point))
					}, 50)
				}
			})()
		}
	},
	props: {
		name: {
			type: String,
			default: 'map-' + Math.round( Math.random() * 100000000 )
		},
		center: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	methods: {
		mapInit () {
			this.map = new BMap.Map(this.name)
		},
		centerAndZoom (num) {
			this.map.centerAndZoom(this.getPoint(this.center), num)
		},
		getPoint (opt) {
			if(opt
				&& typeof opt.lng === 'number'
				&& typeof opt.lat === 'number')
				return new BMap.Point(opt.lng, opt.lat)
			return null
		},
		getSize (opt) {
			if(opt
				&& typeof opt.width === 'number'
				&& typeof opt.height === 'number')
				return new BMap.Size(opt.width, opt.height)
			return null
		},
		getIcon (opt) {
			var icon = new BMap.Marker(this.getPoint(this.mapCenter)).getIcon()
			if(opt&& typeof opt.url === 'string'){
				icon = new BMap.Icon(opt.url,
					Object.assign(icon.size,this.getSize(opt.size)),{
						anchor: this.getSize(opt.anchor),
						imageOffset: this.getSize(opt.imageOffset),
						infoWindowAnchor: this.getSize(opt.infoWindowAnchor),
						printImageUrl: opt.printImageUrl
					})
				if (opt.imageSize)
					icon.setImageSize(this.getSize(opt.imageSize))
				return icon;
			}

			return null
		},
		getMarker (opt) {
			var marker = new BMap.Marker(this.getPoint(opt.point), Object.assign({}, opt, {
					offset: this.getSize(opt.offset),
					icon: this.getIcon(opt.icon),
					shadow: this.getIcon(opt.shadow)
				}));
			return marker
		},
		getLocalMessage () {
			console.log('getMessage')
			return new Promise((res, rej) => {
				var mPoint = new BMap.Point(this.center.lng, this.center.lat);
				var mOption = {
					poiRadius: 500,
					numPois: 20
				}
				var myGeo = new BMap.Geocoder();
				myGeo.getLocation(
					mPoint,
					rs => {
						res(rs)
					},
					mOption
				);
			})
		}
	},
	watch: {
		center (point) {
			this.mapCenter = point
		}
	},
	mounted () {
		this.mapInit()
	}
}