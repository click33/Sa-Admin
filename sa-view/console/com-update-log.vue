<!-- 第一行统计数据 -->
<template>
	<el-timeline>
		<!-- ---------- 一个版本 第40个----------- -->
		<el-timeline-item timestamp="v1.40.0 &emsp; 2021-9-26" placement="top" type="primary">
			<li>重构：使用 http-vue-loader 重构底层，脱胎换骨</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 第39个----------- -->
		<el-timeline-item timestamp="v2.4.4 &emsp; 2020-11-14" placement="top" type="primary">
			<li>修复：当最后一个tab卡片有滑动条时，其它tab滚动条失效的bug</li>
			<li>修复：sa.js增加部分判断，使之在不引入jquery时放弃执行部分代码</li>
			<li>修复: layer弹窗回车事件影响到首页便签的bug</li>
			<li>优化：页面初始打开时，按钮高亮，更鲜艳的颜色 </li>
		</el-timeline-item>
		<!-- ---------- 一个版本 第38个----------- -->
		<el-timeline-item timestamp="v2.4.3 &emsp; 2020-10-02" placement="top" type="primary">
			<li>修复：修复在没有成功初始化的情况下，调整窗口大小控制台报错的bug</li>
			<li>修复：修复单窗口显示时，面包屑显示位置异常的bug</li>
			<li>修复：修复main.html页一直显示loading图标的bug</li>
			<li>新增：离线包新增swiper相关文件</li>
			<li>优化：优化菜单id为number类型时不能显示的缺点</li>
			<li>优化：layer的弹窗，双击可以全屏，再次双击缩小 </li>
		</el-timeline-item>
		<!-- ---------- 一个版本 第37个----------- -->
		<el-timeline-item timestamp="v2.4.2 &emsp; 2020-09-03" placement="top" type="primary">
			<li>新增：新增弹窗回车事件，可方便的关闭弹窗</li>
			<li>新增：新增判断，考虑到table刷新高度时有横向滚动条对高度的影响</li>
			<li>优化：改变c-item的min-width，避免了某些情况下无法对齐的问题</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 第36个----------- -->
		<el-timeline-item timestamp="v2.4.1 &emsp; 2020-08-25" placement="top" type="primary">
			<li>优化：sort_type改为sortType 小驼峰风格</li>
			<li>优化：查询列表页添加回车事件，更流畅的体验</li>
			<li>优化：优化sa.showImageList函数，更智能的判断图片数组</li>
			<li>优化：删除logo小图</li>
			<li>修复：去掉了站长统计四个字，因为它影响到了布局</li>
			<li>修复：修复弹出窗口底部按钮间距过大的bug</li>
			<li>新增：集成登录验证与全局配置方法</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 第35个----------- -->
		<el-timeline-item timestamp="v2.4.0 &emsp; 2020-08-22" placement="top" type="primary">
			<li>新增：多行textarea文本域示例</li>
			<li>新增：评分组件示例</li>
			<li>新增：新增数据导出功能，纯前端实现，不借助后端也能导出Excel数据</li>
			<li>新增：增加弹出式新增、页面重置、多选删除、页面重置等快捷操作按钮</li>
			<li>新增：表格查询页面，在input里回车时提交查询操作</li>
			<li>新增：新增jq22搜集</li>
			<li>新增：权限设置页面，新增全选按钮 </li>
			<li>新增：菜单搜索功能 </li>
			<li>新增：sa.js新增一系列API，更强大的工具类 </li>
			<li>升级：二三级菜单也可以添加图标了</li>
			<li>优化：优化表格增删改查动画，更加流畅的操作</li>
			<li>优化：全面优化页面布局，更舒服的配色及排版</li>
			<li>优化：优化登录页面方框圆角尺寸</li>
			<li>优化：优化阴影样式 </li>
			<li>集成：集成form-generator，在线拖拉拽代码生成器</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.7 &emsp; 2020-04-18" placement="top" type="primary">
			<li>新增：首页增加懒加载功能</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.6 &emsp; 2020-04-17" placement="top" type="primary">
			<li>优化：部分样式</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.6 &emsp; 2020-04-17" placement="top" type="primary">
			<li>优化：部分样式</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.5 &emsp; 2020-04-17" placement="top" type="primary">
			<li>优化：部分模板页样式</li>
			<li>更换：更换堆表单方式为c-item</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.4 &emsp; 2020-03-05" placement="top" type="primary">
			<li>去除：tab双击刷新</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.3 &emsp; 2020-03-02" placement="top" type="primary">
			<li>新增：tab双击刷新</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.2 &emsp; 2020-3-1" placement="top" type="primary">
			<li>新增：初始加载loading图标</li>
			<li>新增：函数菜单（点击菜单执行一个函数）</li>
			<li>更新：my-code.js重命名为sa-code.js</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.1 &emsp; 2020-2-29" placement="top" type="primary">
			<li>修复：部分bug</li>
			<li>
				上线：vue单页版上线，传送门：
				<el-link type="primary" href="http://sa-vue-admin.dev33.cn/" target="_blank">http://sa-vue-admin.dev33.cn/</el-link>
			</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.3.0 &emsp; 2020-2-25" placement="top" type="primary">
			<li>优化：改变部分文件夹结构</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.6 &emsp; 2020-2-17" placement="top" type="primary">
			<li>新增：新增主题：简约式灰蓝</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.5 &emsp; 2020-2-14" placement="top" type="primary">
			<li>
				新增：新增在线论坛：
				<el-link type="primary" href="javascript:parent.sa_admin.showMenuById('1-11');">点击打开，在线提交意见反馈(新)</el-link>
			</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.4 &emsp; 2020-2-13" placement="top" type="primary">
			<li>优化：优化整体样式</li>
			<li>优化：loading加载框的样式</li>
			<li>增加：tab悬浮打开的z-index自动切换功能</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.3 &emsp; 2020-2-9" placement="top" type="primary">
			<li>增加：增加底部按钮式的弹窗示例</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.2 &emsp; 2019-7-16" placement="top" type="primary">
			<li>增加：增加弹出式修改的示例</li>
			<li>增加：增加窗口之间通信的方法，详细请查看集成文档</li>
			<li>完善：完善readme.md</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.1 &emsp; 2020-1-31" placement="top" type="primary">
			<li>修复：替换掉所有bootcss的cdn，因为它太不稳定了，三天一小瘫，五天一大瘫</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.2.0 &emsp; 2020-1-20" placement="top" type="primary">
			<li>集成：集成鉴权功能，详细请查看文档 </li>
			<li>新增：新增大量模板示例，可帮助你快速增删改查 </li>
			<li>修复：在边缘处右键菜单文字变形的bug </li>
			<li>重构：改了一下首页样式 </li>
			<li>优化：将element-ui版本更换至了 2.13.0 </li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.1.2 &emsp; 2020-1-18" placement="top" type="primary">
			<li>修复：修复登录页鼠标不能与背景粒子交互的bug </li>
			<li>优化：右键关闭其它和关闭全部时，首先滑到做左边，动画更直观 </li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.1.0 &emsp; 2020-1-17" placement="top" type="primary">
			<li>新增：更换了登录页</li>
			<li>新增：右键菜单新增复制按钮，可直接复制一个tab在新窗口打开 </li>
			<li>新增：右键菜单新增折叠关闭动画，失去焦点时和点击取消时，菜单以折叠动画的方式关闭 </li>
			<li>新增：右键菜单新增盒子阴影，更有立体感</li>
			<li>新增：新增主题：pro钛合金、沉淀式黑蓝 </li>
			<li>修复：切换tab时，不能自动滑动的bug</li>
			<li>重构：重新设置了UI样式，详细参考模板示例</li>
			<li>注意：表格内操作按钮类样式 .c-button 换成了 .c-btn  </li>
			<li>重构：修改了sa.js，取消$util对象，所有有关$util的函数全部移到sa对象上，</li>
			<li>注意：原调用方式sa.$util.getUrlArgs('id') 现改为：sa.p('id')</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.0.2 &emsp; 2020-1-15" placement="top" type="primary">
			<li>修复bug：tab卡文字向上偏移了1px的问题</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.0.1 &emsp; 2020-1-14" placement="top" type="primary">
			<li>修复bug：在方块、3D流、3D翻转切换效果下，tab切换错乱的bug</li>
			<li>修复bug：iframe的url发生改变后，刷新按钮刷新为旧地址的bug</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v2.0.0 &emsp; 2020-1-13" placement="top" type="primary">
			<li>新增：卡片右击菜单弹出动画 </li>
			<li>新增：tab右键菜单动画</li>
			<li>新增：新增tab关闭动画, 在关闭tab、右键关闭其它、关闭全部时有了更流畅的体验</li>
			<li>新增：tab选项卡拖拽效果，上拽新窗口打开，下拽悬浮打开，左拽关闭，在tab处拖拽一下体验一下吧</li>
			<li>新增：在tab栏空白处，双击：可以打开添加新tab操作弹窗 </li>
			<li>新增：增加记住上一次最后打开的窗口功能，刷新也可以记住窗口（在初始化模板时，增加is_reme_open配置项）</li>
			<li>新增: hash链接跳转功能，可灵活的用鼠标前后键切换tab窗口 </li>
			<li>新增：便签功能，可以方便的保存一些临时数据 </li>
			<li>修复：首页114行有个重复的class</li>
			<li>修复：版本号打印不对 </li>
			<li>修复：首页homePage的url配置无效</li>
			<li>
				因为项目紧迫，这个版本拖了三个月，积攒了不少更新点，也算是憋了一个大招，
				大家有什么意见或者想要添加功能，可以加入qq群尽情提出来，我只要有时间，一定第一时间更新
			</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.1.4 &emsp; 2019-10-17" placement="top" type="primary">
			<li>重写了一下简介</li>
			<li>优化主题样式</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.1.3 &emsp; 2019-9-3" placement="top" type="primary">
			<li>更改初始化方式</li>
			<li>优化UI样式</li>
			<li>增加新主题：灰色-展开</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.1.2 &emsp; 2019-7-16" placement="top" type="primary">
			<li>增加右键菜单的失去焦点事件，失去焦点自动消失</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.1 &emsp; 2019-6-26" placement="top" type="primary">
			<li>优化卡片切换动画，更流畅了，并且添加loading图标，视觉上更加顺畅</li>
			<li>新增悬浮窗口功能，在卡片标题处右击试试吧</li>
			<li>更换登录模板页，更漂亮了</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.1.0 &emsp; 2019-6-24" placement="top" type="primary">
			<li>修复bug：鼠标悬浮tab-title时，偶尔动画混乱的bug</li>
			<li>修复bug：优化折叠动画，更流畅了</li>
			<li>集成swiper，窗口切换，更加高大上了</li>
		</el-timeline-item>
		<el-timeline-item timestamp="v1.0.8 &emsp; 2019-5-28" placement="top" type="primary">
			<li>修复bug：菜单折叠时，菜单项箭头仍然显示的问题</li>
			<li>修复bug：在手机端菜单折叠时，右侧信息排版发生混乱的问题</li>
			<li>调整了一下字体大小，看着更顺眼了</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.7 &emsp; 2019-5-25" placement="top" type="primary">
			<li>优化一些动画效果</li>
			<li>增加模板页：轮播图管理</li>
			<li>一些样式优化</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.6 &emsp; 2019-5-22" placement="top" type="primary">
			<li>添加了菜单预览模板(tree树)</li>
			<li>修复bug：菜单分配权限时，父子级不关联的问题</li>
			<li>一些样式优化</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.5 &emsp; 2019-5-18" placement="top" type="primary">
			<li>添加了权限中心模板(tree权限树)</li>
			<li>优化用户列表模板，弹出式的修改</li>
			<li>一些其它样式优化</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.4 &emsp; 2019-5-15" placement="top" type="primary">
			<li>优化折叠动画，避免文字闪动现象</li>
			<li>sp.setMenuList();接口增加show_list参数，可灵活控制部分菜单的显示与隐藏</li>
			<li>一些样式优化</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.3 &emsp; 2019-5-14" placement="top" type="primary">
			<li>添加文章管理模板(wangEditor富文本编辑器)</li>
			<li>改写了表格里按钮的样式，更鲜艳，增加点击感</li>
			<li>菜单列表里可以指定is_show=false，使菜单成为隐藏菜单</li>
			<li>重写了一些接口，可以更加方便的与你的系统集成</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.1 &emsp; 2019-5-5" placement="top" type="primary">
			<li>修复：周日显示周0的bug</li>
			<li>新增：增加三级菜单支持</li>
			<li>新增：主题更换时高亮显示，方便区分</li>
		</el-timeline-item>
		<!-- ---------- 一个版本 ----------- -->
		<el-timeline-item timestamp="v1.0.0 &emsp; 2019-5-2" placement="top" type="primary">
			<li>第一个版本出炉</li>
			<li>功能持续更新中...</li>
		</el-timeline-item>
	</el-timeline>
</template>

<script>
	module.exports = {
		data() {
			return {
				// 技术栈集合
				frameList: [
					{name: 'JS引擎', value: 'Vue @2.6.10', link: 'https://cn.vuejs.org/'},
					{name: 'UI框架', value: 'Element-UI @2.13.0', link: 'https://element.eleme.cn/#/zh-CN'},
					{name: 'web弹层', value: 'layer @3.1.1', link: 'http://layer.layui.com/'},
					{name: '切页动画', value: 'Swiper @4.5.0', link: 'https://www.swiper.com.cn/'},
					{name: '图表引擎', value: 'ECharts @4.2.1', link: 'https://echarts.baidu.com/'},
					{name: '富文本编辑器', value: 'wangEditor @3.1.1', link: 'http://www.wangeditor.com/'},
				],
			}
		},
		methods: {
			
		},
		created() {
			
		}
	}
</script>

<style scoped>
	.el-timeline-item__timestamp { color: #207EFF;}
	.el-timeline-item__content{color: #666;}
</style>
