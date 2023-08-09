<template>
  <div id="a" style="display : flex" class="md-period-box" @mouseleave="mouseLeave">
    <!-- <div class="left-box"> -->

      <div style="width: 100%;" class="md-layout">
        <div  class="c" style=";width: 14%; background-color:">
             <div style="width:100%;background:white;padding:5px 10px 5px 10px; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
              <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
               
               <div id="orderhis_select_order"></div>
                <md-select   style=""  v-model="filter_search.source">
                  <md-option
                    style="width:auto"
                    :value="row.code"
                    v-for="(row ,index) in orderSource"
                    :key="'orderSourceList-hix'+index"
                    @click.native="filtersearch(row.code , index)"
                  >{{row.title}}</md-option>
                </md-select>
              </md-input-container>
            </div>
        </div>
 
       
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
        
        <div style="width:16%;background:;padding:5px 15px; margin-left:1%; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
            <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
              <md-select v-model="dpFilter">
                    <div id="orderhis_select_date"></div>
                  <md-option
                    style="width:150px"
                    :value="row.code"
                    v-for="(row ,index) in TypeDate"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectTypeDate(row.name , index)"
                  >{{row.name}}</md-option>
              </md-select>
            </md-input-container>
        </div>

         <div style="font-size:18px;width:15%;background:;padding:5px 10px; margin-left:1%; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
            <md-input-container class="md-sel" style="margin:0px;padding-top:0px;min-height:100%">
              <md-select v-model="group_cus">
                <div id="orderhis_select_channel"></div>
                 <md-option
                    style="width:150px"
                    :value="row.code"
                    v-for="(row ,index) in arr_channel"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectChannelGroup(row.name , index)"
                  >{{row.name}}
                  </md-option>
              </md-select>
            </md-input-container>
          </div>
            <div style="font-size:10px;width:27%;background:;padding:5px 10px; margin-left:1%; border-radius:4px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);">
            <md-input-container
              class="md-sel"
              :style="{
                'pointer-events':group_cus == 'MTT'?'' : 'none',
                'color':group_cus == 'MTT'?'' : '#727272',
                'opacity': group_cus == 'MTT'?'' : '0.5'
              }"
               style="
               margin:0px;
               padding-top:0px;
               min-height:100%">
              <md-select
               v-model="corporate"
               >
                <md-option v-if="channelCrop.length == 0" value=""> Select Corporate</md-option>
                <div id="orderhis_select_corp"></div>
                 <md-option
                    :value="row.name"
                    v-for="(row ,index) in channelCrop"
                    :key="'channelCrop-hix'+index"
                    @click.native="selectChannel(row , index)"
                  >{{row.name}}</md-option>
              </md-select>
            </md-input-container>
          </div>
    

        <div style="background-color:;width: 90%; margin:10px 0 0 0;">
            <div class="center-box" style="margin-left:0px; margin-right: 0px; height:45px;width:100%;">
              <md-card style="background:unset;box-shadow:unset;overflow:hidden">
                <md-card-content style="padding:0px;">
                  <div class="floating-box-big" style="display:-webkit-box;width:100%;overflow: hidden;">
                    <div style="width:15%;padding-left: 5px;">
                      <md-input-container class="" style="margin:0px;min-height:100%">
                        <label style="font-size:11px;">PO No.</label>
                        <md-input  id="orderhis_input_po_no"  v-model="poNo"></md-input>
                      </md-input-container>
                      
                    </div>
                    <div style="width:15%; padding-left: 30px;">
                      <md-input-container class="" style="margin:0px;min-height:100%">
                        <label style="font-size:11px;">Order No.</label>
                         <md-input id="orderhis_input_order_no" v-model="OrderNo"></md-input>
                      </md-input-container>
                    </div>
                    <div style="width:20%; padding-left: 30px; ">
                      <md-input-container class="" style="margin:0px;min-height:100%">
                        <label style="font-size:11px;">Invoice No.</label>
                         <md-input id="orderhis_input_invoice" v-model="invNo"></md-input>
                      </md-input-container>
                    </div>
                    <div style="width:25%; padding-left: 30px;">
                      <md-auto-search-box-sm
                        :placeholder="'Salesman'"
                        :data="listAutoSM"
                        :value="smTitle"
                        @filter="filterSM"
                        @choose="chooseSM"
                        :disabled="disabledSM"
                      ></md-auto-search-box-sm>
                    </div>
                    <div style="width:25%; padding:0 30px 0 30px;">
                      <md-auto-search-box
                         id="orderhis_input_customer"
                        :placeholder="'Customer'"
                        :data="listAutoCust"
                        :value="custTitle"
                        @filter="filterCust"
                        @choose="chooseCust"
                        :disabled="false"
                      ></md-auto-search-box>
                    </div>
                    
                  </div>
                </md-card-content>
              </md-card>
           </div>
        </div>
        <div style="display: flex;justify-content: flex-end; background-color:;width: 10%;margin:0 0 0 0;">
          <div class="text-center" style="display: flex;align-items: flex-end;width:100%;height:100%; padding-left: 0px;">
              <md-button
                id="orderhis_search"
                :class="'-orange'"
                style="margin:unset;border-radius:3px;font-size: 12px;min-width: 100%;padding:0px 5px 0px 0px;width: 100%;"
                @click="searchHistory"
              >
                <md-icon id="orderhis_search">search</md-icon>
                search
              </md-button>
                    </div>
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
    this.$store.dispatch('history/getTimeServer')
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

  // 23 Nov 2021 - 23 Nov 2021
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
      // dpSource: ""
      // dpSource: "salesops"
      arr_channel:[  
        {code:'all',name:'All Channel'},
        {code:'TT',name:'TT'},
        {code:'MTT',name:'MTT'},
      
      ],
      TypeDate:[  
        {code:'po_date',name:'PO. DATE'},
        {code:'inv_date',name:'Invoice Date'},
        {code:'delivery_date',name:'Delivery Date'},
      
      ],
    };
  },
  computed: {
    summary() {
      return this.$store.getters["history/summary"];
    },
    channelCrop() {
      return this.$store.getters["history/channelCrop"];
    },
    listAutoSM() {
      let list = this.$store.getters["history/listAutoSM"];
      let department = Vue.localStorage.get("department");
      if (list.length == 1 && department == "SM") {
        this.smTitle = list[0].code + " " + list[0].title;
        this.smCode = list[0].code;
        this.disabledSM = true;
      }
      return this.$store.getters["history/listAutoSM"];
    },
    listAutoCust() {
      return this.$store.getters["history/listAutoCust"];
    },
    filter_search() {
      return this.$store.getters["history/filter_search"];
    }
  },
  methods: {
    filterCust: function(param) {
      if (param.length > 1) {
        this.custCode = param;
        this.$store.dispatch("history/filterCustomer", param);
      } else if (param.length == 0) {
        this.custCode = "";
        this.custTitle = "";
      }
    },
    filterSM: function(param) {
      if (param.length > 1) {
        this.smCode = param;
        let res = {
          keyword :param,
          view:'history'
        }
        this.$store.dispatch("history/filterSaleman", res );
      } else if (param.length == 0) {
        this.smCode = "";
        this.smTitle = "";
      }
    },
    chooseSM: function(item) {
      this.smCode = item.code;
      this.smTitle = item.code + " " + item.title;
    },
    chooseCust: function(item) {
      this.custCode = item.code;
      this.custTitle = item.code + " " + item.title;
    },
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
    selectChannelGroup(param ,indexs){
      document.getElementById('orderhis_select_channel').click()
      let items = this.arr_channel
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.arr_channel = items

      this.$store.dispatch("history/ediCorporateCode",this.group_cus);


        if(this.group_cus != 'MTT'){
        this.corporate = ''
        this.corpName = ''
      }else {
        this.corporate = 'All Corporate'
      }
      this.channel = this.group_cus
    },
    selectTypeDate(param , indexs){
      document.getElementById('orderhis_select_date').click()
      let items = this.TypeDate
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.TypeDate = items
    },
    hideCalendar: function() {
      this.showmonth = false;
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    showInpoutName(input) {
      if (typeof this.disableFrom[input] != "undefined") {
        return this.disableFrom[input].title;
      } else {
        return "";
      }
    },
    filtersearch(input , indexs) {
      document.getElementById('orderhis_select_order').click()
      // console.log(input)
      let items = this.orderSource
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.orderSource = items
  
      if(input == 'edi'){
        let sub_menu_edis = JSON.parse(Vue.localStorage.get("sub_menu_edi"))
        let row = _.find(sub_menu_edis, function (o) {
          return o.m_code == "orderhistory"
        })
        location.href = 'edi/#/order-history';
        // if (!_.isUndefined(row)) {
        //   var m_path = row.m_path.replace("/edi/", "");
        //   location.href = 'edi/#/'+ m_path;
        //   // window.open('edi/#/' + m_path);
        // }else{
        //   this.textSnackBar = 'Please check permissions "Menu access".'
        //   this.$refs.snackbar.open()
        // }

      }
    },
    selectChannel( param , indexs ){
      document.getElementById('orderhis_select_corp').click()
      let items = this.channelCrop
      let index = indexs
      let tmp = items.splice(index, 1)
      items.unshift(tmp[0])
      this.$store.commit('history/setChannelCrop' ,items )
      // this.channelCrop = items

        if(param.id === 'all'){
        this.corpName = ''
      }else {
         this.corpName = param.id
      }
    }
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

