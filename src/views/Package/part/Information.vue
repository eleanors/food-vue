<template>
  <section id="information">
    <!--dialog-->
    <ui-dialog title="编辑套餐" v-model="dialogFormVisible">
      <ui-form class="pa-form" :model="setMealForm" ref="setMealForm" :rules="rules">
        <ui-form-item label="适用人数" :label-width="formLabelWidth" prop="minPerson">
          <ui-input auto-complete="off" class="pa-min" type="minPerson"
                    v-model.number="setMealForm.minPerson"></ui-input>
        </ui-form-item>
        <ui-form-item label="至" label-width="40px" prop="maxPerson">
          <ui-input auto-complete="off" class="pa-max" type="maxPerson"
                    v-model.number="setMealForm.maxPerson"></ui-input>
        </ui-form-item>
        <ui-form-item label="排序" label-width="60px" prop="orderNo">
          <ui-input auto-complete="off" class="pa-max" type="orderNo" v-model.number="setMealForm.orderNo"></ui-input>
          {{setMealForm.orderNo}}
        </ui-form-item>
      </ui-form>
      <div class="pa-menu">
        <ui-tabs v-on:tab-click="handleClick" v-on:tab-remove="removeGroup(editableTabsValue)"
                 v-model="editableTabsValue" v-bind:closable="flag">
          <ui-tab-pane v-for="(item,index) in editableTabs" v-bind:label="item.title" v-bind:name="item.name"
                       v-bind:key="item.itemsId">
            <ui-button v-on:click="addDish">添加菜品</ui-button>
            <!--dishes component-->
            <view-dishes v-bind:cate="setMealForm.items" :count=false></view-dishes>
            <div class="pack-status">
              <label>套餐状态</label>
              <ui-radio-group v-model="radio">
                <ui-radio :label="1">上架</ui-radio>
                <ui-radio :label="2">下架</ui-radio>
              </ui-radio-group>
            </div>
          </ui-tab-pane>
        </ui-tabs>
        <div class="dialog-footer">
          <ui-button type="primary" v-on:click="updateDish('setMealForm')">确 定</ui-button>
          <ui-button v-on:click="dialogFormVisible=!dialogFormVisible">取 消</ui-button>
        </div>
      </div>

      <div slot="footer">

      </div>
    </ui-dialog>
    <!--dialog end-->
    <div id="pa-item">
      <div class="pa-itemId">
        <span class="pa-sum">适用人数</span>
        <span class="pa-foods">包含菜品</span>
        <span class="pa-price">套餐价格</span>
        <label>状态</label>
        <div class="pa-operate">操作</div>
      </div>
      <ul class="shopTable">
        <li v-for="(item, index) in packageFoods">
          <span class="pa-sum">{{item.person}}</span>
          <div class="pa-foods">
            <span>{{item.packageTitle}}</span>
          </div>
          <span class="pa-price">{{item.packagePrice}}</span>
          <span class="pa-status" v-if="item.status==1">上架</span>
          <span class="pa-status" v-else="item.status==2">下架</span>
          <div class="pa-operate">
            <ui-button id="pa-edit" v-on:click="editPackage(item,index)">编辑</ui-button>
            <ui-button id="pa-delet" v-on:click="deletPackage(item,index)">删除</ui-button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import viewDishes from "./Dishes"
  import xhr from 'service'
  import {packages} from 'service/api'
  import {mapGetters} from 'vuex'
  export default{
    props: {
      packageFoods: {
        type: Array,
        default: () => []
      }
    },
    data(){
      return {
        packageStatus: '',
        dialogFormVisible: false,
        form: {
          name: '',
        },
        setMealForm: {
          orderNo: '',
          maxPerson: '',
          minPerson: ''
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
          ],
        },
        close: false,   //动态标签开关
        formLabelWidth: '81px',
        editableTabsValue: '1',
        setMealIndex: '1',
        activeName: '1',
        setMealList: [],
        tabIndex: 1,
        radio: '',
        editableTabs: [
          {
            title: '组合1',
            name: '1',
          }
        ],
        flag: false,
        flag1: true,
      }
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
      editPackage(item, index){
        alert()
        this.flag1 = false;
        this.dialogFormVisible = true;
        this.setMealForm = item;
        this.radio = item.status;
      },
//      增加组合
      addGroup(data){
        let newTabName = ++this.tabIndex + '';
        let activeName = newTabName;
        this.editableTabs.push({
          title: '组合' + newTabName,
          name: newTabName,
        });
        this.editableTabsValue = newTabName;
        if (newTabName > 1) {
          this.flag = true;
        }
      },
//      增加菜品
      addDish(){

      },
//      删除组合
      removeGroup(data){
        console.log(this.editableTabsValue)
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName == data) {
          tabs.forEach((tab, index) => {
            if (tab.name === data
            ) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          })
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== data
        )
        ;
      },
//      编辑套餐成功
      updateDish(form){
        console.log(this.setMealForm)
        this.$refs[form].validate((valid) => {
          if (valid) {
            var packageArr = "";
            this.setMealForm.items.forEach(function (ele, index) {
              packageArr += ele.id + ",";
            });
            packageArr = packageArr.substring(0, packageArr.length - 1)
            console.log(packageArr)
            xhr({
              url: packages.updatePackage,
              options: {
                id: this.setMealForm.packageId,
                shopId: this.shopId,
                session: this.session,
                itemIdArray: packageArr,
                maxPerson: this.setMealForm.maxPerson,
                minPerson: this.setMealForm.minPerson,
                orderNo: this.setMealForm.orderNo,
                status: this.setMealForm.status
              }
            }).then((data) => {
              console.log(data)
              if (data.info == 1) {
                this.dialogFormVisible = false;
                this.message('修改成功')
              }
            })
          }
        })
      },
      deletPackage(item, index){
        console.log(index);
        xhr({
          url: packages.deletePackage,
          options: {
            packageId: index
          }
        }).then((data) => {
          confirm()
          console.log(data)
        })
      }
    },
    computed: {
      ...mapGetters(['session', 'shopId'])
    },
    components: {
      viewDishes
    }
  }
</script>

<style lang="scss">
  #information {

  .dialog-footer {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 20px;
    margin-left: -210px;
  }

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

  }

  #pa-item {
    margin-top: 30px;
    padding-bottom: 100px;

  .el-form {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 40px;
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
    margin-left: 20px;
    width: 100px;
    display: inline-block;
  }

  }

</style>
