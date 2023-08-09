<template>
  <!---Start Header System-->
  <md-toolbar class="-head" id="menu-top">
    <div style="width: 100%; display: -webkit-box">
      <div style="width: 10%; padding-top: 10px">
        <md-layout style="background-color: ; padding-left: 25px">
          <img
            src="~@/assets/images/tripplan.png"
            alt="Sale Ope"
            width="36"
            height="36"
          />
        </md-layout>
        <md-layout style="background-color: ; align-item: center">
          <label
            class="md-title latoFont screen-max"
            style="color: #fd7f00; font-size: 14px; font-weight: 500 !important"
            >SALES OPS</label
          >
        </md-layout>
      </div>
      <div style="width: 60%; padding-top: 17px; display: flex">
        <div
          v-for="item in displayMenu"
          :key="'headMenu-' + item.m_id"
          v-if="item.m_code != 'setting' && item.m_level != 0"
        >
          <md-menu md-align-trigger>
            <md-button
              md-menu-trigger
              :style="{
                margin: 'unset',
                'font-weight': '600',
                'font-size': '16px',
                'font-family': 'Proxima Nova',
                color: renderCol(item)
                  ? '#fd7f00 !important'
                  : '#a8a8a8 !important'
              }"
              >{{ item.m_name }}</md-button
            >
            <md-menu-content style="background: white; width: auto">
              <md-menu-item
                md-menu-trigger
                style="padding: 0px 0px 0px 0px !important"
                v-for="items in item.sub_menu"
                :key="'subMenu-' + items.m_id"
                :id="'menu-id-' + items.m_id"
                :value="items.m_name"
              >
                <span
                  md-menu-trigger
                  @click="selectedMenuS(items)"
                  :id="'sub-menu-id-' + items.m_id"
                  style="padding: 0 0px 0 0px; width: 100%; z-index: 100"
                  :style="{
                    color: renderColSub(items)
                      ? '#fd7f00 !important'
                      : '#a8a8a8 !important'
                  }"
                  >{{ items.m_name }}</span
                >
                <!-- <template>
                    <div
                        v-for="items in item.sub_menu"
                        :key="'subMenu-'+items.m_id"
                        :id="'menu-id-'+items.m_id" 
                        @click.native="selectedMenuS(items)">
                                  <span  
                                md-menu-trigger
                                  :id="'menu-id-'+items.m_id"
                                  :style="{'color':renderColSub(items) ?'#fd7f00 !important':'#a8a8a8 !important'}"
                                >{{items.m_name}}</span>

                              </div>
                </template> -->
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
        <span style="flex: 1"></span>
      </div>
      <div style="width: 30%; padding-top: 8px">
        <md-list>
          <md-list-item>
            <div style="position: relative">
              <md-button
                id="btn-noti"
                class="md-icon-button md-raised"
                style="margin-right: 20px"
                :class="getClassNoti(newf_has_notification)"
                @click="toggleNotification()"
              >
                <md-icon id="btn-icon-noti" style="color: white; font: bold"
                  >notifications</md-icon
                >
              </md-button>
            </div>
            <md-avatar style="margin-right: 15px">
              <img src="~@/assets/images/user1.png" alt="user" />
            </md-avatar>
            <div class="md-list-text-container">
              <span class="body-primary-text defaultCls">
                <!-- <label class="latoFont -font-16">
                  <b>{{txt_emp_id}}</b>
                </label>&nbsp; :&nbsp; -->
                <label class="kanitFont -font-16">
                  <b>{{ txt_username }}</b>
                </label>
              </span>
              <span
                class="md-caption -list-block defaultCls"
                style="
                  font-family: kanit !important;
                  font-size: 12px !important;
                  width: 200px;
                "
              >
                {{ txt_emp_id }}&nbsp; : &nbsp;{{ txt_position }}</span
              >
              <md-tooltip md-direction="bottom" class="latoFont">{{
                txt_position
              }}</md-tooltip>
            </div>
            <md-menu
              md-align-trigger
              md-size="4"
              md-direction="bottom left"
              ref="menuSetting"
              v-click-outside="outsideSetting"
              @close="closeMenuSetting"
              @open="openMenuSetting"
            >
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>

              <md-menu-content class="menu-top">
                <md-menu-item>
                  <router-link
                    :to="{ path: '/setting/moresetting' }"
                    exact
                    v-bind:class="classActive"
                    @click.native.prevent="MenuSetting('/setting/moresetting')"
                  >
                    <span style="font-family: Lato !important">SETTING</span>
                    <md-icon>settings</md-icon>
                  </router-link>
                </md-menu-item>
                <md-menu-item @click="openDialog('logout')">
                  <span
                    class="md-subheading"
                    style="font-family: Lato !important"
                    >LOGOUT</span
                  >
                  <md-icon>exit_to_app</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content-html="confirm.contentHtml"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @open="onOpen"
      @close="onClose"
      ref="logout"
    ></md-dialog-confirm>
  </md-toolbar>

  <!---End Header System-->
