<template>
	<div class="cate-sel">
		<ui-dialog title="选择菜品类别" v-model="dialogSel">
			<ui-form>
				<ui-collapse v-for="(list, index) in platList" :key="index">
					<ui-collapse-item :title="list.platformCategory.categoryTitle">
						<ui-checkbox-group v-model="perList" v-for="(item, i) in list.platformCategoryList" :key="i" class="cate-list" v-on:change="selCate">
							<ui-checkbox :label="item.id" :disabled="item.disabled">{{item.categoryTitle}}</ui-checkbox>
						</ui-checkbox-group>
					</ui-collapse-item>
				</ui-collapse>
			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogSel = false">取消</ui-button>
				<ui-button type="primary" v-on:click="sel">确定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { mealCate } from 'service/api'
	import { mapGetters } from 'vuex'

	//保存当前店铺初始选择的类别
	let selList = [];

	//店铺新选择的系统类别id
	let addList = [];

	export default {

		data: function() {
			return {
				//模态框
				dialogSel: true,

				//请求系统提供类别数据
				reqPlat: {
					session: ''
				},
				platList: [],

				//请求用户已经选择类别数据
				reqPer: {
					session: '',
					shopId: ''
				},
				perList: [],

				//请求用户新选择类别数据
				reqSel: {
					session: '',
					shopId: '',
					json: ''
				}
			};
		},

		watch: {
			//动态控制模态框显示隐藏
			dialogSel: function() {
				this.$parent.isShowSel = false;
			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		created: function() {
			this.reqPlat.session = this.session;
			this.reqPlat.shopId = this.shopId;

			//获取系统默认类别
			xhr({
				url: mealCate.platCate,
				options: this.reqPlat
			}).then((res) => {
				this.platList = res.success;

				//设置选中属性
				if(this.platList) {
					let len = this.platList.length;
					for(let i = 0; i < len; i++) {
						for(let j = 0; j < this.platList[i].platformCategoryList.length; j++) {
							this.platList[i].platformCategoryList[j].disabled = false;
						}
					}
				}

				this.reqPer.session = this.session;
				this.reqPer.shopId = this.shopId;
				//获取当前店铺所选类别
				xhr({
					url: mealCate.getShopCate,
					options: this.reqPer
				}).then((res) => {
					if(res.info) {
						this.perList = res.info;
						selList = this.perList;

						//设置选中状态
						if(this.platList) {
							let len = this.platList.length;
							for(let i = 0; i < len; i++) {
								for(let j = 0; j < this.platList[i].platformCategoryList.length; j++) {
									for(let k = 0; k < this.perList.length; k++) {
										if(this.perList[k] == this.platList[i].platformCategoryList[j].id) {
											this.platList[i].platformCategoryList[j].disabled = true;
										}
									}
								}
							}
						}
					}
				})
			})

		},

		methods: {
			//选择主类别
			selCate(event) {
				//设置选中状态
				let changeList = event;
				let tmp = changeList.concat(selList);

				//获取新选择的类别id
				function getList() {
					let newList = [];

					for(let i = 0; i < changeList.length; i++) {
						var flag = false;
						for(let j = 0; j < selList.length; j++) {
							if(changeList[i] == selList[j]) {
								flag = true;
							}
						}
						if(!flag) {
							newList.push(changeList[i]);
						}
					}

					return newList;
				}

				addList = getList();
			},

			//确认新选择主类别
			sel() {
				//店铺新选择的系统类别信息
				let addInfo = [];
				let len = this.platList.length;
				for(let i = 0; i < len; i++) {
					for(let j = 0; j < this.platList[i].platformCategoryList.length; j++) {
						for(let k = 0; k < this.perList.length; k++) {
							if(addList[k] == this.platList[i].platformCategoryList[j].id) {
								let info = this.platList[i].platformCategoryList[j];
								addInfo.push({
									id: info.id,
									categoryTitle: info.categoryTitle,
									picUrl: info.picUrl,
									orderNum: info.orderNum
								});
							}
						}
					}
				}

				this.reqSel.json = JSON.stringify(addInfo);
				this.reqSel.session = this.session;
				this.reqSel.shopId = this.shopId;

				//确认选择
				xhr({
					url: mealCate.addShopCate,
					options: this.reqSel
				}).then((res) => {
					this.$message({
						message: '添加成功！',
						type: 'success'
					});
					this.dialogSel = false;
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate-sel .el-form .el-collapse {
		border: 0;
		border-bottom: 1px solid #DDDDDD;
	}
	
	.cate-sel .el-form .el-collapse-item__wrap {
		border: 0;
	}
	
	.cate-sel .cate-list {
		float: left;
		width: 16.667%;
		margin-bottom: 20px;
	}
</style>