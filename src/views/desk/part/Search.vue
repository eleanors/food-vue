<template>
  <section>
    <div id="ds-deskMain">
      <div class="ds-left">
        <div class="dropdown">
          <label class="fs-16">桌台编号/名称</label>
          <ui-input v-model="tableForm.input" placeholder="请输入内容"></ui-input>
        </div>
        <div class="dropdown">
          <label class="text-right fs-16">桌台类型</label>
          <ui-select clearable placeholder="请选择" v-model="tableForm.searchType">
            <ui-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value">
            </ui-option>
          </ui-select>
        </div>
        <ui-button type="success" class="fs-16 btn-search" v-on:click="searchTable(tableForm)">查询</ui-button>
      </div>
      <div class="addDesk">
        <ui-button type="warning" class="fs-16 increase-desk" v-on:click="increase">添加桌台</ui-button>
        <ui-button type="warning" class="fs-16 download-qr">批量下载二维码</ui-button>
      </div>
    </div>
    <!--添加桌台-->
    <ui-dialog title="添加桌台" v-model="addDeskForm">
      <ui-form class="addDeskForm" v-bind:rules="rules" :model="saveForm" ref="saveForm">
        <ui-row class="ds-row">
          <ui-col :span="9">
            <ui-form-item prop="name"   required label="编号/名称" v-bind:label-width="labelWidth">
              <ui-input class="ui-input" v-model="saveForm.name" style="display: inline-block" placeholder="支持中文、英文、数字"></ui-input>
            </ui-form-item>
          </ui-col>
          <ui-col :span="8">
            <ui-form-item label="类型" required v-bind:label-width="labelWidth" prop="index">
              <ui-select v-model="saveForm.index" clearable placeholder="请选择" v-on:change="roomChange"
                         style="width: 200px;display: inline-block">
                <ui-option v-for="item in options" v-bind:label="item.label" v-bind:value="item.value"
                           v-bind:key="item.value">
                </ui-option>
              </ui-select>
            </ui-form-item>
          </ui-col>
        </ui-row>
        <ui-row class="ds-row">
          <ui-col :span="5">
            <ui-form-item label="餐厅容量"  v-bind:label-width="labelWidth" prop="min_person">
              <ui-input class="min-input" type="min_person" v-model.number="saveForm.min_person"  style="width:100px;"  placeholder="仅支持数字">
              </ui-input>
            </ui-form-item>
          </ui-col>
          <ui-col :span="4">
            <ui-form-item label="至" prop="max_person" label-width="42px">
              <ui-input class="min-input" type="max_person" v-model.number="saveForm.max_person"  style="width:100px;" placeholder="仅支持数字">
              </ui-input>
            </ui-form-item>
          </ui-col>
          <ui-col :span="8" class="ds-form-item">
            <ui-form-item prop="createNumber" label="复制数量"   v-bind:label-width="labelWidth" >
              <ui-input class="ui-input" type="createNumber" v-model.number="saveForm.createNumber">
              </ui-input>
            </ui-form-item>
          </ui-col>
        </ui-row>
        <ui-row class="ds-row">
            <ui-col :span="11">
              <ui-form-item  prop="useMoney" label="预定费" v-bind:label-width="labelWidth">
              <ui-input class="ui-input" type="useMoney" v-model.float="saveForm.useMoney"  placeholder="仅支持数字"></ui-input>
              </ui-form-item>
            </ui-col>
            <ui-col :span="6" class="ds-tip fs-16">
              注：预定费不退给还给客户
            </ui-col>

        </ui-row>
        <ui-form-item>
          <transition name="bounce">
            <ui-row v-if="roomType" class="ds-row">
              <ui-col :span="8" style="transform: translateX(20px)">
                <ui-row>
                  <ui-col :span="8" style="text-align: center;">
                    <label style="line-height:148px">包间图</label>
                  </ui-col>
                  <ui-col :span="12">
                    <ui-upload action="https://test.meia8.com/api-customer/photo/upload" list-type="picture-card">
                      <i class="el-icon-plus"></i>
                    </ui-upload>
                    <ui-dialog size="tiny">
                      <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                    </ui-dialog>
                  </ui-col>
                </ui-row>
              </ui-col>
              <ui-col :span="12">
                <label style="line-height:148px">注：150px*150px，文件大小80kb，文件格式JPG、JPEG、PNG</label>
              </ui-col>
            </ui-row>
          </transition>
        </ui-form-item>
        <ui-form-item class="ds-row">
          <ui-button type="success" style="width:200px" v-on:click="saveTable('saveForm')">确认</ui-button>
        </ui-form-item>
      </ui-form>
    </ui-dialog>
  </section>
