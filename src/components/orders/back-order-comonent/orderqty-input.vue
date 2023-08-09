<template>
  <div>
    <md-input-container :class="'md-promotion-ipt'">
      <md-input
        :id="id"
        type="text"
        v-model="displayValue"
        class="text-right"
        :disabled="readOnly"
        @blur="calculateOther"
        @keypress.native="isNumber"
        @focus="isInputActive = true"
        @focus.native="$event.target.select()"
      ></md-input>
    </md-input-container>
    <md-dialog ref="md-confirm-input-dialog">
      <md-dialog-title>{{dgTitle}}</md-dialog-title>
      <md-dialog-content></md-dialog-content>
      <md-dialog-actions>
        <md-button @click="close" class="md-primary">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div> 
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import Vue from "vue";
export default {
  created: function() {
    this.tmpData = this.value;
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          if (this.value == "") {
            return 0;
          } else {
            return this.value;
          }
        } else {
          return this.$store.getters["globalfunc/formatNumberInt"](this.value);
        }
      },
      set: function(modifiedValue) {
        let value = this.checkIsNaN(modifiedValue) ? 0 : modifiedValue;
        let newValue = 0;
        newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
        if (this.checkIsNaN(newValue)) {
          newValue = 0;
        } else {
          newValue = modifiedValue;
        }
        var test = newValue.toString().indexOf(".");
        if (test == -1) {
          this.$emit("input", parseInt(newValue));
        } else {
          this.$emit("input", parseFloat(newValue));
        }
        this.$nextTick(() => {
          let data = this.detail.customer[this.index];
          let temp = _.cloneDeep(this.detail);
          let total_stock = parseInt(this.detail.sum["total_stock"]);
          let adjust = parseInt(value);
          let qty = parseInt(data.qty);
          let chk = temp["customer"].filter(todo => todo.checked == true);
          if (data.checked) {
            let total = chk.reduce((acc, row) => acc + parseInt(row.adjust), 0);
            if (adjust < qty && total > total_stock) {
              data.adjust = 0;
              this.dgTitle = "ไม่สามารถกรอก Adjust ได้มากกว่า QTY";
              this.$refs["md-confirm-input-dialog"].open();
              console.log("1 =>");
            } else if (adjust > qty && total > total_stock) {
              data.adjust = 0;
              this.dgTitle = "ไม่สามารถกรอก Adjust ได้มากกว่า Total Stock";
              this.$refs["md-confirm-input-dialog"].open();
              console.log("2 =>");
            } else if (adjust > qty && total < total_stock) {
              data.adjust = 0;
              this.dgTitle = "ไม่สามารถกรอก Adjust ได้มากกว่า QTY";
              this.$refs["md-confirm-input-dialog"].open();
              console.log("3 =>");
            }
          } else {
            if (adjust > qty) {
              data.adjust = data.qty;
              this.dgTitle = "ไม่สามารถกรอก Adjust ได้มากกว่า QTY";
              this.$refs["md-confirm-input-dialog"].open();
            }
          }
          this.sumTotal();
        });
      }
    },
    detail() {
      return this.$store.getters["backordmanage/detail"];
    }
  },
  watch: {
    displayValue(value) {}
  },
  props: {
    value: {},
    type: {},
    index: {},
    table: {},
    readOnly: {},
    id: ""
  },
  data() {
    return {
      isInputActive: false,
      keepInput: "",
      keepEvent: false,
      dgTitle: ""
    };
  },
  methods: {
    sumTotal() {
      let chk = this.detail["customer"].filter(todo => todo.checked == true);
      let totalAfter = chk.reduce((acc, row) => acc + parseInt(row.adjust), 0);
      let total = this.detail.sum["total_stock"] - totalAfter;
      this.detail.sum["balance"] = total;
    },
    calculateOther() {
      this.isInputActive = false;
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
    checkIsNaN(val) {
      return isNaN(parseFloat(val));
    },
    close() {
      this.$refs["md-confirm-input-dialog"].close();
    },
    setNextTab() {
      if (this.keepInput != "") {
        var el = this.keepInput.target.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.md-promotion-ipt {
  margin: unset;
  padding: unset;
  min-height: 30px !important;
}
.md-input-container.md-has-value input {
  font-family: roboto;
  font-size: 13px;
  opacity: 0.8;
}
.md-input-container:after {
  background-color: #fd7f00;
}
</style>
