<template>
  <div>
    <section id="bgContainer">
      <view-operate v-on:render="renderSearch"></view-operate>
      <!--dialog-->
      <view-info v-bind:packageFoods="renderInfo"></view-info>
      <!--翻页-->
      <div class="page-container">
        <ui-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange"
                       v-bind:current-page="pages.currentPage"
                       v-bind:page-sizes="[pages.pageSize]" :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper" v-bind:total="pages.totalPage">
        </ui-pagination>
      </div>
    </section>
  </div>

</template>

<script>
  import viewDishes from "./part/Dishes"
  import viewOperate from "./part/Operate"
  import viewInfo   from "./part/Information"
  import xhr from 'service'
  import {packages} from 'service/api'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        renderInfo: [],
        options: [{
          value: '1',
          label: '上架'
        }, {
          value: '2',
          label: '下架'
        }],
        value: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        radio: '1',
        currentPackage: [],
        pages: {}
      }
    },
    created(){
      xhr({
        url: packages.queryPackageListPage,
        options: {
          shopId: this.shopId,
          session: this.session,
          currentPage:1,
          status:1
        }
      }).then((data) => {
        console.log(data)
      this.renderInfo = data.packageList;
      this.pages = data.pageInfo;
    })
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    computed: {
      open: function () {
        return false
      }
    },
    methods: {
      renderSearch(data){
        if (!data.input & !data.value) {
          return false
        }
        xhr({
          url: packages.queryPackageListPage,
          options: {
            person: data.input,
            status: data.value,
            shopId: this.shopId,
            session: this.session,
          }
        }).then((data) => {
          this.renderInfo = [];
          this.renderInfo = data.packageList;
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
        console.log(this.pages)
      }
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    components: {
      viewOperate,
      viewInfo
    }
  }
</script>

<style lang="scss">
  #pa-deskMain {
    height: 106px;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    background: #fff;
  }

  /*dialog*/
  .pa-min, .pa-max {
    width: 200px !important;
  }

  .pa-menu {
    margin: 30px 0;
  }

  .pa-form {
    display: flex;

  li {
    margin-right: 10px;
  }

  }
  .el-dialog__title {
    display: inline-block;
    width: calc(100% - 14px);
    text-align: center;
  }
</style>
