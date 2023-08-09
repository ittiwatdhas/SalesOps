<template>
  <md-input-container :class="'md-promotion-ipt'">
    <md-input
      :id="id"
      type="text"
      v-model="displayValue"
      class="text-right"
      maxlength="9"
      @focus="isInputActive = true"
      @keypress.native="isNumber"
      @focus.native="$event.target.select()"
    ></md-input>
  </md-input-container>
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
          var test = this.value.toString().indexOf(".");
          if (test == -1) {
            return this.value.toString();
          } else {
            if (this.value != "") {
              if (this.table == "ppuItem" || this.table == "ppuVol") {
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
          if (this.value != "") {
            if (this.table == "ppuItem" || this.table == "ppuVol") {
              return (
                "฿ " +
                parseFloat(this.value)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              return parseFloat(this.value)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          } else {
            return this.value;
          }
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
      }
    }
  },
  watch: {},
  props: {
    value: {},
    index: {},
    id: ""
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
      keepEvent: false,
      changeSet: {
        name: ""
      }
      // warningStock: ""
    };
  },
  methods: {
    checkIsNaN(val) {
      return isNaN(parseFloat(val));
    },
      isNumber(evt) {
      // if (this.displayValue.length > 6) {
      //   evt.preventDefault();
      // }
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      
      if (charCode == 13) {
        // this.calculateOther();
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
  }
};
</script>
<style lang="scss" scoped>
.md-input-container .md-error {
  padding-top: 5px;
  opacity: unset;
  color: #f44336;
  font-size: 11px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
