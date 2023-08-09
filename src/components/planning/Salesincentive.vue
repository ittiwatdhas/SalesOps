<template>
  <div id="salesincentivePage">
    <div>
      <md-spinner
        style="position: absolute;padding-top:20%;z-index: 3"
        :md-size="150"
        :md-stroke="1"
        v-show="loadingMain"
        md-indeterminate
      ></md-spinner>
    </div>
    <div
      v-show="loadingMain"
      style="z-index: 2;
            opacity: 0.4;
            position: absolute;
            width: 100%;
            height: 100%;"
    ></div>
    <md-layout md-align="center">
      <md-stepper ref="stepper" @change="stepChanged">
        <md-step
          id="stp1"
          :md-editable="true"
          :md-disabled="renderStepper(1)"
          md-label="Select Master Settings"
        >
          <!-- <step-one></step-one> -->
        </md-step>
        <md-step id="stp2" :md-disabled="renderStepper(2)" md-label="Calculate Incentive">
          <!-- <step-two></step-two> -->
        </md-step>
        <md-step id="stp3" :md-disabled="renderStepper(3)" md-label="Review Incentive">
          <!-- <step-three></step-three> -->
        </md-step>
        <md-step id="stp4" :md-disabled="renderStepper(4)" md-label="Approval Process">
          <!-- <step-four></step-four> -->
        </md-step>
      </md-stepper>
    </md-layout>
    <div style="padding: 0px 20px">
      <step-one v-if="currentStep==1"></step-one>
      <step-two v-else-if="currentStep==2"></step-two>
      <!-- <step-three v-else-if="currentStep==3 "></step-three> -->
      <!--เปิดการใช้งาน step 4 -->
      <step-three v-else-if="currentStep==3 || currentStep==4"></step-three>
      <!----------------------->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import service from "@/services/planning/incentive";
