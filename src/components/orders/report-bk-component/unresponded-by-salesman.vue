<template>
  <div id="Unresponded-by-salesman">
    <div class="filter-bar">
      <div style="width:97%;">
        Unresponded by Salesman
      </div>
      <div style="width:3%;cursor:pointer" @click="close">
        <md-icon>close </md-icon>
      </div>
    </div>
    <div style="width:100%;" class="title">
      Group :
      <span style="font-family:kanit">
        {{
          mainrow === null ? '' : mainrow.group_code + ' ' + mainrow.group_name
        }}
      </span>
    </div>
    <div class="table-bar">
      <div class="head-table-bar" v-sticky="{ zIndex: 1, stickyTop: 0 }">
        <div class="block" style="width:3%">No.</div>
        <!-- <div class="block left" style="width:15%">Product</div> -->
        <div
          class="sorting"
          style="width:32%;"
          @click="acTiveColumn('item_code')"
        >
          <div class="col">
            Product
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'item_code'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div class="block center" style="width:6%;">Unit</div>
        <!-- <div class="block right" style="width:8%">QTY</div> -->
        <div
          class="sorting"
          style="width:8%;justify-content: flex-end;"
          @click="acTiveColumn('qty')"
        >
          <div class="col">
            QTY
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'qty'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <!-- <div class="block center" style="width:12%">Date Sent</div> -->
        <!-- <div
          class="sorting"
          style="width:12%;justify-content: center;"
          @click="acTiveColumn('date_time')"
        >
          <div class="col">
            Date Sent
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'date_time'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div> -->
        <!-- <div class="block center" style="width:6%">WH</div> -->
        <!-- <div class="block right" style="width:9%">Price</div> -->
        <div
          class="sorting"
          style="width:14%;justify-content: flex-end;"
          @click="acTiveColumn('total_value')"
        >
          <div class="col">
            Total value
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'total_value'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div class="block right" style="width:8%">DRPR</div>
        <div class="block right" style="width:8%">DNSS</div>
        <div class="block right" style="width:8%">DNPC</div>
        <div class="block right" style="width:8%">DNMT</div>
      </div>
      <div class="body-table-bar">
        <div
          v-if="data.length === 0"
          class="no-data"
          style="text-align: center;"
        >
          No data...
        </div>
        <div
          class="body-table-bar-row"
          v-for="(row, index) in data"
          :key="'Unresponded-by-salesman-' + index"
          @click="selected(row, 'product')"
        >
          <div class="block" style="width:3%">{{ fmInt(index + 1) }}</div>
          <div class="block left kanit" style="width:32%;display:flex">
            <!-- <div> -->
            {{ row.item_code }} &nbsp;{{ row.item_name }}
            <!-- </div>
            <div style="padding-left:20px">{{ row.item_name }}</div> -->
          </div>
          <div class="block center kanit" style="width:6%">
            {{ row.unit }}
          </div>
          <div class="block right" style="width:8%;padding-right:45px">
            {{ fmInt(row.qty) }}
          </div>
          <!-- <div class="block center" style="width:12%">
            {{ fmDate(row.date_time) }}
          </div> -->
          <!-- <div class="block center" style="width:6%">
            {{ row.wh }}
          </div> -->
          <!-- <div class="block right" style="width:9%">
            {{ fm(row.price) }}
          </div> -->
          <div class="block right" style="width:14%;padding-right:45px">
            {{ fm(row.total_value) }}
          </div>
          <div class="block right" style="width:8%">
            {{ fmInt(row.drpr) }}
          </div>
          <div class="block right" style="width:8%">
            {{ fmInt(row.dnss) }}
          </div>
          <div class="block right" style="width:8%">
            {{ fmInt(row.dnpc) }}
          </div>
          <div class="block right" style="width:8%">
            {{ fmInt(row.dnmt) }}
          </div>
        </div>
      </div>
      <div class="footer-table-bar">
        <div class="block" style="width:3%"></div>
        <div class="block right" style="width:32%;color:#2A2A2A">TOTAL</div>
        <div class="block" style="width:6%;"></div>
        <div
          class="block right"
          style="width:8%;color:#2A2A2A;padding-right:45px"
        >
          {{ fmInt(sum('qty')) }}
        </div>
        <!-- <div class="block " style="width:12%;"></div> -->
        <!-- <div class="block " style="width:6%;"></div> -->
        <!-- <div class="block right" style="width:9%;color:#2A2A2A">
          {{ fm(sum('price')) }}
        </div> -->
        <div
          class="block right"
          style="width:14%;color:#2A2A2A;padding-right:45px"
        >
          {{ fm(sum('total_value')) }}
        </div>
        <div class="block right" style="width:8%">
          {{ fmInt(sum('drpr')) }}
        </div>
        <div class="block right" style="width:8%">
          {{ fmInt(sum('dnss')) }}
        </div>
        <div class="block right" style="width:8%">
          {{ fmInt(sum('dnpc')) }}
        </div>
        <div class="block right" style="width:8%">
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
  name: 'unresponded-by-salesman',
  props: {
    data: {
      type: Array,
      required: true
    },
    mainrow: {
      required: true
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
    selected (row, feild) {
      this.$emit('selected', row, feild)
    },
    close () {
      this.$emit('close')
    },
    sum (feild) {
      return this.data.reduce((acc, row) => acc + parseFloat(row[feild]), 0)
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
        'YYYY-MM-DD HH:MM:ss'
      ]).format()

      if (checkFM == 'Invalid date') {
        return ''
      } else {
        return moment(value).format('DD/MM/YYYY HH:MM:ss')
      }
    }
  },
  directives: {
    sticky: VueSticky
  },
  created () {},
  components: {}
}
</script>
<style lang="scss" scoped>
#Unresponded-by-salesman {
  .filter-bar {
    padding: 15px 30px;
    background: #efefef;
    display: flex;
    font-weight: bold;
    font-family: roboto;
    font-size: 16px;
  }
  .title {
    padding: 40px 0px 0px 30px;
    text-align: left;
    color: #414141;
    font-size: 16px;
  }
  .table-bar {
    padding: 30px;
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
      // border-right: 1px solid rgba(0, 0, 0, 0.07);
      // border-left: 1px solid rgba(0, 0, 0, 0.07);
      overflow-y: auto;
      overflow-x: hidden;
      max-height: calc(100vh - 240px);
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
