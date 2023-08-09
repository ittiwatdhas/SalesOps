<template>
  <div class="pageApprove" id="pageApprove">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-progress
        v-show="show_progress"
        class="md-warn main-loading"
        :md-progress="1"
        md-indeterminate
      ></md-progress>
      <md-layout md-gutter class="mh-30 pt-10">
        <!--Start Layout Left-->
        <md-layout
        style="max-width: 500px;"
          md-column
          md-gutter
          md-flex-medium="30"
          md-flex-large="30"
          class="pr-20 pt-10"
        >
          <div class="mb-10">
            <md-layout>
              <md-layout md-flex-large="55">
                <span class="page-header pt-5">SALES TRIP PLAN</span>
              </md-layout>
              <md-layout md-flex-large="45" md-align="end">
                <md-select
                  id="movie"
                  placeholder="All status types"
                  v-model="bd.dp_status"
                  @change="selectStatus"
                  @click.native="gaSelectStatusType()"
                >
                  <md-option id="" value="ALL" class="latoFont"
                    >All status types</md-option
                  >
                  <md-option value="APPROVED" class="latoFont"
                    >Approved</md-option
                  >
                  <md-option value="PENDING" class="latoFont"
                    >Pending</md-option
                  >
                  <md-option value="WAITING" class="latoFont"
                    >Waiting</md-option
                  >
                  <md-option value="REJECTED" class="latoFont"
                    >Rejected</md-option
                  >
                </md-select>
              </md-layout>
            </md-layout>
          </div>
          <div class="height-40">
            <md-layout>
              <md-input-container class="-no-line -search mt-0">
                <md-icon>search</md-icon>
                <md-input
                  id="Approve_search_sales"
                  placeholder="Search salesman"
                  v-model="bd.edt_search"
                  v-on:change="autoSearch"
                  ref="snk_search"
                  @click.native="gaSearchSalesman()"
                ></md-input>
              </md-input-container>
            </md-layout>
          </div>
          <md-layout   md-align="start" md-flex="80" class="mt-10">
            <md-card  class="left-box">
              <md-card-content  class="pt-0 ph-0 height-794">
                <md-list    class="pt-0">
                  <div id="Approve_select_sales"></div>
                  <md-list-item
                   
                    v-for="(items, index) in bd.cust_list"
                    :key="items.id"
                    @click="getCarlendarBysale(items, index)"
                  >
                    <md-layout
                      
                      v-if="items.status_check == 'click'"
                      class="-bg-gray-EF"
                    >
                      <md-layout md-align="start" class="pl-18">
                        <md-avatar
                          v-if="items.department == 'MNG'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-5"
                        ></md-avatar>
                        <md-avatar
                          v-if="items.department == 'CHN'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-10"
                        ></md-avatar>
                        <md-avatar
                          v-if="items.department == 'SUP'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-15"
                        ></md-avatar>
                        <md-avatar
                          v-if="items.department == 'SM'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-35"
                        ></md-avatar>
                        <span class="body-primary-text mt-3 ml-5">
                          {{ items.emp_id }}
                          <span class="pl-5 body-primary-text-kanit">{{
                            items.first_name
                          }}</span>
                        </span>
                      </md-layout>
                      <md-layout
                    
                        md-flex="25"
                        md-align="end"
                        class="mr-10 mt-13"
                      >
                        <md-chip
                          v-if="items.status == 'APPROVED'"
                          class="-green -rectangle -small pr-0 latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="items.status == 'PENDING'"
                          class="-gray-A8 -rectangle -small latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="items.status == 'WAITING'"
                          class="-gray-A8 -rectangle -small latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="items.status == 'REJECTED'"
                          class="-red -rectangle -small pr-0 pl-0 latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                      </md-layout>
                    </md-layout>
                    <md-layout
                   
                      v-if="items.status_check == 'unclick'"
                      class="pl-18"
                    >
                      <md-layout  md-align="start">
                        <md-avatar
                          v-if="items.department == 'MNG'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-5"
                        ></md-avatar>
                        <md-avatar
                          v-if="items.department == 'CHN'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-10"
                        ></md-avatar>
                        <md-avatar
                          v-if="items.department == 'SUP'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-15"
                        ></md-avatar>
                        <md-avatar
                          v-if="items.department == 'SM'"
                          class="md-avatar-icon _icon-status-rec -gray mr-5 ml-35"
                        ></md-avatar>
                        <span class="body-primary-text mt-3 ml-5">
                          {{ items.emp_id }}
                          <span class="pl-5 body-primary-text-kanit">{{
                            items.first_name
                          }}</span>
                        </span>
                      </md-layout>
                      <md-layout
                        md-flex="25"
                        md-align="end"
                        class="mr-10 mt-13"
                      >
                        <md-chip
                          v-if="items.status == 'APPROVED'"
                          class="-green -rectangle -small pr-0 latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="items.status == 'PENDING'"
                          class="-gray-A8 -rectangle -small latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="items.status == 'WAITING'"
                          class="-gray-A8 -rectangle -small latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="items.status == 'REJECTED'"
                          class="-red -rectangle -small pr-0 pl-0 latoFont"
                        >
                          <b>{{ items.status }}</b>
                        </md-chip>
                      </md-layout>
                    </md-layout>
                  </md-list-item>
                </md-list>
              </md-card-content>
            </md-card>
          </md-layout>
        </md-layout>
        <!--End Layout Left-->
          <!-- dialog -->
            <md-dialog   id="all_cust_dialog_ap"  ref="details-dialog" >
              <md-dialog-title
                  style="font-weight: 500;background:#EFEFEF;color:#414141;font-size:16px;padding-bottom:15px;padding-top:15px;"
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
                    <md-layout :style="{'pointer-events' : loading_overview ?  'none' : ''}" md-flex="55" md-align="end">
                      <div style="padding:0 0 0 20px;width: 40%;">  
                        <md-dropdown-box :data="select_overview" @choose="set_view" v-model="overview_list"></md-dropdown-box>
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
        <!--Start Layout Right-->
        <md-layout style="margin:0 0 0 30px" md-column md-gutter md-flex-medium="65" md-flex-large="65">
          <div style="max-width: 1500px;" class="comp-full-calendar mt-20 pt-10">
            <!-- Start Header Calendar -->
            <div class="full-calendar-header">
              <md-layout md-flex="40">
                 <md-layout> 
                   <div class="" style="flex: 0 !important ; background-color:">
                        <md-button
                        @click="
                          gaClickChat();
                          openComment();
                        "
                        class="width-2 z-index-0"
                        v-if="btn_comment"
                        style="
                          margin:0px;
                          min-width: 35px !important ;
                          height: 30px;
                          padding: 0px 0px;
                          border-radius: 20px;
                          text-align: center;
                          font-size: 12px;
                          line-height: 1.42857;">
                        <div class="md-avatar md-avatar-icon _icon-status -large icn-gray md-theme-default">
                          <md-icon  class="icn-gray -font-14 pt-5">mode_comment</md-icon>
                        </div>
                      </md-button>
                    </div> 

                   <div class="header-left" style="flex: 0 !important;background-color:">
                        <md-button
                        @click="openPlanDetail()"
                        class="width-2 z-index-0"
                        v-if="btn_comment"
                        style="
                          margin:0px;
                          min-width: 40px !important ;
                          padding:0px 0px 10px 0px;
                          border-radius: 20px;
                          text-align: center;
                          font-size: 20px;
                          line-height: 1.42857;">
                           <md-icon style="color:#fd7f00" class="-font-25 pt-0">info</md-icon>
                        
                      </md-button>
                    </div>  

                     <div v-if="btn_comment" style="z-index:5;margin:0 0 0px 10px ;flex:0.88; !important;">  
                        <div class="drop" >
                           <md-dropdown-box2 style="width:100%"  :data="select_View_Calendar" @choose="set_view_calendar" v-model="overview_list_calendar"></md-dropdown-box2>
                        </div>
                       
                      </div>
                 </md-layout>
                <!-- <div class="header-left" style="flex: 0 !important">
                  <md-button
                    @click="
                      gaClickChat();
                      openComment();
                    "
                    class="width-2 z-index-0"
                    v-if="btn_comment"
                    style="
                      min-width: 36px !important ;
                      height: 30px;
                      padding: 0px 0px;
                      border-radius: 20px;
                      text-align: center;
                      font-size: 12px;
                      line-height: 1.42857;
                    "
                  >
                    <div
                      class="md-avatar md-avatar-icon _icon-status -large icn-gray md-theme-default"
                    >
                      <md-icon class="-white -font-14 pt-5"
                        >mode_comment</md-icon
                      >
                    </div>
                  </md-button>
                </div> -->
              </md-layout>
              <md-layout md-flex="20">
                <!-- Start Month Picker-->
                <div class="header-center" v-click-outside="outsideMonth">
                  <md-button
                    @click="
                      gaSelectMonth();
                      openMonthPicker();
                    "
                    class="width-245 right-65 z-index-0"
                  >
                    <span class="pt-10 section-header">
                      <b>{{ hd.title }}</b>
                    </span>
                    <md-icon class="ml-8 mb-5 -gray-41">{{
                      icon_expand
                    }}</md-icon>
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
                            <md-button
                              class="pr-20 pl-10"
                              @click="openYearPicker"
                            >
                              <label class="md-body-2 pl-18">
                                <span class="body-primary-text pt-10">{{
                                  hd.txt_year
                                }}</span>
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
                            v-for="items in hd.arr_months"
                            :key="items.id"
                            :class="
                              keepMomth == items.month_id
                                ? 'month-layout current'
                                : 'month-layout'
                            "
                            v-if="hd.show_mh == true"
                          >
                            <div
                              :class="
                                keepMomth == items.month_id
                                  ? 'month-box latoFont current'
                                  : 'month-box latoFont'
                              "
                              @click="selectMonth(items)"
                            >
                              {{ items.month_name }}
                            </div>
                          </md-layout>
                          <md-layout
                            md-align="center"
                            v-for="items in hd.arr_year"
                            :key="items.id"
                            :class="
                              keepYear == items
                                ? 'month-layout current'
                                : 'month-layout'
                            "
                            v-if="hd.show_mh == false"
                          >
                            <div
                              :class="
                                keepYear == items
                                  ? 'month-box latoFont current'
                                  : 'month-box latoFont'
                              "
                              @click="selectYear(items)"
                            >
                              {{ items }}
                            </div>
                          </md-layout>
                        </md-layout>
                      </md-card-content>
                    </md-card>
                  </md-layout>
                </div>
                <!-- End Month Picker-->
              </md-layout>
              <md-layout md-flex="40">
                <div class="header-right">
                  <md-layout md-align="end">
                    <md-button
                   
                      class="md-raised   -orange"
                      @click="showDlg('REJECT', true)"
                      v-if="disbled.plan_btn == 1"
                    >
                      <md-icon md-align="end">close</md-icon>
                      <label class="pl-18">
                        <b>REJECT</b>
                      </label>
                    </md-button>


                    <md-button
                      class="md-raised   -orange"
                      @click="showDlg('APPROVED', true)"
                      v-if="disbled.plan_btn == 1"
                    >
                      <md-icon md-align="end">done</md-icon>
                      <label class="pl-18">
                        <b>APPROVED</b>
                      </label>
                    </md-button>


                  </md-layout>
                </div>
              </md-layout>
            </div>
            <!-- End Header Calendar -->
            <div class="full-calendar-body">
              <div class="weeks">
                <strong
                  class="week latoFont"
                  v-for="week in weekNames"
                  :key="week.id"
                  >{{ week }}</strong
                >
              </div>
              <div class="dates" ref="dates">
                <div class="dates-bg">
                  <div
                    class="week-row"
                    v-for="week in currentDates"
                    :key="week.id"
                  >
                    <div
                      class="day-cell"
                      v-for="day in week"
                      :key="day.id"
                      :class="{
                        today: day.isToday,
                        'not-cur-month': !day.isCurMonth,
                      }"
                    >
                      <p class="day-number latoFont">{{ day.monthDay }}</p>
                    </div>
                  </div>
                </div>

                <!-- absolute so we can make dynamic td -->
                <div class="dates-events">
                  <div
                    class="events-week"
                    v-for="week in currentDates"
                    :key="week.id"
                  >
                    <div
                      class="events-day"
                      v-for="day in week"
                      :key="day.id"
                      track-by="$index"
                      :class="{
                        today: day.isToday,
                        'not-cur-month': !day.isCurMonth,
                      }"
                      @click.stop="
                        gaSelectDay();
                        selectThisDay(day, $event, '');
                      "
                    >
                      <p
                        class="day-number latoFont"
                        @click.stop="
                          gaSelectDay();
                          selectThisDay(day, $event, 'head');
                        "
                      >
                        {{ day.monthDay }}
                      </p>
                      <div class="event-box">
                        <div
                          class="event-item"
                          v-for="event in day.events"
                          :key="event.id"
                          v-show="event.cellIndex <= eventLimit"
                          :class="[
                            classNames(event.cssClass),
                            {
                              'is-start': isStart(event.start, day.date),
                              'is-end': isEnd(event.end, day.date),
                              'is-opacity': !event.isShow,
                            },
                          ]"
                          @click="
                            gaSelectPlan();
                            editPlan(day, event, $event, 1);
                          "
                            :style="{ 'background-color':event.even_color + '!important'}"
                        >
                          <md-layout
                            v-show="event.isShow"
                            v-if="event.status != 'P'"
                            class="body-item"
                          >
                            <md-layout
                              md-flex="70"
                              md-align="start"
                              class="pl-5"
                            >
                              <div
                                class="-list-block kanitFont font-weight-100"
                              >
                                {{ view(event) }}
                              </div>
                              <md-tooltip
                                md-direction="top"
                                class="kanitFont font-weight-100"
                                >{{
                                  view_code(event) + " : " +  view(event) 
                                }}</md-tooltip
                              >
                            </md-layout>


                            <md-layout
                              md-flex="20"
                              md-align="end"
                              class="latoFont"
                              >{{ event.status }}</md-layout
                            >
                          </md-layout>
                          <md-layout
                            v-show="event.isShow"
                            v-if="event.status == 'P'"
                            class="body-item"
                             :style="{ 'background-color':event.even_color + '!important'}"
                          >
                            <md-layout
                              md-flex="70"
                              md-align="start"
                              class="pl-5"
                            >
                              <div
                                class="-list-block kanitFont font-weight-100"
                              >
                                 {{ view(event) }}
                              </div>
                              <md-tooltip
                                md-direction="top"
                                class="kanitFont font-weight-100"
                                >{{
                                  view_code(event) + " : " + view(event)
                                }}</md-tooltip
                              >
                            </md-layout>
                            <md-layout
                              md-flex="20"
                              md-align="end"
                              class="latoFont"
                              >{{ event.status }}</md-layout
                            >
                          </md-layout>
                        </div>
                        <p
                          v-if="day.events.length > eventLimit"
                          style="
                            margin-top: 5px;
                            text-align: left;
                            font-size: 12px;
                            color: rgba(0, 0, 0, 0.87);
                          "
                          class="more-link show-tag"
                        >
                          {{
                            day.events[day.events.length - 1].cellIndex -
                            eventLimit
                          }}
                          more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- full events when click show more -->
                <div
                  v-click-outside="outsideCalendar"
                  class="more-events"
                  v-show="showMore"
                  :style="{
                    left: morePos.left + 'px',
                    top: morePos.top + 'px',
                  }"
                >
                  <div class="more-header" md-align="end">
                    <span
                      class="title mr-5 pr-5 text-right"
                      @click.stop="showMore = false"
                      >{{ moreTitle(selectDay.date) }}</span
                    >
                  </div>
                  <div class="more-body">
                    <ul class="body-list">
                      <div
                        v-for="event in selectDay.events"
                        :key="event.id"
                        @click="editPlan(selectDay, event, $event, 2)"
                      >
                        <md-layout
                          v-show="event.isShow"
                          v-if="event.status != 'P'"
                          class="body-item status-plan-pa"
                           :style="{ 'background-color':event.even_color + '!important'}"
                        >
                          <md-layout md-flex="80" md-align="start" class="pl-5">
                            <div class="-list-block kanitFont font-weight-100">
                              {{ view(event) }}
                            </div>
                            <md-tooltip
                              md-direction="top"
                              class="kanitFont font-weight-100"
                              >{{
                                view_code(event) + " : " + view(event)
                              }}</md-tooltip
                            >
                          </md-layout>
                          <md-layout
                            md-flex="20"
                            md-align="end"
                            class="pr-10 latoFont"
                            >{{ event.status }}</md-layout
                          >
                        </md-layout>
                        <md-layout
                          v-show="event.isShow"
                          v-if="event.status == 'P'"
                          class="body-item status-plan-p"
                           :style="{ 'background-color':event.even_color + '!important'}"
                        >
                          <md-layout md-flex="80" md-align="start" class="pl-5">
                            <div class="-list-block kanitFont font-weight-100">
                              {{ view(event) }}
                            </div>
                            <md-tooltip
                              md-direction="top"
                              class="kanitFont font-weight-100"
                              >{{
                               view_code(event) + " : " + view(event)
                              }}</md-tooltip
                            >
                          </md-layout>
                          <md-layout
                            md-flex="20"
                            md-align="end"
                            class="pr-10 latoFont"
                            >{{ event.status }}</md-layout
                          >
                        </md-layout>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </md-layout>
        <!--End Layout Right-->
      </md-layout>
      <!--Start Main Layout-->
      <md-sidenav
        class="md-left md-fixed z-index-10 po-fixed"
        ref="leftSidenav"
        @open="open('Left')"
        @close="close('Left')"
      >
        <md-card class="-noshadow">
          <md-card-header class="-orange">
            <md-card-header-text>
              <div class="md-title mh-30 latoFont">
                {{ bd.txt_header_sidnav }}
              </div>
            </md-card-header-text>
            <md-button class="md-icon-button" @click="closeLeftBar">
              <md-icon class="-white">close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-card-header>
          <md-card-content class="mh-40 pt-10 ph-0 pb-30">
            <md-input-container class="md-chips mb-0">
              <md-chip
                class="kanitFont longCust"
                v-for="chip in arr_select_cust"
                :key="chip.id"
                :md-editable="mdStatic"
                :md-deletable="mdStatic"
              >
                <slot name="chip" :value="chip.id"
                  >{{ chip.customer_code }} : {{ chip.customer_name_th }}</slot
                >
                <md-tooltip md-direction="top" class="kanitFont"
                  >{{ chip.customer_code }} :
                  {{ chip.customer_name_th }}</md-tooltip
                >
              </md-chip>
              <md-input
                class="text-display"
                v-show="mdStatic"
                v-model.trim="bd.edt_show_name"
                :type="mdInputType"
                :placeholder="mdInputPlaceholder"
                :disabled="disbled.cust == 1 ? true : false"
                tabindex="0"
              ></md-input>
              <slot></slot>
            </md-input-container>
            <md-layout class="mv-10">
              <md-layout md-flex="100">
                <label class="header3">Call Type</label>
              </md-layout>
              <md-layout class="-calltypeDisable mb-20" md-gutter>
                <md-layout md-flex="80">
                  <span class="md-title -font-16 latoFont -gray-41 mt-0">{{
                    select_name
                  }}</span>
                </md-layout>
                <md-layout md-align="end">
                  <md-button
                    :disabled="disbled.calltype == 1 ? true : false"
                    class="md-icon-button pt-0 ph-0 mh-0 height-20"
                  >
                    <md-icon
                      class="md-title -gray-41 mt-0 left-per30 color-gray-a4"
                      >arrow_drop_down</md-icon
                    >
                  </md-button>
                </md-layout>
              </md-layout>
            </md-layout>
            <md-layout md-gutter>
              <!--Start Date And Time Picker-->
              <md-layout
                md-flex-large="40"
                md-flex-medium="40"
                md-align="center"
              >
                <view-datepicker
                  v-if="bd.txt_header_sidnav == 'VIEW TRIP PLAN'"
                  :value="dPK.valDate"
                ></view-datepicker>
              </md-layout>
              <md-layout
                md-flex-large="45"
                md-flex-medium="45"
                md-align="center"
              >
                <view-timepicker
                  v-if="bd.txt_header_sidnav == 'VIEW TRIP PLAN'"
                  :value="valueTime"
                ></view-timepicker>
              </md-layout>
              <!--End Date And Time Picker-->
            </md-layout>
            <md-layout class="mt-20">
              <span class="section-header font-weight-400"
                >Reason for visit</span
              >
            </md-layout>
            <md-card class="-large mt-10 -round-border -gray-DD">
              <md-list class="pv-0">
                <md-list-item
                  v-for="(items, index) in bd.arr_purpose"
                  :key="items.id"
                  class="-border height-list"
                  @click="gaSelectReason()"
                >
                  <md-layout md-flex="70" class>
                    <div class="md-list-text-container defaultCls">
                      <span
                        class="body-primary-text"
                        style="padding-left: 15px"
                        >{{ items.name }}</span
                      >
                    </div>
                  </md-layout>
                  <md-layout md-flex="5" class="mr-20">
                    <md-button
                      class="md-icon-button md-raised md-dense md-list-action -gray-EF"
                      v-if="items.reason_desc != null"
                      @click="
                        gaAddComment();
                        selectPurpose(items, index);
                      "
                    >
                      <md-icon class="-white">message</md-icon>
                      <md-tooltip md-direction="top">comment</md-tooltip>
                    </md-button>
                  </md-layout>
                  <md-layout md-flex="5 mr-20 defaultCls">
                    <md-icon
                      class="-gray-A8 mr-10"
                      v-if="items.status_check == '1'"
                      >done</md-icon
                    >
                    <md-tooltip
                      md-direction="top"
                      v-if="items.status_check == '1'"
                      >selected</md-tooltip
                    >
                  </md-layout>
                </md-list-item>
                <md-list-item>
                  <md-input-container class="mt-0 mb-10" md-theme>
                    <md-input
                      :disabled="ceckDateReson == 1 ? true : false"
                      placeholder="Other reason"
                      class="-font-12 -gray-75"
                      v-model="bd.edt_other_reason"
                      @click.native="gaOtherReason()"
                    ></md-input>
                  </md-input-container>
                </md-list-item>
              </md-list>
            </md-card>
            <md-layout class="mt-10">
              <md-input-container class="robotoFont">
                <label>Description</label>
                <md-input
                  :disabled="ceckDateReson == 1 ? true : false"
                  v-model="bd.edt_description"
                  @click.native="gaPlanDescription()"
                ></md-input>
              </md-input-container>
            </md-layout>
            <div class="-left">
              <md-avatar
                class="md-avatar-icon _icon-status -large -gray mr-15"
              ></md-avatar>
              <span class="body-secondary-text font-weight-400">{{
                bd.txt_salesid
              }}</span
              >&nbsp:&nbsp
              <span class="body-primary-text-kanit">{{ bd.txt_salesman }}</span>
            </div>
            <md-layout md-gutter class="mt-60 mb-20">
              <md-layout md-flex="35" md-align="center">
                <md-button
                  v-if="
                    ceckDateReson == 1 &&
                    bd.txt_header_sidnav == 'VIEW TRIP PLAN'
                  "
                  class="md-raised -orange"
                  @click="
                    gaCalcelPlan();
                    closeLeftBar();
                  "
                  >{{ bd.txt_btn_del }}</md-button
                >
                <md-button
                  v-else
                  class="md-raised -gray-A8"
                  @click="
                    gaCalcelPlan();
                    closeLeftBar();
                  "
                  >{{ bd.txt_btn_del }}</md-button
                >
              </md-layout>
              <md-layout md-flex="60" md-align="start" class="ml-10">
                <md-button
                  v-if="
                    ceckDateReson == 1 &&
                    bd.txt_header_sidnav == 'VIEW TRIP PLAN'
                  "
                  class="md-raised -gray-A8 width-pre100 height-36"
                  disabled
                  >{{ bd.txt_btn_add }}</md-button
                >
                <md-button
                  v-else
                  class="md-raised -orange width-pre100 height-36"
                  @click="showDlg(bd.txt_btn_add, true)"
                  >{{ bd.txt_btn_add }}</md-button
                >
              </md-layout>
            </md-layout>
          </md-card-content>
        </md-card>
      </md-sidenav>
      <!--Start left Plan Details -->
      <md-sidenav
        class=" md-left md-fixed z-index-10 po-fixed"
        ref="leftSidenav_planDetail">
        <md-card  class="-noshadow">
          <md-card-header class="-orange">
            <md-card-header-text>
              <div class="md-title mh-30 latoFont">
                {{ 'Plan Details' }}
              </div>
            </md-card-header-text>
            <md-button class="md-icon-button" @click="closePlanDetail">
              <md-icon class="-white">close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-card-header>
          <md-card-content  style="background-color:" class="mh-30 pt-15 ph-0 pb-30">
                 <md-layout style="padding:0 0 0 10px;border-radius: 4px;height: 42px;background-color:#EFEFEF ">
                   <div style=" 
                  font-family:Kanit;
                  padding:10px 10px 0 0;
                  text-align: left;
                  justify-self: center;
                  white-space: nowrap; 
                  width: 80%; 
                  overflow: hidden;
                  text-overflow: ellipsis;"
                   >
                  {{this.data_planDetail.emp_id}} : {{this.data_planDetail.first_name}} {{" "}} {{this.data_planDetail.last_name}}
                </div>

                 <div style=" width: 20%;">
                    <md-layout
                        md-flex="25"
                        md-align="end"
                        class="mr-10 mt-13"
                      >
                        <md-chip
                          v-if="this.data_planDetail.status == 'APPROVED'"
                          class="-green -rectangle -small pr-0 latoFont"
                        >
                          <b>{{ this.data_planDetail.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="this.data_planDetail.status == 'PENDING'"
                          class="-gray-A8 -rectangle -small latoFont"
                        >
                          <b>{{ this.data_planDetail.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="this.data_planDetail.status == 'WAITING'"
                          class="-gray-A8 -rectangle -small latoFont"
                        >
                          <b>{{ this.data_planDetail.status }}</b>
                        </md-chip>
                        <md-chip
                          v-if="this.data_planDetail.status == 'REJECTED'"
                          class="-red -rectangle -small pr-0 pl-0 latoFont"
                        >
                          <b>{{ this.data_planDetail.status }}</b>
                        </md-chip>
                      </md-layout>
                 
                </div>

                 </md-layout>
                <md-layout class="" style="height:auto;background-color:">
                     <md-card  md-with-hover class="-large -radius4-shadow0-16 -no-y-scroll" style="margin-top:20px;max-height:1000px">
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
                 style="padding:0px">
                  <md-list-item
                  class="head-menu-setting"
                  style="display: flex;"
                  >
                    <span style="cursor:default;font-family: Roboto !important; font-size: 14px !important">{{ 'SUCCESS RATE %' }}</span>
                
                  </md-list-item>
                    <span  style="cursor:default;padding:10px;padding-top:10px" >
                <md-layout  md-gutter>
             <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
               <div  v-for="(items) in overview.success"
                          :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                     <md-layout style="padding-top:15px">
                                <div class="-left">
                                  <span style="font-size:20px" class="header2">{{items.amount}}%</span>
                                  <br>
                                  <span class="header3">{{items.name}}</span>
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
                 style="padding:0px">
                  <md-list-item
                   @click.native="Expand_Overview('plan')"
                  class="head-menu-setting"
                  style="display: flex;"
                  >
                    <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'PLAN' }}</span>
                    <md-icon v-if="overview.expand_plan === false">expand_less</md-icon>
                    <md-icon v-else>expand_more</md-icon>

                  </md-list-item>
                    <span v-if="overview.expand_plan"   style="cursor:default;padding:10px;padding-top:10px" >
                <md-layout  md-gutter>
             <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
               <div  v-for="(items) in overview.plan"
                          :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                     <md-layout style="padding-top:15px">
                                <div class="-left">
                                  <span  style="font-size:20px" class="header2">{{items.amount}} <small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                                  <br>
                                  <span class="header3">{{items.name}}</span>
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
                  style="display: flex;"
                  >
                    <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'ACTIVE' }}</span>
                    <md-icon v-if="overview.expand_active === false">expand_less</md-icon>
                    <md-icon v-else>expand_more</md-icon>

                  </md-list-item>
                      <span  v-if="overview.expand_active"  style="cursor:default;padding:10px;padding-top:10px" >
                <md-layout  md-gutter>
             <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
               <div  v-for="(items) in overview.active"
                          :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                     <md-layout style="padding-top:15px">
                                <div class="-left">
                                  <span  style="font-size:20px" class="header2">{{items.amount}} <small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                                  <br>
                                  <span class="header3">{{items.name}}</span>
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

            
          </md-card-content>
        </md-card>
      </md-sidenav>
      <!--Stat Dialog Select Purpose-->
      <md-dialog md-open-from="#fab" ref="purpose_dialog" class="z-index-1">
        <md-dialog-title class="mb-0">
          <md-layout>
            <md-layout md-flex-large="50" class="robotoFont"
              >Reason for visit - Notes</md-layout
            >
            <md-layout md-flex-large="50" md-align="end">
              <md-button
                class="md-icon-button"
                @click="
                  gaNoteClose();
                  warningBeNotSaved('purpose');
                "
              >
                <md-icon>close</md-icon>
                <md-tooltip md-direction="right">close</md-tooltip>
              </md-button>
            </md-layout>
          </md-layout>
        </md-dialog-title>
        <md-dialog-content class="mh-40 ph-0 width-500">
          <md-input-container class="width-200">
            <md-select
              v-model="dp_purpose_type"
              disabled
              @click.native="gaNoteSelectReason()"
            >
              <md-option
                v-for="items in bd.arr_purpose"
                v-bind:value="items.id"
                :key="items.id"
              >
                <span class="latoFont">{{ items.name }}</span>
              </md-option>
            </md-select>
          </md-input-container>
          <md-input-container
            v-if="ceckDateReson == 0"
            v-bind:class="[activeClass, errorClass]"
            class="min-height-120"
          >
            <md-textarea
              v-model="bd.edt_reason_desc"
              class="ph-10"
            ></md-textarea>
          </md-input-container>
          <md-input-container v-else class="disable min-height-120">
            <md-textarea
              :disabled="ceckDateReson == 1 ? true : false"
              v-model="bd.edt_reason_desc"
              class="ph-10"
            ></md-textarea>
          </md-input-container>
        </md-dialog-content>
        <md-dialog-actions class="mv-15 mr-45 pv-0 z-index-1">
          <md-button
            class="md-body-1 -oranges robotoFont"
            @click="
              gaNoteCancel();
              warningBeNotSaved('purpose');
            "
            >CANCEL</md-button
          >
          <md-button
            v-if="ceckDateReson == 0"
            class="md-body-1 -oranges robotoFont"
            @click="
              gaNoteSave();
              savePurpose('purpose');
            "
            >SAVE</md-button
          >
          <md-button
            v-else
            class="md-body-1 -gray-A8 robotoFont"
            :disabled="ceckDateReson == 1 ? true : false"
            >SAVE</md-button
          >
        </md-dialog-actions>
      </md-dialog>
      <!--End Dialog Select Purpose-->
      <!--Stat Dialog Confirm alertCheckPlan-->
      <md-snackbar
        :md-position="snk.vertical + ' ' + snk.horizontal"
        ref="snackbar"
        :md-duration="snk.duration"
      >
        <span>{{ snk.txt_warning }}</span>
        <md-button class="md-accent -oranges" @click="retry">{{
          snk.txt_submit
        }}</md-button>
      </md-snackbar>
      <!--Stat Dialog Confirm alertCheckPlan-->
      <md-dialog-confirm
        class="z-index-6"
        :md-title="dlg.title"
        :md-content-html="dlg.contentHtml"
        :md-ok-text="dlg.ok"
        :md-cancel-text="dlg.cancel"
        @open="onOpen"
        @close="submitDlg"
        ref="dlgname"
      ></md-dialog-confirm>
    </div>
    <comment
      v-click-outside="outsideComment"
      @closeComment="setCloseComment"
      v-if="show_comment"
      :doc_comment="doc_comment"
      style="z-index: 200"
    ></comment>
  </div>
