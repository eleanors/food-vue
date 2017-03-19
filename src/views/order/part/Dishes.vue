<template>
    <ui-row class="section-food-list" :gutter="10">
            <ui-col class="food-item" :md="12" :lg="8" v-for="(item, index) in dishes" v-bind:key="index">
                    <div class="pic f-l"><img :src="item.pic" /></div>
                    <div class="detail">
                            <h4 class="ellipsis" v-text="item.title"></h4>
                            <p class="price">
                                    <span>￥{{item.price}}</span>
                                    <span>原价￥{{item.originalPrice}}</span>
                            </p>
                            <p class="food-amount">
                                    <i class="reduce" v-on:click="decrease(item.categoryId, item.id, item)"></i>
                                    <input name="number" type="text" v-model="item.quantity" readonly>
                                    <i class="add" v-on:click="increase(item.categoryId, item.id, item)"></i>
                            </p>
                    </div>
            </ui-col>
    </ui-row>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
        data: function(){

                return {}
        },

        props: {
                // 当前分类下所有菜品
                dishes: {
                    type: Array,
                    default: () => []
                },

                // 店铺ID
                shopId: {
                    type: String,
                    default: '',
                    required: true
                }
        },

        computed: {

            ...mapGetters(['miniFood']),

            miniFoodList: function(){
                    //return Object.assign({}, this.miniFood[this.shopId])
            },

            foodNum: function(){

            }
        },


        methods: {


                increase: function(cateId, foodId, food){

                        this.addFood({shopId: this.shopId, cateId, foodId, food})
                },

                decrease: function(cateId, foodId, food){
                        this.reduceFood({shopId: this.shopId, cateId, foodId, food})
                },

                ...mapActions(['addFood', 'reduceFood'])
        }
}
</script>
<style lang="scss">

.section-food-list {

        .food-item {
                height: 164px;
                .pic {
                        width: 152px;
                        img {
                             width: 100%;
                        }
                }

                .detail {
                        height: 100%;
                        padding-left: 10px;
                        margin-left: 152px;
                        overflow: hidden;
                }


                h4 {
                        font-size: 24px;
                        font-weight: normal;
                }

                .price span{
                    vertical-align: middle;
                    &:first-child{
                         font-size: 24px;
                         font-family: "microsoft yahei";
                         color: #fc7000;
                         margin-right: 20px;
                         font-style: normal;
                    }
                    &:last-child{
                         font-size: 20px;
                         color: #ccc;
                         font-style: normal;
                         text-decoration: line-through;
                    }
              }
              .food-amount {
                    font-size: 0;
                    & > * {
                            vertical-align: middle;
                          }
                    i{
                            display: inline-block;
                            width: 34px;
                            height: 34px;
                            line-height: 34px;
                            text-align: center;
                            color: #2eb165;
                            border: 2px solid #2eb165;
                            border-radius: 34px;
                            cursor: pointer;
                            position: relative;
                    }
                    .reduce::before{
                            display: block;
                            content: '';
                            width: 14px;
                            height: 2px;
                            background: #2eb165;
                            position: absolute;
                            left: 8px;
                            top: 14px;
                    }
                    .add {
                            background: #2eb165;
                            &::before{
                                 display: block;
                                 content: '';
                                 width: 14px;
                                 height: 2px;
                                 background: #fff;
                                 position: absolute;
                                 left: 8px;
                                 top: 14px;
                            }
                            &::after{
                                 display: block;
                                 content: '';
                                 width: 2px;
                                 height: 14px;
                                 background: #fff;
                                 position: absolute;
                                 left: 14px;
                                 top: 8px;
                            }
                    }
                    input{
                            width: 46px;
                            height: 34px;
                            border: 0;
                            background: none;
                            color: #656565;
                            text-align: center;
                            padding: 0px 8px;
                            font-size: 14px;
                            outline: none;
                    }
              }
        }
}
</style>
