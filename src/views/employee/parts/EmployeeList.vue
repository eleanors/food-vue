<template>
	<div class="employee-list">
		<!-- 员工列表 -->
		<ui-table :data="employeeList" style="width: 100%">
			<ui-table-column prop="employeeName" label="员工姓名" align="center"></ui-table-column>

			<ui-table-column prop="loginName" label="登录账户" align="center"></ui-table-column>

			<ui-table-column prop="phoneNumber" label="手机号码" align="center"></ui-table-column>

			<ui-table-column prop="privilege" label="权限" align="center">
				<template scope="scope">
					<div v-if="scope.row.privilege=='0'">
						管理员
					</div>
					<div v-else-if="scope.row.privilege == '1'">
						服务员
					</div>
					<div v-else="scope.row.privilege == '2'">
						店长
					</div>
				</template>
			</ui-table-column>

			<ui-table-column prop="workState" label="状态" align="center">
				<template scope="scope">
					<div v-if="scope.row.workState=='0'">
						在职
					</div>
					<div v-else-if="scope.row.workState == '1'">
						离职
					</div>
				</template>
			</ui-table-column>

			<ui-table-column prop="createDate" label="创建时间" align="center"></ui-table-column>

			<ui-table-column label="操作" align="center">
				<template scope="scope">
					<ui-button type="text" v-on:click="edit(scope.row.id)" class="operate-edit">编辑</ui-button>
					<ui-button type="text" v-on:click="del(scope.row.id)" class="operate-del">删除</ui-button>
				</template>
			</ui-table-column>
		</ui-table>

		<!-- 分页 -->
		<div class="pagination">
			<ui-pagination v-on:current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalCount">
			</ui-pagination>
		</div>
	</div>

</template>

<script>
	import xhr from 'service'
	import { formatDate } from 'vendor/utils'

	export default {
		data: function() {
			return {

			}
		},

		//员工列表数据
		props: ['employeeList', 'currentPage', 'totalCount'],

		watch: {
			employeeList() {
				if(employeeList.length) {
					for(let i = 0; i < this.employeeList.length; i++) {
						let newDate = parseInt(this.employeeList[i].createDate) / 1000;
						this.employeeList[i].createDate = formatDate(newDate, 5);
					}
				}
			}
		},

		methods: {
			//控制分页
			handleCurrentChange: function(currentPage) {
				this.$emit('pageTrans', currentPage);
			},

			//给 Employee 传递编辑员工id
			edit: function(editId) {
				this.$emit('editTrans', editId);
			},

			//给 Employee 传递删除员工id
			del: function(delId) {
				this.$emit('delTrans', delId);
			}
		}
	}
</script>

<style lang="scss">
	.employee-list {
		.operate-edit {
			margin-right: 0!important
		}
	}
</style>