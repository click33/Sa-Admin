// 首页 
var homeTab = {
	id: 'home',	// 唯一标识 
	name: '首页',
	url: 'main.html',	// 页面地址 
	isNeedLoad: false,		// 标注：是否需要此刻加载
	hideClose: true	// 隐藏关闭键 
}

// sa_admin对象 
var sa_admin = new Vue({
	components: {
		"nav-logo": httpVueLoader('sa-frame/nav/nav-logo.vue'),				// logo 
		"nav-menu-bar": httpVueLoader('sa-frame/nav/nav-menu-bar.vue'),		// 菜单栏 
		"nav-tool-bar": httpVueLoader('sa-frame/nav/nav-tool-bar.vue'),		// 工具栏
		"nav-tab-bar": httpVueLoader('sa-frame/nav/nav-tab-bar.vue'),		// tab栏
		"nav-view-vessel": httpVueLoader('sa-frame/nav/nav-view-vessel.vue'),	// 视图容器 
		"com-right-menu": httpVueLoader('sa-frame/nav/com-right-menu.vue'),		// 右键菜单 
		"com-add-tab": httpVueLoader('sa-frame/nav/com-add-tab.vue'),			// 双击添加 tab 的弹窗 
	},
	el: '.app',
	data: {
		// ------------------------------- 配置 -------------------------------
		title: '',		// 页面标题  -- Sa-Admin
		logo: '',		// logo地址  -- sa-frame/admin-logo.png
		icon: '',		// icon地址  -- sa-frame/admin-logo.png
		version: 'v1.40.0',					// 当前版本号
		updateTime: '2021-9-26',			// 更新日期 
		githubUrl: 'https://github.com/click33/sa-admin',	// github地址 
		isRemeOpen: true,		// 是否记住上一次最后打开的窗口 
		printInfo: true,		// 是否在控制台打印信息 
		homeTab: homeTab,	// 主页首屏 Tab 
		menuList: [],		// 全部菜单集合 
		showList: [],		// 显示的菜单集合（id集合） 
		
		// ------------------------------- 状态 -------------------------------
		themeV: localStorage.getItem('themeV') || '1',	// 当前 / 默认的主题 
		isOpen: true,			// 当前是否展开菜单 (整体框架)
		isOpenRight: true,		// 当前是否展开  (右边) （将右边盒子折叠与菜单折叠分开，这样可以减少动画的卡顿现象） 
		activeMenuId: '0',		// 正在高亮的菜单id 
		isDrag: false,			// 当前是否正在拖拽 tab 
		dragTab: null,			// 当前正在拖拽的 tab 
		tabList: [homeTab],		// 当前 Tab 集合 
		viewList: [homeTab],		// 当前 View 集合 
		nativeTab: homeTab,		// 当前正显示的Tab 
		user: null	,// user信息
		dropList: [],			// 头像处下拉列表菜单 
	},
	watch: {
		// 监听title改变时, 页面title也跟着切换 
		title: function(newValue, oldValue) {
			document.querySelector('title').innerHTML = newValue;
		},
		// 监听 icon_url 网页图标 
		icon: function(newValue, oldValue) {
			var icon = newValue;
			var iconTarget = document.querySelector('.admin-icon');
			if(iconTarget) {
				iconTarget.setAttribute('href', icon);
			}
		}
	},
	methods: {
		
		// ------------------- 初始化相关 -------------------- 
		// 初始化模板, 此方法必须且只能调用一次 
		init: function(option) {
			
			// 打开上次最后的一个窗口  
			this.showTabByHash();	
			if(this.nativeTab.id == this.homeTab.id) {
				this.showHome();
			}
			
			// 打印版本等信息
			if(this.printInfo) {
				this.printVesion();
			}
			
			// 手动触发一下窗口变动监听
			window.onresize();		
			
		},
		// 初始化菜单：
		// 	showList = 显示菜单id数组  —— （注意是id的数组），你填哪些id哪些菜单才会显示 ，为空时代表显示所有	
		initMenu: function(showList) {
			this.setMenuList(window.menuList, showList);
		},
		// 写入菜单: 
		// 	menuList = 全部菜单  —— 可以是已经渲染好的 tree 数组，也可以是一个尚未渲染的一维数组（你只要指定好 parent_id，Sa-Admin内部会自动渲染）
		// 	showList = 显示菜单id数组  —— （注意是id的数组），你填哪些id哪些菜单才会显示 ，为空时代表显示所有	
		setMenuList: function(menuList, showList) {
			// 设置 全部菜单 
			this.menuList = this.arrayToTree(menuList);
			// 设置 显示的菜单id 
			showList = showList || this.getAllId(this.menuList);
			for (var i = 0; i < showList.length; i++) {
				showList[i] = showList[i] + '';
			} 
			this.showList = showList;
		},
		
		// ------------------- Menu 相关操作 --------------------
		// 根据 id 查找 Menu 
		getMenuById: function(id) {
			return this.findMenuById(this.menuList, id);
		},
		// 显示某个菜单，根据id 
		showMenuById: function(id) {
			var menu = this.getMenuById(id);
			if(menu) {
				this.showTab(menu); 
			}
		},
		// 显示homeTab
		showHome: function() {
			this.showTab(this.homeTab); 
		},
		// 返回当前所有菜单的 一维数组 形式 （将树形菜单转化为一维数组并返回） 方便遍历 
		getYwList: function() {
			var arr = [];
			function _dg(menuList) {
				menuList = menuList || [];
				for (var i = 0; i < menuList.length; i++) {
					var menu = menuList[i];
					arr.push(menu);
					// 如果有子菜单 
					if(menu.childList) {
						_dg(menu.childList);
					}
				}
			}
			_dg(this.menuList);
			return arr;
		},
		// 获取菜单所有id 
		getAllId: function() {
			var arr = [];
			this.getYwList().forEach(function(item) {
				arr.push(item.id);
			});
			return arr;
		},
		
		// ------------------- Tab 相关操作 --------------------
		// 刷新Tab
		f5Tab: function(tab) {
			var cs = '#iframe-' + tab.id;
			var iframe = document.querySelector(cs);
			if(iframe) {
				iframe.setAttribute('src', this.getTabUrl(tab));
			} else {
				tab.isNeedLoad = false;
				this.$nextTick(function() {
					tab.isNeedLoad = true;
				})
			}
		},
		// 获取 Tab，根据 id
		getTabById: function(id) {
			for (var i = 0; i < this.tabList.length; i++) {
				if(this.tabList[i].id + '' == id + '') {
					return this.tabList[i];
				}
			}
			return null;
		},
		// 添加一个Tab  {id,name,url}
		addTab: function(tab) {
			// 如果没有提供id，则随机一个
			if(!tab.id) {
				tab.id = new Date().getTime() + '' + this.randomNum();
			}
			// 如果没有指定类型
			if(tab.view === undefined) {
				if(this.getUrlExt(tab.url).toLowerCase() == 'vue') {
					tab.view = httpVueLoader(tab.url);
				}
			}
			if(tab.isNeedLoad === undefined) {
				// tab.isNeedLoad = true;
				Vue.set(tab, 'isNeedLoad', true);
			}
			// console.log('添加之前：' + JSON.stringify(tab));
			this.tabList.push(tab);
			this.viewList.push(tab);
			// tab 超过 20 个，提示过多，如果用户无视继续添加则超过 30 个后不再提示 
			if(this.tabList.length > 20 && this.tabList.length < 30) {
				sa_admin.$message({message: '选项卡过多会造成窗口卡顿，建议您关闭不使用的窗口', type: 'warning'});
			}
		},
		// 显示某个页面  (如果不存在, 则先添加)
		showTab: function(tab) {
			// 标注：需要此刻加载 
			// tab.isNeedLoad = false;	
			Vue.set(tab, 'isNeedLoad', true);
			// 如果是外部链接
			if(tab.is_blank) {
				return open(tab.url); 
			}
			// 如果是当前正在显示的tab , 则直接返回，无需继续操作 
			if(tab == this.nativeTab) {
				return;
			}
			// 如果是click函数 
			if(tab.click) {
				if(tab.click() !== true) {
					return;
				}
			}
			// 如果这个 tab 还没有添加到 tabList 上 
			if(this.getTabById(tab.id) == null){
				this.addTab(tab);
			}
			// 然后开始显示这个 tab 
			this.nativeTab = tab;
			// this.nativeTab.is_load = true;	// 标注：已经加载过了 
			this.activeMenuId = tab.id + '';	// 左边自动关联, 如果左边没有，则无效果 
			
			// 刷新一下url中的锚链 
			this.$nextTick(function() {
				this.f5HashByNativeTab();
			})
			
			// 调整一下滚动条 
			this.$nextTick(function() {
				try{
					this.$refs['nav-tab-bar'].scrollToAuto(); 
				}catch(e){}
			})
		},
		// 显示一个选项卡, 根据 id , 不存在则不显示 
		showTabById: function(id) {
			var tab = this.getTabById(id);
			if(tab) {
				this.showTab(tab);
			}
		},
		// 关闭 tab （带动画）
		closeTab: function(tab, callFn) {
			
			// homeTab不能关闭 
			if(tab == this.homeTab || tab.hideClose){
				return;
			}
			
			// 执行关闭动画
			var div = document.querySelector('#tab-' + tab.id);
			div.style.width = div.offsetWidth + 'px';
			setTimeout(function() {
				div.style.width = '0px';
			}, 0);
			
			// 等待动画结束
			setTimeout(function() {
				
				// 如果 tab 为当前正在显示的 tab, 则切换为前一个 tab  
				if(tab == this.nativeTab) {
					var index = this.tabList.indexOf(tab); 
					var preTab = this.tabList[index - 1]; 
					if(preTab) {
						this.showTab(preTab); 
					} else {
						var nextTab = this.tabList[index + 1]; 
						this.showTab(nextTab); 
					}
				}
				// 从 tabList 中移除这个 tab 
				sa_admin_code_util.arrayDelete(this.tabList, tab);
				sa_admin_code_util.arrayDelete(this.viewList, tab);
				// 如果有回调 
				if(callFn) {
					this.$nextTick(function() {
						callFn();
					})
				}
			}.bind(this), 150);
		},
		// 关闭 tab, 根据 id 
		closeTabById: function(id, callFn) {
			var tab = this.getTabById(id);
			if(tab) {
				this.closeTab(tab, callFn);
			}
		},
		// 悬浮打开 tab 
		xfTab: function(tab) {
			console.log('悬浮');
			// layer打开
			var index = layer.open({
				type: 2,
				title: tab.name,
				moveOut: true, // 是否可拖动到外面
				maxmin: true, // 显示最大化按钮
				shadeClose: false,
				shade: 0,
				area: ['80%', '80%'],
				zIndex: layer.zIndex,
				content: this.getTabUrl(tab),
				// 解决拉伸或者最大化的时候，iframe高度不能自适应的问题
			    resizing: function (layero) {
			        sa_admin_code_util.solveLayerBug(index);
			    },
				// 操作这个layer的时候置顶它 
				success: function(layero){
					layer.setTop(layero); 
				}
			});
			// 解决拉伸或者最大化的时候，iframe高度不能自适应的问题 
			document.querySelector('#layui-layer' + index + ' .layui-layer-max').onclick = function() {
				setTimeout(function() {
					sa_admin_code_util.solveLayerBug(index);
				}, 200)
			}
		},
		// 新窗口打开 tab 
		newWinTab: function(tab) {
			open(this.getTabUrl(tab)); 
			// this.closeTab(tab);
		},
		// 获取指定 tab 所代表 iframe 的 url 地址 (同域下可获取最新地址, 跨域时只能获取初始化时的地址)
		getTabUrl: function(tab) {
			var cs = '#iframe-' + tab.id;
			var iframe = document.querySelector(cs);
			if(!iframe) {
				return tab.url;
			}
			try{
				return iframe.contentWindow.location.href;
			}catch(e){
				return iframe.getAttribute('src');
			}
		},
		
		// ------------------- 框架整体相关操作 --------------------
		// 展开菜单 
		startOpen: function() {
			this.isOpen = true;
			setTimeout(function() {
				this.isOpenRight = true;
			}.bind(this), 200);
		},
		// 折叠菜单 
		endOpen: function() {
			this.isOpen = false;
			this.isOpenRight = false;
		},
		
		// ------------------- 锚链接路由相关 --------------------
		// 根据锚链接, 打开窗口
		showTabByHash: function() {
			// 如果非记住模式
			if(this.isRemeOpen == false) {
				return;
			}
			// 获取锚链接中的id
			var hash = location.hash;
			var id = hash.replace('#', '');
			if(id == '') {
				return;
			}
			// 如果已经存在与tabbar中 
			var tab = this.getTabById(id);
			if(tab) {
				return this.showTab(tab);
			}
			// 否则从菜单中打开 
			this.showMenuById(id);
			// 此时, 仍有一种tab打不开, 那就是自定义tab然后还已经关闭的,
			// 预设 解决方案: 在localStor里存储所有打开过的tab,
			// 以后如果有强需求这个功能时, 再实现 
		},
		// 根据当前tab刷新一下锚链接 
		f5HashByNativeTab: function() {
			// 如果非记住模式
			if(this.isRemeOpen == false) {
				return;
			}
			location.hash = this.nativeTab.id;
		},
		
		// ------------------- 工具方法 -------------------- 
		// 弹窗提示 
		msg: function(msg) {
			layer.msg(msg)
		},
		// 返回随机数 
		randomNum: function(min, max) {
			min = min || 1;
			max = max || 1000000000;
			return parseInt(Math.random() * (max - min + 1) + min, 10);
		},
		// 从 menuList 里查找指定 id 的 menu，支持多级递归 
		findMenuById: function(menuList, id) {
			for (var i = 0; i < menuList.length; i++) {
				var menu = menuList[i];
				if(menu.id + '' == id + '') {
					return menu;
				}
				// 如果是二级或多级
				if(menu.childList) {
					var menu2 = this.findMenuById(menu.childList, id);
					if(menu2 != null) {
						return menu2;
					}
				}
			}
			return null;
		},
		// 获取文件后缀
		getUrlExt: function(url) {
			if(!url) {
				return "";
			}
			if(url.indexOf('?') > -1) {
				url = url.split('?')[0];
			}
			if(url.indexOf('#') > -1) {
				url = url.split('#')[0];
			}
			var index= url.lastIndexOf(".");
			if(index == -1) {
				return "";
			}
			var ext = url.substr(index + 1);
			return ext;
		},
		// 将一维平面数组转换为 Tree 菜单 (根据其指定的 parent_id 添加到其父菜单的childList)
		arrayToTree: function(menuList) {
			for (var i = 0; i < menuList.length; i++) {
				var menu = menuList[i];
				// 如果这个 Menu 指定了 parent_id 属性，则将其转移到其指定的父 Menu 的 childList 属性上 
				if(menu.parent_id) {
					var parent_menu = this.findMenuById(menuList, menu.parent_id);
					if(parent_menu) {
						menu.parent_menu = parent_menu;
						parent_menu.childList = parent_menu.childList || [];
						parent_menu.childList.push(menu);
						menuList.splice(i, 1);	// 从一维中删除 
						i--;
					}
				}
			}
			return menuList;
		},
		
		// ------------------- 其它 -------------------- 
		// 获取指定 tab 栏的 window 对象, 用于多窗口通信 
		getTabWindow: function(tabId) {
			var iframe = document.querySelector('#iframe-' + tabId);
			if(iframe != null)  {
				return iframe.contentWindow;
			}
			return null;
		},
		// 打印版本
		printVesion: function() {
			console.log('欢迎使用Sa-Admin，当前版本：' + this.version + "，更新于：" + this.updateTime + "，GitHub地址：" + this.githubUrl);
			console.log('如在使用中发现任何bug或者疑问，请加入QQ群交流：782974737，点击加入：' + 'https://jq.qq.com/?_wv=1027&k=5DHN5Ib');
		},
		
	},
	created:function(){
		
	}
});
var saAdmin = sa_admin;		
Vue.prototype.sa_admin = sa_admin;
Vue.prototype.saAdmin = saAdmin;

// 监听窗口大小变动
window.onresize = function() {
	if(document.body.clientWidth < 800) {
		sa_admin.endOpen();
	} else {
		sa_admin.startOpen();
	}
}

// 监听锚链接变动
window.onhashchange = function() {
	sa_admin.showTabByHash();
}


