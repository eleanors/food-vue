<template>

	<div class="">
		<!--选择主类别-->
		<view-sel v-if="isShowSel"></view-sel>

		<!--添加主类别-->
		<view-add v-if="isShowAdd"></view-add>

		<!--编辑主类别-->
		<view-edit v-if="isShowEdit" v-bind:editId="editId"></view-edit>

		<!--删除主类别-->
		<view-del v-if="isShowDel" v-bind:delId="delId"></view-del>

		<!-- 查询部分 -->
		<view-search v-on:selTrans="isShowSel = true" v-on:addTrans="isShowAdd = true"></view-search>

		<!-- 类别列表 -->
		<view-list v-bind:cateList="cateList" v-bind:currentPage="currentPage" v-bind:totalCount="totalCount" v-on:delTrans="delMeal" v-on:editTrans="editMeal" v-on:pageTrans="handlePage"></view-list>
	</div>

</template>

<script>
	import viewSearch from './parts/MealCateSearch'
	import viewSel from './parts/MealCateSel'
	import viewAdd from './parts/MealCateAdd'
	import viewEdit from './parts/MealCateEdit'
	import viewDel from './parts/MealCateDel'
	import viewList from './parts/MealCateList'
	import xhr from 'service'
	import { mealCate } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
				//控制模态框显示隐藏
				isShowSel: false,
				isShowAdd: false,
				isShowEdit: false,
				isShowDel: false,

				//请求类别列表
				reqList: {
					session: '',
					shopId: '',
					currentPage: 1
				},
				cateList: [],

				//当前页
				currentPage: 1,

				//总数量
				totalCount: 0
			}
		},

		components: {
			viewSearch,
			viewSel,
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
			...mapGetters(['session','shopId'])
		},

		created: function() {
			//获取列表数据
			this.showList();
		},

		methods: {
			//列表
			showList: function() {
				this.reqList.currentPage = this.currentPage;
				this.reqList.session = this.session;
				this.reqList.shopId = this.shopId;
				
				xhr({
					url: mealCate.cateList,
					options: this.reqList
				}).then((res) => {
					if(res.findShopTablePage) {
						this.cateList = res.findShopTablePage;
						this.totalCount = res.pageInfo.totalCount;
					}
				})
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