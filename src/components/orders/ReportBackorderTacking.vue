<template>
  <div id="pageReportBKOrderTracking">
    <div v-if="login == false" class="mt-60">
      <waring-login></waring-login>
    </div>
    <div v-if="login == true" class="scroll-bar">
      <div>
        <md-spinner
          style="position: absolute;padding-top:35%;z-index: 3"
          :md-size="150"
          :md-stroke="1"
          v-show="spinnerLoading"
          md-indeterminate
        ></md-spinner>
      </div>
      <div
        v-show="spinnerLoading"
        style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 90%;"
      ></div>
      <md-layout md-align="start" md-flex="100" class="md-topic">{{
        pageName
      }}</md-layout>
      <md-layout md-align="center" style=" padding: 20px 50px;">
        <div class="tabs">
          <div
            @click="selectedTabs(row.code)"
            v-for="row in tabData"
            :key="row.code + 'tabs'"
            :class="activeTab === row.code ? 'head-tabs active' : 'head-tabs'"
          >
            {{ row.desc }}
          </div>
        </div>
        <div class="tabs-body">
          <all-product-tab
            v-if="activeTab === 1"
            :data="dataALLProductList"
            @filter="getAllProductDropdown"
            @filtertype="getProductTypeDropdown"
            @filterinput="filterinputAllProduct"
            @selected="selecteAllBackorder"
            @selecteddp="selectAllProduct"
            @selecteddptype="selectAllProductType"
            @selecteddpfilter="selectAllProductFilter"
            @search="searchAllProduct"
            @export="exportData"
            @remark="viewRemark"
            @clear="clearInput"
            @sorting="sortingAllProduct"
            :dropdown="allProductDropdown"
            :dropdownvalue="allProductTypeRow"
            :title="allProductTitle"
            :titletype="allProductTypeTitle"
            :titleFilter="allProductTitleFilter"
            :activeCol="activeColTab1"
            :email="email"
          ></all-product-tab>
          <product-group-tab
            v-else-if="activeTab === 2"
            :data="dataProductGroupList"
            :mainrow="productGroupRow"
            :title="productGroupTitle"
            @selected="selectedProductGroup"
            @selectdp="selectProductGroupDP"
            @filterdp="filterProductGroup"
            @search="searchProductGroup"
            @filterinput="filterinputProductGroup"
            @sorting="sortingProductGroup"
            :dropdown="productGroupDropdown"
          ></product-group-tab>
          <product-tab
            v-else-if="activeTab === 3"
            :data="dataProductList"
            :mainrow="productRow"
            :title="productTitle"
            @selectdp="selectDropdownProduct"
            @selected="selectedProduct"
            @filterdp="filterProduct"
            @search="searchProductData"
            @filterinput="filterinputProduct"
            @viewq="viewQueue"
            @sorting="sortingProduct"
            :dropdown="productDropdown"
          ></product-tab>
          <customer-tab
            v-else-if="activeTab === 4"
            :data="dataList"
            :title="customerTitle"
            :dropdown="customerDropdown"
            :mainrow="customerRow"
            @selectdp="selectDropdownCustomer"
            @filterdp="filterCustomer"
            @filterinput="filterinputCustomer"
            @search="searchCustomer"
            @sorting="sortingCustomer"
          ></customer-tab>

          <md-dialog
            md-open-from="#custom"
            md-close-to="#custom"
            ref="dialog1"
            id="reprt-bk-dialog"
          >
            <md-dialog-content>
              <div style="padding-left:45%">
                <md-spinner
                  style="position: absolute;padding-top:45%;z-index: 3;"
                  :md-size="150"
                  :md-stroke="1"
                  v-show="spinnerLoadingDP"
                  md-indeterminate
                ></md-spinner>
              </div>
              <div
                v-show="spinnerLoadingDP"
                style="z-index: 8;

            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"
              ></div>
              <unresponded-by-salesman
                v-if="activeUnresponded"
                :data="unrespondedList"
                :mainrow="unrespondedListRow"
                @selected="selectedUnresponded"
                @close="closeUnresponded"
                @sorting="sortingUnresponded"
              ></unresponded-by-salesman>
              <discontinued
                v-if="activeDiscontinued"
                :data="discontinuedList"
                :mainrow="discontinuedListRow"
                @close="closeDiscontinued"
                @sorting="sortingDiscontinued"
              ></discontinued>
              <viewq
                v-if="activeViewq"
                :data="viewqList"
                :mainrow="viewqListRow"
                @sorting="sortingViewq"
                @close="closeViewq"
                :email="email"
                @export="exportDataViewQ"
              ></viewq>
            </md-dialog-content>
          </md-dialog>
          <md-dialog
            md-open-from="#custom"
            md-close-to="#custom"
            ref="dialog2"
            id="reprt-bk-dialog2"
          >
            <md-dialog-content>
              <unresponded-by-salesman-detail
                :data="unrespondedDetailList"
                :mainrow="unrespondedDetailListRow"
                @close="closeUnrespondedDetail"
                @sorting="sortingUnrespondedDetail"
              ></unresponded-by-salesman-detail>
            </md-dialog-content>
          </md-dialog>
          <md-dialog ref="md-confirm-dialog">
            <md-dialog-title>{{ titleCF }}</md-dialog-title>
            <md-dialog-content></md-dialog-content>
            <md-dialog-actions>
              <md-button @click="closeCF" style="color:#fd7f00">OK</md-button>
            </md-dialog-actions>
          </md-dialog>
        </div>
      </md-layout>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import service from '@/services/orders/reportbackordertracking'
