<template>
  <section id="bgContainer">
    <view-search></view-search>
    <view-detail></view-detail>
  </section>
</template>

<script>
  import viewSearch from './part/Search.vue'
  import viewDetail from './part/Details.vue'
  export default{
    components: {
      viewSearch,
      viewDetail
    }
  }
</script>

<style lang="scss">

</style>
