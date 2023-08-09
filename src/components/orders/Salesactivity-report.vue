<template>
  <div id="pageSalesactivity">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>

    <div v-if="login == true">
      <md-layout
        md-align="start"
        md-flex="100"
        class="md-topic"
        style="padding-top: 25px; padding-left: 40px"
        >{{ "SALE ACTIVITY REPORT" }}</md-layout
      >
      <md-layout md-align="center" class="pt-20">
        <md-tabs id="tabSalesTeam" @change="onChange"  @click.native="onTabClick">
<!-- TAB1 -->      
          <md-tab
            id="tab-salesteam"
            :md-active="setActiveTab == 'salesteam'"
            md-label="Sales Team"
          >
            <md-layout  style="min-height: 570px;"  md-flex="100" md-align="center">
              <md-spinner
                style="z-index:10"
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>
              <md-card style="min-height: 570px;"  class="tap-table">
                <md-layout md-flex="100" style=";flex: unset; border: 0.5px solid #D1D1D1; background-color: #F7F7F7;">
                  <md-layout
                    md-flex="20"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      
                      font-size: 18px;
                    "
                  >
                  <div>
                    <div class="sales-period-box" @mouseleave="mouseLeave">
                        <md-card
                        style="padding:0"
                          class="sales-period-view-box"
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
                  </div>
                  </md-layout>
                  <md-layout style="padding:0 0 0 0"  md-flex="80" md-align="center">
                      <div style="width:100% ;">
                        <md-card-content style="padding:0 0 10px 0">
                          <md-layout md-gutter>
                            
                        <md-layout
                          md-flex="80"
                          style="
                            font-size: 18px;
                          "
                        >
                          <div style="padding-top: 10px;height:100%;font-size:16px;font-family:Roboto;width:34%;">SUCCESS RATE %</div>
                          <md-layout  v-for="(items) in data_sales_head" :key="items.id">
                              <div style="text-align: left;padding-top:10px;width:100%;">
                                <div style="font-size:20px;color:#414141;font-family:Roboto;font-weight:bold;height:60%;">{{items.amount}}%</div>
                                <div  style="color: #727272;font-size:12px;font-family:Roboto;color:#727272;height: 40%;">{{items.name}}</div>
                              </div>
                          </md-layout>
                         </md-layout>
                         
                      <!-- <md-layout>
                          <md-menu  style="text-align: end;width:100%;"  md-size="3" md-direction="bottom left">
                            <md-button  style="" class="md-icon-button" md-menu-trigger>
                              <md-icon style="padding-top:14px;font-size:29px;margin: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content style="background: #fff;margin-top:50px;">
                            
                              <md-menu-item
                              @selected="Export_(item)"
                              v-for="item in data_taglabel" :key="item.id"
                              >
                                <span>{{item.tagname}}</span>
                              </md-menu-item>
                            </md-menu-content>
                          </md-menu>
                      </md-layout> -->
                          </md-layout>
                        </md-card-content>
                    </div>
                  </md-layout>


                  <md-layout style="height:unset;padding:0 10px 10px 10px ;border:0.5px solid #D1D1D1;border-width:1px 0px 0px 0px;background-color:#fff;"  md-flex="100" md-align="center">
                      
                    <div  :class="'head-table'" style="font-family:Roboto;padding-bottom:0px;align-items: center;width:100% ;color:#0000008A;">
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
              
              <!-- v-for="(items, index) in k1List"
                :key="'K1' + items.po_no + '_' + index" -->
                
              <div
              v-for="item in data_tab1" :key="item.emp_id"
                class="content-table"
                style="cursor: pointer;font-family:Kanit;width:100%;font-family:roboto;padding-top:7px;height:35px"
                @click="NextTabBySM(item)"
              >
                <!-- @click="openDatail(items)" -->
                <div style="font-size:13px;width: 10%;text-align:left">{{item.emp_id }}</div>
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
                <div @click="NextTabBySM(item)"  style="width: 4%;text-align:center">
                   <md-icon  style="cursor: pointer;font-size:16px">arrow_forward_ios</md-icon>
                </div>
              </div>


                  </md-layout>
                </md-layout>
              </md-card>
            </md-layout>
          </md-tab>

<!-- TAB2 -->
  
          <md-tab
            id="tab-tpoverview"
            :md-active="setActiveTab == 'tripplan'"
            md-label="Trip Plan OverView"
          >
            <md-layout style="min-height: 570px; " md-flex="100" md-align="center">
              <md-spinner
              style="z-index:10"
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>
              <md-card style="min-height: 570px; height: 100%;" class="tap-table">
                <md-layout md-flex="100" style="
                padding-bottom: 0px !important;border: 0.5px solid #D1D1D1; background-color: #F7F7F7">
                  <md-layout
                    md-flex="20"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                    "
                  >
                  <div>
                    <div class="sales-period-box" @mouseleave="mouseLeave">
                        <md-card
                          class="sales-period-view-box"
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
                  </div>
                  </md-layout>


                  <md-layout
                    md-flex="30"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                    "
                  >
                  <div style=";width: 100%; background-color:">
                    <div style="width:100%;background:white;padding:5px 10px 5px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
                        <!-- {{data_activity_team}} -->
                        <md-input-container id="select_" class="md-sel" style="font-family:Kanit !important;width: 100%;margin:0px;padding-top:0px;min-height:100%">
                          
                          <md-select style="font-family:Kanit !important" v-model="select_data">
                            <md-option
                              :value="row.code"
                              v-for="(row ,index) in data_activity_team"
                              :key="'orderSourceList-hix'+index"
                              @click.native="filtersearch(row , index)"
                            > <span  style="font-family:Kanit !important">{{row.code}}: {{row.title}}</span></md-option>
                          </md-select>
                        </md-input-container>

                      </div>
                  </div>
                
                  </md-layout>

                  <md-layout
                  v-if="showBoxSearch"
                    md-flex="45"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      padding:0 0 0 10px;"
                  >

                  <md-input-container style="align-items: center;height: 40px !important;" class="-no-line -search mt-0 mb-1">
                        <md-icon  class="mr-5"> search
                        <md-tooltip>search</md-tooltip>
                        </md-icon>
                        <md-input
                          v-model="txt_search_tripplan"
                          v-on:change="search_data_tripplan"
                          style="font-family:Kanit;height: 40px;font-size:18px" id="" placeholder="Search Salesman" ></md-input>
                          <md-button @click="showBoxInpSearchOut" style="height: 100%;min-width:55px; margin:0;background-color:#fd7f00 " class="">
                            <md-icon style="color:#fff;padding-top:0px;">close</md-icon>
                            <md-tooltip style="font-family:Kanit;" md-direction="top">close</md-tooltip>
                          </md-button>
                    </md-input-container>

               
                  </md-layout>

                  <md-layout
                  v-if="!showBoxSearch"
                    md-flex="5"
                    style="
                    display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                      padding: 0px 0px 0 10px;
                    "
                  >
                   <md-card
                     style="box-shadow: 0 0 3px rgb(0 0 0 / 16%);cursor: pointer;border-radius:4px;overflow: hidden;width:100%;height: 40px;"
                          class=""
                          @click.native="showBoxInpSearch" 
                        >
                          <md-card-content  style="display: flex;height: 100%;padding:0">
                            <md-icon style="">search</md-icon>
                          </md-card-content>
                        </md-card>
                  </md-layout>

                  <md-layout
                  v-if="!showBoxSearch"
                    md-flex="40"
                    style="
                      font-size: 18px;
                      height: 70px;
                    "
                  >
                  <div  style="padding-top: 10px;height:100%;font-size:16px;font-family:Roboto;width:34%;"> <span @click="open_successRate" class="getSuccessRate">SUCCESS RATE %</span></div>
                  
                      <md-layout  v-for="(items) in data_sales_head" :key="items.id">
    
                        <div style="text-align: left;padding-top:15px;width:100%;">
                                <div style="font-size:20px;color:#414141;font-family:Roboto;font-weight:bold;height:50%;">{{items.amount}}%</div>
                                <div  style="color: #727272;font-size:12px;font-family:Roboto;color:#727272;height: 50%;">{{items.name}}</div>
                        </div>

                      </md-layout>
                  </md-layout>
                  <md-layout
                    md-flex="5"
                    style="
                      font-size: 18px;
                      height: 70px;
                      padding-top: 10px;
                    "
                  >
                  <md-menu style="text-align: end;width:100%;"  md-size="3" md-direction="bottom left">
                            <md-button  style="" class="md-icon-button" md-menu-trigger>
                              <md-icon style="padding-top:8px;font-size:30px;margin: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content style="background: #fff;margin-top:50px;">
                              <!-- @selected="openDialog_role(item)" -->
                              <md-menu-item
                              @selected="Export_(item)"
                              v-for="item in data_taglabel" :key="item.id"
                              >
                                <span>{{item.tagname}}</span>
                              </md-menu-item>
                            </md-menu-content>
                          </md-menu>
                  </md-layout>

                </md-layout>
                <md-layout style="padding:0 10px 0 10px ;background-color:#fff;overflow: hidden;height: 100%;"  md-flex="100" md-align="center">
                      
                       <div  :class="'head-table'" style="height: 40px;font-size:12px;background-color:#F7F7F7;font-family:Roboto;padding-bottom:0px;align-items: center;width:100% ;">
                          <div style="width:5%;text-align:left"></div>
                          <div style="width:13%;text-align:left"></div>
                          <div style="width:18%;text-align:center">Success Rate %</div>
                          <div style="width:18%;text-align:center">Visit Plan</div>
                          <div style="text-align:center;width: 18%;">Virtual Plan</div>
                          <div style="width:18%;">Unplan</div>
                          <div style="width:18%;">Active Stores</div>
                          <div style="width:2%;"></div>
                        </div>
                        <div  :class="'head-table'" style="margin-top:0;background-color:#F7F7F7;font-family:Roboto;align-items: center;width:100% ;">
                          <div style="width:5%;text-align:left;color:#0000008A;">Role</div>
                          <div style="width:13%;text-align:left;color:#0000008A;">Name</div>
                          <div style="display: flex;width:18%;text-align:center">
                            <div style="background-color:;width: 33%;color:#0000008A;">Visit Plan</div>
                            <div style="background-color:;width: 33%;;color:#0000008A;">Virtual Plan</div>
                            <div style="background-color:;width: 34%;opacity: 1;font-weight:bold ;">All Plan</div>
                          </div>
                          <div style="display: flex;width:18%;text-align:center">
                            <div style="background-color:;width: 33%;color:#0000008A;">Active </div>
                            <div style="background-color:;width: 33%;color:#0000008A;">Inactive </div>
                            <div style="background-color:;width: 34%;">Total </div>
                          </div>
                          <div style="display: flex;width:18%;text-align:center">
                            <div style="background-color:;width: 33%;;color:#0000008A;">Active </div>
                            <div style="background-color:;width: 33%;;color:#0000008A;">Inactive </div>
                            <div style="background-color:;width: 34%;">Total </div>
                          </div>
                          <div style="display: flex;width:15%;text-align:center">
                            <div style="background-color:;width: 33%;;color:#0000008A;">Visit </div>
                            <div style="background-color:;width: 33%;;color:#0000008A;">Virtual </div>
                            <div style="background-color:;width: 34%;">Total </div>
                          </div>

                          <div style="display: flex;width:20%;text-align:center">
                              <div style="font-size:10px;background-color:; display: flex;justify-content: center;width: 33%">
                                At the Stores
                                  <!-- <div  class="md-rectangle-icon medium pb-5" style="font-size:12px;font-weight:100; margin:0;background-color:gray;10px; height:10px;">
                                            OK
                                    <md-tooltip md-direction="top">At the Stores</md-tooltip>
                                  </div> -->
                              </div>
                              <div  style="font-size:10px;display: flex;
                                justify-content: center;background-color:;width: 33%;">
                                Far from Stores
                                <!-- <div class="md-rectangle-icon medium yellow pb-5" style="font-weight:100; margin:0;width:10px; height:10px;">
                                  !
                                  <md-tooltip md-direction="top">Far from Stores</md-tooltip>
                                </div> -->  
                              </div>
                            <div style="background-color:;width: 34%;">Total</div>
                          </div>
                          <div style="background-color:red;width:2%;"></div>
                          <div style="background-color:red;width:2%;"></div>
                        </div>
               <div
                  v-if="data_tab2.length == 0"
                  style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
                >
                  No data...
                </div>
                <div
                v-for="item in data_tab2" :key="item.emp_id"
                  class="content-table"
                  style="font-family:Kanit;width:100%;font-family:roboto;padding-top:7px;height:35px"
                >
                          <div   style="width:5%;text-align:left">{{item.emp_id}}</div>
                          <div    style="font-family:Kanit;width:13%;text-align:left">{{item.fullname}}</div>
                          <div   style="display: flex;width:18%;text-align:center">
                            <div   style="background-color:;width: 33%;">{{item.rate_visit_plan}}%</div>
                            <div    style="background-color:;width: 33%;">{{item.rate_virtual_plan}}%</div>
                            <div    style="background-color:;width: 34%;font-weight:bold ;">{{item.rate_all_plan}}%</div>
                          </div>
                          <div   style="display: flex;width:18%;text-align:center">
                            <div   style="background-color:;width: 33%;">{{item.active_visit_plan}}</div>
                            <div  style="background-color:;width: 33%;">{{item.inactive_visit_plan}}</div>
                            <div    style="background-color:;width: 34%;font-weight:bold ;">{{item.total_visit_plan}}</div>
                          </div>
                          <div   style="display: flex;width:18%;text-align:center">
                            <div    style="background-color:;width: 33%;">{{item.active_virtual_plan}}</div>
                            <div    style="background-color:;width: 33%;">{{formatNumber2(item.inactive_virtual_plan)}}</div>
                            <div    style="background-color:;width: 34%;font-weight:bold ;">{{formatNumber2(item.total_virtual_plan)}}</div>
                          </div>
                          <div   style="display: flex;width:15%;text-align:center">
                            <div    style="background-color:;width: 33%;">{{item.visit_unplanned}}</div>
                            <div    style="background-color:;width: 33%;">{{item.virtual_unplanned}}</div>
                            <div    style="background-color:;width: 34%;font-weight:bold ;">{{item.total_unplanned}}</div>
                          </div>

                          <div   style="display: flex;width:20%;text-align:center">
                            <div    style="background-color:;width: 33%;">{{item.at_the_stores}}</div>
                            <div 
                               @click="openDialog_far_from(item)"
                               style="background-color:;width: 33%;"
                               :style="{'color': item.far_from_stores != '0'? '#fd7f00' : '',
                                        'cursor': item.far_from_stores != '0'? 'pointer' : ''   }"
                               >{{item.far_from_stores}}</div>
                            <div  style="background-color:;width: 34%;font-weight:bold ;">{{item.total_active_stores}}</div>
                          </div>

                          <div  @click="openDialog(item)" style="width: 2%;text-align:center">
                            <md-icon   style="font-size:18px;cursor: pointer;color:#fd7f00;cursor: pointer;">info</md-icon>
                          </div>  
                          <div  @click="NextTabByTp(item)"  style="width: 2%;text-align:center">
                            <md-icon  style="cursor: pointer;font-size:16px">arrow_forward_ios</md-icon>
                          </div>
                </div>
                    </md-layout>
              </md-card>
            </md-layout>
          </md-tab>


