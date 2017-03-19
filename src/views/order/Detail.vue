<template>
<div class="view-order-detail">

        <div class="order-status">

                    <div class="title">订单状态</div>
                    <div class="status">{{status | orderStatusFilter}}</div>
                    <div class="operate">
                            <span class="btn" v-if="status==3" v-on:click="addFoodHandle">加菜</span>
                            <span class="btn" v-if="status==2">开台</span>
                            <span class="btn" v-if="status==3">结账</span>
                            <span class="btn" v-if="status==4">打印</span>
                            <span class="btn" v-if="status==4">退单</span>
                            <span class="btn" v-if="status==1">受理</span>
                            <span class="btn" v-if="status==1 || status==2">取消</span>
                    </div>
        </div>
        <!-- 订单详情 -->
        <div class="detail">

                <div class="list">
                        <span class="title fs-16">下单时间</span>
                        <div class="content" v-text="createtime">2017-01-21</div>
                </div>

                <div class="list">
                        <span class="title fs-16">约定时间</span>
                        <div class="content">
                                <span v-text="limittime"></span>
                                <ui-date-picker class="time" v-model="limittime" type="date" v-bind:picker-options="pickerOptions" placeholder="选择日期" v-bind:editable="false" v-on:change="currentdDate" v-if="isShowDate" >
                                </ui-date-picker>
                        </div>

                        <div class="edit" v-if="status!==4">
                                <span class="modify" v-show="!isShowDate" v-on:click="modify('date')">修改</span>
                                <span class="save" v-if="isShowDate" v-on:click="save('date')">保存</span>
                                <span class="cancel" v-if="isShowDate" v-on:click="cancel('date')">取消</span>
                        </div>
                </div>

                <div class="list">
                        <span class="title fs-16">用餐人数</span>
                        <div class="content">
                            <span v-text="dinnercount"></span>
                            <input type="text" class="control" v-model="dinnercount" v-if="isShowCount"></div>
                            <div class="edit" v-if="status!==4">
                                    <span class="modify" v-show="!isShowCount" v-on:click="modify('count')">修改</span>
                                    <span class="save" v-if="isShowCount" v-on:click="save('count')">保存</span>
                                    <span class="cancel" v-if="isShowCount" v-on:click="cancel('count')">取消</span>
                            </div>
                </div>

                <div class="list">
                        <span class="title fs-16">顾客手机</span>
                        <div class="content">
                            <span v-text="customertel"></span>
                            <input class="control" type="text" v-model="customertel" v-if="isShowPhone">
                        </div>
                        <div class="edit" v-if="status!==4">
                                <span class="modify" v-show="!isShowPhone" v-on:click="modify('phone')">修改</span>
                                <span class="save" v-if="isShowPhone" v-on:click="save('phone')">保存</span>
                                <span class="cancel" v-if="isShowPhone" v-on:click="cancel('phone')">取消</span>
                        </div>
                </div>

                <div class="list">
                        <span class="title fs-16">桌号(包间)</span>
                        <div class="content">
                            <span v-text="tableName"></span>
                            <ui-select class="dinner-number" multiple v-model="dinnernumber" placeholder="请选择"  v-if="isShowTableNo">
                                    <ui-option v-for="(item, index) in dinnerNumOptions" :label="item.label" :value="item.value" :key="index"></ui-option>
                            </ui-select>
                        </div>
                        <div class="edit" v-if="status!==4">
                                <span class="modify" v-show="!isShowTableNo" v-on:click="modify('number')">修改</span>
                                <span class="save" v-if="isShowTableNo" v-on:click="save('number')">保存</span>
                                <span class="cancel" v-if="isShowTableNo" v-on:click="cancel('number')">取消</span>
                        </div>
                </div>
        </div>

        <!-- 已选菜品 -->
        <div class="selected fs-16">
                <!-- 已选菜品列表 -->
                <div class="list">
                        <span class="title fs-16">已点菜品</span>
                        <div class="sub-title">
                                <span>名称</span>
                                <span>单价</span>
                                <span>数量</span>
                                <span>小计</span>
                        </div>
                </div>

                <div class="food-list">
                       <p class="food-item" v-for="(food, index) in selectedFoodFilter" :key="index">
                                <span v-text="food.itemTitle"></span>
                                <span v-text="food.quantity"></span>
                                <span v-text="food.price"></span>
                                <span class="amount" v-text="food.price"></span>
                       </p>
                </div>

                <!-- 菜品要求 -->
                <div class="list">
                        <span class="title fs-16">已点菜品</span>
                        <div class="content" v-text="remark"></div>
                </div>
                <!--div class="remark">
                    <ui-row class="item" :gutter="0">
                          <ui-col :span="8">
                                <span class="remark-title va-t">菜品要求</span>
                                <p class="remark-content" v-text="remark" v-show="!isShowRemark"></p>
                                <ui-input class="remark-content" type="textarea" :rows="4" placeholder="请输入内容" v-model="remark" v-if="isShowRemark"></ui-input>
                          </ui-col>
                          <ui-col :span="16" class="edit fs-14" v-if="status!==4&&0">
                                <span class="modify" v-show="!isShowRemark" v-on:click="modify('remark')">修改</span>
                                <span class="save" v-if="isShowRemark" v-on:click="save('remark')">保存</span>
                                <span class="cancel" v-if="isShowRemark" v-on:click="save('remark')">取消</span>
                          </ui-col>
                    </ui-row>
                </div-->

                <!-- 支付金额 -->
                <div class="list">
                        <span class="title fs-16">支付金额</span>
                        <div class="sub-title pay-money">
                                <span>菜品费</span>
                                <span>桌台使用费</span>
                                <span>优惠</span>
                                <span>总额</span>
                                <span>抹零</span>
                                <span>退款</span>
                                <span>支付</span>
                        </div>
                </div>

                <!-- 支付方式 -->
                <div class="list">
                        <span class="title fs-16">支付方式</span>
                        <div class="content">{{payment | paymentFilter(payment)}}</div>
                </div>

                <!-- 退单原因 -->
                <div class="list">
                        <span class="title fs-16">退单原因</span>
                        <div class="content">客户对服务不满意</div>
                </div>
        </div>



        <ui-dialog title="正在编辑" v-model="isDialogVisible" size="tiny" top="30%">
              <div class="modal-content">
                    <view-count :value="5" v-model="retreatFoodNum" v-on:change="changeNum"></view-count>
                    <textarea class="cancel-food-reason fs-16" v-model="retreatFoodReason" placeholder="撤单原因"></textarea>
              </div>
              <span slot="footer" class="dialog-footer">
                    <ui-button v-on:click="isDialogVisible = false">取 消</ui-button>
                    <ui-button type="primary" v-on:click="ensureRetreatFood">确 定</ui-button>
              </span>
        </ui-dialog>
