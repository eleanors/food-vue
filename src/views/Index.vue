<template>

 <div class="wrapper">
      <layout-pannel v-bind:menus="pannel"></layout-pannel>

      <div class="main-content">
          <layout-header></layout-header>
          <layout-main></layout-main>
      </div>

</div>

</template>

<script>
import pannel from 'vendor/pannel'
import LayoutMain   from 'components/layout/LayoutMain'
import LayoutPannel from 'components/layout/LayoutPannel'
import LayoutHeader from 'components/layout/LayoutHeader'
import LayoutFooter from 'components/layout/LayoutFooter'
	import xhr from 'service/'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data: function() {
			return {
					pannel
			}
		},

		computed: {

			...mapGetters(['shopInfo'])
		},

		created: function() {

		},

		mounted: function() {

		},

		methods: {

			...mapActions(['setShopInfo'])
		},

        components: {
                LayoutHeader,
                LayoutPannel,
                LayoutMain,
                LayoutFooter
        }
	}
</script>

<style>
	.welcome {
		min-height: 690px;
		background: #fff;
		padding: 35px 52px;
	}

	.copyright {
		padding: 20px;
	}
</style>