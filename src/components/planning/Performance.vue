<template>
  <div>
    <div id="pagePerformance">
      <div v-if="login == false" class="mt-60">
        <waring-login></waring-login>
      </div>
      <div v-if="login == true">
        <md-progress
          v-show="show_progress"
          class="md-warn main-loading"
          :md-progress="1"
          md-indeterminate
        ></md-progress>
        <div
          v-if="check_step == 2 || check_step == 3"
          v-show="show_progress"
          style="z-index: 2;
                  opacity: 0.4;
                  position: absolute;
                  background: #efefef;
                  width: 100%;
                  height: 100%;"
        ></div>
        <md-layout
          md-align="start"
          md-flex="100"
          class="md-topic"
          style="padding-top:25px;padding-left:55px"
        >{{ pageName }}</md-layout>
        <md-layout class="txt-body" md-align="center">
          <md-stepper ref="stepper" @change="stepChanged">
            <md-step
              id="stp1"
              :md-editable="true"
              md-label="Select evaluation settings"
              class="pt-0"
            >
              <app-step1></app-step1>
            </md-step>
            <md-step id="stp2" md-label="Adjust Sales Targets">
              <md-layout md-gutter class="mb-20">
                <md-layout md-align="start">
                  <div style="display: -webkit-box;">
                    <nested-organ-dp
                      style="margin-right:70px"
                      v-if="check_step == 2"
                      :value="this.select_view"
                      @organselected="selectedViewBy"
                    ></nested-organ-dp>
                    <!-- :value="this.select_view" -->
                    <!-- <md-filter v-if="check_step == 2" @organselected="selectedViewBy"  style="margin-right:40px"></md-filter> -->
                    <nested-team-dp style="margin-right:60px" v-if="check_step == 2"></nested-team-dp>
                  </div>
                </md-layout>
                <md-layout md-align="end">
                  <span
                    class="pl-10 -redsummary -font-20"
                    v-if="this.lock_process == true"
                    style="padding-top: 10px;padding-bottom: 10px;padding-right: 100px;"
                  >
                    <b>System Locking</b>
                  </span>
                  <template v-if="this.show_button_save && this.lock_process == false">
                    <md-button
                      @click="saveDraftClick"
                      class="md-raised -gray-A8 pr-20 pl-10 mh-0 mv-0 latoFont height-30"
                    >
                      <label class="pl-18">
                        <b>SAVE DRAFT</b>
                      </label>
                    </md-button>
                    <md-button
                      @click="submitClick"
                      class="md-raised -orange pr-20 pl-10 mv-0 latoFont height-30"
                    >
                      <md-icon md-align="end">done</md-icon>
                      <label class="pl-18">
                        <b>SUBMIT</b>
                      </label>
                    </md-button>
                  </template>
                </md-layout>
              </md-layout>
              <md-layout class="mb-135">
                <collect-table v-if="check_step == 2"></collect-table>
              </md-layout>
            </md-step>
            <md-step id="stp3" md-label="Approval Process">
              <approve-step
                v-if="this.authen_step == 'approve'"
                @rejectclick="emitRejectClick"
                class="mb-60"
              ></approve-step>
              <recall-step
                v-if="this.authen_step == 'recall' || this.authen_step == 'reject' || this.authen_step =='cantrecall'"
                @recallclick="emitReCallClick"
                @resendclick="emitReSendClick"
              ></recall-step>
              <md-layout class="mv-20">
                <!-- <nested-organ-dp
                  v-if="check_step == 3 && this.authen_step!='approve'"
                  :value="this.select_view"
                  @organselected="selectedViewBy"
                ></nested-organ-dp>-->
              </md-layout>
              <md-layout class="mb-135">
                <collect-table v-if="check_step == 3"></collect-table>
              </md-layout>
            </md-step>
          </md-stepper>
        </md-layout>
      </div>
    </div>
    <div>
      <summary-bar></summary-bar>
    </div>
    <!--Start confirm dialog-->
    <md-dialog-confirm
      class="z-index-3"
      :md-title="dlg.title"
      :md-content-html="dlg.contentHtml"
      :md-ok-text="dlg.ok"
      :md-cancel-text="dlg.cancel"
      @open="closeDialog"
      @close="submitDlg"
      ref="dlgname"
    ></md-dialog-confirm>
    <!--End confirm dialog-->
  </div>