</div>
</template>


<script>

import xhr from 'service'
import { order } from 'service/api'
import viewCount from './part/Count'
import {formatDate} from 'vendor/utils'
import { mapGetters } from 'vuex'

export default {

        data: function(){
            return {
                // 订单状态
                status: '',
                orderNo: '',

                createtime: '',
                limittime: '',
                dinnercount: '',
                customertel: '',
                dinnernumber:[],
                remark: '',
                payment: 1,

                // 支付金额
                foodTotalMoney: 0,
                roomsMoney: 0,

                // 已选菜品
                selectedFood: [],

                // 桌号选择
                dinnerNumOptions: [{
                      value: '01',
                      label: 'AX001'
                }, {
                      value: '02',
                      label: 'AX002'
                }],

                OrderDetailList: [{
                      title: '约定时间',
                      limittime: '',
                }],

                // 操作 Editable
                isShowDate: false,
                isShowCount: false,
                isShowPhone: false,
                isShowTableNo: false,
                isShowRemark: false,

                // 时间 datePicker
                pickerOptions: {
                      disabledDate(time) {
                            return time.getTime() < Date.now();
                      }
                },

                isDialogVisible: false,

                //  退菜操作
                retreatFoodNum: 0,
                retreatFoodReason: ''
            }
        },

        computed: {

            selectedFoodFilter: function(){
                this.selectedFood.map( item => {
                    if(item.quantity == '') {
                        item.quantity = 0
                    }
                    item.price = '￥' + item.price
                })
                return this.selectedFood
            },

            totalMoney: function(){
                //console.log(this.foodTotalMoney, this.roomsMoney)
                return parseFloat(this.foodTotalMoney) + parseFloat(this.roomsMoney);
            },

            tableName: function(){
                return this.dinnernumber.join(',')
            },
            ...mapGetters(['session', 'shopId'])
        },

        watch: {
            "$route.path": function(){
                    this.createView();
            }
        },

        created: function(){

            let params = this.$route.params;
            let query = this.$route.query;
            this.orderId = query.orderId;
            this.orderNo = params.orderNo;
            this.status = params.status;
            this.createView();
            this.tableRoomInfoList()
        },

        methods: {

            createView: function(){

                    this.orderNo && xhr({
                            url: order.getOrderInfomation,
                            options: {
                                orderNo: this.orderNo,
                                shopId: this.shopId,
                                session: this.session
                            }
                    }).then(response => {

                            if(response.queryOrderInfomation && response.queryOrderInfomation.length){
                                let data = response.queryOrderInfomation[0]

                                // 菜品列表
                                let orderItemList = data.orderItemList
                                // 详情
                                let orderRoomDetail = data.orderRoomDetail

                                //this.orderNo = orderRoomDetail.orderNo
                                //this.status = orderRoomDetail.status
                                //this.orderId = orderRoomDetail.id

                                this.createtime = formatDate(data.createDate/1e3, 4);
                                this.limittime = formatDate(orderRoomDetail.reserveDate/1e3, 4);
                                this.dinnercount = orderRoomDetail.metenNumber;
                                this.customertel = orderRoomDetail.linkPhone;
                                this.tableJsonList = JSON.parse(orderRoomDetail.tableJsonList);


                                if(this.tableJsonList.length){
                                        this.tableJsonList.forEach(item=>{
                                                this.dinnernumber.push(item.shopTableName)
                                        })
                                }

                                this.remark = data.remark;
                                this.payment = data.payment;
                                this.selectedFood = orderItemList;
                                this.foodTotalMoney = data.preferentialMoneyAfter;
                            }
                    })
            },

            modify: function (type) {

                    switch(type){
                        case 'date':
                            this.isShowDate = !this.isShowDate;
                            this.currentDate = this.limittime;
                            break;
                        case 'count':
                            this.isShowCount = !this.isShowCount;
                            this.currentCount = this.dinnercount;
                            break;
                        case 'phone':
                            this.isShowPhone = !this.isShowPhone;
                            this.currentPhone = this.customertel;
                            break;
                        case 'number':
                            this.isShowTableNo = !this.isShowTableNo;
                            this.currentNumber = this.dinnernumber;
                            break;
                        case 'remark':
                            this.isShowRemark = !this.isShowRemark;
                            this.currentRemark = !this.remark;
                            break;
                    }
            },

            save: function(type){

                    switch(type){
                        case 'date':
                            this.updateReserveDate();
                            break;
                        case 'count':
                            this.updateMetenNumber();
                            break;
                        case 'phone':
                            this.updateLinkTelPhone();
                            break;
                        case 'number':
                            this.updateTableNo();
                            break;
                        case 'remark':
                            this.updateOrderRemark();
                            break;
                    }
            },

            cancel: function(type){

                    switch(type){
                        case 'date':
                            this.isShowDate = !this.isShowDate;
                            this.limittime = this.currentDate;
                            break;
                        case 'count':
                            this.isShowCount = !this.isShowCount;
                            this.dinnercount = this.currentCount;
                            break;
                        case 'phone':
                            this.isShowPhone = !this.isShowPhone;
                            this.customertel = this.currentPhone
                            break;
                        case 'number':
                            this.isShowTableNo = !this.isShowTableNo;
                            this.dinnernumber = this.currentNumber;
                            break;
                        case 'remark':
                            this.isShowRemark = !this.isShowRemark;
                            this.remark = this.currentRemark;
                            break;
                    }
            },

            currentdDate: function(value){
                this.limittime = value
            },

            changeNum: function(value){
                //console.log(78787878, value)
            },

            // 获取店铺桌号
            tableRoomInfoList: function(){

                    xhr({
                        url: order.tableRoomInfoList,
                        options: {
                                shopId: this.shopId,
                                session: this.session
                        }
                    }).then( response=>{
                        console.log(response)
                    })
            },

            // 更新约定时间
            updateReserveDate: function(){
                xhr({
                    url: order.updateReserveDate,
                    options: {
                        orderNo: this.orderNo,
                        reserveDate: this.limittime,
                        userId: '',
                        orderId: this.orderId,
                        telPhone: '',
                        shopId: this.shopId,
                        session: this.session
                    }
                }).then(response => {

                        if(response.ok){

                                this.message({
                                      message: response.ok||'更新成功...',
                                      type: 'success'
                                })
                                this.isShowDate = false;
                        }
                })
            },

            // 更新用餐人数
            updateMetenNumber: function(){
                xhr({
                    url: order.updateMetenNumber,
                    options: {
                        orderNo: this.orderNo,
                        metenNumber: this.dinnercount,
                        userId: '',
                        orderId: this.orderId,
                        telPhone: '',
                        shopId: this.shopId,
                        session: this.session
                    }
                }).then(response => {

                        if(response.ok){

                                this.message({
                                      message: '更新成功...',
                                      type: 'success'
                                })
                                this.isShowCount = false;
                        }
                })
            },

            // 更新顾客手机
            updateLinkTelPhone: function(){
                if(!this.customertel) {
                        this.message({
                              message: '不能为空',
                              type: 'warning'
                        })
                        return false;
                }else if(!(/^1[34578]\d{9}$/.test(this.customertel))) {
                        this.message({
                              message: '格式错误',
                              type: 'warning'
                        })
                        return false;
                }
                xhr({
                    url: order.updateLinkTelPhone,
                    options: {
                        orderid: this.orderid,
                        orderNo: this.orderNo,
                        linkTelPhone: this.customertel,
                        userId: '',
                        orderId: this.orderId,
                        telPhone: '',
                        shopId: this.shopId,
                        session: this.session
                    }
                }).then(response => {

                        if(response.ok){

                                this.message({
                                      message: '更新成功...',
                                      type: 'success'
                                })
                                this.isShowPhone = false;
                        }
                })
            },

            // 更新桌号(包间)
            updateTableNo: function(){

                let tableJsonList = []
                this.dinnernumber.forEach( item=>{

                        tableJsonList.push({
                                shopTableId: 1,
                                shopTableName: item,
                                useMoney: 20.0,
                                maxPerson: 10
                        })
                })
                xhr({
                    url: order.updateTableNo,
                    options: {
                        orderNo: this.orderNo,
                        userId: '',
                        orderId: this.orderId,
                        tableNo: JSON.stringify(tableJsonList),
                        telPhone: '',
                        shopId: this.shopId,
                        session: this.session
                    }
                }).then(response => {

                        if(response.ok){

                                this.message({
                                      message: '更新成功...',
                                      type: 'success'
                                })
                                this.isShowTableNo = false;
                        }
                })
            },

            // 更新备注信息
            updateOrderRemark: function(){
                xhr({
                    url: order.updateOrderRemark,
                    options: {
                        orderNo: this.orderNo,
                        orderRemark: this.remark,
                        userId: '',
                        orderId: this.orderId,
                        telPhone: '',
                        shopId: this.shopId,
                        session: this.session
                    }
                }).then(response => {

                        if(response.ok){

                                this.message({
                                      message: '更新成功...',
                                      type: 'success'
                                })
                                this.isShowRemark = false;
                        }
                })
            },

            retreatFood: function(food){

                this.isDialogVisible = true
            },

            // 确认加菜
            ensureRetreatFood: function() {
                xhr({
                    url: order.retreatFood,
                    options: {
                        orderNo: this.orderNo,
                        orderType: '',
                        orderRemark: this.retreatFoodReason,
                        quantity: this.retreatFoodNum,
                        orderId: this.orderId,
                        telPhone: '',
                        shopId: this.shopId,
                        session: this.session
                    }
                }).then( response => {

                })
                this.isDialogVisible= false
            },

            addFoodHandle: function(){
                this.$router.push({
                    name: 'OrderAdd'
                })
            }
        },

        filters: {

            paymentFilter: function(type){
                return type=='3' ? '微信支付' : type == '4' ? '支付宝支付' : type == '5' ? '银联支付' : '现金支付'
            },
            /**
             *   未受理   受理   取消
             *   已受理   开台   取消
             *   未付款   加菜   结账   打印
             *   已付款   退单   打印
             *   已退单
             *   已取消
             *   待开台
             *   未开台
            */

            orderStatusFilter: function(status){
                    let text = ''
                    if(status == 1){
                            text = '未受理'
                    }else if(status == 2){
                            text = '已受理'
                    }else if(status == 3){
                            text = '未付款'
                    }else if(status == 4){
                            text = '已付款'
                    }else if(status == 5){
                            text = '已退单'
                    }else if(status == 6){
                            text = '已取消'
                    }else if(status == 7){
                            text = '未开台'
                    }else if(status == 8){
                            text = '待开台'
                    }

                    return text;
            }
        },

        components: {viewCount}
}
</script>


