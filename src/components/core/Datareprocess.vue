<template>
  <div id="pageDepartment">
    <md-layout md-gutter class="mh-0">
      <md-layout md-column md-gutter md-flex="25">
        <menu-left></menu-left>
      </md-layout>
        
      <md-layout md-column md-gutter md-flex="75" style="padding-left: 1%">
        <md-layout style="flex: initial;padding:0 0 0 30px">
          <div class="title">{{ title }}</div></md-layout>
        
        <md-layout
          style="flex: initial;margin-left:2%"
          md-align="center"
          class="cust-list-box"
          v-if="1!=1"
        >
          <span class="nodata">No data</span>
        </md-layout>
        <md-layout
          style="flex: initial; margin-left: 2%; margin-right: 5%"
          class="cust-list-box"
          v-else
        >
          <div style="padding:15px 60px 10px 0" class="head-table">
            <div  class="h_process"> Process</div>
            <div style="width:30%;" >
            </div>
            <div class="h_status">Status</div>
            <div class="h_time"> Time Span</div>
            <div style="width: 7%; "></div>
            <div style="width: 7%;"></div>
          </div>
          <div style="width: 100%; padding:0 60px 0 0"> <hr style="background-color:#D1D1D1"></div>
          
          <div
            class="body-deatil"
            style=" padding-right:30px;"
            @scroll="handleScroll"
          >
          <md-spinner style="z-index: 6;"
          :md-size="150"
          :md-stroke="1"
          v-show=" this.$store.getters.loading"
          md-indeterminate
        ></md-spinner>
            <div
              class="detail-table"
              :style="{
                'padding-bottom': '13px',
                'padding-top': '15px',
                'border': '1px solid #EFEFEF',
                'border-width': '0 0 1px 0'
              }"
              v-for="(item, index) in list_detail"
              :key="index">
              <div class="name" >{{ item.name }}</div>


              <div v-if="item.param ==0 " class="desc">{{ item.desc }}</div>
              <div v-else class="desc" > 
                   <md-input-container class="-no-line -search" style="width:80%; margin: 0px">
                  <md-input
                   :placeholder="item.desc"
                   v-on:change="key_pono"
                   v-model="item.value_input"
                   >
                   </md-input>
                   </md-input-container>
                   <div
                      class="md-error"
                      style="bottom: -25px; opacity: inherit; color: #f44336"
                      v-if="
                       validInp && item.index == error_index
                      "
                    >
                      {{ warningText }}
                    </div>
              </div>

              <div class="status">{{item.status}}</div>
              <div class="" style="width: 28%">
                 <md-layout>
                     <div style="padding:0 5px 0 0 ;width: 49%;text-align:right">{{ formatTime(item.time_span_start)}}</div> 
                     <div style="width: 2%;">-</div>
                     <div style="padding:0 0 0 5px;width: 49%;text-align:left">{{ formatTime(item.time_span_end)}} </div>
                 </md-layout>
              </div>
              <div style="width: 7%">
            <div 
             @click="sync(item)"
             style="
             background: #FD7F00 0% 0% no-repeat padding-box;
              height: 36px;
              border-radius: 3px;
              opacity: 0.9;
              margin-left:10px;
              width:36px;
              cursor: pointer;
              display:flex;
              align-content: center;
              justify-content: center;
              align-items: center;"
              >
                <md-icon  style="margin:0;cursor: pointer;font-size:23px;color:#fff;">sync</md-icon>
             <md-tooltip  style="height: auto; white-space: normal; max-width:30%;"  md-delay="100" md-direction="top"> <span class="kanitFont">Sync data</span></md-tooltip> 
             </div>
             </div>
              <div style="width: 7%" >
            <div 
            @click="hisyory_log(item)"
              style="
              background: #A8A8A8 0% 0% no-repeat padding-box;
              height: 36px;
              border-radius: 3px;
              opacity: 0.9;
              margin-left:10px;
              width:36px;
              cursor: pointer;
              display:flex;
              align-content: center;
              justify-content: center;
              align-items: center;"
              >
           <md-icon style="margin:0;cursor: pointer;font-size:23px;color:#fff;">priority_high</md-icon>
             </div>
              </div>
            </div>
          </div>
        </md-layout>
      </md-layout>

       <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="dialog-log"
      id="dialog_data_transfer"
    >
      <md-dialog-title style="margin:0 0 5px 0;padding:0;background-color:#EFEFEF">
         <md-layout>
          <md-layout
            md-flex="90"
            style="padding:20px 0 20px 20px;display: -webkit-box; overflow: hidden"
          >
            <div class="title" style="font-size:16px;color:#;opacity: 0.8;">Log Re-process Stock</div>
          </md-layout>
          <md-layout style="" md-flex="10" md-align="end">
            <md-button class="md-icon-button" @click="closeDialog('dialog-log')">
              <md-icon style="color:#6B6B6B;padding:10px 0 0px 0px;">close</md-icon>
              <md-tooltip md-direction="right">close</md-tooltip>
            </md-button>
          </md-layout>
        </md-layout>
      
      </md-dialog-title>
      <md-dialog-content style="overflow: hidden;"  class='scro'>

