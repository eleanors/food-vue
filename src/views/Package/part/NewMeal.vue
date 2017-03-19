<template>
  <ui-dialog title="添加菜品" v-model="dishDilag" type="card" editable v-on:edit="handleTabsEdit" id="dialog">
    <div v-on:click="confirm" class="comfirmDish">
      <ui-button>确认加菜</ui-button>
      <view-foods></view-foods>
    </div>
    <ui-tabs>
      <ui-tab-pane v-for="(item,index) in dishes" :label="item.categoryTitle" :name="item.index" :key="item.index">
        <view-dishes v-bind:cate="item.itemList" v-bind:count="true"></view-dishes>
      </ui-tab-pane>
    </ui-tabs>
  </ui-dialog>
</template>

<script>
  import viewDishes from './Dishes'
  import viewFoods from './Foods'
  import xhr from 'service'
  import {packages} from 'service/api'
  import {mapGetters} from 'vuex'
  export default{
    props: ['dishDilag'],
    data(){
      return {
        dishes: [],
        items: [],
        foodsFlag: false,
        num: 0
      }
    },
    created(){
      xhr({
        url: packages.queryShopItemList,
        options: {
          shopId: this.shopId,
          session: this.session,
        }
      }).then((data) => {
        this.dishes = data.queryShopCategoryList;
        this.items = data.queryShopCategoryList.itemList
      })
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      plus(){
        this.num = 1
      },
      sub(){
        this.num = 0
      },
      confirm(){

      }
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    components: {
      viewDishes,
      viewFoods
    }
  }
</script>

<style lang="scss">
  #dialog {

  .el-tabs__content {
    min-height: 300px
  }

  .comfirmDish {
    position: relative;
    overflow: visible;

  button {
    float: right;
  }
  button:hover{
    display: block;
  }
  .transition {
    display: none;
    width: 300px;
    position: absolute;
    right: 0;
    top: 40px;
    border: 1px solid;
    z-index:999;
    background: palevioletred;
  li{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  input {
    width: 20px;
    float: right;
  }
  .count{
    width:50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  }
  }
  }
  .section-food-list {

  .food-item {
    height: 164px;

  .pic {
    width: 152px;

  img {
    width: 100%;
  }

  }

  .detail {
    height: 100%;
    padding-left: 10px;
    margin-left: 152px;
    overflow: hidden;
  }

  h4 {
    font-size: 24px;
    font-weight: normal;
    min-height: 36px;
  }

  .price {
    min-height: 30px;

  span {
    vertical-align: middle;

  &
  :first-child {
    font-size: 18px;
    font-family: "microsoft yahei";
    color: #fc7000;
    /*margin-right: 20px;*/
    font-style: normal;
  }

  &
  :last-child {
    font-size: 14px;
    color: #ccc;
    font-style: normal;
    text-decoration: line-through;
  }

  }
  }
  .food-amount {
    font-size: 0;

  &
  >
  * {
    vertical-align: middle;
  }

  i {
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: #2eb165;
    border: 2px solid #2eb165;
    border-radius: 34px;
    cursor: pointer;
    position: relative;
  }

  .reduce::before {
    display: block;
    content: '';
    width: 14px;
    height: 2px;
    background: #2eb165;
    position: absolute;
    left: 8px;
    top: 14px;
  }

  .add {
    background: #2eb165;

  &
  ::before {
    display: block;
    content: '';
    width: 14px;
    height: 2px;
    background: #fff;
    position: absolute;
    left: 8px;
    top: 14px;
  }

  &
  ::after {
    display: block;
    content: '';
    width: 2px;
    height: 14px;
    background: #fff;
    position: absolute;
    left: 14px;
    top: 8px;
  }

  }
  input {
    width: 46px;
    height: 34px;
    border: 0;
    background: none;
    color: #656565;
    text-align: center;
    padding: 0px 8px;
    font-size: 14px;
    outline: none;
  }

  }
  }
  }
</style>
