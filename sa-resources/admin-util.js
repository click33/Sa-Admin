// ======================== 一些工具方法 ======================== 

// 删除数组某个元素
function arrayDelete(arr, item){
	var index = arr.indexOf(item);
	if (index > -1) {
		arr.splice(index, 1);
	}
}

// 想url后面追加一个参数字符串，处理各种情况 
function urlAppendArg(url, arg_str) {
	if(arg_str == null || arg_str.length == 0) {
		return url;
	}
	var index = url.indexOf('?');
	// ? 不存在
	if(index == -1) {
		return url + '?' + arg_str;
	}
	// ? 是最后一位
	if(index == url.length - 1) {
		return url + arg_str;
	}
	// ? 是其中一位
	if(index > -1 && index < url.length - 1) {
		// 如果最后一位是 不是&, 且 arg_str 第一位不是 &, 就增送一个 &
		if(url.lastIndexOf('&') != url.length - 1 && arg_str.indexOf('&') != 0) {
			return url + '&' + arg_str;
		} else {
			return url + arg_str;
		}
	}
}

// 全屏 
function fullScreen(){
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
}
// 退出全屏
function fullScreenNormal() {
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
}



// ======================== 菜单集合相关 ======================== 

// 将一维平面数组转换为 Tree 菜单 (根据其指定的parent_id添加到其父菜单的childList)
function arrayToTree(menu_list) {
	for (var i = 0; i < menu_list.length; i++) {
		var menu = menu_list[i];
		// 添加到其指定的父菜单的childList
		if(menu.parent_id) {
			var parent_menu = getMenuById(menu_list, menu.parent_id);
			if(parent_menu) {
				parent_menu.childList = parent_menu.childList || [];
				parent_menu.childList.push(menu);
				menu_list.splice(i, 1);	// 从一维中删除 
				i--;
			}
		}
	}
	return menu_list;
}


// 将 menu_list 处理一下 
function refMenuList(menu_list) {
	for (var i = 0; i < menu_list.length; i++) {
		var menu = menu_list[i];
		// 有子项的递归处理 
		if(menu.childList){
			menu.children = menu.childList;
			refMenuList(menu.childList);
		}
	}
	return menu_list;
}



// 返回指定 index 的menu   
function getMenuById(menuList, id) {
	for (var i = 0; i < menuList.length; i++) {
		var menu = menuList[i];
		if(menu.id + '' == id + '') {
			return menu;
		}
		// 如果是二级或多级 
		if(menu.childList) {
			var menu2 = getMenuById(menu.childList, id);
			if(menu2 != null) {
				return menu2;
			}
		}
	}
	return null;
}


