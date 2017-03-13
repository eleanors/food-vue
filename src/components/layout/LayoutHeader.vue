<template>
  <div class="header">

    <div class="other-content f-r">登录 退出</div>


    <div class="position">
      <span class="fs-16">您的位置：</span>
      <layout-level v-bind:position="position" v-bind:separator="separator"></layout-level>
    </div>
  </div>
</template>

<script>
  import LayoutLevel from './LayoutLevel'
  export default {

    data: function () {
      return {
        position: null,
        separator: '>'
      }
    },

    computed: {
      name: function () {
        return this.$router.name
      }
    },

    watch: {
      $route () {
        this.getList()
      }
    },

    created: function () {
      this.getList()
    },

    methods: {
      getList () {
        let matched = this.$route.matched.filter(item => item.name)
        let first = matched[0]
        if (first && (first.name !== 'Home' || first.path !== '')) {

          matched = [{name: 'Home', path: '/', meta: {title: '首页'}}].concat(matched)
        }
        this.position = matched
      }
    },

    components: {
      LayoutLevel
    },

  }
</script>

<style lang="scss">
  .header {

    height: 100px;
    line-height: 100px;
    background: #fff;

  .position {
    margin-left: 100px;

  span:first-child {
    float: left;
  }

  }

  .other-content {
    margin-right: 50px;
  }

  }
</style>
