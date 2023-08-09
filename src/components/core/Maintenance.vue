<template>
  <div class="pageMaintenance">
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subTitle }}</div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'setting-maintenance',
  data () {
    return {
      title: 'Maintenance in progress...',
      subTitle: ''
    }
  },
  methods: {},
  computed: {
    statusServer () {
      return this.$store.getters['statusServer']
    }
  },
  watch: {
    statusServer (val) {
      if (val.length > 0) {
        this.subTitle = val[1].messages
        if (val[0].messages == 'offline') {
          // Vue.localStorage.set('test1', 'offline->mainteanace');
        } else if (val[0].messages == 'retest') {
          // Vue.localStorage.set('test2', 'reopen->mainteanace');
          // location.reload()
          // setTimeout(() => {
          // this.$router.replace('/retest')
          // this.$store.dispatch('setServer')
          // }, 20)
        } else if (val[0].messages == 'online') {
          // Vue.localStorage.set('test3', 'online->mainteanace');
          this.$router.replace('/')
        } else {
          this.$router.replace('/')
        }
      }
    }
  },
  created () {
    this.$store.dispatch('watchServer', 'login')
    if (Vue.localStorage.get('login') == null) {
    } else {
      this.$store.commit('SET_DISPLAYMENU', [])
      this.$store.commit('SET_STATUS_LOGIN', false)
      let reMove = [
        'login',
        'token',
        'emp_id',
        'emp_code',
        'first_name',
        'last_name',
        'role_id',
        'user_id',
        'user_role_id',
        'position',
        'config_level',
        'department',
        'status_plan',
        'approve_role_id',
        'tree_data',
        'menu_head',
        'empForAct',
        'ORD_DIALOG',
        'ORD_DIALOG_SHOW',
        'ALLPROD_DIALOG_SHOW',
        'FOCUS_INPUT',
        'group_emp_id',
        'email',
        'MARK_LOCATION',
        'PO_NO_PREVIEW',
        'STATUS_BTN_PREVIEW',
        'frist_path',
        'DETECTED_DEVICE',
        'KEEP_PREVIEW',
        'SIZE_SCREEN',
        'PO_SUCCESS',
        'Route-to-SalesActivityReport'
      ]

      let all_path_menu = Vue.localStorage.get('all_path_menu')
      let theArray = JSON.parse(all_path_menu)
      theArray.menu_data.forEach(function (element) {
        Vue.localStorage.remove('sub_menu_' + element.m_code.trim())
      })
      Vue.localStorage.remove('all_path_menu')

      reMove.forEach(function (element) {
        Vue.localStorage.remove(element)
      })
      let reMove2 = [
        { name: 'SET_ALL_PATH_MENU', value: [] },
        { name: 'SET_HEAD_PATH_MENU', value: [] },
        { name: 'SET_SUB_PATH_MENU', value: [] },
        { name: 'SET_LEFT_PATH_MENU', value: [] },
        { name: 'SET_SELECT_MENU', value: '' }
      ]
      let t = this
      reMove2.forEach(function (element) {
        t.$store.commit(element.name, element.value)
      })

      // hide notification on logout
      // var x = document.getElementById('notifications')
      // x.style.display = 'none'
      // location.reload()
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.pageMaintenance {
  height: calc(100vh - 5px);
  background: #fff;
  text-align: center;
  padding: 100px;
  color: #858383;
  .title {
    font-size: 45px;
  }
  .subtitle {
    margin-top: 35px;
    font-size: 24px;
  }
}
</style>
