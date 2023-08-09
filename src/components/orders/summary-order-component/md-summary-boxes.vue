<template>
  <div id="a" style="display : flex" class="md-period-box" @mouseleave="mouseLeave">
    <!-- <div class="left-box"> -->

      <div v-for="items in dataSummary.sum" style="width: 100%;" class="md-layout" >

        <div style="margin-left:1%;width:24%; background-color:">
          <div class="left-box">
            <md-card class="text-left-box" style="margin-left:1%;" @click.native="showmonth = true">
              <md-card-content>
                <div style="width:100%;display: -webkit-box;">
                  <div
                    :style="{'font-size' : years == ''?'14px':'16px',
                    'font-weight' : years == ''?'600':'' ,
                    'font-family' :'Roboto',
                    'width' :'90%',
                    }"
                  >{{months}} {{years}}</div>
                  <div style="width:10%">
                    <md-icon>expand_more</md-icon>
                  </div>
                </div>
                <!-- <div style="width:100%">
                  <div class="card-sub-title" v-if="years != ''">Sales Period</div>
                  <div class="card-sub-title" v-else>Custom Date</div>
                </div>-->
              </md-card-content>
            </md-card>
            <month-calendar
              ref="selectCalendar"
              v-if="showmonth"
              v-on:selectmonth="selectMonth"
              v-on:selectyear="selectyear"
              :year="year"
              :month="month"
              :displayRange="displayRange"
              :range="range"
            ></month-calendar>
          </div>
        </div>

        <div style="font-weight:bolder;width:19%;padding-top:15px;padding-right: 45px;font-size: 18px;" class="title">Total</div>
        <div style="width:13%;text-align:left;" class="title">
          <span style="font-size: 16px; font-weight: bolder;">{{ $store.getters['globalfunc/formatNumberInt'](items.count_customer) }}</span>
          <div style="font-size: 10px; font-weight: bolder; font-family: roboto;">Count Customer</div>
        </div>
        <div style="width:13%;text-align:left;" class="title">
          <span style="font-size: 16px; font-weight: bolder;">{{ $store.getters['globalfunc/formatNumberInt'](items.count_po) }}</span>
          <div style="font-size: 10px; font-weight: bolder; font-family: roboto;">Count PO.</div>
        </div>
        <div style="width:13%;text-align:left;" class="title">
          <!-- <span style="font-size: 16px; font-weight: bolder;">฿</span> -->
          <span style="font-size: 16px; font-weight: bolder;">{{ $store.getters['globalfunc/formatNumber'](items.po_value) }}</span>
          <div style="font-size: 10px; font-weight: bolder; font-family: roboto;">Order Value</div>
        </div>
        <div style="width:13%;text-align:left;" class="title">
          <!-- <span style="font-size: 16px; font-weight: bolder;">฿</span> -->
          <span style="font-size: 16px; font-weight: bolder;">{{ $store.getters['globalfunc/formatNumber'](items.inv_value) }}</span>
          <div style="font-size: 10px; font-weight: bolder; font-family: roboto;">Invoice Value</div>
        </div>

      </div>


    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span>{{ textSnackBar }}</span>
      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color:white"
        >OK</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import dateFunc from "../../Salesops/fullCalendar/dateFunc";
