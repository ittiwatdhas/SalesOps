<template>
  <div id="pageHistory">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-layout
        md-align="start"
        md-flex="100"
        class="md-topic"
        style="padding-top:25px;padding-left:40px"
        >{{ pageName }}</md-layout
      >
      <md-layout md-align="center" class="pt-20">
        <!--BOX 1-->
        <div
          :style="{
            'pointer-events': $store.getters['history/headFilter'] ? 'none' : ''
          }"
          style="display: -webkit-box;width:94%"
        >
          <sales-period-block
            :displayRange="true"
            :orderSource="orderSourceList"
            style="width:100%"
            @selectmonth="selectMonth"
            @selectyear="selectYear"
            :year="$store.getters['history/selected_date'].year"
            :month="$store.getters['history/selected_date'].month"
            :range="$store.getters['history/selected_date'].range"
            :detail="[]"
            @searchHistory="searchHistory"
          ></sales-period-block>
        </div>
        <!--BOX 3-->
        <md-layout md-flex="100" md-align="center" class="" id="box2">
          <!-- <md-layout md-flex="100" md-align="center" style="margin-top:100px"> -->
          <md-card
            style="margin:10px 0 10px 0;width:94%;box-shadow: 0 0 3px rgba(0, 0, 0, 0.16); position: initial; z-index: unset;"
          >
            <md-card-content style="padding:10px 20px;color:#5A5A5A">
              <md-spinner
                :md-size="75"
                :md-stroke="1"
                v-show="$store.getters['history/headFilter']"
                md-indeterminate
              ></md-spinner>
              <div
                style="width:100%;display : flex;padding-bottom:5px"
                v-for="(row, index) in detailBar"
                :key="index + 'detailbar'"
              >
                <div
                  style="width:30%;font-family:kanit;font-size:14px;text-align:left"
                >
                  {{ row.title1 }}
                </div>
                <div
                  style="width:25%;font-family:lato;font-size:16px;text-align:right;padding-right:5%"
                >
                  <b
                    >{{ $store.getters['globalfunc/formatNumber'](row.value1)
                    }}{{ ' ' }}
                    <span v-if="row.in_v1 != ''"
                      >({{
                        $store.getters['globalfunc/formatNumber'](row.in_v1)
                      }})</span
                    ></b
                  >
                </div>
                <div
                  style="width:30%;font-family:kanit;font-size:14px;text-align:left"
                >
                  {{ row.title2 }}
                </div>
                <div
                  style="width:25%;font-family:lato;font-size:16px;text-align:right"
                >
                  <b
                    >{{ $store.getters['globalfunc/formatNumber'](row.value2)
                    }}{{ ' ' }}
                    <span v-if="row.in_v2 != ''"
                      >({{
                        $store.getters['globalfunc/formatNumber'](row.in_v2)
                      }})</span
                    ></b
                  >
                </div>
              </div>
            </md-card-content>
          </md-card>
        </md-layout>
        <md-layout md-flex="100" md-align="center" class="">
          <md-spinner
            :md-size="150"
            :md-stroke="1"
            v-show="spinner"
            md-indeterminate
          ></md-spinner>
          <md-card
            class="sales-area-table"
            style="overflow-x: hidden;width:94%;padding-bottom:10px;padding-left:15px;padding-top:15px; z-index: unset;"
          >
            <md-layout md-flex="100" style="flex:unset">
              <md-layout
                md-flex="65"
                style="padding-left:10px;color:#414141;font-family:lato;font-size:18px"
              >
                <b>All Purchase Orders ({{ SumData() }})</b>
                <span
                  style="font-size:15px;margin-left:3%;padding-top:2px;font-weight:600;color: #797979"
                  >Total Order Value&nbsp;:&nbsp;&nbsp;{{
                    $store.getters['globalfunc/formatNumber'](totalValue)
                  }}</span
                >
                <span
                  style="font-size:15px;margin-left:3%;padding-top:2px;font-weight:600;color: #797979"
                  >Total Invoice Value&nbsp;:&nbsp;&nbsp;{{
                    $store.getters['globalfunc/formatNumber'](totalValueInv)
                  }}</span
                >
              </md-layout>
              <md-layout md-flex="35" md-align="end">
                <div style="width:15%"></div>
                <div style="padding-left:15px;width:55%;padding-right:5%">
                  <md-dropdown-box
                    class="select-status"
                    :placeholder="'All Status'"
                    :data="dropdown"
                    @choose="selectDP"
                  ></md-dropdown-box>
                </div>
                <div style="width:30%">
                  <md-button
                    :class="'-orange'"
                    style="margin:unset;border-radius:3px;font-size: 12px;min-width: 100%;padding:0px 5px 0px 0px;width: 100%;"
                    @click="showMdsCard"
                  >
                    <md-icon id="orderhis_search">get_app</md-icon>
                    EXPORT
                  </md-button>
                </div>
              </md-layout>
            </md-layout>
            <div :class="'head-table'" id="moreClick" style="margin-top:10px">
              <div class="text-left" style="width: 10%;">PO No.</div>
              <div class="text-left" style="width: 9%">Order No.</div>
              <div class="text-left" style="width: 9%">Invoice No.</div>
              <div class="text-left" style="width: 7%">PO. Date</div>
              <div class="text-left" style="width: 8%;">Delivery date</div>
              <div class="text-left" style="width: 7%">Inv. Date</div>
              <div class="text-left" style="width: 6%">Customer</div>
              <div class="text-left" style="width: 5%">Salesman</div>
              <div class="text-right" style="width: 11%">Order Value</div>
              <div class="text-right" style="width: 11%">Invoice Value</div>
              <div
                class="text-right"
                style="width: 6%; -webkit-text-size-adjust: none !important; -moz-text-size-adjust: none !important; -ms-text-size-adjust: none !important;"
              >
                Fulfill
              </div>
              <div style="width: 4%;text-align:center">Note</div>
              <div style="width: 3%;text-align:center">Rep.</div>
              <div style="width: 3%;text-align:center">Source</div>
              <div class="text-left" style=" width: 10%;"></div>
              <div class="text-left" style=" width: 3%;"></div>
            </div>
            <div
              v-if="dataList.length == 0"
              style="padding-top:10%;font-size:15px;color: #a8a8a8;height:calc(100vh - 430px)"
            >
              No Purchase Orders
            </div>
            <div
              v-if="dataList.length > 0"
              class="detail-blog"
              @scroll="scrollPage"
              :style="{
                height: 'calc(100vh - 430px)',
                'padding-left': '0px',
                width: '100%',
                'overflow-y': 'scroll'
              }"
            >
              <div
                v-for="items in dataList"
                :key="items.h_id"
                class="content-table"
                style="font-family:roboto;padding-top:4px"
              >
                <div
                  id="orderhis_order_detail"
                  class="number pt-2 hover-row"
                  style="width: 11%;"
                  @click="openDatail(items)"
                >
                  {{ items.po_no }}
                </div>
                <div class="number pt-2" style="width: 9%">
                  {{ items.order_no }}
                </div>
                <div class="number pt-2" style="width: 9%">
                  {{ items.inv_no }}
                </div>
                <div class="number pt-2" style="width: 7%">
                  {{ items.po_date }}
                </div>
                <div class="number pt-2" style="width: 8%">
                  {{ items.delivery_date }}
                </div>
                <div class="number pt-2" style="width: 7%">
                  {{ items.inv_date }}
                </div>
                <div
                  class="descript pt-2"
                  style="width: 6%;font-family:kanit;white-space: nowrap;text-overflow: ellipsis;padding-right:5px"
                >
                  {{ items.customer_code }}
                  <md-tooltip md-direction="top">
                    <span style="font-family:kanit"
                      >{{ items.customer_code }}&nbsp;{{
                        items.customer_name_th
                      }}</span
                    >
                  </md-tooltip>
                </div>
                <div
                  class="descript pt-2"
                  style="width: 5%;font-family:kanit;white-space: nowrap;text-overflow: ellipsis;padding-right:5px"
                >
                  {{ items.sm_code }}
                  <md-tooltip md-direction="top">
                    <span style="font-family:kanit"
                      >{{ items.sm_code }}&nbsp;{{ items.salesman }}</span
                    >
                  </md-tooltip>
                </div>
                <div
                  class="text-right pt-2"
                  style="width: 11%;font-size:13px;font-family:roboto"
                >
                  <span style="padding-right:4px;color:#5A5A5A">฿</span>
                  {{
                    $store.getters['globalfunc/formatNumber'](items.order_value)
                  }}
                </div>
                <div
                  class="text-right pt-2"
                  style="width: 11%;font-size:13px;font-family:roboto"
                >
                  <span style="padding-right:4px;color:#5A5A5A">฿</span>
                  {{
                    $store.getters['globalfunc/formatNumber'](
                      items.invoice_value
                    )
                  }}
                </div>
                <div
                  class="text-right pt-2"
                  style="width: 6%;font-size:13px;font-family:roboto;padding-right:3px"
                >
                  {{
                    $store.getters['globalfunc/formatNumber'](items.fulfilled)
                  }}
                </div>
                <div
                  :class="'number comment'"
                  style="width: 3%;text-align:center"
                  @click="openComment($event, items)"
                  :id="'icon' + items.doc_no"
                >
                  <md-button
                    class="md-icon-button"
                    :style="{ background: renderComment(items) }"
                  >
                    <md-icon id="orderhis_note" class="comment-btn"
                      >chat_bubble</md-icon
                    >
                    <md-tooltip md-direction="top">Note</md-tooltip>
                  </md-button>
                </div>
                <div :class="'number'" style="width: 3%;text-align: center;">
                  <md-button
                    style="color:#C9C9C9; width: 24px; min-width: 24px; height: 24px; min-height: 24px; border-radius: 0%;"
                    class="md-icon-button"
                    @click="openDelivery(items)"
                    :id="'icon' + items.doc_no"
                  >
                    <md-icon
                      style="margin-left: 0px;margin-top: 0px;margin-bottom: 0px;"
                      >description</md-icon
                    >
                    <md-tooltip md-direction="top">Rep.</md-tooltip>
                  </md-button>
                </div>
                <div style="width: 3%;text-align: center;">
                  <md-icon
                    v-if="items.source == 'xpress'"
                    style="width:25px; height:25px; color:#f44336"
                    >shopping_cart</md-icon
                  >
                  <md-tooltip md-direction="top" v-if="items.source == 'xpress'"
                    >DhasXpress</md-tooltip
                  >
                </div>
                <div :style="{ width: '10%', 'padding-right': '3px' }">
                  <md-chip
                    v-if="items.status_id != 'NOSTATUS'"
                    :style="{
                      background: renderStatus(items),
                      color: 'white',
                      'font-family': 'roboto',
                      'text-align': 'center',
                      'font-size': '13px',
                      height: '25px',
                      'line-height': '0.7',
                      'padding-left': 'unset',
                      'padding-right': 'unset',
                      width: '100%'
                    }"
                    >{{ items.status }}</md-chip
                  >
                </div>
                <div
                  class="view-more"
                  style="width: 3%;opacity: 0.54;cursor:pointer;padding-right:5px;text-align:center"
                  :id="'detail' + items.doc_no"
                >
                  <md-menu md-size="4" md-direction="bottom left" ref="menu">
                    <md-button
                      class="md-icon-button"
                      md-menu-trigger
                      style="margin: 0px;height: 20px;
                            min-width: 20px;width: 20px;
                            padding: 0px;min-height :20px; "
                    >
                      <md-icon id="orderhis_shipping_staus">more_vert</md-icon>
                    </md-button>
                    <md-menu-content style="width:100%;">
                      <div
                        style="background:white;padding:10px 10px 10px 20px;height:100px"
                      >
                        <div style="width:100%;display: -webkit-box;">
                          <div
                            style="width:90%;color:#727272;font-family:roboto:font-size:14px;font-weight:600;opacity:0.8"
                          >
                            Shipping Status
                          </div>
                          <div style="width:10%"></div>
                        </div>
                        <div class="view-his-truckno">
                          <div style="width:30%;padding-right:15px">
                            <div class="title-ipt">Truck No.</div>
                            <div class="title-ipt-kanit">
                              {{ items.truck_no }}
                            </div>
                          </div>
                          <div style="width:35%;padding-right:15px">
                            <div class="title-ipt">Trans Ref.</div>
                            <div class="title-ipt-roboto">
                              {{ items.transfer_ref }}
                            </div>
                          </div>
                          <div style="width:35%">
                            <div class="title-ipt">Customer Confirm</div>
                            <div class="title-ipt-roboto">
                              {{ items.cust_confirm }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </md-menu-content>
                  </md-menu>
                </div>
              </div>
            </div>
          </md-card>
        </md-layout>
      </md-layout>
    </div>
    <md-comment-dialog
      :title="'Notes'"
      @close="closeComment"
      @reply="replyComment"
      @read="readComment"
      :data="comment"
      :option="commentOpt"
    ></md-comment-dialog>
    <md-dialog ref="pageHistoryDG" id="pageHistoryDG" class="md-orders-view">
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
      <md-orders-view
        @close="closeDG"
        :data="detail"
        @read="readComment"
        @reply="replyCommentDG"
      ></md-orders-view>
    </md-dialog>
    <div
      v-show="showCard"
      class="mds-card"
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
          <div class="email-error">
            {{ warning_comma }}
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
          :disabled="disableBtnExport"
          :style="{
            height: '36px',
            margin: '0 0 0 15px',
            'border-radius': '3px',
            'font-size': '12px',
            color: disableBtnExport ? '#a8a8a8' : '#fd7f00'
          }"
          @click="exportData()"
          >SEND</md-button
        >
      </div>
    </div>
    <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span style="font-size: 16px; font-family: kanit">{{ snackbarMsg }}</span>
      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color: #fd7f00"
        >OK</md-button
      >
    </md-snackbar>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import historyService from '@/services/orders/history'
