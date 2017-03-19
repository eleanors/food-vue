<template>
  <section id="index">
    <view-search></view-search>
    <view-detail v-if="flag==1" v-bind:turnoverList="form" v-on:handleEvent="ParentHandleEvent"></view-detail>
    <view-record  v-else-if="flag==2"></view-record>
    <view-order v-bind:dailyForm="detailForm" v-else="flag==3"></view-order>
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
  import viewSearch from './part/Search'
  import viewDetail from './part/Detail'
  import viewRecord from  './part/Record'
  import viewHistory from './History.vue'
  import viewCustomer from './Customer.vue'
  import viewOrder from './Order.vue'
  import xhr from 'service'
  import {account} from 'service/api'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return{
        flag:1,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        form:[],
        detailForm:[],
        orderFlag:false
      }
    },
    created(){
      xhr({
        url: account.queryTurnoverList,
        options: {
//          shopId: 26,
//          session: 'MTUxMTQ4MjUyODE7MURCNzhCMUUzMTUyNkY0QzU5QjI0OTMwRjY4QjJEQzE7MQ',
          shopId: this.shopId,
          session: this.session,
          bgnWithdrawDate:'2017-01-01',
          endWithdrawDate:'2017-04-01'
        }
      }).then((data) => {
        this.form = data.turnoverList;
        this.pages = data.pageInfo;
      })
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      ParentHandleEvent(data){
        this.detailForm.push(data);
      }
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    components: {
      viewSearch,
      viewDetail,
      viewRecord,
      viewOrder
    },
  }
</script>

<style lang="scss">
#index{
  height:calc(100% - 100px);
  .nav{
    display: flex;
    justify-content: center;
    bottom:20px;
  }
}
</style>
