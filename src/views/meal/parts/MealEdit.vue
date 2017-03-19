<template>
	<div class="meal-edit">
		<ui-dialog title="编辑菜品" v-model="dialogEdit">
			<ui-form :model="reqEdit" :rules="rules">
				<ui-form-item label="上传菜品缩略图" :label-width="formLabelWidth" class="pic-item">
					<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
						<img v-if="reqEdit.icon" :src="reqEdit.icon" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</ui-upload>
					<span class="icon-prompt">注：150px*150px，文件大小80kb，文件格式JPG、JPEG、PNG</span>
				</ui-form-item>

				<ui-form-item label="菜品名称" :label-width="formLabelWidth" class="item-inline">
					<ui-input v-model="reqEdit.title" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="菜品类型" :label-width="formLabelWidth" class="item-inline">
					<ui-select v-model="reqEdit.categoryId" placeholder="请选择菜品类别">
						<ui-option v-for="(item, index) in shopCategorys" :label="item.categoryTitle" :value="item.categoryId" :key="index"></ui-option>
					</ui-select>
				</ui-form-item>

				<ui-form-item label="辣度" :label-width="formLabelWidth" class="item-inline">
					<ui-select v-model="reqEdit.pepperLevel" placeholder="请选择辣度">
						<ui-option v-for="(item, index) in pepperList" :label="item.name" :value="item.code" :key="index"></ui-option>
					</ui-select>
				</ui-form-item>

				<ui-form-item label="原价" :label-width="formLabelWidth" class="item-inline item-prompt">
					<ui-input v-model="reqEdit.originalPrice" auto-complete="off" v-on:change="calPrice"></ui-input>
					<span class="prompt">元</span>
				</ui-form-item>

				<ui-form-item label="全美食价" :label-width="formLabelWidth" class="item-inline item-prompt">
					<ui-input v-model="reqEdit.discountRate" auto-complete="off" v-on:change="calPrice" placeholder="0.0至9.0"></ui-input>
					<span class="prompt">折</span>
					<div class="sale">
						<i>{{price}}</i>
						<em>元</em>
					</div>
				</ui-form-item>

				<ui-form-item label="是否推荐" :label-width="formLabelWidth">
					<ui-checkbox v-model="recommendFlag">推荐</ui-checkbox>
				</ui-form-item>

				<!-- ---------------------一期不上  ----------------------- -->
				<!--<ui-form-item label="排序" :label-width="formLabelWidth" class="item-inline">
					<ui-input auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="单位" :label-width="formLabelWidth" class="item-inline">
					<ui-input v-model="reqEdit.unit" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="促销方式" :label-width="formLabelWidth">
					<ui-checkbox :checked="saleChecked" v-on:change="saleWay(0)">该菜品参与打折或优惠</ui-checkbox>
				</ui-form-item>

				<div v-show="saleChecked">
					<ui-form-item label="打折" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-radio class="radio" v-model="reqEdit.promType" label="1" v-on:change.native="saleWay(1)">&nbsp;</ui-radio>
						<ui-input v-model="reqEdit.discountRate" auto-complete="off" :disabled="discountFlag" v-on:change="calPrice"></ui-input>
						<span class="prompt">折</span>
					</ui-form-item>

					<ui-form-item label="优惠" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-radio class="radio" v-model="reqEdit.promType" label="2" v-on:change.native="saleWay(2)">&nbsp;</ui-radio>
						<ui-input v-model="reqEdit.favorablePrice" auto-complete="off" :disabled="favoFlag" v-on:change="calPrice"></ui-input>
						<span class="prompt">元</span>
					</ui-form-item>

					<ui-form-item label="售价" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-input v-model="reqEdit.price" auto-complete="off" disabled></ui-input>
						<span class="prompt">元</span>
					</ui-form-item>
					<ui-form-item label="售价" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-input v-model="reqEdit.price" auto-complete="off" disabled></ui-input>
						<span class="prompt">元</span>
					</ui-form-item>
				</div>

				<ui-form-item label="菜品状态" :label-width="formLabelWidth">
					<ui-radio class="radio" v-model="reqEdit.status" label="1">上架</ui-radio>
					<ui-radio class="radio" v-model="reqEdit.status" label="2">下架</ui-radio>
				</ui-form-item>-->

			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogEdit = false">取 消</ui-button>
				<ui-button type="primary" v-on:click="edit">确 定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { meal, upload } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {
		data: function() {
			//自定义验证规则
			//折扣
			var validateRate = (rule, value, callback) => {
				if(value >= 0 && value <= 9.0) {
					callback();
				} else {
					callback(new Error('请输入0.0至9.0的折扣价'));
				}
			};

			return {
				//表单验证
				rules: {
					discountRate: [
						{ validator: validateRate, trigger: 'change' }
					]
				},

				//是否显示菜品缩略图
				isIcon: true,

				//模态框
				dialogEdit: true,

				//label宽度
				formLabelWidth: '120px',

				//选择促销方式
				saleChecked: false,

				//打折
				discountFlag: true,

				//优惠
				favoFlag: true,

				//是否推荐
				recommendFlag: false,

				//请求当前菜品信息
				reqInfo: {
					session: '',
					id: this.editId
				},

				//菜品类别
				reqCate: {
					session: '',
					shopId: '',
					type: 1
				},
				shopCategorys: [],

				//请求数据
				reqEdit: {
					session: '',
					shopId: '',
					id: this.editId,
					categoryId: '',
					icon: '',
					title: '',
					pepperLevel: '',
					originalPrice: '',
					price: '',
					discountRate: '',
					isRecommend: '',

					/*promType: '0',
					favorablePrice: '',
					status: '1',
					unit: ''*/
				},

				//辣度
				pepperList: []
			};
		},

		props: ['editId'],

		watch: {
			//动态控制模态框显示隐藏
			dialogEdit: function() {
				this.$parent.isShowEdit = false;
			}
		},

		computed: {
			price() {
				let price = parseFloat(this.reqEdit.originalPrice) * parseFloat(this.reqEdit.discountRate / 10);
				if(isNaN(price)) {
					return;
				}

				if(!price) {
					price = this.reqEdit.originalPrice;
				}

				//强制保留两位小数
				price = Math.round(price * 100) / 100;
				price = price.toString();
				var rs = price.indexOf('.');
				if(rs < 0) {
					rs = price.length;
					price += '.';
				}
				while(price.length <= rs + 2) {
					price += '0';
				}

				return price;
			},

			...mapGetters(['session', 'shopId'])
		},

		created: function() {
			this.reqInfo.session = this.session;
			this.reqInfo.shopId = this.shopId;

			//查询当前菜品信息
			xhr({
				url: meal.getShopItemById,
				options: this.reqInfo
			}).then((res) => {
				if(res.info) {
					var info = res.info;
					this.reqEdit.categoryId = info.categoryId;
					this.reqEdit.icon = info.icon;
					this.reqEdit.title = info.title;
					this.reqEdit.originalPrice = info.originalPrice;
					this.reqEdit.price = info.price;
					this.reqEdit.discountRate = info.discountRate;
					this.reqEdit.isRecommend = info.isRecommend;
					this.reqEdit.pepperLevel = info.pepperLevel.toString();

					if(info.isRecommend == '1') {
						this.recommendFlag = true;
					} else {
						this.recommendFlag = false;
					}

					//一期不上
					/*this.reqEdit.unit = info.unit;
					this.reqEdit.promType = info.promType.toString();
					this.reqEdit.favorablePrice = info.favorablePrice;
					this.reqEdit.status = info.status.toString();*/

					//一期不上
					/*if(info.promType == 0) {
						this.saleChecked = false;
						this.discountFlag = true;
						this.favoFlag = true;
					} else if(info.promType == 1) {
						this.saleChecked = true;
						this.discountFlag = false;
						this.favoFlag = true;
					} else if(info.promType == 2) {
						this.saleChecked = true;
						this.discountFlag = true;
						this.favoFlag = true;
					}*/

				}
			});

			this.reqCate.session = this.session;
			this.reqCate.shopId = this.shopId;
			//查询当前店铺菜品类型
			xhr({
				url: meal.getShopCategorys,
				options: this.reqCate
			}).then((res) => {
				this.shopCategorys = res.info;
			});

			//查询辣度
			xhr({
				url: meal.pepperLevel,
				options: {
					session: this.session
				}
			}).then((res) => {
				if(res.info) {
					this.pepperList = res.info;
				}
			})
		},

		methods: {
			//上传图片
			beforeAvatarUpload: function(file) {
				let self = this;

				let reader = new FileReader();
				// 将文件以Data URL形式读入页面
				reader.readAsDataURL(file);
				reader.onload = function() {
					xhr({
						url: upload.img,
						options: {
							photoStr: this.result
						}
					}).then((res) => {
						self.reqEdit.icon = res.url;
					})
				}

				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},

			//确认编辑菜品
			edit: function() {
				//是否推荐
				if(this.recommendFlag) {
					this.reqEdit.isRecommend = '1';
				} else {
					this.reqEdit.isRecommend = '0';
				}

				this.reqEdit.price = this.price;
				this.reqEdit.session = this.session;
				this.reqEdit.shopId = this.shopId;
				
				xhr({
					url: meal.updateShopItem,
					options: this.reqEdit
				}).then((res) => {
					if(res.info == 1) {
						this.$message({
							message: '编辑成功！',
							type: 'success'
						});
					}
					this.dialogEdit = false;
				})
			},

			//  *************************一期不上****************************//	
			/*
			//选择促销方式
			saleWay: function(type) {
				if(type == 0) {
					this.saleChecked = !this.saleChecked;
					if(!this.saleChecked) {
						this.reqEdit.promType = '0';
					}

					this.discountFlag = true;
					this.favoFlag = true;
				} else if(type == 1) {
					this.discountFlag = false;
					this.favoFlag = true;
					this.reqEdit.favorablePrice = '';
				} else if(type == 2) {
					this.discountFlag = true;
					this.favoFlag = false;
					this.reqEdit.discountRate = '';
				}
			},

			//计算售价
			calPrice: function() {
				if(this.reqEdit.promType == 0) {
					this.reqEdit.price = parseFloat(this.reqEdit.originalPrice);
				} else if(this.reqEdit.promType == 1) {
					this.reqEdit.price = parseFloat(this.reqEdit.originalPrice) * parseFloat(this.reqEdit.discountRate);
				} else if(this.reqEdit.promType == 2) {
					this.reqEdit.price = parseFloat(this.reqEdit.originalPrice) - parseFloat(this.reqEdit.favorablePrice);
				}

				if(!this.reqEdit.price && this.reqEdit.price != 0) {
					this.reqEdit.price = this.reqEdit.originalPrice;
				}
			},*/

			//一期计算售价
			calPrice: function() {

			},
		}
	}
</script>

<style lang="scss">
	.meal-edit .avatar-uploader .el-upload {
		width: 100%;
		height: 100%;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.meal-edit .avatar-uploader {
		display: inline-block;
		width: 140px;
		height: 140px;
		vertical-align: middle;
		overflow: hidden;
	}
	
	.meal-edit .avatar-uploader img {
		width: 100%;
		height: 100%;
	}
	
	.meal-edit .avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.meal-edit .avatar-uploader .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 120px;
		height: 120px;
		line-height: 120px;
		text-align: center;
	}
	
	.pic-item .el-form-item__content {
		line-height: 1.2;
	}
	
	.meal-edit .icon-prompt {
		display: inline-block;
		width: auto;
		vertical-align: middle;
		word-break: normal;
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow: hidden;
		color: #FBBA00;
	}
	
	.meal-edit .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.meal-edit .item-inline {
		position: relative;
	}
	
	.meal-edit .item-prompt .el-input {
		position: relative;
	}
	
	.meal-edit .item-prompt .prompt {
		position: absolute;
		right: -20px;
		top: 0;
	}
	
	.meal-edit .item-inline .el-radio {
		position: absolute;
		left: -70px;
		top: 0;
	}
</style>