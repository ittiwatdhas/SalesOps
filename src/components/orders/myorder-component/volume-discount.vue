<template>
  <div>
    <!-- 'top':option.displayIcon +'px', 'left':653+'px', -->
    <div
      class="arrow-left"
      :style="{'position': 'absolute','z-index': '1001' , 
      'top':option.displayIcon +'px', 'left':79.5+'%',
      'visibility' : option.display ? 'visible':'hidden'
      }"
    ></div>
    <div
      class="arrow-left-cover"
      :style="{'position': 'absolute',
      'z-index': '1001', 
      'top':option.displayIcon+3 +'px', 
      'left':820 +'px',
      'visibility' : option.display ? 'visible':'hidden'
      }"
    ></div>
    <div
      class="volume-discount"
      id="volume-discount"
      :style="{'top': option.top +'px','left': option.left +'px',
        'position':'absolute',
        'z-index':'1000',
        'width' : '77.5%',
        'visibility' : option.display ? 'visible':'hidden'
        }"
    >
      <div class="detail-scroll-table" :style="{'max-height' : '300px' ,'height' :'auto'}">
        <div
          class="detail-table"
          :style="{'margin-top': index == 0 ? '5px' : '3px' ,'color':'rgba(0, 0, 0, 0.87)'}"
          v-for="(row , index) in volDisList"
          :key="'tbitems'+index"
        >
          <div style="width:4%;padding-top:8px;padding-left:1px">
            <div class="rectangle-vol-tag"></div>
          </div>
          <div style="width:38.5%;padding-top:5px;padding-left:10px">
            {{row.item_code}}
            <label style="font-family:kanit;">&nbsp;&nbsp;{{row.item_name}}</label>
          </div>
          <div style="width:12%;padding-top:5px;" class="text-right">฿ {{formatNumber(row.ppu)}}</div>
          <div style="width:12%;padding-top:5px;" class="text-right">
            <span v-if="showBath(row) == true">฿</span>
            {{showBath(row , 'value')}}
          </div>
          <div
            class="ipt-table text-right netpriceCls"
            :style="{'padding-left': '3%','width':'11%'}"
            v-if="option.display"
          >
            <template>
              <mds-input
                :ref="`item_${row.item_code}`"
                :class="warningStock(row)"
                :id="'netprice-vol-'+row.item_code"
                v-model="row.price"
                :table="'ppuVol'"
                :index="index"
                :indexDetail="index"
                type="detail"
                :readOnly="!row.editMode"
              ></mds-input>
            </template>
          </div>
          <div
            :style="{'width':'2%' , 'visibility':'hidden'}"
            @click="editNetPrice({indexDetail : index , row :row , indexParent : 'no'} , $event)"
          >
            <!-- :style="{'width':'2%' , 'visibility':row.flag_status == 'A' || row.flag_status == 'CP'|| row.flag_status == 'F' ?'visible':'hidden'}" -->
            <md-icon class="edit-net-price" :style="{'cursor' : 'pointer'}">edit</md-icon>
          </div>
          <div style="width:7%;padding-top:5px;" class="text-center">{{countDiscount(row , true)}}</div>
          <div style="width:7.5%;padding-left:1%;" class="ipt-table" v-if="option.display">
            <template>
              <mds-input
                v-model="row.order_qty"
                :table="'qtyVol'"
                :index="index"
                :errorMsg="row.error_stock"
                type="detail"
              ></mds-input>
            </template>
          </div>
          <div
            style="width:6%;padding-top:7px;padding-left:1%;color:rgba(0, 0, 0, 0.87)"
            class="unit"
          >{{row.unit}}</div>
        </div>
        <div style="width:100%;display: -webkit-box;padding-top: 10px;">
          <div
            style="width:85%;text-align:right;padding-right:15px;color;#5A5A5A;font-size:12px;font-weight:bold"
          >Total volume Discount</div>
          <div
            style="width:15%;text-align:right;padding-right:36px;color:#5A5A5A;font-size:12px;font-weight:bold"
          >{{formatNumberInt(totalvolDis)}}</div>
        </div>
      </div>
      <div class="footer">
        <div
          :style="{'width':renderCol()}"
          v-for="row in textRange"
          :key="row.code + 'type'"
          style="text-aligh:center"
        >
          <span style="font-size:12px;">({{row.code}})</span>&nbsp;
          <span style="color:#5A5A5A;">{{row.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
var show_comment = true;
export default {
  created() {},
  props: ["data", "option", "disabled"],
  data() {
    return {
      keepIndexEdit: "default"
    };
  },
  computed: {
    volDisList() {
      return this.$store.getters["myorders/volDisList"];
    },
    totalvolDis() {
      return this.$store.getters["myorders/totalvolDis"];
    },
    textRange() {
      return this.$store.getters["myorders/textRange"];
    },
    items() {
      return this.$store.getters["myorders/items_order"];
    }
  },
  methods: {
    showBath(row, mode) {
      if (_.isNull(row.priceVD) || row.priceVD == "" || row.priceVD == null) {
        if (mode == "value") {
          return "";
        } else {
          return false;
        }
      } else {
        if (mode == "value") {
          if (parseFloat(row.priceVD) == 0) {
            return "";
          } else {
            return this.formatNumber(row.priceVD);
          }
        } else {
          if (parseFloat(row.priceVD) == 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    renderCol() {
      let total = 100 / this.textRange.length;

      return total + "%";
    },
    warningStock(row) {
      let item = this.items.find(todo => todo.item_code === row.item_code);
      if (typeof item != "undefined") {
        let ppu = item.ppu != false ? parseFloat(item.ppu) : 0;
        let price = parseFloat(item.price);
        if (
          ppu != price &&
          (item.flag_status == "F" ||
            item.flag_status == "CP" ||
            item.flag_status == "FV" ||
            item.flag_status == "CV")
        ) {
          return "warning-stock";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    close() {
      this.$emit("close", false);
    },
    editNetPrice(value, e) {
      let item = "netprice-vol-" + value.row.item_code;
      let el = document.getElementById(item);
      let theArray = this.volDisList;
      if (value.indexParent == "no") {
        if (this.keepIndexEdit == "default") {
          theArray[value.indexDetail].editMode = true;
          this.keepIndexEdit = value.indexDetail;
        } else if (this.keepIndexEdit != value.indexDetail) {
          theArray[value.indexDetail].editMode = true;
          theArray[this.keepIndexEdit].editMode = false;
          this.keepIndexEdit = value.indexDetail;
        } else if (this.keepIndexEdit == value.indexDetail) {
          theArray[value.indexDetail].editMode = false;
          this.keepIndexEdit = "default";
        }
      } else {
        if (this.keepIndexEdit != "default") {
          theArray[this.keepIndexEdit].editMode = false;
        }
      }
      setTimeout(function() {
        el.focus();
      }, 100);
    },
    countDiscount(value, mode) {
      let rsPPU = value.ppu - value.price;
      let rs = rsPPU / value.ppu;
      let dash = mode == true ? "-" : "";
      if (rs > 0) {
        let total = this.formatNumber(rs * 100);
        let str = total.toString().split(".");
        if (str.length == 1) {
          return dash + this.formatNumberInt(total) + "%";
        } else {
          let sunStr = str[1].length;
          if (sunStr == 2 && str[1] == "00") {
            return dash + this.formatNumberInt(total) + "%";
          } else if (
            sunStr == 2 &&
            str[1].substr(0, 1) != "0" &&
            str[1].substr(1, 1) == "0"
          ) {
            return (
              dash +
              parseFloat(total).toLocaleString(undefined, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
              }) +
              "%"
            );
          } else if (
            sunStr == 2 &&
            str[1].substr(0, 1) != "0" &&
            str[1].substr(1, 1) != "0"
          ) {
            return dash + this.formatNumber(total) + "%";
          } else if (sunStr > 2) {
            let statIntVal = this.formatNumberInt(total) + "%";
            let statVal = this.formatNumber(total) + "%".toString().split(".");
            return dash + this.formatNumber(total) + "%";
          } else {
            return dash + this.formatNumber(total) + "%";
          }
        }
      } else {
        return "-";
      }
    },
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    }
  },
  components: {
    "mds-input": require("./orderqty-input")
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
.arrow-left {
  box-sizing: border-box;
  border: 0.5em solid black;
  border-color: transparent transparent #ffffff #ffffff;
  transform-origin: 0 0;
  transform: rotate(44deg);
  box-shadow: 1px -2px 2.5px 0 rgba(0, 0, 0, 0.16);
}
.arrow-left-cover {
  width: 11px;
  height: 11px;
  background: white;
  transform: rotate(44deg);
}
.volume-discount {
  background: #ffffff;
  border-radius: 3px;
  width: 68%;
  // width: 409px;
  box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.16);
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  .footer {
    width: 100%;
    display: -webkit-box;
    height: 48px;
    background: #f7f7f7;
    padding-top: 13px;
    padding-left: 40px;
    padding-right: 10px;
    color: #727272;
    font-size: 16px;
    font-family: $font-roboto;
  }
  .detail-scroll-table {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    padding-left: 8px;
    padding-bottom: 15px;
    padding-top: 12px;
    .edit-net-price {
      font-size: 14px;
      color: #a8a8a8;
      padding-left: 5px;
      padding-top: 7px;
    }
    .detail-table {
      width: 100%;
      margin-right: 1%;
      display: flex;
      font-size: 13px;
      color: #5a5a5a;
      .ipt-table {
        padding-left: 15px;
        .md-input-container {
          margin: unset;
          padding: unset;
          height: 30px;
          min-height: 30px;
        }
        .md-input-container.md-input-disabled:after {
          background-color: rgba(0, 0, 0, 0.12);
          background-image: unset;
        }
        &.netpriceCls {
          .md-input-container.md-input-disabled:after {
            background-color: white;
            background-image: unset;
          }
        }
      }
      .rectangle-vol-tag {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background: #efefef;
      }
      .unit {
        color: #898989;
        font-size: 11px;
        font-family: kanit;
      }
    }
    &::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background: #efefef;
      border-radius: 3px;
    }
  }
}
</style>

