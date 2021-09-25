// 一个菜单可以包括的所有属性 
// {
// 	id: '12345',		// 菜单id, 必须唯一
// 	name: '用户中心',		// 菜单名称, 同时也是tab选项卡上显示的名称
// 	icon: 'el-icon-user',	// 菜单图标, 参考地址:  https://element.eleme.cn/#/zh-CN/component/icon
//	info: '管理所有用户',	// 菜单介绍, 在菜单预览和分配权限时会有显示 
// 	url: 'sa-view/user/user-list.html',	// 菜单指向地址
// 	parent_id: 1,			// 所属父菜单id, 如果指定了一个值, sa-admin在初始化时会将此菜单转移到指定菜单上 
// 	is_show: true,			// 是否显示, 默认true
// 	is_blank: false,		// 是否属于外部链接, 如果为true, 则点击菜单时从新窗口打开 
// 	childList: [			// 指定这个菜单所有的子菜单, 子菜单可以继续指定子菜单, 至多支持四级菜单
// 		// .... 
// 	],
//	click: function(){}		// 点击菜单执行一个函数 
// }

// 定义菜单列表 
var menuList =	[
	// {
	// 	id: '131231',
	// 	name: '文档说明',
	// 	info: 'sa-admin使用文档',
	// },
	{
		id: '1',
		name: '文档说明',
		icon: 'el-icon-document-remove',
		info: 'sa-admin使用文档',
		childList: [
			{id: '1-1', name: '集成步骤', url: 'sa-view/sa-doc/sa-doc.html?way=start-up'},
			{id: '1-2', name: '鉴权操作', url: 'sa-view/sa-doc/sa-doc.html?way=check-per'},
			// {id: '1-11', name: '意见吐槽', url: 'http://applist.dev33.cn/applist-admin/html/ser-comment/w-list.html?sid=kcafzieb2tcw'},
			{id: '1-12', name: '在线需求墙', url: 'http://sa-app.dev33.cn/wall.html?name=sa-admin'},
		]
	},
	{
		id: '2',
		name: '各种示例',
		icon: 'el-icon-search',
		info: '增删改查各种常用组件示例',
		childList: [
			{id: '2-1', name: '查询参数示例', url: 'sa-view/case/query-p-case.html'},
			{id: '2-2', name: '表格显示示例', url: 'sa-view/case/query-table-case.html'},
			{id: '2-3', name: '表单提交示例', url: 'sa-view/case/submit-form.html'},
			{id: '2-11', name: '在线表单构建', url: 'https://mrhj.gitee.io/form-generator/#/'},
		]
	},
	{
		id: '3',
		name: '首页设置',
		icon: 'el-icon-table-lamp',
		info: '首页的一些设置',
		childList: [
			{id: '3-1-1', name: '分类列表', icon: 'el-icon-eleme', url: 'sa-view/sys-type/sys-type-list.html'},
			{id: '3-1-2', name: '分类添加', icon: 'el-icon-plus', url: 'sa-view/sys-type/sys-type-add.html'},
			{id: '3-2-1', name: '轮播图列表', icon: 'el-icon-collection-tag', url: 'sa-view/home/swiper-list.html'},
			{id: '3-2-2', name: '轮播图添加', icon: 'el-icon-plus', url: 'sa-view/home/swiper-add.html'},
			{id: '3-3-1', name: '商品规格示例', icon: 'el-icon-plus', url: 'sa-view/ser-goods/ser-goods-add.html'},
		]
	},
	{
		id: '4',
		name: '权限控制',
		icon: 'el-icon-unlock',
		info: '对系统角色权限的分配等设计，敏感度较高，请谨慎授权',
		childList: [
			{id: '4-1', name: '角色列表', icon: 'el-icon-key', url: 'sa-view/role/role-list.html'},
			{id: '4-2', name: '菜单列表', icon: 'el-icon-magic-stick', url: 'sa-view/role/menu-list.html'}
		]
	},
	{
		id: '5',
		name: '用户管理',
		icon: 'el-icon-user',
		info: '对用户列表、添加、统计等等...',
		childList: [
			{id: '5-1', name: '用户列表', icon: 'el-icon-document-remove', url: 'sa-view/user/user-list.html'},
			{id: '5-2', name: '用户添加', icon: 'el-icon-plus', url: 'sa-view/user/user-add.html'},
			{
				id: '5-3',
				name: '用户统计',
				icon: 'el-icon-data-line',
				childList: [
					{id: '1-3-1', name: '注册量统计', icon: 'el-icon-pie-chart', url: 'sa-view/user/user-chart.html'},
				]
			},
		]
	},
	{
		id: '6',
		name: '文章管理',
		icon: 'el-icon-document-copy',
		info: '对文章的增删改查、维护',
		childList: [
			{id: '6-1', name: '文章列表', url: 'sa-view/article/art-list.html'},
			{id: '6-2', name: '文章发布', url: 'sa-view/article/art-add.html'},
		]
	},
	{
		id: '7',
		name: '系统设置',
		icon: 'el-icon-setting',
		info: '有关系统的一些设置',
		childList: [
			{id: '7-1', name: '登录页', url: 'login.html'},
			{id: '7-8', name: '403无权限', url: 'sa-view/error-page/403.html'},
			{id: '7-9', name: '404未找到', url: 'sa-view/error-page/404.html'},
			{id: '7-10', name: '500有错误', url: 'sa-view/error-page/500.html'},
			{id: '7-11', name: '服务器设置', url: 'sa-view/cfg/system-cfg.html', info: '对服务器参数的设置'},
			{id: '7-12', name: '函数菜单', click: function(){sa.alert('点击菜单执行一个函数，你可以自定义任意代码')}},
			{id: '6-3', name: 'vue组件', url: 'sa-view/cfg/xxx.vue'}
		]
	},
	//  ========= 示例 外部链接 点击从新窗口打开 ================
	{
		id: '8',
		name: '友情链接',
		icon: 'el-icon-link',
		info: '示例：外部链接',
		childList: [
			{id: '8-21', name: '极品蓝图', url: 'http://un.jipinlantu.com/', is_blank: true},
			{id: '8-11', name: '河浪前端笔记', url: 'https://mydarling.gitee.io/resource/', is_blank: true},
			
			// {id: '8-1', name: '百度一下', url: 'https://www.baidu.com/', is_blank: true},
			{id: '8-41', name: 'sa-admin单页版', url: 'http://sa-vue-admin.dev33.cn/', is_blank: true},
			{id: '8-3', name: 'sa-token', url: 'http://sa-token.dev33.cn/', is_blank: true},
			{id: '8-12', name: 'sa-doc', url: 'http://sa-doc.dev33.cn/', is_blank: true},
			{id: '8-13', name: 'sa-plus', url: 'http://sa-plus.dev33.cn/', is_blank: true},
			{id: '8-4', name: 'SqlFly', url: 'https://sqlfly.dev33.cn/', is_blank: true},
			{id: '8-6', name: '颜值排行榜', url: 'http://yanzhi21.com/', is_blank: true},
			{id: '8-7', name: 'jq22插件库', url: 'http://www.jq22.com/', is_blank: true},
			{id: '8-2', name: 'uni-app', url: 'https://uniapp.dcloud.io/', is_blank: true},
			{id: '8-31', name: '秀恩爱专用', url: 'http://click33.gitee.io/xixi/'},
		]
	},
	//  ========= 示例 隐藏的菜单，最终将不会显示在菜单栏里 ================
	{
		id: '9',
		name: '一个隐藏菜单',
		url: 'https://www.baidu.com/',
		is_blank: true,
		is_show: false// 隐藏
	},
	//  ========= jq22搜集 ================
	{
		id: '111',
		name: 'jq22搜集',
		icon: 'el-icon-link',
		info: '示例：外部链接',
		childList: [
			{
				id: '110',
				name: '大屏展示',
				icon: 'el-icon-link',
				info: '大屏展示页',
				childList: [
					{id: '110-1', name: '大屏1', url: 'http://www.jq22.com/demo/estszjcmoban202008030007/'},	// 原作者：http://www.jq22.com/jquery-info23260
					{id: '110-2', name: '大屏2', url: 'http://www.jq22.com/demo/estjkdsj202007301414/'},	// 原作者：http://www.jq22.com/jquery-info23247
					{id: '110-3', name: '大屏3', url: 'http://www.jq22.com/demo/jquerygndsjmoban202007212350/'},	// 原作者：http://www.jq22.com/jquery-info23239
					{id: '110-4', name: '大屏4', url: 'http://www.jq22.com/demo/jqueryEchartsny202006151033/'},	// 原作者：http://www.jq22.com/jquery-info23114
					{id: '110-5', name: '大屏5', url: 'http://www.jq22.com/demo/echartsdindanmoban202007302202/'},	// 原作者：http://www.jq22.com/jquery-info23202
					{id: '110-6', name: '大屏6', url: 'http://www.jq22.com/demo/echartssjmoban202005210009/'},	// 原作者：http://www.jq22.com/jquery-info23047
					{id: '110-7', name: '大屏7', url: 'http://www.jq22.com/demo/echartsdsj202002251026/'},	// 原作者：http://www.jq22.com/jquery-info22826
					{id: '110-8', name: '大屏8', url: 'http://www.jq22.com/demo/echartswldsj201912112223/'},	// 原作者：http://www.jq22.com/jquery-info22636
				],
			},
			{id: '111-1', name: '图片切换', url: 'http://www.jq22.com/demo/jQueryTpqh201804012309/'},	// 原作者：https://www.jq22.com/jquery-info18534
			{id: '111-2', name: '3D旋转特效', url: 'http://www.jq22.com/demo/jQueryCss3D201710241004/'},	// 原作者：https://www.jq22.com/jquery-info16495
			{id: '111-3', name: 'canvas炫酷星空', url: 'http://www.jq22.com/demo/warpDrive201712211120/index.html'},	// 原作者：https://www.jq22.com/jquery-info17456
			{id: '111-4', name: 'H5碰撞小球', url: 'http://www.jq22.com/demo/html5Pzxq201712242209/'},	// 原作者：https://www.jq22.com/jquery-info17482
			{id: '111-5', name: '网页画板', url: 'http://www.jq22.com/demo/Mapping201802252341/'},	// 原作者：https://www.jq22.com/jquery-info18172
			{id: '111-6', name: '简约富文本编辑器', url: 'http://www.jq22.com/demo/jquery-notebook-master/'},	// 原作者：https://www.jq22.com/jquery-info345
			{id: '111-7', name: '水滴特效', url: 'http://www.jq22.com/demo/jquery-shuidi20151123/'},	// 原作者：https://www.jq22.com/jquery-info4835
			{id: '111-8', name: '图片放大', url: 'http://www.jq22.com/demo/jQueryJpg201708110048/'},	// 原作者：http://www.jq22.com/jquery-info15264
			{id: '111-9', name: '3D云', url: 'http://www.jq22.com/demo/jquery-cloud-141217202931/'},	// 原作者：http://www.jq22.com/jquery-info1325
			{id: '111-10', name: '3D选择图片', url: 'http://www.jq22.com/demo/jquery-3d20150831/'},	// 原作者：http://www.jq22.com/jquery-info4000
			{id: '111-11', name: '蜘蛛纸牌', url: 'http://www.jq22.com/demo/jqueryspider201809140137/'},	// 原作者：http://www.jq22.com/jquery-info20047
			{id: '111-12', name: '大转盘', url: 'http://www.jq22.com/demo/jquerylocal201912122316/'},	// 原作者：http://www.jq22.com/jquery-info22646
			{id: '111-13', name: '旋转地球', url: 'http://www.jq22.com/demo/earth201810300101/'},	// 原作者：http://www.jq22.com/jquery-info20328
			{id: '111-14', name: '下雨动画', url: 'http://www.jq22.com/demo/html5-canvas-rain201710252014/'},	// 原作者：http://www.jq22.com/jquery-info16518
			{id: '111-15', name: '绚丽星空', url: 'http://www.jq22.com/demo/jQuery3dxk201710142249/'},	// 原作者：http://www.jq22.com/jquery-info16294
			{id: '111-16', name: '3d波浪墙', url: 'http://www.jq22.com/demo/voxels-liquid201704112355/'},	// 原作者：http://www.jq22.com/jquery-info13400
			{id: '111-17', name: '元素周期表', url: 'http://www.jq22.com/demo/jquery-3D20151113/'},	// 原作者：http://www.jq22.com/jquery-info4710
			
			{id: '111-18', name: '旋转相册', url: 'http://www.jq22.com/demo/tikm202006072243/'},	// 原作者：http://www.jq22.com/jquery-info23116
			{id: '111-19', name: '装逼专用', url: 'http://www.jq22.com/demo/canvaslxy202003192234/'},	// 原作者：http://www.jq22.com/jquery-info22793
			{id: '111-20', name: '3D粒子文字', url: 'http://www.jq22.com/demo/3dwz201912102124/'},	// 原作者：http://www.jq22.com/jquery-info22631
			{id: '111-21', name: '多面立方体', url: 'http://www.jq22.com/demo/threelft201905080117/'},	// 原作者：http://www.jq22.com/demo/threelft201905080117/
			
			{id: '111-22', name: '常见配色', url: 'http://www.jq22.com/demo/jQueryColour202008050020/'},	// 原作者：http://www.jq22.com/jquery-info23262
			{id: '111-23', name: '音量调节', url: 'http://www.jq22.com/demo/AdjustVolume202005122241/'},	// 原作者：http://www.jq22.com/jquery-info23045
			{id: '111-24', name: '重力下落', url: 'http://www.jq22.com/demo/gamecaisse202005220040/'},	// 原作者：http://www.jq22.com/jquery-info23074
			{id: '111-25', name: '表情匹配', url: 'http://www.jq22.com/demo/emojimatchgame201907170050/dist/'},	// 原作者：http://www.jq22.com/jquery-info21952
			
			
		]
	},
]