<template>
	<div class="list">
		<!-- 菜品列表 -->
		<ui-table :data="shopItems" style="width: 100%">
			<ui-table-column label="图片" align="center">
				<template scope="scope">
					<img :src="scope.row.icon" class="icon-img" />
				</template>
			</ui-table-column>

			<ui-table-column prop="title" label="菜品名称" align="center"></ui-table-column>

			<ui-table-column prop="categoryTitle" label="类型" align="center"></ui-table-column>

			<ui-table-column prop="originalPrice" label="原价" align="center"></ui-table-column>

			<ui-table-column prop="price" label="售价" align="center"></ui-table-column>

			<ui-table-column label="促销方式" align="center">
				<template scope="scope">
					<div v-if="scope.row.promType=='0'">
						不参与促销
					</div>
					<div v-else-if="scope.row.promType == '1'">
						打折
					</div>
					<div v-else="scope.row.promType == '2'">
						优惠
					</div>
				</template>
			</ui-table-column>

			<ui-table-column label="推荐" align="center"></ui-table-column>

			<ui-table-column label="状态" align="center">
				<template scope="scope">
					<div v-if="scope.row.status=='1'">
						上架
					</div>
					<div v-else="scope.row.status == '2'">
						下架
					</div>
				</template>
			</ui-table-column>

			<ui-table-column label="操作" align="center">
				<template scope="scope">
					<ui-button type="text" v-on:click="editMeal(scope.row.id)">编辑</ui-button>
					<ui-button type="text" v-on:click="delMeal(scope.row.id)">删除</ui-button>
				</template>
			</ui-table-column>
		</ui-table>

		<!-- 分页 -->
		<div class="pagination">
			<ui-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="100">
			</ui-pagination>
		</div>
	</div>

</template>

<script>
	import xhr from 'service'
	import { meal } from 'service/api'

	export default {
		data: function() {
			return {
				currentPage: 1
			}
		},

		//菜品列表数据
		props: ['shopItems'],

		methods: {
			//控制分页
			handleSizeChange: function(val) {

			},

			handleCurrentChange: function(val) {
				this.currentPage = val;
				//console.log(val);
			},

			//给 Meal 传递编辑菜品id
			editMeal: function(editId) {
				this.$emit('editTrans', editId);
			},

			//给 Meal 传递删除菜品id
			delMeal: function(delId) {
				this.$emit('delTrans', delId);
			}
		}
	}
</script>

<style lang="scss">
	.icon-img {
		/*width: 60px;*/
		height: 60px;
	}
	
	.pagination {
		text-align: center;
		margin-top: 30px;
	}
</style>