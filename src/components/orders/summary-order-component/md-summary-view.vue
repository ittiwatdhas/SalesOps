<template>
  <div>
    <div class="md-dialog-title">
      <md-layout>
        <md-layout md-flex-large="70">
          <label class="sub-title kanitFont">{{ select_type }}</label>
        </md-layout>
        <md-layout md-flex-large="30" md-align="end">
          <md-icon @click.native="close" style="cursor:pointer;margin-right:30px">close</md-icon>
        </md-layout>
      </md-layout>
    </div>
    <div id="pageSummaryView">
      <div style="padding-top:10px;padding-left:75%;width:97%;">
        <!-- v-model="keyword" -->
        <md-search-box-back :placeholder="'Search'" :data="[]" @clear="keywordCLR" :value="keyword" @filter="keywordFil"
          @keyup.native.enter="performSearch"></md-search-box-back>
      </div>
      <md-layout md-flex="100" md-align="center" style="padding-top: 1%;">
        <md-spinner style="position: absolute;padding-top:30%;z-index: 3" :md-size="150" :md-stroke="1" v-show="spinner"
          md-indeterminate></md-spinner>
        <md-card class="sales-area-table" style="overflow-x: hidden;width:94%;z-index: unset;">

          <div :class="'head-table'" id="moreClick" style="margin-top:0px ;background-color: #efefef;">
            <div style="width:60%;text-align:center;padding-top:10px;" class="title">
              <span style="font-size: 14px;">{{ titleName }}</span>
              <div style="font-size: 14px;">
                <span v-if="titleName == 'Customer'">
                  ({{ summaryDetail.length }})
                </span>
                <span v-else>
                  ({{ summaryPo.length }})
                </span>
              </div>
            </div>
            <div style="width:50%;text-align:center;padding-top:10px;" class="title">
              <span style="font-size: 14px;">Order Value</span>
              <div style="font-size: 14px;">
                <span v-if="titleName == 'Customer'">
                  ({{ formatNumber(summaryDetail.reduce((sum, items) => sum + parseFloat(items.po_value), 0)) }})
                </span>
                <span v-else>
                  ({{ formatNumber(summaryPo.reduce((sum, items) => sum + parseFloat(items.po_value), 0)) }})
                </span>
              </div>
            </div>
            <div style="width:50%;text-align:center;padding-top:10px;" class="title">
              <span style="font-size: 14px;">Invoice Value</span>
              <div style="font-size: 14px;">
                <span v-if="titleName == 'Customer'">
                  ({{ formatNumber(summaryDetail.reduce((sum, items) => sum + parseFloat(items.inv_value), 0)) }})
                </span>
                <span v-else>
                  ({{ formatNumber(summaryPo.reduce((sum, items) => sum + parseFloat(items.inv_value), 0)) }})
                </span>
              </div>
            </div>
          </div>

          <div v-if="titleName == 'Customer' && summaryDetail.length > 0" class="detail-blog" :style="{
            height: '430px',
            'padding-left': '0px',
            width: '100%',
            'overflow-y': 'scroll'
          }">
            <div v-for="items in summaryDetail" :key="items.id" class="content-table"
              style="font-family:roboto;padding-top:4px; font-size: 13px;">
              <div class="number pt-2" style="width: 60%; text-align: left;">
                {{ items.customer_code + ' : ' }} <span style="font-family: kanit;font-size: 14px;">{{ items.customer_name
                }}</span>
              </div>
              <div class="number pt-2" style="width: 50%; text-align: center;">
                {{ $store.getters['globalfunc/formatNumber'](items.po_value) }}
              </div>

              <div class="number pt-2" style="width: 50%; text-align: center;">
                {{ $store.getters['globalfunc/formatNumber'](items.inv_value) }}
              </div>

            </div>
            <div v-if="titleName == 'Customer' && summaryDetail.length == 0"
              style="padding-top:10%;font-size:15px;color: #a8a8a8;height:calc(100vh - 430px)">
              No Count Customer
            </div>

          </div>
          <div v-if="titleName == 'PO. NO.' && summaryPo.length > 0" class="detail-blog" :style="{
            height: '430px',
            'padding-left': '0px',
            width: '100%',
            'overflow-y': 'scroll'
          }">
            <div v-for="items in summaryPo" :key="items.id" class="content-table"
              style="font-family:roboto;padding-top:4px; font-size: 13px;">
              <div class="number pt-2" style="width: 60%; text-align: center;">
                {{ items.po_no }}
              </div>
              <div class="number pt-2" style="width: 50%; text-align: center;">
                {{ $store.getters['globalfunc/formatNumber']
                  (
                    items.po_value
                  )
                }}
              </div>

              <div class="number pt-2" style="width: 50%; text-align: center;">
                {{ $store.getters['globalfunc/formatNumber']
                  (
                    items.inv_value
                  )
                }}
              </div>

            </div>
            <div v-if="titleName == 'PO. NO.' && summaryPo.length == 0"
              style="padding-top:10%;font-size:15px;color: #a8a8a8;height:calc(100vh - 430px)">
              No Count PO.
            </div>

          </div>
        </md-card>
      </md-layout>


    </div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import ClickOutside from "vue-click-outside";
