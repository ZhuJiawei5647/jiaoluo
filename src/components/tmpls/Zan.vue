<template>
	<div>
		<div v-show="haszan">
			<div class="xny-icon" @click="unzan()">
				<span>{{ value }}</span>
				<img src="@/assets/dianzanhou.png">
			</div>
		</div>
		<div v-show="!haszan">
			<div class="xny-icon" @click="zan()">
				<span>{{ value }}</span>
				<img src="@/assets/dianzan.png">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			haszan: {
				type: Boolean,
				default: false
			},
			value: {
				type: Number,
				default: 0
			},
			id: {
				type: Number
			}
		},
		methods: {
			zan: (() => {
				var click = false;
				return function () {
					console.log('click:'+click)
					if (!click) {
						click = true
						this.$store.dispatch('DIAN_ZAN', this.id).then(data => {
							this.haszan = true;
							this.value ++;
							click = false;
						}).catch(err => {
							click = false;
						})
					}
					
				}
			})(),
			unzan () {

			}
		}
	}
</script>
<style>
	
</style>