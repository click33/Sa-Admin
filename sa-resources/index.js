var homePage = {
	id: '0',	// 唯一标识 
	name: '首页',
	url: 'main.html',	// 页面地址 
	hide_close: true	// 隐藏关闭键 
}

var sp = new Vue({
	el: '.app',
	data: {
		version: 'v1.0.1',		// 当前版本
		title: 'SA-后台模板',				// 页面标题  
		default_active: '0',	// 默认的高亮菜单
		menuList: [],		// 菜单集合 
		pageList: [homePage],	// 页面集合
		nativePage: homePage,	// 当前正显示的Page 
		scrollX: 0		,// 滚动条位置 
		rightPage: null,	// 右键操作的page
		rightShow: false,	// 右键菜单是否显示 
		rightZB: {x: 0, y: 0}	,// 右键菜单坐标
		is_fold: false,			// 菜单是否折叠
		is_full_screen: false	,// 是否全屏
		user: null	,// user信息
		now_time: '加载中...'	,// 当前时间 
		themeV: localStorage.getItem('themeV') || '1',	// 当前主题值
		themeList: [	// 主题数组
			{name: '主题 1', value: '1'},
			{name: '主题 2', value: '2'},
			{name: '主题 3', value: '3'},
			{name: '主题 4', value: '4'}
		],
		dropList: []
	},
	watch: {
		// 监听全屏动作 
		is_full_screen: function(newValue, oldValue) {
			if(newValue) {
				fullScreen();
			} else {
				fullScreenNormal();
			}
		},
		// 监听title改变时, 页面title也跟着切换 
		title: function(newValue, oldValue) {
			document.querySelector('title').innerHTML = newValue;
		}
	},
	methods: {
		// 切换主题
		toggleTheme: function(command) {
			this.themeV = command + "";
			localStorage.setItem('themeV', command);
			for (var i = 0; i < this.themeList.length; i++) {
				if(this.themeList[i].value + '' == command + '') {
					this.$message('切换成功，' + this.themeList[i].name);
				}
			}
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
		// ------------------- 对外预留接口 --------------------
		
		// ------------------- p-title右键菜单相关 --------------------
		// 右键 p-title
		right_click: function(page, event) {
			// 设置坐标
			var e = event || window.event;
			this.rightZB.x = e.clientX;
			this.rightZB.y = e.clientY;	// 
			this.rightPage = page;	// 绑定操作page
			this.rightShow = true;	// 显示
		},
		// 右键菜单消失
		right_menu_close: function() {
			this.rightShow = false;	// 显示
		},
		// 右键 刷新
		right_f5: function() {
			this.showPage(this.rightPage);	// 先转到
			var cs = '.iframe' + this.rightPage.id;
			var iframe = document.querySelector(cs);
			iframe.setAttribute('src', iframe.getAttribute('src')); 
			this.rightShow = false;		// 隐藏右菜单
		},
		// 右键 - 关闭
		right_close: function() {
			if(this.rightPage.id == '0'){
				this.$message({
					message: '这个不能关闭哦',
					type: 'warning'
				});
				return this.rightShow = false;	// 隐藏右菜单
			}
			this.closePage(this.rightPage);
			this.rightShow = false;	// 隐藏右菜单
		},
		// 右键 - 关闭其它 
		right_close_other: function() {
			for (var i = 0; i < this.pageList.length; i++) {
				var page = this.pageList[i];
				if(page.id + '' == '0' || page.id + '' == this.rightPage.id){
					continue;
				}
				this.closePage(page);
				i--;
			}
			this.rightShow = false;	// 隐藏右菜单
		},
		// 右键 - 关闭所有 
		right_close_all: function() {
			for (var i = 0; i < this.pageList.length; i++) {
				var page = this.pageList[i];
				if(page.id + '' == '0'){
					continue;
				}
				this.closePage(page);
				i--;
			}
			this.rightShow = false;	// 隐藏右菜单
		},
		// 右键 - 新窗口打开
		right_window_open: function() {
			var cs = '.iframe' + this.rightPage.id;
			var iframe = document.querySelector(cs);
			open(iframe.src); 
			this.rightShow = false;		// 隐藏右菜单
		},
		
		// ------------------- menu 相关 --------------------
		// 点击子菜单时的回调, 
		// 参数: 点击菜单index标识（不是下标）, 所有已经打开的菜单 index
		selectMenu: function(index, indexArray) {
			if(index + '' == 0) {
				return this.showPage(homePage);
			}
			var menu = this.getMenuById(index);
			this.showPage(menu);
		},
		// 
		// 返回指定 index 的menu
		getMenuById: function(id) {
			for (var i = 0; i < this.menuList.length; i++) {
				var menu = this.menuList[i];
				if(menu.id + '' == id + '') {
					return menu;
				}
				// 如果是二级 
				if(menu.childList) {
					for (var j = 0; j < menu.childList.length; j++) {
						var menu2 = menu.childList[j];
						if(menu2.id + '' == id + '') {
							return menu2;
						}
						// 如果是三级
						if(menu2.childList) {
							for (var k = 0; k < menu2.childList.length; k++) {
								var menu3 = menu2.childList[k];
								if(menu3.id + '' == id + '') {
									return menu3;
								}
							}
						}
						
					}
				}
			}
			return null;
		},
		
		// ------------------- page title 相关 --------------------
		// 关闭页面
		closePage: function(page) {
			if(page == this.nativePage) {
				var index = this.pageList.indexOf(page);
				var prePage = this.pageList[index - 1];
				this.showPage(prePage);
			}
			arrayDelete(this.pageList, page);
		},
		// 添加一个Page
		addPage: function(page) {
			this.pageList.push(page);
		},
		// 显示某个页面
		showPage: function(page) {
			// 如果是外部链接
			if(page.is_blank) {
				return open(page.url); 
			}
			// 如果没有先添加
			if(this.pageList.indexOf(page) == -1){
				this.addPage(page);
			}
			this.nativePage = page;
			this.default_active = page.id + '';	// 左边自动关联
			// 归位一下
			this.$nextTick(function() {
				this.scrollToAuto();	
			}.bind(this))
		},
		// 视角向左滑动一段距离 
		scrollToLeft: function() {
			var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
			this.scrollX += width / 2;	// 视角向左滑动一段距离
			// 越界检查
			setTimeout(function() {
				if(this.scrollX > 0){
					this.scrollX = 0;
				}
			}.bind(this), 200);
		},
		// 视角向右滑动一段距离 
		scrollToRight: function() {
			var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
			var pageListWidth = document.querySelector('.page-title-box').clientWidth;	// title总盒子宽度
			var rightLimit = (0 - pageListWidth + width / 2);	// 右滑的极限
			this.scrollX -= width / 2;		// 视角向右滑动一段距离
			// 越界检查
			setTimeout(function() {
				if(this.scrollX < rightLimit){
					this.scrollX = rightLimit;
				}
			}.bind(this), 200);
		},
		// 自动归位
		scrollToAuto: function() {
			// 最后一个不用归位了 
			if(this.nativePage == this.pageList[this.pageList.length]){
				return;
			}
			var width = document.querySelector('.nav-right-2').clientWidth;	// 视角宽度
			var left = document.querySelector('.page-native').lastChild.offsetLeft;	// 当前native-tilte下一个距离左边的距离
			// 如果在视图右边越界
			if(left + this.scrollX > (width - 100)){
				this.scrollToRight();
			}
			
		}
		
	},
	created:function(){
		
		// 调整是否收拾
		if(document.body.clientWidth < 800) {
			this.is_fold = true;
		} else {
			this.is_fold = false;
		}

	}
})


// 一直更新时间
setInterval(function() {
	var da = new Date();
	var Y = da.getFullYear(); //年
	var M = da.getMonth() + 1; //月
	var D = da.getDate(); //日
	var h = da.getHours(); //小时
	var sx = "凌晨";
	if (h >= 6) {
		sx = "上午"
	}
	if (h >= 12) {
		sx = "下午";
		h -= 12;
	}
	if (h >= 18) {
		sx = "晚上";
	}
	var m = da.getMinutes(); //分
	var s = da.getSeconds(); //秒
	var z = da.getDay(); //周几
	z = z == 0 ? '日' : z;
	var zong = "";

	zong += Y + "-" + M + "-" + D + " " + sx + " " + h + ":" + m + ":" + s + " 周" + z;
	sp.now_time = zong;
}, 1000)


// 监听窗口大小变动
window.onresize = function() {
	if(document.body.clientWidth < 800) {
		sp.is_fold = true;
	} else {
		sp.is_fold = false;
	}
}
