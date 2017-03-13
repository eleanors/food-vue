<template>
  <section>
    <!--dialog-->
    <ui-dialog title="添加套餐" v-model="dialogFormVisible">
      <ul :model="form" class="pa-form">
        <li label="适用人数" :label-width="formLabelWidth">
          <span class="pa-label">适用人数</span>
          <ui-input v-model="mealMinPeople"  auto-complete="off" class="pa-min"></ui-input>
        </li>
        <li :label-width="formLabelWidth">
          <span class="pa-label">至</span>
          <ui-input v-model="mealMaxPeople" auto-complete="off" class="pa-max"></ui-input>
        </li>
        <li label="排序" :label-width="formLabelWidth">
          <span class="pa-label">排序</span>
          <ui-input v-model="setMealOrder" auto-complete="off" class="pa-max"></ui-input>
        </li>
        <li>
          <ui-button label="新增组合" v-on:click="addGroup()">新增组合</ui-button>
        </li>
      </ul>
      <div class="pa-menu">
        <ui-tabs  v-on:tab-click="handleClick" v-on:tab-remove="removeGroup">
          <ui-tab-pane v-for="(list, index) in setMealList" :label="list.label"  :key="index" >
            <ui-button>添加菜品</ui-button>
            <!--dishes component-->
            <view-dishes v-bind:cate="list.packageGroups" :count=false></view-dishes>
          </ui-tab-pane>
        </ui-tabs>
      </div>
      <div class="pack-status">
        <label>套餐状态</label>
        <ui-radio-group v-model="radio">
          <ui-radio :label="1">上架</ui-radio>
          <ui-radio :label="2">下架</ui-radio>
        </ui-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <ui-button v-on:click="dialogFormVisible = false">取 消</ui-button>
        <ui-button type="primary" v-on:click="dialogFormVisible = false">确 定</ui-button>
      </div>
    </ui-dialog>
    <!--dialog end-->
    <div id="pa-item">
      <div class="pa-itemId">
        <span class="pa-sum">适用人数</span>
        <span class="pa-foods">包含菜品</span>
        <span class="pa-price">套餐价格</span>
        <label>
          状态
        </label>
        <div class="pa-operate">操作</div>
      </div>
      <ul class="shopTable">
        <li v-for="(item, index) in packageFoods">
          <span class="pa-sum">{{item.minPeople}}-{{item.maxPeople}}</span>
          <div class="pa-foods">
            <span v-for="(list,index) in item.packageGroups">{{list.title+' '}}</span>
          </div>
          <span class="pa-price">{{item.packagePrice}}</span>
          <span class="pa-status">{{item.packageStatus}}</span>
          <div class="pa-operate">
            <ui-button id="pa-edit" v-on:click="editPackage(item)">编辑</ui-button>
            <ui-button id="pa-delet">删除</ui-button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import viewDishes from "viewcommon/Dishes"
  import xhr from 'service'
  import {packages} from 'service/api'
  export default{
    data(){
      return {
        dialogFormVisible: false,
        form: {
          name: '',
        },
        setMealOrder:'',
        mealMinPeople:'',
        mealMaxPeople:'',
        close: false,   //动态标签开关
        formLabelWidth: '120px',
        editableTabsValue: '1',
        setMealIndex: '1',
        activeName: '1',
        setMealList: [],
        tabIndex: 1,
        packageFoods: [{
          id: 1,
          name:'1',
          minPeople: 2,
          maxPeople:4,
          label: '组合１',
          packageGroups: [{
            title: '红烧肉',
            originprice: '25',
            currentprice: '20',
            picUrl: ''
          }, {
            title: '鱼香肉丝',
            originprice: '30',
            currentprice: '20',
            picUrl: ''
          }, {
            title: '麻辣鸡丝',
            originprice: '25',
            currentprice: '20',
            picUrl: ''
          },],
          packagePrice: 250.00,
          packageStatus: "上架"
        }, {
          id: 2,
          name:'1',
          minPeople: 4,
          maxPeople:6,
          label: '组合１',
          packageGroups: [{
            title: '红烧肥肠',
            originprice: '25',
            currentprice: '20',
            picUrl: ''
          }, {
            title: '鱼香茄子',
            originprice: '30',
            currentprice: '20',
            picUrl: ''
          }, {
            title: '麻婆豆腐',
            originprice: '25',
            currentprice: '20',
            picUrl: ''
          }, {
            title: '澳洲牛排',
            originprice: '25',
            currentprice: '20',
            picUrl: ''
          }],
          packagePrice: 270.00,
          packageStatus: "上架"
        }],
        radio: 3
      }
    },
    mounted(){
      xhr({
        url: packages.getQueryPackage,
        options: {
          shopId: 5
        }

      }).then((data) => {
        console.log(data)
      })
    },
    methods: {
      handelSearch(e){
//        console.log(this);
//        console.log(e)
      },
      handleClick(tab, event){
        console.log(tab, event);
      },
//      编辑套餐
      editPackage(item){
        let newTabName=this.tabIndex+''
        this.dialogFormVisible = true;
        this.setMealList=[];
        this.setMealList.push(item)
        this.editableTabsValue=newTabName;
        this.mealMaxPeople=item.maxPeople;
        this.mealMinPeople=item.minPeople;
//        console.log(this.setMealList);
        xhr({

        })
      },
//      增加组合
      addGroup(){
        let newTabName = '' + this.tabIndex++;
        let activeName = newTabName;
        console.log(this.tabIndex)
//        this.setMealList.push({
//          label: '组合' + newTabName,
//          name: newTabName,
//          packageGroups: [{
//            title: 'hhhh'
//          }]
//        });
      },
//      删除组合
      removeGroup(){
        let tabs = this.setMealList;
//        let activeName = this.setMealIndex;
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
        this.activeName = targetName - 1;
        this.setMealList = tabs.filter(tab => tab.name !== targetName);
      }
    },
    components: {
      viewDishes
    }
  }
</script>

<style lang="scss">
  .pa-sum {
    width: 60px;
  }

  .pa-foods {
    width: 300px;
    text-align: center;
  }

  .pa-operate {
    width: 172px;
    display: flex;
    justify-content: space-around;

  #pa-edit:before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(~images/package/desk_01.gif);
  }

  #pa-delet:before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(~images/package/desk_02.png);
  }

  }
  #pa-delet, #pa-edit {
    display: flex;
    align-items: center;
    border: none;
  }

  .pa-price {
    width: 60px;
  }
</style>
