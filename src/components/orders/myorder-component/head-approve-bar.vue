<template>
  <div style="display : flex;width:100%" @mouseleave="mouseLeave">
    <div class="sales-period-box" style="width:18%">
      <md-card class="sales-period-view-box" @click.native="openMonth">
        <md-card-content>
          <div
            class="card-title"
            :style="{'font-size' : year == ''?'12px':'18px',
          'font-weight' : year == ''?'600':''}"
          >
            <span>{{month}} {{year}}</span>
          </div>
          <md-icon>expand_more</md-icon>
          <div class="card-sub-title" v-if="year != ''">Sales Period</div>
          <div class="card-sub-title" v-else>Custom Date</div>
        </md-card-content>
      </md-card>
      <month-calendar
        ref="selectCalendar"
        v-if="showmonth"
        v-on:selectmonth="emitSelectMonth"
        v-on:selectyear="selectyear"
        :year="rsYear"
        :month="rsMonth"
        :range="rsRange"
        :displayRange="true"
      ></month-calendar>
    </div>
    <md-card class="sales-quota-box ml-15" style="width:82%;z-index:unset ; position:unset">
      <md-card-content style="padding-top:0px;display:flex;width:100%;padding-right:0px;">
        <div style="width:30%;padding-right:15px">
          <md-auto-search-box
            :placeholder="'PO.No.'"
            :data="$store.getters['myorders/apv_pono']"
            :value="po"
            @filter="filterPono"
            @choose="choosePo"
            :disabled="false"
          ></md-auto-search-box>
        </div>
        <div style="width:33%;padding-right:15px">
          <md-auto-search-box
            :placeholder="'Salesman...'"
            :data="$store.getters['myorders/apv_saleman']"
            :value="saleman"
            @filter="filterSalesman"
            @choose="chooseSalesman"
            :disabled="false"
          ></md-auto-search-box>
        </div>
        <div style="width:33%">
          <md-auto-search-box
            :placeholder="'Customer...'"
            :data="$store.getters['myorders/apv_customer']"
            :value="customer"
            @filter="filterCust"
            @choose="chooseCust"
            :disabled="false"
          ></md-auto-search-box>
        </div>
        <div style="padding-top:15px">
          <md-button class="md-icon-button" :disabled="true">
            <md-icon>label_important</md-icon>
            <!-- <md-icon style="color:#fd7f00">label_important</md-icon> -->
          </md-button>
        </div>
        <!-- label_important -->
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import dateFunc from "../../Salesops/fullCalendar/dateFunc";
import Vue from "vue";
import moment from "moment";
export default {
  data() {
    return {
      rsYear: dateFunc.format(new Date(), "yyyy"),
      rsMonth: dateFunc.format(new Date(), "MM"),
      rsRange: "-",
      showmonth: false,
      month: dateFunc.format(new Date(), "MMMM"),
      year: dateFunc.format(new Date(), "yyyy"),
      saleman: "",
      po: "",
      customer: "",
      temp_customer: "",
      temp_saleman: ""
    };
  },
  methods: {
    mouseLeave: function() {
      if (this.showmonth == true) {
        this.showmonth = false;
      }
    },
    openMonth() {
      this.showmonth = true;
    },
    selectyear(value) {
      this.rsYear = value.year;
    },
    emitSelectMonth(value) {
      let date = this.$store.getters["myorders/date_selected"];
      if (value.mode == "period") {
        this.month = value.month.value;
        this.year = value.year;
        this.$store.dispatch("myorders/getOrderBySales", {
          year: value.year,
          month: value.month.id,
          po: this.po,
          saleman: this.temp_saleman == "" ? "" : this.temp_saleman.code,
          customer: this.temp_customer == "" ? "" : this.temp_customer.code
        });
        date.month = value.month.id;
        date.year = value.year;
        this.rsMonth = value.month.id;
        this.rsYear = value.year;
        this.rsRange = "-";
      } else {
        this.rsMonth = "";
        this.rsYear = dateFunc.format(new Date(), "yyyy");
        this.rsRange = value.range;
        date.year = "";
        date.month = "";
        date.range = value.range;
        let rs = value.range.split("/");
        let start = dateFunc.format(new Date(rs[0]), "dd MMM yyyy");
        let end = dateFunc.format(new Date(rs[1]), "dd MMM yyyy");
        this.$store.dispatch("myorders/getOrderBySales", {
          month: value.range,
          year: "range",
          po: this.po,
          saleman: this.temp_saleman == "" ? "" : this.temp_saleman.code,
          customer: this.temp_customer == "" ? "" : this.temp_customer.code
        });
        this.month = start + " - " + end;
        this.year = "";
      }
      this.hideCalendar();
    },
    hideCalendar: function() {
      this.showmonth = false;
    },
    chooseCust: function(item) {
      this.customer = item.code + " : " + item.title;
      let data = this.$store.getters["myorders/filter_customer"];
      this.data = item;
      this.temp_customer = item;
      this.queryData();
    },
    chooseSalesman: function(item) {
      this.saleman = item.code + " : " + item.title;
      let data = this.$store.getters["myorders/filter_salesman"];
      this.data = item;
      this.temp_saleman = item;
      this.queryData();
    },
    choosePo: function(item) {
      let data = this.$store.getters["myorders/filter_po"];
      this.data = item;
      this.po = item.code;
      this.queryData();
    },
    queryData() {
      this.$store.dispatch("myorders/getOrderBySales", {
        year: this.$store.getters["myorders/date_selected"].year,
        month: this.$store.getters["myorders/date_selected"].month,
        po: this.po,
        saleman: this.temp_saleman == "" ? "" : this.temp_saleman.code,
        customer: this.temp_customer == "" ? "" : this.temp_customer.code
      });
    },
    filterSalesman: function(param) {
      if (param.length > 1) {
        this.$store.dispatch("myorders/filterSalemanAPV", param);
      } else if (param.length == 0) {
        this.temp_saleman = "";
        this.queryData();
      }
    },
    filterPono: function(param) {
      if (param.length > 1) {
        let obj = {
          keyword: param,
          month: this.$store.getters["myorders/date_selected"].month,
          year: this.$store.getters["myorders/date_selected"].year
        };
        this.$store.dispatch("myorders/filterPonoAPV", obj);
      } else if (param.length == 0) {
        this.po = "";
        this.queryData();
      }
    },
    filterCust: function(param) {
      if (param.length > 1) {
        this.$store.dispatch("myorders/filterCustomerAPV", param);
      } else if (param.length == 0) {
        this.temp_customer = 0;
        this.queryData();
      }
    }
  },
  components: {
    "month-calendar": require("../../Salesops/customComponent/mds-month-calendarV2"),
    "md-auto-search-box": require("./md-auto-search-box")
  }
};
</script>
<style lang="scss" scoped>
$color-primary: #fd7f00;
$color-green: #66bb6a;
$color-red: #f44336;
$color-light-gray: #efefef;
$font-roboto: Roboto;
$font-lato: Lato;
$font-kanit: Kanit;
</style>

