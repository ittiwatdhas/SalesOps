<template>
  <div>
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>
      <md-layout md-column md-gutter md-flex="75" style="padding-left: 4%">
      </md-layout>
    </md-layout>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'menu-mangement',
  data () {
    return {
      htmlDom: ''
    }
  },
  methods: {
    fetch () {
      // this.$store.commit('SET_STATUS_LOGIN', false)
      setTimeout(() => {
        let href = window.location.href
        let step1 = href.split('/#')
        let step2 = step1[0] + '/#/cipher/admin'
        this.$router.replace('/setting/moresetting')
        window.open(step2)
      }, 0)
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.$store.dispatch('setPathMenuService', 'setting')
      this.login = true
      this.fetch()
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left')
  }
}
</script>
