<template>
<transition name="toggle-mini-food">
        <div class="food-menu" v-bind:class="{more: foodList&&foodList.length>5}" v-on:click.prevent.stop="" v-show="visible">
                <p class="clear-food fs-18" v-show="foodCount!==0"><span v-on:click="clear">清空</span></p>
                <transition-group class="food-list" name="slide-fade" tag="ul">
                         <li class="food-item fs-18" v-for="(item, index) in foodList" v-bind:key="index">
                                <span class="food-title" v-text="item.title"></span>
                                <span class="food-price" v-text="parseFloat(item.price*item.quantity).toFixed(2)"></span>
                                <span class="food-amount">
                                        <i class="reduce" v-on:click="decrease(item.categoryId, item.id, item)"></i>
                                        <input name="number" type="text" readonly v-model="item.quantity">
                                        <i class="add" v-on:click="increase(item.categoryId, item.id, item)"></i>
                                </span>
                         </li>
                </transition-group>

                 <div class="msg" v-if="foodCount==0">还没有选择菜品, 请选择!!</div>
        </div>
</transition>
</template>



<script>
import { mapGetters, mapActions } from 'vuex'

export default {
        name: 'viewMiniFood',

        props: {

            visible: {
                type: Boolean,
                default: false
            },

            shopId: {
                type: String,
                default: '',
                required: true
            },
            foodList: {
                    type: Array,
                    default: ()=>[]
            },
            change: {
                     type: Function,
                     default: ()=>{}
            }
        },

        computed: {

                foodCount: function(){
                        return this.foodList.length;
                }
        },

        created: function(){

               // console.log(this.foodList)
        },

        methods: {

                decrease: function(cateId, foodId, food){

                        this.reduceFood({shopId: this.shopId, cateId, foodId, food})
                },

                increase: function(cateId, foodId, food){

                        this.addFood({shopId: this.shopId, cateId, foodId, food})
                },

                clear: function(){

                        this.change() && this.clearFood(this.shopId)
                },

                ...mapActions(['addFood', 'reduceFood', 'clearFood'])
        }
}
</script>


<style lang="scss">
@import '~scss/var.scss';


/** 菜品 Mini */
.food-menu {
    position: absolute;
    right: 0;
    top: 90px;
    z-index: 10001;
    width: 500px;
    padding: 10px 16px;
    color: #666;
    background: #fff;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    overflow: hidden;

    &.more::after{
        content: "  ";
        position: absolute;
        bottom: 0;
        right: 0;
        color: #eee;
        width: 100%;
        padding-top: 40px;
        background: linear-gradient(to bottom, transparent, #fff 55%);
    }

    .loading, .msg {
        margin: 5px 20px 20px;
        text-align: center
    }
    .clear-food{
        width: 100%;
        height: 50px;
        margin: 0 0;
        overflow: hidden;

        span{
            float: right;
            width: 90px;
            height: 30px;
            line-height: 28px;
            margin: 10px 16px 0 0;
            color: #fbba00;
            text-align: center;
            border-radius: 30px;
            border: 1px solid #fbba00;
            cursor: pointer;
            transition: all 0.5s ease 0s;

            &:hover{
                color: #fff;
                background: #fbba00;
            }
        }
    }

    .food-list {
        margin: 0;
        padding: 0;
        width: 500px;
        max-height: 360px;
        position: relative;
        list-style-type: none;
        overflow-x: hidden;
        overflow-y: scroll;

        li {
            height: 60px;
            line-height: 60px;
            margin-right: 26px;
            position: relative;
            overflow: hidden;

            span{
                display: block;
                float: left;
                width: 33.3333%;
                height: 100%;
            }
            .food-title{
                text-align: left;
                white-space: nowrap;
                word-break: break-all;
                text-overflow: ellipsis;
                position: relative;
                overflow: hidden;
            }

            .food-price{
                text-align: center;
            }


            .food-amount {
                    text-align: right;
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
}



.toggle-mini-food-enter-active, .toggle-mini-food-leave-active {

        transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms,
                    opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
        opacity: 1;
        transform: scaleY(1);
        transform-origin: center top;
}

.toggle-mini-food-enter, .toggle-mini-food-leave-active{
        opacity: 0;
        transform: scaleY(0)
}


</style>