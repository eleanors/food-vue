<template>

         <div class="buying-record">

                <!-- 订单数据 -->
                <ui-table class="record-table" v-bind:data="recordList" v-loading="loading" element-loading-text='拼命加载中...'>

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
import xhr from 'service'
import {order} from 'service/api'
import { mapGetters } from 'vuex'

export default {
        data() {
                return {
                        recordList: [],
                        pageInfo: {},
                        currentPage: 1,
                        loading: true
                }
        },

        computed: {
                ...mapGetters(['session', 'shopId'])
        },

        watch: {
                'currentPage': function(){

                        this.getRecordData()
                }
        },

        created: function(){
                this.getRecordData()
        },

        methods: {

                handleCurrentChange(val) {
                    this.currentPage = val;
                },

                getRecordData: function(){

                        xhr({
                                url: order.OrderRecord,
                                options: {

                                        createDateEnd: '',
                                        createDateStart: '',
                                        currentPage: this.currentPage,
                                        tel: '',
                                        shopId: this.shopId,
                                        session: this.session
                                }
                        }).then( response => {
                                let buyUserList = [];
                                let recordList = response.shopLimitedBuyUserList
                                if(recordList && recordList.length) {
                                       recordList.forEach( (item, index)=> {

                                                buyUserList.push({
                                                        tel: item.tel,
                                                        dateTime: item.createDate,
                                                        status: item.status,
                                                        orderReamark: item.directions,
                                                        avator: item.picUrl,
                                                        nick: item.nickname,
                                                        payment: item.payment
                                                })
                                        })
                                }

                                this.recordList = buyUserList;
                                this.pageInfo = response.pageInfo;
                                this.loading = false;
                        })
                }
        }
}
</script>

<style lang="scss">
@import '~scss/var.scss';
.buying-record {
        .record-table {
            width: 100%;
            min-height: 90%;
        }
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