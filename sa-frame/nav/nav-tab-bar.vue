<template>
	<!-- 右边，第二行：tab栏 -->
	<div class="towards-box">
		<div class="towards-left" @click="scrollToLeft()" title="向左滑">
			<i class="el-icon-arrow-left"></i>
		</div>
		<div class="towards-middle" @dblclick="$root.$refs['com-add-tab'].atOpen()" @drop="$event.preventDefault(); $event.stopPropagation();">
			
			<div class="tab-title-box" :style="{left: scrollX + 'px'}" @dblclick.stop="">
				<vuedraggable v-model="$root.tabList" chosen-class="chosen-tab" animation="500" >
			    	<div 
			    		v-for="tab in $root.tabList" 
			    		:key="tab.id"
			    		:id=" 'tab-' + tab.id " 
			    		class="tab-title" 
			    		:class=" (tab == $root.nativeTab ? 'tab-native' : '') " 
			    		@click="$root.showTab(tab)"
			    		@contextmenu.prevent="$root.$refs['com-right-menu'].right_showMenu(tab, $event)"
			    		draggable="true"
			    		@dragstart="$root.isDrag = true; $root.dragTab = tab"
			    		@dragend="$root.isDrag = false;"
			    		>
			    		<div class="tab-title-2">
			    			<!-- <i class="el-icon-caret-right"></i> -->
			    			<span>{{tab.name}}</span>
			    			<i class="el-icon-close" v-if="!tab.hideClose" @click.stop="$root.closeTab(tab)"></i> 
			    		</div>
			    	</div>
				</vuedraggable>
			</div>
			
			
		</div>
		<div class="towards-right" @click="scrollToRight()" title="向右滑">
			<i class="el-icon-arrow-right"></i>
		</div>
	</div>
</template>

<script>
	module.exports = {
		components: {
			"vuedraggable": window.vuedraggable,	// vuedraggable 
		},
		data() {
			return {
				scrollX: 0		,// 滚动条位置 
			}
		},
		methods: {
			// ------------------- tab左右滑动  -------------------- 
			// 视角向左滑动一段距离 
			scrollToLeft: function(scroll_width) {
				var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
				this.scrollX += scroll_width || width / 8;	// 视角向左滑动一段距离
				// 越界检查
				setTimeout(function() {
					if(this.scrollX > 0){
						this.scrollX = 0;
					}
				}.bind(this), 200);
			},
			// 视角向右滑动一段距离 
			scrollToRight: function(scroll_width) {
				var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
				var tabListWidth = document.querySelector('.tab-title-box').clientWidth;	// title总盒子宽度
				var rightLimit = (0 - tabListWidth + width / 2);	// 右滑的极限
				this.scrollX -= scroll_width || width / 8;		// 视角向右滑动一段距离
				// 越界检查
				setTimeout(function() {
					if(this.scrollX < rightLimit){
						this.scrollX = rightLimit;
					}
					// 同时防止左边越界 
					if(this.scrollX > 0){
						this.scrollX = 0;
					}
				}.bind(this), 200);
			},
			// 自动归位
			scrollToAuto: function() {
				// console.log('自动归位=========');
				try{
					// 最后一个不用归位了 
					// if(this.nativeTab == this.tabList[this.tabList.length - 1]){
					// 	return;
					// }
					var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
					var left = document.querySelector('.tab-native').lastChild.offsetLeft;	// 当前native-tilte下一个距离左边的距离
					// console.log(width, left, this.scrollX);
					// 如果在视图右边越界
					if(left + this.scrollX > (width - 200)){
						return this.scrollToRight();
					}
					// 如果在视图左边越界 
					if(left + this.scrollX < 0) {
						return this.scrollToLeft();
					}
				}catch(e){
					// throw e;
				}
			},
			// 让鼠标滚轮变为横向滚动
			initScroll: function() {
				var scroll_width = 60;  // 设置每次滚动的长度，单位 px
				var scroll_events = "mousewheel DOMMouseScroll MozMousePixelScroll";  // 鼠标滚轮滚动事件名
				$('.towards-middle').on(scroll_events, function(e) {
					var delta = e.originalEvent.wheelDelta;  // 鼠标滚轮滚动度数
					// 滑轮向上滚动，滚动条向左移动，scrollleft-
					if(delta > 0) {
						this.scrollToLeft(scroll_width);
					}
					// 滑轮向下滚动，滚动条向右移动，scrollleft+
					else {
						this.scrollToRight(scroll_width);
					}
				}.bind(this));
			}
		},
		created() {
			this.$nextTick(function() {
				this.initScroll();
			})
		}
	}
</script>

<style scoped>
	
	.towards-box>div{height: 100%; position: absolute;}
	
	.towards-left,.towards-right{width: 24px; text-align: center; background-color: #FFF; cursor: pointer;} 
	.towards-left{border-right: 1px #fff solid;}
	.towards-right{border-left: 1px #fff solid; right: 0px;}
	.towards-left:hover i,.towards-right:hover i{font-weight: 700;/* font-weight: bold; */}
	
	.towards-middle{width: 10000px; overflow: auto;/* calc(100% - 50px) */ left: 25px;background-color: #FFF;}
	.tab-title-box{display: inline-block; position: absolute; left: 0px; transition: all 0.2s;}
	.tab-title{font-size: 12px; cursor: pointer; float: left; white-space: nowrap; overflow: hidden; text-decoration: none; color: #333;}
	.tab-title-2{padding: 0px 10px; /* background-color: #FFF; */ }
	.tab-title-2{transition: padding 0.1s, margin 0.1s;}
	/* .tab-title .el-icon-caret-right{color: #EEE; font-size: 1.7em; position: relative; top: 4px;} */
	.tab-title .el-icon-close{display: inline-block; border-radius: 50%; padding: 1px; color: #ccc; margin-left: -8px;}
	.tab-title .el-icon-close:hover{background-color: red; color: #FFF;}
	.tab-title span{display: inline-block; margin-left: 10px; margin-right: 10px;}
	.tab-title:hover span,.tab-native span{/* font-weight: bold; */}
	
	
	/* 卡片样式 */
	/* .tab-title-box>div{line-height: 35px;} */
	.tab-title{transition: width 0.2s, background 0s, border 0.2s;}
	.tab-native{transition: width 0.2s, background 0.2s, border 0.2s;}
	.tab-title{border-radius: 1.5px; border: 1px #e5e5e5 solid; line-height: 28px; height: 27px; margin: 3px 1.5px; background-color: #fff;}
	/* .tab-title.tab-native{border: 1px #409EFF solid; background-color: #409EFF; color: #fff; }
	.tab-title:hover{border: 1px #409EFF solid;} */
	/* .chosen-tab .tab-title-2{background-color: red;} */
	
</style>
