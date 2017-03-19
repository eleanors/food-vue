<template>
	<div class="customer-search">
		<ui-row :gutter="10">
			<ui-col :span="4">
				<span class="title">顾客</span>
				<ui-input v-model="searchData.customerName" placeholder="请输入内容"></ui-input>
			</ui-col>
			<ui-col :span="4">
				<span class="title">推荐人</span>
				<ui-input v-model="searchData.recommendPeople" placeholder="请输入内容"></ui-input>
			</ui-col>
			<ui-col :span="4" class="recommend-col">
				<span class="title">推荐类型</span>
				<ui-select v-model="searchData.recommendType" placeholder="请选择">
					<ui-option v-for="(item, index) in recommend" :label="item.label" :value="item.type" :key="index"></ui-option>
				</ui-select>
			</ui-col>
			<ui-col :span="7" class="date-wrap">
				<span class="title">时间</span>
				<div class="block date-item">
					<ui-date-picker v-model="searchData.startTime" type="date" placeholder="选择日期" :picker-options="pickerStart" v-on:change="startFormat">
					</ui-date-picker>
				</div>
				<strong class="date-to">至</strong>
				<div class="block date-item">
					<ui-date-picker v-model="searchData.endTime" type="date" placeholder="选择日期" :picker-options="pickerEnd" v-on:change="endFormat">
					</ui-date-picker>
				</div>
			</ui-col>
			<ui-col :span="3">
				<ui-button class="btn-search" v-on:click="search">查询</ui-button>
			</ui-col>
		</ui-row>
	</div>
</template>

<script>
	import xhr from 'service'

	export default {

		data: function() {
			return {
				//请求查询数据
				searchData: {
					customerName: '',
					recommendPeople: '',
					recommendType: '',
					startTime: '',
					endTime: ''
				},

				//推荐类型
				recommend: [{
					type: '',
					label: '全部'
				}, {
					type: 1,
					label: '服务员'
				}, {
					type: 2,
					label: '店铺'
				}, {
					type: 3,
					label: '桌台'
				}],

				//开始时间
				pickerStart: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7;
					}
				},

				//截止时间
				pickerEnd: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				}
			}
		},

		created: function() {

		},

		methods: {
			//查询
			search() {
				this.$emit('searchTrans', this.searchData);
			},

			//转换开始时间
			startFormat(dateFormat) {
				this.searchData.startTime = dateFormat;
			},

			//转换结束时间
			endFormat(dateFormat) {
				this.searchData.endTime = dateFormat;
			}
		}
	}
</script>

<style lang="scss">
	.customer-search {
		padding: 40px;
		margin-bottom: 20px;
		background: #fff;
		.el-col>.el-input,
		.el-col>.el-select,
		.el-date-editor {
			width: 145px!important;
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
		.recommend-col {
			margin-left: 20px;
			margin-right: 15px;
		}
	}
	
	.customer-search .el-button a {
		color: #fff!important;
	}
	/*时间*/
	
	.customer-search {
		.date-wrap {
			margin-left: 20px;
			margin-right: 20px;
			.date-item {
				display: inline-block;
			}
			.date-to {
				font-weight: 400;
				margin: 0 5px;
			}
		}
	}
</style>