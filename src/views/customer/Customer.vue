<template>

	<div class="customer-wrap">
		<!-- 查询部分 -->
		<view-search v-on:searchTrans="searchRes"></view-search>

		<!-- 顾客列表 -->
		<view-list v-bind:customerList="customerList" v-bind:currentPage="currentPage" v-bind:totalCount="totalCount" v-on:pageTrans="handlePage"></view-list>
	</div>

</template>

<script>
	import viewSearch from './parts/CustomerSearch'
	import viewList from './parts/CustomerList'
	import xhr from 'service'
	import { customer } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
				//当前页
				currentPage: 1,

				//总数量
				totalCount: 0,

				//发送列表请求
				reqSel: {
					session: '',
					shopId: '',
					recommendPeople: '',
					recommendType: '',
					customerName: '',
					startTime: '',
					endTime: '',
					currentPage: 1
				},

				//列表数据
				customerList: []
			}
		},

		components: {
			viewSearch,
			viewList
		},

		watch: {
			//动态监测分页变化
			currentPage: function() {
				this.showList();
			}
		},
		
		computed: {
			...mapGetters(['session','shopId'])
		},

		created: function() {
			//获取列表数据
			this.showList();
		},

		methods: {
			//列表
			showList: function() {
				this.reqSel.currentPage = this.currentPage;
				this.reqSel.session = this.session;
				this.reqSel.shopId = this.shopId;

				xhr({
					url: customer.customerList,
					options: this.reqSel
				}).then((res) => {
					if(res.findShopTablePage) {
						this.customerList = res.findShopTablePage;
						this.totalCount = res.pageInfo.totalCount;
					}
				})
			},

			//查询
			searchRes: function(msg) {
				this.reqSel.customerName = msg.customerName;
				this.reqSel.recommendPeople = msg.recommendPeople;
				this.reqSel.recommendType = msg.recommendType;
				this.reqSel.startTime = msg.startTime;
				this.reqSel.endTime = msg.endTime;

				//获取列表数据
				this.currentPage = 1;
				this.showList();
			},

			//分页
			handlePage: function(currentPage) {
				this.currentPage = currentPage;
			}
		}
	}
</script>

<style lang="scss">

</style>