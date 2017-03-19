<template>
  <section id="middle-option">
    <ui-row class="ac-button">
      <ui-col :span="4">
        <span>时间</span>
        <ui-date-picker v-model="account.value" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                        class="date-picker" format="yyyy-MM-dd" v-on:change="format">
        </ui-date-picker>
      </ui-col>
      <ui-col :span="4">
        <span>至</span>
        <ui-date-picker v-model="account.value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1"
                        format="yyyy-MM-dd" v-on:change="format1">
        </ui-date-picker>
      </ui-col>
      <ui-col :span="3">
        <ui-button  class="btn-search" v-on:click="search">查询</ui-button>
      </ui-col>
      <ui-col :span="3">
        <ui-button class="btn-" v-on:click="setPaw">设置提现密码</ui-button>
      </ui-col>
      <ui-col :span="3">
        <ui-button class="warning" v-on:click="businessIncome">营业收入提现</ui-button>
      </ui-col>
      <ui-col :span="3">
        <ui-button type="success">分成收入提现</ui-button>
      </ui-col>
      <ui-col :span="3">
        <ui-button type="info" v-on:click="drawMoney" v-model="recordFlag">提现记录</ui-button>
      </ui-col>
    </ui-row>
    <!--提现密码-->
    <ui-dialog title="设置提现密码" v-model="status" size="tiny" >
      <ui-form v-model="balanceForm" class="ac-dialog1" v-bind:rules="rules" ref="balanceForm" v-bind:model="balanceForm">
        <ui-form-item label="原始密码" :label-width="formLabelWidth" prop="oldPass">
          <ui-input auto-complete="off" id="ac-input" placeholder="密码长度最少6位" type="password"
                    v-model="balanceForm.oldPass"></ui-input>
        </ui-form-item>
        <ui-form-item label="新密码" :label-width="formLabelWidth" prop="newPass">
          <ui-input auto-complete="off" id="ac-input" placeholder="密码长度最少6位" type="password"
                    v-model="balanceForm.newPass"></ui-input>
        </ui-form-item>
        <ui-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
          <ui-input auto-complete="off" id="ac-input" placeholder="再次输入密码" type="password"
                    v-model="balanceForm.checkPass"></ui-input>
        </ui-form-item>
        <ui-form-item style="margin-bottom: 10px;">
          <span>注：原密码默认为账户登录密码</span>
        </ui-form-item>
      </ui-form>
      <div slot="footer" class="dialog-footer">
        <ui-button type="success" v-on:click="confirm('balanceForm')">确定</ui-button>
        <ui-button type="info">取消</ui-button>
      </div>
    </ui-dialog>
    <!--营业收入-->
    <ui-dialog v-model="business" size="tiny">
      <ui-form v-bind:label-position="ruleForm.labelPosition" label-width="100px">
        <ui-form-item>
          <h3 class="ac-title">账户余额：<span class="ac-mongy">{{ruleForm.money}}</span></h3>
        </ui-form-item>
        <ui-form-item label="姓名">
          <ui-input></ui-input>
        </ui-form-item>
        <ui-form-item label="选择提现方式">
          <ui-radio-group v-model="ruleForm.resource" v-on:change="bankOption">
            <ui-radio v-for="item in options" v-bind:label="item.label" v-bind:value="item.value"
                      v-bind:key="item.value"></ui-radio>
          </ui-radio-group>
        </ui-form-item>
        <ui-form-item label="账户">
          <ui-input></ui-input>
        </ui-form-item>
        <ui-form-item label="选择银行" v-if="ruleForm.bank">
          <ui-select></ui-select>
        </ui-form-item>
        <ui-form-item label="开户行" v-if="ruleForm.bank">
          <ui-input></ui-input>
        </ui-form-item>
        <ui-form-item label="提取金额">
          <ui-input></ui-input>
        </ui-form-item>
        <ui-form-item>
          <span>到账金额：</span>
          <article class="cash-tips center-block">
            <h4>提现说明</h4>
            <p>1、全美食客服将在3个工作日内与您联系。</p>
            <p>2、每月5号为提现日。</p>
          </article>
        </ui-form-item>
        <ui-form-item>
          <ui-button type="success">确认</ui-button>
          <ui-button type="info">取消</ui-button>
        </ui-form-item>
      </ui-form>
    </ui-dialog>
  </section>
</template>

<script>
  import xhr from 'service'
  import {account} from 'service/api'
  export default{
    data(){
      var validatePass = (rule, value, callback) =>{
        if (value !== this.balanceForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        balanceForm: {
          oldPass: '',
          newPass: '',
          checkPass: '',
        },
        rules: {
          oldPass: [
            {required: true, message: '请输入密码',  trigger: 'blur'},
            {min: 6, message: '密码长度最少6位',  trigger: 'blur,change'}
          ],
          newPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码长度最少6位',  trigger: 'blur,change'}
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码长度最少6位',  trigger: 'blur,change'},
            {validator: validatePass,trigger: 'blur'}
          ]
        },
        options: [
          {label: '支付宝', value: '1'},
          {label: '微信', value: '2'},
          {label: '银行', value: '1'},
        ], business: false,
        ruleForm: {
          labelPosition: 'right',
          resource: '',
          bank: false,
          money: '9999.99'
        },
        recordFlag: false,
        account: {
          value1: '',
          value: '',
        },
        form: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() >= Date.now() ;
            console.log(time)
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        formLabelWidth: '100px',
        status: false
      }
    },
    watch: {
      recordFlag(){
        this.$parent.flag = 2;
      }
    },
    methods: {
//    查询
      search(){
        console.log(this.account)
      },
      format(val){
        this.account.value = val;
      },
      format1(val){
        this.account.value1 = val;
      },
      setPaw(){
        this.status = true
      },
      businessIncome(){
        this.business = true
      },
      bankOption(value){
        console.log(value)
        if (value == "银行") {
          this.ruleForm.bank = true;
        } else {
          this.ruleForm.bank = false;
        }
      },
      drawMoney(){
        this.recordFlag = true;
        console.log(this.$parent.flag)
      },
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            xhr({
                url:account.saveTaking
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  #middle-option {
    padding: 0 10px;
    background: #fff;
    height: 106px;

  .ac-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

  .btn-search {
    width: 120px;
  }

  }
  .dialog-footer {
    display: flex;
  }
  .el-form-item__content{
    text-align: center;
  }
  }
  /*dialog*/
  /*设置提现密码*/
  .ac-dialog1 {
    margin: 0 auto;
    width: 350px;

  span {
    font-size: 16px;
    color: #fbba00;
  }

  }
  #ac-input {
    width: 200px;
    display: flex;
  input {
    width: 100%;
  }

  }
  .ui-form-item__content {
    margin-left: 20px !important;

  span {
    font-size: 16px;
    color: #fbba00;
    margin-left: 125px;
  }

  }

  .ui-form-item {
    display: flex;
    justify-content: center;
  }

  .dialog-footer {

  button {
    margin: 0 auto;
    display: block;
    width: 200px;
    /* font-size: 16px; */
  }

  }
  .ui-dialog__footer {
    margin-top: -20px;
  }

  /*营业收入账户*/
  .ac-title {
    margin-left: -100px;
    margin-top: -30px;
    font-size: 20px;
    text-align: center;

  span {
    color: #fbba00;
  }

  }
</style>