</template>

<script>
import langSets from "../Salesops/dataMap/langSets";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
import Vue from "vue";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import comment from "../Salesops/commentTripplan/Comment";
import VueSticky from 'vue-sticky'

var check_month = true;

export default {
  name: "salesops-approve",
  props: {
    lang: {
      type: String,
      default: "en",
    },
    firstDay: {
      type: Number | String,
      validator(val) {
        let res = parseInt(val);
        return res >= 0 && res <= 6;
      },
      default: 0,
    },
    titleFormat: {
      type: String,
      default() {
        return langSets[this.lang].titleFormat;
      },
    },
    monthNames: {
      type: Array,
      default() {
        return langSets[this.lang].monthNames;
      },
    },
    weekNames: {
      type: Array,
      default() {
        let arr = langSets[this.lang].weekNames;
        return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay));
      },
    },
  },
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "view-timepicker": require("../Salesops/fullTimePicker/ViewTimePicker"),
    "view-datepicker": require("../Salesops/fullDatePicker/ViewDatePicker"),
    'md-search-box': require('../Salesops/customComponent/md-ap-search-box'),
    "md-dropdown-box": require("../Salesops/customComponent/ap-dropdown-box"),
    "md-dropdown-box2": require("../Salesops/customComponent/ap-dropdown-box2"),
    Datepicker,
    comment,
  },
  data() {
    let time = new Date();
    return {
      keepMomth: dateFunc.format(new Date(), "MM"),
      keepYear: dateFunc.format(new Date(), "yyyy"),
      valueTime: {},
      login: false,
      currentDate: new Date(),
      hd: {
        title: "",
        show_mh: false,
        txt_year: dateFunc.format(new Date(), "yyyy"),
        arr_year: this.randomYear("now"),
        arr_months: dateFunc.getFullMonth(),
        monthPickCls: "hide-tag month-body",
      },
      events: [],
      eventLimit: 3,
      showMore: false,
      morePos: { top: 0, left: 0 },
      selectDay: {},
      bd: {
        cust_list: [],
        cust_list_treeview: [],
        edt_data: [],
        default_edt: [],
        edt_search: "",
        dp_status: "ALL",
        txt_header_sidnav: "VIEW TRIP PLAN",
        txt_btn_del: "CANCEL",
        edt_show_name: null,
        edt_description: "",
        edt_reason_desc: null,
        edt_old_reason_desc: null,
        edt_other_reason: "",
        arr_purpose: [],
        keep_edit_plan: {},
      },
      snk: {
        vertical: "top",
        horizontal: "center",
        duration: 7000,
        txt_submit: "Agree",
        txt_warning: "",
        mode: "",
      },
      disbled: { cust: 1, calltype: 1, plan_btn: 0 },
      dlg: {
        title: "title",
        contentHtml: "....",
        ok: "Yes",
        cancel: "Cancel",
        subject: null,
      },
      dp_saleman: "",
      show_progress: true,
      mdInputType: "text",
      mdInputPlaceholder: "Customer Name",
      mdStatic: false,
      arr_select_cust: [],
      dp_call_type: 0,
      dp_purpose_type: 0,
      dp_purpose_old_type: 0,
      activeClass: "comment mv-0",
      errorClass: false,
      text_user_role_id: "",
      text_emp_code: "",
      text_emp_id: "",
      chief_saleman: "",
      doc_no: "",
      status_apprvoe: "",
      check_status_apprvoe: "",
      dPK: {
        valDate: "",
        valDateMin: "",
        valDateMax: "",
      },
      select_data_array: [],
      auto_data_array: [],
      param_length: 0,
      status_type: "",
      ceckDateReson: 0,
      select_name: "Call Type",
      icon_expand: "expand_more",
      show_comment: false,
      document_no: "",
      interval_amount: "",
      interval_type: "",
      arr_reason_old: [],
      doc_comment: "",
      btn_comment: false,
      status_click: 0,
      txt_param: "",
      data_planDetail:[],
        overview:{
        expand_success:true,
        expand_plan:true,
        expand_active:false,
        success:[{amount: 70,amount_group: 63,id: 1,name: "Active Visit Plan"}],
        plan:[{amount: 70,amount_group: 63,id: 1,name: "Active Visit Plan"}],
        active:[{amount: 70,amount_group: 63,id: 1,name: "Active Visit Plan"}]
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
    };
  },
  sockets: {
    update_plan: function (data) {
      // console.log('update pland');
      this.getSalesmanByheadRole();
      this.getPurposeType();
      this.dispatchEvent();
    },
  },
  methods: {
    showDlg(key, mode) {
      if (key == "SAVE CHANGES" && mode == true) {
        this.gaSavePlan();
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
          subject: key,
        };
        this.openDialog("dlgname");
      } else if (key == "APPROVED" && mode == true) {
        this.gaSavePlan();
        if (typeof this.$refs.leftSidenav != "undefined") {
          this.$refs.leftSidenav.close();
        }
        if (this.events.length == 0) {
          this.snk.txt_warning = "No plans of this month!";
          this.$refs.snackbar.open();
          this.snk.mode = "APPROVED";
        } else {
          this.dlg = {
            title: "Do you want to approval plan for approval?",
            contentHtml:
              "<div class='text-center' > Approval the plans of " +
              this.dp_saleman.emp_id +
              "  " +
              "<span class='kanitFont'>" +
              this.dp_saleman.first_name +
              ".</span></div>",
            subject: key,
          };
          this.openDialog("dlgname");
        }
      } else if (key == "REJECT" && mode == true) {
        if (typeof this.$refs.leftSidenav != "undefined") {
          this.$refs.leftSidenav.close();
        }
        if (this.events.length == 0) {
          this.snk.txt_warning = "No plans of this month!";
          this.$refs.snackbar.open();
          this.snk.mode = "REJECT";
        } else {
          this.dlg = {
            title: "Do you want to reject plan ?",
            contentHtml:
              "<div class='text-center'> Reject the plans of " +
              this.dp_saleman.emp_id +
              "<span class='kanitFont'>" +
              "  " +
              this.dp_saleman.first_name +
              ".</span></div>",
            subject: key,
          };
          this.openDialog("dlgname");
        }
      } else if (key == "CANCEL" && mode == true) {
        this.closeLeftBar();
      }
    },
    submitDlg(type) {
      if (type == "ok") {
        if (this.dlg.subject == "SAVE CHANGES") {
          var formData = new FormData();
          formData.append("plan_id", this.bd.edt_data.id);
          formData.append("actual_id", this.bd.edt_data.actual_id);
          this.savePlan(formData);
        } else if (this.dlg.subject == "APPROVED") {
          this.status_apprvoe = "APV";
          this.approvePlan();
        } else if (this.dlg.subject == "REJECT") {
          this.status_apprvoe = "REJ";
          this.approvePlan();
        } else if (this.dlg.subject == "CLSLEFTBAR") {
          this.$refs.leftSidenav.close();
        } else if (this.dlg.subject == "COMMENT") {
          this.closeDialog(this.dtl_close + "_dialog");
        } else if (this.dlg.subject == "ASKBEFOREOPENTAB") {
          this.bd.txt_btn_del = "CANCEL";
          this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
          this.disbled.cust = 1;
          this.disbled.calltype = 1;
          this.check_filter = true;
          this.mdStatic = false;
          this.bd.edt_data = this.bd.keep_edit_plan.event;
          this.bd.txt_btn_add = "SAVE CHANGES";
          this.bd.keep_edit_plan.jsEvent.stopPropagation();
          this.currentDate = this.bd.keep_edit_plan.day.date;
          this.dPK = {
            valDate: this.bd.keep_edit_plan.event.plan_date,
          };
          this.getDetailOfPlan(this.bd.keep_edit_plan.event);
          this.defaultDataLeftbar(this.bd.keep_edit_plan.day.date);
          if (this.bd.keep_edit_plan.num == 1) {
            this.showMore = false;
          }
        }
      } else {
        if (this.dlg.subject == "COMMENT") {
          this.onOpen();
        }
      }
    },
    closeLeftBar() {
      let arr_id = [];
      let chk_purpose = true;
      let chk_desc = true;
      let chk_reas = true;
      for (let i = 0; i < this.bd.arr_purpose.length; i++) {
        if (
          this.bd.arr_purpose[i].status_check == 1 &&
          this.bd.arr_purpose[i].reason_desc != null &&
          this.bd.arr_purpose[i].reason_desc != ""
        ) {
          arr_id.push(this.bd.arr_purpose[i]);
        }
      }
      for (let i = 0; i < this.arr_reason_old.length; i++) {
        //arr_reason_old arr ที่เก็บค่าจาก api edit-plan
        for (let j = 0; j < arr_id.length; j++) {
          if (this.arr_reason_old[i].reason_id == arr_id[j].id) {
            if (this.arr_reason_old[i].reason_desc != arr_id[j].reason_desc) {
              chk_purpose = false;
              break;
            }
          }
        }
      }
      // all condition
      if (this.ceckDateReson == 0) {
        if (this.bd.default_edt.other_reason != this.bd.edt_other_reason) {
          chk_reas = false;
        }
        if (
          this.bd.default_edt.description == null &&
          this.bd.edt_description != ""
        ) {
          chk_desc = false;
        } else if (
          this.bd.default_edt.description != null &&
          this.bd.default_edt.description != this.bd.edt_description
        ) {
          chk_desc = false;
        }
      }
      if (chk_desc == true && chk_reas == true && chk_purpose == true) {
        this.closeDialog("purpose_dialog");
        this.$refs.leftSidenav.close();
      } else {
        this.warningBeNotSaved("CLSLEFTBAR");
      }
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
            subject: "COMMENT",
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
          subject: "CLSLEFTBAR",
        };
        this.openDialog("dlgname");
        this.dtl_close = "CLSLEFTBAR";
      } else if (mode == "ASKBEFOREOPENTAB") {
        this.dlg = {
          title: ques,
          contentHtml: ans,
          subject: "ASKBEFOREOPENTAB",
        };
        this.openDialog("dlgname");
        this.dtl_close = "ASKBEFOREOPENTAB";
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
    },
    savePlan(formData) {
      let start_hour = this.setFmTime(this.valueTime.strHour);
      let start_minutes = this.setFmTime(this.valueTime.startMinute);
      let end_hour = this.setFmTime(this.valueTime.endHour);
      let end_minutes = this.setFmTime(this.valueTime.endMinute);
      formData.append("plan_date", this.dPK.valDate);
      formData.append(
        "plan_in",
        this.dPK.valDate + " " + start_hour + ":" + start_minutes
      );
      formData.append(
        "plan_out",
        this.dPK.valDate + " " + end_hour + ":" + end_minutes
      );
      formData.append("description", this.bd.edt_description);
      formData.append("approved", this.bd.edt_data.approved_type);
      formData.append("other_reason", this.bd.edt_other_reason);
      formData.append("plan_type_id", this.dp_call_type);
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
      this.$http
        .post(Vue.config["url"] + "/add-plan", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") },
        })
        .then(function (data) {
          let rs = data.body.data;
          if (rs.status_type != "A") {
            this.document_no = rs.document_no;
          }
          this.resetValueInSaidBar();
          this.$refs.leftSidenav.close();
        });
    },
    setFmDate(val, fotmat) {
      return moment(String(val)).format(fotmat);
    },
    setFmTime(val) {
      return val < 10 ? "0" + val : val + "";
    },
    editPlan(day, event, jsEvent, num) {
      if (!event.isShow) {
        return;
      }
      this.bd.keep_edit_plan = {
        day: day,
        event: event,
        jsEvent: jsEvent,
        num: num,
      };

      this.bd.edt_data = event;
      this.bd.txt_btn_add = "SAVE CHANGES";
      jsEvent.stopPropagation();
      this.currentDate = day.date;
      if (num == 1) {
        this.showMore = false;
      }
      if (this.$refs.leftSidenav.classes == "md-active") {
        let arr_id = [];
        let arr_name = [];
        let chk_purpose = true;
        let chk_desc = true;
        let chk_reas = true;
        let chk_cust = true;
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
        if (chk_desc == true && chk_reas == true && chk_purpose == true) {
          this.bd.txt_btn_del = "CANCEL";
          this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
          this.disbled.cust = 1;
          this.disbled.calltype = 1;
          this.check_filter = true;
          this.mdStatic = false;
          this.bd.edt_data = this.bd.keep_edit_plan.event;
          this.bd.txt_btn_add = "SAVE CHANGES";
          this.bd.keep_edit_plan.jsEvent.stopPropagation();
          this.currentDate = this.bd.keep_edit_plan.day.date;
          this.dPK = {
            valDate: this.bd.keep_edit_plan.event.plan_date,
          };
          this.getDetailOfPlan(this.bd.keep_edit_plan.event);
          this.defaultDataLeftbar(this.bd.keep_edit_plan.day.date);
          if (this.bd.keep_edit_plan.num == 1) {
            this.showMore = false;
          }
        } else {
          this.warningBeNotSaved("ASKBEFOREOPENTAB");
        }
      } else {
        this.bd.txt_btn_del = "CANCEL";
        this.bd.txt_header_sidnav = "VIEW TRIP PLAN";
        this.disbled.cust = 1;
        this.disbled.calltype = 1;
        this.check_filter = true;
        this.mdStatic = false;
        this.dPK = {
          valDate: event.plan_date,
        };

      
        this.getDetailOfPlan(event);
        this.defaultDataLeftbar(day.date);
      }
    },
    setValDatePickerFromCarlendar(key) {
      let now_year = this.setFmDate(new Date(), "YYYY");
      let select_year = this.setFmDate(key, "YYYY");
      let now_month = this.setFmDate(new Date(), "MM");
      let select_month = this.setFmDate(key, "MM");
      if (
        parseInt(select_year) >= parseInt(now_year) &&
        parseInt(select_month) >= parseInt(now_month)
      ) {
        let days = moment(String(key)).daysInMonth();
        this.dPK = {
          valDate: this.setFmDate(key, "YYYY-MM-DD"),
          valDateMin: select_year + "-" + select_month + "-1",
          valDateMax: select_year + "-" + select_month + "-" + days,
        };
        this.disbled.plan_btn = 1;
      } else if (
        parseInt(select_year) == parseInt(now_year) &&
        parseInt(select_month) < parseInt(now_month)
      ) {
        let days = moment(String(new Date())).add(1, "M").daysInMonth();
        this.dPK = {
          valDate: this.setFmDate(new Date(), "YYYY-MM-DD"),
          valDateMin: select_year + "-" + select_month + "-1",
          valDateMax: select_year + "-" + select_month + "-" + days,
        };
        this.disbled.plan_btn = 1;
      } else {
        if (typeof this.$refs.leftSidenav != "undefined") {
          this.$refs.leftSidenav.close();
        }
        this.dPK = {
          valDate: this.setFmDate(this.currentDate, "YYYY-MM-DD"),
        };
        this.disbled.plan_btn = 0;
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
      formData.append("emp_id", this.text_emp_id);
      formData.append("emp_code", this.text_emp_code);
      formData.append("actual_id", key.actual_id);
      formData.append("mode", "approve");
      this.$http
        .post(Vue.config["url"] + "/edit-plan", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") },
        })
        .then(function (data) {
          let rs = data.body.success.data;
          this.status_type = rs.status_type;
          this.arr_reason_old = [];
          this.bd.edt_data = rs;
          this.bd.default_edt = rs;
          this.arr_select_cust.push(rs.cust);
          this.arr_reason_old = rs.reason;
          for (let i = 0; i < this.arr_select_cust.length; i++) {
            this.check_cust = this.arr_select_cust[i].id;
          }
          this.dp_call_type = rs.plan_type_id;
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
                }
              }
            }
          }
          this.mdInputPlaceholder = "";
          this.bd.edt_description =
            rs.description == null || rs.description == "null"
              ? ""
              : rs.description;
          this.bd.edt_other_reason =
            rs.other_reason == null || rs.other_reason == "null"
              ? ""
              : rs.other_reason;
          this.valueTime = {
            strHour: parseInt(rs.start_time_hour),
            startMinute: parseInt(rs.start_time_minute),
            endHour: parseInt(rs.end_time_hour),
            endMinute: parseInt(rs.end_time_minute),
            length: 4,
          };

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
          if (this.bd.default_edt.approved_type == "WFA") {
            this.ceckDateReson = 0;
          } else {
            if (parseInt(editDate) <= parseInt(curDate)) {
              this.ceckDateReson = 1;
            } else {
              this.ceckDateReson = 0;
            }
          }
          // if (this.bd.default_edt.approved_type == "WFA") {
          //   if (parseInt(editDate) <= parseInt(curDate)) {
          //     console.log("1 =>")
          //     this.ceckDateReson = 1;
          //   } else {
          //     console.log("2 =>")
          //     this.ceckDateReson = 0;
          //   }
          // } else if (this.bd.default_edt.approved_type == "REJ") {
          //     console.log("3 =>")
          //   this.ceckDateReson = 1;
          // } else {
          //     console.log("4 =>")
          //   this.ceckDateReson = 0;
          // }
          // console.log("ceckDateReson => " , this.ceckDateReson)
          if (rs.store_selection == 0) {
            this.disbled.cust = 1;
            this.mdInputPlaceholder = "Customer Name";
            this.arr_select_cust = [];
          }
           this.$refs.leftSidenav_planDetail.close();
          this.$refs.leftSidenav.open();
        });
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
      };
    },
    open(ref) {},
    getPurposeType() {
      if (this.bd.arr_purpose.length == 0) {
        this.$http.get(Vue.config["url"] + "/purpose-type").then(
          function (data) {
            let arr = [];
            var rs_data = data.body.success.data;
            for (let i = 0; i < rs_data.length; i++) {
              rs_data[i].commemt = null;
              rs_data[i].status_check = 0;
            }
            this.bd.arr_purpose = rs_data;
          },
          (response) => {
            this.snk.txt_warning = "getPurposeType";
            this.$refs.snackbar.open();
          }
        );
      }
    },
    close(ref) {
      this.resetValueInSaidBar();
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
      this.check_filter = false;
      this.arr_select_cust = [];
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
        length: 4,
      };
    },
    selectPurpose(key, index) {
      this.status_check_purpose = index;
      this.dp_purpose_type = key.id;
      this.dp_purpose_old_type = key.id;
      if (key.reason_desc != null) {
        this.bd.edt_reason_desc = "" + key.reason_desc + "";
        this.bd.edt_old_reason_desc = "" + key.reason_desc + "";
      } else {
        this.bd.edt_reason_desc = "";
        this.bd.edt_old_reason_desc = "";
      }
      this.openDialog("purpose_dialog");
    },
    /**---Head Of Calendar---*/
    goPrev() {
      this.bd.text_red = "";
      if (this.hd.show_mh == true) {
        this.currentDate = this.changeMonth(this.currentDate, -12);
        this.changeStatusOfPlan(this.currentDate);
      } else {
        this.randomYear("goPrev");
      }
      this.hd.txt_year = parseInt(dateFunc.format(this.currentDate, "yyyy"));
      this.dispatchEvent();
      if (typeof this.$refs.leftSidenav != "undefined") {
        this.$refs.leftSidenav.close();
      }
    },
    goNext() {
      this.bd.text_red = "";
      if (this.hd.show_mh == true) {
        this.currentDate = this.changeMonth(this.currentDate, 12);
        this.changeStatusOfPlan(this.currentDate);
      } else {
        this.randomYear("goNext");
      }
      this.hd.txt_year = parseInt(dateFunc.format(this.currentDate, "yyyy"));
      this.dispatchEvent();
      if (typeof this.$refs.leftSidenav != "undefined") {
        this.$refs.leftSidenav.close();
      }
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
      if (typeof this.$refs.leftSidenav != "undefined") {
        this.$refs.leftSidenav.close();
      }
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
      let current_month = parseInt(dateFunc.format(this.currentDate, "M"));
      let select_month = key.month_id - current_month;
      this.keepMomth = key.month_id;
      this.currentDate = this.changeMonth(this.currentDate, select_month);
      this.dispatchEvent();
      this.hd.monthPickCls = "hide-tag month-body";
      check_month = true;
      // this.changeStatusOfPlan(this.currentDate);
      if (typeof this.$refs.leftSidenav != "undefined") {
        this.$refs.leftSidenav.close();
      }
      this.getSalesmanByheadRole();
      /* this.changeStatusOfPlan(this.currentDate); */
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
    /**------Body Of Calendar*/
    moreTitle(date) {
      let dt = new Date(date);
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
        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: startDate.getDate(),
            isToday: now.toDateString() == startDate.toDateString(),
            isCurMonth: startDate.getMonth() == current.getMonth(),
            weekDay: perDay,
            date: new Date(startDate),
            events: this.slotEvents(startDate),
          });
          startDate.setDate(startDate.getDate() + 1);
        }
        calendar.push(week);
      }
      return calendar;
    },
    slotEvents(date) {
      // find all events start from this date
      let cellIndexArr = [];
      let thisDayEvents = this.events.filter((day) => {
        let dt = new Date(day.start);
        let st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        let ed = day.end ? new Date(day.end) : st;
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
          isShow: false,
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
    selectThisDay(day, jsEvent, type) {
      let monthNow = this.setFormatDate(this.currentDate, "MM");
      let monthClick = this.setFormatDate(day.date, "MM");
      if (day.monthDay == "" || monthNow != monthClick) {
        this.showMore = false;
        return;
      } else {
        this.showMore = true;
      }
      this.currentDate = day.date;
      this.selectDay = day;
      this.morePos = this.computePos(event.target);
      if (type == "head") {
        this.morePos.top -= 30;
        this.morePos.left -= 10;
      } else {
        this.morePos.top -= 116;
        this.morePos.left -= 10;
      }

      let events = day.events.filter((item) => {
        return item.isShow == true;
      });
      this.hd.monthPickCls = "hide-tag month-body";
      check_month = true;
      this.hd.show_mh = false;
    },
    computePos(target) {
      let eventRect = target.getBoundingClientRect();
      let pageRect = this.$refs.dates.getBoundingClientRect();
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top,
      };
    },
    outsideCalendar: function (e) {
      this.showMore = false;
    },
    selectStatus() {
      if (this.param_length > 1) {
        this.bd.cust_list = [];
        this.select_data_array = [];
        let check_status = 0;
        for (var i = 0; i < this.bd.cust_list_treeview.length; i++) {
          var str =
            this.bd.cust_list_treeview[i].last_name +
            this.bd.cust_list_treeview[i].first_name +
            this.bd.cust_list_treeview[i].status +
            this.bd.cust_list_treeview[i].department +
            this.bd.cust_list_treeview[i].emp_id;

          if (this.bd.dp_status != "ALL") {
            if (
              this.bd.cust_list_treeview[i].status.indexOf(
                this.bd.dp_status
              ) !== -1 &&
              str.toUpperCase().indexOf(this.txt_param.toUpperCase()) !== -1
            ) {
              if (
                this.check_status_apprvoe ==
                this.bd.cust_list_treeview[i].emp_id
              ) {
                check_status = 1;
                this.bd.cust_list_treeview[i].status_check = "click";
              } else {
                this.bd.cust_list_treeview[i].status_check = "unclick";
              }
              let arra = {
                department: this.bd.cust_list_treeview[i].department,
                emp_code: this.bd.cust_list_treeview[i].emp_code,
                emp_id: this.bd.cust_list_treeview[i].emp_id,
                first_name: this.bd.cust_list_treeview[i].first_name,
                last_name: this.bd.cust_list_treeview[i].last_name,
                user_role_id: this.bd.cust_list_treeview[i].user_role_id,
                status: this.bd.cust_list_treeview[i].status,
                status_check: this.bd.cust_list_treeview[i].status_check,
              };
              this.bd.cust_list.push(arra);
              this.select_data_array.push(arra);
              arra = "";
            } else {
              this.bd.cust_list_treeview[i].status_check = "unclick";
            }
          } else {
            if (
              str.toUpperCase().indexOf(this.txt_param.toUpperCase()) !== -1
            ) {
              if (
                this.check_status_apprvoe ==
                this.bd.cust_list_treeview[i].emp_id
              ) {
                check_status = 1;
                this.bd.cust_list_treeview[i].status_check = "click";
              } else {
                this.bd.cust_list_treeview[i].status_check = "unclick";
              }
              let arra = {
                department: this.bd.cust_list_treeview[i].department,
                emp_code: this.bd.cust_list_treeview[i].emp_code,
                emp_id: this.bd.cust_list_treeview[i].emp_id,
                first_name: this.bd.cust_list_treeview[i].first_name,
                last_name: this.bd.cust_list_treeview[i].last_name,
                user_role_id: this.bd.cust_list_treeview[i].user_role_id,
                status: this.bd.cust_list_treeview[i].status,
                status_check: this.bd.cust_list_treeview[i].status_check,
              };
              this.bd.cust_list.push(arra);
              this.select_data_array.push(arra);
              arra = "";
            } else {
              this.bd.cust_list_treeview[i].status_check = "unclick";
            }
          }
        }

        if (check_status == 0 && this.status_click != 0) {
          this.dp_saleman = [];
          this.changeStatusOfPlan(this.currentDate);
          this.disbled.plan_btn = 0;
          this.events = [];
          this.check_status_apprvoe = "";
        } else {
          this.changeStatusOfPlan(this.currentDate);
        }
      } else {
        if (
          this.bd.dp_status != "ALL" &&
          this.bd.cust_list_treeview.length > 0
        ) {
          this.bd.cust_list = [];
          this.select_data_array = [];
          let check_status = 0;
          for (var i = 0; i < this.bd.cust_list_treeview.length; i++) {
            if (
              this.bd.cust_list_treeview[i].status.indexOf(
                this.bd.dp_status
              ) !== -1
            ) {
              if (
                this.check_status_apprvoe ==
                this.bd.cust_list_treeview[i].emp_id
              ) {
                check_status = 1;
                this.bd.cust_list_treeview[i].status_check = "click";
              } else {
                this.bd.cust_list_treeview[i].status_check = "unclick";
              }
              let arra = {
                department: this.bd.cust_list_treeview[i].department,
                emp_code: this.bd.cust_list_treeview[i].emp_code,
                emp_id: this.bd.cust_list_treeview[i].emp_id,
                first_name: this.bd.cust_list_treeview[i].first_name,
                last_name: this.bd.cust_list_treeview[i].last_name,
                user_role_id: this.bd.cust_list_treeview[i].user_role_id,
                status: this.bd.cust_list_treeview[i].status,
                status_check: this.bd.cust_list_treeview[i].status_check,
              };
              this.bd.cust_list.push(arra);
              this.select_data_array.push(arra);
              arra = "";
            } else {
              this.bd.cust_list_treeview[i].status_check = "unclick";
            }
          }

          if (check_status == 0 && this.status_click == 1) {
            // this.check_status_apprvoe = ""
            this.dp_saleman = [];
            this.changeStatusOfPlan(this.currentDate);
            this.disbled.plan_btn = 0;
            this.events = [];
            this.check_status_apprvoe = "";
          } else {
            this.changeStatusOfPlan(this.currentDate);
          }
        } else {
          this.bd.edt_search = "";
          this.bd.cust_list = [];
          this.select_data_array = [];
          for (var i = 0; i < this.bd.cust_list_treeview.length; i++) {
            if (
              this.check_status_apprvoe == this.bd.cust_list_treeview[i].emp_id
            ) {
              // check_status = 1;
              this.bd.cust_list_treeview[i].status_check = "click";
            } else {
              this.bd.cust_list_treeview[i].status_check = "unclick";
            }
            let arra = {
              department: this.bd.cust_list_treeview[i].department,
              emp_code: this.bd.cust_list_treeview[i].emp_code,
              emp_id: this.bd.cust_list_treeview[i].emp_id,
              first_name: this.bd.cust_list_treeview[i].first_name,
              last_name: this.bd.cust_list_treeview[i].last_name,
              user_role_id: this.bd.cust_list_treeview[i].user_role_id,
              status: this.bd.cust_list_treeview[i].status,
              status_check: this.bd.cust_list_treeview[i].status_check,
            };
            this.bd.cust_list.push(arra);
            this.select_data_array.push(arra);
            arra = "";
          }
          // this.changeStatusOfPlan(this.currentDate);
          /* this.bd.cust_list = this.bd.cust_list_treeview;
					this.select_data_array = this.bd.cust_list_treeview; */
        }
      }
    },
    autoSearch(param) {
      this.txt_param = param;
      this.param_length = param.length;
      if (this.bd.dp_status != "ALL") {
        if (param.length > 1) {
          this.bd.cust_list = [];
          this.auto_data_array = [];
          let check_status = 0;
          for (var i = 0; i < this.bd.cust_list_treeview.length; i++) {
            var str =
              this.bd.cust_list_treeview[i].last_name +
              this.bd.cust_list_treeview[i].first_name +
              this.bd.cust_list_treeview[i].status +
              this.bd.cust_list_treeview[i].department +
              this.bd.cust_list_treeview[i].emp_id;

            if (
              this.bd.cust_list_treeview[i].status.indexOf(
                this.bd.dp_status
              ) !== -1 &&
              str.toUpperCase().indexOf(param.toUpperCase()) !== -1
            ) {
              if (
                this.check_status_apprvoe ==
                this.bd.cust_list_treeview[i].emp_id
              ) {
                check_status = 1;
                this.bd.cust_list_treeview[i].status_check = "click";
              } else {
                this.bd.cust_list_treeview[i].status_check = "unclick";
              }
              let arra = {
                department: this.bd.cust_list_treeview[i].department,
                emp_code: this.bd.cust_list_treeview[i].emp_code,
                emp_id: this.bd.cust_list_treeview[i].emp_id,
                first_name: this.bd.cust_list_treeview[i].first_name,
                last_name: this.bd.cust_list_treeview[i].last_name,
                user_role_id: this.bd.cust_list_treeview[i].user_role_id,
                status: this.bd.cust_list_treeview[i].status,
                status_check: this.bd.cust_list_treeview[i].status_check,
              };
              this.bd.cust_list.push(arra);
              arra = "";
            }
          }

          if (check_status == 0 && this.status_click == 1) {
            // this.check_status_apprvoe = ""
            this.dp_saleman = [];
            this.changeStatusOfPlan(this.currentDate);
            this.events = [];
            this.disbled.plan_btn = 0;
            this.check_status_apprvoe = "";
          } else {
            this.changeStatusOfPlan(this.currentDate);
          }
        } else {
          //this.changeStatusOfPlan(this.currentDate);
        }
      } else {
        if (param.length > 1 && this.bd.cust_list_treeview.length > 0) {
          this.bd.cust_list = [];
          this.auto_data_array = [];
          let check_status = 0;
          for (var i = 0; i < this.bd.cust_list_treeview.length; i++) {
            var str =
              this.bd.cust_list_treeview[i].last_name +
              this.bd.cust_list_treeview[i].first_name +
              this.bd.cust_list_treeview[i].status +
              this.bd.cust_list_treeview[i].department +
              this.bd.cust_list_treeview[i].emp_id;
            if (str.toUpperCase().indexOf(param.toUpperCase()) !== -1) {
              if (
                this.check_status_apprvoe ==
                this.bd.cust_list_treeview[i].emp_id
              ) {
                check_status = 1;
                this.bd.cust_list_treeview[i].status_check = "click";
              } else {
                this.bd.cust_list_treeview[i].status_check = "unclick";
              }
              let arra = {
                department: this.bd.cust_list_treeview[i].department,
                emp_code: this.bd.cust_list_treeview[i].emp_code,
                emp_id: this.bd.cust_list_treeview[i].emp_id,
                first_name: this.bd.cust_list_treeview[i].first_name,
                last_name: this.bd.cust_list_treeview[i].last_name,
                user_role_id: this.bd.cust_list_treeview[i].user_role_id,
                status: this.bd.cust_list_treeview[i].status,
                status_check: this.bd.cust_list_treeview[i].status_check,
              };
              this.bd.cust_list.push(arra);
              this.auto_data_array.push(arra);
              arra = "";
            }
          }

          if (check_status == 0 && this.status_click == 1) {
            // this.check_status_apprvoe = ""
            this.dp_saleman = [];
            this.changeStatusOfPlan(this.currentDate);
            this.events = [];
            this.check_status_apprvoe = "";
            this.disbled.plan_btn = 0;
          } else {
            this.changeStatusOfPlan(this.currentDate);
          }
        } else {
          this.bd.edt_search = "";
          this.bd.cust_list = [];
          this.auto_data_array = [];
          // console.log(this.select_data_array);
          for (var i = 0; i < this.select_data_array.length; i++) {
            var str =
              this.select_data_array[i].last_name +
              this.select_data_array[i].first_name +
              this.select_data_array[i].status +
              this.select_data_array[i].department +
              this.select_data_array[i].emp_id;

            if (
              this.check_status_apprvoe == this.bd.cust_list_treeview[i].emp_id
            ) {
              // check_status = 1;
              this.bd.cust_list_treeview[i].status_check = "click";
            } else {
              this.bd.cust_list_treeview[i].status_check = "unclick";
            }
            let arra = {
              department: this.select_data_array[i].department,
              emp_code: this.select_data_array[i].emp_code,
              emp_id: this.select_data_array[i].emp_id,
              first_name: this.select_data_array[i].first_name,
              last_name: this.select_data_array[i].last_name,
              user_role_id: this.select_data_array[i].user_role_id,
              status: this.select_data_array[i].status,
              status_check: this.select_data_array[i].status_check,
            };
            this.bd.cust_list.push(arra);
            this.auto_data_array.push(arra);
            arra = "";
          }
          this.changeStatusOfPlan(this.currentDate);
          /* this.bd.cust_list = this.bd.cust_list_treeview;
					this.auto_data_array = this.bd.cust_list_treeview; */
        }
      }
    },
    getCarlendarBysale(key, index) {
      // console.log('Approve_select_sales')
      document.getElementById('Approve_select_sales').click()
      this.data_planDetail = key
      // console.log(key , index)
      this.status_click = 1;
      this.setCloseComment();
      this.check_status_apprvoe = key.emp_id;
      this.text_user_role_id = key.user_role_id;
      this.text_emp_code = key.emp_code;
      this.text_emp_id = key.emp_id;
      this.dp_saleman = [];
      this.dp_saleman = key;
      for (let i = 0; i < this.bd.cust_list.length; i++) {
        if (this.bd.cust_list[i].status_check == "click") {
          this.bd.cust_list[i].status_check = "unclick";
        }
      }
      if (this.bd.cust_list[index].status_check == "unclick") {
        this.bd.cust_list[index].status_check = "click";
      }
      this.getStatusPlanOfMonth(this.currentDate);
      this.bd.txt_salesman = key.first_name + " " + key.last_name;
      this.bd.txt_salesid = key.emp_id;
      this.show_progress = true;
      this.btn_comment = true;
    },
    changeStatusOfPlan(key) {
      if (this.dp_saleman.length != 0) {
        let qry_month = this.setFormatDate(key, "MM");
        let qry_year = this.setFormatDate(key, "YYYY");
        this.getStatusPlanOfMonth(key, qry_month, qry_year);
      } else {
        this.snk.txt_warning = "Select sales staff who want to see plans.!";
        this.$refs.snackbar.open();
        this.snk.mode = "APPROVED";
        this.events = [];
      }
    },
    setFormatDate(val, fotmat) {
      return moment(String(val)).format(fotmat);
    },
    /**------Load Data from server------**/
    getPlanOfDate(key) {
      let qry_month = this.setFmDate(key, "MM");
      let qry_year = this.setFmDate(key, "YYYY");
      var formData = new FormData();
      formData.append("month", qry_month);
      formData.append("year", qry_year);
      formData.append("emp_code", this.text_emp_code);
      formData.append("emp_id", this.text_emp_id);
      this.$http
        .post(Vue.config["url"] + "/approve-plan-of-date", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") },
        })
        .then(
          function (data) {
            this.show_progress = false;
            this.events = data.body.success.data;
          },
          (response) => {
            this.snk.txt_warning = "getPlanOfDate";
            this.$refs.snackbar.open();
          }
        );
    },
    getStatusPlanOfMonth(key, month, year) {
      let qry_month = this.setFmDate(key, "MM");
      let qry_year = this.setFmDate(key, "YYYY");
      var formData = new FormData();
      formData.append("month", qry_month);
      formData.append("year", qry_year);
      formData.append("user_role_id", this.text_user_role_id);
      formData.append("emp_code", this.text_emp_code);
      formData.append("emp_id", this.text_emp_id);
      this.$http
        .post(Vue.config["url"] + "/sale-status-flow", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") },
        })
        .then(
          function (data) {
            let rs = data.body.success.data;
            this.arr_status_plan = rs.status;
            let now_year = this.setFmDate(new Date(), "YYYY");
            let now_month = this.setFmDate(new Date(), "MM");
            let select_year = this.setFmDate(key, "YYYY");
            let select_month = this.setFmDate(key, "MM");
            this.chief_saleman = rs.chief_saleman.emp_id;
            this.doc_no = this.arr_status_plan.document_no;

            if (parseInt(select_year) < parseInt(now_year)) {
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
              // console.log("1....");
            } else if (
              parseInt(select_year) == parseInt(now_year) &&
              parseInt(select_month) < parseInt(now_month)
            ) {
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
              // console.log("2....");
            } else if (
              parseInt(select_year) == parseInt(now_year) &&
              parseInt(select_month) == parseInt(now_month) &&
              (this.arr_status_plan.short_name == "DRF" ||
                this.arr_status_plan.short_name == "APV" ||
                this.arr_status_plan.short_name == "REJ")
            ) {
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
              // console.log("3....");
            } else if (
              parseInt(select_year) >= parseInt(now_year) &&
              parseInt(select_month) >= parseInt(now_month) &&
              (this.arr_status_plan.short_name == "DRF" ||
                this.arr_status_plan.short_name == "APV" ||
                this.arr_status_plan.short_name == "REJ")
            ) {
              this.disbled.plan_btn = 0;
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
              // console.log("4....");
            } else if (
              parseInt(select_year) >= parseInt(now_year) &&
              parseInt(select_month) >= parseInt(now_month) &&
              this.arr_status_plan.short_name == "REC"
            ) {
              this.disbled.plan_btn = 0;
              // console.log("5....");
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
            } else if (
              parseInt(select_year) >= parseInt(now_year) &&
              parseInt(select_month) >= parseInt(now_month) &&
              this.arr_status_plan.short_name == "WFA"
            ) {
              if (this.chief_saleman != Vue.localStorage.get("emp_id")) {
                this.disbled.plan_btn = 0;
              } else {
                this.disbled.plan_btn = 1;
              }
              // console.log("6....");
              if (typeof this.$refs.leftSidenav != "undefined") {
                this.$refs.leftSidenav.close();
              }
              // console.log("4....");
            } else {
              if (this.arr_status_plan.short_name == "APV") {
                this.disbled.plan_btn = 0;
              } else if (this.arr_status_plan.short_name == "REJ") {
                this.disbled.plan_btn = 0;
              } else if (
                this.arr_status_plan.short_name == "DRF" ||
                this.arr_status_plan.short_name == "REC" ||
                this.arr_status_plan.short_name == "RVP"
              ) {
                this.disbled.plan_btn = 0;
              } else {
                this.disbled.plan_btn = 1;
              }
              // console.log("7....");
            }
            this.getPlanOfDate(this.currentDate);
          },
          (response) => {
            this.snk.txt_warning = "getStatusPlanOfMonth";
            this.$refs.snackbar.open();
          }
        );
    },
    getSalesmanByheadRole() {
      var formData = new FormData();
      formData.append("status", this.bd.dp_status);
      formData.append("keyword", this.bd.edt_search);
      formData.append("month", this.setFmDate(this.currentDate, "MM"));
      formData.append("year", this.setFmDate(this.currentDate, "YYYY"));
      this.$http
        .post(Vue.config["url"] + "/sales-for-approve-treeview", formData, {
          headers: {
            Authorization: "Bearer " + Vue.localStorage.get("token"),
          },
        })
        .then(
          function (data) {
            data.body.success.data.sort((a, b) =>
              a.emp_id > b.emp_id ? 1 : -1
            );
            for (
              let index = 0;
              index < data.body.success.data.length;
              index++
            ) {
              const element = data.body.success.data[index];
            }
            let param = "SUP";
            let levels = "";
            this.bd.cust_list = [];
            let check_status = 0;
            this.bd.cust_list_treeview = data.body.success.data;
            for (var i = 0; i < this.bd.cust_list_treeview.length; i++) {
              if (this.bd.cust_list_treeview[i].department == "MNG") {
                levels = "";
              } else if (this.bd.cust_list_treeview[i].department == "CNH") {
                levels = "CNH ==>";
              } else if (this.bd.cust_list_treeview[i].department == "SUP") {
                levels = "SUP====>";
              } else if (this.bd.cust_list_treeview[i].department == "SM") {
                levels = "SM======>";
              }

              if (
                this.check_status_apprvoe ==
                this.bd.cust_list_treeview[i].emp_id
              ) {
                this.bd.cust_list_treeview[i].status_check = "click";
                check_status = 1;
              } else {
                this.bd.cust_list_treeview[i].status_check = "unclick";
              }
              let arra = {
                department: this.bd.cust_list_treeview[i].department,
                emp_code: this.bd.cust_list_treeview[i].emp_code,
                emp_id: this.bd.cust_list_treeview[i].emp_id,
                first_name: this.bd.cust_list_treeview[i].first_name,
                last_name: this.bd.cust_list_treeview[i].last_name,
                user_role_id: this.bd.cust_list_treeview[i].user_role_id,
                status: this.bd.cust_list_treeview[i].status,
                status_check: this.bd.cust_list_treeview[i].status_check,
              };
              this.bd.cust_list.push(arra);
              this.select_data_array.push(arra);
              arra = "";
            }
            // this.dp_saleman = [];
            /* if(check_status == 0 && this.status_click == 1){
						this.dp_saleman = [];
						// this.changeStatusOfPlan(this.currentDate);
						this.events = [];
						this.changeStatusOfPlan(this.currentDate);
					}
					else{
						this.changeStatusOfPlan(this.currentDate);
					} */

            /* if(this.check_status_apprvoe!=''){
						if (this.bd.cust_list[this.check_status_apprvoe].status_check == 'unclick') {
							this.bd.cust_list[this.check_status_apprvoe].status_check = "click";
						}else{
							this.bd.cust_list[this.check_status_apprvoe].status_check = "click";
						}
					} */
            if (this.bd.dp_status != "ALL") {
              this.selectStatus();
            } else if (this.param_length > 0) {
              this.autoSearch(this.txt_param);
            } else {
              this.changeStatusOfPlan(this.currentDate);
            }
            // this.autoSearch();
            this.show_progress = false;
            return this.bd.cust_list;
          },
          (response) => {}
        );
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    retry() {
      if (this.snk.mode == "submit") {
        this.$refs.snk_search.$el.focus();
      }
      this.$refs.snackbar.close();
    },
    onOpen() {},
    approvePlan(type) {
      var formData = new FormData();
      formData.append("chief_saleman", this.chief_saleman);
      formData.append(
        "date_approve",
        this.setFmDate(this.currentDate, "YYYY-MM-DD")
      );
      formData.append("apv_status", this.status_apprvoe);
      formData.append("document_no", this.doc_no);
      formData.append("month", this.setFmDate(this.currentDate, "MM"));
      formData.append("year", this.setFmDate(this.currentDate, "YYYY"));
      formData.append("emp_code", this.text_emp_code);
      formData.append("emp_id", this.text_emp_id);
      this.$http
        .post(Vue.config["url"] + "/sent-flow", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") },
        })
        .then(
          function (data) {
            this.disbled.plan_btn = 0;
            var formDataMail = new FormData();
            formDataMail.append("document_status", this.status_apprvoe);
            formDataMail.append("salesman_emp_id", this.dp_saleman.emp_id);
            formDataMail.append(
              "manager_emp_id",
              Vue.localStorage.get("emp_id")
            );
            formDataMail.append(
              "plan_date",
              this.setFmDate(this.currentDate, "YYYY-MM")
            );
            this.$http
              .post(Vue.config["url"] + "/sent-mail", formDataMail, {
                headers: {
                  Authorization: "Bearer " + Vue.localStorage.get("token"),
                },
              })
              .then(function (data) {
                //sent-mail
              });
            this.getSalesmanByheadRole();
          },
          (response) => {
            this.snk.txt_warning = "approvePlan";
            this.$refs.snackbar.open();
          }
        );
    },
    outsideMonth: function (e) {
      if (e.target.className != "month-box") {
        this.icon_expand = "expand_more";
        this.hd.monthPickCls = "hide-tag month-body";
        check_month = true;
      }
      this.showMore = false;
    },
    approveConfirmContent: function () {
      return (
        "<div class='text-center'> Approve plan sent to  " +
        this.dp_saleman.first_name +
        "<br> " +
        "</div>"
      );
    },
    openComment() {
      let year = this.setFmDate(this.currentDate, "YYYY");
      let month = this.setFmDate(this.currentDate, "MM");
      let mg_approve = [];
      let document_no = this.text_emp_code + year + month;
      var options = {};
      options = {
        month: month,
        year: year,
        emp_code: this.text_emp_code,
        emp_id: this.text_emp_id,
        document_no: document_no,
        msg_to: this.text_emp_id,
      };
      this.doc_comment = options;

      setTimeout(() => {
        this.show_comment = true;
      }, 500);
    },
    setCloseComment() {
      this.show_comment = false;
    },
    outsideComment: function (e) {
      if (
        e.target.className ==
        "md-icon -white -font-14 pt-5 mr-icon-comment md-theme-default material-icons"
      ) {
        if (this.show_comment == true) {
          this.show_comment = false;
        }
      }
      if (
        e.target.className !=
        "md-icon -white -font-14 pt-5 mr-icon-comment md-theme-default material-icons"
      ) {
        this.show_comment = false;
      }
    },
    gaSelectStatusType() {
      console.log('A')
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SelectStatusType;
      key.eventLabel = "Select Status Type:" + emp_id;
      this.$ga.event(key);
    },
    gaSearchSalesman() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SearchSalesman;
      key.eventLabel = "Search Salesman:" + emp_id;
      this.$ga.event(key);
    },
    gaClickChat() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_ClickChat;
      key.eventLabel = "Click Chat:" + emp_id;
      this.$ga.event(key);
    },
    gaSelectMonth() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SelectMonth;
      key.eventLabel = "Select Month:" + emp_id;
      this.$ga.event(key);
    },
    gaSelectDay() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SelectDay;
      key.eventLabel = "Select Day:" + emp_id;
      this.$ga.event(key);
    },
    gaSelectPlan() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SelectPlan;
      key.eventLabel = "Select Plan:" + emp_id;
      this.$ga.event(key);
    },
    gaCalcelPlan() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_CancelPlan;
      key.eventLabel = "Cancel Plan:" + emp_id;
      this.$ga.event(key);
    },
    gaSavePlan() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SavePlan;
      key.eventLabel = "Save Plan:" + emp_id;
      this.$ga.event(key);
    },
    gaAddComment() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_AddComment;
      key.eventLabel = "Add Comments:" + emp_id;
      this.$ga.event(key);
    },
    gaSelectReason() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_SelectReason;
      key.eventLabel = "Select Reason:" + emp_id;
      this.$ga.event(key);
    },
    gaOtherReason() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_OtherReason;
      key.eventLabel = "Other Reason:" + emp_id;
      this.$ga.event(key);
    },
    gaPlanDescription() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_PlanDescription;
      key.eventLabel = "Plan Description:" + emp_id;
      this.$ga.event(key);
    },
    gaNoteClose() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_NoteClose;
      key.eventLabel = "Close Note:" + emp_id;
      this.$ga.event(key);
    },
    gaNoteSelectReason() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_NoteSelectReason;
      key.eventLabel = "Select Reason Note:" + emp_id;
      this.$ga.event(key);
    },
    gaNoteSave() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_NoteSave;
      key.eventLabel = "Save Note:" + emp_id;
      this.$ga.event(key);
    },
    gaNoteCancel() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Approval_NoteCancel;
      key.eventLabel = "CancelNote:" + emp_id;
      this.$ga.event(key);
    },
    openPlanDetail(){
    this.getTripplanOverview();
    this.$refs.leftSidenav.close();
    this.$refs.leftSidenav_planDetail.open();



    },
    closePlanDetail(){this.$refs.leftSidenav_planDetail.close();},
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
     getTripplanOverview() {
      let year = this.setFmDate(this.currentDate, "YYYY")
      let month = this.setFmDate(this.currentDate, "MM")
      var formData = new FormData();
      formData.append("month", month)
      formData.append("year", year)
      formData.append("emp_id", this.data_planDetail.emp_id)
      this.$http
        .post(Vue.config["url"] + "/tripplan-overview", formData, {
          headers: { Authorization: "Bearer " + Vue.localStorage.get("token") }
        })
        .then(function(data) {
          this.overview.success = data.body.success.success
          this.overview.plan = data.body.success.plan
          this.overview.active = data.body.success.active
        });
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
        emp_id:this.data_planDetail.emp_id
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
        emp_id:this.data_planDetail.emp_id
      }
      // if(this.keyword2 != ''){
      //    this.filter(this.keyword2)
      // }else {
      //   this.tripplanOverviewDetail(res , this.keyword2)
      // }
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
     closeAllCust () {
      this.$refs['details-dialog'].close()
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
    }
  },
  computed: {
    currentDates() {
      return this.getCalendar();
    },
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "planning");
      // this.$store.dispatch("setPathMenuService")
      // this.$store.dispatch("selectedMenuService" , {m_code : 'planning'})
      this.login = true;
      this.show_progress = true;
      this.getSalesmanByheadRole();
      this.getPurposeType();
      this.dispatchEvent();
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
  directives: {
    "click-outside": {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
     sticky: VueSticky
  },
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

    @media screen and (min-width: 1300px)  {
   .drop{
      width: 75%;
   }
  }
   @media screen and (max-width: 1200px)  {
     .drop{
       width: 100%;
     }
}
</style>

