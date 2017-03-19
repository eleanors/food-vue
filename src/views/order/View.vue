<template>

         <div class="order-view-wrap">
                <!-- 查询部分 -->
                <view-search v-on:search="searchHandle"></view-search>

                <!-- 订单数据 -->
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
                                            <div class="cell">桌台</div>
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
                                            <div class="cell">
                                                <router-link  v-bind:to="{name: 'OrderDetail', params:{orderNo:item.orderNo, status: item.status}, query:{orderId: item.orderId}}" v-text="item.orderNo"></router-link>
                                            </div>
                                    </div>
                                    <div class="column">
                                            <div class="cell" v-text="">{{item.status | statusFilter}}</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell" v-bind:class="{edit: item.tableNo==''}" v-on:click="editTableHandle(item)">{{item.tableNo | tableNoFilter}}</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell" v-text="item.date">2017-02-14</div>
                                    </div>
                                    <div class="column">
                                            <div class="cell">
                                                    <span class="operation" v-if="item.status==1" v-on:click="acceptOrderHandle">受理</span>

                                                    <span class="operation" v-if="item.status==2"v-on:click="promiseOrderHandle">开台</span>
                                                    <span class="operation" v-if="item.status==1 || item.status==2" v-on:click="cancelOrderHandle">取消订单</span>

                                                    <span class="operation" v-if="item.status==3" v-on:click="addFoodOrderHandle">加菜</span>
                                                    <span class="operation" v-if="item.status==3" v-on:click="checkoutOrderHandle">结账</span>
                                                    <span class="operation" v-if="item.status==3">打印小票</span>

                                                    <span class="operation" v-if="item.status==4" v-on:click="revokeOrderHandle">退单</span>
                                            </div>
                                    </div>
                            </div>
                    </div>


                    <!-- 分页 -->
                    <div class="pagination">
                        <ui-pagination v-on:current-change="currentChangeHandle"
                            v-bind:current-page="currentPage" v-bind:page-size="10"
                            layout="total, prev, pager, next, jumper" v-bind:total="pageInfo.totalCount">
                        </ui-pagination>
                    </div>
                </div>


                <ui-dialog title="桌台选择" v-model="isShowTableChoose" size="tiny" top="30%">
                      <div class="modal-content">
                            <div class="table-wrap">
                                    <dl v-for="(table, index) in tableType">
                                            <dt v-text="table.title"></dt>
                                            <dd v-for="(type, index) in table.type">
                                                   <span class="btn" v-text="type" v-on:click="chooseTableHandle(type)"></span>
                                            </dd>
                                    </dl>
                            </div>
                      </div>
                </ui-dialog>

                <ui-dialog v-bind:title="EnsureTitle" v-model="isEnsureVisible" size="tiny" top="30%">
                      <div class="modal-content">
                            <div class="ensure-wrap fs-22" v-text="EnsureContent"></div>
                      </div>
                      <div slot="footer" class="ensure-footer">
                            <span class="btn cancel fs-16" v-on:click="isEnsureVisible = false">取 消</span>
                            <span class="btn fs-16" v-on:click="">确 定</span>
                      </div>
                </ui-dialog>
         </div>

</template>



