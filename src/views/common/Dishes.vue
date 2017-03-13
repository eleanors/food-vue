<template>
  <ui-row class="section-food-list" :gutter="10">
    <ui-col class="food-item" :md="12" :lg="8" v-for="(item, index) in cate" :key="index">
      <div class="pic f-l"><img :src="item.pic" /></div>
      <div class="detail">
        <h4 class="ellipsis" v-text="item.title"></h4>
        <p class="price">
          <span>￥{{item.currentprice}}</span>
          <span>原价￥{{item.originprice}}</span>
        </p>
        <p class="food-amount"><i class="reduce"></i><input name="number" type="text" value="0" class="J_foodNum" readonly><i class="add"></i></p>
      </div>
    </ui-col>
  </ui-row>
</template>
<script>
  export default {
    props: {
      cate: {
        type: Array,
        default: () => []
      },
      count: {
        type: Boolean,
        default: true
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss">
  .food-item {
    height: 164px;
  .pic {
    width: 152px;
  img {
    width: 100%;
  }
  }
  .detail {
    height: 100%;
    padding-left: 10px;
    margin-left: 152px;
    overflow: hidden;
  }
  h4 {
    font-size: 24px;
    font-weight: normal;
  }
  .price span{
    vertical-align: middle;
  &:first-child{
     font-size: 24px;
     font-family: "microsoft yahei";
     color: #fc7000;
     margin-right: 20px;
     font-style: normal;
   }
  &:last-child{
     font-size: 20px;
     color: #ccc;
     font-style: normal;
     text-decoration: line-through;
   }
  }
  .food-amount {
  & > * {
        vertical-align: middle;
      }
  i{
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: #2eb165;
    border: 2px solid #2eb165;
    border-radius: 34px;
    cursor: pointer;
    position: relative;
  }
  .reduce::before{
    display: block;
    content: '';
    width: 14px;
    height: 2px;
    background: #2eb165;
    position: absolute;
    left: 8px;
    top: 14px;
  }
  .add {
    background: #2eb165;
  &::before{
     display: block;
     content: '';
     width: 14px;
     height: 2px;
     background: #fff;
     position: absolute;
     left: 8px;
     top: 14px;
   }
  &::after{
     display: block;
     content: '';
     width: 2px;
     height: 14px;
     background: #fff;
     position: absolute;
     left: 14px;
     top: 8px;
   }
  }
  input{
    width: 46px;
    height: 34px;
    border: 0;
    background: none;
    color: #656565;
    text-align: center;
    padding: 0px 8px;
    outline: none;
  }
  }
  }
</style>
