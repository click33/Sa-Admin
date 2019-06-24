# sa-admin 使用步骤

&emsp; 五分钟快速上手

#### 1、获取 源码
> - 你有两种方式获取源码
> - 通过gitee、或github获取源码
> - [点我直接下载](http://sa-admin.dev33.cn/sa-admin-dev.rar)

#### 2、使用说明
> - 在使用时，不建议你直接魔改模板的代码，以免在运行时出现意外bug，而是用扩展的方法，来适应你的业务逻辑
> - 如何扩展？在sa-resourecs文件下，有个 my-code.js ，这是专门为了方便你接入你的业务逻辑而预留的一个文件 你可以在此文件中根据模板提供的API来操作模板
> - 具体可以操作哪些接口？接着往下看




#### 3、设置模板标题
``` js
sp.title = "SA-后台模板";
// sp.logo_url='url';	// 设置logo图标地址   默认值：sa-resources/admin-logo.png
```

#### 4、自定义菜单树
``` js 
var myMenuList = window.menuList;	// window.menuList 在 menu-list.js 中定义 
sp.setMenuList(myMenuList);	// 写入菜单 
// sp.setMenuList(myMenuList, [11, 1, '1-1']);	// 写入菜单，并设置应该显示哪些id的菜单（第二个参数为空时，代表默认显示所有）
```

#### 5、js控制打开某个菜单
```js
sp.showMenuById('1-1');	// 打开一个 菜单，根据 id 
sp.closePageById('1-1');	// 关闭一个 页面，根据 id 
// 打开一个自定义 页面 
// sp.showPage({id: 12345, name: '新页面', url: 'http://web.yanzhi21.com'});	// id尽量不要和已有的菜单id冲突，其它属性均可参照菜单项
```

#### 6、如何设置登录后右上角显示的user信息
``` js
sp.user = { 
    username: 'root', // 昵称	
    avatar: 'sa-resources/admin-logo.png' // 头像地址 
}
```

#### 7、重写按钮事件
你可以轻松自定义登录后的头像处，下拉可以出现的选项
``` js
sp.dropList = [	// 头像点击处可操作的选项	
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

#### 8、以上示例在 my-code.js中 都有相应的注释说明，如何还有不懂的地方，可以加群问我（群链接在首页）










