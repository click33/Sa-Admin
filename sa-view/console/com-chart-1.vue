<!-- 统计图1 -->
<template>
	<div class="echarts-div" id='bar-chart' ref="bar-chart"></div>
</template>

<script>
	module.exports = {
		data() {
			return {
				
			}
		},
		methods: {
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
			
				var ele = this.$refs['bar-chart'];
				var myChart = echarts.init(ele);
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
				window.myChartList.push(myChart);
				// window.myChartList[0] = myChart;
				// myChartList[1] = myChart;
			},
		},
		created() {
			// 刷新所有图标数据
			this.$nextTick(function() {
				this.f5BarChart();
			});
		}
	}
</script>

<style scoped>
	
</style>
