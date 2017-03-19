<template>
  <section id="order" v-model="recordFlag">
    <ui-row class="title">
      <ui-col :span="4">
        <span>时间1</span>
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
        <span>交易类型</span>
        <ui-select clearable placeholder="全部" v-model="businessType">
          <ui-option v-for="(list, index) in businessList" :label="list.label" :value="list.value" :key="index"></ui-option>
        </ui-select>
      </ui-col>
      <ui-col :span="5" class="inputBox">
        <span>支付方式</span>
        <ui-select clearable placeholder="全部" v-model="form">
          <ui-option v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index"></ui-option>
        </ui-select>
      </ui-col>
      <ui-col :span="4" class="inputBox">
        <ui-button type="success" class="btn-search">查询</ui-button>
      </ui-col>

    </ui-row>
    <ui-table v-bind:data="dailyForm" v-for="(item, index) in dailyForm" :key="index">
      <ui-table-column class="ac-li" :span="4" label="订单号" prop="id"></ui-table-column>
      <ui-table-column class="ac-li" :span="6" label="交易类型" prop="commissionRate">
      </ui-table-column>
      <ui-table-column class="ac-li" :span="4" label="支付方式" ></ui-table-column>
      <ui-table-column class="ac-li" :span="6" label="金额" ></ui-table-column>
      <ui-table-column class="ac-li" :span="4" label="交易时间" ></ui-table-column>
    </ui-table>
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
  import viewRecord from  './part/Record'
  export default{
    props: {
      dailyForm: {
        type: Array,
        default: () => []
      }
    },
    created(){
        console.log(this.dailyForm)
    },
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
        businessList: [
          {label: '堂食', value: 1}
        ],
        businessType: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now();
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
          {label: '支付宝', value: 1},
          {label: '微信', value: 2},
          {label: '银联', value: 3},
        ],

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
    },
    components: {

      viewRecord
    }
  }
</script>

<style lang="scss">
  #order {

  .title {
    height: 106px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .nav {
    display: flex;
    justify-content: center;
    bottom: 20px;
  }

  }
</style>
