<template>
	<!-- 双击弹出的窗口 -->
	<div class="at-form-fox" style="width: 0px; height: 0px; overflow: hidden; ">
		<div class="at-form-dom" style="width: 300px; padding: 20px 0 10px 0; background-color: #FFF;">
			<el-form label-width="80px" size="mini">
				<!-- <h5 style="padding: 0 0 10px 26px;">创建新页面</h5> -->
				<el-form-item label="标题：">
					<el-input style="width: 200px;" v-model="atTitle" placeholder="页面标题"></el-input>
				</el-form-item>
				<el-form-item label="地址：" style="margin-top: -10px;">
					<el-input style="width: 200px;" v-model="atUrl" placeholder="https://www.baidu.com/" @keyup.native.enter="atOk()"></el-input>
				</el-form-item>
				<el-form-item label="操作：" style="margin-top: -10px;">
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="atOk()">确定</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				atTitle: '',		// 添加窗口时: 标题
				atUrl: '',			// 添加窗口时: 地址 
			}
		},
		methods: {
			// 双击tab栏空白处, 打开弹窗添加窗口 
			atOpen: function() {
				window.r_layer_12345678910 = layer.open({
					type: 1,
					// shade: false,
					shade: 0.5,
					title: "添加新窗口", //不显示标题
					content: $('.at-form-dom'), //捕获的元素
					cancel: function(){
						
					}
				});
			},
			// 根据表单添加新窗口 
			atOk: function() {
				if(this.atTitle == '' || this.atUrl == '') {
					return;
				}
				this.$root.showTab({id: new Date().getTime(), name: this.atTitle, url: this.atUrl});
				layer.close(window.r_layer_12345678910);
				this.atTitle = '';
				this.atUrl = '';
			},
		},
		created() {
			
		}
	}
</script>

<style scoped>
</style>
