# sa-admin 使用步骤 <span style="font-size: 14px;">五分钟快速上手</span>

#### 1、获取 源码
> - 你有两种方式获取源码
> - 通过gitee、或github获取源码
> - [点我直接下载](http://sa-admin.dev33.cn/sa-admin-dev.rar)

#### 2、使用说明
> - 在使用时，不建议你直接魔改模板的代码，以免在运行时出现意外bug，而是用扩展的方法，来适应你的业务逻辑
> - 如何扩展？在 `sa-resourecs` 文件下，有个 `my-code.js` ，这是专门为了方便你接入你的业务逻辑而预留的一个文件 你可以在此文件中根据模板提供的API来操作模板
> - 具体可以操作哪些接口？接着往下看

#### 3、设置模板标题
``` js 
sa_admin.title = "SA-后台模板";
// sa_admin.logo_url='url';	// 设置logo图标地址   默认值：sa-resources/admin-logo.png
// sa_admin.icon_url = 'sa-resources/admin-logo.png';    // 设置icon图标地址   默认值：sa-resources/admin-logo.png
```
测试：
<input id="title-input" value="SA-后台模板">
<button onclick="top.sa_admin.title = document.getElementById('title-input').value;">更新标题</button>

#### 4、自定义菜单树
``` js 
var myMenuList = window.menuList;	// window.menuList 在 menu-list.js 中定义 
sa_admin.setMenuList(myMenuList);	// 写入菜单 
// sa_admin.setMenuList(myMenuList, [11, 1, '1-1']);	// 写入菜单，并设置应该显示哪些id的菜单（第二个参数为空时，代表默认显示所有）
```

#### 5、js控制打开某个菜单
```js 
sa_admin.showHome();			// 显示主页选项卡 
sa_admin.showTabById('1-1');	// 显示一个选项卡, 根据id
sa_admin.closeTabById('1-1');	// 关闭一个选项卡，根据 id 
sa_admin.showMenuById('1-1');	// 打开一个 菜单，根据 id
// 新增一个选项卡
// sa_admin.addTab({id: 12345, name: '新页面', url: 'http://web.yanzhi21.com'});	// id不要和已有的菜单id冲突，其它属性均可参照菜单项 
// 新增一个选项卡、并立即显示  
// sa_admin.showTab({id: 12345, name: '新页面', url: 'http://web.yanzhi21.com'});	// 参数同上 
```
测试：
<button onclick="top.sa_admin.showHome()">显示首页</button>
<button onclick="top.sa_admin.addTab({id: Math.round(Math.random()*9999999999999), name: '新窗口', url: 'http://web.yanzhi21.com'})">新增选项卡</button>
<button onclick="top.sa_admin.showTab({id: Math.round(Math.random()*9999999999999), name: '新窗口', url: 'https://sqlfly.dev33.cn/'})">新增选项卡并显示</button>
<button onclick="top.sa_admin.atOpen()">打开弹窗添加</button>

#### 6、如何设置登录后右上角显示的user信息
``` js
sa_admin.user = { 
    username: 'root', // 昵称	
    avatar: 'sa-resources/admin-logo.png' // 头像地址 
}
```

#### 7、重写按钮事件
你可以轻松自定义登录后的头像处，下拉可以出现的选项
``` js
sa_admin.dropList = [	// 头像点击处可操作的选项	
    {	
    	name: '我的资料',	
    	click: function() {	
        	/* balabala... */
        }	
    },	
    {	
        name: '退出登录',	
        click: function() {
            	/* balabala... */
        }	
    }	
]	
``` 


#### 8、初始化模板（必须调用）
``` js
sa_admin.init();
```
或者以下方式，增加配置项
``` js
sa_admin.init({
	themeDefault: '1',	// 默认的主题，可选值：1、2、3、4、5
	switchDefault: 'fade',	// 默认的切换动画，可选值：fade、slide、cube、coverflow、flip
	is_show_tabbar: true,	// 是否显示tabbar栏, 默认为true, 配置为false后将不再是一个多窗口tab, 取之显示的是一个面包屑导航栏
	is_reme_open: true,		// 是否记住上一次最后打开的窗口, 默认为true, 配置为false后, 每次刷新不再自动打开上一次最后打开的窗口(也不再有锚链接智能tab调准)
});
```
想获得更多操作能力？其实在`sa_admin`对象上的所有属性和函数都可以直接调用 

#### 9、以上示例在 my-code.js中 都有相应的注释说明，如何还有不懂的地方，可以加群问我（群链接在首页）










