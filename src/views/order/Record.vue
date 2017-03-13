<template>

         <div class="buying-record">

                <!-- 订单数据 -->
                <ui-table class="" v-bind:data="recordList"  style="width: 100%" v-on:selection-change="handleSelectionChange">

                    <ui-table-column label="日期">

                            <template scope="scope">
                                   <p class="date">{{scope.row.date}}</p>
                            </template>
                    </ui-table-column>

                    <ui-table-column label="微信头像">

                            <template scope="scope">
                                   <img v-bind:src="scope.row.avator" />
                            </template>
                    </ui-table-column>

                    <ui-table-column prop="nick" label="昵称"></ui-table-column>
                    <ui-table-column prop="tel" label="电话"></ui-table-column>
                    <ui-table-column prop="payment"  label="支付"></ui-table-column>
                    <ui-table-column label="备注">
                            <template scope="scope">
                                   <p class="remark">{{scope.row.remark}}</p>
                            </template>
                    </ui-table-column>
                    <ui-table-column prop="status"  label="状态"></ui-table-column>
                </ui-table>

                <!-- 分页 -->
                <div class="pagination">
                    <ui-pagination
                            v-on:current-change="handleCurrentChange"
                            v-bind:current-page="currentPage"
                            v-bind:page-size="pageInfo.pageSize"
                            v-bind:total="pageInfo.totalCount"
                            layout="total, prev, pager, next, jumper">
                    </ui-pagination>
                </div>

                <router-view></router-view>
         </div>

</template>

<script>
import viewSearch from './part/Search'
import xhr from 'service'
import {order} from 'service/api'
export default {
        data() {
                return {
                        recordList: [{

                            date: '2017-02-01',
                            avator: 'static/01.png',
                            nick: '夏雨',
                            tel: '145658558',
                            payment: '68',
                            remark: '抢购成功后凭手机号码就能以68元超低价, 海鲜双人',
                            status: '未使用'
                        },{

                            date: '2017-02-01',
                            avator: 'static/01.png',
                            nick: '夏雨',
                            tel: '145658558',
                            payment: '68',
                            remark: '抢购成功后凭手机号码就能以68元超低价, 海鲜双人',
                            status: '未使用'
                        },{

                            date: '2017-02-01',
                            avator: 'static/01.png',
                            nick: '夏雨',
                            tel: '145658558',
                            payment: '68',
                            remark: '抢购成功后凭手机号码就能以68元超低价, 海鲜双人',
                            status: '未使用'
                        },{

                            date: '2017-02-01',
                            avator: 'static/01.png',
                            nick: '夏雨',
                            tel: '145658558',
                            payment: '68',
                            remark: '抢购成功后凭手机号码就能以68元超低价, 海鲜双人',
                            status: '未使用'
                        }],
                        multipleSelection: [],
                        currentPage: 1,
                        pageInfo: {},
                        currentPage: 1
                }
        },

        watch: {
                'currentPage': function(){

                        this.getRecordData()
                }
        },

        methods: {

                handleSelectionChange(val) {
                        this.multipleSelection = val;
                },

                handleCurrentChange(val) {
                    this.currentPage = val;
                    //console.log(val);
                },

                getRecordData: function(){

                        xhr({
                                url: order.OrderRecord,
                                options: {

                                        createDateEnd: '',
                                        createDateStart: '',
                                        currentPage: this.currentPage,
                                        operateOfOrder: '',
                                        shopId: 13,
                                        tel: ''
                                }
                        }).then( response => {
                                let recordList = response.queryOrderRecordList
                                if(recordList && recordList.length) {
                                        recordList.forEach( (item, index)=> {

                                                this.recordList.push({
                                                        orderNo: item.orderNo||'aaace5',
                                                        tel: item.tel,
                                                        dateTime: item.dateTime,
                                                        status: item.status,
                                                        orderReamark: item.orderReamark
                                                })
                                        })
                                }
                                this.pageInfo = response.pageInfo;
                        })
                }
        },


        created: function(){
                // 初始化数据
                //this.getRecordData()
        },

        components: {
            viewSearch
        }
}
</script>

<style lang="scss">
@import '~scss/var.scss';
.buying-record {

        img {
            max-width: 80px;
            vertical-align: middle;
        }
        .remark {
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .date {
            color: $c-master;
        }
}


.pagination {
        text-align: center;
        margin-top: 30px;
}
</style>