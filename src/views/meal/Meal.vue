<template>

	<div class="">
		<!--新增菜品-->
		<view-add v-if="isShowAdd" v-bind:delId="delId"></view-add>

		<!--编辑菜品-->
		<view-edit v-if="isShowEdit" v-bind:editId="editId"></view-edit>

		<!--删除菜品-->
		<view-del v-if="isShowDel" v-bind:delId="delId"></view-del>

		<!-- 查询部分 -->
		<view-search v-on:searchTrans="searchRes" v-on:addTrans="isShowAdd = true"></view-search>

		<!-- 菜品列表 -->
		<view-list v-bind:shopItems="shopItems" v-bind:currentPage="currentPage" v-bind:totalCount="totalCount" v-on:delTrans="delMeal" v-on:editTrans="editMeal" v-on:pageTrans="handlePage"></view-list>
	</div>

</template>

<script>
	import viewSearch from './parts/MealSearch'
	import viewAdd from './parts/MealAdd'
	import viewEdit from './parts/MealEdit'
	import viewDel from './parts/MealDel'
	import viewList from './parts/MealList'
	import xhr from 'service'
	import { meal } from 'service/api'
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
					title: '',
					categoryId: '',
					status: ''
				},

				//列表数据
				shopItems: [],

				//编辑菜品id
				editId: '',

				//删除菜品id
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

		created: function() {
			//获取列表数据
			this.showList();
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		methods: {
			//列表
			showList: function() {
				this.reqSel.currentPage = this.currentPage;
				this.reqSel.session = this.session;
				this.reqSel.shopId = this.shopId;

				xhr({
					url: meal.getShopItems,
					options: this.reqSel
				}).then((res) => {
					if(res.info) {
						this.shopItems = res.info;
						this.totalCount = res.pageInfo.totalCount;
					}
				})
			},

			//查询
			searchRes: function(msg) {
				this.reqSel.title = msg.title;
				this.reqSel.categoryId = msg.categoryId;
				this.reqSel.status = msg.status;

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