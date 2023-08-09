<template>
  <div id="pageSummaryOrder">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true">
      <md-layout md-align="start" md-flex="100" class="md-topic"
        style="padding-top:25px;padding-left:40px;font-weight: bolder;">
        {{
          "SUMMARY ORDER"
        }}
      </md-layout>
      <md-layout md-align="center" class="pt-20">

        <div :style="{
              'pointer-events': $store.getters['summaryorders/headFilter'] ? 'none' : ''
            }" style="display: -webkit-box;width:94%">
          <sales-period-block :displayRange="true" :orderSource="orderSourceList" style="width:100%"
            @selectmonth="selectMonth" @selectyear="selectYear" :year="$store.getters['summaryorders/selected_date'].year"
            :month="$store.getters['summaryorders/selected_date'].month" :range="$store.getters['summaryorders/selected_date'].range"
            :detail="[]"></sales-period-block>
        </div>
        <md-spinner style="position: absolute;padding-top:30%;z-index: 3" :md-size="150" :md-stroke="1" v-show="spinner" md-indeterminate></md-spinner>

        <md-layout md-flex="100" md-align="center" style="padding-top: 1%;">
          <md-card class="sales-area-table"
            style="overflow-x: hidden;width:94%;padding-bottom:10px;padding-left:15px;padding-top:15px; z-index: unset;">

            <div :class="'head-table'" id="moreClick" style="margin-top:10px">
              <div class="text-center" style="width: 13%;">Channel</div>
              <div class="text-center" style="width: 13%">Sub Channel</div>
              <div class="text-center" style="width: 13%">Sales Team</div>
              <div class="text-right" style="width: 13%">Count Customer</div>
              <div class="text-right" style="width: 15%;">Count PO.</div>
              <div class="text-right" style="width: 15%">Order Value</div>
              <div class="text-right" style="width: 15%">Invoice Value</div>

            </div>
            <div v-if="dataSummary.data.length == 0"
              style="padding-top:10%;font-size:15px;color: #a8a8a8;height:calc(100vh - 430px)">
              No Summary Orders
            </div>
            <div v-if="dataSummary.data.length > 0" class="detail-blog" :style="{
              height: '430px',
              'padding-left': '0px',
              width: '100%',
              'overflow-y': 'scroll'
            }">
              <div v-for="items in dataSummary.data" class="content-table"
                style="font-family:roboto;padding-top:4px; font-size: 13px;">
                <div class="number pt-2" style="width: 13%; text-align: center; font-family: kanit; font-size: 14px;">
                  {{ items.customer_channel_title }}
                </div>
                <div class="number pt-2" style="width: 13%; text-align: center; ">
                  {{ items.sub_channel }}
                </div>

                <div class="number pt-2" style="width: 13%; text-align: center;">
                  {{ items.salesteam_code }}
                </div>

                <u class="number pt-2 hover-row" style="width: 13%; text-align: right; cursor:pointer;"
                  @click="openDetail(items, 'Customer', dataSummary.date)">
                  {{ items.count_customer }}
                </u>

                <u class="text-right pt-2 hover-row" style="width: 15%;font-size:13px; cursor:pointer;"
                  @click="openDetail(items, 'Po', dataSummary.date)">
                  {{
                    items.count_po
                  }}
                </u>
                <div class="text-right pt-2" style="width: 15%;font-size:13px;font-family:roboto">
                  <!-- <span style="padding-right:4px;color:#5A5A5A">฿</span> -->
                  {{
                    $store.getters['globalfunc/formatNumber'](
                      items.po_value
                    )
                  }}
                </div>
                <div class="text-right pt-2" style="width: 15%;font-size:13px;font-family:roboto">
                  <!-- <span style="padding-right:4px;color:#5A5A5A">฿</span> -->
                  {{
                    $store.getters['globalfunc/formatNumber'](
                      items.inv_value
                    )
                  }}
                </div>

              </div>
            </div>
          </md-card>
        </md-layout>
      </md-layout>
    </div>
    <!-- <md-comment-dialog :title="'Notes'" :data="comment" :option="commentOpt"></md-comment-dialog> -->

    <!-- Modal Customer, Po ////////////////////////////////////////////-->
    <md-dialog ref="pageSummaryCustomer" id="pageSummaryDG" class="md-summary-view">
      <div style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%">
        <md-spinner :md-size="150" :md-stroke="1" v-show="spinnerDG" md-indeterminate></md-spinner>
      </div>
      <md-summary-view :select_type="'Customer'" :titleName="'Customer'" @close="closeDG"></md-summary-view>
    </md-dialog>

    <md-dialog ref="pageSummaryPo" id="pageSummaryDG" class="md-summary-view">
      <div style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%">
        <md-spinner :md-size="150" :md-stroke="1" v-show="spinnerDG" md-indeterminate></md-spinner>
      </div>
      <md-summary-view :select_type="'Purchase Order'" :titleName="'PO. NO.'" @close="closeDG"></md-summary-view>
    </md-dialog>
    <!-- //////////////////////////////////////////////////////////////// -->

  </div>
