<template>
  <section id="bgContainer">
    <view-search v-on:searchTable="searchTable"></view-search>
    <view-detail v-bind:tableData="renderData"></view-detail>
    <!--翻页-->
    <div class="page-container">
      <ui-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange"
                     v-bind:current-page="pages.currentPage"
                     v-bind:page-sizes="[10,20,30,40]" :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper" v-bind:total="pages.totalCount">
      </ui-pagination>
    </div>
  </section>
</template>

<script>
  import viewSearch from './part/Search.vue'
  import viewDetail from './part/Details.vue'
  import xhr from 'service'
  import {deskManage} from 'service/api'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        renderData: [],
        pages: {}
      }
    },
    created(){
      xhr({
        url: deskManage.findShopTablePage,
        options: {
          shopId: this.shopId,
          session: this.session
        }
      }).then((data) => {
          console.log(data)
        this.renderData = data.findShopTablePage
      this.pages = data.pageInfo;
    })

    },
    methods: {
      searchTable(data){
        if (!data.input & !data.searchType) {
          alert('请输入数据后再查询')
          return false
        }
        xhr({
          url: deskManage.findShopTablePage,
          options: {
            shopId: 5,
            session: 'MTg0MzU3MDU2NjU7QzVBRDAwNjk4NEI3OTYxODYyOTEwNkJFNEU3NEMyNzQ7MQ',
            tableName: data.input,
            type: data.searchType
          }
        }).then((data) => {
          this.renderData = data.findShopTablePage;
      })
      },
//      翻页处理
      handleSizeChange(val) {
        console.log(this.pages)
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        xhr({
          url: deskManage.findShopTablePage,
          options: {
            shopId: 5,
            session: 'MTg0MzU3MDU2NjU7QzVBRDAwNjk4NEI3OTYxODYyOTEwNkJFNEU3NEMyNzQ7MQ',
            currentPage:val
          }
        }).then((data)=>{
          this.renderData = data.findShopTablePage;
        })
      }
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    components: {
      viewSearch,
      viewDetail
    }
  }
</script>

<style lang="scss">
  #bgContainer{

  .page-container {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  }

</style>
