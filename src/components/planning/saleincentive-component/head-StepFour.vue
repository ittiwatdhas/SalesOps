<template>
  <div id="sales-incen-stapfour" style="width: 100%;">
    <!-- HEAD OF STEP 4 ......... -->
    <md-layout md-gutter>
      <md-layout md-flex="75">
        <!-- RECALL -->
        <div style="width:100%;" v-if="permission">
          <div style="width:100%;display:flex;padding-top:3px;" v-if="flow.length > 0">
            <div style="width:100%;display: contents;">
              <div>{{setWorkFlowState(flow[0].work_flow_state)}}</div>
              <div :class="renderColour(flow[0].work_flow_state)" style="height:15px;width:15px"></div>
              <div style="font-family:roboto;font-size:16px;padding-left:5px;">
                <b>{{flow[0].message}}&nbsp;&nbsp;</b>
                <md-tooltip md-direction="top">
                  <span
                    style="font-family:kanit"
                    v-if="flow[0].work_flow_state == 'reject'||flow[0].work_flow_state == 'pass'"
                  >{{flow[0].sender_name}}</span>
                  <span
                    style="font-family:kanit"
                    v-else-if="flow[0].work_flow_state != 'recall'"
                  >{{flow[0].receiver_name}}</span>
                </md-tooltip>
              </div>
              <div style="font-family:roboto;font-size:16px;"></div>
              <div style="font-family:lato;font-size:14px;color:#A8A8A8">
                <b>submitted on {{formatterDate(flow[0].sender_time , 'date')}}&nbsp;at&nbsp;{{formatterDate(flow[0].sender_time , 'time')}}</b>
              </div>
            </div>
            <!-- receiver_name -->
          </div>
      
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
              <div v-if="index > 0 && preTime" style="width:100%;display: flex">
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
        <!-- APPROVED -->
        <div style="width:100%;display:flex" v-else>
          <div style="width:40%;text-align:left;" id="select-sales">
            <md-input-container>
              <label for="status" style="font-family:kanit">เลือกรายการ</label>
              <md-select name="movie" id="movie" v-model="statusIndex">
                <md-option
                  v-for="(item, index) in flow"
                  :key="index"
                  :value="item.document_id"
                  @selected="selectSender(item)"
                >
                  <template>
                    <div style="display:-webkit-box;width:100%;padding-top:5px">
                      <div
                        v-if="login() == item.receiver && item.work_flow_state == 'pending'"
                        style="display:inline-block;background-color:#FD7F00;width:26px;height:26px;
                            border-radius: 4px;"
                      ></div>
                      <div
                        v-else
                        style="display:inline-block;background-color:#EFEFEF;width:26px;height:26px;
                            border-radius: 4px;"
                      ></div>
                      <div
                        :style="{'width':'320px',
                            'line-height': '1.4',
                            'white-space': 'initial',
                            'padding-top': '3px',
                            'padding-left': '20px',
                            'font-family': 'kanit',
                            'text-overflow': 'ellipsis',
                            'display': 'block',
                            'color':statusIndex == item.creator ? '#fd7f00' : 'black',
                            'padding-right': '5px',
                            'display': 'flex',
                            'overflow': 'hidden'}"
                      >
                     
                        <div style="width:75%">{{item.creator_name}} [{{item.fiscal_year}}, {{item.fiscal_cycle}}]</div>
                        <div style="width:25%;text-align:end;padding-right:10px">{{item.creator}}</div>
                      </div>
                      <div style="width:15px;padding-top:3px;">
                        <div :class="renderColour(item.work_flow_state)" style="height:15px"></div>
                      </div>
                    </div>
                  </template>
                </md-option>
              </md-select>
            </md-input-container>
          </div>
          <div
            style="font-family:lato;width:60%;padding-top:20px;text-align:left;padding-left:30px;display:flex"
            v-if="flow.length > 0 && showBtn != ''"
          >
            <div
              style="font-size:14px;color:#A8A8A8;;width:33%"
            >( {{count_flow}} more pending approval)</div>
            <div style="font-size:18px;padding-left:10%;color:#0000007F;display:flex;width:67%">
              <div :class="renderColour(keepSales.work_flow_state)" style="height:15px;width:15px"></div>
              <div style="padding-left:10px">{{keepSales.message}}</div>
            </div>
          </div>
        </div>
      </md-layout>
      <md-layout md-flex="25" md-align="end">
        <div v-if="permission">
          <div style="width:100%;text-align:right;" v-if="work_flow_state == 'pending'">
            <!-- <md-button
               v-if="department === 'MNG'"
              @click="opendg('export')"
              class=""
              style="color:#fff;background-color:#fd7f00;height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >EXPORT ( XLS )</md-button> -->
            <md-button
              @click="opendg('recall')"
              class="-gray-A8"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >RECALL</md-button>
          </div>
          <div style="width:100%;text-align:right;" v-else-if="work_flow_state == 'recall'">
             <!-- <md-button
               v-if="department === 'MNG'"
              @click="opendg('export')"
              class=""
              style="color:#fff;background-color:#fd7f00;height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >EXPORT ( XLS )</md-button> -->
            <md-button
              @click="opendg('savedraft-step4')"
              class="-gray-A8"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >save draft</md-button>
            <md-button
              @click="opendg('submit-step4')"
              class="-orange"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;line-height:30px"
            >SUBMIT</md-button>
          </div>
          <div style="width:100%;text-align:right;" v-else-if="work_flow_state == 'reject'">
             <!-- <md-button
               v-if="department === 'MNG'"
              @click="opendg('export')"
              class=""
              style="color:#fff;background-color:#fd7f00;height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >EXPORT ( XLS )</md-button> -->
            <md-button
              @click="opendg('edit')"
              class="-gray-A8"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >edit</md-button>
            <md-button
              @click="opendg('submit-step4')"
              class="-orange"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;line-height:30px"
            >SUBMIT</md-button>
          </div>
        </div>
        <div v-else style="padding-top:10px" id="step4-flow-block">
          <div v-if="showBtn == 'pending' ">
             <!-- <md-button
               v-if="department === 'MNG'"
              @click="opendg('export')"
              class=""
              style="color:#fff;background-color:#fd7f00;height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            >EXPORT ( XLS )</md-button> -->
            <md-button
              class="-gray-A8"
              style="color:#FFFFFF;height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;
            line-height:30px"
              @click="opendg('reject')"
            >REJECT</md-button>
            <md-button
              class="-orange"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;line-height:30px"
              @click="opendg('sendto')"
            >SUBMIT</md-button>
          </div>
          <div v-if="showBtn == 'approve' ">
            <md-button
              class="-gray-A8"
              style="color:#FFFFFF;height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;
            line-height:30px"
              @click="opendg('reject')"
            >REJECT</md-button>
            <md-button
              class="-orange"
              style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;line-height:30px"
              @click="opendg('approve')"
            >APPROVE</md-button>
          </div>
        </div>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import service from "@/services/planning/incentive";
