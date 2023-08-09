<template>
  <div class="bycg-box">
    <md-card style="position:unset !important">
      <md-card-content>
        <div class="bycg-box-row">
          <div class="main-title">SALES PERFORMANCE BY CG</div>
          <div style="width:65%; display: -webkit-box;" id="search-bycg-blog">
            <md-search-box
              style="width:60%;padding-right:10px"
              :placeholder="'Search'"
              :data="$store.getters['performance_dashboard/filter_bycg']"
              @filter="searchCG"
              @clear="clearSearch"
              @choose="selectCG"
              @mouseleave="mouseLeave"
            ></md-search-box>
            <md-dropdown-box
              :disabled="disabledDpcg"
              style="width:40%; "
              :placeholder="$store.getters['performance_dashboard/keep_CGDP']"
              :data="sortbyList"
              @choose="selectCGDP"
            ></md-dropdown-box>
          </div>
        </div>
        <div class="bycg-table">
          <div :class="'head-table'">
            <div class="text-left" style="width: 8%;">Code</div>
            <div class="text-left" style="width: 30%;">CG Name</div>
            <div class="text-right" style="width: 14.5%;">Target</div>
            <div
              class="text-right"
              style="width: 14.5%;cursor:pointer"
              @click="sortData('achieved')"
            >Achieved
              <md-icon v-if="sort_achieved">arrow_drop_down</md-icon>
              <md-icon v-else>arrow_drop_up</md-icon>
            </div>
            <div class="text-center" style="width: 9%;">Outlets</div>
            <div
              class="text-left"
              style=" width: 24%;padding-left:2%;cursor:pointer"
              @click="sortData('progress')"
            >Progress
              <md-icon v-if="sort_progress">arrow_drop_down</md-icon>
              <md-icon v-else>arrow_drop_up</md-icon>
            </div>
            <div style="width: 10px;"></div>
          </div>
          <div
           @scroll="handleScroll"
          style="height: 685px ;overflow-y:auto"
           class="detail-blog content-dialog">
            <div
              v-if="bycgList.length ==0"
              style="padding-top:20px;padding-bottom:20px;text-align:center;opacity: 0.54;"
            >No data..</div>
            <div
              v-for="(items , index) in bycgList"
              :key="'bycg-box-'+index"
              :class="items.checked ?'content-table selected':'content-table'"
              @click="openDatail(items)"
              :id="'bycg-box' + items.code"
              
            >
              <div class="text-column" style="width: 8%">{{items.code}}</div>
              <div class="text-column" style="width:30%;font-family:kanit">{{items.item_name}}</div>
              <div class="number-column" style="width: 14.5%;">
                <span style="padding-right:4px;color:#5A5A5A">฿</span>
                {{$store.getters['globalfunc/formatNumber'](items.target)}}
              </div>
              <div class="text-right" style="width: 14.5%;font-size:13px;font-family:roboto">
                <span style="padding-right:4px;color:#5A5A5A">฿</span>
                {{$store.getters['globalfunc/formatNumber'](items.achieved)}}
              </div>
              <div
                class="text-center"
                style="width: 9%;"
              >{{$store.getters['globalfunc/formatNumberInt'](items.outlets)}}</div>
              <div class="progress-bar-box" style="width: 15%;">
                <md-progress
                  :class="renderProgressBar(items.percent,items.pass_percent)"
                  :md-progress="changeVal(items.percent)"
                ></md-progress>
              </div>
              <div
                class="md-progress-text"
              >{{$store.getters['globalfunc/checkPoint'](items.percent)}}%</div>
              <div class="number" style="width: 3%;opacity: 0.54;padding-left:5px;cursor:pointer">
                <md-icon>keyboard_arrow_right</md-icon>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
    <md-sidenav
      id="performanceOrderDG"
      class="md-right md-fixed z-index-10"
      ref="rightSidenav"
      @open="open('Right')"
      @close="close('Right')"
    >
      <md-toolbar>
        <div class="md-toolbar-container">
          <md-icon @click.native="closeRightSidenav" id="md-sidenav-perform">close</md-icon>
          <h3 class="md-title">Product Group Detail by Customer</h3>
        </div>
      </md-toolbar>
      <div>
        <sidenav-box
          :data="selected_cg"
          :dataDetail="$store.getters['performance_dashboard/bycg_detail']"
        ></sidenav-box>
      </div>
    </md-sidenav>
  </div>
</template>