<style lang="scss">
@import '~scss/var.scss';

.view-order-detail {

    height: 100%;

    .edit {
            float: left;
            padding-left: 40px;

            span {
                    width: 68px;
                    height: 22px;
                    line-height: 20px;
                    display: inline-block;
                    text-align: center;
                    border-radius: 10px;
                    border: 1px solid $border-color;
                    margin-right: 10px;
                    vertical-align: middle;
                    cursor: pointer;
            }
            .save {
                    color: #fff;
                    background: $c-master;
            }
            .cancel {
                    background: $border-color;
            }
    }

    .order-status {
            box-sizing: border-box;
            background: #ccc;
            height: 60px;
            line-height: 60px;


            overflow: hidden;
            & > div {
                    float: left;
            }
            .title {
                    width: 200px;
                    text-indent: 50px;
            }
            .status {
                    width: 20%;
            }
            .operate {
                    float: right;
                    padding-right: 10px;

                    .btn {

                        padding: 12px 36px;
                        font-size: 16px;
                    }
            }
    }

    .detail {
            background: #fff;
            .list {
                    height: 80px;
                    line-height: 80px;
                    border-bottom: 1px solid $border-color;
            }
            .title {
                    float: left;
                    width: 220px;
                    color: $c-master;
                    text-indent: 50px;
            }
            .content {
                    float: left;
                    width: 240px;
                    height: 100%;
                    text-align: center;
                    position: relative;
                    input[type='text'] {
                            color: #545454;
                    }
                    input.control{
                            width: 190px;
                            height: 34px;
                            padding: 6px 12px;
                            border: 1px solid $border-color;
                            border-radius: 4px;
                            position: absolute;
                            left: 24px;
                            top: 22px;
                    }

                    .dinner-number, .time {
                        position: absolute;
                        left: 24px;
                        top: 22px;
                        width: 188px;
                        height: 36px;
                        line-height: 1;
                    }
            }
    }

    .selected {
            margin-top: 20px;
            background: #fff;

            .list {
                    height: 60px;
                    line-height: 60px;
                    border-bottom: 1px solid $border-color;
                    position: relative;
                    overflow: hidden;

                    .title {
                            float: left;
                            display: inline-block;
                            width: 200px;
                            text-indent: 50px;
                            color: $c-master;
                    }

                    .sub-title{
                            font-size: 0;
                            white-space: nowrap;
                            word-break: break-all;
                            overflow: hidden;
                            span {
                                    display: inline-block;
                                    height: 100%;
                                    width: 20%;
                                    font-size: 14px;
                            }
                    }

                    .content {
                            font-size: 14px;
                    }

                    .pay-money span{
                            width: 10%;
                    }
            }

            .food-list {
                    .food-item{
                            height: 44px;
                            line-height: 44px;
                            padding-left: 200px;
                            font-size: 0;

                            span{
                                    display: inline-block;
                                    width: 20%;
                                    font-size: 14px;
                            }

                            .amount {
                                    color: $c-master;
                            }
                    }
            }


            .remark {
                    line-height: 50px;
                    resize: none;
                    .edit {
                           padding-left: 0;
                    }

                    .remark-content {
                          width: 80%;
                          line-height: 24px;
                          margin-top: 12px;
                          display: inline-block;
                          white-space: normal;
                          word-wrap: break-word;

                          .textarea {
                                  height: 100px;
                                  resize: none;
                          }
                    }
            }
            .describe {
                    line-height: 50px;
            }
    }


    .cancel-food-reason {
        width: 100%;
        height: 200px;
        padding: 10px;
        resize: none;
        border: 1px solid #ddd;
        outline: none;
    }
}
</style>