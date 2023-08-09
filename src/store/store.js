import Vue from "vue";
import Vuex from "vuex";

import login from "./core/login";
import custmanage from "./core/custmanage";
import optionlabel from "./core/optionlabel";
import minimumsales from "./core/minimumsales";
import newsfeedlabel from "./core/newsfeedlabel";
import newsfeedbrand from "./core/newsfeedbrand";
import recipient from "./core/recipient";
import formmanage from "./core/formmanage";
import departmentManage from "./core/departmentManage";
import usermanage from "./core/usermanage";
import rolemanagement from "./core/rolemanagement";
import corporatemanage from "./core/corporatemanage";
import cmmanage from "./core/cmmanage";
import datatransfer from "./core/datatransfer";
// import datareprocess from "./core/datareprocess";



import dashboard from "./dashboard/overview";
import performance_dashboard from "./dashboard/performance";
import incentive_dashboard from "./dashboard/incentive";

import ckeckin from "./activity/ckeckin";
import newsfeed from "./activity/newsfeed";
import activitymanage from "./activity/activityMng";
import locationchecking from "./activity/locationchecking";
import visit from "./activity/visit";

import step1 from "./planning/organizes";
import step2 from "./planning/step2";
import tripplan from "./planning/tripplan";
import saleplan from "./planning/salesplan";
import incentive from "./planning/incentive";
import payment from "./planning/payment";
import salesactivity from "./planning/salesactivity";


import myorders from "./orders/myorders";
import history from "./orders/history";
import backordmanage from "./orders/backordmanage";
import mybackorder from "./orders/mybackorder";
import globalfunc from "./globalfunc";
import budget from "./orders/budget";
import salesactivityreports from "./orders/salesactivityeport";
import summaryorders from "./orders/summaryorders";

import maintenance from "./firebase/maintenance";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    globalfunc,
    login,
    dashboard,
    step1,
    step2,
    ckeckin,
    tripplan,
    newsfeed,
    saleplan,
    custmanage,
    optionlabel,
    newsfeedlabel,
    newsfeedbrand,
    myorders,
    performance_dashboard,
    minimumsales,
    recipient,
    formmanage,
    history,
    backordmanage,
    mybackorder,
    incentive,
    budget,
    payment,
    incentive_dashboard,
    activitymanage,
    departmentManage,
    usermanage,
    rolemanagement,
    locationchecking,
    visit,
    corporatemanage,
    cmmanage,
    datatransfer,
    salesactivity,
    salesactivityreports,
    maintenance,
    summaryorders
    // datareprocess
  }
});
