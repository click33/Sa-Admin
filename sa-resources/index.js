// 首页 
var homePage = {
	id: '-1',	// 唯一标识 
	name: '首页',
	url: 'main.html',	// 页面地址 
	hide_close: true	// 隐藏关闭键 
}

var sp = new Vue({
	el: '.app',
	data: {
		version: 'v1.1.0',		// 当前版本
		update_time: '2019-6-24',		// 更新日期 
		title: 'SA-后台模板',				// 页面标题  
		logo_url: 'sa-resources/admin-logo.png',	// logo地址 
		default_active: '0',	// 默认的高亮菜单id
		menuList: [],		// 菜单集合 
		homePage: homePage,		// 主页page
		nativePage: homePage,	// 当前正显示的Page 
		pageList: [homePage],	// 页面集合
		scrollX: 0		,// 滚动条位置 
		rightShow: false,	// 右键菜单是否显示 
		rightPage: null,	// 右键正在操作的page
		rightZB: {x: 0, y: 0}	,// 右键菜单坐标
		is_fold: false,			// 菜单是否折叠
		is_fold_right: false,	// 右边是否折叠（将右边盒子折叠与菜单折叠分开，这样可以减少动画的卡顿现象）   
		is_full_screen: false	,// 是否全屏   
		user: null	,// user信息
		now_time: '加载中...'	,// 当前时间 
		switchV: localStorage.getItem('switchV') || 'fade',	// 切换效果 
		switchList: [	// 切换动画数组 
			{name: '淡入', value: 'fade'},
			{name: '滑动', value: 'slide'},
			{name: '方块', value: 'cube'},
			{name: '3D流', value: 'coverflow'},
			{name: '3D翻转', value: 'flip'}
		],
		themeV: localStorage.getItem('themeV') || '1',	// 当前主题值
		themeList: [	// 主题数组
			{name: '主题 1', value: '1'},
			{name: '主题 2', value: '2'},
			{name: '主题 3', value: '3'},
			{name: '主题 4', value: '4'}
		],
		dropList: []	// 头像处下拉列表菜单 
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
		// ------------------- 对外预留接口 --------------------
		// 写入菜单，可以是一个一维数组(指定好parent_id)，也可以是一个已经渲染好的tree数组	
		// show_list 为指定显示的id集合(注意是id的集合)，为空时代表显示所有	
		setMenuList: function(menu_list, show_list) {
			// 转化为string 便于比较
			if(show_list) {
				for (var i = 0; i < show_list.length; i++) {
					show_list[i] = show_list[i] + '';
				} 
			}
			menu_list = this.arrayToTree(menu_list);
			menu_list = this.refMenuList(menu_list, show_list);
			this.menuList = menu_list;
		},
		// 将一维平面数组转换为 Tree 菜单 (根据其指定的parent_id添加到其父菜单的childList)
		arrayToTree: function(menu_list) {
			for (var i = 0; i < menu_list.length; i++) {
				var menu = menu_list[i];
				// 添加到其指定的父菜单的childList
				if(menu.parent_id) {
					var parent_menu = this.getMenuById(menu_list, menu.parent_id);
					if(parent_menu) {
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
		refMenuList: function(menu_list, show_list) {
			for (var i = 0; i < menu_list.length; i++) {
				var menu = menu_list[i];
				// 隐藏的给去掉 
				if(menu.is_show === false) {
					arrayDelete(menu_list, menu);
					i--;
					continue;
				}
				// 如果指定了 show_list，并且 menu.id 不在 show_list 里，划掉
				if(show_list && show_list.indexOf(menu.id) == -1) {
					arrayDelete(menu_list, menu);
					i--;
					continue;
				}
				// 有子项的递归处理 
				if(menu.childList && menu.childList.length > 0){
					this.refMenuList(menu.childList, show_list);	// 递归处理 
				}
			}
			return menu_list;
		},
		// js显示某个菜单
		showMenuById: function(id) {
			var menu = this.getMenuById(this.menuList, id);
			if(menu) {
				this.showPage(menu); 
			}
		},
		// 显示homePage
		showHome: function(id) {
			this.showPage(homePage); 
		},
		// js关闭某个page, 根据id
		closePageById: function(id) {
			var page = this.getPageById(id);
			this.closePage(page);
		},
		// ------------------- 对外预留 end --------------------
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
		// 折叠菜单
		fold_start: function() {
			this.is_fold_right = true; 
			sw.updateSlideSize(100);	// swipre重新计算大小  
			// 如果打开的 iframe 在五个以内  浏览器压力很小 就立刻展开菜单，
			// 如果打开 iframe 超过5个，浏览器就比较有压力， 此时会卡顿短暂时间，此时延时折叠菜单，让动画显得没那么卡 
			if(this.pageList.length <= 5) {
				this.is_fold = true;
			} else {
				setTimeout(function() {
					this.is_fold = true;
				}.bind(this), 100);
			}
		},
		// 展开菜单
		fold_end: function() {
			this.is_fold = false;
			// 延时200ms执行，让它没那么卡 
			setTimeout(function() {
				this.is_fold_right = false; 
				sw.updateSlideSize();	// swipre重新计算大小  
			}.bind(this), 200);
		},
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
			this.rightShow = false;	// 关闭 
		},
		// 右键 刷新
		right_f5: function() {
			this.showPage(this.rightPage);	// 先转到
			var cs = '#iframe' + this.rightPage.id;
			var iframe = document.querySelector(cs);
			iframe.setAttribute('src', iframe.getAttribute('src')); 
			this.rightShow = false;		// 隐藏右菜单
		},
		// 右键 - 关闭
		right_close: function() {
			if(this.rightPage.id == homePage.id + ''){
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
				if(page.id + '' == homePage.id + '' || page.id + '' == this.rightPage.id){
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
				if(page.id + '' == homePage.id + ''){
					continue;
				}
				this.closePage(page);
				i--;
			}
			this.rightShow = false;	// 隐藏右菜单
		},
		// 右键 - 新窗口打开
		right_window_open: function() {
			open(this.rightPage.url); 
			this.rightShow = false;		// 隐藏右菜单
		},
		
		// ------------------- menu 相关 --------------------
		// 点击子菜单时的回调, 
		// 参数: 点击菜单index标识（不是下标）, 所有已经打开的菜单 index
		selectMenu: function(index, indexArray) {
			// if(index + '' == homePage.id + '') {
			// 	return this.showPage(homePage);
			// }
			var menu = this.getMenuById(this.menuList, index);
			this.showPage(menu); 
		},
		// 
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
		
		// ------------------- page title 相关 --------------------
		// 关闭页面
		closePage: function(page) {
			if(page == this.nativePage) {
				var index = this.pageList.indexOf(page); 
				var prePage = this.pageList[index - 1]; 
				this.showPage(prePage); 
			}
			// 删除 slide 
			var index = this.pageList.indexOf(page);
			sw.mySwiper.removeSlide(index);
			arrayDelete(this.pageList, page);
		},
		// 添加一个Page
		addPage: function(page) {
			this.pageList.push(page);
			var slide = '<div class="swiper-slide">' + 
						'	<iframe src="' + page.url + '" id="iframe' + page.id + '" class="iframe"></iframe>' + 
						'</div>';
			sw.mySwiper.appendSlide(slide);
		},
		// 显示某个页面, 
		// page对象，是否强制刷新 
		showPage: function(page) {
			// 如果是外部链接
			if(page.is_blank) {
				return open(page.url); 
			}
			// 如果没有先添加
			if(this.getPageById(page.id) == null){
				this.addPage(page);
			}
			this.nativePage = page;
			this.default_active = page.id + '';	// 左边自动关联, 如果左边没有，则无效果 
			
			// swiper切换
			var index = this.pageList.indexOf(page);
			sw.slideTo(index);
			
			// 归位一下
			this.$nextTick(function() {
				this.scrollToAuto();	
			}.bind(this))
		},
		// 获取 Page 根据 id
		getPageById: function(id) {
			for (var i = 0; i < this.pageList.length; i++) {
				if(this.pageList[i].id + '' == id + '') {
					return this.pageList[i];
				}
			}
			return null;
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
				// 同时防止左边越界 
				if(this.scrollX > 0){
					this.scrollX = 0;
				}
			}.bind(this), 200);
		},
		// 自动归位
		scrollToAuto: function() {
			// 最后一个不用归位了 
			if(this.nativePage == this.pageList[this.pageList.length - 1]){
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
		
		setTimeout(function() {
			console.log('欢迎使用sa-admin，当前版本：' + this.version + '，如在使用中发现任何bug或者疑问，请加群交流：782974737，点击加入：' + 'https://jq.qq.com/?_wv=1027&k=5DHN5Ib');
		}.bind(this), 2000)
		
		// 调整是否
		setTimeout(function() {
			window.onresize();
		}, 0);

	}
});



// swiper相关方法 
var mySwiper = new Swiper('.swiper-container', {
	autoplay: false,		//可选选项，自动滑动
	effect: sp.switchV
})

var sw = {
	mySwiper: mySwiper,
	// 转到指定slide
	slideTo: function(index) {
		// 先屏蔽掉所有滚动条
		// document.querySelectorAll('.iframe').forEach(function(item) {
		// 	item.classList.add('iframe-no-scroll');
		// })
		// 切换到第一个slide，速度为1秒
		sw.mySwiper.slideTo(index, 300);
		
		
		// 再打开所有滚动条
		// setTimeout(function() {
		// 	document.querySelectorAll('.iframe').forEach(function(item) {
		// 		item.classList.remove('iframe-no-scroll');
		// 		// arrayDelete(item.classList, 'iframe-no-scroll')
		// 	})
		// }, 200);
	},
	// 更正slide大小 ms = 延时毫秒数
	updateSlideSize: function(ms) {
		ms = ms || 1;
		setTimeout(function() {
			sw.mySwiper.update();	// swipre重新计算大小  
		}, ms);
		// var width = document.querySelector('.nav-right-3').style.width;
		// document.querySelectorAll('.swiper-slide').forEach(function(item) {
		// 	item.style.width = width;
		// });
	}
}











// 监听窗口大小变动
window.onresize = function() {
	if(document.body.clientWidth < 800) {
		sp.fold_start();
	} else {
		sp.fold_end();
	}
}


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
		if (h >= 18) {
			sx = "晚上";
		}
		h -= 12;
	}
	var m = da.getMinutes(); //分
	var s = da.getSeconds(); //秒
	var z = ['日', '一', '二', '三', '四', '五', '六'][da.getDay()] ; //周几
	// z = z == 0 ? '日' : z;
	var zong = "";

	zong += Y + "-" + M + "-" + D + " " + sx + " " + h + ":" + m + ":" + s + " 周" + z;
	sp.now_time = zong;
}, 1000)