<div  style="padding-left:30px;">

  
    <md-layout>
        <div  style="font-size:12px;color:#ADADAD;width:165px;padding:0 0 0 0">Sync Date</div>
        <div style="font-size:12px;color:#ADADAD;padding:0 0 0 0">Sync Date</div>
      </md-layout>
        <md-layout style=" height: 35px;">
          <div  style=" border:0px;height: 100%; width: 130px;" >
            <div style="height: 35px;border:0.5px solid #CCCCCC ; border-radius:4px;  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16); width: 100%">
                <div style=" height:35px;width: 100%; display: flex">
                  <div
                    :style="{
                      cursor: 'pointer',
                    }">
                    <md-input-container
                    style="padding:0;margin:0"
                    >
                      <datepicker
                      :disabledDates =" {
                        from: new Date(this.select_end_date)
                       }"
                        id="log_stock_start"
                        :value="select_start_date"
                        @selected="selectedDelDateIn"
                        :format="customFormatter"
                      ></datepicker>   
                    </md-input-container>
                  </div>
                  <div style="
                  display: flex;
                  justify-content: flex-end;
                  width: 100%;
                  padding-right: 5px;"
                  @click="showDatepicker('in')">
                    <div
                      class="icon-time calender"
                      :style="{
                        border:'0',
                        display: 'flex',
                        cursor: 'pointer',
                      }"
                    >
                      <md-icon style="color:#BFBFBF;font-size:22px; ">event</md-icon>
                    </div>
                  </div>
                 
                </div>
              </div> 
          </div>
          <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          color:#6B6B6B;
          background-color:"> 
           to 
           </div>

        <div style=" height: 100%; width: 130px;" >
            <div style="height: 35px;border:0.5px solid #CCCCCC ; border-radius:4px;  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16); width: 100%">
                <div style="background-colorred; height:35px;width: 100%; display: flex">
                  <div
                    :style="{
                      cursor: 'pointer',
                    }">
                      <md-input-container
                    style="padding:0;margin:0"
                    >
                      <datepicker
                      :disabledDates =" {
                        to: new Date(this.dis_end_date)
                       }"
                        id="log_stock_start"
                        :value="select_end_date"
                        @selected="selectedDelDateIn_end"
                        :format="customFormatter"
                      ></datepicker>
                      </md-input-container>
                  </div>
                  <div style="
                  display: flex;
                  justify-content: flex-end;
                  width: 100%;
                  padding-right: 5px;"
                  >
                    <div
                      class="icon-time calender"
                      :style="{
                        border:'0',
                        display: 'flex',
                        cursor: 'pointer',
                      }"
                    >
                      <md-icon style="color:#BFBFBF;font-size:22px; ">event</md-icon>
                    </div>
                  </div>
                </div>
              </div> 
        </div>

          <div style="
          display: flex;
          align-items: center;
          width: 6%;" >
            <div 
             @click="search_log()"
             style="
             background: #FD7F00 0% 0% no-repeat padding-box;
              height: 35px;
              border-radius: 3px;
              opacity: 0.9;
              margin-left:10px;
              width:35px;
              cursor: pointer;
              display:flex;
              align-content: center;
              justify-content: center;
              align-items: center;"
              >
                <md-icon  style="margin:0;cursor: pointer;font-size:22px;color:#fff;">search</md-icon>
             </div>
          </div>

        </md-layout>
      </div>    
    <md-layout
      :style="{ margin:this.$store.getters.logs.length > 8 ? '12px 10px 10px 0' : '12px 0 10px 0' }"
     > 
      <div  style="background-color:;width: 15%;" class='h_table'>Code</div>
      <div style="background-color:;width: 10%;" class='h_table'>Status</div>
      <div style="background-color:;width: 22%;" class='h_table'>Start date</div>
      <div style="background-color:;width: 21%;" class='h_table'>End date</div>
      <div style="background-color:;width: 15%;" class='h_table'>Type</div>
      <div style="background-color:;width: 15%;" class='h_table'>User Sync</div> 
    
    
    </md-layout>

    <div style="    
    display: flex;
    align-content: flex-end;
    justify-content: space-around;"
    >
       <md-spinner 
       style="position: absolute;"
          :md-size="150"
          :md-stroke="1"
          v-show=" this.$store.getters.loading_history"
          md-indeterminate
        ></md-spinner>
    </div>

   

    <div class="row_detail" style="display: flex;justify-content: space-around;" v-if="this.$store.getters.check_detail_log"> No history...</div>
    <div v-else class="scro" 
    :style="{ 
       height: '75%', 
       'overflow-y': this.$store.getters.logs.length > 9 ? 'scroll' : 'hidden'
       }" >
        <md-layout
        style="font-size:14px;padding:0px 0 10px 0;color:#5A5A5A ;"
      v-for="(item, index) in this.$store.getters.logs"
      :key="index"
   > 
      <div  style="background-color:;width: 15%;" class='row_detail'>{{item.code}}</div>
      <div style="background-color:;width: 10%;" class='row_detail'>{{item.status}}</div>
      <div style="background-color:;width: 22%;" class='row_detail'>{{format_date_view(item.startdate)}}</div>
      <div style="background-color:;width: 21%;" class='row_detail'>{{format_date_view_end(item.enddate)}}</div>
      <div style="background-color:;width: 15%;" class='row_detail'>{{item.type}}</div>
      <div style="background-color:;width: 15%;" class='row_detail'>{{item.emp_id}}</div> 
    
    
    </md-layout>
    </div>
  
      </md-dialog-content>
      <!-- <md-dialog-actions style="cursor: pointer;">
        <md-button  @click="closeDialog('dialog-log')">
          <label style="cursor: pointer;color: #fd7f00">OK</label>
        </md-button>
      </md-dialog-actions> -->
    </md-dialog>

     <!--Start snackbar-->
      <md-snackbar :md-position="snk.vertical + ' ' + snk.horizontal" ref="snackbar" :md-duration="snk.duration">
        <span>{{snk.txt_warning}}</span>
        <md-button class="md-accent" @click="snack_bar('close')" style="color:#FD7F00">OK</md-button>
      </md-snackbar>
    <!--End snackbar-->

    </md-layout>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
