<!-- 统计图 3 -->
<template>
	<div class="echarts-div" id='line-chart' ref='line-chart'></div>
</template>

<script>
	module.exports = {
		data() {
			return {
				
			}
		},
		methods: {
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
			
				var myChart = echarts.init(this.$refs['line-chart']);
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
				window.myChartList.push(myChart);
			},
		},
		created() {
			// 刷新所有图标数据
			this.$nextTick(function() {
				this.f5LineChart();
			});
		}
	}
</script>

<style scoped>
	
</style>
