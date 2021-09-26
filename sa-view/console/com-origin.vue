<template>
	<div>
		<el-alert type="success" :closable="false" title="缘起">
			<p>虽然已经用过不少优秀的后台模板，但是一直都感觉不尽完美，于是在经过激烈的思想斗争后，我决定牺牲五一假期，
			亲自做一个尝试一下， 一来正好以后自己的项目中使用，二来也算是为开源界做一点自己的贡献吧</p>
			<p>开源不易，求鼓励，求star</p>
		</el-alert>
		<el-alert type="warning" :closable="false" title="Sa-Admin 介绍">
			<p>Sa-Admin 是一个多窗口后台模板，纯 html 无后端代码，无需脚手架即可直接运行，流畅、易上手、提高生产力。核心技术栈：Vue + Element-UI + jquery + layer。</p>
			<div style="height: 10px;"></div>
			<p>
				Sa-Admin 最大的特点是无需搭建 vue-cli 脚手架，随便一个 html 预览工具（比如 
				<el-link style="font-size: 12px; color: #999;" href="https://www.dcloud.io/hbuilderx.html" target="_blank">HBuilderX</el-link>
				）即可直接运行（采用 http-vue-loader 技术实现）。
				更多信息请参考项目开源首页。
			</p>
		</el-alert>
		<el-alert type="info" :closable="false" title="功能说明">
			<li>视图：支持 iframe 和 .vue 两种视图方式，支持一、二、三、四级菜单。</li>
			<li>操作：工具栏提供常见操作按钮：折叠、搜索、刷新、账号、便签、主题切换、全屏切换。</li>
			<li>主题：内置十种主题，也可方便的扩展主题。</li>
			<li>切换：支持拖拽排序、切换视图自动记录hash，刷新页面自动打开上次的视图。</li>
			<li>右键：tabbar栏支持右键菜单：悬浮打开、新窗口打开、视图复制、快捷关闭等操作。</li>
			<li>接口：开放一系列api，可方便的用js新建、打开、切换视图等动作。</li>
			<li>示例：提供大量常见示例，以及各种表单组件的封装，助你快速CRUD。</li>
		</el-alert>
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
</style>
