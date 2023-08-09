<template>
  <div
    v-if="datas.head.type =='invoices'|| datas.head.type =='orders' || datas.head.type =='actual_sales'"
    class="invoices"
  >
    <div style="width:100%;display:flex" class="title-1">
      <div
        style="width:54%"
      >{{subTitle(datas.head.title)}}:::&nbsp;{{datas.head.sm_code}}&nbsp;:&nbsp;{{datas.head.sm_name}}</div>
      <div style="width:39%;text-align:right">
        (฿)
        {{subPoint(datas.head.total , 'front')}}
        <span
          style="font-size:14px;"
        >{{subPoint(datas.head.total , 'back')}}</span>
      </div>
      <div style="width:7%;text-align: end;">
        <md-icon style="cursor:pointer" @click.native="close">close</md-icon>
      </div>
    </div>
    <div class="body-cons">
      <div class="box-1">
        <div style="display:flex;width:100%;background: #efefef">
          <div class="box-1-head">INVOICE TRANSACTIONS LIST</div>
        </div>
        <div
          style="width:100%;display:flex;padding:20px 15px 10px 50px;color:#A8A8A8;font-family:kanit"
        >
          <div style="width:50%;font-family:kanit;padding-right:10px">CUSTOMERS</div>
          <div style="width:16%;">INVOICE VOLUME</div>
          <div style="width:16%;">PO VOLUME</div>
          <div style="width:18%;">(฿) NET VALUE</div>
        </div>
        <div
          v-if="datas.detail.length == 0"
          class="mds-card"
          style="color:#A8A8A8;text-align:center;width:100%;padding:10% 0%;font-size:15px"
        >No data...</div>
        <div style="width:100%;" v-for="(row,index) in datas.detail" :key="'inv-item-'+index">
          <div
            style="width:100%;display:flex;padding:5px 15px 5px 50px"
            class="show-mom-item"
            @click="showItem(index)"
          >
            <div
              class="show-items"
              style="width:2.3%;font-family:kanit;padding-right:2px;"
            ><md-avatar  v-if="row.checked != 0"
              class="md-avatar-icon _icon-status -small -warm"
            ></md-avatar></div> 
            <div
              class="show-items"
              style="width:50%;font-family:kanit;padding-right:10px;"
            >{{row.cust_code}}&nbsp;:&nbsp;{{row.customer_name_th}}</div>
            <div style="width:16%;">{{fmFull(row.inv_value)}}</div>
            <div style="width:16%;">{{fmFull(row.po_value)}}</div>
            <div style="width:18%;">
              <b>
                (฿)
                {{subPoint(row.total_net_value , 'front')}}
                <span
                  style="font-size:12px;"
                >{{subPoint(row.total_net_value , 'back')}}</span>
              </b>
            </div>
          </div>
          <div v-if="row.show_item">
            <div
              :style="{'font-family':'kanit','width':'100%','display':'flex'
              , 'padding-top': '5px'
              , 'margin-bottom': '10px'
              ,'color':'#FD7F00'
              ,'font-size':'12px'}"
            >
              <div style="width:22%;"></div>
              <div style="width:20%;">INVOICE No.</div>
              <div style="width:20%;">INVOICE DATE</div>
              <div style="width:20%;">PO No.</div>
              <div style="width:18%;">(฿) NET VALUE</div>
            </div>
            <div
              v-if="row.item.length == 0"
              style="color:#41414180;text-align:center;width:100%;padding:10px 0px;font-size:15px"
            >No data...</div>
            <div
              v-for="(record,indexs) in row.item"
              :key="'inv-'+index+'-detail-'+indexs"
              class="box-1-detail"
              :style="{'width':'100%','display':'flex', 'margin-bottom': indexs == row.item.length-1 ? '10px':'unset'}"
            >
              <div style="width:22%;"></div>
              <div style="width:2%;"><md-avatar v-if="record.checked == true"
                  class="md-avatar-icon _icon-status -small -warm"
              ></md-avatar></div>
              <div style="width:20%;">{{record.inv_no}}</div>
              <div style="width:20%;">{{formatterDate(record.inv_date)}}</div>
              <div style="width:20%;">{{record.po_no}}</div>
              <div style="width:10%;">
                {{subPoint(record.net_value , 'front')}}
                <span
                  style="font-size:11px;"
                >{{subPoint(record.net_value , 'back')}}</span>
              </div>
              <div style="width:8%">
                <md-icon
                  v-if="currentStep ==3"
                  class="delIcon"
                  style="
                    cursor:pointer;
                    text-align:start;
                    color:#A8A8A8;
                    border-radius: 23px;
                    font-size:22px;
                    height: 23px;min-height: 23px;
                    width: 23px;min-width: 23px;"
                  @click.native="del(row.cust_code +'|'+record.inv_no , record , row)"
                >remove_circle</md-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="width:100%;padding:7px;text-align:right;margin-top:10px" class="title-1">
      <md-button
        :style="{'visibility':currentStep == 3 ?'visible':'hidden','height':'30px','min-height':'30px','margin':'unset','color':'#fd7f00',
        'border-radius':'3px','font-size':'12px','margin-right':'10px','line-height':'30px'}"
        @click="save()"
      >SAVE</md-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import ClickOutside from "vue-click-outside";
