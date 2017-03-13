<template>
  <div>
    <section id="bgContainer">
      <view-operate></view-operate>
      <!--dialog-->
      <view-info></view-info>
    </section>
  </div>

</template>

<script>
  import viewDishes from "viewcommon/Dishes"
  import viewOperate from "./part/Operate"
  import viewInfo   from "./part/Information"
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '上架'
        }, {
          value: '2',
          label: '下架'
        }],
        value: '',
        dialogFormVisible: false,
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
        formLabelWidth: '120px',
        radio: '1',
        currentPackage: []
      }
    },
    computed: {
      open: function () {
        return false
      }
    },
    components: {
      viewOperate,
      viewInfo
    }
  }
</script>

<style lang="scss">
  #pa-deskMain {
    height: 106px;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    background: #fff;
  }
  /*dialog*/
  .pa-min, .pa-max {
    width: 200px !important;
  }

  .pa-menu {
    margin: 30px 0;
  }

  .pa-form {
    display: flex;

  li {
    margin-right: 10px;
  }

  }
  .el-dialog__title {
    display: inline-block;
    width: calc(100% - 14px);
    text-align: center;
  }
</style>
