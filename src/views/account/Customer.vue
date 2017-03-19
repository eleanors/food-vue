<template>
  <section id="customer">
    <ui-row class="title">
      <ui-col :span="4">
        <span>时间</span>
        <ui-date-picker v-model="account.value" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                        class="date-picker" format="yyyy-MM-dd" v-on:change="format">
        </ui-date-picker>
      </ui-col>
      <ui-col :span="4">
        <span>至</span>
        <ui-date-picker v-model="account.value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1"
                        format="yyyy-MM-dd" v-on:change="format1">
        </ui-date-picker>
      </ui-col>
      <ui-col :span="5" class="inputBox">
        <span>顾客姓名</span>
        <ui-input label="顾客姓名" class="customerName" placeholder="仅支持中文、英文">顾客姓名</ui-input>
      </ui-col>
      <ui-col :span="4" class="inputBox">
        <ui-button type="success" class="btn-search">查询</ui-button>
      </ui-col>
    </ui-row>
    <ui-row class="account-title">
      <ui-col class="ac-li" :span="4">顾客姓名</ui-col>
      <ui-col class="ac-li" :span="6">消费日期</ui-col>
      <ui-col class="ac-li" :span="4">消费金额</ui-col>
      <ui-col class="ac-li" :span="6">扣点比例</ui-col>
      <ui-col class="ac-li" :span="4">分成金额</ui-col>
    </ui-row>
    <ui-row class="account-info">
      <ui-col class="data-detail" :span="4">
        <span>2017-3-1</span>
      </ui-col>
      <ui-col class="data-detail" :span="6">
        <span>200.00</span>
      </ui-col>
      <ui-col class="data-detail" :span="4">
        <span>10%</span>
      </ui-col>
      <ui-col class="data-detail" :span="6">
        <span>200.00</span>
      </ui-col>
      <ui-col class="data-detail" :span="4">
        <span>20</span>
      </ui-col>
    </ui-row>
    <ui-pagination class="nav"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage4"
                   :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="400">
    </ui-pagination>
  </section>
</template>

<script>
  export default{
    data(){
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        recordFlag: false,
        account: {
          value1: '',
          value: '',
        },
        form: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now() ;
            console.log(time)
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        formLabelWidth: '100px',
        balanceForm: {
          pass: '',
          checkPass: '',
          status: false
        },
        business: false,

        options: [
          {label: '支付宝', value: '1'},
          {label: '微信', value: '2'},
          {label: '银行', value: '1'},
        ]
      }
    },
    methods: {
      format(val){
        this.account.value = val;
      },
      format1(val){
        this.account.value1 = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="scss">
  #customer {

  .title {
    background: #fff;
    height: 106px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .inputBox {
    margin: 0 10px;
  }

  .customerName {
    width: 200px;
  }

  .nav {
    display: flex;
    justify-content: center;
    bottom: 20px;
  }

  }
</style>
