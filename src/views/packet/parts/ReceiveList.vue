<template>
	<div class="receive-list">
		<!-- 红包领取列表 -->
		<ui-table :data="receiveList" style="width: 100%">
			<ui-table-column prop="tel" label="手机号码" align="center"></ui-table-column>

			<ui-table-column prop="createDate" label="领取时间" align="center"></ui-table-column>

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

		//红包领取列表数据
		props: ['receiveList', 'currentPage', 'totalCount'],

		watch: {
			receiveList() {
				for(let i = 0; i < this.receiveList.length; i++) {
					let createDate = parseInt(this.receiveList[i].createDate) / 1000;
					this.receiveList[i].createDate = formatDate(createDate, 4);
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