<template>
	<div class="updateShop">
		<!--店铺信息-->
		<div v-if="!mapShow">
			<ui-form :inline="true" label-width="120px" class="shop-form" :rules="rules" :model="reqData">
				<ui-form-item label="上传餐厅LOGO" class="logo-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.logo" :src="reqData.logo" class="avatar" name="logo">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="logo"></i>
						</ui-upload>
					</div>

					<span class="logo-prompt">注：150px*150px，文件大小80kb，文件格式JPG、JPEG、PNG</span>
				</ui-form-item>

				<ui-form-item label="餐厅名称" prop="shopName">
					<ui-input v-model="reqData.shopName"></ui-input>
				</ui-form-item>

				<ui-form-item label="餐厅电话" prop="tel">
					<ui-input v-model="reqData.tel"></ui-input>
				</ui-form-item>

				<ui-form-item label="餐厅类型">
					<ui-select v-model="reqData.cateringType" placeholder="请选择">
						<ui-option v-for="(item,index) in shopTypes" :label="item.name" :value="item.code" :key="index">
						</ui-option>
					</ui-select>
				</ui-form-item>

				<ui-form-item label="经营者">
					<ui-input v-model="reqData.legalPerson"></ui-input>
				</ui-form-item>

				<ui-form-item label="我的店铺码">
					<ui-input v-model="reqData.shopCode"></ui-input>
				</ui-form-item>

				<ui-form-item label="推荐人编码">
					<ui-input v-model="reqData.recommendCode"></ui-input>
				</ui-form-item>

				<ui-form-item label="营业时间" class="time-item">
					<ui-time-select placeholder="起始时间" v-model="reqData.businessStart" :picker-options="{start: '06:00',step: '00:30',end: '23:30'}">
					</ui-time-select>
					<span class="time-to">至</span>
					<ui-time-select placeholder="结束时间" v-model="reqData.businessEnd" :picker-options="{start: '06:00',step: '00:30',end: '23:30',minTime: reqData.businessStart}">
					</ui-time-select>
				</ui-form-item>

				<ui-form-item label="餐厅地址" class="location-item">
					<ui-select v-model="provinceId" placeholder="请选择省/直辖市">
						<ui-option v-for="(item,index) in provinceList" :label="item.province" :value="item.provinceId" :key="index">
						</ui-option>
					</ui-select>
					<ui-select v-model="cityId" placeholder="请选择市">
						<ui-option v-for="(item,index) in cityList" :label="item.city" :value="item.cityId" :key="index">{{item.city}}
						</ui-option>
					</ui-select>
					<ui-select v-model="districtId" placeholder="请选择区/县">
						<ui-option v-for="(item,index) in districtList" :label="item.district" :value="item.districtId" :key="index">
						</ui-option>
					</ui-select>
					<ui-select v-model="circleId" placeholder="请选择商圈">
						<ui-option v-for="(item,index) in circleList" :label="item.businessCirclName" :value="item.id" :key="index">
						</ui-option>
					</ui-select>
				</ui-form-item>

				<ui-form-item label="街道地址" class="address-item">
					<ui-input v-model="address"></ui-input>
					<span class="input-prompt address" v-on:click="handleAddress"></span>
				</ui-form-item>

			</ui-form>

			<ui-form ref="form" :inline="true" label-width="120px" class="shop-form">
				<ui-form-item label="营业执照号">
					<ui-input v-model="reqData.businessLicenseNo"></ui-input>
				</ui-form-item>

				<ui-form-item label="身份证号">
					<ui-input v-model="reqData.idcardNo"></ui-input>
				</ui-form-item>

				<ui-form-item label="店铺面积">
					<ui-input v-model="reqData.area"></ui-input>
					<span class="input-prompt">㎡</span>
				</ui-form-item>

				<ui-form-item label="员工总数">
					<ui-input v-model="reqData.totalEmployee"></ui-input>
					<span class="input-prompt">人</span>
				</ui-form-item>

				<ui-form-item label="最大就餐人数">
					<ui-input v-model="reqData.maxDinePerson"></ui-input>
					<span class="input-prompt">人</span>
				</ui-form-item>

				<ui-form-item label="人均消费">
					<ui-input v-model="reqData.avgMoney"></ui-input>
					<span class="input-prompt">元</span>
				</ui-form-item>

				<ui-form-item label="经营年限">
					<ui-input v-model="reqData.businessYears "></ui-input>
					<span class="input-prompt">年</span>
				</ui-form-item>
			</ui-form>

			<ui-form ref="form" :inline="true" label-width="120px">
				<ui-form-item label="上传营业执照" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.licensePicUrl" :src="reqData.licensePicUrl" class="avatar" name="licensePicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="licensePicUrl"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传业主身份证照" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.idcardPicUrl" :src="reqData.idcardPicUrl" class="avatar" name="idcardPicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="idcardPicUrl"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传餐厅服务许可证" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.hygienePicUrl" :src="reqData.hygienePicUrl" class="avatar" name="hygienePicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="hygienePicUrl"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传店内场景照" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.shopInsidePicUrl" :src="reqData.shopInsidePicUrl" class="avatar" name="shopInsidePicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="licensePicUrl"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<ui-form-item label="上传厨房环境照" class="pic-item">
					<div v-on:click="uploadJudge">
						<ui-upload class="avatar-uploader" action="https://test.meia8.com/api-shop/" :show-file-list="false" :before-upload="beforeAvatarUpload">
							<img v-if="reqData.kitchenPicUrl" :src="reqData.kitchenPicUrl" class="avatar" name="kitchenPicUrl">
							<i v-else class="el-icon-plus avatar-uploader-icon" name="kitchenPicUrl"></i>
						</ui-upload>
					</div>
				</ui-form-item>

				<p class="pic-prompt">注：上传图片文件大小3Mb，文件格式GIF、JPG、JPEG、PNG</p>
			</ui-form>

			<ui-checkbox checked class="agreement">我已阅读过《全美食服务协议》</ui-checkbox>
			<ui-button class="submit" v-on:click="submit">更新店铺信息</ui-button>
		</div>

		<!--地图-->
		<view-map v-if="mapShow" v-bind:addressDetail="addressDetail" v-bind:lat="reqData.lat" v-bind:lng="reqData.lng" v-bind:positionSel="positionSel"></view-map>
	</div>