import VueSticky from "vue-sticky";
import _ from "lodash";
export default {
  created() {
    // console.log(value.summaryDetail)
  },
  props: ['data', 'select_type', 'titleName'],
  data() {
    return {
      keyword: '',
      leftBtn: "CLOSE",
      rightBtn: "NO"
    };
  },
  mounted() {
    this.$on('SummaryDG', this.handleEvent);
  },
  computed: {
    dataSummary() {
      return this.$store.getters['summaryorders/dataSummary']
    },
    spinner() {
      return this.$store.getters['summaryorders/spinner']
    },
    summaryPo() {
      return this.$store.getters['summaryorders/summaryPo']
    },
    summaryDetail() {
      return this.$store.getters['summaryorders/summaryDetail']
    },
    commentList() {
      return this.$store.getters["summaryorders/commentList"];
    },
    dataList() {
      return this.$store.getters["summaryorders/dataList"];
    },

  },

  methods: {

    performSearch(event) {
      const inputValue = event.target.value;
      if (this.titleName == 'Customer') {
        this.$store.dispatch('summaryorders/searchCustomer', inputValue)
        this.$store.dispatch('summaryorders/searchSummaryCust')
        console.log(this.titleName)
      }
      else {
        this.$store.dispatch('summaryorders/searchCustomer', inputValue)
        this.$store.dispatch('summaryorders/searchSummaryPO')
        console.log(this.titleName)
      }




    },
    keywordFil(val) {
      this.keyword = val
      this.filterList(val)
    },
    filterList(param) {
      // console.log(param )
      this.$store.dispatch('summaryorders/searchCustomer', param)
    },
    keywordCLR() {
      this.keyword = ''
      if (this.titleName == 'Customer') {
        this.$store.dispatch('summaryorders/searchCustomer', this.keyword)
        this.$store.dispatch('summaryorders/searchSummaryCust')
        console.log(this.keyword)
      }
      else {
        this.$store.dispatch('summaryorders/searchCustomer', this.keyword)
        this.$store.dispatch('summaryorders/searchSummaryPO')
        console.log(this.keyword)
      }
    },
    handleEvent(title) {
      this.titleName = title;
      console.log("titleName => ", titleName)
    },
    clearData() {
      this.$refs["clearData-dialog-his"].close();
    },
    showDetails(index) {
      this.data.promotion[index].display = !this.data.promotion[index].display;
    },
    close() {
      this.$emit("close");
      this.$store.dispatch('summaryorders/searchCustomer', '')
      this.keyword = ''
    },
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },

  },
  components: {
    'md-search-box-back': require('./md-search-box-back'),
    "md-search-checkbox": require("../../Salesops/customComponent/md-search-checkbox"),
    "md-comment-dialog": require("../../Salesops/customComponent/md-comment-dialog"),
    "md-flow-bar": require("../../Salesops/customComponent/md-flow-bar")
  },
  directives: {
    ClickOutside,
    sticky: VueSticky
  }
}
</script>
<style lang="scss" scoped>
.vol-discount {
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  background: #fd7f00;
  border-radius: 15px;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;

  span {
    color: White;
  }
}

.scroll-main-table {
  &::-webkit-scrollbar {
    height: 5px;
    width: 6px;
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    background: #a8a8a8;
    border-radius: 3px;
  }
}

#pageSummaryView {
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

