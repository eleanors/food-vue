<template>
  <div class="wrapper">
        <layout-pannel v-bind:menus="pannel"></layout-pannel>

        <div class="main-content">
            <layout-header></layout-header>
            <layout-main></layout-main>
            <!--<layout-footer></layout-footer>-->
            <!-- <ui-button type="primary"  @click="dialogVisible = true">主要按钮</ui-button>

            <ui-dialog title="提示" v-model="dialogVisible" size="tiny">
                  <span>这是一段信息</span>
                  <span slot="footer" class="dialog-footer">
                        <ui-button @click="dialogVisible = false">取 消</ui-button>
                        <ui-button type="primary" @click="dialogVisible = false">确 定</ui-button>
                  </span>
            </ui-dialog> -->
        </div>

  </div>
</template>

<script>
import pannel from './vendor/pannel'
import LayoutMain   from 'components/layout/LayoutMain'
import LayoutPannel from 'components/layout/LayoutPannel'
import LayoutHeader from 'components/layout/LayoutHeader'
import LayoutFooter from 'components/layout/LayoutFooter'

export default {

         data: function(){
                 return {
                      pannel,
                      dialogVisible: false
                 }
         },

         mounted: function(){

         },

         methods: function(){

         },

         components: {
                LayoutHeader,
                LayoutPannel,
                LayoutMain,
                LayoutFooter
         }
}
</script>

<style lang="scss">
    @import '~assets/scss/index';
    @import '~assets/scss/var';
    html, body {
        height: 100%;
        background: $body-background;
    }
    .wrapper {
        height: 100%;

        .pannel-content {
            float: left;
            width: 288px;
            height: 100%;
            background: $c-minor;
        }

        .main-content {
            width: auto;
            height: 100%;
            margin-left: 288px;
            overflow: hidden;
        }
    }
</style>
