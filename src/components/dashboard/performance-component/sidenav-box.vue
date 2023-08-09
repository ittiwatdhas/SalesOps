<template>
  <div class="sidenav-box">
    <div class="first-box">
      <div class="main-title">{{data.code}}&nbsp;&nbsp;{{data.item_name}}</div>
      <div class="main-value">
        <div class="achieved">฿&nbsp;{{$store.getters["globalfunc/formatNumber"](data.achieved)}}</div>
        <div style="width:46%;text-align: -webkit-right;">
          <span style="color:#BDBDBD; font-size:14px" class="pr-10">Quota</span>
          <span
            style="color:#434343;font-size:18px"
          >฿&nbsp;{{$store.getters["globalfunc/formatNumber"](data.target)}}</span>
        </div>
        <div style="width:8%"></div>
      </div>
      <div style="display: -webkit-box;width:100%;padding-bottom:18px">
        <div class="progress-bar-box" style="padding: 0px 13px 0px 30px;width:85%">
          <md-progress
            :class="renderProgressBar(data.percent, data.pass_percent)"
            :md-progress="data.percent"
          ></md-progress>
        </div>
        <div style="width:15%;padding-right:2%">
          <div class="md-progress-text">{{$store.getters["globalfunc/checkPoint"](data.percent)}}%</div>
        </div>
      </div>
    </div>
    <div class="second-box">
      <div style="width:50%;text-align:left;font-size:16px;padding-top:5px">By Customer</div>
      <div style="width:50%;text-align:right;padding-right:5%">
        <md-dropdown-box
          style="width:100%; "
          :placeholder="$store.getters['performance_dashboard/keep_CGDP_POP']"
          :data="$store.getters['performance_dashboard/sortby_list']"
          @choose="selectCGDP"
        ></md-dropdown-box>
        <!-- :placeholder="'Highest Achieve ( % )'" -->
      </div>
    </div>
    <md-spinner
      style="z-index:10;position:fixed;left:37%"
      :md-size="150"
      :md-stroke="1"
      v-show="$store.getters['performance_dashboard/spinner_sidenav']"
      md-indeterminate
    ></md-spinner>
    <div class="thirtd-box">
      <div v-if="dataDetail.length ==0" style="padding-top:20%">No data..</div>
      <div v-for="(row , index) in dataDetail" :key="'sidenav-box' + index">
        <md-card>
          <md-card-content>
            <div class="text-left">
              <span style="color:#484848;font-size:14px" class="pr-15">{{row.code}}</span>
              <span style="color:#484848;font-size:16px;font-family:kanit">{{row.item_name}}</span>
            </div>
            <div class="main-value text-left">
              <div class="achieved">฿&nbsp;{{$store.getters["globalfunc/formatNumber"](row.sale)}}</div>
              <div style="width:40%;text-align: -webkit-right;">
                <span style="color:#BDBDBD; font-size:10px" class="pr-10">Quota</span>
                <span
                  style="color:#434343;font-size:14px"
                >฿&nbsp;{{$store.getters["globalfunc/formatNumber"](row.target)}}</span>
              </div>
              <div style="width:14%"></div>
            </div>
            <div style="display: -webkit-box;width:100%">
              <div class="progress-bar-box" style="padding: 0px 13px 0px 0px;width:90%">
                <md-progress
                  :class="renderProgressBar(row.percent,row.pass_percent)"
                  :md-progress="row.percent"
                ></md-progress>
              </div>
              <div style="width:10%;">
                <div
                  class="md-progress-text"
                >{{$store.getters["globalfunc/checkPoint"](row.percent)}}%</div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  create() {},
  props: ["data", "dataDetail"],
  data() {
    return {};
  },
  components: {
    "md-dropdown-box": require("./md-dropdown-box")
  },
  methods: {
    selectCGDP(value) {
      let obj = this.$store.getters["performance_dashboard/cg_selected"];
      obj.sort_by = value.text;
      this.$store.commit("performance_dashboard/keepCGPOP", value.text);
      this.$store.dispatch("performance_dashboard/getProdDetail", obj);
    },
    renderProgressBar(percent, pass_percent) {
      if (isNaN(parseFloat(percent)) || parseFloat(percent) < 0) {
        return "gray";
      } else {
        if (parseFloat(percent) < 50) {
          return "red";
        } else if (
          parseFloat(percent) < parseInt(pass_percent) &&
          parseFloat(percent) >= 50
        ) {
          return "orange";
        } else if (parseFloat(percent) >= parseInt(pass_percent)) {
          return "green";
        }
      }
    }
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
.sidenav-box {
  width: 100%;
  .md-dropdown-box {
    background: #efefef;
  }
  .first-box {
    background: #f7f7f7;
    // background: #fff;
    font-family: $font-roboto;
    .main-title {
      text-align: left;
      font-size: 18px;
      padding: 20px 30px 30px 30px;
    }
    .main-value {
      // font-family: $font-roboto;
      // font-family: $font-lato;
      width: 100%;
      padding: 0px 30px 5px 30px;
      display: -webkit-box;
      text-align: left;
      line-height: 15px;
      .achieved {
        font-weight: 100;
        // opacity: 0.8;
        width: 46%;
        // width: 50%;
        color: #434343;
        font-size: 24px;
      }
    }
  }
  .second-box {
    width: 100%;
    padding-left: 30px;
    display: -webkit-box;
    padding-top: 15px;
    margin-bottom: 20px;
  }
  .thirtd-box {
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    .md-card {
      margin-bottom: 8px;
      border-radius: 4px;
      box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.12);
      // box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
      .md-card-content {
        padding: 10px 25px 10px 25px;
        .main-value {
          line-height: 12px;
          margin-top: 15px;
          display: -webkit-box;
          .achieved {
            width: 46%;
            // width: 50%;
            font-weight: lighter;
            font-size: 14px;
          }
        }
      }
    }
  }
  // display: -webkit-box;
}
</style>