export default {
  name: "planning-salesincentive",
  data() {
    return {
      // step: null
      // dialogStepTwo: false,
    };
  },
  computed: {
    loadingMain() {
      return this.$store.getters["incentive/loadingMain"];
    },
    step2() {
      return this.$store.getters["incentive/step2"];
    },
    step3() {
      return this.$store.getters["incentive/step3"];
    },
    defaultStep() {
      return this.$store.getters["incentive/defaultStep"];
    },
    currentStep() {
      return this.$store.getters["incentive/currentStep"];
    },
    flow() {
      return this.$store.getters["incentive/flow"];
    },
    permission() {
      return this.$store.getters["incentive/permission"];
    },
    step1tab2() {
      return this.$store.getters["incentive/step1tab2"];
    }
  },
  methods: {
    renderStepper(step) {

      if(this.currentStep == 1 || this.currentStep == '1' ){
        if (step == 1) {
          return false;
        } else if (step == 2) {
          return true;
        } else if (step == 3) {
          return true;
        } else if (step == 4) {
          return true;
        }
      }else if(this.currentStep == 2 || this.currentStep == '2'){

        if (step == 1) {
          return false;
        } else if (step == 2) {
          return false;
        } else if (step == 3) {
          return true;
        } else if (step == 4) {
          return true;
        }

      }else if(this.currentStep == 3|| this.currentStep == '3'){
        if (step == 1) {
          return false;
        } else if (step == 2) {
          return true;
        } else if (step == 3) {
          return false;
        } else if (step == 4) {
          return true;
        }
      }else if(this.currentStep == 4 || this.currentStep == '4'){
        if (step == 1) {
          return true;
        } else if (step == 2) {
          return true;
        } else if (step == 3) {
          return true;
        } else if (step == 4) {
          return false;
        }
      }
      
      // if (this.flow.length > 0) {
      //   if (this.permission) {
      //     if (
      //       this.flow[0].work_flow_state == "recall" ||
      //       this.flow[0].work_flow_state == "edit" ||
      //       this.flow[0].work_flow_state == "pass"
      //     ) {
      //       if (step == 1) {
      //         return false;
      //       } else if (step == 2) {
      //         return false;
      //       } else if (step == 3) {
      //         return false;
      //       } else if (step == 4) {
      //         return true;
      //       }
      //     } else if (this.flow[0].work_flow_state == "pending") {
      //       if (step == 1) {
      //         return true;
      //       } else if (step == 2) {
      //         return true;
      //       } else if (step == 3) {
      //         return true;
      //       } else if (step == 4) {
      //         return false;
      //       }
      //     } else if (this.flow[0].work_flow_state == "reject") {
      //       if (step == 1) {
      //         return true;
      //       } else if (step == 2) {
      //         return true;
      //       } else if (step == 3) {
      //         return false;
      //       } else if (step == 4) {
      //         return true;
      //       }
      //     }
      //   } else {
      //     if (step == 1) {
      //       return true;
      //     } else if (step == 2) {
      //       return true;
      //     } else if (step == 3) {
      //       return true;
      //     }
      //   }
      // } else {
      //   if (this.permission) {
      //     return false;
      //   } else {
      //     if (step == 1) {
      //       return true;
      //     } else if (step == 2) {
      //       return true;
      //     } else if (step == 3) {
      //       return true;
      //     } else if (step == 4) {
      //       return false;
      //     }
      //   }
      // }
    },
    stepChanged(activeStepIndex) {
      if (activeStepIndex == 0) {
        this.$store.commit("incentive/setCurrentStep", 1);
        this.$store.dispatch("incentive/getStep1Tab1");
      } else if (activeStepIndex == 1) {
        this.$store.commit("incentive/setCurrentStep", 2);
        if (this.defaultStep.step == 1 && this.step1tab2.arrTeam > 0) {
          if (
            _.isNull(this.step2.head.sales_cycle) &&
            this.defaultStep.step != 2
          ) {
            let data = this.defaultStep;
            let obj = {
              year: data.year,
              cycle: data.cycle,
              group_code: data.group_code,
              condition_detail: _.isUndefined(data.data_condition)
                ? []
                : data.data_condition,
              start_date: data.start_date,
              end_date: data.end_date,
              data_recipient: data.data_recipient,
              ms_tactics_code: data.ms_tactics_code,
              action: "stepper"
            };
            service
              .getHead(obj)
              .then(rs1 => {
                this.$store.dispatch("incentive/getStep2Master", rs1);
              })
              .catch();
          }
        }
      } else if (activeStepIndex == 2) {
        this.$store.commit("incentive/setCurrentStep", 3);
        if (
          _.isNull(this.step3.head.sales_cycle) &&
          this.defaultStep.step != 3
        ) {
          let obj = {
            step: 3,
            permission: "creator",
            year: this.defaultStep.year,
            cycle: this.defaultStep.cycle,
            group_code: this.defaultStep.group_code,
            condition_detail: this.defaultStep.data_condition,
            start_date: this.defaultStep.start_date,
            end_date: this.defaultStep.end_date,
            data_recipient: this.defaultStep.data_recipient,
            ms_tactics_code: this.defaultStep.ms_tactics_code,
            emp_id: Vue.localStorage.get("emp_id")
          };
          // service
          //   .nextToStep3(obj)
          //   .then(response => {
          //     this.$store.dispatch("incentive/getStep3Master", response);
          //   })
          //   .catch();
        }
      } else if (activeStepIndex == 3) {
        this.$store.commit("incentive/setCurrentStep", 4);
      }
    }
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
      this.$router.replace("/");
    } else {
      this.login = true;
      this.$store.dispatch("setPathMenuService", "planning");
      this.$store.dispatch("incentive/getDefaultStep");
      var body = document.getElementsByTagName("body");
      body[0].setAttribute("style", "overflow-x: hidden !important;");
    }
  },
  components: {
    "step-one": require("./saleincentive-component/StepOne"),
    "step-two": require("./saleincentive-component/StepTwo"),
    "step-three": require("./saleincentive-component/StepThree")
  }
};
</script>
<style lang="scss" scoped>
</style>