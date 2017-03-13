<template>
	<div class="list">
		<!-- 菜品列表 -->
		<ui-table :data="cateList" style="width: 100%">
			<ui-table-column prop="categoryTitle" label="主类别" align="center"></ui-table-column>

			<ui-table-column label="操作" align="center">
				<template scope="scope">
					<ui-button type="text" v-on:click="editMeal(scope.row.id)">编辑</ui-button>
					<ui-button type="text" v-on:click="delMeal(scope.row.id)">删除</ui-button>
				</template>
			</ui-table-column>
		</ui-table>

		<!-- 分页 -->
		<div class="pagination">
			<ui-pagination v-on:current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="100">
			</ui-pagination>
		</div>
	</div>

</template>

<script>
	import xhr from 'service'
	import { mealCate } from 'service/api'

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	export default {
		data: function() {
			return {
				reqList: {
					session: session,
					shopId: shopId,
					currentPage: 1
				},
				currentPage: 1
			}
		},

		props: ['cateList'],

		created: function() {

		},

		methods: {
			//控制分页
			handleCurrentChange(val) {
				//this.currentPage = val;
				console.log(val)
			},

			//给 MealCate 传递编辑菜品id
			editMeal: function(editId) {
				this.$emit('editTrans', editId);
			},

			//给 MealCate 传递删除菜品id
			delMeal: function(delId) {
				this.$emit('delTrans', delId);
			}
		}
	}
</script>

<style lang="scss">
	.icon-img {
		height: 60px;
	}
	
	.pagination {
		text-align: center;
		margin-top: 30px;
	}
</style>