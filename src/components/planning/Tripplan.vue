<template>
  <!--start div class="pageTripplan"-->
  <div class="pageTripplan" id="pageTripplan">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <!--Start Header-->
      <md-progress
        v-show="show_progress"
        class="md-warn main-loading"
        :md-progress="1"
        md-indeterminate
      ></md-progress>
      <!--End Header-->
      <!--Start Main Layout-->
      <md-layout style="display: flex;justify-content: center;height: auto;"  md-gutter class="mh-30">
        <!--Start Layout Left-->
        <md-layout style="max-width: 500px;" md-column md-gutter md-flex-medium="30" md-flex-large="30" class="pr-20 pt-20">
          <!--Start Layout Button add tripplan-->
          <md-layout style="flex: 0 1 2%;" md-align="start"  class="mb-5 mt-5">
            <span class="page-header">{{hd.txt_page}}</span>
          </md-layout>
          <md-layout md-flex="5" v-if="disbled.plan_btn==1">
            <md-button class="md-raised -orange mh-0 width-pre100 height-40" @click="addTripplan">
              <md-icon class="pb-4" md-verticalstatus-plan-align="center" md-align="center">add</md-icon>
              <label class="ml-15 md-display -font-14 latoFont">ADD TRIP PLAN</label>
            </md-button>
          </md-layout>
          <md-layout md-flex="5" v-if="disbled.plan_btn==0">
            <md-button class="md-raised mh-0 width-pre100 height-40" @click="addTripplan" disabled>
              <md-icon class="pb-4" md-verticalstatus-plan-align="center" md-align="center">add</md-icon>
              <label class="ml-15 md-display -font-14 latoFont">ADD TRIP PLAN</label>
            </md-button>
          </md-layout>
          <!--End Layout Button add tripplan-->
          <!--Start Layout Box 1-->
          <md-layout style="margin-top:5px;flex: 0 1 2%;" md-align="start"  class="">
            <md-card class="-large -radius4-shadow0-16" style="">
              <md-card-header>
                <div class="section-header mt-0">Approval Process</div>
              </md-card-header>
              <md-card-content class="ph-24 pt-0 pb-18">
                <div id="Tripplan_sendto"></div>
                <md-input-container   class="mb-0" md-theme>
                   <div style="width:100%">
                  <label
                    class="header3"
                    v-if="dp_saleman.length==0"
                    :style="{color: bd.text_red }"
                  >{{bd.txt_sent_to}}</label>
                  <label class="header3" v-else>{{bd.txt_sent_to}}</label>
                    <md-select
                    v-if="show_select==true"
                    :disabled="disbled.plan_btn == 1 ? true : false "
                    @click.native="gaSelectSendTo()"
                  ></md-select>
                  <md-select
                    v-else
                    v-model="bd.snk_salesman"
                    :disabled="disbled.plan_btn == 0 ? true : false "
                    ref="snk_salesman"
                    @click.native="gaSelectSendTo()"
                  >
                    <md-option
                      v-for=" rows in bd.arr_salemans"
                      :key="rows.emp_id"
                      v-bind:value="rows.emp_id"
                      class="-left"
                      @selected="selectSales(rows)"
                    >
                      <div  style="width:250px;display: inline-flex;">
                        <div  style="width:30%;" class="latoFont">{{ rows.emp_id }}</div>:
                        <div
                          style="width:70%;margin-left:8%"
                          class="kanitFont font-weight-300"
                        >{{ rows.fullname }}</div>
                      </div>
                    </md-option>
                  </md-select>
              </div>
                </md-input-container>
              <md-layout>
                  <div>
                    <md-layout md-flex="20" md-align="start" class="mt-15">
                     <label class="header3">Status</label>
                    </md-layout>
                  </div>
                  <div style="padding:0 0 0 20px">
                      <md-layout md-flex="20" md-align="start" class="mt-15">
                  <div class="mr-10">
                    <md-avatar
                      class="md-avatar-icon _icon-status -small -gray-A8"
                      v-if="arr_status_plan.short_name == 'DRF'"
                    ></md-avatar>
                    <md-avatar
                      class="md-avatar-icon _icon-status -small -warm"
                      v-if="arr_status_plan.short_name == 'WFA'"
                    ></md-avatar>
                    <md-avatar
                      class="md-avatar-icon _icon-status -small -green"
                      v-if="arr_status_plan.short_name == 'APV'"
                    ></md-avatar>
                    <md-avatar
                      class="md-avatar-icon _icon-status -small -red"
                      v-if="arr_status_plan.short_name == 'REJ'"
                    ></md-avatar>
                    <md-avatar
                      class="md-avatar-icon _icon-status -small -gray-A8"
                      v-if="arr_status_plan.short_name == 'REC'"
                    ></md-avatar>
                  </div>
                  <span class="sub-section-header">{{arr_status_plan.name}}</span>
                  <span class="sub-page-header pl-5">({{arr_status_plan.descript}})</span>
                </md-layout>
                  </div>
                  </md-layout>
              </md-card-content>
            </md-card>
          </md-layout>
          <!--End Layout Box 1-->
          <!-- dialog -->
            <md-dialog  id="all_cust_dialog_ap"  ref="details-dialog" style="">
              <md-dialog-title
                  style="font-weight:500;background:#EFEFEF;color:#414141;font-size:16px;padding-bottom:15px;padding-top:15px;"
                >
                  <md-layout>
                    <md-layout md-flex="70">
                      <label style="font-family:Roboto" class="sub-title ">Trip Plan Overview</label>
                    </md-layout>
                    <md-layout md-flex="30" md-align="end">
                      <md-icon
                        @click.native="closeAllCust"
                        style="cursor:pointer;margin-right:0px"
                        >close</md-icon
                      >
                    </md-layout>
                  </md-layout>
                  <!-- All My Customer -->
                </md-dialog-title>
                  <md-dialog-content class='content-dialog'  style="height:100%;width:100%;">
                  <div
                    style="position: absolute;z-index: 101;margin-left:40%;margin-top:10%;"
                  >
                  </div>
                  <md-layout style="padding:0 0 5px 0;background-color:#fff" v-sticky="{ zIndex: 20, stickyTop: 0 }" md-flex="100" md-align="end">
                    <md-layout md-flex="45" md-align="start" style="color:#414141;opacity:0.9;font-weight: 500;font-size:18px"
                      >Customer&nbsp;({{ this.count_overview_detail }})</md-layout>
                    <md-layout
                    :style="{'pointer-events' : loading_overview ?  'none' : ''}"
                     md-flex="55" md-align="end">
                      <div style="padding:0 0 0 20px;width: 40%;">
                        <md-dropdown-box   :data="select_overview" @choose="set_view" v-model="overview_list"></md-dropdown-box>
                         </div>
                         <div style="width: 3%;"></div>
                       <div style="width: 57%;">
                         <md-search-box
                        :placeholder="'Search Customer...'"
                        :value="keyword2"
                        style="width:85%;opacity: 0.8;"
                        @filter="filter"
                        @clear="keywordCPR"
                        ></md-search-box>
                       </div>
                    </md-layout>
                  </md-layout>
                <md-layout style="margin-top:15px;background-color:">
                   <md-spinner
        style="font-size:16px;margin-left:40%;position: absolute;padding-top:30%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="this.loading_overview"
        md-indeterminate
      ></md-spinner>


     <div style="padding:0px 0 5px 0;background-color:#fff" v-sticky="{ zIndex: 10, stickyTop:41 }" class='md-layout'>

        <div  v-if="overview_list === 'Customer View'" style="padding-top:15px;font-weight: 600;font-size:14px;color: #727272;opacity:1;font-family:Roboto;width:100%;display: -webkit-box;"
                    >
                      <div  @click="sort_overview('customer')"   style="cursor: pointer;background-color:;width: 40%;">Customer</div>
                      <div  @click="sort_overview('current_plan')" style="cursor: pointer;background-color:;width: 20%;">Current Plan</div>
                      <div  @click="sort_overview('previous_plan')" style="cursor: pointer;background-color:; width: 20%;">Previous Plan</div>
                      <div  @click="sort_overview('last_checkin')" style="cursor: pointer;background-color:;width: 20%;">Last Check-in</div>
                </div>
                <div   v-if="overview_list === 'Province View'" style="padding-top:15px;background-color:#fff;font-weight: 600;font-size:14px;color: #727272;opacity:1;font-family:Roboto;width:100%;display: -webkit-box;"
                    >
                      <div  @click="sort_overview('customer')"   style="cursor: pointer;background-color:;width: 40%;">Customer</div>
                      <div  @click="sort_overview('current_plan')" style="background-color:;cursor: pointer;width: 20%;">Current Plan</div>
                      <div  @click="sort_overview('province')"  style="cursor: pointer;background-color:; width: 20%;">Province</div>
                      <div  @click="sort_overview('district')" style="background-color:;cursor: pointer;width: 20%;">District</div>
                </div>
                 <div   v-if="overview_list === 'Order View'" style="padding-top:15px;background-color:#fff;font-weight: 600;font-size:14px;color: #727272;opacity:1;font-family:Roboto;width:100%;display: -webkit-box;"
                    >
                      <div  @click="sort_overview('customer')"   style="cursor: pointer;background-color:;width: 50%;">Customer</div>
                      <div  @click="sort_overview('current_plan')" style="cursor: pointer;background-color:;cursor: pointer;width: 25%;">Current Plan</div>
                      <div  @click="sort_overview('order_value')" style="text-align:center;cursor: pointer;background-color:; width: 15%;">Order Value</div>

                </div>
      </div>
                    <div
                      v-if="overview_list === 'Customer View'"
                      class="body-deatil"
                      :style="{  width: '100%' ,'padding-top':'5px' }">
                    <div
                      v-if="this.overview_detail.length == 0"
                      style="margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                    >
                                No customer ....
                    </div>
                      <div
                      v-for="(items) in this.overview_detail"
                          :key="'overview_detail'+items.cust_code+''+items.plan_date"
                        class="menu-dialog"
                        :style="{
                          'cursor':'default',
                          'margin-top': '5px',
                          'padding': '5px 0 5px 0',
                          display: '-webkit-box',
                          width: '100%',
                          'font-family':'kanit'
                        }"
                      >
                        <div style="padding:0 15px 0 0;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;background-color:;width:40%;">
                          {{items.customer}}
                           <md-tooltip md-direction="top" class="robotoFont">{{items.customer}}</md-tooltip>
                        </div>
                        <div style="background-color:;width:20%;font-family:Roboto">
                          {{items.current}}
                        </div>
                        <div
                          style="font-family:Roboto;background-color:;width:20%;color:#414141; opacity:0.7;"
                        >
                          {{items.previous}}
                        </div>
                        <div style="background-color:;width:20%;color:#414141; opacity:0.7">
                          <label style="font-family:Roboto"
                            >{{items.last_checkin}}</label
                          >
                        </div>
                      </div>
                    </div>
                      <div
                      v-if="overview_list === 'Province View'"
                      class="body-deatil"
                      :style="{ width: '100%'  }">
                    <div
                      v-if="this.Pv_overview_detail.length == 0"
                      style=" margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                    >
                                No customer ....
                    </div>
                      <div
                       v-for="(items) in this.Pv_overview_detail"
                          :key="'Pv_overview_detail'+items.cust_code+''+items.plan_date"
                        class="menu-dialog"
                        :style="{
                          'cursor':'default',
                          'margin-top': '5px',
                          'padding': '5px 0 5px 0',
                          display: '-webkit-box',
                          width: '100%',
                          'font-family':'kanit'
                        }"
                      >
                        <div style="padding:0 15px 0 0;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;background-color:;width:40%;">
                           {{items.customer}}
                             <md-tooltip md-direction="top" class="robotoFont">{{items.customer}}</md-tooltip>
                        </div>

                        <div style="background-color:;width:20%;font-family:Roboto">
                           {{items.current}}
                        </div>
                        <div
                          style="background-color:;width:20%;color:#414141; opacity:0.7;"
                        >
                          {{items.province}}
                        </div>
                        <div style="text-overflow:ellipsis;white-space: nowrap;overflow: hidden;background-color:;width:20%;color:#414141; opacity:0.7">
                          <label style="font-family:kanit;"
                            >{{items.district}}</label
                          >
                            <md-tooltip md-direction="top" class="robotoFont">{{items.district}}</md-tooltip>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="overview_list === 'Order View'"
                      class="body-deatil"
                      :style="{ width: '100%'  }">
                    <div
                      v-if="this.Od_overview_detail.length == 0"
                      style=" margin-top: 15px;font-size:14px;text-align:center;margin-bottom: 15px;"
                    >
                                No customer ....
                    </div>
                      <div
                       v-for="(items) in this.Od_overview_detail"
                          :key="'Od_overview_detail'+items.cust_code+''+items.plan_date"
                        class="menu-dialog"
                        :style="{
                          'cursor':'default',
                          'margin-top': '5px',
                          'padding': '5px 0 5px 0',
                          display: '-webkit-box',
                          width: '100%',
                          'font-family':'kanit'
                        }"
                      >
                        <div style="padding:0 15px 0 0;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;background-color:;width:50%;">
                           {{items.customer}}
                            <md-tooltip md-direction="top" class="robotoFont">{{items.customer}}</md-tooltip>
                        </div>
                        <div style="font-family:Roboto;background-color:;width:25%;">
                           {{items.current}}
                        </div>
                        <div
                          style="font-family:Roboto;text-align:right;background-color:;width:15%;color:#414141; opacity:0.7;"
                        >
                          {{'฿ '}}{{  floatFormat(items.order_value) }}
                        </div>
                      </div>
                    </div>


                </md-layout>
                </md-dialog-content>
            </md-dialog>
          <!-- End dialog -->
          <!--Start Layout Box 2-->
          <md-layout style="margin:0 0 20px 0;height: 250px;" md-align="strat" md-flex="20">
            <md-card  md-with-hover class="-large -radius4-shadow0-16 -no-y-scroll" style="margin-top:16px;max-height:1000px">
              <md-card-header>

                <md-layout>
                    <md-layout md-flex="70">
                      <label style="font-family:Roboto" class="sub-title ">Trip Plan Overview</label>
                    </md-layout>
                    <md-layout md-flex="30" md-align="end">
                      <md-icon @click.native="open_dialog()" style="margin:0;color:#727272">launch</md-icon>
                    </md-layout>
                  </md-layout>
              </md-card-header>
              <md-card-content style="padding:0px;overflow: hidden;" class="">
<!-- SUCCESS -->
                <md-list
                 style="cursor:default;padding:0px">
                  <md-list-item
                  class="head-menu-setting"
                  style="display: flex;"
                  >
                    <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'SUCCESS RATE %' }}</span>

                  </md-list-item>
                    <span  v-if="overview.success.length != 0" style="cursor:default;padding:10px;padding-top:10px" >
                <md-layout   md-gutter>
             <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
               <div  v-for="(items) in overview.success"
                          :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                     <md-layout>
                                <div class="-left">
                                  <span style="padding:0 2px 0 2px;font-size:20px" class="header2">{{items.amount}}%</span>
                                  <br>
                                  <span style="padding:0 2px 0 2px;" class="header3">{{items.name}}</span>
                                  <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.title}}</md-tooltip>
                                </div>
                     </md-layout>
                </div>
            </div>
                </md-layout>
                    </span>
                </md-list>
<!-- PLAN -->
                 <md-list

                 style="cursor: pointer;padding:0px">
                  <md-list-item
                   @click.native="Expand_Overview('plan')"
                  class="head-menu-setting"
                  style="display: flex;padding:0 10px 0 0"
                  >
                    <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'PLAN' }}</span>
                    <md-icon v-if="overview.expand_plan === false">expand_less</md-icon>
                    <md-icon v-else>expand_more</md-icon>

                  </md-list-item>
                    <span v-if="overview.expand_plan && overview.plan.length != 0"   style="cursor:default;padding:10px;padding-top:10px" >
                <md-layout  md-gutter>
             <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
               <div  v-for="(items) in overview.plan"
                          :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                     <md-layout style="padding-top:15px">
                                <div class="-left">
                                  <span  style="padding:0 2px 0 2px;font-size:20px" class="header2">{{items.amount}} <small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                                  <br>
                                  <span style="padding:0 2px 0 2px" class="header3">{{items.name}}</span>
                                  <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.title}}</md-tooltip>
                                </div>
                     </md-layout>
                </div>
            </div>
                </md-layout>
                    </span>
                </md-list>
