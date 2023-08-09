<template>
  <div>
    <md-toolbar class="head-tripplan">
      <!-- <router-link
        v-for="(item , index) in sub_path_menu"
        :to="{path: item.m_path}"
        :key="item.m_id"
        :class="'nav-link' + item.m_id"
        :style="{'margin-left': index == 0 ? '55px' : '5px','margin-right' : '5px'}"
      >
        <div
          class="active-subheader-lable"
          style="width:auto;text-overflow: inherit;font-weight: 600;"
          @click="setHeadMenu(item)"
        >{{item.m_name}}</div>
        <div class="border-link" :style="{'position':'relative' , 'top' : '13px'}"></div>
      </router-link> -->
    </md-toolbar>
  </div>
</template>

<script>
import Vue from "vue";
import Router from "vue-router";
import moment from "moment";
export default {
  name: "sub-menu",
  computed: {},
  data() {
    return {
      arr_submenu: [],
      sub_menu_activity: "",
      last_menu: ""
    };
  },
  created() {
    let path = this.$router.app._route.path.split("/");
    this.$store.commit("SET_SELECT_MENU", path[1]);
  },
  computed: {
    sub_path_menu() {
      return this.$store.getters["sub_path_menu"];
    }
  },
  methods: {
    setHeadMenu(value) {
      let month_id = moment(new Date()).format("MM");
      let year = moment(new Date()).format("YYYY");
      if (value.m_path == "/orders/approval") {
        this.$store.commit("myorders/SET_KEEP_ROUTER", false);
        this.$store.dispatch("myorders/getOrderBySales", {
          year: year,
          month: month_id,
          po: "",
          saleman: "",
          customer: ""
        });
      } else if (value.m_path == "/orders/myorders") {
        this.$store.commit("myorders/SET_KEEP_ROUTER", true);
        this.$store.dispatch("myorders/getOrderBySales", {
          year: year,
          month: month_id
        });
        this.$store.dispatch("myorders/getOrderSummary", {
          year: year,
          month: month_id
        });
      }else if(value.m_path == "/orders/mkt/report"){
        if(this.last_menu == "") {
          this.last_menu = "/orders/myorders";
        }
        this.$store.commit("SET_LAST_MENU", this.last_menu);
      }
      if(value.m_path != "/orders/mkt/report"){
        this.last_menu = value.m_path;
      }
      
    }
  },
  components: {}
};
</script>
<style>
</style>


