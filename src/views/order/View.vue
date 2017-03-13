<template>

         <div class="order-view-wrap">
                <!-- 查询部分 -->
                <view-search v-on:search="searchHandle"></view-search>

                <!-- 订单数据 -->
                <!--ui-table :data="tableDataComputed" style="width: 100%" v-on:selection-change="handleSelectionChange">

                    <ui-table-column width="55">

                            <template scope="scope" v-if="scope.row.status==2">
                                    <span class="check-icon check-selected"></span>
                            </template>
                    </ui-table-column>

                    <ui-table-column label="订单编号">

                            <template scope="scope">
                                   <router-link :to="{name: 'OrderDetail', params:{orderNo:scope.row.orderNo}}">{{ scope.row.orderNo }}</router-link>
                            </template>
                    </ui-table-column>

                    <ui-table-column label="下单时间">
                           <template scope="scope">{{ scope.row.date }}</template>
                    </ui-table-column>

                    <ui-table-column prop="phone" label="顾客手机"></ui-table-column>

                    <ui-table-column prop="status" label="订单状态"></ui-table-column>

                    <ui-table-column label="操作">

                             <template scope="scope">
                                   <ui-button type="text">撤单</ui-button>
                                   <ui-button type="text">退单</ui-button>
                            </template>
                    </ui-table-column>
                </ui-table-->

                <div class="view-content">
                    <transition name="slide-fade">
                    <div class="combine-operate" v-show="selectedCheck.length>0">

                            <div class="btn ensure fs-16">合并结账</div>
                            <div class="btn cancel fs-16" v-on:click="cancelAll">取消多选</div>
                    </div>
                    </transition>
                    <div class="view-list">

                            <div class="list-row header">
                                    <div class="column c-w-1">
                                            <div class="cell"></div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">订单编号</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">订单状态</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">桌号</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">下单时间</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">操作</div>
                                    </div>
                            </div>

                            <div class="list-row" v-for="(item, index) in orderData">
                                    <div class="column c-w-1">
                                            <div class="cell">
                                                    <span class="check-icon" v-bind:class="{'is-checked': item.checked}" v-if="item.status==2" v-on:click="changeToChecked(item)"></span>
                                            </div>
                                    </div>
                                    <div class="column">
                                            <div class="cell"><router-link  v-bind:to="{name: 'OrderDetail', params:{orderNo:item.orderNo}}" v-text="item.orderNo"></router-link></div>
                                    </div>
                                    <div class="column">
                                            <div class="cell" v-text="">{{item.status | statusFilter}}</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell" v-text="item.tableNo">A001</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell" v-text="item.date">2017-02-14</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">
                                                    <span class="operation" v-if="item.status==1">受理</span>
                                                    <span class="operation" v-if="item.status==1">取消订单</span>

                                                    <span class="operation" v-if="item.status==2">开台</span>
                                                    <span class="operation" v-if="item.status==2">取消订单</span>

                                                    <span class="operation" v-if="item.status==3">加菜</span>
                                                    <span class="operation" v-if="item.status==3">结账</span>
                                                    <span class="operation" v-if="item.status==3">打印小票</span>

                                                    <span class="operation" v-if="item.status==4">退单</span>
                                                    <span class="operation" v-if="item.status==4">打印小票</span>

                                            </div>
                                    </div>
                            </div>
                    </div>


                    <!-- 分页 -->
                    <div class="pagination">
                        <ui-pagination v-on:current-change="handleCurrentChange"
                            v-bind:current-page="currentPage" v-bind:page-size="10"
                            layout="total, prev, pager, next, jumper" v-bind:total="totalPage">
                        </ui-pagination>
                    </div>
                </div>
         </div>

</template>

