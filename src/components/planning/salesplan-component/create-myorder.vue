<template>
  <md-layout class="create-order-cls">
    <md-layout
      md-flex="100"
      class="topic1"
    >Would you like to create a new order from items in your Sales Plan? If so, please select below</md-layout>
    <md-layout md-flex="100" class="topic2">SELECT ITEMS TO TRANSFER TO NEW ORDER</md-layout>
    <md-layout md-flex="100">
      <div :class="'floating-sub-box mt-15'" style="width:100%">
        <md-card class="-medium -order-child-box">
          <md-card-content>
            <div class="-font-12 -gray-41 robotoFont">
              <div class="floating-box chk-order" style="width: 30px;">
                <md-checkbox
                  class="md-primary"
                  v-model="checkedAll"
                  @change="checkAllItem($event)"
                  style="margin:0px;"
                ></md-checkbox>
              </div>
              <div class="floating-box text-left" style=" width: 345px;opacity:0.62">Item</div>
              <div class="floating-box text-right" style="width: 110px;opacity:0.62">PPU</div>
              <div
                class="floating-box robotoFont text-right"
                style="width: 90px;opacity:0.62"
              >Order Qty</div>
              <div class="floating-box text-right" style="width: 35px;opacity:0.62"></div>
              <div class="floating-box text-right" style="width: 108px;opacity:0.62">Sales</div>
            </div>
            <div id="order-scroll" style="margin-top:8px;">
              <div
                class="order-box"
                v-for="(row, index) in $store.getters.sp_create_order"
                :key="'croder-'+index"
                style="display: flex !important;padding-top:8px"
              >
                <div class="floating-box chk-order" style="width: 30px;padding-top:5px">
                  <md-checkbox
                    class="md-primary"
                    style="margin:0px;color"
                    v-model="row.checked"
                    @change="checkItem(row ,index)"
                  ></md-checkbox>
                </div>
                <div class="floating-box text-left" style="width: 360px;padding-top:5px">
                  <div class="title discript">
                    <span
                      class="kanitFont"
                      style="color:#5A5A5A;font-size:13px"
                    >{{row.item_code}}&nbsp;{{row.item_name}}</span>
                    <md-tooltip md-direction="top">
                      {{row.item_code}}&nbsp;{{row.item_name}}
                      <span
                        class="kanitFont"
                      >{{row.item_name}}</span>
                    </md-tooltip>
                  </div>
                </div>
                <div class="floating-box text-right pr-10" style="width: 112px;padding-top:5px">
                  <span class="title">฿&nbsp;{{$store.getters['globalfunc/formatNumber'](row.ppu)}}</span>
                </div>
                <div class="quota-head-ipt floating-box" style="margin-right: 5px;">
                  <template>
                    <orderqty-input
                      style="width:50px"
                      :maxChar="7"
                      v-model="row.order_qty"
                      :table="10"
                      :index="index"
                      type="detail"
                    ></orderqty-input>
                  </template>
                </div>
                <div
                  class="floating-box units text-left"
                  style="width: 35px;padding-top:5px;font-family:kanit"
                >{{row.unit}}</div>
                <div class="floating-box text-right" style="width: 112px;padding-top:5px">
                  <span class="robotoFont -font-12 -gray-A8">
                    ฿&nbsp;{{$store.getters['globalfunc/formatNumber'](row.sales)}}
                    {{countOrderQty(index)}}
                  </span>
                </div>
              </div>
            </div>
            <div style="margin-top:18px;" class="font-bold">
              <div
                class="floating-box text-left title"
                style="width:240px"
              >TOTAL ({{totalSelected}} Selected Items)</div>
              <div
                class="floating-box text-right total-text"
                style="width: 340px;font-size:14px;font-family:roboto"
              >{{$store.getters['globalfunc/formatNumberInt'](totalOrderQty)}}</div>
              <div
                class="floating-box text-right pr-5 total-text"
                style=" width: 150px;font-size:14px;font-family:roboto"
              >฿&nbsp;{{$store.getters['globalfunc/formatNumber'](totalSales)}}</div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      checkedAll: true,
      totalOrderQty: 0,
      totalSales: 0,
      totalSelected: this.$store.getters.sp_create_order.length
    };
  },
  methods: {
    countOrderQty(index) {
      // console.log("==>");
      let data = this.$store.getters.sp_create_order;
      let _this = this;
      let temp = data.filter(todo => todo.checked == true);
      data.forEach(function(rowItem, key) {
        let rs = rowItem.order_qty * rowItem.ppu;
        data[key].net_amount = rs;
        data[key].amount = rs;
        data[key].sales = rs;
        // data[key].net_price = rs;
        // console.log(rowItem.amount);
      });
      this.totalOrderQty = temp.reduce(
        (acc, row) => acc + parseFloat(row.order_qty),
        0
      );
      this.totalSales = temp.reduce(
        (acc, row) => acc + parseFloat(row.sales),
        0
      );
    },
    checkAllItem(e) {
      let data = this.$store.getters.sp_create_order;
      let temp = data.filter(todo => todo.checked != e);
      if (temp.length > 0) {
        data.forEach(function(rowItem, key) {
          data[key].checked = e;
        });
      }
      let count = data.filter(todo => todo.checked == true);
      this.totalSelected = count.length;
    },
    checkItem(row, index) {
      let data = this.$store.getters.sp_create_order;
      data[index].checked = !data[index].checked;
      let temp = data.filter(todo => todo.checked == false);
      if (temp.length > 0) {
        this.checkedAll = false;
      } else {
        this.checkedAll = true;
      }
      let count = data.filter(todo => todo.checked == true);
      this.totalSelected = count.length;
    }
  },
  components: {
    "orderqty-input": require("./sp-myorder-orderqty-input")
  }
};
</script>

<style lang="scss" scoped>
.create-order-cls {
  .topic1 {
    color: #5a5a5a;
    font-size: 16px;
    font-family: lato;
  }
  .topic2 {
    color: #727272;
    font-size: 14px;
    font-family: Roboto;
    padding-top: 30px;
  }
  .md-card {
    background: #f8f8f8;
    box-shadow: 0 0 1px #e0e0e0;
    .md-card-content {
      padding-left: 25px;
      padding-top: 15px;
      padding-bottom: 10px;
      overflow-y: hidden;
      padding-right: 5px;
    }
  }
  #order-scroll {
    height: calc(100vh - 360px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .quota-head-ipt {
    .md-input-container {
      // min-height: 27px;
      // height: 27px;
      margin-left: 0px;
      // padding: 0px;
      // &.md-has-value input {
      //   color: #5a5a5a;
      //   font-size: 13px;
      //   font-family: roboto;
      //   height: 20px;
      // }
    }
  }
  #order-scroll::-webkit-scrollbar {
    width: 6px;
    height: 7px;
    background-color: #f8f8f8;
  }

  #order-scroll::-webkit-scrollbar-thumb {
    background-color: #efefef;
    border-radius: 5px;
  }
}
</style>
