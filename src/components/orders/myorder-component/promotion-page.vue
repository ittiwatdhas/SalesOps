<template>
  <div>
    <!---Head-->
    <div style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%">
      <md-spinner
        :md-size="150"
        :md-stroke="1"
        v-show="spinner_promo"
        md-indeterminate
      ></md-spinner>
    </div>
    <!-- height: 100%;background: #EFEFEF; -->
    <div
      v-show="spinner_promo"
      style="position: absolute;z-index: 100;width: 100%;
                  height: 100%;background: #EFEFEF;
                  opacity: 0.1;"
    ></div>
    <div class="md-dialog-title">
      <md-layout>
        <md-layout md-flex="70">
          <label class="sub-title kanitFont">All My Promotion</label>
        </md-layout>
        <md-layout md-flex="30" md-align="end">
          <md-icon
            @click.native="cancel"
            style="cursor:pointer;margin-right:30px"
            >close</md-icon
          >
        </md-layout>
      </md-layout>
    </div>
    <div class="md-dialog-content" style="padding-left:30px;padding-top:20px;">
      <md-layout md-flex="100">
        <div style="width:31%">
          <md-dropdown-box
            :placeholder="'All Product Group'"
            :data="productgroupList"
            v-model="product_group"
          ></md-dropdown-box>
        </div>
        <div style="width:31%;margin-left:3%">
          <md-dropdown-box
            :placeholder="'All Product CG'"
            :data="productcgList"
            v-model="product_cg"
          ></md-dropdown-box>
        </div>
        <div style="width:31%;margin-left:3%">
          <!-- v-model="keyword" -->
          <md-search-box-pomo
            :placeholder="'Search product in Promotion set'"
            :value="keyword"
            @filter="keywordFil"
            @submit="selectPromo"
            @clear="keywordCLR"
          ></md-search-box-pomo>
          <!-- @other="getPromotionSet" -->
        </div>
      </md-layout>
      <md-layout md-flex="100" style="margin-top:20px">
        <!-- <div :style="{'position': 'absolute' ,'z-index': '3','top': '30%','left': '40%'}">
          <md-spinner :md-size="150" :md-stroke="1" v-show="spinner_promo" md-indeterminate></md-spinner>
        </div>-->
        <div style="width:22%">
          <span class="md-promotion-title">Promotion Set</span>
          <md-promotion-box
            style="height: calc(100vh - 195px);margin-top:12px"
            :data="promosetList"
            @choose="selectPromotion"
            @scroll="scrollPromo"
            :iconTag="'label'"
            :selectCode="promosetSelecetCode"
          ></md-promotion-box>
        </div>
        <div style="width:78%;">
          <md-layout md-flex="100" style="padding-left:15px">
            <md-layout md-flex="25">All Product in Promotion</md-layout>
            <md-layout md-flex="30" style="padding-top:5px;">
              <!-- v-model="keywordProd" -->
              <md-search-box
                :placeholder="'Search product'"
                style="width:100%"
                :value="keywordProd"
                @filter="keywordProdFil"
                @clear="keywordProdCLR"
              ></md-search-box>
            </md-layout>
            <md-layout md-flex="45" md-align="end">
              <!-- :disabled="promo_seleceted.length == 0 ? true:false" -->
              <!-- :class="promo_seleceted.length > 0 ?'md-raised btn-orange':'md-raised btn-gray'" -->
              <md-button
                :disabled="checkBtnCal"
                :class="
                  checkBtnCal ? 'md-raised btn-gray' : 'md-raised btn-orange'
                "
                @click="calculate('noti')"
              >
                <md-icon style="font-size:25px;margin-right:5px"
                  >refresh</md-icon
                >
                <label style="font-size:12px;">calculate</label>
              </md-button>
              <md-button
                :disabled="
                  totalPromo.orderQty > 0 &&
                  spinner_promo == false &&
                  keepSets != 'NOSETS' &&
                  checkBtnAdd
                    ? false
                    : true
                "
                :class="
                  totalPromo.orderQty > 0 &&
                  spinner_promo == false &&
                  keepSets != 'NOSETS' &&
                  checkBtnAdd
                    ? 'md-raised btn-orange'
                    : 'md-raised btn-gray'
                "
                @click="openCF"
              >
                <md-icon style="font-size:19px;margin-right:5px">done</md-icon>
                <label style="font-size:12px;">{{ textBtnPromo }}</label>
              </md-button>
            </md-layout>
          </md-layout>
          <md-layout
            md-flex="100"
            style="margin-top:10px;padding-left:15px"
            class="md-promotion-table"
          >
            <div class="head-table">
              <div style="width: 35.5%">Item.</div>
              <div style="width: 12%;" class="text-right">PPU</div>
              <div style="width: 13%;" class="text-right">Price</div>
              <div style="width: 6%;" class="text-right">%</div>
              <div style="width: 10%;" class="text-right">Order Qty</div>
              <div style="width:7%;"></div>
              <div style="width:16%;padding-right:2%;" class="text-right">
                Amount
              </div>
            </div>
            <div class="detail-scroll-table" @scroll="scrollPage">
              <!-- <div
                class="md-promotion-title"
                style="margin-top:10%;padding-left:20%"
                v-if="promo_seleceted.length == 0 && product_group == 'Please select product group' && product_cg== 'Please select product CG'"
              >Please select product group or Please select product CG.</div>-->
              <div
                class="md-promotion-title"
                style="margin-top:10%;padding-left:20%"
                v-if="promo_seleceted.length == 0"
              >
                No Promotion Set...
              </div>
              <div
                class="detail-table"
                v-for="(row, index) in promo_seleceted"
                :key="'cd' + index"
                :style="{
                  'margin-top': index == 0 ? '7px' : '4px',
                  display: hilight(row, index) == true ? 'flex' : 'none'
                }"
              >
                <div
                  :style="{
                    width: '36%',
                    'padding-top': '5px',
                    color: 'rgba(0, 0, 0, .87)'
                  }"
                >
                  {{ row.item_code }}&nbsp;&nbsp;
                  <label style="font-family:kanit;">{{ row.item_name }}</label>
                </div>
                <div style="width:12%; " class="text-right pt-5">
                  ฿ {{ formatNumber(row.ppu) }}
                </div>
                <!-- <div style="width:12%; " class="text-right pt-5">฿ {{formatNumber(row.ppu)}}</div> -->
                <div style="width:13%; " class="text-right pt-5">
                  <label>฿ {{ formatNumber(row.net_price) }}</label>
                </div>
                <div style="width:6%; text-align:right;" class="pt-5">
                  {{ formatNumber(row.discount) }}
                </div>
                <div style="width: 10%;padding-right:1%;" class="ipt-table">
                  <template>
                    <mds-input
                      v-model="row.order_qty"
                      :table="'qtyPromo'"
                      :index="index"
                      type="detail"
                      :errorMsg="row.error_stock"
                      :readOnly="false"
                    ></mds-input>
                  </template>
                </div>
                <div
                  style="width:7%; padding-left:1%;font-family:kanit;"
                  class="unit pt-5"
                >
                  {{ row.unit }}
                </div>
                <div
                  style="width:16%; text-align: right;padding-right:2%;"
                  class="pt-5"
                >
                  ฿ {{ formatNumber(row.net_amount) }}
                </div>
              </div>
              <div
                class="title-promo"
                :style="{ 'padding-top': '20px', display: 'flex' }"
                v-if="freegSeleceted.length > 0"
              >
                Premium / Free Gift&nbsp;
                <div id="show-modeFg"></div>
              </div>
              <div
                class="detail-table"
                v-for="(row, index) in freegSeleceted"
                :style="{
                  'margin-top': index == 0 ? '7px' : '4px',
                  display: hilight(row, index) == true ? 'flex' : 'none'
                }"
                :key="'cdfg' + index"
              >
                <template>
                  <div style="width:36%;padding-top:5px">
                    {{ row.item_code }}&nbsp;&nbsp;
                    <label style="font-family:kanit;"
                      >{{ row.item_name }}</label
                    >
                  </div>
                  <div style="width:12%; " class="text-right pt-5">
                    ฿ {{ formatNumber(row.ppu) }}
                  </div>
                  <div style="width:13%; " class="text-right pt-5">
                    <label>฿ {{ formatNumber(row.net_price) }}</label>
                  </div>
                  <div style="width:6%; text-align:right" class="pt-5">
                    {{ formatNumberInt(row.discount) }}
                  </div>
                  <div style="width: 10%;padding-right:1%;" class="ipt-table">
                    <template>
                      <mds-input
                        maxlength="6"
                        v-model="row.order_qty"
                        :table="'qtyFreeg'"
                        :errorMsg="''"
                        :index="index"
                        type="detail"
                        :readOnly="row.error_stock"
                      ></mds-input>
                    </template>
                  </div>
                  <div
                    style="width:7%; padding-left:1%;font-family:kanit;"
                    class="unit pt-5"
                  >
                    {{ row.unit }}
                  </div>
                  <div
                    style="width:16%; text-align: right;padding-right:2%;"
                    class="pt-5"
                  >
                    ฿ {{ formatNumber(row.net_amount) }}
                  </div>
                </template>
              </div>
            </div>
          </md-layout>
          <div
            class="md-promotion-total"
            style="padding-left:15px"
            v-if="promo_seleceted.length > 0"
          >
            <div class="footer-table">
              <div
                style="width: 20%;color:#5A5A5A;font-size:14px;font-weight:bold"
              >
                TOTAL
              </div>
              <div
                style="width:5%;font-weight:bold;padding-right:5px"
                class="text-right"
              >
                <label>{{ formatNumberInt(totalPromo.countItem) }}</label>
              </div>
              <div style="width: 5%;font-size:12px;" class="text-right">
                Item(s)
              </div>
              <div
                style="width: 18%;font-size:12px;color:#27272"
                class="text-right"
              >
                DISCOUNT ({{ percentDiscount }}%)
              </div>
              <div style="width:13%;font-weight:bold" class="text-right">
                <label>฿ {{ formatNumber(totalPromo.netPrice) }}</label>
              </div>
              <div
                style="width: 15%;font-weight:bold;color:#5A5A5A;font-size:14px"
                class="text-right"
              >
                {{ formatNumberInt(totalPromo.orderQty) }}
              </div>
              <div style="width: 5%;font-size:11px;" class="text-right">
                Unit(s)
              </div>
              <div
                style="width:19%;font-size:14px;text-align: right;padding-right:2%;font-weight:bold"
              >
                ฿ {{ formatNumber(totalPromo.netAmount) }}
              </div>
            </div>
          </div>
        </div>
      </md-layout>
    </div>
    <md-dialog ref="md-confirm-promo-dialog">
      <md-dialog-title style="font-family:kanit">{{
        dg_title
      }}</md-dialog-title>
      <md-dialog-content>
        <div
          v-for="(row, keys) in dg_subtitle"
          :key="'alt-' + keys"
          style="margin-top:5px;font-family:kanit"
        >
          {{ row }}
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button v-if="dg_mode" @click="close">CANCEL</md-button>
        <md-button
          :disabled="runProcess ? true : false"
          v-if="dg_mode"
          class="md-primary"
          @click="addclose"
          >ADD & CLOSE</md-button
        >
        <md-button
          :disabled="runProcess ? true : false"
          class="md-primary"
          @click="add"
          >{{ dg_rigthbtn }}</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <md-dialog ref="md-confirm-del-dialog">
      <md-dialog-title>
        <div v-if="dupProduct.length > 0">
          We found duplicate items from order list.
        </div>
        <div v-else>We found duplicate items from promotion list.</div>
      </md-dialog-title>
      <md-dialog-content>
        <div v-if="dupProduct.length > 0">
          <div
            style="font-family:lato"
            v-for="(row, index) in dupProduct"
            :key="'del-' + index"
          >
            {{ row.item_code }}&nbsp;&nbsp;:&nbsp;&nbsp;{{ row.item_name }}
          </div>
          <div style="font-family:lato;margin-top:18px;font-size:18px">
            Do you want to remove it?
          </div>
        </div>
        <div v-else>
          <div
            style="font-family:lato"
            v-for="(row, index) in dupPromotion"
            :key="'del-' + index"
          >
            {{ row.promo_code }}&nbsp;&nbsp;:&nbsp;&nbsp;{{
              row.item_code
            }}&nbsp;&nbsp;:&nbsp;&nbsp;{{ row.item_name }}
          </div>

          <!-- <div style="font-family:lato;margin-top:18px;font-size:18px">Do you want to remove it?</div> -->
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button v-if="dupProduct.length > 0" @click="removeProducts"
          >REMOVE</md-button
        >
        <md-button class="md-primary" @click="addProduct">
          <span v-if="dupProduct.length > 0">NO</span>
          <span v-else>CANCEL</span>
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import orService from '@/services/orders/myorders'
import _ from 'lodash'
export default {
  created () {
    this.$store.commit('myorders/SET_THIS_PAGEPM', this)
  },
  data () {
    return {
      product_group: 'Please select condition search',
      product_cg: 'Please select condition search',
      keyword: '',
      dg_title: '',
      dg_subtitle: [],
      dg_mode: false,
      dg_rigthbtn: '',
      keepEvent: '',
      keywordProd: '',
      dupProduct: [],
      dupPromotion: [],
      inSet: [],
      indexSet: false,
      limit: 100,
      loading: false,
      loading: false,
      runProcess: false,
      AllPromotion: [],
      checkDupItemInOrderTxt: 'promo',
      modeFromEdotPromo: ''
    }
  },
  computed: {
    textBtnPromo () {
      return this.$store.getters['myorders/textBtnPromo']
    },
    items () {
      return this.$store.getters['myorders/items_order']
    },
    percentDiscount () {
      return this.$store.getters['myorders/percentDiscPM']
    },
    promosetSelecetCode () {
      let obj = this.$store.getters['myorders/promo_set_seleceted']
      let rs = ''
      if (typeof obj.promo_code != 'undefined') {
        rs = obj.promo_code
      }
      return rs
    },
    promosetList () {
      return this.$store.getters['myorders/promo_set_list']
    },
    productgroupList () {
      return this.$store.getters['myorders/product_group']
    },
    productcgList () {
      return this.$store.getters['myorders/product_cg']
    },
    spinner_promo () {
      return this.$store.getters['myorders/spinner_promo']
    },
    promo_seleceted () {
      return this.$store.getters['myorders/promo_seleceted']
    },
    totalPromo () {
      return this.formatNumber(this.$store.getters['myorders/totalPromo'])
    },
    freegSeleceted () {
      return this.formatNumberInt(
        this.$store.getters['myorders/promo_freeg_seleceted']
      )
    },
    keepSets () {
      return this.$store.getters['myorders/keepSets'].name
    },
    keepSetsFull () {
      return this.$store.getters['myorders/keepSets']
    },
    proCondition () {
      return this.$store.getters['myorders/promo_set_seleceted']['sets']
    },
    checkBtnAdd () {
      return this.$store.getters['myorders/checkBtnAdd']
    },
    defaultPrice () {
      let rs = this.$store.getters['myorders/promo_set_seleceted']
      if (typeof rs.sets != 'undefined') {
        return rs.sets[0].default_price
      } else {
        return ''
      }
    },
    info () {
      return this.$store.getters['myorders/customer_info']
    },
    checkBtnCal () {
      return this.$store.getters['myorders/checkBtnCal']
    },
    promo_seleceted_temp () {
      return this.$store.getters['myorders/promo_seleceted_temp']
    },
    items_promo_order () {
      return this.$store.getters['myorders/items_promo_order']
    }
  },
  watch: {
    product_group (value) {
      this.product_cg = 'Please select condition search'
      if (_.trim(value) != 'Please select condition search') {
        this.selectProdGroup(value)
        this.getPromotionSet('dp')
      } else {
        this.$store.commit('myorders/setPromotionSet', [])
        this.$store.commit('myorders/selectedPromo', [])
        this.$store.commit('myorders/selectedFreegift', [])
      }
    },
    product_cg (value) {
      if (_.trim(value) != 'Please select condition search') {
        this.getPromotionSet('dp')
      } else {
        this.$store.commit('myorders/selectedPromo', [])
        this.$store.commit('myorders/selectedFreegift', [])
      }
    },
    keywordProd (value) {}
  },
  methods: {
    keywordFil (val) {
      this.keyword = val
      if (_.trim(val).length == 0) {
        // this.getPromotionSet('search')
      }
    },
    keywordCLR () {
      this.keyword = ''
      // this.getPromotionSet('search')
    },
    keywordProdCLR () {
      this.keywordProd = ''
      this.$store.dispatch('myorders/keywordProdFil', '')
    },
    keywordProdFil (val) {
      this.keywordProd = val
      let t = this
      this.$nextTick(() => {
        t.$store.dispatch('myorders/keywordProdFil', val)
      })
    },
    scrollPage (val) {
      if (_.trim(this.keywordProd).length == 0) {
        let t = this
        if (t.loading == false) {
          t.loading = true
          setTimeout(function () {
            t.loading = false
            t.$store.dispatch('myorders/scrollPage')
          }, 0)
        }
      }
    },
    hilight (val, index) {
      // let key = _.trim(this.keywordProd);
      // if (key.length > 1) {
      //   const str = _.trim(val.item_code) + _.trim(val.item_name);
      //   return str.toUpperCase().indexOf(key.toUpperCase()) !== -1;
      // } else {
      return true
      // }
    },
    openCalDG (mode) {
      this.dg_mode = false
      this.dg_rigthbtn = 'OK'
      let conditions =
        this.inSet.conditions.length > 0 ? this.inSet.conditions[0] : ''
      let set = this.inSet
      this.dg_subtitle = []

      if (mode == 'open' || mode == 'inset') {
        if (conditions.type == 'QTY') {
          if (mode == 'open') {
            this.dg_title =
              'รับโปรโมชั่นนี้ทันทีเมื่อซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.min) +
              ' ชิ้นขึ้นไป'
          } else {
            if (conditions.max_level) {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' ชิ้นไป'
            } else {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' ชิ้น แต่ไม่เกิน ' +
                this.formatNumberInt(conditions.max) +
                ' ชิ้น'
            }
          }
        } else if (conditions.type == 'Count Item' && conditions.min == '') {
          if (mode == 'open') {
            this.dg_title =
              'รับโปรโมชั่นนี้ทันทีเมื่อซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.count) +
              ' รายการ '
          } else {
            this.dg_title =
              'รับ ' +
              set.name +
              ' นี้ทันทีเมื่อซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.count) +
              ' รายการ '
          }
        } else if (conditions.type == 'Count Item' && conditions.min != '') {
          if (mode == 'open') {
            this.dg_title =
              'รับโปรโมชั่นนี้ทันทีเมื่อซื้อสินค้าอย่างน้อย ' +
              this.formatNumberInt(conditions.count) +
              ' รายการขึ้นไป และจำนวนสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.min) +
              ' ชิ้นขึ้นไป'
          } else {
            if (conditions.max_level) {
              this.dg_title =
                'รับ ' +
                set.name +
                ' นี้ทันทีเมื่อซื้อสินค้าอย่างน้อย ' +
                this.formatNumberInt(conditions.count) +
                ' รายการขึ้นไป และจำนวนสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' ชิ้นขึ้นไป'
            } else {
              this.dg_title =
                'รับ ' +
                set.name +
                ' นี้ทันทีเมื่อซื้อสินค้าอย่างน้อย ' +
                this.formatNumberInt(conditions.count) +
                ' รายการขึ้นไป และจำนวนสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' ชิ้นขึ้นไป แต่ไม่เกิน ' +
                this.formatNumberInt(conditions.max) +
                ' ชิ้น'
            }
          }
        } else if (conditions.type == 'Value') {
          if (mode == 'open') {
            this.dg_title =
              'รับโปรโมชั่นนี้ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.min) +
              ' ชิ้นขึ้นไป'
          } else {
            if (conditions.max_level) {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' บาทขึ้นไป'
            } else {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' บาทขึ้นไป แต่ไม่เกิน ' +
                this.formatNumberInt(conditions.max) +
                ' บาท'
            }
          }
        } else if (conditions.type == 'Count Value') {
          if (mode == 'open') {
            this.dg_title =
              'รับโปรโมชั่นนี้ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.min) +
              ' บาทและซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.count) +
              ' รายการขึ้นไป'
          } else {
            if (conditions.max_level) {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' บาทขึ้นไปและซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.count) +
                ' รายการขึ้นไป'
            } else {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' บาทขึ้นไป แต่ไม่เกิน ' +
                this.formatNumberInt(conditions.max) +
                ' บาทและซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.count) +
                ' รายการขึ้นไป'
            }
          }
        } else if (conditions.type == 'Count Mix') {
          // console.log(conditions)
          if (mode == 'open') {
            this.dg_title =
              'รับโปรโมชั่นนี้ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.min_value) +
              ' บาทและซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.count) +
              ' รายการขึ้นไปและซื้อสินค้าตั้งแต่ ' +
              this.formatNumberInt(conditions.min) +
              ' ชิ้นไป'
          } else {
            if (conditions.max_level) {
              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min_value) +
                ' บาทขึ้นไปและซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.count) +
                ' รายการขึ้นไปและซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' ชิ้นไป'
            } else {
              let max_value = conditions.max_value_level
                ? ''
                : ' แต่ไม่เกิน ' +
                  this.formatNumberInt(conditions.max_value) +
                  'บาท'
              let max = conditions.max_level
                ? ''
                : ' แต่ไม่เกิน ' + this.formatNumberInt(conditions.max) + 'ชิ้น'

              this.dg_title =
                'รับ ' +
                set.name +
                ' ทันทีเมื่อมียอดซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min_value) +
                ' บาทขึ้นไป ' +
                max_value +
                ' และซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.count) +
                ' รายการขึ้นไปละซื้อสินค้าตั้งแต่ ' +
                this.formatNumberInt(conditions.min) +
                ' ชิ้นไป' +
                max
            }
          }
        }
      } else {
        if (mode == 'open-no') {
          this.dg_title = 'กรุณากรอก QTY เพื่อให้ระบบคำนวน Net Price ราย item'
        } else if (mode == 'inset-no') {
          this.dg_title = 'กรุณากรอก QTY เพิ่มเติมเพื่อให้ระบบคำนวนเงื่อนไขใหม่'
        }
      }
      this.$refs['md-confirm-promo-dialog'].open()
    },
    checkDupItemInOrder (data, mode) {
      this.checkDupItemInOrderTxt = mode
      var filt = _.filter(data, item => {
        if (item.order_qty > 0 && item.order_qty != '') {
          return true
        }
      })
      let t = this
      let tempPromo = []
      let tempFreegift = []
      let indexItemFil = []
      _.forEach(filt, function (row) {
        let indexItem = _.findIndex(t.items, {
          item_code: row.item_code
        })
        let rs = []
        if (mode == 'freegift') {
          rs = _.filter(t.items, item => {
            return (
              item.item_code == row.item_code && parseFloat(item.price) == 0
            )
          })
        } else {
          rs = _.filter(t.items, item => {
            return item.item_code == row.item_code && parseFloat(item.price) > 0
          })
        }

        _.forEach(rs, function (rowI) {
          indexItemFil.push(rowI)
        })

        _.forEach(t.items_promo_order, function (rowPro) {
          if (_.trim(row.promo_code) != _.trim(rowPro.promo_code)) {
            let indexPromo = _.filter(rowPro.products, item => {
              return item.item_code == row.item_code
            })
            if (indexPromo.length > 0) {
              tempPromo.push(indexPromo[0])
            }
            let indexFreegift = _.filter(rowPro.freeitems, item => {
              return item.item_code == row.item_code
            })
            if (indexFreegift.length > 0) {
              tempFreegift.push(indexFreegift[0])
            }
          }
        })
      })
      let obj = {
        indexItemFil: indexItemFil,
        tempPromo: tempPromo,
        tempFreegift: tempFreegift
      }
      return obj
    },
    calculate (mode) {
      let rs = this.checkDupItemInOrder(this.promo_seleceted_temp, 'promo')
      this.modeFromEdotPromo = mode
      let t = this
      this.keepEvent = 'add'
      if (
        rs.indexItemFil.length == 0 &&
        rs.tempPromo.length > 0 &&
        rs.tempFreegift.length == 0
      ) {
        this.dupPromotion = rs.tempPromo
        this.dupProduct = []
        this.$refs['md-confirm-del-dialog'].open()
      } else if (
        rs.indexItemFil.length == 0 &&
        rs.tempPromo.length > 0 &&
        rs.tempFreegift.length > 0
      ) {
        this.dupPromotion = rs.tempPromo
        this.dupProduct = []
        this.$refs['md-confirm-del-dialog'].open()
      } else if (
        rs.indexItemFil.length > 0 &&
        rs.tempPromo.length == 0 &&
        rs.tempFreegift.length == 0
      ) {
        if (
          rs.indexItemFil.length == 1 &&
          parseFloat(rs.indexItemFil[0].price) > 0
        ) {
          this.dupProduct = rs.indexItemFil
          this.dupPromotion = []
          this.$refs['md-confirm-del-dialog'].open()
        } else if (rs.indexItemFil.length > 1) {
          this.dupProduct = rs.indexItemFil
          this.dupPromotion = []
          this.$refs['md-confirm-del-dialog'].open()
        } else {
          // console.log("else ===>");
        }
      } else {
        this.$store.commit('myorders/SET_CHECKBTN_CAL', true)
        this.indexSet = false
        this.conditionsPromo(mode)
      }
    },
    conditionsPromo (mode) {
      let keepStatus = true
      let rsSets = []
      let keepCon = null
      let t = this
      this.$store.commit('myorders/setSpinnerPromo', true)
      // console.log('conditionsPromo => ', mode)
      setTimeout(() => {
        if (!_.isUndefined(t.proCondition)) {
          // console.log("==>")
          t.proCondition.forEach(function (row, keyINdex) {
            if (row['conditions'].length == 0) {
              rsSets = []
            } else {
              row['conditions'].forEach(function (rowCon, key) {
                if (rowCon.type == 'Count Item') {
                  // console.log("Count Item >>> ");
                  let allItems = _.filter(t.promo_seleceted_temp, item => {
                    if (item.order_qty > 0) {
                      return true
                    }
                  })

                  let countItems = _.uniqBy(allItems, 'item_code')
                  let allQty = allItems.reduce(
                    (acc, row) => acc + parseInt(row.order_qty),
                    0
                  )
                  if (countItems.length > parseInt(rowCon.count)) {
                    t.indexSet = keyINdex
                  }
                  if (_.isUndefined(rowCon.count)) {
                    if (
                      allQty >= parseInt(rowCon.min) &&
                      allQty <= parseInt(rowCon.max)
                    ) {
                      rsSets.push(rowCon)
                      keepCon = row
                    }
                  } else if (
                    !_.isUndefined(rowCon.count) &&
                    (!t.checkIsNaN(rowCon.min) || !t.checkIsNaN(rowCon.max))
                  ) {
                    if (
                      allQty >= parseInt(rowCon.min) &&
                      allQty <= parseInt(rowCon.max) &&
                      countItems.length >= parseInt(rowCon.count)
                    ) {
                      rsSets.push(rowCon)
                      keepCon = row
                    }
                  } else if (
                    !_.isUndefined(rowCon.count) &&
                    (t.checkIsNaN(rowCon.min) || t.checkIsNaN(rowCon.max))
                  ) {
                    if (countItems.length >= parseInt(rowCon.count)) {
                      rsSets.push(rowCon)
                      keepCon = row
                    }
                  }
                } else if (rowCon.type == 'Count Mix') {
                  let allItems = _.filter(t.promo_seleceted_temp, item => {
                    if (item.order_qty > 0) {
                      return true
                    }
                  })

                  let countItems = _.uniqBy(allItems, 'item_code')
                  if (countItems.length > parseInt(rowCon.count)) {
                    t.indexSet = keyINdex
                  }
                  // console.log(rowCon.max_value_leve)
                  if (
                    !_.isUndefined(rowCon.count) &&
                    (!t.checkIsNaN(rowCon.min) || !t.checkIsNaN(rowCon.max)) &&
                    (!t.checkIsNaN(rowCon.min_value) ||
                      !t.checkIsNaN(rowCon.max_value))
                  ) {
                    let min_value = parseFloat(rowCon.min_value)
                    let max_value = rowCon.max_value_leve
                      ? 9999999999999999
                      : parseFloat(rowCon.max_value)
                    let master_value = t.getSum('amount')

                    let min = parseFloat(rowCon.min)
                    let max = rowCon.max_level
                      ? 9999999999999999
                      : parseFloat(rowCon.max)
                    let master = t.getSum('order_qty')

                    if (
                      master_value >= parseInt(rowCon.min_value) &&
                      master_value <= parseInt(max_value) &&
                      master >= parseInt(rowCon.min) &&
                      master <= parseInt(max) &&
                      countItems.length >= parseInt(rowCon.count)
                    ) {
                      rsSets.push(rowCon)
                      keepCon = row
                    }
                  }
                } else if (rowCon.type == 'Count Value') {
                  // console.log('Count Value')
                  let allItems = _.filter(t.promo_seleceted_temp, item => {
                    if (item.order_qty > 0) {
                      return true
                    }
                  })

                  let countItems = _.uniqBy(allItems, 'item_code')
                  if (countItems.length > parseInt(rowCon.count)) {
                    t.indexSet = keyINdex
                  }
                  if (
                    !_.isUndefined(rowCon.count) &&
                    (!t.checkIsNaN(rowCon.min) || !t.checkIsNaN(rowCon.max))
                  ) {
                    let min = parseFloat(rowCon.min)
                    let max = rowCon.max_level
                      ? 9999999999999999
                      : parseFloat(rowCon.max)
                    let master = t.getSum('amount')
                    // console.log('countItems => ', countItems)
                    // console.log('count => ', rowCon.count)
                    // console.log('min => ', rowCon.min)
                    // console.log('max => ', rowCon.max)
                    // console.log('master => ', master)
                    // console.log('---------->')

                    if (
                      master >= parseInt(rowCon.min) &&
                      master <= parseInt(rowCon.max) &&
                      countItems.length >= parseInt(rowCon.count)
                    ) {
                      rsSets.push(rowCon)
                      keepCon = row
                    }
                  }
                } else {
                  let min = parseFloat(rowCon.min)
                  let max = rowCon.max_level
                    ? 9999999999999999
                    : parseFloat(rowCon.max)
                  let master = 0

                  // console.log("rowCon >> ", rowCon);
                  // console.log("max >> ", max);
                  var pro = _.filter(t.promo_seleceted_temp, item => {
                    if (_.isNumber(item.order_qty)) {
                      return true
                    }
                  })
                  if (rowCon.type == 'QTY') {
                    master = t.getSum('order_qty')
                  } else if (rowCon.type == 'Value') {
                    master = t.getSum('amount')
                  } else if (rowCon.type == 'Count Item') {
                    master = t.getSum('Count Item')
                  }
                  // console.log('master >>>> ', master)
                  // console.log('min >>>> ', min)
                  if (master >= min && master <= max) {
                    keepCon = row
                    rsSets.push(rowCon)
                  }
                  if (master > min) {
                    t.indexSet = keyINdex
                  }
                }
              })
            }
          })
          // console.log('keepCon >> ', keepCon)
          // console.log('rsSets => ', rsSets)
          // console.log('proCondition => ', t.proCondition)
          // console.log('keepCon => ', keepCon)

          if (rsSets.length > 0) {
            // GET PUU BY PRICE TYPE
            let master = 0
            let min = 0
            let max = 0
            let checkIf = false
            let keepSet = rsSets[rsSets.length - 1]
            if (keepSet.type == 'Count Item') {
              let allItems = _.filter(t.promo_seleceted_temp, item => {
                if (item.order_qty > 0) {
                  return true
                }
              })
              let countItems = _.uniqBy(allItems, 'item_code')
              let allQty = allItems.reduce(
                (acc, row) => acc + parseInt(row.order_qty),
                0
              )

              if (_.isUndefined(rsSets[0].count)) {
                if (
                  allQty >= parseInt(rsSets[0].min) &&
                  allQty <= parseInt(rsSets[0].max)
                ) {
                  master = allQty
                  min = parseInt(rsSets[0].min)
                  max = parseInt(rsSets[0].max)
                }
              } else if (
                !_.isUndefined(rsSets[0].count) &&
                (!t.checkIsNaN(rsSets[0].min) || !t.checkIsNaN(rsSets[0].max))
              ) {
                if (
                  allQty >= parseInt(rsSets[0].min) &&
                  allQty <= parseInt(rsSets[0].max) &&
                  countItems.length >= parseInt(rsSets[0].count)
                ) {
                  master = allQty
                  min = parseInt(rsSets[0].count)
                  max = parseInt(rsSets[0].max)
                }
              } else if (
                !_.isUndefined(rsSets[0].count) &&
                (t.checkIsNaN(rsSets[0].min) || t.checkIsNaN(rsSets[0].max))
              ) {
                if (countItems.length >= parseInt(rsSets[0].count)) {
                  master = countItems.length
                  min = parseInt(rsSets[0].count)
                  max = 9999999999999999
                }
              }
              if (master >= min && master <= max) {
                checkIf = true
              }
            } else if (keepSet.type == 'Count Value') {
              let allItems = _.filter(t.promo_seleceted_temp, item => {
                if (item.order_qty > 0) {
                  return true
                }
              })
              let countItems = _.uniqBy(allItems, 'item_code')
              if (
                !_.isUndefined(rsSets[0].count) &&
                (!t.checkIsNaN(rsSets[0].min) || !t.checkIsNaN(rsSets[0].max))
              ) {
                let min = parseFloat(rsSets[0].min)
                let max = rsSets[0].max_level
                  ? 9999999999999999
                  : parseFloat(rsSets[0].max)
                let master = t.getSum('amount')

                if (
                  master >= parseInt(rsSets[0].min) &&
                  master <= parseInt(rsSets[0].max) &&
                  countItems.length >= parseInt(rsSets[0].count)
                ) {
                  checkIf = true
                }
              }
            } else if (keepSet.type == 'Count Mix') {
              if (
                !_.isUndefined(rsSets[0].count) &&
                (!t.checkIsNaN(rsSets[0].min) ||
                  !t.checkIsNaN(rsSets[0].max)) &&
                (!t.checkIsNaN(rsSets[0].min_value) ||
                  !t.checkIsNaN(rsSets[0].max_value))
              ) {
                let allItems = _.filter(t.promo_seleceted_temp, item => {
                  if (item.order_qty > 0) {
                    return true
                  }
                })
                let countItems = _.uniqBy(allItems, 'item_code')
                let min_value = parseFloat(rsSets[0].min_value)
                let max_value = rsSets[0].max_value_leve
                  ? 9999999999999999
                  : parseFloat(rsSets[0].max_value)
                let master_value = t.getSum('amount')

                let min = parseFloat(rsSets[0].min)
                let max = rsSets[0].max_level
                  ? 9999999999999999
                  : parseFloat(rsSets[0].max)
                let master = t.getSum('order_qty')

                if (
                  master_value >= parseInt(rsSets[0].min_value) &&
                  master_value <= parseInt(max_value) &&
                  master >= parseInt(rsSets[0].min) &&
                  master <= parseInt(max) &&
                  countItems.length >= parseInt(rsSets[0].count)
                ) {
                  checkIf = true
                }
              }
            } else {
              min = parseFloat(keepSet.min)
              max = keepSet.max_level
                ? 9999999999999999
                : parseFloat(keepSet.max)
              if (keepSet.type == 'QTY') {
                master = t.getSum('order_qty')
              } else if (keepSet.type == 'Value') {
                master = t.getSum('amount')
              } else if (keepSet.type == 'Count Item') {
                master = t.getSum('Count Item')
              }
              if (master >= min && master <= max) {
                checkIf = true
              }
            }

            if (checkIf === true) {
              // if (master >= min && master <= max) {
              if (
                !_.isNull(t.AllPromotion) &&
                t.AllPromotion.length > 0 &&
                t.AllPromotion.sets.length == 1
              ) {
                t.calAfterGetPPU(keepCon)
                // console.log("have 1 sets");
              } else {
                if (_.isNull(t.AllPromotion)) {
                  let pmt = _.cloneDeep(t.promo_seleceted_temp)
                  let tempDush = []
                  t.$store.commit('myorders/setSpinnerPromo', true)
                  orService
                    .getPPU(keepCon.default_price, pmt)
                    .then(responsePPU => {
                      let count = 0
                      console.log('2 =>')
                      pmt.forEach(function (record, key) {
                        let ind = _.findIndex(responsePPU, {
                          pro_code: record.item_code
                        })
                        if (ind >= 0) {
                          record.ppu = parseFloat(responsePPU[ind].ppu)
                          if (
                            _.isNull(record.netp_range) ||
                            parseFloat(record.netp_range) == 0
                          ) {
                            record.net_price = parseFloat(responsePPU[ind].ppu)
                          } else {
                            record.net_price = record.netp_range
                          }

                          record.price = responsePPU[ind].ppu
                          record.pricetype = keepCon.default_price

                          let amount =
                            record.order_qty * parseFloat(responsePPU[ind].ppu)
                          let amount2 = _.round(amount, 2)

                          record.amount = amount2

                          let amountA = record.order_qty * record.net_price
                          let amountA2 = _.round(amountA, 2)
                          record.net_amount = amountA2
                        }
                        if (key < 50) {
                          tempDush.push(record)
                        }
                        if (key == t.promo_seleceted_temp.length - 1) {
                          t.$store.commit('myorders/selectedPromoTemp', pmt)
                          if (keepCon.promotions.length > 0) {
                            t.calAfterGetPPU(keepCon)
                            // console.log("=====/")
                          } else {
                            t.$store.commit('myorders/selectedPromo', tempDush)
                            t.$store.commit('myorders/selectedFreegift', [])
                          }
                          t.$store.commit('myorders/SET_CHECKBTN_ADD', true)
                          t.$store.dispatch('myorders/sumPromoTable')
                          t.$store.commit('myorders/setSpinnerPromo', false)
                        }
                      })
                    })
                    .catch()
                } else {
                  var filt = _.groupBy(t.AllPromotion.sets, 'default_price')
                  let loopSets = []
                  _.forEach(filt, function (loopSetsRow) {
                    loopSets.push(loopSetsRow)
                  })
                  // console.log("have many sets OR null ", t.AllPromotion);
                  if (loopSets.length == 1) {
                    // console.log("One price ", loopSets[0].default_price);
                    t.calAfterGetPPU(keepCon)
                  } else {
                    // console.log("Many price ");
                    t.$store.commit('myorders/setSpinnerPromo', true)
                    let pmt = _.cloneDeep(t.promo_seleceted_temp)
                    orService
                      .getPPU(keepCon.default_price, pmt)
                      .then(responsePPU => {
                        let count = 0
                        pmt.forEach(function (record, key) {
                          let ind = _.findIndex(responsePPU, {
                            pro_code: record.item_code
                          })
                          if (ind >= 0) {
                            record.ppu = parseFloat(responsePPU[ind].ppu)
                            if (
                              _.isNull(record.netp_range) ||
                              parseFloat(record.netp_range) == 0
                            ) {
                              record.net_price = parseFloat(
                                responsePPU[ind].ppu
                              )
                            } else {
                              record.net_price = record.netp_range
                            }

                            record.price = responsePPU[ind].ppu
                            record.pricetype = keepCon.default_price

                            let amount =
                              record.order_qty *
                              parseFloat(responsePPU[ind].ppu)
                            let amount2 = _.round(amount, 2)

                            record.amount = amount2

                            let amountA = record.order_qty * record.net_price
                            let amountA2 = _.round(amountA, 2)
                            record.net_amount = amountA2
                          }
                          if (key == t.promo_seleceted_temp.length - 1) {
                            t.$store.commit('myorders/selectedPromoTemp', pmt)
                            t.calAfterGetPPU(keepCon)
                            if (keepCon.promotions.length > 0) {
                            } else {
                              t.$store.commit('myorders/selectedFreegift', [])
                            }
                            t.$store.commit('myorders/SET_CHECKBTN_ADD', true)
                            t.$store.dispatch('myorders/sumPromoTable')
                            t.$store.commit('myorders/setSpinnerPromo', false)
                          }
                        })
                      })
                      .catch()
                  }
                }
              }
            } else {
              //  console.log("3>>>>");
              let obj = {
                name: 'NOSETS',
                default_price: t.defaultPrice
              }
              t.$store.commit('myorders/setKeepSets', obj)
            }
          } else {
            let totalItems = _.filter(t.promo_seleceted_temp, item => {
              if (item.order_qty > 0) {
                return true
              }
            })
            // console.log("No promo >>>>");
            let keepBtn = []
            let warning = []
            let tempDush = []
            t.$store.commit('myorders/setSpinnerPromo', true)
            let pmt = t.$store.getters['myorders/promo_seleceted_temp']
            let dPrice =
              t.proCondition.length == 0
                ? t.priceType
                : t.proCondition[0].default_price
            let keepRow = []
            orService
              .getPPU(dPrice, t.promo_seleceted_temp)
              .then(responsePPU => {
                _.forEach(pmt, function (row, key) {
                  let ind = _.findIndex(responsePPU, {
                    pro_code: row.item_code
                  })
                  let p = 0
                  if (ind >= 0) {
                    let rs = _.cloneDeep(row)
                    let range = row.netp_range
                    if (totalItems.length == 0) {
                      rs.net_price = responsePPU[ind].ppu
                      rs.price = responsePPU[ind].ppu
                      p = responsePPU[ind].ppu
                    } else {
                      //ํ YING
                      /** ไม่มี promo ไม่มี condition ใช้ net price ได้เลย*/
                      if (
                        keepCon === null &&
                        t.proCondition[0].conditions.length > 0
                      ) {
                        rs.net_price = responsePPU[ind].ppu
                        rs.price = responsePPU[ind].ppu
                        p = responsePPU[ind].ppu
                        // if (key === 0) {
                        //   console.log('if =>')
                        // }
                      } else {
                        if (!_.isNull(range) && range != 0) {
                          rs.price = range
                          rs.net_price = range
                          p = range
                          // if (key === 0) {
                          //   console.log('else 1 =>')
                          // }
                        } else {
                          // if (key === 0) {
                          //   console.log('else 2 =>')
                          // }
                          rs.net_price = responsePPU[ind].ppu
                          rs.price = responsePPU[ind].ppu
                          p = responsePPU[ind].ppu
                        }
                      }
                    }

                    rs.pricetype = t.keepSets.default_price
                    rs.discount = '-'

                    rs.ppu = responsePPU[ind].ppu
                    rs.netprice_old = responsePPU[ind].ppu
                    let amount = rs.order_qty * p
                    let amount2 = _.round(amount, 2)
                    rs.amount = amount2
                    rs.net_amount = amount2
                    row = rs
                    keepRow.push(rs)
                  }
                  if (key < 50) {
                    tempDush.push(row)
                  }
                  if (key == t.promo_seleceted_temp.length - 1) {
                    t.$store.commit('myorders/selectedPromoTemp', keepRow)
                    t.$store.commit('myorders/selectedPromo', tempDush)
                    t.$store.commit('myorders/selectedFreegift', [])
                    let fgRs = t.proCondition[0].promotions
                    if (fgRs.length == 1 && fgRs[0].type == 'Free item') {
                      t.$store.commit(
                        'myorders/selectedFreegift',
                        fgRs[0].value
                      )
                      let txt = document.getElementById('show-modeFg')
                      if (!_.isNull(txt)) {
                        document.getElementById('show-modeFg').innerHTML = ''
                      }
                    }

                    t.$store.commit('myorders/setPercentDiscPM', 0)
                    t.$store.dispatch('myorders/sumPromoTable')
                  }
                })
                t.$store.commit('myorders/setSpinnerPromo', false)
              })
              .catch()
            if (t.freegSeleceted.length > 0) {
              t.freegSeleceted.forEach(function (record, key) {
                record.order_qty = 0
              })
            }

            if (warning.length == 0) {
              t.$store.commit('myorders/SET_CHECKBTN_ADD', true)
            }
            if (t.table == 'qtyPromo') {
              t.freegSeleceted.forEach(function (record, key) {
                record.order_qty = 0
              })
            }
            let obj = {}
            let cond = t.proCondition[0].conditions.length
            if (cond == 0) {
              obj = {
                name: 'NOCONDITION',
                default_price: this.defaultPrice
              }
            } else {
              obj = {
                name: 'NOSETS',
                default_price: t.defaultPrice
              }
            }
            t.$store.commit('myorders/setKeepSets', obj)
            t.$store.dispatch('myorders/sumPromoTable')
            let cons = t.proCondition[0]['conditions']
            if (t.indexSet == false && mode == 'noti') {
              if (t.totalPromo.orderQty == 0 && cons.length > 0) {
                t.inSet = this.proCondition[0]
                // console.log("openCalDG 1 >>> ");
                t.openCalDG('open')
              } else if (t.totalPromo.orderQty > 0 && cons.length > 0) {
                // console.log("openCalDG 2 >>> ");
                t.inSet = this.proCondition[0]
                t.openCalDG('inset')
              } else if (
                warning.length > 0 &&
                t.totalPromo.orderQty > 0 &&
                cons.length == 0
              ) {
                // console.log("openCalDG 3 >>> ");
                t.inSet = this.proCondition[0]
                // t.openCalDG("inset-no");
                t.dg_title =
                  'กรุณากรอก QTY เพิ่มเติมเพื่อให้ระบบคำนวนเงื่อนไขใหม่'
                t.dg_subtitle = []
                warning.forEach(function (record, key) {
                  let txt =
                    'ซื้อ ' +
                    record.item_code +
                    ' ตั้งแต่ ' +
                    t.formatNumberInt(record.min) +
                    ' - ' +
                    t.formatNumberInt(record.max) +
                    ' ได้ราคา Net Price ทันที  ' +
                    t.formatNumberInt(record.netp_range) +
                    ' บาท'
                  t.dg_subtitle.push(txt)
                })
                t.dg_mode = false
                t.dg_rigthbtn = 'OK'
                t.$refs['md-confirm-promo-dialog'].open()
              } else if (t.totalPromo.orderQty == 0 && cons.length == 0) {
                t.inSet = this.proCondition[0]
                t.openCalDG('open-no')
              }
            } else if (t.indexSet && mode == 'noti') {
              if (_.isUndefined(this.proCondition[t.indexSet + 1])) {
                t.inSet = this.proCondition[t.indexSet]
                t.openCalDG('inset')
              } else {
                t.inSet = this.proCondition[t.indexSet + 1]
                t.openCalDG('inset')
              }
            }
          }

          t.$store.commit('myorders/setSpinnerPromo', false)
          var filt = _.filter(this.promo_seleceted_temp, item => {
            if (item.order_qty > 0 && item.order_qty != '') {
              return true
            }
          })
          if (
            this.keepSetsFull.name == 'NOSETS' &&
            this.keepSetsFull.name != 'NOCONDITION' &&
            filt.length > 0
          ) {
            let dPrice =
              t.proCondition.length == 0
                ? t.priceType
                : t.proCondition[0].default_price
            // console.log('getPPU ======>')
            t.getPPU(dPrice)
          }
          if (filt.length > 0) {
            t.$store.commit('myorders/setSpinnerPromo', true)
            orService
              .getStockByGroup(
                filt,
                t.info.pricetype_code,
                t.info.warehouse_code
              )
              .then(response => {
                // console.log("8 =>");
                t.$store.commit('myorders/setSpinnerPromo', false)
                _.forEach(response, function (record, key) {
                  if (_.isBoolean(record.stock) == false) {
                    let ind = _.findIndex(t.promo_seleceted_temp, {
                      item_code: record.item_code
                    })
                    if (ind >= 0) {
                      let stock =
                        parseInt(record.stock) > 0
                          ? t.formatNumberInt(record.stock)
                          : 0
                      t.promo_seleceted_temp[ind].error_stock =
                        record.stock <
                        parseInt(t.promo_seleceted_temp[ind].order_qty)
                          ? stock + ' left in stock'
                          : ''
                    }
                    let indShow = _.findIndex(t.promo_seleceted, {
                      item_code: record.item_code
                    })
                    if (
                      indShow >= 0 &&
                      !_.isUndefined(t.promo_seleceted[indShow])
                    ) {
                      let stock =
                        parseInt(record.stock) > 0
                          ? t.formatNumberInt(record.stock)
                          : 0
                      t.promo_seleceted[indShow].error_stock =
                        record.stock <
                        parseInt(t.promo_seleceted[indShow].order_qty)
                          ? stock + ' left in stock'
                          : ''
                    }
                  }
                })
              })
              .catch()
          }
          this.$store.commit('myorders/setSpinnerPromo', false)
        } else {
          this.$store.commit('myorders/setSpinnerPromo', false)
        }
      }, 0)
    },
    checkIsNaN (val) {
      return isNaN(parseFloat(val))
    },
    calAfterGetPPU (keepCon, rowPro) {
      let t = this
      if (t.keepSets != '' && t.keepSets.name != keepCon.name) {
        t.$store.commit('myorders/setKeepSets', keepCon)
      }
      if (keepCon.promotions.length == 0) {
        // console.log("เข้า sets แต่ไม่ promotion ให");
        let tempDush = []
        let pmt = _.cloneDeep(t.promo_seleceted_temp)
        pmt.forEach(function (record, key) {
          if (_.isNull(record.netp_range) || record.netp_range == 0) {
            record.net_price = parseFloat(record.ppu)
            record.price = parseFloat(record.ppu)
          } else {
            record.net_price = record.netp_range
            record.price = record.netp_range
          }

          if (record.order_qty > 0) {
            if (_.isNumber(record.order_qty)) {
              let amount = record.order_qty * record.ppu
              let amount2 = _.round(amount, 2)
              record.amount = amount2
            } else {
              record.amount = 0 * record.ppu
            }
            if (_.isNumber(record.order_qty)) {
              let amount = record.order_qty * record.net_price
              let amount2 = _.round(amount, 2)
              record.net_amount = amount2
            } else {
              record.net_amount = 0 * record.net_price
            }
          }
          record.discount = '-'

          if (key < 50) {
            tempDush.push(record)
          }
          if (key == t.promo_seleceted_temp.length - 1) {
            t.$store.commit('myorders/selectedPromo', tempDush)
            t.$store.commit('myorders/selectedPromoTemp', pmt)
            t.$store.commit('myorders/setPercentDiscPM', 0)
            t.$store.dispatch('myorders/sumPromoTable')
          }
        })
        t.$store.commit('myorders/selectedFreegift', [])
        let txt = document.getElementById('show-modeFg')
        if (!_.isNull(txt)) {
          document.getElementById('show-modeFg').innerHTML = ''
        }
      } else {
        let txt = document.getElementById('show-modeFg')
        if (!_.isNull(txt)) {
          document.getElementById('show-modeFg').innerHTML = ''
        }
        //--FREE GIFT-----
        var rsfreeg = _.find(keepCon['promotions'], { type: 'Free item' })
        if (!_.isUndefined(rsfreeg)) {
          // console.log("Free item >>> ");
          let tempDush = []
          let pmt = _.cloneDeep(t.promo_seleceted_temp)
          pmt.forEach(function (record, key) {
            if (_.isNull(record.netp_range) || record.netp_range == 0) {
              record.net_price = parseFloat(record.ppu)
            } else {
              record.net_price = record.netp_range
            }

            if (_.isNumber(record.order_qty)) {
              let amount = record.order_qty * record.ppu
              let amount2 = _.round(amount, 2)
              record.amount = amount2
            } else {
              record.amount = 0 * record.ppu
            }
            if (_.isNumber(record.order_qty)) {
              let amount = record.order_qty * record.net_price
              let amount2 = _.round(amount, 2)
              record.net_amount = amount2
            } else {
              record.net_amount = 0 * record.net_price
            }
            record.discount = '-'
            if (key < 50) {
              tempDush.push(record)
            }
            if (key == t.promo_seleceted_temp.length - 1) {
              t.$store.commit('myorders/selectedPromo', tempDush)
              t.$store.commit('myorders/selectedPromoTemp', pmt)
              t.$store.commit('myorders/setPercentDiscPM', 0)
              t.$store.dispatch('myorders/sumPromoTable')
            }
          })
          let money = 0
          let freeg = 0
          let master = 0
          let modeFg = null
          let modeFgTitle = ''
          let totalCal = 0
          if (_.isNumber(rsfreeg['number_of_item'])) {
            modeFg = 'noOfItem'
            modeFgTitle =
              '( ได้ของแถมจำนวน ' +
              t.formatNumberInt(rsfreeg['number_of_item']) +
              ' ชิ้น )'
          } else if (!_.isUndefined(rsfreeg['ratio'])) {
            // RATIO
            if (
              _.isNumber(rsfreeg['ratio'][0]) &&
              _.isNumber(rsfreeg['ratio'][1])
            ) {
              master = t.getSum('order_qty')
              money = rsfreeg['ratio'][0]
              freeg = rsfreeg['ratio'][1]
              let cal = Math.floor(master / money)
              totalCal = parseInt(cal * freeg)
              modeFg = 'ratio'
              modeFgTitle =
                '( ได้ของแถมในอัตราส่วน ' +
                t.formatNumberInt(money) +
                ' : ' +
                t.formatNumberInt(freeg) +
                ' ชิ้น รวมได้จำนวน ' +
                t.formatNumberInt(totalCal) +
                ' ชิ้น)'
            } else {
              // QTY
              modeFg = 'qty'
            }
          }

          if (!_.isNull(txt)) {
            document.getElementById('show-modeFg').innerHTML = modeFgTitle
          }

          var sunFG = _.filter(t.freegSeleceted, item => {
            if (_.isNumber(item.order_qty)) {
              return true
            }
          })
          let totalSUm = sunFG.reduce(
            (acc, row) => acc + parseFloat(row['order_qty']),
            0
          )
          rsfreeg['value'].forEach(function (rowPro, key) {
            //CHECK RATIO
            if (
              !_.isUndefined(rsfreeg.freeitem_flag) &&
              rsfreeg.freeitem_flag
            ) {
              rowPro.error_stock = false
            } else {
              rowPro.error_stock = true
            }
            if (modeFg == 'qty') {
              rowPro.order_qty = rowPro.qty
            } else if (
              modeFg != 'qty' &&
              !_.isNull(modeFg) &&
              totalCal < totalSUm
            ) {
              if (key == 0) {
                rowPro.order_qty = totalCal
              } else {
                rowPro.order_qty = 0
              }
            } else if (
              modeFg != 'qty' &&
              !_.isNull(modeFg) &&
              totalCal >= totalSUm
            ) {
              if (key == 0 && rsfreeg['value'].length == 1) {
                rowPro.order_qty = totalCal
              } else {
                if (t.modeFromEdotPromo == 'no-noti') {
                  // rowPro.order_qty = 0;
                } else {
                  rowPro.order_qty = 0
                }
              }
            } else if (_.isNull(modeFg)) {
              rowPro.order_qty = rowPro.qty
            } else {
            }
            if (pmt.length > 0) {
              rowPro.promo_name = pmt[0].promo_title
            } else {
              rowPro.promo_name = ''
            }
            rowPro.price = rowPro.ppu
          })
          t.$store.commit('myorders/selectedFreegift', rsfreeg['value'])
          t.$store.dispatch('myorders/sumPromoTable')
        } else {
          t.$store.commit('myorders/selectedFreegift', [])
          t.$store.dispatch('myorders/sumPromoTable')
        }
        //--DISCOUNT-----
        var discount = _.find(keepCon['promotions'], { type: 'Discount' })
        if (typeof discount != 'undefined') {
          // console.log("DISCOUNT");
          t.$store.commit('myorders/setPercentDiscPM', discount.value)
          let tempDush = []

          t.$store.commit('myorders/selectedPromo', tempDush)
          let pmt = _.cloneDeep(t.promo_seleceted_temp)
          pmt.forEach(function (records, key) {
            let record = _.cloneDeep(records)
            if (_.isNull(record.netp_range) || record.netp_range == 0) {
              records.price = record.ppu
              records.net_price = parseFloat(record.ppu)
            } else {
              records.net_price = record.netp_range
            }
            if (record.order_qty > 0) {
              records.discount = discount.value
              let percent = parseFloat(discount.value) / 100
              let amountA2 = _.round(record.amount, 2)

              let dis = amountA2 * percent
              let np = parseFloat(records.net_price) * percent
              let pr = parseFloat(records.net_price) - np

              let pr2 = _.round(pr, 2)
              records.price = pr2
              records.net_price = pr2
              let amount = parseFloat(record.ppu) * parseInt(record.order_qty)

              let aall = pr2 * parseInt(record.order_qty)
              let a2 = _.round(aall, 2)

              records.net_amount = a2
              let amount2 = _.round(amount, 2)
              records.amount = amount2
            } else {
              records.discount = '-'
            }

            if (key < 50) {
              tempDush.push(records)
            }
            if (key == t.promo_seleceted_temp.length - 1) {
              t.$store.commit('myorders/selectedPromo', tempDush)
              t.$store.commit('myorders/selectedPromoTemp', pmt)
              t.$store.dispatch('myorders/sumPromoTable')
            }
          })
        } else {
          t.$store.commit('myorders/setPercentDiscPM', 0)
          let pmt = _.cloneDeep(t.promo_seleceted_temp)
          pmt.forEach(function (record, key) {
            record.discount = '-'
            // ดูตรงนี้ ต้องปิด ถ้าปิดแล้วลองเช็คเคสใหม่ด้วย
            record.price = record.netprice_old
            if (key == t.promo_seleceted_temp.length - 1) {
              t.$store.commit('myorders/selectedPromoTemp', pmt)
              t.$store.dispatch('myorders/sumPromoTable')
            }
          })
        }
        //--NET PRICE-----
        var netprice = _.find(keepCon['promotions'], { type: 'Net Price' })
        if (typeof netprice != 'undefined') {
          // console.log("NET PRICE");
          let tempDush = []
          let pmt = _.cloneDeep(t.promo_seleceted_temp)
          pmt.forEach(function (record, key) {
            if (typeof netprice.value != 'undefined') {
              record.net_price = netprice.value
            } else {
              if (_.isNull(record.netp_range) || record.netp_range == 0) {
                record.net_price = parseFloat(record.netprice)
              } else {
                record.net_price = record.netp_range
              }
            }
            record.price = parseFloat(netprice.value)
            let discount = record.discount == '-' ? 0 : record.discount
            let qty = parseFloat(record.order_qty)
            if (qty > 0) {
              let amount = record.price * qty
              let amount2 = _.round(amount, 2)
              record.amount = amount2
              let dis = amount2 * parseFloat(discount)
              let total = dis / 100
              record.net_amount = amount2 - total
              // console.log("4 ==> ");
            }
            if (key < 50) {
              tempDush.push(record)
            }
            if (key == t.promo_seleceted_temp.length - 1) {
              t.$store.commit('myorders/selectedPromo', tempDush)
              t.$store.commit('myorders/selectedPromoTemp', pmt)
              t.$store.dispatch('myorders/sumPromoTable')
            }
          })
        } else {
          // ดูตรงนี้ ต้องปิด ถ้าปิดแล้วลองเช็คเคสใหม่ด้วย
          let pmt = _.cloneDeep(t.promo_seleceted_temp)
          pmt.forEach(function (record, key) {
            record.price = record.netprice_old
            if (key == t.promo_seleceted_temp.length - 1) {
              t.$store.commit('myorders/selectedPromoTemp', pmt)
              t.$store.dispatch('myorders/sumPromoTable')
            }
          })
        }
      }
      t.$store.commit('myorders/SET_CHECKBTN_ADD', true)
    },
    getSum (key) {
      if (key == 'Count Item') {
        var pro = _.filter(this.promo_seleceted_temp, item => {
          if (_.isNumber(item.order_qty) && item.order_qty > 0) {
            return true
          }
        })
        return pro.length
      } else if (key == 'amount') {
        var pro = _.filter(this.promo_seleceted_temp, item => {
          if (_.isNumber(item.order_qty) && item.order_qty > 0) {
            return true
          }
        })
        let data = []
        _.forEach(pro, function (row) {
          let total = parseFloat(row.netprice_old) * parseFloat(row.order_qty)
          data.push(total)
        })
        let rs = data.reduce((acc, row) => acc + parseFloat(row), 0)
        return rs
      } else {
        var pro = _.filter(this.promo_seleceted_temp, item => {
          if (_.isNumber(item.order_qty)) {
            return true
          }
        })
        return pro.reduce((acc, row) => acc + parseFloat(row[key]), 0)
      }
    },
    getPPU (defaultPrice) {
      // console.log('getPPU Func ===>')
      this.$store.commit('myorders/setSpinnerPromo', true)
      let dataPromo = this.$store.getters['myorders/promo_seleceted_temp']
      orService
        .getPPU(defaultPrice, this.promo_seleceted_temp)
        .then(responsePPU => {
          let temp = _.cloneDeep(dataPromo)
          let tppu = this
          _.forEach(responsePPU, function (rowPPU) {
            let ind = _.findIndex(temp, {
              item_code: rowPPU.pro_code
            })
            if (ind >= 0) {
              dataPromo[ind].net_price =
                dataPromo[ind].net_price == 0 ? temp[ind].ppu : rowPPU.ppu
              dataPromo[ind].price =
                dataPromo[ind].net_price == 0 ? temp[ind].ppu : rowPPU.ppu
              dataPromo[ind].pricetype = tppu.keepSets.default_price
            }
          })
          // console.log("4 =>");
          this.$store.commit('myorders/setSpinnerPromo', false)
        })
        .catch()
    },
    getPromotionSet (mode) {
      let keyword = mode == 'dp' ? '' : this.keyword
      var product_group = ''
      var product_cg = ''

      if (
        _.trim(this.product_group) == 'Please select condition search' ||
        _.trim(this.product_group) == 'All Product Group'
      ) {
        product_group = ''
      } else {
        let rs = this.product_group.split(' ')
        product_group = rs[0].trim()
      }
      if (
        _.trim(this.product_cg) == 'Please select condition search' ||
        _.trim(this.product_cg) == 'All Product CG'
      ) {
        product_cg = ''
      } else {
        let rs = this.product_cg.split(' ')
        product_cg = rs[0].trim()
      }

      this.$store.dispatch('myorders/getPromotionSet', {
        group: product_group,
        cg: product_cg,
        keyword: _.trim(keyword),
        mode: mode
      })
    },
    selectPromo (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (charCode == 13 || evt.type=== "click") {
        this.getPromotionSet('search')
      }
    },
    scrollPromo (val) {
      let dataPromo = this.promosetList
      let t = this
      setTimeout(() => {
        t.getPromotionSet('scroll')
      }, 300)
    },
    addProduct () {
      this.$refs['md-confirm-del-dialog'].close()
      /* if (this.keepEvent != "") {
        this.$emit(this.keepEvent);
        this.keepEvent = "";
       }*/
    },
    removeProducts () {
      let t = this
      let dataRs =
        this.checkDupItemInOrderTxt == 'freegift'
          ? this.freegSeleceted
          : this.promo_seleceted_temp
      var filt = _.filter(dataRs, item => {
        if (item.order_qty > 0 && item.order_qty != '') {
          return true
        }
      })
      let data = _.cloneDeep(this.items)
      let keepDataDel = []
      this.dupProduct.forEach(function (value, key) {
        _.remove(data, function (val) {
          if (t.checkDupItemInOrderTxt == 'freegift') {
            if (
              val.item_code == value.item_code &&
              parseFloat(val.price) == 0
            ) {
              if (_.isUndefined(val.ref_po_no) || val.ref_po_no.length < 2) {
                keepDataDel.push(val)
              }
              return true
            }
          } else {
            if (val.item_code == value.item_code && parseFloat(val.price) > 0) {
              if (_.isUndefined(val.ref_po_no) || val.ref_po_no.length < 2) {
                keepDataDel.push(val)
              }
              return true
            }
          }
        })
      })
      this.$store.commit('myorders/setItems', data)
      this.$store.dispatch('myorders/removeItemsFromPromo', keepDataDel)

      this.$refs['md-confirm-del-dialog'].close()
    },
    openCF () {
      let rs = this.checkDupItemInOrder(this.freegSeleceted, 'freegift')
      if (
        rs.indexItemFil.length == 0 &&
        rs.tempPromo.length > 0 &&
        rs.tempFreegift.length == 0
      ) {
        this.dupPromotion = rs.tempPromo
        this.dupProduct = []
        this.$refs['md-confirm-del-dialog'].open()
      } else if (
        rs.indexItemFil.length == 0 &&
        rs.tempPromo.length > 0 &&
        rs.tempFreegift.length > 0
      ) {
        this.dupPromotion = rs.tempPromo
        this.dupProduct = []
        this.$refs['md-confirm-del-dialog'].open()
      } else if (
        rs.indexItemFil.length > 0 &&
        rs.tempPromo.length == 0 &&
        rs.tempFreegift.length == 0
      ) {
        if (
          rs.indexItemFil.length == 1 &&
          parseFloat(rs.indexItemFil[0].price) == 0
        ) {
          this.dupProduct = rs.indexItemFil
          this.dupPromotion = []
          this.$refs['md-confirm-del-dialog'].open()
        } else if (rs.indexItemFil.length > 1) {
          this.dupProduct = rs.indexItemFil
          this.dupPromotion = []
          this.$refs['md-confirm-del-dialog'].open()
        } else {
          // console.log("else ===>");
        }
      } else {
        this.runProcess = false
        this.dg_subtitle = []
        if (this.promo_seleceted_temp.length > 0 && !this.spinner_promo) {
          let promo_seleceted_temp = this.promo_seleceted_temp.filter(
            todo => todo.order_qty > 0
          )
          if (this.totalPromo.orderQty > 0 && this.keepSets != 'NOSETS') {
            this.dg_mode = true
            this.dg_rigthbtn = 'ADD'
            this.dg_title = 'Do you want to add to your order list?'
            this.$refs['md-confirm-promo-dialog'].open()
          } else {
            this.dg_mode = false
            this.dg_rigthbtn = 'OK'
            this.dg_title = 'This promotion did not complete, please check'
            this.$refs['md-confirm-promo-dialog'].open()
          }
        }
      }
    },
    add () {
      this.runProcess = true
      if (this.dg_mode == true) {
        this.$emit('add')
      }
      this.runProcess = false
      this.$refs['md-confirm-promo-dialog'].close()
    },
    addclose () {
      this.runProcess = true
      this.$emit('addclose')
      this.$refs['md-confirm-promo-dialog'].close()
      this.runProcess = false
    },
    close () {
      this.$refs['md-confirm-promo-dialog'].close()
    },
    cancel () {
      this.$emit('close')
      this.$store.commit('myorders/selectedPromo', [])
      this.$refs['md-confirm-promo-dialog'].close()
      this.runProcess = false
    },
    selectPromotion (value, key) {
      console.log('selectPromotion => ', value)
      if (!this.spinner_promo) {
        this.$store.commit('myorders/setSpinnerPromo', true)
        this.$store.commit('myorders/setPercentDiscPM', 0)
        this.AllPromotion = value
        this.$store.dispatch('myorders/getProductsById', value)
      }
    },
    formatNumberInt (value) {
      // return value;
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    formatNumber (value) {
      // return value;
      return this.$store.getters['globalfunc/formatNumber'](value)
    },
    selectProdGroup (value, key) {
      let prod_group = ''
      if (_.trim(value) != 'All Product Group') {
        let rs = this.product_group.split(' ')
        prod_group = rs[0].trim()
      } else {
        prod_group = 'all'
      }
      this.$store.dispatch('myorders/filterProdCG', {
        prod_group: prod_group
      })
    }
  },
  components: {
    'md-search-box': require('./md-search-box'),
    'md-search-box-pomo': require('./md-search-box-pomo'),
    'md-dropdown-box': require('./md-dropdown-box'),
    'md-promotion-box': require('../../Salesops/customComponent/md-promotion-box'),
    'mds-input': require('./orderqty-input')
  }
}
</script>
<style lang="scss" scoped>
$font-roboto: Roboto;
.md-promotion-table {
  .head-table {
    display: flex;
    padding-bottom: 12px;
    width: 100%;
    // color: #5a5a5a;
    color: rgba(0, 0, 0, 0.87);
    // opacity: 0.9;
    // color: #414141;
    // opacity: 0.62;
    font-size: 12px;
    // margin-right: 1%;
  }
  .detail-scroll-table {
    height: calc(100vh - 300px);
    overflow: auto;
    width: 100%;
    .title-promo {
      color: rgba(0, 0, 0, 0.87);
      // opacity: 0.9;
      // color: #5a5a5a;
      font-size: 13px;
      font-family: kanit;
      font-weight: bold;
    }
    .detail-table {
      width: 100%;
      margin-right: 1%;
      display: flex;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.87);
      // opacity: 0.9;
      // color: #5a5a5a;
      .ipt-table {
        padding-left: 15px;
        .md-input-container {
          margin: unset;
          padding: unset;
          height: 30px;
          min-height: 30px;
        }
        .md-input-container:after {
          background-color: #fd7f00;
        }
      }
    }
    &::-webkit-scrollbar {
      height: 5px;
      width: 6px;
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background: #a8a8a8;
      border-radius: 3px;
    }
  }
}
.md-promotion-total {
  width: 100%;
  height: 46px;
  background: #f8f8f8;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-family: $font-roboto;
  .footer-table {
    display: flex;
    padding-top: 12px;
    color: #414141;
    font-size: 12px;
  }
}
.md-raised {
  color: white !important;
  border-radius: 3px;
  &.btn-gray {
    box-shadow: unset;
    background: #a8a8a8 !important;
  }
  &.btn-orange {
    box-shadow: unset;
    background: #fd7f00 !important;
  }
}
.md-promotion-title {
  color: #727272;
  font-size: 16px;
  font-family: roboto;
}
</style>
