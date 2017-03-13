<template>
  <section id="data">
    <ui-row class="account-title">
      <ui-col  class="ac-li" :span="2">时间</ui-col>
      <ui-col  class="ac-li" :span="2">营业金额</ui-col>
      <ui-col  class="ac-li" :span="2">扣点率</ui-col>
      <ui-col  class="ac-li" :span="2">营业收入金额</ui-col>
      <ui-col  class="ac-li" :span="2">订单数量</ui-col>
      <ui-col  class="ac-li" :span="2">扫码收入金额</ui-col>
      <ui-col  class="ac-li" :span="2">扣点率</ui-col>
      <ui-col  class="ac-li" :span="2">分成收入金额</ui-col>
      <ui-col  class="ac-li" :span="2">扫码数量</ui-col>
    </ui-row>
    <ui-row class="account-info">
      <ui-col :span="2">
 
      </ui-col>
    </ui-row>
  </section>
</template>

<script>
export default{

}
</script>

<style lang="scss">
  .account-title {
    background-color: #ceccc8;
    overflow: hidden;
    margin-top: 40px;
    height: 70px;
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    .ac-li{
      font-size: 16px;
      color: #333;
      font-weight: 500;
      text-align: center;
      line-height: 70px;
    }
  }
  .account-info {
    overflow: hidden;
    background: #fff;
    border-bottom: 2px solid#ddd;
  }
</style>
