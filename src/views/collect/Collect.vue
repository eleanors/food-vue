<template>
	<div class="collect-wrap">
		<!-- 查询部分 -->
		<view-search v-on:searchTrans="searchRes"></view-search>

		<!-- 收藏列表 -->
		<view-list v-bind:collectList="collectList" v-bind:currentPage="currentPage" v-bind:totalCount="totalCount" v-on:pageTrans="handlePage"></view-list>
	</div>

</template>

<script>
	import viewSearch from './parts/CollectSearch'
	import viewList from './parts/CollectList'
	import xhr from 'service'
	import { collect } from 'service/api'
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
					type: '',
					startDate: '',
					cancelDate: ''
				},

				//列表数据
				collectList: []
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
					url: collect.collectList,
					options: this.reqSel
				}).then((res) => {
					if(res.findShopTablePage) {
						this.collectList = res.findShopTablePage;
						this.totalCount = res.pageInfo.totalCount;
					}
				})
			},

			//查询
			searchRes: function(msg) {
				this.reqSel.type = msg.type;
				this.reqSel.startDate = msg.startDate;
				this.reqSel.cancelDate = msg.cancelDate;

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