<!-- ACTIVE -->
                 <md-list

                 style="cursor: pointer;padding:0px">
                  <md-list-item
                   @click.native="Expand_Overview('active')"
                  class="head-menu-setting"
                  style="display: flex;padding:0 10px 0 0"
                  >
                    <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'ACTIVE' }}</span>
                    <md-icon v-if="overview.expand_active === false">expand_less</md-icon>
                    <md-icon v-else>expand_more</md-icon>

                  </md-list-item>
                      <span  v-if="overview.expand_active && overview.active.length != 0"  style="cursor:default;padding:10px;padding-top:10px" >
                <md-layout  md-gutter>
             <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
               <div  v-for="(items) in overview.active"
                          :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                     <md-layout style="padding-top:15px">
                                <div class="-left">
                                  <span  style="padding:0 2px 0 2px;font-size:20px" class="header2">{{items.amount}} <small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                                  <br>
                                  <span style="padding:0 2px 0 2px;" class="header3">{{items.name}}</span>
                                  <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.title}}</md-tooltip>
                                </div>
                     </md-layout>
                </div>
            </div>
                </md-layout>
                    </span>
                </md-list>
              </md-card-content>
            </md-card>
          </md-layout>
          <!--End Layout Box 2-->
        </md-layout>
        <!--End Layout Left-->
        <!--Start Layout Right-->
        <md-layout style="" md-column md-gutter md-flex-medium="60" md-flex-large="60">
          <div style="max-width: 1500px;"  class="comp-full-calendar mt-20 pt-10">
            <!-- Start Header Calendar -->
            <div class="full-calendar-header">
              <div class="header-left" style="display: -webkit-box;flex:0">
                <!-- position: absolute;
															    top:15%;
                left: 32%;"-->
                <md-button
                  @click="openComment"
                  class="width-2 z-index-0"
                  v-if="btn_comment"
                  style="min-width: 36px !important ;height: 30px;
															    padding: 0px 0px;
															    border-radius: 20px;
															    text-align: center;
															    font-size: 12px;
															    line-height: 1.42857;"
                >
                  <div
                    class="md-avatar md-avatar-icon _icon-status -large icn-gray md-theme-default"
                  >
                    <md-icon class="-white -font-14 pt-5">mode_comment</md-icon>
                  </div>
                </md-button>
              </div>
              <div class="header-left" style="display: -webkit-box;">
                  <md-dropdown-box2 style="width: 170px !important;" :data="select_View_Calendar" @choose="set_view_calendar" v-model="overview_list_calendar"></md-dropdown-box2>
              </div>

              <!-- Start Month Picker-->
              <div style="flex:0" class="header-center" v-click-outside="outsideMonth">
                <md-button @click="openMonthPicker" class="width-240 z-index-0">
                  <span class="pt-10 section-header">
                    <b>{{hd.title}}</b>
                  </span>
                  <md-icon class="ml-8 mb-5 -gray-41">{{icon_expand}}</md-icon>
                </md-button>
                <!-- Start Month Picker-->
                <md-layout md-align="center">
                  <md-card :class="hd.monthPickCls">
                    <md-card-header class="head-callendar">
                      <md-layout>
                        <md-layout md-align="start" md-flex="10">
                          <md-button @click.stop="goPrev">
                            <md-icon>chevron_left</md-icon>
                          </md-button>
                        </md-layout>
                        <md-layout md-align="center" md-flex="80">
                          <md-button class="pr-20 pl-10" @click="openYearPicker">
                            <label class="md-body-2 pl-18">
                              <span class="body-primary-text pt-10">{{hd.txt_year}}</span>
                            </label>
                          </md-button>
                        </md-layout>
                        <md-layout md-align="end" md-flex="10">
                          <md-button @click.stop="goNext">
                            <md-icon>chevron_right</md-icon>
                          </md-button>
                        </md-layout>
                      </md-layout>
                    </md-card-header>
                    <md-card-content class="ph-0 pv-0">
                      <md-layout class="ph-10 pv-10">
                        <md-layout
                          md-align="center"
                          v-for="(items) in hd.arr_months"
                          :key="items.id"
                          v-if="hd.show_mh == true"
                          :class="keepMomth == items.month_id ?'month-layout current':'month-layout'"
                        >
                          <!-- class="month-layout" -->
                          <div
                            :class="keepMomth == items.month_id ?'month-box latoFont current':'month-box latoFont'"
                            @click="selectMonth(items)"
                          >{{items.month_name}}</div>
                          <!-- <div class="month-box latoFont" @click="selectMonth(items)">
																						{{items.month_name}}ying
                          </div>-->
                        </md-layout>
                        <md-layout
                          md-align="center"
                          v-for="(items) in hd.arr_year"
                          :key="items.id"
                          :class="keepYear == items ?'month-layout current':'month-layout'"
                          v-if="hd.show_mh == false"
                        >
                          <div
                            :class="keepYear == items ?'month-box latoFont current':'month-box latoFont'"
                            @click="selectYear(items)"
                          >{{items}}</div>
                        </md-layout>
                      </md-layout>
                    </md-card-content>
                  </md-card>
                </md-layout>
              </div>
              <!-- End Month Picker-->
              <div v-if="show_select==true" class="header-right text-right"></div>
              <div v-else class="header-right text-right">
                <submit-btn
                  :value="text_submit"
                  @submitclick="emitSubmitClick('approve')"
                  v-if="disbled.plan_btn == true"
                ></submit-btn>
                <submit-btn
                  :value="text_recall"
                  @submitclick="emitSubmitClick('recall')"
                  v-if="disbled.recall_btn==true"
                ></submit-btn>
                <submit-btn
                  :value="text_edit"
                  @submitclick="emitSubmitClick('edit')"
                  v-if="disbled.edit_btn==true"
                ></submit-btn>
                <submit-btn
                  :value="text_revise"
                  @submitclick="emitSubmitClick('revise')"
                  v-if="disbled.revise_btn==true"
                ></submit-btn>
              </div>
            </div>
            <!-- End Header Calendar -->
            <div class="full-calendar-body">
              <div class="weeks">
                <strong class="week latoFont" v-for="week in weekNames" :key="week.id">{{week}}</strong>
              </div>
              <div class="dates" ref="dates">
                <div class="dates-bg">
                  <div class="week-row" v-for="week in currentDates" :key="week.id">
                    <div
                      class="day-cell"
                      v-for="day in week"
                      :key="day.id"
                      :class="{'today' : day.isToday,'not-cur-month' : !day.isCurMonth}"
                    >
                      <p class="day-number latoFont">{{day.monthDay}}</p>
                    </div>
                  </div>
                </div>
                <!-- absolute so we can make dynamic td -->
                <div class="dates-events">
                  <div  class="events-week" v-for="week in currentDates" :key="week.id">
                    <div

                      class="events-day"
                      v-for="day in week"
                      :key="day.id"
                      track-by="$index"
                      :class="{'today' : day.isToday,
												'not-cur-month' : !day.isCurMonth}"
                      @click.stop="gaSelectDay();selectThisDay(day, $event,'')"
                    >
                      <!--@click.stop="selectThisDay(day, $event)"-->
                      <p
                        class="day-number latoFont"
                        @click.stop="gaSelectDay();selectThisDay(day, $event,'head')"
                      >{{day.monthDay}}</p>

                      <div  class="event-box">
                        <div
                          class="event-item"
                          v-for="(event) in day.events"
                          :key="event.id"
                          v-show="event.cellIndex <= eventLimit"
                          :class="[classNames(event.cssClass), {
															'is-start' : isStart(event.start, day.date),'is-end' : isEnd(event.end,day.date),'is-opacity' : !event.isShow
															}]"
                              :style="{ 'background-color':event.even_color + '!important'}"
                          @click="gaSelectPlan();editPlan(day, event,$event,1)"
                        >
                          <md-layout
                            v-show="event.isShow"
                            class="body-item"
                          >
                            <md-layout md-flex="70" md-align="start" class="pl-5">
                              <div class="-list-block kanitFont font-weight-100">{{view(event)}}</div>
                              <md-tooltip
                                md-direction="top"
                                class="kanitFont font-weight-100"
                              >{{view_code(event) +" : "+ view(event)}}</md-tooltip>
                            </md-layout>
                            <md-layout md-flex="20" md-align="end" class="latoFont">{{event.status}}</md-layout>
                          </md-layout>
                          <!-- <md-layout
                            v-show="event.isShow"
                            v-if="event.status == 'P'"
                            class="body-item"
                          >
                            <md-layout md-flex="70" md-align="start" class="pl-5">
                              <div class="-list-block kanitFont font-weight-100">{{event.title}}</div>
                              <md-tooltip
                                md-direction="top"
                                class="kanitFont font-weight-100"
                              >{{event.customer_code +" : "+ event.title}}</md-tooltip>
                            </md-layout>
                            <md-layout md-flex="20" md-align="end" class="latoFont">{{event.status}}</md-layout>
                          </md-layout> -->
                        </div>

                        <p
                          v-if="day.events.length > eventLimit"
                          style="margin-top: 5px;text-align: left;font-size: 12px;color: rgba(0, 0, 0, .87);"
                          class="more-link show-tag"
                        >{{day.events[day.events.length -1].cellIndex - eventLimit}} more</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- full events when click show more -->
                <div
                  v-click-outside="outsideCalendar"
                  class="more-events"
                  v-show="showMore"
                  :style="{left: morePos.left + 'px', top: morePos.top + 'px'}"
                >
                  <md-layout class="more-header" md-align="end" @click.stop="showMore = false">
                    <span
                      class="title text-right"
                      @click.stop="showMore = false"
                    >{{moreTitle(selectDay.date)}}</span>
                    <md-menu
                      style="z-index: 3;width: 35px;height: 30px;"
                      md-align-trigger
                      v-if="show_more_vert==true"
                      md-direction="bottom left"
                      v-click-outside="outsideLabel"
                      @open="openMenuLabel"
                      @close="closeMenuLabel"
                    >
                      <md-button
                        style="right: 5px;"
                        class="md-icon-button mh-0 ph-0"
                        md-menu-trigger
                        :disabled="checkDate == 1 ? true : false"
                      >
                        <md-icon style="left: 25%;margin-bottom: 13px;" class="mh-0">more_vert</md-icon>
                      </md-button>
                      <md-menu-content class="-no-y-scroll">
                        <md-menu-item
                          v-for="(item) in bd.labelList"
                          :key="item.id"
                          class="pv-0 height-35"
                          @click="evenMore(item , selectDay)"
                        >
                          <label class="md-body-1 robotoFont">{{ item.tagname }}</label>
                        </md-menu-item>
                      </md-menu-content>
                    </md-menu>
                  </md-layout>
                  <switch-datepicker
                    class="mr-10"
                    @setdetes="setShowDatePicker"
                    v-if="show_datepicker == true "
                    @savedatepicker="switchDatepicker"
                    :min="dPK.valDateMin"
                    :max="dPK.valDateMax"
                    :value="dPK.valDate"
                  ></switch-datepicker>
                  <div class="more-body">
                    <ul class="body-list pb-10">
                      <div

                        v-for="(event)  in selectDay.events"
                        :key="event.id"
                        @click="editPlan(selectDay, event,$event,2)"
                      >
                        <md-layout

                          v-show="event.isShow"
                          v-if="event.status != 'P'"
                          class="body-item status-plan-pa"
                          :style="{ 'background-color':event.even_color + '!important'}"
                        >
                          <md-layout md-flex="80" md-align="start">
                            <div class="-list-block kanitFont font-weight-100">{{view(event)}}</div>
                            <md-tooltip
                              md-direction="top"
                              class="kanitFont font-weight-100"
                            >{{view_code(event)+" : "+ view(event)}}</md-tooltip>
                          </md-layout>
                          <md-layout
                            md-flex="20"
                            md-align="end"
                            class="pr-10 latoFont"
                          >{{event.status}}</md-layout>
                        </md-layout>
                        <md-layout
                          :style="{ 'background-color':event.even_color + '!important'}"
                          v-show="event.isShow"
                          v-if="event.status == 'P'"
                          class="body-item status-plan-p"
                        >
                          <md-layout   md-flex="80" md-align="start">
                            <div class="-list-block kanitFont font-weight-100">{{view(event)}}</div>
                            <md-tooltip
                              md-direction="top"
                              class="kanitFont font-weight-100"
                            >{{view_code(event) +" : "+ view(event)}}</md-tooltip>
                          </md-layout>
                          <md-layout
                            md-flex="20"
                            md-align="end"
                            class="pr-10 latoFont"
                          >{{event.status}}</md-layout>
                        </md-layout>
                      </div>
                    </ul>
                  </div>
                  <div class="more-header" v-if="disbled.plan_btn == 1">
                    <span class="title mr-5 pr-5 text-right"></span>
                    <md-button
                      class="md-icon-button md-raised pr-5 text-right"
                      @click="addPlanClick('onCalendar')"
                      :disabled="(arr_status_plan.short_name === 'RVP' || arr_status_plan.short_name === 'REC' || arr_status_plan.short_name === 'DRF') && isDateInPast(currentDate) "
                      :style="{ backgroundColor: (arr_status_plan.short_name === 'RVP' || arr_status_plan.short_name === 'REC' || arr_status_plan.short_name === 'DRF') && isDateInPast(currentDate) ? 'gray' : '#fd7f00', color: 'white' }"
                    >
                      <md-icon>add</md-icon>
                    </md-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </md-layout>
        <!--End Layout Right-->
      </md-layout>
      <!--End Main Layout-->
      <!--Start Main Layout-->
      <md-sidenav
        class="md-left md-fixed z-index-10 position-fix"
        ref="leftSidenav"
        @open="open('Left')"
        @close="close('Left')"
      >

        <md-card class="-noshadow">
          <md-card-header class="-orange">
            <md-card-header-text :class="inactiveMainView">
              <div class="md-title mh-30 latoFont">{{bd.txt_header_sidnav}}</div>
            </md-card-header-text>
            <md-button class="md-icon-button" @click="closeLeftBar" :class="inactiveMainView">
              <md-icon class="-white">close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
            <md-card-header-text :class="inactiveFilter">
              <div class="md-title mh-30">
                <md-button
                  class="md-icon-button pt-0"
                  @click="backTomainView('back')"
                  :class="inactiveFilter"

                >
                  <md-icon class="-white pt-0 mt-5">arrow_back</md-icon>
                  <md-tooltip md-direction="bottom">back to main page</md-tooltip>
                </md-button>
                <span>Select your customers</span>
              </div>
            </md-card-header-text>
            <md-button
              class="md-icon-button"
              @click="backTomainView('save')"
              :class="inactiveFilter"


            >
              <md-icon class="-white">done</md-icon>
              <md-tooltip md-direction="right">back to main page</md-tooltip>
            </md-button>
          </md-card-header>
          <md-card-content class="mh-40 pt-10 ph-0 pb-30">
            <!---Auto Search-->

            <div @click="goToFilter">
              <md-input-container class="md-chips mb-0">

                <md-chip
                  class="kanitFont longCust"
                  v-for="(chip,index) in arr_select_cust"
                  :key="chip.id"
                  :md-editable="mdStatic"
                  :md-deletable="mdStatic"
                  @delete="deleteCustomer(chip.id , index)"


                >
                  <slot
                    name="chip"
                    :value="chip.id"
                  >{{ chip.customer_code }} : {{ chip.customer_name_th }}</slot>
                  <md-tooltip
                    md-direction="top"
                    class="kanitFont"
                  >{{chip.customer_code}} : {{chip.customer_name_th}}</md-tooltip>
                </md-chip>

                <!--@edit="editChip(chip)"-->
                <md-input
                  v-show="mdStatic"
                  tabindex="0"
                  :debounce="0"
                  v-model.trim="bd.edt_show_name"
                  :type="mdInputType"
                  :placeholder="mdInputPlaceholder"
                  :disabled="disbled.cust == 1 ? true : false "
                  @input="autoSearchCustomer"
                  ref="snk_customer"
                ></md-input>
                <slot></slot>
              </md-input-container>
            </div>
            <!--start Filter search-->
            <md-layout class="pt-15" :class="inactiveFilter">
              <span class="body-primary-text font-weight-400">FILTER BY</span>
            </md-layout>
            <md-layout class="mt-5 mb-30" :class="inactiveFilter" v-if="arr_province.length > 0">
              <div
                v-for="(items, index) in arr_province"
                :key="items.id"
                v-on:click="selectProvince(items , index)"
              >
                <md-chip
                  class="md-body-1 -white mr-5 mt-5 md-editable -orange kanitFont font-weight-300 -font-14"
                  v-if="items.status_check == 1"
                >{{items.prov_name}}</md-chip>
                <md-chip
                  class="md-body-1 -white mr-5 mt-5 md-editable kanitFont font-weight-300 -font-14"
                  v-if="items.status_check == 0"
                >{{items.prov_name}}</md-chip>
              </div>
            </md-layout>
            <md-layout
              md-flex-large="100"
              md-align="center"
              v-if="arr_province.length == 0"
              class="mv-20"
              :class="inactiveFilter"
            >
              <span class="md-body-1 -gray-75 latoFont">Data not found</span>
            </md-layout>
            <md-layout :class="inactiveFilter" style="width: 250px;">
              <md-select v-model="dp_filter">
                <md-option
                  class="-left"
                  v-for="(items) in arr_filter"
                  :key="items.id"
                  v-bind:value="items.id"
                  @selected="selectFilter(items)"
                >
                  <md-layout md-align="start" class="latoFont">{{items.name}}</md-layout>
                </md-option>
              </md-select>
            </md-layout>
            <md-layout :class="inactiveFilter">
              <md-list class="pv-0 -filter-customer">

                <md-list-item
                  v-if="arr_customer.length > 0"
                  v-for="(items) in arr_customer"
                  :key="items.id"
                  class="-border ph-0 pv-0"
                >
                  <md-button
                    class="-white mh-0 pr-0 width-300 z-index-2"
                    @click="selectCustomer(items)"
                  >
                    <md-layout md-flex-large="90">
                      <span v-if="items.type_sorted == 'store'" class="md-body-1 -gray-75 mr-5">
                        <md-icon>store</md-icon>
                      </span>
                      <span v-else class="md-body-1 mr-5">
                        <md-icon style="color:#FD7F00">star_rate</md-icon>
                      </span>

                      <span class="md-body-1 -gray-75 mr-5 robotoFont">{{items.customer_code}} :</span>
                      <span
                        class="md-body-1 -gray-75 -list-block width-120 text-left font-weight-300"
                        v-bind:style="{ fontFamily: items.font_name}"
                      >{{items.customer_name_th}}</span>
                      <span
                        class="md-body-1 -gray-BD ml-5 kanitFont font-weight-200"
                      >{{items.zone_detail}}</span>
                    </md-layout>
                    <md-tooltip
                      md-direction="top"
                      class="kanitFont"
                    >{{items.customer_code}} : {{items.customer_name_th}}</md-tooltip>
                  </md-button>
                </md-list-item>

                <md-list-item v-if="arr_customer.length == 0" class="-border">
                  <md-layout md-flex-large="100" md-align="center">
                    <span class="md-body-1 -gray-75 latoFont">No Customer</span>
                  </md-layout>
                </md-list-item>
                <!--&& show_spinner_loading == false-->
              </md-list>
            </md-layout>
            <!--
									<div class="spinner-activity" >
										<md-spinner :md-size="120" :md-stroke="1"  v-show="show_spinner_loading" md-indeterminate style=' position: relative; top:10px;'></md-spinner>
									</div>
            -->
            <md-layout :class="inactiveMainView" class="mv-5">
              <md-layout md-flex="100">
                <label class="header3">Call Type</label>
              </md-layout>
              <md-layout class="mb-20 border-style" md-gutter>
                <md-layout md-flex="80">
                  <span class="md-title -font-18 latoFont -gray-41 mt-0">{{select_name}}</span>
                </md-layout>
                <md-layout md-align="end">
                  <md-button
                    :disabled="ceckDateReson == 0 && this.disbled.btn_check_store_Selection == 0  ? false : true"
                    @click="openSelectCalltype()"
                    class="md-icon-button pt-0 ph-0 mh-0 height-20"
                  >
                    <md-icon class="md-title -gray-41 mt-0 left-pre30 color-gray-a4">arrow_drop_down</md-icon>
                  </md-button>
                </md-layout>
              </md-layout>
              <md-card
                v-click-outside="outsideCallType"
                :class="callTypeShow"
                class="position-absolute z-index-12 -no-y-scroll"
              >
                <md-card-content class="pv-0">
                  <md-list>
                    <md-list-item
                      @click="selectCallTypeItem(items)"
                      v-for="items in arr_call_type"
                      class="height-35 width-130"
                      :key="items.id"
                    >
                      <span class="latoFont mb-20">{{ items.name }}</span>
                    </md-list-item>
                  </md-list>
                </md-card-content>
              </md-card>
            </md-layout>

            <md-layout md-gutter :class="inactiveMainView">
              <!--Start Date And Time Picker-->
              <md-layout
                md-flex-large="45"
                md-flex-medium="45"
                md-align="center"
                class="z-index-11"
              >
                <date-picker
                  class="mr-10"
                  v-if="bd.txt_header_sidnav != 'VIEW TRIP PLAN'"
                  @savedatepicker="emitSaveDatepicker"
                  :min="dPK.valDateMin"
                  :max="dPK.valDateMax"
                  :value="dPK.valDate"
                ></date-picker>
                <view-datepicker
                  v-if="bd.txt_header_sidnav == 'VIEW TRIP PLAN'"
                  :value="dPK.valDate"
                ></view-datepicker>
              </md-layout>
              <md-layout md-flex-large="50" md-flex-medium="50" md-align="center">
                <div v-if="bd.txt_header_sidnav != 'VIEW TRIP PLAN'">
                  <time-picker :value="valueTime" @selectstarttime="emitSelectStartTime"></time-picker>
                </div>
                <view-timepicker v-if="bd.txt_header_sidnav == 'VIEW TRIP PLAN'" :value="valueTime"></view-timepicker>
              </md-layout>
              <!--End Date And Time Picker-->
            </md-layout>
            <md-layout class="mt-20">
              <span
                class="section-header font-weight-400"
                :class="inactiveMainView"
              >Reason for visit</span>
            </md-layout>
            <md-card
              class="-large mt-10 -round-border -gray-DD -no-x-scroll"
              :class="inactiveMainView"
            >
              <md-list class="pv-0">
                <md-list-item
                  v-for="(items, index) in bd.arr_purpose"
                  class="-border height-list"
                  :key="items.id"
                >

                  <md-layout md-flex="70" class>
                    <div
                      class="md-list-text-container -pointer"
                      v-if="ceckDateReson == 0"
                      @click="showChecked(items,index)"
                    >
                      <span class="body-primary-text">{{items.name}}</span>
                    </div>
                    <div v-else class="md-list-text-container defaultCls">
                      <span class="body-primary-text">{{items.name}}</span>
                    </div>
                  </md-layout>
                  <md-layout md-flex="5" class="mr-20">
                    <md-button
                      class="md-icon-button md-raised md-dense md-list-action -gray-EF"
                      v-if="items.reason_desc != null "
                      @click="selectPurpose(items,index)"
                    >
                      <md-icon class="-white">message</md-icon>
                      <md-tooltip md-direction="top">comment</md-tooltip>
                    </md-button>
                  </md-layout>
                  <md-layout
                    md-flex="5"
                    class="mr-20"
                    v-if="bd.txt_header_sidnav != 'VIEW TRIP PLAN'"
                  >
                    <md-button
                      class="md-icon-button md-list-action right-5"
                      v-if="items.status_check == '1'"
                      @click="showChecked(items,index)"
                    >
                      <md-icon class="-orange mr-10">done</md-icon>
                      <md-tooltip md-direction="top">selected</md-tooltip>
                    </md-button>
                    <md-button
                      class="md-icon-button md-list-action"
                      v-if="items.status_check == '0'"
                      @click="showChecked(items,index)"
                    >
                      <md-icon class="-white mr-10">done</md-icon>
                    </md-button>
                  </md-layout>
                  <md-layout
                    md-flex="5"
                    class="mr-20 defaultCls"
                    v-if="bd.txt_header_sidnav == 'VIEW TRIP PLAN'"
                  >
                    <md-icon
                      class="-gray-A8 mr-10"
                      v-if="items.status_check == '1'&&ceckDateReson == 1"
                    >done</md-icon>
                    <md-tooltip
                      md-direction="top"
                      v-if="items.status_check == '1'&&ceckDateReson == 1"
                    >selected</md-tooltip>
                    <md-button
                      class="md-icon-button md-list-action right-5"
                      v-if="items.status_check == '1'&& ceckDateReson == 0"
                      @click="showChecked(items,index)"
                    >
                      <md-icon class="-orange mr-10">done</md-icon>
                      <md-tooltip md-direction="top">selected</md-tooltip>
                    </md-button>
                    <md-button
                      class="md-icon-button md-list-action"
                      v-if="items.status_check == '0'&& ceckDateReson == 0"
                      @click="showChecked(items,index)"
                    >
                      <md-icon class="-white mr-10">done</md-icon>
                    </md-button>
                  </md-layout>
                </md-list-item>
                <md-list-item>
                  <md-input-container class="mt-0 mb-10" md-theme>
                    <md-input
                      :disabled="ceckDateReson == 1  ? true : false"
                      placeholder="Other reason"
                      class="-font-12 -gray-75"
                      v-model="bd.edt_other_reason"
                    ></md-input>
                  </md-input-container>
                </md-list-item>
              </md-list>
            </md-card>
            <md-layout :class="inactiveMainView" class="mt-10">
              <md-input-container>
                <label class="sub-page-header">Description</label>
                <md-input
                  :disabled="ceckDateReson == 1  ? true : false"
                  :value="bd.edt_description"
                   @change="filterCust"
                  :v-model="bd.edt_description=='null' || bd.edt_description==null ? '' : bd.edt_description"
                ></md-input>
              </md-input-container>
            </md-layout>
            <div :class="inactiveMainView" class="-left">
              <md-avatar class="md-avatar-icon _icon-status -large -gray mr-15"></md-avatar>
              <span class="body-secondary-text font-weight-400">{{bd.txt_salesid}}</span>&nbsp;:&nbsp;
              <span class="body-primary-text-kanit">{{bd.txt_salesman}}</span>
            </div>
            <md-layout md-gutter class="mt-60 mb-20" :class="inactiveMainView">
              <md-layout md-flex="30" md-align="center">
                <md-button
                  v-if="ceckDateReson === 1 && bd.txt_header_sidnav === 'VIEW TRIP PLAN'"
                  class="md-raised -gray-A8 pl-12 md-display -font-14"
                  @click="showDlg(bd.txt_btn_del , true)"
                  disabled
                >{{bd.txt_btn_del}}</md-button>
                <md-button
                  v-else
                  class="md-raised -gray-A8 pl-12 md-display -font-14"
                  @click="showDlg(bd.txt_btn_del , true)"
                >{{bd.txt_btn_del}}</md-button>
              </md-layout>
              <md-layout md-flex="60" md-align="start" class="ml-20">
                <md-button
                  v-if="ceckDateReson === 1 || (arr_status_plan.short_name === 'RVP' || arr_status_plan.short_name === 'REC' || arr_status_plan.short_name === 'DRF') && bd.txt_header_sidnav === 'VIEW TRIP PLAN' && isDateInPast(currentDate)"
                  class="md-raised -gray-A8 md-display -font-14 width-pre100 height-36"
                  disabled
                >{{bd.txt_btn_add}}</md-button>
                <md-button
                  v-else
                  class="md-raised -orange md-display -font-14 width-pre100 height-36"
                  @click="showDlg(bd.txt_btn_add, true)"
                >{{bd.txt_btn_add}}</md-button>
              </md-layout>
            </md-layout>
          </md-card-content>
        </md-card>
      </md-sidenav>
      <md-dialog md-open-from="#fab" ref="purpose_dialog" style="z-index:100" >
        <md-dialog-title class="mb-0">
          <md-layout>
            <md-layout md-flex-large="50" class="robotoFont">Reason for visit - Notes</md-layout>
            <md-layout md-flex-large="50" md-align="end">
              <md-button class="md-icon-button" @click="warningBeNotSaved('purpose')">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="right">close</md-tooltip>
              </md-button>
            </md-layout>
          </md-layout>
        </md-dialog-title>
        <md-dialog-content class="mh-40 ph-0 width-500">
          <md-layout class="mb-10">
            <md-layout md-flex="50" class="border-style">
              <span class="md-title -font-18 -gray-41 mt-0">{{selectPurPose_name}}</span>
            </md-layout>
            <md-layout md-flex="10" class="border-style">
              <md-button
                :disabled=" ceckDateReson == 1  ? true : false"
                @click="openSelectPurpose()"
                class="md-icon-button height-20"
              >
                <md-icon class="md-title -gray-41 mt-0 left-pre30 color-gray-a4">arrow_drop_down</md-icon>
              </md-button>
            </md-layout>
          </md-layout>
          <md-input-container
            v-if="ceckDateReson == 0"
            v-bind:class="[activeClass, errorClass]"
            class="min-height-120"
          >
            <md-textarea v-model="bd.edt_reason_desc" class="ph-10 -font-16"></md-textarea>
          </md-input-container>
          <md-input-container v-else class="disable min-height-120">
            <md-textarea
              :disabled="ceckDateReson == 1 ? true : false"
              v-model="bd.edt_reason_desc"
              class="ph-10"
            ></md-textarea>
          </md-input-container>
        </md-dialog-content>
        <md-card
          v-click-outside="outsidePurPose"
          :class="purPoseShow"
          class="position-absolute height-220 left-pre5 top-pre20"
        >
          <md-card-content class="pv-0">
            <md-list>
              <md-list-item
                @click="selectPurposeItem(items,index)"
                v-for="(items,index) in bd.arr_purpose"
                class="height-35"
                :key="items.id"
              >
                <span class="latoFont mb-20">{{ items.name }}</span>
              </md-list-item>
            </md-list>
          </md-card-content>
        </md-card>
        <md-dialog-actions class="mv-15 mr-45 pv-0 z-index-1">
          <md-button
            class="md-body-1 -oranges robotoFont"
            @click="warningBeNotSaved('purpose')"
          >CANCEL</md-button>
          <md-button
            v-if="ceckDateReson == 0"
            class="md-body-1 -oranges robotoFont"
            @click="savePurpose('purpose')"
          >SAVE</md-button>
          <md-button
            v-else
            class="md-body-1 -gray-A8 robotoFont"
            :disabled="ceckDateReson == 1 ? true : false"
          >SAVE</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!--End Dialog Select Purpose-->
      <!--Start confirm dialog-->
      <md-dialog-confirm
        class="z-index-100"
        :md-title="dlg.title"
        :md-content-html="dlg.contentHtml"
        :md-ok-text="dlg.ok"
        :md-cancel-text="dlg.cancel"
        @open="onOpen"
        @close="submitDlg"
        ref="dlgname"
      ></md-dialog-confirm>
      <!--End confirm dialog-->
      <!--Start snackbar-->
      <md-snackbar
        :md-position="snk.vertical + ' ' + snk.horizontal"
        ref="snackbar"
        :md-duration="snk.duration"
      >
        <span>{{snk.txt_warning}}</span>
        <md-button class="md-accent -oranges" @click="submitSnk">{{snk.txt_submit}}</md-button>
      </md-snackbar>
      <!--End snackbar-->
    </div>
    <comment
      v-click-outside="outsideComment"
      @closeComment="setCloseComment"
      v-if="show_comment"
      :doc_comment="doc_comment"
      style="z-index:2;"
    ></comment>
  </div>

  <!--End div class="pageTripplan"-->
