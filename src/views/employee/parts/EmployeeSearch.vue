<template>
	<div class="employee-search">
		<ui-row :gutter="10">
			<ui-col :span="5">
				<span class="title">员工姓名</span>
				<ui-input v-model="searchData.employeeName" placeholder="请输入内容"></ui-input>
			</ui-col>
			<ui-col :span="5">
				<span class="title">手机号码</span>
				<ui-input v-model="searchData.phoneNumber" placeholder="请输入内容"></ui-input>
			</ui-col>
			<ui-col :span="5">
				<span class="title">权限</span>
				<ui-select v-model="searchData.privilege" placeholder="请选择">
					<ui-option v-for="(item, index) in priList" :label="item.label" :value="item.type" :key="index"></ui-option>
				</ui-select>
			</ui-col>
			<ui-col :span="3">
				<ui-button class="btn-search" v-on:click="search">查询</ui-button>
			</ui-col>
			<ui-col :span="3">
				<ui-button class="btn-green" v-on:click="employeeAdd">添加员工</ui-button>
			</ui-col>
		</ui-row>
	</div>
</template>

<script>
	import xhr from 'service'

	export default {

		data: function() {
			return {
				//请求查询数据
				searchData: {
					employeeName: '',
					phoneNumber: '',
					privilege: ''
				},

				//权限
				priList: [{
					type: '',
					label: '全部'
				}, {
					type: 0,
					label: '管理员'
				}, {
					type: 1,
					label: '店长'
				}, {
					type: 2,
					label: '服务员'
				}]
			}
		},

		created: function() {
			
		},

		methods: {
			//查询
			search: function() {
				this.$emit('searchTrans', this.searchData);
			},

			//添加
			employeeAdd: function() {
				this.$emit('addTrans');
			}
		}
	}
</script>

<style lang="scss">
	.employee-search {
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
	}
	
	.employee-search .el-button a {
		color: #fff!important;
	}
</style>