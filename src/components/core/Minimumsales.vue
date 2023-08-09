<template>
  <div id="pageMiniSales">
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>

      <md-layout md-column md-gutter md-flex="75" style="padding-left:4%;">
        <md-layout style="flex: initial;" class="header-bar">
          <div class="title" style="width:50%;text-align:left">{{title}}</div>
          <div class="header-bar-botton">
            <!-- <md-button class="md-raised" @click="addLabel">
              <md-icon class="pb-4" md-verticalstatus-plan-align="center" md-align="center">add</md-icon>
              <label class="ml-15 addNewRow">Add Salesman</label>
            </md-button> -->
          </div>
        </md-layout>
        <md-layout style="flex: initial;margin-top:10px" class="search-cust-box">

          <div style="width:30%">
            <md-dropdown-box :data="byGroupList" @choose="salesTeamHead" v-model="inputDP"></md-dropdown-box>
          </div>
          <div style="width:30%">
            <md-search-box
              id="pageMiniSales-searc-box"
              :placeholder="'Search'"
              :data="[]"
              @filter="filterSales"
            ></md-search-box>
          </div>
          <div class="md-report-bar" style="width:24%;">
            <span style="font-size:11px;color:#727272;font-family:roboto">Salesman</span>
            <span style="font-size:18px;color:#575757;font-family:Helvetica Neue;padding-left:13px">
              <b>{{$store.getters["globalfunc/formatNumberInt"](dataList.length)}}</b>
            </span>
          </div>
          <div style="paddimg-left:0;align-items: left;width:8%">
            <svg class="add-btn" @click="addLabel"  id="Search_Button" data-name="Search Button" xmlns="SVG namespace" width="36" height="36" viewBox="0 0 36 36">
            <rect id="Rectangle_518" data-name="Rectangle 518" width="36" height="36" rx="3" fill="#fd7f00" opacity="0.9"/>
            <g id="ic_add" transform="translate(6 6)">
            <rect id="rectangle" width="24" height="24" fill="none"/>
            <path id="path" d="M11,5v6H5v2h6v6h2V13h6V11H13V5Z" fill="#fff" fill-rule="evenodd"/>
            </g>
            </svg>
          </div>
        </md-layout>
        <md-spinner :md-size="150" :md-stroke="1" v-show="spinnerLoading" md-indeterminate></md-spinner>
        <md-layout
          style="flex: initial;"
          md-align="center"
          class="cust-list-box"
          v-if="dataList.length == 0"
        >
          <span class="nodata">No data</span>
        </md-layout>
        <md-layout style="flex: initial;" class="cust-list-box" v-else>
          <div class="head-table">
            <div style="width:8%;"></div>
            <div
              :class="btnSort =='team_code' ? 'active':''"
              style="width:28%;text-align:left; cursor: pointer;"
              @click="sortData('team_code')"
            >Sales Team</div>
            <div
              :class="btnSort =='salesman' ? 'column-descript active':'column-descript'"
              style="width:29%;text-align:left; cursor: pointer;"
              @click="sortData('sm_code')"
            >Salesman</div>
            <div
              :class="btnSort =='tagmodule' ? 'column-province active':'column-province'"
              style="width:16%;text-align:left; cursor: pointer;"
              @click="sortData('minimum')"
            >Minimum Sales</div>
            <div
              :class="btnSort =='status' ? 'active':''"
              style="width:14%;cursor: pointer;"
              @click="sortData('status')"
            >Active</div>
            <div style="width:5%;cursor: pointer;"></div>
          </div>
          <div
            class="body-deatil"
            v-click-outside="outsideTable"
            @scroll="handleScroll"
            :style="{'padding-right': dataList.length > 1 ? '48px' : '60px',
              'overflow-y': dataList.length > 1 ? 'scroll' : 'hidden'}"
          >
            <div
              class="detail-table"
              v-for="(item , index) in dataList"
              :key="index"
              :style="{'margin-top': item.mode ? '' : '15px'}"
              :id="'row-'+ index "
            >
              <div style="width:8%;">
                <md-icon
                  :style="{'color': item.mode ? '#575757' : '#575757',
                  'opacity': item.mode ? '0.8' : '0.8',
                'margin-top': item.mode ? '37px' : '',
                'font-size':'23px'}"
                >monetization_on</md-icon>
              </div>
              <!-- :style="{'padding-top': item.mode ? '10px' : 'unset','width':'28%','padding-right':'3%'}" -->
              <div
                class="column-module"
                :style="{'padding-top': item.mode ? '40px' : '0px','width':'28%','padding-right':'3%'}"
              >
                <!-- <md-input-container v-if="item.mode">
                  <label class="label-text small" v-if="item.temp_tagmodule == ''">Select Module</label>
                  <md-select v-model="item.team_code" @selected="salesTeams">
                    <md-option
                      :value="row.code"
                      v-for="(row , idx) in byGroupList"
                      :key="idx"
                    >{{row.title}}</md-option>
                  </md-select>
                </md-input-container> 
                v-else 
                -->
                <label class="label-text" style="font-family:kanit">{{item.team_name}}</label>
              </div>
              <!-- :style="{'margin-top': item.mode ? '10px' : '', 'text-align': 'left','width':'29%'}" -->
              <div
                :style="{'margin-top': item.mode ? '40px' : '0px', 'text-align': 'left','width':'29%'}"
                class="inp-bar"
                @mouseleave="close"
              >
                <!-- <md-auto-focus-box
                  v-if="item.mode"
                  :placeholder="'Search...'"
                  :data="bySalesman"
                  v-model="item.full_name"
                  @change="filterSM"
                  @choose="chooseSM"
                  @mouseleave="leaveSM"
                ></md-auto-focus-box>-->
                <!-- v-else -->
                <label
                  class="label-text"
                  style="font-family:kanit"
                >{{item.sm_code}}&nbsp;{{item.full_sm}}</label>
              </div>

              <div
                class="inp-bar"
                :style="{'margin-top': item.mode ? '10px' : '','width':'16%', 'text-align': 'right', 'padding-right': '5px'}"
              >
                <mds-input-number
                  v-model="item.minimum"
                  v-if="item.mode"
                  :style="{'margin-bottom': item.minimum == '' || item.minimum == null ? '10px' : '0px'}"
                ></mds-input-number>
                <label
                  v-else
                  class="label-text"
                >฿ {{$store.getters["globalfunc/formatNumberInt"](item.minimum)}}</label>
              </div>
              <div :style="{'padding-top': item.mode ? '37px' : '','width':'14%'}">
                <form @click.stop.prevent="openDialog(item , index , 'active')" style="height:22px">
                  <md-switch type="submit" v-model="item.status" class="md-primary"></md-switch>
                </form>
              </div>
              <div :style="{'padding-top': item.mode ? '37px' : '','width':'5%'}">
                <div
                  v-if="item.mode"
                  class="md-avatar md-avatar-icon active"
                  @click="openDialog(item , index , 'all')"
                >
                  <md-icon>save</md-icon>
                </div>
                <div v-else class="md-avatar md-avatar-icon" @click="editRow(item , index)">
                  <md-icon style="color:#797979">edit</md-icon>
                </div>
              </div>
            </div>
          </div>
        </md-layout>
      </md-layout>
    </md-layout>
    <md-dialog ref="confiem-dialog" style="margin:unset">
      <md-dialog-title>{{ques}}</md-dialog-title>
      <md-dialog-content>{{ans}}</md-dialog-content>
      <md-dialog-actions>
        <md-button class @click="closeDialog('close')">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('save')">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>Coming soon.</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Vue from "vue";