import moment from "moment";
import historyService from "@/services/orders/history";
import Vue from "vue";
export default {
  create() {
    this.$store.dispatch('summaryorders/getTimeServer')
     let range_time_server = moment(this.$store.getters.timeServer).format("YYYY-MM-DD/YYYY-MM-DD")
     console.log(range_time_server)
     this.months = "AA"
    let month_id = dateFunc.format(new Date(), "MM");
  },
  props: {
    value: Object,
    orderSource: Array,
    max: {
      type: [String, Number],
      default: 0
    },
    year: {
      type: [String, Number],
      default: moment().format("YYYY")
    },
    month: {
      type: [String, Number],
      default: moment().format("MM")
    },
    range: {
      type: String,
      default: "-"
    },
    displayRange: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showmonth: false,
      months: dateFunc.format(new Date(), "MMMM"),
      years: dateFunc.format(new Date(), "yyyy"),
      dpFilter: "po_date",
      group_cus:'all',
      corporate:'',
      poNo: "",
      OrderNo: "",
      invNo: "",
      smCode: "",
      smTitle: "",
      custCode: "",
      custTitle: "",
      vShowAutoSmCode: false,
      oldSmCode: "",
      disabledSM: false,
      textSnackBar: "" ,
      vertical: 'bottom',
      horizontal: 'center',
      duration: 4000,
      channel:"all",
      corpName:"",


    };
  },
  computed: {
    summary() {
      return this.$store.getters["summaryorders/summary"];
    },
    channelCrop() {
      return this.$store.getters["summaryorders/channelCrop"];
    },
    listAutoSM() {
      let list = this.$store.getters["summaryorders/listAutoSM"];
      let department = Vue.localStorage.get("department");
      if (list.length == 1 && department == "SM") {
        this.smTitle = list[0].code + " " + list[0].title;
        this.smCode = list[0].code;
        this.disabledSM = true;
      }
      return this.$store.getters["summaryorders/listAutoSM"];
    },
    listAutoCust() {
      return this.$store.getters["summaryorders/listAutoCust"];
    },
    filter_search() {
      return this.$store.getters["summaryorders/filter_search"];
    },
    dataSummary() {
      return this.$store.getters['summaryorders/dataSummary']
    },
  },
  methods: {
    searchHistory() {
      this.$emit("searchHistory", {
        po_no: this.poNo,
        order_no: this.OrderNo,
        inv_no: this.invNo,
        sm_code: this.smCode,
        cust_code: this.custCode,
        filter_date: this.dpFilter,
        source: this.filter_search.source,
        selectChannel:this.channel,
        selectCorpName:this.corpName,
      });
    },

    mouseLeave: function() {
      if (this.showmonth == true) {
        this.showmonth = false;
      }
    },
    selectyear(value) {
      this.$emit("selectyear", {
        month: this.month,
        year: value.year,
        range: this.range
      });
    },
    selectMonth(value) {
      if (value.mode == "range") {
        var range = value.range.split("/");
        let start = moment(range[0]).format("DD MMM YYYY");
        let end = moment(range[1]).format("DD MMM YYYY");
        this.months = start + " - " + end;
        this.years = "";
        this.$emit("selectmonth", {
          month: "",
          year: "",
          range: value.range,
          mode: value.mode
        });
      } else {
        this.months = value.month.value;
        this.years = value.year;
        this.$emit("selectmonth", {
          month: value.month.id,
          year: value.year,
          range: "-",
          mode: value.mode
        });
      }
      // this.hideCalendar();
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    selectChannel( param , indexs ){
      document.getElementById('orderhis_select_corp').click()
      let items = this.channelCrop
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.$store.commit('summaryorders/setChannelCrop' ,items )
      // this.channelCrop = items

        if(param.id === 'all'){
        this.corpName = ''
      }else {
         this.corpName = param.id
      }



    }

  },
  created() {
    // this.$store.dispatch('summaryorders/summaryOrder', date.year + '-' + date.month)
      // console.log('DATE>>>>>>>.', this.months)
  },

  components: {
    "month-calendar": require("../../Salesops/customComponent/mds-month-calendarV2"),
    "md-auto-search-box": require("./md-auto-search-box"),
    "md-auto-search-box-sm": require("./md-auto-search-box-sm")
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
.md-period-box {
  padding:20px 20px 15px 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  background-color:#fff;
  height: 100%;
  width: 100%;
  .md-card {
    box-shadow: unset;
    border-radius: 4px;
    height: 100%;
  }
  .left-box {
    cursor: pointer;
    .text-left-box {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      .md-card-content {
        padding: 12px 18px 7px 20px;
        text-align: left;
        overflow-y: hidden;
        .card-sub-title {
          color: #a8a8a8;
        }
        .md-icon {
          color: #414141;
        }
      }
    }
  }
  .center-box {
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    .md-card {
      border-radius: 4px;
      height: 100%;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      .md-card-content {
        padding: 12px 18px 7px 20px;
        .card-sub-title {
          color: #a8a8a8;
        }
        .floating-box-big {
          .quota-box,
          .achieved-box {
            padding-right: 2%;
            text-align: left;
            width: 25%;
          }
        }
      }
    }
  }
  .datas-auto-search {
    position: absolute;
    width: 100%;
    margin-top: 32px;
    z-index: 2;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    overflow-y: scroll;
    max-height: 180px;

    ul {
      display: inline;
      margin: 0;
      padding: 0;

      li {
        display: block;
        padding: 8px 10px;
        margin: 0;
        text-align: left;
        font-family: Lato;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
        background-color: white;

        &.nowrap {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &.initial {
          white-space: initial;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      li:hover {
        background: #efefef;
        cursor: pointer;
      }
    }

    &::-webkit-scrollbar {
      height: 7px;
      width: 8px;
      background: #f7f7f7;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.11);
      border-radius: 5px;
    }
  }
  .md-input-container input,
  .md-input-container textarea {
    height: 20px;
  }

}
</style>

