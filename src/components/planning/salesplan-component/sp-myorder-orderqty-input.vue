<template>
  <md-input-container class="md-input-invalid">
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
      this.isInputActive = false;
    },
    calculate(e) {
      // console.log("calculate => ", e);
      if (isNaN(parseFloat(e))) {
        this.$store.getters.sp_create_order[this.index].sales = 0;
        this.$store.getters.sp_create_order[this.index].net_amount = 0;
        this.$store.getters.sp_create_order[this.index].amount = 0;
      } else {
        // console.log("-->");
      }
    }
  }
};
</script>