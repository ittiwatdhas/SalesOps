<template>
  <div
    class="credit-info-dialog"
    v-click-outside="outsideCreditInfo"
    v-show="option.display"
    :style="{'top': option.top +'px','left': option.left +'px','position':'absolute','z-index':'1000'}"
  >
    <md-layout class="md-head">
      <md-layout md-flex-large="90">
        <label class="md-title">Credit info</label>
      </md-layout>
      <md-layout md-flex-large="10" md-align="end">
        <md-button class="md-icon-button" @click="close">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="right">close</md-tooltip>
        </md-button>
      </md-layout>
    </md-layout>
    <md-layout class="md-body">
      <div style="display:flex;width:100%">
        <md-input-container style="margin-bottom:13px;width:30%">
          <label>{{showInpoutName('credit_term')}}</label>
          <md-input :value="$store.getters['globalfunc/formatNumber'](data.credit_limit)" readonly></md-input>
        </md-input-container>
        <md-input-container style="margin-bottom:13px;width:40%;margin-left:30px">
          <label>Outstanding Payment</label>
          <md-input :value="$store.getters['globalfunc/formatNumber'](data.outstanding)" readonly></md-input>
        </md-input-container>
        <md-input-container style="margin-bottom:13px;width:30%;margin-left:30px">
          <label>Order Value</label>
          <md-input :value="$store.getters['globalfunc/formatNumber'](data.order_value)" readonly></md-input>
        </md-input-container>
      </div>
      <div style="display:flex;width:100%">
        <md-input-container style="margin-bottom:13px;width:27%">
          <label>Balance</label>
          <md-input :value="$store.getters['globalfunc/formatNumber'](data.balance)" readonly></md-input>
        </md-input-container>
        <md-input-container class="term" style="margin-bottom:13px;width:63%;margin-left:20px">
          <label>Credit Term</label>
          <md-select v-model="data.credit_term_code" :disabled="disabled">
            <md-option
              :value="items.code"
              v-for="items in $store.getters['myorders/creditterm']"
              :key="'shipto'+items.code"
            >{{items.title}}</md-option>
          </md-select>
        </md-input-container>
        <md-input-container style="margin-bottom:13px;width:10%;margin-left:20px">
          <label>Grade</label>
          <md-input v-model="data.credit_rating" readonly></md-input>
        </md-input-container>
      </div>
      <div style="display:flex;width:100%">
        <md-input-container style="margin-bottom:13px;width:40%;">
          <label>Price Policy</label>
          <md-input v-model="data.price_policy_title" readonly></md-input>
        </md-input-container>
        <md-input-container style="margin-bottom:13px;width:40%;margin-left:5%">
          <label>Customer Channel</label>
          <md-input v-model="data.customer_channel_title" readonly></md-input>
        </md-input-container>
        <md-input-container style="margin-bottom:13px;width:20%;margin-left:20px">
          <label>Price</label>
          <!-- <md-input v-model="data.pricetype_code" readonly></md-input> -->
          <md-input :value="renderPrice(data)" readonly></md-input>
        </md-input-container>
      </div>
    </md-layout>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
var show_comment = true;
export default {
  created() {},
  props: ["data", "option", "disabled"],
  data() {
    return {};
  },
  computed: {
    disableFrom() {
      return this.$store.getters["myorders/disableFrom"];
    }
  },
  methods: {
    renderPrice(data) {
      if (_.toUpper(data.price_policy_code) == "BOOK") {
        return data.pricebook_code;
      } else if (_.toUpper(data.price_policy_code) == "AUTO") {
        return data.pricetype_code;
      } else if (_.toUpper(data.price_policy_code) == "MIX") {
        return data.pricebook_code + "," + data.pricefix_code;
      } else {
        return data.pricefix_code;
      }
    },
    showInpoutName(input) {
      if (typeof this.disableFrom[input] != "undefined") {
        return this.disableFrom[input].title;
      } else {
        return "";
      }
    },
    close() {
      this.$emit("close", false);
    },
    outsideCreditInfo(e) {
      if (
        e.target.className != "credit-info-dialog" &&
        e.target.className !=
          "md-icon creditinfo-btn md-theme-default material-icons" &&
        e.target.className != "md-button md-button-ghost md-theme-default"
      ) {
        this.$emit("close", false);
      }
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          //   console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
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
.credit-info-dialog {
  background: #ffffff;
  border-radius: 3px;
  width: 500px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  .md-input-container.md-input-disabled:after {
    background-color: rgba(0, 0, 0, 0.12) !important;
    background-image: unset;
  }
  .md-input-container.md-input-disabled label {
    color: rgba(0, 0, 0, 0.54);
  }
  .md-head {
    height: 45px;
    padding: 10px 0px 0px 17px;
    .md-title {
      font-size: 14px;
      color: #727272;
      font-family: $font-roboto;
    }
    .md-button.md-icon-button,
    .md-icon {
      color: rgba(0, 0, 0, 0.54);
      font-size: 18px;
      padding: unset;
      margin: unset;
    }
  }
  .md-body {
    padding: 0px 17px 20px 17px;
    .md-input-container {
      min-height: 22px;
      font-family: $font-roboto;
      padding-top: 18px;
      label {
        font-size: 11px;
        color: #727272;
      }
      &.md-has-value input {
        font-size: 13px;
        color: #414141;
      }
      input {
        height: 22px;
      }
      .md-select {
        height: 22px;
        min-width: unset;
        .md-select-value {
          padding-right: 15px;
          line-height: 25px;
          height: 22px;
          font-size: 13px;
          color: #414141;
        }
      }
    }
    .md-input-container:after {
      background-color: #e0e0e0;
    }
    .term {
      &.md-input-container:after {
        background-color: $color-primary;
      }
    }
    .no-underline {
      &.md-input-container:after {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>

