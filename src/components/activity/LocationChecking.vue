
<template>
  <div id="pageLocationTracking">
    <div v-if="!$store.getters.status_login" class="mt-60">
      <waring-login></waring-login>
    </div>
    <md-layout
      md-align="start"
      md-flex="100"
      class="md-topic"
      style="padding-top: 25px; padding-left: 70px"
    >
      <span>{{ pageName }}</span>
    </md-layout>
    <md-layout md-column md-gutter md-flex="90" style="padding: 1% 8% 0% 8%">
      <md-layout style="background-color: " md-flex="90" class="pt-20">
        <div style="width: 15%; background-color: ">
          <md-dropdown-box
            :data="this.select"
            @choose="set_channel"
            v-model="cus_list"
          ></md-dropdown-box>
        </div>

        <div style="width: 20%; padding-left: 19px">
          <div style="display: -webkit-box;">
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
        <div style="width: 20%; padding-left: 15px; background-color: ">
          <md-auto-search-box
            :placeholder="'All Customer'"
            :data="this.$store.getters.custm_customer_list"
            :value="customer_cus"
            @filter="searchCustomer"
            @choose="chooseCust_cus"
            :disabled="false"
          ></md-auto-search-box>
        </div>
        <div style="width: 20%; padding-left: 15px">
          <md-auto-search-box
            :placeholder="'All Province'"
            :data="this.$store.getters.custm_province_list"
            :value="customerProvince"
            @filter="filterCustProvince"
            @choose="chooseCustProvince"
            :disabled="false"
          ></md-auto-search-box>
        </div>
        <div style="width: 20%; padding-left: 15px; background-color: ">
          <md-auto-search-box
            :placeholder="'All Salesman'"
            :data="this.$store.getters['activitymanage/listDataSMDetail']"
            :value="sm_detail"
            @filter="search_sm"
            @choose="choose_sm"
            :disabled="false"
          ></md-auto-search-box>
        </div>
         
        <div style="padding-top:10px;width:5%" >

          <svg @click="search_all"  id="Search_Button" data-name="Search Button" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
          <rect id="Rectangle_518" data-name="Rectangle 518" width="36" height="36" rx="3" fill="#fd7f00" opacity="0.9"/>
          <g id="ic_search_white" transform="translate(6.286 6.286)">
            <path id="path" d="M24,0H0V-24H24Z" transform="translate(0 24)" fill="none" fill-rule="evenodd"/>
            <path id="path-2" data-name="path" d="M15.509-9.485h-.794l-.276-.274a6.472,6.472,0,0,0,1.569-4.228,6.5,6.5,0,0,0-6.5-6.5,6.5,6.5,0,0,0-6.5,6.5,6.5,6.5,0,0,0,6.5,6.5,6.474,6.474,0,0,0,4.227-1.567l.276.274v.792l5,4.994L20.5-4.483l-4.991-5Zm-6.005,0a4.5,4.5,0,0,1-4.5-4.5,4.5,4.5,0,0,1,4.5-4.5,4.5,4.5,0,0,1,4.5,4.5,4.5,4.5,0,0,1-4.5,4.5Z" transform="translate(0 23.491)" fill="#fff" fill-rule="evenodd"/>
          </g>
          </svg>
          
        </div>
      </md-layout>
    </md-layout>
    <md-layout
      md-column
      md-gutter
      md-flex="90"
      style="padding: 1% 8% 2% 8%; height: 700px"
    >

    <!-- v-show="$store.getters.lcn_spinner_loading" -->
    <div class="spinner-load" style="display: flex;justify-content: space-around;">
      <md-spinner style="position: absolute;" :md-size="150" :md-stroke="1"  v-show="$store.getters.lcn_spinner_loading" md-indeterminate></md-spinner> 

    </div>

      <!-- :src="`http://localhost/MapEx5/MapExample5.php?token=`+$store.getters.token+`&customer_code=`+this.choose_customer_code+`&date=`+this.choose_date+`&month=`+this.choose_month+`&province_code=`+this.choose_province_code+`&range=`+this.choose_range+`&salesman_code=`+this.choose_salesman_code+`&select_plan=`+this.choose_select_plan+`&year=`+this.choose_year+``" -->

      <md-layout  v-if="!$store.getters.lcn_spinner_loading"  style="border: 1px solid gray" md-flex="90">
        <iframe
        :src="`gmap/MapExample5.php?token=`+$store.getters.token+`&customer_code=`+this.choose_customer_code+`&date=`+this.choose_date+`&month=`+this.choose_month+`&province_code=`+this.choose_province_code+`&range=`+this.choose_range+`&salesman_code=`+this.choose_salesman_code+`&select_plan=`+this.choose_select_plan+`&year=`+this.choose_year+``"
          id="iframeid"
          width="100%"
          height="100"
          frameborder="0"
        >
        </iframe>
      </md-layout>
    </md-layout>
  </div>
