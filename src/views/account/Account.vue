<template>
  <section>
    <view-search></view-search>
    <view-detail></view-detail>
  </section>
</template>

<script>
  import viewSearch from './part/Search'
  import viewDetail from './part/Detail'
  export default{
    components: {
      viewSearch,
      viewDetail
    }
  }
</script>

<style lang="scss">

</style>
