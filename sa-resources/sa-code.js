// 在使用时，不建议你直接魔改模板的代码，以免在运行时出现意外bug，而是在本文件中根据模板的提供的API，来适应你的业务逻辑 
// ....



// ================================= 示例：一些基本信息 ================================= 

// 设置模板标题 
sa_admin.title = "SA-后台模板";
sa_admin.logo_url = 'sa-resources/admin-logo.png';    // 设置logo图标地址   默认值：sa-resources/admin-logo.png
sa_admin.icon_url = 'sa-resources/admin-logo.png';    // 设置icon图标地址   默认值：sa-resources/admin-logo.png


// ================================= 示例：自定义菜单 =================================

var myMenuList = window.menuList;		// window.menuList 在 menu-list.js 中定义 
sa_admin.setMenuList(myMenuList);	// 写入菜单  
// sa_admin.setMenuList(myMenuList, [11, 1, '1-1']);	// 写入菜单，并设置应该显示哪些id的菜单（第二个参数为空时，代表默认显示所有） 
// sa_admin.initMenu();	// 更简单的写法，相当于setMenuList省略第一个参数 

// 如果需要获得更多操作能力，如：动态添加菜单、删除菜单等
// 可直接 sa_admin.menuList 获得菜单引用，直接操作对象 


// ================================= 示例：js控制打开某个菜单 =================================

// 显示主页选项卡 
// sa_admin.showHome();

// 显示一个选项卡, 根据id
// sa_admin.showTabById('1-1');

// 关闭一个选项卡，根据 id 
// sa_admin.closeTabById('1-1');

// 新增一个选项卡
// sa_admin.addTab({id: 12345, name: '新页面', url: 'http://web.yanzhi21.com'});	// id不要和已有的菜单id冲突，其它属性均可参照菜单项 

// 新增一个选项卡、并立即显示  
// sa_admin.showTab({id: 12345, name: '新页面', url: 'http://web.yanzhi21.com'});	// 参数同上 

// 打开一个 菜单，根据 id
// sa_admin.showMenuById('1-1');	

// ================================= 示例：设置user信息 =================================
// 用户登录后，右上角可直接显示用户的头像和昵称
sa_admin.user = {
	username: 'root',	// 昵称 
	avatar: 'sa-resources/admin-logo.png'	// 头像地址  
}



// ================================= 示例：设置登录后的头像处，下拉可以出现的选项  =================================
sa_admin.dropList = [		// 头像点击处可操作的选项
	{
		name: '我的资料',
		click: function() {
			sa_admin.$message('点击了我的资料，你可以参照文档重写此函数');
		}
	},
	{
		name: '切换账号',
		click: function() {
			sa.$page.openLogin('login.html');
			// layer.open({
			// 	type: 2,
			// 	title: false,
			// 	closeBtn: false,
			// 	shadeClose: true,
			// 	shade: 0.8,
			// 	area: ['70%', '80%'],
			// 	resize: false,
			// 	content: 'login.html'
			// });
		}
	},
	{
		name: '退出登录',
		click: function() {
			// sa_admin.$message('点击了退出登录，你可以参照文档重写此函数');
			// location="login.html";
			sa.confirm('退出登录？', function(res) {
				sa.ajax2('/acc/exit', function(res) {
					sa.alert('注销成功', function() {
						location.href = "login.html";
					})
				}, {msg: '正在注销'})
			});
		}
	}
]


// ================================= 示例：调用另一个页面的代码 =================================
// var win = sa_admin.getTabWindow('2-1');		// 根据id获取其页面的window对象   （如果此页面未打开，则返回空）（跨域模式下无法获取其window对象）
// win.app.f5();

// 注意:
// 根据`iframe`的子父通信原则，在子页面中调用父页面的方法，需要加上parent前缀，例如：
// parent.sa_admin.msg('啦啦啦');		// 调用父页面的弹窗方法 



// ================================= 示例：初始化模板(必须调用)  =================================
// 初始化模板 
sa_admin.init();
// 或者以下方式，增加配置项
// sa_admin.init({
// 	themeDefault: '1',	// 默认的主题，可选值：1、2、3、4、5、6、7 
// 	switchDefault: 'fade',	// 默认的切换动画，可选值：fade、slide、cube、coverflow、flip
// 	is_show_tabbar: true,	// 是否显示tabbar栏, 默认为true, 配置为false后将不再是一个多窗口tab, 取之显示的是一个面包屑导航栏
// 	is_reme_open: true,		// 是否记住上一次最后打开的窗口, 默认为true, 配置为false后, 每次刷新不再自动打开上一次最后打开的窗口(也不再有锚链接智能tab调准)
// });



