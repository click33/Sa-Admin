<template>
	<!-- 自定义slot -->
	<div class="c-item" :class="{br: br}" v-if="$slots.default && type != 'fast-btn'">
		<label class="c-label" v-if="name && name.length > 0">{{name}}：</label> 
		<span v-else-if="name === undefined"></span> 
		<label class="c-label" v-else></label> 
		<span v-else></span> 
		<slot></slot>
	</div>
	<!-- 普通input -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'text' || type == 'link'">
		<label class="c-label">{{name}}：</label> 
		<el-input type="text" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-input>
	</div>
	<!-- 数字input -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'num'">
		<label class="c-label">{{name}}：</label> 
		<el-input type="number" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-input>
	</div>
	<!-- 密码input -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'password'">
		<label class="c-label">{{name}}：</label> 
		<el-input type="password" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-input>
	</div>
	<!-- 多行文本域 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'textarea'">
		<label class="c-label">{{name}}：</label> 
		<div style="display: inline-block;">
			<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-input>
		</div>
	</div>
	<!-- 钱 money (单位 元) -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'money'">
		<label class="c-label">{{name}}：</label> 
		<el-input type="text" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-input>
		<span>元</span>
	</div>
	<!-- 钱 price-f (单位 分) -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'money-f'">
		<label class="c-label">{{name}}：</label> 
		<el-input type="text" v-model="valueReal" @input="$emit('input', $event * 100)" :placeholder="placeholder" :disabled="disabled"></el-input>
		<span>元</span>
	</div>
	<!-- img -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'img'">
		<label class="c-label">{{name}}：</label> 
		<img :src="value" class="info-img" @click="sa.showImage(value, '400px', '400px')" v-if="!sa.isNull(value)">
		<el-link type="primary" @click="sa.uploadImage(src => {$emit('input', src); sa.ok2('上传成功');})">上传</el-link>
	</div>
	<!-- audio -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'audio'">
		<label class="c-label">{{name}}：</label> 
		<el-link type="info" :href="value" target="_blank" v-if="!sa.isNull(value)">{{value}}</el-link>
		<el-link type="primary" @click="sa.uploadAudio(src => {$emit('input', src); sa.ok2('上传成功');})">上传</el-link>
	</div>
	<!-- video -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'video'">
		<label class="c-label">{{name}}：</label> 
		<el-link type="info" :href="value" target="_blank" v-if="!sa.isNull(value)">{{value}}</el-link>
		<el-link type="primary" @click="sa.uploadVideo(src => {$emit('input', src); sa.ok2('上传成功');})">上传</el-link>
	</div>
	<!-- file -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'file'">
		<label class="c-label">{{name}}：</label> 
		<el-link type="info" :href="value" target="_blank" v-if="!sa.isNull(value)">{{value}}</el-link>
		<el-link type="primary" @click="sa.uploadFile(src => {$emit('input', src); sa.ok2('上传成功');})">上传</el-link>
	</div>
	<!-- img-list -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'img-list'">
		<label class="c-label">{{name}}：</label> 
		<div class="c-item-mline image-box">
			<div class="image-box-2" v-for="item in value_arr">
				<img :src="item" @click="sa.showImage(item, '500px', '400px')" />
				<p>
					<i class="el-icon-close" style="position: relative; top: 2px;"></i>
					<el-link @click="value_arr_delete(item)" style="color: #999;">删除这张 </el-link>
				</p>
			</div>
			<!-- 上传图集 -->
			<div class="image-box-2 up_img" @click="sa.uploadImageList(src => value_arr_push(src))">
				<img src="../../static/img/up-icon.png">
			</div>
		</div>
	</div>
	<!-- audio-list、video-list、file-list、img-video-list -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'audio-list' || type == 'video-list' || type == 'file-list' || type == 'img-video-list'">
		<label class="c-label">{{name}}：</label> 
		<div class="c-item-mline">
			<div v-for="item in value_arr">
				<el-link type="info" :href="item" target="_blank">{{item}}</el-link>
				<el-link type="danger" class="del-rr" @click="value_arr_delete(item)">
					<i class="el-icon-close"></i>
					<small style="vertical-align: top;">删除</small>
				</el-link>
			</div>
			<el-link type="primary" @click="sa.uploadAudioList(src => value_arr_push(src))" v-if="type == 'audio-list'">上传</el-link>
			<el-link type="primary" @click="sa.uploadVideoList(src => value_arr_push(src))" v-if="type == 'video-list'">上传</el-link>
			<el-link type="primary" @click="sa.uploadFileList(src => value_arr_push(src))" v-if="type == 'file-list'">上传</el-link>
			<el-link type="primary" @click="sa.uploadImageList(src => value_arr_push(src))" v-if="type == 'img-video-list'">上传图片</el-link>
			<el-link type="primary" @click="sa.uploadVideoList(src => value_arr_push(src))" v-if="type == 'img-video-list'" style="margin-left: 7px;">上传视频</el-link>
		</div>
	</div>
	<!-- 富文本 richtext f -->
	<div class="c-item" style="margin-top: 10px;" :class="{br: br}" v-else-if="type == 'richtext' || type == 'f'">
		<label class="c-label">{{name}}：</label> 
		<div class="editor-box c-item-mline">
			<div :id="'editor-' + editor_id"></div>
		</div>
		<div style="clear: both;"></div>
	</div>
	<!-- enum 枚举 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'enum' || type == 'j' || type == 'switch'">
		<label class="c-label">{{name}}：</label> 
		<el-radio-group v-if="jtype == 1 || jtype == 2" :class="{'s-radio-text': jtype == 2}" :value="value" @input="onInput">
			<el-radio label="" v-if="def">{{def}}</el-radio>
			<el-radio v-for="j in jvList" :key="j.key" :label="j.key">{{j.value}}</el-radio>
		</el-radio-group>
		<el-radio-group v-if="jtype == 3" :value="value" @input="onInput">
			<el-radio-button label="" v-if="def">{{def}}</el-radio-button>
			<el-radio-button v-for="j in jvList" :key="j.key" :label="j.key">{{j.value}}</el-radio-button>
		</el-radio-group>
		<el-select v-if="jtype == 4" :value="value" @input="onInput">
			<el-option label="" v-if="def" :value="def"></el-option>
			<el-option v-for="j in jvList" :key="j.key" :label="j.value" :value="j.key"></el-option>
		</el-select>
	</div>
	<!-- 日期选择器 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'date'">
		<label class="c-label">{{name}}：</label> 
		<el-date-picker type="date" value-format="yyyy-MM-dd" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-date-picker>
	</div>
	<!-- 日期时间选择器 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'datetime'">
		<label class="c-label">{{name}}：</label> 
		<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-date-picker>
	</div>
	<!-- 时间选择器 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'time'">
		<label class="c-label">{{name}}：</label> 
		<el-time-picker value-format="HH:mm:ss" :value="value" @input="onInput" :placeholder="placeholder" :disabled="disabled"></el-time-picker>
	</div>
	<!-- 日期范围选择 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'date-range'">
		<label class="c-label">{{name}}：</label> 
		<el-date-picker
			type="daterange"
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			value-format="yyyy-MM-dd"
			:value="dateRangeValue" 
			@input="dateRangeOnChange"
			:disabled="disabled"
			>
		</el-date-picker>
	</div>
	<!-- 滑块 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'slider'">
		<label class="c-label">{{name}}：</label> 
		<div style="display: inline-block; height: 0px; vertical-align: top; width: 250px;">
			<el-slider :value="value" @input="onInput" style="position: relative; top: -5px;" :disabled="disabled"></el-slider>
		</div>
	</div>
	<!-- 级联输入 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'cascader'">
		<label class="c-label">{{name}}：</label> 
		<el-cascader :value="value" @input="onInput" :options="options" :props="{expandTrigger: 'hover'}" :placeholder="placeholder" :disabled="disabled"></el-cascader>
	</div>
	<!-- 颜色输入 -->
	<div class="c-item" :class="{br: br}" style="height: 0px;" v-else-if="type == 'color'">
		<label class="c-label">{{name}}：</label> 
		<el-color-picker :value="value" @input="onInput" :disabled="disabled"></el-color-picker>
		<span class="c-remark" style="vertical-align: top;">{{value}}</span>
	</div>
	<!-- 评分组件 -->
	<div class="c-item" :class="{br: br}" v-else-if="type == 'rate'">
		<label class="c-label">{{name}}：</label> 
		<div style="display: inline-block;">
			<el-rate :value="value" @input="onInput" show-text :disabled="disabled"></el-rate>
		</div>
	</div>
	<!-- 快捷增删改查按钮 -->
	<div class="fast-btn" v-else-if="type == 'fast-btn'">
		<el-button type="primary" icon="el-icon-plus" @click="$parent.add()" v-if="showBtns.indexOf('add') != -1">新增</el-button>
		<el-button type="success" icon="el-icon-view" @click="$parent.getBySelect()" v-if="showBtns.indexOf('get') != -1">查看</el-button>
		<el-button type="danger" icon="el-icon-delete" @click="$parent.deleteByIds()" v-if="showBtns.indexOf('delete') != -1">删除</el-button>
		<el-button type="warning" icon="el-icon-download" @click="sa.exportExcel()" v-if="showBtns.indexOf('export') != -1">导出</el-button>
		<el-button type="info"  icon="el-icon-refresh"  @click="sa.f5()" v-if="showBtns.indexOf('reset') != -1">重置</el-button>
		<slot></slot>
	</div>
	<!-- 分页组件 -->
	<div class="page-box" v-else-if="type == 'page'">
		<el-pagination background
			layout="total, prev, pager, next, sizes, jumper" 
			:current-page.sync="curr" 
			:page-size.sync="size" 
			:total="total" 
			:page-sizes="sizes || [1, 10, 20, 30, 40, 50, 100]" 
			@current-change="changePage()" 
			@size-change="changePage()">
		</el-pagination>
	</div>
