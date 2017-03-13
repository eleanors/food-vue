<template>
  <ui-dialog title="收货地址">
    <ui-form :model="form">
      <ui-form-item label="活动名称" :label-width="formLabelWidth">
        <ui-input  auto-complete="off"></ui-input>
      </ui-form-item>
      <ui-form-item label="活动区域" :label-width="formLabelWidth">
        <ui-select  placeholder="请选择活动区域">
          <ui-option label="区域一" value="shanghai"></ui-option>
          <ui-option label="区域二" value="beijing"></ui-option>
        </ui-select>
      </ui-form-item>
    </ui-form>
    <div slot="footer" class="dialog-footer">
      <ui-button @click="dialogFormVisible = false">取 消</ui-button>
      <ui-button type="primary" @click="dialogFormVisible = false">确 定</ui-button>
    </div>
  </ui-dialog>
</template>

<script>
  export default {
      data(){
          return{
            form:{},
            editForm:false,
            formLabelWidth: '120px'
          }
      }
  }
</script>