</template>

<script>
	import viewMap from './parts/Map'
	import xhr from 'service'
	import { shop, upload } from 'service/api'
	import {  mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
				imageType: '', // 判断上传哪张图片

				shopTypes: [], // 餐厅类型

				provinceList: [], // 省份列表

				provinceId: '', // 省份id

				cityList: [], // 城市列表

				cityId: '', // 城市id

				districtList: [], // 地区列表

				districtId: '', // 地区id

				circleList: [], // 商圈列表

				circleId: '', // 商圈Id

				address: '', // 详细地址

				reqData: {
					session: '',
					shopId: '',
					logo: '',
					shopName: '',
					tel: '',
					cateringType: '',
					legalPerson: '',
					shopCode: '',
					recommendCode: '',
					businessStart: '',
					businessEnd: '',
					provinceId: '',
					cityId: '',
					districtId: '',
					businessCirclId: '',
					province: '',
					city: '',
					district: '',
					businessCirclName: '',
					address: '',
					lat: '',
					lng: '',
					businessLicenseNo: '',
					idcardNo: '',
					area: '',
					totalEmployee: '',
					maxDinePerson: '',
					avgMoney: '',
					businessYears: '',
					licensePicUrl: '',
					idcardPicUrl: '',
					hygienePicUrl: '',
					shopInsidePicUrl: '',
					kitchenPicUrl: ''
				},

				//详细地址
				addressDetail: '',

				//显示、隐藏地图
				mapShow: false,

				//定位方式，true：按照经纬度；false：按照地理位置转换后的经纬度
				positionSel: true,

				//表单验证规则
				rules: {
					shopName: [
						{ required: true, message: '请输入餐厅名称', trigger: 'blur' },
						{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '餐厅电话不能为空', trigger: 'blur' },
						{ type: 'number', message: '餐厅电话必须为数值', trigger: 'blur' }
					]
				}
			}
		},

		components: {
			viewMap
		},

		watch: {
			//省份Id变化
			provinceId() {
				//改变城市
				xhr({
					url: shop.getCity,
					options: {
						session: this.session,
						id: this.provinceId
					}
				}).then((res) => {
					if(res.cityList) {
						if(this.provinceId != this.reqData.provinceId) {
							this.reqData.city = '';
							this.address = '';
							this.cityId = '';

							//根据省份id改变省份名称
							for(let i = 0; i < this.provinceList.length; i++) {
								if(this.provinceId == this.provinceList[i].provinceId) {
									this.reqData.province = this.provinceList[i].province;
								}
							}
						}
						this.cityList = res.cityList;

					}
				});

			},

			//城市Id变化
			cityId() {
				//改变地区
				xhr({
					url: shop.getDistrict,
					options: {
						session: this.session,
						id: this.cityId
					}
				}).then((res) => {
					if(res.districtList) {
						if(this.cityId != this.reqData.cityId) {
							this.reqData.district = '';
							this.districtId = '';

							//根据城市id改变城市名称
							for(let i = 0; i < this.cityList.length; i++) {
								if(this.cityId == this.cityList[i].cityId) {
									this.reqData.city = this.cityList[i].city;
								}
							}
						}
						this.districtList = res.districtList;
					}
				});
			},

			//地区Id变化
			districtId() {
				//改变商圈
				xhr({
					url: shop.getCircle,
					options: {
						session: this.session,
						id: this.districtId
					}
				}).then((res) => {
					if(res.getBusinessCircl) {
						if(this.districtId != this.reqData.districtId) {
							this.reqData.circle = '';
							this.circleId = '';

							//根据地区id改变地区名称
							for(let i = 0; i < this.districtList.length; i++) {
								if(this.districtId == this.districtList[i].districtId) {
									this.reqData.district = this.districtList[i].district;
								}
							}
						}
						this.circleList = res.getBusinessCircl;
					}
				});
			},

			//商圈Id变化
			circleId() {
				if(this.circleId != this.reqData.businessCirclId) {
					//改变地址
					this.address = '';

					//根据商圈id改变商圈名称
					for(let i = 0; i < this.circleList.length; i++) {
						if(this.circleId == this.circleList[i].id) {
							this.reqData.circle = this.circleList[i].businessCirclName;
						}
					}
				}
			},

			//改变详细地址
			address() {
				if(this.address != this.reqData.address) {
					this.positionSel = false;
				} else {
					this.positionSel = true;
				}
			}
		},
										
		computed: {
			...mapGetters(['session','shopId'])
		},

		created: function() {
			//餐厅类型
			xhr({
				url: shop.shopTypes,
				options: {
					session: this.session
				}
			}).then((res) => {
				if(res.getShopTypes) {
					this.shopTypes = res.getShopTypes;
				}
			});

			//请求省份
			xhr({
				url: shop.getProvince,
				options: {
					session: this.session
				}
			}).then((res) => {
				if(res.provinceList) {
					this.provinceList = res.provinceList;
				}
			});

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
					this.reqData.logo = info.logo;
					this.reqData.shopName = info.shop_name;
					this.reqData.tel = info.tel;
					this.reqData.cateringType = info.catering_type;
					this.reqData.legalPerson = info.legal_person;
					this.reqData.shopCode = info.shop_code;
					this.reqData.recommendCode = info.recommend_ode;
					this.reqData.businessStart = info.business_start;
					this.reqData.businessEnd = info.business_end;
					this.reqData.province = info.province;
					this.reqData.city = info.city;
					this.reqData.district = info.district;
					this.reqData.businessCirclName = info.business_circl_name;
					this.reqData.address = info.address;
					this.reqData.provinceId = info.province_id;
					this.reqData.cityId = info.city_id;
					this.reqData.districtId = info.district_id;
					this.reqData.businessCirclId = info.business_circl_id;

					this.province = info.province;
					this.city = info.city;
					this.district = info.district;
					this.circle = info.business_circl_name;
					this.address = info.address;
					this.provinceId = info.province_id;
					this.cityId = info.city_id;
					this.districtId = info.district_id;
					this.circleId = info.business_circl_id;

					this.reqData.lat = info.lat;
					this.reqData.lng = info.lng;
					this.reqData.businessLicenseNo = info.business_license_no;
					this.reqData.idcardNo = info.idcard_no;
					this.reqData.area = info.area;
					this.reqData.totalEmployee = info.total_employee;
					this.reqData.maxDinePerson = info.max_dine_person;
					this.reqData.avgMoney = info.avg_money;
					this.reqData.businessYears = info.business_years;
					this.reqData.licensePicUrl = info.license_pic_url;
					this.reqData.idcardPicUrl = info.idcard_pic_url;
					this.reqData.hygienePicUrl = info.hygiene_pic_url;
					this.reqData.shopInsidePicUrl = info.shop_inside_pic_url;
					this.reqData.kitchenPicUrl = info.kitchen_pic_url;
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

			//定位
			handleAddress() {
				this.addressDetail = this.reqData.province + this.reqData.city + this.reqData.district + this.address;
				this.mapShow = true;
			},

			//确认更新
			submit() {
				this.reqData.provinceId = this.provinceId;
				this.reqData.cityId = this.cityId;
				this.reqData.districtId = this.districtId;
				this.reqData.circleId = this.circleId;
				this.reqData.address = this.address;
				this.reqData.session = this.session;
				this.reqData.shopId = this.shopId;

				xhr({
					url: shop.updateShop,
					options: this.reqData
				}).then((res) => {
					if(res.updateShop == '1') {
						this.$message({
							message: '店铺信息修改成功！',
							type: 'success'
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.updateShop {
		overflow-x: hidden;
		position: relative;
	}
	
	.updateShop .el-form {
		padding: 50px 50px 28px 50px;
		margin-bottom: 20px;
		background: #fff;
	}
	/*输入框*/
	
	.updateShop .shop-form .el-form-item {
		margin-right: 80px!important;
	}
	
	.updateShop .el-input {
		width: 290px!important;
	}
	/*上传图片*/
	
	.updateShop .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.updateShop .el-form-item__content .el-upload:hover {
		border-color: #20a0ff;
	}
	
	.updateShop .avatar-uploader .avatar-uploader-icon {
		width: 100px!important;
		height: 100px!important;
		line-height: 100px!important;
	}
	
	.updateShop .avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
	/*logo*/
	
	.updateShop .logo-item label {
		line-height: 5;
	}
	
	.updateShop .el-form--inline .logo-item {
		width: 100%;
		margin-right: 30px!important;
		margin-bottom: 40px!important;
		.el-form-item__content {
			width: 600px;
			height: 100px;
			position: relative;
			.avatar-uploader {
				width: 100px;
				height: 100%;
			}
		}
	}
	
	.updateShop .logo-prompt {
		position: absolute;
		left: 120px;
		top: 50%;
		transform: translateY(-50%);
		color: #fbba00;
	}
	/*其他图片*/
	
	.updateShop .pic-item {
		width: 130px;
		margin-right: 30px!important;
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
	
	.updateShop .pic-prompt {
		padding-left: 20px;
		color: #fbba00;
	}
	/*营业时间*/
	
	.updateShop .time-item .el-input {
		width: 124px!important;
	}
	
	.updateShop .time-to {
		padding: 0 10px;
	}
	/*输入框提示*/
	
	.updateShop .el-form-item__content .input-prompt {
		position: absolute;
		right: -30px;
		top: 50%;
		transform: translateY(-50%);
	}
	/*餐厅地址*/
	
	.updateShop .location-item {
		.el-select {
			width: 189px!important;
			margin-right: 5px;
			.el-input {
				width: 100%!important;
			}
		}
	}
	
	.updateShop .el-input__icon+.el-input__inner {
		padding-right: 10px!important;
	}
	/*街道地址*/
	
	.updateShop .address-item {
		width: 100%!important;
		.el-form-item__content {
			width: 782px!important;
			height: 36px!important;
			.el-input {
				width: 100%!important;
			}
		}
	}
	
	.updateShop .address {
		display: inline-block;
		width: 25px;
		height: 30px;
		background: url("~images/shop/icon_map.png") no-repeat center center;
		right: -40px!important;
	}
	/*协议*/
	
	.updateShop .agreement {
		padding-left: 80px;
	}
	
	.updateShop .el-checkbox__inner:hover {
		border-color: #2FB165;
	}
	
	.updateShop .el-checkbox__input {
		width: 20px;
		height: 20px;
		margin-right: 10px;
		.el-checkbox__inner {
			width: 20px;
			height: 20px;
			&::after {
				top: 2px;
				left: 6px;
			}
		}
	}
	
	.updateShop .el-checkbox__input.is-checked {
		.el-checkbox__inner {
			background-color: #2FB165!important;
			border-color: #2FB165!important;
		}
	}
	
	.updateShop .el-checkbox__input.is-focus,
	.updateShop .el-checkbox__input:hover {
		.el-checkbox__inner {
			border-color: #2FB165!important;
		}
	}
	/*开通店铺申请*/
	
	.updateShop .submit {
		display: block;
		width: 230px;
		height: 52px;
		background: #2FB165;
		color: #fff!important;
		font-size: 16px;
		margin: 30px auto;
	}
</style>