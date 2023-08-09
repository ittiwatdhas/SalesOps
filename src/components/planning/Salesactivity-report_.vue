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
        >{{ pageName }}</md-layout
      >
      <md-layout md-align="center" class="pt-20">
        <md-tabs id="tabSalesTeam" @change="onChange" @click.native="onTabClick">
          <md-tab
            id="tab-salesteam"
            :md-active="setActiveTab == 'salesteam'"
            md-label="Sales Team"
          >
            <md-layout md-flex="100" md-align="center">
              <md-spinner
                :md-size="150"
                :md-stroke="1"
                v-show="spinner"
                md-indeterminate
              ></md-spinner>
              <md-card style="height: 100%;" class="tap-table">
                <md-layout md-flex="100" style=" padding-bottom: 0px !important;flex: unset; border: 0.5px solid #D1D1D1; background-color: #F7F7F7">
                  <md-layout
                    md-flex="30"
                    style="
                      padding-left: 30px;
                      font-family: lato;
                      font-size: 18px;
                      height: 70px;
                      padding-top: 20px;
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
                  <md-layout style="padding:0 0 0 0"  md-flex="70" md-align="center">
                      <div style="width:100% ;">
                        <md-card-content>
                          <md-layout md-gutter>
                            <md-layout style="opacity: 1;color:#727272;font-weight: bold;"><span>SUCCESS RATE %</span></md-layout>
                            <md-layout v-for="(items) in overview" :key="items.id">
                              <div class="left">
                                <span v-if="items.amount==''||items.amount==null" class="title-number">0</span>
                                <span v-else class="title-number">{{items.amount}}%</span><br>
                                <span class="subtitle-number">{{items.name}}</span>
                              </div>
                            </md-layout>
                            <md-layout  >
                                 
                          <md-menu style="text-align: end;width:100%;"  md-size="3" md-direction="bottom left">
                            <md-button style="" class="md-icon-button" md-menu-trigger>
                              <md-icon style="padding-top:5px;font-size:40px;margin: 0px !important;"
                                >more_vert</md-icon
                              >
                            </md-button>
                            <md-menu-content style="margin-top:50px;">
                              <!-- @selected="openDialog_role(item)" -->
                              <md-menu-item
                              >
                                <span>Trip Plan Overview</span>
                              </md-menu-item>
                               <md-menu-item
                              >
                                <span>Order Overview</span>
                              </md-menu-item>
                            </md-menu-content>
                          </md-menu>
                            </md-layout>
                          </md-layout>
                        </md-card-content>
                    </div>
                  </md-layout>
                  <md-layout style="border:0.5px solid #D1D1D1;border-width:1px 0px 0px 0px;background-color:#fff;height: 100%;"  md-flex="100" md-align="center">
                      s
                  </md-layout>
                </md-layout>
              </md-card>
            </md-layout>
          </md-tab>

          <md-tab
            id="tab-tpoverview"
            :md-active="setActiveTab == 'tpoverview'"
            md-label="Trip Plan OverView"
          >
            <md-layout md-flex="100" md-align="center">
       
            </md-layout>
          </md-tab>

          <!-- Purchase Order (MT) -->
          <md-tab
            id="tab-orderoverview"
            :md-active="setActiveTab == 'orderoverview'"
            md-label="Order OZverview"
          >
            <md-layout md-flex="100" md-align="center">
              <md-spinner
                :md-size="150"
                :md-stroke="1"
                v-show="spinnerMT"
                md-indeterminate
              ></md-spinner>

            </md-layout>
          </md-tab>
        </md-tabs>
      </md-layout>
    </div>
    <!-- <md-comment-dialog
      :title="'Notes'"
      @close="closeComment"
      @reply="replyComment"
      @read="readComment"
      :data="comment"
      :option="commentOpt"
    ></md-comment-dialog>
    <md-dialog ref="pageBudgetDG" id="pageBudgetDG" class="md-orders-view">
      <div
        style="
          position: absolute;
          z-index: 101;
          margin-left: 40%;
          margin-top: 25%;
        "
      >
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="spinnerDG"
          md-indeterminate
        ></md-spinner>
      </div>
      <md-orders-view
        @close="closeDG"
        :data="detail"
        @read="readComment"
        @reply="replyCommentDG"
      ></md-orders-view>
    </md-dialog> -->
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import dateFunc from "../Salesops/fullCalendar/dateFunc";
import salesactivityService from "@/services/planning/salesactivity";
export default {
  name: "salesactivity-report",
  data() {
    let random = Math.random();
    return {
      overview: [
        { id: 1, amount: 97.22, name: "Visit Plan" },
        { id: 2, amount: 100, name: "Virtual Plan" },
        { id: 3, amount: 100, name: "All Plan" },
      ],
      // corporateCode: "",
      // keywordDis: "",
      // keywordPur: "",
      // keywordPurMT: "",
      // commentOpt: {
      //   display: false,
      //   top: 0,
      //   left: 0,
      // },
      disDate: {
        year: dateFunc.format(new Date(), "yyyy"),
        month_id: dateFunc.format(new Date(), "MM"),
      },
      disShowmonth: false,
      // purShowmonth: false,
      setActiveTab: "salesteam",
      // evenChangeTab: "",
      // showAutocom: false,
      // showAutocom_channel: false,
      // showAutocom_corp: false,
      // cancelSearch: false,
      // txtSearch: "",
      // txt_channel: "All Channel",
      // widthTag: 0,
      // tempId: random + "w",
      // totalDis_limit: 0,
      // totalDis_used: 0,
      // totalDis_balance: 0,
      // totalPur_amount: 0,
      // totalPur_netamount: 0,
      // totalPur_budget: 0,
      // total_amount_mt: 0,
      // total_netamount_mt: 0,
      // total_budget_mt: 0,
      // pageName: "",
      // channel_code_filter: "",
      // dropdown_channel: [
      //   { channel_code: "", title_channel: "All Channel" },
      //   { channel_code: "100", title_channel: "กลุ่มลูกค้า TT" },
      //   { channel_code: "200", title_channel: "กลุ่มลูกค้า MT" },
      //   { channel_code: "300", title_channel: "กลุ่มลูกค้า MTT" },
      // ],
      spinnerMT: false,
      // tablePurchaseMT: [],
      // dataSearch: {
      //   range: "",
      //   month: "",
      //   year: "",
      //   emp_id: "",
      //   filter: "",
      //   page: 0,
      //   per_page: 25,
      // },
      // loadPage: 1,
      // scrollStart: [0],
    };
  },
  computed: {
    // dataDiscount() {
    //   let dataDiscount = this.$store.getters["budget/dataDiscount"];
    //   this.totalDis_limit = dataDiscount.reduce(
    //     (acc, row) => acc + parseFloat(row.limit.replace(/,/g, "")),
    //     0
    //   );
    //   this.totalDis_used = dataDiscount.reduce(
    //     (acc, row) => acc + parseFloat(row.used.replace(/,/g, "")),
    //     0
    //   );
    //   this.totalDis_balance = dataDiscount.reduce(
    //     (acc, row) => acc + parseFloat(row.balance.replace(/,/g, "")),
    //     0
    //   );
    //   // console.log(row.used)
    //   return this.$store.getters["budget/dataDiscount"];
    // },
    // dataCorporate() {
    //     return this.$store.getters["budget/dataCorporate"];
    // },
    // dataPurchase() {
    //   let dataPurchase = this.$store.getters["budget/dataPurchase"];
    //   this.totalPur_amount = dataPurchase.reduce(
    //     (acc, row) => acc + parseFloat(row.total_amount),
    //     0
    //   );
    //   this.totalPur_netamount = dataPurchase.reduce(
    //     (acc, row) => acc + parseFloat(row.total_netamount),
    //     0
    //   );
    //   this.totalPur_budget = dataPurchase.reduce(
    //     (acc, row) => acc + parseFloat(row.sum_budget),
    //     0
    //   );
    //   return this.$store.getters["budget/dataPurchase"];
    // },
    spinner() {
      return this.$store.getters["salesactivity/spinner"];
    },
    // dropdown() {
    //   return this.$store.getters["budget/dropdown"];
    // },
    // levelSalesTitle() {
    //   return this.$store.getters["budget/levelSalesTitle"];
    // },
    // comment() {
    //   return this.$store.getters["budget/comment"];
    // },
    disSelectedDate() {
      return this.$store.getters["salesactivity/dis_selected_date"];
    },
    // purSelectedDate() {
    //   return this.$store.getters["budget/pur_selected_date"];
    // },
    // spinnerDG() {
    //   return this.$store.getters["budget/spinnerDG"];
    // },
    // detail() {
    //   return this.$store.getters["budget/detail"];
    // },
    // loadDataMT() {
    //   return this.$store.getters["budget/loadDataMT"];
    // },
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
    // openSelectDP() {
    //   this.displayDP = true;
    // },
    // showTime(value) {
    //   return moment(new Date(value)).format("DD/MM/YYYY");
    //   // return moment(new Date(value)).format("DD-MM-YYYY");
    // },
    // diaplayDate(items) {
    //   let date = "";
    //   if (
    //     items !== undefined &&
    //     items !== "" &&
    //     items !== null &&
    //     items !== 0 &&
    //     items !== "0"
    //   ) {
    //     date =
    //       items.toString().substring(6, 8) +
    //       "/" +
    //       items.toString().substring(4, 6) +
    //       "/" +
    //       items.toString().substring(0, 4);
    //   }
    //   return date;
    // },
    // select_channel(value) {
    //   this.channel_code_filter = value.channel_code;
    //   this.showAutocom_channel = false;
    //   if (value.channel_code != "") {
    //     this.txt_channel = value.channel_code + " : " + value.title_channel;
    //   } else {
    //     this.txt_channel = value.title_channel;
    //   }
    //   // this.txtSearch = value.code + " " + value.title;

    //   this.$store.dispatch("budget/getDiscountList", value);
    // },
    // selectLevelSales(value) {
    //   this.showAutocom = false;
    //   // this.txtSearch = value.code + " " + value.title;
    //   this.txtSearch = value.title + " " + value.code;
    //   this.cancelSearch = true;
    //   this.$store.commit("budget/setCheckLoadDataMT", this.setActiveTab);
    //   this.$store.dispatch("budget/selectLevelSales", value);
    // },
    // selectCorporate(value) {
    //   this.showAutocom_corp = false;
    //   this.corporateCode = value.id;
    //   this.cancelSearch = true;
    //   this.$store.commit("budget/setCheckLoadDataMT", this.setActiveTab);
    //   this.$store.dispatch("budget/selectCorporate", value);
    // },
    // keywordDisCLR() {
    //   this.keywordDis = "";
    //   this.filterList("discount", "");
    // },
    // keywordDisFil(val) {
    //   this.keywordDis = val;
    //   this.filterList("discount", val);
    // },
    // keywordPurFil(val) {
    //   this.keywordPur = val;
    //   this.filterList("purchase", val);
    // },
    // keywordPurCLR() {
    //   this.keywordPur = "";
    //   this.filterList("purchase", "");
    // },
    // filterList(type, param) {
    //   let t = this;
    //   setTimeout(() => {
    //     if (type == "discount") {
    //       t.$store.dispatch("budget/filterDis", param);
    //     } else {
    //       t.$store.dispatch("budget/filterPur", param);
    //     }
    //   }, 20);
    // },
    onChange(tabIndex) {
      // console.log(
      //   "🚀 ~ file: Budget.vue ~ line 909 ~ onChange ~ tabIndex",
      //   tabIndex
      // );
      // if (tabIndex == 0) {
      //   this.setActiveTab = "discount";
      //   this.evenChangeTab = "";
      // } else if (tabIndex == 1) {
      //   this.setActiveTab = "purchase";
      //   // if (this.evenChangeTab == "") {
      //   //   this.evenChangeTab = "detailPurchase";
      //   //   this.$store.dispatch("budget/getPurchaseList");
      //   // }
      // } else {
      //   this.setActiveTab = "purchasemt";
      // }
    },
    // onTabClick(event) {
    //   // console.log("onTabClick", event);
    //   if (event.target.innerText === "PURCHASE ORDER (MT)") {
    //     this.getDataListMT();
    //   } else if (event.target.innerText === "PURCHASE ORDER") {
    //     this.evenChangeTab = "detailPurchase";
    //     this.$store.dispatch("budget/getPurchaseList");
    //   }
    // },
    // onSearchListMT() {
    //   this.clearAllDataTabMT();
    //   this.getDataListMT();
    // },
    // getDataListMT() {
    //   let date = this.$store.getters["budget/pur_selected_date"];
    //   let emp_id = this.$store.getters["budget/levelSalesCode"];
    //   this.dataSearch = {
    //     range: date.range,
    //     month: date.month,
    //     year: date.year,
    //     emp_id: emp_id,
    //     filter: this.keywordPurMT,
    //     corp_code: this.corporateCode,
    //     page: this.loadPage,
    //     per_page: 25,
    //   };
    //   // console.log("dataSearch ==>", this.dataSearch);

    //   this.spinnerMT = true;
    //   budgetService.GetBudgetMT(this.dataSearch).then((response) => {
    //     // console.log("response ==>", response);
    //     if (response.data.length > 0) {
    //       this.tablePurchaseMT = this.tablePurchaseMT.concat(response.data);
    //       this.total_amount_mt =
    //         response.total_amount_mt !== undefined
    //           ? response.total_amount_mt
    //           : 0;
    //       this.total_netamount_mt =
    //         response.total_netamount_mt !== undefined
    //           ? response.total_netamount_mt
    //           : 0;
    //       this.total_budget_mt =
    //         response.total_budget_mt !== undefined
    //           ? response.total_budget_mt
    //           : 0;
    //       this.loadPage++;
    //     } else if (this.tablePurchaseMT.length === 0) {
    //       this.clearAllDataTabMT();
    //     }
    //     this.spinnerMT = false;
    //   });
    // },
    // clearAllDataTabMT() {
    //   this.tablePurchaseMT = [];
    //   this.scrollStart = [0];
    //   this.loadPage = 1;
    //   this.total_amount_mt = 0;
    //   this.total_netamount_mt = 0;
    //   this.total_budget_mt = 0;
    // },
    // handleScroll(event) {
    //   if (
    //     event.target.scrollTop + event.target.clientHeight >=
    //     event.target.scrollHeight
    //   ) {
    //     this.onHandleScroll();
    //   }
    // },
    // onHandleScroll() {
    //   this.dataSearch = {};
    //   if (!this.scrollStart.includes(this.tablePurchaseMT.length)) {
    //     this.scrollStart.push(this.tablePurchaseMT.length);
    //     this.getDataListMT();
    //   } else {
    //     this.spinnerMT = false;
    //   }
    // },
    // valueKeywordPurMT(value) {
    //   this.keywordPurMT = _.trim(value);
    // },
    // clearKeywordPurMT() {
    //   this.keywordPurMT = "";
    //   this.onSearchListMT();
    // },
    // readComment(data) {
    //   this.$store.dispatch("budget/readComment", data);
    // },
    // closeComment() {
    //   this.commentOpt.display = false;
    // },
    // replyCommentDG(value) {
    //   if (this.comment.length == 0) {
    //     value.emp_id_start = Vue.localStorage.get("emp_id");
    //   } else {
    //     value.emp_id_start = this.comment[this.comment.length - 1].emp_id_start;
    //   }

    //   value.msg_to = "";
    //   value.emp_id_start = "";
    //   value.head_id = value.h_id;
    //   value.doc_no = value.doc_no;

    //   this.$store.dispatch("budget/replyComment", value);
    // },
    // replyComment(value) {
    //   if (value != null) {
    //     if (this.comment.length == 0) {
    //       value.emp_id_start = Vue.localStorage.get("emp_id");
    //     } else {
    //       value.emp_id_start = this.comment[
    //         this.comment.length - 1
    //       ].emp_id_start;
    //     }

    //     value.msg_to = "";
    //     value.emp_id_start = "";
    //     value.head_id = this.keepRow.h_id;
    //     value.doc_no = this.keepRow.doc_no;

    //     this.$store.dispatch("budget/replyComment", value);
    //   }
    // },
    // openComment(e, items) {
    //   let pageX = e.pageX;

    //   if (pageX == 0) {
    //     let comment = document.getElementById("icon" + items.doc_no);
    //     pageX = comment.offsetLeft + 270;
    //   }
    //   let masterScreenW = window.screen.height;

    //   let H = e.y + 200;
    //   if (H > masterScreenW) {
    //     let total = H - masterScreenW;

    //     this.commentOpt.top = e.y - total;
    //   } else {
    //     this.commentOpt.top = e.y;
    //   }
    //   this.commentOpt.left = pageX - 270;
    //   this.commentOpt.display = true;
    //   this.keepRow = items;
    //   this.$store.dispatch("budget/getComment", items);
    // },
    // renderComment(value) {
    //   if (value.order_status == "REJ") {
    //     return "#F44336";
    //   } else if (value.note_status == false && value.order_status !== "REJ") {
    //     return "#FD7F00";
    //   } else {
    //     return "#C9C9C9";
    //   }
    // },

    disSelectMonth(value, even = null) {
      console.log(disSelectMonth);
      let date = this.$store.getters["budget/dis_selected_date"];
      // if (even == "purSelect") {
      //   if (value.mode == "period") {
      //     date.month_id = value.month.id;
      //     date.month = value.month.value;
      //     date.year = value.year;
      //     this.disDate.month_id = value.month.id;
      //     this.disDate.year = value.year;
      //   } else {
      //     var range = value.range.split("/");
      //     date.month_id = moment(range[0]).format("MM");
      //     date.month = moment(range[0]).format("MMMM");
      //     date.year = value.year;
      //     this.disDate.month_id = moment(range[0]).format("MM");
      //     this.disDate.year = value.year;
      //   }
      //   this.$store.dispatch("budget/getDiscountList");
      // } else {
        date.month_id = value.month.id;
        date.month = value.month.value;
        date.year = value.year;
        this.disDate.month_id = value.month.id;
        this.disDate.year = value.year;
        // this.purSelectMonth(value, "disSelect");
      //   this.$store.dispatch("budget/getDiscountList");
      // }
      this.hideCalendar();
    },
    disSelectyear(value) {
      this.disDate.year = value.year;
    },
    // purSelectMonth(value, even = null) {
    //   let date = this.$store.getters["budget/pur_selected_date"];
    //   if (even == "disSelect") {
    //     date.month = value.month.id;
    //     date.month_name = value.month.value;
    //     date.year = value.year;
    //     date.range = "-";
    //   } else {
    //     if (value.mode == "range") {
    //       var range = value.range.split("/");
    //       let start = moment(range[0]).format("DD MMM YYYY");
    //       let end = moment(range[1]).format("DD MMM YYYY");
    //       date.month = "";
    //       date.month_name = value.range;
    //       date.year = "";
    //       date.range = value.range;
    //     } else {
    //       date.month = value.month.id;
    //       date.month_name = value.month.value;
    //       date.year = value.year;
    //       date.range = "-";
    //     }
    //     this.disSelectMonth(value, "purSelect");
    //     this.$store.dispatch("budget/getPurchaseList");
    //     this.onSearchListMT();
    //   }
    //   this.purhideCalendar();

    //   // this.$store.dispatch("budget/getPurchaseList");
    // },
    // purSelectYear(value) {
    //   let date = this.$store.getters["budget/pur_selected_date"];
    //   date.year = value.year;
    //   // this.disDate.year = value.year;
    // },
    // openMonth() {
    //   var emp_id = Vue.localStorage.get("emp_id");
    //   var key = this.$ga_key.Planning_Salesplan_SelectMonth;
    //   key.eventLabel = "SelectMonth:" + emp_id;
    //   this.$ga.event(key);

    //   this.disShowmonth = true;
    // },
    mouseLeave: function () {
      if (this.disShowmonth == true) {
        this.disShowmonth = false;
      }
    },
    hideCalendar: function () {
      this.disShowmonth = false;
    },
    // openDatail(value) {
    //   this.$store.dispatch("budget/getOrderById", value);
    //   this.$refs["pageBudgetDG"].open();
    // },
    // openDatailEDI(value) {
    //   Vue.localStorage.set("budget_detail", JSON.stringify(value));
    //   let sub_menu_edis = JSON.parse(Vue.localStorage.get("sub_menu_edi"));
    //   let row = _.find(sub_menu_edis, function (o) {
    //     return o.m_code == "ediorders";
    //   });
    //   if (!_.isUndefined(row)) {
    //     var m_path = row.m_path.replace("/edi/", "");
    //     // location.href = "edi/#/" + m_path;
    //    window.open("edi/#/" + m_path);
    //   }
    // },
    // closeDG() {
    //   this.$refs["pageBudgetDG"].close();
    // },
    // openPurchase(value) {
    //   // console.log(
    //   //   "🚀 ~ file: Budget.vue ~ line 1095 ~ openPurchase ~ value",
    //   //   value
    //   // );
    //   var rs = _.find(this.dropdown, function (o) {
    //     return o.code == value.role_code;
    //   });
    //   if (!_.isUndefined(rs) && value.channel != 200) {
    //     this.evenChangeTab = "detailPurchase";
    //     let values = {
    //       code: value.role_code,
    //       title: value.name,
    //     };
    //     this.selectLevelSales(values);
    //     this.setActiveTab = "purchase";
    //   } else {
    //     // this.evenChangeTab = "detailPurchase";
    //     this.$store.commit("budget/setLoadDataMT", true);
    //     let values = {
    //       code: value.role_code,
    //       title: value.name,
    //     };
    //     this.selectLevelSales(values);
    //     this.setActiveTab = "purchasemt";
    //     // this.onSearchListMT();
    //   }
    // },

    // filterDropdow_channel(param) {
    //   // console.log(
    //   //   "🚀 ~ file: Budget.vue ~ line 1162 ~ filterDropdow_channel ~ param",
    //   //   param
    //   // );
    //   if (param.length > 2) {
    //     // this.cancelSearch = true;
    //     // this.$emit("filter", param.trim());
    //   } else {
    //     // this.cancelSearch = false;
    //     // this.$emit("filter", "");
    //   }
    // },
    // filterDropdow(param) {
    //   if (param.length > 2) {
    //     this.cancelSearch = true;
    //     this.$emit("filter", param.trim());
    //   } else {
    //     this.cancelSearch = false;
    //     this.$emit("filter", "");
    //   }
    // },
    // filterDropdow_corp(param) {
    //   if (param.length > 2) {
    //     this.cancelSearch = true;
    //     this.$emit("filter", param.trim());
    //   } else {
    //     this.cancelSearch = false;
    //     this.$emit("filter", "");
    //   }
    // },
    // mouseLeaveDropdow() {
    //   if (this.showAutocom == true) {
    //     this.showAutocom = false;
    //     this.txtSearch = "";
    //   }
    // },
    // mouseLeaveDropdow_channel() {
    //   if (this.showAutocom_channel == true) {
    //     this.showAutocom_channel = false;
    //     this.txtSearch_channel = "";
    //   }
    // },
    // mouseLeaveDropdow_corp() {
    //   if (this.showAutocom_corp == true) {
    //     this.showAutocom_corp = false;
    //     this.txtSearch_corp = "";
    //   }
    // },
    // getWidth(e) {
    //   this.widthTag = e.path[2].offsetWidth;
    // },
    // openAutoCom() {
    //   this.showAutocom = true;
    // },
    // openAutoCom_channel() {
    //   this.showAutocom = true;
    // },
    // openAutoCom_corp() {
    //   this.showAutocom_corp = true;
    // },
    // purhideCalendar: function () {
    //   this.purShowmonth = false;
    // },
    // purMouseLeave: function () {
    //   if (this.purShowmonth == true) {
    //     this.purShowmonth = false;
    //   }
    // },
    // sumDataDis() {
    //   this.totalDis = this.dataDiscount.reduce(
    //     (acc, row) => acc + parseFloat(row.used),
    //     0
    //   );
    //   // console.log(row.used);
    // },
    // formatNumber(value) {
    //   return this.$store.getters["globalfunc/formatNumber"](value);
    // },
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
          console.log(sub[0].m_name);
          this.pageName = sub[0].m_name;
        }
      }

      let dateDis = this.$store.getters["salesactivity/dis_selected_date"];
      dateDis.year = dateFunc.format(new Date(), "yyyy");
      dateDis.month_id = dateFunc.format(new Date(), "MM");
      dateDis.month = dateFunc.format(new Date(), "MMMM");
      // let datePur = this.$store.getters["salesactivity/pur_selected_date"];
      // datePur.year = dateFunc.format(new Date(), "yyyy");
      // datePur.month = dateFunc.format(new Date(), "MM");
      // datePur.month_name = dateFunc.format(new Date(), "MMMM");
      // datePur.range = "-";
      // this.$store.dispatch("budget/getDiscountList");
      // this.$store.dispatch("budget/getCorporateList");
      // this.init()
    }
              
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    // "md-search-box": require("./myorder-component/md-search-box"),
    // "md-comment-dialog": require("../Salesops/customComponent/md-comment-dialog"),
    // "month-calendar": require("../Salesops/customComponent/mds-month-calendar"),
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
    padding-left: 25px;
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
    padding-left: 100px;
    padding-right: 100px;
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
          font-family: $font-lato;
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
  
}
</style>
