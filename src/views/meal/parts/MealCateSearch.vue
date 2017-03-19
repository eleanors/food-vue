<template>
	<div class="cate-search">
		<ui-row :gutter="10">
			<ui-col :span="3" class="btn-sel">
				<ui-button class="btn-orange" v-on:click="mealSel">选择主类别</ui-button>
			</ui-col>
			<ui-col :span="3">
				<ui-button class="btn-green" v-on:click="mealAdd">添加主类别</ui-button>
			</ui-col>
		</ui-row>
	</div>
</template>

<script>
	import xhr from 'service'
	
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
	.cate-search {
		padding: 40px;
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
		.btn-sel {
			margin-right: 20px
		}
	}
</style>