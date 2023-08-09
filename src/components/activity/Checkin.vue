<template>
    <div id="pageActivity">
        <div v-if="!$store.getters.status_login" class="mt-60">
            <waring-login></waring-login>
        </div>
        <div v-else>
            <md-progress v-show="$store.getters.show_progress_loading" class="md-warn main-loading" :md-progress="1" md-indeterminate></md-progress>
            <md-dialog-confirm 
                :md-title="dlg.title" 
                :md-content-html="dlg.contentHtml" 
                :md-ok-text="dlg.ok" 
                :md-cancel-text="dlg.cancel" 
                @open="onOpen" 
                @close="removeLabel" ref="dlgremove">
            </md-dialog-confirm>
            <md-layout md-gutter class="md-detail-body" @scroll="handleScroll">
                <div v-if="$store.getters.act_level == 1">
                <md-layout  md-column md-gutter class="pt-20" >
                    <!--Start Layout Left-->
                    <md-layout md-align="start" class="md-topic pt-5">SALES ACTIVITY OVERVIEW</md-layout>
                    <md-layout md-align="start" class="md-search-box mt-20">
                        <md-input-container md-theme>
                            <md-icon class="pl-4">search</md-icon>
                            <md-input id="sales_ac_search_sales"  v-on:change="searchSalesService" placeholder="Search sales…" @click.native="gaSearchSalesman"></md-input>
                        </md-input-container>
                    </md-layout>
                    <ul  class="md-list md-list-sales-box">
                        <li class="md-list-item sales-box-head">BY GROUP</li>
                        <div class="content-dialog" :style="{ 'font-family':'Kanit','max-height': '350px','overflow-y':$store.getters.act_group_sales_list.length>10 ? 'scroll' : 'none'}">
                        <li :class="'md-list-item sales-box-deatil group '+ $store.getters.act_shw_select_group" 
                            @click="gaSelectSalesGroup();selectGroupSalesService({mode :'all', index : '-1'})">All Salesman
                        </li> 

                            <li id="sales_ac_all_sales" style="font-family:Kanit" v-for="(items, idx) in $store.getters.act_group_sales_list" :key="idx" 
                            :class="items.status_check=='unclick' ?'md-list-item sales-box-deatil group ' + items.status_font :'md-list-item sales-box-deatil group active '  + items.status_font"
                            @click="gaSelectSalesGroup();selectGroupSalesService({mode : items, index : idx})"> <md-tooltip md-direction="top"><span>{{items.team_name}}</span></md-tooltip>{{items.team_name}}
                        </li>
                        </div>
                      
                        <li  class="md-list-item sales-box-head mt-20">BY SALESMAN</li>
                        <div class="content-dialog" :style="{'max-height':'500px','overflow-y':act_sales_list.length>20 ? 'scroll' : 'none'}">

                        <li  class="md-list-item sales-box-deatil group" v-if="act_sales_list.length == 0">{{txt_data_no_salesman}}</li>
                        <li id="sales_ac_by_sales"  v-for="(items, idx) in act_sales_list" :key="'c_' + idx"
                         :class="items.status_check=='unclick' ?'md-list-item sales-box-deatil sales':'md-list-item sales-box-deatil sales active'"
                         v-if="act_sales_list.length > 0"
                         >

                            <md-layout id="sales_ac_by_sales" >
                                <div  id="sales_ac_by_sales" style="width: 3%;margin-top:2px;margin-right:10px">
                                    <md-avatar v-if="items.status == 'issue'" class="md-cycle-icon small yellow"></md-avatar>
                                    <md-avatar v-else-if="items.status == 'active'" class="md-cycle-icon small green"></md-avatar>
                                    <md-avatar v-else-if="items.status == 'inactive'" class="md-cycle-icon small red"></md-avatar>
                                </div>


                                <div style="width: 8%;margin-right:10px"><div class="md-rectangle-icon medium lightgray"></div></div>
                                
                                <div id="sales_ac_by_sales"  class="sales-box-deatil"  @click="gaSelectBySalesman();selectSalesService({items : items,index : idx})"
                                    :style="{'text-align':'left','width': items.tag_label_id == null ? '64%' : '44%' ,'padding-top':'1.5px','font-family':'Kanit'}">
                                    <span  id="sales_ac_by_sales"   class="latoFont">{{items.emp_id}} </span>  {{items.first_name}} {{items.last_name}} 
                                    <md-tooltip md-direction="top"><span class="latoFont">{{items.emp_id}}</span>
                                        <span  class="kanitFont">{{items.first_name}} {{items.last_name}}</span></md-tooltip>
                                </div>


                                <div md-flex="15" :style="{'width': items.tag_label_id == null ? '10%' : '30%'}">
                                    <div class="md-rectangle-tag" v-if="items.tag_label_id == 1 || items.tag_label_id == 2">
                                        <div class="rectangle-text">{{items.status_label}}</div>
                                        <div class="rectangle-icon" @click="removeMarkLabel(items,idx)">
                                        <i class="md-icon material-icons">cancel</i></div>
                                    </div>
                                </div>
                                <div class="md-separator mt-5"></div>
                                <md-layout md-flex="5" md-align="center" class="-pointer" style="padding-left:8px">
                                    <md-menu md-align-trigger md-direction="bottom left" ref="menuLabel" v-click-outside="outsideLabel" @open="openMenuLabel" @close="closeMenuLabel">
                                        <div class="" md-menu-trigger="">  
                                            <i id="sales_ac_mark" aria-hidden="true" class="md-icon material-icons" @click="findSaleman(items ,idx, $event)">more_vert</i>
                                            <md-tooltip md-direction="top">Mark Label</md-tooltip>
                                        </div>
                                        <md-menu-content class="-no-y-scroll">
                                            <md-menu-item v-for="item in $store.getters.all_tag_lable['DSH']" :key="item.id" class="pv-0 height-35" v-on:click="saveLabelOfRows(item)" >
                                            <label v-if="item.id == items.tag_label_id" class="md-body-1  -oranges pb-10 robotoFont" >{{item.tagname}}</label>
                                                <label v-else class="md-body-1 pb-10 robotoFont">{{ $t("das."+item.tagname) }}</label>
                                            </md-menu-item>
                                        </md-menu-content>
                                    </md-menu>
                                </md-layout>
                            </md-layout>
                        </li> 
                            
                        </div>
                    </ul>
				    </md-layout>
        </div>       
        <!--Start Layout Right-->
        <md-layout :class="$store.getters.act_level == 0 ?'normal-view':'super-view'">
            <div class="rightZone ">
                <md-layout class="mb-20" >
                    <span class="page-header pt-5" v-if="$store.getters.act_level == 0 ">SALES ACTIVITY OVERVIEW</span> 
                </md-layout>
                <md-layout md-flex-large="100" >
                    <div class="selDate" style="width: 20%;">
                      <div style="z-index:20" @click="selectTime">
                          <md-input-container class="-no-line -search mt-0 latoFont" style="margin-bottom:1px !important">
                              <md-input v-model="act_txt_date_selected" class="input-showtime" v-on:change="selectTime" readonly></md-input>
                              <md-icon class="mr-5" style=" cursor: pointer;"> expand_more
                              <md-tooltip>search</md-tooltip>
                              </md-icon>
                          </md-input-container>
                      </div>
                      <md-card style="z-index:20" id="showtime" class="showTime hide-tag" v-click-outside="outsideShowTime">
                          <ul class="md-list"> 
                              <li class="md-list-item slcGroup-c" v-for="(items) in $store.getters.act_time_list" :key="items.id">
                                  <div v-if="items.timename != 'Custom'" class="slcGroup-c pl-40 -list-block pr-20 latoFont"  @click="timeCallback(items)">
                                      {{items.timename}}
                                  </div>
                                  <div v-if="items.timename == 'Custom'" class="slcGroup-c pl-40 -list-block pr-20 latoFont"  @click="showDateRange(items)">
                                      {{items.timename}}
                                  </div>
                              </li>
                          </ul>
                      </md-card>
                    <input  v-click-outside="outsideDatePicker" type='hidden' id="startDatePickerID" v-on:change="updateValues" />
                  </div>
                  <search-salesman style="width: 23%;" @click.native="gaFilterCustomer()"></search-salesman>
                  <number-activity style="width: 57%;"></number-activity>
                </md-layout>
                <div class="spinner-activity" id='divLoader' >
                    <md-spinner :md-size="150" :md-stroke="1"  v-show="$store.getters.show_spinner_loading" md-indeterminate></md-spinner>  
                </div>
                <!-- <div class="content-dialog" :style="{'height':'940px','overflow-y':$store.getters.act_actvity_list.total > 0 ? 'scroll' : none}"> -->
                   <activity-list></activity-list>
                <!-- </div> -->
                   
            </div>
        </md-layout>
        <!--End Layout Right-->
		    </md-layout>
				<!--End Layout Left-->
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import HotelDatepicker from "../Salesops/fullDateRange/hotel-datepicker.js";
import { mapGetters, mapActions } from "vuex";

