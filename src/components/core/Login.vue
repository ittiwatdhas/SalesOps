<template>
  <div id="login" class="pageLogin">
    <md-layout>
      <md-layout></md-layout>

      <md-layout>
        <md-card
          md-with-hover
          class="login"
          style="margin-top: 100px; width: 350px"
        >
          <md-card-header style="cursor: default">
            <md-layout md-gutter md-align="center">
              <img
                src="~@/assets/images/tripplan.png"
                alt="Sale Ops"
                style="width: 50px; height: 50px"
                class="mt-8"
              />
            </md-layout>
            <md-layout md-gutter md-align="center" class="mt-8">
              <span class="md-title -orange latoFont">SALES OPS</span>
            </md-layout>
          </md-card-header>

          <md-card-content class="pb-0">
            <!--autofocus -->
            <md-input-container
              class="pt-30"
              v-bind:class="[activeClassUs, errorClassUs]"
            >
              <!-- <label>Username</label> -->
              <md-input
                placeholder="Username"
                v-model="edt_username"
                v-on:change="change_edt_user"
                ref="username"
              ></md-input>
              <md-icon class="mr-8">person</md-icon>
              <span class="md-error">{{ validateUsername }}</span>
            </md-input-container>

            <md-input-container
              v-bind:class="[activeClassPwd, errorClassPwd]"
              md-has-password
            >
              <!-- <label>Password</label> -->
              <md-input
                placeholder="Password"
                type="password"
                v-model="edt_password"
                v-on:change="change_edt_pwd"
                ref="pwd"
                @keyup.enter.native="login"
              ></md-input>
              <span class="md-error">{{ validatePassword }}</span>
            </md-input-container>
          </md-card-content>

          <md-card-actions class="mb-15">
            <md-button id="btn-login" class="md-raised -orange" @click="login">
              <span class="mr-8">Log in</span>
              <md-icon>keyboard_arrow_right</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
      </md-layout>

      <md-layout></md-layout>
    </md-layout>

    <md-layout md-gutter md-align="center"></md-layout>

    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span>{{ txt_warning }}</span>
      <md-button class="md-accent" @click="retry" style="color: #fd7f00"
        >Retry</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
//import vuefire from 'vuefire';
// import firebase from 'firebase'

import _ from 'lodash'

// const messaging = firebase.messaging()

