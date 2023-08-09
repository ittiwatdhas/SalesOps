<template>
  <div id="pageNewsfeedlabel">
    <md-layout md-gutter class="mh-0">
     <md-layout md-column md-gutter md-flex="25">
      <menu-left></menu-left>
    </md-layout>

     <md-layout md-column md-gutter md-flex="75" style="padding-left:4%;">
        <md-layout  style="flex: initial;" class="header-bar">
          <div class="title" style="width:50%;text-align:left">{{title}}</div>
          <!-- <div class="header-bar-botton">
            	<md-button class="md-raised" @click="addLabel">
                <md-icon class="pb-4" md-verticalstatus-plan-align="center" md-align="center">add</md-icon>
                <label class="ml-15">Add Label</label>
              </md-button>
          </div> -->
        </md-layout>
        <md-layout  style="flex: initial;margin-top:10px" class="search-cust-box">
           <div style="width:40%">
              <md-input-container class="-no-line -search" style="margin:0px">
                  <md-icon class="mr-5"> search <md-tooltip>search</md-tooltip></md-icon>
                  <md-input placeholder="Search" :class="ipt_search =='Search' ? 'earch-text':'value-text'" 
                    v-on:change="searchLabel" @focus="showSearch" :value="ipt_search" 
                    @focus.native="$event.target.select()">
                  </md-input>
              </md-input-container>
              <md-card v-if="shw_customer" v-click-outside="outsideShowCust" id="style-scroll">
                  <ul class="md-list" v-if=" $store.getters.nflb_customer_list.length > 0"> 
                      <li class="md-list-item" v-for="(item , index) in $store.getters.nflb_customer_list" :key="index">
                          <div class="md-list-item-text" @click="selectLabel(item)"><span class="kanitFont">{{item.labelname_th}}</span></div> 
                      </li> 
                  </ul>
              </md-card>
            </div>
            <div style="width: 50%;">
        <md-layout class="md-report-bar">
                      <md-layout md-flex-large="100" >
                        <md-layout md-flex="40" style="padding-left:22px">
                            <div :class="btnType =='all' ?'title-text active':'title-text'" @click="selectType('all')">ALL LABEL</div>
                            <div class="title-number">{{formatNumber($store.getters.nflb_all_cust)}}</div>
                        </md-layout>
                        <md-layout  md-flex="25" class="mr-3">
                            <div :class="btnType =='active' ?'title-text active':'title-text'"  @click="selectType('active')">ACTIVE</div>
                            <div class="title-number">{{formatNumber($store.getters.nflb_active_cust)}}</div>
                        </md-layout>
                        <md-layout md-flex="25" > 
                            <div :class="btnType =='inactive' ?'title-text active':'title-text'" @click="selectType('inactive')">INACTIVE</div>
                            <div class="title-number">{{formatNumber($store.getters.nflb_inactive_cust)}}</div>
                        </md-layout>
                      </md-layout>
                    </md-layout>
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
        <md-spinner :md-size="150" :md-stroke="1"  v-show="$store.getters.nflb_spinner_loading" md-indeterminate></md-spinner> 
        <md-layout  style="flex: initial;" md-align="center" class="cust-list-box" v-if="$store.getters.nflb_deatil_list.length == 0">
            <span class="nodata">No data</span>
        </md-layout>
        <md-layout  style="flex: initial;" class="cust-list-box" v-else>
          <div class="head-table">
            <div style="width:8%;"></div>
            <div :class="btnSort =='parent_code' ? 'column-descript active':'column-descript'" style="width:20%;text-align:left; cursor: pointer;" @click="sortData('parent_name_th')">Parent</div>
            <div :class="btnSort =='labelname_th' ? 'active':''" style="width:23%;text-align:left; cursor: pointer;" @click="sortData('labelname_th')">Name</div>
            <div :class="'column-province'" style="width:23%;text-align:left;margin-left:5px">External Source</div>
            <div :class="btnSort =='labelstatus' ? 'active':''" style="width:19%;cursor: pointer;" @click="sortData('labelstatus')">Active</div>
            <div style="width:5%;cursor: pointer;"></div>
          </div>
          <div class="body-deatil"  @scroll="handleScroll"  v-click-outside="outsideTable"
              :style="{'padding-right': $store.getters.nflb_deatil_list.length > 1 ? '48px' : '60px',
              'overflow-y': $store.getters.nflb_deatil_list.length > 1 ? 'scroll' : 'hidden'}" >
            <div class="detail-table" v-for="(item , index) in $store.getters.nflb_deatil_list" :key="index" :id="'row-'+ index "
            :style="{'margin-top': item.mode ? '10px' : '15px'}">
              <div style="width:8%;">
                <md-icon  :style="{'color': item.mode ? '#FD7F00' : '#727272',
                'margin-top': item.mode ? '37px' : '',
                'font-size':'20px'}">label</md-icon>
              </div>
              <div class="column-module" :style="{'padding-top': item.mode ? '10px' : 'unset','padding-right': item.mode ? '20px' : 'unset','width':'20%'}">
                <md-input-container v-if="item.mode" style="padding-left: 2px;">
                   <label class="label-text small" v-if="item.temp_parent_code == ''">Select Parent</label>
                  <md-select v-model="item.temp_parent_code">
                    <md-option :value="row.parent_code" v-for="(row , idx) in $store.getters.nflb_parent_list" :key="idx">{{row.parent_name_th}}</md-option>
                  </md-select>
                </md-input-container>
                <label v-else class="label-text">{{item.parent_name_th}}</label>
                </div>
                <div :style="{'margin-top': item.mode ? '10px' : '', 'text-align': 'left','width':'23%'}" class="inp-bar">
                <md-input-container   v-if="item.mode"
                :style="{'margin-bottom': item.temp_labelname_th == '' || item.temp_labelname_th == null ? '10px' : '0px'}">
                  <label class="label-text small"  >Name</label>
                  <md-input v-model="item.temp_labelname_th"></md-input>
                  <div class="md-error" v-if="item.temp_labelname_th == ''">{{warningText}}</div>
                </md-input-container>
                <label style="font-family:kanit;font-size:12px" v-else>{{item.labelname_th}}</label>
              </div>
              <div class="inp-bar" :style="{'margin-top': item.mode ? '10px' : '','width':'23%', 'text-align': 'left','margin-left':'5px'}">
                 <md-input-container   v-if="item.mode" 
                  :style="{'margin-bottom': item.temp_external_source == '' || item.temp_external_source == null ? '10px' : '0px'}">
                   <label class="label-text small"  >External Source</label>
                  <md-input v-model="item.temp_external_source"></md-input>
                </md-input-container>
                <label v-else class="label-text">{{item.external_source}}</label>
              </div>
              <div :style="{'padding-top': item.mode ? '37px' : '','width':'19%'}">
                <form @click.stop.prevent="openDialog(item , index , 'active')" style="height:22px">
                  <md-switch type="submit" v-model="item.labelstatus" class="md-primary"></md-switch>
                </form>
              </div>
              <div :style="{'padding-top': item.mode ? '37px' : '','width':'5%'}">
                <div v-if="item.mode" class="md-avatar md-avatar-icon active" @click="openDialog(item , index , 'all')">
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
            <md-button class="" @click="closeDialog('close')">Cancel</md-button>
            <md-button class="md-primary" @click="closeDialog('save')">Save</md-button>
          </md-dialog-actions>
        </md-dialog>
  </div>
