<template>
  <div id="pageDelivery">
    <div style="width:100%;display:-webkit-box;" class="detail-scroll-table">
      <div
        v-show="spinner"
        style="position: absolute;z-index: 10000;width: 100%;
                  height: 100%;background: #EFEFEF;
                  opacity: 0.1;"
      ></div>
        <table width="100%" cellpadding="10" > 
          <tbody>
          <!-- <tr class="nPrint">
          <td colspan="2" align="right"> 
            <md-icon
              @click.native="checkPrint()"
              style="cursor:pointer;margin-right:30px;color:#FD7F00"
            >print</md-icon>
            <md-icon
              @click.native="checkCLose('delivery')"
              style="cursor:pointer;"
            >close</md-icon>
          </td>
        </tr> -->
          <tr>
            <td colspan="2" align="right">
              <table>
                <tbody>
                  <tr>
                    <td style="font-size:14px;">
                      <i>FR-F01-005 / Revision No. : 02</i>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;">
                      <i>Effective Date : 08/09/15</i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <b style="font-size:24px;">Delivery Temporarily</b>
              <span style="float:right; font-size:16px;" >Order No...................</span>
            </td>
          </tr>
          <tr>
            <td style="font-size:17px;">
              <b style="font-size:17px;">DHA Siamwalla Ltd.</b><br><br> 202 Surawong Road, Si Phraya , Bang Rak , Bangkok 10500<br><br> Tel. (02) 668-0123 Fax. 02-267-2396<br><br> <span>Commercial Registration No. 10 37 3576 Tax ID. 0105485000257</span>
            </td>
            <td width="49%" style="font-size:16px;">
              <div style="border:1px solid black">
                <table width="100%">
                  <tbody>
                    <tr>
                      <td>Tel. Customer Relations: 02-668-0123</td>
                    </tr>
                    <tr>
                      <td>Tel. Loan / Finance: 02-668-0123 Ext. 5513</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">                     
            <table width="100%" cellspacing="0" cellpadding="0" border="1" style="border-collapse:collapse;font-size:17px;">
              <tbody>
                <tr>
                  <td colspan="8" valign="top" style="font-size:18px;"> &nbsp;Sell to : {{delivery_head.sell_to}}<br> &nbsp;Address : {{delivery_head.sell_to_address}}<br>
                  <td colspan="3" valign="top" width="150">
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td align="center">Note  :  Sales department</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" id="checkall" onclick="return false;" title=""> &nbsp;&nbsp;Contact .................................<br><br>.....................................................</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" id="checkall" onclick="return false;" title=""> &nbsp;&nbsp;SALES ORDER ..........................</td></tr><tr><td><input type="checkbox" id="checkall" onclick="return false;" title=""> &nbsp;&nbsp;Get to Order from the department. .............................</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr style="height: 20px;">
                  <td align="center">Invoice No.</td>
                  <td align="center">Day Month Year</td>
                  <td align="center">Customer No.</td>
                  <td align="center">Seller No.</td>
                  <td align="center">According to Order No.</td>
                  <td align="center" colspan="2">Delivery Date</td>
                  <td align="center">Warehouse code</td>
                  <td align="center" nowrap="">Cashiers</td>
                  <td align="center">Send way</td>
                  <td align="center">Payments are due.</td>
                </tr>
                <tr>
                  <td align="center">-</td>
                  <td align="center">{{showTime(delivery_head.po_date)}}</td>
                  <td align="center">{{delivery_head.cust_code}}</td
                  ><td align="center">{{delivery_head.sm_code}}</td>
                  <td align="center">{{delivery_head.po_no}}</td>
                  <td align="center" colspan="2">{{showTime(delivery_head.delivery_date)}}</td>
                  <td align="center">-</td>
                  <td align="center">-</td>
                  <td align="center">-</td>
                  <td align="center">{{delivery_head.credit_term_title}}</td>
                </tr>
                <tr>
                  <td align="center" colspan="5" rowspan="2">Product</td>
                  <td align="center" colspan="2">Amount</td>
                  <td align="center" rowspan="2">Product unit</td>
                  <td align="center" colspan="2">Price/Unit price</td
                  ><td align="center" rowspan="2">Price amount</td>
                </tr>
                <tr>
                  <td align="center" width="60">Unit amount</td>
                  <td align="center" width="60">Over</td>
                  <td align="center" width="65">Full price</td>
                  <td align="center" width="65">Net Amount</td>
                </tr> 
                <tr style="height: 25px;" v-for="(row , index) in delivery_items">
                  <td colspan="5">&nbsp;{{row.item_code}} {{row.item_name}}</td>
                  <td align="center">{{formatNumber(row.order_qty)}}</td>
                  <td align="center">-</td>
                  <td align="center">{{row.unit_id}}</td> 
                  <td align="right">{{formatNumber(row.priceVD)}}&nbsp;&nbsp;</td>
                  <td align="right">{{formatNumber(row.price)}}&nbsp;&nbsp;</td>
                  <td align="right">{{formatNumber(row.net_amount)}}&nbsp;&nbsp;</td> 
                </tr> 
                <tr>
                  <td rowspan="2" colspan="5" valign="top"> &nbsp;ส่งของที่  : {{delivery_head.ship_to_title}}</td>
                  <td colspan="5" height="25" align="center">&nbsp;&nbsp;Product values</td>
                  <td align="right">{{formatNumber(delivery_total.pro_value)}}&nbsp;&nbsp;</td>
                </tr>
                <tr>
                  <td colspan="5" height="25" align="center">&nbsp;&nbsp;VAT</td> 
                  <td align="right">{{formatNumber(delivery_total.vat)}}&nbsp;&nbsp;</td>
                </tr>
                <tr style="height: 40px;"><td colspan="5"></td>
                  <td colspan="5" align="center"><b>Total Amount</b></td>
                  <td align="right">{{formatNumber(delivery_total.sum_total)}}&nbsp;&nbsp;</td>
                </tr> 
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="font-size:16px;" valign="top"> <br>Represent DHA Siamwalla Ltd.<br><br> Product listed above have been completed.<br><br> Recipient...................Date.................<br><br> This product is owned by the seller until the buyer completes payment.<br><br><br> 
          <span style="float:right;font-size:16px;">Master copy – Customer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <br><br> Running ........................</td>
          <td valign="top">
            <div style="border:1px solid black">
              <table width="100%" style="height: 50px;">
                <tbody>
                  <tr>
                    <td valign="top" style="font-size:14px;" nowrap="nowrap"><span style="text-decoration: underline;"><b>Warning</b></span></td>
                    <td valign="top" style="font-size:14px;"> The bill empowers the employees who receive payment from you just crossed.<br> No Transfer, Account payee only on check that is not crossed or Paid in cash.<br> Check that is not crossed, We will not responsible decisive.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table width="100%">
                <tbody>
                  <tr>
                    <td width="60" nowrap="nowrap" style="font-size:16px;"> Note :</td>
                    <td style="font-size:16px;">• To edit any of the numbers in the Invoice is void.</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size:16px;">• The company will charge interest at the rate of interest on bank loans at that time after the expiration of which must be paid.</td></tr><tr><td></td>
                    <td style="font-size:16px;">• Payment is required. The receipts of the company which is a signature of the recipient is the key.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr class="nPrint">
          <td colspan="2" align="right" id="bnt-print"> 
            <md-icon 
              @click.native="checkPrint()"
              style="cursor:pointer;margin-right:30px;color:#FD7F00"
            >print</md-icon>
             <md-icon
              @click.native="checkCLose()"
              style="cursor:pointer;"
            >close</md-icon>
            
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>
<script>

