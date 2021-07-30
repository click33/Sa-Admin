// 首页 
var homeTab = {
	id: 'home',	// 唯一标识 
	name: '首页',
	url: 'main.html',	// 页面地址 
	isNeedLoad: false,		// 标注：是否需要此刻加载
	hide_close: true	// 隐藏关闭键 
}

// sa_admin对象 
var sa_admin = new Vue({
	components: {
		"nav-logo": httpVueLoader('sa-frame/com/nav-logo.vue'),
		"nav-menu-bar": httpVueLoader('sa-frame/com/nav-menu-bar.vue'),
		"nav-tool-bar": httpVueLoader('sa-frame/com/nav-tool-bar.vue'),
		"nav-tab-bar": httpVueLoader('sa-frame/com/nav-tab-bar.vue'),
		"nav-view-vessel": httpVueLoader('sa-frame/com/nav-view-vessel.vue'),
		"com-right-menu": httpVueLoader('sa-frame/com/com-right-menu.vue'),
		"com-add-tab": httpVueLoader('sa-frame/com/com-add-tab.vue'),
	},
	el: '.app',
	data: {
		// ------------------------------- 配置 -------------------------------
		title: 'Sa-Admin',			// 页面标题  
		logo: 'sa-frame/admin-logo.png',	// logo地址 
		icon: 'sa-frame/admin-logo.png',	// icon地址 
		
		version: 'v2.4.4',		// 当前版本
		update_time: '2020-11-14',		// 更新日期 
		github_url: 'https://github.com/click33/sa-admin',	// github地址 
		
		menuList: [],		// 菜单集合 
		showList: [],		// 显示的集合 
		homeTab: homeTab,	// 主页tab 
		
		// ------------------------------- 状态 -------------------------------
		
		isOpen: true,			// 当前是否展开菜单 (整体框架)
		isOpenRight: true,		// 当前是否展开  (右边)
		
		defaultActive: '0',		// 默认的高亮菜单id
		defaultOpeneds: [],		// 默认的打开菜单数组 
		uniqueOpened: true,		// 是否保持只打开一个菜单
		
		isDrag: false,			// 当前是否正在拖拽 tab 
		dragTab: null,			// 当前正在拖拽的 tab 
		
		tabList: [homeTab],	// 当前 Tab 集合 
		nativeTab: homeTab,	// 当前正显示的Tab 
		
		// ------------------------------- 其它 -------------------------------
		
		rightTab: null,		// 右键正在操作的tab 
		rightShow: false,	// 右键菜单是否正在显示 
		rightStyle: {		// 卡片标题右键菜单的样式 
			left: '0px',		// 坐标x
			top: '0px',			// 坐标y
			maxHeight: '0px'	// 右键菜单的最高高度 (控制是否展开) 
		},
		is_fold: false,			// 菜单是否折叠
		is_fold_right: false,	// 右边是否折叠（将右边盒子折叠与菜单折叠分开，这样可以减少动画的卡顿现象）   
		user: null	,// user信息
		
		themeV: '',	// 当前主题值
		themeList: [	// 主题数组
			{name: '蓝色', value: '1', show_all: false},
			{name: '绿色', value: '2', show_all: false},
			{name: '白色', value: '3', show_all: false},
			{name: '灰色', value: '4', show_all: false},
			{name: '灰色-展开', value: '5', show_all: true},
			{name: 'pro钛合金', value: '6', show_all: false},
			{name: '沉淀式黑蓝', value: '7', show_all: false},
			{name: '简约式灰蓝', value: '8', show_all: false},
		],
		themeToggling: false,	// 主题是否正在切换 
		dropList: [],	// 头像处下拉列表菜单 
		breMenuList: [homeTab],			// 面包屑导航栏的tab数据 
		is_reme_open: true,			// 是否记住上一次最后打开的窗口 
		
	},
	watch: {
		// 监听title改变时, 页面title也跟着切换 
		title: function(newValue, oldValue) {
			document.querySelector('title').innerHTML = newValue;
		},
		// 监听 icon_url 网页图标 
		icon: function(newValue, oldValue) {
			var icon = newValue;
			var icon_target = document.querySelector('.admin-icon');
			if(icon_target) {
				icon_target.setAttribute('href', icon);
			}
		}
	},
	methods: {
		
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
		
		// ------------------- 初始化相关 -------------------- 
		// 初始化模板, 此方法只可调用一次 
		init: function(option) {
			// 如果不填写
			option = option || {};
			
			// 初始化主题 
			var themeV = localStorage.getItem('themeV') || option.themeDefault || '1';    
			this.toggleTheme(themeV);
			
			// 一些属性
			this.is_reme_open = (option.is_reme_open === undefined ? this.is_reme_open : option.is_reme_open);	// 是否记住上一次最后打开的窗口 
			
			// 打印版本等信息
			if(option.printVesion !== false) {
				this.printVesion();
			}
			
			// 开始一些初始化动作
			this.showTabByHash();	// 打开上次最后的一个窗口 
			if(this.nativeTab.id == this.homeTab.id) {
				this.showHome();
			}
			window.onresize();		// 手动触发一下窗口变动监听
		},
		// ------------------- 对外预留接口 --------------------
		// showList 为指定显示的id集合(注意是id的集合)，为空时代表显示所有
		initMenu: function(showList) {
			this.setMenuList(window.menuList, showList);
		},
		// 写入菜单，可以是一个一维数组(指定好parent_id)，也可以是一个已经渲染好的tree数组	
		// showList 为指定显示的id集合(注意是id的集合)，为空时代表显示所有	
		setMenuList: function(menu_list, showList) {
			// 设置菜单
			menu_list = this.arrayToTree(menu_list);
			menu_list = this.refMenuList(menu_list);
			this.menuList = menu_list;
			// 设置显示项
			if(!showList) {
				showList = this.getAllId(this.menuList);
			}
			for (var i = 0; i < showList.length; i++) {
				showList[i] = showList[i] + '';
			} 
			// console.log(showList);
			this.showList = showList;
			// 存一份一维数组
			// this.f5SearchList();
		},
		// 将一维平面数组转换为 Tree 菜单 (根据其指定的parent_id添加到其父菜单的childList)
		arrayToTree: function(menu_list) {
			for (var i = 0; i < menu_list.length; i++) {
				var menu = menu_list[i];
				// 添加到其指定的父菜单的childList
				if(menu.parent_id) {
					var parent_menu = this.getMenuById(menu_list, menu.parent_id);
					if(parent_menu) {
						menu.parent_menu = parent_menu;
						parent_menu.childList = parent_menu.childList || [];
						parent_menu.childList.push(menu);
						menu_list.splice(i, 1);	// 从一维中删除 
						i--;
					}
				}
			}
			return menu_list;
		},
		// 将 menu_list 处理一下 
		refMenuList: function(menu_list, parent_id) {
			for (var i = 0; i < menu_list.length; i++) {
				var menu = menu_list[i];
				menu.id = menu.id + '';
				menu.is_show = (menu.is_show === false ? false : true);
				menu.parent_id = menu.parent_id || parent_id || 0;
				// 隐藏的给去掉 
				// if(menu.is_show === false) {
				// 	sa_admin_code_util.arrayDelete(menu_list, menu);
				// 	i--;
				// 	continue;
				// }
				// 如果指定了 show_list，并且 menu.id 不在 show_list 里，划掉
				// if(show_list && show_list.indexOf(menu.id) == -1) {
				// 	menu.is_show = false;
				// 	// sa_admin_code_util.arrayDelete(menu_list, menu);
				// 	// i--;
				// 	// continue;
				// }
				// 有子项的递归处理 
				if(menu.childList && menu.childList.length > 0){
					this.refMenuList(menu.childList, menu.id);	// 递归处理 
				}
			}
			return menu_list;
		},
		// 获取菜单所有id 
		getAllId: function(menuList) {
			var arr = [];
			function fn(menu_list) {
				menu_list = menu_list || [];
				for (var i = 0; i < menu_list.length; i++) {
					var menu = menu_list[i];
					arr.push(menu.id);
					// 如果有子菜单 
					if(menu.childList) {
						fn(menu.childList);
					}
				}
			}
			fn(menuList);
			return arr;
		},
		// ------------------- 对外预留 end --------------------
		// 打开所有菜单的折叠
		show_all_menu: function() {
			var defaultOpeneds = [];
			for (var i = 0; i < this.menuList.length; i++) {
				defaultOpeneds.push(this.menuList[i].id);
				if(this.menuList[i].childList) {
					for (var j = 0; j < this.menuList[i].childList.length; j++) {
						defaultOpeneds.push(this.menuList[i].childList[j].id);
					}
				}
			}
			this.defaultOpeneds = defaultOpeneds;
		},
		// 切换主题
		toggleTheme: function(command) {
			// 调整动画，避免卡顿
			this.themeToggling = true;
			setTimeout(function() {
				this.themeToggling = false;
			}.bind(this), 1000);
			
			// 开始切换
			this.themeV = command + "";
			localStorage.setItem('themeV', command);
			for (var i = 0; i < this.themeList.length; i++) {
				if(this.themeList[i].value + '' == command + '') {
					if(this.themeList[i].show_all) {
						this.show_all_menu();
						this.uniqueOpened = false;
					} else {
						this.defaultOpeneds = [];
						this.uniqueOpened = true;
					}
					// 给个提示 
					if(window.dsadasdwdwawd) {
						this.$message('切换成功，' + this.themeList[i].name);
					}
					window.dsadasdwdwawd = true;
				}
			}
		},
		// 切换翻页方式
		toggleSwitch: function(command) {
			this.switchV = command + "";
			localStorage.setItem('switchV', command);
			
			this.$confirm('此动画效果将在您刷新页面之后生效，是否立即刷新？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(function() {
				location.reload();
			}).catch(function() {
				
			});
			
		},
		// 处理userinfo的下拉点击
		handleCommand: function(command) {
			this.dropList.forEach(function(drop) {
				if(drop.name == command) {
					drop.click();
				}
			})
		},
		// 退出登录
		login_out: function() {
			console.log('退出登录');
		},
		
		// ------------------- tab 右键菜单相关 --------------------
		// 显示右键菜单
		right_showMenu: function(tab, event) {
			this.rightTab = tab;	// 绑定操作tab  
			var e = event || window.event;
			this.rightStyle.left = (e.clientX + 1) + 'px';	// 设置给坐标x
			this.rightStyle.top = e.clientY + 'px';		// 设置给坐标y
			this.rightShow = true;	// 显示右键菜单 
			this.$nextTick(function() {
				var foxHeight = document.querySelector('.right-box-2').offsetHeight;	// 应该展开多高 
				this.rightStyle.maxHeight = foxHeight + 'px';	// 展开 
				document.querySelector('.right-box').focus();		// 获得焦点,以被捕获失去焦点事件
			});
		},
		// 关闭右键菜单 - 立即关闭
		right_closeMenu: function() {
			this.rightStyle.maxHeight = '0px';	
			this.rightShow = false;
		},
		// 关闭右键菜单 - 带动画折叠关闭 (失去焦点和点击取消时调用, 为什么不全部调用这个? 因为其它时候调用这个都太卡了) 
		right_closeMenu2: function() {
			this.rightStyle.maxHeight = '0px';	
			// this.rightShow = false;
		},
		// 右键 刷新
		right_f5: function() {
			this.showTab(this.rightTab);	// 先转到
			var cs = '#iframe-' + this.rightTab.id;
			var iframe = document.querySelector(cs);
			iframe.setAttribute('src', this.getTabUrl(this.rightTab));
		},
		// 右键 复制
		right_copy: function() {
			this.showTab({id: new Date().getTime(), name: this.rightTab.name, url: this.getTabUrl(this.rightTab)});
		},
		// 右键 悬浮 
		right_xf: function() {
			if(this.rightTab.id == this.homeTab.id + ''){
				this.$message({
					message: '这个不能悬浮哦，换个卡片试试吧',
					type: 'warning'
				});
				return;	
			}
			// 先关闭
			this.closeTab(this.rightTab, function() {
				this.f5_breMenuList();
			}.bind(this));   
			// 再打开  
			var index = layer.open({
				type: 2,
				title: this.rightTab.name,
				moveOut: true, // 是否可拖动到外面
				maxmin: true, // 显示最大化按钮
				shadeClose: false,
				shade: 0,
				area: ['80%', '80%'],
				zIndex: layer.zIndex,
				content: this.getTabUrl(this.rightTab),
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
		// 右键 - 关闭
		right_close: function() {
			if(this.rightTab.id == this.homeTab.id + ''){
				this.$message({
					message: '这个不能关闭哦',
					type: 'warning'
				});
				return;	// 隐藏右菜单
			}
			this.closeTab(this.rightTab, function() {
				this.f5_breMenuList();
			}.bind(this));
		},
		// 右键 - 关闭其它 
		right_close_other: function() {
			// 先滑到最左边 
			this.$refs['nav-tab-bar'].scrollX = 0;	
			// 递归删除
			var i = 0;
			var deleteFn = function() {
				// 如果已经遍历全部 
				if(i >= this.tabList.length) {
					return;
				}
				// 如果在白名单,i++继续遍历, 如果不是,递归删除 
				var tab = this.tabList[i];
				if(tab.id + '' == this.homeTab.id + '' || tab.id + '' == this.rightTab.id){	
					i++;
					deleteFn();
				} else {
					this.closeTab(tab, function() {
						deleteFn();
					});
				}
			}.bind(this);
			deleteFn();
		},
		// 右键 - 关闭所有 
		right_close_all: function() {
			// 先滑到最左边 
			this.$refs['nav-tab-bar'].scrollX = 0;	
			// 递归删除 
			var i = 0;
			var deleteFn = function() {
				// 如果已经遍历全部 
				if(i >= this.tabList.length) {
					this.f5_breMenuList();
					return;
				}
				// 如果在白名单,i++继续遍历, 如果不是,递归删除 
				var tab = this.tabList[i];
				if(tab.id + '' == this.homeTab.id + ''){	
					i++;
					deleteFn();
				} else {
					this.closeTab(tab, function() {
						deleteFn();
					});
				}
			}.bind(this);
			deleteFn();
		},
		// 右键 - 新窗口打开
		right_window_open: function() {
			open(this.getTabUrl(this.rightTab)); 
		},
		// 获取指定tab所代表iframe的url地址 (同域下可获取最新地址, 跨域时只能获取初始化时的地址)
		getTabUrl: function(tab) {
			var cs = '#iframe-' + tab.id;
			var iframe = document.querySelector(cs);
			try{
				return iframe.contentWindow.location.href;
			}catch(e){
				return iframe.getAttribute('src');
			}
		},
		
		// ------------------- menu 相关 --------------------
		// 点击子菜单时的回调, 
		// 参数: 点击菜单index标识（不是下标）, 所有已经打开的菜单 index 
		selectMenu: function(index, indexArray) {
			var menu = this.getMenuById(this.menuList, index);
			if(menu != null) {
				this.showTab(menu); 
			}
		},
		// js显示某个菜单
		showMenuById: function(id) {
			var menu = this.getMenuById(this.menuList, id);
			if(menu) {
				this.showTab(menu); 
			}
		},
		// 返回指定 index 的menu
		getMenuById: function(menuList, id) {
			for (var i = 0; i < menuList.length; i++) {
				var menu = menuList[i];
				if(menu.id + '' == id + '') {
					return menu;
				}
				// 如果是二级或多级
				if(menu.childList) {
					var menu2 = this.getMenuById(menu.childList, id);
					if(menu2 != null) {
						return menu2;
					}
				}
			}
			return null;
		},
		// 显示homeTab
		showHome: function() {
			this.showTab(this.homeTab); 
		},
		
		// ------------------- tab title 相关 --------------------
		// 关闭tab - 无动画版本
		closeTab_not_an: function(tab) {
			// 根据没有地方调用这个方法, 所以先不写了嘻嘻
			console.log(123);
		},
		// 关闭页面
		closeTab: function(tab, callFn) {
			
			// 执行关闭动画
			var div = document.querySelector('#tab-' + tab.id);
			div.style.width = div.offsetWidth + 'px';
			setTimeout(function() {
				div.style.width = '0px';
			}, 0);
			
			// 等待动画结束
			setTimeout(function() {
				
				// 如果tab为当前正在显示的tab, 则先不让它显示
				if(tab == this.nativeTab) {
					var index = this.tabList.indexOf(tab); 
					var preTab = this.tabList[index - 1]; 
					this.showTab(preTab); 
				}
				// 开始从集合中移除 
				sa_admin_code_util.arrayDelete(this.tabList, tab);
				// 如果有回调 
				if(callFn) {
					this.$nextTick(function() {
						callFn();
					})
				}
			}.bind(this), 150);
		},
		// js关闭某个tab, 根据id
		closeTabById: function(id, callFn) {
			var tab = this.getTabById(id);
			if(tab) {
				this.closeTab(tab, callFn);
			}
		},
		// 添加一个Tab  {id,name,url}
		addTab: function(tab) {
			tab.is_have_en = this.is_have_en(tab.name);	// 有英文字母的不能加字体加粗动画, 因为会影响tab选项卡的width尺寸, 造成动画混乱 
			this.tabList.push(tab);
			if(this.tabList.length > 20 && this.tabList.length < 30) {
				sa_admin.$message({message: '选项卡过多会造成窗口卡顿，建议您关闭不使用的窗口', type: 'warning'});
			}
		},
		// 显示某个页面  (如果不存在, 则先添加)
		showTab: function(tab) {
			// 标注：需要此刻加载 
			tab.isNeedLoad = true;	
			// 如果是外部链接
			if(tab.is_blank) {
				return open(tab.url); 
			}
			// 如果是当前正在显示的tab , 则直接 返回  
			if(tab == this.nativeTab) {
				return;
			}
			// 如果是click函数 
			if(tab.click) {
				if(tab.click() !== true) {
					return;
				}
			}
			// 如果没有先添加
			if(this.getTabById(tab.id) == null){
				this.addTab(tab);
			}
			// 然后显示 
			this.$nextTick(function() {
				this.f5HashByNativeTab();
			})
			
			this.nativeTab = tab;
			// this.nativeTab.is_load = true;	// 标注：已经加载过了 
			this.defaultActive = tab.id + '';	// 左边自动关联, 如果左边没有，则无效果 
			
			// 归位一下
			this.$nextTick(function() {
				try{
					this.$refs['nav-tab-bar'].scrollToAuto(); 
				}catch(e){}
			}.bind(this))
		},
		// 显示一个选项卡, 根据 id , 不存在则不显示 
		showTabById: function(id) {
			var tab = this.getTabById(id);
			if(tab) {
				this.showTab(tab);
			}
		},
		// 获取 Tab 根据 id
		getTabById: function(id) {
			for (var i = 0; i < this.tabList.length; i++) {
				if(this.tabList[i].id + '' == id + '') {
					return this.tabList[i];
				}
			}
			return null;
		},
		// 返回一个字符串中是否有英文字母
		is_have_en: function(str) {
			var reg = /[a-z]/i;
			return reg.test(str);//true,说明有英文字母 
		},
		// ------------------- tab拖拽相关 -------------------- 
		// 在 某个tab上被松开  -->  重新排序   ( 函数未完成 )   
		tab_ondrop: function(tab) {
			
		},
		// ------------------- 锚链接路由相关 --------------------
		// 根据锚链接, 打开窗口
		showTabByHash: function() {
			// 如果非记住模式
			if(this.is_reme_open == false) {
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
			if(tab != null) {
				return this.showTab(tab);
			}
			// 否则从菜单中打开 
			if(id == this.homeTab.id){
				this.showHome();
			} else {
				this.showMenuById(id);
			}
			// 此时, 仍有一种tab打不开, 那就是自定义tab然后还已经关闭的,
			// 预设 解决方案: 在localStor里存储所有打开过的tab,
			// 以后如果有强需求这个功能时, 再实现 
		},
		// 根据当前tab刷新一下锚链接
		f5HashByNativeTab: function() {
			// 如果非记住模式
			if(this.is_reme_open == false) {
				return;
			}
			location.hash = this.nativeTab.id;
		},
		// ------------------- 查找菜单相关 --------------------
		
		// ------------------- 杂七杂八 -------------------- 
		// 打开便签 
		openNote: function() {
			var w = (document.body.clientWidth * 0.4) + 'px';
			var h = (document.body.clientHeight * 0.6) + 'px';
			var default_content = '一个简单的小便签, 关闭浏览器后再次打开仍然可以加载到上一次的记录, 你可以用它来记录一些临时资料';
			var value = localStorage.getItem('sa_admin_note') || default_content;
			var index = layer.prompt({
				title: '一个小便签', 
				value: value,
				formType: 2,
				area: [w, h],
				btn: ['保存'],
				maxlength: 99999999,
				skin: 'layer-note-class' 
			}, function(pass, index){
				layer.close(index)					
			});
			var se = '#layui-layer' + index + ' .layui-layer-input';
			var d = document.querySelector(se);
			d.oninput = function() {
				localStorage.setItem('sa_admin_note', this.value);
			}
		},
		// 弹窗
		msg: function(msg) {
			layer.msg(msg)
		},
		// 打印版本
		printVesion: function() {
			console.log('欢迎使用sa-admin(iframe版)，当前版本：' + this.version + "，更新于：" + this.update_time + "，GitHub地址：" + this.github_url);
			console.log('如在使用中发现任何bug或者疑问，请加入QQ群交流：782974737，点击加入：' + 'https://jq.qq.com/?_wv=1027&k=5DHN5Ib');
		},
		// 获取指定tab栏的window对象, 用于多窗口通信 
		getTabWindow: function(tab_id) {
			var iframe = document.querySelector('#iframe-' + tab_id);
			if(iframe != null)  {
				return iframe.contentWindow;
			}
			return null;
		}
	},
	created:function(){
		
	}
});
// var sp = sa_admin;	// 兼容原有方案 



// iframe加载完毕后清除其背景loading图标 
window.onload_iframe = function(iframe_id) {
	// console.log(iframe_id);
	var iframe = document.querySelector('#iframe-' + iframe_id);
	if(iframe != null) {
		iframe.style.backgroundImage='none';
	}
}

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
	// console.log('锚链接变动了');
	sa_admin.showTabByHash();
}


