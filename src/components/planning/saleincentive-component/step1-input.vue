<template>
  <div>
    <md-input-container :class="'md-promotion-ipt'">
      <md-input
        maxlength="10"
        :id="id"
        type="text"
        v-model="displayValue"
        :class="renderPos(table)"
        :disabled="readOnly"
        @blur="calculateOther"
        @keypress.native="isNumber"
        @focus="isInputActiveFunc"
        @focus.native="$event.target.select()"
        @keyup.native.prevent="nextTab"
      ></md-input>
    </md-input-container>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar1" :md-duration="duration">
      <span>{{snkTitle}}</span>
      <md-button class="md-accent" @click="$refs.snackbar1.close()">
        <span style="color:#fd7f00">OK</span>
      </md-button>
    </md-snackbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import Vue from "vue";
import { runInThisContext } from "vm";
export default {
  created: function() {
    this.tmpData = this.value;
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          if (!_.isNumber(this.value)) {
            return 0;
          } else {
            return this.value;
          }
        } else {
          if (!_.isNumber(this.value)) {
            return 0;
          } else {
            var test = this.value.toString().indexOf(".");
            if (test == -1) {
              return this.formatNumberInt(this.value);
            } else {
              return this.formatNumber(this.value);
            }
          }
        }
      },
      set: function(modifiedValue) {
        if(modifiedValue != ''){
           let value = this.checkIsNaN(modifiedValue) ? 0 : modifiedValue;
        let newValue = 0;
        newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
        if (this.checkIsNaN(newValue)) {
          newValue = 0;
        } else {
          newValue = modifiedValue;
        }
        newValue = newValue.replace(",", "");
        var test = newValue.toString().indexOf(".");
        if (test == -1) {
          this.$emit("input", parseInt(newValue));
        } else {
          this.$emit("input", parseFloat(newValue));
        }
        // let rows = this.step2.detail[this.index];
        // let data = this.step2.detail[this.index].rewards[this.indexDetail];
        // console.log("==>", data);
        // this.$nextTick(() => {
        // console.log(">>>>>");
        // });
        }
       
      }
    },
    step1Setting() {
      return this.$store.getters["incentive/step1Setting"];
    },
    step2() {
      return this.$store.getters["incentive/step2"];
    }
  },
  watch: {
    displayValue(value) {}
  },
  props: {
    value: {},
    type: {},
    index: {},
    indexDetail: {},
    table: {},
    readOnly: {},
    id: "",
    data:{}
  },
  data() {
    return {
      isInputActive: false,
      keepInput: "",
      keepEvent: false,
      dgTitle: "",
      vertical: "bottom",
      horizontal: "center",
      duration: 4000,
      snkTitle: ""
    };
  },
  methods: {
    renderPos(table) {
      if (
        table == "target" ||
        table == "max_reward" ||
        table == "math_value" ||
        table == "math_value_step2" ||
        table == "max_reward_step2" ||
        table == "target_step2"
      ) {
        return "text-center";
      } else if (table == "paid") {
        return "text-left";
      } else {
        return "text-right";
      }
    },
    isInputActiveFunc() {
      this.isInputActive = true;
      if (this.table == "target" || this.table == "incentive") {
        this.$store.commit(
          "incentive/setDataBeforeChange",
          _.cloneDeep(this.step1Setting)
        );
      } else if (
        this.table == "target_step2" ||
        this.table == "incentive_step2"
      ) {
        this.$store.commit(
          "incentive/setDataBeforeChange",
          _.cloneDeep(this.step2)
        );
      }
    },
    checkIsNaN(val) {
      return isNaN(parseFloat(val));
    },
    calculateOther() {
      let tmpDataStep2 = this.$store.getters["incentive/tmpDataStep2"];
      console.log("calculateOther - tmpDataStep2 ==>", tmpDataStep2);

      var rs1 = _.find(this.step2.detail, function (o) { return o.conditions_select == "5"; });
        // console.log('rs1 =>' , rs1.item_cg)
      var rs2 = _.find(rs1.tempCg, function (o) { return o.key == "5"; });
      // console.log(rs2)
      // const find_data = D.find(({ tactics_id }) => tactics_id === "4727");
      // console.log(find_data.tempCg[0].datas)
      if( this.table == 'itemcg_step2_rewards'){
            // var  a  = this.step2.detail[2].tempCg[1].datas;
            // console.log(a)
            if( 1!=1){
              
            }else {
              if(this.value != ''){
                // console.log(rs2.datas)
              //  console.log(this.step2.detail[2].tempCg[1].datas , this.value , this.data)
                  var data_master = rs2.datas
                
                  var DupDataCheck = _.cloneDeep(data_master)
                  DupDataCheck.splice( this.indexDetail,1)
                  // console.log(DupDataCheck , this.indexDetail)
                  var inventory = DupDataCheck
                  const result = inventory.find(({ reward }) => reward === this.value);
                    if(result){
                        const x = data_master.filter(o => o.reward === this.value)
                        let param = x
                        // console.log(param)
                        const sum_reward = param.reduce((accumulator, object) => {
                          return object.reward;
                        }, 0);
                        const sum_type = param.reduce((accumulator, object) => {
                          return accumulator + object.type;
                        }, 0);
                        const sum_group = param.reduce((accumulator, object) => {
                          return accumulator + object.group;
                        }, 0);
                        const sum_sub = param.reduce((accumulator, object) => {
                          return accumulator + object.sub;
                        }, 0);
                        const sum_cg = param.reduce((accumulator, object) => {
                          return accumulator + object.cg;
                        }, 0);
                        const sum_product = param.reduce((accumulator, object) => {
                          return accumulator + object.product;
                        }, 0);

                        let merge_data_new = {
                            reward :sum_reward,
                            type:sum_type,
                            group:sum_group,
                            sub:sum_sub,
                            cg:sum_cg,
                            product:sum_product
                          }
                          // console.log(merge_data_new , this.value)
                          data_master = data_master.filter(o => o.reward != this.value)
                          data_master.unshift(merge_data_new)
                         
                          const result_2 = this.step2.detail.find(({ conditions_select }) => conditions_select === '5');
                          
                          let tmpDataCalStep2 = JSON.parse(JSON.stringify(this.step2));
                          // console.log("tmpDataCalStep2 ==>", tmpDataCalStep2);
                          // console.log("this.step2 ==>", this.step2);
                          this.$store.commit('incentive/setTmpDataCalStep2', tmpDataCalStep2);
                          let keyIndex = this.step2['detail'].findIndex((item) => {
                            return item.conditions_select === '5'
                          });
                          this.step2['detail'][keyIndex]['item_cg'] = data_master

                          result_2.tempCg[0].datas = data_master
                    
                         }else {
                          // console.log('No Dup')
                         }
                          //  console.log('D => ', ...this.step2.detail[2].tempCg[1].datas)
                          data_master.sort((a, b) => a.reward - b.reward);
                          // console.log(this.step2)
                          
                          // console.log("data_master ==>", data_master);
                          rs2.datas = data_master
                          this.$store.commit('incentive/setDataStep2', this.step2)

                          // console.log( this.step2)
                          this.$store.commit("incentive/cal_reward", rs2.datas);
                     } 
                  }
         
                  }


      this.isInputActive = false;
      let data = [];
      if (this.table == "target" || this.table == "incentive") {
        let rows = this.step1Setting[this.index];
        let paid_type = this.step1Setting[this.index].paid_type
        let math_value = 0
        let symbols_code = 1 // 1 : >= , 2 : > 
        let tac_use = false
        if (!_.isUndefined(rows.tac_use[0])) {
          math_value = rows.tac_use[0].math_value
          symbols_code = rows.tac_use[0].symbols_code
          tac_use = rows.tac_use[0].tactics_use != "" ? true : false
        }
        data = this.step1Setting[this.index].rewards[this.indexDetail];
        if (this.indexDetail == 0) {
          let start_re = data.target
          if (!_.isUndefined(start_re) && (paid_type == "count_items" || paid_type == "tactics1") && tac_use == false) {
            if(symbols_code == '1'){
              if(start_re < math_value){
                data.target = parseFloat(math_value)
                this.snkTitle =
                "less than " + this.formatNumber(math_value) + " % ";
                this.$refs.snackbar1.open();
              }
            }else{
              if(start_re <= math_value){
                data.target = parseFloat(math_value) + 1;
                this.snkTitle =
                "less than " + this.formatNumber(math_value) + " % ";
                this.$refs.snackbar1.open();
              }
            }
          }
          let after = this.step1Setting[this.index].rewards[this.indexDetail + 1];
          if (!_.isUndefined(after)) {
            if (parseFloat(after.target) <= parseFloat(data.target) && after.target <= math_value && (paid_type == "tactics1" || paid_type == "count_items") && tac_use == false) {
              let rewards_arr = this.step1Setting[this.index].rewards
              for(var i = 0; i < rewards_arr.length; i++){
                let row_target = rewards_arr[i]
                let last_target = rewards_arr[i-1]
                if(i > 0){
                  if (parseFloat(row_target.target) <= parseFloat(last_target.target) && row_target.target <= math_value) {
                    row_target.target = parseFloat(rewards_arr[i-1].target) + 1;
                  }
                }
              }
              this.snkTitle =
                "less than " + this.formatNumber(math_value) + " % ";
              this.$refs.snackbar1.open();
            }else if (parseFloat(after.target) <= parseFloat(data.target) && parseFloat(data.target) >= math_value && (paid_type == "tactics1" || paid_type == "count_items") && tac_use == false) {
              let rewards_arr = this.step1Setting[this.index].rewards
              for(var i = 0; i < rewards_arr.length; i++){
                let row_target = rewards_arr[i]
                let last_target = rewards_arr[i-1]
                if(i > 0){
                  if (parseFloat(row_target.target) <= parseFloat(last_target.target)) {
                    row_target.target = parseFloat(last_target.target) + 1;
                  }
                }
              }
              // data.target = parseFloat(after.target) - 1;
              this.snkTitle =
                "less than " + this.formatNumber(after.target) + " % ";
              this.$refs.snackbar1.open();
            } else if (parseFloat(after.target) <= parseFloat(data.target)) {
              data.target = parseFloat(after.target) - 1;
              this.snkTitle =
                "less than " + this.formatNumber(after.target) + " % ";
              this.$refs.snackbar1.open();
            }else if (parseFloat(after.incentive) <= parseFloat(data.incentive)) {
              if (this.step1Setting[this.index].tac_type == 2) {
              } else {
                data.incentive = parseFloat(after.incentive) - 1;
                this.snkTitle =
                  "less than " + this.formatNumber(after.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
              }
              /*
            } else if (parseFloat(data.incentive) == 0) {
              if (rows.tac_type == 2) {
                let check0 = this.step1Setting[this.index].rewards[0];
                this.$emit("setincentive", {
                  mom: this.index,
                  child: this.indexDetail
                });
              }
              */
            }
          }
        } else {
          let before = this.step1Setting[this.index].rewards[this.indexDetail - 1];
          console.log("before",before)
          if (!_.isUndefined(before)) {
            if (rows.tac_type == 2) {
              if (
                parseFloat(data.target) <= parseFloat(before.target) &&
                parseFloat(data.target) > 0
              ) {
                data.target = parseFloat(before.target) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.target) + " % ";
                this.$refs.snackbar1.open();
              } else if (
                parseFloat(data.incentive) <= parseFloat(before.incentive) &&
                parseFloat(data.incentive) > 0
              ) {
                data.incentive = parseFloat(before.incentive) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
                /*
              } else if (parseFloat(data.incentive) == 0) {
                if (rows.tac_type == 2) {
                  let check0 = this.step1Setting[this.index].rewards[0];
                  this.$emit("setincentive", {
                    mom: this.index,
                    child: this.indexDetail
                  });
                }
                */
              } else if (
                parseFloat(data.incentive) <= parseFloat(before.incentive) &&
                parseFloat(data.incentive) == 0 &&
                parseFloat(before.incentive) > 0
              ) {
                data.incentive = parseFloat(before.incentive) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
              } else if (
                parseFloat(data.incentive) >= parseFloat(before.incentive) &&
                parseFloat(before.incentive) == 0 &&
                parseFloat(data.incentive) > 0
              ) {
                let lastRow = this.step1Setting[this.index].rewards.length - 1;
                if (
                  this.index <
                  this.step1Setting[this.index].rewards.length - 1
                  //   &&
                  // parseFloat(
                  //   this.step1Setting[this.index].rewards[lastRow].incentive
                  // ) < parseFloat(data.incentive)
                ) {
                  let after = this.step1Setting[this.index].rewards[
                    this.indexDetail + 1
                  ];
                  data.incentive = parseFloat(after.incentive) - 1;
                  this.snkTitle =
                    "less than " + this.formatNumber(after.incentive) + " % ";
                  this.$refs.snackbar1.open();
                }
              }
            } else {
              if (parseFloat(data.target) <= parseFloat(before.target)) {
                data.target = parseFloat(before.target) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.target) + " % ";
                this.$refs.snackbar1.open();
              } else if (
                parseFloat(data.incentive) <= parseFloat(before.incentive)
              ) {
                data.incentive = parseFloat(before.incentive) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
              }
            }
          }
        }
      } else if (
        this.table == "target_step2" ||
        this.table == "incentive_step2"
      ) {
        let rows = this.step2.detail[this.index];
        console.log(rows);
        let paid_type = this.step2.detail[this.index].paid_type
        let tac_type = this.step2.detail[this.index].tac_type
        let math_value = 0
        let symbols_code = 1 // 1 : >= , 2 : > 
        let tac_use = false
        if (!_.isUndefined(rows.tac_use[0])) {
          math_value = rows.tac_use[0].math_value
          symbols_code = rows.tac_use[0].symbols_code
          tac_use = rows.tac_use[0].tactics_use != "" ? true : false
        }
        data = this.step2.detail[this.index].rewards[this.indexDetail];
        if (this.indexDetail == 0) {
          let start_re = data.target
          if (!_.isUndefined(start_re) && ((paid_type == "tactics1" || tac_type == 1 ) || (paid_type == "count_items" || tac_type == 3)) && tac_use == false) {
            if(symbols_code == '1'){
              if(start_re < math_value){
                data.target = parseFloat(math_value)
                this.snkTitle =
                "less than " + this.formatNumber(math_value) + " % ";
                this.$refs.snackbar1.open();
              }
            }else{
              if(start_re <= math_value){
                data.target = parseFloat(math_value) + 1;
                this.snkTitle =
                "less than " + this.formatNumber(math_value) + " % ";
                this.$refs.snackbar1.open();
              }
            }
          }
          let after = this.step2.detail[this.index].rewards[
            this.indexDetail + 1
          ];
          // console.log("2 ==> ");
          if (!_.isUndefined(after)) {
            // console.log("3 ==> ");
            if (parseFloat(after.target) <= parseFloat(data.target) && after.target <= math_value && ((paid_type == "tactics1" || tac_type == 1 ) || (paid_type == "count_items" || tac_type == 3)) && tac_use == false) {
              let rewards_arr = this.step2.detail[this.index].rewards
              for(var i = 0; i < rewards_arr.length; i++){
                let row_target = rewards_arr[i]
                let last_target = rewards_arr[i-1]
                if(i > 0){
                  if (parseFloat(row_target.target) <= parseFloat(last_target.target) && row_target.target <= math_value) {
                    row_target.target = parseFloat(rewards_arr[i-1].target) + 1;
                  }
                }
              }
              this.snkTitle =
                "less than " + this.formatNumber(math_value) + " % ";
              this.$refs.snackbar1.open();
            }else if (parseFloat(after.target) <= parseFloat(data.target) && parseFloat(data.target) >= math_value && ((paid_type == "tactics1" || tac_type == 1 ) || (paid_type == "count_items" || tac_type == 3)) && tac_use == false) {
              let rewards_arr = this.step2.detail[this.index].rewards
              for(var i = 0; i < rewards_arr.length; i++){
                let row_target = rewards_arr[i]
                let last_target = rewards_arr[i-1]
                if(i > 0){
                  if (parseFloat(row_target.target) <= parseFloat(last_target.target)) {
                    row_target.target = parseFloat(last_target.target) + 1;
                  }
                }
              }
              this.snkTitle =
                "less than " + this.formatNumber(after.target) + " % ";
              this.$refs.snackbar1.open();
            } else if (parseFloat(after.target) <= parseFloat(data.target)) {
              this.snkTitle =
                "less than " + this.formatNumber(after.target) + " % ";
              this.$refs.snackbar1.open();
              data.target = parseFloat(after.target) - 1;
              // console.log("4 ==> ");
            } else if (
              parseFloat(after.incentive) <= parseFloat(data.incentive)
            ) {
              // console.log("5 ==> ");
              if (this.step2.detail[this.index].tac_type == 2) {
                // console.log("6 ==> ");
              } else {
                // console.log("7 ==> ");
                this.snkTitle =
                  "less than " + this.formatNumber(after.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
                data.incentive = parseFloat(after.incentive) - 1;
              }
              /*
            } else if (parseFloat(data.incentive) == 0) {
              if (rows.tac_type == 2) {
                let check0 = this.step2.detail[this.index].rewards[0];
                this.$emit("setincentive", {
                  mom: this.index,
                  child: this.indexDetail
                });
              }
              */
            }
          }
        } else {
          let before = this.step2.detail[this.index].rewards[
            this.indexDetail - 1
          ];
          // console.log("8 ==> ");
          if (!_.isUndefined(before)) {
            // console.log("9 ==> ");
            if (rows.tac_type == 2) {
              // console.log("10 ==> ");
              if (
                parseFloat(data.target) <= parseFloat(before.target) &&
                parseFloat(data.target) > 0
              ) {
                // console.log("11 ==> ");
                data.target = parseFloat(before.target) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.target) + " % ";
                this.$refs.snackbar1.open();
              } else if (
                parseFloat(data.incentive) <= parseFloat(before.incentive) &&
                parseFloat(data.incentive) > 0
              ) {
                // console.log("12 ==> ");
                data.incentive = parseFloat(before.incentive) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
              } else if (
                parseFloat(data.incentive) <= parseFloat(before.incentive) &&
                parseFloat(data.incentive) == 0 &&
                parseFloat(before.incentive) > 0
              ) {
                // console.log("13 ==> ");
                data.incentive = parseFloat(before.incentive) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
                /*
              } else if (parseFloat(data.incentive) == 0) {
                if (rows.tac_type == 2) {
                  let check0 = this.step2.detail[this.index].rewards[0];
                  this.$emit("setincentive", {
                    mom: this.index,
                    child: this.indexDetail
                  });
                }
                */
              } else if (
                parseFloat(data.incentive) >= parseFloat(before.incentive) &&
                parseFloat(before.incentive) == 0 &&
                parseFloat(data.incentive) > 0
              ) {
                // console.log("14 ==> ");
                let lastRow = this.step2.detail[this.index].rewards.length - 1;
                if (
                  this.index <
                    this.step2.detail[this.index].rewards.length - 1 &&
                  parseFloat(
                    this.step2.detail[this.index].rewards[lastRow].incentive
                  ) < parseFloat(data.incentive)
                ) {
                  let after = this.step2.detail[this.index].rewards[
                    this.indexDetail + 1
                  ];
                  this.snkTitle =
                    "less than " + this.formatNumber(after.incentive) + " % ";
                  this.$refs.snackbar1.open();
                  data.incentive = parseFloat(after.incentive) - 1;
                }
              }
            } else {
              // console.log("15 ==> ");
              if (parseFloat(data.target) <= parseFloat(before.target)) {
                data.target = parseFloat(before.target) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.target) + " % ";
                this.$refs.snackbar1.open();
              } else if (
                parseFloat(data.incentive) <= parseFloat(before.incentive)
              ) {
                data.incentive = parseFloat(before.incentive) + 1;
                this.snkTitle =
                  "more than " + this.formatNumber(before.incentive) + " ฿ ";
                this.$refs.snackbar1.open();
              }
            }
          }
        }
      } else if (this.table == "paid") {
        this.$emit("calculate", this.index);
      } else if (
        this.table == "math_value" ||
        this.table == "math_value_step2"
      ) {
        this.$emit("calculate", this.index);
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
        if (this.table == "itemcg_step2" && charCode === 46) {
          this.keepEvent = false;
          evt.preventDefault();
        } else {
          this.keepEvent = true;
          return true;
        }
      }
    },
    setNextTab() {},
    formatNumberInt(value) {
      return this.$store.getters["globalfunc/formatNumberInt"](value);
    },
    formatNumber(value) {
      return this.$store.getters["globalfunc/formatNumber"](value);
    },
    nextTab(e) {
      if (e != "") {
        let res = e.target.value.split(".");
        if (!_.isUndefined(res[1])) {
          if (res[1].length == 1) {
            let st = _.toString(e.target.value);

            if (this.table == "math_value") {
              let rows = this.step1Setting[this.index];
              let id =
                "tac_use-" +
                rows.tactics_id +
                "-math_value-" +
                this.indexDetail;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "max_reward") {
              let rows = this.step1Setting[this.index];
              let id = "max_reward-" + rows.tactics_id;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "target") {
              let rows = this.step1Setting[this.index];
              let id =
                "rewards-" + rows.tactics_id + "-target-" + this.indexDetail;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "incentive") {
              let rows = this.step1Setting[this.index];
              let id =
                "rewards-" + rows.tactics_id + "-incentive-" + this.indexDetail;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "math_value_step2") {
              let rows = this.step2.detail[this.index];
              let id =
                "tac_use_step2-" +
                rows.tactics_id +
                "-math_value-" +
                this.indexDetail;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "max_reward_step2") {
              let rows = this.step2.detail[this.index];
              let id = "max_reward_step2-" + rows.tactics_id;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "target_step2") {
              let rows = this.step2.detail[this.index];
              let id =
                "rewards_step2-" +
                rows.tactics_id +
                "-target-" +
                this.indexDetail;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "incentive_step2") {
              let rows = this.step2.detail[this.index];
              let id =
                "rewards_step2-" +
                rows.tactics_id +
                "-incentive-" +
                this.indexDetail;
              var x = document.getElementById(id);
              if (!_.isNull(x)) {
                x.maxLength = st.length + 1;
              }
            } else if (this.table == "paid") {
              this.$emit("nextTab", this.index, st);
            }
          }
        }
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