let date = new Date();
import ClickOutside from "vue-click-outside";
export default {
  name: "setting-datareprocess",
  data() {
    return {
      title: "DATA RE-PROCESS",
      val_pono:'',
      warningText:"Please input data",
      validInp:false,
      error_index:'',
      select_start_date: moment(date).format("YYYY-MM-DD"),
      select_end_date: moment(date).format("YYYY-MM-DD"),
      popupIn: false,
      mst_customer:'',

      snk:{
        vertical: 'top',
        horizontal: 'center',
        duration: 4000,
        txt_submit : 'Agree',
        txt_warning : '',
        mode: ''
      },
      dis_end_date:moment(date).format("YYYY-MM-DD")
    };
  },
  computed: {
    
    list_detail() {
      return this.$store.getters["list_detail"];
    },
  },
  methods: {

     customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },
     selectedDelDateIn(value) {

      this.select_start_date = moment(value).format("YYYY-MM-DD");
      this.dis_end_date = moment(value).format("YYYY-MM-DD")
      this.checkDateRange();
    },
     selectedDelDateIn_end(value) {
      this.select_end_date = moment(value).format("YYYY-MM-DD");
      this.checkDateRange();
    },
     checkDateRange(){
      var m1 = moment(this.select_start_date , 'YYYY-MM-DD'); 
      var m2 = moment(this.select_end_date, 'YYYY-MM-DD'); 
      var m3 = m2.diff(m1,'minutes'); 
      var numdays = Math.floor(m3 / 1440); 
     
      if(numdays<0){
       numdays= numdays*-1
      }
      if(numdays >= 31){
        this.snk.txt_warning='Date range not exceed 31 days'
        this.$refs.snackbar.open();
      }
    },
     search_log(){

    //Check Range Day +-31 Days --start--
      var m1 = moment(this.select_start_date , 'YYYY-MM-DD'); 
      var m2 = moment(this.select_end_date, 'YYYY-MM-DD'); 
      var m3 = m2.diff(m1,'minutes'); 
      var numdays = Math.floor(m3 / 1440); 
      if(numdays<0){
       numdays= numdays*-1
      }
      if(numdays>=31){
        this.snk.txt_warning='Date range not exceed 31 days'
        this.$refs.snackbar.open();
      }else {
          this.$store.dispatch('historyLog',{
          code:this.mst_customer,
          start_date:this.select_start_date,
          end_date:this.select_end_date
        })
      }
    //--end--

    },
     
     closeDialog(param){

    var  startdate = date;
    var new_date = moment(startdate, "DD-MM-YYYY");
    new_date.subtract(1, 'days');
    this.select_start_date = moment(new_date).format('YYYY-MM-DD')
    this.select_end_date = moment(startdate).format('YYYY-MM-DD')
 
    this.$refs[param].close();
    },
     snack_bar( param ){
        if(param === 'open'){
          this.$refs.snackbar.open();
        }else {
          this.$refs.snackbar.close();
        }
   },


    handleScroll(event) {
    },
     formatTime(value) {
         var les ='...'
         if(moment(new Date(value)).format("yyyy") != 'Invalid date'){
             les = moment(new Date(value)).format("HH:mm:ss")
         }
      return les ;
    },
    sync( param ){
      
      param.time_span_end = '...'
        if(param.value_input == '' && param.param == 1){
            this.validInp = true
            this.error_index = param.index
        }else {
          param.status ='In progress'
             this.$store.dispatch('runApi_R',{
            code:param.process,
            param:param.value_input
        })
        this.error_index = ''
        this.validInp = false
        }
    },
      format_date_view(date){
      var rs = '-'
      if(moment(date).format("DD/MM/YYYY HH:mm:ss") === 'Invalid date'){
        rs ="-"
      }else {
        rs = moment(date).format("DD/MM/YYYY HH:mm:ss" )
      }
      return rs;
    },
    format_date_view_end(date){ 
      var rs = '-'
      if(moment(date).format("DD/MM/YYYY HH:mm:ss") === 'Invalid date'){
        rs ="-"
      }else {
        rs = moment(date).format("DD/MM/YYYY HH:mm:ss" )
      }
      return rs;
    },

    hisyory_log( param ){
    this.mst_customer = param.process
  
        this.$store.dispatch('historyLog',{
          code:param.process,
          start_date:this.select_start_date,
          end_date:this.select_end_date
        })
    this.$refs["dialog-log"].open();
        // this.$store.dispatch('historyLog',{code:param.process})
    },closeDialog(param){
        this.select_start_date = moment(date).format('YYYY-MM-DD')
        this.select_end_date = moment(date).format('YYYY-MM-DD')
        this.$refs[param].close();
    },
    key_pono:function( item ){
        console.log("🚀 ~ file: Datareprocess.vue ~ line 521 ~ item", item)
        console.log(this.list_detail)
        this.validInp = false
        this.val_pono = item
    }
  },
  directives: {
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.$store.dispatch("setPathMenuService", "setting");
      this.login = true;
      // console.log(this.$store);
      this.$store.dispatch("listApi", "R");

    //   this.$store.dispatch("settingRole", "");
    //   this.$store.dispatch("settingCountRole");
    //   this.$store.dispatch("settingRoleSearch", {
    //     code: "",
    //     type: "",
    //     sort: "",
    //     orderby: "asc",
    //   });
      // this.fetchData()
    }
  },
  components: {
    Datepicker,
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
  },
};
</script>
<style>
.desc{       
    width: 29%;
    text-align: left;
    font: normal normal normal 14px/24px Roboto;
    letter-spacing: 0px;
    color: #727272;
    opacity: 1;
}
.name{
    width: 20%;
    text-align: left;
    font-family: Roboto;
    font: normal normal bold 14px/24px Roboto;
    letter-spacing: 0px;
    color: #727272;
    opacity: 1;
}
.status{
    width: 8%;
    text-align: center;
    font: normal normal normal 14px/24px Roboto;
    letter-spacing: 0px;
    color: #727272;
    opacity: 1;
}
.h_process{
    width: 20%;
    text-align: left;
    font-weight: 450;
    font-size: 18px;
    font-family: Roboto;
    color: #414141;
    opacity: 1;
}
.h_status{
  width: 8%;
    text-align: center;
    font-weight: 450;
    font-size: 18px;
    font-family: Roboto;
    color: #414141;
    opacity: 1;
}
.h_time{
    width: 28%;
    text-align: center;
    font-weight: 450;
    font-size: 18px;
    font-family: Roboto;
    color: #414141;
    opacity: 1;
}
.h_table{
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    font-family: Roboto;
    color: rgb(114, 114, 114);
    opacity: 1;
}
.row_detail{
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    font-family: Roboto;
    color: rgb(65, 65, 65);
    opacity: 0.9;
}

/* width */
.scro::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.scro::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
.scro::-webkit-scrollbar-thumb {
   background-color: rgba(0, 0, 0, 0.11);
  border-radius: 5px;
}

/* Handle on hover */
.scro::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

</style>
