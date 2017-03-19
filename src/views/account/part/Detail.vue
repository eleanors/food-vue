<template>
  <section id="data">
    <ui-row class="account-title">
      <ui-col :span="14">
        <ui-row id="rigth-title">
          <ui-table  v-bind:data="turnoverList" @cell-click="money">
            <ui-table-column class="ac-li" :span="4" label="时间" prop="dailyDate"></ui-table-column>
            <ui-table-column class="ac-li" :span="6" label="营业金额" prop="businessMoney">

            </ui-table-column>
            <ui-table-column class="ac-li" :span="4" label="扣点率" prop="commissionRate"></ui-table-column>
            <ui-table-column class="ac-li" :span="6" label="营业收入金额" prop="businessGetMoney"></ui-table-column>
            <ui-table-column class="ac-li" :span="4" label="订单数量" prop="businessorderNumber"></ui-table-column>
          </ui-table>
        </ui-row>
      </ui-col>
      <ui-col :span="10">
        <ui-row>
          <ui-table  style="width: 100%">
            <ui-table-column class="ac-li" :span="6" label="扫码收入金额"  prop="date"></ui-table-column>
            <ui-table-column class="ac-li" :span="6" label="扣点率" prop="name"></ui-table-column>
            <ui-table-column class="ac-li" :span="6" label="分成收入金额" prop="address"></ui-table-column>
            <ui-table-column class="ac-li" :span="6" label="扫码数量" prop="name"></ui-table-column>
          </ui-table>
        </ui-row>
      </ui-col>
    </ui-row>
  </section>
</template>

<script>
  export default{
    props:{
      turnoverList:{
        type:Array,
        default:()=>[]
      }
    },
    data(){
      return {
        detailForm:{}
      }
    },
    methods: {
      daily(){
        console.log(this.$parent.flag)
      },
      money(index,row){
         console.log(index)
        this.$emit('handleEvent',index)
        this.$parent.flag=3
      }
    }
  }
</script>

<style lang="scss">
 #data{
 .el-table{
   border:0;
 }
 .el-table--fit{
   border-left:0;
 }
 .el-table::after{
   width: 0;
 }
 }
</style>