import Vue from "vue";
import moment from "moment";
// import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import orService from "@/services/orders/myorders";

export default {
  created() {
    this.getdata(this.$route.query);
    this.$store.commit("SET_STATUS_LOGIN", false);
  },

  data() {
    return {
      name: name,
      spinner: false,
      delivery_items:[],
      delivery_head:{
        cust_code: "",
        customer_name_th: "",
        customer_address: "",
        sm_code: "",
        po_no: "",
        po_date: "",
        delivery_date: "",
        credit_term_title: "",
        sell_to: "",
        sell_to_address: ""
      },
      delivery_total:{
        pro_value : 0,
        vat : 0,
        sum_total : 0
      },
    };
  },
  watch: {
   
  },
  computed: {
    
  },
  methods: {
    checkCLose() {
      window.close();	
    },
    checkPrint() {
    	document.getElementById('bnt-print').style.display = 'none';
      window.print()
      document.getElementById('bnt-print').style.display = '';
    },
    showTime(value) {
      // return moment(new Date(value)).format("DD/MM/YYYY");
      return moment(new Date(value)).format("DD-MM-YYYY");
    },
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    getdata(value) {
      orService
        .getOrderDeliveryById(value)
        .then(response => {
          
          let temp = [];
          let total = {};
          if(response.order_head[0]){
            let sum_net_amount = parseFloat(response.order_head[0].total_netamount);
            let vat = parseFloat((sum_net_amount * 7) /100);
            total = {
              pro_value : sum_net_amount,
              vat : vat,
              sum_total : sum_net_amount + vat,
            }
            this.delivery_total = total
          }
          this.delivery_items = response.items;
          this.delivery_head =  response.order_head[0];
         }).catch();
    }
  },
  components: {
    
    
  }
};
</script>
<style lang="scss" scoped>
  .detail-scroll-table {
    overflow-y: auto;
    overflow-x: hidden;
    text-align: left !important;
    background-color: white;
    // height: 550px;
  }
  #pageDelivery{
    font-family : Arial !important;
    background-color: white;
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 40px;
  }
</style>
<style lang="scss">
// #delivery_dialog {
//   .md-dialog{
//     margin-left: 0px !important;
//     height: 100%;
//     max-height: 100%;
//     width: 95%;
//     max-width: 95%;
//   }
// }
#app{
  .vue-back-to-top{
    display: none;
  }

}

</style>

