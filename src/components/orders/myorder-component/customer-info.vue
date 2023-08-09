<template>
  <div>
    <div class="customer-info-box">
      <div style="display: flex; width: 100%">
        <!--CUSTOMER INFO-->
        <div style="width: 26%">
          <label class="topic">CUSTOMER INFO</label>
          <div  class="bg-filter" style="padding-right: 5px">
            <div v-if="detectDevice == 'mobile'"
             @click="iconClick"
             >
               <md-auto-focus-box
              style="padding-right: 15px"
              :placeholder="'Search...'"
              :loading="loadCustStatus"
              :data="$store.getters['myorders/autocom_cg']"
              v-model="info.customer_code"
              @keypress="submitSearch"
              @iconclick="iconClick"
              @choose="chooseCust"
              @mouseleave="mouseLeave"
              @change="filterCust"
              :disabled="renderBtn('customer_code')"
            ></md-auto-focus-box>
            </div>
             <div v-else >
               <md-auto-focus-box
              style="padding-right: 15px"
              :placeholder="'Search...'"
              :loading="loadCustStatus"
              :data="$store.getters['myorders/autocom_cg']"
              v-model="info.customer_code"
              @keypress="submitSearch"
              @iconclick="iconClick"
              @focus.native="iconClick"
              @choose="chooseCust"
              @mouseleave="mouseLeave"
              @change="filterCust"
              :disabled="renderBtn('customer_code')"
            ></md-auto-focus-box>
            </div>
           

            <md-input-container
              style="margin-bottom: 13px; margin-top: 13px"
              class="no-underline"
            >
              <label>Customer Name</label>
              <md-input
                v-model="info.customer_name"
                style="font-family: kanit"
                readonly
              ></md-input>
              <md-tooltip md-direction="top">{{
                info.customer_name
              }}</md-tooltip>
              <md-icon
                v-if="info.customer_name != '-'"
                style="
                  margin-top: 0px;
                  font-size: 17px;
                  padding-top: 2px;
                  color: #a8a8a8;
                  cursor: pointer;
                "
              >
                error
                <md-tooltip md-direction="bottom" class="mds-tooltips">{{
                  info.customer_address
                }}</md-tooltip>
              </md-icon>
            </md-input-container>
          </div>
        </div>
        <!--PURCHASE INFO-->
        <div style="margin-left: 15px; width: 74%">
          <label class="topic">PURCHASE INFO</label>
          <div style="display: flex">
            <div class="bg-filter-blog" style="width: 19%">
              <md-input-container
                @click.native="addTakePoNo"
                id="ponoIpu"
                style="margin-bottom: 13px"
              >
                <label>{{ showInpoutName("po_no") }}</label>
                <!-- :disabled="renderBtn('po_no' , 'Check') || dis_input" -->
                <!-- onpaste="return false" -->
                <md-input

                  @focus.native="focusIpt($event)"
                  v-model="info.po_no"
                  :disabled="renderBtn('po_no' , 'Check')"
                  @keypress.native="keyPONO"
                  :maxlength="30"
                ></md-input>
              </md-input-container>
              <md-input-container style="margin-bottom: 10px" id="iptPoDate">
                <label>{{ showInpoutName("po_date") }}</label>
                <md-input
                  v-model="info.po_date"
                  :disabled="renderBtn('po_date')"
                  v-show="false"
                ></md-input>
                <datepicker
                  :disabled="renderBtn('po_date')"
                  :value="info.po_date"
                  @selected="selectedPoDate"
                  :format="customFormatter"
                  :disabledDates="disabledDatesPo"
                ></datepicker>
              </md-input-container>
            </div>
            <div class="bg-filter-blog" style="width: 19%">
              <md-input-container
                style="margin-bottom: 13px"
                class="no-underline"
              >
                <label>Creator</label>
                <md-input
                  v-model="info.creator"
                  style="font-family: kanit; padding-bottom: 4px"
                  :disabled="renderBtn(false)"
                ></md-input>
              </md-input-container>
              <md-input-container style="margin-bottom: 13px" id="iptDelDate">
                <label>{{ showInpoutName("delivery_date") }}</label>
                <md-input
                  v-model="info.delivery_date"
                  :disabled="renderBtn('delivery_date')"
                  v-show="false"
                ></md-input>
                <datepicker
                  :disabled="renderBtn('delivery_date')"
                  :value="info.delivery_date"
                  @selected="selectedDelDate"
                  :format="customFormatter"
                  :disabledDates="disabledDatesDel"
                ></datepicker>
              </md-input-container>
            </div>
            <div class="bg-filter-blog" style="width: 19%; padding-left: 2%">
              <md-input-container
                style="margin-bottom: 13px"
                class="salesman_code"
              >
                <label>{{ showInpoutName("salesman") }}</label>
                <md-select
                  v-model="info.salesman_code"
                  :disabled="renderBtn('salesman')"
                  @change="chooseSalesman"
                >
                  <md-option
                    :value="items.emp_id"
                    v-for="(items, index) in salesmanList"
                    :key="'sales' + index"
                    >{{ items.emp_id }}&nbsp;{{ items.first_name }}&nbsp;{{
                      items.last_name
                    }}</md-option
                  >
                </md-select>
              </md-input-container>
              <md-input-container
                style="margin-bottom: 13px"
                class="salesman_code"
              >
                <label>{{ showInpoutName("ship_to") }}</label>
                <md-select
                  v-model="info.ship_to"
                  :disabled="renderBtn('ship_to','chipto')"
                  @selected="setLocalSore('ship_to')"
                >
                  <md-option
                    :value="items.customer_code"
                    v-for="(items, index) in masterShipto"
                    :key="'shipto' + items.customer_code + index"
                    >{{ items.customer_addr }}</md-option
                  >
                </md-select>
              </md-input-container>
            </div>
            <div class="bg-filter-blog" style="width: 18.5%">
              <md-input-container style="margin-bottom: 10px">
                <label>{{ showInpoutName("priority") }}</label>
                <md-select
                  v-model="info.priority"
                  :disabled="renderBtn('priority')"
                  @selected="setLocalSore('priority')"
                >
                  <md-option
                    v-for="items in $store.getters['myorders/priority']"
                    :value="items.id"
                    :key="'priority' + items.id"
                    >{{ items.title }}</md-option
                  >
                </md-select>
              </md-input-container>
              <md-input-container style="margin-bottom: 10px">
                <label>{{ showInpoutName("warehouse") }}</label>
                <md-select
                  v-model="info.warehouse_code"
                  :disabled="renderBtn('warehouse')"
                  @selected="setLocalSore('warehouse_code')"
                >
                  <md-option
                    :value="items.code"
                    v-for="items in masterWarehouse"
                    :key="'shipto' + items.code"
                    >{{ items.code }}&nbsp;:&nbsp;{{ items.title }}</md-option
                  >
                </md-select>
              </md-input-container>
            </div>
            <div
              class="bg-filter-blog takeNoteIP"
              style="padding-right: 5px; width: 18.5%; padding-left: 5%"
            >
              <md-input-container
                id="takeNoteIP"
                style="margin-bottom: 10px; cursor: pointer"
                @click.native="addTakeNote"
              >
                <label>{{ showInpoutName("take_note") }}</label>
                <md-input
                style="pointer-events: none;"
                  @focus.native="$event.target.select()"
                  v-model="info.take_note"
                ></md-input>
                <!-- :disabled="renderBtn('take_note')" -->
              </md-input-container>
              <div
                class="show-take-note"
                v-if="info.take_note != null && info.take_note != ''"
              >
                {{ info.take_note }}
              </div>
              <div class="md-search-checkbox" style="display: -webkit-box">
                <div style="padding-top: 13px">
                  <input
                    type="checkbox"
                    v-model="info.pay_by_cash"
                    :disabled="renderPayByCash('pay_by_cash')"
                    style="height: 20px; width: 20px"
                    @change="showPayByCash($event)"
                  />
                </div>
                <div
                  @click="showPayByCash('open')"
                  style="font-family: Roboto;
                  padding-top: 16px;
                  cursor: pointer;
                  font-size: 12px !important;
                  color: #727272
                  line-height: 11px;"
                >
                  Pay by Cash
                </div>
              </div>
            </div>
            <div class="bg-filter-blog" style="padding: unset; width: 6%">
              <div
                @click="openComment($event)"
                :style="{
                  background: renderComment(),
                  width: '24px',
                  height: '24px',
                  'border-radius': '50%',
                  'margin-top': '17px',
                  'margin-left': '8px',
                }"
              >
                <md-icon
                  :id="'btn-comment-' + info.doc_no"
                  :style="{
                    color: 'white',
                    'margin-top': '6px',
                    'margin-left': '6px',
                    cursor: 'pointer',
                    'font-size': ' 13px',
                  }"
                  class="comment-btn"
                  >chat_bubble</md-icon
                >
                <md-tooltip md-direction="top">Note to Manager</md-tooltip>
              </div>
              <div :class="'comment'" style @click="openCreditInfo($event)">
                <md-icon
                  :style="{
                    color: '#C9C9C9',
                    'margin-top': '27px',
                    'margin-left': '8px',
                    cursor: 'pointer',
                  }"
                  class="creditinfo-btn"
                  >credit_card</md-icon
                >
                <md-tooltip md-direction="top">Credit info</md-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <md-comment-dialog
        :title="'Note to Manager'"
        @read="readComment"
        @close="closeComment"
        @reply="replyComment"
        :data="$store.getters['myorders/comment']"
        :option="commentOpt"
      ></md-comment-dialog>
      <md-creditinfo-dialog
        :disabled="renderBtn('credit_term')"
        @close="closeCreditInfo"
        :option="creditInfoOpt"
        :data="info"
      ></md-creditinfo-dialog>
      <md-dialog ref="clearData-dialog">
        <md-dialog-title>{{ TitleDG }}</md-dialog-title>
        <md-dialog-content>
          <div v-if="subTitleDG == 'takenote'">
            <md-input-container style="margin: 0px">
              <label></label>
              <md-textarea
                style="color: rgba(0, 0, 0, 0.87)"
                v-model="takeNoteDg"
                :disabled="renderBtn('take_note')"
              ></md-textarea>
              <!-- <md-textarea maxlength="300"></md-textarea> -->
            </md-input-container>
          </div>
          <div v-else style="margin-top: 15px">{{ subTitleDG }}</div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="clearData">{{ leftBtn }}</md-button>
          <md-button
            v-if="subTitleDG == 'takenote'"
            :disabled="renderBtn('take_note')"
            class="md-primary"
            @click="closeData"
            >{{ rightBtn }}</md-button
          >
          <md-button v-else class="md-primary" @click="closeData">{{
            rightBtn
          }}</md-button>
        </md-dialog-actions>
      </md-dialog>

        <md-dialog ref="clearData-dialog-poNo">
        <md-dialog-title>{{ TitleDG }}</md-dialog-title>
        <md-dialog-content>
          <div v-if="subTitleDG == 'takenote'">
            <!-- onpaste="return false" -->
            <md-input-container style="margin: 0px">
              <label></label>
              <md-textarea
                @keypress.native="keyPONO"
                @input="check_"
                @focus="Focus_Pono"
                style="color: rgba(0, 0, 0, 0.87)"
                v-model="takeNoteDg"
                :disabled="renderBtn('po_no' )"
              ></md-textarea>
              <md-icon
                v-if="takeNoteDg != 'System' && !renderBtn('po_no')"
                @click.native="Clear_txt_po"
                style="cursor: pointer; margin-right: 5px"
                >close</md-icon
              >
              <!-- <md-textarea maxlength="300"></md-textarea> -->
            </md-input-container>
            <small v-if="this.special_characters_error && !this.digit_text " style="color:red" >
              <!-- Please enter new PO.NO -->
              Please remove special characters.( {{ this.specialtxt }} ) from PO.No.
            </small>
            <small v-if="!this.special_characters_error && this.digit_text " style="color:red" >
              <!-- Please enter new PO.NO -->
              Error message Do not enter more than 13 characters.
            </small>
          </div>
          <div v-else style="margin-top: 15px">{{ subTitleDG }}</div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="clearData">{{ leftBtn }}</md-button>
          <md-button
            v-if="subTitleDG == 'takenote'"
            :disabled="renderBtn('take_note') || special_characters_error || digit_text"
            class="md-primary"
            @click="closeData"
            >{{ rightBtn }}</md-button
          >
          <md-button v-else class="md-primary" @click="closeData">{{
            rightBtn
          }}</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!--PAY BY CASH-->
      <md-dialog ref="paybycash-dialog">
        <md-dialog-title
          style="color: #727272; font-size: 14px; font-family: roboto"
          >Cashed Customer Detail</md-dialog-title
        >
        <md-dialog-content style="width: 500px">
          <div
            style="
              font-family: Roboto;
              padding-top: 16px;
              cursor: pointer;
              font-size: 12px !important;
              color: #727272;
            "
          >
            Send to
          </div>
          <md-input-container class="paybycash" md-inline>
            <label>Leave a Customer Name Here</label>
            <md-input
              :disabled="renderBtnOther('pay_by_cash')"
              maxlength="50"
              @keypress.native="hideError('sent_to_cus_name')"
              v-model="payByCash.sent_to_cus_name"
            ></md-input>
          </md-input-container>
          <div class="error-paybtcash" v-if="errorPayBy.sent_to_cus_name">
            Leave a Customer Name Here
          </div>
          <div
            style="
              font-family: Roboto;
              padding-top: 16px;
              cursor: pointer;
              font-size: 12px !important;
              color: #727272;
              margin-top: 10px;
            "
          >
            Receiver Name
          </div>
          <md-input-container class="paybycash" md-inline>
            <label>Leave a receiver Name</label>
            <md-input
              :disabled="renderBtnOther('pay_by_cash')"
              maxlength="50"
              @keypress.native="hideError('receive_name')"
              v-model="payByCash.receive_name"
            ></md-input>
            <!-- <md-input required></md-input> -->
          </md-input-container>
          <div class="error-paybtcash" v-if="errorPayBy.receive_name">
            Leave a receiver Name
          </div>
          <div
            style="
              font-family: Roboto;
              padding-top: 16px;
              cursor: pointer;
              font-size: 12px !important;
              color: #727272;
              margin-top: 10px;
            "
          >
            Tax ID
          </div>
          <md-input-container class="paybycash" md-inline>
            <label>Leave Number only 10 - 13 digits</label>
            <md-input
              :disabled="renderBtnOther('pay_by_cash')"
              @keypress.native="isNumber"
              maxlength="13"
              minlength="10"
              v-model="payByCash.tax_id"
            ></md-input>
            <!-- <md-input required></md-input> -->
          </md-input-container>
          <div class="error-paybtcash" v-if="errorPayBy.tax_id">
            Leave Number only 10 - 13 digits
          </div>
          <div
            style="
              font-family: Roboto;
              padding-top: 16px;
              cursor: pointer;
              font-size: 12px !important;
              color: #727272;
              margin-top: 10px;
            "
          >
            Customer Address
          </div>
          <md-input-container class="paybycash" md-inline>
            <label>Leave Customer Address Here</label>
            <md-input
              :disabled="renderBtnOther('pay_by_cash')"
              maxlength="50"
              @keypress.native="hideError('cust_addr1')"
              v-model="payByCash.cust_addr1"
            ></md-input>
            <!-- <md-input required></md-input> -->
          </md-input-container>
          <div class="error-paybtcash" v-if="errorPayBy.cust_addr1">
            Leave Customer Address Here
          </div>
          <md-input-container class="paybycash" md-inline>
            <md-input
              :disabled="renderBtnOther('pay_by_cash')"
              maxlength="50"
              v-model="payByCash.cust_addr2"
            ></md-input>
          </md-input-container>
          <md-input-container class="paybycash" md-inline>
            <md-input
              :disabled="renderBtnOther('pay_by_cash')"
              maxlength="50"
              v-model="payByCash.cust_addr3"
            ></md-input>
          </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="clearPayByCash" style="color: #a8a8a8"
            >CANCEL</md-button
          >
          <md-button
            class="md-primary"
            @click="savePayByCash"
            :disabled="renderBtnOther('pay_by_cash')"
            >SAVE</md-button
          >
        </md-dialog-actions>
      </md-dialog>
      <!---ALL CUSTOMER -->
      <md-dialog ref="all-cust-dialog" id="all_cust_dialog">
        <md-dialog-title
          style="
            background: #efefef;
            color: #414141;
            font-size: 16px;
            padding-bottom: 15px;
            padding-top: 15px;
          "
        >
          <md-layout>
            <md-layout md-flex="70">
              <label class="sub-title kanitFont">All My Customer</label>
            </md-layout>
            <md-layout md-flex="30" md-align="end">
              <md-icon
                @click.native="closeAllCust"
                style="cursor: pointer; margin-right: 5px"
                >close</md-icon
              >
            </md-layout>
          </md-layout>
          <!-- All My Customer -->
        </md-dialog-title>
        <md-dialog-content style="width: 100%; overflow: hidden">
          <div
            style="
              position: absolute;
              z-index: 101;
              margin-left: 40%;
              margin-top: 10%;
            "
          >
            <md-spinner
              :md-size="150"
              :md-stroke="1"
              v-show="$store.getters['myorders/allCustomer_spinner']"
              md-indeterminate
            ></md-spinner>
          </div>
          <div
            v-show="$store.getters['myorders/allCustomer_spinner']"
            style="
              position: absolute;
              z-index: 10000;
              width: 100%;
              height: 100%;
              background: #efefef;
              opacity: 0.1;
            "
          ></div>
          <md-layout md-flex="100" md-align="end">
            <md-layout md-flex="60" md-align="start" style="font-size: 18px"
              >Customer List&nbsp;({{ allCustomer.length }})</md-layout
            >
            <md-layout md-flex="40" md-align="end">
              <md-search-box
                :placeholder="'Search...'"
                :value="keywordCust"
                style="width: 100%"
                @filter="keywordFil"
                @clear="keywordCLR"
              ></md-search-box>
            </md-layout>
          </md-layout>
          <md-layout md-flex="100">
            <div
              style="
                margin-top: 20px;
                margin-bottom: 10px;
                width: 100%;
                color: rgba(0, 0, 0, 0.54);
                font-weight: 600;
                display: -webkit-box;
              "
            >
              <div style="width: 12%; padding-left: 10px">Code</div>
              <div style="width: 25%">Customer Name (TH)</div>
              <div style="width: 25%">Customer Name (EN)</div>
              <div style="width: 38%">Address</div>
            </div>
            <div
              class="cust-detail-scroll-table"
              :style="{ height: 'calc(100vh - 200px)', width: '100%' }"
            >
              <div
                class="detail-table"
                :style="{
                  'margin-top': '5px',
                  display: '-webkit-box',
                  width: '100%',
                }"
                v-for="(row, index) in allCustomer"
                :key="'tbitemss' + index"
                @click="chooseCustByAll(row)"
              >
                <div style="width: 12%; padding-left: 10px">
                  {{ row.customer_code }}
                </div>
                <div style="width: 25%; font-family: kanit; padding-right: 5px">
                  {{ row.customer_name_th }}
                </div>
                <div
                  style="
                    width: 25%;
                    color: #414141;
                    opacity: 0.7;
                    padding-right: 5px;
                  "
                >
                  {{ row.customer_name_eng }}
                </div>
                <div style="width: 38%; color: #414141; opacity: 0.7">
                  <label style="font-family: kanit"
                    >&nbsp;&nbsp;{{ row.addr }}</label
                  >
                </div>
              </div>
            </div>
          </md-layout>
        </md-dialog-content>
      </md-dialog>
    </div>

     <md-snackbar
      :md-position="vertical + ' ' + horizontal"
      ref="snackbar"
      :md-duration="duration"
    >
      <span style="font-size: 16px; font-family: kanit">{{ snackbarMsg }}</span>
      <md-button
        class="md-accent"
        @click="$refs.snackbar.close()"
        style="color: white"
        >OK</md-button
      >
    </md-snackbar>


  </div>