export default {
  name: 'back-order-tracking',
  data () {
    return {
      pageName: 'Back Order Tracking Report',
      spinnerLoading: false,
      spinnerLoadingDP: false,
      tabData: [
        { code: 1, desc: 'All Backorder' },
        { code: 2, desc: 'Product Group' },
        { code: 3, desc: 'Product' },
        { code: 4, desc: 'Customer' }
      ],
      activeTab: 1,
      searchInput: '',
      allProductList: [],
      allProducTypetList: [],
      dataList: [],
      productGroupRow: { group_code: 'all' },
      // productGroupRow: null,
      productRow: { product_no: 'all' },
      // productRow: null,
      productTitle: null,
      activeUnresponded: false,
      unrespondedList: [],
      unrespondedDetailList: [],
      unrespondedListRow: null,
      unrespondedDetailListRow: null,
      activeDiscontinued: false,
      discontinuedList: [],
      discontinuedListRow: null,
      productDropdown: [],
      productDropdownTemp: [],
      customerRow: { product_no: 'all', sm_code: 'all' },
      // customerRow: null,
      customerTitle: null,
      allProductDropdown: {
        all_product: [],
        all_product_type: [],
        all_filter: [],
      },
      allProductDropdownTemp: [],
      allProductTitle: null,
      allProductTitleFilter: null,
      allProductRow: null,
      allBackOrder: null,
      allProductTypeTitle: null,
      allProductTypeRow: [],
      keywordAllProduct: '',
      productGroupDropdown: [],
      productGroupDropdownTemp: [],
      productGroupTitle: null,
      keywordProductGroup: '',
      keywordProduct: '',
      keywordCustomer: '',
      customerDropdown: [],
      customerDropdownTemp: [],
      viewqList: [],
      viewqListRow: null,
      activeViewq: false,
      sortingCustomers: null,
      sortingProductGroups: null,
      sortingAllProducts: null,
      sortingUnrespondeds: null,
      sortingUnrespondedDetails: null,
      sortingDiscontinueds: null,
      sortingQueues: null,
      sortingProducts: null,
      dataALLProductList: [],
      dataProductGroupList: [],
      dataProductList: [],
      tab4dp: { product_no: 'all' },
      activeColTab1: null,
      titleCF: '',
      email: []
    }
  },
  computed: {
    spinner () {
      return false
    }
  },
  methods: {
    sortingViewq (value) {
      this.sortingQueues = value
      this.viewQueue()
    },
    sortingDiscontinued (value) {
      this.sortingDiscontinueds = value
      this.searchDiscontinued(null)
    },
    sortingUnrespondedDetail (value) {
      this.sortingUnrespondedDetails = value
      this.selectedUnresponded(null)
    },
    sortingUnresponded (value) {
      this.sortingUnrespondeds = value
      this.searchUnresponded()
    },
    sortingCustomer (value) {
      this.sortingCustomers = value
      this.searchCustomer()
    },
    sortingProduct (col, index) {
      let data = this.dataProductList[index]
      let dataRow = _.cloneDeep(this.dataProductList[index])
      if (data.activeCol === col) {
        data.activeCol = null
        data.activeSort = 'asc'
        dataRow.activeCol = col
        dataRow.activeSort = 'asc'
      } else {
        data.activeCol = col
        data.activeSort = 'desc'
        dataRow.activeCol = col
        dataRow.activeSort = 'desc'
      }
      this.sortingProducts = dataRow
      this.searchProduct()
    },
    sortingProductGroup (value) {
      this.sortingProductGroups = value
      this.searchProductGroup()
    },
    sortingAllProduct (value) {
      this.sortingAllProducts = value
      this.activeColTab1 = this.activeColTab1 === value.col ? null : value.col
      this.searchAllProduct()
    },
    selectDropdownCustomer (val) {
      this.tab4dp = val
      this.customerTitle = val.code + ' ' + val.title
    },
    closeDiscontinued () {
      this.activeDiscontinued = false
      this.$refs['dialog1'].close()
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    },
    closeViewq () {
      this.activeViewq = false
      this.$refs['dialog1'].close()
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    },
    selectedUnresponded (row) {
      if (row !== null) {
        this.unrespondedDetailListRow = row
      }
      let obj = {
        unresponded_detail: this.unrespondedDetailListRow,
        unresponded: this.unrespondedListRow,
        feild:
          this.sortingUnrespondedDetails === null
            ? 'sm_code'
            : this.sortingUnrespondedDetails.col,
        sorting:
          this.sortingUnrespondedDetails === null
            ? 'asc'
            : this.sortingUnrespondedDetails.sorting,
        area: this.allProductRow,
        type: this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : ""
      }
      this.spinnerLoadingDP = true
      service
        .searchUnrespondedDetail(obj)
        .then(response => {
          this.unrespondedDetailList = response
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
          setTimeout(() => {
            this.spinnerLoadingDP = false
            if (row !== null) {
              this.$refs['dialog2'].open()
            }
          }, 200)
        })
        .catch()
    },
    closeUnresponded () {
      this.activeUnresponded = false
      this.$refs['dialog1'].close()
      document.getElementsByTagName('html')[0].style.overflow = 'auto'
    },
    closeUnrespondedDetail () {
      this.$refs['dialog2'].close()
    },
    selecteAllBackorder (row, feild) {
      if (feild === 'pre_allocated') {
        this.productGroupRow = row
        this.productGroupTitle = row.group_code + ' ' + row.group_name
        this.selectedTabs(2)
        this.searchProductGroup()
      } else if (feild === 'unresponded') {
        this.unrespondedListRow = row
        this.searchUnresponded()
      } else if (feild === 'discontinued') {
        this.discontinuedListRow = row
        this.searchDiscontinued()
      }
    },
    viewQueue () {
      this.viewqListRow = this.productRow
      let obj = {
        queue: this.viewqListRow,
        feild:
          this.sortingQueues === null
            ? 'customer_code'
            : this.sortingQueues.col,
        sorting:
          this.sortingQueues === null ? 'asc' : this.sortingQueues.sorting
      }
      this.spinnerLoading = true
      service
        .searchViewqList(obj)
        .then(response => {
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
          this.viewqList = response
          setTimeout(() => {
            this.spinnerLoading = false
            if (this.activeViewq !== true) {
              this.activeViewq = true
              this.$refs['dialog1'].open()
            }
          }, 200)
        })
        .catch()
    },
    selectedTabs (val) {
      if (val === 1) {
        if (this.activeTab !== val) {
          if (_.trim(this.keywordAllProduct).length > 0) {
            this.keywordAllProduct = ''
            this.searchAllProduct()
          }
        }
        // this.getDropdownData('all_backorder')
      } else if (val === 2) {
        if (this.activeTab !== val) {
          this.filterProductGroup('tabs')
          if (_.trim(this.keywordProductGroup).length > 0) {
            this.keywordProductGroup = ''
            this.searchProductGroup()
          }
        }
      } else if (val === 3) {
        if (this.activeTab !== val) {
          this.filterProduct(null)
          if (_.trim(this.keywordProduct).length > 0) {
            this.keywordProduct = ''
            this.searchProduct()
          }
        }
      } else if (val === 4) {
        if (this.activeTab !== val) {
          this.filterCustomer(null)
          if (_.isNull(this.customerTitle)) {
            if (this.productRow.product_no !== 'all') {
              this.customerTitle = _.isUndefined(this.productRow.product_no)
                ? this.productRow.code + ' ' + this.productRow.title
                : this.productRow.product_no +
                  ' ' +
                  this.productRow.product_name
              // this.customerTitle =
              //   this.productRow.product_no + ' ' + this.productRow.product_name
            }
            this.tab4dp = this.productRow
          }
          if (_.trim(this.keywordCustomer).length > 0) {
            this.keywordCustomer = ''
            this.searchCustomer()
          }
        }
      }
      this.activeTab = val
    },
    selectedProductGroup (row, feild) {
      this.productRow = row
      this.productTitle = row.product_no + ' ' + row.product_name
      this.selectedTabs(3)
      this.sortingProducts = null
      this.searchProduct()
    },
    selectedProduct (row, feild) {
      this.customerRow = row
      let product_no = _.isUndefined(this.productRow.product_no)
        ? this.productRow.code
        : this.productRow.product_no

      if (product_no !== 'all') {
        this.customerTitle = _.isUndefined(this.productRow.product_no)
          ? this.productRow.code + ' ' + this.productRow.title
          : this.productRow.product_no + ' ' + this.productRow.product_name
      }

      if (!_.isUndefined(row.item_code)) {
        this.customerTitle = row.item_code + ' ' + row.item_name
      }
      this.tab4dp = this.productRow
      this.selectedTabs(4)
      this.searchCustomer()
    },
    //--TAB CUSTOMER -----
    selecCustomerpDP (val) {
      this.customerRow = val
      this.customerTitle = val.code + ' ' + val.title
    },
    filterCustomer (param) {
      let group = 'all'
      if (_.isUndefined(this.productGroupRow.group_code)) {
        group = this.productGroupRow.code
      } else {
        group = this.productGroupRow.group_code
      }
      let obj = {
        area: this.allProductRow,
        type: this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
        product_no: _.isUndefined(this.productRow.product_no)
          ? this.productRow.code
          : this.productRow.product_no,
        search: _.trim(param),
        salesman: this.customerRow.sm_code,
        group_code: group
      }
      if (_.trim(param).length > 2) {
        service
          .getDropdownCust(obj)
          .then(response => {
            this.customerDropdown = response
          })
          .catch()
      } else if (_.trim(param).length === 0) {
        service
          .getDropdownCust(obj)
          .then(response => {
            this.customerDropdown = response
          })
          .catch()
      }
    },
    filterinputCustomer (param) {
      this.keywordCustomer = _.trim(param)
    },
    searchCustomer (mode) {
      let prd = _.isUndefined(this.tab4dp.product_no)
        ? this.tab4dp.code
        : this.tab4dp.product_no
      if (prd !== 'all') {
        let obj = {
          area: this.allProductRow,
          type: this.allProductTypeRow,
          filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
          product_no: _.isUndefined(this.tab4dp.product_no)
            ? this.tab4dp.code
            : this.tab4dp.product_no,
          cust_name: this.keywordCustomer,
          sm_code: this.customerRow.sm_code,
          feild:
            this.sortingCustomers === null
              ? 'cust_code'
              : this.sortingCustomers.col,
          sorting:
            this.sortingCustomers === null
              ? 'asc'
              : this.sortingCustomers.sorting,
          start: mode === 'scroll' ? this.dataList.length + 1 : 1,
          limit: 100000
        }
        this.spinnerLoading = true
        service
          .searchCustomer(obj)
          .then(response => {
            this.dataList = response
            setTimeout(() => {
              this.spinnerLoading = false
            }, 200)
          })
          .catch()
      } else {
        this.titleCF = 'Please select product '
        this.$refs['md-confirm-dialog'].open()
      }
    },
    //--TAB PRODUCT -----
    filterProduct (param) {
      let group = 'all'
      if (_.isUndefined(this.productGroupRow.group_code)) {
        group = this.productGroupRow.code
      } else {
        group = this.productGroupRow.group_code
      }

      let obj = {
        area: this.allProductRow,
        type: this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
        search: _.isNull(param) ? 'all' : param,
        group_code: group
      }
      if (_.trim(param).length > 2) {
        service
          .filterProduct(obj)
          .then(response => {
            this.productDropdown = response
          })
          .catch()
      } else if (_.trim(param).length === 0) {
        service
          .filterProduct(obj)
          .then(response => {
            this.productDropdown = response
          })
          .catch()
      }
    },
    filterinputProduct (param) {
      this.keywordProduct = _.trim(param)
    },
    searchProductData () {
      this.sortingProducts = null
      this.searchProduct()
    },
    searchProduct (mode) {
      if (this.productRow.product_no !== 'all') {
        let obj = {
          area: this.allProductRow,
          type: this.allProductTypeRow,
          filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
          item_name: this.productRow,
          search: this.keywordProduct,
          feild:
            this.sortingProducts === null
              ? 'sm_code'
              : this.sortingProducts.activeCol,
          sorting:
            this.sortingProducts === null
              ? 'asc'
              : this.sortingProducts.activeSort,
          start: 1,
          limit: 1000000
        }

        this.spinnerLoading = true
        service
          .searchProduct(obj)
          .then(response => {
            let selectdProduct =
              this.sortingProducts === null
                ? null
                : this.sortingProducts.area_code
            if (selectdProduct === null) {
              this.dataProductList = response
            } else {
              let index = _.findIndex(response, function (o) {
                return o.area_code === selectdProduct
              })
              if (index >= 0) {
                let indexMain = _.findIndex(this.dataProductList, function (o) {
                  return o.area_code === selectdProduct
                })
                if (indexMain >= 0) {
                  this.dataProductList[indexMain].details =
                    response[index].details
                }
              }
            }

            setTimeout(() => {
              this.spinnerLoading = false
            }, 200)
          })
          .catch()
      } else {
        this.titleCF = 'Please select product '
        this.$refs['md-confirm-dialog'].open()
      }
    },
    closeCF () {
      this.$refs['md-confirm-dialog'].close()
    },
    //--TAB PRODUCT GROUP-----
    selectDropdownProduct (val) {
      this.productTitle = val.code + ' ' + val.title
      this.productRow = val
    },
    selectProductGroupDP (val) {
      this.productGroupRow = val
      this.productGroupTitle = val.code + ' ' + val.title
    },
    filterProductGroup (param) {
      let code = this.productGroupRow.group_code
      let search_group = 'all'
      if (param !== 'tabs') {
        search_group = _.trim(param).length > 0 ? _.trim(param) : 'all'
      }
      let obj = {
        area: code === 'all' ? '' : this.allProductRow,
        type: code === 'all' ? '' : this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
        search_group: search_group,
        search_area: code === 'all' ? '' : this.keywordAllProduct
      }
      if (_.trim(param).length > 2) {
        console.log('===>', param)
        service
          .getDropdownProductGroup(obj)
          .then(response => {
            this.productGroupDropdown = response
          })
          .catch()
      } else if (_.trim(param).length === 0) {
        this.productGroupRow = { group_code: 'all' }
        service
          .getDropdownProductGroup(obj)
          .then(response => {
            this.productGroupDropdown = response
          })
          .catch()
      }
    },
    filterinputProductGroup (param) {
      this.keywordProductGroup = _.trim(param)
    },
    searchProductGroup (mode) {
      let obj = {
        area: this.allProductRow,
        type: this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
        group_code: _.isUndefined(this.productGroupRow.group_code)
          ? this.productGroupRow.code
          : this.productGroupRow.group_code,
        product_name: this.keywordProductGroup,
        feild:
          this.sortingProductGroups === null
            ? 'product_no '
            : this.sortingProductGroups.col,
        sorting:
          this.sortingProductGroups === null
            ? 'asc'
            : this.sortingProductGroups.sorting,
        start: mode === 'scroll' ? this.dataProductGroupList.length + 1 : 1,
        limit: 100000
      }
      this.spinnerLoading = true
      service
        .searchProductGroup(obj)
        .then(response => {
          this.dataProductGroupList = response

          setTimeout(() => {
            this.spinnerLoading = false
          }, 200)
        })
        .catch()
    },
    //--TAB ALL BACKORDER -----
    viewRemark () {
      console.log('viewRemark')
    },
    exportData (val) {
      let all_product_type = this.allProductDropdown.all_product_type
      let data = _.filter(all_product_type, function (o) {
        return o.checked && o.code !== 'all'
      })
      let code = _.map(data, 'code')
      if (val === 'excel') {
        window.location.href =
          Vue.config['url'] +
          'backorder/export_backorder_tracking' +
          '?area=' +
          this.allProductRow.keyword +
          '&type=' +
          code.toString() +
          '&filter_bk=' +
          this.allBackOrder.keyword +
          '&search=' +
          _.trim(this.keywordAllProduct)
      } else {
        this.spinnerLoading = true
        let obj = {
          search: _.trim(this.keywordAllProduct),
          area: this.allProductRow.keyword,
          type: code.toString(),
          filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
          email: val
        }
        service
          .gSheets(obj)
          .then(response => {
            this.spinnerLoading = false
          })
          .catch()
      }
    },
    exportDataViewQ (val) {
      this.spinnerLoading = true
      let obj = {
        queue: this.viewqListRow,
        feild:
          this.sortingQueues === null
            ? 'customer_code'
            : this.sortingQueues.col,
        sorting:
          this.sortingQueues === null ? 'asc' : this.sortingQueues.sorting,
        email: val
      }
      service
        .gSheetsViewQ(obj)
        .then(response => {
          this.spinnerLoading = false
        })
        .catch()
    },
    selectAllProduct (val) {
      this.allProductRow = val
      if (val.keyword === 'top_product') {
        this.sortingAllProducts = {
          col: 'pre_allocated',
          sorting: 'desc'
        }
        this.activeColTab1 = 'pre_allocated'
      } else {
        this.sortingAllProducts = null
      }

      if (val.code === 'all') {
        this.allProductTitle = val.title
      } else {
        this.allProductTitle = val.code + ' ' + val.title
      }
    },
    selectAllProductFilter(val) {
      this.allBackOrder = val;
      if(val.keyword === 'all_bk' || val.keyword === 'pre_allowcated' || val.keyword === 'unresponded') {
          this.allProductTitleFilter = val.title
      }
    },
    getAllProductDropdown (param) {
      if (_.trim(param).length > 2) {
        service
          .getAllProductDropdown(_.trim(param))
          .then(response => {
            this.email = response.email
            this.allProductDropdown.all_product = response.data
            this.allProductDropdown.all_filter = response.filter
          })
          .catch()
      } else if (_.trim(param).length === 0) {
        service
          .getAllProductDropdown(_.trim(param))
          .then(res => {
            this.email = res.email
            let response = res.data
            this.allProductDropdown.all_product = response
            this.allProductDropdown.all_filter = res.filter
            if (this.allProductTitle === null && this.allProductRow === null) {
              if (response[0].code === 'all') {
                this.allProductTitle = response[0].title
              } else {
                this.allProductTitle =
                  response[0].code + ' ' + response[0].title
              }
              this.allProductRow = response[0]
            }

            if(this.allProductTitleFilter === null) {
              this.allProductTitleFilter = res.filter[0].title
            }
          })
          .catch()
      }
    },
    filterinputAllProduct (param) {
      this.keywordAllProduct = _.trim(param)
    },
    clearInput () {
      this.keywordAllProduct = ''
    },
    selectAllProductType (val) {
      let data = _.cloneDeep(this.allProductDropdown.all_product_type)
      let all_product_type = this.allProductDropdown.all_product_type
      let index = _.findIndex(all_product_type, function (o) {
        return o.code == val.code
      })
      if (index >= 0) {
        this.allProductDropdown.all_product_type[index].checked = !val.checked
      }
      if (val.code === 'all') {
        data.forEach(element => {
          element.checked = val.checked
        })
        this.allProductDropdown.all_product_type = data
        if (val.checked) {
          this.allProductTypeRow = _.filter(all_product_type, function (o) {
            return o.checked && o.code !== 'all'
          })
          let str = ''
          if (
            this.allProductTypeRow.length - 2 !==
            all_product_type.length - 1
          ) {
            this.allProductTypeTitle = ''
          } else {
            this.allProductTypeRow.forEach(element => {
              str += element.code + ' ' + element.title + ' ,'
            })
            this.allProductTypeTitle = str.substring(0, _.trim(str).length - 1)
          }
        } else {
          this.allProductTypeTitle = ''
        }
      } else {
        let type = _.cloneDeep(this.allProductDropdown.all_product_type)
        if (val.checked) {
          let checkTrue = _.filter(type, function (o) {
            return o.checked
          })
          if (type.length - 1 === checkTrue.length) {
            let indexs = _.findIndex(all_product_type, function (o) {
              return o.code == 'all'
            })
            if (indexs >= 0) {
              this.allProductDropdown.all_product_type[indexs].checked = true
            }
          }
          this.allProductTypeRow = _.filter(type, function (o) {
            return o.checked && o.code !== 'all'
          })
          let str = ''
          if (this.allProductTypeRow.length === type.length - 1) {
            this.allProductTypeTitle = ''
          } else {
            this.allProductTypeRow.forEach(element => {
              str += element.code + ' ' + element.title + ' ,'
            })
            this.allProductTypeTitle = str.substring(0, _.trim(str).length - 1)
          }
        } else {
          let type = _.cloneDeep(this.allProductDropdown.all_product_type)
          let checkTrue = _.filter(type, function (o) {
            return o.checked
          })
          if (type.length - 1 !== checkTrue.length - 1) {
            let indexs = _.findIndex(all_product_type, function (o) {
              return o.code == 'all'
            })
            if (indexs >= 0) {
              this.allProductDropdown.all_product_type[indexs].checked = false
            }
          }
          this.allProductTypeRow = _.filter(type, function (o) {
            return o.checked && o.code !== 'all'
          })
          let str = ''
          this.allProductTypeRow.forEach(element => {
            str += element.code + ' ' + element.title + ' ,'
          })
          this.allProductTypeTitle = str.substring(0, _.trim(str).length - 1)
        }
      }
      if (_.trim(this.allProductTypeTitle).length == 0) {
        this.allProductTypeRow = _.cloneDeep(
          this.allProductDropdown.all_product_type
        )
      }
    },
    getProductTypeDropdown (param) {
      service
        .getProductTypeDropdown()
        .then(response => {
          this.allProductDropdown.all_product_type = response
          if (
            this.allProductTypeTitle === null &&
            this.allProductTypeRow.length === 0
          ) {
            if (response[0].code === 'all') {
              this.allProductTypeTitle = ''
            } else {
              this.allProductTypeTitle =
                response[0].code + ' ' + response[0].title
            }
            this.allProductTypeRow = _.filter(response, function (o) {
              return o.checked
            })
          }
        })
        .catch()
    },
    searchAllProduct (mode) {
      if (
        this.allProductRow !== null ||
        this.allProductTypeRow.length > 0 ||
        this.keywordAllProduct.length > 0 ||
        this.allBackOrder !== null
      ) {
        // console.log(this.sortingAllProducts)
        let obj = {
          area: this.allProductRow,
          type: this.allProductTypeRow,
          // filter_bk: this.allBackOrder.keyword,
          filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
          search: this.keywordAllProduct,
          feild:
            this.sortingAllProducts === null
              ? 'group_code'
              : this.sortingAllProducts.col,
          sorting:
            this.sortingAllProducts === null
              ? 'asc'
              : this.sortingAllProducts.sorting,
          start: mode === 'scroll' ? this.dataALLProductList.length + 1 : 1,
          limit: 100000
        }

        this.spinnerLoading = true
        service
          .searchAllProduct(obj)
          .then(response => {
            this.dataALLProductList = response
            setTimeout(() => {
              this.spinnerLoading = false
            }, 200)
          })
          .catch()
      }
    },
    searchUnresponded () {
      let obj = {
        unresponded: this.unrespondedListRow,
        feild:
          this.sortingUnrespondeds === null
            ? 'date_time'
            : this.sortingUnrespondeds.col,
        sorting:
          this.sortingUnrespondeds === null
            ? 'asc'
            : this.sortingUnrespondeds.sorting,
        area: this.allProductRow,
        type: this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : "",
      }

      this.spinnerLoading = true
      service
        .searchUnresponded(obj)
        .then(response => {
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
          this.unrespondedList = response
          setTimeout(() => {
            this.spinnerLoading = false
            if (this.activeUnresponded !== true) {
              this.activeUnresponded = true
              this.$refs['dialog1'].open()
            }
          }, 200)
        })
        .catch()
    },
    searchDiscontinued () {
      let obj = {
        discontinued: this.discontinuedListRow,
        feild:
          this.sortingDiscontinueds === null
            ? 'item_code'
            : this.sortingDiscontinueds.col,
        sorting:
          this.sortingDiscontinueds === null
            ? 'asc'
            : this.sortingDiscontinueds.sorting,
        area: this.allProductRow,
        type: this.allProductTypeRow,
        filter_bk: (this.allBackOrder !== null) ? this.allBackOrder.keyword : ""
      }

      this.spinnerLoading = true
      service
        .searchDiscontinued(obj)
        .then(response => {
          this.discontinuedList = response
          setTimeout(() => {
            this.spinnerLoading = false
            if (this.activeDiscontinued !== true) {
              this.activeDiscontinued = true
              this.$refs['dialog1'].open()
              document.getElementsByTagName('html')[0].style.overflow = 'hidden'
            }
          }, 200)
        })
        .catch()
    }
  },
  mounted () {
    /*
    var hideOnClickOutside = () => {
      var isSyncingLeftScroll = false,
        isSyncingRightScroll = false
      var bodys = document.getElementsByTagName('body')[0]
      let t = this
      bodys.onscroll = function (e) {
        if (!isSyncingRightScroll) {
          isSyncingLeftScroll = true
          setTimeout(() => {
            if (t.spinnerLoading === false) {
              if (t.activeTab === 1) {
                // t.searchAllProduct('scroll')
              } else if (t.activeTab === 2) {
                // t.searchProductGroup('scroll')
              } else if (t.activeTab === 3) {
                // t.searchProduct('scroll')
              } else if (t.activeTab === 4) {
                // t.searchCustomer('scroll')
              }
            }
          }, 800)
        }
        isSyncingRightScroll = false
      }

      // updateScrollHeight()
    }
    hideOnClickOutside()
    */
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.login = false
      this.$router.replace('/')
    } else {
      this.login = true
      this.$store.dispatch('setPathMenuService', 'orders')
      this.selectedTabs(1)
      this.getAllProductDropdown(null)
      this.getProductTypeDropdown(null)
    }
  },
  components: {
    'menu-header': require('../Salesops/layout/menu-top'),
    'menu-left': require('../Salesops/layout/menu-left'),
    'all-product-tab': require('./report-bk-component/all-product-tab'),
    'product-group-tab': require('./report-bk-component/product-group-tab'),
    'product-tab': require('./report-bk-component/product-tab'),
    'unresponded-by-salesman': require('./report-bk-component/unresponded-by-salesman'),
    'unresponded-by-salesman-detail': require('./report-bk-component/unresponded-by-salesman-detail'),
    discontinued: require('./report-bk-component/discontinued'),
    viewq: require('./report-bk-component/viewq'),
    'customer-tab': require('./report-bk-component/customer-tab')
  }
}
</script>
<style lang="scss" scoped>
#pageReportBKOrderTracking {
  .md-topic {
    padding-top: 25px;
    padding-left: 50px;
    color: #797979;
    font-size: 18px;
    font-weight: bold;
    font-family: lato;
  }
  .md-dropdown-box {
    background: #ffffff;
  }
  .tabs {
    white-space: nowrap;
    font-family: lato;
    background: #ffffff;
    padding: 16px 20px 0 30px;
    width: 100%;
    display: flex;
    font-weight: bold;
    font-size: 18px !important;
    box-shadow: inset 0 -1px 2px 0 unquote('#00000029'),
      0 0px 3px 0 unquote('#00000029');
    .head-tabs {
      line-height: 1.5;
      max-width: 160px;
      padding-top: 5px;
      padding: 2px 0;
      margin-right: 5%;
      text-align: center;
      cursor: pointer;
      color: #797979;
    }
    .active {
      color: #414141;
      padding-left: 1.5%;
      padding-right: 1.5%;
      border-bottom-style: solid;
      border-bottom-color: #fd7f00;
    }
  }
  .scroll-bar {
    // &::-webkit-scrollbar {
    //   height: 7px;
    //   width: 7px;
    //   background: #f7f7f7;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background-color: rgba(0, 0, 0, 0.11);
    //   border-radius: 5px;
    // }
  }
  .tabs-body {
    // overflow: hidden;
    // height: calc(100vh - 220px);
    background: #ffffff;
    padding: 20px 30px;
    display: flex;
    width: 100%;
    box-shadow: inset 0 -1px 2px 0 unquote('#00000029'),
      0 0px 3px 0 unquote('#00000029');
  }
}
</style>