</template>
<script>
  import viewDetails from './Details.vue'
  import xhr from 'service'
  import {deskManage} from 'service/api'
  import {mapGetters} from 'vuex'
  export default{
    data() {
      var compare=(rule,value,callback)=>{console.log(1)
        console.log(this.saveForm.min_person)
          if(value<this.saveForm.min_person){console.log(2)
            callback(new Error('必须大于最小人数值'));
          }else {
              callback()
          }
      };
      return {
        saveForm: {
          name: '',
          min_Person: '',
          max_Person: '',
          useMoney: '',
          createNumber: '',
          tableFacePicUrl: '',
          index: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入桌台名称/编号', trigger: 'blur'},
            {min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur'}
          ],
          min_person:[
            {required:true,type:'number',min:1,max:99,message:'取值范围1到99',trigger:'blur,change'}
          ],
          max_person:[
            {required:true,type:'number',min:1,max:99,message:'取值范围1到99',trigger:'blur,change'},
            {validator: compare,trigger: 'blur,change'}
          ],
          useMoney:[
            {required:true,type:'float',min:0,max:999.00,message:'必须为数值且取值范围1到999.00',trigger:'blur,change'}
          ],
          createNumber:[
            {required:true,type:'number',min:1,max:999,message:'必须为数值且取值范围0到99',trigger:'blur,change'}
          ],
          index:[
            {required:true,message:'必选一种类型',trigger:'blur,change'}
          ],
        },
        labelWidth:"100px",
        tableForm: {
          searchType: '',
          input: ''
        },
        options: [{
          value: '1',
          label: '小桌'
        }, {
          value: '2',
          label: '中桌'
        }, {
          value: '3',
          label: '大桌'
        }, {
          value: '4',
          label: '包间'
        }],
        addDeskForm: false,
        roomType: false,
        searchResult: [],
    }
    },
    methods: {
      increase(data){
        this.addDeskForm = true;
      },
      roomChange(type){
        if (type == 4) {
          this.roomType = true;
        } else {
          this.roomType = false;
        }
      },
//      查询桌台
      searchTable(data){
        this.$emit('searchTable', data);
      },
      saveTable(data){
        this.$refs[data].validate((valid) => {
          if (valid) {
            xhr({
              url:deskManage.saveShopTable,
              options:{
//                shopId:5,
//                session: 'MTg0MzU3MDU2NjU7QzVBRDAwNjk4NEI3OTYxODYyOTEwNkJFNEU3NEMyNzQ7MQ',
                shopId: this.shopId,
                session: this.session,
                tableName:this.saveForm.name,
                type:this.saveForm.index,
                minPerson:this.saveForm.min_Person,
                maxPerson:this.saveForm.max_Person,
                useMoney:this.saveForm.useMoney,
                createNumber:this.saveForm.createNumber,
                tableFacePicUrl:this.saveForm.tableFacePicUrl
              }
            }).then((data)=>{
              if(data.saveShopTable==1){
                  this.message('桌台数据添加成功');
                  this.addDeskForm=false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    components: {
      viewDetails,
    }
  }
</script>

<style lang="scss">
  #ds-deskMain {
    height: 106px;
    background: #fff;
  .ds-label label{
  }
  .ds-row {
    display: flex;
    justify-content: center;
  }

  input {
    width: 200px;
  }

  .dropdown {
    display: flex;
    align-items: center;
  }

  .ds-left {
    width: 800px;
    margin: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-around;

  label {
    margin-right: 10px;
    display: inline;
    text-align: center;
    line-height: 34px;
    white-space: nowrap;
  }

  }

  .addDesk {
    float: right;
    margin-top: -71px;
    margin-right: 58px;
  }

  }

  .addDeskForm {

  .ui-input {
    width: 200px;
  }

  }
  .ds-booking {
    margin-right: 25px;
  }
  .ds-row {
    display: flex;
    justify-content: center;
  }

  .ds-tip {
    color: #fbbb01;
    line-height: 40px;
  }
</style>
