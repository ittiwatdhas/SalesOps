<template>
  <div class="order-box" id="order-box">
    <div
      class="floating-box-big"
      v-for="(row, rowIndex) in productCat"
      v-if="show"
      :key="row.id"
      style="margin-bottom : 15px;height :auto"
    >
      <div v-sticky="{ zIndex: 20, stickyTop: 0 }" class="flex-row freeze-row">
        <div class="floating-box" @click="expandLIst(row ,rowIndex)" style="width: 30px;">
          <md-icon class="-pointer" :id="'sub-box-icon-' + row.prod_code" v-if="show">expand_more</md-icon>
          <md-icon class="-pointer" :id="'sub-box-icon-' + row.prod_code" v-else>expand_less</md-icon>
        </div>
        <div
          class="floating-box descript"
          @click="expandLIst(row ,rowIndex)"
          style="cursor: pointer;"
        >
          {{row.prod_code}} : {{row.prod_name}}
          <md-tooltip md-direction="top">{{row.prod_code}} : {{row.prod_name}}</md-tooltip>
        </div>
        <div class="floating-box text-right" style="width:100px">
          <span class="title">{{formatNumberQty(row.target_qty)}}</span>
          <!-- <span class="units">units</span> -->
        </div>
        <div class="quota-head-ipt floating-box" :id="'freeze-row-' + row.prod_code">
          <template>
            <orderqty-input
              style="width:50px"
              v-model="row.order_qty"
              :maxChar="7"
              :table="2"
              :index="rowIndex"
              :indexDetail="rowIndex"
              type="detail"
              @click.native="gaInputOrderQtyGrp()"
            ></orderqty-input>
          </template>
        </div>
        <div class="floating-box icon-small-del text-right" style="width: 90px;">
          <div
            class="md-avatar md-avatar-icon pl-20"
            :style="{'background' : row.book_mark == 0 ?'#efefef':'#fd7f00'}"
            @click="bookmark(row , rowIndex)"
          >
            <md-icon :style="{'color' : row.book_mark == 0 ?'#a8a8a8':'#FFF'}">bookmark</md-icon>
            <md-tooltip md-direction="top" class="latoFont">bookmark</md-tooltip>
          </div>
          <div
            style=" visibility: hidden;"
            class="md-avatar md-avatar-icon discount-dia"
            @click="openDiscountDialog($event , rowIndex)"
          >
            <md-icon class="discount-dia">add_box</md-icon>
            <md-tooltip md-direction="top" class="latoFont">add</md-tooltip>
          </div>
        </div>
        <!-- <div class="floating-box icon-small-del text-right" style="width: 90px;">
          <div class="md-avatar md-avatar-icon pl-20" @click="clearOrderPerRow(rowIndex)">
            <md-icon>backspace</md-icon>
            <md-tooltip md-direction="top" class="latoFont">Clear</md-tooltip>
          </div>
          <div class="md-avatar md-avatar-icon" @click="copyTargetPerRow(rowIndex)">
            <md-icon>filter_none</md-icon>
            <md-tooltip md-direction="top" class="latoFont">Copy</md-tooltip>
          </div>
        </div>-->
        <div
          class="floating-box sum-order text-right mr-5"
          style="width: 145px;"
        >฿&nbsp;{{$store.getters["globalfunc/formatNumber"](row.sales)}}</div>
        <div class="floating-box star-circle ml-10" v-if="checkRecommend(row)">
          <md-avatar class="md-avatar-icon">
            <md-icon>grade</md-icon>
          </md-avatar>
        </div>
      </div>
      <!-- SALES ORDER SUB  BOX -->
      <div
        :class="show?'floating-sub-box mv-5 ml-30 hide-tag':'floating-sub-box mv-5 ml-30'"
        :id="'sub-box-' + row.prod_code"
      >
        <md-card class="-medium -noshadow order-child-box">
          <md-card-content>
            <div
              v-for="(subRow ,indexDetail) in row.detail"
              :key="subRow.id"
              style="display: flex !important;padding-bottom:10px"
            >
              <div class="floating-box text-left" style="width: 230px;">
                <div class="title discript">
                  {{subRow.product_code}} :
                  <span class="kanitFont">{{subRow.product_name}}</span>
                  <md-tooltip md-direction="top">
                    {{subRow.product_code}} :
                    <span class="kanitFont">{{subRow.product_name}}</span>
                  </md-tooltip>
                </div>
              </div>
              <div class="floating-box text-right pr-10" style="width: 110px;">
                <span
                  class="title"
                >฿&nbsp;{{$store.getters["globalfunc/formatNumber"](setNumer(subRow.ppu))}}</span>
              </div>
              <div class="quota-detail-ipt floating-box" :id="'focus-row-' + subRow.product_code">
                <template>
                  <orderqty-input
                    style="width:50px"
                    :maxChar="7"
                    v-model="subRow.order_qty"
                    :table="3"
                    :index="rowIndex"
                    :indexDetail="indexDetail"
                    type="detail"
                    @click.native="gaInputOrderQtyItem()"
                  ></orderqty-input>
                </template>
              </div>
              <div
                class="floating-box units text-left"
                style="width: 90px;"
              >{{checkColor(subRow)}}{{subRow.unit}}</div>
              <div class="floating-box text-right mr-5" style="width: 143px">
                <span class="robotoFont -font-12 -gray-A8">฿&nbsp;{{countSales(subRow)}}</span>
                <!-- <span class="robotoFont -font-12 -gray-A8">฿&nbsp;{{formatNumber(setNumer(subRow.sales))}}</span> -->
              </div>
              <div class="floating-box star-circle ml-10" v-if="subRow.status_recom">
                <md-avatar class="md-avatar-icon">
                  <md-icon>grade</md-icon>
                </md-avatar>
              </div>
            </div>
            <div style="margin-top:5px;" class="font-bold">
              <div class="floating-box text-left title" style="width:240px">TOTAL</div>
              <div
                class="floating-box text-right total-text"
                style="width: 185px;"
              >{{sumDetailOrderQty(rowIndex)}}</div>
              <div
                class="floating-box text-right pr-5 total-text"
                style=" width: 250px;"
              >฿&nbsp;{{sumDetailSales(rowIndex)}}</div>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div
        style="display: none"
        :class="show?'floating-global-box robotoFont -no-y-scroll mv-10 hide-tag':'floating-global-box robotoFont -no-y-scroll mv-10'"
        :id="'global-bar-' + row.prod_code"
      >
        <div
          class="floating-box -list-block"
          style="min-height: unset; width: 450px;"
        >GLOBAL PROMOTION CG-001 - Buy more than 2,000 get 10% off</div>
        <div
          class="floating-box -list-block text-right pr-10"
          style="min-height: unset; width: 250px;"
        >Conditions not met</div>
      </div>
    </div>
    <promo-range :proproty="proproty"></promo-range>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import VueSticky from "vue-sticky";
