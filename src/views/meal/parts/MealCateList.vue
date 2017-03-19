<template>
	<div class="cate-list">
		<!-- 菜品列表 -->
		<ui-table :data="cateList" style="width: 100%">
			<ui-table-column prop="categoryTitle" label="主类别" align="center"></ui-table-column>

			<ui-table-column label="操作" align="center">
				<template scope="scope">
					<ui-button type="text" v-on:click="editMeal(scope.row.id)" class="operate-edit">编辑</ui-button>
					<ui-button type="text" v-on:click="delMeal(scope.row.id)" class="operate-del">删除</ui-button>
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

	export default {
		data: function() {
			return {

			}
		},

		props: ['cateList', 'currentPage', 'totalCount'],

		methods: {
			//控制分页
			handleCurrentChange(currentPage) {
				this.$emit('pageTrans', currentPage);
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
	.cate-list {
		.icon-img {
			height: 60px;
		}
	}
</style>