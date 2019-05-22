var menuList =	[
	{
		id: '11',
		name: '文档说明',
		icon: 'el-icon-document-remove',
		url: 'sa-html/sa-doc.html'
	},
	{
		id: '1',
		name: '用户管理',
		icon: 'el-icon-user',
		info: '对用户列表、添加、统计等等...',
		childList: [
			{
				id: '1-1',
				name: '用户列表',
				url: 'sa-html/user/user-list.html'
			},
			{
				id: '1-2',
				name: '用户添加',
				url: 'sa-html/user/user-add.html'
			},
			{
				id: '1-3',
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
		id: '2',
		name: '权限控制',
		icon: 'el-icon-unlock',
		info: '对系统角色权限的分配等设计，敏感度较高，请谨慎授权',
		childList: [
			{
				id: '2-1',
				name: '角色列表',
				url: 'sa-html/role/role-list.html'
			},
			{
				id: '2-2',
				name: '菜单列表',
				url: 'sa-html/role/menu-list.html'
			}
		]
	},
	{
		id: '3',
		name: '文章管理',
		icon: 'el-icon-document-copy',
		info: '对文章的增删改查、维护',
		childList: [
			{
				id: '3-1',
				name: '文章列表',
				url: 'sa-html/article/art-list.html'
			},
			{
				id: '3-2',
				name: '文章发表', 
				url: 'sa-html/article/art-add.html' 
			}
		]
	},
	{
		id: '4',
		name: '系统设置',
		icon: 'el-icon-setting',
		info: '对系统运行时的一些参数的设置',
		childList: [
			{
				id: '4-1',
				name: '服务器设置',
				url: 'sa-html/cfg/system-cfg.html',
				info: '对服务器参数的设置'	// 菜单的介绍，在设置角色分配权限时将会用到此字段
			},
			
		]
	},
	//  ========= 示例 外部链接 点击从新窗口打开 ================
	{
		id: '8',
		name: '外部链接',
		icon: 'el-icon-link',
		url: 'https://www.baidu.com/',
		is_blank: true
	},
	{
		id: '9',
		name: '外部链接2',
		icon: 'el-icon-link',
		url: 'http://web.yanzhi21.com/',
		is_blank: true
	},
	//  ========= 示例 隐藏的菜单，最终将不会显示在菜单栏里 ================
	{
		id: '10',
		name: '一个隐藏菜单',
		url: 'https://www.baidu.com/',
		is_blank: true,
		is_show: false// 隐藏
	},
	//  ========= 示例 指定parent_id，将被添加到其指定的父菜单childList里 ================
	{
		id: '4-3',
		name: '404页面',
		url: 'sa-html/cfg/404.html',
		parent_id: 4	// 父菜单id 
	},
	{
		id: '4-4',
		name: '500页面',
		url: 'sa-html/cfg/500.html',
		parent_id: 4	// 父菜单id 
	}
]