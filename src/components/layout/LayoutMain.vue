<template>
          <transition mode="out-in" enter-active-class="fadeInUp" leave-active-class="">

                  <router-view class="container animated"></router-view>
          </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.animated {
      -webkit-animation-duration: .3s;
      animation-duration: .3s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
      from {
            -webkit-transform: translate3d(0, -10%, 0);
            transform: translate3d(0, -10%, 0);
            opacity: .4;
      }

      to {
            -webkit-transform: none;
            transform: none;
            opacity: 1
      }
}

.fadeInDown {
      -webkit-animation-name: fadeInDown;
      animation-name: fadeInDown;
}


@-webkit-keyframes fadeInUp {
      from {
            -webkit-transform: translate3d(0, 5%, 0);
            transform: translate3d(0, 5%, 0);
            opacity: .4;
      }

      to {
            -webkit-transform: none;
            transform: none;
            opacity: 1
      }
}

.fadeInUp {
      -webkit-animation-name: fadeInUp;
      animation-name: fadeInUp;
}

.container {
     width: 100%;
     min-width: 1300px;
     padding: 20px 20px;
     height: 90%;
     overflow: hidden;
}
</style>