<script>
import viewSearch from './part/Search'
import EditTipMixin from './part/EditTipMixin'
import {formatDate} from 'vendor/utils'
import { order } from 'service/api'
import xhr from 'service'
import { mapGetters } from 'vuex'
export default {
        mixins: ['EditTipMixin'],

        data() {
              return {
                    orderData: [{
                          id: '001',
                          orderNo: 'aeces001',
                          tableNo: 'A001',
                          date: '2017-05-01',
                          status: 1
                    },{
                          id: '002',
                          orderNo: 'aeces002',
                          tableNo: '',
                          date: '2017-05-02',
                          status: 2
                    },{
                          id: '003',
                          orderNo: 'aeces003',
                          tableNo: 'A003',
                          date: '2017-05-03',
                          status: 2
                    },{
                          id: '004',
                          orderNo: 'aeces004',
                          tableNo: 'A004',
                          date: '2017-05-04',
                          status: 3
                    },{
                          id: '005',
                          orderNo: 'aeces004',
                          tableNo: 'A005',
                          date: '2017-05-04',
                          status: 4
                    }],


                    tableType: [{
                            title: '小桌',
                            type: ['A1', 'A5', 'A9']
                    },{
                            title: '中桌',
                            type: ['A2', 'A6', 'A10']
                    },{
                            title: '大桌',
                            type: ['A3', 'A7', 'A11']
                    },{
                            title: '包间',
                            type: ['A4', 'A8', 'A12']
                    }],


                    // 分页
                    currentPage: 1,
                    pageInfo: {},
                    pageSize: 10,

                    selectedCheck:[],

                    isShowTableChoose: false,


                    isEnsureVisible: false,
                    EnsureContent: '',
                    EnsureTitle: ''

              }
        },

        computed: {
            ...mapGetters(['session', 'shopId'])
        },

        watch: {

                'currentPage': 'createVIew'
        },

        created: function (){
                this.createVIew()
        },

        methods: {

            currentChangeHandle: function(value) {
                    if(!value){
                        this.currentPage = 1;
                    }
                    this.currentPage = value;
            },

            acceptOrderHandle: function(){
                    this.isEnsureVisible = true
                    this.EnsureContent = '确定受理此订单?'
            },

            cancelOrderHandle: function(){
                    this.isEnsureVisible = true
                    this.EnsureContent = '确定取消此订单?'
            },

            revokeOrderHandle: function(){
                    this.isEnsureVisible = true
                    this.EnsureContent = '确定退订此订单?'
            },

            addFoodOrderHandle: function(){
                    this.isEnsureVisible = true
                    this.EnsureContent = '确定还要加菜?'
            },

            promiseOrderHandle: function(){
                    this.isEnsureVisible = true
                    this.EnsureContent = '确定对此订单开台?'
            },

            checkoutOrderHandle: function(){
                    this.isEnsureVisible = true
                    this.EnsureContent = '确定对此订单结账?'
            },

            editTableHandle: function(item){
                    this.item = item
                    if(item.status==4 || item.tableNo){
                            return false;
                    }
                    this.isShowTableChoose = true
            },

            chooseTableHandle: function(type){
                    this.item.tableNo = type
                    this.isShowTableChoose = false
            },

            searchHandle: function(date){
                    //console.log(date)
            },

            createVIew: function(){

                    xhr({
                        url: order.orderViewList,
                        options: {

                            shopId: this.shopId,
                            session: this.session,
                            currentPage: this.currentPage,
                            pageSize: this.pageSize
                        }
                    }).then(response=>{
                        //console.log(response)
                        let orderList = []
                        if(response.findItemOrderListPage) {
                                const data = response.findItemOrderListPage

                                data.length && data.forEach( (item, index)=>{

                                        orderList.push({
                                              orderId: item.id,
                                              orderNo: item.orderNo,
                                              tableNo: item.orderName || '',
                                              date:    formatDate(item.createDate/1000, 4),
                                              type: item.status,
                                              status: item.status,
                                              payStatus: item.pay_status
                                        })
                                })
                        }
                        this.orderData = orderList
                        this.pageInfo = response.pageInfo
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
                },

                tableNoFilter: function(value){
                        if(value == undefined || value == ''){
                                return '[选择]'
                        }
                        return value;
                }
        },

        components: {
                viewSearch
        }
}
</script>

<style lang="scss">
@import '~scss/var.scss';
.order-view-wrap {


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
                                    text-align: left;
                                    overflow: hidden;
                            }

                            .edit {
                                    color: $c-master;
                                    cursor: pointer;
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

                .header {
                    background: #e0e0de;
                    .cell{
                        color: #1f2d3d;
                        font-weight: bold;
                    }
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


        .table-wrap {
                border-top: 1px solid $border-color;
                overflow: hidden;
                dl {
                    width: 25%;
                    float: left;
                    text-align: center;

                    dt {
                            height: 50px;
                            line-height: 50px;
                            font-size: 16px;
                    }

                    dd {
                            display: block;
                            height: 60px;
                            padding: 8px 8px;

                            .btn {
                                width: 100%;
                                height: 100%;
                            }
                    }
                }
        }


        .ensure-wrap {

                padding: 20px 20px 0;
                font-size: 22px;
                text-align: center;
        }
        .ensure-footer {
                text-align: center;
                padding-bottom: 20px;
                .btn {
                        padding: 12px 44px;
                        margin: 0 10px;

                        &.cancel {
                            color: #fff;
                            background: #999;
                        }
                }
        }
}



.slide-fade-enter-active{
        transition: all .3s ease;
}
.slide-fade-leave-active{
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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