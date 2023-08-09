<template>
  <div>
    <div  @scroll="handleScroll"   id="pageSalesplan">
      <div v-if="login == false" class="mt-60">
        <waring-login></waring-login>
      </div>
      <div v-if="login == true">

        <div class="mds-vue-back-to-top" @click="backToTop" v-if="showBackToTop">
        <span>
          <md-icon>arrow_upward</md-icon>
        </span>
      </div>

        <!--row 1-->
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="$store.getters.sp_spinner_loading"
          md-indeterminate
        ></md-spinner>
        <div id="performId"></div>
        <md-layout
          md-align="start"
          md-flex="100"
          class="md-topic"
          style="padding-top:25px;padding-left:19%"
        >{{ pageName }}</md-layout>
        <md-layout md-align="center" class="pt-30">
          <!--BOX 1-->
          <md-layout  md-flex="100" md-align="center">
            <div class="sales-period-box" @mouseleave="mouseLeave">
              <md-card class="sales-period-view-box" @click.native="openMonth">
                <md-card-content>
                  <div class="card-title">
                    <span>{{dateSelect.month}} {{dateSelect.year}}</span>
                  </div>
                  <md-icon>expand_more</md-icon>
                  <div class="card-sub-title">Sales Period</div>
                </md-card-content>
              </md-card>
              <month-calendar
                ref="selectCalendar"
                v-if="showmonth"
                v-on:selectmonth="emitSelectMonth"
                v-on:selectyear="selectyear"
                :dates="rsDate"
              ></month-calendar>
            </div>
            <md-card class="sales-quota-box ml-15">
              <md-card-content>
                <div class="floating-box-big" style="min-height:unset; display: flex;">
                  <div class="quota-box">
                    <span class="price">฿</span>
                    <span
                      class="card-title"
                    >{{$store.getters["globalfunc/checkPointInt"]($store.getters.sp_sales_total.sum_quota)}}</span>
                    <div class="card-sub-title">Sales Target</div>
                  </div>
                  <div class="achieved-box ml-10">
                    <span class="price">฿</span>
                    <span
                      class="card-title"
                    >{{$store.getters["globalfunc/checkPointInt"]($store.getters.sp_sales_total.sum_achieved)}}</span>
                    <div class="card-sub-title">Sales Achieved</div>
                  </div>
                  <div class="progress-bar-box ml-10">
                    <md-progress
                      v-show="true"
                      :class="renderProgressBarMain($store.getters.sp_sales_total)"
                      :md-progress="$store.getters.sp_sales_total.sum_progress"
                      md-mode="determinate"
                    ></md-progress>
                  </div>
                  <div class="progress-bar-value ml-5">
                    <div
                      class="md-progress-text"
                    >{{$store.getters["globalfunc/checkPoint"]($store.getters.sp_sales_total.sum_percent)}}%</div>
                  </div>
                </div>
              </md-card-content>
            </md-card>
            <md-card class="incentive-box ml-15" style="width:140px">
              <md-card-content style="padding-right:5px">
                <span class="price">฿</span>
                <span
                  class="card-title"
                >{{$store.getters["globalfunc/checkPoint"]($store.getters.sp_sales_total.sum_incentive)}}</span>
                <md-icon class="ml-10" style=" display: none">expand_more</md-icon>
                <div class="card-sub-title">Incentive</div>
              </md-card-content>
            </md-card>
          </md-layout>
          <!--BOX 2-->
          <md-layout md-flex="100" md-align="center" class="mt-20">
            <md-card class="sales-area-table">
              <md-card-content>
                <div
                  v-if="sp_data.by_area.length == 0"
                  class="no-data mt-10"
                >Plan not available for now.</div>
                <table v-else>
                  <tbody>
                    <tr class="head-table text-right">
                      <td class="text-left" style="width: 270px;">Sales area</td>
                      <td style="width: 110px;">Ratio</td>
                      <td style="width: 110px;">LMTD</td>
                      <td style="width: 110px;">Target</td>
                      <td style="width: 110px;">Progress</td>
                      <td style=" width: 250px;"></td>
                      <td class="pr-20" style="width: 110px;">Remaining</td>
                    </tr>
                    <tr
                      v-for="(row , rowIndex) in sp_data.by_area"
                      :key="row.id"
                      class="content-table"
                    >
                      <!-- v-scroll-to="!checkIndexExpand(row.prov_code) ? '#mom'+ row.prov_code : '#mom'" -->
                      <td
                        style="width: 180px"
                        :class="checkIndexExpand(row.prov_code) ?'descript highlight':'descript'"
                        @click="showProvince(row , rowIndex)"
                        :id="'block' + row.prov_code"
                      >
                        {{row.province_name}}
                        <md-tooltip md-direction="top">{{row.province_name}}</md-tooltip>
                      </td>
                      <td
                        class="number"
                        style="width: 80px;"
                      >{{$store.getters["globalfunc/checkPoint"](row.ratio)}} %</td>
                      <td
                        class="number"
                        style="width: 100px;"
                      >{{$store.getters["globalfunc/checkPoint"](row.lmtd)}}</td>
                      <td
                        class="number"
                        style="width: 100px;"
                      >{{$store.getters["globalfunc/checkPoint"](row.quota)}}</td>
                      <td
                        class="number"
                        style="width: 100px;"
                      >{{$store.getters["globalfunc/checkPoint"](row.progress)}}</td>
                      <td class="pl-20 pr-15 progress-bar-box" style=" width: 250px;">
                        <md-layout md-gutter>
                          <md-layout md-flex="75">
                            <md-progress
                              v-show="true"
                              :class="renderProgressBar(row.percent)"
                              :md-progress="row.percent"
                              md-mode="determinate"
                            ></md-progress>
                          </md-layout>
                          <md-layout md-flex="25">
                            <span
                              class="-font-10 -gray-BD ml-10"
                            >{{$store.getters["globalfunc/checkPoint"](row.percent)}}%</span>
                          </md-layout>
                        </md-layout>
                      </td>
                      <td
                        class="number pr-15"
                        style="width: 140px;"
                      >{{$store.getters["globalfunc/checkPoint"](row.remainning)}}</td>
                    </tr>
                  </tbody>
                </table>
              </md-card-content>
            </md-card>
          </md-layout>
          <!--BOX 3-->
          <md-layout
            md-flex="100"
            md-align="center"
            class="mt-20 block-5"
            v-if="sp_data.by_cus.length > 0"
          >
            <md-card class="sales-area-expand">
              <span
                v-if="sp_data.by_cus.length == 0"
                class="no-data mt-100"
              >Plan not available for now</span>
              <md-list v-else class="body-expand">
                <md-list-item
                  @click="changeHihglight(row)"
                  md-expand-multiple
                  v-for="(row, rowIndex) in sp_data.by_cus"
                  class="mb-10"
                  :key="row.id"
                  :id="'mom' + row.prov_code"
                >
                  <div style="width:100%;display: inherit;">
                    <div class="descript" style="z-index:2" @click="setHihglight(row)">
                      {{row.sales_area}}
                      <md-tooltip md-direction="top" style>{{row.sales_area}}</md-tooltip>
                    </div>
                    <div style="width:195px">
                      <label class="title">Target</label>
                      <label class="price">฿</label>
                      <label
                        class="sub-title"
                      >{{$store.getters["globalfunc/checkPoint"](row.sum_target)}}</label>
                    </div>
                    <div style="width:260px">
                      <label class="title">SELECTED TARGET</label>
                      <label class="price">฿</label>
                      <label
                        class="sub-title"
                      >{{$store.getters["globalfunc/checkPoint"](row.sum_sel_target)}}</label>
                      <label
                        class="second-title"
                      >({{$store.getters["globalfunc/checkPoint"](row.percent)}})%</label>
                    </div>
                    <div style="width:155px" class="text-right pr-10">
                      <label class="title">SELECTED TRIPS</label>
                      <div class="md-avatar md-avatar-icon _icon-status-rect">{{row.sum_checked}}</div>
                    </div>
                  </div>
                  <!-- <md-list-expand class="pv-18"> -->
                  <md-list-expand :class="renderExpand(row , rowIndex)">
                    <div style="width:100%;">
                      <md-layout md-gutter md-align="start">
                        <md-layout
                          md-flex="30"
                          v-for="(item,indexDetail) in row.customer"
                          :key="item.id"
                          class="mr-5 mb-5"
                        >
                          <!-- <md-layout md-flex="30" v-for="(item,indexDetail) in row.customer" :key="item.id" class="mr-10 mb-5"> -->
                          <md-card class="checkbox-cust">
                            <md-card-content>
                              <md-layout md-gutter>
                                <md-layout md-flex="20">
                                  <md-icon
                                    v-if="item.checked"
                                    style="color:#FD7F00;cursor:pointer;padding-top:3px"
                                    @click.native="checkedCust(row ,item, $event , rowIndex , indexDetail)"
                                  >star</md-icon>
                                  <md-icon
                                    v-else
                                    style="color:#FD7F00;cursor:pointer;padding-top:3px"
                                    @click.native="checkedCust(row ,item, $event , rowIndex , indexDetail)"
                                  >star_border</md-icon>
                                  <!-- <md-checkbox class="md-warn-mo"
                                                                        :id="item.id" 
                                                                        v-model="item.checked"
                                                                        @change="checkedCust(row ,item, $event , rowIndex)"
                                  ></md-checkbox>-->
                                </md-layout>
                                <md-layout
                                  md-flex="80"
                                  style="height:40px"
                                  @click.native="getCustomerDetail(item  , rowIndex , indexDetail)"
                                >
                                  <div class="title">
                                    {{item.cust_name}}
                                    <md-tooltip md-direction="top">{{item.cust_name}}</md-tooltip>
                                  </div>
                                  <div class="sub-title">{{item.cust_code}}</div>
                                </md-layout>
                              </md-layout>
                            </md-card-content>
                            <md-card-actions>
                              <md-layout md-gutter>
                                <md-layout md-flex="40" class="pl-15">
                                  <label class="action-title">Target</label>
                                </md-layout>
                                <md-layout md-flex="60" md-align="end" class="md-checked-box">
                                  <template>
                                    <orderqty-input
                                      v-model="item.target"
                                      :maxChar="15"
                                      :table="1"
                                      :index="rowIndex"
                                      :indexDetail="indexDetail"
                                      type="detail"
                                      @click.native="gaInputTarget()"
                                    ></orderqty-input>
                                  </template>
                                </md-layout>
                              </md-layout>
                            </md-card-actions>
                          </md-card>
                        </md-layout>
                      </md-layout>
                    </div>
                  </md-list-expand>
                </md-list-item>
              </md-list>
            </md-card>
          </md-layout>
        </md-layout>
      </div>
      <!-- DIALOG -->
      <md-dialog md-open-from="#fab" ref="saleplan_dialog" class="cust-detail" id="saleplan_dialog">
        <md-dialog-title :style="{'background' :sp_show_page ? '#fafafa' : 'white'}">
          <md-layout>
            <md-layout md-flex-large="70">
              <label class="title" v-if="sp_show_page">{{custTitle.cust_code}}</label>
              <label class="sub-title kanitFont" v-if="sp_show_page">{{custTitle.cust_name}}</label>
              <label v-if="!sp_show_page">Creating a New Order from Sales Plan</label>
            </md-layout>
            <md-layout md-flex-large="30" md-align="end">
              <md-button
                v-if="sp_show_page"
                class="md-icon-button"
                @click="closeDialog('saleplan_dialog')"
              >
                <md-icon>close</md-icon>
                <md-tooltip md-direction="right">close</md-tooltip>
              </md-button>
            </md-layout>
          </md-layout>
        </md-dialog-title>
        <md-dialog-content :style="{'padding-top' : sp_show_page ?'30px' : '5px'}">
          <md-layout>
            <!-- FILTER BOX -->
            <md-layout md-flex="100" md-align="start" v-if="sp_show_page">
              <!-- @mouseleave="mouseLeaveDP" -->
              <div class="sales-period-box">
                <md-card class="sales-period-view-box" @click.native="showMonthDP">
                  <md-card-content>
                    <div class="card-title">
                      <span>{{dateSelectPOP.month}} {{dateSelectPOP.year}}</span>
                    </div>
                    <md-icon>expand_more</md-icon>
                    <div class="card-sub-title">Sales Period</div>
                  </md-card-content>
                </md-card>
                <month-calendar
                  ref="selectCalendar"
                  v-if="showmonthdp"
                  v-on:selectmonth="emitSelectMonthDP"
                  v-click-outside="closeEvent"
                  v-on:selectyear="selectyearDP"
                  :dates="rsDateDP"
                ></month-calendar>
              </div>
              <md-card class="sales-quota-box ml-15">
                <md-card-content>
                  <div class="floating-box-big" style="min-height:unset; display: flex;">
                    <div class="quota-box">
                      <span class="price">฿</span>
                      <span
                        class="card-title"
                      >{{$store.getters["globalfunc/checkPointInt"](custSelect.target)}}</span>
                      <div class="card-sub-title">Sales Target</div>
                    </div>
                    <div class="achieved-box ml-10">
                      <span class="price">฿</span>
                      <span
                        class="card-title"
                      >{{$store.getters["globalfunc/checkPointInt"](custSelect.achieved)}}</span>
                      <div class="card-sub-title">Sales Achieved</div>
                    </div>
                    <div class="progress-bar-box ml-10">
                      <md-progress
                        v-show="true"
                        :class="renderProgressBar(custSelect.progress)"
                        :md-progress="custSelect.progress"
                        md-mode="determinate"
                      ></md-progress>
                    </div>
                    <div class="progress-bar-value ml-5">
                      <div
                        class="md-progress-text"
                      >{{$store.getters["globalfunc/checkPoint"](custSelect.percent)}}%</div>
                    </div>
                  </div>
                </md-card-content>
              </md-card>
              <!-- @click.native="changMode" -->
              <!-- :style="{'background-color':$store.getters.sp_check_color_btn ? '#fd7f00':'#d1d1d1'}" -->
              <md-card
                :style="{'background-color':'#d1d1d1' , 'cursor' : 'context-menu'}"
                class="incentive-box ml-15"
              >
                <md-card-content>
                  <md-icon class="pointer mb-20">done</md-icon>
                  <div class="card-sub-title">CREATE ORDER</div>
                </md-card-content>
              </md-card>
            </md-layout>
            <!-- PROMOTION BOX -->
            <md-layout
              md-flex-large="100"
              class="topic mt-20"
              v-if="sp_show_page"
            >PROMOTIONS (Coming Soon)</md-layout>
            <!-- <md-layout md-flex-large="100" class="robotoFont -gray-A8 -font-14 mt-20">PROMOTIONS</md-layout> -->
            <!-- <md-layout md-flex-large="100" class="mb-10">
                            <promotion-box :value="sp_promotion_cte" v-if="sp_show_page"></promotion-box>
                            <promotion-box :value="sp_promotion_sbm" v-else></promotion-box>
            </md-layout>-->
            <!-- SALES ORDER BOX -->
            <md-layout md-flex="100" md-align="start" v-if="sp_show_page">
              <md-layout md-flex="40" md-align="start" class="topic">
                <span style="padding-top:8px">SALES PLAN</span>
              </md-layout>
              <md-layout md-align="end" class="search-bar-dialog" md-flex="60">
                <div>
                  <md-input-container md-theme class="search-box">
                    <md-icon>search</md-icon>
                    <md-input
                      @keypress.native="showAutocom = true"
                      @focus="showAutocom = true"
                      placeholder="Search or add"
                      v-on:change="searchPromotion"
                      v-model="txtSearch"
                      @click.native="gaSearchProduct()"
                    ></md-input>
                    <md-button class="md-icon-button" v-if="cancelSearch" @click="clearSearch">
                      <md-icon style="padding-top:1px">cancel</md-icon>
                    </md-button>
                  </md-input-container>
                  <md-card
                    class="text-autocomplete"
                    v-if="showAutocom"
                    v-click-outside="outsideShowCg"
                  >
                    <div class="no-data-promo" v-if="$store.getters.sp_master_cg.length == 0 ">
                      <span>No data....</span>
                    </div>
                    <ul class="md-list" v-else>
                      <li
                        class="md-list-item"
                        :key="row.id"
                        v-for="row in $store.getters.sp_master_cg"
                      >
                        <div
                          class="slcGroup-c pl-20 -list-block pr-20 latoFont"
                          style=" width: 220px;"
                          @click="selectedCg(row)"
                        >
                          {{row.item_code}}&nbsp;
                          <span class="descript">{{row.item_name}}</span>
                        </div>
                      </li>
                    </ul>
                  </md-card>
                </div>
                <md-input-container class="dp-gray">
                  <md-select v-model="filterDP" @selected="selectedFilter">
                    <md-option value="all">All</md-option>
                    <md-option value="product_recommend">Recommend</md-option>
                    <md-option value="target_qty">Target QTY</md-option>
                    <md-option value="book_mark">Bookmark</md-option>
                  </md-select>
                </md-input-container>
                <div class="md-avatar md-avatar-icon icon-del-big" @click="clearTarget">
                  <md-icon>backspace</md-icon>
                  <md-tooltip md-direction="top" class="latoFont">Clear Order Qty</md-tooltip>
                </div>
              </md-layout>
            </md-layout>
            <md-layout
              v-if="sp_show_page"
              md-flex-large="100"
              class="robotoFont -gray-A8"
              style="padding-top:10px"
            >
              <div class="-font-12 -gray-41 robotoFont height-30">
                <div class="floating-box" style="width: 30px;"></div>
                <div class="floating-box text-left" style=" width: 250px;">Product Category</div>
                <div class="floating-box text-right" style="width: 112px;">Target Qty</div>
                <div class="floating-box robotoFont text-right" style="width: 75px;">Order Qty</div>
                <div class="floating-box icon-del width-70 text-right"></div>
                <div class="floating-box text-right pr-10" style="width: 182px;">Sales</div>
                <div class="floating-box robotoFont text-right"></div>
              </div>
              <!-- SALES ORDER MAIN  BOX -->
              <md-layout md-flex-large="100" md-align="center">
                <div
                  class="no-data-promo"
                  v-if="productCat.length == 0 || !$store.getters.sp_check_itemstatus_master"
                >
                  <span>No search results found in this Sales Plan</span>
                </div>
              </md-layout>
              <md-layout md-flex-large="100" md-align="center">
                <div
                  class="no-data-promo"
                  v-if="!$store.getters.sp_check_itemstatus_master && txtSearch.length > 0"
                  style="margin-top:50px"
                >
                  <div class="content" @click="addItem">
                    <md-icon
                      class="pb-4"
                      md-verticalstatus-plan-align="center"
                      md-align="center"
                      style="color:rgba(0, 0, 0, 0.54);"
                    >add</md-icon>
                    <span class="code">{{cg_selected.item_code}}</span>:
                    <span class="descript">{{cg_selected.item_name}}</span>
                    <md-tooltip md-direction="top" class="kanitFont">
                      <span class="code">{{cg_selected.item_code}}</span>:
                      <span class="descript">{{cg_selected.item_name}}</span>
                    </md-tooltip>
                  </div>
                </div>
                <md-spinner
                  :md-size="150"
                  :md-stroke="1"
                  v-show="$store.getters.sp_spinner_loading"
                  md-indeterminate
                ></md-spinner>
              </md-layout>
              <div id="style-scrollbar-popup" v-if="$store.getters.sp_check_itemstatus_master">
                <order-table :show="sp_show_page"></order-table>
              </div>
            </md-layout>
            <create-myorder v-if="!sp_show_page"></create-myorder>
          </md-layout>
        </md-dialog-content>
        <md-dialog-actions v-if="!sp_show_page" style="padding-right:20px;padding-bottom:20px">
          <md-layout md-align="end">
            <md-button style="color:#A8A8A8" @click="backPage">CANCEL</md-button>
            <md-button :class="'md-primary'" @click="goMyorders">CREATE NEW ORDER</md-button>
          </md-layout>
        </md-dialog-actions>
      </md-dialog>
    </div>
    <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="4000">
      <span>{{snakContent}}</span>
      <md-button @click="$refs.snackbar.close()" style="color:white">OK</md-button>
    </md-snackbar>
    <md-dialog ref="crOrderDg">
      <md-dialog-title>{{digContent}}</md-dialog-title>
      <md-dialog-content></md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeCF">CANCEL</md-button>
        <md-button class="md-primary" @click="submitCF">
          <span v-if="checkModeDig == 'go'">CREATE</span>
          <span v-else>YES</span>
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
export default {
  name: "pageSalesplan",
  computed: {
    ...mapGetters({
      sp_data: "sp_data",
      sp_arr_block3: "sp_arr_block3",
      sp_promotion_cte: "sp_promotion_cte",
      sp_promotion_sbm: "sp_promotion_sbm"
    }),
    productCat() {
      return this.$store.getters.sp_arr_sales;
    },
    createOrder() {
      return this.$store.getters.sp_create_order;
    },
    dateSelect() {
      return this.$store.getters.sp_date_selected;
    },
    dateSelectPOP() {
      return this.$store.getters.sp_popup_date_selected;
    },
    custTitle() {
      return this.$store.getters.sp_cust_head;
    },
    custSelect() {
      return this.$store.getters.sp_cust_selected;
    }
  },
  data() {
    return {
      showBackToTop:false,
      sp_show_page: true,
      showmonth: false,
      showmonthdp: false,
      filterDP: "all",
      cancelSearch: false,
      txtSearch: "",
      showAutocom: false,
      cg_selected: [],
      selectedProv: [],
      selectedProv2: [],
      expand: false,
      searchDisbled: false,
      keepOldData: [],
      snakContent: "",
      digContent: "",
      checkModeDig: "",
      rsDate: {
        year: dateFunc.format(new Date(), "yyyy"),
        month_id: dateFunc.format(new Date(), "MM")
      },
      rsDateDP: {
        year: dateFunc.format(new Date(), "yyyy"),
        month_id: dateFunc.format(new Date(), "MM")
      },
      pageName: ""
    };
  },
  methods: {
    submitCF(type) {
      if (this.checkModeDig == "go") {
        this.keepOldData = this.productCat;
        let data = this.createOrder;
        let temp = data.filter(todo => todo.checked == true);
        let el = document.getElementById("topmenu-ORDERS");
        // console.log(temp);
        if (el != null || el != "") {
          el.click();
          let thisTemp = this;
          this.$store.dispatch("updateOrderQtyOfItem", temp);
          this.$store.commit("SET_SP_CREATE_ORDER_GO", temp);
          setTimeout(function() {
            thisTemp.$store.commit("SET_SP_MOVE_MYORDER", "start");
            thisTemp.$router.push({ path: "/orders/myorders" });
          }, 200);
        }
      } else {
        this.$store.commit("SET_SP_CREATE_ORDER", []);
        this.$store.commit("SET_SP_ORDER_SALES", []);
        this.sp_show_page = true;
        this.$refs["crOrderDg"].close();
      }
    },
    closeCF() {
      this.$refs["crOrderDg"].close();
    },
    goMyorders() {
      this.keepOldData = this.productCat;
      let data = this.createOrder;
      let temp = data.filter(todo => todo.checked == true);
      let qty = data.filter(todo => todo.order_qty > 0);
      if (data.length > 0 && temp.length > 0) {
        this.checkModeDig = "go";
        this.$refs["crOrderDg"].open();
        this.digContent = "Do you want to create new order?";
      } else {
        this.snakContent = "Please Select item";
        this.$refs.snackbar.open();
      }
    },
    backPage() {
      this.digContent = "Do you want to cancel to create new order?";
      this.checkModeDig = "back";
      this.$refs["crOrderDg"].open();
      // this.$store.commit("SET_SP_ORDER_SALES", this.keepOldData);
    },
    changMode() {
      if (this.sp_show_page) {
        this.$store.commit("SET_SP_CREATE_ORDER", []);
        this.$store.commit("SET_SP_CREATE_ORDER_GO", []);
        let rs = this.productCat;
        let tempItem = [];
        let _thisTemp = this;
        rs.forEach(function(row, key) {
          let data = row.detail.filter(
            todo => todo.order_qty > 0 && todo.order_qty != ""
          );
          if (data.length > 0) {
            data.forEach(function(rowItem, key) {
              rowItem["prod_grp"] = row.prod_code;
              rowItem["prod_code"] = rowItem.product_code;
              rowItem["id"] = "";
              rowItem["item_code"] = rowItem.product_code;
              rowItem["item_name"] = rowItem.product_name;
              rowItem["head_id"] = "";
              rowItem["priority_id"] =
                _thisTemp.$store.getters["myorders/customer_info"].priority;
              rowItem["po_no"] =
                _thisTemp.$store.getters["myorders/customer_info"].po_no;
              rowItem["Inv_no"] = 0;
              rowItem["price_per_unit"] = rowItem.ppu;
              rowItem["net_price"] = rowItem.ppu;
              rowItem["amount"] = rowItem.ppu * rowItem.order_qty;
              rowItem["net_amount"] = rowItem.ppu * rowItem.order_qty;
              rowItem["unit_type"] = "OUTER";
              rowItem["unit"] = rowItem.unit;
              rowItem["unit_id"] = rowItem.unit;
              rowItem["selling_unit"] = rowItem.unit;
              rowItem["year"] = _thisTemp.dateSelect.year;
              rowItem["month"] = _thisTemp.dateSelect.month_id;
              rowItem["cust_code"] = _thisTemp.custTitle.cust_code;
              rowItem["checked"] = true;
              rowItem["type"] = "order";
              tempItem.push(rowItem);
            });
          }
        });
        this.$store.commit("SET_SP_CREATE_ORDER", tempItem);
        if (tempItem.length > 0) {
          this.sp_show_page = false;
        }
      }
    },
    openMonth() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SelectMonth;
      key.eventLabel = "SelectMonth:" + emp_id;
      this.$ga.event(key);

      this.showmonth = true;
    },
    showMonthDP() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SelectMonthPop;
      key.eventLabel = "SelectMonthPop:" + emp_id;
      this.$ga.event(key);
      this.showmonthdp = true;
    },
    checkIndexExpand(index) {
      let rs = this.$store.getters.sp_select_prov.indexOf(index);
      if (rs == -1) {
        return false;
      } else {
        return true;
      }
    },
    renderExpand(row, rowIndex) {
      if (!this.expand) {
        setTimeout(() => {
          if (rowIndex == 0) {
            var element2 = document.getElementById("mom" + row.prov_code)
              .childNodes;
            element2[2].click();
          }
        }, 70);
      }
      return "pv-18";
    },
    showProvince(row, rowIndex) {
      let id = "mom" + row.prov_code;
      let temp = document.getElementById(id);

      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClickSalesArea;
      key.eventLabel = "ClickSalesArea:" + emp_id;
      this.$ga.event(key);

      if (this.expand) {
        let rs = this.$store.getters.sp_select_prov.indexOf(row.prov_code);
        var element2 = document.getElementById(id).childNodes;
        element2[2].click();
        if (rs == -1) {
          if (temp != "") {
            temp.scrollIntoView({
              behavior: "smooth"
            });
          }
        }
      }
    },
    setHihglight(row) {
      var element2 = document.getElementById("mom" + row.prov_code).childNodes;
      element2[2].click();
    },
    changeHihglight(row) {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClickSalesAreaHead;
      key.eventLabel = "ClickSalesAreaHead:" + emp_id;
      this.$ga.event(key);
      let theArray = this.$store.getters.sp_select_prov;
      if (this.expand) {
        let rs = this.$store.getters.sp_select_prov.indexOf(row.prov_code);
        if (rs == -1) {
          theArray.push(row.prov_code);
        } else {
          theArray.splice(rs, 1);
        }
      } else {
        theArray.push(row.prov_code);
        this.expand = true;
      }
    },
    selectyear(value) {
      this.rsDate.year = value.year;
    },
    emitSelectMonth(value) {
      let date = this.dateSelect;
      date.month_id = value.month.id;
      date.month = value.month.value;
      date.year = value.year;
      this.rsDate.month_id = value.month.id;
      this.rsDate.year = value.year;
      this.$store.dispatch("getSalePlan", {
        year: this.dateSelect.year,
        month: this.dateSelect.month_id
      });
      this.selectedProv = [];
      this.expand = false;
      this.hideCalendar();
    },
    selectyearDP(value) {
      this.rsDateDP.year = value.year;
    },
    emitSelectMonthDP(value) {
      this.showmonthdp = false;
      this.txtSearch = "";
      let date = this.dateSelectPOP;
      date.month_id = value.month.id;
      date.month = value.month.value;
      date.year = value.year;
      this.rsDateDP.month_id = value.month.id;
      this.rsDateDP.year = value.year;
      if (this.custTitle.cust_code != "") {
        this.$store.dispatch("getSalePlanByPro", {
          year: date.year,
          month: date.month_id,
          cust_code: this.custTitle.cust_code,
          select: this.filterDP
        });
      }
    },
    selectedFilter() {
      this.$store.commit("setFilterDP", this.filterDP);
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SelectOrderby;
      key.eventLabel = "SelectOrderby:" + emp_id;
      this.$ga.event(key);
      if (this.custTitle.cust_code != "") {
        // console.log("selectedFilter ==> ");
        this.$store.dispatch("getSalePlanByPro", {
          year: this.dateSelectPOP.year,
          month: this.dateSelectPOP.month_id,
          cust_code: this.custTitle.cust_code,
          select: this.filterDP
        });
      }
    },
    searchPromotion(param) {
      if (param.length > 0) {
        this.cancelSearch = true;
      } else {
        this.cancelSearch = false;
        if (typeof this.cg_selected.length == "undefined") {
          this.$store.dispatch("getSalePlanByPro", {
            year: this.dateSelect.year,
            month: this.dateSelect.month_id,
            cust_code: this.custTitle.cust_code,
            select: this.filterDP
          });
          this.cg_selected = [];
        }
        this.txtSearch = param;
      }
      this.$store.dispatch("autoComplete", {
        keyword: param.trim()
      });
    },
    selectedCg(value) {
      this.showAutocom = false;
      this.cg_selected = value;
      this.txtSearch = value.item_name;
      this.$store.dispatch("searchItemsProduct", {
        year: this.dateSelectPOP.year,
        month: this.dateSelectPOP.month_id,
        cust_code: this.custTitle.cust_code,
        prod_code: value.item_code
      });
      let obj = this.$store.getters.sp_sthis;
      obj.temp = this;
      obj.mode = false;
      this.setExpand(value);
      this.cancelSearch = true;
      this.searchDisbled = true;
    },
    checkedCust(head, detail, e, rowIndex, indexDetail) {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClickCheckBox;
      key.eventLabel = "ClickCheckBox:" + emp_id;
      this.$ga.event(key);

      let checked = detail.checked ? false : true;
      this.$store.getters.sp_data.by_cus[rowIndex].customer[
        indexDetail
      ].checked = checked;
      this.$store.dispatch("saveTargetPerCust", {
        year: this.dateSelect.year,
        month: this.dateSelect.month_id,
        cust_code: detail.cust_code,
        area_code: head.prov_code,
        target: detail.target,
        selected: checked,
        rowIndex: rowIndex
      });
    },
    clearTarget() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClearTargetAll;
      key.eventLabel = "ClearTargetAll:" + emp_id;
      this.$ga.event(key);
      let theArray = this.productCat;
      this.$store.commit("SET_SP_CHECK_COLOR_BTN", false);
      for (let i = 0; i < theArray.length; i++) {
        theArray[i].order_qty = "";
        for (let k = 0; k < theArray[i].detail.length; k++) {
          theArray[i].detail[k].order_qty = "";
          theArray[i].detail[k].sales = 0;
        }
      }

      let cust_selected = this.custSelect;
      cust_selected.achieved = 0;
      cust_selected.percent = 0;
    },
    clearSearch() {
      this.txtSearch = "";
      this.cancelSearch = false;
      this.showAutocom = true;
      // if (typeof this.cg_selected.length == "undefined") {
      //   this.$store.dispatch("getSalePlanByPro", {
      //     year: this.dateSelect.year,
      //     month: this.dateSelect.month_id,
      //     cust_code: this.custTitle.cust_code,
      //     select: this.filterDP
      //   });
      // }
      this.cg_selected = [];
    },
    addItem() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClickAddNewProduct;
      key.eventLabel = "ClickAddNewProduct:" + emp_id;
      this.$ga.event(key);
      if (this.searchDisbled == true) {
        this.searchDisbled = false;
        let item = this.$store.getters.sp_check_item_master;
        let obj = this.$store.getters.sp_sthis;
        obj.temp = this;
        obj.mode = true;
        this.$store.dispatch("addItem", {
          year: this.dateSelect.year,
          month: this.dateSelect.month_id,
          cust_code: this.custTitle.cust_code,
          mtype: item.mtype,
          prod_code: item.prod_code,
          prod_name: item.prod_name,
          ref_item_code: item.ref_item_code,
          item_prod_name: item.item_prod_name,
          rtype: item.rtype,
          select: this.filterDP
        });
      }
    },
    setExpand(value) {
      let item = this.cg_selected;
      let time = value == null ? 4000 : 800;
      setTimeout(() => {
        var new_box = document.getElementById("sub-box-" + item.item_code);
        var new_icon = document.getElementById(
          "sub-box-icon-" + item.item_code
        );
        var new_global = document.getElementById(
          "global-bar-" + item.item_code
        );
        var btn_expand = document.getElementById(
          "freeze-row-" + item.item_code
        );
        if (new_box == null) {
          new_box = document.getElementById("sub-box-" + item.ref_item_code);
          new_icon = document.getElementById(
            "sub-box-icon-" + item.ref_item_code
          );
          new_global = document.getElementById(
            "global-bar-" + item.ref_item_code
          );
          btn_expand = document.getElementById(
            "freeze-row-" + item.ref_item_code
          );
        }
        if (new_box != null) {
          var new_class = new_box.classList[new_box.classList.length - 1];
          if (new_class == "hide-tag") {
            new_box.classList.toggle("hide-tag");
            new_global.classList.toggle("hide-tag");
            new_icon.innerHTML = "expand_less";
          }
          if (value == null) {
            if (btn_expand != null) {
              var inputMom = btn_expand.childNodes[0].childNodes[0];
              if (inputMom != null) {
                inputMom.focus();
              }
            }
          } else {
            var focus_expand = document.getElementById(
              "focus-row-" + item.item_code
            );
            if (focus_expand == null) {
              if (btn_expand != null) {
                var inputMom = btn_expand.childNodes[0].childNodes[0];
                if (inputMom != null) {
                  inputMom.focus();
                }
              }
            } else {
              var inputChild = focus_expand.childNodes[0].childNodes[0];
              if (inputChild != null) {
                inputChild.focus();
              }
            }
          }
        }
      }, time);
    },
    getCustomerDetail(value, rowIndex, indexDetail) {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClickCustomer;
      key.eventLabel = "ClickCustomer:" + emp_id;
      this.$ga.event(key);

      let cust_selected = this.custTitle;
      cust_selected.cust_code = value.cust_code;
      cust_selected.cust_name = value.cust_name;
      cust_selected.year = this.dateSelect.year;
      cust_selected.month = this.dateSelect.month_id;
      cust_selected.full = value;
      cust_selected.rowIndex = rowIndex;
      cust_selected.indexDetail = indexDetail;
      let popup_date = this.dateSelectPOP;
      popup_date.month_id = this.dateSelect.month_id;
      popup_date.month = this.dateSelect.month;
      popup_date.year = this.dateSelect.year;
      this.rsDateDP.month_id = this.dateSelect.month_id;
      this.rsDateDP.year = this.dateSelect.year;
      this.$store.dispatch("getSalePlanByPro", {
        year: this.dateSelect.year,
        month: this.dateSelect.month_id,
        cust_code: value.cust_code,
        select: this.filterDP
      });
      this.txtSearch = "";
      this.cg_selected = [];
      document.getElementsByTagName("html")[0].style = "overflow-y:hidden";
      this.openDialog("saleplan_dialog");
    },
    openDialog(ref) {
      this.$refs[ref].open();
      this.sp_show_page = true;
      var body = document.getElementsByTagName("body");
      body[0].setAttribute("style", "overflow-y: hidden !important;");
    },
    closeDialog(ref) {
      this.$refs[ref].close();
      if (ref == "saleplan_dialog") {
        document.getElementsByTagName("html")[0].style = "overflow-y:scroll";
      }
      var body = document.getElementsByTagName("body");
      body[0].setAttribute("style", "overflow-y: unset");
      let cust_selected = this.custTitle;
      cust_selected.cust_code = "";
      cust_selected.cust_name = "";
      cust_selected.month = "";
      cust_selected.year = "";
      let cust = this.custSelect;
      cust.target = 0;
      cust.achieved = 0;
      cust.percent = 0;
      this.cancelSearch = false;
    },
    hideCalendar: function() {
      this.showmonth = false;
      this.showmonthdp = false;
    },
    mouseLeave: function() {
      if (this.showmonth == true) {
        this.showmonth = false;
      }
    },
    mouseLeaveOP: function() {
      if (this.showmonthdp == true) {
        this.showmonthdp = false;
      }
    },
    closeEvent: function() {
      this.hideCalendar();
    },
    renderProgressBar(percent) {
      if (isNaN(parseFloat(percent))) {
        return "";
      } else {
        if (parseFloat(percent) < 50) {
          return "red";
        } else if (parseFloat(percent) < 70 && parseFloat(percent) >= 50) {
          return "orange";
        } else if (parseFloat(percent) >= 70) {
          return "green";
        }
      }
    },
    renderProgressBarMain(value) {
      let percent = value.sum_progress;
      let max = value.max_pass_percent;
      if (isNaN(parseFloat(percent))) {
        return "";
      } else {
        if (parseFloat(percent) < 50) {
          return "red";
        } else if (parseFloat(percent) < max && parseFloat(percent) >= 50) {
          return "orange";
        } else if (parseFloat(percent) >= max) {
          return "green";
        }
      }
    },
    outsideShowCg: function(e) {
      if (e.target.className != "md-input") {
        this.showAutocom = false;
        this.txtSearch = "";
        this.cancelSearch = false;
        if (this.cg_selected.length > 0) {
          this.$store.dispatch("getSalePlanByPro", {
            year: this.dateSelect.year,
            month: this.dateSelect.month_id,
            cust_code: this.custTitle.cust_code,
            select: this.filterDP
          });
        }
      }
    },
    gaInputTarget() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_InputTarget;
      key.eventLabel = "InputTarget:" + emp_id;
      this.$ga.event(key);
    },

    gaSearchProduct() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_SearchProduct;
      key.eventLabel = "SearchProduct:" + emp_id;
      this.$ga.event(key);
    },
    backToTop(){
      console.log('top')
         let temp = document.getElementById("performId");
      if (temp != "") {
        temp.scrollIntoView({
          behavior: "smooth"
        });
      }
    },handleScroll(){
      if(document.getElementById('pageSalesplan').scrollTop <=500){
        this.showBackToTop = false
      }else {
        this.showBackToTop = true
      }
    }
  },
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "promotion-box": require("./salesplan-component/sp_promotion_box"),
    "order-table": require("./salesplan-component/sp_order_table"),
    "month-calendar": require("../Salesops/customComponent/mds-month-calendar"),
    "orderqty-input": require("./salesplan-component/sp-orderqty-input"),
    "create-myorder": require("./salesplan-component/create-myorder")
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
    } else {
      this.$store.dispatch("setPathMenuService", "planning");
      this.login = true;
      var roundnoti = document.getElementsByClassName("roundnoti");
      var dropdown = document.getElementsByClassName("my-dropdown-dd mt-10");
      if (roundnoti.length > 0) {
        roundnoti[0].remove(roundnoti.selectedIndex);
      }
      if (dropdown.length > 0) {
        dropdown[0].remove(dropdown.selectedIndex);
      }
      let menu = this.$store.getters["displayMenu"];
      let path = this.$router.app._route.path.split("/");
      let pathFull = this.$router.app._route.path;
      let head = _.filter(menu, item => {
        if (item.m_code == path[1]) {
          return true;
        }
      });
      if (head.length > 0) {
        let sub = _.filter(head[0].sub_menu, item => {
          if (item.m_path == pathFull) {
            return true;
          }
        });
        if (sub.length > 0) {
          this.pageName = sub[0].m_name;
        }
      }
      // document.getElementsByTagName("html")[0].style = "overflow-y:scroll";
      let date = this.dateSelect;
      date.month_id = dateFunc.format(new Date(), "MM");
      date.month = dateFunc.format(new Date(), "MMMM");
      date.year = dateFunc.format(new Date(), "yyyy");

      this.$store.dispatch("getSalePlan", {
        year: date.year,
        month: date.month_id
      }); //get first all data
      this.$store.dispatch("autoComplete", {
        keyword: this.txtSearch
      });
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          //   console.warn(warn);
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