</template>

<script>
	module.exports = {
		// props: ['name', 'value'],
		props: {
			// text、num、
			type: {
				default: 'text'
			},
			// label提示文字
			name: {
				type: String
			},
			// 绑定的值 
			value: {},
			// 提示文字
			placeholder: {},
			// 是否禁用
			disabled: {},
			// 是否换行 
			br: {
				type: Boolean,
				default: false
			},
			// 日期范围时的选择字段，调用方需要加 .sync 修饰符 
			start: {}, end: {},
			// type=menu时，值列表    -- 形如：{1: '正常[green]', 2: '禁用[red]'}  
			jv: {default: ''},
			// type=menu时，具体的枚举类型 -- 1=单选框，2=单选文字，3=单选按钮，4=单选下拉框
			jtype: {default: 1},
			// type=menu时，增加的默认项文字 
			def: {},
			// 级联选择的数据列表
			options: {},
			// 快捷按钮显示列表，形如：add,get,delete,export,reset 
			show: {},	
			// 分页信息 
			curr: {}, size: {}, total: {}, sizes: {}
			
		},
		data() {
			return {
				// 日期范围时的值 
				dateRangeValue: [],
				// 快捷按钮显示按钮列表 
				showBtns: [],
				// type=menu时，解析的值列表    -- 形如：[{key: 1, value: '正常', color: 'green'}]
				jvList: [],
				// type = img-list 时，解析的元素List
				value_arr: [],
				// 富文本编辑器id
				editor_id: '',
				// 富文本编辑器对象 
				editor: null,
				// money-f 的底层字段
				valueReal: ''
			}
		},
		watch: {
			// 监听一些类型的 value 变动 
			value: function(oldValue, newValue) {
				// img-list、audio-list、video-list、file-list、img-video-list
				if(this.type == 'img-list' || this.type == 'audio-list' || this.type == 'video-list' || this.type == 'file-list' || this.type == 'img-video-list') {
					this.value_to_arr(this.value); 
				}
				// 如果是富文本
				// if(this.type == 'richtext' || this.type == 'f') {
				// 	if(this.editor) {
				// 		// this.editor.txt.html(newValue);
				// 		$('#editor-' + this.editor_id + " .w-e-text").html(newValue);
				// 	}
				// }
			},
		},
		methods: {
			// input值发生变化时触发
			onInput: function($event) {
				this.$emit('input', $event);
			},
			// 日期范围选择时触发 
			dateRangeOnChange: function(value) {
				console.log(value);
				this.dateRangeValue = value;
				this.start = value[0];
				this.end = value[1];
				this.$emit('update:start',  value[0]);
				this.$emit('update:end',  value[1]);
			},
			// 刷新分页 
			changePage: function() {
				this.$emit('update:curr', this.curr);
				this.$emit('update:size', this.size);
				this.$emit('change');
			},
			// 解析枚举 
			parseJv: function() {
				for(let key in this.jv) {
					let value = this.jv[key];
					let color = '';
					// 
					if(value.indexOf('[') != -1 && value.endsWith(']')) {
						let index = value.indexOf('[');
						color = value.substring(index + 1, value.length - 1);
						value = value.substring(0, index);
						// console.log(color + ' --- ' + value);
					}
					// 
					if(isNaN(key) == false) {
						key = parseInt(key);
					}
					// 
					this.jvList.push({
						key: key,
						value: value,
						color: color
					})
				}
			},
			// 解析 value 为 value_arr
			value_to_arr: function(value) {
				this.value_arr = sa.isNull(value) ? [] : value.split(',');		
				for (var i = 0; i < this.value_arr.length; i++) {
					if(this.value_arr[i] == '' || this.value_arr[i].trim() == '') {
						sa.arrayDelete(this.value_arr, this.value_arr[i]);
						i--;
					}
				}
			},
			// value_arr 数组增加值
			value_arr_push: function(item) {
				this.value_arr.push(item);
				// this.value = this.value_arr.join(',');	
				this.$emit('input', this.value_arr.join(','));
			},
			// value_arr 数组删除值 
			value_arr_delete: function(item) {
				sa.arrayDelete(this.value_arr, item);
				// this.value = this.value_arr.join(',');	
				this.$emit('input', this.value_arr.join(','));
			},
			// 创建富文本编辑器
			create_editor: function(content) {
				var E = window.wangEditor;
				var editor = new E('#editor-' + this.editor_id);
			
				editor.config.menus = [
					'head', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'list',
					'justify', 'quote', 'emoticon', 'image', 'table', 'code', 'undo', 'redo' // 重复
				]
				editor.config.debug = true; // debug模式
				// editor.config.uploadFileName = 'file'; // 图片流name
				editor.config.withCredentials = true; // 跨域携带cookie
				editor.config.uploadImgMaxSize = 100 * 1024 * 1024;	// 图片大小最大100M
				// editor.config.uploadImgShowBase64 = true   	// 使用 base64 保存图片
				// 监听内容变动
				editor.config.onchange = function (newHtml) {
					// console.log("change 之后最新的 html", newHtml);
					this.$emit('input', newHtml);
				}.bind(this);
				// 重写上传图片的函数到OSS 
				editor.config.customUploadImg = function(files, insert) {
					var file = files[0]; // 文件对象 
					startUploadImage2(file, function(src) {
						insert(src);
						sa.msg('上传成功');
					});
				}
				editor.create(); // 创建
				editor.txt.html(content);	// 为编辑器赋值
				this.editor = editor;
				// setTimeout(function() {
				// 	$('.editor-box').height($('.editor-box').height());
				// })
			},
			// 为编辑器赋值 
			editorSet: function(value) {
				this.editor.txt.html(value);
			},
			valueSet(valueReal) {
				this.valueReal = valueReal;
			}
		},
		created() {
			// console.log(this.br);
			if(this.type == 'fast-btn') {
				this.showBtns = this.show.split(',');
				for (var i = 0; i < this.showBtns.length; i++) {
					this.showBtns[i] = this.showBtns[i].trim();
				}
			}
			// 如果是枚举
			if(this.type == 'enum' || this.type == 'j' || this.type == 'switch') {	
				this.parseJv();
			}
			// 如果是 img-list 等 
			if(this.type == 'img-list' || this.type == 'audio-list' || this.type == 'video-list' || this.type == 'file-list' || this.type == 'img-video-list') {
				this.value_to_arr(this.value);
			}
			// 如果是富文本
			if(this.type == 'richtext' || this.type == 'f') {
				this.editor_id = sa.randomString(32);
				this.$nextTick(function() {
					this.create_editor(this.value);
				})
			}
			// 如果是 money-f 
			if(this.type == 'money-f') {
				if(this.value) {
					this.valueReal = this.value / 100;
				}
			}
			
			
		}
	}
</script>

<style scoped>
</style>
