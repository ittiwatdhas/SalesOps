<template>
  <div class="pageActivityManagement" id="pageActivityManagement">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <div style="display: flex; width: 100%; padding-top: 30px">
        <div
          id="pageNameClick"
          style="
            width: 30%;
            padding-top: 15px;
            padding-left: 20px;
            color: #797979;
            font-size: 18px;
            font-weight: 600;
            text-align: left;
          "
        >
          {{ pageName }}
        </div>
        <div style="width: 70%; padding-left: 20px">
          <div style="display: -webkit-box; width: 95%">
            <sales-period-block
              :displayRange="true"
              style="width: 100%"
              @selectmonth="selectMonth"
              @selectyear="selectYear"
              :year="$store.getters['activitymanage/selected_date'].year"
              :month="$store.getters['activitymanage/selected_date'].month"
              :range="$store.getters['activitymanage/selected_date'].range"
              :detail="[]"
              @searchActivity="searchActivity"
            ></sales-period-block>
          </div>
        </div>
      </div>
      <div style="display: flex; width: 100%; padding-top: 20px">
        <div style="width: 30%; padding-left: 20px">
          <md-card class="left-filter">
            <div class="title">Activity Details</div>
          </md-card>
          <md-card class="left-filter2" id="pageActivityManagementDG">
            <div style="width: 100%">
              <md-auto-search-box
                :placeholder="'Salesman'"
                :data="listDataSMDetail"
                :value="smTitle"
                @filter="filterSM"
                @choose="chooseSM"
                :disabled="disabledSM"
              ></md-auto-search-box>
            </div>
            <small
              style="color: red; text-align: left"
              v-if="!this.validation_Salesman"
              >Please input data</small
            >

            <div style="width: 100%; margin-top: 8px">
              <md-auto-search-box
                :placeholder="'Customer'"
                :data="listDataCustDetail"
                :value="custTitle"
                @filter="filterCust"
                @choose="chooseCust"
                :disabled="disabledCust"
              ></md-auto-search-box>
            </div>
            <small
              style="color: red; text-align: left"
              v-if="!this.validation_Customer"
              >Please input data</small
            >

            <div
              :style="{
                'padding-top': '15px',
                color: disabledDateCheckIn ? '#727272' : '#FD7F00',
                width: '100%',
                'text-align': 'left',
                'font-size': '11px',
              }"
            >
              Check-in :
            </div>
            <div style="width: 100%; display: flex; margin-top: 5px">
              <div style="margin-right: 5px; padding-top: 4px; width: 10%">
                <input
                  type="checkbox"
                  style="height: 20px; width: 20px"
                  v-model="check_in"
                  :disabled="disabledChkCheckOut"
                  @change="setCheckInOut('in')"
                />
              </div>
              <div style="box-shadow: 0 0 3px rgba(0, 0, 0, 0.16); width: 90%">
                <div style="width: 100%; display: flex">
                  <div
                    :style="{
                      width: '70%',
                      cursor: disabledDateCheckIn ? 'default' : 'pointer',
                    }"
                    id="iptCheckIn"
                  >
                    <md-input-container
                      :style="{
                        background: disabledDateCheckIn ? '#d1d1d166' : 'white',
                      }"
                    >
                      <md-input
                        v-model="checkin_time"
                        :disabled="disabledDateCheckIn"
                        v-show="false"
                      ></md-input>
                      <datepicker
                        id="iptCheckIn-btn"
                        :disabled="disabledDateCheckIn"
                        :value="checkin_time"
                        @selected="selectedDelDateIn"
                        :format="customFormatter"
                        :disabledDates="disabledDatesDel"
                      ></datepicker>
                    </md-input-container>
                  </div>
                  <div style="width: 15%" @click="showDatepicker('in')">
                    <div
                      class="icon-time calender"
                      :style="{
                        background: disabledDateCheckIn ? '#D1D1D166' : 'white',
                        cursor: disabledDateCheckIn ? 'default' : 'pointer',
                        'border-right': ' 1px solid rgba(0, 0, 0, 0.16)',
                      }"
                    >
                      <md-icon>event</md-icon>
                    </div>
                  </div>
                  <div style="width: 15%" @click="openTime('in')">
                    <div
                      v-if="detected_device != 'mobile'"
                      class="icon-time calender"
                      :style="{
                        background: disabledDateCheckIn ? '#fff' : 'white',
                        cursor: disabledDateCheckIn ? 'default' : 'pointer',
                        'border-top-right-radius': '3px',
                        'border-bottom-right-radius': '3px',
                      }"
                    >
                      <md-icon>schedule</md-icon>
                    </div>
                    <div
                      v-else
                      @mouseout="out_focus('in')"
                      class="icon-time calender"
                      :style="{
                        background: disabledDateCheckIn ? '#fff' : 'white',
                        cursor: disabledDateCheckIn ? 'default' : 'pointer',
                        'border-top-right-radius': '3px',
                        'border-bottom-right-radius': '3px',
                      }"
                    >
                      <md-icon>schedule</md-icon>
                    </div>
                     <div @mouseleave="mouseLeaveIn">
                      <md-card class="time-picker in" v-if="popupIn">
                        <div style="width: 100%" class="rows">
                          <div
                            v-for="(row, index) in hourList"
                            @click="selectedTime(row, 'in')"
                            :key="'days' + index"
                            class="sub-rows"
                          >
                            {{ formatTime(row) }}
                          </div>
                        </div>
                      </md-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              :style="{
                'padding-top': '12px',
                color: disabledDateCheckOut ? '#727272' : '#FD7F00',
                width: '100%',
                'text-align': 'left',
                'font-size': '11px',
              }"
            >
              Check-out :
            </div>
            <div style="width: 100%; display: flex; margin-top: 5px">
              <div style="margin-right: 5px; padding-top: 4px; width: 10%">
                <input
                  type="checkbox"
                  style="height: 20px; width: 20px"
                  v-model="check_out"
                  :disabled="disabledChkCheckIn"
                  @change="setCheckInOut('out')"
                />
              </div>
              <div style="box-shadow: 0 0 3px rgba(0, 0, 0, 0.16); width: 100%">
                <div style="width: 100%; display: flex">
                  <div
                    :style="{
                      width: '70%',
                    }"
                    id="iptCheckOut"
                  >
                    <md-input-container
                      :style="{
                        background: disabledDateCheckOut
                          ? '#D1D1D166'
                          : 'white',
                      }"
                    >
                      <md-input
                        v-model="checkout_time"
                        :disabled="disabledDateCheckOut"
                        v-show="false"
                      ></md-input>
                      <datepicker
                        id="iptCheckOut-btn"
                        :disabled="disabledDateCheckOut"
                        :value="checkout_time"
                        @selected="selectedDelDateOut"
                        :format="customFormatter"
                        :disabledDates="disabledDatesDel"
                      >
                      </datepicker>
                    </md-input-container>
                  </div>
                  <div style="width: 15%" @click="showDatepicker('out')">
                    <div
                      class="icon-time calender"
                      :style="{
                        background: disabledDateCheckOut
                          ? '#D1D1D166'
                          : 'white',
                        cursor: disabledDateCheckOut ? 'default' : 'pointer',
                        'border-right': ' 1px solid rgba(0, 0, 0, 0.16)',
                      }"
                    >
                      <md-icon>event</md-icon>
                    </div>
                  </div>
                  <div style="width: 15%" @click="openTime('out')">
                    <div
                      v-if="detected_device != 'mobile'"
                      class="icon-time calender"
                      :style="{
                        background: disabledDateCheckOut
                          ? '#D1D1D166'
                          : 'white',
                        cursor: disabledDateCheckOut ? 'default' : 'pointer',
                        'border-top-right-radius': '3px',
                        'border-bottom-right-radius': '3px',
                      }"
                    >
                      <md-icon>schedule</md-icon>
                    </div>

                     <div
                      v-else
                      @mouseout="out_focus('out')"
                      class="icon-time calender"
                      :style="{
                        background: disabledDateCheckOut
                          ? '#D1D1D166'
                          : 'white',
                        cursor: disabledDateCheckOut ? 'default' : 'pointer',
                        'border-top-right-radius': '3px',
                        'border-bottom-right-radius': '3px',
                      }"
                    >
                      <md-icon>schedule</md-icon>
                    </div>


                    
                    <div @mouseleave="mouseLeaveOut">
                      <md-card class="time-picker out" v-if="popupOut">
                        <div style="width: 100%" class="rows">
                          <div
                            v-for="(row, index) in hourList"
                            @click="selectedTime(row, 'out')"
                            :key="'days' + index"
                            class="sub-rows"
                          >
                            {{ formatTime(row) }}
                          </div>
                        </div>
                      </md-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <small
              style="color: red; text-align: left"
              v-if="!this.validation_in_out"
              >Please input checkin or checkout</small
            >
            <small
              style="color: red; text-align: left"
              v-if="!this.validation_checkTime_in_out"
              >Check-in time is greater than check-out time</small
            >
            <div style="height: 50px; idth: 100%">
              <md-input-container
                style="backgroung-color: blue"
                id="note-input"
              >
                <label>Note</label>
                <md-input
                  maxlength="100"
                  v-on:change="Note_message(note)"
                  v-model="note"
                >
                </md-input> </md-input-container
              ><br />
            </div>
            <small
              style="color: red; text-align: left"
              v-if="!this.validation_Note"
              >Please input data</small
            >

            <div class="md-dialog-actions" style="width: 100%">
              <md-button class="md-raised md-button-cancel" @click="cancelData">
                <label>CANCEL</label>
              </md-button>
              <md-button
                v-if="even == 'edit'"
                class="md-raised md-button-cancel"
                @click="deleteData"
              >
                <label>DELETE</label>
              </md-button>
              <md-button class="md-raised md-button-save" @click="saveData">
                <label>SAVE</label>
              </md-button>
            </div>
          </md-card>
        </div>

        <div style="width: 70%; padding-left: 20px; padding-right: 50px">
          <md-card
            class="sales-area-table"
            style="
              width: 100%;
              padding-bottom: 4px;
              padding-left: 0px;
              padding-right: 0px;
              padding-top: 8px;
              z-index: unset;
            "
          >
            <div
              :class="'head-table'"
              id="moreClick"
              style="
                margin-top: 10px;
                padding-bottom: 10px;
                padding-right: 10px;
                padding-left: 30px;
              "
            >
              <div class="text-left" style="width: 44%">Customer</div>
              <div class="text-left" style="width: 12%">Visit Date</div>
              <div class="text-left" style="width: 10%">Visit Time</div>
              <div class="text-center" style="width: 8%">Activity</div>
              <div class="text-left" style="width: 26%; padding-left: 10px">
                Salesman
              </div>
            </div>
            <div
              style="height: 2px; background: #f7f7f7; margin-bottom: 10px"
            ></div>
            <div
              v-if="datasList.length == 0"
              style="
                padding-top: 10%;
                font-size: 15px;
                color: #a8a8a8;
                height: 454px;
              "
            >
              <div
                style="
                  justifycontent: 'center';
                  margin-bottom: 50px;
                  margin-right: 150px;
                "
              >
                <md-spinner
                  :md-size="150"
                  :md-stroke="1"
                  v-show="spinner"
                  md-indeterminate
                ></md-spinner>
              </div>
              No data...
            </div>
            <div
              v-if="datasList.length > 0"
              class="detail-blog"
              @scroll="scrollPage"
              :style="{
                height: 'calc(100vh - 235px)',
                'padding-left': '0px',
                width: '100%',
                'overflow-y': 'scroll',
              }"
            >
              <div
                v-for="items in datasList"
                :key="items.h_id"
                class="content-table"
                @click="choose(items)"
                style="
                    cursor:pointer;
                    font-family:roboto;
                    padding-top:4px
                    padding-right:10px;
                    padding-left:30px"
              >
                <div
                  class="descript pt-2"
                  style="
                    width: 44%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-right: 5px;
                    color: #727272;
                  "
                >
                  <span style="font-family: lato">{{
                    items.customer_code
                  }}</span>
                  <span
                    style="
                      font-family: kanit;
                      margin-left: 5px;
                      font-size: 14px;
                    "
                    >{{ items.customer_name_th }}</span
                  >
                  <md-tooltip md-direction="top">
                    <span style="font-family: kanit"
                      >{{ items.customer_code }}&nbsp;{{
                        items.customer_name_th
                      }}</span
                    >
                  </md-tooltip>
                </div>
                <div class="number pt-2" style="width: 12%; color: #727272">
                  {{ formatDate(items.visit_date) }}
                </div>
                <div class="number pt-2" style="width: 10%; color: #727272">
                  {{ formatTime(items.visit_time) }}
                </div>
                <div
                  class="number pt-2"
                  style="width: 8%; color: #727272; text-align: center"
                >
                  {{ items.activity }}
                </div>
                <div
                  class="descript pt-2"
                  style="
                    padding-left: 10px;
                    width: 26%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-right: 15px;
                    color: #727272;
                  "
                >
                  <span style="font-family: lato">{{ items.sm_code }}</span>
                  <span
                    style="
                      font-family: kanit;
                      margin-left: 5px;
                      font-size: 14px;
                    "
                    >{{ items.salesman }}</span
                  >
                  <md-tooltip md-direction="top">
                    <span style="font-family: kanit"
                      >{{ items.sm_code }}&nbsp;{{ items.salesman }}</span
                    >
                  </md-tooltip>
                </div>
              </div>
            </div>
          </md-card>
        </div>
        <md-snackbar
          :md-position="vertical + ' ' + horizontal"
          ref="snackbar"
          :md-duration="duration"
        >
          <span style="font-size: 16px; font-family: kanit">{{
            snackbarMsg
          }}</span>
          <md-button
            class="md-accent"
            @click="$refs.snackbar.close()"
            style="color: white"
            >OK</md-button
          >
        </md-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
