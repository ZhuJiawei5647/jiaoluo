<template>
  <div id="app" style="height: 100%; overflow: scroll">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
  	$('body').on('touchmove', (e) => {
  		if($(e.target).hasClass('stop-page-move')){
  			e.preventDefault();
  		}
  	})
  }
}
</script>

<style lang="less">
@import './styles/complete.css';
@import './styles/quan.css';
@import '~vux/src/styles/reset.less';

body{
  background-color: #f2f2f2;
}
</style>
