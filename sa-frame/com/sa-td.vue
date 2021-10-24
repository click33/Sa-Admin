<template>
	<!-- 自定义slot -->
	<el-table-column v-if="$slots.default || $scopedSlots.default" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<slot :row="s.row" :index="s.index"></slot>
		</template>
	</el-table-column>
	<!-- selection框 -->
	<el-table-column v-else-if="type == 'selection'" type="selection" :width="width || '45px'" :min-width="minWidth"></el-table-column>
	<!-- 普通td -->
	<el-table-column v-else-if="type == 'text'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<span v-if="s.row[prop]">{{s.row[prop]}}</span>
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	<!-- num 数字 -->
	<el-table-column v-else-if="type == 'num'" :label="name" :width="width" :min-width="minWidth" class-name="tc-num">
		<template slot-scope="s">
			<span v-if="s.row[prop]">{{s.row[prop]}}</span>
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	<!-- icon -->
	<el-table-column v-else-if="type == 'icon'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<i v-if="s.row[prop]" :class="s.row[prop]" style="font-size: 1.3em;"></i>
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	<!-- img -->
	<el-table-column v-else-if="type == 'img'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<img v-if="s.row[prop]" :src="s.row[prop]" class="td-img" @click="sa.showImage(s.row[prop], '400px', '400px')" />
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	<!-- audio、video、file -->
	<el-table-column v-else-if="type == 'audio' || type == 'video' || type == 'file'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<el-link type="info" :href="s.row[prop]" target="_blank" v-if="!sa.isNull(s.row[prop])">预览</el-link>
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	<!-- img-list -->
	<el-table-column v-else-if="type == 'img-list'" :label="name" :width="width" :min-width="minWidth || '120px'" show-overflow-tooltip>
		<template slot-scope="s">
			<div @click="sa.showImageList(value_to_arr(s.row[prop]))" style="cursor: pointer;" v-if="s.row[prop]">
				<img :src="value_to_arr(s.row[prop])[0]" class="td-img" />
				<span style="color: #999; padding-left: 0.5em;">点击预览</span>
			</div>
			<div v-else>{{not}}</div>
		</template>
	</el-table-column>
	<!-- xxx-list -->
	<el-table-column v-else-if="type == 'audio-list' || type == 'video-list' || type == 'file-list' || type == 'img-video-list'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<span v-if="s.row[prop]" style="color: #666;">共 {{value_to_arr(s.row[prop]).length}} 个</span>
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	
	<!-- textarea -->
	<el-table-column v-else-if="type == 'textarea'" :label="name" :width="width" :min-width="minWidth" show-overflow-tooltip>
		<template slot-scope="s">
			<span v-if="s.row[prop]">{{sa.maxLength(s.row[prop], 100)}}</span>
			<span v-else>{{not}}</span>
		</template>
	</el-table-column>
	<!-- richtext 富文本 -->
	<el-table-column v-else-if="type == 'richtext' || type == 'f'" :label="name" :width="width" :min-width="minWidth" show-overflow-tooltip>
		<template slot-scope="s">
			<span>{{sa.maxLength(sa.text(s.row[prop]), 100)}}</span>
		</template>
	</el-table-column>
	<!-- link -->
	<el-table-column v-else-if="type == 'link'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<el-link type="primary" :href="s.row[prop]" target="_blank" v-if="!sa.isNull(s.row[prop])">{{s.row[prop]}}</el-link>
			<div v-else>无</div>
		</template>
	</el-table-column>
	<!-- link-btn -->
	<el-table-column v-else-if="type == 'link-btn'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<el-link type="primary" @click="$emit('click', s)" v-if="!sa.isNull(s.row[prop])">{{s.row[prop]}}</el-link>
			<div v-else>无</div>
		</template>
	</el-table-column>
	
	<!-- 钱 money (单位 元) -->
	<el-table-column v-else-if="type == 'money'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<b class="c-price" v-if="!sa.isNull(s.row[prop])">￥{{s.row[prop]}}</b>
			<div v-else>无</div>
		</template>
	</el-table-column>
	<!-- 钱 price-f (单位 分) -->
	<el-table-column v-else-if="type == 'money-f'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<b class="c-price" v-if="!sa.isNull(s.row[prop])">￥{{s.row[prop] / 100}}</b>
			<div v-else>无</div>
		</template>
	</el-table-column>
	<!-- 显示枚举 j、num -->
	<el-table-column v-else-if="type == 'enum' || type == 'j'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<b v-for="j in jvList" :key="j.key" :style="{color: j.color || '#606266'}" v-if="s.row[prop] == j.key">{{j.value}}</b>
		</template>
	</el-table-column>
	<!-- switch 开关 -->
	<el-table-column v-else-if="type == 'switch'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<el-switch 
				v-model="s.row[prop]" v-if='jvList.length >= 2' 
				:active-value="jvList[0].key" :inactive-value="jvList[1].key" 
				:active-color="jvList[0].color || '#409EFF'" :inactive-color="jvList[1].color || '#ccc'"
				@change="$emit('change', s)">
			</el-switch>
			<span v-for="j in jvList" :key="j.key" :style="{color: '#999'}" v-if="s.row[prop] == j.key">{{j.value}}</span>
		</template>
	</el-table-column>
	<!-- rate 评分 -->
	<el-table-column v-else-if="type == 'rate'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<el-rate :value="s.row[prop] <= 5 ? s.row[prop] : 5" show-text disabled v-if="!sa.isNull(s.row[prop])"></el-rate>
			<div v-else>无</div>
		</template>
	</el-table-column>
	<!-- date 日期 -->
	<el-table-column v-else-if="type == 'date'" :label="name" :width="width" :min-width="minWidth" class-name="tc-date">
		<template slot-scope="s"><span>{{sa.forDate(s.row[prop]) || not}}</span></template>
	</el-table-column>
	<!-- datetime 日期时间 -->
	<el-table-column v-else-if="type == 'datetime'" :label="name" :width="width" :min-width="minWidth" class-name="tc-date">
		<template slot-scope="s"><span>{{sa.forDate(s.row[prop], 2) || not}}</span></template>
	</el-table-column>
	<!-- time 时间 -->
	<el-table-column v-else-if="type == 'time'" :label="name" :width="width" :min-width="minWidth" class-name="tc-date">
		<template slot-scope="s"><span>{{s.row[prop] || not}}</span></template>
	</el-table-column>
	<!-- 用户头像 -->
	<el-table-column v-else-if="type == 'user-avatar'" :label="name" :width="width" :min-width="minWidth">
		<template slot-scope="s">
			<img :src="s.row[prop.split(',')[1]]" class="td-img"
				style="vertical-align: middle; margin-right: 5px;"
				@click="sa.showImage(s.row[prop.split(',')[1]], '400px', '400px')" />
			<b>{{s.row[prop.split(',')[0]]}}</b>
		</template>
	</el-table-column>
