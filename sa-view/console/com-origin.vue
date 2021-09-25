<template>
	<div>
		<el-alert type="success" :closable="false" title="缘起">
			<p>虽然已经用过不少优秀的后台模板，但是一直都感觉不尽完美，于是在经过激烈的思想斗争后，我决定牺牲五一假期，
			亲自做一个尝试一下， 一来正好以后自己的项目中使用，二来也算是为开源界做一点自己的贡献吧</p>
			<p>开源不易，求鼓励，求star</p>
		</el-alert>
		<el-alert type="warning" :closable="false" title="sa-admin的优点？">
			<li>上手简单：提供完整彻底的封装，不用修改一行源代码即可轻松集成</li>
			<li>示例全面：提供大量常见增删改查示例，提高你的生产力</li>
		</el-alert>
		<el-alert type="info" :closable="false" title="vue、element-ui、layer我都没用过，可以用这个模板吗">
			<li>首先你要明白，模板分为两部分（index.html框架与框架内的模板页）</li>
			<li>如果你只使用index.html框架部分，可以不必掌握vue等技术，使用时甚至你都不用改动源码， 只重写几个属性函数就可以集成到你的项目中</li>
			<li>如果你要使用框架内的模板页，则需要对vue等框架有一定的了解</li>
		</el-alert>
		<el-alert type="error" :closable="false" title="为什么是iframe，而不是SPA?">
			<li>现在前端开发比较主流的三种方式：服务器渲染、前后端分离、SPA</li>
			<li>服务器渲染：类似于jsp、asp、php等所有借助后端语言渲染视图的技术，这也是比较传统的一种方式</li>
			<li>前后端分离：脱离后端语言，只写html，就像是在写一个静态站，与服务器的交互全部走ajax</li>
			<li>SPA：在前后端分离的基础上更进一步，借助gulp、webpack等构件工具将项目打包成单页应用的一种方式</li>
			<li>本模板 正是采用的第2种方式（so：本模板可能无法满足重度SPA患者）</li>
			<ol style="padding-left: 2em;">
				<li>前后端分离，让我们脱离了后端语言的@include指令，不用为了代码的模块化再到处搜索xx技术如何热更新代码</li>
				<li>不使用webpack、gulp等构建工具也可以写代码，不必再费尽心机搭建一个代码编译环境，敏捷开发方式</li>
				<li>网站头部底部等公共部分代码的复用是我们使用构建工具的主要目的，但是我们借助iframe标签，轻松巧妙的化解了这个难题，借助iframe， 让网站成为一个真正意义上的多窗口应用</li>
				<li>返璞归真，像写静态站一样来写后台，一个html编辑器就可以强Lu所有代码，尝试一下，相信我，你会爱上这种开发模式的</li>
			</ol>
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