</template>
<script>
import Vue from 'vue'
import moment, { relativeTimeThreshold } from 'moment'
import summaryOrderService from '@/services/orders/summaryorders'

export default {
  name: 'orders-bycustomers',
  data() {
    return {
      datePo: '',
      summaryDateCode: '',
      detailCode: '',
      in1: '',
      keyword: '',
      dp: 'salesops',
      pageName: '',
      orderSourceList: [],

      get_screen: Vue.localStorage.get('SIZE_SCREEN')
    }
  },
  computed: {
    spinner() {
      return this.$store.getters['summaryorders/spinner']
    },
    spinnerDG() {
      return this.$store.getters['summaryorders/spinnerDG']
    },
    dataSummary() {
      return this.$store.getters['summaryorders/dataSummary']
    },
    summaryDate() {
      return this.$store.getters['summaryorders/summaryDate']
    }
  },
  watch: {

  },
  methods: {
    openDetail(value, in1, date) {
      // console.log("Detail => ", value, date)
      this.summaryDateCode = date[0] + ',' + date[1]
      // console.log("Detail => ", value, this.summaryDateCode)

      let sub_ch = value.sub_channel
      if (sub_ch == 'DHASXPRESS') {
        sub_ch = 'XPRESS'
      }
      let Pod = [value.salesteam, this.summaryDateCode]
      let customerPop = [this.summaryDateCode, value.customer_channel_code, sub_ch, value.salesteam_code, value.customer_code || '']
      let poPop = [this.summaryDateCode, value.customer_channel_code, sub_ch, value.salesteam_code, value.po_no || '']

      if (in1 == 'Customer') {
        this.$refs['pageSummaryCustomer'].open()
        // console.log(customerPop)

        this.$store.dispatch('summaryorders/getSummaryCust', customerPop)
      } else {
        this.$refs['pageSummaryPo'].open()
        // console.log(this.datePo)
        this.$store.dispatch('summaryorders/getSummaryPO', poPop)

      }

    },

    closeDG() {
      this.$refs['pageSummaryCustomer'].close()
      this.$refs['pageSummaryPo'].close()
    },
    selectMonth(value) {
      let date = this.$store.getters['summaryorders/selected_date']
      if (value.mode == 'period') {
        date.month = value.month
        date.year = value.year
        date.range = '-'
        this.$store.dispatch("summaryorders/summaryOrder", value.year + '-' + value.month)
      } else {
        date.month = ''
        date.year = ''
        date.range = value.range
        let newrange = value.range
          .replace('/', ',')
        console.log('range >>>>>>>>>>>', newrange)
        this.$store.dispatch("summaryorders/summaryOrder", newrange)
      }

      console.log(value.range);
    },
    selectYear(value) {
      let date = this.$store.getters['summaryorders/selected_date']
      date.year = value.year
    },

  },
  created() {
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
        keyword: '',
        view: 'history'
      }

      this.$store.dispatch('setPathMenuService', 'orders')

      let date = this.$store.getters['summaryorders/selected_date']
      date.month = moment(new Date()).format('MM')
      date.year = moment(new Date()).format('YYYY')
      date.range = '-'


      this.$store.dispatch('summaryorders/summaryOrder', date.year + '-' + date.month)

    }
  },
  components: {
    'sales-period-block': require('./summary-order-component/md-summary-boxes'),
    'md-comment-dialog': require('../Salesops/customComponent/md-comment-dialog'),
    'md-summary-view': require('./summary-order-component/md-summary-view'),
  }
}
</script>
<style lang="scss" scoped>
#pageSummaryOrder {
  .pt-2 {
    padding-top: 2px;
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

      &::-webkit-scrollbar {
        height: 7px;
        width: 5px;
        background: #ffffff;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #a8a8a8;
        border-radius: 5px;
      }

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

  }

}
</style>
