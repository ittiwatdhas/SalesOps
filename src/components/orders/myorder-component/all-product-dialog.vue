<template>
  <div>
    <div
      style="background:#EFEFEF;color:#414141;font-size:16px;padding:15px;width:100%"
    >
      <md-layout>
        <md-layout md-flex="70">
          <label class="sub-title kanitFont">All Product</label>
        </md-layout>
        <md-layout md-flex="30" md-align="end">
          <md-icon @click.native="close" style="cursor:pointer;margin-right:5px"
            >close</md-icon
          >
        </md-layout>
      </md-layout>
    </div>
    <div style="width:100%;display:-webkit-box;padding:20px">
      <div
        style="position: absolute;z-index: 101;margin-left:40%;margin-top:10%"
      >
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="spinner"
          md-indeterminate
        ></md-spinner>
      </div>
      <div
        v-show="spinner"
        style="position: absolute;z-index: 10000;width: 100%;
                  height: 100%;background: #EFEFEF;
                  opacity: 0.1;"
      ></div>
      <div style="width:30%;padding-left:20px;padding-right:20px">
        <div class="topic" style="padding-top:20px;">Search by</div>
        <!-- <md-checkbox style="margin-right:20px" v-model="only_product" class="md-primary">
          <span>Only My Product</span>
        </md-checkbox>-->
        <div style="display:-webkit-box;">
          <input
            type="checkbox"
            v-model="only_product"
            style="height: 20px;width: 20px;"
          />
          <div style="padding-top:5px;padding-left:10px">Only My Product</div>
        </div>
        <md-dropdown-box
          :data="data.product_group"
          :placeholder="'All Product Group'"
          @choose="choosePG"
          v-model="mo_product_group_code"
          style="margin-top:10px;"
        ></md-dropdown-box>
        <md-dropdown-box
          :data="data.sub_group"
          :placeholder="'All Sub Group'"
          style="margin-top:20px;"
          @choose="chooseSG"
          v-model="mo_sub_group_code"
        ></md-dropdown-box>
        <md-dropdown-box
          :data="data.cg"
          :placeholder="'All CG'"
          style="margin-top:20px;"
          v-model="mo_product_cg"
          @choose="chooseCG"
        ></md-dropdown-box>
        <md-search-box
          id="all-product-popup"
          style="margin-top:20px;"
          :placeholder="'Search by Code or Name...'"
          :value="keyword"
          @filter="keywordFil"
          @clear="keywordCLR"
        ></md-search-box>
        <!-- v-model="keyword" -->
        <div style="text-align: -webkit-center;margin-top:20px">
          <md-button
            :class="'-orange'"
            style="height:36px;border-radius:3px;font-size:12px"
            @click="search"
          >
            <md-icon style="margin-right:7px">search</md-icon>SEARCH
          </md-button>
        </div>
      </div>
      <div style="width:70%;">
        <div
          style="box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);padding: 0 20px 0 20px;"
        >
          <div class="topic" style="display:-webkit-box;width:100%">
            <div style="padding-top:20px;width:40%">Product List</div>
            <div style="width:60%;text-align:right">
              <md-button
                :disabled="disabledBtn"
                :class="disabledBtn ? '-gray-A8' : '-orange'"
                style="height:36px;border-radius:3px;font-size:12px"
                @click="add(null)"
              >
                <md-icon style="margin-right:7px">done</md-icon>ADD
              </md-button>
              <md-button
                :disabled="disabledBtn"
                :class="disabledBtn ? '-gray-A8' : '-orange'"
                style="height:36px;border-radius:3px;font-size:12px"
                @click="add('close')"
              >
                <md-icon style="margin-right:7px">done</md-icon>ADD & CLOSE
              </md-button>
            </div>
          </div>
          <div style="display:-webkit-box;width:100%;margin-bottom:10px">
            <div style="width:6%;" class="chk-order">
              <input
                type="checkbox"
                v-model="headChk"
                style="height: 20px;width: 20px;"
                @change="checkedAll($event)"
              />
            </div>
            <div class="head-table" style="width:54%;color: #5a5a5a;">
              Item &nbsp;({{ formatNumberInt(total) }})
            </div>
            <div
              class="head-table"
              style="width: 15%;text-align:right;padding-right:10px;color: #5a5a5a;"
            >
              {{ renderDisplayPolicy('head', null) }}
            </div>
            <div
              class="head-table"
              style="width: 15%;text-align:right;padding-right:10px;color: #5a5a5a;"
            >
              QTY
            </div>
            <div class="head-table" style="width: 10%;"></div>
          </div>
          <div
            v-if="dataList.length == 0"
            style="margin-top:40px;font-size:15px;color: #a8a8a8;text-align:center"
          >
            No data...
          </div>
          <div class="scroll-product" @scroll="scrollPage">
            <div
              v-for="(row, index) in dataList"
              :key="row.code + 'pro'"
              style="width:100%;margin-bottom:5px;"
            >
              <div v-if="row.order_qty != 'NO'" style="display:-webkit-box">
                <!-- {{index}}=> -->
                <div style="width:6%;padding-top:5px" class="chk-order">
                  <input
                    type="checkbox"
                    v-model="row.checked"
                    style="height: 20px;width: 20px;"
                    @change="countCHK($event, index)"
                  />
                </div>
                <div
                  class="head-table"
                  style="width: 54%;font-family:kanit;font-size:14px;padding-top:8px"
                >
                  {{ row.code }}&nbsp;{{ row.title }}
                  <span style="color:#f44336">{{
                    displayFreeGift('name', row)
                  }}</span>
                </div>
                <div
                  class="head-table"
                  style="width: 15%;text-align:right;font-size:14px;padding-top:9px"
                >
                  <div v-if="displayFreeGift('ppu', row)">
                    <span style="padding-right:5px">฿ 0.00</span>
                    <span style="text-decoration:line-through"
                      >({{ renderDisplayPolicy('detail', row) }})</span
                    >
                    <!-- <span style="text-decoration:line-through">({{formatNumber(row.ppu)}})</span> -->
                  </div>
                  <div v-else>
                    <span style="padding-right:5px">฿</span>
                    <!-- {{formatNumber(row.ppu)}} -->
                    {{ renderDisplayPolicy('detail', row) }}
                  </div>
                </div>
                <div class="head-table" style="width: 15%;padding-left:15px">
                  <template>
                    <md-input-container :class="'md-promotion-ipt'">
                      <md-input
                        type="text"
                        v-model="row.order_qty"
                        class="text-right"
                        @blur="calculateOther(index)"
                        @change="calculate(row, index)"
                        @keypress.native="isNumber($event, index)"
                        @focus.native="$event.target.select()"
                        @keyup.enter.native.prevent="nextTab"
                      ></md-input>
                      <div class="md-error">{{ row.error_stock }}</div>
                    </md-input-container>
                  </template>
                </div>
                <div
                  class="head-table"
                  style="width: 10%;font-size:14px;padding-left:1.5%;padding-top:8px"
                >
                  <span style="font-family:kanit;color:#414141;opacity:0.7">{{
                    row.unit
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import orService from '@/services/orders/myorders'

import _ from 'lodash'
export default {
  created () {
    let statusDdilog = Vue.localStorage.get('ORD_DIALOG_SHOW')
    if (statusDdilog == 'OPEN') {
      let ord_dilog = Vue.localStorage.get('ORD_DIALOG')
      let theArray = JSON.parse(ord_dilog)
      if (!_.isNull(ord_dilog)) {
        let allProd_dilog = Vue.localStorage.get('ALLPROD_DIALOG_SHOW')
        if (allProd_dilog == 'OPEN') {
          this.dataList = theArray['prod_dataList']
          this.total = theArray['prod_dataList'].length
          this.headChk = theArray['prod_headChk']
          // this.only_product = theArray["prod_only_my_product"];
          this.mo_product_cg = theArray['prod_mo_product_cg']
          this.mo_sub_group_code = theArray['prod_mo_sub_group_code']
          this.mo_product_group_code = theArray['prod_mo_product_group_code']
          this.disabledBtn = theArray['prod_disabledBtn']
          this.product_cg = theArray['prod_product_cg']
          this.sub_group_code = theArray['prod_sub_group_code']
          this.product_group_code = theArray['prod_product_group_code']
          this.keyword = theArray['prod_keyword']
          this.$store.commit(
            'myorders/setDataListProductDG',
            theArray.prod_dataListProductDG
          )
        }
      }
    }
  },
  props: ['data'],
  data () {
    return {
      keyword: '',
      product_cg: 'all',
      sub_group_code: 'all',
      product_group_code: 'all',
      mo_product_cg: '',
      mo_sub_group_code: '',
      mo_product_group_code: '',
      only_product: true,
      headChk: false,
      spinner: false,
      dataList: [],
      dataListTemp: [],
      productSubGroupList: [],
      productCGList: [],
      disabledBtn: true,
      lastEdit: '',
      total: 0,
      limit: 5000,
      loading: false,
      keepIndexArray: 0
    }
  },
  watch: {
    product_group_code (val) {
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_product_group_code',
        data: val
      })
    },
    product_cg (val) {
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_product_cg',
        data: val
      })
    },
    product_group_code (val) {
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_product_group_code',
        data: val
      })
    },
    mo_product_group_code (val) {
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_group_code',
        data: val
      })
    },
    mo_product_cg (val) {
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_cg',
        data: val
      })
    },
    mo_sub_group_code (val) {
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_sub_group_code',
        data: val
      })
    },
    only_product (value) {
      this.dataList = []
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_dataList',
        data: []
      })
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_only_my_product',
        data: value
      })
      this.dataListTemp = []
      this.product_cg = 'all'
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_cg',
        data: 'all'
      })
      this.sub_group_code = 'all'
      this.product_group_code = 'all'
      this.mo_product_cg = ''
      this.mo_sub_group_code = ''
      this.mo_product_group_code = ''
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_group_code',
        data: ''
      })
      this.total = 0
      orService
        .getAllProduct({
          only_product: value,
          emp_id: this.info.salesman_code
        })
        .then(response => {
          this.dataListProductDG.product_group = response
          this.$store.dispatch('myorders/setLocalStore', {
            feild: 'prod_dataListProductDG',
            data: this.dataListProductDG
          })
        })
        .catch()
      this.choosePG({ code: '' })
      this.chooseSG({ code: '' })
    }
  },
  computed: {
    info () {
      return this.$store.getters['myorders/customer_info']
    },
    dataListProductDG () {
      return this.$store.getters['myorders/dataListProductDG']
    },
    items () {
      return this.$store.getters['myorders/items_order']
    },
    itemDemo () {
      return this.$store.getters['myorders/itemDemo']
    },
    itemsPromoOrder () {
      return this.$store.getters['myorders/items_promo_order']
    }
  },
  methods: {
    renderDisplayPolicy (mode, row) {
      if (mode == 'head') {
        if (_.toUpper(this.info.price_policy_code) == 'AUTO') {
          return 'PPU'
        } else {
          return 'PRICE'
        }
      } else {
        if (_.toUpper(this.info.price_policy_code) == 'AUTO') {
          return this.formatNumber(row.ppu)
        } else {
          return this.formatNumber(row.price)
        }
      }
    },
    displayFreeGift (mode, row) {
      if (mode == 'name') {
        if (!_.isUndefined(row.freegift)) {
          return 'Free Gift'
        } else {
          return ''
        }
      } else {
        if (!_.isUndefined(row.freegift)) {
          return true
        } else {
          return false
        }
      }
    },
    keywordFil (val) {
      this.keyword = val
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_keyword',
        data: val
      })
    },
    keywordCLR () {
      this.keyword = ''
    },
    scrollPage (val) {
      let t = this
      this.$nextTick(() => {
        if (t.loading == false && t.dataList.length < t.total) {
          t.loading = true
          /*
          let temp = [];
          let data = t.dataListTemp;
          let start = t.dataList.length;
          let end = t.dataList.length + 20;
          for (let i = start; i < end; i++) {
            if (typeof data[i] != "undefined") {
              let indexItem = _.findIndex(t.items, {
                item_code: data[i].code
              });
              let indexItemFil = _.filter(t.items, item => {
                return item.item_code == data[i].code;
              });
              let tempPromo = [];
              _.forEach(t.itemsPromoOrder, function(row) {
                let indexPromo = _.filter(row.products, item => {
                  return item.item_code == data[i].code;
                });
                if (indexPromo.length > 0) {
                  tempPromo.push(indexPromo[0]);
                }
              });
              if (parseFloat(data[i].ppu) > 0 && tempPromo.length == 0) {
                if (!_.isUndefined(t.items[indexItem])) {
                  if (
                    !_.isNull(t.items[indexItem].ref_po_no) &&
                    t.items[indexItem].ref_po_no.length > 2
                  ) {
                    var indexItem0 = _.findIndex(t.items, function(o) {
                      return (
                        o.item_code == data[i].code && parseFloat(o.price) > 0
                      );
                    });
                    if (
                      parseFloat(t.items[indexItem].price) == 0 &&
                      indexItemFil.length == 1
                    ) {
                      // console.log(" YES BK 0", data[i].code);
                      let ppu =
                        data[i].ppu == "" || data[i].ppu == null
                          ? 0
                          : parseFloat(data[i].ppu);
                      data[i].ppu = _.round(ppu, 2);
                      t.dataList.push(data[i]);
                      t.$store.dispatch("myorders/setLocalStore", {
                        feild: "prod_dataList",
                        data: t.dataList
                      });
                    } else if (
                      indexItemFil.length > 1 &&
                      (_.isNull(t.items[indexItem0].ref_po_no) ||
                        t.items[indexItem0].ref_po_no.length < 2)
                    ) {
                      // console.log(" YES BK 0 AND NO 0");
                      data[i].checked = true;
                      data[i].order_qty = t.items[indexItem0].order_qty;
                      data[i].error_stock = t.items[indexItem0].error_stock;
                      t.dataList.push(data[i]);
                      t.$store.dispatch("myorders/setLocalStore", {
                        feild: "prod_dataList",
                        data: t.dataList
                      });
                    } else {
                      // console.log(" YES BK ", data[i].code);
                    }
                  } else {
                    var indexItem0 = _.findIndex(t.items, function(o) {
                      return (
                        o.item_code == data[i].code && parseFloat(o.price) > 0
                      );
                    });
                    if (
                      parseFloat(t.items[indexItem].price) == 0 &&
                      indexItemFil.length == 1
                    ) {
                      // console.log(" YES FREE ITEM");
                      let ppu =
                        data[i].ppu == "" || data[i].ppu == null
                          ? 0
                          : parseFloat(data[i].ppu);
                      data[i].ppu = _.round(ppu, 2);
                      t.dataList.push(data[i]);
                      t.$store.dispatch("myorders/setLocalStore", {
                        feild: "prod_dataList",
                        data: t.dataList
                      });
                    } else if (indexItemFil.length > 1) {
                      // console.log(" YES ");
                      data[i].checked = true;
                      data[i].order_qty = t.items[indexItem0].order_qty;
                      data[i].error_stock = t.items[indexItem0].error_stock;
                      t.dataList.push(data[i]);
                      t.$store.dispatch("myorders/setLocalStore", {
                        feild: "prod_dataList",
                        data: t.dataList
                      });
                    } else {
                      data[i].checked = true;
                      data[i].order_qty = t.items[indexItem].order_qty;
                      data[i].error_stock = t.items[indexItem].error_stock;
                      t.dataList.push(data[i]);
                      t.$store.dispatch("myorders/setLocalStore", {
                        feild: "prod_dataList",
                        data: t.dataList
                      });
                      // console.log(" YES.... ");
                    }
                  }
                } else {
                  let findIndexDup = _.findIndex(t.dataList, [
                    "code",
                    data[i].code
                  ]);
                  if (findIndexDup < 0) {
                    // console.log(" NO ");
                    let ppu =
                      data[i].ppu == "" || data[i].ppu == null
                        ? 0
                        : parseFloat(data[i].ppu);
                    data[i].ppu = _.round(ppu, 2);
                    t.dataList.push(data[i]);
                    t.$store.dispatch("myorders/setLocalStore", {
                      feild: "prod_dataList",
                      data: t.dataList
                    });
                  }
                }
              } else {
                // console.log(data[i].code);
              }
            }
          }
          let check = _.filter(t.dataList, item => {
            if (item.checked == true) {
              return true;
            }
          });
          t.disabledBtn = check.length > 0 ? false : true;
          t.$store.dispatch("myorders/setLocalStore", {
            feild: "prod_disabledBtn",
            data: t.disabledBtn
          });
          */
          // let rs = _.merge(t.dataList, temp);
          // t.dataList = rs
          t.loading = false
        }
      })
    },
    calculate (row, index) {
      this.lastEdit = index
      let t = this
      this.$nextTick(() => {
        if (!_.isUndefined(t.dataList[index])) {
          if (parseInt(row.order_qty) > 0) {
            t.dataList[index].checked = true
            t.$store.dispatch('myorders/setLocalStore', {
              feild: 'prod_dataList',
              data: t.dataList
            })
          }
        }
      })
    },
    calculateOther () {
      let index = this.lastEdit
      if (typeof this.dataList[index] != 'undefined') {
        if (this.dataList[index].order_qty == '') {
          this.dataList[index].order_qty = 0
          this.$store.dispatch('myorders/setLocalStore', {
            feild: 'prod_dataList',
            data: this.dataList
          })
        }

        let obj = {
          item_code: this.dataList[index].code,
          order_qty: this.dataList[index].order_qty
        }
        if (this.dataList[index].order_qty > 0) {
          if (parseInt(this.dataList[index].order_qty) > 0) {
            // this.dataList[index].checked = true;
          }
          let chk = this.dataList.filter(todo => todo.checked == true)
          this.headChk = chk.length != this.dataList.length ? false : true
          this.disabledBtn = chk.length > 0 ? false : true
          this.$store.dispatch('myorders/setLocalStore', {
            feild: 'prod_disabledBtn',
            data: this.disabledBtn
          })
          orService
            .getStockByItems(
              obj,
              this.info.pricetype_code,
              this.info.warehouse_code
            )
            .then(response => {
              if (_.isBoolean(response.stock) == false) {
                if (!_.isUndefined(this.dataList[index])) {
                  this.dataList[index].error_stock =
                    response.stock < parseInt(this.dataList[index].order_qty)
                      ? this.formatNumberInt(response.stock) + ' left in stock'
                      : ''
                }
              }
              this.$store.dispatch('myorders/setLocalStore', {
                feild: 'prod_dataList',
                data: _.cloneDeep(this.dataList)
              })
            })
            .catch()
        }
      }
    },
    add (mode) {
      let t = this
      setTimeout(function () {
        t.spinner = true
        let data = _.filter(t.dataList, item => {
          if (item.checked == true) {
            return true
          }
        })
        let items = _.cloneDeep(t.items)
        let itemsOld = _.cloneDeep(t.items)
        let percent = t.info.percent_discount
            for (let index = 0; index < itemsOld.length; index++) {
              const element = itemsOld[index];
              // console.log(element)
              
            }
        
        data.forEach(function (row, key) {
          let itemDemo = _.cloneDeep(t.itemDemo)
          let indexItem = _.findIndex(items, function (o) {
            return (
              o.item_code == row.code &&
              o.flag_status != 'F' &&
              o.flag_status != 'FV'
            )
          })

          let indexItemFil = _.filter(items, o => {
            if (o.item_code == row.code) {
              return true
            }
          })
          let ppu = row.ppu == '' || row.ppu == null ? 0 : parseFloat(row.ppu)
          let pricePOl =
            row.price == '' || row.price == null ? 0 : parseFloat(row.price)
          let round2 = _.round(ppu, 2)
           console.log("= round2", round2)
          if (indexItemFil.length > 1) {
            /**เจอทั้ง normal items และ free gift*/
            // console.log("Add 1 =====>", row.code);

            let indexNo0 = _.findIndex(items, function (o) {
              return (
                o.item_code == row.code &&
                parseFloat(o.price) > 0 &&
                (_.isUndefined(o.ref_po_no) || _.trim(o.ref_po_no).length < 2)
              )
            })
            // console.log(indexNo0)
            if (indexNo0 >= 0) {
              // console.log("1.1 indexItemFil => ");
              let disp = parseFloat(percent) / 100
              let amount = parseFloat(items[indexItem].price) * row.order_qty
              let amount2 = _.round(amount, 2)
              let dis = amount2 * disp
              items[indexNo0].error_stock = row.error_stock
              items[indexNo0].order_qty = row.order_qty
              items[indexNo0].amount = amount2
              let step1 = parseFloat(items[indexNo0].price) * disp
              let step2 = _.round(step1, 4)
              let step4 = step2 * parseInt(items[indexNo0].order_qty)
              let step5 = _.round(step4, 4)
              let step6 = _.round(step5, 2)
              items[indexNo0].net_amount = items[indexNo0].amount - step6
              let last_dis =
                (items[indexNo0].amount / 100) * parseFloat(percent)
              let last_dis2 = _.round(last_dis, 2)
              items[indexNo0].last_discount = last_dis2
            } else {
              // console.log("1.2 indexItemFil => ", indexItemFil);
              let indexNo00 = _.findIndex(items, function (o) {
                return (
                  o.item_code == row.code &&
                  parseFloat(o.price) == 0 &&
                  (_.isUndefined(o.ref_po_no) || _.trim(o.ref_po_no).length < 2)
                )
              })
              if (indexNo00 >= 0) {
                items[indexNo00].error_stock = row.error_stock
                items[indexNo00].order_qty = row.order_qty
                let budget = 0
                if (
                  items[indexNo00].ppu > 0 &&
                  items[indexNo00].ppu > items[indexNo00].price
                ) {
                  budget =
                    (items[indexNo00].ppu - items[indexNo00].price) *
                    row.order_qty
                  let budget4 = _.round(budget, 4)
                  let budget3 = _.round(budget4, 3)
                  let rs = _.round(budget3, 2)
                  items[indexNo00].budget = rs
                } else {
                  items[indexNo00].budget = 0
                }
                console.log("1.22 indexItemFil => ");
              } else {
                console.log("1.2222 indexItemFil => ");
              }
            }
          } else if (indexItemFil.length == 1) {
            console.log("Add 2 =====> ", row.code,items[0]);
            if (_.isUndefined(items[indexItem])) {
              if (items[0].price == 0) {
                console.log('SDF',items  ,items[0].item_code)
                let indexItemF = _.findIndex(items, function (o) {
                  return (
                    (o.item_code === items[0].item_code &&
                      o.flag_status == 'F') ||
                    o.flag_status == 'FV'
                  )
                })
                // console.log(indexItemF)
                if (indexItemF <= 0 && false) {
                  // items[indexItemF].order_qty = row.order_qty;
                  // items[indexItemF].error_stock = row.error_stock;
                  // /**cal budget*/
                  // let budget = 0;
                  // if (
                  //   items[indexItemF].ppu > 0 &&
                  //   items[indexItemF].ppu > items[indexItemF].price
                  // ) {
                  //   if (
                  //     _.toUpper(t.info.price_policy_code) == "FLEX" ||
                  //     _.toUpper(t.info.price_policy_code) == "FIX"
                  //   ) {
                  //     budget = parseFloat(row.price) * row.order_qty;
                  //   } else {
                  //     budget =
                  //       (items[indexItemF].ppu - items[indexItemF].price) *
                  //       row.order_qty;
                  //   }
                  //   let budget4 = _.round(budget, 4);
                  //   let budget3 = _.round(budget4, 3);
                  //   let rs = _.round(budget3, 2);
                  //   items[indexItemF].budget = rs;
                  // } else {
                  //   items[indexItemF].budget = 0;
                  // }
                } else {
                  itemDemo.id = row.code
                  itemDemo.unit_id = row.unit_id
                  itemDemo.item_code = row.code
                  itemDemo.item_name = row.title
                  itemDemo.priceVD = 0
                  itemDemo.order_qty = row.order_qty
                  itemDemo.unit = row.unit
                  itemDemo.error_stock = row.error_stock
                  itemDemo.ppu = round2
                  let rsNetPrice = round2 * (parseFloat(percent) / 100)
                  let reNP = round2 - rsNetPrice
                  let reNP2 = _.round(reNP, 2)
                  let amount = round2 * row.order_qty
                  let amount2 = _.round(amount, 2)
                  let dis = amount2 * (parseFloat(percent) / 100)
                  itemDemo.net_price = reNP2
                  itemDemo.amount = amount2
                  //FIX PRICE----------
                  // itemDemo.price = round2;
                  itemDemo.price = pricePOl
                  itemDemo.priceMaster = pricePOl
                  let step1 =
                    parseFloat(itemDemo.price) * (parseFloat(percent) / 100)
                  let step2 = _.round(step1, 4)
                  let step4 = step2 * parseInt(row.order_qty)
                  let step5 = _.round(step4, 4)
                  let step6 = _.round(step5, 2)
                  itemDemo.net_amount = itemDemo.amount - step6
                  let last_dis = (itemDemo.amount / 100) * parseFloat(percent)
                  let last_dis2 = _.round(last_dis, 2)
                  itemDemo.last_discount = last_dis2
                  //FIX PRICE -----
                  itemDemo.price_policy_code = row.price_policy_code
                  itemDemo.price_code = row.price_policy
                  // console.log('itemDemo 1 =>' , itemDemo)
                  items.push(itemDemo)
                }
              } else {
                itemDemo.id = row.code
                itemDemo.unit_id = row.unit_id
                itemDemo.item_code = row.code
                itemDemo.item_name = row.title
                itemDemo.priceVD = 0
                itemDemo.order_qty = row.order_qty
                itemDemo.unit = row.unit
                itemDemo.error_stock = row.error_stock
                itemDemo.ppu = round2
                let rsNetPrice = round2 * (parseFloat(percent) / 100)
                let reNP = round2 - rsNetPrice
                let reNP2 = _.round(reNP, 2)
                let amount = round2 * row.order_qty
                let amount2 = _.round(amount, 2)
                let dis = amount2 * (parseFloat(percent) / 100)
                itemDemo.net_price = reNP2
                itemDemo.amount = amount2
                //FIX PRICE----------
                // itemDemo.price = round2;
                itemDemo.price = pricePOl
                itemDemo.priceMaster = pricePOl
                let step1 =
                  parseFloat(itemDemo.price) * (parseFloat(percent) / 100)
                let step2 = _.round(step1, 4)
                let step4 = step2 * parseInt(row.order_qty)
                let step5 = _.round(step4, 4)
                let step6 = _.round(step5, 2)
                itemDemo.net_amount = itemDemo.amount - step6
                let last_dis = (itemDemo.amount / 100) * parseFloat(percent)
                let last_dis2 = _.round(last_dis, 2)
                itemDemo.last_discount = last_dis2
                //FIX PRICE -----
                itemDemo.price_policy_code = row.price_policy_code
                itemDemo.price_code = row.price_policy
                // console.log('itemDemo 2 =>' , itemDemo)
                items.push(itemDemo)
                itemDemo = {}
              }
              // console.log("88");
            } else if (
              _.isUndefined(items[indexItem].ref_po_no) ||
              _.trim(items[indexItem].ref_po_no).length < 2
            ) {
              let disp = parseFloat(percent) / 100
              let amount = parseFloat(items[indexItem].price) * row.order_qty
              let amount2 = _.round(amount, 2)
              let dis = amount2 * disp
              items[indexItem].error_stock = row.error_stock
              items[indexItem].order_qty = row.order_qty
              items[indexItem].amount = amount2
              let step1 = parseFloat(items[indexItem].price) * disp
              let step2 = _.round(step1, 4)
              let step4 = step2 * parseInt(items[indexItem].order_qty)
              let step5 = _.round(step4, 4)
              let step6 = _.round(step5, 2)
              items[indexItem].net_amount = items[indexItem].amount - step6
              let last_dis =
                (items[indexItem].amount / 100) * parseFloat(percent)
              let last_dis2 = _.round(last_dis, 2)
              items[indexItem].last_discount = last_dis2
              // console.log("2.1 indexItemFil => ", indexItemFil);
            } else {
              // console.log("2.2 indexItemFil => ", indexItemFil);
              itemDemo.id = row.code
              itemDemo.unit_id = row.unit_id
              itemDemo.item_code = row.code
              itemDemo.item_name = row.title
              itemDemo.priceVD = 0
              itemDemo.order_qty = row.order_qty
              itemDemo.unit = row.unit
              itemDemo.error_stock = row.error_stock
              itemDemo.ppu = round2
              //FIX PRICE -----
              itemDemo.price_policy_code = row.price_policy_code
              itemDemo.price_code = row.price_policy
              if (_.isUndefined(row.freegift)) {
                let rsNetPrice = round2 * (parseFloat(percent) / 100)
                let reNP = round2 - rsNetPrice
                let reNP2 = _.round(reNP, 2)
                let amount = round2 * row.order_qty
                let amount2 = _.round(amount, 2)
                let dis = amount2 * (parseFloat(percent) / 100)
                itemDemo.net_price = reNP2
                itemDemo.amount = amount2
                //FIX PRICE------
                // itemDemo.price = round2;
                itemDemo.price = pricePOl
                itemDemo.priceMaster = pricePOl
                
                let step1 =
                  parseFloat(itemDemo.price) * (parseFloat(percent) / 100)
                let step2 = _.round(step1, 4)
                let step4 = step2 * parseInt(row.order_qty)
                let step5 = _.round(step4, 4)
                let step6 = _.round(step5, 2)
                itemDemo.net_amount = itemDemo.amount - step6
                let last_dis = (itemDemo.amount / 100) * parseFloat(percent)
                let last_dis2 = _.round(last_dis, 2)
                itemDemo.last_discount = last_dis2
              } else {
                itemDemo.net_price = 0
                itemDemo.amount = 0
                itemDemo.price = 0
                itemDemo.priceMaster = 0
                itemDemo.net_amount = 0
                itemDemo.last_discount = 0
                itemDemo.flag_status = 'F'

                /**cal budget*/
                let budget = 0
                if (itemDemo.ppu > 0 && itemDemo.ppu > itemDemo.price) {
                  budget = (itemDemo.ppu - itemDemo.price) * itemDemo.order_qty
                  let budget4 = _.round(budget, 4)
                  let budget3 = _.round(budget4, 3)
                  let rs = _.round(budget3, 2)
                  itemDemo.budget = rs
                } else {
                  itemDemo.budget = 0
                }
              }
              items.push(itemDemo)
              itemDemo = {}
            }
          } else if (indexItemFil.length == 0) {
           
            itemDemo.id = row.code
            itemDemo.unit_id = row.unit_id
            itemDemo.item_code = row.code
            itemDemo.item_name = row.title
            itemDemo.priceVD = 0
            itemDemo.order_qty = row.order_qty
            itemDemo.unit = row.unit
            itemDemo.error_stock = row.error_stock
            itemDemo.ppu = round2
            //FIX PRICE -----
            itemDemo.price_policy_code = row.price_policy_code
            itemDemo.price_code = row.price_policy
            if (_.isUndefined(row.freegift)) {
               console.log("Add 3  ==> 1")
              let roundP = _.round(pricePOl, 2)
              /*
              let rsNetPrice = round2 * (parseFloat(percent) / 100);
              let reNP = round2 - rsNetPrice;
              let reNP2 = _.round(reNP, 2);
              let amount = round2 * row.order_qty;
              */
              let rsNetPrice = roundP * (parseFloat(percent) / 100)
              let reNP = roundP - rsNetPrice
              let reNP2 = _.round(reNP, 2)
              let amount = roundP * row.order_qty
              let amount2 = _.round(amount, 2)
              let dis = amount2 * (parseFloat(percent) / 100)
              itemDemo.net_price = reNP2
              itemDemo.amount = amount2
              //FIX PRICE ------
              // itemDemo.price = round2;
              itemDemo.price = pricePOl
              itemDemo.priceMaster = pricePOl
              // itemDemo.ref_price = row.price
              let step1 =
                parseFloat(itemDemo.price) * (parseFloat(percent) / 100)
              let step2 = _.round(step1, 4)
              let step4 = step2 * parseInt(row.order_qty)
              let step5 = _.round(step4, 4)
              let step6 = _.round(step5, 2)
              itemDemo.net_amount = itemDemo.amount - step6
              let last_dis = (itemDemo.amount / 100) * parseFloat(percent)
              let last_dis2 = _.round(last_dis, 2)
              itemDemo.last_discount = last_dis2
            } else {
               console.log("Add 3  ==> 2")
              itemDemo.net_price = 0
              itemDemo.amount = 0
              itemDemo.price = 0 
              itemDemo.priceMaster = round2
              itemDemo.net_amount = 0
              itemDemo.last_discount = 0
              itemDemo.flag_status = 'F'
              /**cal budget*/
              let budget = 0
              if (itemDemo.ppu > 0 && itemDemo.ppu > itemDemo.price) {
                budget = (itemDemo.ppu - itemDemo.price) * itemDemo.order_qty
                let budget4 = _.round(budget, 4)
                let budget3 = _.round(budget4, 3)
                let rs = _.round(budget3, 2)
                itemDemo.budget = rs
              } else {
                itemDemo.budget = 0
              }
            }

         
            itemDemo.ref_price = itemDemo.priceMaster
            //  console.log("Add 3  ==> ", itemDemo);
            items.push(itemDemo)
            itemDemo = {}
          } else {
            //  console.log("Add 4  ==> ", row.code);
          }
        })
        
        // console.log("items => ", items);
        let tempVD = []
        var itemNobk = _.filter(items, item => {
          if (
            item.flag_status != 'F' &&
            item.flag_status != 'FV' &&
            (_.isUndefined(item.ref_po_no) ||
              _.isNull(item.ref_po_no) ||
              _.trim(item.ref_po_no).length < 2)
          ) {
            return true
          }
        })
        let prod_code = _.map(itemNobk, 'item_code')
        // FIX PRICE---------------
        if (
          (_.toUpper(t.info.price_policy_code) == 'AUTO' &&
            _.toUpper(t.info.customer_channel_code) == '100') ||
          _.toUpper(t.info.price_policy_code) == 'FLEX'
        ) {
          // console.log("price_policy => 2");
          let priceForVd =
            _.toUpper(t.info.price_policy_code) == 'AUTO'
              ? t.info.pricetype_code
              : t.info.pricefix_code
          orService
            .getVolumeDis(prod_code, priceForVd)
            .then(result => {
              // console.log(data)
              result.forEach(function (group) {
                data.forEach(function (row) {
                  let item = group['details'].find(
                    todo => todo.item_code === row.code
                  )
                  let itemOld = itemsOld.find(
                    todo => todo.item_code === row.code
                  )
                  if (
                    typeof item != 'undefined' &&
                    typeof itemOld == 'undefined'
                  ) {
                    tempVD.push(group)
                  } else if (
                    typeof item != 'undefined' &&
                    typeof itemOld != 'undefined' &&
                    parseFloat(itemOld.order_qty) != parseFloat(row.order_qty)
                  ) {
                    tempVD.push(group)
                  } else if (
                    typeof item != 'undefined' &&
                    typeof itemOld != 'undefined' &&
                    parseFloat(itemOld.order_qty) == parseFloat(row.order_qty)
                  ) {
               
                    if (
                      _.isUndefined(item.ref_po_no) ||
                      _.isNull(item.ref_po_no) ||
                      _.trim(item.ref_po_no).length < 2
                    ) {
                      tempVD.push(group)
                    } else {
                    }
                  }
                })
              })
              t.spinner = false
              t.checkRange(tempVD, items, mode)
              if (mode == 'close') {
                t.close(mode)
              } else {
                t.spinner = false
              }
            })
            .catch()
        } else {
          // FIX PRICE---------------
          // console.log('items => ' ,items)
          t.$store.commit('myorders/setItems', items)
          t.$store.dispatch('myorders/sumTotalTable')
          t.$emit('add', mode)
          if (mode == 'close') {
            t.close(mode)
          } else {
            t.spinner = false
          }
        }
      }, 0)
    },
    checkRange (result, data, mode) {
      let t = this
      let runProdByCode = {}
      let keepData = []
      result.forEach(function (group) {
        runProdByCode[group.group_id] = 0
        data.forEach(function (row) {
          if (
            _.isUndefined(row.ref_po_no) ||
            _.trim(row.ref_po_no).length < 2
          ) {
            let item = group['details'].find(
              todo => todo.item_code === row.item_code
            )
            if (typeof item != 'undefined') {
              let temp = []
              _.forEach(group['volume_discount'], function (val, index) {
                let cldVal = _.cloneDeep(val[0])
                if (typeof cldVal != 'undefined') {
                  let obj = {
                    end: _.isNumber(cldVal.end) ? cldVal.end : 9999999999999999,
                    start: cldVal.start,
                    type: index
                  }
                  val[0] = obj
                }
              })
              row.group = [group]
              if (row.flag_status != 'F' && row.flag_status != 'FV') {
                runProdByCode[group.group_id] =
                  runProdByCode[group.group_id] + parseInt(row.order_qty)
                row.volDiscount = 'Y'
                row.budget = 0
              }
              keepData.push(row)
            }
          }
        })
      })
      let priceCode = {}
      result.forEach(function (group) {

        // console.log(group)
        _.forEach(group['volume_discount'], function (val, index) {
          let cldVal = _.cloneDeep(val[0])
          if (typeof cldVal != 'undefined') {
            if (
              _.inRange(
                runProdByCode[group.group_id],
                cldVal.start,
                cldVal.end
              ) ||
              runProdByCode[group.group_id] == cldVal.start ||
              runProdByCode[group.group_id] == cldVal.end
            ) {
              priceCode[group.group_id] = cldVal.type
            }
          }
        })
        keepData.forEach(function (row) {
          let item = group['details'].find(
            todo => todo.item_code === row.item_code
          )
          if (typeof item != 'undefined') {
            if (
              row.flag_status != 'F' &&
              row.flag_status != 'FV' &&
              (_.isNull(row.ref_po_no) || row.ref_po_no.length < 2)
            ) {
              let dis = parseInt(t.info.percent_discount) / 100
              if (
                parseFloat(row.order_qty) > 0 &&
                row.flag_status != 'CP' && row.flag_status != 'CV'
              ) {
                /**
                  04122020 
                  if (parseFloat(row.order_qty) > 0) {
                */
                let pr = ''
                let vd_price_code = ''
                if (item['price'][priceCode[group.group_id]] == false) {
                  pr = row.ppu
                } else if (
                  item['price'][priceCode[group.group_id]] != false &&
                  typeof item['price'][priceCode[group.group_id]] != 'undefined'
                ) {
                  pr = item['price'][priceCode[group.group_id]].price
                  vd_price_code =
                    item['price'][priceCode[group.group_id]].default_price_code
                }
                // round ทศนิยม

                let pr2 = _.round(pr, 2)

                row.priceVD = pr2
                /** set price from vd*/
                row.price = pr2
                row.vd_price_code = vd_price_code
                /*---------------------*/

                // for case free gift display vd
                let keyItemF = _.findIndex(data, function (o) {
                  return (
                    o.item_code == row.item_code &&
                    (o.flag_status == 'F' || o.flag_status == 'FV')
                  )
                })
                if (keyItemF >= 0) {
                  let rowFV = data[keyItemF]
                  rowFV.priceVD = row.priceVD
                  let b = row.priceVD * rowFV.order_qty
                  let budget4F = _.round(b, 4)
                  let budget3F = _.round(budget4F, 3)
                  let budget2F = _.round(budget3F, 2)
                  rowFV.priceMaster = row.priceVD
                  rowFV.flag_status = 'FV'
                  rowFV.budget = budget2F
                  data[keyItemF] = rowFV
                }

                if (
                  row.price != parseFloat(row.ppu) &&
                  row.price != pr2 &&
                  row.flag_status != 'G'
                ) {
                  row.flag_status = 'CV'
                } else {
                  row.price = pr2
                  row.flag_status = 'G'
                }

                let amount = parseFloat(row.price) * parseInt(row.order_qty)
                // round ทศนิยม
                let amount2 = _.round(amount, 2)

                let total = amount2 * dis
                let totalP = parseFloat(row.price) * dis
                row.net_price = parseFloat(row.price) - totalP
                row.amount = amount2

                let step1 = parseFloat(row.price) * dis
                let step2 = _.round(step1, 4)
                let step4 = step2 * parseInt(row.order_qty)
                let step5 = _.round(step4, 4)
                let step6 = _.round(step5, 2)
                row.net_amount = row.amount - step6

                let last_dis =
                  (row.amount / 100) * parseInt(t.info.percent_discount)
                let last_dis2 = _.round(last_dis, 2)
                row.last_discount = last_dis2

                if (
                  parseFloat(row.priceVD) >= parseFloat(row.price) &&
                  parseFloat(row.priceVD) > 0
                ) {
                  let budget =
                    (parseFloat(row.priceVD) - parseFloat(row.price)) *
                    parseFloat(row.order_qty)
                  // round ทศนิยม
                  let budget2 = _.round(budget, 2)
                  row.budget = budget2
                }
              }
            }
          }
        })
      })
      // console.log(data)
      this.$store.commit('myorders/setItems', data)
      this.$store.dispatch('myorders/sumTotalTable')
      this.$emit('add', mode)
    },
    close () {
      var temp = document.getElementById('all-product-popup')
      if (!_.isNull(temp)) {
        temp.childNodes[0].childNodes[2].value = ''
        if (!_.isUndefined(temp.childNodes[0].childNodes[4].style)) {
          temp.childNodes[0].childNodes[4].style.display = 'none'
        }
      }
      this.total = 0
      this.headChk = false
      this.spinner = false
      this.mo_product_cg = ''
      this.mo_sub_group_code = ''
      this.mo_product_group_code = ''
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_group_code',
        data: ''
      })
      this.keyword = ''
      this.product_cg = 'all'
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_cg',
        data: ''
      })
      this.sub_group_code = 'all'
      this.product_group_code = 'all'
      this.dataList = []
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_dataList',
        data: []
      })
      this.dataListTemp = []
      this.$emit('close')
      Vue.localStorage.set('ALLPROD_DIALOG_SHOW', 'CLOSE')
    },
    checkedAll (e) {
      let val = this.headChk
      _.forEach(this.dataList, function (row) {
        row.checked = val
      })
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_dataList',
        data: this.dataList
      })
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_headChk',
        data: val
      })
      let chk = this.dataList.filter(todo => todo.checked == true)
      this.disabledBtn = chk.length > 0 ? false : true
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_disabledBtn',
        data: this.disabledBtn
      })
    },
    countCHK (e, index) {
      let chk = this.dataList.filter(todo => todo.checked == true)
      this.headChk = chk.length != this.dataList.length ? false : true
      this.disabledBtn = chk.length > 0 ? false : true
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_disabledBtn',
        data: this.disabledBtn
      })
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_dataList',
        data: this.dataList
      })
    },
    choosePG (value, key) {
      this.spinner = true
      this.product_group_code = value.code == '' ? 'all' : value.code
      this.sub_group_code = ''
      this.product_cg = ''
      this.mo_sub_group_code = ''
      this.mo_product_cg = ''
      let obj = {
        code: value.code == '' ? 'all' : value.code,
        only_product: this.only_product,
        emp_id: this.info.salesman_code
      }
      if (value.code == '') {
        this.sub_group_code = ''
        this.product_cg = ''
      }

      orService
        .searchSubGroup(obj)
        .then(response => {
          this.spinner = false
          this.dataListProductDG.sub_group = _.filter(response, item => {
            if (item.title != null && item.code != ' ') {
              return true
            }
          })
          this.$store.dispatch('myorders/setLocalStore', {
            feild: 'prod_dataListProductDG',
            data: this.dataListProductDG
          })
        })
        .catch()
    },
    chooseSG (value, key) {
      this.spinner = true
      this.sub_group_code = value.code == '' ? 'all' : value.code
      this.product_cg = ''
      this.mo_product_cg = ''
      let obj = {
        code: value.code == '' ? 'all' : value.code,
        only_product: this.only_product,
        emp_id: this.info.salesman_code
      }
      if (value.code == '') {
        this.product_cg = ''
      }
      orService
        .searchProductCG(obj)
        .then(response => {
          this.spinner = false
          this.dataListProductDG.cg = response
          this.$store.dispatch('myorders/setLocalStore', {
            feild: 'prod_dataListProductDG',
            data: this.dataListProductDG
          })
        })
        .catch()
    },
    chooseCG (value, key) {
      let rs = value.code == '' ? 'all' : value.code
      this.product_cg = rs
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_mo_product_cg',
        data: rs
      })
    },
    search () {
      this.spinner = true
      let t = this
      // MIX PRICE -------------
      let dataSearch = this.info
      let price_policy = dataSearch.pricetype_code
      let price_policy_code = 'auto'
      if (!_.isUndefined(dataSearch.price_policy_code)) {
        price_policy_code = dataSearch.price_policy_code
        if (_.toUpper(dataSearch.price_policy_code) == 'BOOK') {
          price_policy = dataSearch.pricebook_code
        } else if (_.toUpper(dataSearch.price_policy_code) == 'AUTO') {
          price_policy = dataSearch.pricetype_code
        } else if (_.toUpper(dataSearch.price_policy_code) == 'MIX') {
          price_policy =
            dataSearch.pricebook_code + ',' + dataSearch.pricefix_code
        } else {
          price_policy = dataSearch.pricefix_code
        }
      }

      orService
        .searchProductItem({
          price_type: dataSearch.pricetype_code,
          price_policy: price_policy,
          price_policy_code: price_policy_code,
          customer_code: dataSearch.customer_code,
          product_group_code: this.product_group_code,
          sub_group_code: this.sub_group_code,
          product_cg: this.product_cg,
          emp_id: dataSearch.salesman_code,
          keyword: _.trim(this.keyword),
          only_product: this.only_product
        })
        .then(response => {
          this.headChk = false
          this.dataListTemp = []
          this.dataList = []
          this.$store.dispatch('myorders/setLocalStore', {
            feild: 'prod_dataList',
            data: []
          })
          let data = _.filter(response['products'], item => {
            if (item.code != '' && item.title != '') {
              return true
            }
          })
          this.spinner = false
          this.checkItems(data)
        })
        .catch()
    },
    checkItems (data) {
      let temp = []
      if (this.items.length > 0 || this.itemsPromoOrder.length > 0) {
        for (let i = 0; i < this.limit; i++) {
          if (typeof data[i] != 'undefined') {
            this.keepIndexArray = i
            let indexItem = _.findIndex(this.items, {
              item_code: data[i].code
            })
            let indexItemFil = _.filter(this.items, item => {
              return item.item_code == data[i].code
            })
            let tempPromo = []
            let tempFreegift = []
            _.forEach(this.itemsPromoOrder, function (row) {
              let indexPromo = _.filter(row.products, item => {
                return item.item_code == data[i].code
              })
              if (indexPromo.length > 0) {
                tempPromo.push(indexPromo[0])
              }
              let indexFreegift = _.filter(row.freeitems, item => {
                return item.item_code == data[i].code
              })
              if (indexFreegift.length > 0) {
                tempFreegift.push(indexFreegift[0])
              }
            })
            // console.log("code => ", data[i].code);
            // console.log("indexItemFil => ", indexItemFil);
            // console.log("tempPromo => ", tempPromo);
            // console.log("tempFreegift => ", tempFreegift);
            if (
              indexItemFil.length == 0 &&
              tempPromo.length == 0 &&
              tempFreegift.length > 0
            ) {
              /* มี items ที่เป็น freegift แล้ว */
              if (tempFreegift[0].ppu > 0 && parseFloat(data[i].ppu) == 0) {
                data[i].freegift = true
                temp.push(data[i])
              } else if (
                tempFreegift[0].ppu == 0 &&
                parseFloat(data[i].ppu) > 0
              ) {
                temp.push(data[i])
                // console.log(data[i]);
              } else {
                // console.log()
              }

              // console.log("1 --------------");
            } else if (
              indexItemFil.length == 0 &&
              tempPromo.length > 0 &&
              tempFreegift.length == 0
            ) {
              /* มี items ที่อยู่ใน promotion แล้ว แต่ไม่มีใน freegift เลย*/
              data[i].freegift = true
              temp.push(data[i])
              // console.log("2 --------------");
            } else if (
              indexItemFil.length > 0 &&
              tempPromo.length == 0 &&
              tempFreegift.length == 0
            ) {
              /* มี items ที่อยู่ใน order แล้ว*/
              let check0 = _.filter(indexItemFil, item => {
                return item.price == 0
              })
              if (check0.length == 0) {
                var indexItem1 = _.findIndex(this.items, function (o) {
                  return o.item_code == data[i].code && parseFloat(o.price) > 0
                })
                if (
                  _.isNull(this.items[indexItem1].ref_po_no) ||
                  this.items[indexItem1].ref_po_no.length < 2
                ) {
                  data[i].checked = true
                  data[i].order_qty = this.items[indexItem1].order_qty
                  data[i].error_stock = this.items[indexItem1].error_stock
                } else {
                  data[i].freegift = true
                }
                temp.push(data[i])
                // console.log("3.1 --------------");
              } else {
                var step1 = _.findIndex(indexItemFil, function (o) {
                  return parseFloat(o.price) > 0
                })
                if (step1 >= 0) {
                  if (
                    _.isNull(indexItemFil[step1].ref_po_no) ||
                    indexItemFil[step1].ref_po_no.length < 2
                  ) {
                    data[i].checked = true
                    data[i].order_qty = indexItemFil[step1].order_qty
                    data[i].error_stock = indexItemFil[step1].error_stock
                    temp.push(data[i])
                    // console.log("3.2 --------------", step1);
                  } else {
                    var step2 = _.findIndex(indexItemFil, function (o) {
                      return parseFloat(o.price) == 0
                    })
                    if (step2 >= 0) {
                      data[i].freegift = true
                      data[i].checked = true
                      data[i].order_qty = indexItemFil[step2].order_qty
                      data[i].error_stock = indexItemFil[step2].error_stock
                      temp.push(data[i])
                      // console.log("3.22 --------------", step2);
                    } else {
                      // console.log("3.222 --------------");
                    }
                  }
                } else {
                  if (
                    _.isNull(indexItemFil[0].ref_po_no) ||
                    indexItemFil[0].ref_po_no.length < 2
                  ) {
                    if (parseFloat(indexItemFil[0].ppu) == 0) {
                      data[i].checked = true
                      data[i].order_qty = indexItemFil[0].order_qty
                      data[i].error_stock = indexItemFil[0].error_stock
                      temp.push(data[i])
                      // console.log("3.3 --------------");
                    } else {
                      temp.push(data[i])
                      // console.log("3.33 --------------");
                    }
                  } else {
                    if (parseFloat(indexItemFil[0].ppu) == 0) {
                      temp.push(data[i])
                      // console.log("3.333 ----");
                    } else {
                      // console.log("3.3333 ----ไม่แสดงเพราะเป็นของแถมจาก bk");
                    }
                  }
                }
              }
            } else if (
              indexItemFil.length == 0 &&
              tempPromo.length > 0 &&
              tempFreegift.length >= 0
            ) {
              temp.push({ order_qty: 'NO' })
              /* มี items ที่อยู่ใน promotion แล้ว ทั้ง normal items  และ freegift*/
              // console.log("4  --------------");
            } else if (indexItemFil.length == 1 && tempPromo.length > 0) {
              if (indexItemFil[0].price == 0) {
                data[i].freegift = true
                data[i].checked = true
                data[i].order_qty = indexItemFil[0].order_qty
                data[i].error_stock = indexItemFil[0].error_stock
                temp.push(data[i])
              }

              // console.log("5  --------------", indexItemFil);
            } else {
              temp.push(data[i])
              // console.log("else --------------");
            }
          }
          if (i == data.length - 1) {
            this.spinner = false
          }
        }
      } else {
        temp = data
        this.spinner = false
      }
      if (data.length == 0) {
        this.spinner = false
      }
      this.dataList = temp
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_dataList',
        data: data
      })
      this.dataListTemp = _.cloneDeep(data)
      let dataFil = _.filter(temp, item => {
        if (item.order_qty != 'NO') {
          return true
        }
      })
      this.total = dataFil.length
      let check = _.filter(this.dataList, item => {
        if (item.checked == true) {
          return true
        }
      })
      this.disabledBtn = check.length > 0 ? false : true
      this.$store.dispatch('myorders/setLocalStore', {
        feild: 'prod_disabledBtn',
        data: this.disabledBtn
      })
    },
    formatNumberInt (value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    formatNumber (value) {
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    isNumber (evt, index) {
      if (this.dataList[index].order_qty.length > 4) {
        evt.preventDefault()
      }
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode

      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    nextTab (e) {
      if (e != '') {
        let evt = e ? e : window.event
        var charCode = e.which ? e.which : e.keyCode
        if (charCode == 13) {
          var el =
            e.target.parentElement.parentElement.parentElement.parentElement
          if (
            typeof el.nextSibling.childNodes[0].childNodes[6] != 'undefined'
          ) {
            el.nextSibling.childNodes[0].childNodes[6].childNodes[0].childNodes[0].focus()
          }
        }
      }
    }
  },
  components: {
    'md-search-box': require('./md-search-box'),
    'md-dropdown-box': require('./md-dropdown-box'),
    'mds-input': require('./orderqty-input')
  }
}
</script>
<style lang="scss" scoped>
.md-promotion-ipt {
  margin: unset;
  padding: unset;
  min-height: 30px !important;
}
.md-input-container .md-error {
  padding-top: 5px;
  opacity: unset;
  color: #f44336;
  font-size: 11px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.md-input-container:after {
  background-color: #fd7f00;
}
.head-table {
  font-size: 12px;
  // opacity: 0.6;
  font-weight: 500;
}
.detail-table {
  width: 100%;
  margin-right: 1%;
  display: flex;
  font-size: 14px;
  color: #5a5a5a;
}
.topic {
  color: #727272;
  font-size: 15px;
  font-family: roboto;
  margin-bottom: 20px;
}
.scroll-product {
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 200px);
}
.scroll-product::-webkit-scrollbar {
  height: 5px;
  width: 7px;
  background-color: #f9f9f9;
}
.scroll-product::-webkit-scrollbar-thumb {
  background: #a8a8a8;
  border-radius: 3px;
}
</style>
