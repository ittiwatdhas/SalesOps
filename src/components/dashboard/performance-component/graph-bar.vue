<template>
  <div class="graph-bar">
    <div style="width:23%;">
      <md-card>
        <md-card-content>
          <div class="card-title main">
            <b>{{detail.title}}</b>
            <md-tooltip md-direction="top">
              <span style="font-family:kanit">{{detail.title}}</span>
            </md-tooltip>
          </div>
          <div style="margin-bottom:15px">
            <div class="card-title">
              <span
                style="font-size:24px;"
              >{{$store.getters["globalfunc/formatNumberInt"](detail.visit)}}</span>
              <span style="font-size:15px;">({{$store.getters["globalfunc/formatNumberInt"](detail.visit_percent)}}%)</span>
            </div>
            <div class="card-sub-title">Visited</div>
          </div>
          <div style="margin-bottom:15px">
            <div class="card-title">
              <span
                style="font-size:24px;"
              >{{$store.getters["globalfunc/formatNumberInt"](detail.total_paln)}}</span>
            </div>
            <div class="card-sub-title">Total Planned</div>
          </div>
          <div style="margin-bottom:15px">
            <div class="card-title">
              <span
                style="font-size:24px;"
              >{{$store.getters["globalfunc/formatNumberInt"](detail.unplan)}}</span>
            </div>
            <div class="card-sub-title">Unplanned Visits</div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="graph-zone">
      <md-card>
        <md-card-content>
          <chart :options="options"></chart>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import Chart from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
export default {
  create() {},
  props: ["options", "detail"],
  data() {
    return {};
  },
  methods: {},
  components: {
    Chart
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
.graph-bar {
  height: 240px;
  width: 100%;
  display: -webkit-box;
  .md-card {
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
    height: 100%;
    .md-card-content {
      height: 240px;
      padding: 16px 18px 7px 20px;
      text-align: left;
      overflow-y: hidden;
      .card-title {
        color: #5a5a5a;
        &.main {
          font-size: 18px;
          margin-bottom: 17px;
          font-family: kanit;
          display: block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .card-sub-title {
        color: #a8a8a8;
      }
    }
  }
  .graph-zone {
    width: 77%;
    padding-left: 20px;
    .md-card-content {
      padding: 0px;
    }
  }
  .echarts {
    width: 100%;
    height: 100%;
    overflow: hidden;
    div {
      height: 100%;
    }
  }
}
</style>