import _ from "lodash";
import ClickOutside from "vue-click-outside";
export default {
  name: "setting-Optionlabel",
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-auto-focus-box": require("./minisales-component/md-auto-focus-box"),
    "mds-input-number": require("./minisales-component/mds-input-number"),
    "md-search-box": require("../Salesops/customComponent/md-search-box-minimum"),
    "md-dropdown-box": require("../Salesops/customComponent/mds-dropdown-box")
  },
  data() {
    return {
      vertical: "bottom",
      horizontal: "center",
      duration: 4000,
      title: "MINIMUM SALES MANAGEMENT",
      ipt_search: "Search",
      btnType: "active",
      btnSort: "team_code",
      tempIndex: "default",
      tempEdit: "default",
      tempMode: "",
      warningText: "Please input data",
      tempSort: "ASC",
      selectRow: "",
      selectKey: "",
      ques: "Do you want to leave row?",
      ans: "Changes might not be saved.",
      checkStatus: false,
      inputDP: "All Sales Team"
    };
  },
  computed: {
    dataList() {
      return this.$store.getters["minimumsales/dataList"];
    },
    byGroupList() {
      return this.$store.getters["minimumsales/byGroupList"];
    },
    spinnerLoading() {
      return this.$store.getters["minimumsales/spinnerLoading"];
    },
    selectedTeam() {
      return this.$store.getters["minimumsales/selectedTeam"];
    },
    bySalesman() {
      return this.$store.getters["minimumsales/bySalesman"];
    }
  },
  watch: {
    // inputDP: function(value) {
    // }
  },
  methods: {
    close() {
      var rs = _.filter(this.dataList, item => {
        if (item.mode == true) {
          return true;
        }
      });
      if (rs.length > 0) {
        let theObject = rs[0];
        let str = theObject.sm_code + " " + theObject.full_sm;
        if (theObject.full_name != str) {
          theObject.full_name = str;
        }
      }
    },
    salesTeams() {
      console.log("salesTeams");
    },
    salesTeamHead(value) {
      this.$store.commit("minimumsales/setSelectedTeam", value);
      if (value.title == "All Sales Team") {
        this.$store.dispatch("minimumsales/getAllList", {
          user_emp_id: value.code,
          type: this.btnType,
          sort: this.btnSort,
          start_row: 0,
          orderby: this.tempSort,
          mode: "all"
        });
      } else {
        this.$store.dispatch("minimumsales/getAllList", {
          user_emp_id: value.code,
          type: this.btnType,
          sort: this.btnSort,
          start_row: 0,
          orderby: this.tempSort
        });
      }
    },
    sortData(value) {
      this.btnSort = value;
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";
      let taglabel = this.selectKey == "" ? "" : this.selectKey.taglabel;
      this.tempEdit = "default";
      this.tempIndex = "default";
      this.$store.dispatch("minimumsales/getAllList", {
        user_emp_id: this.selectedTeam.code,
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort
      });
    },
    filterSales(param) {
      this.$store.dispatch("minimumsales/filterData", param);
    },
    closeDialog(mode) {
      let theObject = this.dataList[this.tempIndex];
      var filt = _.filter(this.byGroupList, item => {
        if (item.code == theObject.team_code) {
          return true;
        }
      });
      let newLoad = {
        user_emp_id: this.selectedTeam.code,
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort
      };
      if (this.tempMode == "active") {
        if (mode == "close") {
          theObject.status = theObject.temp_status;
        } else {
          this.$store.dispatch("minimumsales/save", {
            load: newLoad,
            save: theObject
          });
        }
      } else if (this.tempMode == "all") {
        if (mode == "close") {
          theObject.full_name =
            theObject.temp_sm_code + " " + theObject.full_sm;
          theObject.full_sm = theObject.temp_full_sm;
          theObject.sm_code = theObject.temp_sm_code;
          theObject.team_code = theObject.temp_team_code;
          theObject.team_name = theObject.temp_team_name;
          theObject.status = theObject.temp_status;
          theObject.minimum = theObject.temp_minimum;
          if (this.dataList[this.dataList.length - 1].id == "new") {
            this.dataList.splice(this.dataList.length - 1, 1);
          }
        } else {
          var rs = _.filter(this.dataList, item => {
            if (item.mode == true) {
              return true;
            }
          });
          // rs.team_name = filt.length > 0 ? filt[0].title : "";
          // console.log(rs[0]);
          this.$store.dispatch("minimumsales/save", {
            load: newLoad,
            save: rs[0]
          });
        }
      }
      this.tempIndex = "default";
      theObject.mode = false;
      this.$refs["confiem-dialog"].close();
    },
    chooseSM(value) {
      this.dataList[this.tempIndex].sm_code = value.code;
      this.dataList[this.tempIndex].full_sm = value.title;
      this.dataList[this.tempIndex].full_name = value.code + " " + value.title;
    },
    filterSM: function(param) {
      this.$store.dispatch("minimumsales/filterSM", param);
    },
    addLabel() {
      let mode = 1;
      if (mode == 1) {
        this.$refs.snackbar.open();
      } else {
        let theArray = this.dataList;
        if (theArray[theArray.length - 1].id != "new") {
          let theObject = {
            id: "new",
            full_name: "",
            full_sm: "",
            minimum: 0,
            minimum_previous: null,
            mode: true,
            sm_code: "",
            status: false,
            team_code: "",
            team_name: "",
            temp_full_sm: "",
            temp_minimum: 0,
            temp_sm_code: "",
            temp_status: false,
            temp_team_code: "",
            temp_team_name: ""
          };
          theArray.push(theObject);
          this.checkStatus = true;
          if (this.tempIndex != "default") {
            this.dataList[this.tempIndex].mode = false;
          }
          if (theArray.length > 1) {
            this.tempIndex = theArray.length - 1;
          } else {
            this.tempIndex = 0;
          }
          setTimeout(() => {
            let input = document.getElementById("row-" + this.tempIndex);
            if (input != null) {
              input.scrollIntoView({
                behavior: "smooth"
              });
            }
          }, 150);
        }
      }
    },
    openDialog(value, index, mode) {
      if (mode == "active") {
        this.tempIndex = index;
        this.tempMode = mode;
        this.selectRow = value;
        this.ques = "Do you want to change status?";
        let status = value.status ? "active " : "inactive";
        this.ans = "Status will change to " + status + ".";
      } else if (mode == "all") {
        this.tempIndex = index;
        this.tempMode = mode;
        this.selectRow = value;
        this.ques = "Do you want save?";
        this.ans = "";
      }
      let theObject = this.dataList[index];
      if (mode == "all") {
        this.$refs["confiem-dialog"].open();
      } else if (mode == "active" && theObject.mode == false) {
        this.$refs["confiem-dialog"].open();
      } else {
        console.log("else =>");
      }
    },
    leaveSM() {},
    outsideTable: function(e) {
      if (
        this.tempIndex != "default" &&
        // this.checkStatus == true &&
        e.target.className != "md-button md-button-ghost md-theme-default" &&
        e.target.className !=
          "md-dialog-container md-theme-default md-active" &&
        e.target.className != "md-dialog-content" &&
        e.target.className != "md-dialog" &&
        e.target.className != "md-dialog-actions" &&
        e.target.className != "md-button md-theme-default" &&
        e.target.className != "md-button md-primary md-theme-default" &&
        e.target.className != "ml-15 addNewRow" &&
        e.target.className != "md-button md-raised md-theme-default" &&
        e.target.className != "md-dialog-title md-title"
      ) {
        let theObject = this.dataList[this.tempIndex];
        if (theObject.id == "new" && theObject.mode) {
          this.dataList.splice(this.dataList.length - 1, 1);
          this.tempEdit = "default";
          this.tempIndex = "default";
          theObject.mode = false;
          this.checkStatus = false;
        } else if (typeof theObject.id == "number" && theObject.mode) {
          var theOldObject = _.filter(this.dataList, item => {
            if (item.mode == true) {
              return true;
            }
          });
          if (
            theOldObject[0].temp_team_code == theOldObject[0].team_code &&
            theOldObject[0].temp_minimum == theOldObject[0].minimum &&
            theOldObject[0].status == theOldObject[0].temp_status &&
            theOldObject[0].sm_code == theOldObject[0].code
          ) {
            theObject.mode = false;
            this.checkStatus = false;
          } else {
            this.tempEdit = this.tempIndex;
            this.tempMode = "edit";
            this.ques = "Do you want to leave row?";
            this.ans = "Changes might not be saved.";
            this.openDialog(theOldObject[0], this.tempIndex, "all");
          }
        }
      }
    },
    editRow(value, index) {
      this.$store.dispatch("minimumsales/getMasterRow", value);
      let theObject = this.dataList[index];
      var theOldObject = _.filter(this.dataList, item => {
        if (item.mode == true) {
          return true;
        }
      });
      if (theOldObject.length == 0) {
        theObject.mode = true;
        this.tempIndex = index;
      } else {
        if (this.dataList[this.dataList.length - 1].id == "new") {
          if (
            theOldObject[0].temp_team_code == theOldObject[0].team_code &&
            theOldObject[0].temp_minimum == theOldObject[0].minimum &&
            theOldObject[0].status == theOldObject[0].temp_status &&
            theOldObject[0].temp_sm_code == theOldObject[0].sm_code
          ) {
            this.dataList.splice(this.dataList.length - 1, 1);
            this.tempEdit = index;
            this.tempIndex = "default";
            theObject.mode = true;
          } else {
            this.tempIndex = index;
            this.tempEdit = index;
            this.tempMode = "edit";
            this.ques = "Do you want to leave row?";
            this.ans = "Changes might not be saved.";
            this.openDialog(value, index, "all");
          }
        } else {
          if (
            theOldObject[0].temp_team_code == theOldObject[0].team_code &&
            theOldObject[0].temp_minimum == theOldObject[0].minimum &&
            theOldObject[0].status == theOldObject[0].temp_status &&
            theOldObject[0].temp_sm_code == theOldObject[0].sm_code
          ) {
            theObject.mode = true;
            theOldObject[0].mode = false;
            this.tempIndex = index;
          } else {
            this.tempEdit = index;
            this.tempMode = "edit";
            this.ques = "Do you want to leave row?";
            this.ans = "Changes might not be saved.";
            this.openDialog(value, index, "all");
          }
        }
      }
    },
    selectSales(value) {
      console.log("selectSales => ", value);
    },
    handleScroll(event) {}
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "setting");
      this.login = true;
      this.$store.commit("minimumsales/setSelectedTeam", {
        code: Vue.localStorage.get("emp_id")
      });
      this.$store.dispatch("minimumsales/getByGroups", {
        user_emp_id: Vue.localStorage.get("emp_id"),
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort
      });
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.attach-money {
  opacity: 0.7;
  padding-top: 2px;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  background: #575757;
}
.md-dropdown-box {
  background: #ffffff;
}
.md-report-bar {
  padding-top: 7px;
  padding-left: 4%;
  display: -webkit-box;
}
</style>