</template>
<script>
import Vue from "vue";
let checkStatus = false;
export default {
  name: "setting-Newsfeedlabel",
  data() {
    return {
      ipt_swich: false,
      title: "NEWSFEED LABEL",
      ipt_search: "Search",
      shw_customer: false,
      btnType: "active",
      btnSort: "labelname_th",
      tempIndex: "default",
      tempEdit: "default",
      tempMode: "",
      warningText: "Please input data",
      tempSort: "ASC",
      selectRow: "",
      selectKey: "",
      ques: "Do you want to leave row?",
      ans: "Changes might not be saved."
    };
  },
  methods: {
    addLabel() {
      let theArray = this.$store.getters.nflb_deatil_list;
      if (theArray[theArray.length - 1].label_id != "new") {
        let theObject = {
          label_id: "new",
          labelcode: 0,
          modulename: "",
          labelname_th: "",
          external_source: "",
          parent_code: "0",
          labelstatus: false,
          mode: true,
          temp_parent_code: "0",
          temp_labelname_th: "",
          temp_external_source: ""
        };
        theArray.push(theObject);
        if (this.tempIndex != "default") {
          this.$store.getters.nflb_deatil_list[this.tempIndex].mode = false;
        }
        if (theArray.length > 1) {
          this.tempIndex = theArray.length - 1;
        } else {
          this.tempIndex = 0;
        }
        setTimeout(() => {
          let btn = document.getElementById("row-" + this.tempIndex);
          let input = btn.childNodes[4].childNodes[0].childNodes[2];
          if (input != null) {
            checkStatus = true;
            input.focus();
          }
        }, 150);
        checkStatus = false;
      }
    },
    outsideTable: function(e) {
      if (
        this.tempIndex != "default" &&
        checkStatus == true &&
        e.target.className != "md-button md-button-ghost md-theme-default" &&
        e.target.className !=
          "md-menu-content md-select-content md-theme-default md-size-0 md-direction-bottom-right md-active" &&
        e.target.className !=
          "md-dialog-container md-theme-default md-active" &&
        e.target.className != "md-dialog-content" &&
        e.target.className != "md-dialog" &&
        e.target.className != "md-dialog-actions" &&
        e.target.className != "md-button md-theme-default" &&
        e.target.className != "md-button md-primary md-theme-default" &&
        e.target.className != "md-dialog-title md-title"
      ) {
        let theObject = this.$store.getters.nflb_deatil_list[this.tempIndex];
        if (theObject.label_id == "new" && theObject.mode) {
          this.$store.getters.nflb_deatil_list.splice(
            this.$store.getters.nflb_deatil_list.length - 1,
            1
          );
          this.tempEdit = "default";
          this.tempIndex = "default";
          theObject.mode = false;
          this.checkStatus = false;
        } else if (typeof theObject.label_id == "number" && theObject.mode) {
          theObject.mode = false;
          this.checkStatus = false;
        }
      }
    },
    editRow(value, index) {
      let theOldObject = this.$store.getters.nflb_deatil_list[this.tempIndex];
      let theObject = this.$store.getters.nflb_deatil_list[index];
      if (value.mode) {
        theObject.mode = false;
        theObject.temp_labelname_th = "";
        theObject.temp_parent_code = "";
        theObject.temp_external_source = "";
      } else {
        checkStatus = true;
        if (this.tempIndex == "default") {
          theObject.temp_labelname_th = value.labelname_th;
          theObject.temp_parent_code = value.parent_code;
          theObject.temp_external_source = value.external_source;
          theObject.mode = true;
          this.tempIndex = index;
          console.log("1----->")
        } else if (
          this.tempIndex != index &&
          theOldObject.labelname_th == theOldObject.temp_labelname_th &&
          theOldObject.parent_code == theOldObject.temp_parent_code &&
          theOldObject.external_source == theOldObject.temp_external_source &&
          theOldObject.label_id != "new"
        ) {
          console.log("1----->")
          // close old row
          theOldObject.temp_labelname_th = "";
          theOldObject.temp_parent_code = "";
          theOldObject.temp_external_source = "";
          theOldObject.mode = false;
          // open new row
          theObject.temp_labelname_th = value.labelname_th;
          theObject.temp_parent_code = value.parent_code;
          theObject.temp_external_source = value.external_source;
          theObject.mode = true;

          this.tempIndex = index;
          console.log("2----->")
        } else if (this.tempIndex == index) {
          theObject.temp_labelname_th = value.labelname_th;
          theObject.temp_parent_code = value.parent_code;
          theObject.temp_external_source = value.external_source;
          theObject.mode = true;
          this.tempIndex = index;
        } else if (theOldObject.label_id == "new") {
          this.$store.getters.nflb_deatil_list.splice(
            this.$store.getters.nflb_deatil_list.length - 1,
            1
          );
          console.log("3----->")
          this.tempEdit = index;
          this.tempIndex = "default";
        } else {
          console.log("4----->")
          this.tempEdit = index;
          this.tempMode = "edit";
          this.ques = "Do you want to leave row?";
          this.ans = "Changes might not be saved.";
          this.openDialog(value, index, "edit");
        }
      }
    },
    openDialog(value, index, mode) {
      if (mode == "active") {
        this.tempIndex = index;
        this.tempMode = mode;
        this.selectRow = value;
        this.ques = "Do you want save label?";
        let status = value.labelstatus ? "active " : "inactive";
        this.ans = "Update " + value.labelname_th + " is " + status + ".";
      } else if (mode == "all") {
        this.tempIndex = index;
        this.tempMode = mode;
        this.selectRow = value;
        this.ques = "Do you want save label?";
        this.ans = "";
      }
      let theObject = this.$store.getters.nflb_deatil_list[index];
      if (mode == "all" && theObject.mode == true) {
        if (theObject.temp_labelname_th.trim().length == 0) {
          theObject.temp_labelname_th = "";
          // console.log("1 =>");
        } else {
          this.$refs["confiem-dialog"].open();
        }
      } else if (mode == "active" && theObject.mode == false) {
        this.$refs["confiem-dialog"].open();
      } else {
        console.log("else =>");
      }
    },
    closeDialog(mode) {
      let theObject = this.$store.getters.nflb_deatil_list[this.tempIndex];
      let theNewObject = this.$store.getters.nflb_deatil_list[this.tempEdit];
      if (mode == "save") {
        if (this.tempMode == "edit") {
          // save new row
          theObject.labelname_th = theObject.temp_labelname_th;
          theObject.parent_code = theObject.temp_parent_code;
          theObject.external_source = theObject.temp_external_source;
          theObject.mode = false;
          // open new row
          theNewObject.temp_labelname_th = theNewObject.labelname_th;
          theNewObject.temp_parent_code = theNewObject.parent_code;
          theNewObject.temp_external_source = theNewObject.external_source;
          theNewObject.mode = true;
        } else if (this.tempMode == "active") {
        } else if (this.tempMode == "all") {
          theObject.labelname_th = theObject.temp_labelname_th;
          theObject.parent_code = theObject.temp_parent_code;
          theObject.external_source = theObject.temp_external_source;
          theObject.mode = false;
        }
        this.tempIndex = "default"
        this.$store.dispatch("saveNFLabel", {
          labelname_th: theObject.labelname_th,
          parent_code: theObject.parent_code,
          external_source: theObject.external_source,
          label_id: theObject.label_id == "new" ? 0 : theObject.label_id,
          labelstatus: theObject.labelstatus,
          mode: this.tempMode,
          labelcode: this.selectKey != "" ? this.selectKey.labelcode : "",
          type: this.btnType,
          sort: this.btnSort,
          orderby: this.tempSort,
          start_row: 0
        });
      } else {
        if (this.tempMode == "edit") {
        } else if (this.tempMode == "active") {
          theObject.labelstatus = !theObject.labelstatus;
        } else if (this.tempMode == "all") {
          theObject.mode = false;
        }
      }
      this.$refs["confiem-dialog"].close();
    },
    showSearch() {
      if (this.shw_customer) {
        this.shw_customer = false;
      } else {
        this.shw_customer = true;
      }
    },
    sortData(value) {
      this.$store.commit("SET_NFLB_LOADING", true);
      this.btnSort = value;
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";
      let labelcode = this.selectKey == "" ? "" : this.selectKey.labelcode;
      this.$store.dispatch("getOptionNFLabelList", {
        labelcode: labelcode,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
        start_row: 0
      });
      this.tempEdit = "default";
      this.tempIndex = "default";
    },
    
    searchLabel: function(param) {
      this.shw_customer = true;
      if (param.length > 1) {
        this.$store.dispatch("getAllOptionNFLabel", param);
      } else if (param.length == 0) {
        this.$store.commit("SET_NFLB_LOADING", true);
        this.$store.commit(
          "SET_NFLB_CUSTOMER",
          this.$store.getters.temp_nflabel_list
        );
        this.selectKey = "";
        this.$store.dispatch("getOptionNFLabelList", {
          labelcode: "",
          type: this.btnType,
          sort: this.btnSort,
          start_row: 0,
          orderby: this.tempSort
        });
      }
      this.tempEdit = "default";
      this.tempIndex = "default";
    },
    selectLabel(value) {
      this.$store.commit("SET_NFLB_LOADING", true);
      this.shw_customer = false;
      this.ipt_search = value.labelname_th;
      this.selectKey = value;
      this.$store.dispatch("getOptionNFLabelList", {
        labelcode: value.labelcode,
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort
      });
      this.tempEdit = "default";
      this.tempIndex = "default";
    },
    selectType(value) {
      this.$store.commit("SET_NFLB_LOADING", true);
      this.btnType = value;
      let labelcode = this.selectKey == "" ? "" : this.selectKey.labelcode;
      this.$store.dispatch("getOptionNFLabelList", {
        labelcode: labelcode,
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort
      });
      this.tempEdit = "default";
      this.tempIndex = "default";
    },
    handleScroll(event) {
      // if (
      //   event.target.scrollHeight - event.target.clientHeight ==
      //     event.target.scrollTop &&
      //   this.$store.getters.nflb_deatil_list.length <
      //     this.$store.getters.nflb_all_cust
      // ) {
      //   this.$store.commit("SET_NFLB_LOADING", false);
      //   this.$store.dispatch("getOptionNFLabelList", {
      //     labelcode: "",
      //     type: this.btnType,
      //     sort: this.btnSort,
      //     start_row: this.$store.getters.nflb_deatil_list.length,
      //     orderby: this.tempSort
      //   });
      // }
    },
    formatNumber(value) {
      return parseFloat(value)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    outsideShowCust: function(e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_customer = false;
      }
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "setting");
      this.login = true;
      this.$store.dispatch("getAllOptionNFLabel", "");
      this.$store.dispatch("getCountNFLabel");
      this.$store.dispatch("getOptionNFLabelList", {
        labelcode: "",
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
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left")
  }
};
</script>
<style>
</style>