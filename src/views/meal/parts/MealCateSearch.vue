<template>
	<div class="view-search">
		<ui-row :gutter="10">
			<ui-col :span="5">
				<ui-button type="primary" size="large" v-on:click="mealSel">选择主类别</ui-button>
			</ui-col>
			<ui-col :span="5">
				<ui-button type="primary" size="large" v-on:click="mealAdd">添加主类别</ui-button>
			</ui-col>
		</ui-row>
	</div>
</template>

<script>
	import xhr from 'service'
	import { meal } from 'service/api'

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	export default {
		data: function() {
			return {

			}
		},

		methods: {
			//选择主类别
			mealSel: function() {
				this.$emit('selTrans');
			},
			
			//添加主类别
			mealAdd: function() {
				this.$emit('addTrans');
			}
		}
	}
</script>

<style lang="scss">
	.view-search {
		padding: 40px 10px;
		margin-bottom: 20px;
		background: #fff;
		.el-col>.el-input,
		.el-col>.el-select {
			width: 70%;
		}
		.el-input__icon+.el-input__inner {
			padding-right: 0
		}
		.el-col {
			white-space: nowrap;
		}
		.title {
			display: inline-block;
			margin-right: 10px;
		}
	}
	
	.el-button a {
		color: #fff!important;
	}
</style>