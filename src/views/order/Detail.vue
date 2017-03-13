<template>
<div class="view-order-detail">
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

                        <div class="edit">
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
                            <div class="edit">
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
                        <div class="edit">
                                <span class="modify" v-show="!isShowPhone" v-on:click="modify('phone')">修改</span>
                                <span class="save" v-if="isShowPhone" v-on:click="save('phone')">保存</span>
                                <span class="cancel" v-if="isShowPhone" v-on:click="cancel('phone')">取消</span>
                        </div>
                </div>

                <div class="list">
                        <span class="title fs-16">桌号(包间)</span>
                        <div class="content">
                            <span v-text="dinnernumber"></span>
                            <ui-select class="dinner-number" v-model="dinnernumber" placeholder="请选择"  v-if="isShowTableNo">
                                    <ui-option v-for="(item, index) in dinnerNumOptions" :label="item.label" :value="item.value" :key="index"></ui-option>
                            </ui-select>
                        </div>
                        <div class="edit">
                                <span class="modify" v-show="!isShowTableNo" v-on:click="modify('number')">修改</span>
                                <span class="save" v-if="isShowTableNo" v-on:click="save('number')">保存</span>
                                <span class="cancel" v-if="isShowTableNo" v-on:click="cancel('number')">取消</span>
                        </div>
                </div>
        </div>

        <!-- 已选菜品 -->
        <div class="selected fs-16">

                <div class="title fs-20">已点菜品</div>
                <div class="list">
                    <ui-row class="item" :gutter="0" v-for="(food, index) in selectedFoodFilter" :key="index">
                          <ui-col :span="4" v-text="food.itemTitle"></ui-col>
                          <ui-col :span="4" v-text="food.quantity"></ui-col>
                          <ui-col :span="4" v-text="food.price"></ui-col>
                          <ui-col :span="12" v-on:click.native="retreatFood(food)">退菜</ui-col>
                    </ui-row>
                </div>
                <div class="remark">

                    <ui-row class="item" :gutter="0">
                          <ui-col :span="8">
                                <span class="remark-title va-t">备注：</span>
                                <p class="remark-content" v-text="remark" v-show="!isShowRemark"></p>
                                <ui-input class="remark-content" type="textarea" :rows="4" placeholder="请输入内容" v-model="remark" v-if="isShowRemark"></ui-input>
                          </ui-col>
                          <ui-col :span="16" class="edit fs-14">
                                <span class="modify" v-show="!isShowRemark" v-on:click="modify('remark')">修改</span>
                                <span class="save" v-if="isShowRemark" v-on:click="save('remark')">保存</span>
                                <span class="cancel" v-if="isShowRemark" v-on:click="save('remark')">取消</span>
                          </ui-col>
                    </ui-row>
                </div>
                <div class="describe">支付金额：菜品：￥{{foodTotalMoney}} 包间使用费：￥{{roomsMoney}} 总额：￥{{totalMoney}}</div>
                <div class="payment">支付方式：{{payment | paymentFilter(payment)}}</div>
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

export default {

        data: function(){
            return {
                createtime: '',
                limittime: '',
                dinnercount: '',
                customertel: '',
                dinnernumber:'',
                remark: '',
                payment: 1,

                // 支付金额
                foodTotalMoney: 0,
                roomsMoney: 0,

                // 已选菜品
                selectedFood: [],

                // 桌号选择
                dinnerNumOptions: [{
                      value: '001',
                      label: 'AX001'
                }, {
                      value: '002',
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
            }
        },

        created: function(){

            let params = this.$route.params
            this.orderId = params.id

            xhr({
                url: order.getOrderInfomation,
                options: {
                    orderNo: this.orderId
                }
            }).then(response => {
            //console.log(response)
                if(response.queryOrderInfomation){
                    let data = response.queryOrderInfomation[0]

                    let orderItemList = data.orderItemList

                    let orderRoomDetail = data.orderRoomDetail

                    this.createtime = data.createDate;
                    this.limittime = orderRoomDetail.reserveDate;
                    this.dinnercount = orderRoomDetail.metenNumber;
                    this.customertel = orderRoomDetail.linkPhone;
                    this.dinnernumber = orderRoomDetail.tableName;


                    this.remark = data.remark;
                    this.payment = data.payment;
                    this.selectedFood = orderItemList;
                    this.foodTotalMoney = data.preferentialMoneyAfter;
                }
            })
        },

        methods: {

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

            // 更新约定时间
            updateReserveDate: function(){
                xhr({
                    url: order.updateReserveDate,
                    options: {
                        orderId: this.orderId,
                        reserveDate: this.limittime,
                        userId: ''
                    }
                }).then(response => {

                        if(response.saveIndiegogoItem == '1'){

                                this.notify({
                                      message: '更新成功...',
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
                        orderId: this.orderId,
                        metenNumber: this.dinnercount,
                        userId: ''
                    }
                }).then(response => {

                        if(response.saveIndiegogoItem == '1'){

                                this.notify({
                                      message: '更新成功...',
                                      type: 'success'
                                })
                                this.isShowCount = false;
                        }
                })
            },

            // 更新顾客手机
            updateLinkTelPhone: function(){
                xhr({
                    url: order.updateLinkTelPhone,
                    options: {
                        orderId: this.orderId,
                        linkTelPhone: this.customertel,
                        userId: ''
                    }
                }).then(response => {

                        if(response.saveIndiegogoItem == '1'){

                                this.notify({
                                      message: '更新成功...',
                                      type: 'success'
                                })
                                this.isShowPhone = false;
                        }
                })
            },

            // 更新桌号(包间)
            updateTableNo: function(){
                xhr({
                    url: order.updateTableNo,
                    options: {
                        orderId: this.orderId,
                        tableNo: this.nu,
                        userId: ''
                    }
                }).then(response => {

                        if(response.saveIndiegogoItem == '1'){

                                this.notify({
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
                        orderId: this.orderId,
                        orderRemark: this.remark,
                        userId: ''
                    }
                }).then(response => {

                        if(response.saveIndiegogoItem == '1'){

                                this.notify({
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

            ensureRetreatFood: function() {
                xhr({
                    url: order.retreatFood,
                    options: {
                        orderId: this.orderId,
                        orderType: '',
                        orderRemark: this.retreatFoodReason,
                        quantity: this.retreatFoodNum
                    }
                }).then( response => {

                })
                this.isDialogVisible= false
            }
        },

        filters: {

            paymentFilter: function(type){
                return type=='3' ? '微信支付' : type == '4' ? '支付宝支付' : type == '5' ? '银联支付' : '现金支付'
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
            & > div {
                    padding-left: 30px;
            }
            .title {
                    height: 60px;
                    line-height: 60px;
                    color: $c-master;
                    border-bottom: 1px solid $border-color;
            }
            .list {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid $border-color;
                    position: relative;
                    .item {
                        height: 44px;
                        line-height: 44px;
                        & > div:last-child {
                            color: $c-master;
                            cursor: pointer;
                        }
                    }
            }
            .remark {
                    line-height: 50px;
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
            .payment {
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