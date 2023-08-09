<template>
  <div id="pageDashboard">
    <div v-if="$store.getters.status_login == false" class="mt-60"><waring-login></waring-login></div>
    <div v-else-if="$store.getters.status_login">
      <md-progress v-show="$store.getters.show_progress_loading" class="md-warn main-loading" :md-progress="1" md-indeterminate></md-progress>
      <!--Head Level-->
      <div v-if="$store.getters.act_level == 1" class="md-detail-body">
        <md-layout md-gutter>
          <md-layout md-column md-gutter md-flex="55" class="left-panel">
            <!--Left Panel-->
            <md-layout md-align="start" md-flex="100" class="md-topic">{{ $t("das.dashboard") }}</md-layout>
            <!--box => Overall Sales Activity-->
            <md-layout md-flex="100">
              <div style="padding:5px;
                          margin-top:20px;
                          background: #F7F7F7 0% 0% no-repeat padding-box;
                          box-shadow: 0px 0px 3px #00000033;
                          display:flex;
                          height:59px;
                          width: 100%;
                          border-radius:6px 6px 0 0;
                          border-width: 0.5px 0.5px 0px 0.5px;"> 
                      <div style="display: flex;width:30% ;"> 
                        <md-layout
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-size: 16px;
                          "
                      >
                        <div class="sales-period-box" @mouseleave="mouseLeave">
                            <md-card
                            style="padding:0;height: 40px;"
                              class="sales-period-view-box2"
                              @click.native="openMonth"
                            >
                              <md-card-content>
                                <div class="card-title">
                                  <span
                                    >{{ disSelectedDate.month }}
                                    {{ disSelectedDate.year }}</span
                                  >
                                </div>
                                <md-icon>expand_more</md-icon>
                              </md-card-content>
                            </md-card>
                            <month-calendar
                              ref="selectCalendar"
                              v-if="disShowmonth"
                              v-on:selectmonth="disSelectMonth"
                              v-on:selectyear="disSelectyear"
                              :dates="disDate"
                            ></month-calendar>
                        </div>
                  </md-layout>

               </div>
               <div style="color:#727272;font-size:12px;font-family:Roboto;width:19% ;"> 
               SUCCESS RATE %
               </div>

               <div style="text-align: left; align-items: center;display:flex;width: 51%;"> 
                <div v-for="(items) in data_sales_head" :key="items.id" style="width: 33%;">
                  <div style="font-size:20px;color:#414141;font-family:Roboto;height:60%;">{{items.amount}}%
                    <md-tooltip md-direction="top" class="latoFont">{{items.title}}</md-tooltip>  
                    
                  </div>
                  <div  style="font-size:10px;font-family:Roboto;color:#727272;height: 40%;">{{items.name}}</div>                       
                </div>
               </div>
              </div>

                  <md-layout style="
                            height:unset;
                            padding:0 10px 10px 10px ;
                            border-radius:0 0 6px 6px;
                            box-shadow:0px 0px 3px 0px #00000033;
                            border-width:0px 0.5px 0.5px 0.5px;
                            background-color:#fff;"  md-align="center">
                      <div  :class="'head-table'" 
                              style="font-size:12px;
                                     display: flex; 
                                     font-family:Roboto;
                                     padding:10px 0 10px 0;
                                     align-items: center;
                                     width:100% ;
                                     color:#0000008A;">
                             
                          <div style="width:10%;text-align:left">Role</div>
                          <div style="width:30%;text-align:left">Name</div>
                          <div style="width:20%;text-align:center">Visit Plan</div>
                          <div style="width:20%;text-align:center">Virtual Plan</div>
                          <div style="text-align:center;width: 16%;">
                            All Plan
                          </div>
                          <div style="width:4%;"> </div>
                        </div>
               <div
                  v-if="data_tab1.length == 0"
                  style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
                >
                  No data...
                </div>
                <div
                v-for="item in data_tab1" :key="item.emp_id"
                  class="content-table"
                  style="display: flex; cursor: pointer;font-family:Kanit;width:100%;font-family:roboto;padding-top:7px;height:35px"
                 @click="goToPage(item)"
                >
                  <!-- @click="openDatail(items)" -->
                  <div style="padding-left:5px;font-size:13px;width: 10%;text-align:left">{{item.emp_id }}</div>
                  <div style="color:#414141;font-family:Kanit;width: 30%;text-align:left">
                    {{item.fullname}}
                  </div>
                  <div class="number" style="width: 20%;">{{item.rate_visit_plan}}%</div>
                  <div class="number" style="width: 20%;text-align:center">
                  {{item.rate_virtual_plan}}%
                  </div>
                  <div class="number" style=";width: 16%;text-align:center">
                  {{item.rate_all_plan}}%
                  </div>
                </div>
                    </md-layout>
            </md-layout>
            <!--box => Number of Visits-->
            <md-layout md-flex="100">
              <md-card class="visit-box">
                  <md-card-header>{{ $t("das.number_of_visits") }} <span style="color: #727272;font-family:Roboto;font-size:12px;margin:0 0 0 10px;">{{this.st_date+" - "+this.en_date}}</span></md-card-header>
                  <md-card-content>
                    <canvas ref="chart" :width="500" :height="200"></canvas>
                  </md-card-content>
                </md-card>
            </md-layout>
            <!--box => Overall Sales Activity-->
            <!-- <md-layout md-flex="100">
              <md-card class="overview-box">
                <md-card-header>
                  <md-list>
                    <md-list-item>
                      <div class="md-rectangle-icon big lightgray"></div>
                      <div class="md-list-text-container">
                        <span style="height: 25px;">{{ $t("das.sales_team") }} {{$store.getters.dsh_team_selected.team_name}} {{ $t("das.overview") }}
                        <md-menu md-size = '4' v-if="$store.getters.dsh_department != 'SUP'" md-align-trigger ref="menuTeam" v-click-outside="outsideTeam" @close="closeMenuTeam" @open="openMenuTeam">
                            <md-button  md-menu-trigger class="md-icon-button"><md-icon id="Overview_salesTeam">keyboard_arrow_down</md-icon></md-button>
                            <md-menu-content class="md-team-hover">
                                <md-menu-item v-for="item in $store.getters.dsh_team_by_sup" :key="item.id" v-on:click="setTeamOverviewService(item)">
                                      <label v-if="$store.getters.dsh_team_selected.team_id == item.id" class="md-body-primary-text active" v-bind:style="{ fontFamily: item.font_name}">{{item.team_name}}</label>
                                      <label v-else class="md-body-primary-text" v-bind:style="{ fontFamily: item.font_name}">{{item.team_name}}</label>
                                </md-menu-item>
                            </md-menu-content>
                          </md-menu>
                        </span>
                        <span md-align="start" class="sub-title"> {{ $t("das.team") }} {{ $t("das.summary") }}</span>
                      </div>
                    </md-list-item>
                  </md-list>
                </md-card-header>
                <md-card-content>
                  <md-layout md-gutter>
                    <md-layout v-for="(items, index) in $store.getters.dsh_team_overviw" v-if="index < 4" :key="items.id">
                      <div class="left">
                        <span class="title-number">{{items.amount}}</span>
                        <br>
                        <span class="subtitle-number">{{ $t( "das."+items.name) }}</span>
                      </div>
                    </md-layout>
                  </md-layout>
                  <md-layout md-gutter class="pt-20">
                    <md-layout v-for="(items, index) in $store.getters.dsh_team_overviw" v-if="index > 3" :key="items.id">
                      <div class="left">
                        <span  class="title-number">{{items.amount}}</span>
                        <br>
                        <span class="subtitle-number">{{ $t( "das."+items.name) }}</span>
                      </div>
                    </md-layout>
                  </md-layout>
                  <div v-if="$store.getters.dsh_team_overviw.length == 0">
                    <span class="md-nodata-text">{{DataNotFound}}</span>
                  </div>
                </md-card-content>
              </md-card>
            </md-layout> -->
          </md-layout>
          <!--Right Panel-->
          <md-layout md-column md-gutter md-flex="45"  class="right-panel" >
            <md-layout md-align="start" md-flex="100" class="md-topic">{{ $t("das.sales_activity_coverage") }}</md-layout>
            <!--box => Search Salesman-->
            <md-layout md-flex="100" class="md-search-box">
              <md-layout md-flex="33">
                <md-input-container md-theme>
                  <md-icon class="pl-4">search</md-icon>
                  <md-input id="Overview_search"  v-on:change="searchActivityCoverageService" placeholder="Search sales…" @click.native="gaSearchSaleman"></md-input>
                </md-input-container>
              </md-layout>

              <md-layout style="display: flex;align-items: center;" md-flex="66">
                <md-layout  md-align="center" md-vertical-align="end">
                  <md-avatar style="margin: 0px 5px 3px 0;" class="md-cycle-icon small green"></md-avatar>
                  <span style="margin:0" class="subtitle">{{ $t("das.on_track") }}  ({{$store.getters.dsh_on_track}})</span>
                </md-layout>
                <md-layout  md-align="center" md-vertical-align="end">
                  <md-avatar style="margin: 0px 5px 3px 0;" class="md-cycle-icon small yellow"></md-avatar>
                  <span style="margin:0" class="subtitle">{{ $t("das.issue") }}  ({{$store.getters.dsh_issue}})</span>
                </md-layout>
                <md-layout md-align="center" md-vertical-align="end">
                  <md-avatar style="margin: 0px 5px 3px 0;" class="md-cycle-icon small red"></md-avatar>
                  <span style="margin:0" class="subtitle">{{ $t("das.in_active") }}  ({{$store.getters.dsh_in_active}})</span>
                </md-layout>
              </md-layout>
            </md-layout>
            <!--box => List-->
            <md-layout md-flex="100" class="list-box">
              <md-card>
                <md-card-content>
                  <div ref="positionSale">
                    <md-list>
                      <md-list-item v-for="(items, index) in $store.getters.dsh_salesman_list" :key="index">
                          <md-layout md-gutter>
                          <md-layout md-flex="5" class="mt-5">
                            <md-avatar v-if="items.status == 'issue'" class="md-cycle-icon small yellow"></md-avatar>
                            <md-avatar v-else-if="items.status == 'active'" class="md-cycle-icon small green"></md-avatar>
                            <md-avatar v-else-if="items.status == 'inactive'" class="md-cycle-icon small red"></md-avatar>
                          </md-layout>
                          <md-layout md-flex="5" class="mr-10">
                            <md-avatar class="md-rectangle-icon medium lightgray">
                              <div v-if="items.short_name==false">
                                <label class="md-subheading">
                                  <b></b>
                                </label>
                              </div>
                              <div  v-else>
                                <label class="md-subheading" v-bind:style="{ fontFamily: items.font_name}">
                                  <b>{{items.short_name}}</b>
                                </label>
                              </div>
                            </md-avatar>
                          </md-layout>
                            <md-layout md-flex="45 " class="mt-10" style="cursor: default">
                             <span class="md-body-primary-text mr-10">{{items.emp_id}}</span>
                             <span class="md-body-primary-text mr-10 " v-bind:style="{ fontFamily: items.font_name}">{{items.first_name}}</span>
                             <div class="descript" v-bind:style="{ fontFamily: items.font_name}">{{items.last_name}}</div>
                             <md-tooltip md-direction="top" class="latoFont">{{items.name}}</md-tooltip>   
                            </md-layout>
                          <md-layout md-flex="15"  md-align="start" class="mr-10 mt-10">
                            <div class="md-rectangle-tag" v-if="items.tag_label_id == 1 || items.tag_label_id == 2">
                                <div class="rectangle-text">{{items.status_label}}</div>
                                <div class="rectangle-icon" @click="removeMarkLabel(items,index)">
                                <i class="md-icon material-icons">cancel</i></div>
                            </div>
                          </md-layout>
                          <md-layout md-flex="20" md-align="end" class="mt-10" style="cursor: default">
                            <span class="body-secondary-text -list-block">{{items.comment}}</span>
                            <md-tooltip md-direction="top" class="latoFont">{{items.comment}}</md-tooltip>   
                          </md-layout>
                          <md-layout md-flex="5" >
                            <md-menu md-align-trigger md-direction="bottom left" ref="menuLabel" v-click-outside="outsideLabel" @open="openMenuLabel" @close="closeMenuLabel">
                              <md-button class="md-icon-button" md-menu-trigger @click="findSaleman(items.sale_code,index, $event)">
                                <md-icon>more_vert</md-icon>
                              </md-button>
                              <md-menu-content  class="hoverTag -no-y-scroll">
                                <md-menu-item :id="'btn-mark-'+item.id"  v-for="(item) in $store.getters.dsh_tag_lable" :key="item.id" class="height-35" >
                                    <label v-on:click="saveMarkLabel(item)"  style="cursor: pointer;background-color:;z-index:100" v-if="items.tag_label_id == item.id" class="md-body-1 -oranges  robotoFont">{{item.tagname}}</label>
                                    <label v-on:click="saveMarkLabel(item)" style="cursor: pointer;margin:0;width: 100%;background-color:;z-index:100"  v-else class="md-body-1  robotoFont">{{ $t("das."+item.tagname) }}</label>
                                </md-menu-item>
                              </md-menu-content>
                            </md-menu>
                          </md-layout>
                        </md-layout>
                      </md-list-item>
                      <div v-if="$store.getters.dsh_salesman_list.length==0">
                          <span class="md-nodata-text latoFont">{{DataNotFound}}</span>
                      </div>
                    </md-list>
                  </div>
                </md-card-content>
              </md-card>
            </md-layout>
          </md-layout>
        </md-layout>
      </div>
      <!--Low Level-->
      <div v-else-if="$store.getters.act_level == 0">
        <md-layout md-align="center">
          <md-layout md-flex="50" class="center-panel">
            <md-layout md-align="start" md-flex="100" class="md-topic">{{ $t("das.dashboard") }}</md-layout>
              <div style="box-shadow: 0px 0px 3px #00000029;border-radius: 6px;padding:5px;margin-top:20px;background: #F7F7F7 0% 0% no-repeat padding-box;border: 0.5px solid #D1D1D1;display:flex;height:59px;width: 100%;"> 
               <div style="display: flex;width:30% ;"> 
                  <md-layout
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-size: 16px;
                          "
                  >
                        <div class="sales-period-box" @mouseleave="mouseLeave">
                            <md-card
                            style="padding:0;height: 40px;"
                              class="sales-period-view-box2"
                              @click.native="openMonth"
                            >
                              <md-card-content>
                                <div class="card-title">
                                  <span
                                    >{{ disSelectedDate.month }}
                                    {{ disSelectedDate.year }}</span
                                  >
                                </div>
                                <md-icon>expand_more</md-icon>
                              </md-card-content>
                            </md-card>
                            <month-calendar
                              ref="selectCalendar"
                              v-if="disShowmonth"
                              v-on:selectmonth="disSelectMonth"
                              v-on:selectyear="disSelectyear"
                              :dates="disDate"
                            ></month-calendar>
                        </div>
                  </md-layout>

               </div>
               <div style="color:#727272;font-size:12px;font-family:Roboto;width:19% ;"> 
               SUCCESS RATE %
               </div>

               <div style="text-align: left; align-items: center;display:flex;width: 51%;"> 
                <div v-for="(items) in data_sales_head" :key="items.id" style="width: 33%;">
                  <div style="opacity:1;font-size:20px;color:#414141;font-family:Roboto;height:60%;">{{items.amount}}%
                    <md-tooltip md-direction="top" class="latoFont">{{items.title}}</md-tooltip>    
                  </div>
                  <div  style="color: #727272;font-size:10px;font-family:Roboto;height: 40%;">{{items.name}}
                  </div>                       
                </div>
               </div>
              </div>
                    
          </md-layout>
        </md-layout>
        <md-layout md-align="center" class="center-panel">
          <md-layout md-flex="50">
              <md-card class="visit-box">
                <md-card-header>{{ $t("das.number_of_visits") }} <span style="color: #727272;font-family:Roboto;font-size:12px;margin:0 0 0 10px;">{{this.st_date+" - "+this.en_date}}</span></md-card-header>
                <md-card-content>
                  <canvas ref="chart" :width="500" :height="200"></canvas>
                </md-card-content>
              </md-card>
          </md-layout>
        </md-layout>
      </div>
      <div v-else-if="$store.getters.act_level == '' || $store.getters.act_level == null">
          <div class="mt-20">
            <span class="md-nodata-text">{{DataNotFound}}</span>
          </div>
      </div>
      <div>
        <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbarCheckServer" :md-duration="duration">
          <span>Error function {{get_data_name}} from server</span>
          <md-button class="md-accent md-body-primary-text active" @click="retry">Retry</md-button>
        </md-snackbar>
        <md-dialog-confirm :md-title="dlg.title" :md-content-html="dlg.contentHtml" :md-ok-text="dlg.ok" :md-cancel-text="dlg.cancel" @open="onOpen" @close="removeLabel" ref="dlgremove">
        </md-dialog-confirm>
      </div>
    </div>

    <div>
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id="+Vue.config["googleTagManage"]
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    </div>

    <!-- GTM-P2KRTDR - TagManage ( DEV ) -->
    <!-- GTM-PGJ2DXL- TagManage ( DEP ) -->


  </div>
