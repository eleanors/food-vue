<template>

	<div class="">
		<!--新增菜品-->
		<view-add v-if="isShowAdd" v-bind:delId="delId" v-on:addModalTrans="isShowAdd = false"></view-add>

		<!--编辑菜品-->
		<view-edit v-if="isShowEdit" v-bind:editId="editId" v-on:editModalTrans="isShowEdit = false"></view-edit>

		<!--删除菜品-->
		<view-del v-if="isShowDel" v-bind:delId="delId" v-on:delModalTrans="isShowDel = false"></view-del>

		<!-- 查询部分 -->
		<view-search v-on:searchTrans="searchRes" v-on:addTrans="isShowAdd = true"></view-search>

		<!-- 菜品列表 -->
		<view-list v-bind:shopItems="shopItems" v-on:delTrans="delMeal" v-on:editTrans="editMeal"></view-list>
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

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	//获取列表数据
	const showList = function(self) {
		xhr({
			url: meal.getShopItems,
			options: self.reqSel
		}).then((res) => {
			self.shopItems = res.info;
		})
	}

	export default {
		data: function() {
			return {
				//控制模态框显示隐藏
				isShowAdd: false,
				isShowEdit: false,
				isShowDel: false,

				//发送列表请求
				reqSel: {
					session: session,
					shopId: shopId,
					currentPage: 1,
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

		created: function() {
			//获取列表数据
			showList(this);
		},

		methods: {
			//查询
			searchRes: function(msg) {
				this.reqSel.title = msg.title;
				this.reqSel.categoryId = msg.categoryId;
				this.reqSel.status = msg.status;

				//获取列表数据
				showList(this);
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
			}
		}
	}
</script>

<style lang="scss">

</style>