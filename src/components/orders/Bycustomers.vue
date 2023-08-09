<template>
  <div id="pageByCustomer">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-layout md-align="center" class="pt-30">
        <!--BOX 1-->
        <md-layout md-flex="100" md-align="center">
          <sales-period-block @selectmonth="selectMonth" :detail="periodDetail"></sales-period-block>
        </md-layout>
        <!--BOX 3-->
        <md-layout md-flex="100" md-align="center" class="mt-20">
          <md-card class="sales-area-table" style="width:851px;padding-bottom:20px">
            <md-layout md-flex="100" style="flex:unset">
              <md-layout md-flex="30" class="title" style="padding-left:10px">SALES PLAN BY CUSTOMER</md-layout>
              <md-layout md-flex="70" md-align="end">
                <div style="width:40%">
                  <md-search-box
                    :placeholder="'Search'"
                    :data="$store.getters['myorders/master_cg']"
                    @filter="filterPromo"
                    @clear="clearSearch"
                    @choose="selectSearchPromo"
                  ></md-search-box>
                </div>
                <div style="padding-left:15px;width:30%">
                  <md-dropdown-box
                    :placeholder="'All'"
                    :data="$store.getters['myorders/master_cg']"
                    @filter="filterCG"
                    @choose="selectCGPromo"
                  ></md-dropdown-box>
                </div>
              </md-layout>
            </md-layout>
            <div :class="'head-table'">
              <div
                class="text-left"
                style="width: 90px;cursor:pointer"
                @click="sortData('trip_date')"
              >Trip Date
                <md-icon v-if="sort_tripdate">arrow_drop_down</md-icon>
                <md-icon v-else>arrow_drop_up</md-icon>
              </div>
              <div class="text-left" style="width: 80px;">Code</div>
              <div class="text-left" style="width: 180px;">Customer Name</div>
              <div class="text-right" style="width: 130px;">Quota</div>
              <div
                class="text-right"
                style="width: 130px;cursor:pointer"
                @click="sortData('fulfilled')"
              >Fulfilled
                <md-icon v-if="sort_fulfilled">arrow_drop_down</md-icon>
                <md-icon v-else>arrow_drop_up</md-icon>
              </div>
              <div
                class="text-left"
                style=" width: 150px;padding-left:30px;cursor:pointer"
                @click="sortData('progress')"
              >Progress
                <md-icon v-if="sort_progress">arrow_drop_down</md-icon>
                <md-icon v-else>arrow_drop_up</md-icon>
              </div>
              <div style="width: 10px;"></div>
            </div>
            <div
              class="detail-blog"
              @scroll="handleScroll"
              :style="{'height': 'calc(100vh - 380px)' ,'padding-left':'0px'}"
            >
              <div
                v-for="items in dataList"
                :key="items.id"
                class="content-table"
                @click="openDatail(items)"
              >
                <div class="number" style="width: 90px;color:#A8A8A8">{{items.trip_date}}</div>
                <div class="number" style="width: 80px">{{items.code}}</div>
                <div
                  class="descript"
                  style="width: 180px;font-family:kanit"
                >{{items.customer_name_th}}</div>
                <div class="text-right" style="width: 130px;font-size:13px;font-family:roboto">
                  <span style="padding-right:4px;color:#5A5A5A">฿</span>
                  {{$store.getters['globalfunc/formatNumber'](items.quota)}}
                </div>
                <div class="text-right" style="width: 130px;font-size:13px;font-family:roboto">
                  <span style="padding-right:4px;color:#5A5A5A">฿</span>
                  {{$store.getters['globalfunc/formatNumber'](items.fulfilled)}}
                </div>
                <div
                  style="width: 150px;font-size: 13px;text-align: right;color: #414141;padding-left:30px"
                >
                  <md-layout md-gutter>
                    <md-layout md-flex="75">
                      <md-progress
                        v-show="true"
                        :class="renderProgressBar(items.percent)"
                        :md-progress="items.percent"
                        md-mode="determinate"
                      ></md-progress>
                    </md-layout>
                    <md-layout md-flex="25">
                      <span class="-font-10 -gray-BD ml-10">{{checkPoint(items.percent)}}%</span>
                    </md-layout>
                  </md-layout>
                </div>
                <div
                  class="number"
                  style="width: 10px;opacity: 0.54;padding-left:5px;cursor:pointer"
                >
                  <md-icon>keyboard_arrow_right</md-icon>
                </div>
              </div>
            </div>
          </md-card>
        </md-layout>
      </md-layout>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "orders-bycustomers",
  data() {
    return {
      sort_tripdate: true,
      sort_progress: true,
      sort_fulfilled: true,
      dataList: [
        {
          id: 1,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 40
        },
        {
          id: 2,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 0
        },
        {
          id: 3,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 70
        },
        {
          id: 4,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 70
        },
        {
          id: 5,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 70
        },
        {
          id: 6,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 70
        },
        {
          id: 7,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 70
        },
        {
          id: 8,
          trip_date: "02/11/18",
          code: "211112",
          customer_name_th: "คณะบุคคล อนันตวนา เกษตร",
          quota: "200200.00",
          fulfilled: "200200.00",
          progress: "84.0",
          percent: 70
        }
      ],
      periodDetail: {
        block1: {
          value: 1940000,
          text: "Sales Quota"
        },
        block2: {
          value: 630381,
          text: "Sales Achieved"
        },
        progress: {
          value: 34.51,
          text: "34.51"
        },
        button: {
          value: 0,
          text: "Incentive",
          mode: true
        }
      }
    };
  },
  methods: {
    openDatail(value) {
      console.log("openDatail => ", value);
    },
    sortData(value) {
      if (value == "trip_date") {
        this.sort_tripdate = !this.sort_tripdate;
        if (!this.sort_tripdate) {
          this.sort_progress = true;
          this.sort_fulfilled = true;
        }
      } else if (value == "fulfilled") {
        this.sort_fulfilled = !this.sort_fulfilled;
        if (!this.sort_fulfilled) {
          this.sort_progress = true;
          this.sort_tripdate = true;
        }
      } else {
        this.sort_progress = !this.sort_progress;
        if (!this.sort_progress) {
          this.sort_tripdate = true;
          this.sort_fulfilled = true;
        }
      }

      console.log("sort => ", value);
    },
    selectMonth(value) {
      // this.$store.dispatch("myorders/getMyOrderData", value);
    },
    handleScroll(event) {},
    selectSearchPromo(value) {
      // this.$store.dispatch("myorders/selectSearchPromo", value);
    },
    clearSearch() {
      console.log("clearSearch");
    },
    filterPromo(param) {
      // this.$store.dispatch("myorders/filterPromo", param);
    },
    filterCG(param) {
      // this.$store.dispatch("myorders/filterCG", param);
    },
    selectCGPromo(value) {
      // this.$store.dispatch("myorders/selectCGPromo", value);
    },
    renderProgressBar(percent) {
      if (isNaN(parseFloat(percent))) {
        return "";
      } else {
        if (parseFloat(percent) < 50) {
          return "red";
        } else if (parseFloat(percent) < 70 && parseFloat(percent) >= 50) {
          return "orange";
        } else if (parseFloat(percent) >= 70) {
          return "green";
        }
      }
    },
    checkPoint(value) {
      let str = value.toString().split(".");
      // console.log(value);
      // console.log(str);
      if (str.length == 1) {
        return this.formatNumberInt(value);
      } else {
        let sunStr = str[1].length;
        if (sunStr == 2 && str[1] == "00") {
          return this.formatNumberInt(value);
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) == "0"
        ) {
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) != "0"
        ) {
          return this.formatNumber(value);
        } else if (sunStr > 2) {
          let statIntVal = this.formatNumberInt(value);
          let statVal = this.formatNumber(value)
            .toString()
            .split(".");
          return this.formatNumber(value);
          // let val =
          //   statIntVal + "." + str[1].substr(0, 1) + str[1].substr(1, 1);
          // return val;
        } else {
          // console.log("else => ", value);
          return this.formatNumber(value);
        }
      }
    },
    formatNumberInt(value) {
      return parseInt(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.$store.dispatch("setPathMenuService", "orders");
      // this.$store.dispatch("setPathMenuService")
      // this.$store.dispatch("selectedMenuService" , {m_code : 'orders'})
    }
  },
  components: {
    "menu-header": require("../Salesops/layout/menu-top"),
    "menu-left": require("../Salesops/layout/menu-left"),
    "sales-period-block": require("../Salesops/customComponent/sales-period-filter"),
    "md-search-box": require("../Salesops/customComponent/md-search-box"),
    "md-dropdown-box": require("../Salesops/customComponent/md-dropdown-box")
  }
};
</script>
<style lang="scss" scoped>
#pageByCustomer {
  .md-dropdown-box {
    background: #efefef;
  }
}
</style>