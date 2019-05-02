// 删除数组某个元素
function arrayDelete(arr, item){
	var index = arr.indexOf(item);
	if (index > -1) {
		arr.splice(index, 1);
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