var newdate = new Date();
var dd = newdate.getDate();
var mm = newdate.getMonth();
var y = newdate.getFullYear();
var today = moment(newdate).format("YYYY-MM-DD HH:mm:ss");
var today_date = moment(newdate).format("YYYY-MM-DD");
export default {
  name: "Activity-management",
  props: {},
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
  },
  data() {
    return {
      pageName: "ACTIVITY MANAGEMENT",
      calDatetime: "",
      detected_device:Vue.localStorage.get('DETECTED_DEVICE'),
      smCode: "",
      smTitle: "",
      disabledSM: false,
      disabledCust: false,
      custCode: "",
      custTitle: "",
      note: "",
      check_in: true,
      check_out: true,
      checkin_time: moment(today).format("YYYY-MM-DD") + "" + " 08:00",
      checkout_time: moment(today).format("YYYY-MM-DD") + "" + " 08:00",
      disabledChkCheckOut: false,
      disabledChkCheckIn: false,
      disabledDateCheckOut: false,
      disabledDateCheckIn: false,
      disabledDatesDel: {
        // to: new Date(y, mm, dd + 1),
        // from: null
      },
      popupIn: false,
      popupOut: false,
      hourList: [],
      minuteList: [],
      dataDetail: [],
      dataCreate: [],
      even: "",
      snackbarMsg: "",
      vertical: "top",
      horizontal: "center",
      duration: 4000,
      validation_Customer: true,
      validation_Salesman: true,
      validation_Note: true,
      validation_in_out: true,
      validation_checkTime_in_out: true,
      key_sales:0,
      key_param_sm:""
    };
  },
  methods: {
    Note_message(val) {
      this.validation_Note = true;
      if (val.length == 0 && val.length == "") {
        this.validation_Note = false;
      }
    },
    out_focus(param){
      if(param == 'in'){
        setTimeout
        setTimeout(() => {
         this.popupIn = false
        }, 150);
        // this.popupIn = false
      }else {
         setTimeout(() => {
         this.popupOut = false
        }, 150);
      }
    },
    showDatepicker(mode) {

      
      // var x = document.getElementsByClassName('vdp-datepicker')
      // if (mode == 'in') {
      //   document.getElementById('iptCheckIn-btn').click()
      //   if (x[1].childNodes[2].style.display != 'none') {
      //     x[1].childNodes[2].style.display = 'none'
      //   }
      // } else {
      //   document.getElementById('iptCheckOut-btn').click()
      //   if (x[0].childNodes[2].style.display != 'none') {
      //     x[0].childNodes[2].style.display = 'none'
      //   }
      // }
    },
    openTime(mode) {
      if (mode == "in") {
        this.popupIn = this.disabledDateCheckIn ? false : !this.popupIn;
      } else {
        this.popupOut = this.disabledDateCheckOut ? false : !this.popupOut;
      }
    },

    selectedTime(val, mode) {
      let t = moment(val).format("HH:mm:ss");
      if (mode == "in") {
        let d = moment(this.checkin_time).format("YYYY-MM-DD");
        this.checkin_time = d + " " + t;
      } else {
        let d = moment(this.checkout_time).format("YYYY-MM-DD");
        this.checkout_time = d + " " + t;
      }
    },

    mouseLeaveOut: function () {
      if (this.popupOut == true) {
        this.popupOut = false;
      }
    },
    mouseLeaveIn: function () {
      if (this.popupIn == true) {
        this.popupIn = false;
      }
    },
    selectMonth(value) {
      let date = this.$store.getters["activitymanage/selected_date"];
      if (value.mode == "period") {
        date.month = value.month;
        date.year = value.year;
        date.range = "-";
      } else {
        date.month = "";
        date.year = "";
        date.range = value.range;
      }
      this.$store.dispatch("activitymanage/getList");
    },
    selectYear(value) {
      let date = this.$store.getters["activitymanage/selected_date"];
      date.year = value.year;
    },
    searchActivity(value) {
      this.$store.commit("activitymanage/setFilterSearch", value);
      this.$store.dispatch("activitymanage/getList");
    },
    renderStatus(value) {},
    scrollPage(val) {},

    choose(val) {
      this.validation_Salesman = true;
      this.validation_Customer = true;
      this.validation_Note = true;
      this.validation_in_out = true;
      this.validation_checkTime_in_out = true;

      this.even = "edit";
      this.dataDetail = val;
      this.smCode = val.sm_code;
      this.smTitle = val.sm_code + " : " + val.salesman;
      this.custCode = val.customer_code;
      this.custTitle = val.customer_code + " : " + val.customer_name_th;
      this.check_in = val.checkin_status;
      this.check_out = val.checkout_status;
      this.checkout_time = val.checkout_time;
      this.checkin_time = val.checkin_time;
      this.disabledDateCheckIn = val.checkin_time == "" ? true : false;
      this.disabledDateCheckOut = val.checkout_time == "" ? true : false;
      this.disabledChkCheckIn = true;
      this.disabledChkCheckOut = true;
      this.disabledSM = true;
      this.disabledCust = true;
      this.note = val.note;
    },
    formatTime(value) {
      return moment(new Date(value)).format("HH:mm");
    },
    formatDate(value) {
      return moment(new Date(value)).format("DD-MM-YYYY");
    },

    saveData() {
      
      if (
        this.disabledDateCheckIn == false &&
        this.disabledDateCheckOut == false
      ) {
        if (this.checkin_time > this.checkout_time) {
          this.validation_checkTime_in_out = false;
        }
        if (this.checkin_time <= this.checkout_time) {
          this.validation_checkTime_in_out = true;
        }
      } else {
        this.validation_checkTime_in_out = true;
      }

      this.$store.getters["activitymanage/listDataSMDetail"];

      let datas = {
        type: "save",
      };

      if (this.even == "") {
        if (this.smCode == "") {
          this.validation_Salesman = false;
        }
        if (!this.custCode) {
          this.validation_Customer = false;
        }
        if (this.check_in === false && this.check_out === false) {
          this.validation_in_out = false;
        }
        if (this.note == "") {
          this.validation_Note = false;
        }
        if (
          this.smCode != "" &&
          this.custCode != "" &&
          this.note != "" &&
          this.validation_checkTime_in_out == true
        ) {
          let data_c = {
            activity: "",
            check_id: "",
            checkin_status: this.check_in,
            checkin_time: this.checkin_time,
            checkout_status: this.check_out,
            checkout_time: this.checkout_time,
            cust_id: this.custid,
            customer_code: this.custCode,
            customer_name_th: this.title,
            note: this.note,
            salesman: this.name_salesman,
            sm_code: this.smCode,
            visit_date: today_date,
            visit_head_id: "",
            visit_status: "a",
            visit_time: today,
          };

          if (this.check_in === true && this.check_out === true) {
            data_c.activity = "all";
          } else if (this.check_in === true && this.check_out === false) {
            data_c.activity = "in";
          } else if (this.check_in === false && this.check_out === true) {
            data_c.activity = "out";
          }

          datas.data_detail = data_c;

          this.$store.dispatch("activitymanage/saveActivityDetail", datas);
          this.cancelData();

        }
      } else {

        this.dataDetail.checkin_time = this.checkin_time;
        this.dataDetail.checkout_time = this.checkout_time;
        this.dataDetail.note = this.note

        datas.data_detail = this.dataDetail;
        this.$store.dispatch("activitymanage/saveActivityDetail", datas);
        // location.reload();
        this.cancelData();
        // this.$store.dispatch("activitymanage/getList");
      }
    },
    deleteData() {
      let data = {
        type: "delete",
        data_detail: this.dataDetail,
      };

      this.$store.dispatch("activitymanage/saveActivityDetail", data);
      // location.reload();
      this.cancelData();
    },
    cancelData() {
      this.even = "";
      this.smCode = "";
      this.smTitle = "";
      this.custid = "";
      this.custCode = "";
      this.custTitle = "";
      this.check_in = true;
      this.check_out = true;
      this.checkout_time = moment(today).format("YYYY-MM-DD") + "" + " 08:00";
      this.checkin_time = moment(today).format("YYYY-MM-DD") + "" + " 08:00";
      this.disabledChkCheckIn = false;
      this.disabledChkCheckOut = false;
      this.disabledDateCheckIn = false;
      this.disabledDateCheckOut = false;
      this.disabledSM = false;
      this.disabledCust = false;
      this.note = "";
    },

    filterSM: function (param) {
      if(this.key_sales == 0){ 
        this.key_sales++
        if (param.length > 0) {
          // this.smCode = param;
          this.$store.dispatch("activitymanage/filterSalemanAdd", param);
          this.validation_Salesman = true;
        } 
      }else{
        if ((param.length == 0 && this.key_param_sm.length == 0) || (param.length == 0 && this.custCode != '') ) {

            this.smCode = "";
            this.smTitle = ""
            this.custCode ='';
            this.custTitle="";
            this.key_sales = 0
        }else if (param.length > 0) {
          // this.smCode = param;
          this.$store.dispatch("activitymanage/filterSalemanAdd", param);
          this.validation_Salesman = true;
        }
      }
      this.key_param_sm = param

    },
    chooseSM: function (item) {
      this.smCode = item.code;
      this.name_salesman = item.title;
      this.smTitle = item.code + " : " + item.title;
    },

    filterCust: function (param) {
      if (param.length > 0) {
        this.validation_Customer = true;
        this.custCode = param;
        this.$store.dispatch("activitymanage/filterCustomerAdd", {
          salesman: this.smCode,
          keyword: param,
        });
      } else if (param.length == 0) {
        this.custCode = "";
     
      }
    },
    chooseCust: function (item) {
      this.custid = item.customer_id;
      this.custCode = item.code;
      this.title = item.title;
      this.custTitle = item.code + " : " + item.title;
    },
    setCheckInOut(mode) {
      if (mode == "in") {
        this.disabledDateCheckIn = !this.check_in;
        this.validation_in_out = true;
        this.validation_checkTime_in_out = true;
      } else {
        this.disabledDateCheckOut = !this.check_out;
        this.validation_in_out = true;
        this.validation_checkTime_in_out = true;
      }
    },
    selectedDelDateIn(value) {
      //  moment(this.checkout_time).format("YYYY-MM-DD HH:mm");
      this.checkin_time = moment(value).format("YYYY-MM-DD HH:mm");
       this.checkout_time = this.checkin_time ;

    },
    selectedDelDateOut(value) {
      this.checkout_time = moment(value).format("YYYY-MM-DD HH:mm");
      this.checkin_time= this.checkout_time  ;
    },
    customFormatter(date) {
      return moment(date).format("DD-MM-YYYY HH:mm ");
    },
    fetchData() {
      this.hourList = [];
      for (let i = 8; i < 24; i++) {
        let hours = i < 10 ? "0" + i : i;
        for (let m = 0; m < 4; m++) {
          let loop = m * 15;
          let min = loop < 10 ? "0" + loop : loop;
          let str = "2021-01-01 " + hours + ":" + min + ":00";

          this.hourList.push(str);
        }
      }
      for (let i = 0; i < 8; i++) {
        let hours = i < 10 ? "0" + i : i;
        for (let m = 0; m < 4; m++) {
          let loop = m * 15;
          let min = loop < 10 ? "0" + loop : loop;
          let str = "2021-01-01 " + hours + ":" + min + ":00";

          this.hourList.push(str);
        }
      }
    },
  },
  computed: {

    spinner() {
      return this.$store.getters["activitymanage/spinner"];
    },
    filter_search() {
      return this.$store.getters["activitymanage/filter_search"];
    },
    datasList() {
      return this.$store.getters["activitymanage/datasList"];
    },
    listDataSMDetail() {
      return this.$store.getters["activitymanage/listDataSMDetail"];
    },
    listDataCustDetail() {
      return this.$store.getters["activitymanage/listDataCustDetail"];
    },
    
  },
  components: {
    Datepicker,
    "sales-period-block": require("./act-management-component/md-period-boxes"),
    "md-auto-search-box": require("./act-management-component/md-auto-search-box"),
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "planning");
      this.login = true;
      this.fetchData();
      let filter_search = {
        sm_code: "",
        cust_code: "",
      };
      this.$store.commit("activitymanage/setFilterSearch", filter_search);
      this.$store.dispatch("activitymanage/filterSaleman", "");
      this.$store.dispatch("activitymanage/filterCustomer", {salesman:"",keyword:""});
      this.$store.dispatch("activitymanage/getList");
    }
  },
};
</script>
<style lang="scss" scoped>
#pageActivityManagement {
  .pt-2 {
    padding-top: 2px;
  }
  .md-dropdown-box {
    background: #efefef;
  }
  .head-table {
    font-family: roboto;
    opacity: 0.54;
    margin-top: 25px;
    display: flex;
    padding-bottom: 15px;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 600;
    .md-icon {
      cursor: pointer;
    }
  }
  .left-filter2,
  .left-filter {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    .title {
      color: #797979;
      font-size: 16px;
      font-family: lato;
      padding: 15px 25px;
      text-align: left;
    }
  }
  .left-filter2 {
    padding-top: 10px;
    padding-bottom: 8px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .sales-area-table {
    // width: 1000px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 10px;
    .detail-blog {
      padding: 0px !important;
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
}
</style>
