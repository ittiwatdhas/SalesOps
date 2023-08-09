<template>
  <div id="customer-tab">
    <div class="filter-bar">
      <div style="width:45%;" class="title">
        <div style="width:20%;padding-top:8px">
          <b>Product :</b>
        </div>
        <div style="width:80%">
          <md-dropdown-box
            :placeholder="'Search product...'"
            :data="dropdown"
            @choose="selectdp"
            :value="title"
            @filter="filterDP"
          ></md-dropdown-box>
        </div>
      </div>
      <div style="width:55%;display:flex;justify-content: flex-end;">
        <md-search-box
          style="width:40%"
          :placeholder="'Search Customer...'"
          :data="[]"
          @clear="clearSrarch"
          :value="searchInput"
          @filter="filterSearch"
        ></md-search-box>
        <md-button
          style="height:36px;margin:0px;border-radius:3px;font-size:12px;min-width:55px !important;margin-left:15px"
          :class="'-orange'"
          @click="searchData()"
          ><md-icon>search</md-icon></md-button
        >
      </div>
    </div>
    <div class="table-bar">
      <!-- v-sticky="{ zIndex: 1, stickyTop: 0 }" -->
      <div class="head-table-bar" v-sticky="{ zIndex: 1, stickyTop: 0 }">
        <div class="block" style="width:5%">No.</div>
        <div
          class="sorting"
          style="width:21%;"
          @click="acTiveColumn('cust_code')"
        >
          <div class="col">
            Customer
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'cust_code'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:10%;justify-content: center"
          @click="acTiveColumn('order_no')"
        >
          <div class="col">
            Order No.
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'order_no'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:10%;justify-content: center"
          @click="acTiveColumn('po_no')"
        >
          <div class="col">
            PO No.
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'po_no'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:11%;justify-content: center"
          @click="acTiveColumn('po_date')"
        >
          <div class="col">
            PO. Date
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'po_date'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:11%;justify-content: center"
          @click="acTiveColumn('delivery_date')"
        >
          <div class="col">
            Delivery Date
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'delivery_date'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div class="block right" style="width:6%">Stock</div>
        <div
          class="sorting"
          style="width:8%;justify-content: flex-end"
          @click="acTiveColumn('order_qty')"
        >
          <div class="col">
            QTY
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'order_qty'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div class="block right" style="width:8%">Price</div>
        <div
          class="sorting"
          style="width:10%;justify-content: flex-end"
          @click="acTiveColumn('amount')"
        >
          <div class="col">
            Total Value
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'amount'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
      </div>
      <div class="body-table-bar">
        <div v-if="data.length === 0" class="no-data">
          No data...
        </div>
        <div
          class="body-table-bar-row"
          v-for="(row, index) in data"
          :key="'customer-tab-' + index"
          @click="selected(row, 'product')"
        >
          <div class="block" style="width:5%">{{ fmInt(index + 1) }}</div>
          <div class="block left" style="width:21%;display:flex">
            <div class="kanit">
              {{ row.cust_code }}&nbsp;
              {{ row.cust_name }}
            </div>
          </div>
          <div class="block center" style="width:10%;padding-right:20px">
            {{ row.order_no }}
          </div>
          <div class="block center" style="width:10%;">
            {{ row.po_no }}
          </div>
          <div class="block center" style="width:11%;padding-right:45px">
            {{ fmDateNotime(row.po_date) }}
          </div>
          <div class="block center" style="width:11%;padding-right:45px">
            {{ fmDateNotime(row.delivery_date) }}
          </div>
          <div class="block right" style="width:6%">
            {{ fmInt(row.stock) }}
          </div>
          <div class="block right" style="width:8%;padding-right:45px">
            {{ fmInt(row.order_qty) }}
          </div>
          <div class="block right" style="width:8%">
            {{ fm(row.price) }}
          </div>
          <div class="block right" style="width:10%;padding-right:45px">
            {{ fm(row.amount) }}
          </div>
        </div>
      </div>
      <div class="footer-table-bar">
        <div class="block" style="width:5%"></div>
        <div class="block left" style="width:21%;color:#2A2A2A">
          {{ fmInt(data.length) }}&nbsp;&nbsp;&nbsp; Customers
        </div>
        <div class="block" style="width:10%;"></div>
        <div class="block" style="width:10%;"></div>
        <div class="block " style="width:11%;"></div>
        <div class="block right" style="width:11%"></div>
        <div class="block right" style="width:6%;color:#2A2A2A">TOTAL</div>
        <div
          class="block right"
          style="width:8%;color:#2A2A2A;padding-right:45px"
        >
          {{ fmInt(sum('order_qty', data)) }}
        </div>
        <div class="block right" style="width:8%;color:#2A2A2A"></div>
        <div
          class="block right"
          style="width:10%;color:#2A2A2A;padding-right:45px"
        >
          {{ fm(sum('amount', data)) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueSticky from 'vue-sticky'
import Vue from 'vue'
import moment from 'moment'
export default {
  name: 'customer-tab',
  props: {
    data: {
      type: Array,
      required: true
    },
    mainrow: {
      required: true
    },
    title: {
      required: false
    },
    dropdown: {
      type: Array,
      required: true,
      default: []
    }
  },
  data () {
    return {
      searchInput: '',
      allProductList: [],
      allProducTypetList: [],
      checkDropdownVal: null,
      activeCol: null
    }
  },
  methods: {
    acTiveColumn (col) {
      if (this.data.length > 0) {
        if (this.activeCol === col) {
          this.$emit('sorting', { col: col, sorting: 'asc' })
        } else {
          this.$emit('sorting', { col: col, sorting: 'desc' })
        }
        this.activeCol = this.activeCol === col ? null : col
      }
    },
    filterDP (param) {
      this.$emit('filterdp', param)
    },
    selectdp (val) {
      this.$emit('selectdp', val)
    },
    selected (row, feild) {
      this.$emit('selected', row, feild)
    },
    sum (feild, data) {
      return data.reduce((acc, row) => acc + parseFloat(row[feild]), 0)
    },
    viewQueue () {
      console.log('viewQueue')
    },
    searchData () {
      this.$emit('search')
    },
    clearSrarch () {
      this.$emit('filterinput', '')
    },
    filterSearch (param) {
      this.$emit('filterinput', param)
    },
    fmInt (value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    fm (value) {
      if (parseInt(value) === 0 || value === '0') {
        return this.$store.getters['globalfunc/formatNumberInt'](value)
      } else {
        return this.$store.getters['globalfunc/formatNumber'](value)
      }
    },
    fmDate (value) {
      let checkFM = moment(value, [
        'YYYY-MM-DD',
        'YYYY-MM-DD HH:mm:ss'
      ]).format()

      if (checkFM == 'Invalid date') {
        return ''
      } else {
        return moment(value).format('DD/MM/YYYY HH:MM')
      }
    },
    fmDateNotime (value) {
      let checkFM = moment(value, [
        'YYYY-MM-DD',
        'YYYY-MM-DD HH:mm:ss'
      ]).format()

      if (checkFM == 'Invalid date') {
        return ''
      } else {
        return moment(value).format('DD/MM/YYYY')
      }
    }
  },
  directives: {
    sticky: VueSticky
  },
  created () {},
  components: {
    'md-search-box': require('../../Salesops/customComponent/md-search-box-no-list'),
    'md-dropdown-box': require('../../Salesops/customComponent/mds-search-dropdown-box')
  }
}
</script>
<style lang="scss" scoped>
#customer-tab {
  padding-top: 15px;
  width: 100%;
  .filter-bar {
    display: flex;
    .title {
      text-align: left;
      color: #414141;
      font-size: 16px;
      display: flex;
    }
  }

  .table-bar {
    margin-top: 15px;
    margin-bottom: 40px;
    .no-data {
      padding: 20px;
    }
    .head-table-bar {
      padding-right: 6px;
      width: 100%;
      color: #ffffff;
      display: flex;
      background: #fd7f00;
      font-size: 12px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      font-family: roboto;
      .block {
        padding: 10px;
      }
      .sorting {
        display: flex;
        cursor: pointer;
        padding: 0px 10px;
        .col {
          padding-top: 10px;
        }
        .col-icon {
          padding-left: 8px;
          padding-top: 7px;
        }
      }
    }
    .body-table-bar {
      color: #414141;
      font-size: 14px;
      border-right: 1px solid rgba(0, 0, 0, 0.07);
      border-left: 1px solid rgba(0, 0, 0, 0.07);
      .body-table-bar-row {
        display: flex;
        width: 100%;
        .block {
          font-family: lato;
          padding: 10px;
        }
        .kanit {
          font-family: kanit;
        }
      }
      .body-table-bar-row:hover {
        background: #f7f7f7;
        border-radius: 4px;
        // cursor: pointer;
      }
    }
    .footer-table-bar {
      color: #5a5a5a;
      display: flex;
      width: 100%;
      background: #efefef;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      .block {
        padding: 10px;
        font-weight: bold;
        font-size: 14px;
        font-family: lato;
      }
    }
  }
  &::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: #f7f7f7;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }

  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
}
</style>