var newdate = new Date();
var dd = newdate.getDate();
var mm = newdate.getMonth();
var y = newdate.getFullYear();

export default {
  name: "step-three",
  components: {},
  data() {
    return {
      statusIndex: "",
      showRecall: true,
      preTime: false,
      showReject: false,
      showApproval: false,
      showRecall: false,
      styleObj: {
        backgroundColor: "#A8A8A8",
        fontSize: "9px",
        color: "white"
      },
      keepSales: "",
      work_flow_state: "",
      showBtn: "",
      department:''
    };
  },
  methods: {
    login() {
      return Vue.localStorage.get("emp_id");
    },
    showPreTime() {
      this.preTime = !this.preTime;
    },
    setWorkFlowState(val) {
      this.work_flow_state = val;
    },
    opendg(mode) {
      if(mode === 'export'){
      var rs = {
        login:Vue.localStorage.get("emp_id"),
        year:this.data_from_export.year,
        cycle:this.data_from_export.cycle,
        teams:'all',
        url:Vue.config["urlReport"] + "/payment-export-excel",
        page:'incentive'
      }
      this.$store.dispatch('incentive/exportData' , rs)
      }else {
         this.$emit("opendg", mode, this.keepSales);
      }
     
    },
    renderColour(key) {
      return "step4-team " + key;
    },
    test(){
      this.keepSales = this.$store.getters["incentive/flow"][0]
    },
    selectSender(row) {
      this.keepSales = row;
      if (Vue.localStorage.get("emp_id") == row.receiver) {
        let checkRole = row["approve_ln"].split(",");
        if (row.work_flow_state == "pending") {
          if (
            checkRole[checkRole.length - 1] == Vue.localStorage.get("emp_id")
          ) {
            this.showBtn = "approve";
          } else {
            this.showBtn = row.work_flow_state;
          }
        } else {
          this.showBtn = row.work_flow_state;
        }
      } else {
        this.showBtn = "NOBTN";
      }
      var block = document.getElementById("step4-flow-block");
      if (!_.isNull(block)) {
        block.style.visibility = "visible";
      }
      // showBtn
      this.$emit("sender", row);
      
    },
    selectCreator() {
      if(this.statusIndex == ""){
        let data_flow = this.flow
        if(data_flow.length > 0){
          // this.statusIndex = data_flow[0]['creator']
          this.statusIndex = data_flow[0]['document_id']
          this.selectSender(data_flow[0])
        }
      }

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
  computed: {
    data_from_export(){
      return this.$store.getters["incentive/data_from_export"];
    },
    flow() {
      this.test()
      return this.$store.getters["incentive/flow"];
    },
    permission() {
      let permission = this.$store.getters["incentive/permission"]
      if(!permission){
        this.selectCreator();
      }
      return this.$store.getters["incentive/permission"];
    },
    count_flow() {
      return this.$store.getters["incentive/countFlow"];
    },
  },
  created() {
    this.department =  Vue.localStorage.get('department')
  }
};
</script>
<style lang="scss" scoped>
.step4-team {
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
