var app = new Vue({
	el: '.vue-box',
	data: {
		p: { // 查询参数  
		}, 
		dataCount: 0,
		// 统计数据 
		sta: {
			userCount: 0,
			goodsCount: 0,
			orderCount: 0,
			articleCount: 0,
			commentCount: 0,
			moneyCount: 0,
		},
		// 技术栈集合 
		frameList: [
			{name: 'JS引擎', value: 'Vue @2.6.10', link: 'https://cn.vuejs.org/'},
			{name: 'UI框架', value: 'Element-UI @2.13.0', link: 'https://element.eleme.cn/#/zh-CN'},
			{name: 'web弹层', value: 'layer @3.1.1', link: 'http://layer.layui.com/'},
			{name: '切页动画', value: 'Swiper @4.5.0', link: 'https://www.swiper.com.cn/'},
			{name: '图表引擎', value: 'ECharts @4.2.1', link: 'https://echarts.baidu.com/'},
			{name: '富文本编辑器', value: 'wangEditor @3.1.1', link: 'http://www.wangeditor.com/'},
		],
	},
	methods: {
		// 数值跳动 
		slowMotion: function(obj, prop, endValue, time) {
			let timeNow = 0; 
			let fn = function() {
				// 如果已经接近 or 时间已到，则立即结束 
				var jdz = Math.abs(obj[prop] - endValue);
				if(jdz < 2 || timeNow >= time) {
					// console.log('到点了');
					obj[prop] = endValue;
				} else {
					if(jdz < 100) {
						obj[prop] += 1;
					} else {
						obj[prop] += parseInt((endValue - obj[prop]) / 10);		 // 平均一下 
					}
					timeNow += 30;
					setTimeout(fn, 30);
				}
			}
			fn();
		},
		// 设置统计数据的数值 
		setStaDataValue: function(staData) {
			for (let key in staData) {
				this.slowMotion(this.sta, key, staData[key], 3000);
			}
		},
		// 刷新第一行数据
		f5StaData: function() {
			// 刷新第一行数据
			this.setStaDataValue({
				userCount: 12361,
				goodsCount: 12541,
				orderCount: 63222,
				articleCount: 10368,
				commentCount: 2048,
				moneyCount: 13654.32,
			});
		},
		// 刷新柱状图
		f5BarChart: function() {
			// ===========================================  定义数据
			var x_name = '';	// new Date().getFullYear() + "年"; // x轴名称
			var y_name = "注册数量"; // y轴名称
			var dataArray = []; // 坐标X轴数据
			var valueArray = []; //  坐标Y轴数据

			var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			for (var i in arr) {
				i = parseInt(i) + 1;
				dataArray.push(i + '月');
				if (i < 10) {
					i = "0" + i;
				}
				i = i + "";
				valueArray.push(sa.randomNum(100, 1000) || 0);
			}
			
			// ===========================================  开始渲染

			var myChart = echarts.init(document.getElementById('bar-chart'));
			var option = {
				tooltip: {
					trigger: 'axis',
					formatter: '{b}<br/> ' + y_name + '：{c}',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid:{x: 50, y: 30, x2: 25, y2: 25},	//设置canvas内部表格的内距
				toolbox: {
					show: true,
					top: 0,
					feature: {
						saveAsImage: {
							show: true
						}
					}
				},
				xAxis: {
					name: x_name,
					type: 'category',
					// axisLabel: {
					// 	'interval': 0
					// }, //强制不缩略x轴刻度,
					data: dataArray
				},
				yAxis: {
					name: y_name,
					type: 'value'
				},
				series: [{
					name: y_name,
					data: valueArray,
					type: 'bar',
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter: '{c}'
						}
					},
					itemStyle: {
						normal: {
							color: '#5DB1FF',
							label: {
								show: true,
								textStyle: {
									color: 'black'
								}
							}
						}
					}
				}]
			};
			myChart.setOption(option);
			window.myChartList[0] = myChart;
			// myChartList[1] = myChart;
		},
		// 刷新折线图 
		f5LineChart: function() {
			// ===========================================  定义数据
			var x_name = '';	// "活跃数据"; // x轴名称
			var y_name = "活跃数据"; // y轴名称
			var typeArray = ['总计登录', '新增注册'];
			var dataArray = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];	//   坐标X轴数据
			var valueArray0 = [84, 126, 262, 201, 148, 133, 86, 186, 232, 215, 326, 412];	// 	
			var valueArray1 = [284, 296, 382, 501, 348, 273, 266, 327, 412, 515, 526, 712];	// 	

			// ===========================================  开始渲染

			var myChart = echarts.init(document.getElementById('line-chart'));
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				toolbox: {
					show: true,
					top: 0,
					feature: {
						saveAsImage: {
							show: true
						}
					}
				},
				grid:{x: 50, y: 30, x2: 25, y2: 25},	//设置canvas内部表格的内距
				legend: {
					data: typeArray
				},
				xAxis: {
					name: x_name,
					type: 'category',
					boundaryGap : false,
					// axisLabel: {
					// 	'interval': 0
					// }, //强制不缩略x轴刻度,
					data: dataArray
				},
				yAxis: {
					name: y_name,
					type: 'value'
				},
				series: [
					{
						name: '总计登录',
						type:'line',
						data: valueArray1,
						smooth: true,	// 曲线形式
						areaStyle: {
							normal: {
								color: 'rgba(0, 128, 0, 0.3)' //改变区域颜色
							}
						},
						itemStyle: {
							normal: {
								color: 'rgba(0, 128, 0, 0.8)', //改变折线点的颜色
							}
						},
					},
					{
						name: '新增注册',
						type:'line',
						data: valueArray0,
						smooth: true,	// 曲线形式
						areaStyle: {
							normal: {
								color: 'rgba(70, 128, 255, 0.3)' //改变区域颜色
							}
						},
						itemStyle: {
							normal: {
								color: 'rgba(70, 128, 255, 0.8)', //改变折线点的颜色
							}
						},
					},
				]
			};
			myChart.setOption(option);
			myChartList[2] = myChart;
		},
		// 刷新饼图
		f5PieChart: function() {
			// ===========================================  定义数据
			var dataArray = [
				{name: '昵称注册', value: sa.randomNum(100, 1000)},
				{name: '手机号注册', value: sa.randomNum(100, 1000)},
				{name: '微信登陆', value: sa.randomNum(100, 1000)},
				{name: 'QQ登陆', value: sa.randomNum(100, 1000)},
				{name: '邮箱登录', value: sa.randomNum(100, 1000)},
				{name: '小程序登录', value: sa.randomNum(100, 1000)},
				{name: '管理员添加', value: sa.randomNum(100, 1000)},
			]; // 坐标X轴数据

			// ===========================================  开始渲染

			var myChart = echarts.init(document.getElementById('pic-chart'));
			option = {
				title: {
					text: '账号来源',
					left: 'left',
					top: 0,
					textStyle: {
						color: '#666',
						fontSize: '14'
					}
				},
				toolbox: {
					show: true,
					top: 0,
					feature: {
						saveAsImage: {
							show: true
						}
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				series: [{
					name: '账号来源',
					type: 'pie',
					radius: '70%', // 半径大小
					center: ['50%', '60%'],
					selectedMode: 'single',
					roseType: 'radius',
					data: dataArray.sort(function(a, b) {
						return a.value - b.value;
					}),
					//roseType: 'radius', // 半径模式还是面积模式
					itemStyle: {
						normal: {
							color: function(params) {
								// build a color map as your need.
								var colorList = [
									'#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
									'#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
									'#1e90ff','#ff6347','#7b68ee','#00fa9a',
									'#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'
								];
								// '#ffd700',
								function GetRandomNum(Min, Max) {
									var Range = Max - Min;
									var Rand = Math.random();
									return (Min + Math.round(Rand * Range));
								}
								var index = GetRandomNum(0, colorList.length - 1);
								return colorList[index];
								//return colorList[params.dataIndex]
							}
						}
					},
					label: {
						normal: {
							formatter: '{b|{b}：}{c}  {per|{d}%}  ',
							rich: {}
						}
					},
					// 弹出动画 
					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}]
			};
			myChart.setOption(option);
			window.myChartList[1] = myChart;
		},
		// 刷新所有图
		f5Chart: function() {
			// 设置监听 
			window.myChartList = [];
			window.onresize = function() {
				myChartList.forEach(function(myChart) {
					myChart.resize();
				})
			}
			// 刷新所有图标数据
			this.$nextTick(function() {
				this.f5BarChart();
				this.f5PieChart();
				this.f5LineChart();
			});
		},
	},
	mounted: function() {
		// 刷新 
		this.f5StaData();
		this.f5Chart();
	}
})