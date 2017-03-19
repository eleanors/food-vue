<template>
  <section id="history">
    <ui-row class="title">
      <ui-col :span="4">
        <span>提取时间</span>
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
      <ui-col :span="4" class="inputBox">
        <span>账户类型</span>
        <ui-select clearable placeholder="账户类型" class="selection">
          <option value="j"></option>
        </ui-select>
      </ui-col>
      <ui-col :span="4" class="inputBox">
        <span>提取状态</span>
        <ui-select clearable placeholder="提取状态" class="selection">
          <option value="j"></option>
        </ui-select>
      </ui-col>
      <ui-col :span="4" class="inputBox">
        <span>提取类型</span>
        <ui-select clearable placeholder="提取类型" class="selection">
          <option value="j"></option>
        </ui-select>
      </ui-col>
      <ui-col :span="4" class="inputBox">
        <ui-button type="success" class="btn-search">查询</ui-button>
      </ui-col>

    </ui-row>
    <view-record></view-record>
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
    },
    components: {
      viewRecord
    }
  }
</script>

<style lang="scss">
  #history {

  .title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    height: 106px;
  }

  .selection {
    width: 200px;
  }
  .nav{
    display: flex;
    justify-content: center;
    bottom:20px;
  }
  }
</style>
