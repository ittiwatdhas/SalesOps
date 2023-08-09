<template>
  <div id="sales-incen-stapone " style="width: 100%;padding-top:20px; padding-bottom: 20px;">
    <div class="mds-card">
      <div class="mds-card-head">
        <div class="title">Select Sales Cycle & Pay Date</div>
        <div class="title-icon" @click="openTab(0)">
          <md-icon v-if="tab == 0">keyboard_arrow_up</md-icon>
          <md-icon v-else>keyboard_arrow_down</md-icon>
        </div>
      </div>
      <div class="mds-card-body" v-if="tab == 0" style="padding-top:15px;padding-bottom:16px">
        <div style="width : 100%;display: flex;padding: 0 16px 15px 16px">
          <div
            class="title-16"
            style="width : 30%;padding-top:9px;text-align:right;padding-right:5%"
          >SALES CYCLE</div>
          <div style="width : 70%;padding-right:10%" class="no-under-line">
            <md-input-container style="margin:0px;">
              <md-select v-model="step1tab1.salesCycle">
                <md-option
                  v-for="(row , idx) in arrSalesCycle"
                  @selected="selectSalesCycle(row)"
                  :value="row.code"
                  :key="'s-cyle'+idx"
                >
                  <span
                    :style="{'color':step1tab1.salesCycle == row.code ? '#fd7f00' : 'black'}"
                  >{{formatterDate(row.start_date)}} - {{formatterDate(row.end_date)}}</span>
                </md-option>
              </md-select>
            </md-input-container>
          </div>
        </div>
        <div style="width : 100%;display: flex;padding: 0 16px 0 16px">
          <div
            class="title-16"
            style="width : 30%;padding-top:9px;text-align:right;padding-right:5%"
          >PAY DATE</div>
          <div style="width:70%;padding-right:10%" class="no-under-line" @click="setDefault">
            <datepicker
              id="dp1-incentive"
              style="width:100%;"
              :value="step1tab1.payDate"
              @selected="selectedDelDate"
              :format="formatterDate"
              :disabledDates="disabledDatesDel"
            ></datepicker>
          </div>
        </div>
        <div style="width:100%;padding-left:40px;padding-right:10%" class="under-line">
          <md-input-container style="margin-top:0px">
            <label>Take note...</label>
            <md-textarea v-model="step1tab1.takeNote" maxlength="255"></md-textarea>
            <!-- <md-input v-model="step1tab1.takeNote"></md-input> -->
          </md-input-container>
        </div>
        <div style="width:100%;padding-right:5%;text-align:right">
          <!-- :disabled="selectedRound == ''? false : true" -->
          <md-button
            class="-orange"
            style="height:36px;margin:unset;border-radius:3px;font-size:12px"
            @click="nextTab(0)"
          >NEXT</md-button>
        </div>
      </div>
    </div>

    <div class="mds-card" style="margin-top:16px">
      <div class="mds-card-head">
        <div class="title">Select Recipient</div>
        <div class="title-icon" @click="openTab(1)">
          <md-icon v-if="tab == 1">keyboard_arrow_up</md-icon>
          <md-icon v-else>keyboard_arrow_down</md-icon>
        </div>
      </div>
      <div class="mds-card-body" v-if="tab == 1" style="padding-top:10px;padding-bottom:16px">
        <div style="width : 100%;display: flex;padding: 0 16px 5px 16px">
          <div style="width : 5%;padding-top:8px" class="chk-order">
            <input
              type="checkbox"
              v-model="tab2allchk"
              style="height: 20px;width: 20px;"
              @change="tab2chkAll($event)"
            />
          </div>
          <div style="width : 45%;" class="no-under-line">
            <md-input-container style="box-shadow:unset">
              <md-select v-model="step1tab2.team" @selected="selecedTeamAuto()">
                <md-option v-for="row in step1tab2.arrTeam" 
                :value="row.code" 
                :key="row.code"
                @selected="selecedTeam(row.code)"
                >
                  <template>
                    <div style="display:-webkit-box;width:100%;padding-bottom:7px">
                      <!-- 'white-space': 'nowrap', -->
                      <div
                        :style="{'width':'230px',
                            'color':step1tab2.team == row.code ? '#fd7f00' : 'black',
                            'line-height': '1.4',
                            'white-space': 'initial',
                            'text-overflow': 'ellipsis',
                            'display': 'block',
                            'padding-right': '5px',
                            'overflow': 'hidden'}"
                      >{{row.name}}</div>
                      <div style="width:15px;padding-top:3px;">
                        <div
                          class="step1tab2-team-chip"
                          style="height:15px"
                          v-if="row.status == 'active'"
                        ></div>
                        <div class="step1tab2-unteam-chip" style="height:15px" v-else></div>
                      </div>
                    </div>
                  </template>
                </md-option>
              </md-select>
            </md-input-container>
          </div>
          <div style="width:50%;padding-left:30px" class="no-under-line">
            <md-input-container style="margin-top:0px">
              <md-icon>search</md-icon>
              <md-input
                v-model="tab2searh"
                :placeholder="'Filter'"
                v-on:change="tab2filter"
                @focus.native="$event.target.select()"
              ></md-input>
            </md-input-container>
          </div>
        </div>
        <div v-if="arrTeamDetail.length ==0" style="font-size:14px;font-family:lato">No data...</div>
        <div
          style="width:100%;padding-left:20px"
          class="md-tab2"
          id="style-scrollbar"
          v-on:scroll="scrollFunction"
        >
          <transition-group tag="div" name="fade" v-if="arrTeamDetail.length >0">
            <div
              class="box"
              v-for="item in arrTeamDetail"
              :key="item.emp_id"
              style="text-align: left;"
            >
              <div style="display: inline-flex;padding-bottom:10px">
                <div class="chk-order" style="padding-top:5px">
                  <input
                    type="checkbox"
                    v-model="item.checked"
                    style="height: 20px;width: 20px;"
                    @change="tab2chkchild($event)"
                  />
                </div>
                <div style="font-size:14px;padding-left:10px">
                  <div class="font-bold" style="text-align:left;">
                    <span style="font-family:kanit">{{item.emp_id}} : {{item.fullname}}</span>
                  </div>
                  <div class="width-150" style="text-align:left">
                    <span style="color:#727272;font-family:lato">{{item.team}}</span>
                    <md-tooltip style="font-family:kanit" md-direction="top">{{item.fullname}}</md-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div style="width:100%;padding-right:5%;text-align:right">
          <md-button
            class="-orange"
            style="height:36px;margin:unset;border-radius:3px;font-size:12px"
            @click="nextTab(1)"
          >NEXT</md-button>
        </div>
      </div>
    </div>

    <div class="mds-card" style="margin-top:16px">
      <div class="mds-card-head">
        <div class="title">Select Condition</div>
        <div class="title-icon" style="display: flex;">
          <div @click="openCondSetting" style="margin-right:10px">
            <md-icon style="font-size:19px">brightness_low</md-icon>
          </div>
          <div @click="openTab(2)">
            <md-icon v-if="tab == 2">keyboard_arrow_up</md-icon>
            <md-icon v-else>keyboard_arrow_down</md-icon>
          </div>
        </div>
      </div>
      <div class="mds-card-body" v-if="tab == 2" style="padding-bottom:16px">
        <div style="width : 100%;" class="no-under-line">
          <md-input-container style="box-shadow:unset;width:40%">
            <md-select multiple v-model="step1tab3.conds" @selected="selecedCond">
              <md-option
                v-for="(row) in step1tab3.arrConds"
                :key="row.code"
                :value="row.code"
              >{{ row.name }}</md-option>
            </md-select>
          </md-input-container>
        </div>
        <div
          style="width:100%;padding-left:20px;padding-top:0px;"
          class="md-tab3"
          id="style-scrollbar"
          v-on:scroll="scrollFunction"
        >
          <transition-group tag="div" name="fade">
            <div
              class="box"
              v-for="(item ,index) in arrCondsDetail"
              :key="item.code"
              style="padding-bottom:15px;"
            >
              <div style="display: flex;">
                <div
                  style="cursor:pointer"
                  :class="disIcon(item,index)"
                  @click="selecedCondType(index)"
                >{{item.checked}}</div>
                <div style="font-size:14px;padding-left:10px">
                  <div style="text-align:left;font-weight: 400;font-family:kanit;">{{item.title}}</div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div style="width:100%;padding-right:5%;text-align:right;padding-top:20px">
          <md-button
            class="-gray-A8"
            style="height:36px;margin:unset;border-radius:3px;font-size:12px;right: 20px;"
            @click="saveTab()"
          >SAVE</md-button>
          <md-button
            class="-orange"
            style="height:36px;margin:unset;border-radius:3px;font-size:12px"
            @click="nextTab(2)"
          >NEXT</md-button>
        </div>
      </div>
    </div>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>{{snkTitle}}</span>
      <md-button class="md-accent" @click="$refs.snackbar.close()">
        <span style="color:#fd7f00">OK</span>
      </md-button>
    </md-snackbar>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="conde-set" id="conde-set-dialog">
      <md-dialog-title style="display: flex;padding: 10px 20px;">
        <div style="width:80%">Condition Setting</div>
        <div style="width:20%;text-align:right;">
          <md-icon style="cursor:pointer" @click.native="closeDialog('conde-set')">close</md-icon>
        </div>
      </md-dialog-title>
      <md-dialog-content style="padding-top:20px">
        <div
          class="mds-card"
          v-for="(row ,index) in step1Setting"
          :key="'con'+row.code"
          style="margin-bottom:20px"
        >
          <div style="width:100%;display: flex;">
            <div class="show-check-no bg">{{index+1}}</div>
            <div
              style="font-family:kanit;color:#414141;ont-size:18px;margin-left:12px;padding-top:1px;text-align:left"
            >{{row.title}}</div>
          </div>
          <!--ROW 1-->
          <div
            style="width:100%;display: flex;padding-top:15px"
            class="mds-body"
            v-for="(record, idx) in row.tac_use"
            :key="'tac_use-'+idx"
          >
            <div style="width:5%;padding-top:10px;" class="text-1">
              <!-- tac_use -->
              <input
                v-if="record.show_checkbox"
                type="checkbox"
                v-model="record.checked"
                style="height: 20px;width: 20px;"
                @change="setConChk($event)"
              />
            </div>
            <div
              style="width:30%;padding-top:10px;padding-left:8px;padding-right:5px"
              class="text-1"
            >{{record.title}}</div>
            <div style="width:20%;" class="no-under-line">
              <md-input-container>
                <md-select v-model="record.symbols_code" :disabled="record.show_checkbox">
                  <md-option
                    @click.native="chooseSymbol(index)"
                    :value="row.code"
                    v-for="row in masterStep1.arrSymbols"
                    :key="'arrdg1'+row.code"
                  >{{row.title}}</md-option>
                </md-select>
              </md-input-container>
            </div>
            <div
              style="width:25%;padding-left:4%;padding-right:5%;padding-top:4px;display:flex"
              class="under-line"
            >
              <div
                style="padding-top:6px;font-size:12px;color:#5a5a5a"
              >{{renderUnit(record.unit_code)}}</div>
              <template>
                <mds-input
                  v-model="record.math_value"
                  :id="'tac_use-'+ row.tactics_id+'-math_value-'+idx"
                  :table="'math_value'"
                  :index="index"
                  :indexDetail="index"
                  type="detail"
                  :readOnly="record.show_checkbox"
                  @calculate="changeMathVal"
                ></mds-input>
              </template>
            </div>
            <div style="width:15%;" class="no-under-line">
              <md-input-container>
                <md-select v-model="record.unit_code" :disabled="record.show_checkbox">
                  <md-option
                    :value="row.code"
                    @click.native="chooseUnitCode(index)"
                    v-for="row in masterStep1.arrUnits"
                    :key="'arrdg1'+row.code"
                  >{{row.title}}</md-option>
                </md-select>
              </md-input-container>
            </div>
          </div>
          <!--ROW 2-->
          <div style="width:100%;display: flex;" class="mds-body">
            <div
              style="width:35%;padding-top:10px;padding-left:38px;text-align:left"
              class="text-1"
            >เพดานเงินรางวัล</div>
            <div style="width:20%;" class="no-under-line">
              <md-input-container>
                <md-select v-model="row.range_code" @selected="slectedRange(index)">
                  <md-option
                    :value="row.code"
                    v-for="row in masterStep1.arrRange"
                    :key="'arrdg1'+row.code"
                  >{{row.title}}</md-option>
                </md-select>
              </md-input-container>
            </div>
            <div
              style="width:25%;padding-left:5%;padding-right:3%;display:flex;padding-top:4px"
              class="under-line"
            >
              <div style="padding-top:6px;font-size:12px;color:#5a5a5a">฿</div>
              <template>
                <mds-input
                  v-model="row.max_reward"
                  :id="'max_reward-'+ row.tactics_id"
                  :table="'max_reward'"
                  :index="index"
                  :indexDetail="index"
                  type="detail"
                  :readOnly="false"
                ></mds-input>
              </template>
            </div>
            <div style="width:20%"></div>
          </div>
          <!--ROW 3-->
          <div style="width:100%;display: flex;padding-top:18px;text-align:left" class="mds-body">
            <div :style="{'width':'35%','padding-left':'38px'}" class="text-1">
              <span v-if="row.tac_type ==1 || row.tac_type ==3">ขั้นเงินรางวัล</span>
              <span v-else-if="row.tac_type ==2">ขั้นเงินรางวัล แปรผันตาม</span>
            </div>
            <div
              class="text-2"
              :style="{'width':'25%','text-align':'center','padding-right':'5%'}"
            >Target (%)</div>
            <div :style="{'width':'18%','text-align':'center'}" class="text-2">
              <span v-if="row.tac_type ==1 || row.tac_type ==3">Incentive (฿)</span>
              <span v-else-if="row.tac_type ==2">Incentive (%)</span>
            </div>
            <div :style="{'width':'22%','text-align':'left', 'padding-left' : '2%'}" class="text-2">
              <md-icon
                @click.native="addReward(index)"
                style="color:#fd7f00;cursor:pointer"
              >add_circle</md-icon>
            </div>
          </div>
          <!--ROW 3-->
          <div
            style="width:100%;display: flex;padding-bottom:10px"
            class="mds-body hide-icon"
            v-for="(record, idx) in row.rewards"
            :key="index+'reword-row'+idx"
          >
            <div :style="{'width':row.tac_type == 1 || row.tac_type ==3 ?'35%':'35%'}"></div>
            <div
              :style="{'width':'25%','text-align':'center','padding-right':'5%'}"
              class="under-line"
            >
              <template>
                <mds-input
                  v-model="record.target"
                  :table="'target'"
                  :id="'rewards-'+ row.tactics_id+'-target-'+idx"
                  :index="index"
                  :indexDetail="idx"
                  type="detail"
                  :readOnly="false"
                ></mds-input>
              </template>
            </div>
            <div :style="{'width':'18%','text-align':'left'}" class="under-line">
              <div v-if="(row.tac_type ==  1 || row.tac_type ==3 )|| (row.tac_type ==  2 && record.incentive > 0)">
                <template>
                  <mds-input
                    :id="'rewards-'+ row.tactics_id+'-incentive-'+idx"
                    v-model="record.incentive"
                    :table="'incentive'"
                    @setincentive="setIncentive"
                    :index="index"
                    :indexDetail="idx"
                    type="detail"
                    :readOnly="false"
                  ></mds-input>
                </template>
              </div>
              <div
                v-else-if="row.tac_type ==  2 && record.incentive == 0"
                style="color:#A8A8A8;font-size:11px;padding-top:8px;text-align:center"
              >achieve target (%)</div>
            </div>
            <div
              :style="{'width':'22%','text-align':'left' , 'padding-left' : '2%'}"
              class="text-2"
            >
              <md-icon
                style="cursor:pointer;opacity:0.5"
                class="del"
                @click.native="delReward(index , idx)"
              >remove_circle</md-icon>
              <md-icon
                v-if="row.tac_type == 2 && record.incentive == 0 "
                style="cursor:pointer;font-size:16px;padding-top:3px"
                class="del"
                @click.native="editReward(index , idx)"
              >edit</md-icon>
            </div>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions style="background:#efefef;min-height:45px;padding:2px 20px;">
        <md-button class="md-primary" @click.native="openDG('savecond')">SAVE</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog ref="md-confirm-dialog-condition">
      <md-dialog-title>{{titleCF}}</md-dialog-title>
      <md-dialog-content></md-dialog-content>
      <md-dialog-actions style="padding-right:20px">
        <md-button @click="cancelDG">CANCEL</md-button>
        <md-button class="md-primary" @click="submitDG" v-if="titleButton != ''">{{titleButton}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import service from "@/services/planning/incentive";
import dateFunc from "../../Salesops/fullCalendar/dateFunc";
var newdate = new Date();
var dd = newdate.getDate();
var mm = newdate.getMonth();
var y = newdate.getFullYear();

export default {
  name: "step-one",
  components: {
    Datepicker,
    "mds-input": require("./step1-input")
  },
  data() {
    return {
      tab2searh: "",
      tab2allchk: false,
      tab: 0,
      disabledDatesDel: {},
      vertical: "bottom",
      horizontal: "center",
      duration: 4000,
      snkTitle: "",
      showRage: false,
      keepPressSetting: true,
      titleCF: "",
      modeCF: "",
      titleButton: "SAVE",
      editRe: {
        mom: "",
        child: ""
      },
      payment_state: 0,
      count_team: 0,
      tactics_use_id: ""
    };
  },
  computed: {
    masterStep1() {
      return this.$store.getters["incentive/masterStep1"];
    },
    arrSalesCycle() {
      return this.$store.getters["incentive/step1tab1"].arrSalesCycle;
    },
    step1tab1() {
      return this.$store.getters["incentive/step1tab1"];
    },
    step1tab2() {
      return this.$store.getters["incentive/step1tab2"];
    },
    arrTeamDetail() {
      return this.$store.getters["incentive/step1tab2"].arrTeamDetail;
    },
    arrTeamDetailTemp() {
      return this.$store.getters["incentive/step1tab2"].arrTeamDetailTemp;
    },
    step1tab3() {
      return this.$store.getters["incentive/step1tab3"];
    },
    arrCondsDetail() {
      return this.$store.getters["incentive/step1tab3"].arrCondsDetail;
    },
    step1Setting() {
      return this.$store.getters["incentive/step1Setting"];
    },
    defaultStep() {
      return this.$store.getters["incentive/defaultStep"];
    },
    dataBeforeChange() {
      return this.$store.getters["incentive/dataBeforeChange"];
    }
  },
  methods: {
    chooseSymbol(index) {
      // if(index == 0 && !_.isUndefined(this.step1Setting[index])){
      if(!_.isUndefined(this.step1Setting[index])){
        if (this.step1Setting[index].tac_use.length > 0) {
          let tac_use = this.step1Setting[index].tac_use[0]
          if(tac_use.tactics_use == ""){
            this.tactics_use_id = tac_use.id
          }
          if(tac_use.unit_code.toString() == "1" && tac_use.math_value > 150){
            this.snkTitle = "Review %"+this.formatNumberInt(tac_use.math_value)+" pass the total Sales Target, Please.";
            this.$refs.snackbar.open();
          }
        }
      }
      if(!_.isUndefined(this.step1Setting)){
        for(var i = 0; i < this.step1Setting.length;i++){
          if (!_.isUndefined(this.step1Setting[i+1])) {
            if (this.step1Setting[i+1].tac_use.length > 0) {
              if(this.step1Setting[i+1].tac_use[0].tactics_use == this.tactics_use_id.toString()){
                let obj = this.step1Setting[index].tac_use[0];
                this.step1Setting[i+1].tac_use[0].math_value = obj.math_value;
                this.step1Setting[i+1].tac_use[0].symbols_code =
                  obj.symbols_code;
                this.step1Setting[i+1].tac_use[0].unit_code = obj.unit_code;
              } 
            }
          }
        }
      }
      // if (!_.isUndefined(this.step1Setting[index + 1])) {
      //   if (this.step1Setting[index + 1].tac_use.length > 0) {
      //     if(this.step1Setting[index + 1].tac_use[0].tactics_use == this.tactics_use_id.toString()){
      //       let obj = this.step1Setting[index].tac_use[0];
      //       this.step1Setting[index + 1].tac_use[0].math_value = obj.math_value;
      //       this.step1Setting[index + 1].tac_use[0].symbols_code =
      //         obj.symbols_code;
      //       this.step1Setting[index + 1].tac_use[0].unit_code = obj.unit_code;
      //     } 
         
      //   }
      // }
      // if (!_.isUndefined(this.step1Setting[index + 2])) {
      //   if (this.step1Setting[index + 2].tac_use.length > 0) {
      //     if(this.step1Setting[index + 2].tac_use[0].tactics_use == this.tactics_use_id.toString()){
      //       let obj = this.step1Setting[index].tac_use[0];
      //       this.step1Setting[index + 2].tac_use[0].math_value = obj.math_value;
      //       this.step1Setting[index + 2].tac_use[0].symbols_code =
      //         obj.symbols_code;
      //       this.step1Setting[index + 2].tac_use[0].unit_code = obj.unit_code;
      //     }
      //   }
      // }
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    chooseUnitCode(index) {
      this.chooseSymbol(index);
    },
    changeMathVal(index) {
      // console.log('changeMathVal',index)
      this.chooseSymbol(index);
    },
    disIcon(item, index) {
      if (item.disable) {
        return "show-check-no-dis";
      } else {
        if (item.checked != "") {
          return "show-check-no bg";
        } else {
          return "show-check-no";
        }
      }
    },
    setIncentive(val) {
      /*
      this.editRe = val;
      this.openDG("setincentive");
      */
    },
    showIcon(row, index) {
      if (row.rewards[0].incentive == 0 && index > 0) {
        return false;
      } else {
        return true;
      }
    },
    renderUnit(value) {
      if (value == 1) {
        return "%";
      } else {
        return "฿";
      }
    },
    selectSalesCycle(row) {
      this.$store.dispatch("incentive/selectSalesCycle", row);
    },
    addReward(mom) {
      let master = _.cloneDeep(this.step1Setting);
      let masterOld = _.cloneDeep(this.step1Setting);

      let last = master[mom].rewards[masterOld[mom].rewards.length - 1];
      if (_.isUndefined(last)) {
        master[mom].rewards.push({
          id: master[mom].rewards.length,
          target: 0,
          incentive: 0
        });
      } else {
        let target = 0;
        let incentive = 0;
        if (_.isNaN(parseFloat(last.target) + 1)) {
          master[mom].rewards[0].target = 0;
          master[mom].rewards[0].incentive = 0;
          target = 1;
          if (master[mom].tac_type == 1) {
            incentive = 1;
          } else {
            incentive = 0;
          }
        } else {
          target = parseFloat(last.target) + 1;
          if (master[mom].tac_type == 1) {
            incentive = parseFloat(last.incentive) + 1;
          } else {
            let key = master[mom].rewards.length;
            if (master[mom].rewards[key - 1].incentive > 0) {
              incentive = parseFloat(last.incentive) + 1;
            } else {
              incentive = 0;
            }
          }
        }
        master[mom].rewards.push({
          id: master[mom].rewards.length,
          target: target,
          incentive: incentive
        });
      }
      this.$store.commit("incentive/keepStep1Setting", master);
    },
    editReward(mom, child) {
      this.step1Setting[mom].rewards[child].incentive = 1;
      /*
      this.editRe = {
        mom: mom,
        child: child
      };
      this.openDG("editreward");
      */
    },
    delReward(mom, child) {
      let master = _.cloneDeep(this.step1Setting);
      let data = master[mom].rewards;
      let detail = data[child];
      master[mom].rewards = _.filter(data, item => {
        if (item.id != detail.id) {
          return true;
        }
      });
      if (master[mom].rewards.length == 0) {
        master[mom].rewards.push({
          id: master[mom].rewards.length,
          target: 0,
          incentive: 0
        });
      }
      this.$store.commit("incentive/keepStep1Setting", master);
    },
    setConChk(key) {
      console.log("setConChk >>> ");
    },
    slectedRange(key) {
      // this.showRage = this.step1Setting[key].range_code == "1" ? false : true;
    },
    openDG(mode) {
      this.modeCF = mode;
      if (mode == "savecond") {
        let master = _.cloneDeep(this.step1Setting);
        let tac1 = _.filter(master, o => {
          if (o.tac_type == 1) {
            return true;
          }
        });
        let tac2 = _.filter(master, o => {
          if (o.tac_type == 2) {
            return true;
          }
        });
        let tac3 = _.filter(master, o => {
          if (o.tac_type == 3) {
            return true;
          }
        });
        if(tac3.length > 0){
          let count = tac3[0].rewards.length;
          let math_value = 0
          let symbols_code = 1 // 1 : >= , 2 : > 
          let tac_use = false
          if (!_.isUndefined(tac3[0].tac_use[0])) {
            math_value = tac3[0].tac_use[0].math_value
            symbols_code = tac3[0].tac_use[0].symbols_code
            tac_use = tac3[0].tac_use[0].tactics_use != "" ? true : false

          }
          let data = tac3[0].rewards[0];
          let start_re = data.target
          if(tac3[0].tac_use[0].unit_code == "1" && tac3[0].tac_use[0].math_value > 150){
            this.titleCF = "Review %"+this.formatNumberInt(tac3[0].tac_use[0].math_value)+" pass the total Sales Target, Please."
            this.$refs["md-confirm-dialog-condition"].open();
            this.titleButton = "";
          } else if(tac3[0].range_code == "1" && (tac3[0].rewards[count - 1].incentive > tac3[0].max_reward)) {
            this.titleCF = "Count items เกินกว่า เพดานเงินรางวัล";
            this.$refs["md-confirm-dialog-condition"].open();
            this.titleButton = "";
          } else if(tac3[0].range_code == "2" && (tac3[0].rewards[count - 1].incentive >= tac3[0].max_reward)){
            this.titleCF = "Count items เกินกว่า เพดานเงินรางวัล";
            this.$refs["md-confirm-dialog-condition"].open();
            this.titleButton = "";
          } else if(tac3[0].rewards.length == 1 && tac3[0].rewards[count - 1].target == 0 && tac3[0].rewards[count - 1].incentive == 0){
            this.titleCF = "Please input rewards on step.";
            this.$refs["md-confirm-dialog-condition"].open();
            this.titleButton = "";
          } else if(symbols_code == '1' && start_re < math_value && tac_use == false){
            this.titleCF = "ขั้นเงินรางวัล ต้องตามเกณฑ์ Count items";
            this.$refs["md-confirm-dialog-condition"].open();
            this.titleButton = "";
          } else if(symbols_code == '2' && start_re <= math_value && tac_use == false){
            this.titleCF = "ขั้นเงินรางวัล ต้องตามเกณฑ์ Count items";
            this.$refs["md-confirm-dialog-condition"].open();
            this.titleButton = "";
          }else{
            if (tac1.length > 0) {
              let count = tac1[0].rewards.length;
              let math_value = 0
              let symbols_code = 1 // 1 : >= , 2 : >
              let tac_use = false 
              if (!_.isUndefined(tac1[0].tac_use[0])) {
                math_value = tac1[0].tac_use[0].math_value
                symbols_code = tac1[0].tac_use[0].symbols_code
                tac_use = tac1[0].tac_use[0].tactics_use != "" ? true : false
              }
              let data = tac1[0].rewards[0];
              let start_re = data.target
              if(tac1[0].tac_use[0].unit_code == "1" && tac1[0].tac_use[0].math_value > 150){
                this.titleCF = "Review %"+this.formatNumberInt(tac1[0].tac_use[0].math_value)+" pass the total Sales Target, Please."
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "";
              } else if (tac1[0].range_code == "1" && (tac1[0].rewards[count - 1].incentive > tac1[0].max_reward)) {
                this.titleCF = "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "";
              } else if(tac1[0].range_code == "2" && (tac1[0].rewards[count - 1].incentive >= tac1[0].max_reward)){
                this.titleCF = "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "";
              } else if(tac1[0].rewards.length == 1 && tac1[0].rewards[count - 1].target == 0 && tac1[0].rewards[count - 1].incentive == 0){
                this.titleCF = "Please input rewards on step.";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "";
              } else if(symbols_code == '1' && start_re < math_value && tac_use == false){
                this.titleCF = "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม";
                    this.$refs["md-confirm-dialog-condition"].open();
                    this.titleButton = "";
              } else if(symbols_code == '2' && start_re <= math_value && tac_use == false){
                this.titleCF = "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม";
                    this.$refs["md-confirm-dialog-condition"].open();
                    this.titleButton = "";
              } else {
                if(tac2.length > 0){
                  if(tac2[0].rewards.length == 1 && tac2[0].rewards[0].target == 0 && tac2[0].rewards[0].incentive == 0){
                    this.titleCF = "Please input rewards on step.";
                    this.$refs["md-confirm-dialog-condition"].open();
                    this.titleButton = "";
                  }else{
                    this.titleCF = "Do you want to save condition setting?";
                    this.$refs["md-confirm-dialog-condition"].open();
                    this.titleButton = "SAVE";
                  }
                }else{
                  this.titleCF = "Do you want to save condition setting?";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "SAVE";
                }
              }
            } else {
              if(tac2.length > 0){
                if(tac2[0].rewards.length == 1 && tac2[0].rewards[0].target == 0 && tac2[0].rewards[0].incentive == 0){
                  this.titleCF = "Please input rewards on step.";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "";
                }else{
                  this.titleCF = "Do you want to save condition setting?";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "SAVE";
                }
              }else{
                this.titleCF = "Do you want to save condition setting?";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "SAVE";
              }
            }
          }
        }else {
          if (tac1.length > 0) {
            let count = tac1[0].rewards.length;
            let math_value = 0
            let symbols_code = 1 // 1 : >= , 2 : > 
              let tac_use = false 
              if (!_.isUndefined(tac1[0].tac_use[0])) {
                math_value = tac1[0].tac_use[0].math_value
                symbols_code = tac1[0].tac_use[0].symbols_code
                tac_use = tac1[0].tac_use[0].tactics_use != "" ? true : false
              }
            let data = tac1[0].rewards[0];
            let start_re = data.target
            // console.log("---",tac1[0])
            if(tac1[0].tac_use[0].unit_code == "1" && tac1[0].tac_use[0].math_value > 150){
                this.titleCF = "Review %"+this.formatNumberInt(tac1[0].tac_use[0].math_value)+" pass the total Sales Target, Please."
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "";
            } else if (tac1[0].range_code == "1" && (tac1[0].rewards[count - 1].incentive > tac1[0].max_reward)) {
              this.titleCF = "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล";
              this.$refs["md-confirm-dialog-condition"].open();
              this.titleButton = "";
            } else if(tac1[0].range_code == "2" && (tac1[0].rewards[count - 1].incentive >= tac1[0].max_reward)){
              this.titleCF = "เงินรางวัลยอดขายรวม เกินกว่า เพดานเงินรางวัล";
              this.$refs["md-confirm-dialog-condition"].open();
              this.titleButton = "";
            } else if(tac1[0].rewards.length == 1 && tac1[0].rewards[count - 1].target == 0 && tac1[0].rewards[count - 1].incentive == 0){
              this.titleCF = "Please input rewards on step.";
              this.$refs["md-confirm-dialog-condition"].open();
              this.titleButton = "";
            } else if(symbols_code == '1' && start_re < math_value && tac_use == false){
              this.titleCF = "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "";
            } else if(symbols_code == '2' && start_re <= math_value && tac_use == false){
              this.titleCF = "ขั้นเงินรางวัล ต้องตามเกณฑ์ เงินรางวัลยอดขายรวม";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "";
            } else {
              if(tac2.length > 0){
                if(tac2[0].rewards.length == 1 && tac2[0].rewards[0].target == 0 && tac2[0].rewards[0].incentive == 0){
                  this.titleCF = "Please input rewards on step.";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "";
                }else{
                  this.titleCF = "Do you want to save condition setting?";
                  this.$refs["md-confirm-dialog-condition"].open();
                  this.titleButton = "SAVE";
                }
              }else{
                this.titleCF = "Do you want to save condition setting?";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "SAVE";
              }
            }
          } else {
            if(tac2.length > 0){
              if(tac2[0].rewards.length == 1 && tac2[0].rewards[0].target == 0 && tac2[0].rewards[0].incentive == 0){
                this.titleCF = "Please input rewards on step.";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "";
              }else{
                this.titleCF = "Do you want to save condition setting?";
                this.$refs["md-confirm-dialog-condition"].open();
                this.titleButton = "SAVE";
              }
            }else{
              this.titleCF = "Do you want to save condition setting?";
              this.$refs["md-confirm-dialog-condition"].open();
              this.titleButton = "SAVE";
            }
          }
        }
      } else if (mode == "editreward") {
        this.titleCF = "คุณต้องการ reset ขั้นเงินรางวัลแปรผันตามค่า Default?";
        this.titleButton = "RESET";
        this.$refs["md-confirm-dialog-condition"].open();
      } else if (mode == "setincentive") {
        this.titleCF = "เปลี่ยนทั้ง คอลัมน์ให้เป็น default?";
        this.titleButton = "OK";
        this.$refs["md-confirm-dialog-condition"].open();
      }
    },
    submitDG() {
      if (this.modeCF == "savecond") {
        this.saveCond();
      } else if (this.modeCF == "editreward") {
        let mom = this.editRe.mom;
        let child = this.editRe.child;
        let master = _.cloneDeep(this.step1Setting);
        let master2 = _.cloneDeep(this.step1Setting);
        let data = master[mom].rewards;
        for (let i = 0; i < data.length; i++) {
          if (master2[mom].rewards[0].incentive == 0) {
            let val = i == 0 ? 1 : data[i - 1].incentive + 1;
            data[i].incentive = val;
          } else {
            data[i].incentive = 0;
          }
        }
        this.$store.commit("incentive/keepStep1Setting", master);
        this.$refs["md-confirm-dialog-condition"].close();
      } else if (this.modeCF == "setincentive") {
        let master = _.cloneDeep(this.step1Setting);
        let mom = this.editRe.mom;
        let child = this.editRe.child;
        let data = master[mom].rewards;
        let master2 = _.cloneDeep(this.step1Setting);
        let old = this.dataBeforeChange[mom].rewards[child];
        for (let i = 0; i < data.length; i++) {
          if (i != child) {
            data[i].incentive = data[child].incentive;
          }
        }
        this.$store.commit("incentive/keepStep1Setting", master);
        this.$refs["md-confirm-dialog-condition"].close();
      }else if(this.modeCF == "check_paydate"){
        this.$refs["md-confirm-dialog-condition"].close();
      }
    },
    cancelDG() {
      if (this.modeCF == "savecond" || this.modeCF == "editreward") {
        this.$refs["md-confirm-dialog-condition"].close();
      } else if (this.modeCF == "setincentive") {
        let mom = this.editRe.mom;
        let child = this.editRe.child;
        let old = this.dataBeforeChange[mom].rewards[child];
        let master = _.cloneDeep(this.step1Setting);
        let data = master[mom].rewards[child];
        if (data.incentive == 0) {
          master[mom].rewards[child].incentive = old.incentive;
        }

        this.$store.commit("incentive/keepStep1Setting", master);
        this.$refs["md-confirm-dialog-condition"].close();
      }else if(this.modeCF == "check_paydate"){
        this.$refs["md-confirm-dialog-condition"].close();
      }
    },
    saveCond() {
      this.$store.commit("incentive/setLoadingMain", true);
      this.$refs["md-confirm-dialog-condition"].close();
      let data = _.cloneDeep(this.step1tab1);
      var rs = _.find(data.arrSalesCycle, function(o) {
        return o.code == data.salesCycle;
      });
      let obj = {
        year: rs.fiscal_year,
        cycle: rs.fiscal_cycle,
        group_code: this.step1tab2.team,
        data_recipient: this.step1tab2.arrTeamDetail,
        condition_detail: this.step1Setting
      };
      service
        .saveStep1Tab3(obj)
        .then(response => {
          if(response.length > 0){
            this.payment_state = response[0]['payment_state']
          }
          this.$store.commit("incentive/setLoadingMain", false);
          this.$refs["conde-set"].close();

          this.editRe = {
            mom: "",
            child: ""
          };
          document.getElementsByTagName("html")[0].style = "overflow-y:scroll";
        })
        .catch();
    },
    openCondSetting() {
      if (this.step1Setting.length == 0) {
        this.snkTitle = "Please select condition.";
        this.$refs.snackbar.open();
      } else {
        this.keepPressSetting = false;
        this.$store.commit("incentive/setLoadingMain", true);
        let data = _.cloneDeep(this.step1tab1);
        var rs = _.find(data.arrSalesCycle, function(o) {
          return o.code == data.salesCycle;
        });
        var rs2 = _.filter(this.step1Setting, function(o) {
          return _.isNumber(o.checked);
        });
        let obj = {
          year: rs.fiscal_year,
          cycle: rs.fiscal_cycle,
          group_code: this.step1tab2.team,
          condition_detail: rs2
        };
        service
          .getStep3Popupy(obj)
          .then(response => {
            let condit = response.condition
            let datas = [];
            for (let i = 0; i <= condit.length; i++) {
              let keys = i + 1;
              var rs = _.find(condit, function(o) {
                if (_.isUndefined(o.no) && o.checked == keys) {
                  return true;
                } else if (!_.isUndefined(o.no) && o.no == keys) {
                  return true;
                }
                // return o.no == keys;
              });
              if (!_.isUndefined(rs)) {
                datas.push(rs);
              }
            }
            // if(response.fillGroup.length > 0){
            //   this.payment_state = response.fillGroup[0]['payment_state']
            // }
            // console.log(datas);
            this.$store.commit("incentive/keepStep1Setting", datas);
            this.$refs["conde-set"].open();
            this.$store.commit("incentive/setLoadingMain", false);
            document.getElementsByTagName("html")[0].style =
              "overflow-y:hidden";
          })
          .catch();
      }
    },
    closeDialog(ref) {
      this.$refs[ref].close();
      if (ref == "conde-set") {
        this.editRe = {
          mom: "",
          child: ""
        };
        document.getElementsByTagName("html")[0].style = "overflow-y:scroll";
      }
    },
    selecedCondType(index) {
      this.keepPressSetting = true;
      if (!this.arrCondsDetail[index].disable) {
        let arrCon = this.arrCondsDetail;
        if (_.isNumber(arrCon[index].checked)) {
          let keys = arrCon[index].checked;
          _.forEach(arrCon, function(record) {
            if (_.isNumber(record.checked) && record.checked > keys) {
              record.checked = record.checked - 1;
            }
          });
          arrCon[index].checked = "";
          _.forEach(arrCon, function(row, indexs) {
            if (row.set != arrCon[index].set) {
              arrCon[indexs].disable = false;
            }
          });
        } else {
          _.forEach(arrCon, function(row, indexs) {
            if (row.set != arrCon[index].set) {
              arrCon[indexs].disable = true;
              arrCon[indexs].checked = "";
            }
          });
          let rsFilt = _.filter(arrCon, o => {
            if (_.isNumber(o.checked)) {
              return true;
            }
          });

          arrCon[index].checked = rsFilt.length + 1;
        }
        let rsFilts = _.filter(this.arrCondsDetail, o => {
          if (_.isNumber(o.checked)) {
            return true;
          }
        });
        this.$store.commit("incentive/keepStep1Setting", rsFilts);
      }
    },
    runNoConds(value) {
      return _.findIndex(this.step1Setting, { code: value });
    },
    selecedCond() {
      this.$store.dispatch("incentive/getStep1Tab3", "");
    },
    selecedTeam(code) {
      let t = this;
      this.$store.commit("incentive/setLoadingMain", true);
      setTimeout(() => {
        t.getStep1Tab2("details");
        t.$store.commit("incentive/setLoadingMain", false);
      }, 0);
      t.count_team++
    },

    selecedTeamAuto() {
      let t = this;
      if(t.count_team == 0){
        this.$store.commit("incentive/setLoadingMain", true);
        setTimeout(() => {
          t.getStep1Tab2("details");
          t.$store.commit("incentive/setLoadingMain", false);
        }, 0);
        t.count_team++
      }

    },
    scrollFunction(e) {},
    setDefault() {
      let salesCycle = this.step1tab1.salesCycle;
      var rs = _.find(this.step1tab1.arrSalesCycle, function(o) {
        return o.code == salesCycle;
      });
      if (!_.isUndefined(rs)) {

        let end_date = new Date(rs.end_date)
        let now = new Date()
        let date_now = new Date(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate())
        let date_now_str = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()
        let str = rs.end_date.split("-");
        if(end_date.valueOf() < date_now.valueOf()){
          str = date_now_str.split("-");
          this.disabledDatesDel = {
            to: new Date(
              parseInt(str[0]),
              parseInt(str[1] - 1),
              parseInt(str[2])
            ),
            from: null
          };
        }else{
          this.disabledDatesDel = {
            to: new Date(
              parseInt(str[0]),
              parseInt(str[1] - 1),
              parseInt(str[2]) + 1
            ),
            from: null
          };
        }
      }
    },
    tab2chkchild() {},
    tab2filter(param) {
      this.$store.dispatch("incentive/filterStep1tab2", param);
    },
    tab2chkAll(e) {
      let val = this.tab2allchk;
      _.forEach(this.arrTeamDetail, function(row) {
        row.checked = val;
      });
    },
    nextTab(step) {
      let t = this;
      if (step == 1) {
        let filt = _.filter(t.arrTeamDetail, item => {
          if (item.checked) {
            return true;
          }
        });
        if (filt.length == 0) {
          t.snkTitle = "Please select recipient.";
          t.$refs.snackbar.open();
        } else {
          t.tab = step + 1;
          t.$store.dispatch("incentive/getStep1Tab3", "dropdown");
          t.$store.commit("incentive/setLoadingMain", true);
          service
            .saveStep1Tab2(this.step1tab2.arrTeamDetail)
            .then(response => {
              t.$store.dispatch("incentive/getStep1Tab3", "dropdown");
              t.$store.commit("incentive/setLoadingMain", false);
            })
            .catch();
        }
      } else if (step == 0) {
        t.tab = step + 1;
        t.$store.commit("incentive/setLoadingMain", true);
        let data = _.cloneDeep(this.step1tab1);
        let data2 = _.cloneDeep(this.step1tab2);
        data2.arrTeamDetail = []
        t.$store.commit("incentive/setDataStep1tab2", data2);
        var rs = _.find(data.arrSalesCycle, function(o) {
          return o.code == data.salesCycle;
        });
        if (!_.isUndefined(rs)) {
          service
            .saveStep1Tab1(this.step1tab1)
            .then(response => {
              data.arrSalesCycle = response
              t.$store.commit("incentive/setStep1tab1", data);
              t.getStep1Tab2("dropdown");
              t.$store.commit("incentive/setLoadingMain", false);
            })
            .catch();
        }
      } else if (step == 2) {
        let past = false
        let pay_date = new Date(this.step1tab1.payDate)
        let now = new Date()
        let date_now = new Date(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate())
        let pay_date_val = dateFunc.format(pay_date, "yyyy-MM-dd")
        let date_now_val = dateFunc.format(date_now, "yyyy-MM-dd")
        
        if(pay_date_val.valueOf() < date_now_val.valueOf()){
          this.modeCF = 'check_paydate'
          this.titleButton = 'OK'
          this.titleCF = 'Cannot calculate due date to overdue'
          this.$refs["md-confirm-dialog-condition"].open();
          past = false
        }else{
          if(this.step1Setting.length > 0){
            let check = _.filter(this.step1Setting, o => {
              if (o.lock == true) {
                return true
              }
            })
            if(check.length > 0){
              this.snkTitle = "Please set condition setting.";
              this.$refs.snackbar.open();
            }else{
              if(this.keepPressSetting == false){
                for(var i = 0; i< this.step1Setting.length; i++){
                  if(this.step1Setting[i]['tactics_id'] == ""){
                    this.keepPressSetting = true
                  }
                }
                if(this.payment_state != 2 && this.keepPressSetting == true) {
                  this.snkTitle = "Please set condition setting.";
                  this.$refs.snackbar.open();
                }else{
                  past = true
                }
              }else {
                past = true
              }
            }
          }else{

            this.snkTitle = "Please select condition.";
            this.$refs.snackbar.open();
          }
        }

        // if(this.payment_state != 2 || this.keepPressSetting == true) {
        //   this.snkTitle = "Please set condition setting.";
        //   this.$refs.snackbar.open();
        // }

        // if (this.step1Setting.length == 0) {
        //   t.snkTitle = "Please select condition.";
        //   t.$refs.snackbar.open();
        // // } else if (this.keepPressSetting == true) {
        // //   this.snkTitle = "Please set condition setting.";
        // //   this.$refs.snackbar.open();
        // } else if(this.payment_state != 2) {
        //   this.snkTitle = "Please set condition setting.";
        //   this.$refs.snackbar.open();
        // }
        if(past == true){
          t.$store.commit("incentive/setLoadingMain", true);
          let data = _.cloneDeep(this.step1tab1);
          var rs = _.find(data.arrSalesCycle, function(o) {
            return o.code == data.salesCycle;
          });
          let code = _.map(this.step1tab3.conds);
          let obj = {
            year: rs.fiscal_year,
            cycle: rs.fiscal_cycle,
            group_code: this.step1tab2.team,
            condition_detail: this.arrCondsDetail,
            start_date: rs.start_date,
            end_date: rs.end_date,
            data_recipient: this.step1tab2.arrTeamDetail,
            ms_tactics_code: code,
            action : 'next'
          };
          service
            .getHead(obj)
            .then(response => {
              var clsStep = document.getElementsByClassName("md-step-header");
              clsStep[1].click();
              document.getElementsByTagName("html")[0].style =
                "overflow-y:scroll";
              var html = document.documentElement;
              html.scrollTop = 0;
              response.events = "next";
              t.$store.dispatch("incentive/getStep2Master", response);
              t.$store.commit("incentive/setLoadingMain", false);
            })
            .catch();
        }
      }
    },

    saveTab() {
      let t = this;
      t.$store.commit("incentive/setLoadingMain", true);
      let data = _.cloneDeep(this.step1tab1);
      var rs = _.find(data.arrSalesCycle, function(o) {
        return o.code == data.salesCycle;
      });
      let code = _.map(this.step1tab3.conds);
      let obj = {
        year: rs.fiscal_year,
        cycle: rs.fiscal_cycle,
        group_code: this.step1tab2.team,
        condition_detail: this.arrCondsDetail,
        start_date: rs.start_date,
        end_date: rs.end_date,
      };
      service
        .saveStep3(obj)
        .then(response => {
          t.$store.commit("incentive/setLoadingMain", false);
        })
        .catch();
      
    },

    getStep1Tab2(mode) {
      let data = _.cloneDeep(this.step1tab1);
      let data2 = _.cloneDeep(this.step1tab2);
      var rs = _.find(data.arrSalesCycle, function(o) {
        return o.code == data.salesCycle;
      });
      if (mode == "dropdown") {
        this.count_team = 0
        if (!_.isUndefined(rs)) {
          service
            .step1tab2dp({ start_date: rs.start_date, end_date: rs.end_date })
            .then(response => {
              data2.arrTeam = response;
              if (_.isUndefined(this.defaultStep.group_code)) {
              }
              var rs = _.find(response, function(o) {
                return o.code == data2.team;
              });
              if (_.isUndefined(rs)) {
                if (response.length > 0) {
                  data2.team = response[0].code;
                } else {
                  data2.team = "";
                }
              } else {
                data2.team = rs.code;
              }
              this.$store.commit("incentive/setDataStep1tab2", data2);
            })
            .catch();
        }
      } 
      // else {
        service
          .step1tab2({
            start_date: rs.start_date,
            end_date: rs.end_date,
            code: this.step1tab2.team
          })
          .then(response => {
            this.tab2allchk =
              response.count == response.data.length && response.count > 0
                ? true
                : false;
            data2.arrTeamDetail = response.data;
            data2.arrTeamDetailTemp = response.data;
            this.$store.commit("incentive/setDataStep1tab2", data2);
          })
          .catch();
      // }
    },
    openTab(step) {
      if (step == 2) {
        if (this.arrTeamDetail.length == 0) {
          this.tab = 0;
          this.snkTitle = "Please press NEXT button";
          this.$refs.snackbar.open();
        } else {
          let filt = _.filter(this.arrTeamDetail, item => {
            if (item.checked) {
              return true;
            }
          });
          if (filt.length == 0) {
            this.snkTitle = "Please select recipient.";
            this.$refs.snackbar.open();
            this.tab = 1;
          } else {
            this.tab = step == this.tab ? null : step;
          }
        }
      } else if (step == 1) {
        this.getStep1Tab2("dropdown");
        this.tab = step == this.tab ? null : step;
      } else {
        this.tab = step == this.tab ? null : step;
      }
    },
    selectedDelDate(value) {
      let news = moment(value).format("YYYY/MM/DD");
      let end = moment(this.arrSalesCycle[0].end_date).format("YYYY/MM/DD");
      if (news > end) {
        this.step1tab1.payDate = news;
      } else {
        console.log("2 >>>");
      }
    },
    formatterDate(date) {
      let checkFM = moment(date, [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss"
      ]).format();

      if (checkFM == "Invalid date") {
        return "";
      } else {
        return moment(date).format("DD MMM YYYY");
      }
    }
  },
  created() {
    //console.log("STEP1 >>>");
  }
};
</script>
<style lang="scss" scoped>
#sales-incen-stapone {
  .md-spinner {
    display: unset;
    position: absolute;
  }
}
.step1tab2-team-chip {
  background: #66bb6a;
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}
.step1tab2-unteam-chip {
  background: #a8a8a8;
  color: #ffffff;
  font-size: 9px;
  border-radius: 16px;
  text-align: center;
  height: 18px;
  line-height: 1.4;
}
</style>
