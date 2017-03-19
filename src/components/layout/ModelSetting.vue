<template>
	<div class="model-wrap">
		<ui-dialog title="模式设置" v-model="modelDialog">
			<ui-form ref="form" label-width="formLabelWidth">
				<ui-form-item label="模式设置" :label-width="formLabelWidth">
					<ui-select v-model="reqSetting.pattern" placeholder="请选择">
						<ui-option v-for="(item,index) in modelList" :label="item.label" :value="item.value" :key="index">
						</ui-option>
					</ui-select>
				</ui-form-item>

				<div v-if="reqSetting.pattern == '1'">
					<ui-form-item label="预定设置" :label-width="formLabelWidth">
						<ui-radio class="radio" v-model="reqSetting.reserveStatus" label="1">开启</ui-radio>
						<ui-radio class="radio" v-model="reqSetting.reserveStatus" label="0">关闭</ui-radio>
					</ui-form-item>

					<ui-form-item label="可提前预定日期" :label-width="formLabelWidth">
						<ui-select v-model="reqSetting.reserveFlag" placeholder="请选择">
							<ui-option v-for="(item,index) in dateList" :label="item.label" :value="item.value" :key="index">
							</ui-option>
						</ui-select>
					</ui-form-item>

					<ui-form-item label="可提前预定时间" :label-width="formLabelWidth">
						<ui-select v-model="reqSetting.reserveUnit" placeholder="请选择">
							<ui-option v-for="(item,index) in timeList" :label="item.label" :value="item.value" :key="index">
							</ui-option>
						</ui-select>
					</ui-form-item>
				</div>
			</ui-form>

			<!--模式介绍-->
			<ul class="intro-wrap">
				<li class="modelIntro">
					<h1 class="fs-16">什么是桌台叫号模式？</h1>
					<p class="fs-14">桌台叫号模式是通过不同的桌台号由顾客点单顺序，生成就餐规则关联顾客的方式。可在线预订桌台。</p>
				</li>
				<li class="modelIntro">
					<h1 class="fs-16">什么是流水叫号模式？</h1>
					<p class="fs-14">流水叫号模式是通过顾客订餐支付成功后，生成就餐流水号关联顾客的方式。</p>
				</li>
			</ul>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="modelDialog = false">取 消</ui-button>
				<ui-button type="primary" v-on:click="update">确 定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { shop } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {

		data: function() {
			return {
				//是否显示
				modelDialog: true,

				//label 宽度
				formLabelWidth: '120px',

				region: '',

				//模式
				modelList: [{
					value: '1',
					label: '桌台叫号模式'
				}, {
					value: '2',
					label: '流水叫号模式'
				}],

				//预定日期
				dateList: [{
					value: '1',
					label: '当天'
				}, {
					value: '2',
					label: '明天'
				}, {
					value: '3',
					label: '后天'
				}],

				//预定时间
				timeList: [{
					value: 0,
					label: '半小时'
				}, {
					value: 1,
					label: '一小时'
				}],

				//请求设置模式
				reqSetting: {
					session: '',
					shopId: '',
					pattern: '',
					reserveStatus: '1',
					reserveFlag: '',
					reserveUnit: ''
				}
			};
		},

		watch: {
			modelDialog() {
				this.$parent.modelStatus = false;
			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		created() {
			//请求店铺信息
			xhr({
				url: shop.getShopInfo,
				options: {
					session: this.session,
					shopId: this.shopId
				}
			}).then((res) => {
				if(res.getShopInfo) {
					let info = res.getShopInfo;

					this.reqSetting.pattern = info.pattern;
					this.reqSetting.reserveStatus = info.reserve_status;
					this.reqSetting.reserveFlag = info.reserve_flag;
					this.reqSetting.reserveUnit = info.reserve_unit;
				}
			});
		},

		methods: {
			//更新
			update() {
				//如果是流水叫号模式，其他字段为空
				if(this.reqSetting.pattern == '2') {
					this.reqSetting.reserveStatus = '';
					this.reqSetting.reserveFlag = '';
					this.reqSetting.reserveUnit = '';
				}

				this.reqSetting.session = this.session;
				this.reqSetting.shopId = this.shopId;

				xhr({
					url: shop.updatePlan,
					options: this.reqSetting
				}).then((res) => {
					if(res.updateShopPlan) {
						this.$message({
							message: '更新成功！',
							type: 'success'
						});
						this.modelDialog = false;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.model-wrap {
		.el-form {
			width: 400px;
			margin: 0 auto;
		}
		.el-dialog__body {
			padding: 30px 0;
		}
	}
	/*模式介绍*/
	
	.intro-wrap {
		width: 100%;
		height: auto;
		background: #F3F3F3;
		padding: 30px 75px;
		margin-bottom: 0;
		li:first-child {
			margin-bottom: 30px;
		}
		h1 {
			margin-bottom: 20px;
			font-weight: normal;
		}
		p {
			margin: 0;
		}
	}
</style>