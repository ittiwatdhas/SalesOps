<template>
  <div
    style="
      background: white;
      height: calc(100vh - 0px);
      position: absolute;
      z-index: 1000;
      top: 0px;
      width: 100%;
    "
  >
    <form
      :action="url_cipher"
      method="POST"
      style="visibility: hidden"
      id="myFormCipher"
    >
      <label for="fname">First name:</label><br />
      <input
        type="text"
        id="saleops_token"
        name="saleops_token"
        :value="token"
      /><br />
      <label for="lname">Last name:</label><br />
      <input type="text" id="lname" name="rediect" :value="path" /><br /><br />
      <input type="button" value="Submit" onclick="myFunction()" />
    </form>
    <!-- <div v-html="htmlDom"></div> -->
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'menu-mangement',
  data () {
    return {
      htmlDom: '',
      token: '',
      path: ''
    }
  },
  methods: {
    submitForm () {
      this.token = Vue.localStorage.get('token')
      let sub_menu_setting = Vue.localStorage.get('sub_menu_setting')
      let arr_menu = JSON.parse(sub_menu_setting)
      let support = _.filter(arr_menu, item => {
        if (item.group_name == 'SUPPORT') {
          return true
        }
      })
      if (support.length > 0) {
        let child = _.filter(support[0].item, item => {
          if (item.m_code == 'external') {
            return true
          }
        })
        if (child.length > 0) {
          let apath = child[0].m_path
          let checkPath = apath.split('?')
          let getRedirect = checkPath[1].split('=')
          if (getRedirect.length > 1) {
            this.path = getRedirect[1]
            setTimeout(() => {
              document.getElementById('myFormCipher').submit()
            }, 0)
          }
        }
      }
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.submitForm()
      // this.fetch()
    }
  },
  beforeCreate () {
    let path = this.$router.app._route.path
    if (path == '/cipher/customeronsales') {
      // document.getElementById('menu-top').style.style.visibility = 'hidden'
      // document.getElementById('app').style.display = 'none'
      // document.getElementById('menu-top').style.display = 'none'
    }
  },
  computed: {
    url_cipher () {
      return Vue.config['url_cipher']
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left')
  }
}
</script>
