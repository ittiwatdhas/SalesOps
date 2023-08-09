<template>
  <md-input-container class="md-input-invalid">
    <!-- maxlength="8"-->
    <md-input
      type="text"
      v-model="displayValue"
      @blur="calculateOther"
      @keypress.native="isNumber"
      v-on:change="calculate"
      @focus="isInputActive = true"
      class="text-right"
      @focus.native="$event.target.select()"
      @keyup.enter.native.prevent="nextTab"
      :maxlength="maxChar"
    ></md-input>
    <!-- v-model="row.adjusted" -->
    <div class="md-error" v-if="table == 3">{{warningText}}</div>
  </md-input-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created: function() {
    this.tmpData = this.value;
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // console.log(this.value);
          if (!isNaN(parseFloat(this.value))) {
            var test = this.value.toString().indexOf(".");
            if (test == -1) {
              return this.value.toString();
            } else {
              if (this.value != "") {
                if (this.table == 1) {
                  return parseFloat(this.value)
                    .toFixed(2)
                    .toString();
                } else {
                  return parseFloat(this.value)
                    .toFixed(0)
                    .toString();
                }
              } else {
                return this.value;
              }
            }
          }
        } else {
          // console.log("--------------------")
          if (this.value != "") {
            if (this.table == 1) {
              return parseFloat(this.value)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
              return parseFloat(this.value)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          } else {
            // let mode = this.$store.getters.sp_event_ipt;
            // if (!this.$store.getters.sp_event_ipt) {
            //   mode = true;
            return this.value;
            // } else {
            //   mode = true;
            //   return 0;
            // }
          }
        }
      },
      set: function(modifiedValue) {
        // console.log("---> set");
        // this.$store.getters.sp_event_ipt = true;
        let newValue = 0;
        if (modifiedValue == "") {
          newValue = 0;
        } else {
          if (this.table == 1) {
            newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
            if (isNaN(newValue)) {
              newValue = 0;
            }
          } else {
            newValue = modifiedValue;
          }
        }
        var test = newValue.toString().indexOf(".");
        if (test == -1) {
          this.$emit("input", parseInt(newValue));
        } else {
          this.$emit("input", parseFloat(newValue));
        }
      }
    }
  },
  props: {
    value: {},
    type: {},
    index: {},
    indexDetail: {},
    table: {},
    maxChar: {}
  },
  data() {
    return {
      isInputActive: false,
      tmpData: 0,
      warningText: "",
      arrayParent: [],
      arrayChild: [],
      theArrayTemp: [],
      theArrayFullTemp: [],
      keepInput: "",
      keepEvent: false
    };
  },
  methods: {
    nextTab(e) {
      if (this.table > 1) {
        this.keepInput = e;
        this.setNextTab();
      }
      // console.log("keepEvent => ", this.keepEvent);
    },
    isNumber(evt) {
      // console.log("isNumber",evt);
      // if (this.table > 1 && this.displayValue.length > 6) {
      //   evt.preventDefault();
      // }
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode == 13) {
        if (this.table == 1) {
          this.calculateOther();
        }
      } else if (
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
    calculateOther() {
      // console.log("calculateOther--> ", this.value);
      this.isInputActive = false;

      if (navigator.userAgent.match(/Android/i) && !this.keepEvent) {
        if (isNaN(parseFloat(this.value))) {
          this.keepEvent = false;
        } else {
          this.keepEvent = true;
        }
      }

      if (this.table == 1) {
        this.saveData();
      } else if (this.table == 2 && this.keepEvent) {
        this.saveData();
      } else if (this.table == 3 && this.keepEvent) {
        this.saveData();
      }
    },
    saveData() {
      if (this.table == 1) {
        let theArray = this.$store.getters.sp_data.by_cus;
        this.$store.dispatch("saveTargetPerCust", {
          year: this.$store.getters.sp_date_selected.year,
          month: this.$store.getters.sp_date_selected.month_id,
          cust_code: theArray[this.index].customer[this.indexDetail].cust_code,
          area_code: theArray[this.index].prov_code,
          target: theArray[this.index].customer[this.indexDetail].target,
          selected: theArray[this.index].customer[this.indexDetail].checked,
          //   cust_code: this.arrayChild.cust_code,
          // area_code: theArray[this.index].prov_code,
          //   target: this.arrayChild.target,
          //   selected: this.arrayChild.checked,
          rowIndex: this.index
        });
      } else if (this.table == 2) {
        this.setNextTab();
        this.setCheckedBox();
        let theArray = this.$store.getters.sp_arr_sales;
        theArray[this.index].book_mark = 1;
        this.$store.dispatch("saveOrderQtyOfItem", {
          year: this.$store.getters.sp_cust_head.year,
          month: this.$store.getters.sp_cust_head.month,
          cust_code: this.$store.getters.sp_cust_selected.cust_code,
          prod_grp: this.arrayParent.prod_code,
          grp_order_qty: this.arrayParent.order_qty,
          prod_code: 0,
          order_qty: 0,
          sales_item: 0,
          rowIndex: this.index
        });
      } else if (this.table == 3) {
        let arrayParent = this.arrayParent;
        let arrayChild = this.arrayChild;
        if (arrayParent.length > 0) {
          this.keepEvent = true;
          this.warningText = "";
          let sum =
            parseFloat(this.value) *
            parseFloat(arrayChild[this.indexDetail].ppu);
          arrayChild[this.indexDetail].sales = sum;
          let sumDetailSales = 0;
          for (let k = 0; k < arrayChild.length; k++) {
            sumDetailSales = sumDetailSales + parseFloat(arrayChild[k].sales);
          }

          arrayParent[this.index].sales_temp = sumDetailSales;
          arrayParent[this.index].detail = arrayChild;
          let sumSales = 0;
          for (let k = 0; k < arrayParent.length; k++) {
            if (isNaN(parseFloat(arrayParent[k].sales))) {
              sumSales = sumSales + 0;
            } else {
              sumSales = sumSales + parseFloat(arrayParent[k].sales);
            }
          }
          let cust_selected = this.$store.getters.sp_cust_selected;
          cust_selected.achieved = sumSales;
          let per = (cust_selected.achieved * 100) / cust_selected.target;
          cust_selected.progress = parseFloat(per);
          cust_selected.percent = this.checkPoint(per);

          this.$store.dispatch("saveOrderQtyOfItem", {
            year: this.$store.getters.sp_cust_head.year,
            month: this.$store.getters.sp_cust_head.month,
            cust_code: this.$store.getters.sp_cust_selected.cust_code,
            prod_grp: this.arrayParent[this.index].prod_code,
            grp_order_qty: this.arrayParent[this.index].order_qty,
            prod_code: this.arrayChild[this.indexDetail].product_code,
            order_qty: this.arrayChild[this.indexDetail].order_qty,
            sales_item: this.arrayChild[this.indexDetail].sales,
            rowIndex: this.index
          });
          this.setCheckedBox();
          this.setNextTab();
          // console.log("0 ==>");

          if (this.value > 0) {
            // console.log("1 ==>");
            let code = arrayChild[this.indexDetail].product_code;
            this.$store.dispatch("getStock", {
              prod_code: code,
              cust_code: this.$store.getters.sp_cust_selected.cust_code,
            });
            this.keepEvent = false;
            setTimeout(() => {
              if (
                parseFloat(this.value) >
                parseFloat(this.$store.getters.sp_check_stock.stock)
              ) {
                let warnningVal = parseFloat(
                  this.$store.getters.sp_check_stock.stock
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                });
                arrayChild[this.indexDetail].sales = 0;
                this.warningText = warnningVal + " left in stock";
                this.keepEvent = true;

                // console.log(
                //   "1-1 ==>",
                //   this.$store.getters.sp_check_stock.stock
                // );
                // this.setNextTab();
              }
            }, 800);
          } else {
            // console.log("2 ==>");
            this.setNextTab();
            this.warningText = "";
            let ppu = parseFloat(arrayChild[this.indexDetail].ppu);
            let nowVal = parseFloat(this.value);
            if (isNaN(ppu)) {
              ppu = 0;
            }
            if (isNaN(nowVal)) {
              nowVal = 0;
            }
            let sum = nowVal * ppu;
            arrayChild[this.indexDetail].sales = sum;
            let sumDetailSales = 0;
            for (let k = 0; k < arrayChild.length; k++) {
              sumDetailSales = sumDetailSales + parseFloat(arrayChild[k].sales);
            }
            arrayParent[this.index].sales_temp = sumDetailSales;
            arrayParent[this.index].detail = arrayChild;
            let sumSales = 0;
            for (let k = 0; k < arrayParent.length; k++) {
              if (isNaN(parseFloat(arrayParent[k].sales))) {
                sumSales = sumSales + 0;
              } else {
                sumSales = sumSales + parseFloat(arrayParent[k].sales);
              }
            }
            let cust_selected = this.$store.getters.sp_cust_selected;
            cust_selected.achieved = sumSales;
            let per = (cust_selected.achieved * 100) / cust_selected.target;
            cust_selected.progress = parseFloat(per);
            cust_selected.percent = this.checkPoint(per);

            this.$store.dispatch("saveOrderQtyOfItem", {
              year: this.$store.getters.sp_cust_head.year,
              month: this.$store.getters.sp_cust_head.month,
              cust_code: this.$store.getters.sp_cust_selected.cust_code,
              prod_grp: this.arrayParent[this.index].prod_code,
              grp_order_qty: this.arrayParent[this.index].order_qty,
              prod_code: this.arrayChild[this.indexDetail].product_code,
              order_qty: this.arrayChild[this.indexDetail].order_qty,
              sales_item: this.arrayChild[this.indexDetail].sales,
              rowIndex: this.index
            });
            this.setCheckedBox();
          }
        }
      }
    },
    calculate(e) {
      if (this.table == 1) {
        let theArray = this.$store.getters.sp_data.by_cus;
        if (theArray.length > 0) {
          if (theArray[this.index].customer.length > 0) {
            let objMom = this.$store.getters.sp_data.by_cus[this.index];
            let obj = objMom.customer[this.indexDetail];
            obj.checked = true;
            obj.target = e;
            this.arrayParent = objMom;
            this.arrayChild = obj;
          }
        }
      } else if (this.table == 2) {
        let arrayParent = this.$store.getters.sp_arr_sales;
        if (arrayParent[this.index].order_qty >= 0 && arrayParent.length > 0) {
          this.arrayParent = arrayParent[this.index];
          this.arrayChild = [];
        }
      } else if (this.table == 3) {
        let arrayParent = this.$store.getters.sp_arr_sales;
        if (arrayParent.length > 0) {
          let arrayChild = this.$store.getters.sp_arr_sales[this.index].detail;
          if (arrayChild.length > 0) {
            this.arrayParent = arrayParent;
            this.arrayChild = arrayChild;
          }
        }
      } else if (this.table == 10) {
        let data = this.$store.getters.sp_create_order;
        if (e != "") {
          data[this.index].sales = e * data[this.index].ppu;
        }
      }
      if (this.table == 3) {
        let checkData = this.$store.getters.sp_arr_sales;
        let qtyData = checkData.filter(todo => todo.sales > 0);
        if (qtyData.length == 1 || qtyData.length == 0) {
          this.$store.commit("SET_SP_CHECK_COLOR_BTN", false);
        } else {
          this.$store.commit("SET_SP_CHECK_COLOR_BTN", true);
        }
      }
    },
    setNextTab() {
      if (this.keepInput != "") {
        var el = this.keepInput.target.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement;
        if (el.classList.contains("floating-sub-box")) {
          var input_detail = this.keepInput.target.parentElement.parentElement
            .parentElement.nextSibling;
          if (input_detail.nodeName == "#text") {
            var el = this.keepInput.target.parentElement.parentElement
              .parentElement.parentElement.parentElement.parentElement
              .parentElement.nextSibling;
            if (el != null) el.querySelector("input").focus();
          } else {
            input_detail.querySelector("input").focus();
          }
        } else {
          if (
            this.keepInput.target.parentElement.parentElement.parentElement.nextSibling.nextSibling.classList.contains(
              "hide-tag"
            )
          ) {
            var el = this.keepInput.target.parentElement.parentElement
              .parentElement.parentElement.nextSibling;
            if (el != null) {
              el.querySelector("input").focus();
            }
          } else {
            var el = this.keepInput.target.parentElement.parentElement
              .parentElement.parentElement;
            if (el) el.querySelectorAll("input")[1].focus();
          }
        }
      }
      // e.target.parentElement.parentElement.parentElement.nextSibling.children[2].children[0].children[0].focus();
    },
    setCheckedBox() {
      let custHead = this.$store.getters.sp_cust_head;
      let theArrayGround = this.$store.getters.sp_data;
      let obj =
        theArrayGround.by_cus[custHead.rowIndex].customer[custHead.indexDetail];
      if (!custHead.full.checked) {
        obj.checked = true;
        this.$store.dispatch("saveTargetPerCust", {
          year: this.$store.getters.sp_date_selected.year,
          month: this.$store.getters.sp_date_selected.month_id,
          cust_code: custHead.cust_code,
          area_code: theArrayGround.by_cus[custHead.rowIndex].prov_code,
          target: obj.target,
          selected: true,
          rowIndex: custHead.rowIndex
        });
      }
    },
    checkPoint(value) {
      let str = value.toString().split(".");
      if (str.length == 1) {
        return parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      } else {
        let sunStr = str[1].length;
        if (sunStr == 2 && str[1] == "00") {
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) == "0"
        ) {
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          });
        } else if (
          sunStr == 2 &&
          str[1].substr(0, 1) != "0" &&
          str[1].substr(1, 1) != "0"
        ) {
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        } else if (sunStr > 2) {
          let statVal = parseFloat(value)
            .toString()
            .split(".");
          let val =
            statVal[0] + "." + str[1].substr(0, 1) + str[1].substr(1, 1);
          return val;
        } else {
          return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          // console.log("else => ", value);
        }
      }
    }
  }
};
</script>