export default {
  name: 'tripplan-login',
  created () {
    if (window.location.hostname != 'localhost') {
      if (window.location.protocol != 'https:') {
        window.location.protocol = 'https:'
      }
    }
    this.$store.commit('SET_STATUS_LOGIN', false)
    this.$store.dispatch('watchServer', 'login')
  },
  data () {
    return {
      edt_username: '',
      edt_password: '',
      validateUsername: null,
      validatePassword: null,
      activeClassUs: '',
      errorClassUs: false,
      activeClassPwd: '',
      errorClassPwd: false,
      vertical: 'bottom',
      horizontal: 'center',
      duration: 7000,
      txt_warning: '',
      httpStatus: null
    }
  },
  mounted () {
    if (Vue.localStorage.get('all_path_menu') !== null) {
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
        'group_emp_id'
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
      // location.reload()
    }
  },
  computed: {
    statusServer () {
      return this.$store.getters['statusServer']
    }
  },
  watch: {
    statusServer (val) {
      if (val.length > 0) {
        if (val[0].messages == 'offline') {
          this.$router.replace('/maintenance')
        } else if (val[0].messages == 'online') {
          let path = this.$router.app._route.path
          // if (path == '/retest') {
          this.$router.replace('/')
          // }
        } else if (val[0].messages == 'retest') {
          let path = this.$router.app._route.path
          if (path == '/retest') {
            // this.$router.replace('/retest')
          } else {
            this.$router.replace('/maintenance')
          }
        } else {
          this.$router.replace('/')
        }
      }
    }
  },
  methods: {
    ttt () {
      console.log('AAAA')
    },
    login () {
      var ip = ''
      var uag = ''
      if (this.edt_username.length == 0) {
        this.errorClassUs = 'md-input-invalid'
        this.validateUsername = 'Please input username.'
        this.validatePassword = null
      } else if (this.edt_password.length == 0) {
        this.errorClassPwd = 'md-input-invalid'
        this.validatePassword = 'Please input password.'
        this.validateUsername = null
      } else {
        fetch('https://www.cloudflare.com/cdn-cgi/trace')
          .then(response => response.text())
          .then(
            data => (ip = data)
            //  console.log(data.match(/ip=(\S+)/)[1])
          )
        setTimeout(() => {
          //  console.log(ip)
          //  console.log(ip.match(/uag=(\S+)/))
          uag = ip
            .split('\n')
            .filter(el => el.startsWith('uag'))
            .join('\n')

          const myArray = uag.split('uag=')
          let word = myArray[1]
          var formData = new FormData()
          console.log('IP =>', ip)
          formData.append('username', this.edt_username)
          formData.append('password', this.edt_password)
          formData.append('ip', ip == '' ? '' : ip.match(/ip=(\S+)/)[1])
          formData.append('uag', word)
          this.$http
            .post(Vue.config['url'] + '/auth/login', formData, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
              }
            })
            .then(
              response => {
                this.$store.commit('SET_STATUS_LOGIN', true)
                let rs = response.body.success
                // get token firebase
                // messaging
                //   .requestPermission()
                //   .then(function () {
                //     console.log('Notification permission granted.')
                //     return messaging.getToken()
                //   })
                //   .then(function (token) {
                //     // console.log(token);
                //     // save token
                //     Vue.http
                //       .post(
                //         Vue.config['url'] + '/save-token',
                //         { 'f-token': token },
                //         {
                //           headers: { Authorization: 'Bearer ' + rs.token }
                //         }
                //       )
                //       .then(response => {
                //         console.log('update token to db')
                //       })
                //   })
                //   .catch(function (err) {
                //     console.log('Unable to get permission to notify.')
                //   })

                Vue.localStorage.set('login', true)
                Vue.localStorage.set('token', rs.token)
                Vue.localStorage.set('emp_id', rs.user_detail[0].emp_id)
                Vue.localStorage.set('emp_code', rs.user_detail[0].emp_code)
                Vue.localStorage.set('first_name', rs.user_detail[0].first_name)
                Vue.localStorage.set('last_name', rs.user_detail[0].last_name)
                // role2 closed
                Vue.localStorage.set('role_id', rs.user_detail[0].role_id)
                Vue.localStorage.set('user_id', rs.user_detail[0].user_id)
                Vue.localStorage.set('email', rs.user_detail[0].email)
                Vue.localStorage.set(
                  'user_role_id',
                  rs.user_detail[0].user_role_id
                )
                // -----
                Vue.localStorage.set(
                  'position',
                  rs.user_detail[0].position_name
                )
                Vue.localStorage.set('department', rs.user_detail[0].department)
                Vue.localStorage.set(
                  'config_level',
                  rs.user_detail[0].config_level
                )
                Vue.config['headers']['Authorization'] =
                  'Bearer ' + Vue.localStorage.get('token')

                Vue.localStorage.set(
                  'order_source',
                  JSON.stringify(rs.order_source)
                )
                Vue.localStorage.set('time_login', rs.time_login)
                // Vue.localStorage.set('all_path_menu', JSON.stringify(rs.menu_data));

                //this.$socket.emit('login', rs.user_detail[0].emp_id);
                /*  Vue.http
                  .get(Vue.config["url"] + "/get-msg-noti/" + dat.id, {
                    headers: {
                      Authorization: "Bearer " + Vue.localStorage.get("token")
                    }
                })
                .then(function(data) {
                  var data = data.body.success.data[0];
                  self.$store.commit("ADD_NEW_NOTIFICATION", data);
                  if(data['count_unread'] > 0 ){
                    self.$store.commit("SET_NEWF_HAS_NOTIFICATION", true);
                  }
                  
                })
                .then(response => {
                  //console.log(response.bodyText);
                }); */
                let fisrtMenu = _.filter(rs.menu_data, function (o) {
                  return o.m_code != 'setting'
                })
                if (fisrtMenu.length > 0) {
                  if (fisrtMenu[0].sub_menu.length > 0) {
                    let firstPath = fisrtMenu[0].sub_menu[0].m_path
                    this.$router.push({ path: firstPath })
                  }
                }
              },
              response => {
                this.$store.commit('SET_STATUS_LOGIN', false)
                this.httpStatus = response.status
                if (response.status == 401) {
                  this.txt_warning =
                    'Please check your username/password and try again.'
                } else {
                  this.txt_warning = 'System error.'
                }
                this.$refs.snackbar.open()
              }
            )
        }, 1200)
      }
    },
    retry () {
      if (this.httpStatus == 401) {
        this.$refs.pwd.$el.select()
        this.$refs.snackbar.close()
      } else {
        this.$refs.snackbar.close()
      }
    },
    change_edt_user (param) {
      if (param.length >= 1) {
        this.validateUsername = null
        this.errorClassUs = false
      }
    },
    change_edt_pwd (param) {
      if (param.length >= 1) {
        this.validatePassword = null
        this.errorClassPwd = false
      }
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    }
    // open() {
    //   this.$refs.snackbar.open();
    // }
  },
  beforeCreate () {
    var url = window.location.href
    let strUrl = url.toUpperCase()
    let check1 = 'username'
    let check2 = 'password'
    if (
      strUrl.indexOf(check1.toUpperCase()) >= 0 &&
      strUrl.indexOf(check2.toUpperCase()) >= 0
    ) {
      var list = url.split('?')
      if (list.length > 1) {
        var data = list[1].split('&')
        let l_username = data[0].split('=')
        let l_password = data[1].split('=')

        if (l_username.length > 1 && l_password.length > 1) {
          if (
            l_username[1].trim().length > 0 &&
            l_password[1].trim().length > 0
          ) {
            let i = 1
            if (i == 1) {
              var formData = new FormData()
              formData.append('username', l_username[1])
              formData.append('password', decodeURIComponent(l_password[1]))
              this.$http
                .post(Vue.config['url'] + '/auth/loginapp', formData, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json'
                  }
                })
                .then(
                  response => {
                    this.$store.commit('SET_STATUS_LOGIN', true)
                    let rs = response.body.success
                    // messaging
                    //   .requestPermission()
                    //   .then(function () {
                    //     console.log('Notification permission granted.')
                    //     return messaging.getToken()
                    //   })
                    //   .then(function (token) {
                    //     Vue.http
                    //       .post(
                    //         Vue.config['url'] + '/save-token',
                    //         { 'f-token': token },
                    //         {
                    //           headers: { Authorization: 'Bearer ' + rs.token }
                    //         }
                    //       )
                    //       .then(response => {
                    //         console.log('update token to db')
                    //       })
                    //   })
                    //   .catch(function (err) {
                    //     console.log('Unable to get permission to notify.')
                    //   })

                    Vue.localStorage.set('login', true)
                    Vue.localStorage.set('token', rs.token)
                    Vue.localStorage.set('emp_id', rs.user_detail[0].emp_id)
                    Vue.localStorage.set('emp_code', rs.user_detail[0].emp_code)
                    Vue.localStorage.set('email', rs.user_detail[0].email)
                    Vue.localStorage.set(
                      'first_name',
                      rs.user_detail[0].first_name
                    )
                    Vue.localStorage.set(
                      'last_name',
                      rs.user_detail[0].last_name
                    )
                    Vue.localStorage.set('role_id', rs.user_detail[0].role_id)
                    Vue.localStorage.set('user_id', rs.user_detail[0].user_id)
                    Vue.localStorage.set(
                      'user_role_id',
                      rs.user_detail[0].user_role_id
                    )
                    Vue.localStorage.set(
                      'position',
                      rs.user_detail[0].position_name
                    )
                    Vue.localStorage.set(
                      'department',
                      rs.user_detail[0].department
                    )
                    Vue.localStorage.set(
                      'config_level',
                      rs.user_detail[0].config_level
                    )
                    Vue.config['headers']['Authorization'] =
                      'Bearer ' + Vue.localStorage.get('token')

                    Vue.localStorage.set(
                      'order_source',
                      JSON.stringify(rs.order_source)
                    )
                    Vue.localStorage.set('time_login', rs.time_login)

                    let fisrtMenu = _.filter(rs.menu_data, function (o) {
                      return o.m_code != 'setting'
                    })
                    if (fisrtMenu.length > 0) {
                      if (fisrtMenu[0].sub_menu.length > 0) {
                        let firstPath = fisrtMenu[0].sub_menu[0].m_path
                        this.$router.push({ path: firstPath })
                      }
                    }
                  },
                  response => {
                    if (response.status == 401) {
                      this.$router.replace('/')
                    }
                  }
                )
            }
          } else {
            // console.log('NO ===>')
          }
        } else {
          // console.log('NO ===>')
        }
      }
    }
  }
}
</script>
<style>
.login {
  width: 30%;
  margin-top: 5%;
}

.mr-8 {
  margin-right: 8px !important;
}

.mt-8 {
  margin-top: 8px !important;
}

.mb-15 {
  margin-right: 15px !important;
}

.pb-0 {
  padding-bottom: 0px !important;
}

.md-button.-orange {
  background-color: #fd7f00 !important;
}

.pageLogin .md-card .md-card-content {
  padding-right: 30px !important;
  padding-left: 30px !important;
}

.md-title.-orange {
  color: #fd7f00 !important;
}
.md-backdrop.md-dialog-backdrop
  .md-dialog-container.test.md-theme-default.md-active {
  margin-left: 0% !important;
}

/* .md-dialog.md-reference {
    margin-left: 0% !important;
} */
</style>
