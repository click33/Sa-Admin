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

