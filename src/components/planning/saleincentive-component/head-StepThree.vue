<template>
  <div>

    <div class="md-layout" style="background-color:;width:100%;">
     

      <div style="width: 100%;text-align:right;">
      <md-button
        class="-orange"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
        @click="opendg('calculate')"
      >CALCULATE</md-button>
        <md-button
        class="-gray-A8"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
        @click="opendg('export')"
      >EXPORT ( XLS )</md-button>
      <md-button
        class="-gray-A8"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
        @click="opendg('save')"
      >save</md-button>
      <md-button
        class="-orange"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;line-height:30px"
        @click="opendg('submit')"
      >SUBMIT</md-button>
      </div>
    </div>
    
    <!-- <div style="width:90%;text-align:right;">
      <md-button
        class="-orange"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
        @click="opendg('calculate')"
      >CALCULATE</md-button>
      <md-button
        class="-gray-A8"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
        @click="opendg('save')"
      >save</md-button>
      <md-button
        class="-orange"
        style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;line-height:30px"
        @click="opendg('submit')"
      >SUBMIT</md-button>
    </div> -->
          <div
            style="width:200px;cursor:pointer;font-size:14;font-family:roboto;text-align:left;padding-top:15px;padding-bottom:15px"
            @click="showPreTime"
            v-if="flow.length > 1"
          >
            <b v-if="preTime">Hide ...</b>
            <b v-else>Previous Times ...</b>
          </div>
          <div v-if="preTime">
            <div
              style="width:100%;display:flex;margin-bottom:12px"
              v-for="(row , index) in flow"
              :key="'flow-detail'+index"
            >
              <div v-if="index >= 0 && preTime" style="width:100%;display: flex">
                <div :class="renderColour(row.work_flow_state)" style="height:15px;width:15px"></div>
                <div style="font-family:roboto;font-size:16px;padding-left:5px;color:#808080;">
                  {{row.message}}&nbsp;&nbsp;
                  <md-tooltip md-direction="top" v-if="row.work_flow_state != 'recall'">
                    <span
                      style="font-family:kanit"
                      v-if="row.work_flow_state == 'reject'||row.work_flow_state == 'pass'"
                    >{{row.sender_name}}</span>
                    <span style="font-family:kanit" v-else>{{row.receiver_name}}</span>
                  </md-tooltip>
                </div>
                <div style="font-family:roboto;font-size:16px;color:#808080;"></div>
                <div
                  style="font-family:lato;font-size:14px;color:#A8A8A8"
                >submitted on {{formatterDate(row.sender_time , 'date')}}&nbsp;at&nbsp;{{formatterDate(row.sender_time , 'time')}}</div>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
export default {
  name: "head-step-three",
  data() {
    return {
      preTime: false,
    };
  },
  computed: {
    flow() {
      return this.$store.getters["incentive/flow"];
    },
  },
  methods: {
    opendg(mode) {
      this.$emit("opendg", mode);
    },
    showPreTime() {
      this.preTime = !this.preTime;
    },
    renderColour(key) {
      return "step3-team " + key;
    },
    formatterDate(date, mode) {
      let checkFM = moment(date, [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss"
      ]).format();

      if (checkFM == "Invalid date") {
        return "";
      } else {
        if (mode == "time") {
          return moment(date).format("HH:mm");
        } else {
          return moment(date).format("MMMM DD, YYYY");
        }
      }
    }
  },
  created() {
    // console.log("STEP3 >>>");
  }
};
</script>
<style lang="scss" scoped>
.step3-team {
  &.pending {
    background: #a8a8a8;
  }
  &.recall {
    background: #fbc02d;
  }
  &.reject {
    background: #f44336;
  }
  &.pass {
    background: #66bb6a;
  }
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}
</style>
