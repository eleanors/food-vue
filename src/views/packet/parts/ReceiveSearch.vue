<template>
	<div class="receive-search">
		<ui-row :gutter="10">
			<ui-col :span="8" class="date-wrap">
				<span class="title">时间</span>
				<div class="block date-item">
					<ui-date-picker v-model="searchData.startDate" type="date" placeholder="选择日期" :picker-options="pickerStart" v-on:change="startFormat">
					</ui-date-picker>
				</div>
				<strong class="date-to">至</strong>
				<div class="block date-item">
					<ui-date-picker v-model="searchData.endDate" type="date" placeholder="选择日期" :picker-options="pickerEnd" v-on:change="endFormat">
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
					startDate: '',
					endDate: ''
				},

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
				this.searchData.startDate = dateFormat;
			},

			//转换结束时间
			endFormat(dateFormat) {
				this.searchData.endDate = dateFormat;
			}
		}
	}
</script>

<style lang="scss">
	.receive-search {
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
	}
	
	.receive-search .el-button a {
		color: #fff!important;
	}
	/*时间*/
	
	.receive-search {
		.date-wrap {
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