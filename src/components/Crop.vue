<template>
	<popup v-model="show" style="height: 100%;">
		<div class="crop-box">
			<div v-show="url" class="image-box stop-page-move">
				<img :src="url" @load="imgload">
				<div class="cover"></div>
				<div class="crop" :style="[cropstyle]" @touchstart="movestart" @mousedown="movestart" @touchmove="moveactive" @mousemove="moveactive" @touchend="moveend" @mouseup="moveend" @touchcancel="moveend" @mouseover="moveend"></div>
			</div>
			<ul class="button-list">
				<li>
					<button @click="cancel">取消</button>
				</li>
				<li>
					<button @click="crop">裁剪</button>
				</li>
			</ul>
		</div>
	</popup>
</template>
<script>
	import { Popup } from 'vux'

	export default {
		data () {
			return {
				show: false,
				cropstyle: {},
				width: 0,
				height: 0,
				canmove: false,
				cw: 0,
				ch: 0,
				ct: 0,
				cl: 0,
				clx: 0,
				cly: 0
			}
		},
		props: {
			url: {
				type: String
			},
			aspectRatio: {
				type: Number,
				default: 1
			},
			value: {
				type: Boolean
			},
			orientation: {
				type: Number,
				default: -1
			}
		},
		components: {Popup},
		watch: {
			show(val) {
				this.$emit('input', val)
			},
			value (val) {
				this.show = val
			}
		},
		methods: {
			imgload (event) {
				console.log(event.target)
				this.width = event.target.offsetWidth,
				this.height = event.target.offsetHeight;
				this.setCropstyle()
			},
			setCropstyle () {
				var width = this.width,
					height = this.height,
					r = this.aspectRatio,
					cw,ch,ct,cl;

				if (r * height > width) {
					cw = width * 0.5;
					ch = cw / r;
				} else {
					ch = height * 0.5;
					cw = ch * r;
				}

				ct = (height - ch) * 0.5;
				cl = (width - cw) * 0.5;

				this.ct = ct;
				this.cl = cl;
				this.cw = cw;
				this.ch = ch;
				this.cropstyle = {
					width: cw + 'px',
					height: ch + 'px',
					top: ct + 'px',
					left: cl + 'px',
					backgroundImage: 'url('+ this.url +')',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '-'+ cl + 'px -'+ ct + 'px',
					backgroundSize: width + 'px ' + height + 'px'
				}
			},
			movestart (event) {
				if (event.type === 'touchstart') {
					this.clx = event.touches[0].clientX;
					this.cly = event.touches[0].clientY;
				} else {
					this.clx = event.clientX;
					this.cly = event.clientY;
				}
				this.canmove = true;
			},
			moveactive: (() => {
				var moving = false;
				return function (event) {
					if (moving) return;
					moving = true
					setTimeout(() => {
						moving = false;
					}, 50)
					if (this.canmove) {
						if (event.type === 'touchmove') {
							var curclx = event.touches[0].clientX,
								curcly = event.touches[0].clientY;
						} else {
							var curclx = event.clientX,
								curcly = event.clientY;
						}
						var curct = this.ct + (curcly - this.cly),
							curcl = this.cl + (curclx - this.clx);

						if (curct < 0) curct = 0;
						if (curcl < 0) curcl = 0;
						if (this.ch + curct > this.height) curct = this.height - this.ch;
						if (this.cw + curcl > this.width) curcl = this.width - this.cw;

						this.ct = curct;
						this.cl = curcl;
						this.clx = curclx;
						this.cly = curcly;
						this.cropstyle = {
							width: this.cw + 'px',
							height: this.ch + 'px',
							top: curct + 'px',
							left: curcl + 'px',
							backgroundImage: 'url('+ this.url +')',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: '-'+ curcl + 'px -'+ curct + 'px',
							backgroundSize: this.width + 'px ' + this.height + 'px'
						}
					}
				}
			})(),
			moveend (event) {
				this.canmove = false;
			},
			cancel () {
				this.$emit('cancel')
				this.show = false;
			},
			crop () {
				this.$vux.loading.show({
					text: '请稍等'
				})
				var img = new Image()
				img.onload = () => {
					this.imgchange(img).then(img => {
						var cvs = document.createElement('canvas')
						    ,ctx = cvs.getContext("2d")
						    ,width = this.width
						    ,height = this.height

						cvs.width = width;
						cvs.height = height;
						ctx.drawImage(img, 0, 0, width, height);

						//把选中框里的图片内容存起来
						var imageData = ctx.getImageData(this.cl, this.ct, this.cw, this.ch);
						cvs.width = this.cw;
						cvs.height = this.ch;
						//然后再画上去
						ctx.putImageData(imageData, 0, 0);
						this.$emit('crop', ctx.canvas.toDataURL())
						this.$vux.loading.hide()
						this.show = false;
					})
				}
				img.src = this.url
			},
			imgchange (img) {
				return new Promise((resolve, reject) => {
				    var canvas = document.createElement("canvas");
				    var rotateshow;
				    switch (this.orientation){
			            case 6:
			                rotateshow = util.rotateImg(img,'left',canvas);
			                break;
			            case 8:
			                rotateshow = util.rotateImg(img,'right',canvas);
			                break;
			            case 3:
			                util.rotateImg(img,'right',canvas);
			                rotateshow = util.rotateImg(img,'right',canvas);
			                break;
			            default:
			                rotateshow = img.src;
			        }
			        var newimg = new Image();
			        newimg.onload = () => {
			            resolve(newimg)
			        }
			        newimg.src = rotateshow; 
				})
			},
			rotateImg: function (img, direction, canvas) {
			    var min_step = 0;
			    var max_step = 3;
			    //var img = document.getElementById(pid);
			    if (img == null) return;
			    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
			    var height = img.height;
			    var width = img.width;
			    //var step = img.getAttribute('step');
			    var step = 2;
			    if (step == null) {
			        step = min_step;
			    }
			    if (direction == 'right') {
			        step++;
			        //旋转到原位置，即超过最大值
			        step > max_step && (step = min_step);
			    } else {
			        step--;
			        step < min_step && (step = max_step);
			    }
			    var degree = step * 90 * Math.PI / 180;
			    var ctx = canvas.getContext('2d');
			    switch (step) {
			        case 0:
			            canvas.width = width;
			            canvas.height = height;
			            ctx.drawImage(img, 0, 0);
			            break;
			        case 1:
			            canvas.width = height;
			            canvas.height = width;
			            ctx.rotate(degree);
			            ctx.drawImage(img, 0, -height);
			            break;
			        case 2:
			            canvas.width = width;
			            canvas.height = height;
			            ctx.rotate(degree);
			            ctx.drawImage(img, -width, -height);
			            break;
			        case 3:
			            canvas.width = height;
			            canvas.height = width;
			            ctx.rotate(degree);
			            ctx.drawImage(img, -width, 0);
			            break;
			    }
			    return canvas.toDataURL();
			},
		}
	}
</script>
<style scoped>
	.crop-box{
		height: 100%;
		width: 100%;
	}
	.image-box{
		width: 100%;
		margin: 0 auto;
		position: relative;
	}
	.image-box img{
		display: block;
		width: 100%;
	}
	.cover{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #000;
		opacity: 0.7;
	}
	.crop{
		position: absolute;
	}
	.button-list{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.button-list li{
		float: left;
		width: 50%;
		text-align: center;
	}
	.button-list li button{
		text-align: center;
		width: 60%;
		margin: 10px 0;
		line-height: 30px;
		color: #fff;
		background-color: #20b907;
		border-radius: 4px;
		background-clip: padding-box;
	}
</style>