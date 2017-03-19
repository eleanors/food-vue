<template>
  <section id="qrImg" >
    <ui-dialog v-model="qrDialog" v-bind:data="qrImgs" class="qr-tip">
      <h5>打印二维码</h5>
      <img :src="'http://meia.oss-cn-beijing.aliyuncs.com/'+qrImgs.two_dim_code_url" alt="">
      <h3>{{qrImgs.type_name}}({{qrImgs.table_name}})</h3>
      <h5 class="explain">扫一扫上面的二维码图案</h5>
      <h5 class="explain">进入我的店铺</h5>
      <div slot="footer" class="dialog-footer">
        <ui-button type="primary" v-on:click="print">打印</ui-button>
        <ui-button @click="qrDialog=!qrDialog">取 消</ui-button>
      </div>
    </ui-dialog>
  </section>
</template>

<script>
export default{
  props: ['qrImgs'],
    data(){
        return {
          qrDialog:true,
        }
    },
  watch:{
    qrDialog(){
        this.$parent.qrDisplay=false;
    }
  },
    methods:{
      print(){
//        this.qrDialog=false;
      }
    }
}
</script>

<style lang="scss">
.explain{
  color: #999999;
  font-size: 16px;
  font-weight: 500;
}
</style>
