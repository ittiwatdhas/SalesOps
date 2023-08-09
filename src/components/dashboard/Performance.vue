<template>
  <div id="pagePerformanceOrder">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <div class="mds-vue-back-to-top" @click="backToTop" v-if="showBackToTop">
        <span>
          <md-icon>arrow_upward</md-icon>
        </span>
      </div>
      <!-- @scroll="handleScroll" -->
      <div class="body" >
        <md-spinner
          style="z-index:10;position:fixed;left:45%"
          :md-size="150"
          :md-stroke="1"
          v-show="spinner"
          md-indeterminate
        ></md-spinner>
        <div id="performId"></div>
       
        <div v-if="department != 'SM'" style="overflow-y='scroll;padding-right:30px;width:30%">
          <div class="main-title" style="margin-bottom:20px;width:100%">SALES PERFORMANCE OVERVIEW</div>
          <div style="margin-bottom:10px;width:100%">
            <md-search-box
              :placeholder="'Search Sales…'"
              :data="$store.getters['performance_dashboard/filterSM_list']"
              @filter="filterSales"
              @clear="clearSearch"
              @choose="selectSales"
            ></md-search-box>
          </div>
        
          <div style="width:100%">
            <div  class="title-line-per">BY GROUP</div>
            <md-bygroup-list 
             class='content-dialog'
            :data="bygroupList"
             :checkbox="true" 
             @selected="selectedTeam"
            
              :style="{ 'max-height': '310px','overflow-y':this.bygroupList.length > 10 ? 'scroll' : none}"
             
             >

            </md-bygroup-list>
             <div  class="title-line-per">BY SALESMAN</div>
            <md-bysalesman-list
              class='content-dialog'
              :style="{'overflow-y':this.bysalesmanList.length > 20 ? 'scroll' : none}"
              :id="'md-bysalesman-list'"
              :data="bysalesmanList"
              :checkbox="true"
              @selected="selectedSalesman"
            ></md-bysalesman-list>
          </div>
        </div>
        <div
          :style="{'width':department  == 'SM'?'100%':'70%' ,
        'padding-left':department  == 'SM' ? '15%' :'',
        'padding-right':department  == 'SM' ? '15%' :''}"
        >
          <div style="margin-bottom:10px;height: 64px;width:100%" class="mds-period">
            <md-period-box
            
              :max="periodDetail.max_pass_percent"
              @selectmonth="selectMonth"
              @selectyear="selectYear"
              :year="dateSelected.year"
              :month="dateSelected.month_id"
              :detail="periodDetail"
            ></md-period-box>
          </div>
          <div style="margin-bottom:10px;width:100%">
            <graph-bar
              :options="$store.getters['performance_dashboard/graph_options']"
              :detail="$store.getters['performance_dashboard/plan_detail']"
            ></graph-bar>
          </div>
          <div style=" width:100%">
            <!-- <div id="performId"></div> -->
            <bycg-box></bycg-box>
          </div>
        </div>
      </div>
    </div>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
      <span>Can't selection next months.</span>
      <md-button class="md-accent" @click="snackbarClose">AGREE</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import _ from "lodash";
