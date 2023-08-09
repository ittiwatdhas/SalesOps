<template>
  <div id="pageBackOrderManagement">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-layout md-align="center" class="pt-20">
        <!--BOX 3-->
        <md-layout md-flex="100" md-align="center">
          <md-spinner
            :md-size="150"
            :md-stroke="1"
            v-show="spinner"
            md-indeterminate
          ></md-spinner>
          <md-card
            class="sales-area-table"
            style="width:95%;padding-bottom:20px"
          >
            <md-layout md-flex="100" style="flex:unset">
              <md-layout
                md-flex="40"
                style="padding-left:10px;color:#414141;font-family:lato;font-size:18px;opacity: 0.54;"
                >BACK ORDER MANAGEMENT ({{
                  formatNumberInt(dataList.length)
                }})</md-layout
              >
            </md-layout>
            <md-layout md-flex="100" style="flex:unset; padding-top: 20px">
              <div style="width:25%;">
                <md-search-box-back-manage
                  :placeholder="'Search'"
                  :data="[]"
                  @clear="keywordListCLR"
                  :value="keywordList"
                  @filter="keywordListFil"
                ></md-search-box-back-manage>
              </div>
              <div style="padding-left:15px;width:30%">
                <md-dropdown-box
                  :placeholder="'Current Round'"
                  :data="dropdown"
                  @choose="selectDP"
                ></md-dropdown-box>
              </div>
              <div style="width:45%;text-align: end;padding-right:30px">
                <md-button
                  :disabled="btnNewRound && selectedRound == '' ? false : true"
                  style="height:36px;margin:0px 0px 5px 0px;border-radius:3px;font-size:12px;"
                  :class="
                    btnNewRound && selectedRound == '' ? '-orange' : '-gray-A8'
                  "
                  @click="btnProcess('generate')"
                  >Generate Round</md-button
                >
                <md-button
                  :disabled="btnNewRound && selectedRound == '' ? true : false"
                  style="height:36px;margin:0px 0px 5px 0px;border-radius:3px;font-size:12px;"
                  :class="
                    btnNewRound && selectedRound == '' ? '-gray-A8' : '-orange '
                  "
                  @click="syncstock"
                  >SYNC STOCK</md-button
                >
                <md-button
                  style="height:36px;margin:0px 0px 5px 0px;border-radius:3px;font-size:12px"
                  :class="'-orange '"
                  @click="viewK1Dialog"
                  >View K1</md-button
                >

                <md-button
                id="back_manage_export"
                  style="height:36px;margin:0 0 0 8px;border-radius:3px;font-size:12px;min-width: fit-content;"
                  :class="'-orange'"
                  @click="showMdsCard()"
                  >EXPORT</md-button
                >
                <!-- <md-button
                    :style="{ color: '#fd7f00' }"
                    @click="exportCSV"
                    class="md-icon-button"
                    style="margin:0px"
                  >
                    <md-icon>print</md-icon>
                  </md-button> -->
              </div>
            </md-layout>
            <div :class="'head-table'" style="color: rgba(0, 0, 0, 0.54);">
              <div class="text-left" style="width: 5%;">No.</div>
              <div class="text-left" style="width: 27%">Items</div>
              <div style="width:8%;text-align:right">DRPR</div>
              <!-- <div style="width:8%;text-align:right">DNMT</div> -->
              <div style="width:8%;text-align:right">DNSS</div>
              <div style="width:8%;text-align:right">DNPC</div>
              <div style="width:8%;text-align:right">QTY</div>
              <div style="width:8%;text-align:right">Send</div>
              <div style="width:8%;text-align:right">Recommend</div>
              <div style="width:10%;text-align:right">SKU</div>
              <div style="width:10%;text-align:center">Status</div>
            </div>
            <div
              v-if="dataList.length == 0"
              style="margin-top:10%;font-size:15px;color: #a8a8a8;"
            >
              CLICK ON NEW ROUND TO MANAGE BACK ORDER
            </div>
            <div
              class="detail-blog"
              @scroll="handleScroll"
              :style="{
                height: 'calc(100vh - 280px)',
                'padding-left': '0px',
                'margin-right': '0px'
              }"
            >
              <div
                v-for="(items, index) in dataList"
                :key="items.no"
                class="content-table"
                style="font-family:roboto;padding-top:7px;cursor:pointer"
                @click="openDatail(items)"
              >
                <div class="number" style="width: 5%">{{ index + 1 }}</div>
                <div
                  class="descript"
                  style="width: 27%;font-family:kanit;white-space: nowrap;text-overflow: ellipsis;padding-right:5px"
                >
                  {{ items.item_code }}&nbsp;{{ items.item_name }}
                  <md-tooltip md-direction="top">
                    <span style="font-family:kanit"
                      >{{ items.item_code }}&nbsp;{{ items.item_name }}</span
                    >
                  </md-tooltip>
                </div>
                <div class="number" style="width: 8%;text-align:right">
                  {{ formatNumberInt(items.drpr) }}
                </div>
                <!-- <div
                  class="number"
                  style="width: 8%;text-align:right"
                >{{formatNumberInt(items.dnmt)}}</div>-->
                <div class="number" style="width: 8%;text-align:right">
                  {{ formatNumberInt(items.dnss) }}
                </div>
                <div class="number" style="width: 8%;text-align:right">
                  {{ formatNumberInt(items.dnpc) }}
                </div>
                <div class="number" style="width: 8%;text-align:right">
                  {{ formatNumberInt(items.qty) }}
                </div>
                <div class="number" style="width: 8%;text-align:right">
                  {{ formatNumberInt(items.send) }}
                </div>
                <div class="number" style="width: 8%;text-align:right">
                  {{ formatNumberInt(items.recommended) }}
                </div>
                <div
                  class="number"
                  style="width: 10%;text-align:right;font-family:kanit"
                >
                  {{ items.sku }}
                </div>
                <div
                  :style="{
                    width: '10%',
                    'text-align': 'center',
                    'font-size': '13px',
                    color: items.status == 'Adjusted' ? '#fd7f00' : '#414141'
                  }"
                >
                  {{ items.status }}
                </div>
              </div>
            </div>
          </md-card>
        </md-layout>
      </md-layout>
    </div>
    <div
      v-show="showCard"
      @mouseleave="mouseLeave"
      class="mds-card"
      id="mds-card-export-myback"
      :style="{
        top: '130px',
        right: '2%',
        width: '600px',
        left: '30%',
        top: '35%'
      }"
    >
      <div class="title">
        <div style="width:95%" class="left">
          {{ 'Export to email' }}
        </div>
        <div style="width:5%;cursor:pointer" @click="closeMdsCard()">
          <md-icon>close</md-icon>
        </div>
      </div>
      <div class="body">
        <div style="padding-left: 8%;padding-right: 9%;">
          <md-input-container>
            <md-textarea v-model="emailInput"></md-textarea>
          </md-input-container>
          <div v-if="incorrectEmail.length > 0" class="email-error">
            email format is incorrect
          </div>
        </div>
      </div>
      <div class="footer">
        <md-button
          style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
          @click="closeMdsCard()"
          >CANCEL</md-button
        >
        <md-button
          style="height:36px;margin:0 0 0 15px;border-radius:3px;font-size:12px;"
          @click="exportData('google')"
          >SEND</md-button
        >
      </div>
    </div>
    <md-dialog
      ref="pageBackOrderDG"
      id="pageBackOrderDG"
      class="md-orders-view"
    >
      <div
        style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%"
      >
        <md-spinner
          :md-size="150"
          :md-stroke="1"
          v-show="spinnerDG"
          md-indeterminate
        ></md-spinner>
      </div>
      <div class="md-dialog-title">
        <md-layout>
          <md-layout md-flex-large="70">
            <label class="sub-title kanitFont">{{ title }}</label>
          </md-layout>
          <md-layout md-flex-large="30" md-align="end">
            <md-icon
              @click.native="closeDG"
              style="cursor:pointer;margin-right:30px"
              >close</md-icon
            >
          </md-layout>
        </md-layout>
      </div>
      <div class="md-dialog-content" v-if="modeView == 'byrow'">
        <md-layout md-flex="100" md-align="end" style="margin-top:15px">
          <div
            style="width: 15%;height:35px;padding: 0px 10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);"
          >
            <md-input-container
              class="md-sel"
              style="margin:0px;padding-top:0px;min-height:100%"
            >
              <md-select @click.native="GoogleAnalytics('adjust_back_order_select_order')" v-model="dpSourcePopup" @selected="selSourcePopup">
                <md-option
                  style="width:160px"
                  :value="row.code"
                  v-for="(row, index) in orderSourceList"
                  :key="'orderSourceList-hix' + index"
                  >{{ row.title }}</md-option
                >
              </md-select>
            </md-input-container>
          </div>
          <div style="width:25%;margin-left:20px">
            <md-search-box
            @click.native="GoogleAnalytics('adjust_back_order_search')"
              :placeholder="'Search'"
              :data="[]"
              @clear="keywordAdjCLR"
              :value="keywordAdj"
              @filter="keywordAdjFil"
            ></md-search-box>
          </div>
        </md-layout>
        <md-layout md-flex="100" style="margin-top:20px">
          <md-card
            style="padding:10px 10px 10px 20px; height:60px ;
            background:#F8F8F8;width:100%;display: -webkit-box;"
          >
            <div style="font-size:16px;width:40%">
              <span style="font-family:kanit">{{ detail.item_code }}</span> :
              <span style="font-family:kanit">{{ detail.item_name }}</span>
            </div>
            <div
              style="width:10%;text-align:right;color:#5A5A5A;font-size:13px;font-family:roboto"
            >
              <div>
                <b>{{ formatNumberInt(detail.sum.total_po) }}</b>
              </div>
              <div>Total PO</div>
            </div>
            <div
              style="width:10%;text-align:right;color:#5A5A5A;font-size:13px;font-family:roboto"
            >
              <div>
                <b>{{ formatNumberInt(detail.sum.total_stock) }}</b>
              </div>
              <div>Total Stock</div>
            </div>
            <div
              style="width:10%;text-align:right;color:#5A5A5A;font-size:13px;font-family:roboto"
            >
              <div>
                <b>{{ formatNumberInt(detail.sum.on_queue) }}</b>
              </div>
              <div>On Queue</div>
            </div>
            <div
              style="width:10%;text-align:right;color:#5A5A5A;font-size:13px;font-family:roboto"
            >
              <div>
                <b>{{ formatNumberInt(detail.sum.balance) }}</b>
              </div>
              <div>Balance</div>
            </div>
            <div style="width:20%;text-align:right">
              <md-button
                :disabled="activeBtn && selectedRound == '' ? false : true"
                :style="{
                  color:
                    activeBtn && selectedRound == '' ? '#fd7f00' : '#898989'
                }"
                @click="btnProcess('del')"
                class="md-icon-button"
                style="margin:0px"
                id="adjust_back_order_click_delete_icon "
              >
                <md-icon id="adjust_back_order_click_delete_icon">delete_sweep</md-icon>
              </md-button>
              <md-button
                :style="{
                  color: detail.customer.length == 0 ? '#898989' : '#fd7f00'
                }"
                @click="btnProcess('export')"
                class="md-icon-button"
                style="margin:0px"
              >
                <md-icon>print</md-icon>
              </md-button>
              <md-button
                :style="{
                  color:
                    activeBtn && selectedRound == '' ? '#fd7f00' : '#898989'
                }"
                :disabled="activeBtn && selectedRound == '' ? false : true"
                @click="btnProcess('save', detail.status)"
                class="md-icon-button"
                style="margin:0px"
              >
                <md-icon>done</md-icon>
              </md-button>
            </div>
          </md-card>
        </md-layout>
        <md-layout
          md-flex="100"
          style="margin-top:25px;padding-left:10px"
          class="md-promotion-table"
        >
          <div
            class="head-table"
            style="color: rgba(0, 0, 0, 0.54);font-weight:600;margin-right:0px"
          >
            <!-- <div style="width:4%;" class="md-search-checkbox"></div> -->
            <div class="text-left" style="width: 4%;">
              <input
                type="checkbox"
                v-model="CHKAll"
                style="height: 20px;width: 20px;"
                @change="checkedAll()"
              
              />
            </div>
            <div style="width: 4%;text-align:left">No.</div>
            <div style="width: 29%">Customer</div>
            <div style="text-align:center;width: 9%;">SM</div>
            <div style="text-align:center;width: 9%;">PO No.</div>
            <div style="text-align:right;width: 9%;">PO. Date</div>
            <div style="text-align:right;width: 9%;">Price</div>
            <div style="text-align:right;width:9%;">QTY</div>
            <div style="text-align:right;width:6%;"></div>
            <div style="text-align:right;width:10%;">Adjust</div>
          </div>
          <!--PROMOTION ITEMS  height: calc(100vh - 464px);-->
          <div
            v-if="detail.customer.length == 0"
            style="color:rgba(0, 0, 0, .38);text-align:center;width:100%;padding-top:10%;font-size:15px"
          >
            No data ...
          </div>
          <div
            class="detail-scroll-table"
            :style="{ height: 'calc(100vh - 290px)' }"
          >
            <div
              class="detail-table"
              :style="{ 'margin-top': index == 0 ? '5px' : '3px' }"
              v-for="(row, index) in detail.customer"
              :key="'tbitems' + index"
            >
              <div style="width:4%;" class="md-search-checkbox">
                <input
                  type="checkbox"
                  v-model="row.checked"
                  style="height: 20px;width: 20px;"
                  @change="countCHK($event, index)"
                />
              </div>
              <div
                style="padding-top:8px;width: 4%;☺opacity: 0.62;padding-left :5px;font-weight:600"
              >
                {{ index + 1 }}
              </div>
              <div style="padding-top:8px;width: 29%;">
                {{ row.customer_code }}
                <label style="font-family:kanit;"
                  >&nbsp;&nbsp;{{ row.customer_name }}</label
                >
              </div>
              <div style="padding-top:8px;text-align:center;width: 9%;">
                {{ row.sm }}
              </div>
              <div style="padding-top:8px;text-align:center;width: 9%;">
                {{ row.po_no }}
              </div>
              <div style="padding-top:8px;text-align:right;width: 9%;">
                {{ formatDate(row.po_date) }}
              </div>
              <div style="padding-top:8px;text-align:right;width: 9%;">
                ฿ {{ formatNumber(row.price) }}
              </div>
              <div style="padding-top:8px;text-align:right;width:9%;">
                {{ row.qty }}
              </div>
              <div
                style="padding-top:8px;width:6%;padding-left:8px"
                class="unit"
              >
                {{ row.units }}
              </div>
              <div style="text-align:right;width:10%;padding-left:20px">
                <template>
                  <mds-input
                   :id="'adjust_back_order_adjust'"
                    :ref="`item_${row.no}`"
                    v-model="row.adjust"
                    :table="''"
                    :index="index"
                    :indexDetail="index"
                    type="detail"
                    :readOnly="selectedRound == '' ? false : true"
                  ></mds-input>
                </template>
              </div>
            </div>
          </div>
        </md-layout>
      </div>
      <div
        class="md-dialog-content"
        v-else
        style="padding-top:20px;overflow: hidden;padding-right:10px;"
      >
        <div style="display: -webkit-box;width:100%;margin-bottom:20px">
          <div
            style="width:50%;color:#414141;font-size:18px;font-family:roboto;padding-left:20px"
          ></div>
          <div style="width:40%;text-align: -webkit-right;padding-right:20px">
            <md-search-box
            @click.native="GoogleAnalytics('adjust_back_order_search_view_K1')"
              :placeholder="'Search item by name and code'"
              @clear="keywordCLR"
              :value="keywordBO"
              @filter="keywordFil"
              style="width:100%"
            ></md-search-box>
          </div>
          <div style="width:10%">
            <!-- <md-button
              :style="{'color' :'#fd7f00'}"
              @click="btnProcess('export')"
              class="md-icon-button"
              style="margin:0px"
            >
              <md-icon>print</md-icon>
            </md-button>-->
          </div>
        </div>
        <div
          class="head-table"
          style="width:100%;color: rgba(0, 0, 0, 0.54);font-weight:600;display: -webkit-box;"
        >
          <!-- <div style="width: 5%;"></div> -->
          <div style="width: 3%;">No.</div>
          <div style="width: 9%;">Order No.</div>
          <div style="width: 9%">PO No.</div>
          <div style="width: 7%;text-align:center;">PO. Date</div>
          <div style="width: 12%;text-align:center;">Send Date</div>
          <div style="width: 8%;text-align:center;">SM</div>
          <div style="width: 21%">Customer</div>
          <div style="width: 10%;text-align:right;padding-right:5px">Price</div>
          <div style="width: 7%;text-align:right;">Order QTY</div>
          <div style="width: 4%"></div>
          <div style="width: 10%;text-align:right;padding-right:15px">
            Total
          </div>
        </div>
        <div
          v-if="detail.length == 0"
          style="margin-top:20px;font-size:15px;color: #a8a8a8;text-align:center"
        >
          No data...
        </div>
        <div class="manage-scroll">
          <div
            v-for="(record, indexs) in k1DialogData"
            :key="'tbitems' + indexs"
            style="margin-top:15px;"
          >
            <div
              style="font-size:16px;width:100%;background:#F8F8F8;padding:7px 0px 6px 60px;border-radius: 4px;font-family:kanit"
            >
              <b
                >{{ record.item_code }}&nbsp;&nbsp;{{
                  record.item_name
                }}&nbsp;&nbsp;</b
              >
            </div>
            <md-layout
              md-flex="100"
              style="margin-top:10px;margin-bottom:30px;"
              class="md-promotion-table"
            >
              <div class="detail-scroll-table" style="overflow:hidden">
                <div
                  class="detail-table"
                  style="width:100%"
                  v-for="(row, index) in record.customer"
                  :key="'tbitems' + index"
                >
                  <!-- <div style="width:5%;">
                    <input
                      type="checkbox"
                      :disabled="disabledChk('sm_code',row)"
                      v-model="row.checked"
                      @change="checkedAllDG('manage' , indexs , index)"
                      :style="{'opacity':disabledChk('sm_code',row)?'0.6':'unset','height': '20px','width':'20px'}"
                    />
                  </div>-->
                  <div style="padding-top:8px;width:3%;">{{ row.no }}</div>
                  <div style="padding-top:8px;width: 9%;">
                    {{ row.order_no }}
                  </div>
                  <div style="padding-top:8px;width: 9%;">{{ row.po_no }}</div>
                  <div style="padding-top:8px;text-align:center;width: 7%;">
                    {{ formatDate(row.po_date) }}
                  </div>
                  <div style="padding-top:8px;text-align:center;width: 12%;">
                    {{ row.sys_create_date }}
                  </div>
                  <div style="padding-top:8px;text-align:center;width: 8%;">
                    {{ row.sm_code }}
                  </div>
                  <div style="padding-top:8px;width: 21%;">
                    {{ row.customer_code }}
                    <label style="font-family:kanit;"
                      >&nbsp;&nbsp;{{ row.customer_name }}</label
                    >
                  </div>
                  <div style="padding-top:8px;text-align:right;width: 10%;">
                    ฿ {{ formatNumber(row.price) }}
                  </div>
                  <div style="padding-top:8px;text-align:right;width:7%;">
                    {{ formatNumberInt(row.qty) }}
                  </div>
                  <div
                    style="padding-top:8px;width:4%;padding-left:8px"
                    class="unit"
                  >
                    {{ row.unit }}
                  </div>
                  <div
                    style="padding-top:8px;text-align:right;width:10%;padding-left:20px"
                  >
                    {{ formatNumber(row.total) }}
                  </div>
                </div>
              </div>
            </md-layout>
          </div>
        </div>
      </div>
    </md-dialog>
    <md-dialog ref="md-confirm-dialog">
      <md-dialog-title>{{ titleCF }}</md-dialog-title>
      <md-dialog-content></md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeCF">{{ leftBtn }}</md-button>
        <md-button class="md-primary" @click="saveAndClose">{{
          rightBtn
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

  <!-- GOOGLE ANALYTICS  -->
<div id="adjust_back_order"></div>
<div id="adjust_back_order_select_order"></div>
<div id="adjust_back_order_search"></div>'
<div id="adjust_back_order_select_all_cus"></div>
<div id="adjust_back_order_select_cus"></div>
<div id="adjust_back_order_search_view_K1"></div>
  <!-- END -->

  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import service from '@/services/orders/backordmanage'
import bkService from '@/services/orders/mybackorder'
import historyService from '@/services/orders/history'
export default {
  name: 'back-order-management',
  data () {
    return {
      titleCF: '',
      leftBtn: 'CANCEL',
      rightBtn: 'CONFIRM',
      keepRow: [],
      keepType: '',
      keepStatus: '',
      activeBtn: false,
      selectedRound: '',
      modeView: 'byrow',
      keywordBO: '',
      keywordAdj: '',
      title: '',
      k1DialogDataTemp: [],
      k1DialogData: [],
      CHKAll: false,
      keywordList: '',
      dpSourcePopup: 'all',
      orderSourceList: [],
      emailInput: '',
      showCard: false,
      incorrectEmail: []
    }
  },
  computed: {
    dataList () {
      return this.$store.getters['backordmanage/dataList']
    },
    dataListTemp () {
      return this.$store.getters['backordmanage/dataListTemp']
    },
    btnNewRound () {
      return this.$store.getters['backordmanage/btnNewRound']
    },
    spinner () {
      return this.$store.getters['backordmanage/spinner']
    },
    dropdown () {
      return this.$store.getters['backordmanage/dropdown']
    },
    detail () {
      return this.$store.getters['backordmanage/detail']
    },
    detailDataTemp () {
      return this.$store.getters['backordmanage/detailDataTemp']
    },
    spinnerDG () {
      return this.$store.getters['backordmanage/spinnerDG']
    },
    selectedRow () {
      return this.$store.getters['backordmanage/selectedRow']
    },
    bkEmail () {
      return this.$store.getters['backordmanage/bkEmail']
    }
  },
  watch: {
    // keywordBO(val) {
    //   this.filterList(val);
    // }
  },
  methods: {
    mouseLeave: function () {
      // if (this.showCard == true) {
      // this.showCard = false
      // }
    },
    // exportData (val) {
    //   let obj = {
    //     email: val
    //   }
    //   service
    //     .gSheetsBkManage(obj)
    //     .then(response => {})
    //     .catch()
    //   // window.open(Vue.config['url'] + '/sync/download-back-order', '_blank')
    // },
    exportData (mode) {
      if (mode === 'google') {
        let emails = this.emailInput.split(',')
        let checkMail = []
        let checkMailTrue = []
        emails.forEach(element => {
          if (_.trim(element).length > 0) {
            var lastAtPos = element.lastIndexOf('@')
            var lastDotPos = element.lastIndexOf('.')
            if (
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              element.indexOf('@@') == -1 &&
              lastDotPos > 2 &&
              element.length - lastDotPos > 2
            ) {
              checkMailTrue.push(element)
            } else {
              checkMail.push(element)
            }
          }
        })
        this.incorrectEmail = checkMail
        if (checkMail.length === 0) {
          this.closeMdsCard()
          let obj = {
            email: checkMailTrue
          }
          service
            .gSheetsBkManage(obj)
            .then(response => {})
            .catch()
        }
      } else {
        this.$emit('export', mode)
      }
    },
    showMdsCard () {
      this.botton = 'export'
      let email = ''
      if (this.bkEmail.length > 0) {
        email = _.cloneDeep(this.bkEmail)
      }
      this.emailInput = email
      this.showCard = true
    },
    closeMdsCard () {
      this.botton = null
      this.showCard = false
    },
    openDatail (value) {
      this.GoogleAnalytics('adjust_back_order')
      this.title = 'Adjust Back Order'
      this.modeView = 'byrow'
      this.activeBtn = value.status == 'Adjusted' ? true : false
      this.CHKAll = false
      if (this.orderSourceList.length == 0) {
        this.orderSouce(value)
      } else {
        this.$store.dispatch('backordmanage/getAdjustByCode', value)
      }
      this.$refs['pageBackOrderDG'].open()
    },
    orderSouce (val) {
      historyService
        .getOrderSouce()
        .then(response => {
          this.orderSourceList = response
          this.$store.commit('backordmanage/setSelectedRow', val)
          this.$store.commit('backordmanage/setSource', this.dpSourcePopup)
        })
        .catch()
    },
    selSourcePopup () {
      this.$store.commit('backordmanage/setSource', this.dpSourcePopup)
      this.$store.dispatch('backordmanage/getAdjustByCode', this.selectedRow)
    },
    keywordFil (val) {
      this.keywordBO = val
      this.filterList(val)
    },
    keywordCLR () {
      this.keywordBO = ''
      this.filterList('')
    },
    viewK1Dialog () {
      this.$store.commit('backordmanage/setSpinner', true)
      service
        .ViewK1({})
        .then(response => {
          this.k1DialogData = response
          this.k1DialogDataTemp = response
          this.title = 'Manage Back Order View K1'
          this.modeView = null
          this.$refs['pageBackOrderDG'].open()
          this.$store.commit('backordmanage/setSpinner', false)
        })
        .catch()
    },
    filterList (param) {
      let detail = _.cloneDeep(this.k1DialogDataTemp)
      let key = _.trim(param)
      if (key.length > 2) {
        const data = detail.filter(word => {
          const str = word.item_code + word.item_name
          return str.toUpperCase().indexOf(key.toUpperCase()) !== -1
        })
        this.k1DialogData = data
      } else if (key.length == 0) {
        this.k1DialogData = detail
      }
    },
    syncstock () {
      this.$store.dispatch('backordmanage/syncstock')
    },
    countCHK (e, index) {
      this.GoogleAnalytics('adjust_back_order_select_cus')
      let chk = this.detail.customer.filter(todo => todo.checked == true)
      let allAdjust = chk.reduce((acc, row) => acc + parseInt(row.adjust), 0)
      // this.activeBtn = (this.detail.sum.total_stock >= allAdjust && chk.length > 0) ? true : false;
      if (this.detail.status != 'Adjusted') {
   
        this.activeBtn =
          this.detail.sum.total_stock >= allAdjust && chk.length > 0
            ? true
            : false
        // let total_stock = parseInt(this.detail.sum["total_stock"]);
        // let totalAfter = chk.reduce(
        //   (acc, row) => acc + parseInt(row.adjust),
        //   0
        // );
        // if (chk.length == 0) {
        //   this.detail.sum["balance"] = total_stock;
        // } else {
        //   if (this.detail.sum["total_stock"] >= totalAfter) {
        //     this.detail.sum["balance"] = total_stock - totalAfter;
        //   } else {
        //     this.btnProcess("overstock");
        //     this.detail.customer[index].checked = false;
        //   }
        // }
      } else {
      
        this.activeBtn = this.detail.sum.total_stock >= allAdjust ? true : false
      }
      let total_stock = parseInt(this.detail.sum['total_stock'])
      let totalAfter = chk.reduce((acc, row) => acc + parseInt(row.adjust), 0)
      if (chk.length == 0) {
        this.detail.sum['balance'] = total_stock
      } else {
   
        if (this.detail.sum['total_stock'] >= totalAfter) {
          this.detail.sum['balance'] = total_stock - totalAfter
        } else {
          this.detail.sum['balance'] = 0
          this.btnProcess('overstock')
          this.detail.customer[index].checked = true
        }
      }
    },
    saveAndClose () {
      if (this.keepType == 'generate' ) {
         this.$refs['md-confirm-dialog'].close()
        console.log(this.$store.getters['backordmanage/check_confirm'])
        if(this.$store.getters['backordmanage/check_confirm']){
            this.$store.dispatch('backordmanage/generate')
        }
      } else if (this.keepType == 'del') {
        this.closeCF()
        this.$store.dispatch('backordmanage/delAdjust')
      } else if (this.keepType == 'export') {
        // this.$store.dispatch("backordmanage/export");
        this.closeCF()
        this.export_excel()
      } else if (this.keepType == 'save') {
        if (this.keepStatus == 'Adjusted') {
          this.closeCF()
          this.$store.dispatch('backordmanage/saveAdjust')
          this.$refs['pageBackOrderDG'].close()
        } else {
          let chk = this.detail.customer.filter(todo => todo.checked == true)
          let chk0 = chk.filter(todo => todo.adjust == 0)
          if (chk0.length == 0) {
            this.closeCF()
            this.$store.dispatch('backordmanage/saveAdjust')
            this.$refs['pageBackOrderDG'].close()
          } else {
            this.closeCF()
          }
        }
      }
    },
    closeCF () {
      this.$refs['md-confirm-dialog'].close()
    },
    btnProcess (type, status = null) {
      this.keepType = type
      this.keepStatus = status
      let chk = this.detail.customer.filter(todo => todo.checked == true)
      if (type == 'generate') {
        this.titleCF = 'Do you confirm to generate new round?'
        this.rightBtn = 'CONFIRM'
        this.$refs['md-confirm-dialog'].open()
      } else if (type == 'del') {
        if (chk.length > 0) {
          this.titleCF = 'Do you to delete back order?'
          this.rightBtn = 'DELETE'
          this.$refs['md-confirm-dialog'].open()
        }
      } else if (type == 'export') {
        this.titleCF = 'Do you to export back order?'
        this.rightBtn = 'EXPORT'
        this.$refs['md-confirm-dialog'].open()
        this.$refs['md-confirm-dialog'].open()
      } else if (type == 'save') {
        let chk0 = chk.filter(todo => todo.adjust == 0)
        if (status == 'Adjusted') {
          this.titleCF = 'Do you to save order adjusted?'
          this.rightBtn = 'SAVE'
          this.$refs['md-confirm-dialog'].open()
        } else {
          if (chk.length > 0 && chk0.length == 0) {
            this.titleCF = 'Do you to save order adjusted?'
            this.rightBtn = 'SAVE'
            this.$refs['md-confirm-dialog'].open()
          } else if (chk.length > 0 && chk0.length > 0) {
            this.titleCF =
              'This back order did not complete, please check Order Adjust.'
            this.rightBtn = 'OK'
            this.$refs['md-confirm-dialog'].open()
          }
        }
      } else if (type == 'overstock') {
        // this.titleCF = "ไม่สามารถกรอก Adjust ได้มากกว่า QTY";
        this.titleCF =
          'ไม่สามารถกรอก Adjust ได้มากกว่า QTY และยอดรวมต้องไม่เกิน Total Stock'
        this.rightBtn = 'OK'
        this.$refs['md-confirm-dialog'].open()
      }
    },
    closeDG () {
      this.activeBtn = false
      this.$refs['pageBackOrderDG'].close()
    },
    formatDate (value) {
      if (value == '') {
        return ''
      } else {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    formatNumberInt (value) {
      let step4 = _.round(value, 4)
      let step3 = _.round(step4, 3)
      let step2 = _.round(step3, 2)
      return parseFloat(step2).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      // return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber (value) {
      let step4 = _.round(value, 4)
      let step3 = _.round(step4, 3)
      let step2 = _.round(step3, 2)
      return parseFloat(step2).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      // return this.$store.getters["globalfunc/formatNumber"](value);
    },
    selectDP (value) {
      this.selectedRound = value.id
      this.$store.dispatch('backordmanage/getList', value.id)
    },
    handleScroll (event) {},
    export_excel (isXLSX = false) {
      let self = this
      let date = moment(new Date()).format('DDMMYYYYHHMM')
      let head_data = [
        'NO.',
        'Customer',
        'SM',
        'PO No.',
        'PO. Date',
        'Price',
        'QTY',
        '',
        'Adjust'
      ]
      let DataSelect = self.detail.customer.filter(todo => todo.checked == true)
      self.JSONToExportConvertor(
        head_data,
        self.detail,
        'backorder-management_[' + date + ']',
        DataSelect,
        true
      )
    },
    checkedAll () {
      this.GoogleAnalytics('adjust_back_order_select_all_cus')
      // let chk = this.detail.customer.filter(todo => todo.checked == true);
      let t = this
      _.forEach(t.detail.customer, function (row) {
        if (row.adjust > 0) {
          row.checked = t.CHKAll
        } else {
          row.checked = false
        }
        // if (Vue.localStorage.get("emp_id") == row.sm) {

        // }
      })
      let chk = t.detail.customer.filter(todo => todo.checked == true)
      this.activeBtn = chk.length == 0 ? false : true
      let total_stock = parseInt(this.detail.sum['total_stock'])
      let totalAfter = chk.reduce((acc, row) => acc + parseInt(row.adjust), 0)
      if (chk.length == 0) {
        this.detail.sum['balance'] = total_stock
      } else {
        if (this.detail.sum['total_stock'] >= totalAfter) {
          this.detail.sum['balance'] = total_stock - totalAfter
        } else {
          this.detail.sum['balance'] = 0
          this.btnProcess('overstock')
          this.detail.customer[index].checked = true
        }
      }
    },

    keywordAdjCLR () {
      this.keywordAdj = ''
      this.filterListAdj('')
    },
    keywordAdjFil (val) {
      this.keywordAdj = val
      this.filterListAdj(val)
    },
    filterListAdj (param) {
      let detail = _.cloneDeep(this.detailDataTemp)
      let detail_customer = _.cloneDeep(this.detailDataTemp['customer'])
      let key = _.trim(param)
      if (key.length > 2) {
        const data = detail['customer'].filter(row => {
          const str =
            row.po_no +
            row.customer_code +
            row.customer_name +
            row.sm +
            row.sm_name
          return str.toUpperCase().indexOf(key.toUpperCase()) !== -1
        })
        this.$store.commit('backordmanage/setDetailCustomer', data)
      } else if (key.length == 0) {
        this.$store.commit('backordmanage/setDetailCustomer', detail_customer)
      }
    },

    keywordListCLR () {
      this.keywordList = ''
      this.filterDataList('')
    },
    keywordListFil (val) {
      this.keywordList = val
      this.filterDataList(val)
    },

    filterDataList (param) {
      let detail = _.cloneDeep(this.dataListTemp)
      let key = _.trim(param)
      if (key.length > 2) {
        const data = detail.filter(word => {
          const str = word.item_code + word.item_name
          return str.toUpperCase().indexOf(key.toUpperCase()) !== -1
        })
        this.$store.commit('backordmanage/setDataList', data)
      } else if (key.length == 0) {
        this.$store.commit('backordmanage/setDataList', detail)
      }
    },

    JSONToExportConvertor (
      HEADData,
      JSONData,
      ReportTitle,
      DataSelect,
      ShowLabel
    ) {
      var arrData =
        typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
      var emp_id = Vue.localStorage.get('emp_id')
      var full_name =
        Vue.localStorage.get('first_name') +
        ' ' +
        Vue.localStorage.get('last_name')
      var data_export = ''
      data_export =
        'Adjust Back Order ' +
        '\r\n' +
        'Export By : ' +
        ',' +
        emp_id +
        ' ' +
        full_name +
        '\r\n'

      let datail = ''
      datail =
        ',,Total PO,Total Stock,On Queue,Balance' +
        '\r\n' +
        'Customer : ' +
        ',' +
        arrData['item_code'] +
        ' ' +
        arrData['item_name'] +
        ',' +
        arrData['sum']['total_po'] +
        ',' +
        arrData['sum']['total_stock'] +
        ',' +
        arrData['sum']['on_queue'] +
        ',' +
        arrData['sum']['balance'] +
        '\r\n'
      // datail.slice(0, datail.length - 1);
      data_export += datail + '\r\n'

      if (ShowLabel) {
        var row = ''
        for (var h = 0; h < HEADData.length; h++) {
          row += HEADData[h] + ','
        }
        row = row.slice(0, -1)
        data_export += row + '\r\n'
      }
      datail = ''
      let item = []
      if (DataSelect.length > 0) {
        item = DataSelect
      } else {
        item = arrData['customer']
      }
      var no = 1
      for (var l = 0; l < item.length; l++) {
        var customer = item[l]['customer_code'] + ' ' + item[l]['customer_name']
        var sm = item[l]['sm'].toString()
        var po_date = moment(new Date(item[l]['po_date']))
          .format('DD/MM/YYYY')
          .toString()
        var price = item[l]['price'].toString()
        var qty = item[l]['qty'].toString()
        var adjust = item[l]['adjust'].toString()
        datail =
          no +
          ',' +
          customer +
          ',' +
          sm +
          ',' +
          item[l]['po_no'] +
          ',' +
          po_date +
          ',' +
          price +
          ',' +
          qty +
          ',' +
          item[l]['units'] +
          ',' +
          adjust
        datail.slice(0, datail.length - 1)
        data_export += datail + '\r\n'
        no++
      }
      if (item.length == 0) {
        data_export += 'No Data...' + '\r\n'
      }
      var fileName = ReportTitle
      var universalBOM = '\uFEFF'
      var uri =
        'data:text/csv;charset=utf-8,' +
        encodeURIComponent(universalBOM + data_export)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = fileName + '.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    GoogleAnalytics(param){
      document.getElementById(param).click()
      console.log('Google => ',param)
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      this.$store.dispatch('setPathMenuService', 'orders')
      this.$store.dispatch('backordmanage/getList', '')
      this.$store.dispatch('backordmanage/getOrderRound')
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'mds-input': require('./back-order-comonent/orderqty-input'),
    'md-dropdown-box': require('../Salesops/customComponent/md-dropdown-box'),
    'md-search-box': require('./myorder-component/md-search-box'),
    'md-search-box-back-manage': require('./myorder-component/md-search-box-back-manage')
  }
}
</script>
<style lang="scss" scoped>
.md-select {
     width: 95%; 
     min-width: 100px
}
#pageBackOrderManagement {
  
  .pt-2 {
    padding-top: 2px;
  }
  .md-dropdown-box {
    background: #efefef;
  }
  .head-table {
    font-family: roboto;
    // opacity: 0.54;
    margin-top: 25px;
    display: flex;
    padding-bottom: 15px;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 600;
    .md-icon {
      cursor: pointer;
    }
  }
  .sales-area-table {
    width: 1000px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 10px;
    .detail-blog {
      padding: 0px !important;
      .content-table {
        display: flex;
        padding-bottom: 5px;
        padding-top: 7px;
        padding-left: 10px;
        .hover-row:hover {
          color: #fd7f00 !important;
          cursor: pointer;
        }
        .view-more {
          visibility: visible;
        }
        .view-more:hover {
          visibility: visible;
        }
      }
    }
  }
  .mds-card {
    position: absolute;
    background: #ffffff;
    z-index: 2;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    .title {
      font-family: roboto;
      font-size: 20px;
      display: flex;
      padding: 20px 30px;
      font-weight: bold;
    }
    .body {
      .md-input-container {
        overflow-y: auto;
        overflow-x: hidden;
        padding: 3px 10px;
        border: 1px solid #fd7f00;
        border-radius: 4px;
        margin: 0px;
        height: 75px;
        &::-webkit-scrollbar {
          height: 7px;
          width: 5px;
          background: #ffffff;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #a8a8a8;
          border-radius: 5px;
        }
      }
      .md-input-container:after {
        background-color: unset;
      }
      .email-error {
        text-align: left;
        padding-top: 5px;
        color: #f44336;
        font-size: 14px;
      }
      .remark {
        text-align: left;
        padding-bottom: 30px;
        padding-left: 10%;
        padding-right: 10%;
        color: #757575;
      }
    }
    .footer {
      padding-top: 15px;
      padding-bottom: 10px;
      padding-right: 20px;
      justify-content: flex-end;
      display: flex;
      .md-button {
        color: #fd7f00;
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}
</style>
