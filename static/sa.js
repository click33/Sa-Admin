// =========================== sa对象封装一系列工具方法 ===========================  
var sa = {
	version: '2.1',
	update_time: '2020-2-13',
	info: '改了loading框的样式'
};

// ===========================  当前环境配置  ======================================= 
(function(){
	// 公司开发环境
	var cfg_dev = {
		api_url: 'http://localhost:8000',	// 所有ajax请求接口父地址
		web_url: 'http://www.baidu.com'		// 此项目前台地址 (此配置项非必须)
	}
	// 服务器测试环境
	var cfg_test = {
		api_url: 'http://www.baidu.com',
		web_url: 'http://www.baidu.com'
	}
	// 服务器测试环境
	var cfg_prod = {
		api_url: 'http://www.baidu.com',
		web_url: 'http://www.baidu.com'
	}
	sa.cfg = cfg_dev; // 最终环境 , 上线前请选择正确的环境 
})();


// ===========================  ajax的封装  ======================================= 
(function(){
	
	/** 对ajax的再封装, 这个ajax假设你的接口会返回以下格式的内容 
		{
			"code": 200,
			"msg": "ok",
			"data": []
		}
		如果返回的不是这个格式, 你可能需要改动一下源码, 要么改动服务端适应此ajax, 要么改动这个ajax适应你的服务端 
	 * @param {Object} url 请求地址
	 * @param {Object} data 请求参数
	 * @param {Object} success200 当返回的code码==200时的回调函数  
	 * @param {Object} 其它配置，可配置项有：
		{
			msg: '',		// 默认的提示文字 填null为不提示 
			type: 'get',	// 设定请求类型 默认post
			baseUrl: '',	// ajax请求拼接的父路径 默认取 sa.cfg.apu_url 
			sleep: 0,		// ajax模拟的延时毫秒数, 默认0 
			success500: fn,	// code码等于500时的回调函数 (一般代表服务器错误)
			success403: fn,	// code码等于403时的回调函数 (一般代表无权限)
			success401: fn,	// code码等于401时的回调函数 (一般代表未登录)
			errorfn: fn,	// ajax发生错误时的回调函数 (一般是ajax请求本身发生了错误)
			complete: fn,	// ajax无论成功还是失败都会执行的回调函数  
		}
	 */
	sa.ajax = function(url, data, success200, cfg){
		
		// 如果是简写模式(省略了data参数)
		if(typeof data === 'function'){
			cfg = success200;
			success200 = data;
			data = {};
		}
		
		// 默认配置
		var defaultCfg = {
			msg: '努力加载中...',	// 提示语
			baseUrl: (url.indexOf('http') === 0 ? '' : sa.cfg.api_url),// 父url，拼接在url前面
			sleep: 0,	// 休眠n毫秒处理回调函数 
			type: 'post',	// 默认请求类型 
			success200: success200,			// code=200, 代表成功 
			success500: function(res){		// code=500, 代表失败 
				return layer.alert('失败：' + res.msg);
			},
			success403: function(res){		// code=403, 代表权限不足
				return layer.alert("权限不足," + res.msg, {icon: 5});
			},
			success401: function(res){		// code=401, 代表未登录
				return layer.confirm("您当前暂未登录，是否立即登录？", {}, function(){
					layer.closeAll();
					return sa.$page.openLogin(cfg.login_url);
				});
			},
			errorfn: function(xhr, type, errorThrown){		// ajax发生异常时的默认处理函数
				if(xhr.status == 0){
					return layer.alert('无法连接到服务器，请检查网络');
				}
				return layer.alert("异常：" + JSON.stringify(xhr));
			},
			complete: function(xhr, ts) {	// 成功失败都会执行 
				
			}
		}
		
		// 将调用者的配置和默认配置合并 
		cfg = sa.extendJson(cfg, defaultCfg);
		
		// 打印请求地址和参数, 以便调试 
		console.log("请求地址：" + cfg.baseUrl + url);
		console.log("请求参数：" + JSON.stringify(data));
		
		// 开始显示loading图标 
		if(cfg.msg != null){
			sa.loading(cfg.msg);
		}
		
		// 开始请求ajax 
		return $.ajax({
			url: cfg.baseUrl + url,
			type: cfg.type, 
			data: data,
			dataType: 'json',
			xhrFields: {
				withCredentials: true // 携带跨域cookie
			},
			crossDomain: true,
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			},
			success: function(res){
				setTimeout(function() {
					sa.hideLoading();
					// 如果相应的处理函数存在
					if(cfg['success' + res.code] != undefined) {
						return cfg['success' + res.code](res);
					}
					layer.alert('未知状态码：' + JSON.stringify(res));
				}, cfg.sleep);
			},
			error: function(xhr, type, errorThrown){
				setTimeout(function() {
					sa.hideLoading();
					return cfg.errorfn(xhr, type, errorThrown);
				}, cfg.sleep);
			},
			complete: cfg.complete
		});
		
	};
	
	// 模拟一个ajax 
	// 请注意: 本模板中所有ajax请求调用的均为此模拟函数 
	sa.ajax2 = function(url, data, success200, cfg){
		// 如果是简写模式(省略了data参数)
		if(typeof data === 'function'){
			cfg = success200;
			success200 = data;
			data = {};
		}
		// 几个默认配置 
		cfg = cfg || {};
		// 设定一个默认的提示文字 
		if(cfg.msg == undefined || cfg.msg == null || cfg.msg == '') {
			cfg.msg = '正在努力加载...';
		}
		// 默认延时函数 
		if(cfg.sleep == undefined || cfg.sleep == null || cfg.sleep == '' || cfg.sleep == 0) {
			cfg.sleep = 600;
		}
		// 默认的模拟数据
		cfg.res = cfg.res || {
			code: 200,
			msg: 'ok',
			data: []
		}
		// 开始loding 
		sa.loading(cfg.msg);
		// 模拟ajax的延时 
		setTimeout(function() {
			sa.hideLoading();	// 隐藏掉转圈圈 
			success200(cfg.res);
		}, cfg.sleep)
	};
	
})();


