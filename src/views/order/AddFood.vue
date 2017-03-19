<template>
<div class="view-add-food">

        <ui-row class="mini-food-header">
                <ui-col :span="6">
                    <input type="text" placeholder="搜索菜品" class="search-dishes fs-16" >
                </ui-col>
                <ui-col :span="12">
                    <h4 class="title fs-24">桌号A14</h4>
                </ui-col>
                <ui-col :span="6">
                        <span class="add-food-num">已加菜品 <i v-text="foodCount"></i></span>
                        <div class="btn increase-food fs-16" v-bind:class="{disabled: foodCount==0}" ref="ensureBtn" v-on:click="ensureAddFood">
                            确认加菜
                            <view-mini-food v-bind:shopId="shopId" v-bind:foodList="miniFoodList" v-bind:visible="miniFoodVisible" v-bind:change="clearHandle"></view-mini-food>
                        </div>
                </ui-col>
        </ui-row>

        <ui-tabs class="food-list-wrap" v-model="actived" v-loading="loading" element-loading-text='拼命加载中...'>

            <ui-tab-pane class="food-pannel" v-for="(cate, index) in categoryListFilter" v-bind:key="index" v-bind:label="cate.label" v-bind:name="cate.id">
                    <view-dishes v-bind:shopId="shopId" v-bind:dishes="cate.cate"></view-dishes>
            </ui-tab-pane>
        </ui-tabs>
</div>
</template>



<script>

import { mapState, mapGetters, mapActions} from 'vuex'
import xhr from 'service'
import { order } from 'service/api'
import viewDishes from './part/Dishes'
import viewMiniFood from './part/MiniFood'
import EnsureBtn from './part/EnsureBtnMixin'

