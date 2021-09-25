<template>
	<!-- 鼠标右键弹出的盒子 -->
	<!-- 【向下展开动画，坐标平移动画】二者只可得其一 -->
	<div class="right-box" :style="rightStyle" v-show="rightShow" tabindex="-1" @blur="right_closeMenu2()">
		<div class="right-box-2">
			<div @click="right_closeMenu(); right_f5()"><i class="el-icon-caret-right"></i>刷新</div>
			<div @click="right_closeMenu(); right_copy()"><i class="el-icon-caret-right"></i>复制</div>
			<div @click="right_closeMenu(); right_close()"><i class="el-icon-caret-right"></i>关闭</div>
			<div @click="right_closeMenu(); right_close_other()"><i class="el-icon-caret-right"></i>关闭其它</div>
			<div @click="right_closeMenu(); right_close_all()"><i class="el-icon-caret-right"></i>关闭所有</div>
			<div @click="right_closeMenu(); right_xf()"><i class="el-icon-caret-right"></i>悬浮打开</div>
			<div @click="right_closeMenu(); right_window_open()"><i class="el-icon-caret-right"></i>新窗口打开</div>
			<div @click="right_closeMenu2();"><i class="el-icon-caret-right"></i>取消</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				rightShow: false,	// 右键菜单是否正在显示 
				rightTab: null,		// 右键菜单正在操作的 tab 
				rightStyle: {		// 右键菜单的 style 样式 
					left: '0px',		// 坐标x 
					top: '0px',			// 坐标y 
					maxHeight: '0px'	// 右键菜单的最高高度 (控制是否展开) 
				},
			}
		},
		methods: {
			// 展开右键菜单
			right_showMenu: function(tab, event) {
				this.rightTab = tab;	// 绑定操作tab  
				var e = event || window.event;
				this.rightStyle.left = (e.clientX + 1) + 'px';	// 设置给坐标x
				this.rightStyle.top = e.clientY + 'px';		// 设置给坐标y
				this.rightShow = true;	// 显示右键菜单 
				this.$nextTick(function() {
					var foxHeight = document.querySelector('.right-box-2').offsetHeight;	// 应该展开多高 
					this.rightStyle.maxHeight = foxHeight + 'px';	// 展开 
					document.querySelector('.right-box').focus();		// 获得焦点,以被捕获失去焦点事件
				});
			},
			// 关闭右键菜单 - 立即关闭
			right_closeMenu: function() {
				this.rightStyle.maxHeight = '0px';	
				this.rightShow = false;
			},
			// 关闭右键菜单 - 带动画折叠关闭 (失去焦点和点击取消时调用, 为什么不全部调用这个? 因为其它时候调用这个都太卡了) 
			right_closeMenu2: function() {
				this.rightStyle.maxHeight = '0px';	
				// this.rightShow = false;
			},
			// 右键 - 刷新
			right_f5: function() {
				this.$root.showTab(this.rightTab);	// 先转到 
				this.$root.f5Tab(this.rightTab);
			},
			// 右键 - 复制
			right_copy: function() {
				this.$root.showTab({name: this.rightTab.name, url: this.$root.getTabUrl(this.rightTab)});
			},
			// 右键 - 悬浮 
			right_xf: function() {
				this.$root.closeTab(this.rightTab);   
				this.$root.xfTab(this.rightTab);
			},
			// 右键 - 新窗口打开
			right_window_open: function() {
				// this.$root.closeTab(this.rightTab); 
				this.$root.newWinTab(this.rightTab); 
			},
			// 右键 - 关闭 
			right_close: function() {
				if(this.rightTab == this.$root.homeTab){
					return this.$message({
						dangerouslyUseHTMLString: true,
						message: '<b>这个不能关闭哦</b>',
						type: 'warning',
						showClose: true,
					});
				}
				this.$root.closeTab(this.rightTab);
			},
			// 右键 - 关闭其它 
			right_close_other: function() {
				var root = this.$root;
				// 先滑到最左边 
				root.$refs['nav-tab-bar'].scrollX = 0;	
				// 递归删除 
				var i = 0;
				var deleteFn = function() {
					// 如果已经遍历全部 
					if(i >= root.tabList.length) {
						return;
					}
					// 如果在白名单,i++继续遍历, 如果不是,递归删除 
					var tab = root.tabList[i];
					if(tab == root.homeTab || tab == this.rightTab){	
						i++;
						deleteFn();
					} else {
						root.closeTab(tab, function() {
							deleteFn();
						});
					}
				}.bind(this);
				deleteFn();
			},
			// 右键 - 关闭所有 
			right_close_all: function() {
				var root = this.$root;
				// 先滑到最左边 
				root.$refs['nav-tab-bar'].scrollX = 0;	
				// 递归删除 
				var i = 0;
				var deleteFn = function() {
					// 如果已经遍历全部 
					if(i >= root.tabList.length) {
						return;
					}
					// 如果在白名单,i++继续遍历, 如果不是,递归删除 
					var tab = root.tabList[i];
					if(tab == root.homeTab){	
						i++;
						deleteFn();
					} else {
						root.closeTab(tab, function() {
							deleteFn();
						});
					}
				}.bind(this);
				deleteFn();
			},
			
		},
		created() {
			
		}
	}
</script>

<style scoped>
	
	/* 右键菜单 样式 */
	.right-box {
		position: fixed;
		z-index: 2147483647;
		transition: max-height 0.2s;
		outline:none;
		max-height: 0px;
		overflow: hidden;
		box-shadow: 1px 1px 2px #000;
	}
	.right-box-2{font-size: 0.8em; padding: 0.5em 0; border: 1px #aaa solid; border-radius: 1px; background-color: #FFF;}
	.right-box-2>div {line-height: 2.2em; padding-left: 0.7em; padding-right: 1.8em; cursor: pointer; white-space: nowrap;}
	.right-box-2>div:hover {background-color: #ddd;color: #2D8CF0;}
	.right-box-2>div i{ margin-right: 8px;}
</style>
