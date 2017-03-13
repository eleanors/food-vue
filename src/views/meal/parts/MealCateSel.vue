<template>
	<div class="view-sel">
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

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

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
					session: session
				},
				platList: [],

				//请求用户已经选择类别数据
				reqPer: {
					session: session,
					shopId: shopId
				},
				perList: [],

				//请求用户新选择类别数据
				reqSel: {
					session: session,
					shopId: shopId,
					json: ''
				}
			};
		},
		
		watch: {
			//动态控制模态框显示隐藏
			dialogSel: function() {
				this.$emit('selModalTrans');
			}
		},

		created: function() {
			//获取系统默认类别
			xhr({
				url: mealCate.platCate,
				options: this.reqPlat
			}).then((res) => {
				this.platList = res.success;

				//设置选中属性
				let len = this.platList.length;
				for(let i = 0; i < len; i++) {
					for(let j = 0; j < this.platList[i].platformCategoryList.length; j++) {
						this.platList[i].platformCategoryList[j].disabled = false;
					}
				}

				//获取当前店铺所选类别
				xhr({
					url: mealCate.getShopCate,
					options: this.reqPer
				}).then((res) => {
					if(res.info) {
						this.perList = res.info;
						selList = this.perList;

						//设置选中状态
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

						//测试
						//this.platList[1].platformCategoryList[0].disabled = false;
						//this.perList.pop();
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

				//确认选择
				xhr({
					url: mealCate.addShopCate,
					options: this.reqSel
				}).then((res) => {
					alert('选择主类别成功！');
					this.dialogSel = false;
				})
			}
		}
	}
</script>

<style lang="scss">
	.el-form .el-collapse {
		border: 0;
		border-bottom: 1px solid #DDDDDD;
	}
	
	.el-form .el-collapse-item__wrap {
		border: 0;
	}
	
	.cate-list {
		float: left;
		width: 16.667%;
		margin-bottom: 20px;
	}
</style>