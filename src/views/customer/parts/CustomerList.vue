<template>
	<div class="customer-list">
		<!-- 菜品列表 -->
		<ui-table :data="customerList" style="width: 100%">
			<ui-table-column prop="customerName" label="顾客姓名" align="center"></ui-table-column>

			<ui-table-column prop="customerPhone" label="手机号码" align="center"></ui-table-column>

			<ui-table-column prop="recommendPeoPle" label="推荐人" align="center"></ui-table-column>

			<ui-table-column prop="recommendType" label="推荐类型" align="center">
				<template scope="scope">
					<div v-if="scope.row.recommendType=='1'">
						服务员
					</div>
					<div v-else-if="scope.row.recommendType == '2'">
						店铺
					</div>
					<div v-else="scope.row.recommendType == '3'">
						桌台
					</div>
				</template>
			</ui-table-column>

			<ui-table-column prop="recommendTime" label="扫码日期" align="center"></ui-table-column>
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

		//菜品列表数据
		props: ['customerList', 'currentPage', 'totalCount'],

		watch: {
			customerList() {
				for(let i = 0; i < this.customerList.length; i++) {
					let newDate = parseInt(this.customerList[i].recommendTime) / 1000;
					this.customerList[i].recommendTime = formatDate(newDate, 4);
				}
			}
		},

		created() {

		},

		methods: { //控制分页
			handleCurrentChange(currentPage) {
				this.$emit('pageTrans', currentPage);
			}
		}
	}
</script>

<style lang="scss">

</style>