<script>
import viewSearch from './part/Search'
import { order } from 'service/api'
import xhr from 'service'
export default {
        data() {
              return {
                    orderData: [{
                          orderNo: 'aeces001',
                          tableNo: 'A001',
                          date: '2017-05-01',
                          status: 1
                    },{
                          orderNo: 'aeces002',
                          tableNo: 'A002',
                          date: '2017-05-02',
                          status: 2
                    },{
                          orderNo: 'aeces003',
                          tableNo: 'A003',
                          date: '2017-05-03',
                          status: 2
                    },{
                          orderNo: 'aeces004',
                          tableNo: 'A004',
                          date: '2017-05-04',
                          status: 4
                    }],


                    // 分页
                    currentPage: 1,
                    pageSize: 10,
                    totalPage: 100,

                    selectedCheck:[]

              }
        },

        created: function (){
                this.createVIew()
        },

        methods: {

            handleCurrentChange(value) {
                    if(!value){
                        this.currentPage = 1;
                    }
                    this.currentPage = value;
            },

            searchHandle: function(date){
                    //console.log(date)
            },

            createVIew: function(){

                    xhr({
                        url: order.orderViewList,
                        method: 'get',
                        options: {
                                shopId: 13,
                                currentPage: this.currentPage
                        }
                    }).then(response=>{

                        console.log(response)
                    })
            },

            changeToChecked: function(item){
                    //console.log(5856565, item)
                    if(item.checked){

                            this.$set(item, 'checked', false)
                            this.selectedCheck.forEach( (check, index)=>{

                                    if(check.orderNo == item.orderNo){
                                            this.selectedCheck.splice(index, 1)
                                    }
                            })
                    }else {

                            this.$set(item, 'checked', true)
                            this.selectedCheck.push(item)
                    }
            },

            cancelAll: function(){
                    this.selectedCheck.forEach( (check, index)=>{
                            this.$set(check, 'checked', false)
                    })
                    this.selectedCheck = []
            },

            combineCheck: function(){

            }
        },

        filters: {

                /**
                 *  未受理：受理、取消订单
                 *  已受理：开台、取消订单
                 *  未付款：加菜、结账、打印小票
                 *  已付款：退单、打印小票
                */
                statusFilter: function(value){
                        let textStatus = '';

                        if(value == 1) {
                                textStatus = '未受理'
                        }
                        if(value == 2) {
                                textStatus = '已受理'
                        }
                        if(value == 3) {
                                textStatus = '未付款'
                        }
                        if(value == 4) {
                                textStatus = '已付款'
                        }
                        if(value == 5) {
                                textStatus = '已取消'
                        }
                        if(value == 6) {
                                textStatus = '已退单'
                        }
                        return textStatus
                }
        },

        components: {
            viewSearch
        }
}
</script>

<style lang="scss">
@import '~scss/var.scss';
.view-content {
        position: relative;
        overflow: hidden;


        .combine-operate {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                width: 100%;
                height: 80px;
                line-height: 80px;
                text-align: right;
                background: #ccc;

                .ensure, .cancel {
                        padding: 12px 24px;
                        margin-right: 40px;
                }
                .cancel {
                        color: #fff;
                        background: #999;
                }
        }


        .view-list {
                display: table;
                width: 100%;
                min-width: 700px;
                overflow-x:scroll;
                background: #fff;
                vertical-align: middle;
                overflow: hidden;
        }
        .list-row {
            height: 80px;
            display: table-row;
            text-align: left;
            box-sizing: border-box;
            vertical-align: inherit;

            .column {
                    display: table-cell;
                    position: relative;

                    text-overflow: ellipsis;
                    vertical-align: middle;
                    border-bottom: 1px solid #dfe6ec;

                    .cell {

                            padding-left: 18px;
                            padding-right: 18px;
                            white-space: normal;
                            word-break: break-all;
                            line-height: 24px;
                            overflow: hidden;
                    }

                    .operation {
                            display: inline-block;
                            line-height: 1;
                            padding: 10px 0;
                            white-space: nowrap;
                            cursor: pointer;

                            color: $c-master;

                            + span {
                                margin-left: 10px;
                            }
                    }
            }

            .c-w-1 {
                    width: 1%;
            }
        }

        .header .cell{
                color: #1f2d3d;
                font-weight: bold;
        }



        .check-icon{
                display: block;
                width: 28px;
                height: 28px;
                position: relative;
                cursor: pointer;
                background:#fff  url("~images/order/icon_check.png") no-repeat -54px center;
                overflow: hidden;
        }
        .check-icon.is-checked{
                background-position: -12px center;
        }

}

.slide-fade-enter-active{
        transition: all .3s ease;
}
.slide-fade-leave-active{
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active{
        transform: translateX(10px);
        opacity: 0;
}


.pagination {
        text-align: center;
        margin-top: 30px;
}
</style>