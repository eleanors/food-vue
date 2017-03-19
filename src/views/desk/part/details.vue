<template>
  <section id="ds-item">
    <!--Table-->
    <ui-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <ui-table-column align="center" type="selection" width="55">全选</ui-table-column>
      <ui-table-column align="center" prop="pic" label="图片" width="120">
        <template scope="scope">
          <img :src="scope.row.table_face_pic_url" alt="" class="ds-img">
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="name" label="编号/名称" width="120">
        <template scope="scope">
          {{scope.row.table_name}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="type" label="类型">
        <template scope="scope">
          {{scope.row.type_name}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="capacity" label="餐桌容量">
        <template scope="scope">
          {{scope.row.min_person}}-{{scope.row.max_person}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="use_money" label="预定费">
        <template scope="scope">
          {{scope.row.use_money}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="qr_code_url" label="桌台二维码">
        <template scope="scope">
          <div v-on:click="qr(scope.row)">
            <img :src="'http://meia.oss-cn-beijing.aliyuncs.com/'+scope.row.two_dim_code_url" alt="" class="qr-img">
          </div>
        </template>
      </ui-table-column>
      <ui-table-column align="center" label="操作">
        <template scope="scope">
          <ui-button size="small" v-on:click="handleEdit(scope.$index, scope.row)">编辑</ui-button>
          <ui-button size="small" type="danger" v-on:click="handleDelete(scope.row)">删除</ui-button>
        </template>
      </ui-table-column>
    </ui-table>
    <!--删除确认弹窗-->

    <ui-dialog title="提示" v-model="deletDialog" size="tiny">
      <span>确定要删除此桌台信息</span>
      <span slot="footer" class="dialog-footer">
          <ui-button type="success" v-on:click="confirmDelete(data)">确 定</ui-button>
          <ui-button v-on:click="deletDialog=!deletDialog">取 消</ui-button>
      </span>
    </ui-dialog>
    <!--edit-dialog-->
    <ui-dialog title="编辑桌台" v-model="editForm">
      <ui-form v-bind:rules="rules" :model="tableForm" ref="tableForm">
        <ui-row class="ds-flex">
          <ui-col :span="8" class="ds-form-item">
            <ui-form-item label="编号/名称" v-bind:label-width="labelWidth" prop="table_name">
              <ui-input class="ui-input" v-model:value="tableForm.table_name"></ui-input>
            </ui-form-item>
          </ui-col>
          <ui-col :span="8" class="ds-form-item">
            <ui-form-item label="类型" v-bind:label-width="labelWidth" prop="type">
              <ui-select v-model="tableForm.type" clearable placeholder="请选择" v-on:change="roomChange">
                <ui-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                </ui-option>
              </ui-select>
            </ui-form-item>
          </ui-col>
        </ui-row>
        <ui-row class="ds-row">
          <ui-col :span="5" class="ds-form-item">
            <ui-form-item label="餐厅容量" v-bind:label-width="labelWidth" prop="min_person">
              <ui-input class="min-input" type="min_person" v-model.number="tableForm.min_person"
                        v-on:blur="pattern(tableForm.min_person)"></ui-input>
            </ui-form-item>
          </ui-col>
          <ui-col :span="5" class="ds-form-item">
            <ui-form-item label="至" label-width="42px" prop="max_person">
              <ui-input class="min-input" type="max_person" v-model.number="tableForm.max_person"
                        v-on:blur="pattern1(tableForm.max_person)"></ui-input>
            </ui-form-item>
          </ui-col>
          <ui-col :span="8" class="ds-form-item">
            <ui-form-item label="预定费" v-bind:label-width="labelWidth" prop="use_money">
              <ui-input class="ui-input" type="use_money" v-model.number="tableForm.use_money"
                        v-on:blur="pattern(tableForm.use_money)"></ui-input>
            </ui-form-item>
            <label style="margin-left: 10px">元</label>
          </ui-col>
        </ui-row>
        <ui-form-item>
          <span class="ds-tip fs-16">注：预定费不退给还给客户</span>
        </ui-form-item>
        <ui-form-item>
          <transition name="bounce">
            <ui-row v-if="roomType" class="ds-row" style="margin-left: 30px;">
              <ui-col :span="10">
                <ui-row>
                  <ui-col :span="6" style="text-align: center">
                    <label style="line-height:148px">包间图</label>
                  </ui-col>
                  <ui-col :span="12">
                    <ui-upload class="avatar-uploader"
                      action="http://test.meia8.com/api-shop"
                      :show-file-list="false"
                      :on-success="handleAvatarScucess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </ui-upload>
                  </ui-col>
                </ui-row>
              </ui-col>
              <ui-col :span="10">
                <ui-row>
                  <ui-col :span="6" style="text-align: center">
                    <label style="line-height:148px">二维码</label>
                  </ui-col>
                  <ui-col :span="12">
                    <ui-upload class="avatar-uploader"
                               action="http://test.meia8.com/api-shop"
                               :show-file-list="false"
                               :on-success="handleAvatarScucess"
                               :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </ui-upload>
                  </ui-col>
                </ui-row>
              </ui-col>
            </ui-row>
          </transition>
        </ui-form-item>
        <ui-form-item class="ds-row">
          <ui-button type="success" style="width:200px" v-on:click="updateTable">确认</ui-button>
        </ui-form-item>
      </ui-form>
    </ui-dialog>
    <!--edit-end-->
    <view-qr v-if="qrDisplay" v-bind:qrImgs="imgArr"></view-qr>
  </section>
</template>

<script>
  import xhr from 'service'
  import {deskManage} from 'service/api'
  import viewQr from './Qrimg'
  import {mapGetters} from 'vuex'
  export default {
    props: {
      tableData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        imageUrl: '',
        tableForm: {},
        rules: {
          table_name: [
            {required: true, message: '请输入桌台名称/编号', trigger: 'blur'},
            {min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur'}
          ],
          min_person: [
            {required: true, type: 'number', min: 1, max: 99, message: '取值范围1到99', trigger: 'blur,change'}
          ],
          max_person: [
            {required: true, type: 'number', min: 1, max: 99, message: '取值范围1到99', trigger: 'blur,change'}
          ],
          use_money: [
            {required: true, type: 'number', min: 1, max: 99, message: '必须为数值且取值范围1到99', trigger: 'blur,change'}
          ],
          type: [
            {required: true, message: '必选一种类型', trigger: 'blur,change'}
          ]
        },
        multipleSelection: [],
        editForm: false,
        form: {},
        dialogImageUrl: '',
        formLabelWidth: '100px',
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
        roomType: false,
        labelWidth: "100px",
        deletDialog: false,
        qrDisplay: false
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      handleEdit(index, row) {
        this.editForm = true;
        this.tableForm = row;
        console.log(row)
      },
//      删除
      handleDelete(row) {
        console.log(row.id);
        this.confirmDelete(row.id)
      },
//      确认删除
      confirmDelete(data){
        this.deletDialog = true;
        xhr({
          url: deskManage.deleteShopTable,
          options: {
            shopId: this.shopId,
            session: this.session,
            tableIdStr: data.id
          }
        }).then((data) => {
          if (data.deleteShopTable == 1) {
            this.message('桌台数据删除成功，请刷新');
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarScucess(res, file) {
          console.log(res)
//        let reader = new FileReader();
//        reader.readAsDataURL(file);
//        console.log(reader)
//        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      roomChange(type){
        if (type == 4) {
          this.roomType = true;
        } else {
          this.roomType = false;
        }
      },
//      编辑桌台成功后发送数据
      updateTable(){
        xhr({
          url: deskManage.updateShopTable,
          options: {
            tableId: this.tableForm.id,
            shopId: this.shopId,
            session: this.session,
            tableName: this.tableForm.table_name,
            type: this.tableForm.type,
            minPerson: this.tableForm.min_person,
            maxPerson: this.tableForm.max_person,
            useMoney: this.tableForm.use_money,
            tableFacePicUrl: this.imageUrl
          }
        }).then((data) => {
          console.log(data)
          this.editForm = false;
        })
      },
      qr(data){
        console.log(this.qrDisplay)
        this.qrDisplay = true;
        this.imgArr = {};
        this.imgArr = data;
        console.log(this.imgArr)
      }
    },
    computed:{
      ...mapGetters(['session','shopId'])
    },
    components: {
      viewQr
    }
  }
</script>

<style lang="scss">
  .ds-img {
    width: 100%;
  }

  #ds-item {
    margin-top: 30px;
    padding-bottom: 100px;

  .ds-tip {
    float: right;
    margin-right: 180px;
  }

  .dialog-footer {
    display: flex;
  }

  .el-dialog__body {
    text-align: center;
    font-size: 20px;
  }

  }

  .ui-table--border td, .ui-table--border th {
    border: none;
  }

  .ds-form-item {
    display: flex;
    align-items: center;

  .ui-input {
    width: 200px;
  }

  .min-input {
    width: 100px;
  }

  }
  .ds-flex {
    display: flex;
    justify-content: space-around;
  }

  /*过度*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(0.25);
    }
    50% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.5);
    }
    75% {
      transform: scale(0.25);
    }
    100% {
      transform: scale(0);
    }
  }

  #ds-item {

  .cell .ds-img {
    width: 100%;
  }

  .qr-img {
    height: 80px;
    vertical-align: middle;
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width:148px;
    height:148px;
    img{
      width:100%;
      height:100%;
    }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  }
  }

</style>
