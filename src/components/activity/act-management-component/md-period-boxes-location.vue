<template>
  <div style="display : flex" class="md-period-box" @mouseleave="mouseLeave">
    <div class="left-box">
      <md-card class="text-left-box" @click.native="showmonth = true">
        <md-card-content>
          <div style="width:100%;display: -webkit-box;">
            <div
              :style="{
                'font-size': years == '' ? '12px' : '18px',
                'font-weight': years == '' ? '600' : '',
                'font-family': 'Roboto',
                width: '90%'
              }"
            >
              {{ months }} {{ years }}
            </div>
            <div style="width:10%">
              <md-icon>expand_more</md-icon>
            </div>
          </div>
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
</template>

<script>
import dateFunc from '../../Salesops/fullCalendar/dateFunc'
import moment from 'moment'
import Vue from 'vue'
export default {
  create () {},
  props: {
    value: Object,
    year: {
      type: [String, Number],
      default: moment().format('YYYY')
    },
    month: {
      type: [String, Number],
      default: moment().format('MM')
    },
    range: {
      type: String,
      default: '-'
    },
    displayRange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showmonth: false,
      months: dateFunc.format(new Date(), 'MMMM'),
      years: dateFunc.format(new Date(), 'yyyy'),
      smCode: '',
      smTitle: '',
      custCode: '',
      custTitle: '',
      vShowAutoSmCode: false,
      oldSmCode: '',
      disabledSM: false,
      textSnackBar: '',
      vertical: 'bottom',
      horizontal: 'center',
      duration: 4000,
      // listAutoSM: [],
      // listAutoCust: []
      // dpSource: ""
      // dpSource: "salesops",
      customer_cus:''
    }
  },
  computed: {
    listAutoSM() {
      return this.$store.getters["activitymanage/listAutoSM"];
    },
    listAutoCust() {
      return this.$store.getters["activitymanage/listAutoCust"];
    },

  },
  methods: {
searchCustomer: function(item){},
chooseCust_cus: function(item){},
    add () {
      this.$emit('add', 'add')
    },
    // fetchData (mode, param) {
    //   if (mode == 'customer') {
    //     this.listAutoCust = []
    //     for (let i = 10; i < 20; i++) {
    //       this.listAutoCust.push({
    //         code: '1010' + i,
    //         title: 'บริษัท เอ็น วาย ซี แมนเนจเมนท์ จำกัด ' + i
    //       })
    //     }
    //   } else {
    //     this.listAutoSM = []
    //     for (let i = 10; i < 20; i++) {
    //       this.listAutoSM.push({
    //         code: '231' + i,
    //         title: 'พิทักษ์ เลิศวิรัชชัยนันท์'
    //       })
    //     }
    //   }
    // },
    filterCust: function (param) {
      console.log('filterCust',param);
      console.log('param.length',param.length);
      if (param.length > 0) {
        this.custCode = param
        this.$store.dispatch("activitymanage/filterCustomer", {salesman:this.smCode,keyword:param});
        // this.fetchData('customer', param)
      } else if (param.length == 0) {
        this.custCode = ''
        this.custTitle = ''
      }
    },
    filterSM: function (param) {
      console.log('filterSM',param);
      console.log('param.length',param.length);
      if (param.length > 0) {
        this.smCode = param
        this.$store.dispatch("activitymanage/filterSaleman", param);
        // this.fetchData('salesman', param)
      } else if (param.length == 0) {
        this.smCode = ''
        this.smTitle = ''
      }
    },
    chooseSM: function (item) {
      this.smCode = item.code
      this.smTitle = item.code + ' ' + item.title
    },
    chooseCust: function (item) {
      this.custCode = item.code
      this.custTitle = item.code + ' ' + item.title
    },
    searchActivity () {
      this.$emit('searchActivity', {
        sm_code: this.smCode,
        cust_code: this.custCode,
        filter_date: this.dpFilter
      })
    },
    mouseLeave: function () {
      if (this.showmonth == true) {
        this.showmonth = false
      }
    },
    selectyear (value) {
      this.$emit('selectyear', {
        month: this.month,
        year: value.year,
        range: this.range
      })
    },
    selectMonth (value) {
      if (value.mode == 'range') {
        var range = value.range.split('/')
        let start = moment(range[0]).format('DD MMM YYYY')
        let end = moment(range[1]).format('DD MMM YYYY')
        this.months = start + ' - ' + end
        this.years = ''
        this.$emit('selectmonth', {
          month: '',
          year: '',
          range: value.range,
          mode: value.mode
        })
      } else {
        this.months = value.month.value
        this.years = value.year
        this.$emit('selectmonth', {
          month: value.month.id,
          year: value.year,
          range: '-',
          mode: value.mode
        })
      }
      this.hideCalendar()
    },
    hideCalendar: function () {
      this.showmonth = false
    }
  },
  components: {
    'month-calendar': require('../../Salesops/customComponent/mds-month-calendarV2'),
    'md-auto-search-box': require('./md-auto-search-box'),
    "md-dropdown-box": require("../../Salesops/customComponent/mdc-dropdown-box"),
  }
}
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
  height: 46px;
  width: 100%;
  .md-card {
    box-shadow: unset;
    border-radius: 4px;
    height: 100%;
  }
  .left-box {
    width: 100%;
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
    // height: 45px;
  }
}
</style>
