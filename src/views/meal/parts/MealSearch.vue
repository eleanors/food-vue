<template>
	<div class="view-search">
		<ui-row :gutter="10">
			<ui-col :span="5"><span class="title">菜品名称</span>
				<ui-input v-model="mealTitle" placeholder="请输入内容"></ui-input>
			</ui-col>
			<ui-col :span="5">
				<span class="title">类型</span>
				<ui-select v-model="categoryId" placeholder="请选择">
					<ui-option v-for="(item, index) in shopCategorys" :label="item.categoryTitle" :value="item.categoryId" :key="index"></ui-option>
				</ui-select>
			</ui-col>
			<ui-col :span="5">
				<span class="title">状态</span>
				<ui-select v-model="status" placeholder="请选择">
					<ui-option v-for="(item, index) in shopStatus" :label="item.statusName" :value="item.status" :key="index"></ui-option>
				</ui-select>
			</ui-col>
			<ui-col :span="3">
				<ui-button type="primary" size="large" icon="search" v-on:click="mealSearch">查询</ui-button>
			</ui-col>
			<ui-col :span="3">
				<ui-button type="primary" size="large" v-on:click="mealAdd">添加菜品</ui-button>
			</ui-col>
			<ui-col :span="3">
				<ui-button type="primary" size="large">
					<router-link to="/mealCate">类别管理</router-link>
				</ui-button>
			</ui-col>
		</ui-row>
	</div>
</template>

<script>
	import xhr from 'service'
	import { meal } from 'service/api'
	import { mapMutations } from 'vuex'

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	export default {

		data: function() {
			return {
				mealTitle: '',
				categoryId: '',
				shopCategorys: [],
				status: '',
				shopStatus: [],
				
				//请求类别数据
				reqCate: {
					session: session,
					shopId: shopId,
					type: 2
				},
				
				//请求状态数据
				reqStatus: {
					session: session,
					shopId: shopId
				}
			}
		},

		//查询结果
		props: ['searchData'],

		created: function() {
			//查询当前店铺菜品类型
			xhr({
				url: meal.getShopCategorys,
				options: this.reqCate
			}).then((res) => {
				if(res.info) {
					this.shopCategorys = res.info;
				}
			})

			//查询当前店铺菜品状态
			xhr({
				url: meal.getShopItemStatus,
				options: this.reqStatus
			}).then((res) => {
				if(res.info) {
					this.shopStatus = res.info;
				}
			})
		},

		methods: {
			//查询
			mealSearch: function() {
				let searchData = {
					title: this.mealTitle,
					categoryId: this.categoryId || '',
					status: this.status || ''
				}
				this.$emit('searchTrans', searchData);
			},

			//添加
			mealAdd: function() {
				this.$emit('addTrans');
			}
		}
	}
</script>

<style lang="scss">
	.view-search {
		padding: 40px 10px;
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
	
	.el-button a {
		color: #fff!important;
	}
</style>