</template>

<script>
var show_dailog = true;
var show_menulabel = false;
import Chart from "chart.js";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
export default {
  name: "salesops-dashboard",
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "month-calendar": require("../Salesops/customComponent/mds-month-calendar"),
  },
  data() {
    return {
      disShowmonth: false,
      disDate: {
        year: dateFunc.format(new Date(), "yyyy"),
        month_id: dateFunc.format(new Date(), "MM"),
      },
      st_date :'',
      en_date:'',


      // login: false,
      arr_sales_team: [],
      arr_cust_list: [],
      arr_cust_list_treeview: [],
      arr_grap_pa: [],
      arr_grap_p: [],
      indexStatus: null,
      dialogStatusClass: "hide-tag dailog-body",
      morePos: {
        top: 0,
        left: 0,
        bottom: 10
      },
      DataNotFound: "Data not found",
      vertical: "bottom",
      horizontal: "center",
      duration: 7000,
      get_data_name: "",
      // config_level: "",
      dialogOverviewClass: "hide-tag overview-body",
      sales_team: "",
      team_code: "",
      team_id: "",
      team_user_role_id: "",
      dlg: {
        title: "Do you want delete label?",
        contentHtml: "....",
        ok: "Yes",
        cancel: "Cancel"
      },
      label_id: "",
      department: "",
      screenX: null,
      screenY: null,
      act_lable_index: "",
      act_lable_selected: [],
      act_index_status: null,
      waringLogin:false
    };
  },
  methods: {
    mouseLeave: function () {
      if (this.disShowmonth == true) {
        this.disShowmonth = false;
      }
    },
 openMonth() {
      // console.log()
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SelectMonth;
      key.eventLabel = "SelectMonth:" + emp_id;
      this.$ga.event(key);

      this.disShowmonth = true;
    },
    disSelectMonth(value, even = null) {
      this.$store.commit('setDateSelect' , value)
      this.disDate.month_id = value.month.id;
      this.disDate.year = value.year;
      this.disDate.month = value.month.value;

      this.$store.dispatch("salesTeamHead",{
                month:value.month.id, 
                year:value.year,
                tab:'dashboard',
                emp_id:Vue.localStorage.get("emp_id")
              } );

      this.$store.dispatch("salesTeamDetail",{
                month:value.month.id, 
                year: value.year,
                tab:'dashboard',
                emp_id:Vue.localStorage.get("emp_id")
              } );

      this.hideCalendar();
    },
    disSelectyear(value) {
      this.disDate.year = value.year;
    },
    hideCalendar: function () {
      this.disShowmonth = false;
    },
    goToPage(param){
      let data = {
          m_code :'dashboard',
          month: this.disDate.month_id,
          year:this.disDate.year ,
          value:this.disDate.month,
          tab: '',
          emp_id:param.emp_id
      }
      Vue.localStorage.set('Route-to-SalesActivityReport',JSON.stringify(data))

      setTimeout(() => {
          this.$router.push({ path: "/reports/salesactivity-report" });
        }, 100);
      // console.log(param)
    },




    ...mapActions(["searchActivityCoverageService", "setTeamOverviewService"]),
    retry() {
      this.$refs.snackbarCheckServer.close();
    },
    findSaleman(saleman, index, jsEvent) {
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
      this.act_lable_selected = saleman;
      this.act_lable_index = index;
    },
    computePos(target) {
      let eventRect = target.getBoundingClientRect();
      let pageRect = this.$refs.positionSale.getBoundingClientRect();
      return {
        left: eventRect.left - 820,
        top: eventRect.top + eventRect.height - pageRect.top + 100
      };
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    open(ref) {},
    close(ref) {},
    onOpen() {},
    saveMarkLabel(items) {
      // console.log(items)
      //  console.log(document.getElementById('btn-mark-'+items.id).childNodes[2])
      document.getElementById('btn-mark-'+items.id).childNodes[2].click()
      // Vue.localStorage.remove('budget_detail');
      if (items.id > 0) {
         this.act_lable_selected = items;
           if(this.act_lable_selected.taglabel=="PENDING"){
               this.$ga.event(this.$ga_key.Dashboard_Mark_Pending);
           }
           if(this.act_lable_selected.taglabel=="RESOLVED"){
               this.$ga.event(this.$ga_key.Dashboard_Mark_Resolved);
           }

        let obj = {
          lable: this.$store.getters.dsh_salesman_list[this.act_lable_index],
          index: this.act_lable_index,
          tag_label_id: items.id
        };
        this.$store.dispatch("saveDshLableSalesListService", obj);
      } else {
         
               this.$ga.event(this.$ga_key.Dashboard_View_Activity_log);
         
        this.$store.commit(
          "SET_DSH_SELECT_SALES_TO_ACT",
          this.$store.getters.dsh_salesman_list[this.act_lable_index]
        );
        this.$router.push({ path: "/activity/checkin" });
      }
    },
    outsideDialog: function(e) {
      if (
        e.target.className !=
        "md-icon outside-dialog md-theme-default material-icons"
      ) {
        show_dailog = true;
        this.dialogStatusClass = "hide-tag dialog-body";
      }
    },
    outsideTeam: function(e) {
      if (this.$store.getters.act_shw_menu_team == true) {
        if (
          e.target.className != "md-button md-button-ghost md-theme-default"
        ) {
          this.$refs.menuTeam.close();
        }
      }
    },
    outsideLabel: function(e) {
      if (this.screenX != e.screenX) {
        if (this.$store.getters.act_shw_lable == true) {
          this.$refs.menuLabel[this.act_index_status].close();
          this.$store.commit("SET_SHOW_MENU_LABLE", false);
          return;
        }
      }
    },
    outsideSelectTeam: function(e) {
      if (
        e.target.className !=
        "md-icon md-title -gray-41 mt-0 select-team md-theme-default material-icons"
      ) {
        this.dialogOverviewClass = "hide-tag overview-body";
        this.$store.commit("SET_SHOW_MENU_OVERVIEW", true);
      }
    },
    removeMarkLabel(items, index) {
      this.act_lable_selected = items;
      this.act_lable_index = index;
      this.dlg.contentHtml =
        "<div class='text-center' > Delete label of " +
        this.$store.getters.all_tag_lable["DSH"][items.tag_label_id - 1].tagname +
        " (" +
        this.$store.getters.all_tag_lable["DSH"][items.tag_label_id - 1].taglabel +
        ") </div>";
      this.openDialog("dlgremove");
    },
    openOverview() {
      if (this.$store.getters.act_shw_menu_overview == true) {
        this.dialogOverviewClass = "show-tag overview-body";
        this.$store.commit("SET_SHOW_MENU_OVERVIEW", false);
      } else {
        this.dialogOverviewClass = "hide-tag overview-body";
        this.$store.commit("SET_SHOW_MENU_OVERVIEW", true);
      }
    },
    removeLabel(type) {
      if (type == "ok") {
        let obj = {
          lable: this.act_lable_selected,
          index: this.act_lable_index
        };
        this.$store.dispatch("delDshLableSalesListService", obj);
      }
    },
    closeMenuLabel() {
      this.$store.commit("SET_SHOW_MENU_LABLE", false);
    },
    openMenuLabel() {
      this.$ga.event(this.$ga_key.Dashboard_SaleAction); // google analytics
      this.$store.commit("SET_SHOW_MENU_LABLE", true);
    },
    closeMenuTeam() {
      this.$store.commit("SET_SHOW_MENU_TEAM", false);
    },
    openMenuTeam() {
      this.$store.commit("SET_SHOW_MENU_TEAM", true);
    },
    gaSearchSaleman(){
      //alert('search sale man');
      this.$ga.event(this.$ga_key.Dashboard_SearchSaleman);
    }
  },
  computed: {
    disSelectedDate() {
      return this.$store.getters["dis_selected_date"];
  },
   data_sales_head(){
    return this.$store.getters["sales_team_head"];
  },
  data_tab1(){
    return this.$store.getters["detail_t1"];
  },
  statusServer () {
      return this.$store.getters['statusServer']
    }
  },
  watch: {
    statusServer (val) {
      // if (val.length > 0) {
      //   if (val[0].messages == 'offline') {
          // this.$router.replace('/maintenance')
      //   } else if (val[0].messages == 'online') {
      //     this.waringLogin = this.$store.getters.status_login
      //   }
      // }
    }
  },
  created() {
    // this.$store.dispatch('watchServer', 'login')
    if (Vue.localStorage.get("login") == null) {
      this.$store.commit("SET_STATUS_LOGIN", false);
    } else {
      var datetime =new Date();
      let day = new Date().getDay()
      var unixDate = datetime.setDate(datetime.getDate()- (day  - 1 ))
      this.st_date = new Date(unixDate).toLocaleDateString("en-GB")
      this.en_date = new Date().toLocaleDateString("en-GB")


              
      let dateDis = this.$store.getters["salesactivity/dis_selected_date"];
      dateDis.year = dateFunc.format(new Date(), "yyyy");
      dateDis.month_id = dateFunc.format(new Date(), "MM");
      dateDis.month = dateFunc.format(new Date(), "MMMM");
    
      let data_ = {
        month:{
          id:dateDis.month_id,
          value:dateDis.month
        },
        year:dateDis.year
      }
      this.disDate.month = dateDis.month
      this.$store.commit('setDateSelect' , data_)


              
      this.$store.dispatch("salesTeamHead",{
                month:this.disSelectedDate.month_id, 
                year:  this.disSelectedDate.year,
                tab:'dashboard',
                emp_id:Vue.localStorage.get("emp_id")
              } );

     this.$store.dispatch("salesTeamDetail",{
                month:this.disSelectedDate.month_id, 
                year:  this.disSelectedDate.year,
                tab:'dashboard',
                emp_id:Vue.localStorage.get("emp_id")
              } );



     console.log('Google TagManage',Vue.config["googleTagManage"]);
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)


})(window,document,'script','dataLayer',Vue.config["googleTagManage"]);
      this.$store.dispatch("setPathMenuService" , "dashboard");
      this.$store.commit("SET_LEVEL", Vue.localStorage.get("config_level"));
      this.$store.commit("SET_STATUS_LOGIN", true);
      this.$store.commit("SET_DEPARTMENT", Vue.localStorage.get("department"));
      //หาทางแก้เรื่อง refresh page แล้วค่าหาย-----
      if (this.$store.getters.all_tag_lable.length == 0) {
        this.$store.dispatch("getDshTagLableService", "all");
      }
      //---------------------------------------
      this.$store.dispatch("setNumberValueService", {
        mode: this,
        level: this.$store.getters.act_level
      });
      // if(this.$store.getters.act_check_loaddata){
        if (this.$store.getters.dsh_department == "MNG" || this.$store.getters.dsh_department == "BU" || this.$store.getters.dsh_department == "CHN"|| this.$store.getters.dsh_department == "MD") {
          this.$store.dispatch("setOverviewBYPositionService");
        }
        if (this.$store.getters.act_level == 1) {
          this.$store.dispatch("setTeamOverviewService", {
            team_code: "undefined",
            team_user_role_id: "undefined"
          });
          this.$store.dispatch("setSaleActivityCoverageService");
        }
        this.$store.dispatch("setOverallSalesActivityService");
        this.morePos.bottom;
  
        this.$store.commit("SET_SHOW_SUMMARY", false);
      // }
      

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
  .content-table:hover{
    border-radius: 6px;
    background-color:#F0EDED;
  }

  </style>

