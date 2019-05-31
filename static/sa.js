var sa = {};

// ===========================  服务器环境配置  ======================================= 

(function(){
	
	// 公司开发环境
	var cfg_dev = {
		api_url: 'http://localhost:8091',
		web_url: 'http://www.baidu.com'
	}

	// 服务器测试环境
	var cfg_test = {
		api_url: 'http://www.baidu.com',
		web_url: 'http://www.baidu.com'
	}
	
	// 服务器正式环境
	var cfg_prod = {
		api_url: 'http://www.baidu.com',
		web_url: 'http://www.baidu.com'
	}

	sa.cfg = cfg_dev; // 最终环境 , 上限前请选择正确的环境 
	
	
	
	
})();





// ===========================  第三方框架扩展  ======================================= 



/**
 * ajax的再封装,
 * @param {Object} url 请求地址
 * @param {Object} data
 * @param {Object} success200
 * @param {Object} 其它配置，可配置项有：
 * （success500=状态码500函数，errorfn=请求异常函数，async=是否异步）
 */
sa.ajax2 = function(url, data, success200, cfg){
	
	// 如果是简写模式
	if(typeof data === 'function'){
		cfg = success200;
		success200 = data;
		data = {};
	}
	
	// 默认配置
	var defaultCfg = {
		msg: '努力加载中...',	// 提示语
		baseUrl: (url.indexOf('/') == 0 ? sa.cfg.api_url : ''),// 父url，拼接在url前面
		// 
		// 回调函数处理
		// code=500, 代表成功
		success500: function(res){	
			return layer.alert('失败：' + res.msg);
		},
		// code=998, 代表权限不足
		success998: function(res){	
			return layer.alert("权限不足," + res.msg,{icon: 5});
		},
		// code=999, 代表未登录
		success999: function(res){	
			return layer.confirm("您当前暂未登录，是否立即登录？", {}, function(){
				layer.closeAll();
				return layer.open({
					type: 2,
					title: '登录',
					shadeClose: true,
					shade: 0.8,
					area: ['90%', '90%'],
					content: cfg.login_url || '../../login.html'
				}); 
				
			});
		},
		// ajax发生异常时的默认处理函数
		errorfn: function(xhr, type, errorThrown){	
			if(xhr.status == 0){
				return layer.alert('无法连接到服务器，请检查网络');
			}
			return layer.alert("异常：" + JSON.stringify(xhr));
		},
		// 成功失败都执行
		complete: function(XHR, TS) {
			
		}
	}
	
	// 加载用户配置
	cfg = sa.$util.extendJson(cfg, defaultCfg);
	
	
	// 日志
	console.log("请求地址：" + cfg.baseUrl + url);
	console.log("请求参数：" + JSON.stringify(data));
	
	// 
	// 开始ajax
	var load = 0;
	if(cfg.msg != null){
		load = layer.msg(cfg.msg, {icon: 16, shade: 0.01, time: 1000 * 20, skin: 'ajax-layer-load' });
	}
	
	return $.ajax({
		url: cfg.baseUrl + url,
		type:"post",
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
			layer.close(load);
			
			// 业务成功的函数 
			if(res.code == 200){
				return success200(res);
			}
			
			// 如果相应的处理函数存在
			if(cfg['success' + res.code] != undefined) {
				return  cfg['success' + res.code](res);
			}
			
			layer.alert('未知状态码：' + JSON.stringify(res));
		},
		error: function(xhr, type, errorThrown){
			
			layer.close(load);
			return cfg.errorfn(xhr, type, errorThrown);
		},
		complete: cfg.complete
	});
	
};


/**
 * 对上面的函数再次重写，
 * 为什么再次重写？因为这只是个模板，没有相应的服务器，如果你想将模板集成到你的项目中，直接把下面这个函数删掉或者注释掉就ok了 
 * @param {Object} url
 * @param {Object} data
 * @param {Object} success200
 * @param {Object} cfg
 */
sa.ajax2 = function(url, data, success200, cfg){
	
	// 如果是简写模式
	if(typeof data === 'function'){
		cfg = success200;
		success200 = data;
		data = {};
	}
	
	// 爱的魔力转圈圈
	var load = layer.msg('正在努力加载...', {icon: 16, shade: 0.01, time: 1000 * 20, skin: 'ajax-layer-load' });
	
	// 模拟ajax的延时 
	setTimeout(function() {
		layer.close(load);	// 隐藏掉转圈圈 
		success200();
	}, 400)
	
};



// ===========================  弹窗相关   ======================================= 


(function() {
	
	// 提示文字
	sa.msg = function(msg) {
		layer.msg(msg);
	};
	
})();


// ===========================  $util 常用util函数封装   ======================================= 

