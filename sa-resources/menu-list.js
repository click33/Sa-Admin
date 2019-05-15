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
		name: '文章管理',
		icon: 'el-icon-document-copy',
		childList: [
			{
				id: '2-1',
				name: '文章列表',
				url: 'sa-html/article/art-list.html'
			},
			{
				id: '2-2',
				name: '文章发表', 
				url: 'sa-html/article/art-add.html' 
			}
		]
	},
	{
		id: '3',
		name: '系统设置',
		icon: 'el-icon-setting',
		childList: [
			{
				id: '3-1',
				name: '服务器设置',
				url: 'sa-html/cfg/system-cfg.html'
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
		is_show: false	// 隐藏
	},
	//  ========= 示例 指定parent_id，将被添加到其指定的父菜单childList里 ================
	{
		id: '3-2',
		name: '404页面',
		url: 'sa-html/cfg/404.html',
		parent_id: 3	// 父菜单id 
	},
	{
		id: '3-4',
		name: '500页面',
		url: 'sa-html/cfg/500.html',
		parent_id: 3	// 父菜单id 
	}
]