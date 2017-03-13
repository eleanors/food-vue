<template>
  <section id="ds-item">
    <!--Table-->
    <ui-table :data="tableData3" style="width: 100%" @selection-change="handleSelectionChange">
      <ui-table-column align="center" type="selection" width="55">全选</ui-table-column>
      <ui-table-column align="center" prop="pic" label="图片" width="120">
        <template scope="scope">
          {{scope.row.pic}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="name" label="编号/名称" width="120">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="type" label="类型">
        <template scope="scope">
          {{scope.row.type}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="capacity" label="餐桌容量">
        <template scope="scope">
          {{scope.row.capacity}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="use_money" label="预定费">
        <template scope="scope">
          {{scope.row.use_money}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" prop="qr_code_url" label="桌台二维码">
        <template scope="scope">
          {{scope.row.qr_code_url}}
        </template>
      </ui-table-column>
      <ui-table-column align="center" label="操作">
        <template scope="scope">
          <ui-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</ui-button>
          <ui-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</ui-button>
        </template>
      </ui-table-column>
    </ui-table>
    <!--Pagination-->
    <div class="page-container">
      <ui-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                     :page-sizes="[100, 200, 300, 400]" :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper" :total="400">
      </ui-pagination>
    </div>
    <!--edit-dialog-->
    <ui-dialog title="编辑桌台" v-model="editForm">
      <ui-form :model="form">
        <ui-form-item>
          <ui-row class="ds-flex">
            <ui-col :span="8" class="ds-form-item" style="transform: translateX(-4px);">
              <label>编号/名称</label>
              <ui-input class="ui-input"></ui-input>
            </ui-col>
            <ui-col :span="8" class="ds-form-item" style="transform: translateX(14px)">
              <label>类型</label>
              <ui-select v-model="index" clearable placeholder="请选择" v-on:change="roomChange">
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
            <ui-col :span="8" class="ds-form-item">
              <label>预定费</label>
              <ui-input class="ui-input"></ui-input>
              <label style="margin-left: 10px">元</label>
            </ui-col>
          </ui-row>
        </ui-form-item>
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
              <ui-col :span="10">
                <ui-row>
                  <ui-col :span="6" style="text-align: center">
                    <label style="line-height:148px">二维码</label>
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
            </ui-row>
          </transition>
        </ui-form-item>
        <ui-form-item class="ds-row">
          <ui-button type="success" style="width:200px">确认</ui-button>
        </ui-form-item>
      </ui-form>
    </ui-dialog>
    <!--edit-end-->
  </section>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          pic: '2016-05-03',
          name: '王小虎',
          type: '上海市普陀区金沙江路 1518 弄',
          capacity: 3 - 6,
          use_money: 100.00,
          qr_code_url: 'hh',
        }],
        multipleSelection: [],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        editForm: false,
        form: {},
        dialogImageUrl: '',
        editForm: false,
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
        roomType: false
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
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarScucess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      }
    },

    components: {}
  }
</script>

<style lang="scss">
  #ds-item {
    margin-top: 30px;
    padding-bottom: 100px;
  }

  .el-table--border td, .el-table--border th {
    border: none;
  }

  .page-container {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .ds-form-item {
    display: flex;
    align-items: center;

  label {
    white-space: nowrap;
    margin-right: 25px;
    text-align: center;
  }

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

  .ds-row {
    display: flex;
    justify-content: center;
  }

  .ds-tip {
    float: right;
    margin-right: 180px;
    color: #fbbb01;
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

</style>
