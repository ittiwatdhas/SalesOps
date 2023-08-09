<template>
  <div id="paymentreportPage">
    <div>
      <md-spinner
        style="position: absolute;padding-top:20%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="loadingMain"
        md-indeterminate
      ></md-spinner>
    </div>
    <div
      v-show="loadingMain"
      style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"
    ></div>
    <div style="display:flex;">
       <div  v-if="datasList.show_export_gsheet == true" style="width:100%;text-align:right;">
          <md-button :disabled="loadingMain"  class="-gray-A8"
            style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            @click="export_excel('google')"
          >SEND MAIL ( G - SHEET )</md-button>
      </div>
      <div v-if="datasList.show_export_gsheet == false" style="width:100%;text-align:right;"> </div>
      <div style="text-align:right;">
        <md-button :disabled="loadingMain" 
          :class="!loadingMain ? '-orange' : '-gray-A8'"
          style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
          @click="export_excel('excel')"
        >EXPORT ( XLS )</md-button>
      </div>  
    </div>
    <div
      class="mds-card head-box"
      style="margin-top:10px;width:100%;padding:10px 20px;margin-bottom:15px"
    >
      <div style="width:100%;display:flex;">
        <div style="width:10%;text-align:left">
          <div class="text-1">Year</div>
          <div class="text-2 no-under-line-dp" style="padding-right:10%">
              <md-input-container
                style="margin:0px;min-height:30px;padding-top:3px;height:30px;"
              >
                <md-select class="select-rep" v-model="dataDefault.year">
                  <md-option
                    v-for="(v, index) in datasList.years"
                    :value="v.code"
                    :key="index"
                    @click.native="chooseSelect('year')"
                  >
                    <template>
                      <div class="select-rep-2">
                        {{ v.name }}
                      </div>
                    </template></md-option
                  >
                </md-select>
              </md-input-container>
          </div>
        </div>
        <div style="width:15%;text-align:left;padding-left:5%">
          <div class="text-1">Cycle</div>
          <div class="text-2 no-under-line-dp">
            <md-input-container
                style="margin:0px;min-height:30px;padding-top:3px;height:30px;"
              >
                <md-select class="select-rep" v-model="dataDefault.cycle">
                  <md-option
                    v-for=" v in datasList.cycles"
                    :value="v.code"
                    :key="dataDefault.year+'_' + v.code"
                    @click.native="chooseSelect('cycle')"
                  >
                    <template>
                      <div class="select-rep-2">
                        {{ v.name }}
                      </div>
                    </template></md-option
                  >
                </md-select>
              </md-input-container>
          </div>
        </div>
        <div style="width:45%;text-align:left;padding-left:5%" class="no-under-line-dp">
          <div class="text-1">Sales Department</div>
          <md-input-container
            style="margin:unset;min-height:30px;padding:0px;max-width:610px">
            <md-select multiple v-model="team_select">
              <md-subheader
                @click.native="selecedAllTeam"
                :style="{
                  cursor: 'pointer',
                  'font-size': '16px',
                  'font-family': 'lato',
                  'font-weight': '600',
                  color: checkCol() ? '#fd7f00' : '#757575'
                }"
                class="mds-subheader"
                >Select All</md-subheader
              >
              <md-option
                @click.native="selecedTeam(row)"
                v-for="row in datasList.teams"
                :key="row.code"
                :value="row.code"
              >
                <template>
                  <div
                    style="display:-webkit-box;width:100%;padding-bottom:7px"
                  >
                    <div
                      :style="{
                        width: '200px',
                        'line-height': '1.4',
                        'white-space': 'initial',
                        'text-overflow': 'ellipsis',
                        display: 'block',
                        color: checkByList(teamListSelect, row.code)
                          ? '#fd7f00'
                          : 'black',
                        'padding-right': '5px',
                        overflow: 'hidden'
                      }"
                    >
                      {{ row.code }} {{ row.name }}
                    </div>
                    <!-- <div style="width:100px;padding-top:3px;">
                      {{ row.code }}
                    </div> -->
                  </div>
                </template>
              </md-option>
            </md-select> 
          </md-input-container>
        </div>
        <div 
          v-if="datasList.status_show == true"
          style="width:10%;text-align:left;padding-top: 10px;padding-bottom: 10px;padding-left: 20%;">
          <md-button
            class="-orange"
            style="height:30px;min-height:30px;margin:unset;border-radius:3px;font-size:12px;margin-right:10px;line-height:30px"
            @click="closing()"
          >UNLOCK</md-button>
        </div>
        <!-- <div 
          v-if="datasList.status_show == true"
          style="width:12%;text-align:left;padding-top: 15px;padding-bottom: 10px;">
          <div v-if="dataState.first_surname != '-' " style="color: #a8a8a8;">By ({{dataState.first_surname}})</div>
        </div> -->
      </div>
    </div>
    <div
      v-if="detailList.sales.length == 0"
      class="mds-card"
      style="color:rgba(0, 0, 0, .99);text-align:center;width:100%;padding:10% 0%;font-size:15px"
    >
      No data...
    </div>
    <div
      v-if="detailList.sales.length > 0"
      class="mds-card"
      style="margin-bottom:60px;width:100%;padding:16px 5px 5px 10px;display: block"
    >
      <div
        style="width:100%;display:flex;color:#A8A8A8;font-size:13px;font-family:roboto;padding-bottom:5px"
      >
        <div style="width:3%"></div>
        <div
          style="width:16%;justify-content:left;display:flex;cursor:pointer;color:#414141"
          @click="sortCol(2)"
        >
          Salesman
          <div style="padding-left:10px">
            <md-icon v-if="col2">arrow_drop_down</md-icon>
            <md-icon v-else>arrow_drop_up</md-icon>
          </div>
        </div>
        <div
          style="width:7%;justify-content:left;display:flex;cursor:pointer;color:#414141"
          @click="sortCol(3)"
        >
          <b>Paid</b>
          <div style="padding-left:10px">
            <md-icon v-if="col3">arrow_drop_down</md-icon>
            <md-icon v-else>arrow_drop_up</md-icon>
          </div>
        </div>
        <div style="width:7%;text-align:left"></div>
        <div style="width:7%;text-align:left">Actual Sales</div>
        <div style="width:7%;text-align:left"></div>
        <div style="width:7%;text-align:left">Target</div>
        <div style="width:7%;text-align:left"></div>
        <div style="width:7%;text-align:left">
          Sales
          <br />
          (&nbsp;{{ yearLable.sales_name }}&nbsp;)
        </div>
        <div style="width:7%;text-align:left"></div>
        <div style="width:7%;text-align:left">
          Year on Year
          <br />
          (&nbsp;{{ yearLable.year_now_name }}&nbsp;)
        </div>
        <div style="width:7%;text-align:left"></div>
        <div style="width:7%;text-align:left">
          Year on Year
          <br />
          (&nbsp;{{ yearLable.year_last_name }}&nbsp;)
        </div>
        <div style="width:2%;"></div>
      </div>
      <div id="detailList">
        <!-- <div
          v-for="(row, index) in detailList"
          :key="'con' + row.sm_code + '-' + index"
          style="width:100%; display:flex;margin-bottom:20px;"
        > -->
          <div style="width:100%;font-family:roboto">
            <!-- <div style="display:flex;padding:5px 0px 8px 10px;">
              <span style="font-weight:600;"
                >{{ row.group_code }}&nbsp;:&nbsp;{{ row.group_name }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="color:rgb(168, 168, 168);">{{
                formatterDate('latest', row.latest)
              }}</span>
            </div> -->
              <div
                v-for="(row2, index2) in detailList.sales"
                :key="'con' + row2.sm_code + '-' + index2 + '-' + index2"
                style="width:100%;"
              >
                <div style="width:100%;margin-top:5px;" class="row-2">
                  <div style="width:3%;padding-top:3px">{{ index2 + 1 }}</div>
                  <div
                    @click="hideDetail(index2)"
                    style="width:16%;text-align:left;font-family:kanit;padding-top:3px;cursor:pointer"
                  >
                    {{ row2.sm_code }}&nbsp;:&nbsp;{{ row2.sm_name }}
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <b>
                      {{ subPoint(row2.paid, 'front') }}
                      <span style="font-size:10px;">{{
                        subPoint(row2.paid, 'back')
                      }}</span>
                    </b>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.paid_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.actual, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.actual, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.actual_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.target, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.target, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.target_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.sales, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.sales, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.sales_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.year_now, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.year_now, 'back')
                    }}</span>
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    <span style="font-size:10px"
                      >%{{ fm(row2.year_now_percent) }}</span
                    >
                  </div>
                  <div style="width:7%;text-align:left;padding-top:3px">
                    {{ subPoint(row2.year_last, 'front') }}
                    <span style="font-size:10px">{{
                      subPoint(row2.year_last, 'back')
                    }}</span>
                  </div>
                  <div style="width:2%;cursor:pointer;text-align:end;">
                    <md-menu
                      md-direction="bottom left"
                      md-size="4"
                      style="height: 30px;"
                    >
                      <md-button
                        class="md-icon-button"
                        md-menu-trigger
                        style="margin:0px;"
                      >
                        <md-icon style="margin:0px;opacity:0.5"
                          >more_vert</md-icon
                        >
                      </md-button>
                      <md-menu-content>
                        <md-menu-item @selected="choose('paid', index2, index2)">
                          <span>Paid Details</span>
                        </md-menu-item>
                        <md-menu-item @selected="choose('actual', index2, index2)">
                          <span>Actual Sales Details</span>
                        </md-menu-item>
                      </md-menu-content>
                    </md-menu>
                  </div>
                </div>
                <div
                  v-if="
                    row2.show_detail == 'paid' || row2.show_detail == 'actual'
                  "
                  style="width:100%;padding:0px 45px 0px 23px;"
                >
                  <div style="display:flex;background:#F7F7F7;padding:5px;">
                    <div style="width:25%;text-align:right"></div>
                    <div style="width:25%;color:#A8A8A8;text-align:left;x">
                      <span v-if="row2.show_detail == 'paid'">PAID DETAILS</span>
                      <span v-else-if="row2.show_detail == 'actual'"
                        >ACTUAL SALES DETAILS</span
                      >
                    </div>
                    <div style="width:27%;text-align:right;padding-right:1%;">
                      <span
                        v-if="row2.show_detail == 'paid'"
                        style="color:#A8A8A8"
                        >(฿) PAID</span
                      >
                      <span
                        v-else-if="row2.show_detail == 'actual'"
                        style="color:#A8A8A8"
                        >(฿) SALES</span
                      >
                    </div>
                    <div style="width:18%;text-align:left;padding-left:5px">
                      <b>
                        {{ subPoint(row2.total_detail, 'front') }}
                        <span style="font-size:12px">{{
                          subPoint(row2.total_detail, 'back')
                        }}</span>
                      </b>
                    </div>
                    <div style="width:5%;"></div>
                  </div>
                </div>
                <div
                  v-for="(row3, index3) in row2.detail"
                  :key="'con3-' + index2 + '-' + index2 + '-' + index3"
                  :style="{
                    width: '100%',
                    'margin-top': '2px',
                    padding: '0px 43px 0px 23px',
                    'border-radius': ' 3px'
                  }"
                >
                  <div
                    class="row-2"
                    v-if="
                      row2.show_detail == 'paid' || row2.show_detail == 'actual'
                    "
                    :style="{
                      width: '100%',
                      'margin-bottom':
                        index3 == row2.detail.length - 1 ? '20px' : '0px',
                      display: 'flex'
                    }"
                  >
                    <div style="width:25%;text-align:right"></div>
                    <div
                      style="width:25%; display: flex;"
                    > 
                      <div :style="{
                          width: row2.show_detail == 'paid' ? '55%' : '70%',
                          'text-align': 'left',
                          'padding-top': '2px',
                          'font-family': 'kanit'
                        }">{{ row3.title }}
                      </div >
                      <div v-if="row3.type == 'count_items'"
                        style="text-align:left;padding-left: 10px;"
                        @click="showDetaill(index2, index3, 'info')"
                      >
                        <md-icon style="color:#A8A8A8;cursor:pointer">info</md-icon>
                      </div>
                      <div v-if="row3.type == 'count_items'"
                      style="text-align:left;padding-top:2px;font-family:kanit;padding-left: 3px;">
                      {{ subPoint(row3.count_item, 'front') }}
                      <span style="font-size:12px">{{
                        subPoint(row3.count_item, 'back')
                      }}</span>
                      items</div>
                    </div>
                    <div style="width:27%"></div>
                    <div
                      style="width:18%;text-align:left;font-size:15px;padding-top:2px;padding-left:5px"
                    >
                      {{ subPoint(row3.total, 'front') }}
                      <span style="font-size:12px">{{
                        subPoint(row3.total, 'back')
                      }}</span>
                    </div>
                    <!-- v-if="row3.type != 'actual_sales' " -->
                    <div v-if="row3.type != 'invoices' && row3.type != 'orders'"
                      style="width:5%;text-align:left;padding-top:3px"
                      @click="showDetaill(index2, index3)"
                    >
                      <md-icon style="color:#A8A8A8;cursor:pointer"
                        >keyboard_arrow_right</md-icon
                      >
                    </div>
                  </div>
                </div>
              </div>
          </div>
        <!-- </div> -->
      </div>
      <md-dialog
        md-open-from="#custom"
        md-close-to="#custom"
        ref="incentive-dialog-step3-full"
        id="incentive-dialog-step3-full"
      >
        <count-item-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></count-item-dialog>
        <tactics2-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></tactics2-dialog>
        <invoice-dialog
          :datas="datasComp"
          @close="closeDialog"
          @show="showItems"
          :groupCode="currentGroupCode"
        ></invoice-dialog>
      </md-dialog>
      <md-dialog
        md-open-from="#custom"
        md-close-to="#custom"
        ref="incentive-dialog-step3"
        id="incentive-dialog-step3"
      >
        <count-item-detail-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></count-item-detail-dialog>
        <tactics1-dialog
          :datas="datasComp"
          @close="closeDialog"
        ></tactics1-dialog>
        <add-deduction-dialog
          :datas="datasComp"
          @close="closeDialog"
          @seltopic="selTopic"
        ></add-deduction-dialog>
      </md-dialog>

      <md-dialog ref="md-confirm-dialog">
      <md-dialog-title>{{ titleCF }}</md-dialog-title>
      <md-dialog-content style="font-family:kanit;font-size:16px">{{
        detailCF
      }}</md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeDialog" v-if="titleButtonCencel != ''">{{
          titleButtonCencel
        }}</md-button>
        <md-button class="md-primary" @click="submitDG">{{
          titleButton
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import service from '@/services/planning/payment'
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Payment-report',
  data () {
    return {
      // step: null
      tableList: [],
      year_select: 2020,
      cycle_select: 4,
      team_select: [],
      col2: true,
      col3: true,
      choose_last: {
        mode: '',
        index: '',
      },
      datasComp: {
        head: {
          sm_code: '',
          sm_name: '',
          title: '',
          total: 0,
          count: 0,
          type: '',
          group_code: ''
        },
        detail: []
      },
      currentGroupCode:'',
      titleCF: '',
      detailCF: '',
      titleButton: '',
      titleButtonCencel: '',

    }
  },
  computed: {
    spinnerLoading() {
      return this.$store.getters["payment/spinnerLoading"];
    },
    loadingMain() {
      return this.$store.getters["payment/loadingMain"];
    },
    datasList() {
      return this.$store.getters["payment/datasList"];
    },
    dataDefault() {
      return this.$store.getters["payment/dataDefault"];
    },

    teamListSelect() {
      this.team_select = this.$store.getters["payment/teamListSelect"];
      return this.$store.getters["payment/teamListSelect"];
    },
    detailList() {
      return this.$store.getters["payment/detailList"];
    },
    yearLable () {
      return this.$store.getters["payment/detailList"].total_year
    },
    dataState () {
      return this.$store.getters["payment/datasList"].state;
    }
  },
  methods: {
    init () {

      this.$store.dispatch("payment/getDataDefault",'payment');
    },
    export_excel(type){
      let rs = this.dataDefault
      
      let team_check = _.cloneDeep(this.teamListSelect)
      let datasList = _.cloneDeep(this.datasList)
      let teamList = _.cloneDeep(this.datasList.teams)
      let department = Vue.localStorage.get("department");

      var team = ''
      for(var i = 0 ;i< team_check.length; i++){
        if(team == ''){
          team =  team_check[i]
        }else{
          team = team + ','+ team_check[i]
        }
      }

      // if(team_check.length == teamList.length){
      //   rs.teams = 'all'
      // }else{
        rs.teams = team
      // }
      if(department == 'MNG' && type == 'google'){
        this.$store.commit('payment/setLoadingMain', true)
        service
            .gSheetsAct(rs)
            .then(response => {
              this.$store.commit('payment/setLoadingMain', false)
            })
            .catch()
      }else{
        this.$store.commit('payment/setLoadingMain', true)
        rs.url = Vue.config["urlReport"] + "/payment-export-excel";
        rs.page = 'payment'
   
        this.$store.dispatch("payment/setExportReportService",rs);
      }  
    },
    chooseSelect (type){
      // console.log(type)

      let rs =  _.cloneDeep(this.dataDefault)
      // rs.team_select = this.team_select
      rs.view = 'payment'

      this.$store.commit('payment/setLoadingMain', true)
      let datasList = _.cloneDeep(this.datasList)

      let team_select = []
      if(type == 'year'){
        // console.log(datasList.team_arr[rs.year])
        datasList.cycles = []
        if(datasList.team_arr[rs.year]){
          _.forEach(datasList.team_arr[rs.year], function (values) {
            let obj_c = {
              code : values.code,
              name : values.name
            }
            datasList.cycles.push(obj_c) 
          })

        }
        if(datasList.cycles.length >0){
          rs.cycle =  datasList.cycles[datasList.cycles.length-1].code
        }

        if(datasList.team_arr[rs.year][rs.cycle]['teams'].length > 0){
          datasList.teams = datasList.team_arr[rs.year][rs.cycle]['teams']
        }

        _.forEach(datasList.teams, function (values) {
          if(values.checked == true){
            team_select.push(values.code)
          }
        })
        this.team_select = team_select
      }else if(type == 'cycle'){
        if(datasList.team_arr[rs.year][rs.cycle]['teams'].length > 0){
          datasList.teams = datasList.team_arr[rs.year][rs.cycle]['teams']
        }

        _.forEach(datasList.teams, function (values) {
          if(values.checked == true){
            team_select.push(values.code)
          }
        })
        this.team_select = team_select
      }
      this.$store.commit('payment/setDatasList', datasList);
      this.$store.commit('payment/setTeamListSelect', team_select)
      rs.team_select = this.team_select

      this.$store.commit('payment/setDataDefault',rs)

      service
        .getPaymentReportDetail(rs)
        .then(response => {
          datasList.status_show = response.status_show,
          datasList.state = response.state,
          this.$store.commit('payment/setDatasList', datasList);
          this.$store.commit('payment/setDetailList', response);
          this.$store.commit('payment/setLoadingMain', false)
        })
        .catch();
    },

    selecedTeam (val) {
      let rs = this.dataDefault
      let team_check = _.cloneDeep(this.teamListSelect)
      let teamList = _.cloneDeep(this.datasList.teams)
      this.$store.commit('payment/setLoadingMain', true)
      let result = []
      if (val == 'all') {
        team_check = [];
        _.forEach(teamList, function (values) {
          if(values.checked == true){
            team_check.push(values.code)
          }
        })

      }else if(val == 'unall'){
        team_check = [];
      } else {
        var findCode = _.findIndex(team_check, function (o) {
          return parseInt(o) == val.code
        })

        if (findCode >= 0) {
          _.remove(team_check, function (n) {
            return parseInt(n) == val.code
          })
        } else {
          team_check.push(val.code)
        }
        _.forEach(team_check, function (value, key) {
          let row = _.find(teamList, function (o) {
            return o.code == value
          })
          if (!_.isUndefined(row)) {
            result.push(row)
          }
        })
      }
      this.team_select = team_check
      this.$store.commit('payment/setTeamListSelect', team_check)
      let datasList = _.cloneDeep(this.datasList)
      rs.team_select = team_check
      rs.view = 'payment'
      service
        .getPaymentReportDetail(rs)
        .then(response => {
          datasList.status_show = response.status_show,
          datasList.state = response.state,
          this.$store.commit('payment/setDatasList', datasList);
          this.$store.commit('payment/setDetailList', response);
          this.$store.commit('payment/setLoadingMain', false)
        })
        .catch();
    },
    checkByList (arr, code) {
      let key = _.findIndex(arr, function (o) {
        return parseInt(o) == parseInt(code)
      })
      if (key >= 0) {
        return true
      } else {
        return false
      }
    },
    checkCol () {
      let team_check = _.cloneDeep(this.teamListSelect)
      let teamList = _.cloneDeep(this.datasList.teams)
      if (teamList.length == team_check.length) {
        return true
      } else {
        return false
      }
      // return true
    },
    selecedAllTeam (value) {
      let team_check = _.cloneDeep(this.teamListSelect)
      let teamList = _.cloneDeep(this.datasList.teams)
      if (
        teamList.length == team_check.length &&
        team_check.length > 0
      ) {
        team_check = []
        this.$store.commit('payment/setTeamListSelect', team_check)
        this.selecedTeam('unall')
      } else {
        this.selecedTeam('all')
      }
    },
    hideDetail (index) {
      let master = _.cloneDeep(this.detailList)
      if (master.sales[index].show_detail != '') {
        master.sales[index].show_detail = ''
      }
      this.$store.commit('payment/setDetailList', master)
    },

    sortCol (mode) {
      if (mode == 2) {
        this.col2 = !this.col2
      } else {
        this.col3 = !this.col3
      }
      let master = _.cloneDeep(this.detailList)
      let cols2 = this.col2 ? 'asc' : 'desc'
      let cols3 = this.col3 ? 'asc' : 'desc'
      // console.log(master.sales)
      // _.forEach(master.group, function (row) {
        if (mode == 2) {
          master.sales = _.orderBy(master.sales, ['sm_code'], [cols2])
        } else {
          master.sales = _.orderBy(master.sales, ['paid'], [cols3])
        }
      // })
      this.$store.commit('payment/setDetailList', master)
    },

    showItems (index) {
      if (!_.isUndefined(this.datasComp.detail[index])) {
        this.datasComp.detail[index].show_item = !this.datasComp.detail[index]
          .show_item
      }
    },

    choose (mode, index) {
      this.choose_last.mode = mode
      this.choose_last.index = index
      this.$store.commit('payment/setLoadingMain', true)
      let master = _.cloneDeep(this.detailList)
      master.sales[index].show_detail = mode
      let rs_sales = master.sales[index]

      if (!_.isUndefined(rs_sales)) {
        let obj = {
          document_id: rs_sales.document_id,
          year: rs_sales.fiscal_year,
          cycle: rs_sales.fiscal_cycle,
          group_code: rs_sales.group_code,
          start_date: rs_sales.start_date,
          end_date: rs_sales.end_date,
          sm_code: rs_sales.sm_code,
          button: mode == 'paid' ? 'paid_detail' : 'actual_sales_detail'
        }
        service
          .getStep3DetailByType(obj)
          .then(response => {
            master.sales[index].total_detail = response.total
            master.sales[index].detail = response.data

            this.$store.commit('payment/setDetailList', master)
            this.$store.commit('payment/setLoadingMain', false)
          })
          .catch()
      // } else {
      //   this.$store.commit('incentive/setDataStep3', master)
      }
    },
    showDetaill (index2, index3, type = null) {
      this.$store.commit('payment/setLoadingMain', true)
      let master = _.cloneDeep(this.detailList)

      // let mom = master.group[index]
      let sm = master.sales[index2]
      let detail = master.sales[index2].detail[index3]
      
      // let emp_ids = Vue.localStorage.get('emp_id')
      // if (!_.isUndefined(sm)) {
      //   emp_ids = sm.log_user
      // }
      var detail_type = (type !=  null)?detail.type+"_"+type : detail.type
      let obj = {

        year: sm.fiscal_year,
        cycle: sm.fiscal_cycle,
        group_code: sm.group_code,
        start_date: sm.start_date,
        end_date: sm.end_date,
        sm_code: sm.sm_code,
        button_id: detail.id,
        button_code: detail.code,
        button_type: detail_type,
        log_user: sm.log_user
      }
      this.currentGroupCode = sm.group_code
      let rsCycle = ''
      let detailsCode = []
      service
        .getPopupDetailByType(obj)
        .then(response => {
          let dropdown = []
          if (
            detail_type == 'additions_item' ||
            detail_type == 'deduction_item'
          ) {
            dropdown = {
              topic: response.topic,
              type: response.type
            }
          } else if (
            detail_type == 'invoices' ||
            detail_type == 'orders' ||
            detail_type == 'actual_sales'
          ) {
            rsCycle = _.find(response.cycle, function (o) {
              return o.select == true
            })

            for (let i = 0; i < response.detail.length; i++) {
              for (let j = 0; j < response.detail[i].item.length; j++) {
                detailsCode.push(
                  response.detail[i].cust_code +
                    '|' +
                    response.detail[i].item[j].inv_no
                )
              }
            }
          } else if (detail_type == 'tactics2' || detail_type == 'tactics1' || detail_type == 'count_items') {
            response.total = detail.total
          }

          // actual_sales
          // invoices
          // orders
          this.datasComp = {
            head: {
              sm_code: sm.sm_code,
              sm_name: sm.sm_name,
              title:
                detail_type == 'additions_item' ||
                detail_type == 'deduction_item'
                  ? 'Additions Items / Deduction Items'
                  : detail.title,
              total: _.isUndefined(response.total) ? 0 : response.total,
              dropdown:
                detail_type == 'additions_item' ||
                detail_type == 'deduction_item'
                  ? dropdown //response.dropdown
                  : [],
              count: _.isUndefined(response.count) ? 0 : response.count,
              type: detail_type,
              cycle: _.isUndefined(response.cycle) ? [] : response.cycle,
              cycle_id:
                _.isUndefined(rsCycle) || rsCycle == '' ? '' : rsCycle.cycle,
              docNo: detailsCode,
              group_code: sm.group_code,
            },
            detail: response.detail
          }
          // if (detail_type != "actual_sales") {
          this.openDG(detail_type)
          var body = document.getElementsByTagName('body')
          body[0].setAttribute('style', 'overflow: hidden !important;')
          if (
            detail_type == 'additions_item' ||
            detail_type == 'deduction_item'
          ) {
            this.calTopic()
          }
          // }
          this.$store.commit('payment/setLoadingMain', false)
          this.$store.commit('payment/setShowBar', false)
        })
        .catch()
    },

    calTopic (index) {
      let master1 = _.cloneDeep(this.datasComp.detail)
      let master = _.cloneDeep(this.datasComp.head.dropdown)
      if (master.type.length > 0) {
        let type1 = _.filter(master1, o => {
          if (o.type_id == master.type[0].code) {
            return true
          }
        })
        if (!_.isUndefined(master1[index])) {
          let typeName = _.filter(master.type, o => {
            if (o.code == master1[index].type_id) {
              return true
            }
          })
          this.datasComp.detail[index].type_name =
            typeName.length > 0 ? typeName[0].title : ''
        }
        let sumType1 = type1.reduce((acc, row) => acc + parseFloat(row.paid), 0)
        let type2 = _.filter(master1, o => {
          if (o.type_id == master.type[1].code) {
            return true
          }
        })
        let sumType2 = type2.reduce((acc, row) => acc + parseFloat(row.paid), 0)
        let step1 = -1 * sumType2
        this.datasComp.head.total = sumType1 + step1
      }
    },

    selTopic (indexs) {
      let master = _.cloneDeep(this.datasComp.head.dropdown)
      let key = this.datasComp.detail
      let lines = master.topic.findIndex(o => {
        return o.code === key[indexs].topic_id
      })
      if (lines > -1) {
        this.datasComp.detail[indexs].topic_name = master.topic[lines].title
      }
    },

    openDG (mode) {
      this.modeCF = mode
      if(mode == 'closing'){
        let teamList = _.cloneDeep(this.datasList.teams)
        this.$refs['md-confirm-dialog'].close()
        this.$store.commit('payment/setLoadingMain', true)
        let rs = this.dataDefault
        let _cycle = this.dataDefault.cycle
        let _year = this.dataDefault.year
        let sales_manager = ''
        // rs.team_select = this.team_select
        _.forEach(this.team_select, function (value, key) {
          let row = _.find(teamList, function (o) {
            return o.code == value
          })
          if (!_.isUndefined(row)) {
            sales_manager = row.code+' '+row.name
          }
        })
        this.titleCF = 'Do you want to UNLOCK '+sales_manager+', CYCLE '+_cycle+' YEAR '+_year+' ?'
        this.titleButton = 'OK'
        this.titleButtonCencel = 'CANCEL'
        this.$refs['md-confirm-dialog'].open()

      } else if (
        mode == 'count_items_info' ||
        mode == 'tactics2' ||
        mode == 'invoices' ||
        mode == 'actual_sales' ||
        mode == 'orders'
      ) {
        this.$refs['incentive-dialog-step3-full'].open()
        
      } else {
        this.$refs['incentive-dialog-step3'].open()
      }
    },

    closeDialog () {
      var body = document.getElementsByTagName('body')
      body[0].setAttribute('style', 'overflow-y: auto !important')
      body[0].setAttribute('style', 'overflow-x: hidden !important')
      if(this.modeCF == 'closing'){
        this.$refs['md-confirm-dialog'].close()
      }else if (
        this.modeCF == 'count_items_info' ||
        this.modeCF == 'tactics2' ||
        this.modeCF == 'invoices' ||
        this.modeCF == 'actual_sales' ||
        this.modeCF == 'orders'
      ) {
        this.$refs['incentive-dialog-step3-full'].close()
      } else {
        this.$refs['incentive-dialog-step3'].close()
      }
     this.$store.commit('payment/setLoadingMain', false)
    },

    closing (){
      // console.log("closing");
      this.openDG('closing')
    },
    submitDG () {
      if (this.modeCF == 'closing') {
        let datasList = _.cloneDeep(this.datasList)
        let teamList = _.cloneDeep(this.datasList.teams)
        this.$refs['md-confirm-dialog'].close()
        this.$store.commit('payment/setLoadingMain', true)
        let rs = this.dataDefault
        // rs.team_select = this.team_select
        _.forEach(this.team_select, function (value, key) {
          let row = _.find(teamList, function (o) {
            return o.code == value
          })
          if (!_.isUndefined(row)) {
            rs.team_select = row
          }
        })

        service
          .setUnlock(rs)
          .then(response => {
            this.$store.dispatch("payment/getDataDefault",'payment');
            // this.chooseSelect('all')
            // datasList.status_show = response.status_show
            // datasList.state = response.state
            // this.$store.commit('payment/setDatasList', datasList);
            this.$store.commit('payment/setLoadingMain', false)
          })
          .catch()
        
      }
    },

    subPoint (value, pos) {
      if (_.isNaN(parseFloat(value))) {
        return ''
      } else {
        let rs = this.fmFull(value)
        let master = rs.split('.')
        if (pos == 'front') {
          return master[0]
        } else {
          if (master.length > 1) {
            return '.' + master[1]
          } else {
            return ''
          }
        }
      }
    },
    fmInt (value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    fm (value) {
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    fmFull (value) {
      var test = value.toString().indexOf('.')
      if (test == -1) {
        return this.fmInt(value)
      } else {
        return this.fm(value)
      }
    },
    fmNumber (value) {
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    _export_excel (isXLSX = false) {
      let self = this
      let date = moment(new Date()).format('DDMMYYYYHHMM')
      let head_data = [
        '',
        'NO.',
        'Sales code',
        'Sales name',
        // "Group",
        'Fiscal cycle',
        'Fiscal year',
        'Actsales',
        'Target',
        'Paid',
        'Previous sales',
        'Previous year',
        'Current year'
      ]
      // for (var h = 0; h < this.tableList.length; h++) {
      //   self.JSONToExportConvertor(
      //     head_data,
      //     [self.tableList[h]],
      //     'payment_report_' + self.tableList[h].group_code + '_[' + date + ']',
      //     true
      //   )
      // }
      self.JSONToExportConvertor(
        head_data,
        self.tableList,
        'payment_report_[' + date + ']',
        true
      )
    },
    JSONToExportConvertor (HEADData, JSONData, ReportTitle, ShowLabel) {
      var arrData =
        typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
      var emp_id = Vue.localStorage.get('emp_id')
      var full_name =
        Vue.localStorage.get('first_name') +
        ' ' +
        Vue.localStorage.get('last_name')
      var data_export = ''
      data_export =
        'Payment report by Salesman ' +
        '\r\n' +
        'Export By : ' +
        emp_id +
        ' ' +
        full_name +
        '\r\n' +
        '\r\n'
      /**  MAIN TABLE */
      // let head = "A , B ,C";
      // data_export += head + "\r\n";

      /**  SUB TABLE */
      if (ShowLabel) {
        var row = ''
        for (var h = 0; h < HEADData.length; h++) {
          row += HEADData[h] + ','
        }
        row = row.slice(0, -1)
        data_export += row + '\r\n'
      }
      let datail = ''
      for (var h = 0; h < arrData.length; h++) {
        let head = 'Group code : ' + arrData[h].group_code
        data_export += head + '\r\n'

        let smList = arrData[h].smlist
        var no = 1
        for (var i = 0; i < smList.length; i++) {
          let col1 = smList[i].sales_code
          let col2 = smList[i].sales_name
          //let col3 = smList[i].group_code;
          let col4 = smList[i].fiscal_cycle
          let col5 = smList[i].fiscal_year
          let col6 = smList[i].actsales
          let col7 = smList[i].target
          let col8 = smList[i].paid
          let col9 = smList[i].previous_sales
          let col10 = smList[i].previous_year
          let col11 = smList[i].current_year
          // var order_no = item[l]["order_no"].toString();
          // var po_date = moment(new Date(item[l]["po_date"]))
          //   .format("DD/MM/YYYY")
          //   .toString();
          // var sm = item[l]["sm_code"].toString();
          // var price = item[l]["price"].replace(",", "");
          // var total = item[l]["total"];
          // var qty = item[l]["qty"];
          datail =
            '' +
            ', ' +
            no +
            ', ' +
            col1 +
            ',' +
            col2 +
            ',' +
            //col3 +
            //"," +
            col4 +
            ',' +
            col5 +
            ',' +
            col6 +
            ',' +
            col7 +
            ',' +
            col8 +
            ',' +
            col9 +
            ',' +
            col10 +
            ',' +
            col11
          datail.slice(0, datail.length - 1)
          data_export += datail + '\r\n'
          no++
        }
      }
      if (arrData.length == 0) {
        data_export += 'No Data...' + '\r\n'
      }
      var fileName = ReportTitle
      var universalBOM = '\uFEFF'
      var uri =
        'data:text/csv;charset=utf-8,' +
        encodeURIComponent(universalBOM + data_export)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = fileName + '.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      this.$store.dispatch('setPathMenuService', 'planning')
      this.init()
    }
  },
  components: {
    'count-item-dialog': require('./saleincentive-component/count-item-dialog'),
    'count-item-detail-dialog': require('./saleincentive-component/count-item-detail-dialog'),
    'tactics1-dialog': require('./saleincentive-component/tactics1-dialog'),
    'tactics2-dialog': require('./saleincentive-component/tactics2-dialog'),
    'add-deduction-dialog': require('./payment-component/add-deduction-dialog'),
    'invoice-dialog': require('./payment-component/invoice-dialog'),
    "md-comment-dialog": require("./saleincentive-component/md-comment-dialog")
  
  }
}
</script>
<style lang="scss" scoped>
#paymentreportPage {
  
  padding: 40px 30px;
  .md-spinner {
    display: unset;
    position: absolute;
  }
  .mds-card {
    width: 100%;
    background: #ffffff;
    border-radius: 3px;
    display: inline-grid;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    .mds-card-head {
      padding: 20px;
      display: flex;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .row-2 {
    display: flex;
    font-size: 12px;
  }

  .md-button.comment.md-icon-button {
      width: 24px;
      min-width: 24px;
      height: 24px;
      min-height: 24px;
      .md-icon {
        font-size: 13px;
        color: #ffffff;
        padding-top: 5px;
      }
    }
  #detailList {
    display: block; 
    overflow-y: scroll;
    height: 500px;

    &::-webkit-scrollbar {
        height: 7px;
        width: 6px;
        // background: #f7f7f7;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.11);
        border-radius: 5px;
      }
  }
}
</style>
