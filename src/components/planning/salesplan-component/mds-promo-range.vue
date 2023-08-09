<template>
  <div :style="{'display' : proproty.display}" @mouseleave="mouseLeave">
    <div
      class="arrow-left"
      :style="{'position': 'absolute','z-index': '20' , 
      'top':proproty.topIcon +'px', 'left':proproty.leftIcon+'px'}"
    ></div>
    <div
      class="arrow-left-cover"
      :style="{'position': 'absolute','z-index': '22' , 
      'top':proproty.topIcon+5 +'px', 'left':proproty.leftIcon-5 +'px'}"
    ></div>
    <md-card
      class="discount-dialog"
      :style="{'position': 'absolute','z-index': '20' , 
      'top':proproty.top +'px', 'left':proproty.left+'px'}"
    >
      <md-card-content>
        <div class="content-txt">
          <md-layout style="margin-bottom:5px">
            <div
              class="disc-block"
              v-for="(rows , index) in rangeDisc"
              :style="{'margin-left' :index == 0 ? '' :'4px'}"
              @click="addOrderFromDis(rows)"
              :key="'dis' + index"
            >+{{rows}}</div>
            <div class="disc-block-action" :style="{'margin-left' : '4px'}" @click="doneDialog">
              <md-icon style="font-size:15px;padding-top:4px">done</md-icon>
            </div>
          </md-layout>
          <md-layout>
            <div
              class="disc-block"
              v-for="(rows , index) in rangeDisc2"
              :style="{'margin-left' :index == 0 ? '' :'4px'}"
              @click="addOrderFromDis(rows)"
              :key="'dis2' + index"
            >+{{rows}}</div>
            <div class="disc-block" :style="{'margin-left' : '4px'}" @click="copyTargetPerRow">
              <md-icon style="font-size:15px;padding-top:4px">filter_none</md-icon>
            </div>
            <div
              class="disc-block-action"
              :style="{'margin-left' : '4px'}"
              @click="clearOrderPerRow"
            >
              <md-icon style="font-size:15px;padding-top:4px">backspace</md-icon>
            </div>
          </md-layout>
          <md-layout style="margin-top:10px;color: #5A5A5A;font-size: 12px;">
            <md-layout md-flex="flex-50">Items</md-layout>
            <md-layout md-flex="flex-50" md-align="end">Voume Discount</md-layout>
          </md-layout>
          <md-layout
            v-for="(rows , index) in discList"
            :key="'disD'+index"
            style="font-size: 12px;"
          >
            <md-layout
              md-flex="flex-50"
              :style="{'color' : proproty.selected === rows.low ? '#FD7F00' :'#5A5A5A'}"
            >{{rows.range}}</md-layout>
            <md-layout
              md-flex="flex-50"
              :style="{'color' : proproty.selected === rows.low? '#FD7F00' :'#5A5A5A'}"
              md-align="end"
            >{{rows.percent}}%</md-layout>
          </md-layout>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  created: function() {
    // this.tmpData = this.value;
  },
  computed: {
    productCat() {
      return this.$store.getters.sp_arr_sales;
    },
    discList() {
      return this.$store.getters.sp_disc_list;
    }
  },
  props: {
    proproty: Object
  },
  methods: {
    mouseLeave: function() {
      if (this.proproty.display == "-webkit-box") {
        this.proproty.display = "none";
      }
    },
    addOrderFromDis(value) {
      let rowIndex = this.proproty.rowIndex;
      var emp_id = Vue.localStorage.get("emp_id");
      // var key = this.$ga_key.Planning_Salesplan_CopyOrderQty;
      // key.eventLabel = "addOrderFromDis:" + emp_id;
      // this.$ga.event(key);

      let theArray = this.productCat;
      if (theArray.length > 0) {
        if (isNaN(parseFloat(theArray[rowIndex].order_qty))) {
          theArray[rowIndex].order_qty = value;
        } else {
          theArray[rowIndex].order_qty =
            parseInt(theArray[rowIndex].order_qty) + value;
        }
      }
      this.checkRange();
    },
    copyTargetPerRow() {
      let rowIndex = this.proproty.rowIndex;
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_CopyOrderQty;
      key.eventLabel = "CopyOrderQty:" + emp_id;
      this.$ga.event(key);

      let theArray = this.productCat;
      if (theArray.length > 0) {
        theArray[rowIndex].order_qty = theArray[rowIndex].target_qty;
        // this.$store.dispatch("saveOrderQtyOfItem", {
        //   year: this.$store.getters.sp_cust_head.year,
        //   month: this.$store.getters.sp_cust_head.month,
        //   cust_code: this.$store.getters.sp_cust_selected.cust_code,
        //   prod_grp: theArray[rowIndex].prod_code,
        //   grp_order_qty: theArray[rowIndex].order_qty,
        //   prod_code: 0,
        //   order_qty: 0,
        //   sales_item: 0,
        //   rowIndex: rowIndex
        // });
      }
      this.checkRange();
    },
    clearOrderPerRow() {
      let rowIndex = this.proproty.rowIndex;
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClearByGroup;
      key.eventLabel = "ClearByGroup:" + emp_id;
      this.$ga.event(key);

      if (this.productCat.length > 0) {
        this.productCat[rowIndex].order_qty = "";
      }
      this.proproty.selected = "";
    },
    checkRange() {
      let theArray = this.productCat;
      let rowIndex = this.proproty.rowIndex;
      for (let index = 0; index < this.discList.length; index++) {
        if (
          this.discList[index].low <= theArray[rowIndex].order_qty &&
          this.discList[index].high >= theArray[rowIndex].order_qty
        ) {
          this.proproty.selected = this.discList[index].low;
          break;
        }
      }
    },
    doneDialog() {
      this.proproty.display = "none";
    }
  },
  data() {
    return {
      rangeDisc: [1, 5, 10, 50],
      rangeDisc2: [100, 500, 1000]
    };
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.arrow-left {
  box-sizing: border-box;
  border: 0.5em solid black;
  border-color: transparent transparent #ffffff #ffffff;
  transform-origin: 0 0;
  transform: rotate(44deg);
  box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
}
.arrow-left-cover {
  width: 11px;
  height: 11px;
  background: white;
  transform: rotate(44deg);
}
.disc-block {
  height: 26px;
  width: 43px;
  border-radius: 3px;
  color: white;
  font-size: 12px;
  background: #fd7f00;
  text-align: center;
  padding-top: 1px;
  cursor: pointer;
}
.disc-block-action {
  height: 26px;
  width: 75px;
  border-radius: 3px;
  color: white;
  font-size: 12px;
  background: #a8a8a8;
  text-align: center;
  padding-top: 1px;
  cursor: pointer;
}
.md-card {
  &.discount-dialog {
    .md-card-content {
      padding: unset;
      .content-txt {
        padding: 10px;
        background: #ffffff;
      }
      &:last-child {
        padding-bottom: unset;
      }
    }
  }
}
</style>
