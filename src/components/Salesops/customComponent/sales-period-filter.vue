<template>
  <div style="display : flex">
    <div class="sales-period-box">
      <md-card class="sales-period-view-box" @click.native="showmonth = true">
        <md-card-content>
          <div class="card-title">
            <span>{{month}} {{year}}</span>
          </div>
          <md-icon>expand_more</md-icon>
          <div class="card-sub-title">Sales Period</div>
        </md-card-content>
      </md-card>
      <month-calendar
        ref="selectCalendar"
        v-if="showmonth"
        v-on:selectmonth="selectMonth"
        v-click-outside="closeEvent"
      ></month-calendar>
    </div>
    <md-card class="sales-quota-box ml-15">
      <md-card-content>
        <div class="floating-box-big" style="min-height:unset;display: -webkit-box;">
          <div class="quota-box">
            <span class="price">฿</span>
            <span
              class="card-title"
            >{{$store.getters["globalfunc/formatNumberInt"](detail.block1.value)}}</span>
            <div class="card-sub-title">{{detail.block1.text}}</div>
          </div>
          <div class="achieved-box ml-10">
            <span class="price">฿</span>
            <span
              class="card-title"
            >{{$store.getters["globalfunc/checkPoint"](detail.block2.value)}}</span>
            <div class="card-sub-title">{{detail.block2.text}}</div>
          </div>
          <div class="progress-bar-box ml-10">
            <md-progress
              v-show="true"
              :class="renderProgressBar(detail.progress.value)"
              :md-progress="detail.progress.value"
              md-mode="determinate"
            ></md-progress>
          </div>
          <!-- <div class="progress-bar-value ml-5"> -->
          <div
            class="md-progress-text"
            style="font-size: 12px;font-weight: bold;color: #bdbdbd;padding-left:15px"
          >{{$store.getters["globalfunc/checkPoint"](detail.progress.value)}}%</div>
          <!-- </div> -->
        </div>
      </md-card-content>
    </md-card>
    <md-card class="incentive-box ml-15" style="width:140px">
      <md-card-content>
        <span class="price">฿</span>
        <span class="card-title">{{detail.button.value}}</span>
        <div class="card-sub-title">{{detail.button.text}}</div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import dateFunc from "../fullCalendar/dateFunc";
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
    }
  },
  // props: ["value", "detail"],
  data() {
    return {
      showmonth: false,
      month: dateFunc.format(new Date(), "MMMM"),
      year: dateFunc.format(new Date(), "yyyy")
    };
  },
  methods: {
    selectMonth(value) {
      this.month = value.month.value;
      this.year = value.year;
      this.$emit("selectmonth", {
        month_id: value.month.id,
        month: value.month.value,
        year: value.year
      });
      this.hideCalendar();
    },
    hideCalendar: function() {
      this.showmonth = false;
    },
    closeEvent: function() {
      this.hideCalendar();
    },
    checkPoint(value) {
      let str = value.toString().split(".");
      if (str.length == 1) {
        return this.$store.getters["globalfunc/formatNumberInt"](value);
      } else {
        let sunStr = str[1].length;
        if (sunStr == 2 && str[1] == "00") {
          return this.$store.getters["globalfunc/formatNumberInt"](value);
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) == "0"
        ) {
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) != "0"
        ) {
          return this.$store.getters["globalfunc/formatNumber"](value);
        } else if (sunStr > 2) {
          let statIntVal = this.$store.getters["globalfunc/formatNumberInt"](
            value
          );
          let statVal = this.$store.getters["globalfunc/formatNumber"](value)
            .toString()
            .split(".");
          return this.$store.getters["globalfunc/formatNumber"](value);
        } else {
          return this.$store.getters["globalfunc/formatNumber"](value);
        }
      }
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
    }
  },
  components: {
    "month-calendar": require("../../planning/subTemplate/month-calendar")
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
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
$color-primary: #fd7f00;
$color-green: #66bb6a;
$color-red: #f44336;
$color-light-gray: #efefef;
$font-roboto: Roboto;
$font-lato: Lato;
$font-kanit: Kanit;
</style>

