<template>
	<div>
		<div class="imgcut-img-box" :style="[boxstyle]">
			<img v-show="value" :src="value" @load="imgload">
			<input class="imgcut-file-input" type="file" @click="chooseImage" @change="previewImage">
		</div>
		<crop v-model="cropshow" :orientation="orientation" :url="cropurl" :aspect-ratio="1.5" @cancel="" @crop="crop"></crop>
	</div>
</template>
<script>
	import Crop from './Crop'
	import util from '@/mixins/util'
	const { EXIF } = require('@/js/exif')

	export default {
		data () {
			return {
				cropurl: '',
				orientation: null,
				cropshow: false,
				boxstyle: {
					'background': 'url('+ require('@/assets/camera.png') +') center center no-repeat',
					'background-size': '70px'
				}
			}
		},
		props: {
			value: {
				type: String
			}
		},
		components: {Crop},
		mixins: [util],
		methods: {
			chooseImage (event) {
				if (this.isWeiXin && !this.isPC()) {
					event.preventDefault();
					this.$wechat.chooseImage({
						count: 1,
						success: (res) => {
							console.log(res)
							alert('已选择 ' + res.localIds.length + ' 张图片');
							// if (window.wxjs_is_wkwebview) {
							this.$wechat.getLocalImgData({
								localId: res.localIds[0], // 图片的localID
								success: (res) => {
									if(this.isAndroid()){
										this.cropurl = 'data:image/jpeg;base64,' + res.localData.replace(/\n/g,'');
									}else if(this.isIOS()) {
										this.cropurl = res.localData.replace('jgp', 'jpeg'); // localData是图片的base64数据，可以用img标签显示
									}else {
										this.cropurl = res.localData;
									}
									this.cropshow = true;
								}
							});
						},
						fail: (res) => {
							this.$vux.loading.hide()
							console.log(res)
							alert('照片选择失败')
						}
				    });
				}
			},
			previewImage (event) {
				var that = this;
				EXIF.getData(event.target.files[0], function () {
					this.orientation = EXIF.getTag(this, 'Orientation');

					var reader = new FileReader();
					alert(this.orientation)
					reader.readAsDataURL(event.target.files[0])
					event.target.value = '';
					reader.onload = evt => {
						console.log(evt.target)
						that.cropurl = evt.target.result;
						that.cropshow = true;
					}
				})
			},
			imgload (event) {
				console.log(event.target.offsetHeight)
			},
			crop (url) {
				$.ajax({
				    type: "POST",
				    url: "/api/pic/upload0",
				    data: {
				        file: url
				    },
				    success: (data) => {
				    	var d = JSON.parse(data)
				        this.$emit('input', d.url)
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown) {
				        alert("上传失败，请检查网络后重试");
				    }
				});
			}
		}
	}
</script>
<style>
	.imgcut-img-box{
		padding: 0;
		width: 100%;
		height: 100%;
		background-color:#fff;
		position: relative;
	}
	.imgcut-img-box img{
		width: 100%;
		height: 100%;
		display: inline-block;
	}
	.imgcut-file-input{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 10;
	}
</style>