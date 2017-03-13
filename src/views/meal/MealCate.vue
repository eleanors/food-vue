<template>

	<div class="">
		<!--选择主类别-->
		<view-sel v-if="isShowSel" v-on:selModalTrans="isShowSel = false"></view-sel>

		<!--添加主类别-->
		<view-add v-if="isShowAdd" v-on:addModalTrans="isShowAdd = false"></view-add>

		<!--编辑主类别-->
		<view-edit v-if="isShowEdit" v-bind:editId="editId" v-on:editModalTrans="isShowEdit = false"></view-edit>

		<!--删除主类别-->
		<view-del v-if="isShowDel" v-bind:delId="delId" v-on:delModalTrans="isShowDel = false"></view-del>

		<!-- 查询部分 -->
		<view-search v-on:selTrans="isShowSel = true" v-on:addTrans="isShowAdd = true"></view-search>

		<!-- 类别列表 -->
		<view-list v-bind:cateList="cateList" v-on:delTrans="delMeal" v-on:editTrans="editMeal"></view-list>
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

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	//获取列表数据
	const showList = function(self) {
		xhr({
			url: mealCate.cateList,
			options: self.reqList
		}).then((res) => {
			if(res.findShopTablePage) {
				self.cateList = res.findShopTablePage;
			}
		})
	}

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
					session: session,
					shopId: shopId,
					currentPage: 1
				},
				cateList: [],
				currentPage: 1
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

		created: function() {
			//获取列表数据
			showList(this);
		},

		methods: {
			//编辑
			editMeal: function(editId) {
				this.isShowEdit = true;
				this.editId = editId;
			},

			//删除
			delMeal: function(delId) {
				this.isShowDel = true;
				this.delId = delId;
			}
		}
	}
</script>

<style lang="scss">

</style>