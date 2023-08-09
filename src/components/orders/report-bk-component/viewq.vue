<template>
  <div id="viewq">
    <div class="filter-bar">
      <div style="width:97%;">
        Queue List
      </div>
      <div style="width:3%;cursor:pointer" @click="close">
        <md-icon>close </md-icon>
      </div>
    </div>
    <div style="width:100%;display:flex">
      <div style="width:85%;" class="title">
        Product :
        <span style="font-family:kanit">
          {{ displayTitle() }}
        </span>
      </div>
      <div style="width:15%;padding-right:30px;text-align: end;" class="title">
        <md-button
          style="height:36px;margin:0 0 0 8px;border-radius:3px;font-size:12px;min-width: fit-content;"
          :class="data.length === 0 ? '-gray-A8' : '-orange'"
          @click="showMdsCard()"
          :disabled="data.length === 0 ? true : false"
          >EXPORT</md-button
        >
      </div>
      <div
        class="mds-card"
        v-show="showCard"
        :style="{
          top: '300px',
          right: '25%',
          width: '600px'
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
    </div>
    <div class="table-bar">
      <div class="head-table-bar">
        <div class="block" style="width:5%">No.</div>
        <div class="block" style="width:33%">Customer</div>
        <div class="block" style="width:10%">Salesman</div>
        <div class="block" style="width:13%">PO NO.</div>
        <div class="block" style="width:10%">QTY</div>

        <!-- <div
          class="sorting"
          style="width:33%;"
          @click="acTiveColumn('customer_code')"
        >
          <div class="col">
            Customer
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'customer_code'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div> -->
        <!-- <div
          class="sorting"
          style="width:10%;"
          @click="acTiveColumn('sm_code')"
        >
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
        </div> -->
        <!-- <div
          class="sorting"
          style="width:13%;justify-content: center"
          @click="acTiveColumn('po_no')"
        >
          <div class="col">
            PO NO.
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'po_no'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div> -->
        <!-- <div
          class="sorting"
          style="width:10%;justify-content: flex-end"
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
        </div> -->
        <div class="block center" style="width:7%;">Unit</div>
        <div class="block right" style="width:10%">Price</div>
        <div class="block right" style="width:12%">Total value</div>
        <!-- <div
          class="sorting"
          style="width:12%;justify-content: flex-end"
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
        </div> -->
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
          :key="'viewq-' + index"
          @click="selected(row, 'product')"
        >
          <div class="block" style="width:5%">{{ fmInt(index + 1) }}</div>
          <div class="block left" style="width:33%;display:flex">
            <div>
              {{ row.customer_code }}
            </div>
            <div style="padding-left:20px;font-family:kanit">
              {{ row.customer_name }}
            </div>
          </div>
          <div class="block center" style="width:10%;padding-right:45px">
            {{ row.sm_code }}
          </div>
          <div class="block center" style="width:13%;padding-right:45px">
            {{ row.po_no }}
          </div>
          <div class="block right" style="width:10%;padding-right:45px">
            {{ fmInt(row.qty) }}
          </div>
          <div class="block center kanit" style="width:7%">
            {{ row.unit }}
          </div>
          <div class="block right" style="width:10%">
            {{ fm(row.price) }}
          </div>
          <div class="block right" style="width:12%;padding-right:45px">
            {{ fm(row.total_value) }}
          </div>
        </div>
      </div>
      <div class="footer-table-bar">
        <div class="block" style="width:5%"></div>
        <div class="block" style="width:33%;"></div>
        <div class="block center " style="width:13%;color:#2A2A2A">TOTAL</div>
        <div class="block" style="width:10%;"></div>
        <div class="block right" style="width:10%;padding-right:45px">
          {{ fmInt(sum('qty')) }}
        </div>
        <div class="block " style="width:7%;"></div>
        <div
          class="block right"
          style="width:22%;color:#2A2A2A;padding-right:50px"
        >
          {{ fm(sum('total_value')) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'

export default {
  name: 'discontinued',
  props: {
    data: {
      type: Array,
      required: true
    },
    mainrow: {
      required: true
    },
    email: Array
  },
  data () {
    return {
      searchInput: '',
      allProductList: [],
      allProducTypetList: [],
      activeCol: null,
      emailInput: '',
      showCard: false,
      incorrectEmail: []
    }
  },
  methods: {
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
          this.$emit('export', checkMailTrue)
        }
      } else {
        this.$emit('export', mode)
      }
    },
    showMdsCard () {
      let email = ''
      if (this.email.length > 0) {
        email = _.cloneDeep(this.email[0].email)
      }
      this.emailInput = email
      this.showCard = true
    },
    closeMdsCard () {
      this.showCard = false
    },
    displayTitle () {
      if (this.mainrow === null) {
        return ''
      } else {
        let str = ''
        if (_.isUndefined(this.mainrow.product_no)) {
          str = this.mainrow.code + ' ' + this.mainrow.title
        } else {
          str =
            this.mainrow.product_no === 'all'
              ? this.mainrow.product_no + ' Product'
              : this.mainrow.product_no + ' ' + this.mainrow.product_name
        }
        return str
      }
    },
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
        'YYYY-MM-DD HH:mm:ss'
      ]).format()

      if (checkFM == 'Invalid date') {
        return ''
      } else {
        return moment(value).format('DD/MM/YYYY HH:MM')
      }
    }
  },
  created () {},
  components: {}
}
</script>
<style lang="scss" scoped>
#viewq {
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
      max-height: calc(100vh - 235px);
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
