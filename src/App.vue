<template>
    <router-view></router-view>
</template>

<script>

import {getCookie} from 'vendor/utils'

export default {

         data: function(){
                return {}
         },

         created: function(){
                if(!getCookie('session')){
                        this.$router.push({name: 'Auth'})
                }
         },

         mounted: function(){

         },

         methods: function(){

         },

         components: {}
}
</script>

<style lang="scss">
    @import '~assets/scss/index';
    @import '~assets/scss/var';
    html, body {
        height: 100%;
        overflow: hidden;
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