<!-- TAB3 -->
          <md-tab
                      id="tab-customer"
                      :md-active="setActiveTab == 'customer'"
                      md-label="Customer Overview"
                    >
                      <md-layout style="min-height: 570px;" md-flex="100" md-align="center">
                        <md-spinner
                          style="z-index:10"
                          :md-size="150"
                          :md-stroke="1"
                          v-show="spinner"
                          md-indeterminate
                        ></md-spinner>
                        <md-card style="min-height: 570px; height: 100%;" class="tap-table">
                          <md-layout md-flex="100" style="
                          padding-bottom: 0px !important;border: 0.5px solid #D1D1D1; background-color: #F7F7F7">
                            <md-layout
                              md-flex="20"
                              style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 18px;
                                height: 70px;
                              "
                            >
                            <div>
                              <div class="sales-period-box" @mouseleave="mouseLeave">
                                  <md-card
                                    class="sales-period-view-box"
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
                            </div>
                            </md-layout>


                            <md-layout
                              md-flex="25"
                              style="
                              display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 18px;
                                height: 70px;
                              "
                            >
                            <div style=";width: 100%; background-color:">
                              <div style="width:100%;background:white;padding:5px 10px 2px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
                                  <md-input-container id="select_" class="md-sel" style="width: 100%;margin:0px;padding-top:0px;min-height:100%">
                                  <label style="margin:0 0 10px 0" v-if="select_data_order == '' ">Please Select</label>
                                  <md-select  v-model="select_data_order">
                                  
                                      <md-option
                                        style="font-family:Kanit"
                                        :value="row.code"
                                        v-for="(row ,index) in data_activity_team"
                                        :key="'orderSourceList-hix'+index"
                                        @click.native="filtersearch_order(row , index)"
                                      ><span style="font-family:Kanit;">{{row.code}}: {{row.title}}</span></md-option>
                                    </md-select>
                                  </md-input-container>
                                </div>
                            </div>
                            </md-layout>

                            <md-layout
                              md-flex="40"
                              style="
                              display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 18px;
                                height: 70px;
                                padding: 0px 0px 0 10px;"
                            >

                            <md-input-container style="align-items: center;height: 40px !important;" class="-no-line -search mt-0 mb-1">
                                  <md-icon  class="mr-5"> search
                                  <md-tooltip>search</md-tooltip>
                                  </md-icon>
                                  <md-input v-on:change="search_data_customer" v-model="txt_search_customer" style="font-family:Kanit;height: 45px;font-size:18px" id="search_salesman_tripplan_report" placeholder="Search Customer" ></md-input>
                                  <md-icon
                                  v-if="txt_search_customer.length != 0" 
                                  @click.native ="clear_search_customer"
                                  style="margin: 0 5px 0 0;cursor:pointer;">close</md-icon>
                              </md-input-container>
                            </md-layout>

                            <md-layout
                              md-flex="10"
                              style="
                              display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 18px;
                                height: 70px;
                                padding:0 0 0 10px;
                              "
                            >
                            <md-button  class="-orange"
                          style= "width: 100%; height:40px;min-height:40px;margin:unset;border-radius:3px;font-size:14px;line-height:30px"
                              @click="NextAllOrder('all')"
                          >ALL ORDER</md-button>
                            </md-layout>
                          
                            <md-layout
                              md-flex="3"
                              style="
                                font-size: 18px;
                                height: 70px;
                                padding-top: 10px;
                              "
                            >
                            <md-menu style="text-align: end;width:100%;"  md-size="3" md-direction="bottom left">
                                      <md-button :disabled="select_data_order == '' ? true : false "  style="" class="md-icon-button" md-menu-trigger>
                                        <md-icon style="padding-top:8px;font-size:30px;margin: 0px !important;"
                                          >more_vert</md-icon
                                        >
                                      </md-button>
                                      <md-menu-content style="background: #fff;margin-top:50px;">
                                        <!-- @selected="openDialog_role(item)" -->
                                        <md-menu-item
                                        @selected="Export_(item)"
                                        v-for="item in data_taglabel" :key="item.id"
                                        >
                                          <span>{{item.tagname}}</span>
                                        </md-menu-item>
                                      </md-menu-content>
                                    </md-menu>
                            </md-layout>
                          </md-layout>
                        <div style="text-align: end;height: 70px;width: 100%; ">
                        
                          <div style="
                                opacity: 1;
                                display:flex;
                                height:75px;width:100%;"> 
                            <div style="
                                font-family:Roboto;
                                font-size:20px;
                                color: #414141;
                                opacity: 1;
                                width:68%;
                                display: flex;
                                padding: 13px 50px 0px 10px;
                                justify-content: flex-end;
                                ">
                                Total
                            </div>
                            <div style="width:15%">
                              <div style="   
                                display: flex;
                                padding:10px 0 0 0;
                                justify-content: left;
                                align-items: center;
                                height: 50%;
                                color: #414141;
                                font-family:Roboto;
                                opacity: 1;
                                font-size:20px;
                                "> 
                                {{this.sum_customer.order_value == '-' ? '0.00' :''+  this.sum_customer.order_value}}
                                </div>
                              <div style="
                                display: flex;
                                padding:0 0 10px 0;
                                align-items: center;
                                justify-content: left;
                                height: 50%;
                                color: #727272;
                                opacity: 1;
                                font-family:Roboto;
                                font-size:10px"> Order Value </div>
                            </div>
                            <div style="width:15%">
                              <div style="    
                                display: flex;
                                padding:10px 0 0 0;
                                justify-content: left;
                                align-items: center;
                                height: 50%;
                                color: #414141;
                                font-family:Roboto;
                                opacity: 1;
                                font-size:20px;
                                "> 
                                {{ this.sum_customer.invoice_value == '-' ? '0.00' : ''+ this.sum_customer.invoice_value}}
                                </div>
                              <div style="
                              padding:0 0 10px 0;
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                font-family:Roboto;
                                height: 50%;color: #727272;
                                opacity: 1;font-size:10px"> Invoice Value </div>
                            </div>
                          </div>

                        </div> 
                          <md-layout style="padding:0 10px 0 10px ;background-color:#fff;overflow: hidden;height: 100%;"  md-flex="100" md-align="center">
                                
                                <div  :class="'head-table'" style="margin-top:0px;height: 40px;background-color:#F7F7F7;Roboto;padding-bottom:0px;align-items: center;width:100% ;">
                                    <div style="background-color:; width:3%;text-align:left"></div>
                                    <div style="background-color:;width:28%;text-align:left"></div>
                                    <div style="background-color:;width:15%;text-align:center">Visit</div>
                                    <div style="background-color:;width:15%;text-align:center;">Virtual</div>
                                    <div style="background-color:;width:15%;text-align:center;">Total</div>
                                    <div style="background-color:;text-align:center;width:22%;"></div>
                                    <div style="background-color:;width:2%;"></div>
                                  </div>

                                  
                                  <div  :class="'head-table'" style="margin-top:0;background-color:#F7F7F7;Roboto;align-items: center;width:100% ;color:#0000008A;">
                                    <div style="background-color:;width:3%;text-align:center">No.</div>
                                    <div style="background-color:;width:20%;text-align:center">Customer</div>
                                    <div style="background-color:;width:8%;text-align:center">Province</div>
                                    <div style="display: flex;width:15%;text-align:center">
                                      <div style="background-color:;width:50%;">Plan
                                        <md-tooltip md-direction="top">{{this.customer_tooltip.visit.plan}}</md-tooltip>
                                      </div>
                                      <div style="background-color:;width:50%;">Check-in
                                        <md-tooltip md-direction="top">{{this.customer_tooltip.visit.in}}</md-tooltip>
                                      </div>
                                    
                                    </div>
                                    <div style="display: flex;width:15%;text-align:center">
                                        <div style="background-color:;width:50%;font-weight:bold ;">Plan
                                          <md-tooltip md-direction="top">{{this.customer_tooltip.virtual.plan}}</md-tooltip>
                                        </div>
                                      <div style="background-color:;width:50%;">Check-in
                                        <md-tooltip md-direction="top">{{this.customer_tooltip.virtual.in}}</md-tooltip>
                                      </div>
                                    </div>

                                    <div style="display: flex;width:15%;text-align:center">
                                        <div style="background-color:;width:50%;font-weight:bold ;">Plan
                                          <md-tooltip md-direction="top">{{this.customer_tooltip.total.plan}}</md-tooltip>
                                        </div>
                                      <div style="background-color:;width:50%;">Check-in
                                        <md-tooltip md-direction="top">{{this.customer_tooltip.total.in}}</md-tooltip>
                                      </div>
                                    </div>
                                    
                                    <div style="display: flex;width:22%;background-color:">

                                      <div style="background-color:;width:50%;">Order Value
                                      </div>
                                      <div style="background-color:;width:50%;">Invoice Value
                                      </div>
                                      <!-- <div style="background-color:;width:30%;">PO.No.</div>
                                      <div style="background-color:;width:30%;">Invoice No.</div> -->
                                  
                                    </div>
                                    <div style="background-color;width:%;"></div>
                                  </div>
                        <div
                            v-if="detail_tap_customer.length == 0"
                            style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
                          >
                            No data...
                          </div>
                          <div
                          @click="NextAllOrder(item)"
                          v-for="(item ,index) in detail_tap_customer"  :key="item.cust_code + '' + index"
                            class="content-table"
                            style="cursor: pointer;font-family:Kanit;width:100%;font-family:roboto;padding-top:7px;height:35px"
                          >
                                  <div style="background-color:;width:3%;text-align:center">{{index +1 }}</div>
                                    <div style="padding:0 10px 0 0;font-family:Kanit;background-color:;width:20%;text-align:left;white-space: nowrap; 
                                              overflow: hidden;
                                              text-overflow: ellipsis;">
                                      {{item.customer}}
                                      <md-tooltip style="font-family:Kanit;" md-direction="top">{{item.customer}}</md-tooltip>
                                    </div>
                                    <div style="padding:0 10px 0 0;font-family:Kanit;background-color:;width:8%;text-align:left;white-space: nowrap; 
                                              overflow: hidden;
                                              text-overflow: ellipsis;">
                                      {{item.province}}
                                      <md-tooltip style="font-family:Kanit;" md-direction="top">{{item.province}}</md-tooltip>
                                    </div>
                                    <div style="display: flex;width:15%;text-align:center">
                                      <div style="background-color:;width: 50%;text-align:center">{{item.plan_visit}}</div>
                                      <div style="background-color:;width: 50% ;">{{item.in_visit}}</div>
                                    </div>
                                    <div style="display: flex;width:15%;text-align:center">
                                      <div style="background-color:;width: 50%;">{{item.plan_virtual}}</div>
                                      <div style="background-color:;width: 50%;">{{item.in_virtual}}</div>
                                    </div>
                                    <div style="display: flex;width:15%;text-align:center">
                                      <div style="background-color:;width: 50%;">{{item.total_plan}}</div>
                                      <div style="background-color:;width: 50%;">{{item.total_in}}</div>
                                    </div>

                                    <div style="display: flex;width: 22%;background-color:">

                                        <div style="background-color:;width:50%;text-align:right">{{formatNumber(item.order_value)}}</div>
                                        <div style="background-color:;width:50%;text-align:right">{{formatNumber(item.invoice_value)}}</div>
                                      
                                          <div style="width: 2%;">
                                      <md-icon  style="font-size:16px">arrow_forward_ios</md-icon>

                                          </div>
                                    </div>
                          </div>
                              </md-layout>


                        </md-card>
                      </md-layout>
          </md-tab>

        
