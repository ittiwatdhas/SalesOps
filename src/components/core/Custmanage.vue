<template>
  <div id="pageCustManage">
    
    <md-layout md-gutter class="mh-0">
     <md-layout md-column md-gutter md-flex="25">
      <menu-left></menu-left>
    </md-layout>

     <md-layout  md-column md-gutter md-flex="75" style="">
        <md-layout  style="flex: initial;padding-bottom:10px;padding-left:50px"><div class="title">{{title}}</div></md-layout>
         <md-layout  style="flex: initial;" class="search-cust-box">
             <div   style="width:29%;">
          <md-dropdown-box :data="this.$store.getters.custm_channel_list" @choose="set_channel" v-model="cus_list"></md-dropdown-box>
           </div>
        
         
            <div style="width:33%;background-color: ; padding-left:14px">
               <md-auto-search-box
            :placeholder="'All Customer'"
            :data="this.$store.getters.custm_customer_list"
            :value="customer_cus"
            @filter="searchCustomer"
            @choose="chooseCust_cus"
            :disabled="false"
          ></md-auto-search-box> 
            </div>

            <div style="width:33% ; padding-left:14px ; background-color:">
                <md-auto-search-box
            :placeholder="'All Province'"
            :data="this.$store.getters.custm_province_list"
            :value="customerProvince"
            @filter="filterCustProvince"
            @choose="chooseCustProvince"
            :disabled="false"
          ></md-auto-search-box>
            </div>


        </md-layout>


        <md-layout  style="flex: initial;width: 75%; " class="search-cust-box">
            <md-layout  class="md-report-bar">
              <md-layout md-flex-large="100" >
                <md-layout md-flex="17" style="padding-left:0px;background:;justify-content: center">
                    <div :class="btnType =='all' ?'title-text active':'title-text'" @click="selectType('all')">ALL</div>
                    <div class="title-number">{{formatNumber($store.getters.custm_all_cust)}}</div>
                </md-layout>
                <md-layout  md-flex="19" class="mr-3" style='background:;justify-content: center'> 
                    <div :class="btnType =='active' ?'title-text active':'title-text'"  @click="selectType('active')">ACTIVE</div>
                    <div class="title-number">{{formatNumber($store.getters.custm_active_cust)}}</div>
                </md-layout>
                <md-layout md-flex="19" style='background:;justify-content: center'> 
                    <div :class="btnType =='inactive' ?'title-text active':'title-text'" @click="selectType('inactive')">INACTIVE</div>
                    <div class="title-number">{{formatNumber($store.getters.custm_inactive_cust)}}</div>
                </md-layout>

                <md-layout md-flex="19" style='background:;justify-content: center'> 
                    <div :class="btnType =='verifiled' ?'title-text active':'title-text'" @click="selectType('verifiled')">VERIFIED</div>
                    <div class="title-number">{{formatNumber($store.getters.custm_count_verify)}}</div>
                </md-layout>
                <md-layout md-flex="22"  style='background:;justify-content: center'> 
                    <div :class="btnType =='unverifiled' ?'title-text active':'title-text'" @click="selectType('unverifiled')">UNVERIFIED</div>
                    <div class="title-number">{{formatNumber($store.getters.custm_count_unverify)}}</div>
                </md-layout>
 
              </md-layout>
            </md-layout>
        </md-layout>
        <md-spinner :md-size="150" :md-stroke="1"  v-show="$store.getters.custm_spinner_loading" md-indeterminate></md-spinner> 
        <md-layout  style="flex: initial;width:75%;" md-align="center" class="cust-list-box" v-if="$store.getters.custm_deatil_list.length == 0">
            <span class="nodata">No data</span>
        </md-layout>
        <md-layout  style="flex: initial;width:75%;" class="cust-list-box" v-else>
          <div class="head-table">
            <div style="width:8%;"></div>
            <div :class="btnSort =='customer_code' ? 'active':''" style="width:12%;text-align:left; cursor: pointer;" @click="sortData('customer_code')">Code</div>
            <div :class="btnSort =='customer_name' ? 'column-descript active':'column-descript'" style="width:41%;text-align:left; cursor: pointer;" @click="sortData('customer_name')">Customer Name</div>
            <div :class="btnSort =='prov_name' ? 'column-province active':'column-province'" style="width:16%;text-align:left; cursor: pointer;" @click="sortData('prov_name')">Area</div>
            <div :class="btnSort =='status' ? 'active':''" style="width:10%;cursor: pointer;" @click="sortData('status')">Status</div>
            <div :class="btnSort =='location' ? 'active':''" style="width:13%;cursor: pointer;" @click="sortData('location')">Location</div>
            <div :class="btnSort =='verfied' ? 'active':''" style="width:13%;cursor: pointer;" @click="sortData('verfied')">Verified</div>
            
          </div>
          <div class="body-deatil"  @scroll="handleScroll"
              :style="{'padding-right': $store.getters.custm_deatil_list.length > 1 ? '48px' : '60px',
              'overflow-y': $store.getters.custm_deatil_list.length > 1 ? 'scroll' : 'hidden'}">
            <div class="detail-table" v-for="(item , index) in $store.getters.custm_deatil_list" :key="index">
              <div style="width:8%;"><md-icon>store_mall_directory</md-icon></div>
              <div style="width:12%;text-align:left">{{item.customer_code}}</div>
              <div class="column-descript" style="width:41%;">{{item.customer_name}}</div>
              <div class="column-province" style="width:16%;">{{item.prov_name}}</div>
              <div style="width:10%;">
                <md-avatar v-if="item.status == 1" class="md-avatar-icon -green _icon-status"></md-avatar>
                <md-avatar v-else class="md-avatar-icon -red _icon-status"></md-avatar>
              </div>
              <div style="width:13%;" @click="openDialog('custmanage' , item , index)">
                <div v-if=" item.distance_status == 1" class="md-avatar md-avatar-icon _icon-status-rec">
                  OK<md-tooltip  md-direction="top">[{{item.lat_mobile}} / {{item.long_mobile}}]</md-tooltip>
                </div>
                <div v-else class="md-avatar md-avatar-icon _icon-status-rec active">
                  !<md-tooltip md-direction="top">No location</md-tooltip>
                </div>
              </div>
        
               <div style="width:13%;" @click="setVerfied( item )">
                <div v-if=" item.verify == 1" class="md-avatar _icon-status-rec">
                  <span style="color:#66BB6A;cursor: pointer;" class="material-icons">
                      where_to_vote
                      </span>
                </div>
                <div v-else class="md-avatar  _icon-status-rec" >
                 <span style="color:#BDBDBD;cursor: pointer;" class="material-icons">
                      where_to_vote
                      </span>
                </div>
              </div>
            </div>
          </div>
        </md-layout>
      </md-layout>
     </md-layout>

    

       <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
       <span>{{ textSnackBar }}</span>
      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color:#FD7F00"
        >OK</md-button
      >
    </md-snackbar>


     <md-dialog
      md-open-from="#fab"
      md-close-to="#fab"
      ref="Location_dailog"
      id="Location_dailog"
      
    >
      <md-dialog-content
        >ไม่สามารถยืนยันได้ เนื่องจากไม่พบ Location (Latitude,Longitude)</md-dialog-content
      >
      <md-dialog-actions>
        <md-button style="background-color:#fff" @click="confirm_close('cancel_location')">
          <label style="color: #fd7f00">OK</label>
        </md-button>
      </md-dialog-actions>
    </md-dialog>


     <md-dialog md-open-from="#fab" md-close-to="#fab" ref="custmanage" id="custmanage_dialog">
        <md-dialog-title>
            <md-layout>
                <md-layout md-flex="90" style="display: -webkit-box;overflow: hidden;">
                    <div class="title">{{custm_head.customer_code}}</div>
                    <div class="sub-title kanitFont">{{custm_head.customer_name}}
                      <md-tooltip md-direction="top">{{custm_head.customer_name}}</md-tooltip>
                    </div>
                </md-layout>
                <md-layout md-flex="10" md-align="end">
                    <md-button class="md-icon-button" @click="closeDialog('custmanage')">
                        <md-icon>close</md-icon>
                    <md-tooltip md-direction="right">close</md-tooltip>
                </md-button>
              </md-layout>
            </md-layout>
        </md-dialog-title>
        <md-layout style="font-weight:300;padding-top:10px;padding-left:30px;font: normal normal normal 16px/21px Roboto;color:#757575;font-size:15px"  class="title">Location</md-layout>
        <md-dialog-content>
          <md-layout md-gutter style="width: 100%; margin-top:0px">
            <md-layout style="background-color:" md-column md-gutter>
                
              <md-layout md-flex="50" style="padding-right: 7.5px;background-color: ">


                 <md-input-container>
                  <label style="font-size:12px" >Latitude</label>
                  <md-input :disabled="locationDisabled"  v-model="ipt_latitude"  style="font-family: Roboto !important;"></md-input>
                  <div class="md-error" v-if="ipt_latitude == '' || ipt_latitude == null">{{warningText}}</div>
                </md-input-container>

                <!-- 
                <md-input-container md-inline class="md-input-invalid" >
                  <label>Latitude</label>
                  <md-input :disabled="locationDisabled" v-model="ipt_latitude" ></md-input>
                  <div class="md-error" v-if="ipt_latitude == '' || ipt_latitude == null">{{warningText}}</div>
                </md-input-container>  -->
              </md-layout>
            </md-layout>

            <md-layout md-column md-gutter>
              <md-layout md-flex="50" style="padding-left: 7.5px;">

                 <md-input-container>
                  <label style="font-size:12px">Longitude</label>
                  <md-input :disabled="locationDisabled"  v-model="ipt_longitude"  style="font-family: Roboto !important;"></md-input>
                  <div class="md-error" v-if="ipt_longitude == '' || ipt_longitude == null">{{warningText}}</div>
                </md-input-container>