var show_menulabel = false;
let date = new Date();
export default {
  name: "activity-checkin",
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    HotelDatepicker,
    "activity-list": require("./subTemplate/activity-list"),
    "number-activity": require("./subTemplate/number-activity"),
    "search-salesman": require("./subTemplate/search-salesman")
  },
  props: {
    value: {
      type: String
    },
    allowedRanges: {
      default: function() {
        return [];
      },
      type: Array
    },
    i18n: {
      default: () => this.act_default_i18n,
      type: Object
    }
  },
  mounted: function() {
    let rsDate = date.getFullYear();
    this.hotelDate = new HotelDatepicker(
      document.getElementById("startDatePickerID"),
      {
        format: "DD/MM/YYYY",
        startOfWeek: "monday",
        minNights: 1,
        maxNights: 0,
        allowedRanges: this.allowedRanges,
        container: "",
        i18n: this.act_default_i18n,
        startDate: new Date(rsDate - 5 + "-01-01")
      }
    );

    console.log(this.hotelDate , this.allowedRanges , this.act_default_i18n)
  },
  computed: {
    ...mapGetters({
      act_sales_list: "act_sales_list",
      act_txt_date_selected: "act_txt_date_selected",
      act_default_i18n: "act_default_i18n"
    })
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.$store.commit("SET_STATUS_LOGIN", false);
    } else {
       this.$store.dispatch("setPathMenuService" , "activity");
      // this.$store.dispatch("setPathMenuService");
      // this.$store.dispatch("selectedMenuService", { m_code: "activity" });
      this.$store.commit("SET_STATUS_LOGIN", true);
      this.$store.commit("SET_SALES_LIST", []);
      this.$store.commit("SET_GROUP_SALES_LIST", []);
      this.$store.commit("SET_TXT_CUST_SELECTED", "");
      this.$store.commit("SET_CUSTOMER_SELECTED", "");
      this.$store.dispatch("setTimeListService", 0);
      this.$store.commit("SET_TXT_DATE_SELECTED", "Today");
      this.$store.commit("SET_DATE_SELECTED", {
        id: 1,
        timename: "Today",
        value: "today"
      });
      this.$store.commit("SET_LEVEL", Vue.localStorage.get("config_level"));
      if (this.$store.getters.all_tag_lable.length == 0) {
        this.$store.dispatch("getDshTagLableService", "all");
      }
      if (this.$store.getters.act_level == 1) {
        // this.show_by_level = "pt-20";
        this.$store.dispatch("setGroupSalesListService");
        this.$store.dispatch(
          "setSalesListService",
          Vue.localStorage.get("emp_id")
        );
        if (this.$store.getters.dsh_selected_sales_to_act == "") {
          this.$store.commit("SET_CHECK_EVT", "all");
          this.$store.dispatch(
            "getUserRoleIdService",
            Vue.localStorage.get("emp_id")
          );
        } else {
          this.$store.commit(
            "SET_ACT_SELECTED_FROM_DSH",
            this.$store.getters.dsh_selected_sales_to_act
          );
          this.$store.commit("SET_CHECK_EVT", "salesman");
          this.$store.commit(
            "SET_EXPORT_SALE",
            this.$store.getters.dsh_selected_sales_to_act.emp_id
          );
          this.$store.dispatch("getDetailOfSalesListService", {
            evt: "salesman",
            emp_id: this.dsh_selected_sales_to_act.emp_id
          });
          this.$store.dispatch(
            "getCalculateService",
            this.$store.getters.dsh_selected_sales_to_act.emp_id
          );
          this.$store.dispatch(
            "setCustomerListService",
            this.$store.getters.dsh_selected_sales_to_act.emp_id
          );
          this.$store.commit("SET_DSH_SELECT_SALES_TO_ACT", "");
        }
      } else {
        this.$store.commit("SET_CHECK_EVT", "salesman");
        this.$store.dispatch("getDetailOfSalesListService", {
          evt: "salesman",
          emp_id: Vue.localStorage.get("emp_id")
        });
        this.$store.dispatch(
          "getCalculateService",
          Vue.localStorage.get("emp_id")
        );
        this.$store.dispatch(
          "setCustomerListService",
          Vue.localStorage.get("emp_id")
        );
        // this.show_by_level = "pt-20 autoCenter";
      }

      this.$store.commit("SET_SHOW_SUMMARY", false);
      var roundnoti = document.getElementsByClassName("roundnoti");
      var dropdown = document.getElementsByClassName("my-dropdown-dd mt-10");
      if (roundnoti.length > 0) {
        roundnoti[0].classList.add("hide-tag");
      }
      if (dropdown.length > 0) {
        dropdown[0].remove(dropdown.selectedIndex);
      }
    }
  },
  data() {
    return {
      act_lable_index: "",
      act_lable_selected: [],
      act_index_status: null,
      hotelDate: "",
      txt_data_no_salesman: "No Salesman",
      show_by_level: "",
      dlg: {
        title: "Do you want delete label?",
        contentHtml: "....",
        ok: "Yes",
        cancel: "Cancel"
      }
    };
  },
  methods: {
    ...mapActions([
      "selectGroupSalesService",
      "selectSalesService",
      "searchSalesService"
    ]),
    handleScroll(event) {
      // infinity scroll
      // if (
      //   event.target.scrollHeight - event.target.clientHeight ==
      //     event.target.scrollTop &&
      //   $store.getters.act_actvity_list.total < 200
      // ) {
      //   if (this.$store.getters.act_level == 0) {
      //     this.$store.dispatch("getDetailOfSalesListService", {
      //       evt: this.$store.getters.act_check_evt,
      //       role_id: this.$store.getters.act_user_role_id
      //     });
      //   } else {
      //     this.$store.dispatch("getDetailALlSalesListService", {});
      //   }
      // }
    },
    showDateRange(item) {
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default show-tag";
      if (this.hotelDate.isOpen == true) {
        this.hotelDate.isOpen = false;
      }
      this.hotelDate.isOpen = false;
      this.hotelDate.input.click();
      this.hotelDate.isOpen = false;
      //   this.$store.dispatch('setTimeOfActivityService' , item);
      //   this.$store.dispatch('setTimeListService');
    },
    timeCallback(item) {
      this.$store.dispatch("setTimeOfActivityService", item);
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default hide-tag";
      this.$store.dispatch("setTimeListService");
    },
    updateValues() {
      var startDate = document.getElementById("startDatePickerID").value;
      let obj = { id: 7, timename: startDate, value: startDate };
      this.$store.dispatch("setTimeOfActivityService", obj);
      this.hotelDate.isOpen = true;
    },
    selectTime() {

      this.$ga.event(this.$ga_key.Activity_Checkin_FilterTime)

      document.getElementById("pageActivity").click();
      document.getElementById("showtime").className =
        "md-card showTime md-theme-default show-tag";
    },
    removeMarkLabel(items, index) {
      this.act_lable_selected = items;
      this.act_lable_index = index;
      this.dlg.contentHtml =
        "<div class='text-center' > Delete label of " +
        this.$store.getters.all_tag_lable["DSH"][items.tag_label_id - 1]
          .tagname +
        " (" +
        this.$store.getters.all_tag_lable["DSH"][items.tag_label_id - 1]
          .taglabel +
        ") </div>";
      this.openDialog("dlgremove");
    },
    removeLabel(type) {
      if (type == "ok") {
        let obj = {
          lable: this.act_lable_selected,
          index: this.act_lable_index
        };
        this.$store.dispatch("delLableSalesListService", obj);
      }
    },
    findSaleman(items, index, jsEvent) {
      this.screenX = jsEvent.screenX;
      this.screenY = jsEvent.screenY;
      if (this.act_index_status != null) {
        if (show_menulabel == true) {
          if (this.act_index_status != index) {
            this.$refs.menuLabel[this.act_index_status].close();
          }
        }
      } else {
        show_menulabel = true;
      }
      this.act_lable_selected = items;
      this.act_lable_index = index;
    },
    saveLabelOfRows(items) {
      this.act_sales_list[this.act_lable_index].tag_label_id = items.id;
      this.act_sales_list[this.act_lable_index].status_label = items.taglabel;
      let obj = {
        lable: this.act_lable_selected,
        index: this.act_lable_index,
        tag_label_id: this.act_sales_list[this.act_lable_index].tag_label_id
      };
      this.$store.dispatch("saveLableSalesListService", obj);
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {},
    outsideLabel: function(e) {
      if (this.screenX != e.screenX) {
        if (this.$store.getters.act_shw_lable == true) {
          this.$refs.menuLabel[this.act_index_status].close();
          this.$store.commit("SET_SHOW_MENU_LABLE", false);
          return;
        }
      }
    },
    closeMenuLabel() {
      this.$store.commit("SET_SHOW_MENU_LABLE", false);
    },
    openMenuLabel() {
      this.$store.commit("SET_SHOW_MENU_LABLE", true);
    },
    outsideShowTime: function(e) {
      if (
        e.target.className != "md-icon mr-5 md-theme-default material-icons" &&
        e.target.className != "md-input input-showtime"
      ) {
        document.getElementById("showtime").className =
          "md-card showTime md-theme-default hide-tag";
      }
    },
    outsideDatePicker: function(e) {
      if (
        e.target.className != "datepicker__inner" &&
        e.target.className != "md-icon mr-5 md-theme-default material-icons" &&
        e.target.className != "slcGroup-c pl-40 -list-block pr-20 latoFont" &&
        e.target.className !=
          "datepicker__month-day datepicker__month-day--visibleMonth datepicker__month-day--valid    datepicker__month-day--selected datepicker__month-day--first-day-selected " &&
        e.target.className !=
          "datepicker__month-day datepicker__month-day--visibleMonth datepicker__month-day--valid " &&
        e.target.className != "slcGroup-c pl-40 -list-block pr-20 latoFont"
      ) {
        this.hotelDate.isOpen = true;
      }
    },
    gaSearchSalesman(){
      this.$ga.event(this.$ga_key.Activity_Checkin_SearchSaleman); //google analytics
    },
    gaSelectSalesGroup(){
      this.$ga.event(this.$ga_key.Activity_Checkin_SelectSalesGroup); //google analytics
    },
    gaSelectBySalesman(){
      this.$ga.event(this.$ga_key.Activity_Checkin_SelectBySalesman); //google analytics
    },
    gaFilterCustomer(){
      this.$ga.event(this.$ga_key.Activity_Checkin_FilterCustomer); //googl
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
<style src="../Salesops/fullDateRange/styles.scss" lang="scss"></style>
<style src="../Salesops/fullDateRange/act-styles.css"></style>