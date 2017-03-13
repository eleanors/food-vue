<template>
  <section>
    <div id="ds-deskMain">
      <div class="ds-left">
        <div class="dropdown">
          <label class="fs-16">桌台编号/名称</label>
          <ui-input v-model="input" placeholder="请输入内容"></ui-input>
        </div>
        <div class="dropdown">
          <label class="text-right fs-16">桌台类型</label>
          <ui-select clearable placeholder="请选择">
            <ui-option
              v-for="item in options"
              :label="item.label"
              :value="item.value" :key="item">
            </ui-option>
          </ui-select>
        </div>
        <ui-button type="success" class="fs-16 btn-search">查询</ui-button>
      </div>
      <div class="addDesk">
        <ui-button type="warning" class="fs-16 increase-desk" v-on:click="increase">添加桌台</ui-button>
        <ui-button type="warning" class="fs-16 download-qr">批量下载二维码</ui-button>
      </div>
    </div>
    <!--添加桌台-->
    <ui-dialog title="编辑桌台" v-model="addDeskForm">
      <ui-form class="addDeskForm">
        <ui-form-item>
          <ui-row class="ds-flex">
            <ui-col :span="8" class="ds-form-item" style="transform: translateX(-4px);">
              <label>编号/名称</label>
              <ui-input class="ui-input"></ui-input>
            </ui-col>
            <ui-col :span="8" class="ds-form-item" style="transform: translateX(14px)">
              <label>类型</label>
              <ui-select v-model="index" clearable placeholder="请选择" v-on:change="roomChange" style="width: 200px;">
                <ui-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                </ui-option>
              </ui-select>
            </ui-col>
          </ui-row>
        </ui-form-item>
        <ui-form-item>
          <ui-row class="ds-row">
            <ui-col :span="5" class="ds-form-item">
              <label>餐厅容量</label>
              <ui-input class="min-input"></ui-input>
            </ui-col>
            <ui-col :span="5" class="ds-form-item">
              <label>至</label>
              <ui-input class="min-input"></ui-input>
            </ui-col>
            <ui-col :span="8" class="ds-form-item" style="transform: translateX(-14px);">
              <label>复制数量</label>
              <ui-input class="ui-input"></ui-input>
            </ui-col>
          </ui-row>
        </ui-form-item>
        <ui-form-item>
          <ui-row class="ds-flex">
            <ui-col :span="8" style="transform: translateX(40px);">
              <label class="ds-booking">预定费</label>
              <ui-input class="ui-input"></ui-input>
            </ui-col>
            <ui-col :span="10">
              <span class="ds-tip fs-16">注：预定费不退给还给客户</span>
            </ui-col>
          </ui-row>
        </ui-form-item>
        <ui-form-item>
          <transition name="bounce">
            <ui-row v-if="roomType" class="ds-row">
              <ui-col :span="8" style="transform: translateX(20px)">
                <ui-row>
                  <ui-col :span="8" style="text-align: center;" >
                    <label style="line-height:148px">包间图</label>
                  </ui-col>
                  <ui-col :span="12">
                    <ui-upload action="https://test.meia8.com/api-customer/photo/upload" list-type="picture-card"
                               :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </ui-upload>
                    <ui-dialog size="tiny">
                      <img width="100%" :src="dialogImageUrl" alt="">
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
          <ui-button type="success" style="width:200px">确认</ui-button>
        </ui-form-item>
      </ui-form>
    </ui-dialog>
  </section>
</template>

<script>
  export default{
    data() {
      return {
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
        index: '',
        input: '',
        addDeskForm: false,
        roomType: false
      }
    },
    methods: {
      increase(){
        this.addDeskForm = true;
      },
      roomChange(type){
        if (type == 4) {
          this.roomType = true;
        } else {
          this.roomType = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  #ds-deskMain {
    height: 106px;
    background: #fff;

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
  .btn-search {
    width: 160px;
  }

  .addDeskForm {
  .ui-input {
    width: 200px;
  }
  }
  .ds-booking{
    margin-right: 25px;
  }
</style>