</template>

<script>
import Vue from "vue";
import Step1 from "./subTemplate/Step1.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "pagePerformance",
  computed: {
    ...mapGetters({
      select_view: "getViewByValue",
      show_button_save: "getShowButtonSave",
      authen_step: "getCheckAuthenStep",
      backtofirst: "getBacktoFirstStep",
      lock_process: "getCheckLockProcess",
      authen_step_check: "getCheckAuthenStepCheck",
      select_team: "getTeamByValue"
    }),
    show_progress() {
      return this.$store.getters.show_progress;
    }
  },
  watch: {
    authen_step: function(nextStep) {
      setTimeout(() => {
        if (nextStep != undefined) {
          if (
            nextStep == "recall" ||
            nextStep == "cantrecall" ||
            nextStep == "approve" ||
            nextStep == "reject"
          ) {
            var stepper = 2;
            var clsStep = document.getElementsByClassName("md-step-header");
            clsStep[stepper].click();
            var html = document.documentElement;
            html.scrollTop = 0;
            this.check_step = 3;
          } else if (nextStep == "callback" || nextStep == "draft") {
            var stepper = 1;
            var clsStep = document.getElementsByClassName("md-step-header");
            clsStep[stepper].click();
            var html = document.documentElement;
            html.scrollTop = 0;
            this.check_step = 2;
          } else if (nextStep == "") {
            var stepper = 0;
            var clsStep = document.getElementsByClassName("md-step-header");
            clsStep[stepper].click();
            var html = document.documentElement;
            html.scrollTop = 0;
            this.check_step = 1;
          }
        }
      }, 500);
    }
  },
  data() {
    return {
      check_step: 2,
      user_position: false,
      checkClk: 0,
      step_before: 0,
      dlg: {
        title: "title",
        contentHtml: "....",
        ok: "Yes",
        cancel: "Cancel",
        subject: null
      },
      // food: '',
      // users: [],
      options: [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 3, name: "c" },
        { id: 4, name: "d" },
        { id: 5, name: "e" }
      ],
      items: [],
      pageName: ""
      // arr_sumtotal:this.getSumary(),
    };
  },
  methods: {
    ...mapActions(["selectedViewBy", "selectedTeam"]),
    stepChanged(activeStepIndex) {
      // console.log(`this.authen_step==${this.authen_step}`);
      if (this.step_before == 1 && activeStepIndex == 0) {
        //this.$store.dispatch('setProductCheckAll',true);
      }
      if (activeStepIndex == 0 && this.backtofirst) {
        this.dlg = {
          title: "Alert",
          contentHtml: 'Do you want go to "select evaluation settings"?',
          subject: "BACK_FIRST"
        };
        this.openDialog();
      }
      var container = document.getElementsByClassName("md-steps-container");

      if (
        this.authen_step &&
        this.authen_step != "callback" &&
        this.authen_step != "draft" &&
        this.authen_step != "reject" &&
        activeStepIndex != 2
      ) {
        //if(this.authen_step && this.authen_step!='callback' && activeStepIndex!=2){

        var stepper = 2;
        var clsStep = document.getElementsByClassName("md-step-header");
        clsStep[stepper].click();
        var html = document.documentElement;
        html.scrollTop = 0;
      } else {
        var clsStep = document.getElementsByClassName("md-step-header");
        var idStep = document.getElementById("nextStp1");
        var roundnoti = document.getElementsByClassName("roundnoti");
        if (activeStepIndex > 0) {
          // container[0].setAttribute("style", "min-height: 800px"); // fix height on submit
          if (this.authen_step == "") {
            if (this.$store.getters.organizes_data.length == 0) {
              clsStep[0].click();
              idStep.click();
              activeStepIndex = 0;
            } else if (
              this.$store.getters.product_checkall == false &&
              this.$store.getters.product_selected == 0
            ) {
              clsStep[0].click();
              idStep.click();
              activeStepIndex = 0;
            }
          }
          if (
            activeStepIndex == 1 &&
            this.step_before == 0 &&
            this.authen_step_check == ""
          ) {
            this.$store.dispatch("setLoadStep3", true);
            this.$store.dispatch("getSumMainService2", {
              checkLoad: "new",
              total_page: this.$store.getters.getTotalPage,
              product_keyword: this.$store.getters.product_keyword,
              organize_type: this.$store.getters.options_organize_selected,
              organizes: this.$store.getters.organizes_data,
              product_type: this.$store.getters.options_product_selected,
              products_uncheck: this.$store.getters.products_uncheck,
              product_selected: this.$store.getters.product_selected,
              product_checkall: this.$store.getters.product_checkall,
              viewby: this.$store.getters.getViewById,
              totaltype: this.$store.getters.getTotalType,
              totalfirst: this.$store.getters.getTotalFirst,
              totalsecond: this.$store.getters.getTotalSecond,
              monthfirst: this.$store.getters.getMonthFirst,
              monthsecond: this.$store.getters.getMonthSecond,
              team_select: this.$store.getters.getTeamSelect
            });
            /* this.$store.dispatch('getSumDetailService',{
                index:0,
                total_page:1,
                insertType:'new',
                organize_type:this.$store.getters.options_organize_selected,
                organizes:this.$store.getters.organizes_data,
                product_keyword:this.$store.getters.product_keyword,
                product_type:this.$store.getters.options_product_selected,
                products_uncheck:this.$store.getters.products_uncheck,
                product_selected:this.$store.getters.product_selected,
                product_checkall:this.$store.getters.product_checkall,
                viewby:this.$store.getters.getViewById,
                totaltype:this.$store.getters.getTotalType,
                totalfirst:this.$store.getters.getTotalFirst,
                totalsecond:this.$store.getters.getTotalSecond,
                monthfirst:this.$store.getters.getMonthFirst,
                monthsecond:this.$store.getters.getMonthSecond,
            }); */
          } else if (activeStepIndex == 2 && this.step_before == 1) {
            this.$store.dispatch("setLoadStep3", false);
          } else if (activeStepIndex == 1 && this.step_before == 2) {
            this.$store.dispatch("setLoadStep3", false);
          }
        } else {
          this.$store.dispatch("setShowSummary", false);
        }
        let stepper = this.$refs["stepper"];
        if (activeStepIndex == 1) {
          if (roundnoti.length > 0) {
            roundnoti[0].classList.remove("hide-tag");
          }
        } else {
          if (roundnoti.length > 0) {
            roundnoti[0].classList.add("hide-tag");
          }
        }
        this.check_step = activeStepIndex + 1;
        this.step_before = activeStepIndex;
      }
    },
    confirmAlert() {
      if (this.$store.getters.organizes_data == 0) {
        var expand = document.getElementsByClassName("md-list-item-expand");
        expand[0].classList.add("md-active");
        expand[1].classList.remove("md-active");
      }
      this.$refs.snackbar.close();
    },
    saveDraftClick() {
      this.dlg = {
        title: "Do you want to save draft ?",
        contentHtml: "Changes might be saved ",
        subject: "SAVE_DRAFT"
      };
      this.openDialog();
    },
    emitReCallClick() {
      //this.user_position = true;
      this.dlg = {
        title: "Do you want to recall ?",
        contentHtml: "Changes might be saved ",
        subject: "RECALL"
      };
      this.openDialog();
    },
    emitReSendClick() {
      this.dlg = {
        title: "Do you want to adjustment ?",
        contentHtml: "Changes might be saved ",
        subject: "ADJUST"
      };
      this.openDialog();
    },
    emitRejectClick() {
      //this.user_position = false
      this.dlg = {
        title: "Do you want to reject ?",
        contentHtml: "Changes might be saved ",
        subject: "REJECT"
      };
      this.openDialog();
    },
    submitClick() {
      this.dlg = {
        title: "Do you want to submit?",
        contentHtml: "Changes might be saved ",
        subject: "SUBMIT"
      };
      this.openDialog();
    },
    openDialog() {
      this.$refs.dlgname.open();
    },
    closeDialog() {
      this.$refs.dlgname.close();
    },
    submitDlg(type) {
      if (type == "ok") {
        if (this.dlg.subject == "BACK_FIRST") {
          this.$store.dispatch("setAuthenStep", "");
          this.$store.dispatch("setBackToFirst", false);
          this.$store.dispatch("deleteCompleteData");
          this.stepChanged(0);
        } else if (this.dlg.subject == "SAVE_DRAFT") {
          this.$store.dispatch("savePerformance", {
            viewby: this.$store.getters.getViewById,
            type: "draft",
            items: this.$store.getters.getSumItems,
            adjust: this.$store.getters.getRowAdjust,
            headdetail: this.$store.getters.getHeadDetail,
            adjustdetail: this.$store.getters.getAdjustMonthDetailAll,
            product_keyword: this.$store.getters.product_keyword,
            organize_type: this.$store.getters.options_organize_selected,
            organizes: this.$store.getters.organizes_data,
            product_type: this.$store.getters.options_product_selected,
            products_uncheck: this.$store.getters.products_uncheck,
            product_selected: this.$store.getters.product_selected,
            product_checkall: this.$store.getters.product_checkall,
            totaltype: this.$store.getters.getTotalType,
            totalfirst: this.$store.getters.getTotalFirst,
            totalsecond: this.$store.getters.getTotalSecond,
            monthfirst: this.$store.getters.getMonthFirst,
            monthsecond: this.$store.getters.getMonthSecond,
            team: this.$store.getters.getTeamOrganize
          });
        } else if (this.dlg.subject == "RECALL") {
          this.$store.dispatch("setAuthenStep", "callback");
          this.$store.dispatch("setShowButtonSave", true);
          this.$store.commit("SET_STATUS_INPUT", false);
          this.$store.dispatch("recallPerformance", {
            items: this.$store.getters.getSumItems,
            adjust: this.$store.getters.getRowAdjust,
            headdetail: this.$store.getters.getHeadDetail,
            adjustdetail: this.$store.getters.getAdjustMonthDetailAll,
            even_click: "RECALL"
          });
        } else if (this.dlg.subject == "ADJUST") {
          //  this.$store.commit('SET_STATUS_INPUT',true);
          // this.$store.dispatch("setAuthenStep", "recall");
          // //this.$store.dispatch('setShowButtonSave',false);
          // this.$store.dispatch("savePerformance", {
          //   viewby: this.$store.getters.getViewById,
          //   type: "save",
          //   items: this.$store.getters.getSumItems,
          //   adjust: this.$store.getters.getRowAdjust,
          //   headdetail: this.$store.getters.getHeadDetail,
          //   adjustdetail: this.$store.getters.getAdjustMonthDetailAll,
          //   product_keyword: this.$store.getters.product_keyword,
          //   organize_type: this.$store.getters.options_organize_selected,
          //   organizes: this.$store.getters.organizes_data,
          //   product_type: this.$store.getters.options_product_selected,
          //   products_uncheck: this.$store.getters.products_uncheck,
          //   product_selected: this.$store.getters.product_selected,
          //   product_checkall: this.$store.getters.product_checkall,
          //   totaltype: this.$store.getters.getTotalType,
          //   totalfirst: this.$store.getters.getTotalFirst,
          //   totalsecond: this.$store.getters.getTotalSecond,
          //   monthfirst: this.$store.getters.getMonthFirst,
          //   monthsecond: this.$store.getters.getMonthSecond
          // });
          this.$store.dispatch("setAuthenStep", "callback");
          this.$store.dispatch("setShowButtonSave", true);
          this.$store.commit("SET_STATUS_INPUT", false);
          this.$store.dispatch("recallPerformance", {
            items: this.$store.getters.getSumItems,
            adjust: this.$store.getters.getRowAdjust,
            headdetail: this.$store.getters.getHeadDetail,
            adjustdetail: this.$store.getters.getAdjustMonthDetailAll,
            even_click: "ADJUST"
          });
        } else if (this.dlg.subject == "REJECT") {
          // this.$store.dispatch("setAuthenStep", "recall");
          //this.$store.dispatch('setShowButtonSave',false);
          this.$store.dispatch("rejectSalePerformance");
        } else if (this.dlg.subject == "SUBMIT") {
          this.$store.commit("SET_STATUS_INPUT", true);
          this.$store.dispatch("setLoadStep3", false);
          this.$store.dispatch("setShowButtonSave", false);
          var stepper = 2;
          var clsStep = document.getElementsByClassName("md-step-header");
          clsStep[stepper].click();
          var html = document.documentElement;
          html.scrollTop = 0;
          this.check_step = 3;
          this.$store.dispatch("savePerformance", {
            viewby: this.$store.getters.getViewById,
            type: "save",
            items: this.$store.getters.getSumItems,
            adjust: this.$store.getters.getRowAdjust,
            headdetail: this.$store.getters.getHeadDetail,
            adjustdetail: this.$store.getters.getAdjustMonthDetailAll,
            product_keyword: this.$store.getters.product_keyword,
            organize_type: this.$store.getters.options_organize_selected,
            organizes: this.$store.getters.organizes_data,
            product_type: this.$store.getters.options_product_selected,
            products_uncheck: this.$store.getters.products_uncheck,
            product_selected: this.$store.getters.product_selected,
            product_checkall: this.$store.getters.product_checkall,
            totaltype: this.$store.getters.getTotalType,
            totalfirst: this.$store.getters.getTotalFirst,
            totalsecond: this.$store.getters.getTotalSecond,
            monthfirst: this.$store.getters.getMonthFirst,
            monthsecond: this.$store.getters.getMonthSecond,
            team: this.$store.getters.getTeamOrganize
          });
        }
      }
    }
  },
  components: {
    "waring-login": require("../Salesops/layout/waring-login"),
    "nested-organ-dp": require("./subTemplate/nested-organ-dp"),
    "collect-table": require("./subTemplate/collect-table"),
    "recall-step": require("./subTemplate/recall-step"),
    "approve-step": require("./subTemplate/approve-step"),
    "summary-bar": require("./subTemplate/summary-bar"),
    "md-filter": require("./subTemplate/md-filter"),
    "nested-team-dp": require("./subTemplate/nested-team-dp"),
    appStep1: Step1
  },
  created() {
    if (Vue.localStorage.get("login") == null) {
      this.login = false;
    } else {
      this.$store.dispatch("setPathMenuService", "planning");
      let menu = this.$store.getters["displayMenu"];
      let path = this.$router.app._route.path.split("/");
      let pathFull = this.$router.app._route.path;
      let head = _.filter(menu, item => {
        if (item.m_code == path[1]) {
          return true;
        }
      });
      if (head.length > 0) {
        let sub = _.filter(head[0].sub_menu, item => {
          if (item.m_path == pathFull) {
            return true;
          }
        });
        if (sub.length > 0) {
          this.pageName = sub[0].m_name;
        }
      }
      // this.$store.dispatch("setPathMenuService")
      // this.$store.dispatch("selectedMenuService" , {m_code : 'planning'})
      this.login = true;
      var roundnoti = document.getElementsByClassName("roundnoti");
      var dropdown = document.getElementsByClassName("my-dropdown-dd mt-10");
      if (roundnoti.length > 0) {
        roundnoti[0].remove(roundnoti.selectedIndex);
      }
      if (dropdown.length > 0) {
        dropdown[0].remove(dropdown.selectedIndex);
      }
      this.$store.dispatch("initYear");
      this.$store.dispatch("initTotalYear");
      this.$store.dispatch("initMonthYearDefault");
      // this.$store.dispatch("getChannelPerformance");
    }
  }
};
</script>

<style src="./css/performance.css"></style>
