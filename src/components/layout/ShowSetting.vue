<template>
	<div class="show-wrap">
		<ui-dialog title="展示设置" v-model="showDialog">
			<ui-form ref="form" :inline="true" label-width="formLabelWidth">
				<ui-form-item label="上传APP首页展示图" class="app-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopBannerPicUrl" :src="reqData.shopBannerPicUrl" class="avatar" name="shopBannerPicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="shopBannerPicUrl"></i>
						</ui-upload>
						<span class="icon-prompt ellipsis">注：上传图片720px*386px，500kb，文件格式GIF、JPG、JPEG、PNG</span>
					</div>
				</ui-form-item>

				<ui-form-item label="上传餐厅门头图片" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopFacePicUrl" :src="reqData.shopFacePicUrl" class="avatar" name="shopFacePicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="shopFacePicUrl"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传餐厅图片" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopPicUrlOne" :src="reqData.shopPicUrlOne" class="avatar" name="shopPicUrlOne">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="shopPicUrlOne"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传餐厅图片" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopPicUrlTwo" :src="reqData.shopPicUrlTwo" class="avatar" name="shopPicUrlTwo">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="shopPicUrlTwo"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传餐厅图片" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopPicUrlThree" :src="reqData.shopPicUrlThree" class="avatar" name="shopPicUrlThree">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="shopPicUrlThree"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传餐厅图片" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopPicUrlFour" :src="reqData.shopPicUrlFour" class="avatar" name="shopPicUrlFour">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="shopPicUrlFour"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<p class="pic-prompt">注：上传图片文件大小3Mb，文件格式GIF、JPG、JPEG、PNG</p>
			</ui-form>
			<div slot="footer" class="dialog-footer">
				<ui-button v-on:click="showDialog = false">取 消</ui-button>
				<ui-button type="primary" v-on:click="confirm">确 定</ui-button>
			</div>
		</ui-dialog>
	</div>
</template>

<script>
	import xhr from 'service'
	import { shop, upload } from 'service/api'
	import { mapGetters } from 'vuex'

	export default {

		data: function() {
			return {
				//是否显示
				showDialog: true,

				//label 宽度
				formLabelWidth: '120px',

				reqData: {
					session: '',
					shopId: '',
					shopBannerPicUrl: '',
					shopFacePicUrl: '',
					shopPicUrlOne: '',
					shopPicUrlTwo: '',
					shopPicUrlThree: '',
					shopPicUrlFour: ''
				}
			};
		},

		watch: {
			showDialog() {
				this.$parent.showStatus = false;
			}
		},

		computed: {
			...mapGetters(['session', 'shopId'])
		},

		created() {
			//请求当前店铺信息
			xhr({
				url: shop.getShopInfo,
				options: {
					session: this.session,
					shopId: this.shopId
				}
			}).then((res) => {
				if(res.getShopInfo) {
					let info = res.getShopInfo;
					this.reqData.shopBannerPicUrl = info.logo;
					this.reqData.shopFacePicUrl = info.shop_inside_pic_url;
					this.reqData.shopPicUrlOne = info.shop_pic_url_one;
					this.reqData.shopPicUrlTwo = info.shop_pic_url_two;
					this.reqData.shopPicUrlThree = info.shop_pic_url_three;
					this.reqData.shopPicUrlFour = info.shop_pic_url_four;
				}
			});
		},

		methods: {
			//上传图片
			uploadJudge(event) {
				let name = event.target.name || event.target.getAttribute('name');

				if(name) {
					this.imageType = name;
				}
			},

			beforeAvatarUpload(file) {
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
						for(let i in self.reqData) {
							if(i == self.imageType) {
								self.reqData[i] = res.url;
							}
						}
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

			//更新店铺展示设置
			confirm() {
				this.reqData.session = this.session;
				this.reqData.shopId = this.shopId;

				xhr({
					url: shop.updateSetUp,
					options: this.reqData
				}).then((res) => {
					if(res.updateShopSetUp) {
						this.showDialog = false;
						this.$message({
							message: '展示设置修改成功！',
							type: 'success'
						});
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	/*上传图片*/
	
	.show-wrap {
		.avatar-uploader {
			width: 100px;
			height: 100px;
			.el-upload {
				width: 100%;
				height: 100%;
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}
			img {
				width: 100px;
				height: 100px;
			}
		}
	}
	
	.show-wrap .el-form-item__content .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.show-wrap .avatar-uploader .avatar-uploader-icon {
		width: 100px!important;
		height: 100px!important;
		line-height: 100px!important;
	}
	
	.show-wrap .avatar {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.show-wrap {
		.app-item {
			width: 100%;
			margin-right: 0;
			margin-bottom: 60px;
			position: relative;
			.el-form-item__content {
				width: 100%;
				height: 100px;
			}
			.avatar-uploader {
				display: inline-block;
				width: 130px;
				height: 100%;
			}
			.el-upload {
				display: block;
				width: 100px;
				margin: 0 auto;
			}
			label {
				width: 130px!important;
				text-align: center;
				position: absolute;
				left: 0;
				bottom: -35px;
				padding-right: 0;
			}
		}
		.pic-item {
			width: 130px;
			margin-right: 15px!important;
			margin-bottom: 40px!important;
			position: relative;
			.el-form-item__content {
				width: 100px;
				height: 100px;
				display: block!important;
				margin: 0 auto;
				.avatar-uploader {
					width: 100%;
					height: 100%;
				}
			}
			label {
				width: 100%!important;
				text-align: center;
				position: absolute;
				left: 0;
				bottom: -35px;
				padding-right: 0;
			}
		}
	}
	
	.show-wrap {
		.icon-prompt {
			display: inline-block;
			width: auto;
			vertical-align: middle;
			color: #FBBA00;
			position: absolute;
			left: 150px;
			top: 50%;
			transform: translateY(-50%);
		}
		.pic-prompt {
			padding-left: 20px;
			color: #fbba00;
			line-height: 20px;
		}
	}
</style>