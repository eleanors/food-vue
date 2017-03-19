<template>
  <section id="record">
    <ui-table
      :data="tableData"
      style="width: 100%"
    v-model="listFlag">
      <ui-table-column
        prop="beforeMoney" label="账户余额" width="180">
      </ui-table-column>
      <ui-table-column
        prop="money" label="提现金额" width="180">
      </ui-table-column>
      <ui-table-column prop="withdrawChargeMoney" label="手续费">
      </ui-table-column>
      <ui-table-column prop="withdrawGetMoney" label="到账金额">
      </ui-table-column>
      <ui-table-column prop="withdrawalMode" label="账户类型">
      </ui-table-column>
      <ui-table-column prop="status" label="提现状态">
      </ui-table-column>
      <ui-table-column prop="createDate" label="申请提现时间">
      </ui-table-column>
      <ui-table-column prop="updateDate" label="到账时间">
      </ui-table-column>
    </ui-table>
  </section>
</template>

<script>
  import xhr from 'service'
  import {account} from 'service/api'
  export default {
    name: 'record',
    data() {
      return {
        tableData: [],
        listFlag:false
      }
    },
    mounted(){
      xhr({
        url: account.queryWithdrawListPage,
        options: {
          targetId: 23,
          targetType: 1,
          withdrawalMode: 2
        }
      }).then((data) => {
        console.log(data)
      })
    }
  }
</script>

<style lang="scss">
#record{
  margin-top:40px;
}
</style>