</template>

<script>
import Vue from "vue";
import moment from "moment";
import langSets from "../Salesops/dataMap/langSets";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
import TimePicker from "../Salesops/fullTimePicker/TimePicker";
import DatePicker from "../Salesops/fullDatePicker";
import comment from "../Salesops/commentTripplan/CommentTrip";
import VueSticky from 'vue-sticky'

var check = true;
var check_month = true;
var show_date = true;
var show_call_type = true;
var show_pur_type = true;
var status_show_menulabel = false;
export default {
  name: "salesops-tripplan",
  props: {
    lang: {
      type: String,
      default: "en"
    },
    firstDay: {
      type: Number | String,
      validator(val) {
        let res = parseInt(val);
        return res >= 0 && res <= 6;
      },
      default: 0
    },
    titleFormat: {
      type: String,
      default() {
        return langSets[this.lang].titleFormat;
      }
    },
    monthNames: {
      type: Array,
      default() {
        return langSets[this.lang].monthNames;
      }
    },
    weekNames: {
      type: Array,
      default() {
        let arr = langSets[this.lang].weekNames;
        return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay));
      }
    },
    value: [],
    debounce: {
      type: Number,
      default: 1e2
    },
    mdMax: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    let time = new Date();
    return {
      canConfirm: false,
      keepMomth: dateFunc.format(new Date(), "MM"),
      keepYear: dateFunc.format(new Date(), "yyyy"),
      valueTime: {},
      login: false,
      currentDate: new Date(),
      mdStatic: true,
      eventLimit: 3,
      showMore: false,
      morePos: {
        top: 0,
        left: 0,
        topMenu: 0,
        leftMenu: 0
      },
      selectDay: {},
      hd: {
        txt_page: "SALES TRIP PLAN",
        title: "",
        show_mh: false,
        txt_year: dateFunc.format(new Date(), "yyyy"),
        arr_year: this.randomYear("now"),
        arr_months: dateFunc.getFullMonth(),
        monthPickCls: "hide-tag month-body",
        text_dailog: ""
      },
      bd: {
        txt_salesman:
          Vue.localStorage.get("first_name") +
          " " +
          Vue.localStorage.get("last_name"),
        txt_salesid: Vue.localStorage.get("emp_id"),
        txt_btn_add: "",
        txt_btn_del: "",
        txt_header_sidnav: "",
        edt_data: [],
        default_edt: [],
        edt_show_name: null,
        edt_description: "",
        edt_reason_desc: null,
        edt_old_reason_desc: null,
        edt_other_reason: "",
        edt_select_prov: "",
        arr_salemans: [],
        arr_purpose: [],
        snk_salesman: null,
        txt_numoftrips: 0,
        txt_actvisits: 0,
        txt_avgdaily: 0,
        txt_totalact: 0,
        txt_intotalact: 0,
        txt_visitsucc: 0,
        text_red: "",
        txt_sent_to: "Sent to",
        labelList: [],
        keep_edit_plan: {}
      },
      snk: {
        vertical: "top",
        horizontal: "center",
        duration: 7000,
        txt_submit: "Agree",
        txt_warning: "",
        mode: ""
      },
      dlg: {
        title: "title",
        contentHtml: "....",
        ok: "Yes",
        cancel: "Cancel",
        subject: null
      },
      disbled: {
        cust: 0,
        plan_btn: 0,
        calltype: 0,
        recall_btn: 0,
        edit_btn: 0,
        revise_btn: 0,
        btn_check_store_Selection:0
      },
      scl: { start_rows: 0 },
      events: [],
      arr_call_type: [],
      arr_province: [],
      arr_customer: [],
      arr_status_plan: [],
      arr_remove_plan: [],
      dp_saleman: [],
      dp_purpose_type: 0,
      dp_purpose_old_type: 0,
      dp_call_type: 1,
      dp_store_selection: 1,
      inactiveMainView: "show-tag",
      inactiveFilter: "hide-tag",
      activeClass: "comment mv-0",
      errorClass: false,
      status_check_purpose: 0,
      mdInputType: "text",
      mdInputPlaceholder: "Customer Name",
      arr_select_cust: [],
      dtl_close: null,
      check_filter: false,
      check_sidenav: false,
      document_no: "",
      doc_comment: "",
      dPK: {
        valDate: "",
        valDateMin: "",
        valDateMax: ""
      },
      limitData: "",
      cust_id_select: null,
      show_select: false,
      callTypeShow: "hide-tag call-body",
      purPoseShow: "hide-tag pur-body",
      select_name: "call type",
      selectPurPose_name: "",
      show_progress: true,
      ceckDateReson: 0,
      status_type: "",
      text_submit: "SUBMIT",
      text_recall: "RECALL",
      text_edit: "EDIT",
      text_revise: "REVISE PLAN",
      set_status: "",
      icon_expand: "expand_more",
      show_more_vert: false,
      rsPlanAll: [],
      show_datepicker: false,
      swicthdate_new: "",
      checkDate: 0,
      show_comment: false,
      interval_amount: "",
      interval_type: "",
      dp_filter: 1,
      arr_filter: [
        { id: 1, name: "SORTED BY PLAN" },
        { id: 2, name: "SORTED BY DISTANCE" },
        { id: 3, name: "SORTED BY LAST VISIT DATE" }
      ],
      even_plan: "",
      arr_customer_old: [],
      arr_reason_old: [],
      status_even: "",
      btn_comment: true,
      // show_spinner_loading : false
      get_idEmp: Vue.localStorage.get("emp_id"),
      status_hide_show:true,
      header_expand:'success',
      overview:{
        expand_success:true,
        expand_plan:true,
        expand_active:false,
        success:[],
        plan:[],
        active:[]
      },
      keyword:'',
      keyword2:'',
      overview_list:'Customer View',
      overview_list_calendar:'Customer View',
      select_overview:[
        {code:'1' , title:'Customer View'},
        {code:'2' , title:'Province View'},
        {code:'3' , title:'Order View'},
        ],
         select_View_Calendar:[
        {code:'1' , title:'Customer View'},
        {code:'2' , title:'Province View'},
        {code:'3' , title:'District View'},
        ],
        overview_detail:[],
        full_overview_detail:[],
        count_overview_detail:0,
        Pv_overview_detail:[],
        full_Pv_overview_detail:[],
        Od_overview_detail:[],
        full_Od_overview_detail:[],
        sort_by:'ASC',
        Pv_sort_by:'ASC',
        Od_sort_by:'ASC',
        loading_overview:false,
        txtSearch:''
    };
  },
  computed: {
    currentDates() {
      return this.getCalendar();
    }
  },
  created() {
     this.$store.dispatch("settingChannelAll");

    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "planning");
      // this.$store.dispatch("setPathMenuService");
      // this.$store.dispatch("selectedMenuService", { m_code: "planning" });
      this.login = true;
      this.dispatchEvent();
      this.events.forEach((item, index) => {
        item._id = item.id || index;
        item.end = item.end || item.start;
      });
      this.limitData = 10;
      this.changeStatusOfPlan(this.currentDate);
      this.getMasterTripplan();
      this.getTagLabel();
      var roundsummary = document.getElementsByClassName("roundsummary");
      var roundnoti = document.getElementsByClassName("roundnoti");
      var dropdown = document.getElementsByClassName("my-dropdown-dd mt-10");
      if (roundsummary.length > 0) {
        roundsummary[0].classList.add("hide-tag");
      }
      if (roundnoti.length > 0) {
        roundnoti[0].classList.add("hide-tag");
      }
      if (dropdown.length > 0) {
        dropdown[0].remove(dropdown.selectedIndex);
      }
    }
  },
  methods: {
    selectFilter(items) {
      this.dp_filter = items.id;
      this.getAutoSearcCustomer();

      var key = this.$ga_key.Planning_Tripplan_Select_Filter;
      key.eventLabel = "Select Customer Sorted:" + this.get_idEmp;
      this.$ga.event(key);
    },
    /**---Head Of Calendar---*/
    emitSubmitClick(type) {
      if (type == "approve") {
        this.set_status = "WFA";
        this.hd.text_dailog = "approval";
      } else if (type == "recall") {
        this.set_status = "REC";
        this.hd.text_dailog = "recall";
      } else if (type == "revise") {
        this.set_status = "RVP";
        this.hd.text_dailog = "revise";
      } else {
        this.set_status = "DRF";
        this.hd.text_dailog = "edit";
      }
      this.showDlg("SUBMIT", true);
      this.$emit("submitClick");
    },
    setFormatDate(val, fotmat) {
      return moment(String(val)).format(fotmat);
    },
    selectThisDay(day, jsEvent, type) {
      let monthNow = this.setFormatDate(this.currentDate, "MM");
      let monthClick = this.setFormatDate(day.date, "MM");
      if (day.monthDay == "" || monthNow != monthClick) {
        this.showMore = false;
        return;
      }
      this.show_datepicker = false;
      this.currentDate = day.date;
      this.selectDay = day;
      this.showMore = true;
      this.morePos = this.computePos(event.target);
      if (type == "head") {
        this.morePos.top -= 30;
        this.morePos.left -= 10;
      } else {
        this.morePos.top -= 116;
        this.morePos.left -= 10;
      }
      this.morePos.topMenu = this.morePos.top;
      this.morePos.leftMenu = this.morePos.left;
      let events = day.events.filter(item => {
        return item.isShow == true;
      });
      if (events != "") {
        this.checkDate = 0;
      } else {
        this.checkDate = 1;
      }
      this.hd.monthPickCls = "hide-tag month-body";
      check_month = true;
      this.hd.show_mh = false;
      this.$emit("selectThisDay", this.computePos(event.target));
    },
    backTomainView(mode) {
      // console.log("backTomainView");
      // console.log(this.status_even);
      if (mode == "back") {
        if (this.status_even == "EDIT") {
          if (this.arr_customer_old[0].id != this.arr_select_cust[0].id) {
            this.warningBeNotSaved("BACKMAINPAGE");

            var key = this.$ga_key.Planning_Tripplan_Edit_Customers;
            key.eventLabel = "Edit Customers:" + this.get_idEmp;
            this.$ga.event(key);
          } else {
            this.setProvince();
            this.getAutoSearcCustomer();
            this.inactiveFilter = "hide-tag";
            this.inactiveMainView = "show-tag";

            var key = this.$ga_key.Planning_Tripplan_Edit_Customers;
            key.eventLabel = "Edit Customers:" + this.get_idEmp;
            this.$ga.event(key);
          }
        } else if (this.status_even == "ADD") {
          if (this.arr_select_cust.length == 0) {
            //  console.log('if');
            this.setProvince();
            this.getAutoSearcCustomer();
            this.inactiveFilter = "hide-tag";
            this.inactiveMainView = "show-tag";

            var key = this.$ga_key.Planning_Tripplan_Edit_Customers;
            key.eventLabel = "Edit Customers:" + this.get_idEmp;
            this.$ga.event(key);
          } else {
            // console.log('else');
            this.warningBeNotSaved("BACKMAINPAGE");

            var key = this.$ga_key.Planning_Tripplan_Edit_Customers;
            key.eventLabel = "Edit Customers:" + this.get_idEmp;
            this.$ga.event(key);
          }
        }
      } else {
        this.dp_filter = 2;
        this.setProvince();
        this.getAutoSearcCustomer();
        this.inactiveFilter = "hide-tag";
        this.inactiveMainView = "show-tag";

        var key = this.$ga_key.Planning_Tripplan_Edit_Customers;
        key.eventLabel = "SelectOrderby:" + this.get_idEmp;
        this.$ga.event(key);
      }
      // this.dp_filter = 2;
      // this.show_spinner_loading=false;
    },
    setProvince() {
      if (this.arr_province.length > 0) {
        for (let i = 0; i < this.arr_province.length; i++) {
          if (this.arr_province[i].status_check == 1) {
            this.arr_province[i].status_check = 0;
            this.arr_province[0].status_check = 1;
          }
        }
        this.bd.edt_select_prov = this.arr_province[0].prov_code;
      }
    },
    goToFilter() {
      if (this.check_filter == true ) {
        this.inactiveFilter = "hide-tag";
        this.inactiveMainView = "show-tag";
        this.disbled.cust = 1;
      } else if (this.dp_call_type == 1 || this.dp_call_type == 0 || this.dp_store_selection == 1) {
        this.inactiveFilter = "show-tag";
        this.inactiveMainView = "hide-tag";
        this.getAutoSearcCustomer();
      }

    },
    autoSearchCustomer() {
      this.inactiveFilter = "show-tag";
      this.inactiveMainView = "hide-tag";
      if (
        this.bd.edt_show_name.length == 0 ||
        this.bd.edt_show_name.length > 2
      ) {
        this.getAutoSearcCustomer();
      }
    },
    deleteCustomer(key, index) {
      if (this.arr_select_cust.length == 1) {
        this.mdInputPlaceholder = "Customer Name";
      }
      if (this.disbled.plan_btn == 1) {
        this.arr_select_cust.splice(index, 1);
        this.$emit("change", this.arr_select_cust);
      }
    },
    selectCustomer(key) {
      let check_data = false;
      this.bd.edt_show_name = null;
      if (this.arr_select_cust.length == 0) {
        this.cust_id_select = key.id;
        this.mdInputPlaceholder = "";
        this.arr_select_cust.push(key);
        this.getAutoSearcCustomer();
      } else {
        if (this.bd.txt_header_sidnav == "EDIT TRIP PLAN") {
          this.arr_select_cust = [];
          this.arr_select_cust.push(key);
        } else {
          for (let i = 0; i < this.arr_select_cust.length; i++) {
            if (key.id == this.arr_select_cust[i].id) {
              check_data = true;
              this.snk.txt_warning =
                this.arr_select_cust[i].customer_name_th +
                " is already selected";
              this.$refs.snackbar.open();
              this.snk.mode = "duplicate";
              break;
            }
          }
          if (check_data == false) {
            this.bd.edt_show_name = null;
            this.arr_select_cust.push(key);
            this.getAutoSearcCustomer();
          } else {
          }
        }
      }
      // for (var i = 0; i < this.arr_call_type.length; i++) {
      //   if (this.arr_call_type[i].store_selection == 1) {
      //     this.dp_call_type = this.arr_call_type[i].id;
      //     this.dp_store_selection = this.arr_call_type[i].store_selection;
      //     break;
      //   }
      // }
      this.$emit("input", this.arr_select_cust);
      this.$emit("change", this.arr_select_cust);

      var key = this.$ga_key.Planning_Tripplan_Select_Customers;
      key.eventLabel = "Select Customers in Trip:" + this.get_idEmp;
      this.$ga.event(key);
    },
    changeStatusOfPlan(key) {
      let qry_month = this.setFmDate(key, "MM");
      let qry_year = this.setFmDate(key, "YYYY");
      this.getStatusPlanOfMonth(key, qry_month, qry_year);
    },
    selectProvince(key, index) {
      console.log("🚀 ~ file: Tripplan.vue:1767 ~ selectProvince ~ key:", key)
      if (this.bd.edt_select_prov != key.prov_code) {
        this.cust_id_select = null;
      }
      if (this.arr_province[index].status_check == 1) {
        this.arr_province[index].status_check = 0;
        this.bd.edt_select_prov = "";
      } else {
        for (let i = 0; i < this.arr_province.length; i++) {
          this.arr_province[i].status_check = 0;
        }
        this.arr_province[index].status_check = 1;
        this.bd.edt_select_prov = key.prov_code;
      }

      var key = this.$ga_key.Planning_Tripplan_Select_Province;
      key.eventLabel = "Select Province:" + this.get_idEmp;
      this.$ga.event(key);
      this.getAutoSearcCustomer();
    },
    selectPurpose(value, index) {
      var key = this.$ga_key.Planning_Tripplan_Select_Purpose;
      key.eventLabel = "Select Purpose:" + this.get_idEmp;
      this.$ga.event(key);

      this.selectPurPose_name = value.name;
      this.status_check_purpose = index;
      this.dp_purpose_type = value.id;
      this.dp_purpose_old_type = value.id;
      if (value.reason_desc != null) {
        this.bd.edt_reason_desc = "" + value.reason_desc + "";
        this.bd.edt_old_reason_desc = "" + value.reason_desc + "";
      } else {
        this.bd.edt_reason_desc = "";
        this.bd.edt_old_reason_desc = "";
      }
      this.openDialog("purpose_dialog");
    },
    selectPurposeItem(items, index) {
      this.selectPurPose_name = items.name;
      this.status_check_purpose = index;
      this.dp_purpose_type = items.id;
      this.dp_purpose_old_type = items.id;
      this.openSelectPurpose();
    },
    showChecked(value, index) {
      var key = this.$ga_key.Planning_Tripplan_Take_Reason;
      key.eventLabel = "Take Reason:" + this.get_idEmp;
      this.$ga.event(key);

      let reason_desc = this.bd.arr_purpose[index].reason_desc;
      if (value.status_check == 0) {
        this.bd.arr_purpose[index].status_check = 1;
        this.bd.arr_purpose[index].reason_desc = "";
        if (reason_desc != null) {
          this.bd.arr_purpose[index].reason_desc = reason_desc;
          // console.log(this.bd.arr_purpose[index].reason_desc);
        }
      } else {
        this.status_check_purpose = index;
        this.dlg = {
          title: "Do you want unselected?",
          contentHtml:
            "Reason for visit : " +
            this.bd.arr_purpose[this.status_check_purpose].name,
          subject: "PURPOSE"
        };
        this.openDialog("dlgname");
      }
    },
    savePurpose(mode) {
      if (mode == "purpose") {
        for (let i = 0; i < this.bd.arr_purpose.length; i++) {
          if (this.dp_purpose_type == this.bd.arr_purpose[i].id) {
            this.bd.arr_purpose[i].reason_desc = this.bd.edt_reason_desc;
            break;
          }
        }
        this.closeDialog("purpose_dialog");
        this.bd.edt_reason_desc == "";
      }

      var key = this.$ga_key.Planning_Tripplan_Save_Purpose;
      key.eventLabel = "Save Purpose:" + this.get_idEmp;
      this.$ga.event(key);
    },
    warningBeNotSaved(mode) {
      let ques = "Do you want to leave page?";
      let ans = "Changes might not be saved.";
      if (mode == "purpose") {
        if (
          this.dp_purpose_type != this.dp_purpose_old_type ||
          this.bd.edt_old_reason_desc != this.bd.edt_reason_desc
        ) {
          this.dlg = {
            title: ques,
            contentHtml: ans,
            subject: "COMMENT"
          };
          this.openDialog("dlgname");
          this.dtl_close = "purpose";
        } else {
          this.closeDialog("purpose_dialog");
        }
      } else if (mode == "CLSLEFTBAR") {
        this.dlg = {
          title: ques,
          contentHtml: ans,
          subject: "CLSLEFTBAR"
        };
        this.openDialog("dlgname");
        this.dtl_close = "CLSLEFTBAR";
      } else if (mode == "BACKMAINPAGE") {
        this.dlg = {
          title: ques,
          contentHtml: ans,
          subject: "BACKMAINPAGE"
        };
        this.openDialog("dlgname");
        this.dtl_close = "BACKMAINPAGE";
      } else if (mode == "ASKBEFOREOPENTAB") {
        this.dlg = {
          title: ques,
          contentHtml: ans,
          subject: "ASKBEFOREOPENTAB"
        };
        this.openDialog("dlgname");
        this.dtl_close = "ASKBEFOREOPENTAB";
      }

      var key = this.$ga_key.Planning_Tripplan_Cancel_Purpose;
      key.eventLabel = "Cancel Purpose:" + this.get_idEmp;
      this.$ga.event(key);
    },
    getPlanOfDate(key) {
      let qry_month = this.setFmDate(key, "MM");
      let qry_year = this.setFmDate(key, "YYYY");
      var formData = new FormData();
      formData.append("month", qry_month);
      formData.append("year", qry_year);
      this.$http
        .post(Vue.config["url"] + "/plan-of-date", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            this.events = data.body.success.data;
            this.show_progress = false;
          },
          response => {
            this.snk.vertical = "bottom";
            this.snk.txt_warning = "Error function getPlanOfDate";
            this.$refs.snackbar.open();
          }
        );
    },
    isDateInPast(date) {
      const currentDateWithoutTime = new Date().setHours(0, 0, 0, 0);
      const selectedDateWithoutTime = new Date(date).setHours(0, 0, 0, 0);

      return selectedDateWithoutTime < currentDateWithoutTime;
    },
    getStatusPlanOfMonth(key, month, year) {
      this.getTripplanOverview();
      var formData = new FormData();
      formData.append("month", month);
      formData.append("year", year);
      this.$http
        .post(Vue.config["url"] + "/approval-status", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            let rs = data.body.success.data;
            let interval_revise = data.body.success.interval_revise;
            this.arr_status_plan = rs.status;
            this.document_no = this.arr_status_plan.document_no;
            let now_year = this.setFmDate(new Date(), "YYYY");
            let now_month = this.setFmDate(new Date(), "MM");
            let now_day = this.setFmDate(new Date(), "D");
            let select_year = this.setFmDate(key, "YYYY");
            let select_month = this.setFmDate(key, "MM");
            let today, interval_amount;
            if (interval_revise.length != 0) {
              if (interval_revise[0].interval == "d") {
                today = now_day + now_month + now_year;
                interval_amount =
                  interval_revise[0].amount + now_month + now_year;
              } else if (interval_revise[0].interval == "m") {
                today = now_month + now_year;
                interval_amount = interval_revise[0].amount + now_year;
              } else if (interval_revise[0].interval == "y") {
                today = now_year;
                interval_amount = interval_revise[0].amount;
              }
            }
            if (
              this.arr_status_plan.short_name == "DRF" ||
              this.arr_status_plan.short_name == "REC" ||
              this.arr_status_plan.short_name == "RVP"
            ) {
              this.show_more_vert = true;
            } else {
              this.show_more_vert = false;
            }
            if (parseInt(select_year) < parseInt(now_year)) {
              this.disbled.plan_btn = 0;
              this.disbled.recall_btn = 0;
              this.disbled.revise_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
            } else if (
              parseInt(select_year) == parseInt(now_year) &&
              parseInt(select_month) < parseInt(now_month)
            ) {
              this.disbled.plan_btn = 0;
              this.disbled.recall_btn = 0;
              this.disbled.revise_btn = 0;
              this.disbled.edit_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
            } else if (
              parseInt(select_year) == parseInt(now_year) &&
              parseInt(select_month) == parseInt(now_month) &&
              (this.arr_status_plan.short_name == "WFA" ||
                this.arr_status_plan.short_name == "APV" ||
                this.arr_status_plan.short_name == "REJ")
            ) {
              if (this.arr_status_plan.short_name == "REJ") {
                this.disbled.edit_btn = 1;
              } else if (this.arr_status_plan.short_name == "WFA") {
                this.disbled.recall_btn = 1;
              } else if (this.arr_status_plan.short_name == "APV") {
                if (parseInt(today) <= parseInt(interval_amount)) {
                  this.disbled.revise_btn = 1;
                }
              }
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
            } else if (
              parseInt(select_year) >= parseInt(now_year) &&
              parseInt(select_month) >= parseInt(now_month) &&
              (this.arr_status_plan.short_name == "WFA" ||
                this.arr_status_plan.short_name == "APV" ||
                this.arr_status_plan.short_name == "REJ")
            ) {
              if (this.arr_status_plan.short_name == "REJ") {
                this.disbled.edit_btn = 1;
              } else if (this.arr_status_plan.short_name == "WFA") {
                this.disbled.recall_btn = 1;
              } else if (this.arr_status_plan.short_name == "APV") {
                if (parseInt(today) <= parseInt(interval_amount)) {
                  this.disbled.revise_btn = 1;
                }
              }
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
            } else if (
              parseInt(select_year) > parseInt(now_year) &&
              parseInt(select_month) <= parseInt(now_month) &&
              (this.arr_status_plan.short_name == "WFA" ||
                this.arr_status_plan.short_name == "APV" ||
                this.arr_status_plan.short_name == "REJ")
            ) {
              if (this.arr_status_plan.short_name == "REJ") {
                this.disbled.edit_btn = 1;
              } else if (this.arr_status_plan.short_name == "WFA") {
                this.disbled.recall_btn = 1;
              } else if (this.arr_status_plan.short_name == "APV") {
                if (parseInt(today) <= parseInt(interval_amount)) {
                  this.disbled.revise_btn = 1;
                }
              }
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
            } else {
              this.disbled.plan_btn = 1;
              this.disbled.recall_btn = 0;
              this.disbled.edit_btn = 0;
              this.disbled.revise_btn = 0;
            }
            if (rs.chief_saleman.length != 0) {
              this.bd.arr_salemans.push(rs.chief_saleman);
              this.bd.snk_salesman = rs.chief_saleman.emp_id;
              this.dp_saleman = rs.chief_saleman;
            } else {
              this.getMasterTripplan();
            }
            this.getPlanOfDate(this.currentDate);
          },
          response => {
            this.snk.vertical = "bottom";
            this.snk.txt_warning = "Error function getStatusPlanOfMonth";
            this.$refs.snackbar.open();
          }
        );
    },
    getTripplanOverview() {
      let year = this.setFmDate(this.currentDate, "YYYY");
      let month = this.setFmDate(this.currentDate, "MM");
      var formData = new FormData();
      formData.append("month", month);
      formData.append("year", year);
      this.$http
        .post(Vue.config["url"] + "/tripplan-overview", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {
          let rs = data.body.success.data;
          let re2 = data.body.success

          this.bd.txt_numoftrips = rs[0].amount;
          this.bd.txt_actvisits = rs[1].amount;
          this.bd.txt_avgdaily = rs[2].amount;
          this.bd.txt_totalact = rs[3].amount;
          this.bd.txt_intotalact = rs[4].amount;
          this.bd.txt_visitsucc = rs[5].amount;

          this.overview.success = re2.success
          this.overview.plan = re2.plan
          this.overview.active = re2.active




        });
    },
    setFmDate(val, fotmat) {
      return moment(String(val)).format(fotmat);
    },
    setFmTime(val) {
      return val < 10 ? "0" + val : val + "";
    },
    getAutoSearcCustomer() {
      this.limitData = "";
      let cust_id = "";
      for (let i = 0; i < this.arr_select_cust.length; i++) {
        cust_id = this.arr_select_cust[i].id + "," + cust_id;
      }
      if (this.bd.edt_show_name == null || this.bd.edt_show_name == "") {
        this.bd.edt_show_name = "";
      }
      var formData = new FormData();
      formData.append("plan_date", this.dPK.valDate);
      formData.append("keyword", this.bd.edt_show_name);
      formData.append("province", '');
      formData.append("cust_id", cust_id);
      formData.append("cust_id_select", this.cust_id_select);
      formData.append("start_row", this.scl.start_rows);
      formData.append("limit", this.limitData);
      formData.append("filter", this.dp_filter);
      this.$http
        .post(Vue.config["url"] + "/auto-search-cust", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {
          // this.show_spinner_loading = false;
          this.arr_customer = data.body.success.data;
        });
    },
    getMasterTripplan() {
      var formData = new FormData();
      formData.append("emp_code", Vue.localStorage.get("emp_code"));
      this.$http
        .post(Vue.config["url"] + "/master-tripplan", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            let arr = [];
            let province = data.body.success.data["province"];

            for (let i = 0; i < province.length; i++) {
              province[i].status_check = 0;
              // if (i == 0) {
              //   province[i].status_check = 1;
              //   this.bd.edt_select_prov = province[i].prov_code;
              // } else {
              //   province[i].status_check = 0;
              // }
            }
            this.arr_province = province;
            let purposeType = data.body.success.data["purposeType"];
            for (let i = 0; i < purposeType.length; i++) {
              purposeType[i].reason_desc = null;
              purposeType[i].status_check = 0;
            }
            this.bd.arr_purpose = purposeType;
            this.bd.arr_salemans = data.body.success.data["cheifSalesman"];
            if (this.bd.arr_salemans.length != 0) {
              if (this.arr_status_plan.short_name != "DRF") {
                this.bd.snk_salesman = this.dp_saleman.emp_id;
              } else {
                this.bd.snk_salesman = this.bd.arr_salemans[0].emp_id;
                this.dp_saleman.emp_code = this.bd.arr_salemans[0].emp_code;
                this.dp_saleman.emp_id = this.bd.arr_salemans[0].emp_id;
                this.dp_saleman.fullname = this.bd.arr_salemans[0].fullname;
              }
            } else {
              this.bd.snk_salesman = 0;
              this.show_select = true;
            }

            console.log('this.arr_province =>' , this.arr_province)
            // console.log(data.body.success.data["planType"])
            // this.arr_call_type = data.body.success.data["planType"];
            // let Call_Type = []
            // for (let index = 0; index < data.body.success.data["planType"].length; index++) {
            //   const element = data.body.success.data["planType"][index];
            //   if(element.store_selection === '1'){
            //    Call_Type.push(element)
            //   }
            // }
            // // console.log(Call_Type)
            // this.arr_call_type = Call_Type
            this.arr_call_type = data.body.success.data["planType"];
            // console.log(this.arr_call_type )
            // this.select_name = this.arr_call_type[0].name;
          },
          response => {
            this.snk.vertical = "bottom";
            this.snk.txt_warning = "Error function getMasterTripplan()";
            this.$refs.snackbar.open();
          }
        );
    },
    /*** ----Function for Side bar--------***/
    addPlanClick(key) {
      var key = this.$ga_key.Planning_Tripplan_AddPlan;
      key.eventLabel = "Add Plan From Calendar:" + this.get_idEmp;
      this.$ga.event(key);

      this.mdInputPlaceholder = "Customer Name";
      this.select_name = this.arr_call_type[0].name;
      this.setValDatePickerFromCarlendar(this.currentDate, "0");
      this.defaultLeftBar();
      this.defaultDataLeftbar(this.currentDate);
      this.$refs.leftSidenav.open();
      this.showMore = false;
      this.status_even = "ADD";
    },
    addTripplan() {
      this.mdInputPlaceholder = "Customer Name";
      this.select_name = this.arr_call_type[0].name;
      this.setValDatePickerFromCarlendar(this.currentDate, "1");
      this.defaultLeftBar();
      this.defaultDataLeftbar(new Date());
      this.$refs.leftSidenav.open();
      this.status_even = "ADD";

      var key = this.$ga_key.Planning_Tripplan_AddTripPlan;
      key.eventLabel = "ADD TRIP PLAN:" + this.get_idEmp;
      this.$ga.event(key);
      this.currentDate = new Date()
      console.log('>>>>>>>>>>>>>>', this.currentDate)
    },
    resetValueInSaidBar() {
      this.dPK.valDate = this.setFmDate(this.currentDate, "YYYY-MM-DD");
      this.defaultLeftBar();
    },
    defaultLeftBar() {
      this.bd.txt_btn_add = "ADD PLAN";
      this.bd.txt_btn_del = "RESET";
      this.bd.txt_header_sidnav = "ADD A TRIP PLAN";
      this.bd.edt_show_name = null;
      this.arr_select_cust = [];
      this.disbled.cust = 0;
      this.disbled.calltype = 0;
      this.dp_call_type = 1;
      this.dp_store_selection = 1;
      this.check_filter = false;
      this.mdStatic = true;
      this.mdInputPlaceholder = "Customer Name";
      for (let i = 0; i < this.bd.arr_purpose.length; i++) {
        this.bd.arr_purpose[i].status_check = 0;
        this.bd.arr_purpose[i].reason_desc = null;
      }
      this.bd.edt_description = "";
      this.bd.edt_other_reason = "";
      this.valueTime = {
        strHour: 8,
        startMinute: 0,
        endHour: 9,
        endMinute: 0,
        setMode: "",
        rangeTime: "",
        length: 6
      };
      this.ceckDateReson = 0;
      this.cust_id_select = null;
      if (this.arr_province.length > 0) {
        for (let i = 0; i < this.arr_province.length; i++) {
          this.arr_province[i].status_check = 0;
          this.arr_province[0].status_check = 1;
        }
      }
    },
    defaultDataLeftbar(key) {
      this.bd.default_edt = {
        cust: [],
        description: "",
        end_time_hour: "09",
        end_time_minute: "00",
        other_reason: "",
        plan_date: this.setFmDate(key, "YYYY-MM-DD"),
        plan_type_id: 1,
        reason: this.bd.arr_purpose,
        start_time_hour: "08",
        start_time_minute: "00",
        dp_filter: 2
      };
      this.cust_id_select = null;
      if (this.arr_province.length > 0) {
        for (let i = 0; i < this.arr_province.length; i++) {
          if (i == 0) {
            this.arr_province[i].status_check = 1;
            this.bd.edt_select_prov = this.arr_province[i].prov_code;
          } else {
            this.arr_province[i].status_check = 0;
          }
        }
        this.getAutoSearcCustomer();
      }
    },
    editPlan(day, event, jsEvent, num) {
      // console.log('>>>>>>>>>>>>>>>>',day, event, jsEvent, num)
      this.bd.keep_edit_plan = {
        day: day,
        event: event,
        jsEvent: jsEvent,
        num: num
      };
      if (!event.isShow) {
        return;
      }
      this.bd.edt_data = this.bd.keep_edit_plan.event;
      this.bd.txt_btn_add = "SAVE CHANGES";
      this.bd.keep_edit_plan.jsEvent.stopPropagation();
      this.currentDate = this.bd.keep_edit_plan.day.date;
      const crDate = new Date().setHours(0, 0, 0, 0);




      if (this.bd.keep_edit_plan.num == 1) {
        this.showMore = false;
      }
      if (this.$refs.leftSidenav.classes == "md-active") {
        let arr_id = [];
        let arr_name = [];
        let chk_purpose = true;
        let chk_desc = true;
        let chk_reas = true;
        let chk_cust = true;
        if (this.bd.txt_header_sidnav == "ADD A TRIP PLAN") {
          for (let i = 0; i < this.bd.arr_purpose.length; i++) {
            if (this.bd.arr_purpose[i].status_check == 1) {
              arr_id.push(this.bd.arr_purpose[i]);
            }
          }
          if (arr_id.length > 0) {
            chk_purpose = false;
          }
          if (this.arr_select_cust.length > 0) {
            chk_cust = false;
          }
          if (chk_cust == true && chk_purpose == true) {
            if (
              this.disbled.plan_btn == 1 &&
          this.bd.keep_edit_plan.event.status == "P" &&
          (this.bd.keep_edit_plan.day.date > new Date(crDate) ||
          this.bd.keep_edit_plan.day.isToday != false) &&
          (this.arr_status_plan.short_name != 'RVP' ||
          this.arr_status_plan.short_name != 'REC' ||
          this.arr_status_plan.short_name != 'DRF' )
            ) {
              this.bd.txt_btn_del = "DELETE";
              this.bd.txt_header_sidnav = "EDIT TRIP PLAN";
              this.disbled.cust = 0;
              this.disbled.calltype = 0;
              this.check_filter = false;
              this.mdStatic = true;
              this.status_even = "EDIT";
            } else {
              this.bd.txt_btn_del = "CANCEL";
              this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
              this.disbled.cust = 1;
              this.disbled.calltype = 1;
              this.check_filter = true;
              this.mdStatic = false;
              this.status_even = "VIEW";
            }
            console.log('---------->>> ',this.bd.keep_edit_plan.day.date < this.currentDate )
            this.dPK = {
              valDate: this.bd.keep_edit_plan.event.plan_date
            };
            this.getDetailOfPlan(this.bd.keep_edit_plan.event);
            this.defaultDataLeftbar(this.bd.keep_edit_plan.day.date);
          }
        } else {
          if (this.arr_select_cust.length != 1) {
            chk_cust = false;
          } else if (
            this.arr_select_cust[0].id != this.bd.default_edt.cust.id
          ) {
            chk_cust = false;
          }
          let str_id = "";
          for (let i = 0; i < this.bd.arr_purpose.length; i++) {
            if (this.bd.arr_purpose[i].status_check == 1) {
              arr_id.push(this.bd.arr_purpose[i]);
              str_id = str_id + this.bd.arr_purpose[i].id;
            }
            if (
              this.bd.arr_purpose[i].reason_desc != null &&
              this.bd.arr_purpose[i].reason_desc != ""
            ) {
              arr_name.push(this.bd.arr_purpose[i]);
            }
          }
          let arr_rea = this.bd.default_edt.reason.length;
          if (
            this.bd.default_edt.reason.length == 1 &&
            this.bd.default_edt.reason[0].reason_id == null
          ) {
            arr_rea = 0;
          }
          let check_dup = [];
          if (
            this.bd.default_edt.reason.length == 1 &&
            this.bd.default_edt.reason[0].reason_id == null &&
            (arr_id.length > 0 || arr_name.length > 0)
          ) {
            chk_purpose = false;
          } else if (arr_rea > arr_id.length || arr_rea < arr_id.length) {
            chk_purpose = false;
          } else if (
            this.bd.default_edt.reason.length >= 1 &&
            this.bd.default_edt.reason[0].reason_id != null
          ) {
            for (let i = 0; i < this.bd.default_edt.reason.length; i++) {
              if (
                str_id.indexOf(this.bd.default_edt.reason[i].reason_id) >= 0
              ) {
              } else {
                check_dup.push(false);
              }
            }
            if (check_dup.length > 0) {
              chk_purpose = false;
            } else {
              for (let i = 0; i < this.arr_reason_old.length; i++) {
                //arr_reason_old arr ที่เก็บค่าจาก api edit-plan
                for (let j = 0; j < arr_id.length; j++) {
                  if (this.arr_reason_old[i].reason_id == arr_id[j].id) {
                    if (
                      this.arr_reason_old[i].reason_desc !=
                      arr_id[j].reason_desc
                    ) {
                      chk_purpose = false;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        // all condition
        if (this.bd.default_edt.description != this.bd.edt_description) {
          if (
            (this.bd.default_edt.description == null ||
              this.bd.default_edt.description == "null") &&
            this.bd.edt_description == ""
          ) {
            chk_desc = true;
          } else {
            chk_desc = false;
          }
        }
        if (this.bd.default_edt.other_reason != this.bd.edt_other_reason) {
          if (
            (this.bd.default_edt.other_reason == null ||
              this.bd.default_edt.other_reason == "null") &&
            this.bd.other_reason == ""
          ) {
            chk_reas = true;
          } else {
            chk_reas = false;
          }
        }
        let select_cust = 0;
        let select_cust_old = 0;
        if (this.arr_customer_old.length > 0) {
          if (this.arr_customer_old[0].id == 0) {
            select_cust = 0;
            chk_cust = true;
          } else {
            select_cust = this.arr_select_cust[0].id;
          }
        }
        if (this.arr_select_cust.length > 0) {
          select_cust_old = this.arr_customer_old[0].id;
        }
        if (
          chk_desc == true &&
          chk_reas == true &&
          this.bd.default_edt.end_time_hour ==
            this.setFmTime(this.valueTime.endHour) &&
          this.bd.default_edt.end_time_minute ==
            this.setFmTime(this.valueTime.endMinute) &&
          this.bd.default_edt.start_time_hour ==
            this.setFmTime(this.valueTime.strHour) &&
          this.bd.default_edt.start_time_minute ==
            this.setFmTime(this.valueTime.startMinute) &&
          this.bd.default_edt.plan_type_id == this.dp_call_type &&
          this.bd.default_edt.plan_date == this.dPK.valDate &&
          chk_cust == true &&
          chk_purpose == true &&
          select_cust_old == select_cust
        ) {
          if (
            this.disbled.plan_btn == 1 &&
          this.bd.keep_edit_plan.event.status == "P" &&
          (this.bd.keep_edit_plan.day.date > new Date(crDate) ||
          this.bd.keep_edit_plan.day.isToday != false) &&
          (this.arr_status_plan.short_name != 'RVP' ||
          this.arr_status_plan.short_name != 'REC' ||
          this.arr_status_plan.short_name != 'DRF')
          ) {
            this.bd.txt_btn_del = "DELETE";
            this.bd.txt_header_sidnav = "EDIT TRIP PLAN";
            this.disbled.cust = 0;
            this.disbled.calltype = 0;
            this.check_filter = false;
            this.mdStatic = true;
            this.status_even = "EDIT";
          } else {
            this.bd.txt_btn_del = "CANCEL";
            this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
            this.disbled.cust = 1;
            this.disbled.calltype = 1;
            this.check_filter = true;
            this.mdStatic = false;
            this.status_even = "VIEW";
          }
          console.log('---------->>> ',this.bd.keep_edit_plan.day.date < new Date(crDate) )

          this.dPK = {
            valDate: this.bd.keep_edit_plan.event.plan_date
          };
          this.getDetailOfPlan(this.bd.keep_edit_plan.event);
          this.defaultDataLeftbar(this.bd.keep_edit_plan.day.date);
        } else {
          this.warningBeNotSaved("ASKBEFOREOPENTAB");
        }
      } else {
        if (
          this.disbled.plan_btn == 1 &&
          this.bd.keep_edit_plan.event.status == "P" &&
          (this.bd.keep_edit_plan.day.date > new Date(crDate) ||
          this.bd.keep_edit_plan.day.isToday != false) &&
          (this.arr_status_plan.short_name != 'RVP' ||
          this.arr_status_plan.short_name != 'REC' ||
          this.arr_status_plan.short_name != 'DRF')
        ) {
          this.bd.txt_btn_del = "DELETE";
          this.bd.txt_header_sidnav = "EDIT TRIP PLAN";
          this.disbled.cust = 0;
          this.disbled.calltype = 0;
          this.check_filter = false;
          this.mdStatic = true;
          this.status_even = "EDIT";
        } else {
          this.bd.txt_btn_del = "CANCEL";
          this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
          this.disbled.cust = 1;
          this.disbled.calltype = 1;
          this.check_filter = true;
          this.mdStatic = false;
          this.status_even = "VIEW";
        }
        console.log('---------->>> ',this.bd.keep_edit_plan.day, this.currentDate, this.arr_status_plan.short_name )

        this.dPK = {
          valDate: this.bd.keep_edit_plan.event.plan_date
        };
        this.getDetailOfPlan(this.bd.keep_edit_plan.event);
        this.defaultDataLeftbar(this.bd.keep_edit_plan.day.date);
      }


    },
    getDetailOfPlan(key) {
      this.bd.edt_data = [];
      this.arr_select_cust = [];
      for (let i = 0; i < this.bd.arr_purpose.length; i++) {
        this.bd.arr_purpose[i].status_check = 0;
        this.bd.arr_purpose[i].reason_desc = null;
      }
      var formData = new FormData();
      formData.append("plan_id", key.id);
      formData.append("type", key.status);
      formData.append("customer_id", key.customer_id);
      formData.append("customer_code", key.customer_code);
      formData.append("emp_id", Vue.localStorage.get("emp_id"));
      formData.append("actual_id", key.actual_id);
      formData.append("mode", "tripplan");
      this.$http
        .post(Vue.config["url"] + "/edit-plan", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {

          let rs = data.body.success.data;
          // console.log(rs , this.arr_status_plan.short_name)

          if(rs.status_type === "PA" || rs.status_type === "P" && this.arr_status_plan.short_name === 'APV') {
            this.disbled.btn_check_store_Selection = 1
          }else {
             this.disbled.btn_check_store_Selection = 0
          }
          // if( rs.store_selection == '0' && this.arr_status_plan.short_name === 'APV'){
          //   this.disbled.btn_check_store_Selection = 1
          // }else {
          //   this.disbled.btn_check_store_Selection = 0
          // }

          this.status_type = rs.status_type;
          this.arr_select_cust = [];
          this.arr_customer_old = [];
          this.arr_reason_old = [];
          this.bd.edt_data = rs;
          this.bd.default_edt = rs;
          this.arr_select_cust.push(rs.cust);
          this.arr_customer_old.push(rs.cust);
          this.arr_reason_old = rs.reason;
          this.dp_call_type = rs.plan_type_id;
          this.dp_store_selection = rs.plan_type_id;
          this.select_name = rs.plan_type_name;
          for (let i = 0; i < rs.reason.length; i++) {
            if (
              rs.reason[i].reason_id != null &&
              rs.reason[i].reason_id != ""
            ) {
              for (let k = 0; k < this.bd.arr_purpose.length; k++) {
                if (this.bd.arr_purpose[k].id == rs.reason[i].reason_id) {
                  this.bd.arr_purpose[k].status_check = 1;
                  this.bd.arr_purpose[k].reason_desc = rs.reason[i].reason_desc;
                  break;
                  // console.log("ying");
                }
              }
            }
          }
          this.bd.edt_description = rs.description;
          this.bd.edt_other_reason = rs.other_reason;
          this.valueTime = {
            strHour: parseInt(rs.start_time_hour),
            startMinute: parseInt(rs.start_time_minute),
            endHour: parseInt(rs.end_time_hour),
            endMinute: parseInt(rs.end_time_minute),
            setMode: "",
            rangeTime: "",
            length: 6
          };
          this.mdInputPlaceholder = "";
          this.$refs.leftSidenav.open();
          if (data.body.success.interval.length != 0) {
            this.interval_amount = data.body.success.interval[0].amount;
            this.interval_type = data.body.success.interval[0].interval;
          }
          let editDate = moment(rs.plan_date).format("YYYYMMDD");
          let type_chk = "days";
          if (this.interval_amount == "" || this.interval_type == "") {
            this.snk.txt_warning = "Please Config Interval to Update Actual";
            this.$refs.snackbar.open();
            this.snk.mode = "filter";
            this.interval_amount = 1; //defale == 1;
          } else {
            if (this.interval_type == "d") {
              //d == days
              type_chk = "days";
            } else if (this.interval_type == "m") {
              //m == months
              type_chk = "months";
            }
          }
          let curDate = moment(new Date())
            .subtract(type_chk, this.interval_amount)
            .format("YYYYMMDD");
          if (this.arr_status_plan.short_name == "APV") {
            if (parseInt(editDate) <= parseInt(curDate)) {
              this.ceckDateReson = 1;
            } else {
              this.ceckDateReson = 0;
            }
          } else if (
            this.arr_status_plan.short_name == "REJ" ||
            this.arr_status_plan.short_name == "WFA"
          ) {
            this.ceckDateReson = 1;
          } else {
            this.ceckDateReson = 0;
          }
          if (rs.store_selection == 0) {
            this.disbled.cust = 1;
            this.mdInputPlaceholder = "Customer Name";
            this.arr_select_cust = [];
          }
        });


    },
    closeLeftBar() {
      let arr_id = [];
      let arr_name = [];
      let chk_purpose = true;
      let chk_desc = true;
      let chk_reas = true;
      let chk_cust = true;
      if (this.bd.txt_header_sidnav == "ADD A TRIP PLAN") {
        for (let i = 0; i < this.bd.arr_purpose.length; i++) {
          if (this.bd.arr_purpose[i].status_check == 1) {
            arr_id.push(this.bd.arr_purpose[i]);
          }
        }
        if (arr_id.length > 0) {
          chk_purpose = false;
        }
        if (this.arr_select_cust.length > 0) {
          chk_cust = false;
        }
      } else {
        if (this.arr_select_cust.length != 1) {
          chk_cust = false;
        } else if (this.arr_select_cust[0].id != this.bd.default_edt.cust.id) {
          chk_cust = false;
        }
        let str_id = "";
        for (let i = 0; i < this.bd.arr_purpose.length; i++) {
          if (this.bd.arr_purpose[i].status_check == 1) {
            arr_id.push(this.bd.arr_purpose[i]);
            str_id = str_id + this.bd.arr_purpose[i].id;
          }
          if (
            this.bd.arr_purpose[i].reason_desc != null &&
            this.bd.arr_purpose[i].reason_desc != ""
          ) {
            arr_name.push(this.bd.arr_purpose[i]);
          }
        }
        let arr_rea = this.bd.default_edt.reason.length;
        if (
          this.bd.default_edt.reason.length == 1 &&
          this.bd.default_edt.reason[0].reason_id == null
        ) {
          arr_rea = 0;
        }
        let check_dup = [];
        if (
          this.bd.default_edt.reason.length == 1 &&
          this.bd.default_edt.reason[0].reason_id == null &&
          (arr_id.length > 0 || arr_name.length > 0)
        ) {
          chk_purpose = false;
        } else if (arr_rea > arr_id.length || arr_rea < arr_id.length) {
          chk_purpose = false;
        } else if (
          this.bd.default_edt.reason.length >= 1 &&
          this.bd.default_edt.reason[0].reason_id != null
        ) {
          for (let i = 0; i < this.bd.default_edt.reason.length; i++) {
            if (str_id.indexOf(this.bd.default_edt.reason[i].reason_id) >= 0) {
            } else {
              check_dup.push(false);
            }
          }
          if (check_dup.length > 0) {
            chk_purpose = false;
          } else {
            for (let i = 0; i < this.arr_reason_old.length; i++) {
              //arr_reason_old arr ที่เก็บค่าจาก api edit-plan
              for (let j = 0; j < arr_id.length; j++) {
                if (this.arr_reason_old[i].reason_id == arr_id[j].id) {
                  if (
                    this.arr_reason_old[i].reason_desc != arr_id[j].reason_desc
                  ) {
                    chk_purpose = false;
                    break;
                  }
                }
              }
            }
          }
        }
      }
      // all condition
      if (this.bd.default_edt.description != this.bd.edt_description) {
        chk_desc = false;
      }
      if (this.bd.default_edt.other_reason != this.bd.edt_other_reason) {
        chk_reas = false;
      }
      if (
        chk_desc == true &&
        chk_reas == true &&
        this.bd.default_edt.end_time_hour ==
          this.setFmTime(this.valueTime.endHour) &&
        this.bd.default_edt.end_time_minute ==
          this.setFmTime(this.valueTime.endMinute) &&
        this.bd.default_edt.start_time_hour ==
          this.setFmTime(this.valueTime.strHour) &&
        this.bd.default_edt.start_time_minute ==
          this.setFmTime(this.valueTime.startMinute) &&
        this.bd.default_edt.plan_type_id == this.dp_call_type &&
        this.bd.default_edt.plan_date == this.dPK.valDate &&
        chk_cust == true &&
        chk_purpose == true
      ) {
        this.closeDialog("purpose_dialog");
        this.$refs.leftSidenav.close();
        this.callTypeShow = "hide-tag call-body";
        this.purPoseShow = "hide-tag pur-body";
        show_call_type = false;
        show_pur_type = false;
      } else {
        this.warningBeNotSaved("CLSLEFTBAR");
      }
    },
    deletePlan(formData, mode) {
      var customer_id_select = 0;
      if (this.arr_select_cust.length > 0) {
        customer_id_select = this.arr_select_cust[0].id;
      }
      this.getDeletePlan(
        mode,
        this.bd.edt_data.id,
        customer_id_select,
        this.bd.edt_data.status
      );
    },
    getDeletePlan(mode, plan_id, customer_id, type) {
      var formData = new FormData();
      formData.append("plan_id", plan_id);
      formData.append("type", type);
      formData.append("customer_id", customer_id);
      this.$http
        .post(Vue.config["url"] + "/delete-plan", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {
          if (mode == "nav") {
            this.$refs.leftSidenav.close();
          }
          this.getPlanOfDate(this.currentDate);
          this.getTripplanOverview();
        });
    },
    removePlan(index, key) {
      this.arr_remove_plan = [];
      this.arr_remove_plan = key;
      this.showDlg("DELETECLD", true);
      this.events.splice(index, 1);
    },
    savePlan(formData) {
      let start_hour = this.setFmTime(this.valueTime.strHour);
      let start_minutes = this.setFmTime(this.valueTime.startMinute);
      let end_hour = this.setFmTime(this.valueTime.endHour);
      let end_minutes = this.setFmTime(this.valueTime.endMinute);
      let date_plan_out = moment(this.dPK.valDate).add(1, "days");
      if (end_hour == "00" && end_minutes == "00") {
        date_plan_out = this.setFmDate(date_plan_out, "YYYY-MM-DD");
      } else {
        date_plan_out = this.dPK.valDate;
      }
      formData.append("plan_date", this.dPK.valDate);
      formData.append(
        "plan_in",
        this.dPK.valDate + " " + start_hour + ":" + start_minutes
      );
      formData.append(
        "plan_out",
        date_plan_out + " " + end_hour + ":" + end_minutes
      );
      // formData.append('plan_out', this.dPK.valDate + " " + end_hour +':'+ end_minutes);
      formData.append("description", this.bd.edt_description);
      formData.append("approved", this.arr_status_plan.short_name);
      formData.append("other_reason", this.bd.edt_other_reason);
      formData.append("plan_type_id", this.dp_call_type);
      formData.append("store_selection", this.dp_store_selection);
      let reason_id = "";
      let reason_desc = "";
      for (let i = 0; i < this.bd.arr_purpose.length; i++) {
        if (this.bd.arr_purpose[i].status_check == 1) {
          reason_id = this.bd.arr_purpose[i].id + "," + reason_id;
          reason_desc = this.bd.arr_purpose[i].reason_desc + "##" + reason_desc;
        }
      }
      let cust_id = "";
      let cust_code = 0;
      for (let i = 0; i < this.arr_select_cust.length; i++) {
        cust_id = this.arr_select_cust[i].id + "," + cust_id;
        cust_code = this.arr_select_cust[i].customer_code + "," + cust_code;
      }
      formData.append("cust_id", cust_id);
      formData.append("cust_code", cust_code);
      formData.append("reason_id", reason_id);
      formData.append("reason_desc", reason_desc);
      formData.append("status_type", this.status_type);
      // console.log("reason_desc => ", reason_desc);
      this.$http
        .post(Vue.config["url"] + "/add-plan", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {
          let rs = data.body.data;
          if (rs.status_type != "A") {
            this.document_no = rs.document_no;
          }
          this.getPlanOfDate(this.currentDate);
          this.resetValueInSaidBar();
          this.$refs.leftSidenav.close();
          this.getTripplanOverview();
          this.closeDialog("purpose_dialog");
        });
    },
    emitSaveDatepicker(day) {
      let days = moment(String(this.currentDate)).daysInMonth();
      let year = this.setFmDate(this.currentDate, "YYYY");
      let month = this.setFmDate(this.currentDate, "MM");
      let rs = day.day < 10 ? "0" + day.day : day.day + "";
      let cDay = this.setFmDate(this.currentDate, "DD");
      this.dPK = {
        valDate: year + "-" + month + "-" + rs,
        valDateMin: year + "-" + month + "-" + "1",
        valDateMax: year + "-" + month + "-" + days
      };
      this.$emit("emitSaveDatepicker", day);

      var key = this.$ga_key.Planning_Tripplan_Change_Date;
      key.eventLabel = "Change Date:" + this.get_idEmp;
      this.$ga.event(key);
      if (rs < cDay) {
        this.ceckDateReson = 1;
      } else {
        this.ceckDateReson = 0;
      }
      // console.log('DATEEEEEEEEEEE', day, this.dPK, this.currentDate, rs, days, cDay)
    },
    emitSelectStartTime(obj) {
      if (obj.setMode == "start") {
        this.valueTime = {
          strHour: obj.strHour,
          startMinute: obj.startMinute,
          endHour: this.valueTime.endHour,
          endMinute: this.valueTime.endMinute,
          setMode: obj.setMode,
          rangeTime: "",
          length: 6
        };

        var key = this.$ga_key.Planning_Tripplan_Change_Time;
        key.eventLabel = "Change Time:" + this.get_idEmp;
        this.$ga.event(key);
      } else {
        this.valueTime = {
          strHour: this.valueTime.strHour,
          startMinute: this.valueTime.startMinute,
          endHour: obj.endHour,
          endMinute: obj.endMinute,
          setMode: obj.setMode,
          rangeTime: "",
          length: 6
        };
      }
      this.$emit("emitSelectStartTime", this.valueTime);
    },
    selectCallType() {
      let check_store_selection = false;
      for (var i = 0; i < this.arr_call_type.length; i++) {
        if (
          this.arr_call_type[i].id == this.dp_call_type &&
          this.arr_call_type[i].store_selection == 1
        ) {
          check_store_selection = true;
        }
      }
      if (check_store_selection == true) {
        this.disbled.cust = 0;
        this.check_filter = false;
      } else {
        this.disbled.cust = 1;
        this.bd.edt_show_name = null;
        this.arr_select_cust = [];
      }
    },
    selectCallTypeItem(items) {
      var key = this.$ga_key.Planning_Tripplan_CallType;
      key.eventLabel = "Call Type:" + this.get_idEmp;
      this.$ga.event(key);

      this.select_name = items.name;
      this.dp_call_type = items.id;
      this.dp_store_selection = items.store_selection;
      this.openSelectCalltype();
      let check_store_selection = false;
      this.disbled.cust = 1;
      if(items.store_selection == 1){
      // if (items.id == 1) {
        this.mdInputPlaceholder = "Customer Name";
        check_store_selection = true;
      }
      if (check_store_selection == true) {
        this.disbled.cust = 0;
        this.check_filter = false;
      } else {
        this.mdInputPlaceholder = "Customer Name";
        this.disbled.cust = 1;
        this.bd.edt_show_name = null;
        this.arr_select_cust = [];
      }
    },
    showDlg(value, mode) {
      // send socket io submit trip pland
      // this.$socket.emit("submit_pland", "23121");

      if (value == "RESET" && mode == true) {
        this.dlg = {
          title: "Do you want to reset the plan?",
          contentHtml: "Changes your made may be not saved.",
          subject: value
        };

        var key = this.$ga_key.Planning_Tripplan_Reset_Plan;
        key.eventLabel = "Reset Plan:" + this.get_idEmp;
        this.$ga.event(key);
        this.openDialog("dlgname");
      } else if (value == "ADD PLAN" && mode == true) {
        if (this.bd.edt_description) {
          var key = this.$ga_key.Planning_Tripplan_Input_Description;
          key.eventLabel = "Put Description:" + this.get_idEmp;
          this.$ga.event(key);
        }

        if (this.dp_store_selection == 1 && this.arr_select_cust.length == 0) {
          this.snk.txt_warning = "Please select Customer !";
          this.$refs.snackbar.open();
          this.snk.mode = "filter";
        } else {
          this.closeDialog("purpose_dialog");
          this.dlg = {
            title: "Do you want to save planing?",
            contentHtml:
              "<div class='text-center'> Add plan for " +
              this.setFmDate(this.dPK.valDate, "DD/MM/YYYY") +
              "<br> start time  " +
              this.setFmTime(this.valueTime.strHour) +
              " : " +
              this.setFmTime(this.valueTime.startMinute) +
              " until " +
              this.setFmTime(this.valueTime.endHour) +
              " : " +
              this.setFmTime(this.valueTime.endMinute) +
              "</div>",
            subject: value
          };
          this.openDialog("dlgname");
        }
      } else if (value == "SUBMIT" && mode == true) {
        if (this.bd.snk_salesman == 0) {
          this.snk.txt_warning =
            "Please select manager to submit for" + this.hd.text_dailog + "!";
          this.$refs.snackbar.open();
          this.snk.mode = "submit";
        } else if (this.events.length == 0) {
          this.snk.txt_warning = "Please add plan less than 1 days";
          this.$refs.snackbar.open();
          this.snk.mode = "submit";
        } else {
          if (typeof this.$refs.leftSidenav != "undefined") {
            this.$refs.leftSidenav.close();
          }
          var txtMsg = "";
          if (this.hd.text_dailog == "recall") {
            txtMsg = "Do you want to " + this.hd.text_dailog + " plan?";
          } else if (this.hd.text_dailog == "approval") {
            txtMsg =
              "Do you want to send plan for " + this.hd.text_dailog + "?";
          } else if (this.hd.text_dailog == "revise") {
            txtMsg = "Do you want to  " + this.hd.text_dailog + "?";
          } else {
            txtMsg = "Do you want to " + this.hd.text_dailog + " plan?";
          }
          this.dlg = {
            title: txtMsg,
            contentHtml:
              "<div class='text-center' > Plan of " +
              this.hd.title +
              "</br> sent to " +
              this.dp_saleman.emp_id +
              "  <span class='kanitFont'>" +
              this.dp_saleman.fullname +
              "</span> to " +
              this.hd.text_dailog +
              ".</div>",
            subject: value
          };
          this.openDialog("dlgname");
        }
      } else if (value == "DELETE" && mode == true) {
        this.dlg = {
          title: "Do you want delete plan?",
          contentHtml:
            "<div class='text-center'> Delete plan for " +
            this.setFmDate(this.dPK.valDate, "DD/MM/YYYY") +
            "<br> start time  " +
            this.setFmTime(this.valueTime.strHour) +
            " : " +
            this.setFmTime(this.valueTime.startMinute) +
            " until " +
            this.setFmTime(this.valueTime.endHour) +
            " : " +
            this.setFmTime(this.valueTime.endMinute) +
            "</div>",
          subject: value
        };
        this.openDialog("dlgname");
      } else if (value == "DELETECLD" && mode == true) {
        this.dlg = {
          title: "Do you want delete plan?",
          contentHtml:
            "<div class='text-center'> Delete plan of " +
            this.arr_remove_plan.title +
            " </br>" +
            this.setFmDate(this.currentDate, "DD") +
            " " +
            langSets["en"].monthNames[
              parseInt(this.setFmDate(this.currentDate, "MM")) - 1
            ] +
            " " +
            this.setFmDate(this.currentDate, "YYYY") +
            " " +
            "</div>",
          subject: value
        };
        this.openDialog("dlgname");
      } else if (value == "SAVE CHANGES" && mode == true) {
        if (this.dp_store_selection == 1 && this.arr_select_cust.length == 0) {
          this.snk.txt_warning =
            "Please select Customer and select call Type is visit!";
          this.$refs.snackbar.open();
          this.snk.mode = "filter";
        } else {
          this.dlg = {
            title: "Do you want to save planing?",
            contentHtml:
              "<div class='text-center'> Add plan for " +
              this.setFmDate(this.dPK.valDate, "DD/MM/YYYY") +
              "<br> start time  " +
              this.setFmTime(this.valueTime.strHour) +
              " : " +
              this.setFmTime(this.valueTime.startMinute) +
              " until " +
              this.setFmTime(this.valueTime.endHour) +
              " : " +
              this.setFmTime(this.valueTime.endMinute) +
              "</div>",
            subject: value
          };
          this.openDialog("dlgname");
        }
      } else if (value == "CANCEL" && mode == true) {
        this.closeLeftBar();
      } else if (value == "DELETEALL" && mode == true) {
        this.showMore = false;
        this.dlg = {
          title: "Do you want to clear your plan?",
          contentHtml:
            "<div class='text-center'> Clear the plan for " +
            this.setFmDate(this.currentDate, "DD/MM/YYYY") +
            "</div>",
          subject: value
        };
        this.openDialog("dlgname");
      } else if (value == "SWITCH PLAN" && mode == true) {
        //  if ( this.swicthdate_new < this.currentDate ) {
        //   this.ceckDateReson = 1;
        // }
        this.showMore = false;
        this.dlg = {
          title: "Do you want to switch your plan?",
          contentHtml:
            "<div class='text-center'>Switch the plan " +
            this.setFmDate(this.currentDate, "DD/MM/YYYY") +
            "<div class='text-center'> with " +
            this.setFmDate(this.swicthdate_new, "DD/MM/YYYY") +
            "</div>",
          subject: value
        };

        // let a = this.setFmDate(this.currentDate, "DD/MM/YYYY")
        // let b = this.setFmDate(this.swicthdate_new, "DD/MM/YYYY")
        // console.log('aaaaaaaaaaa', a, b)
        this.openDialog("dlgname");
      } else if (value == "MOVE PLAN" && mode == true) {
        this.showMore = false;
        let month_ = this.setFmDate(this.currentDate, "MM");
        let year_ = this.setFmDate(this.currentDate, "YYYY");
        this.dlg = {
          title: "Do you want to Move your plan?",
          contentHtml:
            "<div class='text-center'>Your trip plans from " +
            this.setFmDate(this.currentDate, "DD/MM/YYYY") +
            " to " +
            this.setFmDate(new Date(year_, month_, 0), "DD/MM/YYYY") +
            "<div class='text-center'> will be moved on " +
            this.setFmDate(this.swicthdate_new, "DD/MM/YYYY") +
            ", possibly with a combined trip.</div>",
          subject: value
        };
        this.openDialog("dlgname");
      }
    },
    submitDlg(type) {
      if (type == "ok") {
        if (this.dlg.subject == "RESET") {
          this.resetValueInSaidBar();
        } else if (this.dlg.subject == "ADD PLAN") {
          var formData = new FormData();
          formData.append("plan_id", "");
          formData.append("actual_id", "");
          this.savePlan(formData);
        } else if (this.dlg.subject == "SAVE CHANGES") {
          var formData = new FormData();
          formData.append("plan_id", this.bd.edt_data.id);
          formData.append("actual_id", this.bd.edt_data.actual_id);
          this.savePlan(formData);
        } else if (this.dlg.subject == "PURPOSE") {
          this.bd.arr_purpose[this.status_check_purpose].status_check = 0;
        } else if (this.dlg.subject == "SUBMIT") {
          var formData = new FormData();
          formData.append("chief_saleman", this.dp_saleman.emp_id);
          formData.append(
            "date_approve",
            this.setFmDate(this.currentDate, "YYYY-MM-DD")
          );
          formData.append("apv_status", this.set_status);
          formData.append("document_no", this.document_no);
          formData.append("month", this.setFmDate(this.currentDate, "MM"));
          formData.append("year", this.setFmDate(this.currentDate, "YYYY"));
          formData.append("emp_code", Vue.localStorage.get("emp_code"));
          formData.append("emp_id", Vue.localStorage.get("emp_id"));
          this.$http
            .post(Vue.config["url"] + "/sent-flow", formData, {
              headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
              }
            })
            .then(function(data) {
              let rs = data.body.success.data;
              if (rs.chief_saleman.length != 0) {
                this.bd.snk_salesman = rs.chief_saleman.emp_id;
                this.dp_saleman = rs.chief_saleman;
              } else {
                this.getMasterTripplan();
              }
              // this.bd.snk_salesman = rs.chief_saleman.emp_id
              this.arr_status_plan = rs.status;
              if (
                rs.status.short_name == "WFA" ||
                rs.status.short_name == "APV"
              ) {
                this.disbled.plan_btn = 0;
              }
              if (rs.status.short_name == "WFA") {
                this.disbled.recall_btn = 1;
                this.show_more_vert = false;
              } else if (
                rs.status.short_name == "REC" ||
                rs.status.short_name == "DRF" ||
                rs.status.short_name == "RVP"
              ) {
                this.disbled.recall_btn = 0;
                this.disbled.revise_btn = 0;
                this.disbled.plan_btn = 1;
                this.disbled.edit_btn = 0;
                this.mdInputPlaceholder = "Customer Name";
                this.check_filter = false;
                this.mdStatic = true;
                this.show_more_vert = true;
              }

              // socket

              this.$socket.emit("save_plan", []);
            });
          var formDataMail = new FormData();
          formDataMail.append("document_status", this.set_status);
          formDataMail.append(
            "salesman_emp_id",
            Vue.localStorage.get("emp_id")
          );
          formDataMail.append("manager_emp_id", this.dp_saleman.emp_id);
          formDataMail.append(
            "plan_date",
            this.setFmDate(this.currentDate, "YYYY-MM")
          );
          this.$http
            .post(Vue.config["url"] + "/sent-mail", formDataMail, {
              headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
              }
            })
            .then(function(data) {
              //sent-mail
            });
        } else if (this.dlg.subject == "DELETE") {
          this.deletePlan(formData, "nav");
        } else if (this.dlg.subject == "DELETECLD") {
          formData.append("cust_id", this.arr_remove_plan.id);
          this.deletePlan(formData, false);
        } else if (this.dlg.subject == "CLSLEFTBAR") {
          this.$refs.leftSidenav.close();
        } else if (this.dlg.subject == "COMMENT") {
          this.closeDialog(this.dtl_close + "_dialog");
        } else if (this.dlg.subject == "DELETEALL") {
          var plan_id = "";
          var customer_id = "";
          for (let plan = 0; plan < this.rsPlanAll.events.length; plan++) {
            plan_id += "," + this.rsPlanAll.events[plan].id;
            customer_id += "," + this.rsPlanAll.events[plan].customer_id;
          }
          if (this.rsPlanAll.events.length > 0) {
            this.getDeletePlan(false, plan_id, customer_id, "all");
          }
        } else if (this.dlg.subject == "SWITCH PLAN") {
          var plan_id = "";
          var cust_id = "";
          for (let plan = 0; plan < this.rsPlanAll.events.length; plan++) {
            plan_id += "," + this.rsPlanAll.events[plan].id;
            cust_id += "," + this.rsPlanAll.events[plan].customer_id;
          }
          var formData = new FormData();
          formData.append("plan_id_switch", plan_id);
          formData.append("cust_id_switch", cust_id);
          formData.append(
            "date_switch",
            this.setFmDate(this.currentDate, "YYYY-MM-DD")
          );
          formData.append("date_new", this.swicthdate_new);
          this.$http
            .post(Vue.config["url"] + "/switch-plan", formData, {
              headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
              }
            })
            .then(function(data) {
              this.getPlanOfDate(this.currentDate);
            });
        } else if (this.dlg.subject == "MOVE PLAN") {
          var plan_id = "";
          var cust_id = "";
          for (let plan = 0; plan < this.rsPlanAll.events.length; plan++) {
            plan_id += "," + this.rsPlanAll.events[plan].id;
            cust_id += "," + this.rsPlanAll.events[plan].customer_id;
          }
          var formData = new FormData();
          formData.append(
            "date_move",
            this.setFmDate(this.currentDate, "YYYY-MM-DD")
          );
          formData.append("date_new", this.swicthdate_new);
          this.$http
            .post(Vue.config["url"] + "/move-plan", formData, {
              headers: {
                Authorization: "Bearer " + Vue.localStorage.get("token")
              }
            })
            .then(function(data) {
              this.getPlanOfDate(this.currentDate);
            });
        } else if (this.dlg.subject == "BACKMAINPAGE") {
          this.dp_filter = 2;
          this.arr_select_cust = [];
          if (this.status_even == "EDIT") {
            this.arr_select_cust = this.arr_customer_old;
          } else if (this.status_even == "ADD") {
            this.bd.edt_show_name = "";
            this.mdInputPlaceholder = "Customer Name";
            this.cust_id_select = null;
            if (this.arr_province.length > 0) {
              for (let i = 0; i < this.arr_province.length; i++) {
                if (this.arr_province[i].status_check == 1) {
                  this.arr_province[i].status_check = 1;
                  this.arr_province[0].status_check = 0;
                } else {
                  this.arr_province[0].status_check = 1;
                }
              }
            }
          }

          this.setProvince();
          this.getAutoSearcCustomer();
          // this.show_spinner_loading=false;
          this.inactiveFilter = "hide-tag";
          this.inactiveMainView = "show-tag";
        } else if (this.dlg.subject == "ASKBEFOREOPENTAB") {
          if (
            this.disbled.plan_btn == 1 &&
            this.bd.keep_edit_plan.event.status == "P"
          ) {
            this.bd.txt_btn_del = "DELETE";
            this.bd.txt_header_sidnav = "EDIT TRIP PLAN";
            this.disbled.cust = 0;
            this.disbled.calltype = 0;
            this.check_filter = false;
            this.mdStatic = true;
          } else {
            this.bd.txt_btn_del = "CANCEL";
            this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
            this.disbled.cust = 1;
            this.disbled.calltype = 1;
            this.check_filter = true;
            this.mdStatic = false;
          }
          this.dPK = {
            valDate: this.bd.keep_edit_plan.event.plan_date
          };
          this.getDetailOfPlan(this.bd.keep_edit_plan.event);
          this.defaultDataLeftbar(this.bd.keep_edit_plan.day.date);
        }
      } else {
        if (this.dlg.subject == "COMMENT") {
          this.onOpen();
        }
      }
    },

    submitSnk() {
      if (this.snk.mode == "submit") {
        this.$refs.snk_salesman.$el.focus();
        this.bd.text_red = "red";
      } else if (this.snk.mode == "filter") {
        this.$refs.snk_customer.$el.select();
      } else if (this.snk.mode == "save") {
        this.$refs.snk_customer.$el.select();
      } else if (this.snk.mode == "duplicate") {
        this.$refs.snk_salesman.$el.focus();
      }
      this.$refs.snackbar.close();
    },
    open(ref) {
      this.check_sidenav = ref == "Left" ? true : false;
      this.hd.monthPickCls = "hide-tag month-body";
      check_month = true;
      this.hd.show_mh = false;
    },
    close(ref) {
      this.check_sidenav = ref == "Left" ? false : true;
      this.resetValueInSaidBar();
    },
    onOpen() {
      this.closeDialog("dlgname");
    },
    selectSales(key) {
      this.dp_saleman = key;
    },
    /*** Function for Dialog*/
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    /*** Function for Date Picker*/
    setFmDate(val, fotmat) {
      return moment(String(val)).format(fotmat);
    },
    setValDatePickerFromCarlendar(key, modeclick) {
      let now_year = this.setFmDate(new Date(), "YYYY");
      let select_year = this.setFmDate(key, "YYYY");
      let now_month = this.setFmDate(new Date(), "MM");
      let select_month = this.setFmDate(key, "MM");
      if (
        parseInt(select_year) >= parseInt(now_year) &&
        parseInt(select_month) >= parseInt(now_month)
      ) {
        let days = moment(String(key)).daysInMonth();
        if (
          parseInt(select_year) != parseInt(now_year) ||
          parseInt(select_month) != parseInt(now_month)
        ) {
          if (modeclick == "0") {
            this.dPK = {
              valDate: this.setFmDate(key, "YYYY-MM-DD"),
              valDateMin: select_year + "-" + select_month + "-1",
              valDateMax: select_year + "-" + select_month + "-" + days
            };
          } else {
            this.dPK = {
              valDate: select_year + "-" + select_month + "-01",
              valDateMin: select_year + "-" + select_month + "-1",
              valDateMax: select_year + "-" + select_month + "-" + days
            };
          }
        } else if (
          parseInt(select_year) == parseInt(now_year) ||
          parseInt(select_month) == parseInt(now_month)
        ) {
          if (modeclick == "1") {
            let days = moment(String(new Date()))
              .add(0, "M")
              .daysInMonth();
            this.dPK = {
              valDate: this.setFmDate(new Date(), "YYYY-MM-DD"),
              valDateMin: select_year + "-" + select_month + "-1",
              valDateMax: select_year + "-" + select_month + "-" + days
            };
          } else {
            this.dPK = {
              valDate: this.setFmDate(key, "YYYY-MM-DD"),
              valDateMin: select_year + "-" + select_month + "-1",
              valDateMax: select_year + "-" + select_month + "-" + days
            };
          }
        } else {
          this.dPK = {
            valDate: this.setFmDate(key, "YYYY-MM-DD"),
            valDateMin: select_year + "-" + select_month + "-1",
            valDateMax: select_year + "-" + select_month + "-" + days
          };
        }
        this.disbled.plan_btn = 1;
        this.disbled.recall_btn = 0;
        this.disbled.revise_btn = 0;
        this.disbled.edit_btn = 0;
      } else if (
        parseInt(select_year) == parseInt(now_year) &&
        parseInt(select_month) < parseInt(now_month)
      ) {
        let days = moment(String(new Date()))
          .add(0, "M")
          .daysInMonth();
        this.dPK = {
          valDate: this.setFmDate(new Date(), "YYYY-MM-DD"),
          valDateMin: select_year + "-" + select_month + "-1",
          valDateMax: select_year + "-" + select_month + "-" + days
        };
        this.disbled.plan_btn = 1;
        this.disbled.recall_btn = 0;
        this.disbled.revise_btn = 0;
        this.disbled.edit_btn = 0;
      } else if (
        parseInt(select_year) > parseInt(now_year) &&
        parseInt(select_month) <= parseInt(now_month)
      ) {
        let days = moment(String(key)).daysInMonth();
        if (modeclick == "0") {
          this.dPK = {
            valDate: this.setFmDate(key, "YYYY-MM-DD")
          };
        } else {
          this.dPK = {
            valDate: select_year + "-" + select_month + "-01",
            valDateMin: select_year + "-" + select_month + "-1",
            valDateMax: select_year + "-" + select_month + "-" + days
          };
        }
        this.disbled.plan_btn = 1;
        this.disbled.recall_btn = 0;
        this.disbled.revise_btn = 0;
        this.disbled.edit_btn = 0;
      } else {
        if (typeof this.$refs.leftSidenav != "undefined") {
          this.$refs.leftSidenav.close();
        }
        this.dPK = {
          valDate: this.setFmDate(this.currentDate, "YYYY-MM-DD")
        };
        this.disbled.plan_btn = 0;
        this.disbled.recall_btn = 0;
        this.disbled.revise_btn = 0;
        this.disbled.edit_btn = 0;
      }
    },

    /*** Function for outside*/
    outsideDate: function(e) {
      this.show_date = true;
    },
    outsideMonth: function(e) {
      if (e.target.className != "month-box") {
        this.icon_expand = "expand_more";
        this.hd.monthPickCls = "hide-tag month-body";
        check_month = true;
      }
      if (
        e.target.className != "md-icon mh-0  md-theme-default material-icons" &&
        e.target.className !=
          "md-backdrop md-menu-backdrop md-transparent md-active"
      ) {
      }
    },
    outsideCalendar: function(e) {
      if (
        e.target.className !=
          "md-backdrop md-menu-backdrop md-transparent md-active" &&
        e.target.className != "md-button md-button-ghost md-theme-default" &&
        e.target.className != "md-list md-theme-default"
      ) {
        this.showMore = false;
      }
    },
    outsideCallType: function(e) {
      if (
        e.target.className !=
        "md-icon md-title -gray-41 mt-0 left-pre30 color-gray-a4 md-theme-default material-icons"
      ) {
        this.callTypeShow = "hide-tag call-body";
        show_call_type = true;
      }
    },
    outsidePurPose: function(e) {
      if (
        e.target.className !=
        "md-icon md-title -gray-41 mt-0 left-pre30 color-gray-a4 md-theme-default material-icons"
      ) {
        this.purPoseShow = "hide-tag pur-body";
        show_pur_type = true;
      }
    },
    outsideComment: function(e) {
      if (
        e.target.className ==
        "md-icon -white -font-14 pt-5 md-theme-default material-icons"
      ) {
        if ((this.show_comment = true)) {
          this.setCloseComment();
        }
      }
      if (
        e.target.className !=
        "md-icon -white -font-14 pt-5 mr-icon-comment md-theme-default material-icons"
      ) {
        this.setCloseComment();
      }
    },
    openSelectCalltype() {
      // this.ceckDateReson = '1'
       let Call_Type = []
        if(this.arr_status_plan.short_name === 'APV'){
            for (let index = 0; index < this.arr_call_type.length; index++) {
              const element = this.arr_call_type[index];
              if(element.store_selection === '1'){
               Call_Type.push(element)
              }
            }
            // console.log(Call_Type)
            this.arr_call_type = Call_Type
        }
      if (show_call_type == true) {
        this.callTypeShow = "show-tag call-body";
        show_call_type = false;
      } else {
        this.callTypeShow = "hide-tag call-body";
        show_call_type = true;
      }
    },
    openSelectPurpose() {
      if (show_pur_type == true) {
        this.purPoseShow = "show-tag pur-body";
        show_pur_type = false;
      } else {
        this.purPoseShow = "hide-tag pur-body";
        show_pur_type = true;
      }
    },
    /**------Body Of Calendar*/
    goPrev() {
      this.bd.text_red = "";
      if (this.hd.show_mh == true) {
        this.currentDate = this.changeMonth(this.currentDate, -12);
      } else {
        this.randomYear("goPrev");
      }
      this.hd.txt_year = parseInt(dateFunc.format(this.currentDate, "yyyy"));
      this.dispatchEvent();
      this.setValDatePickerFromCarlendar(this.currentDate, "1");

      var key = this.$ga_key.Planning_Tripplan_CalendarPrevYear;
      key.eventLabel = "Calendar Prev Year:" + this.get_idEmp;
      this.$ga.event(key);
    },
    goNext() {
      this.bd.text_red = "";
      if (this.hd.show_mh == true) {
        this.currentDate = this.changeMonth(this.currentDate, 12);
      } else {
        this.randomYear("goNext");
      }
      this.hd.txt_year = parseInt(dateFunc.format(this.currentDate, "yyyy"));
      this.dispatchEvent();
      this.setValDatePickerFromCarlendar(this.currentDate, "1");

      var key = this.$ga_key.Planning_Tripplan_CalendarNextYear;
      key.eventLabel = "Calendar Next Year:" + this.get_idEmp;
      this.$ga.event(key);
    },
    changeMonth(date, num) {
      this.bd.text_red = "";
      let dt = new Date(date);
      let temp = '01-'+(dt.getMonth()+1)+'-'+dt.getFullYear()
      let dt2 =  new Date(temp)
      return new Date(dt2.setMonth(dt.getMonth() + num));
    },
    openMonthPicker() {
      if (check_month == true) {
        this.icon_expand = "expand_less";
        this.hd.monthPickCls = "show-tag month-body";
        check_month = false;
        this.hd.show_mh = true;
        this.showMore = false;
      } else {
        this.icon_expand = "expand_more";
        this.hd.monthPickCls = "hide-tag month-body";
        check_month = true;
        this.hd.show_mh = false;
      }

      var key = this.$ga_key.Planning_Tripplan_ShowMiniCalendar;
      key.eventLabel = "Show Mini Calendar:" + this.get_idEmp;
      this.$ga.event(key);
    },
    openYearPicker() {
      if (this.hd.show_mh == true) {
        this.hd.show_mh = false;
      } else {
        this.hd.show_mh = true;
      }
    },
    selectYear(key) {
      this.hd.show_mh = true;
      this.hd.txt_year = key;
      this.keepYear = key;
      let dt = new Date(this.currentDate);
      this.currentDate = new Date(dt.setYear(key));
      this.hd.title = dateFunc.format(
        this.currentDate,
        this.titleFormat,
        this.monthNames
      );
      this.setValDatePickerFromCarlendar(this.currentDate, "1");
    },
    randomYear(key) {
      let data_year = [];
      if (key == "goPrev") {
        let key_year = this.hd.arr_year[0];
        this.hd.arr_year = [];
        for (let i = 0; i < 12; i++) {
          this.hd.arr_year.push(key_year - 12 + i);
        }
      } else if (key == "goNext") {
        let key_year = this.hd.arr_year[this.hd.arr_year.length - 1];
        this.hd.arr_year = [];
        for (let i = 0; i < 12; i++) {
          this.hd.arr_year.push(key_year + 12 + i);
        }
      } else {
        let key_year = parseInt(dateFunc.format(new Date(), "yyyy"));
        for (let i = 0; i < 12; i++) {
          data_year.push(key_year - 6 + i);
        }
        return data_year;
      }
    },
    selectMonth(key) {
      this.setCloseComment();
      this.show_progress = true;
      let current_month = parseInt(dateFunc.format(this.currentDate, "M"));
      this.keepMomth = key.month_id;
      let select_month = key.month_id - current_month;
      this.icon_expand = "expand_more";
      this.currentDate = this.changeMonth(this.currentDate, select_month);
      this.dispatchEvent();
      this.hd.monthPickCls = "hide-tag month-body";
      check_month = true;
      this.changeStatusOfPlan(this.currentDate);
      this.setValDatePickerFromCarlendar(this.currentDate, "1");

      var key = this.$ga_key.Planning_Tripplan_CalendarSelectMonth;
      key.eventLabel = "Calendar Select Month:" + this.get_idEmp;
      this.$ga.event(key);
    },
    dispatchEvent() {

      this.hd.title = dateFunc.format(
        this.currentDate,
        this.titleFormat,
        this.monthNames
      );
      let startDate = dateFunc.getStartDate(this.currentDate);
      let curWeekDay = startDate.getDay();
      // 1st day of this monthView
      let diff = parseInt(this.firstDay) - curWeekDay;
      if (diff) diff -= 7;
      startDate.setDate(startDate.getDate() + diff);
      // the month view is 6*7
      let endDate = dateFunc.changeDay(startDate, 41);
      // 1st day of current month
      let currentDate = dateFunc.getStartDate(this.currentDate);
      this.$emit(
        "change",
        dateFunc.format(startDate, "yyyy-MM-dd"),
        dateFunc.format(endDate, "yyyy-MM-dd"),
        dateFunc.format(currentDate, "yyyy-MM-dd"),
        this.currentDate
      );
    },
    moreTitle(date) {
      let dt = new Date(date);
      let cur = new Date().setHours(0, 0, 0, 0);
      let cd = new Date(cur);

      if ( dt < cd ) {
        this.checkDate = 1
      }
      // console.log('><><><><><', dt, cd)
      return dt.getDate();
    },
    classNames(cssClass) {
      if (!cssClass) return "";
      // string
      if (typeof cssClass == "string") return cssClass;
      // Array
      if (Array.isArray(cssClass)) return cssClass.join(" ");
      // else
      return "";
    },
    getCalendar() {
      // calculate 2d-array of each month
      // first day of this month
      let now = new Date(); // today
      let current = new Date(this.currentDate);
      let startDate = dateFunc.getStartDate(current); // 1st day of this month
      let curWeekDay = startDate.getDay();
      // begin date of this table may be some day of last month
      let diff = parseInt(this.firstDay) - curWeekDay;
      diff = diff > 0 ? diff - 7 : diff;
      startDate.setDate(startDate.getDate() + diff);
      let calendar = [];
      for (let perWeek = 0; perWeek < 6; perWeek++) {
        let week = [];
        let chkCurMonth = this.setFmDate(new Date(this.currentDate), "MM");
        let i = 1;
        for (let perDay = 0; perDay < 7; perDay++) {
          let chkMonth = this.setFmDate(new Date(startDate), "MM");
          let rsDate = startDate.getDate();
          if (parseInt(chkMonth) != parseInt(chkCurMonth)) {
            rsDate = "";
          }
          week.push({
            monthDay: rsDate,
            isToday: now.toDateString() == startDate.toDateString(),
            isCurMonth: startDate.getMonth() == current.getMonth(),
            weekDay: perDay,
            date: new Date(startDate),
            events: this.slotEvents(startDate)
          });
          startDate.setDate(startDate.getDate() + 1);
        }
        calendar.push(week);
      }
      return calendar;
    },
    getTagLabel() {
      var formData = new FormData();
      formData.append("mode", "all");
      this.$http
        .post(Vue.config["url"] + "/get-taglabel", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(
          function(data) {
            let rs = data.body.success;
            this.bd.labelList = rs.PLN;
          },
          response => {}
        );
    },
    clearPlan(mode, val) {
      if (mode.taglabel == "CLEAR") {
        this.rsPlanAll = [];
        this.rsPlanAll = val;
        this.showDlg("DELETEALL", true);
      }
    },
    setShowDatePicker(dateselect) {
      this.dPK.valDate = this.setFmDate(dateselect, "YYYY-MM-DD");
      this.$emit("setShowDatePicker", dateselect);
    },
    evenMore(mode, val) {
      this.setShowDatePicker(this.currentDate);
      this.even_plan = mode.taglabel;
      var emp_id = Vue.localStorage.get("emp_id");

      if (mode.taglabel == "CLEAR") {
        var key = this.$ga_key.Planning_Tripplan_ClearPlan;
        key.eventLabel = "ClearPlan:" + this.get_idEmp;

        this.$ga.event(key);

        this.rsPlanAll = [];
        this.rsPlanAll = val;
        this.showDlg("DELETEALL", true);
      } else if (mode.taglabel == "SWITCH") {
        var key = this.$ga_key.Planning_Tripplan_SwitchPlan;
        key.eventLabel = "SwitchPlan:" + this.get_idEmp;
        this.$ga.event(key);

        this.show_datepicker = true;
        this.rsPlanAll = [];
        this.rsPlanAll = val;
      } else if (mode.taglabel == "MOVE") {
        var key = this.$ga_key.Planning_Tripplan_MovePlan;
        key.eventLabel = "MovePlan:" + this.get_idEmp;
        this.$ga.event(key);

        this.show_datepicker = true;
        this.rsPlanAll = [];
        this.rsPlanAll = val;
      }
    },
    switchDatepicker(day) {
      let days = moment(String(this.currentDate)).daysInMonth();
      let year = this.setFmDate(this.currentDate, "YYYY");
      let month = this.setFmDate(this.currentDate, "MM");
      let rs = (rs = this.setFmDate(this.currentDate, "d"));
      let cd = new Date();
      let cr = this.setFmDate(cd, "DD");
      if (day != true && day != false) {
        rs = day.day < 10 ? "0" + day.day : day.day + "";
      }
      if (day == true || rs == 0) {
        this.snk.txt_warning = "Select date that you want to switch";
        this.$refs.snackbar.open();
        this.snk.mode = "submit";
      }
      if ( rs < cr ) {
        day = true
        this.snk.txt_warning = "You can't do switch/move on the selected date.";
        this.$refs.snackbar.open();
        this.snk.mode = "submit";
      }
      this.dPK = {
        valDate: year + "-" + month + "-" + rs,
        valDateMin: year + "-" + month + "-" + "1",
        valDateMax: year + "-" + month + "-" + days
      };
      this.swicthdate_new = year + "-" + month + "-" + rs;
      this.$emit("switchDatepicker", day);
      this.show_datepicker = false;
      if (day != false && day != true && rs != 0) {
        if (this.even_plan == "SWITCH") {
          this.showDlg("SWITCH PLAN", true);
        } else if (this.even_plan == "MOVE") {
          this.showDlg("MOVE PLAN", true);
        }
      }
      // console.log('ssssssssssss', rs, cr)
    },

    closeMenuLabel() {
      status_show_menulabel = false;
    },
    openMenuLabel() {},
    outsideLabel: function(e) {},
    slotEvents(date) {
      // find all events start from this date
      let cellIndexArr = [];
      let thisDayEvents = this.events.filter(day => {
        let dt = new Date(day.start);
        let st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        let ed = day.end ? new Date(day.end) : st;
        // console.log('slotEvt', st, ed, date)
        return date >= st && date <= ed;
      });
      // mark cellIndex and place holder
      for (let i = 0; i < thisDayEvents.length; i++) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
        thisDayEvents[i].isShow = true;
        if (thisDayEvents[i].cellIndex == i + 1 || i > 2) continue;
        thisDayEvents.splice(i, 0, {
          title: "holder",
          cellIndex: i + 1,
          start: dateFunc.format(date, "yyyy-MM-dd"),
          end: dateFunc.format(date, "yyyy-MM-dd"),
          isShow: false
        });
      }
      return thisDayEvents;
    },
    isStart(eventDate, date) {
      let st = new Date(eventDate);
      return st.toDateString() == date.toDateString();
    },
    isEnd(eventDate, date) {
      let ed = new Date(eventDate);
      return ed.toDateString() == date.toDateString();
    },
    computePos(target) {
      let eventRect = target.getBoundingClientRect();
      let pageRect = this.$refs.dates.getBoundingClientRect();
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top
      };
    },
    openComment() {
      let year = this.setFmDate(this.currentDate, "YYYY");
      let month = this.setFmDate(this.currentDate, "MM");
      let mg_approve = []; //this.dp_saleman.emp_id;
      if (this.bd.arr_salemans.length != 0) {
        for (var i = 0; i < this.bd.arr_salemans.length; i++) {
          mg_approve.push(this.bd.arr_salemans[i].emp_id);
        }
      }
      let emp_code = Vue.localStorage.get("emp_code");
      let document_no = emp_code + year + month;

      var options = {};
      options = {
        month: month,
        year: year,
        mg_approve: mg_approve,
        document_no: document_no,
        emp_code: emp_code,
        emp_id: Vue.localStorage.get("emp_id"),
        msg_to: this.bd.snk_salesman,
        emp_id_login: Vue.localStorage
          .get("emp_id")
          .toString()
          .trim()
      };

      var key = this.$ga_key.Planning_Tripplan_OpenComment;
      key.eventLabel = "Open Comments:" + this.get_idEmp;
      this.$ga.event(key);

      this.doc_comment = options;
      setTimeout(() => {
        this.show_comment = true;
      }, 500);
    },
    setCloseComment() {
      this.show_comment = false;
    },
    gaSelectSendTo() {
      document.getElementById('Tripplan_sendto').click()
      console.log('select sent to')
      var key = this.$ga_key.Planning_Tripplan_SelectSendTo;
      key.eventLabel = "Select Send To:" + this.get_idEmp;
      this.$ga.event(key);
    },
    gaSelectDay() {
      var key = this.$ga_key.Planning_Tripplan_SelectDay;
      key.eventLabel = "Select a Day:" + this.get_idEmp;
      this.$ga.event(key);
    },
    gaSelectPlan() {
      var key = this.$ga_key.Planning_Tripplan_SelectPlan;
      key.eventLabel = "Select Plan:" + this.get_idEmp;
      this.$ga.event(key);
    },
    Expand_Overview( param ){

      if(param === 'active'){
        if( this.overview.expand_active) {
          this.overview.expand_active = false
        }else {
           this.overview.expand_active = true
        }
      }else  if(param === 'plan'){
        if( this.overview.expand_plan) {
          this.overview.expand_plan = false
        }else {
           this.overview.expand_plan = true
        }
      }
    },
     closeAllCust () {
      this.$refs['details-dialog'].close()
    },
    filter ( param ) {
      this.keyword2 = param
      let rs_search = []
      if(this.overview_list === 'Customer View'){
         for (let index = 0; index < this.full_overview_detail.length; index++) {
          const element = this.full_overview_detail[index]
          if(element.cust_code.indexOf(String(param)) != -1 || element.cust_name.indexOf(String(param)) != -1 ){
            rs_search.push(element)
          }
        }
        this.count_overview_detail = rs_search.length
        this.overview_detail = rs_search
      }else if(this.overview_list === 'Province View') {
        for (let index = 0; index < this.full_Pv_overview_detail.length; index++) {
          const element = this.full_Pv_overview_detail[index]
          if(element.cust_code.indexOf(String(param)) != -1 || element.cust_name.indexOf(String(param)) != -1){
            rs_search.push(element)
          }
        }
        this.count_overview_detail = rs_search.length
        this.Pv_overview_detail = rs_search
      }else {
        for (let index = 0; index < this.full_Od_overview_detail.length; index++) {
          const element = this.full_Od_overview_detail[index]
          if(element.cust_code.indexOf(String(param)) != -1 || element.cust_name.indexOf(String(param)) != -1){
            rs_search.push(element)
          }
        }
        this.count_overview_detail = rs_search.length
        this.Od_overview_detail = rs_search
      }
    },
    keywordCPR () {
      this.set_view('')
      this.keyword2 =''
      this.overview_detail = this.full_overview_detail
      this.Pv_overview_detail = this.full_Pv_overview_detail
      this.Od_overview_detail = this.full_Od_overview_detail
      this.count_overview_detail = this.full_overview_detail.length
    },
    tripplanOverviewDetail(param , param2){
      this.loading_overview = true
      var formData = new FormData();
      formData.append('year', String(param.year))
      formData.append('month', String(param.month))
      formData.append('view', String(param.view))
      formData.append('emp_id',String(param.emp_id))
    return Vue.http.post(Vue.config['url'] + '/tripplan-overview-detail', formData, {
      headers: {
        'Authorization': 'Bearer ' + Vue.localStorage.get('token')
      },
    }).then((response) => {

    // console.log(response)
      this.count_overview_detail = 0
      this.overview_detail = response.body.success.data
      this.full_overview_detail = response.body.success.data
      this.count_overview_detail = response.body.success.data.length
      this.Pv_overview_detail = response.body.success.data
      this.full_Pv_overview_detail = response.body.success.data
      this.Od_overview_detail = response.body.success.data
      this.full_Od_overview_detail = response.body.success.data
      // console.log(response.body.success.data.length)
      // return Promise.resolve(response.body.success);
       this.loading_overview = false
       if(param2 != ''){
           this.filter(param2)
       }

    }).catch((error) => Promise.reject(error));
    },
    open_dialog(){
      this.keyword2 = ''
      this.overview_detail = []
      this.Pv_overview_detail =[]
      this.Od_overview_detail =[]
      this.overview_list = 'Customer View'
      let year = this.setFmDate(this.currentDate, "YYYY")
      let month = this.setFmDate(this.currentDate, "MM")
      let res = {
        month:month,
        year:year,
        view: 'customer',
        emp_id:Vue.localStorage.get("emp_id")
      }
      this.tripplanOverviewDetail(res , '')
      this.$refs["details-dialog"].open()
    },
    set_view( param ){
      if(param === ''){
        this.keyword2 = ''
      }
      this.count_overview_detail = 0
      this.overview_detail = []
      this.Pv_overview_detail =[]
      this.Od_overview_detail =[]
      var view_rs = ''
      if(this.overview_list === 'Province View'){
        view_rs = 'province'
      }else  if(this.overview_list === 'Customer View') {
        view_rs = 'customer'
      }else {
        view_rs = 'order'
      }
      let year = this.setFmDate(this.currentDate, "YYYY")
      let month = this.setFmDate(this.currentDate, "MM")
      let res = {
        month:month,
        year:year,
        view: view_rs,
        emp_id:Vue.localStorage.get("emp_id")
      }

     this.tripplanOverviewDetail(res , this.keyword2)
    },
    set_view_calendar(){
      // Province View
      // Customer View
      // District View
    },
     sort_overview(param){
    if( this.overview_list === 'Customer View'){
       if(param === 'customer'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (Number(a.cust_code) > Number(b.cust_code)) ? -1 : 1)
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) => (Number(a.cust_code) > Number(b.cust_code)) ? 1 : -1)
              this.sort_by = 'ASC'
            }
       }
     if(param === 'current_plan'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (String((b.plan_date)) < String((a.plan_date)))  ? -1 : 1 )
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) =>(String((b.plan_date)) > String((a.plan_date)))  ? -1 : 1 )
              this.sort_by = 'ASC'
            }
       }
       if(param === 'previous_plan'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (String((b.previous_date)) < String((a.previous_date)))  ? -1 : 1 )
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) =>(String((b.previous_date)) > String((a.previous_date)))  ? -1 : 1 )
              this.sort_by = 'ASC'
            }
       }
        if(param === 'last_checkin'){
           if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (String((b.visit_date)) < String((a.visit_date)))  ? -1 : 1 )
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) =>(String((b.visit_date)) > String((a.visit_date)))  ? -1 : 1 )
              this.sort_by = 'ASC'
            }
       }

    }
    else if(this.overview_list === 'Province View') {

        if(param === 'customer'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (Number(a.cust_code) > Number(b.cust_code)) ? -1 : 1)
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) => (Number(a.cust_code) > Number(b.cust_code)) ? 1 : -1)
              this.sort_by = 'ASC'
            }
       }
         if(param === 'current_plan'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (String((b.plan_date)) < String((a.plan_date)))  ? -1 : 1 )
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) =>(String((b.plan_date)) > String((a.plan_date)))  ? -1 : 1 )
              this.sort_by = 'ASC'
            }
       }
        if(param === 'province'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => ((a.province) > (b.province)) ? -1 : 1)
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) => ((a.province) > (b.province)) ? 1 : -1)
              this.sort_by = 'ASC'
            }
       }
        if(param === 'district'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => ((a.district) > (b.district)) ? -1 : 1)
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) => ((a.district) > (b.district)) ? 1 : -1)
              this.sort_by = 'ASC'
            }
       }
    }
    else if(this.overview_list === 'Order View') {
       if(param === 'customer'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (Number(a.cust_code) > Number(b.cust_code)) ? -1 : 1)
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) => (Number(a.cust_code) > Number(b.cust_code)) ? 1 : -1)
              this.sort_by = 'ASC'
            }
       }

           if(param === 'current_plan'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (String((b.plan_date)) < String((a.plan_date)))  ? -1 : 1 )
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) =>(String((b.plan_date)) > String((a.plan_date)))  ? -1 : 1 )
              this.sort_by = 'ASC'
            }
       }

          if(param === 'order_value'){
          if(this.sort_by === 'ASC'){
              this.overview_detail.sort((a, b) => (Number(a.order_value) > Number(b.order_value)) ? -1 : 1)
              this.sort_by = 'DESC'
            }else {
              this.overview_detail.sort((a, b) => (Number(a.order_value) > Number(b.order_value)) ? 1 : -1)
              this.sort_by = 'ASC'
            }
       }
    }
    },
    floatFormat(val){
                if(val == null){
                  val = 0
                }
                return parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
               view( param ){
      // Province View
      // Customer View
      // District View
       if(this.overview_list_calendar === 'Customer View'){
         return param.title
       }else if(this.overview_list_calendar === 'Province View'){
         return param.province
       }else if(this.overview_list_calendar === 'District View') {
        return param.district
       }
    },
     view_code( param ){
      // Province View
      // Customer View
      // District View
       if(this.overview_list_calendar === 'Customer View'){
         return param.customer_code
       }else if(this.overview_list_calendar === 'Province View'){
         return param.province_code
       }else if(this.overview_list_calendar === 'District View') {
        return param.district_code
       }
    },
    filterCust: function (param){
      this.bd.edt_description = param
    },
  },
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "submit-btn": require("../Salesops/layout/btn"),
    "view-timepicker": require("../Salesops/fullTimePicker/ViewTimePicker"),
    "view-datepicker": require("../Salesops/fullDatePicker/ViewDatePicker"),
    "switch-datepicker": require("../Salesops/fullDatePicker/SwitchDatePicker"),
    'md-search-box': require('../Salesops/customComponent/md-ap-search-box'),
    "md-dropdown-box": require("../Salesops/customComponent/ap-dropdown-box"),
    "md-dropdown-box2": require("../Salesops/customComponent/ap-dropdown-box2"),
    DatePicker,
    TimePicker,
    comment
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
    },
    sticky: VueSticky
  }
};
</script>
<style lang="">
   .head-menu-setting:hover{
     background-color:#D1D1D1 !important
   }
   .md-sidenav .md-sidenav-content {
     width: 460px !important;
   }

   .md-sidenav .md-sidenav-content::-webkit-scrollbar {
      height: 7px;
      width: 8px;
      background: #f7f7f7;
    }
    .md-sidenav .md-sidenav-content::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.11);
      border-radius: 5px;
    }
    .disabled-button {
  background-color: gray;
  color: white;
  cursor: not-allowed;
}

.enabled-button {
  background-color: orange;
  color: white;
  cursor: pointer;
}
</style>
