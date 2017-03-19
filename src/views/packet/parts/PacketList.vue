<template>
	<div class="packet-list">
		<!-- 红包列表 -->
		<ui-table :data="packetList" style="width: 100%">
			<ui-table-column prop="title" label="活动名称" align="center"></ui-table-column>

			<ui-table-column prop="cash" label="金额" align="center"></ui-table-column>

			<ui-table-column prop="createByUserName" label="发起人" align="center"></ui-table-column>

			<ui-table-column prop="amount" label="发起数量" align="center"></ui-table-column>

			<ui-table-column prop="saleAmount" label="已领取数量" align="center">
				<template scope="scope">
					<router-link :to="{name: 'Receive', params:{id:scope.row.id}}" class="saleAmount-link">{{scope.row.saleAmount}}</router-link>
				</template>
			</ui-table-column>

			<ui-table-column prop="type" label="领取区间" align="center">
				<template scope="scope">
					<div v-if="scope.row.type=='1'">
						全美食用户
					</div>
					<div v-else-if="scope.row.type == '2'">
						收藏本店铺用户
					</div>
					<div v-else="scope.row.type == '3'">
						绑定本店铺用户
					</div>
				</template>
			</ui-table-column>

			<ui-table-column prop="createDate" label="发起时间" align="center"></ui-table-column>

			<ui-table-column prop="abolishDate" label="结束时间" align="center"></ui-table-column>
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

		//红包列表数据
		props: ['packetList', 'currentPage', 'totalCount'],

		watch: {
			packetList() {
				for(let i = 0; i < this.packetList.length; i++) {
					let createDate = parseInt(this.packetList[i].createDate) / 1000;
					let abolishDate = parseInt(this.packetList[i].abolishDate) / 1000;
					this.packetList[i].createDate = formatDate(createDate, 4);
					this.packetList[i].abolishDate = formatDate(abolishDate, 4);
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
	.packet-list {
		.saleAmount-link {
			transition: all 0s;
			&:hover{
				text-decoration: underline;
			}
		}
	}
</style>