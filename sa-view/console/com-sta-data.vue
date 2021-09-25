<!-- 第一行统计数据 -->
<template>
	<el-row :gutter="14">
		<el-col :lg="4" :sm="8" :xs="24">
			<div class="sa-wnk">
				<img src="../../static/icon/icon-user.png" >
				<div class="sa-wnk-tv">
					<p class="sa-wnk-title">用户</p>
					<p class="sa-wnk-value">{{sta.userCount}}</p>
				</div>
			</div>
		</el-col>
		<el-col :lg="4" :sm="8" :xs="24">
			<div class="sa-wnk">
				<img src="../../static/icon/icon-goods.png" >
				<div class="sa-wnk-tv">
					<p class="sa-wnk-title">商品</p>
					<p class="sa-wnk-value">{{sta.goodsCount}}</p>
				</div>
			</div>
		</el-col>
		<el-col :lg="4" :sm="8" :xs="24">
			<div class="sa-wnk">
				<img src="../../static/icon/icon-order.png" >
				<div class="sa-wnk-tv">
					<p class="sa-wnk-title">订单</p>
					<p class="sa-wnk-value">{{sta.orderCount}}</p>
				</div>
			</div>
		</el-col>
		<el-col :lg="4" :sm="8" :xs="24">
			<div class="sa-wnk">
				<img src="../../static/icon/icon-article.png" >
				<div class="sa-wnk-tv">
					<p class="sa-wnk-title">文章</p>
					<p class="sa-wnk-value">{{sta.articleCount}}</p>
				</div>
			</div>
		</el-col>
		<el-col :lg="4" :sm="8" :xs="24">
			<div class="sa-wnk">
				<img src="../../static/icon/icon-comment.png" >
				<div class="sa-wnk-tv">
					<p class="sa-wnk-title">评论</p>
					<p class="sa-wnk-value">{{sta.commentCount}}</p>
				</div>
			</div>
		</el-col>
		<el-col :lg="4" :sm="8" :xs="24">
			<div class="sa-wnk">
				<img src="../../static/icon/icon-money.png" >
				<div class="sa-wnk-tv">
					<p class="sa-wnk-title">余额</p>
					<p class="sa-wnk-value">{{sta.moneyCount}}</p>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	module.exports = {
		data() {
			return {
				// 统计数据 
				sta: {
					userCount: 0,
					goodsCount: 0,
					orderCount: 0,
					articleCount: 0,
					commentCount: 0,
					moneyCount: 0,
				},
			}
		},
		methods: {
			// 数值跳动 
			// 对象、属性、结束值、所用时间 
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
		},
		created() {
			// 写入数据
			this.setStaDataValue({
				userCount: 12361,
				goodsCount: 12541,
				orderCount: 63222,
				articleCount: 10368,
				commentCount: 2048,
				moneyCount: 13654.32,
			});
		}
	}
</script>

<style scoped>
	/* 第一行 */
	.sa-wnk{background-color: #FFF; border: 1px #ddd solid; margin-bottom: 14px; min-height: 100px; 
		cursor: pointer; transition: all 0.3s; overflow: hidden;}
	.sa-wnk:hover{box-shadow: 0 0 20px #999;}
	.sa-wnk img{float: left; line-height: 100px; margin: 25px 0px 0 20px; width: 50px; height: 50px; vertical-align: middle;}
	.sa-wnk .sa-wnk-tv{float: left; margin-left: 10px; max-width: calc(100% - 100px);}
	.sa-wnk-title{margin-top: 25px; font-size: 16px;}
	.sa-wnk-value{margin-top: 4px; font-size: 24px; padding-bottom: 20px;}
</style>