</template>

<script>
	module.exports = {
		// props: ['name', 'value'],
		props: {
			// text、img、
			type: {
				default: 'text'
			},
			// label提示文字
			name: {},
			label: {},
			// 绑定的属性  
			prop: {},
			// 宽度 
			width: {},
			// 最小宽度
			minWidth: {},
			// type=menu时，值列表    -- 形如：{1: '正常[green]', 2: '禁用[red]'}  
			jv: {default: ''},
			// 空值时显示的文字
			not: {default: '无'}
		},
		data() {
			return {
				// type=menu时，解析的值列表    -- 形如：[{key: 1, value: '正常', color: 'green'}]
				jvList: [],
				
				// type = img-list 时，解析的元素List
				value_arr: [],
				
			}
		},
		methods: {
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
				var value_arr = sa.isNull(value) ? [] : value.split(',');		
				for (var i = 0; i < value_arr.length; i++) {
					if(value_arr[i] == '' || value_arr[i].trim() == '') {
						sa.arrayDelete(value_arr, value_arr[i]);
						i--;
					}
				}
				// this.value_arr = value_arr;
				// this.$nextTick(function() {
				// 	this.value_arr = value_arr;
				// })
				return value_arr;
			},
		},
		 mounted() {
			// console.log(this.$slots);
			// console.log(this.$scopedSlots.default);
			// console.log(this.type);
			this.name = this.name || this.label;
			// 如果是枚举 
			if(this.type == 'enum' || this.type == 'j' || this.type == 'switch') {
				this.parseJv();
			}
			// 如果是 img-list 等 
			// if(this.type == 'img-list' || this.type == 'audio-list' || this.type == 'video-list' || this.type == 'file-list' || this.type == 'img-video-list') {
			// 	this.value_to_arr(this.value);
			// }
		}
	}
</script>

<style scoped>
</style>
