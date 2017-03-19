<template>
	<div class="header">
		<div class="other-content f-r clearfix">
			<div class="info-wrap f-l clearfix" v-on:click="setStatus = !setStatus">
				<div class="portrait">
					<img :src="logo" />
				</div>
				<span class="name fs-16" v-text="name"></span>
				<i class="down"></i>
			</div>
			<span class="fs-16" v-on:click="logout">退出</span>
		</div>

		<!--设置-->
		<div class="setting-wrap" :class="setStatus ? 'active':''">
			<ul class="fs-16">
				<li v-on:click="setStatus = false">
					<router-link :to="{name: 'UpdateShop'}">店铺信息</router-link>
				</li>
				<li v-on:click="showSetting">
					<a>展示设置</a>
				</li>
				<li v-on:click="modelSetting">
					<a>模式设置</a>
				</li>
			</ul>
		</div>

		<!--展示设置-->
		<show-setting v-if="showStatus"></show-setting>

		<!--模式设置-->
		<model-setting v-if="modelStatus"></model-setting>

		<div class="position">
			<span class="fs-16">您的位置：</span>
			<layout-level v-bind:position="position" v-bind:separator="separator"></layout-level>
		</div>

	</div>
</template>

<script>
	import LayoutLevel from './LayoutLevel'
	import ShowSetting from './ShowSetting'
	import ModelSetting from './ModelSetting'
	import xhr from 'service'
	import { shop } from 'service/api'

	import { mapGetters, mapActions } from 'vuex'

	export default {

		data: function() {
			return {
				position: null,
				separator: '>',

				//店铺logo
				logo: '',

				//店铺名称
				name: '',

				//设置显示和隐藏
				setStatus: false,

				//显示设置
				showStatus: false,

				//模式设置
				modelStatus: false
			}
		},

		computed: {
			name: function() {
				return this.$router.name
			},
			...mapGetters(['session', 'shopId'])
		},

		watch: {
			$route() {
				this.getList()
			}
		},

		created: function() {
			this.getList();

			//点击页面，设置消失
			document.addEventListener('click', (e) => {
				if(!this.$el.contains(e.target)) {
					this.setStatus = false;
				}
			})

			//请求店铺信息
			xhr({
				url: shop.getShopInfo,
				options: {
                    shopId: this.shopId,
                    session: this.session
				}
			}).then((res) => {
				if(res.getShopInfo) {
					this.logo = res.getShopInfo.logo;
					this.name = res.getShopInfo.shop_name;
				}
			});
		},

		methods: {
			getList() {
				let matched = this.$route.matched.filter(item => item.name)
				let first = matched[0]
				if(first && (first.name !== 'Home' || first.path !== '')) {

					matched = [{ name: 'Home', path: '/', meta: { title: '首页' } }].concat(matched)
				}
				this.position = matched
			},

			//显示设置
			showSetting() {
				this.showStatus = true;
				this.setStatus = false;
			},

			//模式设置
			modelSetting() {
				this.modelStatus = true;
				this.setStatus = false;
			},

			logout: function(){
				this.clearAuth()
				this.$router.push('/auth')
			},
			...mapActions(['clearAuth'])
		},

		components: {
			LayoutLevel,
			ModelSetting,
			ShowSetting
		},

	}
</script>

<style lang="scss">
	.header {
		height: 100px;
		background: #fff;
		.position {
			margin-left: 100px;
			line-height: 100px;
			span:first-child {
				float: left;
			}
		}
		.other-content {
			margin-right: 50px;
			line-height: 100px;
		}
	}
	/*信息*/

	.info-wrap {
		padding-right: 50px;
		position: relative;
		cursor: pointer;
		/*头像*/
		.portrait {
			display: inline-block;
			width: 54px;
			height: 54px;
			margin-right: 20px;
			overflow: hidden;
			vertical-align: middle;
			border-radius: 50%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.down {
			display: inline-block;
			width: 18px;
			height: 10px;
			background: url('~images/shop/icon_dropdown.png') no-repeat center center;
			position: absolute;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	/*店铺设置*/

	.setting-wrap {
		width: 200px;
		height: auto;
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		right: 85px;
		top: 90px;
		transform: translateY(-15px);
		opacity: 0;
		z-index: -1;
		transition: all 0.5s;
		&.active {
			z-index: 9999;
			opacity: 1;
			transform: translateY(0);
		}
		ul {
			width: 100%;
			height: auto;
			margin: 0;
			li {
				border-bottom: 1px solid #999;
				&:hover {
					/*border-color: transparent;*/
				}
			}
			li:last-child {
				border-bottom: 0;
			}
		}
		a {
			display: block;
			width: 100%;
			height: 40px;
			text-align: center;
			line-height: 40px;
			color: #fff;
			cursor: pointer;
			transition: all 0.5s;
			&:hover {
				background: rgba(0, 0, 0, 0.6);
				color: #fbba00;
			}
		}
		&:after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border-top: 0;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 10px solid rgba(0, 0, 0, 0.5);
			position: absolute;
			right: 10px;
			top: -10px;
			z-index: 9999;
		}
	}
</style>