<script>
export default {
  create() {},
  props: {},
  data() {
    return {
      sort_tripdate: true,
      sort_progress: true,
      sort_achieved: true,
      selected_cg: [],
      keepDP: "lowest_achieve"
    };
  },
  computed: {
    bycgList() {
      return this.$store.getters["performance_dashboard/bycg_list"];
    },
    disabledDpcg() {
      return this.$store.getters["performance_dashboard/disabled_dpcg"];
    },
    sortbyList() {
      return this.$store.getters["performance_dashboard/sortby_list"];
    }
  },
  methods: {
    handleScroll(event) {
      this.showBackToTop = true;
      document.getElementById("pagePerformanceOrder").click();
      document.activeElement.blur();;
    
        this.$store.dispatch("performance_dashboard/getByCGScroll");
      
    },
    changeVal(val) {
      return parseFloat(val);
    },
    open(ref) {
      // console.log("Opened: " + ref);
    },
    close(ref) {
      // console.log("Closed: " + ref);
    },
    openDatail(value) {
      if (this.$refs.rightSidenav.classes == false) {
        document.getElementsByClassName("vue-back-to-top")[0].style.visibility =
          "hidden";
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        this.$refs.rightSidenav.toggle();
      }
      value.sort_by = this.keepDP;
      this.$store.dispatch("performance_dashboard/getProdDetail", value);
      this.$store.commit(
        "performance_dashboard/keepCGPOP",
        this.$store.getters["performance_dashboard/keep_CGDP"]
      );
      this.$store.dispatch("performance_dashboard/hilightRowCG", value.code);
      this.selected_cg = value;
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    sortData(value) {
      if (value == "achieved") {
        this.sort_achieved = !this.sort_achieved;
      } else {
        this.sort_progress = !this.sort_progress;
      }

      let filter = [
        {
          name: "achieved",
          sort: this.sort_achieved == true ? "DESC" : "ASC",
          step: value == "achieved" ? 1 : 2
        },
        {
          name: "progress",
          sort: this.sort_progress == true ? "DESC" : "ASC",
          step: value == "progress" ? 1 : 2
        }
      ];
      this.$store.dispatch("performance_dashboard/filterCGDP", filter);
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
    },
    selectCGDP(value) {
      this.keepDP = value.text;
      this.$store.commit("performance_dashboard/keepCGP", value.text);
      this.$store.commit("performance_dashboard/keepCGPOP", value.text);
      this.$store.dispatch("performance_dashboard/selectCGDP", value);
    },
    searchCG(param) {
      this.$store.dispatch("performance_dashboard/filterCG", param);
    },
    mouseLeave() {
      this.$store.dispatch("performance_dashboard/filterCG", "");
    },
    clearSearch() {
      this.$store.commit("performance_dashboard/setTempProdSearch", "");
    },
    selectCG(value) {
      let id = "bycg-box" + value.code;
      let temp = document.getElementById(id);
      if (temp == null) {
        this.$store.dispatch("performance_dashboard/getProdSearch", value.code);
      } else {
        this.$store.dispatch("performance_dashboard/hilightRowCG", value.code);
        temp.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  },
  components: {
    "md-search-box": require("./md-search-cg-box"),
    "md-dropdown-box": require("./md-dropdown-box"),
    "sidenav-box": require("./sidenav-box")
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
.bycg-box {
  width: 100%;
  display: -webkit-box;
  .md-card {
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    height: 100%;
    width: 100%;
    .md-card-content {
      padding: 20px 20px 7px 10px;
      text-align: left;
      overflow-y: hidden;
      .main-title {
        padding-top: 5px;
        width: 35%;
        color: #a8a8a8;
        font-family: $font-roboto;
        padding-left: 15px;
      }
      .bycg-box-row {
        margin-bottom: 15px;
        display: -webkit-box;
        .md-dropdown-box {
          background: #efefef;
        }
      }
      .bycg-table {
        .head-table {
          font-family: $font-roboto;
          font-size: 12px;
          opacity: 0.54;
          font-weight: 600;
          display: -webkit-box;
          padding: 0px 8px 5px 15px;
        }
        .detail-blog {
          .content-table {
            display: -webkit-box;
            padding: 5px 8px 5px 15px;
            .text-column {
              color: #414141;
              font-size: 13px;
            }
            .number-column {
              color: #5a5a5a;
              font-size: 13px;
              font-size: 13px;
              font-family: roboto;
              text-align: right;
            }
            &.selected {
              border: 1px solid #FD7F00;
              border-radius: 4px;
              // background: #f7f7f7;
            }
          }
          .content-table:hover {
            background: #f7f7f7;
            cursor: pointer;
          }
        }
      }
    }
  }
  #performanceOrderDG {
    .md-toolbar {
      padding-left: 10px;
      color: #ffffff;
      .md-icon {
        padding-left: 15px;
        margin-left: 0px;
        margin-right: 10px;
        cursor: pointer;
      }
      .md-title {
        padding-left: 25px;
        font-family: $font-roboto;
        font-size: 20px;
      }
    }
  }
}
</style>

