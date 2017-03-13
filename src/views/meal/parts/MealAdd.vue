<template>
	<div class="view-add">
		<ui-dialog title="添加菜品" v-model="dialogAdd">
			<ui-form>
				<ui-form-item label="上传菜品缩略图" :label-width="formLabelWidth">
					<ui-upload class="avatar-uploader" action="//jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload">
						<img v-if="reqAdd.icon" :src="reqAdd.icon" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</ui-upload>
					<span class="icon-prompt">注：150px*150px，文件大小80kb，文件格式JPG、JPEG、PNG</span>
				</ui-form-item>

				<ui-form-item label="菜品名称" :label-width="formLabelWidth" class="item-inline">
					<ui-input v-model="reqAdd.title" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="菜品类型" :label-width="formLabelWidth" class="item-inline">
					<ui-select v-model="reqAdd.categoryId" placeholder="请选择菜品类别">
						<ui-option v-for="(item, index) in shopCategorys" :label="item.categoryTitle" :value="item.categoryId" :key="index"></ui-option>
					</ui-select>
				</ui-form-item>

				<ui-form-item label="辣度" :label-width="formLabelWidth" class="item-inline">
					<ui-select v-model="reqAdd.categoryId" placeholder="请选择辣度">
						<ui-option v-for="(item, index) in shopCategorys" :label="item.categoryTitle" :value="item.categoryId" :key="index"></ui-option>
					</ui-select>
				</ui-form-item>

				<ui-form-item label="排序" :label-width="formLabelWidth" class="item-inline">
					<ui-input auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="单位" :label-width="formLabelWidth" class="item-inline">
					<ui-input v-model="reqAdd.unit" auto-complete="off"></ui-input>
				</ui-form-item>

				<ui-form-item label="原价" :label-width="formLabelWidth" class="item-inline item-prompt">
					<ui-input v-model="reqAdd.originalPrice" auto-complete="off" v-on:change="calPrice"></ui-input>
					<span class="prompt">元</span>
				</ui-form-item>

				<ui-form-item label="促销方式" :label-width="formLabelWidth">
					<ui-checkbox :checked="saleChecked" v-on:change="saleWay(0)">该菜品参与打折或优惠</ui-checkbox>
				</ui-form-item>

				<div v-show="saleChecked">
					<ui-form-item label="打折" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-radio class="radio" v-model="reqAdd.promType" label="1" v-on:change.native="saleWay(1)">&nbsp;</ui-radio>
						<ui-input v-model="reqAdd.discountRate" auto-complete="off" :disabled="discountFlag" v-on:change="calPrice"></ui-input>
						<span class="prompt">折</span>
					</ui-form-item>

					<ui-form-item label="优惠" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-radio class="radio" v-model="reqAdd.promType" label="2" v-on:change.native="saleWay(2)">&nbsp;</ui-radio>
						<ui-input v-model="reqAdd.favorablePrice" auto-complete="off" :disabled="favoFlag" v-on:change="calPrice"></ui-input>
						<span class="prompt">元</span>
					</ui-form-item>

					<ui-form-item label="售价" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-input v-model="reqAdd.price" auto-complete="off" disabled></ui-input>
						<span class="prompt">元</span>
					</ui-form-item>
					<ui-form-item label="售价" :label-width="formLabelWidth" class="item-inline item-prompt">
						<ui-input v-model="reqAdd.price" auto-complete="off" disabled></ui-input>
						<span class="prompt">元</span>
					</ui-form-item>
				</div>

				<ui-form-item label="菜品状态" :label-width="formLabelWidth">
					<ui-radio class="radio" v-model="reqAdd.status" label="1">上架</ui-radio>
					<ui-radio class="radio" v-model="reqAdd.status" label="2">下架</ui-radio>
				</ui-form-item>

				<ui-form-item label="是否推荐" :label-width="formLabelWidth">
					<ui-checkbox>推荐</ui-checkbox>
				</ui-form-item>

			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="dialogAdd = false">取 消</ui-button>
				<ui-button type="primary" v-on:click="add">确 定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { meal } from 'service/api'

	const session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ';
	const shopId = 13;

	export default {

		data: function() {
			return {
				//模态框
				dialogAdd: true,

				//label宽度
				formLabelWidth: '120px',

				//是否促销
				saleChecked: false,

				//打折
				discountFlag: true,

				//优惠
				favoFlag: true,

				//请求类别
				reqCate: {
					session: session,
					shopId: shopId,
					type: 1
				},
				shopCategorys: [],

				//发送新增菜品请求
				reqAdd: {
					session: session,
					shopId: shopId,
					categoryId: '',
					icon: '',
					title: '',
					unit: '',
					originalPrice: '',
					price: '',
					promType: '0',
					favorablePrice: '',
					discountRate: '',
					orderNum: 1,
					status: '1'
				}
			};
		},

		watch: {
			//动态控制模态框显示隐藏
			dialogAdd: function() {
				this.$emit('addModalTrans');
			}
		},

		created: function() {
			//查询当前店铺菜品类型
			xhr({
				url: meal.getShopCategorys,
				options: this.reqCate
			}).then((res) => {
				this.shopCategorys = res.info;
			})
		},

		methods: {
			//上传图片
			handleAvatarScucess: function(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload: function(file) {
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

			//选择促销方式
			saleWay: function(type) {
				if(type == 0) {
					this.saleChecked = !this.saleChecked;
					if(!this.saleChecked) {
						this.reqAdd.promType = '0';
					}

					this.discountFlag = true;
					this.favoFlag = true;
				} else if(type == 1) {
					this.discountFlag = false;
					this.favoFlag = true;
					this.reqAdd.favorablePrice = '';
				} else if(type == 2) {
					this.discountFlag = true;
					this.favoFlag = false;
					this.reqAdd.discountRate = '';
				}
			},

			//计算售价
			calPrice: function() {
				if(this.reqAdd.promType == 0) {
					this.reqAdd.price = parseFloat(this.reqAdd.originalPrice);
				} else if(this.reqAdd.promType == 1) {
					this.reqAdd.price = parseFloat(this.reqAdd.originalPrice) * parseFloat(this.reqAdd.discountRate);
				} else if(this.reqAdd.promType == 2) {
					this.reqAdd.price = parseFloat(this.reqAdd.originalPrice) - parseFloat(this.reqAdd.favorablePrice);
				}

				if(!this.reqAdd.price && this.reqAdd.price != 0) {
					this.reqAdd.price = this.reqAdd.originalPrice;
				}
			},

			//添加菜品
			add: function() {
				xhr({
					url: meal.addShopItem,
					options: this.reqAdd
				}).then((res) => {
					if(res.info == 1) {
						console.log(res)
						alert('添加菜品成功');
						this.dialogAdd = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader {
		display: inline-block;
		width: 140px;
		vertical-align: middle;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.avatar-uploader .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 120px;
		height: 120px;
		line-height: 120px;
		text-align: center;
	}
	
	.el-form-item__content {
		line-height: 1.2;
	}
	
	.icon-prompt {
		display: inline-block;
		width: auto;
		vertical-align: middle;
		word-break: normal;
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow: hidden;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.item-inline {
		display: inline-block;
		width: 45%;
		position: relative;
	}
	
	.item-prompt .el-input {
		position: relative;
	}
	
	.item-prompt .prompt {
		position: absolute;
		right: -20px;
		top: 0;
	}
	
	.item-inline .el-radio {
		position: absolute;
		left: -70px;
		top: 0;
	}
</style>