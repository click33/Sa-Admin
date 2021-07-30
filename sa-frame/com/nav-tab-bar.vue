<template>
	<!-- 右边，第二行：tab栏 -->
	<div class="towards-box">
		<div class="towards-left" @click="scrollToLeft" title="向左滑">
			<i class="el-icon-arrow-left"></i>
		</div>
		<div class="towards-middle" @dblclick="$root.$refs['com-add-tab'].atOpen()">
			
			<div class="tab-title-box" :style="{left: scrollX + 'px'}" @dblclick.stop="">
				<div 
					v-for="tab in $root.tabList" 
					:key="tab.id"
					:id=" 'tab-' + tab.id " 
					class="tab-title" 
					:class=" (tab == $root.nativeTab ? 'tab-native' : '') " 
					@click="$root.showTab(tab)"
					@contextmenu.prevent="$root.right_showMenu(tab, $event)"
					draggable="true"
					@dragstart="$root.isDrag = true; $root.dragTab = tab"
					@dragend="$root.isDrag = false;"
					>
					<div class="tab-title-2">
						<!-- <i class="el-icon-caret-right"></i> -->
						<span :style=" tab.is_have_en ? 'font-weight: 400;' : '' ">{{tab.name}}</span>
						<i class="el-icon-close" v-if="!tab.hide_close" @click.stop="$root.closeTab(tab)"></i> 
					</div>
				</div>
			</div>
		</div>
		<div class="towards-right" @click="scrollToRight" title="向右滑">
			<i class="el-icon-arrow-right"></i>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				scrollX: 0		,// 滚动条位置 
			}
		},
		methods: {
			// ------------------- tab左右滑动  -------------------- 
			// 视角向左滑动一段距离 
			scrollToLeft: function() {
				var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
				this.scrollX += width / 8;	// 视角向左滑动一段距离
				// 越界检查
				setTimeout(function() {
					if(this.scrollX > 0){
						this.scrollX = 0;
					}
				}.bind(this), 200);
			},
			// 视角向右滑动一段距离 
			scrollToRight: function() {
				var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
				var tabListWidth = document.querySelector('.tab-title-box').clientWidth;	// title总盒子宽度
				var rightLimit = (0 - tabListWidth + width / 2);	// 右滑的极限
				this.scrollX -= width / 8;		// 视角向右滑动一段距离
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
		},
		created() {
			
		}
	}
</script>

<style scoped>
	
	.towards-box>div{height: 100%; position: absolute;}
	
	.towards-left,.towards-right{width: 24px; text-align: center; background-color: #FFF; cursor: pointer; line-height: 35px;} 
	.towards-left{border-right: 1px #eee solid;}
	.towards-right{border-left: 1px #eee solid; right: 0px;}
	.towards-left:hover i,.towards-right:hover i{font-size: 1.1em;font-weight: bold;}
	
	.towards-middle{width: 10000px; overflow: auto;/* calc(100% - 50px) */ left: 25px;background-color: #EEE;}
	.tab-title-box{display: inline-block; position: absolute; left: 0px;}
	.tab-title{font-size: 13px; cursor: pointer; float: left; transition: all 0.15s;white-space: nowrap;overflow: hidden;text-decoration: none; color: #333;}
	.tab-title-2{padding: 0px 10px; height: 35px; margin-right: 1px; background-color: #FFF; line-height: 35px; }
	.tab-title-2{transition: padding 0.1s, margin 0.1s;}
	.tab-title-2 *{transition: all 0.0s;}
	/* .tab-title .el-icon-caret-right{color: #EEE; font-size: 1.7em; position: relative; top: 4px;} */
	.tab-title .el-icon-close{display: inline-block; border-radius: 50%; padding: 1px; color: #ccc; margin-left: -8px;}
	.tab-title .el-icon-close:hover{background-color: red; color: #FFF;}
	.tab-title span{display: inline-block; margin-left: 10px; margin-right: 10px;}
	.tab-title:hover span,.tab-native span{font-weight: bold;}
	
</style>
