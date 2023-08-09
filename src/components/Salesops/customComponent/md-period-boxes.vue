<template>
  <div style="display : flex" class="md-period-box" @mouseleave="mouseLeave">
    <div class="left-box">
      <md-card class="text-left-box" @click.native="showmonth = true">
        <md-card-content>
          <div style="width:100%;display: -webkit-box;">
            <div
              :style="{'font-size' : years == ''?'12px':'18px',
              'font-weight' : years == ''?'600':'' ,
               'font-family' :'Roboto',
               'width' :'90%',
              }"
            >
              <!-- <div style="width:90%;font-family: Roboto;font-size: 18px;">
              -->
              {{months}} {{years}}
            </div>
            <div style="width:10%">
              <md-icon>expand_more</md-icon>
            </div>
          </div>
          <div style="width:100%">
            <div class="card-sub-title" v-if="years != ''">Sales Period</div>
            <div class="card-sub-title" v-else>Custom Date</div>
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
    <div class="center-box">
      <md-card>
        <md-card-content>
          <div class="floating-box-big" style="display: -webkit-box;">
            <div class="quota-box">
              <span class="price">฿</span>
              <span
                class="card-title"
                style="font-weight:bold"
              >{{$store.getters["globalfunc/formatNumberInt"](detail.block1.value)}}</span>
              <div class="card-sub-title">{{detail.block1.text}}</div>
            </div>
            <div class="achieved-box">
              <span class="price">฿</span>
              <span
                class="card-title"
              >{{$store.getters["globalfunc/formatNumberInt"](detail.block2.value)}}</span>
              <div class="card-sub-title">{{detail.block2.text}}</div>
            </div>
            <div class="progress-bar-box">
              <md-progress
                v-show="true"
                :class="renderProgressBar(detail.progress.value)"
                md-mode="determinate"
                :md-progress="changeVal(detail.progress.value)"
              ></md-progress>
            </div>
            <div
              class="md-progress-text"
            >{{$store.getters["globalfunc/formatNumberInt"](detail.progress.value)}}%</div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="right-box">
      <md-card>
        <md-card-content>
          <span class="price">฿</span>
          <span
            class="card-title"
            style="color: #ffffff"
          >{{$store.getters["globalfunc/formatNumber"](detail.button.value)}}</span>
          <div class="card-sub-title" style="color: #ffffff">{{detail.button.text}}</div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import dateFunc from "../fullCalendar/dateFunc";
import moment from "moment";
export default {
  create() {
    let month_id = dateFunc.format(new Date(), "MM");
  },
  props: {
    value: Object,
    detail: {
      type: Object,
      default: function() {
        let temp = {
          block1: {
            value: 0,
            text: "Sales Target"
          },
          block2: {
            value: 0,
            text: "Sales Achieved"
          },
          progress: {
            value: 0,
            text: "0"
          },
          button: {
            value: 0,
            text: "Incentive",
            mode: true
          }
        };
        return temp;
      }
    },
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
      years: dateFunc.format(new Date(), "yyyy")
    };
  },
  methods: {
    changeVal(val) {
      return parseFloat(val);
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
      this.hideCalendar();
    },
    hideCalendar: function() {
      this.showmonth = false;
    },
    renderProgressBar(percent) {
      if (isNaN(parseFloat(percent))) {
        return "";
      } else {
        if (parseFloat(percent) < 50) {
          return "red";
        } else if (
          parseFloat(percent) < this.max &&
          parseFloat(percent) >= 50
        ) {
          return "orange";
        } else if (parseFloat(percent) >= this.max) {
          return "green";
        }
      }
    }
  },
  components: {
    "month-calendar": require("./mds-month-calendarV2")
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
  height: 64px;
  width: 100%;
  .md-card {
    box-shadow: unset;
    border-radius: 4px;
    height: 100%;
  }
  .left-box {
    width: 24%;
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
    margin-left: 20px;
    margin-right: 20px;
    width: 59%;
    .md-card {
      border-radius: 4px;
      height: 100%;
      overflow: hidden;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      .md-card-content {
        padding: 12px 18px 7px 20px;
        .card-sub-title {
          color: #a8a8a8;
        }
        .progress-bar-box {
          padding-right: 2%;
          width: 40%;
          .md-progress {
            height: 14px;
            border-radius: 10px;
            margin-top: 5px;
            background: #efefef;
            margin-bottom: 20px;
            &.red {
              .md-progress-track {
                background: $color-red;
                border-radius: 10px;
              }
            }
            &.green {
              .md-progress-track {
                background: $color-green;
                border-radius: 10px;
              }
            }
            &.orange {
              .md-progress-track {
                background: $color-primary;
                border-radius: 10px;
              }
            }
          }
        }
        .md-progress-text {
          width: 10%;
          font-size: 12px;
          font-weight: bold;
          color: #bdbdbd;
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
  .right-box {
    width: 17%;
    // cursor: pointer;
    .md-card {
      background: #A8A8A8;
      .md-card-content {
        color: #ffffff;
        padding: 12px 18px 7px 20px;
        text-align: left;
        overflow-y: hidden;
      }
    }
  }
}
</style>

