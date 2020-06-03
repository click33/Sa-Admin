// 一个菜单可以包括的所有属性 
// {
// 	id: '12345',		// 菜单id, 必须唯一
// 	name: '用户中心',		// 菜单名称, 同时也是tab选项卡上显示的名称
// 	icon: 'el-icon-user',	// 菜单图标, 参考地址:  https://element.eleme.cn/#/zh-CN/component/icon
//	info: '管理所有用户',	// 菜单介绍, 在菜单预览和分配权限时会有显示 
// 	url: 'sa-html/user/user-list.html',	// 菜单指向地址
// 	parent_id: 1,			// 所属父菜单id, 如果指定了一个值, sa-admin在初始化时会将此菜单转移到指定菜单上 
// 	is_show: true,			// 是否显示, 默认true
// 	is_blank: false,		// 是否属于外部链接, 如果为true, 则点击菜单时从新窗口打开 
// 	childList: [			// 指定这个菜单所有的子菜单, 子菜单可以继续指定子菜单, 至多支持三级菜单
// 		// .... 
// 	],
//	click: function(){}		// 点击菜单执行一个函数 
// }

// 定义菜单列表 
var menuList =	[
	{
		id: '1',
		name: '文档说明',
		icon: 'el-icon-document-remove',
		info: 'sa-admin使用文档',
		childList: [
			{id: '1-1', name: '集成步骤', url: 'sa-html/sa-doc/sa-doc.html?way=start-up'},
			{id: '1-2', name: '鉴权操作', url: 'sa-html/sa-doc/sa-doc.html?way=check-per'},
			{id: '1-11', name: '在线论坛', url: 'http://applist.dev33.cn/applist-admin/html/ser-comment/w-list.html?sid=kcafzieb2tcw'},
			
		]
	},
	{
		id: '2',
		name: '各种示例',
		icon: 'el-icon-search',
		info: '增删改查各种常用组件示例',
		childList: [
			{id: '2-1', name: '查询参数示例', url: 'sa-html/case/query-p-case.html'},
			{id: '2-2', name: '表格显示示例', url: 'sa-html/case/query-table-case.html'},
			{id: '2-3', name: '表单提交示例', url: 'sa-html/case/submit-form.html'},
		]
	},
	{
		id: '3',
		name: '首页设置',
		icon: 'el-icon-table-lamp',
		info: '首页的一些设置',
		childList: [
			{id: '3-2', name: '轮播图设置', url: 'sa-html/home/swiper-list.html'}
		]
	},
	{
		id: '4',
		name: '权限控制',
		icon: 'el-icon-unlock',
		info: '对系统角色权限的分配等设计，敏感度较高，请谨慎授权',
		childList: [
			{id: '4-1', name: '角色列表', url: 'sa-html/role/role-list.html'},
			{id: '4-2', name: '菜单列表', url: 'sa-html/role/menu-list.html'}
		]
	},
	{
		id: '5',
		name: '用户管理',
		icon: 'el-icon-user',
		info: '对用户列表、添加、统计等等...',
		childList: [
			{id: '5-1', name: '用户列表', url: 'sa-html/user/user-list.html'},
			{id: '5-2', name: '用户添加', url: 'sa-html/user/user-add.html'},
			{
				id: '5-3',
				name: '用户统计',
				childList: [
					{
						id: '1-3-1',
						name: '注册量统计',
						url: 'sa-html/user/user-chart.html'
					}
				]
			}
		]
	},
	{
		id: '6',
		name: '文章管理',
		icon: 'el-icon-document-copy',
		info: '对文章的增删改查、维护',
		childList: [
			{id: '6-1', name: '文章列表', url: 'sa-html/article/art-list.html'},
			{id: '6-2', name: '文章发表', url: 'sa-html/article/art-add.html'}
		]
	},
	{
		id: '7',
		name: '系统设置',
		icon: 'el-icon-setting',
		childList: [
			{id: '7-1', name: '登录页', url: 'login.html'},
			{id: '7-8', name: '403无权限', url: 'sa-html/error-page/403.html'},
			{id: '7-9', name: '404未找到', url: 'sa-html/error-page/404.html'},
			{id: '7-10', name: '500有错误', url: 'sa-html/error-page/500.html'},
			{id: '7-11', name: '服务器设置', url: 'sa-html/cfg/system-cfg.html', info: '对服务器参数的设置'},
			{id: '7-12', name: '函数菜单', click: function(){sa.alert('点击菜单执行一个函数')}}
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
			{id: '8-3', name: 'sa-token', url: 'http://sa-token.dev33.cn/', is_blank: true},
			{id: '8-12', name: 'sa-doc', url: 'http://sa-doc.dev33.cn/', is_blank: true},
			{id: '8-4', name: 'SqlFly', url: 'https://sqlfly.dev33.cn/', is_blank: true},
			{id: '8-6', name: '颜值排行榜', url: 'http://yanzhi21.com/', is_blank: true},
			{id: '8-7', name: 'jq22插件库', url: 'http://www.jq22.com/', is_blank: true},
			{id: '8-2', name: 'uni-app', url: 'https://uniapp.dcloud.io/', is_blank: true},
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
				id: '111-1', 
				name: '图片切换', 
				url: 'http://www.jq22.com/demo/jQueryTpqh201804012309/', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info18534');
					return true;
				}
			},
			{
				id: '111-2', 
				name: '3D旋转特效', 
				url: 'http://www.jq22.com/demo/jQueryCss3D201710241004/', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info16495');
					return true;
				}
			},
			{
				id: '111-3', 
				name: 'canvas炫酷星空', 
				url: 'http://www.jq22.com/demo/warpDrive201712211120/index.html', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info17456');
					return true;
				}
			},
			{
				id: '111-4', 
				name: 'H5碰撞小球', 
				url: 'http://www.jq22.com/demo/html5Pzxq201712242209/', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info17482');
					return true;
				}
			},
			{
				id: '111-5', 
				name: '网页画板', 
				url: 'http://www.jq22.com/demo/Mapping201802252341/', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info18172');
					return true;
				}
			},
			{
				id: '111-6', 
				name: '简约富文本编辑器', 
				url: 'http://www.jq22.com/demo/jquery-notebook-master/', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info345');
					return true;
				}
			},
			{
				id: '111-7', 
				name: '水滴特效', 
				url: 'http://www.jq22.com/demo/jquery-shuidi20151123/', 
				click: function() {
					console.log('源作者：', 'https://www.jq22.com/jquery-info4835');
					return true;
				}
			},
			{
				id: '111-8', 
				name: '图片放大', 
				url: 'http://www.jq22.com/demo/jQueryJpg201708110048/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info15264');
					return true;
				}
			},
			{
				id: '111-9', 
				name: '3D云', 
				url: 'http://www.jq22.com/demo/jquery-cloud-141217202931/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info1325');
					return true;
				}
			},
			{
				id: '111-10', 
				name: '3D选择图片', 
				url: 'http://www.jq22.com/demo/jquery-3d20150831/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info4000');
					return true;
				}
			},
			{
				id: '111-11', 
				name: '蜘蛛纸牌', 
				url: 'http://www.jq22.com/demo/jqueryspider201809140137/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info20047');
					return true;
				}
			},
			{
				id: '111-12', 
				name: '大转盘', 
				url: 'http://www.jq22.com/demo/jquerylocal201912122316/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info22646');
					return true;
				}
			},
			{
				id: '111-13', 
				name: '旋转地球', 
				url: 'http://www.jq22.com/demo/earth201810300101/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info20328');
					return true;
				}
			},
			{
				id: '111-14', 
				name: '下雨动画', 
				url: 'http://www.jq22.com/demo/html5-canvas-rain201710252014/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info16518');
					return true;
				}
			},
			{
				id: '111-15', 
				name: '绚丽星空', 
				url: 'http://www.jq22.com/demo/jQuery3dxk201710142249/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info16294');
					return true;
				}
			},
			{
				id: '111-16', 
				name: '3d波浪墙', 
				url: 'http://www.jq22.com/demo/voxels-liquid201704112355/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info13400');
					return true;
				}
			},
			{
				id: '111-17', 
				name: '元素周期表', 
				url: 'http://www.jq22.com/demo/jquery-3D20151113/', 
				click: function() {
					console.log('源作者：', 'http://www.jq22.com/jquery-info4710');
					return true;
				}
			},
			
			
			
		]
	},
]