export default {
  name: "orders-performance",
  data() {
    return {
      department: "",
      showBackToTop: false,
      vertical: 'bottom',
      horizontal: 'center',
      duration: 7000,
    };
  },
  computed: {
    dateSelected() {
      return this.$store.getters["performance_dashboard/date_selected"];
    },
    periodDetail() {
      return this.$store.getters["performance_dashboard/period_detail"];
    },
    bygroupList() {
      return this.$store.getters["performance_dashboard/bygroup_list"];
    },
    bysalesmanList() {
      return this.$store.getters["performance_dashboard/bysalesman_list"];
    },
    spinner() {
      return this.$store.getters["performance_dashboard/spinner_loading"];
    },
    bycgList() {
      return this.$store.getters["performance_dashboard/bycg_list"];
    }
  },
  methods: {
    selectMonth(value) {
      var datenow = new Date();
      var mm = datenow.getMonth() + 1;
      var yy = datenow.getFullYear();
      
      if((value.month <= mm && value.year <= yy) || (value.month > mm && value.year < yy)){
      
        let arr = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        let date = this.dateSelected;
        date.month_id = value.month;
        date.month = arr[parseInt(value.month) - 1];
        date.year = value.year;
        let data = this.bysalesmanList;
        let dataTeam = this.bygroupList;
        let dataName = "";
        let checkedSales = data.filter(todo => todo.checked === true);
        if (this.department == "SM") {
          dataName =
            Vue.localStorage.get("first_name") +
            " " +
            Vue.localStorage.get("last_name");
        } else {
          if (checkedSales.length == 0) {
            let checkedTeam = dataTeam.filter(todo => todo.checked === true);
            checkedTeam.forEach(function(row, key) {
              dataName += row.full_name + ", ";
            });
            dataName = dataName.substring(0, dataName.length - 2);
          } else {
            checkedSales.forEach(function(row, key) {
              let indexTrue = data.indexOf(row);
              if (indexTrue >= 0) {
                dataName = data[indexTrue].full_name;
              }
            });
          }
        }
        // document.getElementsByTagName("html")[0].style.overflow = "hidden";

        this.$store.dispatch("performance_dashboard/getVisitPlan", {
          year: date.year,
          month: date.month_id,
          name: dataName
        });
        this.$store.dispatch("performance_dashboard/getSummary", {
          year: date.year,
          month: date.month_id
        });
        this.$store.dispatch("performance_dashboard/getBySalesman", {
          year: date.year,
          month: date.month_id
        });
      }else{
        this.$refs.snackbar.open();
      }
    },
    selectYear(value) {
      let date = this.dateSelected;
      date.year = value.year;
    },
    selectedTeam(row, index, mode) {
      let obj = [row, index, mode];
      let btnClose = document.getElementById("md-sidenav-perform");
      if (btnClose != "") {
        btnClose.click();
      }
      let date = this.dateSelected;
      this.$store.dispatch("performance_dashboard/selectedTeam", obj);
      this.$store.dispatch("performance_dashboard/getSummary", {
        year: date.year,
        month: date.month_id
      });
    },
    selectedSalesman(row, index, mode) {
      let btnClose = document.getElementById("md-sidenav-perform");
      if (btnClose != "") {
        btnClose.click();
      }
      let obj = [row, index, mode];
      this.$store.dispatch("performance_dashboard/selectedSalesman", obj);
      this.$store.dispatch("performance_dashboard/getSummary", {
        year: this.dateSelected.year,
        month: this.dateSelected.month_id
      });
    },
    filterSales(param) {
      this.$store.dispatch("performance_dashboard/filterSales", param);
    },
    clearSearch() {},
    selectSales(value) {
      let id = "md-bysalesman-list" + value.code;
      let temp = document.getElementById(id);
      if (temp != "") {
        this.$store.dispatch("performance_dashboard/selectSales", value);
        this.$store.dispatch("performance_dashboard/getSummary", {
          year: this.dateSelected.year,
          month: this.dateSelected.month_id
        });
      }

    },
    handleScroll(event) {
      this.showBackToTop = true;
      document.getElementById("pagePerformanceOrder").click();
      document.activeElement.blur();;
      if (this.spinner == false) {
        this.$store.dispatch("performance_dashboard/getByCGScroll");
      }
    },
    backToTop() {
      let temp = document.getElementById("performId");
      if (temp != "") {
        temp.scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    snackbarClose(){
      this.$refs.snackbar.close();
      this.$router.go(this.$route.path)
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.department = Vue.localStorage.get("department");
      this.$store.dispatch("setPathMenuService", "dashboard");
      let date = this.dateSelected;
      date.month_id = moment(new Date()).format("MM");
      date.month = moment(new Date()).format("MMMM");
      date.year = moment(new Date()).format("YYYY");
      this.$store.dispatch(
        "performance_dashboard/getCGAll",
        Vue.localStorage.get("emp_id")
      );
      let obj = {
          first_name: Vue.localStorage.get("first_name"),
          last_name: Vue.localStorage.get("last_name"),
          code: Vue.localStorage.get("emp_id")
        };
      this.$store.commit("performance_dashboard/SET_SM_SELECTED", obj);
      if (this.department == "SM") {
        this.$store.dispatch("performance_dashboard/getVisitPlan", {
          year: date.year,
          month: date.month_id,
          name:
            Vue.localStorage.get("first_name") +
            "  " +
            Vue.localStorage.get("last_name")
        });
        // let obj = {
        //   first_name: Vue.localStorage.get("first_name"),
        //   last_name: Vue.localStorage.get("last_name"),
        //   code: Vue.localStorage.get("emp_id")
        // };
        // this.$store.commit("performance_dashboard/SET_SM_SELECTED", obj);
        this.$store.commit("performance_dashboard/setGroupList", []);
      } else {
        // this.$store.commit("performance_dashboard/SET_SM_SELECTED", []);
        this.$store.dispatch("performance_dashboard/getVisitPlan", {
          year: date.year,
          month: date.month_id,
          name: "All Salesman"
        });
        this.$store.dispatch("performance_dashboard/getByGrouup");
      }
      this.$store.dispatch("performance_dashboard/getSummary", {
        year: date.year,
        month: date.month_id
      });
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "md-search-box": require("./performance-component/md-search-box"),
    "md-bygroup-list": require("../Salesops/customComponent/md-bygroup-list"),
    "md-bysalesman-list": require("../Salesops/customComponent/md-bysalesman-list"),
    "md-period-box": require("../Salesops/customComponent/md-period-boxes"),
    "graph-bar": require("./performance-component/graph-bar"),
    "bycg-box": require("./performance-component/bycg-box")
  }
};
</script>
<style lang="scss" scoped>
#pagePerformanceOrder {
  .body {
    height: calc(100vh - 80px);
    overflow-x: hidden;
    overflow-y: auto;

    width: 100%;
    padding: 30px 50px 20px 50px;
    display: -webkit-box;
    .main-title {
      text-align: left;
      color: #797979;
      font-family: Lato;
      font-size: 18px;
    }
  }
  .body::-webkit-scrollbar {
    height: 7px;
    width: 8px;
    background: #f7f7f7;
  }
  .body::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}
</style>