<template>
  <div class="pannel-content">
    <div class="pannel-header"><img src="~assets/icon.png" >全美食平台</div>
    <div class="pannel-group menu-list">
      <div class="pannel" v-for="(item, index) in menus">
        <div class="menu-item" v-on:click="toggle(item, index)">
          <span class="icon" :class="item.icon"></span>
          <router-link :to=item.link v-text="item.title"></router-link>
        </div>
        <transition v-on:beforeEnter="beforeEnter" v-on:afterEnter="afterEnter" v-on:beforeLeave="beforeLeave"  v-on:afterLeave="afterLeave">
          <div class="panel-collapse collapse" v-if="item.children && item.children.length" v-show="isExpanded(item)">
            <ul class="menu-sub-list">
              <li v-for="subMenu in item.children">
                <router-link :to=subMenu.link v-text="subMenu.title"></router-link>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      menus: {
        type: Array,
        default: ()=>[]
      }
    },
    watch: {
      '$route': function(route){
        this.shouldExpandMatchItem(route)
      }
    },
    methods: {
      toggle: function(item, index){
        if('expanded' in item){
          this.menus.forEach((menu) => {
            if(item == menu){
              menu.expanded = !item.expanded;
            }else{
              menu.expanded = false;
            }
          })
        }
      },
      isExpanded: function(item){
        return item.expanded;
      },
      findParentFromMenu: function(route){
        const menu = this.menus;
        for(let i=0, len=menu.length; i<len; i++){
          const item = menu[i];
          const children = item.children && item.children.length;
          if(children){
            for(var m=0; m<children; m++){
              if(item.children[m].link == route.path){
                return item;
              }
            }
          }
        }
      },
      shouldExpandMatchItem: function(route){
        let matched = route.matched;
        let lastMatched = matched[matched.length-1];
        let parent = lastMatched.parent || lastMatched;
        const isParent = parent === lastMatched;
        if(isParent) {
          const p = this.findParentFromMenu(route);
          if(p){
            parent = p;
          }
        }
        if('expanded' in parent && !isParent){
          parent.expanded = true
        }
      },
      beforeEnter: function(elem){
        elem.classList.add('collapsing')
        elem.style.display = 'block'
        elem.style.height = `${elem.scrollHeight}px`
      },
      afterEnter: function(elem){
        elem.classList.remove('collapsing')
      },
      beforeLeave: function(elem) {
        elem.classList.add('collapsing')
        elem.style.height = 0
      },
      afterLeave: function(elem){
        elem.classList.remove('collapsing')
        elem.style.display = 'none'
      }
    }
  }
</script>
<style lang="scss">
  @import '~assets/scss/index';
  .pannel-header{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background: $c-lesser;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }
  .pannel-group {
  .pannel {
    background: $menu-pannel-back-color;
    border-bottom: 1px solid #1a1a1b;
  }
  .menu-item {
    height: 68px;
    line-height: 68px;
    background: $menu-pannel-item-back-color;
  .icon {
    display: block;
    float: left;
    width: 46px;
    height: 100%;
    margin: 0 10px;
    overflow: hidden;
    position: relative;
  }
  a{
    display: block;
    cursor: pointer;
    padding-left: 45px;
    overflow: hidden;
    color: $menu-font-color;
    font-size: $menu-font-size;
    background: $menu-pannel-back-color;
  }
  }
  .panel-collapse {
    visibility: visible;
  }
  .menu-sub-list {
  li {
    height: 50px;
    line-height: 50px;
  a {
    display: block;
    text-indent: 110px;
    color: $menu-font-color;
    font-size: $menu-item-font-size;
  }
  }
  }
  .collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height .377s ease;
  }
  }
</style>
