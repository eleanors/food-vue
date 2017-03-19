<template>

	<div class="employee-wrap">
		<!--新增员工-->
		<view-add v-if="isShowAdd" v-bind:delId="delId"></view-add>

		<!--编辑员工-->
		<view-edit v-if="isShowEdit" v-bind:editId="editId"></view-edit>

		<!--删除员工-->
		<view-del v-if="isShowDel" v-bind:delId="delId"></view-del>

		<!-- 查询部分 -->
		<view-search v-on:searchTrans="searchRes" v-on:addTrans="isShowAdd = true"></view-search>

		<!-- 员工列表 -->
		<view-list v-bind:employeeList="employeeList" v-bind:currentPage="currentPage" v-bind:totalCount="totalCount" v-on:delTrans="delMeal" v-on:editTrans="editMeal" v-on:pageTrans="handlePage"></view-list>
	</div>

</template>

<script>
	import viewSearch from './parts/EmployeeSearch'
	import viewAdd from './parts/EmployeeAdd'
	import viewEdit from './parts/EmployeeEdit'
	import viewDel from './parts/EmployeeDel'
	import viewList from './parts/EmployeeList'
	import xhr from 'service'
	import { employee } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
				//控制模态框显示隐藏
				isShowAdd: false,
				isShowEdit: false,
				isShowDel: false,

				//当前页
				currentPage: 1,

				//总数量
				totalCount: 0,

				//发送列表请求
				reqSel: {
					session: '',
					shopId: '',
					currentPage: '',
					employeeName: '',
					phoneNumber: '',
					privilege: ''
				},

				//列表数据
				employeeList: [],

				//编辑员工id
				editId: '',

				//删除员工id
				delId: ''
			}
		},

		components: {
			viewSearch,
			viewAdd,
			viewEdit,
			viewDel,
			viewList
		},

		watch: {
			//动态监测分页变化
			currentPage: function() {
				this.showList();
			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		created: function() {
			//获取列表数据
			this.showList();
		},

		methods: {
			//列表
			showList: function() {
				this.reqSel.currentPage = this.currentPage;
				this.reqSel.session = this.session;
				this.reqSel.shopId = this.shopId;

				xhr({
					url: employee.getEmployee,
					options: this.reqSel
				}).then((res) => {
					if(res.findShopTablePage) {
						this.employeeList = res.findShopTablePage;
						this.totalCount = res.pageInfo.totalCount;
					}
				})
			},

			//查询
			searchRes: function(msg) {
				this.reqSel.employeeName = msg.employeeName;
				this.reqSel.phoneNumber = msg.phoneNumber;
				this.reqSel.privilege = msg.privilege;

				//获取列表数据
				this.currentPage = 1;
				this.showList();
			},

			//编辑
			editMeal: function(editId) {
				this.isShowEdit = true;
				this.editId = editId;
			},

			//删除
			delMeal: function(delId) {
				this.isShowDel = true;
				this.delId = delId;
			},

			//分页
			handlePage: function(currentPage) {
				this.currentPage = currentPage;
			}
		}
	}
</script>

<style lang="scss">

</style>