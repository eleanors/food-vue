<template>
<section id="middle-option">
  <ui-row class="ac-button">
    <ui-col :span="4">
      <span>时间</span>
      <ui-date-picker v-model="value"  type="date" placeholder="选择日期" :picker-options="pickerOptions" class="date-picker">
      </ui-date-picker>
    </ui-col>
    <ui-col :span="4">
      <span>至</span>
      <ui-date-picker v-model="value1"  type="date" placeholder="选择日期" :picker-options="pickerOptions1">
      </ui-date-picker>
    </ui-col>
    <ui-col :span="3">
      <ui-button type="success" class="btn-search">查询</ui-button>
    </ui-col>
    <ui-col :span="3">
      <ui-button type="warning">设置提现密码</ui-button>
    </ui-col>
    <ui-col :span="3">
      <ui-button type="warning">营业收入提现</ui-button>
    </ui-col>
    <ui-col :span="3">
      <ui-button type="success">分成收入提现</ui-button>
    </ui-col>
    <ui-col :span="3">
      <ui-button type="info">提现记录</ui-button>
    </ui-col>
  </ui-row>
</section>
</template>

<script>
export default{
  data(){
      return{
        value1:'',
        value:'',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }},
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
  }
}
</script>

<style lang="scss">
  #middle-option {
    padding: 0 10px;
    background: #fff;
    height: 106px;
    .ac-button{
      display: flex;
      justify-content: space-between;
      align-items:center;
      height: 100%;
      .btn-search{
        width:120px;
      }
    }
  }
</style>