// ===========================  封装弹窗相关函数   ======================================= 
(function() {
	
	// ============== 小提示 ===================== 
	var me = sa;
	
	// tips提示文字  
	me.msg = function(msg, cfg) {
		msg = msg || '操作成功';
		layer.msg(msg, cfg);
	};
	
	// 操作成功的提示  
	me.ok = function(msg) {
		msg = msg || '操作成功';
		layer.msg(msg, {anim: 0, icon: 1 }); 
	}
	me.ok2 = function(msg) {
		msg = msg || '操作成功';
		layer.msg(msg, {anim: 0, icon: 6 }); 
	}
	
	// 操作失败的提示  
	me.error = function(msg) {
		msg = msg || '操作失败';
		layer.msg(msg, {anim: 6, icon: 2 }); 
	}
	me.error2 = function(msg) {
		msg = msg || '操作失败';
		layer.msg(msg, {anim: 6, icon: 5 }); 
	}
	
	// alert弹窗 [text=提示文字, cfg=配置(可省略), okFn=点击确定之后的回调函数]
	me.alert = function(text, okFn) {
		// 开始弹窗 
		layer.alert(text, function(index) {
			layer.close(index);
			if(okFn) {
				okFn();
			}
		});
	};

	// 询问框 [text=提示文字, okFn=点击确定之后的回调函数]
	me.confirm = function(text, okFn) {
		layer.confirm(text, {}, function(index) {
			layer.close(index);
			if(okFn) {
				okFn();
			}
		}.bind(this));
	};
	
	// 输入框 [title=提示文字, okFn=点击确定后的回调函数, formType=输入框类型(0=文本,1=密码,2=多行文本域) 可省略, value=默认值 可省略 ]  
	me.prompt = function(title, okFn, formType, value) {
		layer.prompt({
			title: title,
			formType: formType, 
			value: value
		}, function(pass, index){
			layer.close(index);
			if(okFn) {
				okFn(pass);
			}
		});
	}
	
	// 打开loading
	me.loading = function(msg) {
		// 此写法: 防止某些时候页面刚刚打开就开始加载导致的弹窗变的很长 
		layer.ready(function(){
			layer.closeAll();	// 开始前先把所有弹窗关了
			return layer.msg(msg, {icon: 16, shade: 0.3, time: 1000 * 20, skin: 'ajax-layer-load' });
		});
	};
	
	// 隐藏loading
	me.hideLoading = function() {
		layer.ready(function(){
			layer.closeAll();
		});
	};
	
	// ============== 一些常用弹窗 ===================== 
	
	// 大窗显示一个图片 
	// 参数: src=地址、w=宽度(默认80%)、h=高度(默认80%)
	me.showImage = function(src, w, h) {
		w = w || '80%';
		h = h || '80%';
		var content = '<div style="height: 100%; overflow: hidden !important;">' + 
			'<img src="' + src + ' " style="width: 100%; height: 100%;" />' + 
		 '</div>';
		layer.open({
		    type: 1,
		    title: false,
		    shadeClose: true,
			closeBtn: 0,
		    area: [w, h], //宽高
		    content: content
		});
	}
	
	// 预览一组图片 
	// srcList=图片路径数组, index=打开立即显示哪张(可填下标, 也可填写src路径)
	me.showImageList = function(srcList, index) {
		// 如果填的是个string 
		if(typeof srcList === 'string') {
			try{
				srcList = JSON.parse(srcList);
			}catch(e){
				srcList = [];
			}
		}
		// 如果填的是路径 
		index = index || 0;
		if(typeof index === 'string') {
			index = srcList.indexOf(index);
			index = (index == -1 ? 0 : index);
		}
		
		// 开始展示 
		var arr_list = [];
		srcList.forEach(function(item) {
			arr_list.push({
				alt: '左右键切换',
				pid: 1,
				src: item,
				thumb: item
			})
		})
		layer.photos({
			photos: {
				title: '',
				id: new Date().getTime(),
				start: 0,
				data: arr_list
			}
			,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
		});	
	}
	
	// 显示一个iframe 
	// 参数: 标题，地址，宽，高 , 点击遮罩是否关闭, 默认false 
	me.showIframe = function(title, url, w, h, shadeClose) {
		// 参数修正
		w = w || '95%'; 
		h = h || '95%'; 
		shadeClose = (shadeClose === undefined ? false : shadeClose);
		// 弹出面板 
		var index = layer.open({
			type: 2,	
			title: title,	// 标题 
			shadeClose: shadeClose,	// 是否点击遮罩关闭
			maxmin: true, // 显示最大化按钮
		  	shade: 0.8,		// 遮罩透明度 
			scrollbar: false,	// 屏蔽掉外层的滚动条
			moveOut: true,		// 是否可拖动到外面
		  	area: [w, h],	// 大小 
		  	content: url,	// 传值 
			// 解决拉伸或者最大化的时候，iframe高度不能自适应的问题
			resizing: function(layero) {
				solveLayerBug(index);
			}
		}); 
		// 解决拉伸或者最大化的时候，iframe高度不能自适应的问题
		$('#layui-layer' + index + ' .layui-layer-max').click(function() {
			setTimeout(function() {
				solveLayerBug(index);
			}, 200)
		})
	}
	me.showView = me.showIframe;
	
	// 显示一个iframe, 底部按钮方式
	// 参数: 标题，地址，点击确定按钮执行的代码(在子窗口执行)，宽，高 
	me.showIframe2 = function(title, url, evalStr, w, h) {
		// 参数修正
		w = w || '95%'; 
		h = h || '95%'; 
		// 弹出面板 
		var index = layer.open({
			type: 2,	
			title: title,	// 标题 
			closeBtn: (title ? 1 : 0),	// 是否显示关闭按钮
			btn: ['确定', '取消'],
			shadeClose: false,	// 是否点击遮罩关闭
			maxmin: true, // 显示最大化按钮
		  	shade: 0.8,		// 遮罩透明度 
			scrollbar: false,	// 屏蔽掉外层的滚动条
			moveOut: true,		// 是否可拖动到外面
		  	area: [w, h],	// 大小 
		  	content: url,	// 传值 
			// 解决拉伸或者最大化的时候，iframe高度不能自适应的问题
			resizing: function(layero) {
				
			},
			yes: function(index, layero) {
				var iframe = document.getElementById('layui-layer-iframe' + index);
				var iframeWindow = iframe.contentWindow;
				iframeWindow.eval(evalStr);
			}
		}); 
	}
	
	
	// 当前iframe关闭自身  (在iframe中调用)
	me.closeCurrIframe = function() {
		try{
			var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			parent.layer.close(index); //再执行关闭   
		}catch(e){
			//TODO handle the exception
		}
	}
	me.closeCurrView = me.closeCurrIframe;
	
	
	//执行一个函数, 解决layer拉伸或者最大化的时候，iframe高度不能自适应的问题
	function solveLayerBug(index) {
		var selected = '#layui-layer' + index;
		var height = $(selected).height();
		var title_height = $(selected).find('.layui-layer-title').height();
		$(selected).find('iframe').css('height', (height - title_height) + 'px');
	}
	
	
})();


