<template>
  <section id="pa-deskMain">
    <ui-form v-bind:model="searchInfoFrom" ref="searchInfoFrom" v-bind:rules="rules">
      <ui-form-item prop="input" type="input" v-model.number="searchInfoFrom.input" label="适用人数"
                    :label-width="formLabelWidth">
        <ui-input v-model.number="searchInfoFrom.input" placeholder="请输入内容"></ui-input>
      </ui-form-item>
      <ui-form-item v-model="searchInfoFrom.input" label="状态" prop="value" label-width="50px">
        <ui-select v-model="searchInfoFrom.value" placeholder="请选择">
          <ui-option v-for="(item, index) in options" :label="item.label" :value="item.value" :key="index">
          </ui-option>
        </ui-select>
      </ui-form-item>
      <ui-form-item>
        <ui-button type="primary" v-on:click="handelSearch(searchInfoFrom)" class="btn-search  ">查询</ui-button>
      </ui-form-item>
      <ui-form-item>
        <ui-button type="primary" v-on:click="addFoods" v-model="addDishForm" class="btn-orange btn-add">添加套餐</ui-button>
      </ui-form-item>
    </ui-form>
    <!--添加套餐-->
    <view-add v-if="addDishForm"></view-add>
  </section>
</template>

<script>
  import viewDishes from "./Dishes"
  import viewInfo from "./Information"
  import viewAdd from "./AddDish"
  export default {
    name: 'Operate',
    data(){
      return {
        searchInfoFrom: {
          input: '',
          value: '',
        },
        rules: {
          input: [
            {required: false, type: 'number', message: '请输入数值', trigger: 'blur,change'}
          ]
        },
        radio: 1,
        options: [{
          value: '1',
          label: '上架'
        }, {
          value: '2',
          label: '下架'
        }],

        dialogVisible: false,
        form: {
          name: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
        },
        close: false,   //动态标签开关
        formLabelWidth: '80px',
        activeName: '1',
        setMealIndex: '1',
        setMealList: [
          {
            title: '组合1',
            name: '1'
          }
        ],
        tabIndex: 1,
        packageFoods: [],
        flag: false,
        addForm: [],
        dialogAdd: false,
        addDishForm: false,
      }
    },
    methods: {
      handelSearch(data){
        let renderData = data;
        this.$emit('render', renderData)
      },
      handleClick(tab, event){
//        console.log(tab, event);
      },
      addFoods(){
        this.addDishForm = true;
      },
      addDish(){
        let newTabName = ++this.tabIndex + '';
        let activeName = newTabName;
        console.log(this.tabIndex)
        this.setMealList.push({
          title: '组合' + newTabName,
          name: newTabName,
        });
        this.setMealIndex = newTabName;
        this.activeName = newTabName;
        if (newTabName > 1) this.flag = true;
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
      viewDishes,
      viewAdd
    }
  }
</script>

<style lang="scss">
  #pa-deskMain {
    margin-top: 30px;
  .el-form{
    width: 100%;
    display: flex;
    align-items: center;
    margin: 40px;
    .el-form-item{
      margin:0;
    }
  }
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

  .search, .add {
    margin-left:20px;
    width:100px;
    display: inline-block;
  }
  }
</style>