<!-- TAB4 -->
        <md-tab
            id="tab-orderoverview"
            :md-active="setActiveTab == 'order'"
            md-label="Order Overview"
          >
            <md-layout style="min-height: 570px;" md-flex="100" md-align="center">
              <md-spinner
                style="z-index:10"
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>
              <md-card style="min-height: 570px; height: 100%;" class="tap-table">
                <md-layout md-flex="100" style="
                padding-bottom: 0px !important;border: 0.5px solid #D1D1D1; background-color: #F7F7F7">
                  <md-layout
                    md-flex="20"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                    "
                  >
                  <div>
                    <div class="sales-period-box" @mouseleave="mouseLeave">
                        <md-card
                          class="sales-period-view-box"
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
                  </div>
                  </md-layout>


                  <md-layout
                    md-flex="25"
                    style="
                    display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                    "
                  >
                  <div style=";width: 100%; background-color:">
                    <div style="width:100%;background:white;padding:5px 10px 2px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
                        <md-input-container id="select_" class="md-sel" style="width: 100%;margin:0px;padding-top:0px;min-height:100%">
                        <label style="margin:0 0 10px 0" v-if="select_data_order == '' ">Please Select</label>
                        <md-select  v-model="select_data_order">
                        
                            <md-option
                              style="font-family:Kanit"
                              :value="row.code"
                              v-for="(row ,index) in data_activity_team"
                              :key="'orderSourceList-hix'+index"
                              @click.native="filtersearch_order(row , index)"
                            ><span style="font-family:Kanit;">{{row.code}}: {{row.title}}</span></md-option>
                          </md-select>
                        </md-input-container>
                      </div>
                  </div>
                  </md-layout>

                  <md-layout
                    md-flex="15"
                    style="
                    display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                      padding:0 0 0 10px;
                    "
                  >
                    
                  <div style=";width: 100%; background-color:">
                    <div style="width:100%;background:white;padding:5px 10px 2px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
                        <md-input-container  class="md-sel" style="width:100%;margin:0px;padding-top:0px;min-height:100%">
                        <!-- <label style="margin:0 0 10px 0" v-if="select_data_order == '' ">Please Select</label> -->
                        <md-select  v-model="select_type">
                        
                            <md-option
                              style="min-width: 200px;font-family:Roboto"
                              :value="row.value"
                              v-for="(row ,index) in SelectType"
                              :key="'orderSourceList-hix'+index"
                              @click.native="select_type_status_order(row , index)"
                            ><span style="font-family:Roboto;">{{row.name}}</span></md-option>
                          </md-select>
                        </md-input-container>
                      </div>
                  </div>
                  </md-layout>

                  <md-layout
                    md-flex="15"
                    style="
                    display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                      padding:0 0 0 10px;
                    "
                  >
                    
                  <div style="width: 100%; background-color:">
                    <div style="width:100%;background:white;padding:5px 10px 2px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
                        <md-input-container  class="md-sel" style="width: 100%;margin:0px;padding-top:0px;min-height:100%">
                        <md-select  v-model="select_status">
                        
                            <md-option
                              style="min-width: 200px;font-family:Roboto"
                              :value="row.value"
                              v-for="(row ,index) in SelectStatus"
                              :key="'orderSourceList-hix'+index"
                              @click.native="select_type_status_order(row , index)"
                            ><span style="font-family:Roboto;">{{row.name}}</span></md-option>
                          </md-select>
                        </md-input-container>
                      </div>
                  </div>
                  
                  </md-layout>
                  <md-layout
                    md-flex="20"
                    style="
                    display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 18px;
                      height: 70px;
                      padding: 0px 0px 0 10px;"
                  >

                  <md-input-container style="align-items: center;height: 40px !important;" class="-no-line -search mt-0 mb-1">
                        <md-icon  class="mr-5"> search
                        <md-tooltip>search</md-tooltip>
                        </md-icon>
                        <md-input v-on:change="search_data_order" v-model="txt_search_order" style="font-family:Kanit;height: 45px;font-size:18px" id="search_salesman_tripplan_report" placeholder="Search Customer" ></md-input>
                        <md-icon
                         v-if="txt_search_order.length != 0" 
                         @click.native ="clear_search_order"
                         style="margin: 0 5px 0 0;cursor:pointer;">close</md-icon>
                    </md-input-container>
                  </md-layout>
                  <md-layout
                    md-flex="5"
                    style="
                      font-size: 18px;
                      height: 70px;
                      padding-top: 10px;
                    "
                  >
                  <md-menu style="text-align: end;width:100%;"  md-size="3" md-direction="bottom left">
                            <md-button :disabled="select_data_order == '' ? true : false "  style="" class="md-icon-button" md-menu-trigger>
                              <md-icon style="padding-top:8px;font-size:30px;margin: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content style="background: #fff;margin-top:50px;">
                              <!-- @selected="openDialog_role(item)" -->
                              <md-menu-item
                              @selected="Export_(item)"
                              v-for="item in data_taglabel" :key="item.id"
                              >
                                <span>{{item.tagname}}</span>
                              </md-menu-item>
                            </md-menu-content>
                          </md-menu>
                  </md-layout>
                </md-layout>
              <div style="text-align: end;height: 70px;width: 100%; ">
               
                <div style="
                      opacity: 1;
                      display:flex;
                      height:75px;width:100%;"> 
                  <div style="
                      font-family:Roboto;
                      font-size:20px;
                      color: #414141;
                      opacity: 1;
                      width:68%;
                      display: flex;
                      padding: 13px 50px 0px 10px;
                      justify-content: flex-end;
                      ">
                      Total
                   </div>
                  <div style="width:15%">
                     <div style="   
                      display: flex;
                      padding:10px 0 0 0;
                      justify-content: left;
                      align-items: center;
                      height: 50%;
                      color: #414141;
                      font-family:Roboto;
                      opacity: 1;
                      font-size:20px;
                      "> 
                      {{this.sum_order.order_value == '-' ? formatNumber(0) :''+  formatNumber(this.sum_order.order_value)}}
                      </div>
                     <div style="
                      display: flex;
                      padding:0 0 10px 0;
                      align-items: center;
                      justify-content: left;
                      height: 50%;
                      color: #727272;
                      opacity: 1;
                      font-family:Roboto;
                      font-size:10px"> Order Value </div>
                  </div>
                  <div style="width:15%">
                     <div style="    
                      display: flex;
                      padding:10px 0 0 0;
                      justify-content: left;
                      align-items: center;
                      height: 50%;
                      color: #414141;
                      font-family:Roboto;
                      opacity: 1;
                      font-size:20px;
                      "> 
                      {{ this.sum_order.invoice_value == '-' ? formatNumber(0) : ''+ formatNumber(this.sum_order.invoice_value)}}
                      </div>
                     <div style="
                     padding:0 0 10px 0;
                      display: flex;
                      align-items: center;
                      justify-content: left;
                      font-family:Roboto;
                      height: 50%;color: #727272;
                      opacity: 1;font-size:10px"> Invoice Value </div>
                  </div>
                </div>

              </div> 

                <md-layout style="padding:0 10px 0 10px ;background-color:#fff;overflow: hidden;height: 100%;"  md-flex="100" md-align="center">
                      
                       <div  :class="'head-table'" style="margin-top:0px;height: 40px;background-color:#F7F7F7;Roboto;padding-bottom:0px;align-items: center;width:100% ;">
                          <div style="background-color:; width:3%;text-align:left"></div>
                          <div style="background-color:;width:20%;text-align:left"></div>
                          <div style="background-color:;width:15%;text-align:center">Planning</div>
                          <div style="background-color:;width:10%;text-align:center;">Count</div>
                          <div style="background-color:;text-align:center;width:41%;"></div>
                          <div style="background-color:;width:2%;"></div>
                        </div>

                        
                        <div  :class="'head-table'" style="margin-top:0;background-color:#F7F7F7;Roboto;align-items: center;width:100% ;color:#0000008A;">
                          <div style="background-color:;width:3%;text-align:center">No.</div>
                          <div style="background-color:;width:20%;text-align:center">Customer</div>
                          <div style="display: flex;width:15%;text-align:center">
                            <div style="background-color:;width: 70%;">Current Plan</div>
                            <div style="background-color:;width: 30%;">Status</div>
                          
                          </div>
                          <div style="display: flex;width:10%;text-align:center">
                              <div style="background-color:;width: 50%;font-weight:bold ;">Plan
                                <md-tooltip md-direction="top">{{this.sum_order.plan}}</md-tooltip>
                              </div>
                            <div style="background-color:;width: 50%;">Check-in
                              <md-tooltip md-direction="top">{{this.sum_order.checkIn}}</md-tooltip>
                            </div>
                          </div>
                          <div style="display: flex;width: 50%;background-color:">

                            <div style="background-color:;width:20%;">Order Value
                            </div>
                            <div style="background-color:;width:20%;">Invoice Value
                            </div>
                            <div style="background-color:;width:30%;">PO.No.</div>
                            <div style="background-color:;width:30%;">Invoice No.</div>
                        
                          </div>
                          <div style="background-color:;width:2%;"></div>
                        </div>
               <div
                  v-if="data_tab3.length == 0"
                  style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
                >
                  No data...
                </div>
                <div
                v-for="(item ,index) in data_tab3"  :key="item.cust_code + '' + index"
                  class="content-table"
                  style="font-family:Kanit;width:100%;font-family:roboto;padding-top:7px;height:35px"
                >
                         <div style="background-color:;width:3%;text-align:center">{{index +1 }}</div>
                          <div style="padding:0 10px 0 0;font-family:Kanit;background-color:;width:20%;text-align:left;white-space: nowrap; 
                                    overflow: hidden;
                                    text-overflow: ellipsis;">
                            {{item.customer}}
                            <md-tooltip style="font-family:Kanit;" md-direction="top">{{item.cust_name}}</md-tooltip>
                          </div>
                          <div style="display: flex;width:15%;text-align:center">
                            <div style="background-color:;width: 70%;text-align:center">{{item.current}}</div>
                            <div style="background-color:;width: 30% ;">{{item.visit_status}}</div>
                          </div>
                          <div style="display: flex;width:10%;text-align:center">
                            <div style="background-color:;width: 50%;">{{item.count_plan}}</div>
                            <div style="background-color:;width: 50%;">{{item.count_checkin}}</div>
                          </div>

                          <div style="display: flex;width: 50%;background-color:">

                              <div style="background-color:;width:20%;text-align:right">{{formatNumber(item.order_value)}}</div>
                              <div style="background-color:;width:20%;text-align:right">{{formatNumber(item.invoice_value)}}</div>
                            
                              <div @click="dialog_order(item)" class="hover_" style="display: flex; width: 60%;"> 
                                <div style="
                                    background-color: ;
                                    width: 50%;
                                   white-space: nowrap; 
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    padding:0 0 0 20px;
                                ;">
                                {{item.group_po_no}}
                                </div>
                                <div style="
                                    background-color: ;
                                    width: 50%;
                                    white-space: nowrap; 
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    padding:0 0 0 20px;
                                ;">
                                {{item.group_inv_no}}
                                </div>
                                </div>
                          </div>
                </div>
                    </md-layout>


              </md-card>
            </md-layout>
        </md-tab>


        </md-tabs>
      </md-layout>
    </div>

    <md-dialog style=""   id="activity_overview"  ref="TripPlanOverview" >
      <md-dialog-title 
            style="
            margin-bottom: 0px; 
            height: 40px; 
            font-size:14px;
            color:#414141;
            padding: 10px 10px 0;
            display:flex;
            background-color:#EFEFEF ;">

            <div style="padding:0 0 0 20px;font-family:Kanit;text-align: left;width: 90%;"> <span style="font-family:Lato;color: #414141;font-weight: bold;">Trip Plan Overview </span> : {{this.txt_title_dialog_tripplan}} </div>

            <div style="text-align: end;width: 10%;">
               <md-icon @click.native="closeDialog_('close')" style="cursor: pointer;">close</md-icon>
            </div>
     
      </md-dialog-title>
    
    <md-dialog-content class="body-deatil" style="max-height:none !important;cursor: default;">
    

      <md-layout style="cursor: default;margin:0 0 10px 0;" md-align="strat" md-flex="20">
            <md-card  md-with-hover class="-large -radius4-shadow0-16 -no-y-scroll" style="cursor: default;margin-top:16px;max-height:1000px">
        
              <md-card-content style="padding:0px;overflow: hidden;" class="">
