<template>
  <div id="pageFormManagement">
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

      <md-layout md-column md-gutter md-flex="75" style="padding-left:4%;">
        <md-layout style="flex: initial;" class="header-bar">
          <div class="title" style="width:100%;text-align:left">{{title}}</div>
        </md-layout>
        <md-spinner :md-size="150" :md-stroke="1" v-show="spinnerLoading" md-indeterminate></md-spinner>
        <div class="cust-list-box" style="padding-top:25px;padding-left:30px;padding-right:15px;">
          <div class="head-table" style="color:#797979;font-weight : 600;padding-right:0px">
            <div style="width:5%;text-align:left; cursor: pointer;"></div>
            <div style="width:20%;text-align:left; cursor: pointer;">Form</div>
            <div style="width:15%;text-align:left; cursor: pointer;">Field</div>
            <div v-for="(row, idex) in headColumn" :key="idex+'head'"
              :style="{'width' : 60 / headColumn.length +'%' ,'text-align':'center'}">
              {{row.level_name}}
            </div>
          </div>

          <div class="body-deatil" @scroll="handleScroll" style="margin-top: 20px;max-height: calc(100vh - 225px);">
            <div class="detail-table" v-for="(item , index) in dataList" :key="index" style="padding-top:2px;padding-bottom:3px">
              <div :style="{'width':'5%','text-align' : 'left'}">
                <md-icon style="opacity:0.5;font-size:19px">lock_open</md-icon>
              </div>
              <div :style="{'width':'20%','text-align' : 'left','Opacity' :'0.5'}">{{item.page_desc}}</div>
              <div :style="{'width':'15%','text-align' : 'left'}">{{item.field_desc}}</div>
              <div v-for="(row, idex) in headColumn" :key="idex+'head'"
                :style="{'width' : 60 / headColumn.length +'%' ,'text-align':'center'}">
                <form @click.stop.prevent="save(item)">
                    <md-switch type="submit" class="md-primary" v-model="item[row.role_code]"></md-switch>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </md-layout>
    </md-layout>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "form-mangement",
  data() {
    return {
      title: "FORM MANAGEMENT"
    };
  },
  computed: {
    dataList() {
      return this.$store.getters["formmanage/dataList"];
    },
    spinnerLoading() {
      return this.$store.getters["formmanage/spinnerLoading"];
    },
    headColumn() {
      return this.$store.getters["formmanage/headColumn"];
    }
  },
  methods: {
    handleScroll(event) {},
    save(row) {
      this.$store.dispatch("formmanage/saveForm" , row);
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "setting");
      this.login = true;
      this.$store.dispatch("formmanage/getOrgForm");
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left")
  },
  directives: {
    // ClickOutside
  }
};
</script>
<style lang="scss" scoped>
#pageFormManagement {
  .head-table {
    display: -webkit-box;
    font-weight: roboto;
  }
  .body-deatil {
    overflow-x: hidden !important;
    .md-icon {
      margin-right: 0px !important;
    }

    .hover-icon {
      visibility: hidden;
    }
    .detail-table {
      display: -webkit-box;
    }

    .detail-table:hover {
      cursor: pointer;
      .hover-icon {
        visibility: visible;
      }
    }

    .teamname {
      width: 35%;
      text-align: left;
      cursor: pointer;
      color: #414141;
      opacity: 0.5;
      font-family: roboto;
      font-weight: bold;
    }
  }
}
</style>