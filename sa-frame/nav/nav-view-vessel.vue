<template>
	<div class="view-vessel">
		<div class="a-view" v-for="tab in $root.viewList" :key="tab.id" :class="tab == $root.nativeTab ? 'a-view-native' : null">
			<!-- vue视图 -->
			<template v-if="tab.view">
				<component :is="tab.view" class="vue-com-view" v-if="tab.isNeedLoad"></component>
			</template>
			<!-- iframe视图 -->
			<template v-else>
				<iframe :src="tab.url" :id=" 'iframe-' + tab.id " v-if="tab.isNeedLoad" @load="onloadIframe(tab.id)"></iframe>
			</template>
		</div>
		<!-- tab被拖拽时的遮罩（下托拽：悬浮打开） -->
		<div class="shade-fox" v-if="$root.isDrag" 
			@dragover="$event.preventDefault();" 
			@drop="$event.preventDefault(); $event.stopPropagation(); $root.xfTab($root.dragTab); $root.closeTab($root.dragTab);">
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
			// iframe加载完毕后清除其背景 loading 图标
			onloadIframe: function(iframeId) {
				// console.log('iframeId', iframeId);
				var iframe = document.querySelector('#iframe-' + iframeId);
				if(iframe != null) {
					iframe.parentElement.style.backgroundImage='none';
				}
			},
		},
		created() {
			
		}
	}
</script>

<style scoped>
	
	.view-vessel{height: 100%; position: relative; border: 0px #000 solid;}
	.a-view{width: 100%; height: 100%; background-color: #EEE; background: url(../index/admin-loading.gif) no-repeat center 50%; position: absolute; }
	.a-view{opacity: 0; transition: all 0.2s;}
	.a-view-native{z-index: 100000; opacity: 1;}
	
	.a-view>iframe{width: 100%; height: 100%; border: 0px #000 solid;}
	.a-view>.vue-com-view{width: 100%; height: 100%; overflow: auto; background-color: #EEE;}
	
	/* .iframe-no-scroll{width: calc(100% + 22px); } */
	
</style>