<!-- SUCCESS -->
<md-list  
              style="padding:0px">
               <md-list-item
               class="head-menu-setting"
               style="
               height: 35px;
               display: flex;
                          background: #F7F7F7 0% 0% no-repeat padding-box;
                          border: 0.5px solid #D1D1D1;
                          opacity: 1;0"
               >
                 <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'SUCCESS RATE %' }}</span>
               </md-list-item>
             <md-layout  md-gutter>
          <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
            <div  v-for="(items) in  data_dialog_tripplan.success"
                       :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                  <md-layout style="padding-top:15px">
                             <div style="width: 100%;text-align: center;" >
                               <span  style="padding:0 2px 0 2px;font-size:20px" class="header2">{{items.amount}}%<small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                               <br>
                               <span style="padding:0 2px 0 2px" class="header3">{{items.name}}</span>
                               <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.title}}</md-tooltip>
                             </div>
                  </md-layout>
             </div>
         </div>
             </md-layout>
              
             </md-list>
<!-- PLAN -->
          <md-list  
              style="padding:0px">
               <md-list-item
               class="head-menu-setting"
               style="
               height: 35px;
               display: flex;
                          background: #F7F7F7 0% 0% no-repeat padding-box;
                          border: 0.5px solid #D1D1D1;
                          opacity: 1;0"
               >
                 <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'PLAN' }}</span>
               </md-list-item>
             <md-layout  md-gutter>
          <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
            <div  v-for="(items) in  data_dialog_tripplan.plan"
                       :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                  <md-layout style="padding-top:15px">
                             <div style="width: 100%;text-align: center;">
                               <span  style="padding:0 2px 0 2px;font-size:20px" class="header2">{{formatNumber2(items.amount)}} <small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                               <br>
                               <span style="padding:0 2px 0 2px" class="header3">{{items.name}}</span>
                               <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.title}}</md-tooltip>
                             </div>
                  </md-layout>
             </div>
         </div>
             </md-layout>
              
             </md-list>
