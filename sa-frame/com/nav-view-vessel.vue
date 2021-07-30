<template>
	<div class="view-vessel">
		<div class="a-view" v-for="tab in $root.tabList" :key="tab.id" :class="tab == $root.nativeTab ? 'a-view-native' : null">
			<iframe :src="tab.url" :id=" 'iframe-' + tab.id " v-if="tab.isNeedLoad"></iframe>
		</div>
		<!-- 下托拽：悬浮打开 -->
		<div class="shade-fox" v-if="$root.isDrag" 
			@dragover="$event.preventDefault();" 
			@drop="$root.rightTab = $root.dragTab; $root.right_xf();">
			<span style="font-size: 24px;">拖拽至此：悬浮打开</span>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		created() {
			
		}
	}
</script>

<style scoped>
	
	.view-vessel{height: 100%; position: relative; border: 0px #000 solid;}
	.a-view{width: 100%; height: 100%; background-color: #EEE; background: url(../admin-logo.png) no-repeat center 50%; position: absolute; }
	.a-view{opacity: 0; transition: all 0.2s;}
	.a-view-native{z-index: 100000; opacity: 1;}
	
	.a-view>iframe{width: 100%; height: 100%; border: 0px #000 solid; background-color: #EEE;}
	
	/* .iframe-no-scroll{width: calc(100% + 22px); } */
	
</style>
