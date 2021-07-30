<template>
	<!-- 左下：菜单栏 -->
	<div class="menu-box-1">
		<div class="menu-box-2">
			<!-- 菜单 -->
			<el-menu 
				class="el-menu-style-1" 
				:unique-opened="$root.uniqueOpened"
				:default-active="$root.defaultActive" 
				:default-openeds="$root.defaultOpeneds"
				:collapse="!$root.isOpen"
				@select="$root.selectMenu" 
				>
				<div v-for="(menu, index) in $root.menuList" :key="index">
					<!-- 1 如果是子菜单 -->
					<el-menu-item v-if="!menu.childList && menu.is_show && $root.showList.indexOf(menu.id) > -1" :index="menu.id + '' ">
						<span class="menu-i"><i :class="menu.icon" :title="menu.name"></i></span>
						<span class="menu-name">{{menu.name}}</span>
					</el-menu-item>
					<!-- 1 如果是父菜单 -->
					<el-submenu v-if="menu.childList && menu.is_show && $root.showList.indexOf(menu.id) > -1" :index="menu.id + '' ">
						<template slot="title">
							<span class="menu-i"><i :class="menu.icon" :title="menu.name"></i></span>
							<span class="menu-name">{{menu.name}}</span>
						</template>
						<!-- 遍历其子项 -->
						<div v-for="(menu2, index) in menu.childList" :key="index">
							<!-- 2 如果是子菜单 -->
							<el-menu-item v-if="!menu2.childList && menu2.is_show && $root.showList.indexOf(menu2.id) > -1" :index="menu2.id + '' ">
								<span class="menu-i"><i :class="menu2.icon" :title="menu2.name"></i></span>
								<span class="menu-name">{{menu2.name}}</span>
							</el-menu-item>
							<!-- 2 如果是父菜单 -->
							<el-submenu v-if="menu2.childList && menu2.is_show && $root.showList.indexOf(menu2.id) > -1" :index="menu2.id + '' ">
								<template slot="title">
									<span class="menu-i"><i :class="menu2.icon" :title="menu2.name"></i></span>
									<span class="menu-name">{{menu2.name}}</span>
								</template>
								<!-- 遍历其子项 -->
								<div v-for="(menu3, index) in menu2.childList" :key="index">
									<!-- 3 如果是子菜单 -->
									<el-menu-item v-if="!menu3.childList && menu3.is_show && $root.showList.indexOf(menu3.id) > -1" :index="menu3.id + '' ">
										<span class="menu-i"><i :class="menu3.icon" :title="menu3.name"></i></span>
										<span class="menu-name">{{menu3.name}}</span>
									</el-menu-item>
									<!-- 3 如果是父菜单 -->
									<el-submenu v-if="menu3.childList && menu3.is_show && $root.showList.indexOf(menu3.id) > -1" :index="menu3.id + '' ">
										<template slot="title">
											<span class="menu-i"><i :class="menu3.icon" :title="menu3.name"></i></span>
											<span class="menu-name">{{menu3.name}}</span>
										</template>
										<!-- 4 -->
										<div v-for="(menu4, index) in menu3.childList" :key="index">
											<el-menu-item v-if="menu4.is_show && $root.showList.indexOf(menu4.id) > -1" :index="menu4.id + '' ">
												<span class="menu-i"><i :class="menu4.icon" :title="menu4.name"></i></span>
												<span class="menu-name">{{menu4.name}}</span>
											</el-menu-item>
										</div>
									</el-submenu>
								</div>
							</el-submenu>
						</div>
					</el-submenu>
				</div>
			</el-menu>
			<!-- tab左拖拽：关闭 -->
			<div class="shade-fox" v-if="$root.isDrag" 
				@dragover="$event.preventDefault();" 
				@drop="$root.rightTab = $root.dragTab; $root.right_close();">
				<span style="font-size: 16px;">关闭</span>
			</div>
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
	/* 1 2 配合，把滚动条隐藏 */
	.menu-box-1{width: calc(var(--nav-left-width) + 20px); height: 100%; overflow-y: auto;}
	.menu-box-2{width: calc(var(--nav-left-width) + 1px); padding-bottom: 200px;}
	
	.menu-box-1 i[class^=el-icon-]{font-size: 16px;}
	.menu-box-2 .menu-i{display: inline-block; vertical-align: top; width: 29px;}
	
	/* 动画速度加快 */
	.menu-box-1,.menu-box-2 *{transition: all 0.2s;}
	
	/* 隐藏右边框 */
	.el-menu{border: 0px;}
	
	/* 一级菜单，高度45px */
	.el-menu-item,
	.el-submenu__title{height: 45px !important; line-height: 45px !important;}
	
	/* 二级以下菜单，高度40px */
	.el-submenu .el-menu-item,
	.el-submenu .el-submenu .el-submenu__title{height: 40px !important; line-height: 40px !important;}
	
	/* 二级菜单 左边距 */
	.el-submenu .el-menu-item,
	.el-submenu .el-submenu .el-submenu__title{padding-left: 2.5em !important;}
	
	/* 三级菜单 左边距 */
	.el-submenu .el-submenu .el-menu-item,
	.el-submenu .el-submenu .el-submenu .el-submenu__title{padding-left: 3.6em !important;}
	
	/* 四级菜单 左边距 */
	.el-submenu .el-submenu .el-submenu .el-menu-item{padding-left: 4.7em !important;}
	
</style>