<!-- ACTIVE -->
        <md-list  
              style="padding:0px">
               <md-list-item
               class="head-menu-setting"
               style="
               height: 35px;
               display: flex;
                          background: #F7F7F7 0% 0% no-repeat padding-box;
                          border: 0.5px solid #D1D1D1;
                          opacity: 1;"
               >
                 <span style="font-family: Roboto !important; font-size: 14px !important">{{ 'ACTIVE' }}</span>
               </md-list-item>
             <md-layout  md-gutter>
          <div style="padding:0 0 0 20px;width: 100%;" class="md-layout md-gutter">
            <div  v-for="(items) in  data_dialog_tripplan.active"
                       :key="'overview'+items.id" style="width: 33%;" class="md-layout-item">
                  <md-layout style="padding-top:15px">
                             <div style="width: 100%;text-align: center;">
                               <span  style="padding:0 2px 0 2px;font-size:20px" class="header2">{{formatNumber2(items.amount)}} <small style="font-size:14px;color:#9D9D9D" v-if="items.amount_group > 0">({{items.amount_group}})</small></span>
                               <br>
                               <span style="padding:0 2px 0 2px" class="header3">{{items.name}}</span>
                               <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.title}}</md-tooltip>
                             </div>
                  </md-layout>
             </div>
         </div>
             </md-layout>
              
             </md-list>

              </md-card-content>
            </md-card>
          </md-layout>
    </md-dialog-content>
    </md-dialog>

    <md-dialog   id=""  ref="OrderOverview" >
      <md-dialog-title 
            style="
            height: 40px;
            font-size:14px;
            color:#414141;
            padding: 10px 10px 0;
            display:flex;
            background-color:#EFEFEF ;">

            <!-- <div style="font-family:Kanit;text-align: left;width: 90%;">  Order Overview : {{this.txt_title_dialog_order}} </div> -->
            <div style="padding:0 0 0 20px;font-family:Kanit;text-align: left;width: 100%;"> <span style="font-family:Lato;color: #414141;font-weight: bold;">Order Overview  </span> :  {{this.txt_title_dialog_order}} </div>

            <div style="text-align: end;width: 10%;">
               <md-icon @click.native="closeDialog_('close')" style="cursor: pointer;">close</md-icon>
            </div>
     
      </md-dialog-title>
    
    <md-dialog-content class="body-deatil" style="width:1000px;">
    

      <md-layout style="margin:0 0 10px 0;" md-align="strat" md-flex="20">
              <md-card-content style="width: 100%;padding:0px;overflow: hidden;" class="">
                <div style="
                      background: #F7F7F7 0% 0% no-repeat padding-box;
                      border: 0.5px solid #D1D1D1;
                      opacity: 1;
                      display:flex;
                      height:79px;width:100%;"> 
                  <div style="
                      font-family:Kanit;
                      font-size:20px;
                      color: #414141;
                      opacity: 1;
                      width:60%;
                      display: flex;
                      align-items: center;
                      padding: 0 0 0 10px;">
                          {{this.data_dialog_order.code}} : {{this.data_dialog_order.name}}
                   </div>
                  <div style="width:20%">
                     <div style="    
                      display: flex;
                      padding:10px 0 0 0;
                      justify-content: left;
                      align-items: center;
                      height: 50%;
                      color: #414141;
                      font-family:Roboto;
                      opacity: 1;
                      font-size:20px;
                      "> 
                      {{formatNumber(this.data_dialog_order.order_value)}}
                      </div>
                     <div style="
                      display: flex;
                      padding:0 0 10px 0;
                      align-items: center;
                      justify-content: left;
                      height: 50%;
                      color: #727272;
                      opacity: 1;
                      font-family:Roboto;
                      font-size:14px"> Total Order Value </div>
                  </div>
                  <div style="width:20%">
                     <div style="    
                      display: flex;
                      padding:10px 0 0 0;
                      justify-content: left;
                      align-items: center;
                      height: 50%;
                      color: #414141;
                      font-family:Roboto;
                      opacity: 1;
                      font-size:20px;
                      "> 
                      {{formatNumber(this.data_dialog_order.inv_value)}}
                      </div>
                     <div style="
                     padding:0 0 10px 0;
                      display: flex;
                      align-items: center;
                      justify-content: left;
                      font-family:Roboto;
                      height: 50%;color: #727272;
                      opacity: 1;font-size:14px"> Total Invoice Value </div>
                  </div>
                </div>
                <div style="padding: 10px 0 0 0 ;width: 100%;">  
                    
                      <div 
                        style="
                          display: flex;
                          text-align: center;
                          color: #0000008A;
                          opacity: 1;
                          font-family:Roboto;
                          font-size:12px;
                          " 
                          class='tb_h'>
                        <div style="width:16%;">PO No.</div>
                        <div style="width:16%;">Invoice No.</div>
                        <div style="width:16%;">PO. Date</div>
                        <div style="width:16%;">Invoice Date</div>
                        <div style="width:16%;text-align: right;">Order Value</div>
                        <div style="width:16%;text-align: right;">Invoice Value</div>
                      </div>
                      <div 
                        style="
                          display: flex;
                          text-align: center;
                          color: #414141;
                          opacity: 1;
                          font-family:Roboto;
                          font-size:13px;
                          margin-top:10px;
                          " 
                          class='tb_h'
                          v-for="(items) in this.data_dialog_order.detail" :key="items.id"
                          >
                        <div style="width:16%;">{{items.po_no}}</div>
                        <div style="width:16%;">{{items.inv_no}}</div>
                        <div style="width:16%;">{{items.po_date}}</div>
                        <div style="width:16%;">{{items.inv_date}}</div>
                        <div :style="{'font-style': items.source == 'xpress' ? 'italic' : ''   ,'color' : items.source == 'xpress'  ? '#0000008A' : ''}"  style="width:16%;text-align: right;">{{items.order_value == '' ? '0.00' : formatNumber(items.order_value)}}</div>
                        <div :style="{'font-style': items.status == 'not invoice' ? 'italic' : ''   ,'color' : items.status == 'not invoice' ? '#0000008A' : ''}" style="width:16%;text-align: right;">{{items.inv_value == '' ? '0.00' : formatNumber(items.inv_value)}}</div>
                      </div>
                </div>
              </md-card-content>
              <md-dialog-actions style="min-height:0px;padding:10px 30px 0 0;text-align: end;width:100%;color:#0000008A;font-style:italic;margin:0">
                <div style="font-family:Kanit;font-size:13px;: 100%;">{{this.data_dialog_order.title}}</div>
                
             </md-dialog-actions>
            
          </md-layout>
    </md-dialog-content>
    </md-dialog>

    <md-dialog  id="export_ac" ref="Export" >
      <div
          class="mds-card"
          id="mds-card-export-myback"
          style="z-index:100"
          :style="{
          
            top: '130px',
            right: '2%',
            width: '600px',
            left: '30%',
            top: '35%'
          }"
        >
          <div class="title">
            <div style="text-align: center;width:95%" class="left">
              {{ 'Export to email' }}
            </div>
            <div style="width:5%;cursor:pointer" @click="closeMdsCard()">
              <md-icon>close</md-icon>
            </div>
          </div>
          <div class="body">
            <div style="padding-left: 8%;padding-right: 9%;">
              <md-input-container  style="
              overflow-y: auto;
              overflow-x: hidden;
              padding: 3px 10px;
              border: 1px solid #fd7f00;
              border-radius: 4px;
              margin: 0px;
              height: 75px;
              " >
                <md-textarea v-model="emailInput"></md-textarea>
              </md-input-container>
              <div v-if="incorrectEmail.length > 0" class="email-error">
                email format is incorrect
              </div>
            </div>
          </div>
          <div class="footer_ex">
            <md-button
              style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
              @click="closeMdsCard()"
              >CANCEL</md-button
            >
            <md-button
              style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
              @click="exportData()"
              >SEND</md-button
            >
          </div>
        </div>
    </md-dialog>

    <md-dialog   id=""  ref="farFromStore" >
      <md-dialog-title 
            style="
            height: 40px;
            font-size:14px;
            color:#414141;
            padding: 10px 10px 0;
            display:flex;
            background-color:#EFEFEF ;">

            <!-- <div style="font-family:Kanit;text-align: left;width: 90%;">  Order Overview : {{this.txt_title_dialog_order}} </div> -->
            <div style="padding:0 0 0 20px;font-family:Kanit;text-align: left;width: 100%;"> <span style="font-family:Lato;color: #414141;font-weight: bold;">Trip Plan Overview </span> :  {{this.dialogFarFromStore.title}} </div>

            <div style="text-align: end;width: 10%;">
               <md-icon @click.native="closeDialog_('close')" style="cursor: pointer;">close</md-icon>
            </div>
     
      </md-dialog-title>
    
    <md-dialog-content class="body-deatil" style="width:800px;">
    

      <md-layout style="margin:0 0 10px 0;" md-align="strat" md-flex="20">
              <md-card-content style="width: 100%;padding:0px;overflow: hidden;" class="">
              
                <div style="padding: 10px 0 0 0 ;width: 100%;">  
                      <div 
                        style="
                        background: #F7F7F7 0% 0% no-repeat padding-box; 
                        height: 30px;
                        border: 0.5px solid #D1D1D1;
                          display: flex;
                          text-align: center;
                          color: #0000008A;
                          opacity: 1;
                          font-family:Roboto;
                          font-size:12px;
                          display: flex;
                          align-items: center;
                          padding: 0 0 0 10px;
                          " 
                          class='tb_h'>
                        <div style="color:#727272;font-size:14px; font-family:Roboto;text-align: initial;width:100%;">
                          Far from Store &nbsp;{{this.dialogFarFromStore.txt_head}} 
                        </div>

                        </div>

                        <div style=" border: 0.5px solid #D1D1D1; border-width: 0px 0.5px 0.5px 0.5px;">
                          <div 
                              style="
                                border-width: 0px 0.5px 0.5px 0.5px;
                                display: flex;
                                text-align: center;
                                color: #414141;
                                opacity: 1;
                                font-family:Roboto;
                                font-size:13px;
                                padding:5px 0 0 0;
                                " 
                                class='tb_h'
                                v-for="(items ,index) in this.detail_far_from_store"  :key="items.id"
                                >
                              <div style="text-align: center;width:5%;">{{index+1}}</div>
                              
                              <div style="
                                          font-family:Kanit;
                                          text-align: left;
                                          width:30%;
                                          white-space: nowrap; 
                                          overflow: hidden;
                                          text-overflow: ellipsis;
                                          ">{{items.customer}}
                                          <md-tooltip style="font-family:Kanit;" md-direction="top">{{items.customer}}</md-tooltip>
            
                                          </div>

                              <div style="font-family:Roboto;width:30%;">{{items.cur_date}}</div>
                              <div style="font-family:Roboto;width:5%;">{{items.status_plan}}</div>
                              <div style="font-family:Roboto;width:30%;">[ {{split_(items.distance_checkIn)}} / {{split_(items.distance_checkOut)}} ]</div>
                              </div>
                        </div>
                     

                </div>
             
              </md-card-content>
              <!-- <md-dialog-actions style="min-height:0px;padding:10px 30px 0 0;text-align: end;width:100%;color:#0000008A;font-style:italic;margin:0">
                <div style="font-size:13px;: 100%;">{{this.data_dialog_order.title}}</div>
                
             </md-dialog-actions> -->
            
          </md-layout>
    </md-dialog-content>
    </md-dialog>


  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
