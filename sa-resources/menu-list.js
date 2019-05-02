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
				url: 'sa-html/1-1.html'
			},
			{
				id: '1-2',
				name: '用户添加',
				url: 'sa-html/1-2.html'
			},
			{
				id: '1-3',
				name: '用户删除',
				url: 'sa-html/1-3.html'
			}
		]
	},
	{
		id: '2',
		name: '系统设置',
		icon: 'el-icon-s-tools',
		childList: [
			{
				id: '2-1',
				name: '服务器设置',
				url: 'sa-html/1-1.html'
			},
			{
				id: '2-2',
				name: '全局设置',
				url: 'sa-html/2-2.html'
			}
		]
	},
	{
		id: '12',
		name: '外部链接',
		icon: 'el-icon-link',
		url: 'https://www.baidu.com/',
		is_blank: true
	}
]