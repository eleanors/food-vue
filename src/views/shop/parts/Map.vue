<template>
	<div class="map-wrap">
		<div id="map">

		</div>
		<ui-button v-on:click="confirm" class="save">保存当前定位信息</ui-button>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		data() {
			return {
				//经纬度
				transLat: '',
				transLng: ''
			}
		},

		props: ['addressDetail', 'lat', 'lng', 'positionSel'],

		watch: {

		},

		mounted() {
			this.changeMap();
		},

		methods: {
			//获取经纬度
			changeMap() {
				//如果positionSel为true，选择经纬度定位，否则按照地址转换后的经纬度定位
				if(this.positionSel) {
					this.showMap(parseFloat(this.lat), parseFloat(this.lng));
				} else if(this.addressDetail) {
					let url = 'key=PWNBZ-455KF-27PJL-JJFJ3-IWO23-MBFPN&address=' + this.addressDetail;

					Vue.http.get('http://apis.map.qq.com/ws/geocoder/v1/?' + url).then((res) => {
						this.transLat = res.body.result.location.lat;
						this.transLng = res.body.result.location.lng;

						this.showMap(this.transLat, this.transLng);
					});
				}
			},

			//打开地图
			showMap(lat, lng) {
				let self = this;
				//设置中心位置
				let center = new qq.maps.LatLng(lat, lng);

				//创建地图
				let map = new qq.maps.Map(document.getElementById('map'), {
					center: center,
					zoom: 20
				});

				//添加标记
				let marker = new qq.maps.Marker({
					position: center,
					draggable: true,
					map: map
				});

				qq.maps.event.addListener(marker, 'dragend', function() {
					self.$parent.reqData.lat = marker.getPosition().lat;
					self.$parent.reqData.lng = marker.getPosition().lng;
				});
			},

			//确认返回
			confirm() {
				this.$parent.positionSel = true;
				this.$parent.mapShow = false;
			}
		}
	}
</script>

<style lang="scss">
	#map {
		width: 100%;
		height: 700px;
		margin-bottom: 25px;
	}
	
	.map-wrap {
		background: #fff;
		padding-bottom: 25px;
		.save {
			display: block;
			margin: 0 auto;
			background: #FBBA00;
			border-color: #FBBA00;
			color: #fff;
			font-size: 16px;
			outline: none;
			&:hover {
				color: #fff;
				outline: none;
				border-color: #FBBA00;
			}
		}
	}
</style>