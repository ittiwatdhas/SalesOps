<template>
  <div id="product-tab">
    <div class="filter-bar" v-sticky="{ zIndex: 1, stickyTop: 0 }">
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
          :placeholder="'Search Salesman...'"
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
        <md-button
          style="height:36px;margin:0px;border-radius:3px;font-size:12px;min-width:55px !important;margin-left:15px"
          :class="'-orange'"
          @click="viewQueue()"
          >View Queue</md-button
        >
      </div>
    </div>
    <div class="big-body">
      <div
        v-if="data.length === 0"
        class="no-data"
        style="padding-top:5%;padding-bottom:5%;border: 1px solid rgba(0, 0, 0, 0.07);"
      >
        No data...
      </div>
      <div v-for="(record, index) in data" :key="'parent-product-tab-' + index">
        <div class="area-name">Area : {{ record.area_title }}</div>
        <div class="table-bar">
          <div class="head-table-bar">
            <div class="block" style="width:5%">No.</div>
            <div
              class="sorting"
              style="width:43%;"
              @click="acTiveColumn('sm_code', index)"
            >
              <div class="col">
                Salesman
              </div>
              <div class="col-icon">
                <md-icon v-if="record.activeCol === 'sm_code'">
                  arrow_drop_up
                </md-icon>
                <md-icon v-else>
                  arrow_drop_down
                </md-icon>
              </div>
            </div>
            <div class="block center" style="width:12%;">Unit</div>
            <div
              class="sorting"
              style="width:20%;justify-content: flex-end"
              @click="acTiveColumn('qty', index)"
            >
              <div class="col">
                QTY
              </div>
              <div class="col-icon">
                <md-icon v-if="record.activeCol === 'qty'">
                  arrow_drop_up
                </md-icon>
                <md-icon v-else>
                  arrow_drop_down
                </md-icon>
              </div>
            </div>
            <div
              class="sorting"
              style="width:20%;justify-content: flex-end"
              @click="acTiveColumn('total_value', index)"
            >
              <div class="col">
                Total value
              </div>
              <div class="col-icon">
                <md-icon v-if="record.activeCol === 'total_value'">
                  arrow_drop_up
                </md-icon>
                <md-icon v-else>
                  arrow_drop_down
                </md-icon>
              </div>
            </div>
          </div>
          <div class="body-table-bar">
            <div
              v-if="record.details.length === 0"
              class="no-data"
              style="text-align: center;"
            >
              No data...
            </div>
            <div
              class="body-table-bar-row"
              v-for="(row, index) in record.details"
              :key="'product-tab-' + index"
              @click="selected(row, 'product')"
            >
              <div class="block" style="width:5%">{{ fmInt(index + 1) }}</div>
              <div class="block left kanit" style="width:43%;display:flex">
                <!-- <div> -->
                {{ row.sm_code }}&nbsp;{{ row.sm_name }}
                <!-- </div> -->
                <!-- <div style="padding-left:20px">{{ row.sm_name }}</div> -->
              </div>
              <div class="block center kanit" style="width:12%">
                {{ row.unit }}
              </div>
              <div class="block right" style="width:20%;padding-right:45px">
                {{ fmInt(row.qty) }}
              </div>
              <div class="block right" style="width:20%;padding-right:45px">
                {{ fm(row.total_value) }}
              </div>
            </div>
          </div>
          <div class="footer-table-bar">
            <div class="block" style="width:5%"></div>
            <div class="block left" style="width:43%;color:#2A2A2A">
              {{ fmInt(record.details.length) }}&nbsp;&nbsp;&nbsp; Items
            </div>
            <div class="block" style="width:12%;color:#2A2A2A">TOTAL</div>
            <div
              class="block right"
              style="width:20%;color:#2A2A2A;padding-right:45px"
            >
              {{ fmInt(sum('qty', record.details)) }}
            </div>
            <div
              class="block right"
              style="width:20%;color:#2A2A2A;padding-right:45px"
            >
              {{ fm(sum('total_value', record.details)) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import VueSticky from 'vue-sticky'
export default {
  name: 'product-tab',
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
      checkDropdownVal: null
    }
  },
  methods: {
    acTiveColumn (col, index) {
      if (this.data.length > 0) {
        this.$emit('sorting', col, index)
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
      this.$emit('viewq')
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
#product-tab {
  padding-top: 15px;
  width: 100%;
  .filter-bar {
    display: flex;
    padding-bottom: 20px;
    background: #ffffff;
    .title {
      text-align: left;
      color: #414141;
      font-size: 16px;
      display: flex;
    }
  }
  .big-body {
    margin-top: 20px;
    // overflow-y: auto;
    // overflow-x: hidden;
    // max-height: calc(100vh - 320px);
    .area-name {
      padding-left: 5%;
      font-weight: 700;
      font-size: 16px;
      color: #414141;
      text-align: left;
    }
    .table-bar {
      padding-left: 12%;
      padding-right: 12%;
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
          cursor: pointer;
          color: #fd7f00;
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
