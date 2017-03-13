<template>
  <section>
    <div id="pa-deskMain">
      <div class="form-group margin">
        <label class="pa-label">适用人数</label>
        <ui-input v-model="input" placeholder="请输入内容"></ui-input>
      </div>
      <div class="form-group" id="btns">
        <label class="pa-label">状态</label>
        <ui-select v-model="value" placeholder="请选择">
          <ui-option v-for="(item, index) in options" :label="item.label" :value="item.value" :key="index">
          </ui-option>
        </ui-select>
      </div>
      <ui-button type="primary" v-on:click="handelSearch">查询</ui-button>
      <ui-button type="primary" v-on:click="addFoods">添加套餐</ui-button>
    </div>
    <!--dialog-->
    <ui-dialog title="添加套餐" v-model="dialogVisible">
      <ul :model="form" class="pa-form">
        <li label="适用人数" :label-width="formLabelWidth">
          <span class="pa-label">适用人数</span>
          <ui-input v-model="form.name" auto-complete="off" class="pa-min"></ui-input>
        </li>
        <li :label-width="formLabelWidth">
          <span class="pa-label">至</span>
          <ui-input v-model="form.name" auto-complete="off" class="pa-max"></ui-input>
        </li>
        <li label="排序" :label-width="formLabelWidth">
          <span class="pa-label">排序</span>
          <ui-input v-model="form.name" auto-complete="off" class="pa-max"></ui-input>
        </li>
        <li>
          <ui-button label="新增组合" v-on:click="addDish">新增组合</ui-button>
        </li>
      </ul>
      <div class="pa-menu">
        <ui-tabs v-model="activeName" v-on:tab-click="handleClick" v-on:tab-remove="removeDish">
          <ui-tab-pane v-for="(item, index) in setMealList" :label="item.title" :name="item.name" :key="index"
                       v-bind:closable="close" editable>
            <ui-button>添加菜品</ui-button>
            <!--dishes component-->
            <view-dishes v-bind:cate="item.content" :count=false></view-dishes>
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
        <ui-button v-on:click="dialogVisible = false">取 消</ui-button>
        <ui-button type="primary" v-on:click="dialogVisible = false">确 定</ui-button>
      </div>
    </ui-dialog>
  </section>
</template>

<script>
  import viewDishes from "viewcommon/Dishes"
  export default {
    name: 'Operate',
    data(){
      return {
        input: '',
        radio: 2,
        options: [{
          value: '1',
          label: '上架'
        }, {
          value: '2',
          label: '下架'
        }],
        value: '',
        dialogVisible: false,
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
        close: false,   //动态标签开关
        formLabelWidth: '120px',
        activeName: '1',
        setMealIndex: '1',
        setMealList: [],
        tabIndex: 1,
        packageFoods: [
          {
            id: 1,
            minPeople: 2,
            maxPeople:4,
            packageFoods: [{
              title: '红烧肉',
              originprice: '25',
              currentprice: '20',
              picUrl: ''
            }, {
              title: '鱼香肉丝dd',
              originprice: '30',
              currentprice: '20',
              picUrl: ''
            }, {
              title: '麻辣鸡丝ddd',
              originprice: '25',
              currentprice: '20',
              picUrl: ''
            }],
            packagePrice: 250.00,
            packageStatus: "上架"
          }, {
            id: 2,
            minPeople: 4,
            maxPeople:6,
            packageFoods: [{
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
            }],
            packagePrice: 270.00,
            packageStatus: "上架"
          }
        ]
      }
    },
    methods: {
      handelSearch(e){
//        console.log(this);
//        console.log(e)
      },
      handleClick(tab, event){
//        console.log(tab, event);
      },
      addFoods(){
        this.dialogVisible = true;
//        console.log(this)
      },
      addDish(){
        let newTabName = ''+this.tabIndex++ ;
        let activeName = newTabName;
        console.log(this.tabIndex)
        this.setMealList.push({
          title: '组合' + newTabName,
          name: newTabName,
        });
        this.setMealIndex = newTabName;
        this.activeName = newTabName;
      },
      removeDish(targetName){
        let tabs = this.setMealList;
        let activeName = this.setMealIndex;
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
  #pa-item {
    margin-top: 30px;
    padding-bottom: 100px;

  .pa-itemId {
    width: 100%;
    background: #ceccc8;
    align-items: center;
    height: 70px;
    display: flex;
    justify-content: space-around;

  span {
    text-align: center;
  }

  }

  .shopTable {

  li {
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: black;
    min-height: 110px;

  span {
    text-align: center;
  }

  }

  }
  }
  .form-group {
    margin: 0 20px;
    display: flex;
    align-items: center;

  .pa-label {
    margin: 0 5px;
    white-space: nowrap;
  }

  .ui-input {
    width: 200px;
    margin-left: 10px;
  }

  }
  .ui-button {
    width: 120px;
    margin: 0 10px;
  }

</style>
