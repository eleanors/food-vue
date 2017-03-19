<template>
  <section id="addDish">
    <ui-dialog title="添加套餐" v-model="dialogAdd">
      <ui-form :model="form" class="pa-form" ref="form" v-bind:rules="rules">
        <ui-form-item prop="minPerson" label="适用人数" :label-width="formLabelWidth">
          <ui-input v-model.number="form.minPerson" type="minPerson" auto-complete="off" class="pa-min"></ui-input>
        </ui-form-item>
        <ui-form-item prop="maxPerson" label="至" label-width="40px">
          <ui-input v-model.number="form.maxPerson" auto-complete="off" class="pa-max"></ui-input>
        </ui-form-item>
        <ui-form-item prop="orderNo" label="排序" label-width="53px">
          <ui-input v-model.number="form.orderNo" auto-complete="off" class="pa-max"></ui-input>
        </ui-form-item>
      </ui-form>
      <div class="pa-menu">
        <ui-tabs v-on:tab-click="handleClick" v-bind:closable="flag" v-model="editableTabsValue" editable
                 @edit="handleTabsEdit">
          <ui-tab-pane v-for="(item, index) in form.items" :label="item.title" :name="item.name" :key="item.itemsId">
            <ui-button v-on:click="dishFlag=!dishFlag">添加菜品</ui-button>
            <!--dishes component-->
            <view-dishes v-bind:cate="item.content" v-bind:count="true"></view-dishes>
          </ui-tab-pane>
        </ui-tabs>
      </div>
      <div class="pack-status">
        <label>套餐状态</label>
        <ui-radio-group v-model="form.status">
          <ui-radio :label="1">上架</ui-radio>
          <ui-radio :label="2">下架</ui-radio>
        </ui-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <ui-button type="primary" v-on:click="setMealConfirm('form')">确 定</ui-button>
        <ui-button v-on:click="cancle">取 消</ui-button>
      </div>
    </ui-dialog>
    <view-meal v-bind:dishDilag="dishFlag"></view-meal>
  </section>
</template>

<script>
  import viewDishes from "./Dishes"
  import viewMeal from './NewMeal.vue'
  import xhr from 'service'
  import {packages} from 'service/api'
  import {mapGetters} from 'vuex'

  export default{
    data(){
      return {
        dishFlag: false,
        dialogAdd: true,
        mydialogAdd: this.dialogAdd,
        formLabelWidth: '81px',
        form: {
          items: [{
            itemIds: '1',
            title: '组合1',
            name: '1',
            content: []
          }],
          maxPerson: '',
          minPerson: '',
          orderNo: '',
          shopId: '',
          status: ''
        },
        rules: {
          minPerson: [
            {required: true, type: 'number', message: '请输入数值', trigger: 'blur,change'}
          ],
          maxPerson: [
            {required: true, type: 'number', message: '请输入数值', trigger: 'blur,change'}
          ],
          orderNo: [
            {required: true, type: 'number', message: '请输入数值', trigger: 'blur,change'}
          ]
        },
        flag: false,
        editableTabsValue: '1',
        tabIndex: 1,
        close: false,   //动态标签开关
        addDishForm: false
      }
    },
    watch: {
      dialogAdd(val) {
        this.mydialogAdd = val;
        this.$parent.addDishForm = false;
      }
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
//          let activeName = newTabName;
          this.form.items.push({
            title: '组合' + newTabName,
            name: newTabName
          });
          this.editableTabsValue = newTabName;
          if (newTabName > 1) {
            this.flag = true;
          }
        }
        if (action === 'remove') {
          let tabs = this.form.items;
          let activeName = this.editableTabsValue;
//          console.log(this.form.items)
//          console.log(activeName)
          if (activeName === targetName) {
            tabs.forEach((tab,index)=>{
              if (tab.name===targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
//                  console.log(tabs[activeName])
                }
              }
            })
          }
//          console.log(activeName)
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.splice(activeName, 1)
        }
      },
//      添加菜品
      addMeal(){
//        this.dishFlag = true;
      },
// 发送新增套餐数据
      setMealConfirm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            var packageArr = "";
            this.form.items.forEach(function (ele, index) {
              ele.content.forEach(function (ele, index) {
                console.log(ele.id)
                packageArr += ele.id + ",";
              })
              packageArr += ";"
            });
            packageArr = packageArr.replace(',;', ';')
            xhr({
              url: packages.addPackage,
              options: {
                shopId: this.shopId,
                session: this.session,
                itemIdArray: packageArr,
                maxPerson: this.form.maxPerson,
                minPerson: this.form.minPerson,
                orderNo: this.form.orderNo,
                status: this.form.status
              }
            }).then((data) => {
              console.log(data)
          })
          } else {
            return false;
      }
      })

      },
      handleClick(tab, event){
//        console.log(tab, event);
      },
      cancle(){
        this.$parent.addDishForm = false
      }

    },
    computed: {
      ...mapGetters(['session', 'shopId'])
    },
    components: {
      viewDishes,
      viewMeal
    }
  }
</script>

<style lang="scss">
  #addDish {

  .dialog-footer {
    display: flex;
  }

  }
</style>


