// 在使用时，不建议你直接魔改模板的代码，以免在运行时出现意外bug，而是在本文件中根据模板的提供的API，来适应你的业务逻辑 
// ....







// ================================= 示例：自定义菜单的两种方式 =================================

// 方式1：直接在 menu-list.js 文件里修改
// 方式2：删除menu-list.js中所有代码，在本文件里调用API接口代码
/*
var myMenuList = [
	{
		id: '1',		// 唯一标识
		name: '自定义菜单1',		// 菜单名称
		icon: 'el-icon-document-remove',	// 菜单图标
		url: 'sa-html/sa-doc.html'	// 菜单对应地址
	},
	{
		id: '2',
		name: '自定义菜单2', 
		icon: 'el-icon-document-remove', 
		childList: [
			{
				id: '2-1',
				name: '用户列表',
				url: 'main.html'
			},
			{
				id: '2-2',
				name: '用户添加',
				url: 'main.html'
			}
		]
	},
]
sp.setMenuList(myMenuList);
*/
// 如果需要获得更多操作能力，如：动态添加菜单、删除菜单等等，可直接 sp.menuList 获得菜单引用，直接操作对象


// ================================= 示例：js控制打开某个菜单 =================================
// sp.selectMenu(id); 	// 菜单id


// ================================= 示例：设置user信息 =================================
// 用户登录后，右上角可直接显示用户的头像和昵称
// 默认策略为：在加载页面时读取本地存储localStorage 中 curr_user 的key，该值格式为：{username: '昵称', avatar: '头像地址'};
// 你可以在登录时，以此为格式，写入值：
// var curr_user = {username: '我的昵称', avatar: 'sa-resources/admin-logo.png'};
// localStorage.setItem('curr_user', JSON.stringify(curr_user));
// 
// 或者调用以下API，直接设置：
// sp.user = {username: '张三', avatar: '头像地址'};


// ================================= 示例：重写按钮事件 =================================
// 重写，点击【我的资料】的事件
// sp.fn_user_info = function() { /* ... */ }
// 重写，点击【退出登录】的事件
// sp.fn_login_out = function() { /* ... */ }



