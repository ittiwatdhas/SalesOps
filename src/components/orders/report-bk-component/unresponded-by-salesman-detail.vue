<template>
  <div id="Unresponded-by-salesman">
    <div class="filter-bar">
      <div style="width:97%;">
        Unresponded by Salesman - Details
      </div>
      <div style="width:3%;cursor:pointer" @click="close">
        <md-icon>close </md-icon>
      </div>
    </div>
    <div style="width:100%;" class="title">
      Product :
      <span style="font-family:kanit">
        {{
          mainrow === null ? '' : mainrow.item_code + ' ' + mainrow.item_name
        }}
      </span>
    </div>
    <div class="table-bar">
      <div class="head-table-bar">
        <div class="block" style="width:5%">No.</div>
        <div class="sorting" style="width:10%;" @click="acTiveColumn('sm_code')">
          <div class="col">
            Salesman
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'sm_code'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div class="block center" style="width:20%">Customer</div>
        <div class="block center" style="width:7%;">Unit</div>
        <div class="sorting" style="width:10%;justify-content: flex-end;" @click="acTiveColumn('qty')">
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

        <div class="block center" style="width:6%">WH</div>

        <div class="sorting" style="width:14%;justify-content: center;" @click="acTiveColumn('po_no')">
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
        <div class="sorting" style="width:12%;justify-content: center;" @click="acTiveColumn('po_date')">
          <div class="col">
            PO Date
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
        <div class="sorting" style="width:12%;justify-content: center;" @click="acTiveColumn('send_to_sm')">
          <div class="col">
            Date Sent
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'send_to_sm'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div class="block right" style="width:10%">Price</div>
      </div>
      <div class="body-table-bar">
        <div v-if="data.length === 0" class="no-data" style="text-align: center;">
          No data...
        </div>
        <div class="body-table-bar-row" v-for="(row, index) in data" :key="'Unresponded-by-salesman-' + index"
          @click="selected(row, 'product')">
          <div class="block" style="width:5%">{{ fmInt(index + 1) }}</div>
          <div class="block center kanit" style="width:10%">
            {{ row.sm_code }}
          </div>
          <div class="block left kanit" style="width:20%;display:flex">
            {{ row.customer_code }}&nbsp;{{ row.customer_name }}
            <!-- <div>
              {{ row.customer_code }}
            </div>
            <div style="padding-left:20px">{{ row.customer_name }}</div> -->
          </div>
          <div class="block center kanit" style="width:7%">
            {{ row.unit }}
          </div>
          <div class="block right" style="width:10%;padding-right:45px">
            {{ fmInt(row.qty) }}
          </div>
          <div class="block center" style="width:6%">
            {{ row.WH }}
          </div>
          <div class="block center" style="width:14%">
            {{ row.po_no }}
          </div>
          <div class="block center" style="width:12%">
            {{ fmDate(row.po_date) }}
          </div>
          <div class="block center" style="width:12%">
            {{ fmDate(row.send_to_sm) }}
          </div>
          <div class="block right" style="width:10%">
            {{ fm(row.price) }}
          </div>
        </div>
      </div>
      <div class="footer-table-bar">
        <div class="block" style="width:5%"></div>
        <div class="block" style="width:10%"></div>
        <div class="block right" style="width:20%;color:#2A2A2A">TOTAL</div>
        <div class="block " style="width:4%;"></div>
        <div class="block right" style="width:10%;color:#2A2A2A;padding-right:45px">
          {{ fmInt(sum('qty')) }}
        </div>
        <div class="block right" style="width:14%"></div>
        <div class="block right" style="width:12"></div>
        <div class="block right" style="width:12"></div>
        <div class="block right" style="width:10%"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
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
  data() {
    return {
      searchInput: '',
      allProductList: [],
      allProducTypetList: [],
      activeCol: null
    }
  },
  methods: {
    acTiveColumn(col) {
      if (this.data.length > 0) {
        if (this.activeCol === col) {
          this.$emit('sorting', { col: col, sorting: 'asc' })
        } else {
          this.$emit('sorting', { col: col, sorting: 'desc' })
        }
        this.activeCol = this.activeCol === col ? null : col
      }
    },
    selected(row, feild) {
      this.$emit('selected', row, feild)
    },
    close() {
      this.$emit('close')
    },
    sum(feild) {
      return this.data.reduce((acc, row) => acc + parseFloat(row[feild]), 0)
    },
    fmInt(value) {
      return this.$store.getters['globalfunc/formatNumberInt'](value)
    },
    fm(value) {
      if (parseInt(value) === 0 || value === '0') {
        return this.$store.getters['globalfunc/formatNumberInt'](value)
      } else {
        return this.$store.getters['globalfunc/formatNumber'](value)
      }
    },
    fmDate(value) {
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
  created() { },
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
        // cursor: pointer;
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
