// ======================== 一些工具方法 ======================== 

var sa_admin_code_util = {
	// 删除数组某个元素
	arrayDelete: function(arr, item){
		var index = arr.indexOf(item);
		if (index > -1) {
			arr.splice(index, 1);
		}
	},
	
	//执行一个函数, 解决layer拉伸或者最大化的时候，iframe高度不能自适应的问题
	solveLayerBug: function(index) {
		var selected = '#layui-layer' + index;
		var height = $(selected).height();
		var title_height = $(selected).find('.layui-layer-title').height();
		$(selected).find('iframe').css('height', (height - title_height) + 'px');
		// var selected = '#layui-layer' + index;
		// var height = $(selected).height();
		// var title_height = $(selected).find('.layui-layer-title').height();
		// $(selected).find('iframe').css('height', (height - title_height) + 'px');
	},
	
	// 全屏 
	fullScreen: function(){
		if(document.documentElement.RequestFullScreen){
			document.documentElement.RequestFullScreen();
		}
		//兼容火狐
		if(document.documentElement.mozRequestFullScreen){
			document.documentElement.mozRequestFullScreen();
		}
		//兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
		if(document.documentElement.webkitRequestFullScreen){
			document.documentElement.webkitRequestFullScreen();
		}
		//兼容IE,只能写msRequestFullscreen
		if(document.documentElement.msRequestFullscreen){
			document.documentElement.msRequestFullscreen();
		}
	},
	
	// 退出全屏
	fullScreenNormal: function() {
		if(document.exitFullScreen){
			document.exitFullscreen()
		}
		//     		//兼容火狐
		//     		console.log(document.mozExitFullScreen)
		if(document.mozCancelFullScreen){
			document.mozCancelFullScreen()
		}
		//     		//兼容谷歌等
		if(document.webkitExitFullscreen){
			document.webkitExitFullscreen()
		}
		//     		//兼容IE
		if(document.msExitFullscreen){
			document.msExitFullscreen()
		}
	},
	
	
	// ======================== 菜单集合相关 ======================== 
	
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
	refMenuList: function(menu_list) {
		for (var i = 0; i < menu_list.length; i++) {
			var menu = menu_list[i];
			// 有子项的递归处理 
			if(menu.childList){
				menu.children = menu.childList;
				this.refMenuList(menu.childList);
			}
		}
		return menu_list;
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
	}
	
	
	
	
}







