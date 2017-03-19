<template>
  <transition name="toggle-mini-food">
    <div class="food-menu" v-bind:class="{more: foodList&&foodList.length>5}"
         v-show="visible">
      <p class="clear-food fs-18" v-show="foodCount!==0"><span v-on:click="clear">清空</span></p>
      <transition-group class="food-list" name="slide-fade" tag="ul">
        <li class="food-item fs-18" v-for="(item, index) in foodList" v-bind:key="index">
          <span class="food-title" v-text="item.title"></span>
          <span class="food-price" v-text="item.price*item.quantity"></span>
          <span class="food-amount">
            <i class="reduce" v-on:click="decrease(item.categoryId, item.id, item)"></i>
            <input name="number" type="text" readonly v-model="item.quantity">
            <i class="add" v-on:click="increase(item.categoryId, item.id, item)"></i>
          </span>
        </li>
      </transition-group>

      <div class="msg" v-if="foodCount==0">还没有选择菜品, 请选择!!</div>
    </div>
  </transition>
</template>

<script>
  export default{
    props: {

      visible: {
        type: Boolean,
        default: false
      },

      shopId: {
        type: String,
        default: '',
        required: true
      },
      foodList: {
        type: Array,
        default: () => []
      },
      change: {
        type: Function,
        default: () => {
        }
      }
    },
    data(){

    },
    methods:{
      decrease: function (cateId, foodId, food) {

        this.reduceFood({shopId: this.shopId, cateId, foodId, food})
      },

      increase: function (cateId, foodId, food) {

        this.addFood({shopId: this.shopId, cateId, foodId, food})
      },

      clear: function () {

        this.change() && this.clearFood(this.shopId)
      },
    }
  }
</script>

<style lang="scss">
  @import '~scss/var.scss';

  /** 菜品 Mini */
  .food-menu {
    position: absolute;
    right: 0;
    top: 90px;
    z-index: 10001;
    width: 500px;
    padding: 10px 16px;
    color: #666;
    background: #fff;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;

  &
  .more::after {
    content: "  ";
    position: absolute;
    bottom: 0;
    right: 0;
    color: #eee;
    width: 100%;
    padding-top: 40px;
    background: linear-gradient(to bottom, transparent, #fff 55%);
  }

  .loading, .msg {
    margin: 5px 20px 20px;
    text-align: center
  }

  .clear-food {
    width: 100%;
    height: 50px;
    margin: 0 0;
    overflow: hidden;

  span {
    float: right;
    width: 90px;
    height: 30px;
    line-height: 28px;
    margin: 10px 16px 0 0;
    color: #fbba00;
    text-align: center;
    border-radius: 30px;
    border: 1px solid #fbba00;
    cursor: pointer;
    transition: all 0.5s ease 0s;

  &
  :hover {
    color: #fff;
    background: #fbba00;
  }

  }
  }

  .food-list {
    margin: 0;
    padding: 0;
    width: 500px;
    max-height: 360px;
    position: relative;
    list-style-type: none;
    overflow-x: hidden;
    overflow-y: scroll;

  li {
    height: 60px;
    line-height: 60px;
    margin-right: 16px;
    position: relative;
    overflow: hidden;

  span {
    display: block;
    float: left;
    width: 33.3333%;
    height: 100%;
  }

  .food-title {
    text-align: left;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    position: relative;
    overflow: hidden;
  }

  .food-price {
    text-align: center;
  }

  .food-amount {
    text-align: right;
  }

  }
  }
  }

  .toggle-mini-food-enter-active, .toggle-mini-food-leave-active {

    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms,
    opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    opacity: 1;
    transform: scaleY(1);
    transform-origin: center top;
  }

  .toggle-mini-food-enter, .toggle-mini-food-leave-active {
    opacity: 0;
    transform: scaleY(0)
  }


</style>