export default {
  name: 'orders-bycustomers',
  data () {
    return {
      keyword: '',
      commentOpt: {
        display: false,
        top: 0,
        left: 0
      },
      keepRow: [],
      dp: 'salesops',
      totalValue: 0,
      totalValueInv: 0,
      displayDP: false,
      pageName: '',
      orderSourceList: [],
      emailInput: '',
      showCard: false,
      incorrectEmail: [],
      disableBtnExport: false,
      snackbarMsg: '',
      vertical: 'top',
      horizontal: 'center',
      duration: 4000,
      keepSearch: '',
      warning_comma: '',

      get_screen:Vue.localStorage.get('SIZE_SCREEN')
    }
  },
  computed: {
    dataList () {
      return this.$store.getters['history/dataList']
    },
    spinner () {
      return this.$store.getters['history/spinner']
    },
    comment () {
      return this.$store.getters['history/comment']
    },
    dropdown () {
      return this.$store.getters['history/dropdown']
    },
    detail () {
      return this.$store.getters['history/detail']
    },
    spinnerDG () {
      return this.$store.getters['history/spinnerDG']
    },
    dataListTemp () {
      return this.$store.getters['history/dataListTemp']
    },
    detailBar () {
      return this.$store.getters['history/detailBar']
    },
    filter_search () {
      return this.$store.getters['history/filter_search']
    },
    headTotal () {
      return this.$store.getters['history/headTotal']
    },
    keepSearchHistory () {
      return this.$store.getters['history/keepSearchHistory']
    }
  },
  watch: {
    emailInput (val) {
      if (val.trim().length == 0) {
        this.disableBtnExport = true
      } else {
        this.disableBtnExport = false
      }
    }
  },
  methods: {
    // closeMore() {
    //   let btnClose = document.getElementById("moreClick").click();
    //   if (btnClose != "") {
    //     btnClose.click();
    //   }
    // },
    exportData () {
      if(this.emailInput.indexOf(',') != -1){
        let TxtEmail =''
        let emails_split = this.emailInput.split(' ')
        console.log(emails_split)
        for (let index = 0; index < emails_split.length; index++) {
        if(index < emails_split.length){
            TxtEmail += emails_split[index] +','
        }else {
            TxtEmail += emails_split[index]
        }
      }
          this.emailInput = TxtEmail
      }
      let emails = this.emailInput.split(',')
      let anyEmails = this.emailInput.split('@dhas.com')
      this.incorrectEmail = []
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
            let myArray = element.split('@')
            if (myArray[1] == 'dhas.com') {
              checkMailTrue.push(element)
            } else {
              this.incorrectEmail.push(element)
            }
          } else {
            this.incorrectEmail.push(element)
          }
        }
      })
      if(emails.length > 1){

      }
      if (
        emails.length == 1 &&
        this.emailInput.length > 0 &&
        emails[0] == this.emailInput &&
        anyEmails.length > 1
      ) {
        this.warning_comma =
          'เพิ่ม email มากกว่า 1 จะต้องใส่ , [email1@dhas.com,email2@dhas.com]'
      } else if (emails.length > 0 && this.incorrectEmail.length > 0) {
        this.warning_comma = 'email ต้องเป็น @dhas.com เท่านั้น'
      }
      if (this.incorrectEmail.length > 0) {
        this.disableBtnExport = true
      } else if (checkMailTrue.length > 0 && this.incorrectEmail.length == 0) {
        this.disableBtnExport = false
        this.showCard = false
        this.$store.commit('history/setSpinnerHis', true)
        let arr_channel = [
          { code: 'all', name: 'All Channel' },
          { code: 'TT', name: 'TT' },
          { code: 'MTT', name: 'MTT' }
        ]
        let TypeDate = [
          { code: 'po_date', name: 'PO. DATE' },
          { code: 'inv_date', name: 'Invoice Date' },
          { code: 'delivery_date', name: 'Delivery Date' }
        ]
        let masterKeep = JSON.parse(this.keepSearchHistory)
        let master = JSON.parse(JSON.stringify(this.filter_search))
        let rangDate = masterKeep.range
        if (rangDate == '-') {
          let yearStr = masterKeep.year
          let monthStr = masterKeep.month

          master.start_date = yearStr + '-' + monthStr + '-01'
          master.end_date =
            yearStr +
            '-' +
            monthStr +
            '-' +
            new Date(yearStr, monthStr, 0).getDate()
        } else {
          let myArray = rangDate.split('/')
          master.start_date = myArray[0]
          master.end_date = myArray[1]
        }
        master.user_id = localStorage.getItem('user_id')
        master.emp_id = localStorage.getItem('emp_id')
        master.department = localStorage.getItem('department')
        master.source = masterKeep.filter.source

        let key = this.dp == 'all' ? this.dp : this.dp.id
        var rs = _.find(this.dropdown, function (o) {
          return o.id == key
        })
        if (!_.isUndefined(rs)) {
          master.status = rs.id
          master.statusfull = rs.title
        } else {
          master.status = 'all'
          master.statusfull = 'All Status'
        }

        var rsCHN = _.find(arr_channel, function (o) {
          return o.code == masterKeep.filter.selectChannel
        })
        if (!_.isUndefined(rsCHN)) {
          master.selectChannelFull = rsCHN.name
        } else {
          master.selectChannel = 'all'
          master.selectChannelFull = 'All Channel'
        }
        //----------------------------
        var rsDate = _.find(TypeDate, function (o) {
          return o.code == masterKeep.filter.filter_date
        })
        if (!_.isUndefined(rsDate)) {
          master.filter_date_full = rsDate.name
        }
        //----------------------------
        var rsSource = _.find(this.orderSourceList, function (o) {
          return o.code == masterKeep.filter.source
        })
        if (!_.isUndefined(rsSource)) {
          master.source_full = rsSource.title
        }
        //----------------------------
        if (_.isUndefined(masterKeep.filter.selectCorpName)) {
          master.selectCorpName = '-'
          master.selectCorpNameFull = '-'
        } else {
          let channelCrop = this.$store.getters['history/channelCrop']
          var rsCorp = _.find(channelCrop, function (o) {
            return o.id == masterKeep.filter.selectCorpName
          })
          if (!_.isUndefined(rsCorp)) {
            master.selectCorpNameFull = rsCorp.name
          } else {
            master.selectCorpName = ''
            master.selectCorpNameFull = ''
          }
        }
        master.email = checkMailTrue
        master.ori_mail = localStorage.getItem('email')

        historyService
          .exportOrderHistoryGsheet(master)
          .then(response => {
        this.$store.commit('history/setSpinnerHis', false)
        this.warning_comma = ''
        this.incorrectEmail = []
        })
        .catch(error => console.log('exportOrderHistoryGsheet'))
      }
    },
    showMdsCard () {
      if (
        this.spinner == false &&
        this.$store.getters['history/headFilter'] == false
      ) {
        if (this.dataList.length > 0 && this.keepSearchHistory !== '') {
          this.emailInput = localStorage.getItem('email')
          this.showCard = true
        } else {
          this.$refs.snackbar.open()
          this.snackbarMsg = 'No order history to export'
        }
      }
    },
    closeMdsCard () {
      this.showCard = false
      this.warning_comma = ''
      this.incorrectEmail = []
    },
    orderSouce () {
      historyService
        .getOrderSouce()
        .then(response => {
          Vue.localStorage.set('order_source', '')
          this.orderSourceList = response
          Vue.localStorage.set('order_source', JSON.stringify(response))
          let data = _.cloneDeep(this.filter_search)
          let source_history = Vue.localStorage.get('order-history')
          if (source_history == 'null' || source_history == null) {
            data.source = response.length > 0 ? response[0].code : 'all'
          } else {
            data.source = source_history
          }
          // data.source = response.length > 0 ? response[0].code : "all";
          this.$store.commit('history/setFilterSearch', data)
          // this.$store.dispatch("history/getList");
        })
        .catch()
    },
    renderDP () {
      let key = this.dp == 'all' ? this.dp : this.dp.id
      var rs = _.find(this.dropdown, function (o) {
        return o.id == key
      })
      if (!_.isUndefined(rs)) {
        return rs.title
      } else {
        return ''
      }
    },
    openSelectDP () {
      this.displayDP = true
    },
    SumData () {
      /*
        if (this.dp == "all" && _.trim(this.keyword).length == 0) {
          this.totalValue = this.dataListTemp.reduce(
            (acc, row) => acc + parseFloat(row.order_value),
            0
          );
          return this.$store.getters["globalfunc/formatNumberInt"](
            this.dataListTemp.length
          );
        } else {
          this.totalValue = this.dataList.reduce(
            (acc, row) => acc + parseFloat(row.order_value),
            0
          );
          return this.$store.getters["globalfunc/formatNumberInt"](
            this.dataList.length
          );
        }
      */
      this.totalValue = this.dataListTemp.reduce(
        (acc, row) => acc + parseFloat(row.order_value),
        0
      )
      this.totalValueInv = this.dataListTemp.reduce(
        (acc, row) => acc + parseFloat(row.invoice_value),
        0
      )
      return this.$store.getters['globalfunc/formatNumberInt'](
        this.dataListTemp.length
      )
    },
    scrollPage (val) {
      this.$store.dispatch('history/scrollPage', this.keyword)
    },
    keywordFil (val) {
      this.keyword = val
      this.filterList(val)
    },
    keywordCLR () {
      this.keyword = ''
      this.filterList('')
    },
    openDatail (value) {
      this.$store.dispatch('history/getOrderById', value)
      this.$refs['pageHistoryDG'].open()
    },
    closeDG () {
      this.$refs['pageHistoryDG'].close()
    },
    selectDP (value) {
      this.displayDP = false
      this.dp = value
      this.$store.dispatch('history/selectDP', {
        key: value,
        keyword: this.keyword
      })
    },
    readComment (data) {
      this.$store.dispatch('history/readComment', data)
    },
    closeComment () {
      this.commentOpt.display = false
    },
    replyCommentDG (value) {
      if (this.comment.length == 0) {
        value.emp_id_start = Vue.localStorage.get('emp_id')
      } else {
        value.emp_id_start = this.comment[this.comment.length - 1].emp_id_start
      }

      value.msg_to = ''
      value.emp_id_start = ''
      value.head_id = value.h_id
      value.doc_no = value.doc_no

      this.$store.dispatch('history/replyComment', value)
    },
    replyComment (value) {
      if (value != null) {
        if (this.comment.length == 0) {
          value.emp_id_start = Vue.localStorage.get('emp_id')
        } else {
          value.emp_id_start = this.comment[
            this.comment.length - 1
          ].emp_id_start
        }

        value.msg_to = ''
        value.emp_id_start = ''
        value.head_id = this.keepRow.h_id
        value.doc_no = this.keepRow.doc_no

        this.$store.dispatch('history/replyComment', value)
      }
    },
    openComment (e, items) {
      let pageX = e.pageX

      if (pageX == 0) {
        let comment = document.getElementById('icon' + items.doc_no)
        pageX = comment.offsetLeft + 270
      }
      let masterScreenW = window.screen.height

      let H = e.y + 200
      if (H > masterScreenW) {
        let total = H - masterScreenW

        this.commentOpt.top = e.y - total
      } else {
        this.commentOpt.top = e.y
      }
      this.commentOpt.left = pageX - 270
      this.commentOpt.display = true
      this.keepRow = items
      this.$store.dispatch('history/getComment', items)
    },
    renderStatus (value) {
      if (value.status_id == 'WT') {
        return '#A6A7AA' //"#FD7F00";
      } else if (value.status_id == 'TF') {
        return '#A6A7AA' //"#BDBDBD";
      } else if (value.status_id == 'IP') {
        return '#A6A7AA' //"#f44336";
      } else if (value.status_id == 'AP') {
        return '#A6A7AA' //"#f44336";
      } else if (value.status_id == 'OD') {
        return '#E5A42F' //"#797979";
      } else if (value.status_id == 'IN') {
        return '#E5A42F' //"#5A5A5A";
      } else if (value.status_id == 'SP') {
        return '#368E51' //return "#FBC02D";
      } else if (value.status_id == 'RC') {
        return '#368E51' //return "#66BB6A";
      } else if (value.status_id == 'CC') {
        return '#CB2228' //"#f44336";
      } else if (value.status_id == 'BC') {
        return '#CB2228' //"#f44336";
      } else if (value.status_id == 'CL') {
        return '#E5A42F' //"#f44336";
      } else if (value.status_id == 'RJ') {
        return '#CB2228' //"#f44336";
      } else if (value.status_id == 'NS') {
        return '#CB2228' //"#f44336";
      }
    },
    renderComment (value) {
      if (value.order_status == 'REJ') {
        return '#F44336'
      } else if (value.note_status == false && value.order_status !== 'REJ') {
        return '#FD7F00'
      } else {
        return '#C9C9C9'
      }
    },
    selectMonth (value) {
      let date = this.$store.getters['history/selected_date']
      if (value.mode == 'period') {
        date.month = value.month
        date.year = value.year
        date.range = '-'
      } else {
        date.month = ''
        date.year = ''
        date.range = value.range
      }
      // this.$store.dispatch("history/getList");
    },
    selectYear (value) {
      let date = this.$store.getters['history/selected_date']
      date.year = value.year
    },
    clearSearch () {
      this.$store.dispatch('history/filter', '')
    },
    filterList (param) {
  
      let t = this
      setTimeout(() => {
        t.$store.dispatch('history/filter', param)
      }, 20)
    },
    openDelivery (items) {
      let route = this.$router.resolve({
        name: 'new-report',
        query: { doc_no: items.doc_no, id: items.h_id }
      })
      window.open(route.href, '_blank')
    },
    searchHistory (value) {
      this.$store.commit('history/setFilterSearch', value)
      this.$store.dispatch('history/getList')
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      let menu = this.$store.getters['displayMenu']
      let path = this.$router.app._route.path.split('/')
      let pathFull = this.$router.app._route.path
      let head = _.filter(menu, item => {
        if (item.m_code == path[1]) {
          return true
        }
      })
      if (head.length > 0) {
        let sub = _.filter(head[0].sub_menu, item => {
          if (item.m_path == pathFull) {
            return true
          }
        })
        if (sub.length > 0) {
          this.pageName = sub[0].m_name
        }
      }
  
        let res = {
          keyword :'',
          view:'history'
        }
      
      this.$store.dispatch('history/filterSaleman', res)
      let sm_code = ''
      if (Vue.localStorage.get('department') == 'SM') {
        sm_code = Vue.localStorage.get('emp_id')
      }
      let filter_search = {
        po_no: '',
        order_no: '',
        inv_no: '',
        sm_code: sm_code,
        cust_code: '',
        filter_date: 'po_date',
        source: 'salesops'
      }
      this.$store.commit('history/setFilterSearch', filter_search)
      this.$store.dispatch('setPathMenuService', 'orders')
      this.$store.dispatch('history/getTimeServer')
      // console.log(this.$store.getters.timeServer)
      // 2021-11-07/2021-11-19
      let date = this.$store.getters['history/selected_date']
      date.month = moment(new Date()).format('MM')
      date.year = moment(new Date()).format('YYYY')
      date.range = '-'
      this.$store.commit('history/selectedDP', 'all')
      this.$store.dispatch('history/getHistoryStatus')
      this.$store.dispatch('myorders/getPriority')
      this.$store.dispatch('history/getCreditterm')
      this.$store.dispatch('history/ediCorporateCode', '')
      this.$store.dispatch('myorders/getWarehouse')
      // this.$store.dispatch('history/getOrderHistoryTotal')
      // this.$store.dispatch("history/getList");
      this.orderSouce()
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'sales-period-block': require('./history-component/md-period-boxes'),
    'md-search-box': require('./myorder-component/md-search-box'),
    'md-dropdown-box': require('../Salesops/customComponent/md-dropdown-box'),
    'md-comment-dialog': require('../Salesops/customComponent/md-comment-dialog'),
    'md-orders-view': require('./history-component/md-orders-view')
  }
}
</script>
<style lang="scss" scoped>
.dropdownFixBox {
  width: 100%;
  height: 36px;
  min-height: 36px;
  margin: 0;
  padding: 0 0 0 20px;
  background: #efefef;
  border-radius: 3px;
}
.dropdownFixs {
  position: absolute;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.16);
  .dropdownFix {
    background: white;
    text-align: left;
    padding: 4px 18px;
  }
  .dropdownFix:hover {
    background: #efefef;
    cursor: pointer;
  }
}
.view-his-truckno {
  width: 100%;
  margin-top: 17px;
  display: -webkit-box;
  .title-ipt {
    color: #727272;
    font-size: 11px;
    font-family: roboto;
  }
  .title-ipt-roboto,
  .title-ipt-kanit {
    height: 16px;
    color: #414141;
    font-size: 13px;
    line-height: 1;
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(201, 201, 201, 0.57);
  }

  .title-ipt-kanit {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    font-family: kanit;
  }
  .title-ipt-roboto {
    font-family: roboto;
  }
}
#pageHistory {
  .pt-2 {
    padding-top: 2px;
  }
  .md-dropdown-box {
    background: #efefef;
  }
  .head-table {
    font-family: roboto;
    opacity: 0.54;
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
          visibility: hidden;
        }
      }
      .content-table:hover {
        .view-more {
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


// @media screen and (min-height: 1000px) and (min-width: 800px) {
//     .select-status{
//       background-color: green;
//     }
// }




  
}
</style>
