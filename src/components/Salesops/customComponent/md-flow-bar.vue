<template>
  <md-layout class="md-flow-bar">
    <md-layout md-flex="15" md-align="start">
      <div class="title">ORDER STATUS</div>
    </md-layout>
    <md-layout md-flex="60" md-align="start" style="white-space: nowrap;display: -webkit-box;">
      <label class="title-status">{{showTitle()}}</label>&nbsp;
      <label class="title-name">{{showName()}}</label>&nbsp;
      <label class="time-txt">{{formattTime()}}</label>
    </md-layout>
    <md-layout md-flex="25" md-align="end">
      <div class="stepper-block" style="display: -webkit-box;">
        <div v-for="(row , index) in data.flow" :key="'flow' + index">
          <div :class="renderStep(row , index)" style="margin-left:8px">{{index + 1}}</div>
          <!-- v-if="index < data.flow.length - 1" -->
          <md-tooltip md-direction="left" class="mds-tooltips">{{renderTooltip(row , index)}}</md-tooltip>
        </div>
      </div>
    </md-layout>
  </md-layout>
</template>

<script>
import moment from "moment";
export default {
  create() {},
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    renderStep(value, index) {
      if (typeof this.data["approve"] != "undefined") {
        /*        if (index == this.data["flow"].length - 1) {
          if (value.apv_status == "REJ") {
            return "stepper "+value.status_show;
          } else {
            return "stepper orange";
          }
        } else { */
        return "stepper " + value.status_show;
        // }
      } else {
        return "";
      }
    },
    showName() {
      if (
        typeof this.data["approve"] != "undefined" 
      ) {
        let str = "";
        if (
          this.data["flow"][this.data["flow"].length - 1].apv_approver_id ==
          "999999"
        ) {
          return "Systems";
        } else {
          str =
            this.data["approve"].first_name_en +
            "  " +
            this.data["approve"].last_name_en;
          return str;
        }
      }
    },
    showTitle() {
      if (
        typeof this.data["flow"] != "undefined" &&
        this.data["flow"].length > 0
      ) {
        let order_status = this.data["flow"][this.data["flow"].length - 1]
          .apv_status;
        if (order_status == "WFA" || order_status == "FWD") {
          return "Pending Approval from";
        } else if (order_status == "REJ") {
          return "Rejected by";
        } else if (order_status == "REC") {
          return "Your Order has been recalled";
        } else if (order_status == "APV") {
          return "Approved by";
        } else if (order_status == "SAPV") {
          return "Auto Approved by";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    renderTooltip(row, key) {
      let status = row.apv_status;
      let date = row.apv_apvdate;
      let str = "";
      if (status == "WFA") {
        date = row.apv_sendate;
        str =
          "This Order has submitted on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_send_firstname +
          " " +
          row.apv_send_lastname;
      } else if (status == "DRF") {
        date = row.apv_sendate;
        str =
          "This Order has re-submitted on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_send_firstname +
          " " +
          row.apv_send_lastname;
      } else if (status == "REC") {
        str =
          "This order has recall on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_send_firstname +
          " " +
          row.apv_send_lastname;
      } else if (status == "APV") {
        str =
          "This order has approved on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_approver_firstname +
          " " +
          row.apv_approver_lastname;
      } else if (status == "SAPV") {
        str =
          "This order has approved on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by Systems";
      } else if (status == "REJ") {
        str =
          "This order has rejected on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_approver_firstname +
          " " +
          row.apv_approver_lastname;
      } else if (status == "FWD") {
        date = row.apv_sendate;
        str =
          "This order has sent to " +
          this.data.flow[key + 1].apv_approver_firstname +
          " " +
          this.data.flow[key + 1].apv_approver_lastname +
          " " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_approver_firstname +
          " " +
          row.apv_approver_lastname;
      } else if (status == "ADD") {
        date = row.apv_sendate;
        str =
          "This order has submitted on " +
          moment(date).format("MMMM DD, YYYY") +
          " at " +
          moment(date).format("H:mm:ss") +
          " by " +
          row.apv_send_firstname +
          " " +
          row.apv_send_lastname;
      }
      return str;
    },
    formattTime() {
      if (
        typeof this.data["flow"] != "undefined" &&
        this.data["flow"].length > 0
      ) {
        let date = this.data["flow"][this.data["flow"].length - 1].apv_apvdate;
        // Rejected by
        if (date != "" && date != null) {
          return (
            "submitted on " +
            moment(date).format("MMMM DD, YYYY") +
            " at " +
            moment(date).format("H:mm:ss")
          );
        } else {
          return "";
        }
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-lato: Lato;
$font-roboto: Roboto;
$font-kanit: Kanit;
.md-flow-bar {
  // border:0.1px solid #727272;
  width: 100%;
  height: 45px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.16);
  padding: 13px 18px 10px 18px;
  border-radius: 4px;
  display: flex;
  .title {
    color: #727272;
    font-size: 14px;
    font-family: $font-roboto;
  }
  .title-status {
    color: #414141;
    font-size: 14px;
    font-family: $font-roboto;
  }
  .title-name {
    color: #414141;
    font-size: 14px;
    font-family: $font-kanit;
    font-weight: bold;
  }
  .time-txt {
    color: #a8a8a8;
    font-size: 10px;
    white-space: nowrap;
    font-family: $font-roboto;
  }
  .stepper-block {
    font-family: $font-roboto;
    line-height: 13px;
    text-align: center;
    .stepper {
      color: #ffffff;
      height: 24px;
      width: 24px;
      border-radius: 25px;
      text-align: center;
      padding-top: 6px;
      font-size: 12px;
      &.gray {
        background: #efefef;
      }
      &.orange {
        background: #fd7f00;
      }
      &.red {
        background: #f44336;
      }
    }
  }
}
</style>