</template>
 <script type="text/javascript" src="https://api.longdo.com/map/?key=aefeb3c723bd4f2a3c431626ab9e4c49"></script>
 <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
 
<script>
  import Vue from "vue";
  import LongdoMap from "longdo-map-vue";

//  markercluster = new lmc.MarkerCluster(
//         map, {
//           minClusterSize: 2,
//           styles: styles
//         }
//       )
// Vue.use(LongdoMap, {
//   load: {
//     apiKey: "aefeb3c723bd4f2a3c431626ab9e4c49",
//   },
//   location: {
//     lat: 13.689128,
//     lon: 100.491781,
//   },
// });

export default {
  name: "location-checking",
  props: {},
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "menu-header": require("../Salesops/layout/menu-top"),
    "md-dropdown-box": require("../Salesops/customComponent/mdc-dropdown-box"),
    "md-auto-search-box": require("./act-management-component/md-auto-search-box.vue"),
    "sales-period-block": require("./act-management-component/md-period-boxes-location"),
  },
  data() {
    return {
      pageName: "LOCATION CHECKING",
      choose_customer_code :'',
      choose_province_code:'',
      choose_salesman_code:'',
      choose_select_plan:'Activity Date',
      choose_date:'',
      choose_year:this.$store.getters['activitymanage/selected_date'].year,
      choose_month:this.$store.getters["activitymanage/selected_date"].month,
      choose_range:this.$store.getters["activitymanage/selected_date"].range,
      customer_cus: "",
      codeCus: "",
      codeProvince: "",
      codeSm: "",
      select_plan :'Activity Date',
      customerProvince: "",
      sm_detail: "",
      cus_list: "Activity Date",
      dateTime: {},
      lastmouseLocation: "",
      parter: [],
      markercluster: "",
      img: "",
      markers: 
        {
          location: { lon: 100.58, lat: 13.761 },
          title: "Vue Marker",
          detail: "This is a detail",
        },
      select: [{ code: "", title: "Activity Date"  } ,{code: "", title: "Plan Date"}],
     
    };
  },
  methods: {
    loadMap(province_filter) {
      Vue.use(LongdoMap, {
        load: {
          apiKey: "aefeb3c723bd4f2a3c431626ab9e4c49",
        },
        location: {
          lat: 13.689128,
          lon: 100.491781,
        },
      });
    },
    selectMonth(value) {
      let date = this.$store.getters["activitymanage/selected_date"];
      if (value.mode == "period") {
        date.month = value.month;
        date.year = value.year;
        date.range = "-";

        this.dateTime = {
          month: value.month,
          year: value.year,
          range: "-",
        };
      } else {
        date.month = "";
        date.year = "";
        date.range = value.range;

        this.dateTime = {
          month: "",
          year: "",
          range: value.range,
        };
      }
      this.$store.dispatch("activitymanage/getList");
    },
    selectYear(value) {
      let date = this.$store.getters["activitymanage/selected_date"];
      date.year = value.year;
    },
    searchActivity(value) {
      // this.$store.commit("activitymanage/setFilterSearch", value);
      // this.$store.dispatch("activitymanage/getList");
    },
    searchCustomer: function (param) {
      if (param.length > 1) {
        this.$store.dispatch("getAllCustomer", param);
      } else if (param.length == 0) {
        this.$store.dispatch("getAllCustomer", param);
        this.codeCus = "";
      }
    },
    chooseCust_cus: function (item) {
      this.customer_cus = item.code + " " + item.customer_name_th;
      this.codeCus = item.code;
    },
    filterCustProvince: function (param) {
      if (param.length > 0) {
        this.$store.dispatch("settingProvinceAll", param);
      } else {
        this.$store.dispatch("settingProvinceAll", "");
        this.codeProvince = "";
      }
      console.log("filterCustProvince", param);
    },
    chooseCustProvince: function (item) {
      this.customerProvince = item.code + "  " + item.title;
      this.codeProvince = item.code;
    },
    choose_sm: function (item) {
      this.sm_detail = item.code + " " + item.title;
      this.codeSm = item.code;
    },
    search_sm: function (param) {
      if (param.length > 0) {
        this.$store.dispatch("activitymanage/filterSalemanAdd", param);
      } else {
        this.$store.dispatch("activitymanage/filterSalemanAdd", "");
        this.codeSm = "";
      }
    },
    search_all() {
      // console.log(this.$store.getters["activitymanage/selected_date"].month)
      // console.log(this.$store.getters["activitymanage/selected_date"].range)
      // console.log(this.$store.getters["activitymanage/selected_date"].year)
      var rs = {
        customer_code: this.codeCus,
        province_code: this.codeProvince,
        salesman_code: this.codeSm,
        select_plan : this.select_plan,
        date:"",
        year : this.$store.getters["activitymanage/selected_date"].year,
        month : this.$store.getters["activitymanage/selected_date"].month,
        range : this.$store.getters["activitymanage/selected_date"].range
      };

        this.choose_customer_code= this.codeCus,
        this.choose_province_code= this.codeProvince,
        this.choose_salesman_code= this.codeSm,
        this.choose_select_plan = this.select_plan,
        this.choose_date="",
        this.choose_year = this.$store.getters["activitymanage/selected_date"].year,
        this.choose_month = this.$store.getters["activitymanage/selected_date"].month,
        this.choose_range = this.$store.getters["activitymanage/selected_date"].range

      this.$store.dispatch("settingReturnCustomerLocation",rs)
    //console.log('=>',this.$store.getters['lcn_customer_list'])
       
    },
    
    set_channel: function (item) {
      this.select_plan = item.title
      // console.log(item);
    },
  },
  conputed: {
    listDataSMDetail() {
      return this.$store.getters["activitymanage/listDataSMDetail"];
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.$store.dispatch("setPathMenuService", "activity");
      this.$store.commit("SET_CUSTM_LOADING", false);
      this.$store.dispatch("settingProvinceAll", "");
      this.$store.dispatch("activitymanage/filterSaleman", "");
      this.$store.dispatch("activitymanage/filterSalemanAdd", "");
      this.$store.dispatch("getAllCustomer", "");
     
       var start = {
        customer_code: this.codeCus,
        province_code: this.codeProvince,
        salesman_code: this.codeSm,
        select_plan : this.select_plan,
        date:"",
        year : this.$store.getters["activitymanage/selected_date"].year,
        month : this.$store.getters["activitymanage/selected_date"].month,
        range : this.$store.getters["activitymanage/selected_date"].range
      };
      this.$store.dispatch("settingReturnCustomerLocation",start)
      this.loadMap("All");

    }
  },
};
</script>
<style src="../Salesops/fullDateRange/styles.scss" lang="scss"></style>
<style src="../Salesops/fullDateRange/act-styles.css"></style>


 