<!-- 
                <md-input-container md-inline class="md-input-invalid">
                  <label>Longitude</label>
                  <md-input   :disabled="locationDisabled"  v-model="ipt_longitude"></md-input>
                  <div class="md-error" v-if="ipt_longitude == '' || ipt_longitude == null">{{warningText}}</div>
                </md-input-container> -->
              </md-layout>
            </md-layout>
          </md-layout>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-raised md-button-cancel" @click="closeDialog('custmanage')">
            <label v-if="locationDisabled==false">CANCEL</label>
            <label v-if="locationDisabled==true">CLOSE</label>
          </md-button>
          
          <md-button v-if="locationDisabled==false" class="md-raised md-button-save" @click="saveData('custmanage')">
            <label>SAVE CHANGES</label>
          </md-button>
        </md-dialog-actions>
      </md-dialog>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "tripplan-custmanege",
   name: 'Counters',
  data() {
    
    return {
      title: "CUSTOMER LOCATION",
      ipt_search: "Search",
      shw_customer: false,
      btnType: "active",
      btnSort: "customer_code",
      ipt_latitude: 0,
      ipt_longitude: 0,
      custm_head: "",
      tempIndex: "",
      warningText: "Please input data",
      tempSort: "ASC",
      province_list:[],
      customerProvince:'',
      customer_cus:'',
      codeProvince:'',
      codeCus:'',
      codeChannel:'',
      cusId:'',
      locationDisabled:true,
       regular: null,
      maxLength: null,
      disabled: null,
      autogrow: null,
      textarea: null,
      cus_list:'All Customer Channel',
      vertical: 'top',
      horizontal: 'center',
      duration: 4000,
      textSnackBar:'ไม่สามารถยืนยันได้ เนื่องจากไม่พบ Location (Latitude,Longitude)'

    };
  },
  methods: {
    showSearch() {
      if (this.shw_customer) {
        this.shw_customer = false;
      } else {
        this.shw_customer = true;
      }
    },
    sortData(value) {
      this.$store.commit("SET_CUSTM_LOADING", true);
      this.btnSort = value;
      this.tempSort = this.tempSort == "ASC" ? "DESC" : "ASC";
      this.tempSort;
      this.$store.dispatch("getCustomerList", {
        customer_id: this.$store.getters.custm_selected.customer_id,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
        start_row: 0
      });
    },
    searchCustomer: function(param) {
      console.log("==>",this.$store.getters.custm_province_list);
      this.shw_customer = true;
      if (param.length > 1) {
        this.$store.dispatch("getAllCustomer", param);
      } else if (param.length == 0) {
        this.$store.commit("SET_CUSTM_LOADING", true);
        this.$store.commit(
          "SET_CUSTM_CUSTOMER",
          this.$store.getters.temp_customer_list
        );
        this.$store.commit("SET_CUSTM_SELECTED", []);
        this.$store.dispatch("getCustomerList", {
          customer_code: this.$store.getters.custm_selected.customer_code,
          type: this.btnType,
          sort: this.btnSort,
          start_row: 0,
          orderby: this.tempSort,
        });


        
        this.codeCus='';
      }
    },
    selectCustomer(value) {
      this.$store.commit("SET_CUSTM_LOADING", true);
      this.$store.commit("SET_CUSTM_SELECTED", value);
      this.shw_customer = false;
      this.ipt_search = value.customer_name_th;
      this.codeCus=value.code;
      this.$store.dispatch("getCustomerList", {
        customer_code: value.customer_code,
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort,
         channel_code:this.codeChannel,
          province_code:this.codeProvince
        
      });


    },
    selectType(value) {
      this.$store.commit("SET_CUSTM_LOADING", true);
      this.btnType = value;
      this.$store.dispatch("getCustomerList", {
        customer_code: this.codeCus,
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort,
        channel_code:this.codeChannel,
          province_code:this.codeProvince
      });
    },set_channel( value ){
        
        this.codeChannel = value.code;
        this.$store.dispatch("getCustomerList", {
        customer_code: this.codeCus,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
        start_row: 0,
        channel_code:this.codeChannel,
        province_code:this.codeProvince
      }) 

 

    // console.log("1 => ",this.codeCus ,"2 => ",this.codeChannel ,  "3 => ",this.codeProvince )
    },
    saveData(ref) {
      if (this.ipt_latitude != "" && this.ipt_longitude != "") {
        this.$store.dispatch("saveLocation", {
          customer_id: this.custm_head.customer_id,
          customer_code: this.custm_head.customer_code,
          latitude: this.ipt_latitude,
          longitude: this.ipt_longitude,
          customer_id: this.custm_head.customer_id,
          index: this.tempIndex
        });
        this.$refs[ref].close();
      }
    },
    filterCustProvince: function(param){
      if(param.length > 0){
      this.$store.dispatch("settingProvinceAll",param);

      }else {
          this.codeProvince ='';
         this.$store.dispatch("settingProvinceAll",'');
         this.$store.dispatch("getCustomerList", {
          customer_code: this.codeCus,
          type: this.btnType,
          sort: this.btnSort,
          orderby: this.tempSort,
          start_row: 0,
          channel_code:this.codeChannel,
          province_code:''
      }) 
      }
      console.log("filterCustProvince",param)
    }, 
    chooseCustProvince : function(item){
    // console.log("🚀 ~ file: Custmanage.vue ~ line 374 ~ item", item,this.codeCus)
      this.customerProvince = item.code + '  '+item.title;
      this.codeProvince = item.code;


     this.$store.dispatch("getCustomerList", {
        customer_code: this.codeCus,
        type: this.btnType,
        sort: this.btnSort,
        orderby: this.tempSort,
        start_row: 0,
        channel_code:this.codeChannel,
        province_code:this.codeProvince
      })      
    },
    chooseCust_cus: function(item){
           console.log('chooseCust_cus',item)
      this.customer_cus = item.code +'  '+item.title;
      this.codeCus = item.code;
      this.cusId = item.customer_id;

       this.$store.dispatch("getCustomerList", {
          customer_code: item.code,
          type: this.btnType,
          sort: this.btnSort,
          start_row: 0,
          orderby: this.tempSort,
          channel_code:this.codeChannel,
          province_code:this.codeProvince
        });
    },
      handleScroll(event) {
      if (
        event.target.scrollHeight - event.target.clientHeight <=
          event.target.scrollTop+1 &&
        this.$store.getters.custm_deatil_list.length <
          this.$store.getters.custm_all_cust
      ) {
        this.$store.commit("SET_CUSTM_LOADING", false);
        this.$store.dispatch("getCustomerList", {
          customer_code:this.codeCus ,
          type: this.btnType,
          sort: this.btnSort,
          start_row: this.$store.getters.custm_deatil_list.length,
          orderby: this.tempSort,
          channel_code:this.codeChannel,
          province_code:this.codeProvince
        });
      }
    },
    setVerfied( item ){
     
      console.log(item, item.customer_code ,item.customer_id );

      if(item.lat_mobile == null && item.long_mobile==null){
        // this.$refs.snackbar.open()
          this.$refs["Location_dailog"].open();
      }else {
        
      if(item.verify ==1){
        item.verify =0;
      }else {
        item.verify =1;
      }
       this.$store.dispatch("settingUpdateVerify", {
         customer_code:item.customer_code,
         customer_id : item.customer_id,
         verify :  item.verify

       })
       this.$store.dispatch("getAllCustomer", "");
      }

      
    },confirm_close(){
       this.$refs["Location_dailog"].close();
    },
    openDialog(ref, value, index) {
      
      console.log(value.verify);
      if(value.verify == 1){
        this.locationDisabled = true
      }else {
        this.locationDisabled = false
        
      }
      this.ipt_latitude = value.lat_mobile;
      this.ipt_longitude = value.long_mobile;
      this.tempIndex = index;
      this.custm_head = value;
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
      this.tempIndex = "";
    },
    formatNumber(value) {
      return parseFloat(value)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    outsideShowCust: function(e) {
      if (
        e.target.className != "md-input" &&
        e.target.className != "md-input earch-text" &&
        e.target.className != "md-input value-text"
      ) {
        this.shw_customer = false;
      }
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.$store.dispatch("setPathMenuService" , "setting");
      // this.$store.dispatch("setPathMenuService");
      // this.$store.commit("SET_SUB_PATH_MENU", []);
     
     
     this.$store.dispatch("settingProvinceAll",'');
     this.$store.dispatch("settingChannelAll");
     this.$store.dispatch("getAllCustomer", "");

     this.$store.dispatch("getCustomerList", {
        customer_code: "",
        type: this.btnType,
        sort: this.btnSort,
        start_row: 0,
        orderby: this.tempSort
      });  
      
       this.$store.dispatch("getCountCustomer", {
          customer_code: '',
          channel_code: '',
          province_code: '',
        });
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-auto-search-box": require("../activity/act-management-component/md-auto-search-box.vue"),
    "md-dropdown-box": require("../Salesops/customComponent/mdc-dropdown-box")
  }
};
</script>
<style>
</style>