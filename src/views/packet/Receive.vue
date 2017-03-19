<template>

	<div class="receive-wrap">
		<!-- 查询部分 -->
		<view-search v-on:searchTrans="searchRes"></view-search>

		<!-- 红包领取列表 -->
		<view-list v-bind:receiveList="receiveList" v-bind:currentPage="currentPage" v-bind:totalCount="totalCount" v-on:pageTrans="handlePage"></view-list>
	</div>

</template>

<script>
	import viewSearch from './parts/ReceiveSearch'
	import viewList from './parts/ReceiveList'
	import xhr from 'service'
	import { packet } from 'service/api'
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
					wxRpId: '',
					startDate: '',
					endDate: '',
					telPhone: '',
					currentPage: 1
				},

				//列表数据
				receiveList: []
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
			//接收到的红包id
			this.reqSel.wxRpId = this.$route.params.id;

			//获取列表数据
			this.showList();
		},

		methods: {
			//列表
			showList: function() {
				this.reqSel.currentPage = this.currentPage;
				this.reqSel.session = this.session;
				
				xhr({
					url: packet.packetRecList,
					options: this.reqSel
				}).then((res) => {
					if(res.queryReceiveRedPacketList) {
						this.receiveList = res.queryReceiveRedPacketList;
						this.totalCount = res.pageInfo.totalCount;
					}
				})
			},//查询
			searchRes: function(msg) {
				this.reqSel.startDate = msg.startDate || '';
				this.reqSel.endDate = msg.endDate || '';

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