</template>
<script>
import orService from "@/services/orders/myorders";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
var show_comment = true;
var newdate = new Date();
var dd = newdate.getDate();
var mm = newdate.getMonth();
var y = newdate.getFullYear();
export default {
  created() {},
  props: ["detail"],
  watch: {
    keywordCust(value) {
      this.$store.dispatch("myorders/filterAllCUst", value);
    },
  },
  data() {
    return {
      commentOpt: {
        display: false,
        top: 0,
        left: 0,
        keepPo: "",
      },
      creditInfoOpt: {
        display: false,
        top: 0,
        left: 0,
        keepPo: "",
      },
      disabledDatesPo: {
        to: new Date(y, mm, dd),
        from: null,
      },
      disabledDatesDel: {
        to: new Date(y, mm, dd + 1),
        from: null,
      },
      countPoDate: false,
      countDeliDate: false,
      keepData: "",
      errorPayBy: {
        cust_addr1: false,
        sent_to_cus_name: false,
        receive_name: false,
        tax_id: false,
      },
      specialtxt:'',
      keywordCust: "",
      TitleDG: "Do you want to change customer?",
      subTitleDG: "All your order detail will reset to default.",
      leftBtn: "CHANGE & RESET",
      rightBtn: "NO",
      takeNoteDg: "",
      dis_input: "",
      vertical: "top",
      horizontal: "center",
      duration: 4000,
      snackbarMsg: "",
      special_characters_error : false ,
      digit_text : false 

    };
  },
  created() {
    let temp = this;
    window.onresize = function (event) {
      if (event.type == "resize") {
        if (temp.commentOpt.display == true) {
          let pos = temp.commentOpt.keepPo.target.offsetLeft + 230 + 520 - 980;
          temp.commentOpt.left = pos;
        }
        if (temp.commentOpt.creditInfoOpt == true) {
          let pos =
            temp.creditInfoOpt.keepPo.target.offsetLeft + 409 + 190 - 980;
          temp.creditInfoOpt.left = pos;
        }
      }
    };
  },
  computed: {
    info() {
      // console.log(this.$store.getters["myorders/customer_info"])
      return this.$store.getters["myorders/customer_info"];
    },
    fucusCustomer() {
      return this.$store.getters["myorders/fucusCustomer"];
    },
    masterWarehouse() {
      return this.$store.getters["myorders/master_warehouse"];
    },
    masterShipto() {
      return this.$store.getters["myorders/master_shipto"];
    },
    salesmanList() {
      return this.$store.getters["myorders/salesman_list"];
    },
    itemsPromo() {
      return this.$store.getters["myorders/items_promo_order"];
    },
    items() {
      return this.$store.getters["myorders/items_order"];
    },
    disableFrom() {
      return this.$store.getters["myorders/disableFrom"];
    },
    payByCash() {
      return this.$store.getters["myorders/paybycash_list"];
    },
    loadCustStatus() {
      return this.$store.getters["myorders/loadCustStatus"];
    },
    allCustomer() {
      return this.$store.getters["myorders/allCustomer"];
    },
    bkMode() {
      return this.$store.getters["myorders/bkMode"];
    },
    detectDevice() {
      return Vue.localStorage.get('DETECTED_DEVICE')
    }
  },
  methods: {
    addTakeNote() {
      if(this.info.customer_code != ''  ){
      this.TitleDG = "Note to Warehouse";
      this.subTitleDG = "takenote";
      this.takeNoteDg = this.info.take_note;
      this.leftBtn = "CLOSE";
      this.rightBtn = "SAVE";
      this.$refs["clearData-dialog"].open();
    }else {
         this.snackbarMsg =  "Please Select customer",
         this.$refs.snackbar.open();
      }
    },
    addTakePoNo() {
      this.special_characters_error = false
      this.digit_text = false
      // if(this.info.customer_code != ''  ){
         this.TitleDG = "PO.No.";
         this.subTitleDG = "takenote";
         this.takeNoteDg = this.info.po_no;
         this.leftBtn = "CLOSE";
         this.rightBtn = "OK";
         this.$refs["clearData-dialog-poNo"].open();
      // }else {
        if(this.info.customer_code == ''  ){
         this.snackbarMsg =  "Please Select customer",
         this.$refs.snackbar.open();
        }
       
      // }
    },
    keywordFil(val) {
      this.keywordCust = val;
    },
    keywordCLR() {
      this.keywordCust = "";
    },
    setLocalSore(input) {
      // let obj = Vue.localStorage.get("ORD_DIALOG");
      let obj = sessionStorage.getItem('keep_order_session')
      let theArray = JSON.parse(obj);
      if (
        !_.isUndefined(theArray["customer_info"]) ||
        !_.isNull(theArray["customer_info"])
      ) {
        if (input == "ship_to") {
          // console.log(' ship_to => ', theArray["customer_info"])
          theArray["customer_info"][input] = this.info.ship_to;
        } else if (input == "delivery_date") {
          theArray["customer_info"][input] = this.info.delivery_date;
        } else if (input == "po_date") {
          theArray["customer_info"][input] = this.info.po_date;
        } else if (input == "pay_by_cash") {
          theArray["customer_info"][input] = this.info.pay_by_cash;
        } else if (input == "priority") {
          theArray["customer_info"][input] = this.info.priority;
        } else if (input == "warehouse_code") {
          theArray["customer_info"][input] = this.info.warehouse_code;
        } else if (input == "salesman_code") {
          // console.log(' salesman_code => ', theArray["customer_info"])
          theArray["customer_info"][input] = this.info.salesman_code;
        }
        Vue.localStorage.set("ORD_DIALOG", JSON.stringify(theArray));
      }
    },
    closeAllCust() {
      this.$refs["all-cust-dialog"].close();
    },
    iconClick() {
      if (
        (this.info.order_status == "DRF" || this.info.order_status == "REJ") &&
        this.$store.getters["myorders/keepRouter"]
      ) {
        this.$store.dispatch("myorders/getAllCustomer");
        this.$refs["all-cust-dialog"].open();
      }
    },
    hideError(value) {
      if (value == "cust_addr1" && this.payByCash.cust_addr1.trim() != "") {
        this.errorPayBy.cust_addr1 = false;
      } else if (
        value == "sent_to_cus_name" &&
        this.payByCash.sent_to_cus_name.trim() != ""
      ) {
        this.errorPayBy.sent_to_cus_name = false;
      } else if (
        value == "receive_name" &&
        this.payByCash.receive_name.trim() != ""
      ) {
        this.errorPayBy.receive_name = false;
      } else if (value == "tax_id" && this.payByCash.tax_id.trim() != "") {
        this.errorPayBy.tax_id = false;
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;

      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        this.keepEvent = false;
        evt.preventDefault();
      } else {
        this.keepEvent = true;
        return true;
      }
    },
    showPayByCash(value) {
      this.setLocalSore("pay_by_cash");
      if (value == "open") {
        this.$refs["paybycash-dialog"].open();
      } else {
        if (value == true) {
          this.$refs["paybycash-dialog"].open();
        }
      }
    },
    clearPayByCash() {
      this.$refs["paybycash-dialog"].close();
    },
    savePayByCash() {
      if (this.payByCash.sent_to_cus_name.trim() == "") {
        this.errorPayBy = {
          cust_addr1: false,
          sent_to_cus_name: true,
          receive_name: false,
          tax_id: false,
        };
      } else if (this.payByCash.receive_name.trim() == "") {
        this.errorPayBy = {
          cust_addr1: false,
          sent_to_cus_name: false,
          receive_name: true,
          tax_id: false,
        };
      } else if (
        this.payByCash.tax_id.trim() == "" ||
        this.payByCash.tax_id.length < 10 ||
        this.payByCash.tax_id.length > 13
      ) {
        this.errorPayBy = {
          cust_addr1: false,
          sent_to_cus_name: false,
          receive_name: false,
          tax_id: true,
        };
      } else if (this.payByCash.cust_addr1.trim() == "") {
        this.errorPayBy = {
          cust_addr1: true,
          sent_to_cus_name: false,
          receive_name: false,
          tax_id: false,
        };
      } else {
        this.errorPayBy = {
          cust_addr1: false,
          sent_to_cus_name: false,
          receive_name: false,
          tax_id: false,
        };
        this.$refs["paybycash-dialog"].close();
        this.info.pay_by_cash = true;
        this.setLocalSore("pay_by_cash");

        let obj = Vue.localStorage.get("ORD_DIALOG");
        let theArray = JSON.parse(obj);
        if (
          !_.isUndefined(theArray["customer_info"]) ||
          !_.isNull(theArray["customer_info"])
        ) {
          theArray["customer_info"]["receive_name"] =
            this.payByCash.receive_name.trim();
          theArray["customer_info"]["tax_id"] = this.payByCash.tax_id.trim();
          theArray["customer_info"]["cust_addr1"] =
            this.payByCash.cust_addr1.trim();
          theArray["customer_info"]["cust_addr2"] =
            this.payByCash.cust_addr2.trim();
          theArray["customer_info"]["cust_addr3"] =
            this.payByCash.cust_addr3.trim();
          theArray["customer_info"]["sent_to_cus_name"] =
            this.payByCash.sent_to_cus_name.trim();
          this.$store.dispatch("myorders/setLocalStore", {
            feild: "customer_info",
            data: theArray["customer_info"],
          });
        }
      }
    },
    focusIpt(val) {
      return val.target.select();
    },
    keyPONO(e) {
      let data = this.info.po_no
      // console.log('KEY')
      var regex = /[._,/0-9a-zA-Zก-๙- ]/

      var txt = this.takeNoteDg
      // console.log(this.takeNoteDg.length)
      var char_error = false
      for (let index = 0; index < txt.length; index++) {
        const element = txt[index];
        if (!regex.test(element) || txt.charCodeAt(index) == 3647 ) {
            // console.log(element)
            this.specialtxt += element
           char_error = true
          } 
      }
      if(char_error){
        this.special_characters_error = true
      }else {
        this.special_characters_error = false
      }

      // if(this.takeNoteDg.length > 12 && !this.special_characters_error){
      //   this.digit_text = true
      //     console.log('char 13 error')
      // }else {
      //   this.digit_text = false
      // }


      // if (
      //  !regex.test(e.key) || ( e.keyCode == 3647)
      // ) {
        
      // } else if (e.keyCode == 32 && data.trimStart().length == 0) {
      //   this.info.po_no = this.info.po_no.trim();
      // } else if (e.keyCode == 32 && data.trimStart().length > 0) {
      //   this.info.po_no = this.info.po_no.trimStart();
      // }
    },
    mouseLeave() {
      this.info.customer_code = this.info.customer_coded;
    },

    closeData() {
      if (this.TitleDG === "PO.No.") {
        if (this.takeNoteDg === "") {
          this.info.po_no = "System";
        } else {
          this.info.po_no = this.takeNoteDg;
        }
      } else {
        if (this.leftBtn == "CLOSE") {
          this.info.take_note = this.takeNoteDg;
          this.$store.dispatch("myorders/setLocalStore", {
            feild: "customer_info",
            data: this.info,
          });
        } else {
          this.info.customer_code = this.fucusCustomer;
        }
      }

      this.$refs["clearData-dialog"].close();
      this.$refs["clearData-dialog-poNo"].close();
    },
    clearData() {
      if (this.leftBtn == "CLOSE") {
        this.$refs["clearData-dialog"].close();
        this.$refs["clearData-dialog-poNo"].close();
      } else {
        this.$store.dispatch("myorders/clearDataFromCUst");
        this.$refs["clearData-dialog"].close();
        this.info.customer_name = this.keepData.customer_name_th;
        this.info.customer_code = this.keepData.customer_code;

        this.$store.dispatch("myorders/getPurcheseInfo", this.keepData);
        this.$store.commit(
          "myorders/setFucusCustomers",
          this.keepData.customer_code
        );
        this.$store.dispatch("myorders/setLocalStore", {
          feild: "fucusCustomer",
          data: this.keepData.customer_code,
        });
      }
    },
    chooseCustByAll(value) {
      orService
        .filterCustomer({ keyword: value.customer_code })
        .then((response) => {
          if (response.length > 0) {
            response[0].cust_code = value.customer_code;
            this.chooseCust(response[0]);
            this.keywordCust = "";
          } else {
            this.$store.dispatch("myorders/openOrder");
          }
          this.$refs["all-cust-dialog"].close();
        })
        .catch();
    },
    chooseCust(item) {
    //  console.log("🚀 ~ file: customer-info.vue:1051 ~ chooseCust ~ item", item)
     let cus_data =  this.info
     cus_data.process_order_channel = item.process_order_channel
      sessionStorage.setItem('process_order_channel',item.process_order_channel)
      let nowDate = moment(new Date()).format("HH:mm:ss");
      let time = moment(this.info.po_date).format("YYYY-MM-DD") + " " + nowDate;
      let rs = {
        customer_code: item.customer_code,
        po_date: time,
      };
      this.$store.dispatch("myorders/getDeliveryDate", rs);
      if (this.items.length > 0 || this.itemsPromo.length > 0) {
        if (this.fucusCustomer == "") {
          this.info.customer_name = item.customer_name_th;
          this.info.customer_code = item.customer_code;
          this.$store.dispatch("myorders/getPurcheseInfo", item);
          this.$store.commit("myorders/setFucusCustomers", item.customer_code);
        } else if (this.fucusCustomer == item.customer_code) {
          this.info.customer_name = item.customer_name_th;
          this.info.customer_code = item.customer_code;
          this.$store.dispatch("myorders/getPurcheseInfo", item);
          this.$store.commit("myorders/setFucusCustomers", item.customer_code);
        } else {
          this.TitleDG = "Do you want to change customer?";
          this.subTitleDG = "All your order detail will reset to default.";
          this.leftBtn = "CHANGE & RESET";
          this.rightBtn = "NO";
          this.$refs["clearData-dialog"].open();
          this.keepData = item;
        }
      } else if (this.items.length == 0 && this.itemsPromo.length == 0) {
        // console.log(' 1  this.info =>' , this.info)
        this.info.default_discount = item.default_discount;
        this.info.customer_name = item.customer_name_th;
        this.info.customer_code = item.customer_code;
        this.$store.dispatch("myorders/getPurcheseInfo", item);
        this.$store.commit("myorders/setFucusCustomers", item.customer_code);
        // console.log('this.info =>' , this.info)
      }
    },
    chooseSalesman() {
      this.setLocalSore("salesman_code");
      let _route_name = this.$route.name;
      let route_names = _route_name.split("/");
      let data = this.info;
      if (route_names[0] == "orders-approval") {
        this.$store.dispatch(
          "myorders/getOrderChiefsales",
          Vue.localStorage.get("emp_id")
        );
      } else {
        this.$store.dispatch("myorders/checkMinimum", data.salesman_code);
        this.$store.dispatch("myorders/getOrderChiefsales", data.salesman_code);
      }
    },
    readComment(data) {
      this.$store.dispatch("myorders/readComment", data);
    },
    renderPayByCash() {
      let data = this.info;
      if (this.$store.getters["myorders/keepRouter"]) {
        if (data.order_status == "DRF" || data.order_status == "REC") {
          if (data.payByCashOld == 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    renderBtnOther() {
      let data = this.info;
      if (this.$store.getters["myorders/keepRouter"]) {
        if (data.order_status == "DRF" || data.order_status == "REC") {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    renderBtn(input) {
      let order_status = this.info.order_status;
      // console.log(this.$store.getters["myorders/keepRouter"])
      if (this.$store.getters["myorders/keepRouter"]) {
        if (
          (order_status == "DRF" || order_status == "REC" ) &&
          typeof this.disableFrom[input] != "undefined" &&
          input != "take_note"
        ) {
          if (input == "customer_code") {
            var rsItemsDel = _.filter(this.items, (item) => {
              if (
                !_.isUndefined(item.ref_po_no) &&
                _.trim(item.ref_po_no).length > 2
              ) {
                return true;
              }
            });
            if (this.info.po_no == "System") {
              return this.disableFrom[input].status;
            } else {
              if (rsItemsDel.length > 0) {
                return true;
              } else {
                return this.disableFrom[input].status;
              }
            }
          } else {
          
            return this.disableFrom[input].status;
          }
        } else if (
          (order_status == "DRF" || order_status == "REC") &&
          typeof this.disableFrom[input] != "undefined" &&
          input == "take_note"
        ) {
         
          if (this.bkMode == "KM") {
            return false;
          } else {
            return this.disableFrom[input].status;
          }
        } else {
          return true;
        }
      } else {
        if (
          (order_status == "WFA" || order_status == "FWD" ) &&
          typeof this.disableFrom[input] != "undefined"
        ) {
          return this.disableFrom[input].status;
        } else {
          return true;
        }
      }
    },
    showInpoutName(input) {
      if (typeof this.disableFrom[input] != "undefined") {
        return this.disableFrom[input].title;
      } else {
        return "";
      }
    },
    renderSalesman() {
      if (this.info.order_status === "DRF") {
        if (Vue.localStorage.get("department") == "SM") {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    renderComment() {
      let value = this.info;
      if (value.order_status == "REJ") {
        return "#F44336";
      } else if (value.count_comment == "true" && value.order_status != "DRF") {
        return "#FD7F00";
      } else {
        return "#C9C9C9";
      }
    },
    openComment(e) {
      if (this.commentOpt.display) {
        this.commentOpt.display = false;
      } else {
        let dataInfo = this.info;
        if (dataInfo.doc_no != "") {
          // this.$store.dispatch("myorders/getComment", {
          //   h_id: this.info.id,
          //   doc_no: this.info.doc_no
          // });
        }
        this.commentOpt.keepPo = e;
        this.commentOpt.display = true;
        if (this.info.order_status == "DRF") {
          this.commentOpt.top = 90;
        } else {
          this.commentOpt.top = 150;
        }
        let pos = e.target.offsetLeft + 230 + 520 - 980;
        this.commentOpt.left = pos;
      }
    },
    closeComment() {
      this.commentOpt.display = false;
    },
    openCreditInfo(e) {
      if (this.creditInfoOpt.display) {
        this.creditInfoOpt.display = false;
      } else {
        this.creditInfoOpt.keepPo = e;
        this.creditInfoOpt.display = true;
        if (this.info.order_status == "DRF") {
          this.creditInfoOpt.top = 135;
        } else {
          this.creditInfoOpt.top = 195;
        }
        let pos = e.target.offsetLeft - 450;
        this.creditInfoOpt.left = pos;
      }
    },
    closeCreditInfo() {
      this.creditInfoOpt.display = false;
    },
    Focus_Pono(){
      if( this.TitleDG == 'PO.No.' && this.info.po_no == "System" ){
        this.takeNoteDg = ''
      }
    },
    Clear_txt_po(){
      this.takeNoteDg = ''
      this.special_characters_error = false
      this.digit_text = false
      // console.log('OK')
    },
    check_(){
      this.specialtxt = ''
      var regex = /[._,/0-9a-zA-Zก-๙- ]/
      var txt = this.takeNoteDg
      var char_error = false
      for (let index = 0; index < txt.length; index++) {
        const element = txt[index];
        if (!regex.test(element) || txt.charCodeAt(index) == 3647 ) {
            this.specialtxt += element
           char_error = true
          } 
      }
      if(char_error){
        this.special_characters_error = true
      }else {
        this.special_characters_error = false
      }

      if(this.takeNoteDg.length > 13 && !this.special_characters_error){
        this.digit_text = true
      }else {
        this.digit_text = false
      }

      // console.log('check =>', this.takeNoteDg)
    },
    replyComment(value) {
      if (value != null) {
        value["popup"] = true;
        let dataInfo = this.info;
        let data = this.$store.getters["myorders/comment"];
        value.emp_id = Vue.localStorage.get("emp_id");
        value.name = Vue.localStorage.get("first_name");
        value.createdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        dataInfo.count_comment = true;
        if (
          dataInfo.id != "" &&
          dataInfo.doc_no != "" &&
          (dataInfo.order_status != "DRF" || dataInfo.order_status != "REC")
        ) {
          this.$store.dispatch("myorders/replyComment", value);
        } else {
          this.$store.commit("myorders/SET_CHECK_COMMENT", true);
          this.$store.dispatch("myorders/setLocalStore", {
            feild: "temp_comment_status",
            data: true,
          });
          data.push(value);
          this.$store.commit("myorders/SET_COMMENT", data);
          this.$store.dispatch("myorders/setLocalStore", {
            feild: "comment",
            data: data,
          });
        }
        let selectComment = this.$store.getters["myorders/comment"].filter(
          (todo) => todo.id == "new"
        );
        this.$store.commit("myorders/SET_POPUP_COMMENT", []);
        this.$store.commit("myorders/SET_POPUP_COMMENT", selectComment);

        this.$store.dispatch("myorders/setLocalStore", {
          feild: "popupComment",
          data: selectComment,
        });
      }
    },
    submitSearch(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode == 13) {
        this.$store.dispatch("myorders/filterCustomer", {
          keyword: this.info.customer_code,
          key: 1,
        });
      }
    },
    filterCust: function (param) {
      console.log('filtwer')
      this.dis_input = true;
      if (param.length > 1) {
        let _this = this;
        //     setTimeout(() => {
        //       if (param == _this.info.customer_code) {
        //         _this.$store.dispatch("myorders/filterCustomer", {
        //           keyword: param,
        //           key: 1
        //         });
        //       }
        //     }, 500);
      } else {
        let theObj = this.info;
        theObj.customer_code = "";
      }
    },
    selectedPoDate(value) {
      let date = this.info;
      let nowDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
      let nowT = moment(new Date()).format("HH:mm:ss");
      date.po_date = moment(value).format("YYYY-MM-DD") + " " + nowT;
      if (date.customer_code != "") {
        let rs = {
          customer_code: date.customer_code,
          po_date: date.po_date,
        };
        this.setLocalSore("po_date");
        this.$store.dispatch("myorders/getDeliveryDate", rs);
      } else {
        var podate = new Date(date.po_date);
        var po_dd = podate.getDate();
        var po_mm = podate.getMonth();
        var po_y = podate.getFullYear();

        if (podate == "Invalid Date") {
          this.disabledDatesDel = {
            to: new Date(po_y, po_mm, po_dd + 1),
            from: null,
          };
          let rs = new Date(po_y, po_mm, po_dd + 1);
          date.delivery_date = moment(rs).format("YYYY-MM-DD");
          this.setLocalSore("delivery_date");
        } else {
          let rs = new Date(po_y, po_mm, po_dd + 1);
          date.delivery_date = moment(rs).format("YYYY-MM-DD");
          this.setLocalSore("delivery_date");
        }
      }
    },
    selectedDelDate(value) {
      let date = this.info;
      date.delivery_date = moment(value).format("YYYY-MM-DD");

      var deDate = new Date(date.delivery_date);
      var de_dd = deDate.getDate();
      var de_mm = deDate.getMonth();
      var de_y = deDate.getFullYear();

      var poDate = new Date(date.po_date);
      var po_dd = poDate.getDate();
      var po_mm = poDate.getMonth();
      var po_y = poDate.getFullYear();

      var a = moment([de_y, de_mm - 1, de_dd]);
      var b = moment([po_y, po_mm - 1, po_dd]);
      let rs = a.diff(b, "days");
      if (rs < 0) {
        if (deDate == "Invalid Date") {
          this.disabledDatesDel = {
            to: new Date(de_y, po_mm, de_dd - 1),
            from: null,
          };
          let rs = new Date(de_y, de_mm, de_dd - 1);
          date.po_date = moment(rs).format("YYYY-MM-DD HH:mm:ss");
          this.setLocalSore("po_date");
        } else {
          let rs = new Date(de_y, de_mm, de_dd - 1);
          date.po_date = moment(rs).format("YYYY-MM-DD HH:mm:ss");
          this.setLocalSore("po_date");
        }
      }
    },
    customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  components: {
    Datepicker,
    "md-search-box": require("./md-search-box"),
    "md-comment-dialog": require("../../Salesops/customComponent/md-comment-dialog"),
    "md-creditinfo-dialog": require("../../Salesops/customComponent/md-credit-info-dialog"),
    "md-auto-focus-box": require("../../Salesops/customComponent/md-auto-focus-box"),
  },
};
</script>
<style lang="scss" scoped>
$color-primary: #fd7f00;
$color-green: #66bb6a;
$color-red: #f44336;
$color-light-gray: #efefef;
$font-roboto: Roboto;
$font-lato: Lato;
$font-kanit: Kanit;
.customer-info-box {
  padding-left: 5px;
  padding-top: 10px;
  #takeNoteIP {
    input {
      font-size: 12px !important;
    }
  }
  .show-take-note {
    z-index: 30;
    width: 200px;
    height: auto;
    word-break: break-word;
    position: absolute;
    background: rgb(168, 168, 168);
    right: 20px;
    border-radius: 4px;
    padding: 10px;
    color: #fff;
    font-family: kanit;
  }
  .takeNoteIP {
    .show-take-note {
      visibility: hidden;
    }
  }
  .takeNoteIP:hover {
    .show-take-note {
      visibility: visible;
    }
  }
  .md-input-container.md-input-disabled:after {
    background-color: rgba(0, 0, 0, 0.12) !important;
    background-image: unset;
  }
  .md-input-container.md-input-disabled label {
    color: #727272;
  }
  .topic {
    color: #727272;
    font-size: 12px;
    font-family: $font-roboto;
  }
  .bg-filter-blog,
  .bg-filter {
    margin-top: 6px;
    background: #f8f8f8;
    border-radius: 3px;
    .md-input-container {
      font-family: $font-roboto;
      &.md-has-value input {
        font-size: 13px !important;
        color: #414141;
      }
      .md-select {
        .md-select-value {
          font-size: 13px !important;
          color: #414141;
        }
      }
    }
    .md-input-container:after {
      background-color: $color-primary;
    }
    .no-underline {
      &.md-input-container:after {
        display: none;
        // background-color: #f8f8f8;
      }
    }
  }
  .comment {
    .md-button.md-icon-button {
      width: 24px;
      min-width: 24px;
      height: 24px;
      min-height: 24px;
      .md-icon {
        font-size: 13px;
        color: #ffffff;
        padding-top: 5px;
      }
    }
  }
  .bg-filter {
    padding: 5px 20px 0.2px 20px;
  }
  .bg-filter-blog {
    padding: 5px 0px 0px 20px;
  }
}
.paybycash.md-input-container {
  min-height: 28px;
  padding-top: 0px;
  margin: 0px;
  label {
    top: 8px;
    color: #a8a8a8;
    font-size: 12px;
    font-family: roboto;
  }
}
.error-paybtcash {
  font-family: Roboto;
  padding-top: 3px;
  font-size: 11px !important;
  color: #f44336;
}
.paybycash.md-input-container.md-input-disabled input {
  // background-color: #fd7f00;
  font-family: kanit;
  color: rgba(0, 0, 0, 0.87);
}
.paybycash.md-input-container.md-input-disabled:after {
  background-image: none;
  background-color: rgba(0, 0, 0, 0.12);
}
.cust-detail-scroll-table {
  overflow-y: auto;
  overflow-x: hidden;
  .detail-table {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .detail-table:hover {
    background: #efefef;
    border-radius: 3px;
    cursor: pointer;
  }
}
.cust-detail-scroll-table::-webkit-scrollbar {
  height: 7px;
  width: 8px;
  background: #f7f7f7;
}
.cust-detail-scroll-table::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.11);
  border-radius: 5px;
}
</style>
