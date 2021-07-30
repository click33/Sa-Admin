<template>
	<!-- 左上：logo部分 -->
	<div class="com-logo-box" :title="$root.title" @click="$root.showTab(homeTab)">
		<img :src="$root.logo" class="admin-logo" v-if="$root.logo">
		<b class="admin-title">{{$root.title}}</b>
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
		margin-right: 0.5em;
	}
	
	.admin-title{padding-right: 0.5em; font-size: 1.05em;}
	
</style>