// import salesactivityService from "@/services/orders/salesactivity";
export default {
  name: "salesactivity-report",
  data() {
    let random = Math.random();
    return {
      showBoxSearch: false,
      txt_search_tripplan:'',
      txt_search_order:'',
      txt_search_customer:'',
      select_data:'',
      select_data_order:'',
      select_data_customer:'',
      title_txt_order:'',


      showCard:true,
      emailInput: '',
      incorrectEmail: [],
      btn_action:'',
      select_type:'all_type',
      select_status:'all_status',

      select_type_customer:'all_type',
      select_status_customer:'all_status',

      SelectType:[
        {id:1 ,value:'all_type', name:'All Type'},
        {id:2 ,value:'visit', name : 'Visit'},
        {id:3 ,value:'virtual', name: 'Virtual'}
      ],
      SelectStatus:[
        {id:1 ,value:'all_status', name:'All Status'},
        {id:2 ,value:'p', name : 'P'},
        {id:3 ,value:'pa', name: 'PA'},
        {id:4 ,value:'a', name: 'A'}
      ],

      overview: [
        { id: 1, amount: 97.22, name: "Visit Plan" },
        { id: 2, amount: 100, name: "Virtual Plan" },
        { id: 3, amount: 100, name: "All Plan" },
      ],
      disDate: {
        year: dateFunc.format(new Date(), "yyyy"),
        month_id: dateFunc.format(new Date(), "MM"),
      },
      disShowmonth: false,
      setActiveTab: "salesteam",
      spinnerMT: false,
      cus_list: '',
      txt_title_dialog_tripplan:'',
      txt_title_dialog_order:'',

      dialogFarFromStore : {
        title:'',
        txt_head :''
        
      }
   


      // data_dialog_tripplan:[]
    };
  },
  computed: {
  data_sales_head(){
    return this.$store.getters["sales_team_head"];
  },
  data_taglabel(){
    return this.$store.getters["taglabel"];
  },
  data_tab1(){
    return this.$store.getters["detail_t1"];
  },
  data_tab2(){
    return this.$store.getters["detail_t2"];
  },
  data_tab3(){
    return this.$store.getters["detail_t3"];
  },
  detail_tap_customer(){
    return this.$store.getters["detail_tap_customer"];
  },
  data_activity_team(){
    return this.$store.getters['activity_team']
  },
  spinner() {
      return this.$store.getters["spinner"];
  },
  disSelectedDate() {
      return this.$store.getters["dis_selected_date"];
  },
  data_dialog_tripplan(){
   
    return this.$store.getters["data_dialog_tripplan"];
  },
  data_dialog_order(){
   
   return this.$store.getters["data_dialog_order"];
 },
 act_email () {
      return this.$store.getters['act_email']
    },
 sum_order(){
   return this.$store.getters["sum_order"];
 },
 sum_customer(){
   return this.$store.getters["sum_customer"];
 },
 detail_far_from_store(){
  return this.$store.getters["detail_far_from_store"];
 },
 customer_tooltip(){
  return this.$store.getters["customer_tooltip"];
 },
 

  },
  watch: {
    // keyword(val) {
    //   this.filterList(val);
    // }
    // loadDataMT() {
    //   if (this.loadDataMT === true) {
    //     this.onSearchListMT();
    //     this.$store.commit("salesactivity/setLoadDataMT", false);
    //   }
    // },
  },
  methods: {
    Export_(param){
      this.btn_action = param
      this.incorrectEmail = []
      let email = ''
      if (this.act_email.length > 0) {
        email = _.cloneDeep(this.act_email)
      }
      this.emailInput = email
      // console.log(this.act_email)
      this.$refs["Export"].open();
    },
    exportData (  ) {
      // console.log(this.btn_action)
      let emails = this.emailInput.split(',')
      let checkMail = []
      let checkMailTrue = []

      emails.forEach(element => {
          if (_.trim(element).length > 0) {
            var lastAtPos = element.lastIndexOf('@')
            var lastDotPos = element.lastIndexOf('.')
            if (
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              element.indexOf('@@') == -1 &&
              lastDotPos > 2 &&
              element.length - lastDotPos > 2
            ) {
              checkMailTrue.push(element)
            } else {
              checkMail.push(element)
            }
          }
        })
        this.incorrectEmail = checkMail
       
        if (checkMail.length === 0) {
          var txt_search = ''
          var select_emp = ''
          if(this.setActiveTab  == 'salesteam'){
            txt_search = ''
            select_emp = Vue.localStorage.get('emp_id') 
          }
          if(this.setActiveTab  == 'tripplan'){
            txt_search = this.txt_search_tripplan
            select_emp =  this.select_data
          }
          if(this.setActiveTab  == 'order'){
            txt_search = this.txt_search_order
            select_emp =  this.select_data_order
          }
          if(this.setActiveTab  == 'customer'){
            txt_search = this.txt_search_customer
            select_emp =  this.select_data_order
          }
          let res = {
            email:this.emailInput,
            month:this.disSelectedDate.month_id, 
            year:  this.disSelectedDate.year,
            emp_id:select_emp,
            keyword:txt_search,
            btn:this.btn_action.taglabel
          }

          this.$store.dispatch('gsheetsActivityOverview' , res)
          this.$refs["Export"].close();
        }else {

        }


    },
    closeMdsCard () {
      this.$refs["Export"].close();
    },

    onTabClick(event) {
      if (event.target.innerText === "SALES TEAM") {
        // console.log("onTabClick", event.target.innerText );
        this.setActiveTab = 'salesteam'
      } else if (event.target.innerText === "TRIP PLAN OVERVIEW") {
        this.setActiveTab = 'tripplan'
        // console.log("onTabClick", event.target.innerText );
      }else if(event.target.innerText === "CUSTOMER OVERVIEW"){
        this.setActiveTab = 'customer'
        // console.log("onTabClick", event.target.innerText );
      }else if(event.target.innerText === "ORDER OVERVIEW"){
        this.setActiveTab = 'order'
        // console.log("onTabClick", event.target.innerText );
      }

    },
    onChange(tabIndex) {
      if(!this.spinner  ){
          if(tabIndex == 0){
        let dateDis = this.$store.getters["salesactivity/dis_selected_date"];
              dateDis.year = dateFunc.format(new Date(), "yyyy");
              dateDis.month_id = dateFunc.format(new Date(), "MM");
              dateDis.month = dateFunc.format(new Date(), "MMMM");
              // console.log('salesteam =>' , this.disSelectedDate)
              this.$store.dispatch("salesTeamHead",{
                month:this.disSelectedDate.month_id, 
                year:  this.disSelectedDate.year,
                tab:'salesteam',
                emp_id:Vue.localStorage.get("emp_id")
              } );

              this.$store.dispatch("salesTeamDetail",{
                month:this.disSelectedDate.month_id, 
                year:  this.disSelectedDate.year,
                tab:'salesteam',
                emp_id:Vue.localStorage.get("emp_id")
              } );
           
       
      }

      if(tabIndex == 1){  
          this.$store.dispatch('searchActivityTeam', 'tripplan')
              setTimeout(() => {
              if(this.select_data  == ''){
                this.select_data =  this.data_activity_team[0].code
              }

                this.$store.dispatch("salesTeamHead",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  tab:'tripplan',
                  emp_id:this.select_data
                } );

                this.$store.dispatch("salesTeamDetail",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  tab:'tripplan',
                  emp_id:this.select_data
                } );

                // this.setActiveTab = 'tripplan'

              }, 150);
            } 
              if(tabIndex == 2){
                    this.$store.dispatch('searchActivityTeam' , 'order')

                    this.$store.dispatch("salesTeamHead",{
                          month:this.disSelectedDate.month_id, 
                          year:  this.disSelectedDate.year,
                          tab:'customer',
                          emp_id:this.select_data_order
                        } );
              }

              if(tabIndex == 3){
                    this.$store.dispatch('searchActivityTeam' , 'order')

                    this.$store.dispatch("salesTeamHead",{
                          month:this.disSelectedDate.month_id, 
                          year:  this.disSelectedDate.year,
                          tab:'order',
                          emp_id:this.select_data_order
                        } );

              } 
      }
      
    },
    number_format( number, decimal=0, comma=true ) {
        number = parseFloat( number ).toFixed( decimal )+"";
        if( comma ) {
            number = parseFloat( number ).toLocaleString('en');
        }
        return number;
    },
    formatNumber( param ){
      if(param == null){
        return parseFloat(0).toFixed(2);
      }else {
          var num = parseFloat(param);
         return num.toLocaleString(undefined, {minimumFractionDigits: 2});
      }
      
    },
    split_(param){
      var x = Number(param)
      if(param == ''){
        return 'No Location'
      }else {
        return  (Math.floor( x * 100 ) / 100) + ' km.'
      }
        
    },
    formatNumber2( param ){
      if(param == null){
        return parseFloat(0);
      }else {
          var num = parseFloat(param);
         return num.toLocaleString(undefined, {minimumFractionDigits: 0});
      }
      
    },
    disSelectMonth(value, even = null) {
      let emp_id = ''
      this.$store.commit('setDateSelect' , value)
      this.disDate.month_id = value.month.id;
      this.disDate.year = value.year;

      if(this.setActiveTab == 'tripplan'){
        emp_id = this.select_data
        this.$store.dispatch("salesTeamHead",{
        month:value.month.id, 
        year:  value.year,
        tab:this.setActiveTab,
        emp_id:emp_id

      } );

      this.$store.dispatch("salesTeamDetail",{
        month:value.month.id, 
        year:  value.year,
        tab:this.setActiveTab,
        emp_id:emp_id
      } );
      }

      if(this.setActiveTab == 'order'){
        emp_id = this.select_data_order

        this.$store.dispatch("orderOverviewDetail",{
          month:value.month.id, 
          year:  value.year,
          emp_id:this.select_data_order,
          keyword:this.txt_search_order,
          type:this.select_type,
          status:this.select_status
        } );

      }

      if(this.setActiveTab == 'customer'){
        emp_id = this.select_data_customer

        this.$store.dispatch("customerOverviewDetail",{
          month:value.month.id, 
          year:  value.year,
          emp_id:this.select_data_order,
          keyword:this.txt_search_customer,
          type:this.select_type,
          status:this.select_status
        } );

      }

    

      if(this.setActiveTab == 'salesteam'){

              this.$store.dispatch("salesTeamHead",{
                month:value.month.id, 
                year:  value.year,
                tab:'salesteam',
                emp_id:Vue.localStorage.get("emp_id")
              } );

              this.$store.dispatch("salesTeamDetail",{
                month:value.month.id, 
                year:  value.year,
                tab:'salesteam',
                emp_id:Vue.localStorage.get("emp_id")
              } );

      }
       
      this.hideCalendar();
    },

    filtersearch(input , indexs) {
        this.select_data_order = ''
        this.txt_search_tripplan = ''
        this.select_type = 'all_type'
        this.select_status = 'all_status' 
        this.txt_search_order = ""
        this.$store.commit('clear_data_t3')
         this.$store.dispatch("salesTeamHead",{
          month:this.disSelectedDate.month_id, 
          year:  this.disSelectedDate.year,
          tab:'tripplan',
          emp_id:input.code
        } );

        this.$store.dispatch("salesTeamDetail",{
          month:this.disSelectedDate.month_id, 
          year:  this.disSelectedDate.year,
          tab:'tripplan',
          emp_id:input.code
        } );


      // console.log(input)
      },
      filtersearch_order(input , indexs) {
        this.title_txt_order = input

        this.title_txt_order = {
          emp_id : input.code,
          fullname: input.title,
        }


                if(this.setActiveTab === 'customer'){

                  this.$store.dispatch("salesTeamHead",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  tab:'customer',
                  emp_id:this.select_data_order
                } );
                    this.$store.dispatch("customerOverviewDetail",{
                    month:this.disSelectedDate.month_id, 
                    year:  this.disSelectedDate.year,
                    emp_id:this.select_data_order,
                    keyword:this.txt_search_customer,
                    type:this.select_type,
                    status:this.select_status
                  } );
                }else {

                  this.$store.dispatch("salesTeamHead",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  tab:'order',
                  emp_id:this.select_data_order
                } );

                  this.$store.dispatch("orderOverviewDetail",{
                    month:this.disSelectedDate.month_id, 
                    year:  this.disSelectedDate.year,
                    emp_id:this.select_data_order,
                    keyword:this.txt_search_order,
                    type:this.select_type,
                    status:this.select_status
                  } );

                  }
            

      
       
    },

  


    select_type_status_order(input , indexs){

     
      this.$store.dispatch("orderOverviewDetail",{
          month:this.disSelectedDate.month_id, 
          year:  this.disSelectedDate.year,
          emp_id:this.select_data_order,
          keyword:this.txt_search_order,
          type:this.select_type,
          status:this.select_status
        } );
    },

    select_type_status_customer(input , indexs){
    this.$store.dispatch("orderOverviewDetail",{
        month:this.disSelectedDate.month_id, 
        year:  this.disSelectedDate.year,
        emp_id:this.select_data_order,
        keyword:this.txt_search_order,
        type:this.select_type_customer,
        status:this.select_status_customer
      } );
},

    disSelectyear(value) {
      this.disDate.year = value.year;
    },
    openMonth() {
      // console.log()
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SelectMonth;
      key.eventLabel = "SelectMonth:" + emp_id;
      this.$ga.event(key);

      this.disShowmonth = true;
    },
    mouseLeave: function () {
      if (this.disShowmonth == true) {
        this.disShowmonth = false;
      }
    },
    hideCalendar: function () {
      this.disShowmonth = false;
    },
    NextTabBySM( param ){
    this.select_data_order = ''
    this.txt_search_order = ''
    this.txt_search_customer = ''
    this.$store.commit('clear_data_t3')
    this.select_type = 'all_type'
    this.select_status = 'all_status'
    this.select_data = param.emp_id
    this.setActiveTab = 'tripplan'
     
      // this.$store.dispatch('searchActivityTeam','byTeam')
    },
    NextAllOrder( param ){
      if(param == 'all'){
        this.txt_search_order = ''
        setTimeout(() => {
                this.$store.dispatch("orderOverviewDetail",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  emp_id:this.select_data_order,
                  keyword:'',
                  type:this.select_type,
                  status:this.select_status
              } );
        // this.select_data_order = param.emp_id
        this.setActiveTab = 'order'
      }, 150);
      }else {
        // console.log(param)
        setTimeout(() => {
                this.$store.dispatch("orderOverviewDetail",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  emp_id:this.select_data_order, 
                  keyword:param.cust_code,
                  type:this.select_type,
                  status:this.select_status
              } );
              this.txt_search_order = param.cust_code
        // this.select_data_order = param.emp_id
        this.setActiveTab = 'order'
      }, 150);
      }
     

      
    },
    NextTabByTp( param ){
      this.title_txt_order = param
      this.txt_search_customer = ''
      this.select_type = 'all_type'
      this.select_status = 'all_status'
    setTimeout(() => {
                this.$store.dispatch("customerOverviewDetail",{
                  month:this.disSelectedDate.month_id, 
                  year:  this.disSelectedDate.year,
                  emp_id:param.emp_id,
                  keyword:'',
                  type:this.select_type,
                  status:this.select_status
              } );
        this.select_data_order = param.emp_id
      
      }, 150);
      this.setActiveTab = 'customer'
         
    },
    openDialog( param ){
      this.txt_title_dialog_tripplan = param.emp_id+' '+param.fullname
      this.$store.dispatch(
        'tripplanOverviewDetailSalesActivityReports',
        {
          year:this.disDate.year,
          month:this.disDate.month_id, 
          emp_id:param.emp_id,
          type:'myself '
        }
      )
        this.$refs["TripPlanOverview"].open();
      // tripplan-overview-detail?month=10&year=2022&emp_id=11112
    },
    openDialog_far_from(param){
      if(param.far_from_stores != '0'){

        this.$store.dispatch('getFarFromStore' ,{
          year:this.disDate.year,
          month:this.disDate.month_id, 
          emp_id:param.emp_id
      })

        // console.log(param)
        this.dialogFarFromStore.txt_head = param.far_from_stores
        this.dialogFarFromStore.title = param.emp_id + ' '+ param.fullname
        this.$refs["farFromStore"].open();
      }else {

      }
     
    },
    dialog_order( param ){
      if(param.group_po_no != ''){
        this.$store.dispatch('orderOverviewBypono', {
          year:this.disDate.year,
          month:this.disDate.month_id, 
          emp_id:this.select_data_order,
          po_no:param.group_po_no,
          plan_date:param.plan_date
        })

        this.txt_title_dialog_order = this.title_txt_order.emp_id + ': '+ this.title_txt_order.fullname
        this.$refs["OrderOverview"].open();
        //  console.log(param)
      }
     
    },
    closeDialog_(){
      this.$refs["TripPlanOverview"].close();
      this.$refs["OrderOverview"].close();
      this.$refs["farFromStore"].close();
      
    },
    showBoxInpSearch(){
      // console.log('show Search')
      this.showBoxSearch = true
    },
    showBoxInpSearchOut(){
      this.txt_search_tripplan = '',
      this.$store.commit('setFilterTabTripplan' , '')
      this.showBoxSearch = false
    },
    search_data_tripplan (param){
      if(param.length >2){
         this.$store.commit('setFilterTabTripplan' , param)
      }else if(param.length == 0) {
        this.$store.commit('setFilterTabTripplan' , '')
      }
    
    },
    search_data_order(param){
      if(param.length >2){

        this.$store.dispatch("orderOverviewDetail",{
                  month:this.disDate.month_id, 
                  year:  this.disDate.year,
                  emp_id:this.select_data_order,
                  keyword:param,
                  type:this.select_type,
                  status:this.select_status
              } );

      }else if(param.length == 0) {
        this.$store.dispatch("orderOverviewDetail",{
                  month:this.disDate.month_id, 
                  year:  this.disDate.year,
                  emp_id:this.select_data_order,
                  keyword:'',
                  type:this.select_type,
                  status:this.select_status
              } );
      }
    
    },

    search_data_customer(param){
      if(param.length >2){
        this.$store.dispatch("customerOverviewDetail",{
                  month:this.disDate.month_id, 
                  year:  this.disDate.year,
                  emp_id:this.select_data_order,
                  keyword:param,
                  type:this.select_type,
                  status:this.select_status
              } );

      }else if(param.length == 0) {
        this.$store.dispatch("customerOverviewDetail",{
                  month:this.disDate.month_id, 
                  year:  this.disDate.year,
                  emp_id:this.select_data_order,
                  keyword:'',
                  type:this.select_type,
                  status:this.select_status
              } );
      }
    
    },


    clear_search_order(){
      this.txt_search_order = ''
      this.$store.dispatch("orderOverviewDetail",{
                  month:this.disDate.month_id, 
                  year:  this.disDate.year,
                  emp_id:this.select_data_order,
                  keyword:'',
                  type:this.select_type,
                  status:this.select_status
              } );
    },


    
    clear_search_customer(){
      this.txt_search_customer = ''
      this.$store.dispatch("customerOverviewDetail",{
                  month:this.disDate.month_id, 
                  year:  this.disDate.year,
                  emp_id:this.select_data_order,
                  keyword:'',
                  type:this.select_type,
                  status:this.select_status
              } );
    },
    open_successRate(){
      var emp = ''
      var name = ''
      for (let index = 0; index < this.data_activity_team.length; index++) {
        const element = this.data_activity_team[index];
        if(element.code == this.select_data){
          emp = element.code 
          name =element.title
        }
        
      }
      this.txt_title_dialog_tripplan = emp+' '+name
      this.$store.dispatch(
        'tripplanOverviewDetailSalesActivityReports',
        {
          year:this.disDate.year,
          month:this.disDate.month_id, 
          emp_id:this.select_data,
          type:'team'
        }
      )
      this.$refs["TripPlanOverview"].open();
    }
  },
  created() {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      this.$store.dispatch('setPathMenuService', 'planning')
            let menu = this.$store.getters["displayMenu"];
      let path = this.$router.app._route.path.split("/");
      let pathFull = this.$router.app._route.path;

      // this.$store.dispatch('searchActivityTeam',{tab:'tripplan'})
      let head = _.filter(menu, (item) => {
        if (item.m_code == path[1]) {
          return true;
        }
      });
      if (head.length > 0) {
        let sub = _.filter(head[0].sub_menu, (item) => {
          if (item.m_path == pathFull) {
            return true;
          }
        });
        if (sub.length > 0) {
          this.pageName = sub[0].m_name;
        }
      }
      this.$store.dispatch(
          "setCustomerListService",
          Vue.localStorage.get("emp_id")
        );
        let data_router = JSON.parse(Vue.localStorage.get('Route-to-SalesActivityReport'))
        if(data_router.m_code == 'salesactivityreport'){
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
              this.txt_search_order = ''
              this.txt_search_customer = ''
              this.$store.commit('clear_data_t3')
              this.$store.commit('setDateSelect' , data_)
        }else {
          setTimeout(() => {
            //  this.onChange(1)
             let st_data = JSON.parse(Vue.localStorage.get('Route-to-SalesActivityReport'))
             this.select_data = st_data.emp_id
             let data_ = {
                month:{
                  id:st_data.month,
                  value:st_data.value
                },
                year:st_data.year
              }
              
              this.disDate.month_id = st_data.month;
              this.disDate.year = st_data.year;
              this.$store.commit('setDateSelect' , data_)
              let data = {
                m_code :'salesactivityreport',
                month: '',
                year:'' ,
                value:'',
                tab: '',
                emp_id:''
            }
            Vue.localStorage.set('Route-to-SalesActivityReport',JSON.stringify(data))

          }, 500);

         
        }
     
    }
              
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    // "md-search-box": require("./myorder-component/md-search-box"),
    // "md-comment-dialog": require("../Salesops/customComponent/md-comment-dialog"),
    "month-calendar": require("../Salesops/customComponent/mds-month-calendar"),
    // "md-orders-view": require("./budget-component/md-orders-view"),
    // "month-calendar2": require("../Salesops/customComponent/mds-month-calendarV2"),
  },
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
#tabSalesTeam {
  width: 94%;

  .md-taps {
    width: 94%;
    padding-bottom: 10px;
    background: #efefef !important;
    height: 400px;
    // height: 550px;
  }
  .md-taps .md-tap {
    padding-top: 0px !important;
    padding-left: 0px !important;
    padding-bottom: 0px !important;
    padding-right: 0px !important;
  }
}
#pageSalesactivity {


  .pt-2 {
    padding-top: 2px;
  }
  .md-dropdown-box {
    background-color: white;
    height: 63%;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    color: rgb(65, 65, 65);
  }
  .head-table {
    font-family: roboto;
    opacity: 0.54;
    margin-top: 20px;
    display: flex;
    padding-bottom: 15px;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 600;
    .md-icon {
      cursor: pointer;
    }
    .md-taps .md-tap {
      padding-top: 0px !important;
      padding-left: 0px !important;
      padding-bottom: 0px !important;
      padding-right: 0px !important;
    }
  }
  .tap-table {
    // height: 400px;
    width: 100%;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
    box-shadow: 0px 0px 3px 0px unquote("#00000029");
    .detail-blog {
      overflow-y: auto;
      overflow-x: hidden;
      text-align: left !important;
      background-color: white;
      padding: 0px !important;
      padding-left: 0px;
      width: 100%;
      height: 360px;
      &::-webkit-scrollbar {
        height: 5px;
        width: 6px;
        background-color: white;
      }
      &::-webkit-scrollbar-thumb {
        background: #a8a8a8;
        border-radius: 3px;
      }
      .content-table {
        display: flex;
        padding-bottom: 5px;
        padding-top: 7px;
        padding-left: 10px;
        .hover-row:hover {
          color: #fd7f00 !important;
          cursor: pointer;
        }
        .view-more {
          visibility: hidden;
        }
      }
      .content-table:hover {
        .view-more {
          visibility: visible;
        }
      }
    }
  }
  .sales-period-box .sales-period-view-box {
    height: 45px;
  }
  .md-tabs .md-tab {
    padding: 0px;
  }

  .content-table {
        display: flex;
        padding-bottom: 5px;
        padding-top: 7px;
        padding-left: 10px;
  }
  
  .content-table:hover{
    border-radius: 6px;
    background-color:#F0EDED;
  }

  .comment {
    .md-button.md-icon-button {
      width: 24px;
      min-width: 24px;
      height: 24px;
      min-height: 24px;
      .md-icon {
        font-size: 13px;
        color: #ffffff;
        padding-top: 5px;
      }
    }
  }
  .md-spinner {
    position: absolute;
    z-index: 10;
    padding-top: 400px;
  }
  .md-dropdown-box {
    width: 100%;
    .md-input {
      cursor: pointer;
    }
    .md-input-container input {
      font-family: $font-kanit;
      padding-top: 8px;
      font-size: 18px;
      font-weight: normal;
      // color: rgba(0, 0, 0, 0.87);
    }
    .md-input-container {
      height: 40px;
      min-height: 40px;
      margin: 0px;
      padding-top: 3px;
      padding-bottom: 0px;
      padding-right: 0px;
      padding-left: 20px;
      .md-icon {
        padding: unset;
      }
      .md-input-placeholder input {
        font-size: 22px;
      }
      .md-has-value input {
        font-size: 22px;
      }
    }
    .md-input-container:after {
      content: none;
    }
    .text-autocomplete {
      position: absolute;
      z-index: 31;
      // width: 100%;
      max-height: 250px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      padding: 5px 0 10px 0;
      overflow-x: hidden;
      font-size: 14px;
      .no-data-promo {
        margin-top: 15px;
        text-align: center;
      }
      .md-list-item {
        color: #5a5a5a;
        padding: 0 0 0 0;
        font-family: $font-roboto;

        .md-list-item-row {
          padding-top: 6px;
          display: flex;
        
          padding-bottom: 6px;
          padding-right: 20px;
          padding-left: 20px;
          text-align: left;
        }
        .long-row {
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          overflow: hidden;
        }
        .descript {
          font-family: $font-kanit;
        }
      }
      .md-list-item:hover {
        background: #efefef;
        cursor: pointer;
      }
    }
    .text-autocomplete::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      background: #f7f7f7;
    }
    .text-autocomplete::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.11);
      border-radius: 5px;
    }
    & .dropdown-box {
      box-shadow: 0 0 0.8px rgba(0, 0, 0, 0.16);
    }
  }

  .md-card {
    // border-radius: 4px;
    // box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    // width: 100%;
    opacity: 1;
    .title-number {
      
      color: #414141;
      font-size: 20px;
      font-family: $font-roboto;
      font-weight: bold;
      opacity: 0.8;
    }
    .subtitle-number {
    
      color: #727272;
      font-size: 10px;
      font-family: $font-roboto;
      font-weight: bold;
      opacity: 0.8;
    }
  
    }

    .hover_:hover{
      cursor: pointer;
      color:#FD7F00;
       
    }

    


 
   
}
.getSuccessRate:hover{
  cursor: pointer;
  color:#FD7F00;}
.md-input-container[data-v-1343cf2d]:after {
    background-color: unset;
}
.email-error {
        text-align: left;
        padding-top: 5px;
        color: #f44336;
        font-size: 14px;
      }
.footer_ex {
      padding-top: 15px;
      padding-bottom: 10px;
      padding-right: 20px;
      justify-content: flex-end;
      display: flex;
      .md-button {
        color: #fd7f00;
        font-weight: bold;
        font-size: 14px;
      }
    }

.mds-card {
    background: #ffffff;
    z-index: 2;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

}

.title {
      font-family: roboto;
      font-size: 20px;
      display: flex;
      padding: 20px 30px;
      font-weight: bold;
    }

.body-deatil::-webkit-scrollbar {
          height: 7px;
          width: 5px;
          background: #f7f7f7;
        }
.body-deatil::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.11);
          border-radius: 5px;
        }

        .md-input-container label{
          top:5px;
          font-size:18px;
        }


       
</style>
