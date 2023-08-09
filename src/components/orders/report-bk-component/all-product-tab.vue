<template>
  <div id="all-product-tab">
    <div class="filter-bar">
      <div style="width:18%">
        <md-search-dropdown-box
          :placeholder="'All product'"
          :data="dropdown['all_product']"
          @choose="selectAllProduct"
          @filter="filterAllProduct"
          :value="title"
        ></md-search-dropdown-box>
      </div>
      <div style="padding-left:2%;width:22%">
        <mds-search-checkbox-dropdown-box
          :placeholder="'All Product Type'"
          :data="dropdown['all_product_type']"
          @choose="selectAllProductType"
          @filter="filterAllProductType"
          :value="titletype"
        ></mds-search-checkbox-dropdown-box>
      </div>
      <div style="padding-left:2%; width:19%">
        <md-search-dropdown-box
          :placeholder="'All Back Order'"
          :data="dropdown['all_filter']"
          @choose="selectAllProductFilter"
          @filter="filterAllProduct"
          :value="titleFilter"
        ></md-search-dropdown-box>
      </div>
      <div style="width:18%;padding-left:2%">
        <md-search-box
          :placeholder="'Search Item...'"
          :data="[]"
          @clear="clearSrarch"
          :value="searchInput"
          @filter="filterSearch"
        ></md-search-box>
      </div>
      <div style="width:3%;padding-left:1%">
        <md-button
          style="height:36px;margin:0px;border-radius:3px;font-size:12px;min-width: fit-content;padding:0px 8px 0px 8px"
          :class="'-orange'"
          @click="searchData()"
          ><md-icon>search</md-icon></md-button
        >
      </div>
      <div
        style="width:20%;padding-left:2%;display:flex;justify-content: flex-end;"
      >
        <!-- @click="showMdsCard()" -->
        <md-button
          style="height:36px;margin:0 0 0 8px;border-radius:3px;font-size:12px;min-width: fit-content;"
          :class="data.length === 0 ? '-gray-A8' : '-orange'"
          @click="showMdsCard()"
          :disabled="data.length === 0 ? true : false"
          >EXPORT</md-button
        >
        <!-- <md-button
          style="height:36px;margin:0 0 0 8px;border-radius:3px;font-size:12px;min-width: fit-content;"
          :class="data.length === 0 ? '-gray-A8' : '-orange'"
          @click="exportData('excel')"
          :disabled="data.length === 0 ? true : false"
          ><md-icon>print</md-icon></md-button
        > -->
        <md-button
          style="height:36px;margin:0 0 0 8px;border-radius:3px;font-size:12px;min-width: fit-content;"
          :class="'-gray-A8'"
          @click="viewRemark()"
          >View Remark</md-button
        >
        <!-- top: data.length === 0 ? '40%': '7.2%', -->
        <!-- right: botton === 'export' ? '17%' : '6%', -->
        <div
          @mouseleave="mouseLeave"
          class="mds-card"
          v-show="showCard"
          :style="{
            top: '300px',
            right: '25%',
            width: botton === 'export' ? ' 600px' : '650px'
          }"
        >
          <div class="title">
            <div style="width:95%" class="left">
              {{ botton === 'export' ? 'Export to email' : 'Remark' }}
            </div>
            <div style="width:5%;cursor:pointer" @click="closeMdsCard()">
              <md-icon>close</md-icon>
            </div>
          </div>
          <div class="body">
            <div
              v-if="botton === 'export'"
              style="padding-left: 8%;padding-right: 9%;"
            >
              <md-input-container>
                <md-textarea v-model="emailInput"></md-textarea>
              </md-input-container>
              <div v-if="incorrectEmail.length > 0" class="email-error">
                email format is incorrect
              </div>
            </div>
            <div v-else class="remark">
              <div style="font-size:16px;padding-bottom:15px">
                <b>Back order List stored only 90 Days</b>
              </div>
              <div style="padding-left:4%;padding-bottom:5px">
                1. Backorder list of Area1,Area2,Area8,Area9 Not including
                Area3,5,6
              </div>
              <div style="padding-left:4%;padding-bottom:5px">
                2. Factory product list on Backorder of Area1,Area2,Area8,Area9
                On type A
              </div>
              <div style="padding-left:4%;padding-bottom:5px">
                3. Product from import on Backorder of Area1,Area2,Area8,Area9
                On type C
              </div>
            </div>
          </div>
          <div class="footer" v-if="botton === 'export'">
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
    </div>
    <div class="table-bar">
      <div class="head-table-bar" v-sticky="{ zIndex: 1, stickyTop: 0 }">
        <div class="block" style="width:5%">No.</div>
        <div
          class="sorting"
          style="width:7%;"
          @click="acTiveColumn('group_code')"
        >
          <div class="col">
            Group
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'group_code'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:23%"
          @click="acTiveColumn('group_name')"
        >
          <div class="col">
            Group name
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'group_name'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:12%;justify-content: flex-end"
          @click="acTiveColumn('pre_allocated')"
        >
          <div class="col">
            Pre-Allocated
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'pre_allocated'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:12%;justify-content: flex-end"
          @click="acTiveColumn('stock')"
        >
          <div class="col">
            Stock
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'stock'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:17%;justify-content: flex-end"
          @click="acTiveColumn('unresponded')"
        >
          <div class="col">Unresponded by Salesman</div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'unresponded'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:12%;justify-content: flex-end"
          @click="acTiveColumn('discontinued')"
        >
          <div class="col">
            Discontinued
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'discontinued'">
              arrow_drop_up
            </md-icon>
            <md-icon v-else>
              arrow_drop_down
            </md-icon>
          </div>
        </div>
        <div
          class="sorting"
          style="width:12%;justify-content: flex-end;"
          @click="acTiveColumn('grand_total')"
        >
          <div class="col">
            Grand total
          </div>
          <div class="col-icon">
            <md-icon v-if="activeCol === 'grand_total'">
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
          :key="'all-product-tab-' + index"
        >
          <div class="block" style="width:5%">{{ fmInt(index + 1) }}</div>
          <div class="block left" style="width:7%;">{{ row.group_code }}</div>
          <div class="block left" style="width:23%">{{ row.group_name }}</div>
          <div
            class="block under-line right pre_allocated"
            style="width:12%;padding-right:45px"
            @click="selected(row, 'pre_allocated')"
          >
            {{ fm(row.pre_allocated) }}
          </div>
          <div class="block right" style="width:12%;padding-right:45px">
            {{ fm(row.stock) }}
          </div>
          <div
            class="block under-line right unresponded"
            style="width:17%;padding-right:45px"
            @click="selected(row, 'unresponded')"
          >
            {{ fm(row.unresponded) }}
          </div>
          <div
            class="block under-line right discontinued"
            style="width:12%;padding-right:45px"
            @click="selected(row, 'discontinued')"
          >
            {{ fm(row.discontinued) }}
          </div>
          <div class="block right" style="width:12%;padding-right:45px">
            {{ fm(row.grand_total) }}
          </div>
        </div>
      </div>
      <div class="footer-table-bar">
        <div class="block" style="width:5%"></div>
        <div class="block" style="width:7%"></div>
        <div class="block right" style="width:23%;;padding-right:45px">
          TOTAL
        </div>
        <div class="block right" style="width:12%;padding-right:45px">
          {{ fm(sum('pre_allocated')) }}
        </div>
        <div class="block right" style="width:12%;padding-right:45px">
          {{ fm(sum('stock')) }}
        </div>
        <div class="block right" style="width:17%;padding-right:45px">
          {{ fm(sum('unresponded')) }}
        </div>
        <div class="block right" style="width:12%;padding-right:45px">
          {{ fm(sum('discontinued')) }}
        </div>
        <div class="block right" style="width:12%;padding-right:45px">
          {{ fm(sum('grand_total')) }}
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
  name: 'all-product-tab',
  props: {
    data: {
      type: Array,
      required: true
    },
    title: {
      required: false
    },
    titletype: {
      required: false
    },
    titleFilter: {
      required: false
    },
    dropdownvalue: {
      required: false
    },
    dropdown: {
      type: Object,
      required: true
    },
    activeCol: String,
    email: Array
  },
  data () {
    return {
      searchInput: '',
      emailInput: '',
      showCard: false,
      incorrectEmail: [],
      botton: null
      // activeCol: null
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
        // this.activeCol = this.activeCol === col ? null : col
      }
    },
    mouseLeave: function () {
      if (this.showCard == true && this.botton === 'remark') {
        // this.showCard = false
      }
    },
    showMdsCard () {
      this.botton = 'export'
      let email = ''
      if (this.email.length > 0) {
        email = _.cloneDeep(this.email[0].email)
      }
      this.emailInput = email
      this.showCard = true
    },
    closeMdsCard () {
      this.botton = null
      this.showCard = false
    },
    filterAllProductType (param) {
      this.$emit('filtertype', param)
    },
    filterAllProduct (param) {
      this.$emit('filter', param)
    },
    selected (row, feild) {
      this.$emit('selected', row, feild)
    },
    sum (feild) {
      return this.data.reduce((acc, row) => acc + parseFloat(row[feild]), 0)
    },
    viewRemark () {
      this.botton = 'remark'
      this.showCard = true
      this.$emit('remark')
    },
    searchData () {
      this.$emit('search')
    },
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
    clearSrarch () {
      this.$emit('clear')
    },
    filterSearch (param) {
      this.$emit('filterinput', param)
    },
    selectAllProduct (val) {
      this.$emit('selecteddp', val)
    },
    selectAllProductType (val) {
      this.$emit('selecteddptype', val)
    },
    selectAllProductFilter (val) {
      this.$emit('selecteddpfilter', val)
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
    }
  },
  directives: {
    sticky: VueSticky
  },
  created () {},
  components: {
    'md-search-box': require('../../Salesops/customComponent/md-search-box-no-list'),
    'md-search-dropdown-box': require('../../Salesops/customComponent/mds-search-dropdown-box'),
    'mds-search-checkbox-dropdown-box': require('../../Salesops/customComponent/mds-search-checkbox-dropdown-box')
  }
}
</script>
<style lang="scss" scoped>
#all-product-tab {
  padding-top: 15px;
  width: 100%;
  .filter-bar {
    display: flex;
    .md-dropdown-box {
      background: #ffffff;
    }
  }
  .table-bar {
    margin-top: 20px;
    .head-table-bar {
      width: 100%;
      color: #ffffff;
      display: flex;
      background: #fd7f00;
      font-size: 12px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding-right: 6px;
      font-family: roboto;
      .block {
        padding: 10px;
      }
      .block-5 {
        padding: 10px 50px 10px 10px;
      }
      .sorting {
        display: flex;
        cursor: pointer;
        padding: 0px 10px;
        .col {
          padding-top: 10px;
          padding-bottom: 10px;
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
      // overflow-y: auto;
      // overflow-x: hidden;
      // max-height: calc(100vh - 410px);
      .no-data {
        padding: 20px;
      }
      .body-table-bar-row {
        display: flex;
        width: 100%;
        .block {
          font-family: lato;
          padding: 10px;
        }
        .under-line {
          font-weight: bold;
          text-decoration: underline;
        }
        .discontinued:hover,
        .unresponded:hover,
        .pre_allocated:hover {
          font-weight: bold;
          cursor: pointer;
        }
      }
      .body-table-bar-row:hover {
        background: #f7f7f7;
        border-radius: 4px;
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
      .block {
        padding: 10px;
        font-weight: bold;
        font-size: 14px;
        font-family: lato;
      }
    }
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
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