import service from "@/services/planning/incentive";
export default {
  name: "count-item-confirm",

  props: {
    datas: {
      type: Object,
      required: true
    },
    datasHead: {
      type: Object,
      required: false
    },
    groupCode: {
      type: String
    }
  },
  computed: {
    // currentStep() {
    //   return this.$store.getters["incentive/currentStep"];
    // },
    defaultStep () {
      return this.$store.getters['incentive/defaultStep']
    },
  },
  data() {
    return {
      dataSearchProduct: {},
      searchTxtProduct: "",
      showDisplaySearch: false,
      loadingSearch: false,
      tbListItems: [],
      checkedProductSearchAll: [],
      checkedProductSearch: [],
      sortDESC: true,
      roundCycle: "",
      currentStep: 4
    };
  },
  directives: {
    ClickOutside
  },
  methods: {
    save() {
      if(this.currentStep == 3){
        this.$emit("save");
      }
    },
    closeDivSearch: function(e) {
      if (
        e.target.classList.value != "md-button md-button-ghost md-theme-default"
      ) {
        this.showDisplaySearch = false;
        this.dataSearchProduct = {};
        this.searchTxtProduct = "";
      }
    },
    formatterDate(date) {
      let checkFM = moment(date, [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss"
      ]).format();

      if (checkFM == "Invalid date") {
        return "";
      } else {
        return moment(date).format("DD/MM/YYYY");
      }
    },
    showItem(indwx) {
      this.$emit("show", indwx);
    },
    subTitle(txt) {
      let master = txt.split(":");
      return master[0];
    },
    close() {
      this.$emit("close");
    },
    subPoint(value, pos) {
      if (_.isNaN(parseFloat(value))) {
        return "";
      } else {
        let rs = this.fm(value);
        let master = rs.split(".");
        if (pos == "front") {
          return master[0];
        } else {
          if (master.length > 1) {
            return "." + master[1];
          } else {
            return "";
          }
        }
      }
    },
    fmInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    fm(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    fmFull(value) {
      var test = value.toString().indexOf(".");
      if (test == -1) {
        return this.fmInt(value);
      } else {
        return this.fm(value);
      }
    },
    formatterDate(date) {
      let checkFM = moment(date, [
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm:ss"
      ]).format();

      if (checkFM == "Invalid date") {
        return "";
      } else {
        return moment(date).format("DD/MM/YYYY");
      }
    }
  }
};
</script>

<style lang="scss">
.invoices {
  .title-1 {
    background: #efefef;
    padding: 20px 30px;
    // margin-bottom: 15px;
    color: #414141;
    font-size: 19px;
    font-family: kanit;
  }
  .salesops-input {
    width: 100%;
    padding-left: 8px;
    padding-right: 13.8px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;

    input {
      width: 100%;
      border: none;
    }

    input:focus {
      outline: none;
    }

    ::placeholder {
      color: #bdbdbd;
      opacity: 1;
      font-family: kanit;
      font-size: 12px;
      font-weight: 100;
    }
  }
  .search-product-treeview {
    .md-input-container:after {
      background: unset !important;
    }
    .md-card-content {
      padding: 0px;
      height: calc(85vmin - 190px);
      display: block;
      overflow-y: scroll;

      .row-bg-gray:hover {
        background: #efefef;
      }

      &::-webkit-scrollbar {
        height: 7px;
        width: 6px;
        background: #efefef;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.11);
        border-radius: 5px;
      }
      /* START CUSTOM CHECKBOX */
      .-salesops-checkbox-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .-salesops-checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .-salesops-checkbox {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 1.5px solid #a8a8a8;
        border-radius: 3px;
      }

      .-salesops-checkbox-container:hover input ~ .-salesops-checkbox {
        background-color: #ccc;
      }

      .-salesops-checkbox-container input:checked ~ .-salesops-checkbox {
        background-color: #ff9800;
        border-color: #ff9800;
      }

      .-salesops-checkbox:after {
        content: "";
        position: absolute;
        display: none;
      }

      .-salesops-checkbox-container input:checked ~ .-salesops-checkbox:after {
        display: block;
      }

      .-salesops-checkbox-container .-salesops-checkbox:after {
        left: 6px;
        top: 1px;
        width: 5px;
        height: 13px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
      /* END CUSTOM CHECKBOX */
    }
  }
  .body-cons {
    padding: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100vh - 120px);
    .box-1 {
      border: 1px solid #efefef;
      margin-bottom: 15px;
      border-radius: 4px;
      color: #414141;
      .box-1-head {
        padding: 10px 10px;
        font-size: 16px;
        font-family: kanit;
        background: #efefef;
        margin-bottom: 10px;
      }
      .box-1-detail {
        padding: 3px 0px;
        font-size: 12px;
        font-family: kanit;
        .delIcon {
          visibility: hidden;
        }
      }
      .box-1-detail:hover {
        background: #efefef;
        .delIcon {
          visibility: visible;
        }
      }
      .show-mom-item:hover {
        background: #efefef;
        cursor: pointer;
        .show-items {
          // font-weight: 600;
          // color: #fd7f00;
        }
      }
    }
  }
  .body-cons::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background: #f7f7f7;
  }
  .body-cons::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.11);
    border-radius: 5px;
  }
}
</style>
