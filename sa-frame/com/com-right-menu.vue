<template>
	<!-- 鼠标右键弹出的盒子 -->
	<!-- 【向下展开动画，坐标平移动画】二者只可得其一 -->
	<div class="right-box" :style="$root.rightStyle" v-show="$root.rightShow" tabindex="-1" @blur="$root.right_closeMenu2()">
		<div class="right-box-2">
			<div @click="$root.right_closeMenu(); $root.right_f5()"><i class="el-icon-caret-right"></i>刷新</div>
			<div @click="$root.right_closeMenu(); $root.right_copy()"><i class="el-icon-caret-right"></i>复制</div>
			<div @click="$root.right_closeMenu(); $root.right_close()"><i class="el-icon-caret-right"></i>关闭</div>
			<div @click="$root.right_closeMenu(); $root.right_close_other()"><i class="el-icon-caret-right"></i>关闭其它</div>
			<div @click="$root.right_closeMenu(); $root.right_close_all()"><i class="el-icon-caret-right"></i>关闭所有</div>
			<div @click="$root.right_closeMenu(); $root.right_xf()"><i class="el-icon-caret-right"></i>悬浮打开</div>
			<div @click="$root.right_closeMenu(); $root.right_window_open()"><i class="el-icon-caret-right"></i>新窗口打开</div>
			<div @click="$root.right_closeMenu2();"><i class="el-icon-caret-right"></i>取消</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
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
