<template>
  <ui-row class="section-food-list" :gutter="10">
    <ui-col class="food-item" :md="12" :lg="8" v-for="(item, index) in cate" :key="index">
      <div class="pic f-l"><img :src="item.icon"/></div>
      <div class="detail">
        <h4 class="ellipsis" v-text="item.title"></h4>
        <p class="price">
          <span>￥{{item.price}}</span>
          <span>原价￥{{item.originalPrice}}</span>
        </p>
        <p class="food-amount">
          <i class="reduce" v-on:click="sub"></i>
          <input name="number" type="text" :value="num" class="J_foodNum" readonly>
          <i class="add" v-on:click="plus"></i>
        </p>
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
    data(){
      return {
        contentList: [],
        num: 0
      }
    },
    methods: {
      plus(){
        this.num = 1
      },
      sub(){
          this.num=0
      }
    }
  }
</script>

<style lang="scss">

</style>