</template>

<script>
var status_show_menuSetting = false
import Vue from 'vue'
import Router from 'vue-router'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'tripplan-menu',
  data () {
    return {
      check_test: true,
      config_level: '',
      txt_username:
        Vue.localStorage.get('first_name') +
        ' ' +
        Vue.localStorage.get('last_name'),
      txt_emp_id: Vue.localStorage.get('emp_id'),
      txt_position: Vue.localStorage.get('position'),
      confirm: {
        title: 'Do you want to log out?',
        contentHtml: 'Log out of Sales Ops.',
        ok: 'Yes',
        cancel: 'Cancel'
      },
      classActive: '',
      classActiveTripplan: '',
      classHaveNoti: false,
      classNotHaveNoti: true,
      last_menu: '',
      pathFristPage: JSON.parse(Vue.localStorage.get('frist_page'))
    }
  },
  computed: {
    ...mapGetters({
      head_path_menu: 'head_path_menu',
      newf_last_notification_id: 'newf_last_notification_id',
      newf_has_notification: 'newf_has_notification'
    }),
    displayMenu () {
      return this.$store.getters['displayMenu']
    },
    fristPage () {
      return this.$store.getters['frist_page']
    },
    statusServer () {
      return this.$store.getters['statusServer']
    }
  },
  watch: {
    statusServer (val) {
      // console.log(this.$router.app._route.name)
      if (val.length > 0) {
        if (val[0].messages == 'offline') {
          localStorage.setItem('statusServer', val[0].messages)
          this.$router.replace('/maintenance')
        } else if (val[0].messages == 'online') {
          if (localStorage.getItem('statusServer') == null) {
            localStorage.setItem('statusServer', val[0].messages)
          } else if (localStorage.getItem('statusServer') == 'retest') {
            localStorage.setItem('statusServer', val[0].messages)
            this.$router.replace('/')
          }
        } else if (val[0].messages == 'retest') {
          localStorage.setItem('statusServer', val[0].messages)
        } else {
          localStorage.setItem('statusServer', val[0].messages)
          this.$router.replace('/')
        }
      }
    }
  },
  created () {
    this.$store.dispatch('watchServer', 'login')
    this.config_level = Vue.localStorage.get('config_level')
    // let path = this.$router.app._route.path.split("/");
    // console.log(this.pathFristPage)
    setTimeout(() => {
      var res = JSON.parse(Vue.localStorage.get('sub_menu_setting'))
      //  console.log(res[0].item[0].m_path)
      this.pathFristPage = res[0].item[0].m_path
    }, 500)

    if (this.$router.app._route.name == 'tripplan-about') {
      this.classActive = 'router-link-exact-active router-link-active'
    } else if (this.$router.app._route.name == 'tripplan-usermanege') {
      this.classActive = 'router-link-exact-active router-link-active'
    } else if (this.$router.app._route.name == 'tripplan-approve') {
      for (let i = 0; i < this.head_path_menu.length; i++) {
        if (this.head_path_menu[i].m_code == 'tripplan') {
          this.head_path_menu[i].m_class =
            'router-link-exact-active router-link-active'
        }
      }
    }

    var self = this
    // get noti status
    Vue.http
      .get(Vue.config['url'] + '/get-noti-status', {
        headers: { Authorization: 'Bearer ' + Vue.localStorage.get('token') }
      })
      .then(function (data) {
        var noti_status = data.body.success.data[0].noti_status
        if (noti_status == 1) {
          self.classNoti = '-orange'
          self.$store.commit('SET_NEWF_HAS_NOTIFICATION', true)
        } else {
          self.classNoti = '-gray'
          self.$store.commit('SET_NEWF_HAS_NOTIFICATION', false)
        }
      })
      .then(response => {
        //console.log(response.bodyText);
      })
    this.setMasterNotification()
  },
  methods: {
    closeMenu () {
      console.log('A')
      this.check_test = true
    },
    ...mapActions(['setMasterNotification']),
    renderCol (value) {
      let path = this.$router.app._route.path.split('/')
      if (path.length > 1) {
        if (_.trim(path[1]) == _.trim(value.m_code)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    renderColSub (value) {
      let path = this.$router.app._route.path
      if (path.length > 0) {
        if (_.trim(path) == _.trim(value.m_path)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    selectedMenuS (value) {
      let mPath = value.m_path
      let externalPath = mPath.indexOf('http')
      if (externalPath >= 0) {
        let token = Vue.localStorage.get('token')
        let url = new URL(value.m_path + '?token=' + token)
        window.open(url)
      } else {
        let data = {
          m_code: value.m_code,
          month: '',
          year: '',
          tab: '',
          emp_id: ''
        }
        Vue.localStorage.set(
          'Route-to-SalesActivityReport',
          JSON.stringify(data)
        )
        //  console.log('menu-id-'+value.m_id,document.getElementById('menu-id-'+value.m_id).childNodes[2])
        document.getElementById('menu-id-' + value.m_id).childNodes[2].click()
        Vue.localStorage.remove('budget_detail')

        this.$router.push(value.m_path)
        let month_id = moment(new Date()).format('MM')
        let year = moment(new Date()).format('YYYY')
        if (value.m_path == '/orders/approval') {
          this.$store.commit('myorders/SET_KEEP_ROUTER', false)
          this.$store.dispatch('myorders/getOrderBySales', {
            year: year,
            month: month_id,
            po: '',
            saleman: '',
            customer: ''
          })
        } else if (value.m_path == '/orders/myorders') {
          this.$store.commit('myorders/SET_KEEP_ROUTER', true)
          this.$store.dispatch('myorders/getOrderBySales', {
            year: year,
            month: month_id
          })
          this.$store.dispatch('myorders/getOrderSummary', {
            year: year,
            month: month_id
          })
        } else if (value.m_path == '/orders/mkt/report') {
          if (this.last_menu == '') {
            this.last_menu = '/orders/myorders'
          }
          this.$store.commit('SET_LAST_MENU', this.last_menu)
        }
        if (value.m_path != '/orders/mkt/report') {
          this.last_menu = value.m_path
        }
      }
    },
    goFirstPage (item) {
      if (item.sub_menu.length > 0) {
        return { path: item.sub_menu[0].m_path.trim() }
      } else {
        return ''
      }
    },
    selectedMenu (value) {
      let key = JSON.parse(
        Vue.localStorage.get('sub_menu_' + value.m_code.trim())
      )
      this.$store.commit('SET_SP_ORDER_SALES', [])
      this.$store.commit('SET_SELECT_MENU', value.m_code)
      this.$store.dispatch('selectedMenuService', value)
    },

    MenuSetting (value) {
      // google analytics
      this.$ga.event(this.$ga_key.Setting)
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    onOpen () {
      //console.log('Opened');
    },
    onClose (type) {
      if (type == 'ok') {
        this.$store.commit('SET_DISPLAYMENU', [])
        this.$store.commit('SET_STATUS_LOGIN', false)
        this.$router.replace('/')
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
        var x = document.getElementById('notifications')
        x.style.display = 'none'
        location.reload()
      }
    },
    outsideSetting: function (e) {
      if (status_show_menuSetting == true) {
        this.$refs.menuSetting.close()
      }
    },
    closeMenuSetting () {
      status_show_menuSetting = false
    },
    openMenuSetting () {
      status_show_menuSetting = true
    },
    toggleNotification () {
      var x = document.getElementById('notifications')
      if (x.style.display === 'none') {
        x.style.display = 'block'

        var self = this

        Vue.http
          .get(Vue.config['url'] + '/set-noti-status/0', {
            headers: {
              Authorization: 'Bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(function (data) {
            self.$store.commit('SET_NEWF_HAS_NOTIFICATION', false)
          })
          .then(response => {
            //console.log(response.bodyText);
          })

        // google analytics
        this.$ga.event(this.$ga_key.Notification)

        //this.$store.commit('SET_NEWF_NOTIFICATION', []);
        // load new notification
        //this.setMasterNotification();
      } else {
        x.style.display = 'none'
        //this.$store.commit('SET_NEWF_NOTIFICATION', []);
      }
    },
    getClassNoti (status) {
      // console.log("status => ",status);
      if (status == true) return '-orange'
      else return '-gray'
    }
  },
  components: {
    // 'menu-title'   : require('./menu-title'),
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },
      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}
</script>
<style>
@media (max-width: 1200px) {
  .md-toolbar.-head span.md-title {
    padding-right: 50px;
  }
  .md-theme-default a:not(.md-button) {
    padding-right: 30px;
  }
}
.menu-top .md-list-item-container.md-button {
  height: 48px !important;
}

.-gray {
  background-color: rgb(119, 119, 119) !important;
}

.count {
  position: absolute;
  top: -5px;
  min-height: 17px;
  min-width: 17px;
  overflow: hidden;
  background: red;
  color: white;
  text-align: center;
  border-radius: 100%;
  font-size: 9px;
  font-weight: bold;
  line-height: 15px;
  z-index: 5;
  left: 30px;
  border: solid 1px rgba(77, 0, 0, 0.2);
}
#menu .md-list-item .md-list-item-container {
  padding: 0 0 0 0;
}
</style>
