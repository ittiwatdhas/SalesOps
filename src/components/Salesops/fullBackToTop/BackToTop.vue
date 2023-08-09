<template>
  <transition name="back-to-top-fade">
    <div class="vue-back-to-top" v-show="visible" @click="backToTop">
      <span>
        <md-icon>arrow_upward</md-icon>
      </span>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'BackToTop',
  props: {
    visibleOffset: {
      type: [String, Number],
      default: 600
    }
  },
  data () {
    return {
      visible: false
    }
  },
  /**
   * Catch window scroll event 
   * @return {void}
   */
  created () {
    let catchScroll = () => {
      this.visible = (window.pageYOffset > parseInt(this.visibleOffset))
    }

    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, currentScroll - (currentScroll / 5))
      }
    }

    window.onscroll = catchScroll
  },
  methods: {
    /**
     * The function who make the magics
     * @return {void}
     */
    backToTop () {
      window.smoothscroll()
    }
  }
}
</script>
<style>
.back-to-top-fade-enter-active, .back-to-top-fade-leave-active {
  transition: opacity .7s;
}
.back-to-top-fade-enter, .back-to-top-fade-leave-to{
  opacity: 0;
}

.vue-back-to-top{
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 50px;
  height: 50px;
  color: #ffffff;
  text-align: center;
  line-height: 50px;
  background-color: #f5c85c;
  border-radius: 30px;
  z-index: 1000;
  cursor:pointer;
}

.vue-back-to-top span{
  color:#ffffff;
}

</style>