<!-- 统计图2 -->
<template>
	<div class="echarts-div" id='pic-chart' ref='pic-chart'></div>
</template>

<script>
	module.exports = {
		data() {
			return {
			}
		},
		methods: {
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
				window.myChartList.push(myChart);
			},
		},
		created() {
			// 刷新所有图标数据
			this.$nextTick(function() {
				this.f5PieChart();
			});
		}
	}
</script>

<style scoped>
	
</style>
