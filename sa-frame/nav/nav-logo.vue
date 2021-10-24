<!-- 左上：logo部分 -->
<template>
	<div class="com-logo-box" :title="$root.title" @click="$root.showHome()">
		<img :src="$root.logo" class="admin-logo" v-if="$root.logo">
		<span class="admin-title">{{$root.title}}</span>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
			}
		},
		methods: {
		},
		created() {
		}
	}
</script>

<style scoped>
	.com-logo-box {
		cursor: pointer;
	}

	.admin-logo {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		vertical-align: middle;
		margin-left: 22px;
	}
	
	.admin-title{padding-right: 0.5em; margin-left: 0.5em; font-size: 1.05em;}
	
</style>