// 共用js代码库
(function () {
	
	// 超级对象
    var me={};
    sa.$util = me;
	
	
	// ===========================  常用util函数封装   ======================================= 
	if(true) {
		
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
		// way：方式（1=年月日，2=年月日时分秒）默认1
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
			if(way == 2){
				return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
			}
			return y + '-' + m + '-' + d;  
		};
		
		// 将时间转化为 个性化 如：3小时前
		me.forDate2 = function(d){
			
			var hou = "前";
			
			if(d == null || d == ''){
				return '';
			}
			var timestamp = new Date(d).getTime() - 1000;
			var mistiming = Math.round((Date.now() - timestamp) / 1000);
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
		    return (str.length > length) ? str.substr(0, length) + ' ... ' : str;
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
		
		// 获得url指定参数值
		me.getUrlArgs = function(name, defaultValue){
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				if(pair[0] == name){return pair[1];}
			}
			return(defaultValue == undefined ? null : defaultValue);
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
		// KL_art_zan=文章赞，KL_art_ct=文章评论，KL_ct_zan=评论赞
		me.keyListGet = function(key,a){
			try{
				var str = localStorage.getItem('list_' + key);
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
			localStorage.setItem('list_' + key, JSON.stringify(list));
		},
		
		me.keyListHas = function(key, id){
			var arr2 = me.keyListGet(key);
			return arr2.indexOf(parseInt(id)) != -1;
		},
		
		me.keyListAdd = function(key, id){
			var arr = me.keyListGet(key);
			arr.push(parseInt(id));
			me.keyListSet(key,arr);
		},
		
		me.keyListRemove = function(key,id){
			var arr = me.keyListGet(key);
			var index = arr.indexOf(parseInt(id));
			if (index > -1) {
			    arr.splice(index, 1);
			}
			me.keyListSet(key,arr);
		}
		
		// == if 结束
	}
	
	
	
	
	
	
    
})();



// ===========================  $fast 对layer框架，以及一些快速crud的一些常用操作的封装  ======================================= 
(function(){
	
	// 超级对象
    var me={};
    sa.$fast = me;
	
	if(true) {
		
		// 封装layer的放大预览img
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
		
		// 封装 layer的 弹出式iframe窗口 
		// 标题，地址，宽，高 
		me.showIframe = function(title, url, w, h) {
			// 参数修正
			w = w || '95%'; 
			h = h || '95%'; 
			// 弹出面板 
			layer.open({
				type: 2,	
				title: title,	// 标题 
				// shadeClose: true,	// 是否点击遮罩关闭
				maxmin: true, // 显示最大化按钮
			  	shade: 0.8,		// 遮罩透明度 
				scrollbar: false,	// 屏蔽掉外层的滚动条
				moveOut: true,		// 是否可拖动到外面
			  	area: ['95%', '95%'],	// 大小
			  	content: url	// 传值 
			}); 
		}
		
		
		// 返回一个 初始化的 Page 对象
		me.getPage = function() {
			return {	
				pageNo: 1,	// 当前页 
				pageSize: 10,	// 页大小 
				count: 10			// 数据总数 
			}
		}
		
		// 封装的f5函数，接受一个符合sa-admin标准的curd型 Vue对象
		// vue对象，拉取数据的接口地址 , 是否初始化pageNo
		me.fast_f5 = function(app, api_url, isPage) { 
			// 参数去空、拼接分页 
			var p = sa.$util.removeNull(app.p);		
			if(app.page) {
				if(isPage == true){
					p.pageNo = app.page.pageNo;
				}
				p.pageSize = app.page.pageSize;
			}
			// 开始请求，并赋值 
			sa.ajax2(api_url, p, function(res){
				app.dataList = sa.$util.listAU(res.data);	// 数据
				app.page = res.page;		// 分页 
			}, {msg: '正在刷新...'});
		}
		
		// 封装数据表格中，标准流程的数据删除（先询问，再删除）
		// 接口地址，要删除的集合，要删除的元素
		me.fastDelete = function(api_url, dataList, data) {
			layer.confirm('是否删除，此操作不可撤销', {}, function() {
				sa.ajax2(api_url, function(res) {
					sa.$util.arrayDelete(dataList, data);
					layer.msg('删除成功');
				});
			});
		}
		
		// 封装数据表格中，标准流程数据修改
		// 接口地址，要提交的数据，需要剔除的属性数组（一般剔除create_time）
		me.fastUpdate = function(api_url, data, delFieldList) {
			// 复制一份，以免影响到原来的属性 
			var data2 = sa.$util.copyJSON(data);
			if(delFieldList) {
				delFieldList.forEach(function(field) {
					data2[field] = undefined;
				})
			}
			// 开始提交 
			sa.ajax2(api_url, data2, function(res){
				layer.msg('修改成功');
				data.is_update = false;
			})
		}
		
		// 封装数据表格中，标准流程数据添加 
		// 接口地址，要提交的数据，添加完成的回调函数 
		me.fastAdd = function(api_url, data, callFn) {
			sa.ajax2(api_url, data, function(res){
			    layer.alert('添加成功', {}, function(){
			       if(callFn) {
						callFn();
				   }
			    });
			})
		}
		
		
		
		
	}
	
    
	
	
	
	
	
	
	
})();






// ===========================  $sys 有关当前系统的方法  一般不能复制到别的项目中用  ======================================= 

// 有关当前系统的方法
(function(){
	
	// 超级对象
    var me={};
    sa.$sys = me;
	
	
	// 写入当前已登陆用户信息
    me.setCurrUser = function(currUser){
    	localStorage.setItem('currUser', JSON.stringify(currUser));
    }
    
    // 获得当前已登陆用户信息
    me.getCurrUser = function(){
    	var user = localStorage.getItem("currUser");
    	if(user == undefined || user == null || user == 'null' || user == '' || user == '{}' || user.length < 10){
    		user = {
    			id: '0',
    			username: '未登录',
    			avatar: '../../static/img/sys/youke.jpg'
    		}
    	}else{
    		user = JSON.parse(user);
    	}
    	return user;
    }
	
    
   
    
    
	
})();


// ===========================  $page mui app 跳转页面用的 封装以隔离变化 ，避免一次变动，到处乱改 ======================================= 
// 跳页面相关
(function(){
	
	// 超级对象
    var me={};
    sa.$page = me;
    
	
	
	
	
	
	
	
})();

// 对外开放, 在模块化时解开此注释 
// export default sa;