export default {
  created: function() {
    this.tmpData = this.value;
  },
  computed: {
    productCat() {
      return this.$store.getters.sp_arr_sales;
    },
    discList() {
      return this.$store.getters.sp_disc_list;
    },
    custSelect() {
      return this.$store.getters.sp_cust_selected;
    },
    custTitle() {
      return this.$store.getters.sp_cust_head;
    },
    filterDP() {
      return this.$store.getters.filter_DP;
    }
  },
  props: {
    show: true
  },
  methods: {
    bookmark(row, index) {
      let check = row.book_mark == 0 ? 1 : 0;
      this.productCat[index].book_mark = check;
      if (isNaN(parseFloat(row.order_qty))) {
        this.productCat[index].order_qty = 0;
      }
      this.$store.dispatch("bookmark", {
        year: this.custTitle.year,
        month: this.custTitle.month,
        cust_code: this.custSelect.cust_code,
        order_qty: row.order_qty,
        prod_grp: row.prod_code,
        book_mark: check,
        select: this.filterDP
      });
    },
    openDiscountDialog(e, rowIndex) {
      // let range = "";
      // let qty = isNaN(parseFloat(this.productCat[rowIndex].order_qty));
      // if (this.productCat.length > 0 && !qty) {
      //   for (let index = 0; index < this.discList.length; index++) {
      //     let qty = this.productCat[rowIndex].order_qty;
      //     let dis = this.discList[index];
      //     if (dis.low <= qty && dis.high >= qty) {
      //       range = dis.low;
      //       break;
      //     }
      //   }
      // }
      // let startValue = e.screenY - 150;
      // let valueBox = startValue + 219;
      // let masterScreen = window.screen.height;
      // if (parseInt(masterScreen - valueBox) < 550) {
      //   this.proproty.top = e.screenY - 30;
      //   this.proproty.topIcon = e.screenY + 165;
      // } else {
      //   this.proproty.top = e.screenY + 150;
      //   this.proproty.topIcon = e.screenY + 175;
      // }
      // this.proproty.rowIndex = rowIndex;
      // this.proproty.selected = range;
      // this.proproty.display = "-webkit-box";
    },
    checkColor(subRow) {
      // let sp_keep_color = this.$store.getters.sp_keep_color;
      // if (subRow.order_qty != "" && subRow.order_qty > 0) {
      //   console.log("==>")
      // }
      // console.log(subRow.order_qty);
    },
    countSales(subRow) {
      if (isNaN(parseFloat(subRow.order_qty)) == false) {
        return this.$store.getters["globalfunc/formatNumber"](
          this.setNumer(subRow.ppu) * this.setNumer(subRow.order_qty)
        );
      } else {
        return this.$store.getters["globalfunc/formatNumber"](0);
      }
    },
    setNumer(value) {
      return parseFloat(value);
    },
    checkRecommend(row) {
      if (row.detail.length == 0) {
        return false;
      } else {
        for (let k = 0; k < row.detail.length; k++) {
          if (row.detail[k].status_recom) {
            return true;
            break;
          }
        }
      }
    },
    clearOrderPerRow(rowIndex) {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_ClearByGroup;
      key.eventLabel = "ClearByGroup:" + emp_id;
      this.$ga.event(key);

      if (this.productCat.length > 0) {
        theArray[rowIndex].order_qty = "";
      }
    },
    copyTargetPerRow(rowIndex) {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_CopyOrderQty;
      key.eventLabel = "CopyOrderQty:" + emp_id;
      this.$ga.event(key);

      let theArray = this.productCat;
      if (theArray.length > 0) {
        theArray[rowIndex].order_qty = theArray[rowIndex].target_qty;
        this.$store.dispatch("saveOrderQtyOfItem", {
          year: this.custTitle.year,
          month: this.custTitle.month,
          cust_code: this.custSelect.cust_code,
          prod_grp: theArray[rowIndex].prod_code,
          grp_order_qty: theArray[rowIndex].order_qty,
          prod_code: 0,
          order_qty: 0,
          sales_item: 0,
          rowIndex: rowIndex
        });
      }
    },
    sumDetailOrderQty(rowIndex) {
      if (this.productCat.length > 0) {
        let theArray = this.productCat[rowIndex].detail;
        let sum = 0;
        for (let k = 0; k < theArray.length; k++) {
          if (isNaN(parseFloat(theArray[k].order_qty)) == false) {
            // if (theArray[k].order_qty != "") {
            sum = sum + this.setNumer(theArray[k].order_qty);
          }
          if (theArray[k].order_qty != "" && theArray[k].order_qty > 0) {
            this.$store.commit("SET_SP_CHECK_COLOR_BTN", true);
          }
        }
        return this.$store.getters["globalfunc/formatNumberInt"](
          this.setNumer(sum)
        );
      }
    },
    sumDetailSales(rowIndex) {
      if (this.productCat.length > 0) {
        let theArray = this.productCat[rowIndex].detail;
        let theArrayMom = this.productCat[rowIndex];
        let sum = 0;
        for (let k = 0; k < theArray.length; k++) {
          if (isNaN(parseFloat(theArray[k].order_qty)) == false) {
            // if (theArray[k].order_qty != "") {
            if (theArray[k].ppu == null || theArray[k].ppu == "") {
              theArray[k].ppu = 0;
            }
            sum =
              sum +
              this.setNumer(theArray[k].order_qty) *
                this.setNumer(theArray[k].ppu);
          }
        }
        theArrayMom.sales = sum;
        theArray.sales_temp = sum;
        return this.$store.getters["globalfunc/formatNumber"](
          this.setNumer(sum)
        );
      }
    },
    formatNumberQty(value) {
      if (!isNaN(parseFloat(value))) {
        return parseFloat(value)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return 0;
      }
    },
    expandLIst(row, rowIndex) {
      var new_box = document.getElementById("sub-box-" + row.prod_code);
      var new_icon = document.getElementById("sub-box-icon-" + row.prod_code);
      var new_global = document.getElementById("global-bar-" + row.prod_code);
      if (new_box != null) {
        var new_class = new_box.classList[new_box.classList.length - 1];
        if (this.show) {
          new_box.classList.toggle("hide-tag");
          new_global.classList.toggle("hide-tag");
          if (new_class == "hide-tag") {
            new_icon.innerHTML = "expand_less";
          } else {
            new_icon.innerHTML = "expand_more";
          }
        }
      }
    },
    gaInputOrderQtyItem() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_InputOrderQtyItem;
      key.eventLabel = "InputOrderQtyItem:" + emp_id;
      this.$ga.event(key);
    },
    gaInputOrderQtyGrp() {
      var emp_id = Vue.localStorage.get("emp_id");
      var key = this.$ga_key.Planning_Salesplan_InputOrderQtyGroup;
      key.eventLabel = "InputOrderQtyGroup:" + emp_id;
      this.$ga.event(key);
    }
  },
  data() {
    return {
      theArrayTemp: [],
      theArrayFullTemp: [],
      proproty: {
        top: 10,
        left: 527,
        display: "none",
        rowIndex: 0,
        topIcon: 0,
        leftIcon: 526,
        selected: ""
      }
    };
  },
  components: {
    "orderqty-input": require("./sp-orderqty-input"),
    "promo-range": require("./mds-promo-range")
  },
  directives: {
    sticky: VueSticky
  }
};
</script>