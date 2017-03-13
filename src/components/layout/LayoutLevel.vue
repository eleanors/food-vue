<template>
  <ul class="position-list">
    <li v-for="(item, index) in position">
      <router-link :to="item.path" v-text="showName(item)"></router-link>
      <span class="separator" v-if="isLast(index)" v-text="separator"></span>
    </li>
  </ul>
</template>

<script>
  export default {


    props: {

      position: {
        type: Array,
        default: () => []
      },

      separator: {
        type: String,
        default: '/'
      }
    },

    methods: {

      isLast: function (index) {
        return index !== this.position.length - 1
      },

      showName: function (item) {

        return item.meta && item.meta.title || item.name
      }
    }
  }
</script>

<style lang="scss">
  .position-list {
    overflow: hidden;
  }

  .position-list li {
    float: left;

  .separator {
    margin: 0 6px;
  }

  }
</style>
