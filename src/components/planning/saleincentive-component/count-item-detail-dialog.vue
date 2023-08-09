<template>
  <div v-if="datas.head.type =='count_items'" class="tactics1">
    <div style="width:100%;display:flex" class="title-1">
      <div
        style="width:100%"
      >{{datas.head.sm_code}}&nbsp;:&nbsp;{{datas.head.sm_name}}</div>
      <div style="width:33%">
        PAID : (฿)
        {{subPoint(datas.head.total , 'front')}}
        <span
          style="font-size:14px;"
        >{{subPoint(datas.head.total , 'back')}}</span>
      </div>
      <div style="width:3%;text-align: end;">
        <md-icon style="cursor:pointer" @click.native="close">close</md-icon>
      </div>
    </div>
    <div class="body-cons">
      <div class="borders">
        <div class="box-1" style="width:100%">{{datas.head.title}}</div>
        <div v-if="datas.detail.length == 0 " style="color: rgba(0, 0, 0, 0.54);font-size:15px;font-family:lato;text-align:center;padding-top:10%">No data...</div>
        <div style="width:100%;" v-for="(row,index) in datas.detail" :key="'count-item-'+index">
          <!--ROW 1-->
          <div
            style="width:100%;display: flex;"
            class="mds-body"
            v-for="(record, idx) in row.tac_use"
            :key="'tac_use-'+idx"
          >
            <div style="width:100%;display: flex;padding-top:20px">
              <div
                style="width:25%;padding-top:5px;padding-left:42px;"
                class="text-1"
              >{{record.title}}</div>
              <div style="width:18%;">
                <md-input-container style="margin:0px;">
                  <md-select v-model="record.symbols_code" :disabled="true">
                    <md-option
                      :value="row.code"
                      v-for="row in masterStep1.arrSymbols"
                      :key="'a-arrdg1'+row.code"
                    >{{row.title}}</md-option>
                  </md-select>
                </md-input-container>
              </div>
              <div
                style="width:25%;padding-left:3%;padding-right:5%;padding-top:12px;"
                class="under-line"
              >
                <div style="width:100%;">
                  <div class="title-ipt-roboto" style="text-align:center">
                    <span style="font-size:14px;color:#5a5a5a">{{renderUnit(record.unit_code)}}</span>
                    &nbsp;&nbsp;
                    {{fmFull(row.math_value)}}
                  </div>
                </div>
              </div>
              <div style="width:27%;padding-right:40px;">
                <md-input-container style="margin:0px;">
                  <md-select v-model="record.unit_code" :disabled="true">
                    <md-option
                      :value="row.code"
                      v-for="row in masterStep1.arrUnits"
                      :key="'b-arrdg1'+row.code"
                    >{{row.title}}</md-option>
                  </md-select>
                </md-input-container>
              </div>
            </div>
            <div style="width:5%;"></div>
          </div>
          <!--ROW 2-->
          <div style="width:100%;display: flex;padding-top:25px">
          <!-- <div style="width:100%;display: flex;"> -->
            <div
              style="width:25%;padding-top:5px;padding-left:42px;text-align:left"
              class="text-1"
            >เพดานเงินรางวัล</div>
            <div style="width:18%;">
              <md-input-container style="margin:0px">
                <md-select v-model="row.range_code" :disabled="true">
                  <md-option
                    :value="row.code"
                    v-for="row in masterStep1.arrRange"
                    :key="'c-arrdg1'+row.code"
                  >{{row.title}}</md-option>
                </md-select>
              </md-input-container>
            </div>
            <div
              style="width:25%;padding-left:5%;padding-top:12px;padding-right:5%"
              class="under-line"
            >
              <div class="title-ipt-roboto" style="text-align:center">{{fmFull(row.max_reward)}}</div>
            </div>
            <div style="width:32%"></div>
          </div>
          <!--ROW 3-->
          <div
            v-if="row.rewards.length > 0"
            :style="{'padding-right':'30px','width':'100%','display':'flex','font-family':'lato','font-size':'12px','margin-top':'20px','margin-bottom':'8px'}"
          >
            <div style="width:25%;font-family:kanit;font-size:14px;padding-left:42px">ขั้นเงินรางวัล</div>
            <div style="width:15%;text-align:center">
              <b>Count Items</b>
            </div>
            <div style="width:15%;text-align:center">
              <b>Target Items</b>
            </div>
            <div style="width:15%;text-align:center">
              <b>Achieved (%)</b>
            </div>
            <div style="width:15%;text-align:center">
              <b>Target (%)</b>
            </div>
            <div style="width:15%;text-align:right;padding-right:3%">
              <b>Incentive (฿)</b>
            </div>
          </div>
          <div
            v-for="(line,indexs) in row.rewards"
            :key="'count-item-'+index+'-rewards-'+indexs"
            :style="{'padding-right':'30px','width':'100%','display':'flex', 'margin-bottom': indexs == row.rewards.length-1 ? '10px':'unset'}"
          >
            <div style="width:25%;" class="text-1"></div>
            <div style="width:75%" :class="line.rank ? 'borders-rank':''">
              <div style="display:flex;width:100%;padding:5px 0px;">
                <div style="width:25%;text-align:center">{{fmFull(line.actual)}}</div>
                <div style="width:25%;text-align:center">{{fmFull(line.target_b)}}</div>
                <div style="width:25%;text-align:center">{{fmFull(line.achieved)}}</div>
                <div style="width:25%;text-align:center">{{fmFull(line.target)}}</div>
                <div style="width:25%;text-align:right;padding-right:5%">{{fmFull(line.incentive)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "count-item-confirm",

  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  computed: {
    masterStep1() {
      return this.$store.getters["incentive/masterStep1"];
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    subPoint(value, pos) {
      let rs = this.fmFull(value);
      let master = rs.split(".");
      if (pos == "front") {
        return master[0];
      } else {
        if (master.length > 1) {
          return "." + master[1];
        } else {
          return "";
        }
      }
    },
    renderUnit(value) {
      if (value == 1) {
        return "%";
      } else {
        return "฿";
      }
    },
    fmInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    fm(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    fmFull(value) {
      if (_.isNaN(parseFloat(value))) {
        return "";
      } else {
        var test = value.toString().indexOf(".");
        if (test == -1) {
          return this.fmInt(value);
        } else {
          return this.fm(value);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.tactics1 {
  .title-1 {
    background: #efefef;
    padding: 20px 30px;
    // margin-bottom: 15px;
    color: #414141;
    font-size: 19px;
    font-family: kanit;
  }
  .body-cons {
    padding: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 200px);
    
    .borders {
      border: 1px solid #efefef;
    }
    .box-1 {
      padding: 30px 30px 0px 35px;
      font-family: kanit;
      font-size: 18px;
      font-weight: 600;
    }
    .title-ipt-roboto,
    .title-ipt-kanit {
      height: 20px;
      color: #414141;
      font-size: 13px;
      line-height: 1;
      padding-bottom: 2px;
      font-family: roboto;
      border-bottom: 1px solid rgba(201, 201, 201, 0.57);
    }
    .text-1 {
      font-family: kanit;
    }
    .md-input-container.md-input-disabled:after {
      background-image: none;
      border-bottom: 1px solid rgba(201, 201, 201, 0.57);
    }
    .md-select .md-select-value {
      font-family: kanit;
      font-size: 14px;
    }
    .borders-rank {
      border: 1px solid #fd7f00;
      border-radius: 3px;
      background: #fd7f001a;
    }
  }
  .body-cons::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: #f7f7f7;
  }
  .body-cons::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}
</style>