// ===========================  常用util函数封装   ======================================= 
(function () {
	
	// 超级对象
    var me = sa;
	
	// ===========================  常用util函数封装   ======================================= 
	if(true) {
		
		// 从url中查询到指定参数值 
		me.p = function(name, defaultValue){
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				if(pair[0] == name){return pair[1];}
			}
			return(defaultValue == undefined ? null : defaultValue);
		}
		
		// 判断一个变量是否为null
		// 返回true或false，如果return_obj有值，则在true的情况下返回return_obj
		me.isNull = function(obj, return_obj){
			var flag = [null, undefined, '', 'null', 'undefined'].indexOf(obj) != -1;
			if(return_obj === undefined){
				return flag;
			} else {
				if(flag){
					return return_obj;
				} else {
					return obj;
				}
			}
		}
		
		// 将时间戳转化为指定时间
		// way：方式（1=年月日，2=年月日时分秒）默认1,  也可以指定格式：yyyy-MM-dd HH:mm:ss  
		me.forDate = function(inputTime, way) {
			if(me.isNull(inputTime) == true){
				return "";
			}
			var date = new Date(inputTime);
			var y = date.getFullYear();  
			var m = date.getMonth() + 1;  
			m = m < 10 ? ('0' + m) : m;  
			var d = date.getDate();  
			d = d < 10 ? ('0' + d) : d;  
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;  
			second = second < 10 ? ('0' + second) : second; 
			
			way = way || 1;
			// way == 1  年月日
			if(way === 1) {
				return y + '-' + m + '-' + d;  
			}
			// way == 1  年月日时分秒 
			if(way === 2){
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;  
			}
			// way == 具体格式   标准格式: yyyy-MM-dd HH:mm:ss
			if(typeof way == 'string') {
				return way.replace("yyyy", y).replace("MM", m).replace("dd", d).replace("HH", h).replace("mm", minute).replace("ss", second);
			}
			return y + '-' + m + '-' + d;  
		};
		
		// 将时间转化为 个性化 如：3小时前, 
		// d1 之于 d2 ，d2不填则默认取当前时间 
		me.forDate2 = function(d, d2){
			
			var hou = "前";
			
			if(d == null || d == '') {
				return '';
			}
			if(d2 == null || d2 == '') {
				d2 = new Date();
			}
			d2 = new Date(d2).getTime();
			
			var timestamp = new Date(d).getTime() - 1000;
			var mistiming = Math.round((d2 - timestamp) / 1000);
			if(mistiming < 0) {
				mistiming = 0 - mistiming;
				hou = '后'
			}
			var arrr = ['年', '月', '周', '天', '小时', '分钟', '秒'];
			var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
			for (var i = 0; i < arrn.length; i++) {
				var inm = Math.floor(mistiming / arrn[i]);
				if (inm != 0) {
					return inm + arrr[i] + hou;
				}
			}
		}
		
		// 综合以上两种方式，进行格式化
		// 小于24小时的走forDate2，否则forDat 
		me.forDate3 = function(d, way) {
			if(d == null || d == '' ) {
				return '';
			}
			var cha = new Date().getTime() - new Date(d).getTime();
			cha = (cha > 0 ? cha : 0 - cha);
			if(cha < (86400 * 1000)) {
				return me.forDate2(d);
			}
			return me.forDate(d, way);
		}
		
		// 返回时间差, 此格式数组：[x, x, x, 天, 时, 分, 秒]
		me.getSJC = function (small_time, big_time) {
			var date1 = new Date(small_time); //开始时间
			var date2 = new Date(big_time); //结束时间
			var date3 = date2.getTime() - date1.getTime(); //时间差秒
			//计算出相差天数
			var days = Math.floor(date3 / (24 * 3600 * 1000));
		
			//计算出小时数
			var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			var hours = Math.floor(leave1 / (3600 * 1000));
		
			//计算相差分钟数
			var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2 / (60 * 1000));
		
			//计算相差秒数
			var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			var seconds = Math.round(leave3 / 1000);
			
			// 返回数组
			return [0, 0, 0, days, hours, minutes, seconds];
		}
		
		// 将日期，加上指定天数
		me.dateAdd = function(d, n) {
			var s = new Date(d).getTime();
			s += 86400000 * n;
			return new Date(s);
		}
		
		// 转化json，出错返回默认值
		me.JSONParse = function(obj, default_obj){
			try{
				return JSON.parse(obj) || default_obj;
			}catch(e){
				return default_obj || {};
			}
		}
		
		// 截取指定长度字符，默认50
		me.maxLength = function (str, length) {
			length = length || 50;
		    if(!str){
		        return "";
		    }
		    return (str.length > length) ? str.substr(0, length) + ' ...' : str;
		},
		
		// 过滤掉标签
		me.text = function(str){
			if(!str){
			    return "";
			}
			return str.replace(/<[^>]+>/g,"");
		}
		
		// 为指定集合的每一项元素添加上is_update属性 
		me.listAU = function(list){
			list.forEach(function(ts){
				ts.is_update  = false;
			})
			return list;
		}
		
		// 获得一段文字中所有图片的路径
		me.getSrcList = function(str){
			try{
				var imgReg = /<img.*?(?:>|\/>)/gi;	//匹配图片（g表示匹配所有结果i表示区分大小写）
				var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;	//匹配src属性
				var arr = str.match(imgReg);	// 图片数组
				var srcList = [];
				for (var i = 0; i < arr.length; i++) {
					var src = arr[i].match(srcReg);
					srcList.push(src[1]);
				}
				return srcList;
			} catch (e){
				return [];
			}
		}
		
		// 无精度损失的乘法
		me.accMul = function(arg1, arg2) {
			var m = 0,
				s1 = arg1.toString(),
				s2 = arg2.toString(),
				t;
		 
			t = s1.split(".");
			// 判断有没有小数位，避免出错
			if (t[1]) {
				m += t[1].length
			}
		 
			t = s2.split(".");
			if (t[1]) {
				m += t[1].length
			}
		 
			return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
		}
		
		// 正则验证是否为手机号
		me.isPhone = function(str) {
			str = str + '';
			if((/^1[34578]\d{9}$/.test(str))){ 
				return true; 
			} 
			return false;
		}
		
		// 产生随机字符串
		me.randomString = function(len) {
		　　len = len || 32;
		　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		　　var maxPos = $chars.length;
		　　var str = '';
		　　for (i = 0; i < len; i++) {
		　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
		　　}
		　　return str;
		}
		
		
		// == if 结束
	}
	
	// ===========================  数组操作   ======================================= 
	if (true) {
		
		
		// 从数组里获取数据,根据指定数据
		me.arrayGet = function(arr, prop, value){
			for (var i = 0; i < arr.length; i++) {
				if(arr[i][prop] == value){
					return arr[i];
				}
			}
			return null;
		}
		
		// 从数组删除指定记录
		me.arrayDelete = function(arr, item){
			var index = arr.indexOf(item);
		    if (index > -1) {
		        arr.splice(index, 1);
		    }
		}
		
		// 从数组删除指定id的记录
		me.arrayDeleteById = function(arr, id){
			var item = me.arrayGet(arr, 'id', id);
			me.arrayDelete(arr, item);
		}
		
		// 将数组B添加到数组A的开头
		me.unshiftArray = function(arrA, arrB){
			if(arrB){
		    	arrB.reverse().forEach(function(ts){
		    		arrA.unshift(ts);
		    	})
			}
			return arrA;
		}
		
		// 将数组B添加到数组A的末尾
		me.pushArray = function(arrA, arrB){
			if(arrB){
		    	arrB.forEach(function(ts){
		    		arrA.push(ts);
		    	})
			}
			return arrA;
		}
		
		// == if 结束
	}
	
	// ===========================  浏览器相关   ======================================= 
	if (true) {
		
		// set cookie 值 
		me.setCookie = function setCookie(cname, cvalue, exdays) { 
			exdays = exdays || 30;
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		    var expires = "expires=" + d.toGMTString();
		    document.cookie = cname + "=" + escape(cvalue) + "; " + expires + "; path=/";
		}
		
		// get cookie 值
		me.getCookie = function(objName){
			var arrStr = document.cookie.split("; ");
		    for (var i = 0; i < arrStr.length; i++) {
		        var temp = arrStr[i].split("=");
		        if (temp[0] == objName){
		        	return unescape(temp[1])
		        };
		    }
		    return "";
		}
		
		// 复制指定文本
		me.copyText = function(str){
			var oInput = document.createElement('input');
		    oInput.value = str;
		    document.body.appendChild(oInput);
		    oInput.select(); // 选择对象
		    document.execCommand("Copy"); // 执行浏览器复制命令
		    oInput.className = 'oInput';
		    oInput.style.display='none';
		}
		
		// jquery序列化表单增强版： 排除空值
		me.serializeNotNull = function(selected){
			var serStr = $(selected).serialize();
		    return serStr.split("&").filter(function(str){return !str.endsWith("=")}).join("&");
		}
		
		// 将cookie序列化为k=v形式
		me.strCookie = function(){
			return document.cookie.replace(/; /g,"&");
		}
		
		// 回到顶部
		me.goTop = function() {
			function smoothscroll(){
				var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
				if (currentScroll > 0) {
					 window.requestAnimationFrame(smoothscroll);
					 window.scrollTo (0,currentScroll - (currentScroll/5));
				}
			};
			smoothscroll();
		}
		
		
		
		// == if 结束
	}
	
	// =========================== javascript对象操作   ======================================= 
	if (true) {
		// 去除json对象中的空值 
		me.removeNull = function(obj){
			var newObj = {};
			if(obj != undefined && obj != null) {
				for(var key in obj) {
					if(obj[key] === undefined || obj[key] === null || obj[key] == '') {
						// 
					} else {
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		}
		
		// JSON 浅拷贝, 返回拷贝后的obj
		me.copyJSON = function(obj){
			if(obj === null || obj === undefined) {
				return obj;
			};
			var new_obj = {};
			for(var key in obj) {
				new_obj[key] = obj [key];
			}
			return new_obj;
		}
		
		// json合并, 将 defaulet配置项 转移到 user配置项里 并返回 user配置项
		me.extendJson = function(userOption, defaultOption) {
			if(!userOption) {
				return defaultOption;
			};
			for(var key in defaultOption) {
				if(userOption[key] === undefined) {
					userOption[key] = defaultOption[key];
				} else if(userOption[key] == null){
					
				} else if(typeof userOption[key] == "object") {
					me.extendJson(userOption[key], defaultOption[key]); //深度匹配
				}
			}
			return userOption;
		}
		
		// == if 结束
	}
	
	// ===========================  本地集合存储   ======================================= 
	if (true) {
		
		// 获取指定key的list
		me.keyListGet = function(key){
			try{
				var str = localStorage.getItem('LIST_' + key);
				if(str == undefined || str == null || str =='' || str == 'undefined' || typeof(JSON.parse(str)) == 'string'){
					//alert('key' + str);
					str = '[]';
				}
				return JSON.parse(str);
			}catch(e){
				return [];
			}
		},
		
		me.keyListSet = function(key, list){
			localStorage.setItem('LIST_' + key, JSON.stringify(list));
		},
		
		me.keyListHas = function(key, item){
			var arr2 = me.keyListGet(key);
			return arr2.indexOf(item) != -1;
		},
		
		me.keyListAdd = function(key, item){
			var arr = me.keyListGet(key);
			arr.push(item);
			me.keyListSet(key,arr);
		},
		
		me.keyListRemove = function(key, item){
			var arr = me.keyListGet(key);
			var index = arr.indexOf(item);
			if (index > -1) {
			    arr.splice(index, 1);
			}
			me.keyListSet(key,arr);
		}
		
		// == if 结束
	}
	
})();


// ===========================  $sys 有关当前系统的方法  一般不能复制到别的项目中用  ======================================= 
(function(){
	
	// 超级对象
    var me = {};
    sa.$sys = me;
	
	// 定义key
	var pcode_key = 'permission_code';
	
	// 写入当前会话的权限码集合
	sa.setPcode = function(codeList) {
		sa.keyListSet(pcode_key, codeList);	
	}
	
	// 清除当前会话的权限码集合 
	sa.clearAllPcode = function() {
		sa.keyListSet(pcode_key, []);	
	}
	
	// 检查当前会话是否拥有一个权限码, 返回true和false 
	sa.hasPcode = function(pcode) {
		return sa.keyListHas(pcode_key, pcode);
	}
	
	// 检查当前会话是否拥有一个权限码, 如果没有, 则跳转到无权限页面 
	// 注意: 非二级目录页面请注意调整路径问题 
	sa.checkPcode = function(pcode, not_pcode_url) {
		var is_have = sa.keyListHas(pcode_key, pcode);	
		if(is_have == false) {
			location.href= not_pcode_url || '../../sa-html/error-page/403.html';
			throw '暂无权限: ' + pcode;
		}
	}
	// 同上, 只不过是以弹窗的形式显示出来无权限来 
	sa.checkPcodeTs = function(pcode, not_pcode_url) {
		var is_have = sa.keyListHas(pcode_key, pcode);	
		if(is_have == false) {
			var url = not_pcode_url || '../../sa-html/error-page/403.html';
			layer.open({
				type: 2,	
				title: false,	// 标题 
				shadeClose: true,	// 是否点击遮罩关闭
				shade: 0.8,		// 遮罩透明度 
				scrollbar: false,	// 屏蔽掉外层的滚动条 
				closeBtn: false,
				area: ['700px', '600px'],	// 大小  
				content: url	// 传值 
			}); 
			throw '暂无权限: ' + pcode;
		}
	}
	
	
	
	
	
})();


// ===========================  $page 跳页面相关 避免一次变动，到处乱改 ======================================= 
(function(){
	
	// 超级对象
    var me={};
    sa.$page = me;
	
	// 打开登录页面
	me.openLogin = function(login_url) {
		layer.open({
			type: 2,
			title: '登录',
			shadeClose: true,
			shade: 0.8,
			area: ['90%', '90%'],
			content: login_url || '../../login.html'
		}); 
	}
	
	
})();


// 如果当前是Vue环境, 则挂在到Vue示例
if(window.Vue) {
	Vue.prototype.sa = sa;
}

// 对外开放, 在模块化时解开此注释 
// export default sa;

