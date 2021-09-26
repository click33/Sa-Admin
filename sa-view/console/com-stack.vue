<!-- 第一行统计数据 -->
<template>
	<div>
		<div class="btn-box">
			<el-popover placement="top-start" trigger="hover">
			    <el-button slot="reference" type="primary" size="small" @click="sa.open('https://jq.qq.com/?_wv=1027&k=5DHN5Ib')">QQ群(782974737)</el-button>
				<div style="text-align: center;">
					<img src="http://dev33-yxzj.oss-cn-beijing.aliyuncs.com/dyc/img/2020/01/17/157924554064970545739.png" style="width: 150px; height: 150px;" >
				</div>
			</el-popover>
			<!-- <el-button type="primary" size="small" @click="sa.open('https://jq.qq.com/?_wv=1027&k=5DHN5Ib')">QQ群(782974737)</el-button> -->
			<el-button type="success" size="small" @click="sa.open('https://github.com/click33/sa-admin')">GitHub 地址 (求star)</el-button>
			<el-button type="danger" size="small" @click="sa.open('https://gitee.com/click33/sa-admin')">Gitee 地址</el-button>
			<!-- <el-button type="info" size="small" @click="sa_admin.showMenuById('1-11')">意见吐槽</el-button> -->
			<el-button type="info" size="small" @click="sa.open('http://sa-app.dev33.cn/wall.html?name=sa-admin')">需求征集</el-button>
			<el-popover placement="top-start" trigger="hover">
			    <el-button slot="reference" type="warning" size="small">打赏</el-button>
				<div style="text-align: center;">
					<h3 style="margin-bottom: 14px;">请作者喝杯咖啡</h3>
					<img src="http://oss.dev33.cn/sa-admin/ds-zfb.jpg" style="width: 150px; height: 150px; cursor: pointer;" 
						@click="sa.showImage('http://oss.dev33.cn/sa-admin/ds-zfb.jpg', '400px', '400px')" />
					<img src="http://oss.dev33.cn/sa-admin/ds-wx.jpg" style="width: 150px; height: 150px; cursor: pointer;" 
						@click="sa.showImage('http://oss.dev33.cn/sa-admin/ds-wx.jpg', '400px', '400px')" />
				</div>
			</el-popover>
		</div>
		<div>
			<el-table ref="data-table" :data="frameList" size="small" border>
				<el-table-column label="技术栈" prop="name"></el-table-column>
				<el-table-column label="框架" prop="value"></el-table-column>
				<el-table-column label="链接">
					<template slot-scope="s">
						<el-link type="primary" :href="s.row.link" target="_blank">{{s.row.link}}</el-link>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				// 技术栈集合
				frameList: [
					{name: '基础框架', value: 'Vue @2.6.10', link: 'https://cn.vuejs.org/'},
					{name: 'UI框架', value: 'Element-UI @2.13.0', link: 'https://element.eleme.cn/#/zh-CN'},
					{name: 'web弹层', value: 'layer @3.1.1', link: 'http://layer.layui.com/'},
					{name: '图表引擎', value: 'ECharts @4.2.1', link: 'https://echarts.baidu.com/'},
					{name: '富文本编辑器', value: 'wangEditor @3.1.1', link: 'http://www.wangeditor.com/'},
				],
			}
		},
		methods: {
			
		},
		created() {
			
		}
	}
</script>

<style scoped>
	.btn-box{margin-bottom: 4px; }
	.btn-box .el-button{margin-bottom: 10px; }
</style>
