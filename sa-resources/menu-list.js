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
				url: 'sa-html/user-list.html'
			},
			{
				id: '1-2',
				name: '用户添加',
				url: 'sa-html/user-add.html'
			},
			{
				id: '1-3',
				name: '用户统计',
				url: 'sa-html/user-chart.html'
			}
		]
	},
	{
		id: '2',
		name: '系统设置',
		icon: 'el-icon-setting',
		childList: [
			{
				id: '2-1',
				name: '服务器设置',
				url: 'sa-html/system-cfg.html'
			},
			{
				id: '2-2',
				name: '404页面',
				url: 'sa-html/404.html'
			},
			{
				id: '2-4',
				name: '500页面',
				url: 'sa-html/500.html'
			}
		]
	},
	{
		id: '3',
		name: '外部链接',
		icon: 'el-icon-link',
		url: 'https://www.baidu.com/',
		is_blank: true
	},
	{
		id: '4',
		name: '外部链接2',
		icon: 'el-icon-picture-outline',
		url: 'http://web.yanzhi21.com/',
		is_blank: true
	}
]