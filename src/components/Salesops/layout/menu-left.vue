<template>
  <div class="menu-left-body">
    <md-card md-with-hover class="-noshadow left-menu">
      <md-card-header>
        <div
          class="-font-16"
          style="
            font-family: Lato !important;
            font-weight: 700;
            color: #797979;
            margin-top: 5px;
            cursor: default;
          "
        >
          SETTINGS
        </div>
      </md-card-header>
      <md-card-content style="width: 100%; padding: 0">
        <md-list
          style="padding: 0"
          v-for="(rs, index) in left_path_menu"
          :key="index"
        >
          <md-list-item
            @click="head_menu_click(rs, index)"
            class="head-menu-setting"
          >
            <!-- <router-link  class="nav-link"> -->
            <span
              v-if="rs.group_name != ''"
              style="font-family: Roboto !important; font-size: 14px !important"
              >{{ rs.group_name }}</span
            >
            <span
              v-else
              style="font-family: Roboto !important; font-size: 14px !important"
              >OTHER</span
            >
            <md-icon v-if="!rs.status_hide_show">expand_more</md-icon>
            <md-icon v-else>expand_less</md-icon>
            <!-- </router-link> -->
          </md-list-item>
          <!-- <md-list-item v-if="rs.status_hide_show"> -->
          <span v-if="rs.status_hide_show">
            <md-list style="padding: 0" v-for="n in rs.item.length" :key="n">
              <md-list-item style="margin: 5px 5px 5px 5px">
                <router-link
                  :to="{ path: rs.item[n - 1].m_path }"
                  v-on:click.native="set_sub(rs, index, rs.item[n - 1])"
                  class="nav-link"
                >
                  <md-icon>{{ rs.item[n - 1].m_icon }}</md-icon>
                  <span
                    style="
                      font-family: Roboto !important;
                      font-size: 14px !important;
                      font-weight: 450;
                      opacity: 0.6;
                    "
                    >{{ rs.item[n - 1].m_name }}</span
                  >
                </router-link>
              </md-list-item>
            </md-list>
          </span>
          <!-- </md-list-item> -->
        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "menu-left",
  computed: {
    ...mapGetters({
      left_path_menu: 'left_path_menu'
    }),

    frist_path () {
      console.log(Vue.localStorage.get('frist_path'))
      return Vue.localStorage.get('frist_path')
    }
  },
  created () {
    // this.$store.commit("SET_SUB_PATH_MENU", []);
    this.$store.dispatch('selectedMenuService', { m_code: 'setting' })
  },
  data () {
    return {
      tempIndex: '',
      tempIndex_sub: ''
    }
  },
  methods: {
    head_menu_click (value, index) {
      // for (let index = 0; index < this.left_path_menu.length; index++) {
      //   const element = this.left_path_menu[index];
      //   element.status_hide_show = false;
      // }
      if (this.left_path_menu[index].status_hide_show == true) {
        this.left_path_menu[index].status_hide_show = false
      } else {
        this.left_path_menu[index].status_hide_show = true
      }
      this.$store.commit('SET_LEFT_PATH_MENU_AFTER', this.left_path_menu)
    },
    set_sub (value, index, curr) {
      let path = this.$router.app._route.path
      let checkPath = path.split('?')
      if (checkPath[0] == '/setting/external') {
        setTimeout(() => {
          let href = window.location.href
          let step1 = href.split('/#')
          let step2 = step1[0] + '/#/cipher/admin'
          window.open(step2)
          this.$router.replace('/setting/moresetting')
        }, 0)
      }

      // let mPath = curr.m_path
      // let externalPath = mPath.indexOf('http')
      // if (curr.m_code == 'external') {
      //   let str = curr.m_path.trim()

      //   let href = window.location.href
      //   let step1 = href.split('/#')
      //   let step2 = step1[0] + '/#' + str
      //   window.open(step2)
      //   // this.$router.replace(str)
      // } else {
      this.$store.commit('SET_LEFT_PATH_MENU_AFTER', this.left_path_menu)
      // }
    }
  }
}
</script>