export default {

        mixins: [EnsureBtn],

        data: function(){
            return {

                // 店铺ID
                shopId: '13',

                // 默认显示列表基项
                actived: '1',

                // 菜品列表   id 必须是唯一的
                categoryList: [{
                    id: '1',
                    label: 'AAA',
                    cate: [{
                        id: '001',
                        categoryId: '01',
                        title: 'AAA1',
                        favorablePrice: '100',
                        originprice: '200',
                        quantity: 0,
                        pic: 'static/01.png'
                    },{
                        id: '002',
                        categoryId: '01',
                        title: 'AAA2',
                        favorablePrice: '100',
                        originprice: '200',
                        quantity: 0,
                        pic: 'static/01.png'
                    },{
                        id: '003',
                        categoryId: '01',
                        title: 'AAA3',
                        favorablePrice: '100',
                        originprice: '200',
                        quantity: 0,
                        pic: 'static/01.png'
                    }]
                }],

                // 清空已加菜品提示
                isclearEmpty: false,

                loading: true
            }
        },

        computed: {

            ...mapGetters(['session', 'shopId', 'miniFood', 'foodCount']),

            // 监听miniFood的变化 同步更新到 miniFood 列表
            miniFoodList: function(){
                   let miniFoodList = []

                    if(this.miniFood && this.miniFood[this.shopId]){

                            for(let cate in this.miniFood[this.shopId]){
                                    for(let item in this.miniFood[this.shopId][cate]){

                                            if(this.miniFood[this.shopId][cate][item]
                                            &&this.miniFood[this.shopId][cate][item].quantity>0){
                                                miniFoodList.push(this.miniFood[this.shopId][cate][item])
                                            }
                                    }
                            }
                    }
                    return miniFoodList
            },

            // 根据store更新列表
            categoryListFilter: function(){
                    this.categoryList.forEach( (cateList, index)=> {

                            cateList.cate.forEach( (item, index)=> {
                                    item.quantity = 0  // 这里需要重置数量为0
                                    if(this.miniFoodList.length){
                                            this.miniFoodList.forEach( (food)=> {
                                                    if(item.id == food.id) {
                                                            item.quantity = food.quantity
                                                    }
                                            })
                                    }
                            })
                    })
                    return this.categoryList
            }
        },

        watch: {

            miniFoodList: function(){

                    this.foodCount = this.calcQuantity(this.shopId)
            }
        },

        created: function(){

                //  初始化MiniFood列表
                this.initMiniFood()

                xhr({
                        url: order.getShopCategoryList,
                        options: {
                                shopId: this.shopId,
                                session: this.session
                        }

                }).then((response) => {
                        this.createFoodList(response)
                }, response => {
                        this.loading = false;
                })
        },

        methods: {


                clearHandle: function(foodList){

                    return true;
                },

                // 获取菜品初始数据
                createFoodList: function(data){
                    let categoryList = []
                    if(data && typeof data.queryShopCategoryList == 'object'){
                            data.queryShopCategoryList.forEach((cate, index) => {
                                    categoryList.push({
                                        id: String(index),
                                        label: cate.categoryTitle,
                                        cate: []
                                    })
                                    cate.itemList.forEach((item) => {
                                            categoryList[index].cate.push({
                                                    id: item.id,
                                                    categoryId: item.categoryId,
                                                    title: item.title,
                                                    price: item.price || 0,
                                                    originalPrice: item.originalPrice || 0,
                                                    quantity: 0,
                                                    pic: item.picUrl || 'static/01.png'
                                            })
                                    })
                            })
                    }
                    this.categoryList = categoryList;
                    this.loading = false;
                },


                ensureAddFood: function(){

                    let foodList = []
                    for(let i=0, len=this.miniFoodList.length; i<len; i++){
                            foodList.push({
                                    itemIcon: '',
                                    itemId: this.miniFoodList[i]['id'],
                                    itemTitle: this.miniFoodList[i]['title'],
                                    originalPrice: this.miniFoodList[i]['originalPrice'],
                                    quantity: this.miniFoodList[i]['quantity'],
                                    returnCoin: '',
                                    unitPrice: ''
                            })
                    }

                    this.foodCount && xhr({

                            url: order.ensureAddFood,
                            options: {
                                    orderId: '',
                                    orderNo: '',
                                    shopId: '',
                                    telPhone: '',
                                    itemList: JSON.stringify(foodList),
                                    shopId: this.shopId,
                                    session: this.session
                            }
                    }).then( (response)=> {
                            if(response.saveIndiegogoItem == '1') {
                                    this.notify({
                                           message: '订单已被创建,可在查看订单中修改',
                                           type: 'success'
                                    })
                            }
                    })

                },

                ...mapActions(['calcQuantity', 'initMiniFood'])
        },

        components: {viewDishes, viewMiniFood}
}
</script>

<style lang="scss">
@import '~scss/var.scss';

.view-add-food {
    height: 100%;

    .mini-food-header{

        position: relative;

        padding: 40px 10px;
        margin-bottom: 20px;
        background: #fff;

        .search-dishes{
            width: 100%;
            height: 48px;
            padding: 12px 20px;
            background: transparent;
            border: 1px solid $border-color;
            border-radius: 4px 4px;
            outline: none;
        }

        .add-food-num {
            float: left;
            line-height: 3;
        }

        .increase-food{
            float: right;
            width: 120px;
            height: 40px;
        }

        .btn{
              display: inline-block;
              padding: 12px 12px;
              font-weight: normal;
              line-height: 1;
              text-align: center;
              white-space: nowrap;
              vertical-align: middle;
              cursor: pointer;
              user-select: none;
              background-image: none;
              border-radius: 4px;
              outline: none;
              border: none;
              color: #fff;
              background: $c-master;
              &:active {
                    background-image: none;
                    outline: 0;
                    box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
              }
        }

        .disabled { background: #c2c2c2;}

        .title {
            height: 48px;
            line-height: 48px;
            color: $c-master;
            text-align: center;
            font-weight: normal;
        }


        .food-filled{
            background: #2cb067;
        }
    }



     /** 菜品列表 */
    .food-list-wrap {

            min-height: 74%;
            background: #fff;


            .el-tabs__item {
                padding: 0 40px;
                height: 74px;
                line-height: 74px;
                font-size: 18px;
            }

            .el-tabs__nav-next, .el-tabs__nav-prev {
                line-height: 74px;
            }

            .food-pannel {
                padding: 2% 4%;
            }
    }

}
</style>
