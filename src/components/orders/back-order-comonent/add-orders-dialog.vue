<template>
  <div>
    <!---Head-->
    <div style="position: absolute;z-index: 101;margin-left:40%;margin-top:25%">
      <md-spinner :md-size="150" :md-stroke="1" v-show="spinner_promo" md-indeterminate></md-spinner>
    </div>
    <div v-show="spinner_promo" class="mds-spinner"></div>
    <div class="mds-head-dialog">
      <div class="head-blog-start">{{title}}</div>
      <div class="head-blog-end" style="text-align:right">
        <md-icon @click.native="checkCLose()">close</md-icon>
      </div>
    </div>
    <div class="mds-body-dialog">
      <div class="body-info">
        <div style="width:25%;text-align:left;padding-right:8px">
          <div class="txt-1" style="margin-bottom:5px">CUSTOMER INFO</div>
          <div class="body-info-box">
            <div>
              <div class="txt-2">Customer Code</div>
              <!-- <v-select
                class="cust-search"
                :options="custDP"
                label="customer_code"
                v-model="v_custDP"
                placeholder="Customer Code"
                @keyup.enter.native="submit"
                @search="fetchOptions"
              >
                <template slot="option" slot-scope="option">
                  <div class="mds-v-select" @click="selectedCust(option)">
                    {{ option.customer_code }} :
                    {{ option.customer_name }}
                  </div>
                </template>
              </v-select> -->
            </div>
            <div style="margin-top:8px">
              <div class="txt-2">Customer Name</div>
              <div class="txt-3" style="padding-left:5px;width:100%;display: -webkit-box;">
                <div style="width:90%">{{info.customer_name}}</div>
                <div style="width:10%">
                  <md-icon
                    v-if="info.customer_name != '-'"
                    style="margin-top:0px;font-size:17px;padding-top:2px;color:#a8a8a8;cursor:pointer"
                  >error</md-icon>
                </div>
                <md-tooltip md-direction="bottom" class="mds-tooltips">{{info.customer_address}}</md-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div style="width:75%;text-align:left;padding-left:8px">
          <div class="txt-1" style="margin-bottom:5px">PURCHASE INFO</div>
          <div class="body-info-box">
            <md-input-container id="ponoIpu" style="margin-bottom:13px;">
              <label>{{showInpoutName('po_no')}}</label>
              <md-input
                @focus.native="focusIpt($event)"
                v-model="info.po_no"
                :disabled="renderBtn('po_no')"
                @click.native="changePONO"
                @keypress.native="keyPONO"
                :maxlength="30"
              ></md-input>
            </md-input-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";
import orService from "@/services/orders/myorders";
import _ from "lodash";
export default {
  created() {
    console.log("===>")
  },
  data() {
    return {
      indexSet: false,
      spinner_promo: false,
      title: "New Order Create Form",
      custDP: [],
      v_custDP: null,
      v_custDPK: "",
      info: {
        customer_name: "-"
      }
    };
  },
  watch: {
    // v_custDP(value) {
    //   console.log(value);
    // }
  },
  methods: {
    submit() {
      this.spinner_promo = true;
      orService
        .filterCustomer({ keyword: this.v_custDPk })
        .then(rs => {
          this.custDP = rs;
          this.spinner_promo = false;
        })
        .catch();
    },
    fetchOptions(search, loading) {
      this.v_custDPk = search;
    },
    selectedCust(option) {
      this.info = option;
      console.log(this.v_custDP);
    },
    checkCLose() {},
    showInpoutName(input) {
      if (typeof this.disableFrom[input] != "undefined") {
        return this.disableFrom[input].title;
      } else {
        return "";
      }
    },
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    }
  },
  components: {
    // "v-select": vSelect
  }
};
</script>
<style lang="scss" scoped>
$font-roboto: Roboto;
.mds-spinner {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: #efefef;
  opacity: 0.1;
}
</style>

