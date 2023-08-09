<template>
  <div id="product-group-tab">
    <div class="filter-bar">
      <div style="width:65%;" class="title">
        <div style="width:10%;padding-top:8px">
          <b>Group :</b>
        </div>
        <div style="width:90%">
          <md-dropdown-box
            style="width:70%"
            :placeholder="'Search product...'"
            :data="dropdown"
            @choose="selectdp"
            :value="title"
            @filter="filterDP"
          ></md-dropdown-box>
        </div>
      </div>
      <div style="width:30%;padding-right:2%">
        <md-search-box
          :placeholder="'Search Item...'"
          :data="[]"
          @clear="clearSrarch"
          :value="searchInput"
          @filter="filterSearch"
        ></md-search-box>
      </div>
      <div style="width:5%;display:flex">
        <md-button
          style="height:36px;margin:0px;border-radius:3px;font-size:12px;min-width:55px !important"
          :class="'-orange'"
          @click="searchData()"
          ><md-icon>search</md-icon></md-button
        >
      </div>
    </div>
    <div class="table-bar">
      <div class="head-table-bar" v-sticky="{ zIndex: 1, stickyTop: 0 }">
        <div class="block" style="width:5%">No.</div>
        <div
          class="sorting"
          style="width:38%"
          @click="acTiveColumn('product_no')"
        >
          <div class="col">
            Product
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'product_no'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <!-- <div class="block left" style="width:21%">Product</div> -->
        <div class="block center" style="width:7%;">Unit</div>
        <div
          class="sorting"
          style="width:9%;justify-content: flex-end"
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
        <!-- <div
          class="sorting"
          style="width:17%;justify-content: center"
          @click="acTiveColumn('create_date')"
        >
          <div class="col">
            Date Time
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'create_date'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div> -->
        <div
          class="sorting"
          style="width:14%;justify-content: flex-end"
          @click="acTiveColumn('amount')"
        >
          <div class="col">
            Total value
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
        <div class="block right" style="width:7%">DRPR</div>
        <div class="block right" style="width:7%">DNSS</div>
        <div class="block right" style="width:7%">DNPC</div>
        <div class="block right" style="width:7%">DNMT</div>
      </div>
      <div class="body-table-bar">
        <div v-if="data.length === 0" class="no-data">
          No data...
        </div>
        <div
          class="body-table-bar-row"
          v-for="(row, index) in data"
          :key="'product-group-tab-' + index"
          @click="selected(row, 'product_group')"
        >
          <div class="block" style="width:5%">{{ fmInt(index + 1) }}</div>
          <div class="block left" style="width:38%;display:flex">
            <div class="kanit">
              {{ row.product_no }}&nbsp;
              {{ row.product_name }}
            </div>
            <!-- <div>
              {{ row.product_no }}
            </div>
            <div style="padding-left:20px">{{ row.product_name }}</div> -->
          </div>
          <div class="block center kanit" style="width:7%">
            {{ row.unit_title }}
          </div>
          <div class="block right" style="width:9%;padding-right:45px">
            {{ fmInt(row.order_qty) }}
          </div>
          <!-- <div class="block center" style="width:17%;">
            {{ fmDate(row.create_date) }}
          </div> -->
          <div class="block right" style="width:14%;padding-right:45px">
            {{ fm(row.amount) }}
          </div>
          <div class="block right" style="width:7%">
            {{ fmInt(row.drpr) }}
          </div>
          <div class="block right" style="width:7%">
            {{ fmInt(row.dnss) }}
          </div>
          <div class="block right" style="width:7%">
            {{ fmInt(row.dnpc) }}
          </div>
          <div class="block right" style="width:7%">
            {{ fmInt(row.dnmt) }}
          </div>
        </div>
      </div>
      <div class="footer-table-bar">
        <div class="block" style="width:5%"></div>
        <div class="block left" style="width:38%;color:#2A2A2A">
          {{ fmInt(data.length) }}&nbsp;&nbsp;&nbsp; Items
        </div>
        <div class="block" style="width:7%;color:#2A2A2A;padding-right:45px">
          TOTAL
        </div>
        <div
          class="block right"
          style="width:9%;color:#2A2A2A;padding-right:45px"
        >
          {{ fmInt(sum('order_qty')) }}
        </div>
        <!-- <div class="block " style="width:17%;"></div> -->
        <div
          class="block right"
          style="width:14%;color:#2A2A2A;padding-right:45px"
        >
          {{ fm(sum('amount')) }}
        </div>
        <div class="block right" style="width:7%">
          {{ fmInt(sum('drpr')) }}
        </div>
        <div class="block right" style="width:7%">
          {{ fmInt(sum('dnss')) }}
        </div>
        <div class="block right" style="width:7%">
          {{ fmInt(sum('dnpc')) }}
        </div>
        <div class="block right" style="width:7%">
          {{ fmInt(sum('dnmt')) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import VueSticky from 'vue-sticky'
// import historyService from '@/services/orders/history'

export default {
  name: 'product-group-tab',
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
    filterDP (val) {
      this.$emit('filterdp', val)
    },
    selectdp (val) {
      this.$emit('selectdp', val)
    },
    selected (row, feild) {
      this.$emit('selected', row, feild)
    },
    sum (feild) {
      return this.data.reduce((acc, row) => acc + parseFloat(row[feild]), 0)
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
        return moment(value).format('DD/MM/YYYY HH:MM:SS')
      }
    }
  },
  created () {},
  components: {
    'md-search-box': require('../../Salesops/customComponent/md-search-box-no-list'),
    'md-dropdown-box': require('../../Salesops/customComponent/mds-search-dropdown-box')
  },
  directives: {
    sticky: VueSticky
  }
}
</script>
<style lang="scss" scoped>
#product-group-tab {
  padding-top: 15px;
  width: 100%;
  .filter-bar {
    display: flex;
    .title {
      display: flex;
      text-align: left;
      color: #414141;
      font-size: 14px;
    }
  }
  .table-bar {
    margin-top: 20px;
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
      .no-data {
        padding: 20px;
      }
      color: #414141;
      font-size: 14px;
      border-right: 1px solid rgba(0, 0, 0, 0.07);
      border-left: 1px solid rgba(0, 0, 0, 0.07);
      // overflow-y: auto;
      // overflow-x: hidden;
      // max-height: calc(100vh - 410px);
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
        cursor: pointer;
        color: #fd7f00;
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
    }
    .footer-table-bar {
      display: flex;
      width: 100%;
      background: #efefef;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      color: #5a5a5a;
      .block {
        padding: 10px;
        font-weight: bold;
        font-size: 14px;
        font-family: lato;
      }
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
}
</style>
