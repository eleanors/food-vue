<template>
	<div class="collect-list">
		<!-- 菜品列表 -->
		<ui-table :data="collectList" style="width: 100%">
			<ui-table-column prop="nickname" label="顾客姓名" align="center"></ui-table-column>

			<ui-table-column prop="cellphone" label="手机号码" align="center"></ui-table-column>

			<ui-table-column prop="type" label="状态" align="center">
				<template scope="scope">
					<div v-if="scope.row.recommendType=='1' || '2'||'3'">
						已收藏
					</div>
					<div v-else="scope.row.recommendType == '4'">
						未收藏
					</div>
				</template>
			</ui-table-column>

			<ui-table-column prop="createDate" label="收藏日期" align="center"></ui-table-column>
			<ui-table-column prop="updateDate" label="取消日期" align="center"></ui-table-column>
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
		props: ['collectList', 'currentPage', 'totalCount'],

		watch: {
			collectList() {
				for(let i = 0; i < this.collectList.length; i++) {
					let createDate = parseInt(this.collectList[i].createDate) / 1000;
					let updateDate = parseInt(this.collectList[i].updateDate);
					this.collectList[i].createDate = formatDate(createDate, 4);
					this.collectList[i].updateDate = formatDate(updateDate, 4);
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