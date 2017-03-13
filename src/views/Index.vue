<template>
      <div>Welcome Home</div>
</template>

<script>

import xhr from 'service/'
import { order } from 'service/api'

import { mapActions, mapGetters } from 'vuex'

export default {
        data: function(){
            return {

            }
        },

        computed: {

            ...mapGetters(['shopInfo'])
        },

        created: function(){
            let self = this
            xhr({
                method: 'get',
                url: order.getDetail,
                options: {
                    id: ''
                }
            })
            .then(function(data){

                    self.message({
                          message: '这是一条假数据...',
                          type: 'success'
                    });
                    console.log(data)
                    self.setShopInfo({name: 'MM'})
            })
        },

        mounted: function(){

        },

        methods: {

            ...mapActions(['setShopInfo'])
        }
    }
</script>

<style>

</style>
