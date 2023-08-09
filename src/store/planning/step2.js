import salePerformanceService from "../../services/planning/salePerformance";
import Vue from "vue";
import moment from "moment";
const state = {
  items: [],
  comments: [],
  keycomment: "",
  commentshow: [],
  sum_total: [],
  sum_prevmonth: [],
  month_adjust: [],
  perpage: 99999999,
  viewby: [
    {
      id: 2,
      // name: "Product Organization"
      name: "(Cards - Product) / Rows : Sales Team"
    },
    {
      id: 1,
      // name: "Sales Organization"
      name: "(Cards - Sales Team) / Rows : Product"
    }
   
  ],
  viewby_value: 2,
  arrYear: [],
  arrQuater: [
    { id: "Q1", value: "Q1" },
    { id: "Q2", value: "Q2" },
    { id: "Q3", value: "Q3" },
    { id: "Q4", value: "Q4" }
  ],
  arrMonth: [
    { id: "01", value: "JAN" },
    { id: "02", value: "FEB" },
    { id: "03", value: "MAR" },
    { id: "04", value: "APR" },
    { id: "05", value: "MAY" },
    { id: "06", value: "JUN" },
    { id: "07", value: "JUL" },
    { id: "08", value: "AUG" },
    { id: "09", value: "SEP" },
    { id: "10", value: "OCT" },
    { id: "11", value: "NOV" },
    { id: "12", value: "DEC" }
  ],
  total_label: [
    "TOTALS - BY QTR",
    "YEAR",
    "MONTH",
    "AVG - BY QTR",
    "AVG - BY YEAR"
  ],
  total_type: 2,
  total_first: "",
  total_second: "",
  month_first: "",
  month_second: "",
  // show_total: false,
  show_total: true,
  show_detail: false,
  row_total: {
    target_total: 0,
    sales_total: 0,
    growth_total: 0,
    achieved_total: 0,
    ratio_total: 0,
    target_month: 0,
    sales_month: 0,
    achieved_month: 0,
    growth_month: 0,
    ratio_month: 0
  },
  row_total_detail: [],
  total_page: 1,
  detail_page: [],
  load_total: false,
  load_detail: false,
  load_detail_head: false,
  loading: false,
  head_detail: [],
  items_detail: [],
  sum_total_detail: [],
  sum_prevmonth_detail: [],
  sum_adjustmonth_detail: [],
  head_index: 0,
  show_total_detail: [],
  row_adjust: [],
  total_adjust_row: [],
  row_detail_adjust: [],
  month_year_start: "",
  load_step3: true,
  show_save_button: true,
  show_summary: false,
  show_expand: false,
  summary_total_target: 0,
  summary_total_balance: 0,
  authen_step: "",
  user_id: "",
  user_request: [],
  users_request: [],
  header_status: [],
  recall_button: false,
  approve_button: true,
  backtofirst: false,
  keepExpand: "",
  status_input: true,
  show_progress: false,
  keepAllData: [],
  lock_process: false,
  authen_step_check: "",
  team_select: [],
  value_team: 1,
  team_select_step2: [],
  balance_detail:[],
  balance_total:[{
    sum_total:0,
    sum_per_total:0,
    sum_dnss:0,
    sum_per_dnss:0,
    sum_gnss:0,
    sum_per_gnss:0,
    sum_dnbs:0,
    sum_per_dnbs:0,
    sum_dnpc:0,
    sum_per_dnpc:0
  }]
  ,
  display_balance:false,
  load_hover:false,
  sum_hover:[],
  product_check:[]
};
const mutations = {
  INIT_YEAR(state, value) {
    state.arrYear = value;
  },
  SELECTED_VIEWBY(state, value) {
    state.viewby_value = value;
  },
  SELECTED_TEAM_ORG(state, value) {
    state.value_team = value;
  },
  SELECTED_TOTALTYPE(state, value) {
    state.total_type = value;
  },
  SELECTED_TOTALFIRST(state, value) {
    state.total_first = value;
  },
  SELECTED_TOTALSECOND(state, value) {
    state.total_second = value;
  },
  SELECTED_MONTHFIRST(state, value) {
    state.month_first = value;
  },
  SELECTED_MONTHSECOND(state, value) {
    state.month_second = value;
  },
  SET_SUM_ITEMS(state, value) {
    state.items = value;
  },
  SET_SUM_ITEMS_MORE(state, value) {
    state.items.push.apply(state.items, value);
  },
  SET_SUM_TOTAL(state, value) {
    state.sum_total = value;
  },
  SET_SUM_PREVMONTH(state, value) {
    state.sum_prevmonth = value;
  },
  SET_SHOW_TOTAL(state, value) {
    state.show_total = value;
  },
  SET_ROW_TOTAL(state, value) {
    state.row_total = value;
  },
  SET_LOAD_TOTAL(state, value) {
    state.load_total = value;
  },
  SET_LOAD_DETAIL_HEAD(state, value) {
    state.load_detail_head = value;
  },
  SET_LOAD_DETAIL(state, value) {
    state.load_detail = value;
  },
  SET_TOTAL_PAGE(state, value) {
    state.total_page = value;
  },
  SET_LOADING(state, value) {
    state.loading = value;
  },
  SET_SHOW_DETAIL(state, value) {
    state.show_detail = value;
  },
  SET_HEAD_INDEX(state, value) {
    state.head_index = value;
  },
  SET_CLEAR_HEAD_DETAIL(state) {
    state.head_detail = [];
  },
  SET_HEAD_DETAIL_MORE(state, value) {
    value.status = 'false'
    state.head_detail.push(value);
  },
  SET_CLEAR_DETAIL_ITEMS(state) {
    state.items_detail = [];
  },
  SET_DETAIL_ITEMS(state, value) {
    if (value.insertType == "new")
      Vue.set(state.items_detail, value.index, value.response);
    else {
      state.items_detail.push.apply(
        state.items_detail[value.index],
        value.response
      );
    }
    
  },
  SET_CLEAR_DETAIL_PAGE(state) {
    state.detail_page = [];
  },
  SET_DETAIL_PAGE(state, value) {
    state.detail_page[value.index] = value.page;
  },
  SET_SHOW_TOTAL_DETAIL(state, value) {
    const data = value.value;
    Vue.set(state.show_total_detail, value.index, data);
  },
  SET_ROWADJUST_TOTAL(state, value) {
    state.total_adjust_row = value;
  },
  SET_ROWADJUST(state, value) {
    state.row_adjust = value;
  },
  SET_COMMENTS_NULL(state) {
    state.comments = [];
  },
  SET_COMMENTS(state, value) {
    //state.comments.push.apply(state.comments, value);
    state.comments = value;
  },
  SET_COMMENT_APPEND(state, value) {
    if (state.comments[state.keycomment]) {
      if (state.comments[state.keycomment]["now"]) {
        state.comments[state.keycomment]["now"].push(value);
        state.comments[state.keycomment]["read"] = value.status_read;
      } else {
        state.comments[state.keycomment]["now"] = [];
        state.comments[state.keycomment]["now"].push(value);
        state.comments[state.keycomment]["read"] = value.status_read;
      }
    } else {
      state.comments[state.keycomment] = [];
      state.comments[state.keycomment]["now"] = [];
      state.comments[state.keycomment]["now"].push(value);
      state.comments[state.keycomment]["read"] = value.status_read;
      // Vue.set(state.comments[state.keycomment]["now"], 0, value);
    }
    state.commentshow = state.comments[state.keycomment];
    //state.comments.push.apply(state.comments, value);
  },
  SET_COMMENT_SHOW(state, value) {
    state.commentshow = value;
  },
  SET_KEY_COMMENT(state, value) {
    state.keycomment = value;
  },
  INIT_START_MONTH_YEAR(state, value) {
    state.month_year_start = value;
  },
  SET_LOAD_STEP3(state, value) {
    state.load_step3 = value;
  },
  SET_SHOW_SAVE_BUTTON(state, value) {
    state.show_save_button = value;
  },
  SET_SHOW_SUMMARY(state, value) {
    state.show_summary = value;
  },
  SET_SUMMARY_TOTAL_TARGET(state, value) {
    state.summary_total_target = value;
  },
  SET_SUMMARY_TOTAL_BALANCE(state, value) {
    state.summary_total_balance = value;
  },
  SET_SHOW_EXPAND(state, value) {
    state.show_expand = value;
  },
  SET_AUTHEN_STEP(state, value) {
    state.authen_step = value;
  },
  SET_USER_ID(state, value) {
    state.user_id = value;
  },
  SET_USERS_REQUEST(state, value) {
    state.users_request = value;
  },
  SET_USER_REQUEST(state, value) {
    state.user_request = value;
  },
  SET_HEADER_STATUS(state, value) {
    if (value == "") {
      state.header_status = [];
    } else {
      state.header_status = value;
    }
  },
  SET_RECALL_BUTTON(state, value) {
    state.recall_button = value;
  },
  SET_BACKTOFIRST(state, value) {
    state.backtofirst = value;
  },
  SET_APPROVE_BUTTON(state, value) {
    state.approve_button = value;
  },
  SET_EXPAND(state, value) {
    state.keepExpand = value;
  },
  SET_STATUS_INPUT(state, value) {
    state.status_input = value;
  },
  SET_COMMENT_UPDATE(state, value) {
    if (state.comments[state.keycomment]) {
      state.comments[state.keycomment] = value;
      /* if (state.comments[state.keycomment]["now"]) {
        state.comments[state.keycomment]["now"].push(value);
      } else {
        Vue.set(state.comments[state.keycomment]["now"], 0, value);
      } */
    } else {
      state.comments[state.keycomment] = [];
      // state.comments[state.keycomment]["now"] = [];
      state.comments[state.keycomment].push(value);
      // Vue.set(state.comments[state.keycomment], 0, value);
    }
    state.commentshow = state.comments[state.keycomment];
    //state.comments.push.apply(state.comments, value);
  },
  SET_CLEAR_ADJUSMONTH_DETAIL(state) {
    state.sum_adjustmonth_detail = [];
  },
  SET_LOCK_PROCESS(state, value) {
    state.lock_process = value;
  },
  SET_AUTHEN_STEP_CHECK(state, value) {
    state.authen_step_check = value;
  },
  SET_TEAM_ORGANIZE(state, value) {
    for (var i = 0; i < value.length; i++) {
      Vue.set(state.team_select, i, value[i]);
    }
  },
  SET_CLEAR_TEAM_ORGANIZE(state){
    state.team_select = [];
  },
  SET_TEAM_SELECT_STEP2(state, value){
    state.team_select_step2 = value;
  }

};

const actions = {
  initMonthYearDefault: ({ commit, dispatch }) => {
    commit("SET_BACKTOFIRST", false);
    commit("SET_AUTHEN_STEP", "");
    commit("SET_AUTHEN_STEP_CHECK", "");
    commit("SET_USER_ID", "");
    commit("SET_LOAD_STEP3", false);
    commit("SET_SHOW_SAVE_BUTTON", true);
    commit("SET_LOCK_PROCESS", false);
    commit("SET_CLEAR_TEAM_ORGANIZE");
    const today = new Date();
    let year = today.getFullYear();
    let month = ("0" + today.getMonth()).slice(-2);
    if (month == 0) {
      month = 12;
      year = year - 1;
    }
    dispatch("initPrevMonth", { year, month });
    commit("INIT_START_MONTH_YEAR", "");
    salePerformanceService
      .getMonthYearDefault("/get-default-yearandmonth")
      .then(response => {
        if (response.month) {
          const date = response.month.split("-");
          if((date[0]*1) == 1){
            month = 12;
            year = date[1] - 1;
          }else{
            month = ("0" + date[0] - 1);
            year = date[1] * 1;
          }
          dispatch("initPrevMonth", { year, month });
          commit("INIT_START_MONTH_YEAR", response.month);
        }
        if (response.users) {
          if(response.users.length > 0){
            commit("SET_USER_REQUEST", response.users[0]);
            commit("SET_USERS_REQUEST", response.users);
            if (response.users[0].type == "R" || response.users[0].type == "A") {
              commit("SET_APPROVE_BUTTON", false);
            }else{
              if(response.users[0].status == 'reject' || response.users[0].status == 'approve'){
                if(response.users[0].sendto == Vue.localStorage.get("emp_id")){
                  commit("SET_APPROVE_BUTTON", true);
                }else{
                  commit("SET_APPROVE_BUTTON", false);
                }
                
              }else{
                commit("SET_APPROVE_BUTTON", true);
              }
                
            }
          }else{
            commit("SET_USER_REQUEST", {});
            commit("SET_USERS_REQUEST", []);
          }

        } else {
          commit("SET_USER_REQUEST", {});
          commit("SET_USERS_REQUEST", []);
        }
        if (response.check != "") {
          if(Object.keys(response.filter).length > 0){

            if (response.filter.emp_id == Vue.localStorage.get("emp_id")) {
              if (response.check == "recall" || response.check == "approved" || response.check == "reject") {
                commit("SET_STATUS_INPUT", true);
              } else {
                commit("SET_STATUS_INPUT", false);
              }
            } else {
              commit("SET_STATUS_INPUT", true);
            }
            commit("SET_AUTHEN_STEP", response.check);
            commit("SET_AUTHEN_STEP_CHECK", response.check);
            commit("SET_HEADER_STATUS", "");
            commit("SET_LOCK_PROCESS", response.lock_process);

            if (response.filter) {
              //(response.filter.products_checkall == 'true');
              commit("SET_USER_ID", response.filter.emp_id);
              commit("SELECTED_ORGANIZE", response.filter.organize_type * 1);
              //commit('SET_KEYWORD_PRODUCT',response.filter.product_keyword);
              commit("SET_ORGANIZE_SERVER", response.filter.organizes);
              commit("SELECTED_PRODUCT", response.filter.product_type * 1);
              commit("SET_TEAM_ORGANIZE",JSON.parse(response.filter.team_select));
              commit(
                "SET_PRODUCT_CHECKALL",
                response.filter.products_checkall == "true"
              );

              commit("SET_CLEAR_PRODUCT_SELECTED");

              commit("SET_UNCHECK_PRODUCT_NULL");
              let products_check = [];
              let products_uncheck = [];

              if(response.filter.viewby == 1){
                products_check = JSON.parse(response.filter.product_select);
              }else{
                products_check = response.filter.products_check;
              }
              if (response.check == "draft" || response.check == "recall") {
                // products_check = response.filter.products_check;
                // products_check = JSON.parse(response.filter.product_select);
                products_uncheck = response.filter.products_uncheck;
                commit(
                  "SET_PRODUCT_SELECTED_FROM_SERVER",products_check
                );
                commit(
                  "SET_PRODUCT_UNCHECK_FROM_SERVER",
                  response.filter.products_uncheck
                );
              } else {
                response.filter.products_checkall = true;
              }
              commit("SELECTED_TOTALTYPE", response.filter.totaltype);
              commit("SELECTED_TOTALSECOND", response.filter.totalsecond);
              commit("SELECTED_VIEWBY", response.filter.viewby);
              commit("SET_LOAD_STEP3", true);
              const date = moment(
                response.filter.senddate,
                "YYYY-MM-DD HH:mm:ss"
              );
              let organize_check =[];
              if(response.organize_select){
                organize_check = JSON.parse(response.filter.organize_select);
              }else{
                organize_check = response.filter.organizes;
              }

              let _team_select = JSON.parse(response.filter.team_select).filter(team => {
                return team.checked == true;
              });

              /*const header_step3 = {submitted:date.format('MMMM DD, YYYY at HH : mm'),userapprove:response.filter.userapprove};
                      if(response.check == 'reject'){
                          const datereject = moment(response.filter.rejectdate,'YYYY-MM-DD HH:mm:ss');
                          header_step3.datereject = datereject.format('MMMM DD, YYYY at HH : mm');
                      }
                      
                      commit('SET_HEADER_STEP3',header_step3);*/

              dispatch("getSumMainService2", {
                checkLoad: "defaultMonth",
                org_select_sev: _.cloneDeep(organize_check),
                pro_select_sev: _.cloneDeep(products_check),
                total_page: 1,
                product_keyword: "",
                organize_type: response.filter.organize_type * 1,
                organizes: response.filter.organizes,
                product_type: response.filter.product_type * 1,
                products_uncheck: products_uncheck,
                product_selected: products_check,
                product_checkall: response.filter.products_checkall,
                viewby: response.filter.viewby,
                totaltype: response.filter.totaltype,
                totalfirst: response.filter.totalfirst,
                totalsecond: response.filter.totalsecond,
                monthfirst: response.filter.monthfirst,
                monthsecond: response.filter.monthsecond,
                team_select: _team_select
              });
            }else{
              if(response.user_id != ""){
                commit("SET_USER_ID", response.user_id);
              }
            }
            if (response.header_status) {
              commit("SET_HEADER_STATUS", response.header_status);
            }
            setTimeout(() => {
              if (response.backtofirst == true) {
                dispatch("setBackToFirst", response.backtofirst);
              } else {
                dispatch("setBackToFirst", false);
              }
            }, 1000);
        }else{
          commit("SET_AUTHEN_STEP", response.check);
          commit("SET_AUTHEN_STEP_CHECK", response.check);
          commit("SET_HEADER_STATUS", "");
          commit("SET_LOCK_PROCESS", response.lock_process);
        }
        } else {
          commit("SET_STATUS_INPUT", false);
          if(response.user_id != ""){
            commit("SET_USER_ID", response.user_id);
          }
        }
      })
      .catch(error => console.log("error auto step"));
  },
  initYear: ({ commit }) => {
    let arrYear = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    for (let i = 3; i >= 0; i--) {
      arrYear.push({ id: year - i, value: year - i });
    }
    commit("INIT_YEAR", arrYear);
  },
  initPrevMonth: ({ commit }, value) => {
    commit("SELECTED_MONTHFIRST", value.year);
    commit("SELECTED_MONTHSECOND", value.month);
  },
  initTotalYear: ({ commit }) => {
    const today = new Date();
    let value = today.getFullYear();
    const month = today.getMonth();
    if (month < 2) value = value - 1;
    commit("SELECTED_TOTALFIRST", value);
  },
  selectedViewBy: ({ commit }, value) => {
    commit("SELECTED_VIEWBY", value.id);
  },
  selectedTeamOrg: ({ commit }, value) => {
    commit("SELECTED_TEAM_ORG", value.id);
  },
  selectedTotal: ({ commit }, { rows, item, selectedRow }) => {
    commit("SELECTED_TOTALTYPE", selectedRow);
    commit("SELECTED_TOTALFIRST", rows.id);
    if (item == null) {
      commit("SELECTED_TOTALSECOND", "");
    } else {
      commit("SELECTED_TOTALSECOND", item.id);
    }
  },
  selectedMonth: ({ commit }, { rows, item }) => {
    commit("SELECTED_MONTHFIRST", rows.id);
    commit("SELECTED_MONTHSECOND", item.id);
  },



  setSumTotal: ({ commit, state }, response) => {
    const page = state.total_page;
    for (var i = (page - 1) * state.perpage; i < state.items.length; i++) {
      const sales_total = response.find(o => o.id == state.items[i].id);
      let theArray = new Array();
      theArray[i] = {};
      if (sales_total) {
        theArray[i].sales_total = sales_total.total;
        theArray[i].target_total = sales_total.total_target;
        theArray[i].growth_total = sales_total.growth_total;
        theArray[i].achieved_total = sales_total.achieved;
        theArray[i].ratio_total = sales_total.ratio;
      } else {
        theArray[i].sales_total = 0;
        theArray[i].target_total = 0;
        theArray[i].growth_total = 0;
        theArray[i].achieved_total = 0;
        theArray[i].ratio_total = 0;
      }
      Vue.set(state.sum_total, i, theArray[i]);
    }
    /*items.forEach((element,index,theArray) => {
            const sales_total = response.find(o => o.id === element.id);
            if(sales_total){
                theArray[index].sales_total = sales_total.total;
                theArray[index].target_total = sales_total.total_target;
                theArray[index].growth_total = sales_total.growth_total;
                theArray[index].achieved_total = sales_total.achieved;
                theArray[index].ratio_total = sales_total.ratio;
            }else{
                theArray[index].sales_total = 0;
                theArray[index].target_total = 0;
                theArray[index].growth_total = 0;
                theArray[index].achieved_total = 0;
                theArray[index].ratio_total = 0;
            }
            Vue.set(state.sum_total, index, theArray[index]);
        });*/
    //commit('SET_SUM_TOTAL', items);
  },
  setSumTotalDetail: ({ commit, state }, response) => {
    const index = response.index;
    let items = []
    if(state.items_detail[index] != undefined){
      items = state.items_detail[index]
    }
    state.items_detail[index];
    const page = state.detail_page[index];
    let theArray = [];
    if (state.sum_total_detail[index] == undefined)
      state.sum_total_detail[index] = new Array();
    for (var i = (page - 1) * state.perpage; i < items.length; i++) {
      const sales_total = response.data.find(o => o.id === items[i].id);
      theArray = state.sum_total_detail[index];
      if (theArray[i] == undefined) theArray[i] = {};
      if (sales_total) {
        theArray[i].sales_total = sales_total.total;
        theArray[i].target_total = sales_total.total_target;
        theArray[i].growth_total = sales_total.growth_total;
        theArray[i].achieved_total = sales_total.achieved;
        theArray[i].ratio_total = sales_total.ratio;
      } else {
        theArray[i].sales_total = 0;
        theArray[i].target_total = 0;
        theArray[i].growth_total = 0;
        theArray[i].achieved_total = 0;
        theArray[i].ratio_total = 0;
      }
      //state.sum_total_detail[index] = new Array();
    }
    Vue.set(state.sum_total_detail, index, theArray);
  },
  setPrevMonth: ({ commit, state }, response) => {
    const page = state.total_page;
    for (var i = (page - 1) * state.perpage; i < state.items.length; i++) {
      const sales_month = response.find(o => o.id == state.items[i].id);
      let theArray = new Array();
      theArray[i] = {};
      if (sales_month) {
        theArray[i].sales_month = sales_month.total;
        theArray[i].target_month = sales_month.total_target;
        theArray[i].growth_month = sales_month.growth_month;
        theArray[i].achieved_month = sales_month.achieved;
        theArray[i].ratio_month = sales_month.ratio;
      } else {
        theArray[i].sales_month = 0;
        theArray[i].target_month = 0;
        theArray[i].growth_month = 0;
        theArray[i].achieved_month = 0;
        theArray[i].ratio_month = 0;
      }
      Vue.set(state.sum_prevmonth, i, theArray[i]);
    }

    /*items.forEach((element,index,theArray) => {
            const sales_month = response.find(o => o.id === element.id);
            if(sales_month){
                theArray[index].sales_month = sales_month.total;
                theArray[index].target_month = sales_month.total_target;
                theArray[index].growth_month = sales_month.growth_month;
                theArray[index].achieved_month = sales_month.achieved;
                theArray[index].ratio_month = sales_month.ratio;
            }else{
                theArray[index].sales_month = 0;
                theArray[index].target_month = 0;
                theArray[index].growth_month = 0;
                theArray[index].achieved_month = 0;
                theArray[index].ratio_month = 0;
            }
            Vue.set(state.sum_prevmonth, index, theArray[index]);
        });*/
    //commit('SET_SUM_PREVMONTH', items);
  },
  setPrevMonthDetail: ({ commit, state }, response) => {
    const index = response.index;
    let items = []
    if(state.items_detail[index] != undefined){
      items = state.items_detail[index]
    }
    const page = state.detail_page[index];
    let theArray = [];
    if (state.sum_prevmonth_detail[index] == undefined)
      state.sum_prevmonth_detail[index] = new Array();
    for (var i = (page - 1) * state.perpage; i < items.length; i++) {
      const sales_month = response.data.find(o => o.id === items[i].id);
      theArray = state.sum_prevmonth_detail[index];
      if (theArray[i] == undefined) theArray[i] = {};
      if (sales_month) {
        theArray[i].sales_month = sales_month.total;
        theArray[i].target_month = sales_month.total_target;
        theArray[i].growth_month = sales_month.growth_month;
        theArray[i].achieved_month = sales_month.achieved;
        theArray[i].ratio_month = sales_month.ratio;
      } else {
        theArray[i].sales_month = 0;
        theArray[i].target_month = 0;
        theArray[i].growth_month = 0;
        theArray[i].achieved_month = 0;
        theArray[i].ratio_month = 0;
      }
    }
    Vue.set(state.sum_prevmonth_detail, index, theArray);
  },
  setRowAdjust: ({ commit, state }, response) => {
    const page = state.total_page;
    for (var i = (page - 1) * state.perpage; i < state.items.length; i++) {
      const adjust = response.find(o => o.id == state.items[i].id);
      let theArray = new Array();
      theArray[i] = {};
      if (adjust) {
        theArray[i].code = state.items[i].id;
        theArray[i].adjust_target = adjust.total_target
          ? adjust.total_target
          : 0;
        theArray[i].adjust = adjust.adjust ? adjust.adjust : 0;
        theArray[i].adjust_sale = adjust.total ? adjust.total : 0;
        theArray[i].growth = adjust.growth ? adjust.growth : 0;
        theArray[i].lasttarget = adjust.lasttarget ? adjust.lasttarget : 0;
        theArray[i].success = adjust.success ? adjust.success : 0;
        theArray[i].ratio = adjust.ratio ? adjust.ratio : 0;

        theArray[i].adjust_target1 = adjust.total_target1
          ? adjust.total_target1
          : 0;
        theArray[i].adjust1 = adjust.adjust1 ? adjust.adjust1 : 0;
        theArray[i].growth1 = adjust.growth1 ? adjust.growth1 : 0;
        theArray[i].lasttarget1 = adjust.lasttarget1 ? adjust.lasttarget1 : 0;
        theArray[i].success1 = adjust.success1 ? adjust.success1 : 0;
        theArray[i].ratio1 = adjust.ratio1 ? adjust.ratio1 : 0;

        theArray[i].adjust_target2 = adjust.total_target2
          ? adjust.total_target2
          : 0;
        theArray[i].adjust2 = adjust.adjust2 ? adjust.adjust2 : 0;
        theArray[i].growth2 = adjust.growth2 ? adjust.growth2 : 0;
        theArray[i].lasttarget2 = adjust.lasttarget2 ? adjust.lasttarget2 : 0;
        theArray[i].success2 = adjust.success2 ? adjust.success2 : 0;
        theArray[i].ratio2 = adjust.ratio2 ? adjust.ratio2 : 0;
        theArray[i].adjust_db = adjust.adjust_db ? adjust.adjust_db : 0;
        theArray[i].adjust_db1 = adjust.adjust_db1 ? adjust.adjust_db1 : 0;
        theArray[i].adjust_db2 = adjust.adjust_db2 ? adjust.adjust_db2 : 0;
    
        
        
      } else {
        theArray[i].code = state.items[i].id;
        theArray[i].adjust_target = 0;
        theArray[i].adjust = 0;
        theArray[i].adjust_sale = 0;
        theArray[i].growth = 0;
        theArray[i].lasttarget = 0;
        theArray[i].success = 0;
        theArray[i].ratio = 0;
        

        theArray[i].adjust_target1 = 0;
        theArray[i].adjust1 = 0;
        theArray[i].growth1 = 0;
        theArray[i].lasttarget1 = 0;
        theArray[i].success1 = 0;
        theArray[i].ratio1 = 0;

        theArray[i].adjust_target2 = 0;
        theArray[i].adjust2 = 0;
        theArray[i].growth2 = 0;
        theArray[i].lasttarget2 = 0;
        theArray[i].success2 = 0;
        theArray[i].ratio2 = 0;
        theArray[i].adjust_db = 0;
        theArray[i].adjust_db1 = 0;
        theArray[i].adjust_db2 = 0;
       
     
      }
      Vue.set(state.row_adjust, i, theArray[i]);
    }
  },
  setMonthAdjustDetail: ({ commit, state }, response) => {
    const index = response.index;
    let items = [];
    if (state.items_detail[index] != undefined){
      items = state.items_detail[index]
    }
    // const items = state.items_detail[index];
    const page = state.detail_page[index];
    let theArray = [];
    const status_box = response.data.find(o => o.adjust < Number(o.max_value)); //check_statusBox 
    if(status_box != undefined){
        state.head_detail[index].status = 'true'
    }
    if (state.sum_adjustmonth_detail[index] == undefined){
      state.sum_adjustmonth_detail[index] = new Array();
    }

    for (var i = (page - 1) * state.perpage; i < items.length; i++) {
 

      const adjust = response.data.find(o => o.id === items[i].id);
      theArray = state.sum_adjustmonth_detail[index];
      if (theArray[i] == undefined) theArray[i] = {};
      if (adjust && response.data.length!=0) {

        theArray[i].code = items[i].id;
        theArray[i].adjust_target = adjust.total_target
          ? adjust.total_target
          : 0;
        theArray[i].adjust = adjust.adjust ? adjust.adjust : 0;
        theArray[i].adjust_sale = adjust.total ? adjust.total : 0;
        theArray[i].growth = adjust.growth ? adjust.growth : 0;
        theArray[i].lasttarget = adjust.lasttarget ? adjust.lasttarget : 0;
        theArray[i].ratio = adjust.ratio ? adjust.ratio : 0;
        theArray[i].success = adjust.success ? adjust.success : 0;

        theArray[i].adjust_target1 = adjust.total_target1
          ? adjust.total_target1
          : 0;
        theArray[i].adjust1 = adjust.adjust1 ? adjust.adjust1 : 0;
        theArray[i].growth1 = adjust.growth1 ? adjust.growth1 : 0;
        theArray[i].lasttarget1 = adjust.lasttarget1 ? adjust.lasttarget1 : 0;
        theArray[i].ratio1 = adjust.ratio1 ? adjust.ratio1 : 0;
        theArray[i].success1 = adjust.success1 ? adjust.success1 : 0;
        //theArray[i].adjust_sale1 = adjust.total1;
        theArray[i].adjust_target2 = adjust.total_target2
          ? adjust.total_target2
          : 0;
        theArray[i].adjust2 = adjust.adjust2 ? adjust.adjust2 : 0;
        theArray[i].growth2 = adjust.growth2 ? adjust.growth2 : 0;
        theArray[i].lasttarget2 = adjust.lasttarget2 ? adjust.lasttarget2 : 0;
        theArray[i].ratio2 = adjust.ratio2 ? adjust.ratio2 : 0;
        theArray[i].check_desc = adjust.check_desc ;
        theArray[i].checked = adjust.checked ;
        theArray[i].max_value = adjust.max_value ;


        
        theArray[i].success3 = adjust.success3 ? adjust.success3 : 0;
        //theArray[i].adjust_sale2 = adjust.total2;
      } else {
        theArray[i].code = items[i].id;
        theArray[i].adjust_target = 0;
        theArray[i].adjust = 0;
        theArray[i].adjust_sale = 0;
        theArray[i].growth = 0;
        theArray[i].lasttarget = 0;
        theArray[i].ratio = 0;
        theArray[i].success = 0;

        theArray[i].adjust_target1 = 0;
        theArray[i].adjust1 = 0;
        theArray[i].growth1 = 0;
        theArray[i].lasttarget1 = 0;
        theArray[i].ratio1 = 0;
        theArray[i].success1 = 0;
        //theArray[i].adjust_sale1 = 0;
        theArray[i].adjust_target2 = 0;
        theArray[i].adjust2 = 0;
        theArray[i].growth2 = 0;
        theArray[i].lasttarget2 = 0;
        theArray[i].ratio2 = 0;
        theArray[i].success2 = 0; 
        theArray[i].check_desc = "";
        theArray[i].max_value = 0;
        
        //theArray[i].adjust_sale2 = 0;
      }
    }
    Vue.set(state.sum_adjustmonth_detail, index, theArray);
  },


  setSumRowTotal: ({ commit, state }, response) => {
    const total = state.row_total;
    total.target_total = response.total_target ? response.total_target : 0;
    total.sales_total = response.total ? response.total : 0;
    total.growth_total = response.growth_total ? response.growth_total : 0;
    total.achieved_total = response.achieved ? response.achieved : 0;
    total.ratio_total = response.ratio_total ? response.ratio_total : 0;
    commit("SET_ROW_TOTAL", total);
    //Vue.set(state.row_total, index, theArray[index]);
  },
  setSumRowTotalDetail: ({ commit, state }, response) => {
    const index = response.index;
    if (state.row_total_detail[index] == undefined)
      state.row_total_detail[index] = {};
    const total = state.row_total_detail[index];
    if(response.total != undefined){
      total.target_total = response.total.total_target ? response.total.total_target : 0;
      total.sales_total = response.total.total ? response.total.total : 0;
      total.growth_total = response.total.growth_total ? response.total.growth_total : 0;
      total.achieved_total = response.total.achieved ? response.total.achieved : 0;
      total.ratio_total = response.total.ratio_total ? response.total.ratio_total : 0;
    }else{
      total.target_total = 0;
      total.sales_total = 0;
      total.growth_total = 0;
      total.achieved_total = 0;
      total.ratio_total = 0;
    }
    
    Vue.set(state.row_total_detail, index, total);
  },
  setPrevMonthRowTotal: ({ commit, state }, response) => {
    const total = state.row_total;
    total.target_month = response.total_target ? response.total_target : 0;
    total.sales_month = response.total ? response.total : 0;
    total.growth_month = response.growth_month ? response.growth_month : 0;
    total.achieved_month = response.achieved ? response.achieved : 0;
    total.ratio_month = response.ratio_month ? response.ratio_month : 0;
    commit("SET_ROW_TOTAL", total);
  },
  setPrevMonthRowTotalDetail: ({ commit, state }, response) => {
    const index = response.index;
    if (state.row_total_detail[index] == undefined)
      state.row_total_detail[index] = {};
    const total = state.row_total_detail[index];
    if(response.total != undefined){
      total.target_month = response.total.total_target
        ? response.total.total_target
        : 0;
      total.sales_month = response.total.total ? response.total.total : 0;
      total.growth_month = response.total.growth_total
        ? response.total.growth_total
        : 0;
      total.achieved_month = response.total.achieved
        ? response.total.achieved
        : 0;
      total.ratio_month = response.total.total_ratio
        ? response.total.total_ratio
        : 0;
    }else{
      total.target_month =  0;
      total.sales_month = 0;
      total.growth_month = 0;
      total.achieved_month = 0;
      total.ratio_month = 0;
    }
    Vue.set(state.row_total_detail, index, total);
  },
  setMonthAdjustTotalDetail: ({ commit, state }, response) => {
 
    const index = response.index;
    if (state.row_total_detail[index] == undefined)
      state.row_total_detail[index] = {};
    const total = state.row_total_detail[index];
 
    if(response.total.length  == undefined){
      response.total = [];
    }
    if(response.total != undefined && response.total.length != 0){
      total.adjust_target = response.total[0].total_target
        ? response.total[0].total_target
        : 0;
      total.adjust = response.total[0].total_adjust
        ? response.total[0].total_adjust
        : 0;
      total.adjust_sale = response.total[0].total ? response.total[0].total : 0;
      total.growth = response.total[0].total_growth
        ? response.total[0].total_growth
        : 0;
      total.success = response.total[0].total_success
        ? response.total[0].total_success
        : 0;
      total.total_ratio = response.total[0].total_ratio
        ? response.total[0].total_ratio
        : 0;
      total.check_desc = response.total[0].check_desc;
      total.adjust_target1 = response.total[1].total_target
        ? response.total[1].total_target
        : 0;
      total.adjust1 = response.total[1].total_adjust
        ? response.total[1].total_adjust
        : 0;
      total.growth1 = response.total[1].total_growth
        ? response.total[1].total_growth
        : 0;
      total.total_ratio1 = response.total[1].total_ratio
        ? response.total[1].total_ratio
        : 0;
      total.adjust_target2 = response.total[2].total_target
        ? response.total[2].total_target
        : 0;
      total.adjust2 = response.total[2].total_adjust
        ? response.total[2].total_adjust
        : 0;
      total.growth2 = response.total[2].total_growth
        ? response.total[2].total_growth
        : 0;
      total.total_ratio2 = response.total[2].total_ratio
        ? response.total[2].total_ratio
        : 0;

    }else{
      total.adjust_target =  0;
      total.adjust = 0;
      total.adjust_sale = 0;
      total.growth = 0;
      total.success = 0;
      total.total_ratio = 0;
      total.adjust_target1 = 0;
      total.adjust1 =  0;
      total.growth1 = 0;
      total.total_ratio1 = 0;
      total.adjust_target2 =0;
      total.adjust2 = 0;
      total.growth2 =  0;
      total.total_ratio2 = 0;
      total.check_desc = '';
    }
    Vue.set(state.row_total_detail, index, total);
  },


  setClearAllData: ({ commit }) => {
    commit("SET_SHOW_DETAIL", false);
    commit("SET_LOAD_TOTAL", false);
    commit("SET_LOAD_DETAIL", false);
    commit("SET_LOAD_DETAIL_HEAD", false);
    commit("SET_TOTAL_PAGE", 1);
    commit("SET_CLEAR_HEAD_DETAIL");
    commit("SET_CLEAR_DETAIL_PAGE");
    commit("SET_CLEAR_DETAIL_ITEMS");
    commit("SET_HEAD_INDEX", 0);
    commit("SET_COMMENTS_NULL");
    commit("SET_SUM_ITEMS", []);
    commit("SET_ROWADJUST", []);
    commit("SET_ROWADJUST_TOTAL", []);
    commit("SET_SUM_TOTAL", []);
    commit("SET_SUM_PREVMONTH", []);
    commit("SET_CLEAR_ADJUSMONTH_DETAIL");
    commit("SET_TEAM_SELECT_STEP2", []);
    // commit("SET_HEAD_DETAIL_MORE", []);
  },
  getSumMainService2: ({ commit, dispatch, state }, values) => {
    state.show_progress = true;
    dispatch("setClearAllData");
    values.total_page = 1;
    values.detail_page = 0;
    // values.view_status = state.authen_step;
    values.view_status = state.authen_step_check;
    // if (values.viewby == 1) commit("SET_SHOW_TOTAL", false);
    if (values.viewby == 1) commit("SET_SHOW_TOTAL", true);
    else commit("SET_SHOW_TOTAL", true);
    if (state.user_id) {
      values.user_id = state.user_id;
    } else {
      values.user_id = "";
    }
    var data = state.team_select.filter(team => {
      return team.checked == true;
    });
    let datas = data.map(team => team.id);
    commit("SET_TEAM_SELECT_STEP2", datas);
    Vue.localStorage.set('Back-to-Target', JSON.stringify(values));
    salePerformanceService
      .getSumMainService("/get-main-sum2", values)
      .then(response => {
        state.product_check = response.products_check
        // var dup = _.filter(state.keepAllData, item => {
        //   if (item.viewby == values.viewby) {
        //     return true;
        //   }
        // });
        // if (dup.length == 0) {
        //   state.keepAllData.push({
        //     viewby: values.viewby,
        //     data: _.cloneDeep(response.main)
        //   });
        // }

        let index = state.keepAllData.findIndex(item => item.viewby === values.viewby);
        if(index != -1){
          state.keepAllData[index].data = []
          state.keepAllData[index].data = _.cloneDeep(response.main);
        }else{
          state.keepAllData.push({
            viewby: values.viewby,
            data: _.cloneDeep(response.main)
          });
        }

        values.pro_select_sev = _.cloneDeep(response.products_check);
        values.org_select_sev = _.cloneDeep(response.sales_check);

        if (
          values.checkLoad == "changeDP" ||
          values.checkLoad == "userRequest" ||
          values.checkLoad == "defaultMonth" ||
          values.checkLoad == 'new'
        ) {
          commit("SET_EXPAND", "");
          values.index = 0;
          values.total_page = 1;
          values.insertType = "new";
          dispatch("getSumDetailService", values);
        }
        commit("SET_LOCK_PROCESS", response.lock_process);
        commit("SET_SUM_ITEMS", response.main);
        dispatch("setSumTotal", response.mainsum.data);
        dispatch("setSumRowTotal", response.mainsum.total);
        commit("SET_COMMENTS", response.comments);
        dispatch("setPrevMonth", response.prevmonth.data);
        dispatch("setPrevMonthRowTotal", response.prevmonth.total);
        dispatch("setRowAdjust", response.monthadjust.data);
        commit("SET_ROWADJUST_TOTAL", response.monthadjust.total);
        dispatch("calculateSummary");
      })
      .catch(error => {
        state.show_progress = false;
        console.log("/get-main-sum error");
      });
      // .catch(error => console.log("/get-main-sum error"));

  },
  async getMonthAdjust({ commit, dispatch, state }, values) {
    await salePerformanceService
      .getPrevMonth("/get-month-adjust", values.values, values.response)
      .then(response => {
        dispatch("setRowAdjust", response.data);
        commit("SET_ROWADJUST_TOTAL", response.total);
      })
      .catch(error => console.log("/get-month-adjust error"));
  },
  async getSumPrevMonth({ commit, dispatch, state }, values) {
    await salePerformanceService
      .getPrevMonth("/get-prev-month-sum", values.values, values.items)
      .then(response => {
        dispatch("setPrevMonth", response.data);
        dispatch("setPrevMonthRowTotal", response.total);
      })
      .catch(error => console.log("/get-prev-month-sum error"));
  },
  async getSumTotal({ commit, dispatch, state }, values) {
    await salePerformanceService
      .getTotalBy("/get-total-by-sum", values.values, values.response)
      .then(response => {
        dispatch("setSumTotal", response.data);
        dispatch("setSumRowTotal", response.total);
      })
      .catch(error => console.log("/get-total-by-sum error"));
  },
  async getMessageComment({ commit, dispatch, state }, values) {
    await salePerformanceService
      .getMessageComment("/get-message-comment", values)
      .then(response => {
        commit("SET_COMMENTS", response);
      })
      .catch(error => console.log("/get-message-comment error"));
  },
  setLoadMoreToFalse: ({ commit, dispatch }) => {
    commit("SET_LOAD_TOTAL", false);
    commit("SET_LOAD_DETAIL_HEAD", false);
    commit("SET_LOAD_DETAIL", false);
  },
  setPlusTotalPage: ({ commit, dispatch, state }) => {
    const page = state.total_page + 1;
    commit("SET_TOTAL_PAGE", page);
  },
  setShowDetail: ({ commit }, value) => {
    commit("SET_SHOW_DETAIL", value);
  },
  getHeadDetail: ({ commit, state }, values) => {
  
    commit("SET_LOADING", false);
    if (
      state.viewby_value == 1 &&
      values.organizes[state.head_index] != undefined
    ) {
      commit("SET_LOADING", true);
      const head = {
        id: values.organizes[state.head_index].id,
        name: values.organizes[state.head_index].first_name_en
      };
      commit("SET_HEAD_DETAIL_MORE", head);
    } else if (state.viewby_value == 2) {
      commit("SET_LOADING", true);
      if (values.product_checkall == false) {
        const head = {
          id: values.product_selected[state.head_index].id,
          name: values.product_selected[state.head_index].name,
        
        };

        commit("SET_HEAD_DETAIL_MORE", head);
      } else if (values.product_checkall == true) {
        values.item = state.head_index;
        salePerformanceService
          .getIDandNameOfProductORG("/get-product-org", values)
          .then(response => {
         
            if (response.id) {
              const head = { id: response.id, name: response.name  };

              commit("SET_HEAD_DETAIL_MORE", head);
            }
          })
          .catch(error => console.log("/get-product-org error"));
      }
    }
  },
  getSumDetailService_bk: ({ commit, state, dispatch }, values) => {
    state.show_progress = true;
    values.view_status = state.authen_step_check;
    if(values.checkLoad == "defaultMonth" || values.checkLoad == "userRequest") {
      let data = [];
      if(state.viewby_value == 1){
        data = values.org_select_sev;
      }else{
        data = values.pro_select_sev;
      }
      var index = values.index;
      if(index == 0){
        commit("SET_CLEAR_HEAD_DETAIL");
      }
      if (state.head_detail.length <= data.length) {
        var dup = _.filter(state.head_detail, item => {

          if (item.id == data[index].id) {
            return true;
          }
        });
        if (dup.length == 0) {
          commit("SET_HEAD_INDEX", index);
          const head = {
            id: data[index].id,
            name:
              state.viewby_value == 1
                ? data[index].first_name_en
                : data[index].name
          };

          commit("SET_HEAD_DETAIL_MORE", head);

          commit("SET_LOADING", true);
          if (state.detail_page[index]) {
            values.total_page = values.total_page + state.detail_page[index];
          }
          values.keyWhere = state.head_detail[index].id;
          const page = values.total_page;
          commit("SET_DETAIL_PAGE", { index, page });
          commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
          if (state.user_id) {
            values.user_id = state.user_id;
          } else {
            values.user_id = "";
          }
          salePerformanceService
            .getSumDetailService("/get-detail-sum", values)
            .then(response => {
              const insertType = values.insertType;

              commit("SET_DETAIL_ITEMS", {
                index,
                response: response.detail,
                insertType
              });
              // console.log("getSumDetailService -> setMonthAdjustDetail : -- if");
             
              dispatch("setMonthAdjustDetail", {
                data: response.monthadjust.data,
                index
              });

              dispatch("setMonthAdjustTotalDetail", {
                total: response.monthadjust.total,
                index
              });

              dispatch("setSumTotalDetail", {
                data: response.mainsum.data,
                index
              });

              dispatch("setSumRowTotalDetail", {
                total: response.mainsum.total,
                index
              });

              dispatch("setPrevMonthDetail", {
                data: response.prevmonth.data,
                index
              });

              dispatch("setPrevMonthRowTotalDetail", {
                total: response.prevmonth.total,
                index
              });

              commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });
              commit("SET_LOAD_DETAIL", false);
              commit("SET_LOAD_DETAIL_HEAD", true);
              index = index + 1;
              values.index = index;
              dispatch("setShowDetail", true);
              dispatch("getSumDetailService", values);

              commit("SET_LOADING", false);

            })
            .catch(error => {
              commit("SET_LOADING", false);
              state.show_progress = false;
              console.log("/get-detail-sum error");
            });
        }
      } else {
        state.show_progress = false;
      }
    } else {
      if (
        state.viewby_value == 1 ||
        (state.viewby_value == 2 && values.product_checkall == false)
      ) {
        let data =
          state.viewby_value == 1 ? values.organizes : values.pro_select_sev;
        var index = values.index;
        if(index == 0){
          commit("SET_CLEAR_HEAD_DETAIL");
        }
        if (state.head_detail.length <= data.length) {
          var dup = _.filter(state.head_detail, item => {
            if (item.id == data[index].id) {
              return true;
            }
          });
          if (dup.length == 0) {
            commit("SET_HEAD_INDEX", index);
            const head = {
              id: data[index].id,
              name:
                state.viewby_value == 1
                  ? data[index].first_name_en
                  : data[index].name
            };
            commit("SET_HEAD_DETAIL_MORE", head);

            commit("SET_LOADING", true);
            if (state.detail_page[index]) {
              values.total_page = values.total_page + state.detail_page[index];
            }
            values.keyWhere = state.head_detail[index].id;
            const page = values.total_page;
            commit("SET_DETAIL_PAGE", { index, page });
            commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
            if (state.user_id) {
              values.user_id = state.user_id;
            } else {
              values.user_id = "";
            }
            salePerformanceService
              .getSumDetailService("/get-detail-sum", values)
              .then(response => {
                const insertType = values.insertType;
                commit("SET_DETAIL_ITEMS", {
                  index,
                  response: response.detail,
                  insertType
                });

                // console.log("getSumDetailService -> setMonthAdjustDetail : -- else 1 ");
                dispatch("setMonthAdjustDetail", {
                  data: response.monthadjust.data,
                  index
                });

                dispatch("setMonthAdjustTotalDetail", {
                  total: response.monthadjust.total,
                  index
                });

                dispatch("setSumTotalDetail", {
                  data: response.mainsum.data,
                  index
                });

                dispatch("setSumRowTotalDetail", {
                  total: response.mainsum.total,
                  index
                });

                dispatch("setPrevMonthDetail", {
                  data: response.prevmonth.data,
                  index
                });

                dispatch("setPrevMonthRowTotalDetail", {
                  total: response.prevmonth.total,
                  index
                });

                commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });

                commit("SET_LOAD_DETAIL", false);
                commit("SET_LOAD_DETAIL_HEAD", true);
                index = index + 1;
                values.index = index;
                dispatch("setShowDetail", true);
                dispatch("getSumDetailService", values);

                commit("SET_LOADING", false);

              })
              .catch(error => {
                commit("SET_LOADING", false);
                state.show_progress = false;
                console.log("/get-detail-sum error");
              });
          }
        } else {
          state.show_progress = false;
        }
      } else if (state.viewby_value == 2 && values.product_checkall == true) {

        // var rs = _.filter(state.keepAllData, item => {
        //   if (item.viewby == 1) {
        //     return true;
        //   }
        // });
        // if (rs.length > 0 && state.head_detail.length <= rs[0].data.length) {
        //   var index = values.index;
        //   if(index == 0){
        //     commit("SET_CLEAR_HEAD_DETAIL");
        //   }
        //   values.item = index;
        //   commit("SET_HEAD_INDEX", index);
        //   var dup = _.filter(state.head_detail, item => {
        //     if (item.id == rs[0].data[index].id) {
        //       return true;
        //     }
        //   });
        //   if (dup.length == 0) {
        //     const head = {
        //       id: rs[0].data[index].id,
        //       name: rs[0].data[index].name
        //     };
        var index = values.index;
        if(index == 0){
          commit("SET_CLEAR_HEAD_DETAIL");
        }
        let data = values.pro_select_sev;
        if (state.head_detail.length <= data.length) {
          var dup = _.filter(state.head_detail, item => {
            if (item.id == data[index].id) {
              return true;
            }
          });
          if (dup.length == 0) {
            commit("SET_HEAD_INDEX", index);
            const head = {
              id: data[index].id,
              name:
                state.viewby_value == 1
                  ? data[index].first_name_en
                  : data[index].name
            };
            commit("SET_HEAD_DETAIL_MORE", head);
            commit("SET_LOADING", true);
            if (state.detail_page[index]) {
              values.total_page = values.total_page + state.detail_page[index];
            }
            values.keyWhere = state.head_detail[index].id;
            const page = values.total_page;
            commit("SET_DETAIL_PAGE", { index, page });
            commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
            if (state.user_id) {
              values.user_id = state.user_id;
            } else {
              values.user_id = "";
            }
            salePerformanceService
              .getSumDetailService("/get-detail-sum", values)
              .then(response => {
                const insertType = values.insertType;
                commit("SET_DETAIL_ITEMS", {
                  index,
                  response: response.detail,
                  insertType
                });
                // console.log("getSumDetailService -> setMonthAdjustDetail : -- else 2");
                dispatch("setMonthAdjustDetail", {
                  data: response.monthadjust.data,
                  index
                });

                dispatch("setMonthAdjustTotalDetail", {
                  total: response.monthadjust.total,
                  index
                });

                dispatch("setSumTotalDetail", {
                  data: response.mainsum.data,
                  index
                });

                dispatch("setSumRowTotalDetail", {
                  total: response.mainsum.total,
                  index
                });

                dispatch("setPrevMonthDetail", {
                  data: response.prevmonth.data,
                  index
                });

                dispatch("setPrevMonthRowTotalDetail", {
                  total: response.prevmonth.total,
                  index
                });

                commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });
                commit("SET_LOAD_DETAIL", false);
                commit("SET_LOAD_DETAIL_HEAD", true);
                index = index + 1;
                values.index = index;
                dispatch("setShowDetail", true);
                dispatch("getSumDetailService", values);

                commit("SET_LOADING", false);

              })
              .catch(error => {
                commit("SET_LOADING", false);
                state.show_progress = false;
                console.log("/get-detail-sum error");
              });
          }
        } else {
          state.show_progress = false;
        }
      }
    }
  },
  getSumDetailService: ({ commit, state, dispatch }, values) => {
    state.show_progress = true;
    values.view_status = state.authen_step_check;
    if(values.checkLoad == "defaultMonth" || values.checkLoad == "userRequest") {
      let data =
      state.viewby_value == 1 ? values.org_select_sev : values.pro_select_sev;
      var index = values.index;
      if(index == 0){
        commit("SET_CLEAR_HEAD_DETAIL");
      }
      if (state.head_detail.length <= data.length) {
        if(state.viewby_value ==1){
          var dup = _.filter(state.head_detail, item => {
            if (item.id == data[index].id) {
              return true;
            }
          });
          if (dup.length == 0) {
            commit("SET_HEAD_INDEX", index);
            const head = {
              id: data[index].id,
              name:
                state.viewby_value == 1
                  ? data[index].first_name_en
                  : data[index].name
            };
            commit("SET_HEAD_DETAIL_MORE", head);
            
            if (state.detail_page[index]) {
              values.total_page = values.total_page + state.detail_page[index];
            }
            values.keyWhere = state.head_detail[index].id;
            const page = values.total_page;
            commit("SET_DETAIL_PAGE", { index, page });
            commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
            if (state.user_id) {
              values.user_id = state.user_id;
            } else {
              values.user_id = "";
            }
            salePerformanceService
              .getSumDetailService("/get-detail-sum", values)
              .then(response => {
                const insertType = values.insertType;
                commit("SET_DETAIL_ITEMS", {
                  index,
                  response: response.detail,
                  insertType
                });
                // console.log("getSumDetailService -> setMonthAdjustDetail : -- else 2");

                
                dispatch("setMonthAdjustDetail", {
                  data: response.monthadjust.data,
                  index
                });

                dispatch("setMonthAdjustTotalDetail", {
                  total: response.monthadjust.total,
                  index
                });

                dispatch("setSumTotalDetail", {
                  data: response.mainsum.data,
                  index
                });

                dispatch("setSumRowTotalDetail", {
                  total: response.mainsum.total,
                  index
                });

                dispatch("setPrevMonthDetail", {
                  data: response.prevmonth.data,
                  index
                });

                dispatch("setPrevMonthRowTotalDetail", {
                  total: response.prevmonth.total,
                  index
                });

                commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });
                commit("SET_LOAD_DETAIL", false);
                commit("SET_LOAD_DETAIL_HEAD", true);
                index = index + 1;
                values.index = index;
                dispatch("setShowDetail", true);
                dispatch("getSumDetailService", values);

                commit("SET_LOADING", false);

              })
              .catch(error => {
                commit("SET_LOADING", false);
                state.show_progress = false;
                console.log("/get-detail-sum error");
              });
          
          } else {
            state.show_progress = false;
          }
        }else{
          let data_load = []; 
          let num_data = (data.length - state.head_detail.length);
          let i_for = num_data > 50 ? 50 : num_data;
          for(var i = 0 ;i < i_for ;i++){
            const in_data = state.head_detail.find(item => item.id == data[index].id);
            if (!in_data) {
              commit("SET_HEAD_INDEX", i);
              const head = {
                id: data[index].id,
                name:
                  state.viewby_value == 1
                    ? data[index].first_name_en
                    : data[index].name
              };
              commit("SET_HEAD_DETAIL_MORE", head);
              data_load.push(data[index].id);
              
              commit("SET_LOADING", true);
              if (state.detail_page[index]) {
                values.total_page = values.total_page + state.detail_page[index];
              }
              const page = values.total_page;
              commit("SET_DETAIL_PAGE", { index, page });
              commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
              // console.log(data_load);
              index = index+1;
            }else{
              state.show_progress = false;
            }
            // index = index+1;
          }

          if (data_load.length > 0 ) {
            values.keyWhere = "";
            values.keyArray = data_load;
            if (state.user_id) {
              values.user_id = state.user_id;
            } else {
              values.user_id = "";
            }
            salePerformanceService
              .getSumDetailService("/get-detail-sum", values)
              .then(response => {
                let res = [];
                for(var i = 0; i < response.length; i++){
                  let index = state.head_detail.findIndex(item => item.id === response[i].key_where);
                  res = response[i].response;
                 
                  const insertType = values.insertType;
                  commit("SET_DETAIL_ITEMS", {
                    index,
                    response: res.detail,
                    insertType
                  });

                  dispatch("setMonthAdjustDetail", {
                    data: res.monthadjust.data,
                    index
                  });
                  dispatch("setMonthAdjustTotalDetail", {
                    total: res.monthadjust.total,
                    index
                  });

                  dispatch("setSumTotalDetail", {
                    data: res.mainsum.data,
                    index
                  });

                  dispatch("setSumRowTotalDetail", {
                    total: res.mainsum.total,
                    index
                  });

                  dispatch("setPrevMonthDetail", {
                    data: res.prevmonth.data,
                    index
                  });

                  dispatch("setPrevMonthRowTotalDetail", {
                    total: res.prevmonth.total,
                    index
                  });

                  commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });
                }
                commit("SET_LOAD_DETAIL", false);
                commit("SET_LOAD_DETAIL_HEAD", true);
                index = state.head_detail.length;
                values.index = index;
                dispatch("setShowDetail", true);

                dispatch("getSumDetailService", values);
                
                commit("SET_LOADING", false);
              
   
              })
              .catch(error => {
                commit("SET_LOADING", false);
                state.show_progress = false;
                console.log("/get-detail-sum error");
              });
          
          } else {
            state.show_progress = false;
          }
        }
      }else {
        state.show_progress = false;
      }
    } else {
      commit("SET_LOADING", true);
      let data =
        state.viewby_value == 1 ? values.org_select_sev : values.pro_select_sev;
      var index = values.index;
      if(index == 0){
        commit("SET_CLEAR_HEAD_DETAIL");
      }
        // let data = values.pro_select_sev;
      if (state.head_detail.length <= data.length) {
          if(state.viewby_value ==1){
            var dup = _.filter(state.head_detail, item => {
              if (item.id == data[index].id) {
                return true;
              }
            });
            if (dup.length == 0) {
              commit("SET_HEAD_INDEX", index);
              const head = {
                id: data[index].id,
                name:
                  state.viewby_value == 1
                    ? data[index].first_name_en
                    : data[index].name
              };
              commit("SET_HEAD_DETAIL_MORE", head);
              
              if (state.detail_page[index]) {
                values.total_page = values.total_page + state.detail_page[index];
              }
              values.keyWhere = state.head_detail[index].id;
              const page = values.total_page;
              commit("SET_DETAIL_PAGE", { index, page });
              commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
              if (state.user_id) {
                values.user_id = state.user_id;
              } else {
                values.user_id = "";
              }
              salePerformanceService
                .getSumDetailService("/get-detail-sum", values)
                .then(response => {
               
                  const insertType = values.insertType;
                  commit("SET_DETAIL_ITEMS", {
                    index,
                    response: response.detail,
                    insertType
                  });
                  // console.log("getSumDetailService -> setMonthAdjustDetail : -- else 2");
                  dispatch("setMonthAdjustDetail", {
                    data: response.monthadjust.data,
                    index
                  });

                  dispatch("setMonthAdjustTotalDetail", {
                    total: response.monthadjust.total,
                    index
                  });

                  dispatch("setSumTotalDetail", {
                    data: response.mainsum.data,
                    index
                  });

                  dispatch("setSumRowTotalDetail", {
                    total: response.mainsum.total,
                    index
                  });

                  dispatch("setPrevMonthDetail", {
                    data: response.prevmonth.data,
                    index
                  });

                  dispatch("setPrevMonthRowTotalDetail", {
                    total: response.prevmonth.total,
                    index
                  });

                  commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });
                  commit("SET_LOAD_DETAIL", false);
                  commit("SET_LOAD_DETAIL_HEAD", true);
                  index = index + 1;
                  values.index = index;
                  dispatch("setShowDetail", true);
                  dispatch("getSumDetailService", values);

                  commit("SET_LOADING", false);

                })
                .catch(error => {
                  commit("SET_LOADING", false);
                  state.show_progress = false;
                  console.log("/get-detail-sum error");
                });
            
            } else {
              state.show_progress = false;
            }
          }else{
            let data_load = []; 
            let num_data = (data.length - state.head_detail.length);
            let i_for = num_data > 50 ? 50 : num_data;
            for(var i = 0 ;i < i_for ;i++){
              const in_data = state.head_detail.find(item => item.id == data[index].id);
              if (!in_data) {
                commit("SET_HEAD_INDEX", i);
                const head = {
                  id: data[index].id,
                  name:
                    state.viewby_value == 1
                      ? data[index].first_name_en
                      : data[index].name
                };
                commit("SET_HEAD_DETAIL_MORE", head);
                data_load.push(data[index].id);
                commit("SET_LOADING", true);
                if (state.detail_page[index]) {
                  values.total_page = values.total_page + state.detail_page[index];
                }
                const page = values.total_page;
                commit("SET_DETAIL_PAGE", { index, page });
                commit("SET_SHOW_TOTAL_DETAIL", { value: false, index });
                // console.log(data_load);
              }
              index = index+1;
            }
            
            if (data_load.length > 0) {
              values.keyWhere = "";
              values.keyArray = data_load;
              if (state.user_id) {
                values.user_id = state.user_id;
              } else {
                values.user_id = "";
              }

              salePerformanceService
                .getSumDetailService("/get-detail-sum", values)
                .then(response => {
                  let res = [];
                  for(var i = 0; i < response.length; i++){
                    let index = state.head_detail.findIndex(item => item.id === response[i].key_where);
                    res = response[i].response;
                
                    const insertType = values.insertType;
                    commit("SET_DETAIL_ITEMS", {
                      index,
                      response: res.detail,
                      insertType
                    });
                    // console.log("getSumDetailService -> setMonthAdjustDetail : -- else 2");

                    if(res.monthadjust.length == 0){
                      res.monthadjust.data = []
                      res.monthadjust.total = []
                    }

                    if(res.mainsum.length == 0){
                      res.mainsum.data = []
                      res.mainsum.total = []
                    }

                    // if(res.prevmonth.length == 0){
                    //   res.prevmonth.data = 0
                    //   res.prevmonth.total = 0
                    // }
                  
                    dispatch("setMonthAdjustDetail", {
                      data: res.monthadjust.data,
                      index
                    });

                    dispatch("setMonthAdjustTotalDetail", {
                      total: res.monthadjust.total,
                      index
                    });

                    dispatch("setSumTotalDetail", {
                      data: res.mainsum.data,
                      index
                    });

                    dispatch("setSumRowTotalDetail", {
                      total: res.mainsum.total,
                      index
                    });

                    dispatch("setPrevMonthDetail", {
                      data: res.prevmonth.data,
                      index
                    });

                    dispatch("setPrevMonthRowTotalDetail", {
                      total: res.prevmonth.total,
                      index
                    });

                    commit("SET_SHOW_TOTAL_DETAIL", { value: true, index });
                  }
                  commit("SET_LOAD_DETAIL", false);
                  commit("SET_LOAD_DETAIL_HEAD", true);
                  index = state.head_detail.length;
                  values.index = index;
                  dispatch("setShowDetail", true);
                  dispatch("getSumDetailService", values);

                  commit("SET_LOADING", false);

                })
                .catch(error => {
                  commit("SET_LOADING", false);
                  state.show_progress = false;
                  console.log(error,"/get-detail-sum error");
                });
            
            } else {
              state.show_progress = false;
            }
          }
        
      }else {
        state.show_progress = false;
      }
    }
  },
  async getDetailTotal({ commit, dispatch, state }, values) {
    const index = values.index;
    await salePerformanceService
      .getDetailTotalBy("/get-total-by-sum", values.values, values.response)
      .then(response => {
        dispatch("setSumTotalDetail", { data: response.data, index });
        dispatch("setSumRowTotalDetail", { total: response.total, index });
      })
      .catch(error => console.log("/get-total-by-sum error"));
  },
  async getDetailPrevMonth({ commit, dispatch, state }, values) {
    const index = values.index;
    await salePerformanceService
      .getDetailPrevMonth("/get-prev-month-sum", values.values, values.items)
      .then(response => {
        dispatch("setPrevMonthDetail", { data: response.data, index });
        dispatch("setPrevMonthRowTotalDetail", {
          total: response.total,
          index
        });
      })
      .catch(error => console.log("/get-detail-prev-month-sum error"));
  },
  async getDetailMonthAdjust({ commit, dispatch, state }, values) {
    const index = values.index;
    await salePerformanceService
      .getDetailPrevMonth("/get-month-adjust", values.values, values.response)
      .then(response => {
        // console.log("getDetailMonthAdjust setMonthAdjustDetail " );
        dispatch("setMonthAdjustDetail", { data: response.data, index });
        dispatch("setMonthAdjustTotalDetail", { total: response.total, index });
      })
      .catch(error => console.log("/get-detail-month-adjust error"));
  },
  setRowTotalRatio: ({ state }, values) => {
    const data = state.total_adjust_row[values.index];
    data.total_ratio = values.total;
    Vue.set(state.total_adjust_row, values.index, data);
  },
  setRowTotalAdjust: ({ state }, values) => {
    const data = state.total_adjust_row[values.index];
    data.total_adjust = values.total;
    Vue.set(state.total_adjust_row, values.index, data);
  },
  setRowTotalGrowth: ({ state }, values) => {
    const data = state.total_adjust_row[values.index];
    data.total_growth = values.total;
    Vue.set(state.total_adjust_row, values.index, data);
  },
  // setRowTotalRatio: ({ state }, values) => {
  //   const data = state.total_adjust_row[values.index];
  //   data.total_ratio = values.total;
  //   Vue.set(state.total_adjust_row, values.index, data);
  // },
  setRowTotalAdjustDetail: ({ state }, values) => {
    const data = state.row_total_detail[values.index];
    if (values.key == 0) {
      data.adjust = values.total;
    } else if (values.key == 1) {
      data.adjust1 = values.total;
    } else {
      data.adjust2 = values.total;
    }
    Vue.set(state.row_total_detail, values.index, data);
  },
  setRowTotalRatioDetail: ({ state }, values) => {
    const data = state.row_total_detail[values.index];
    if (values.key == 0) {
      data.total_ratio = values.total;
    } else if (values.key == 1) {
      data.total_ratio1 = values.total;
    } else {
      data.total_ratio2 = values.total;
    }
    Vue.set(state.row_total_detail, values.index, data);
  },
  setRowTotalGrowthDetail: ({ state }, values) => {
    const data = state.row_total_detail[values.index];
    if (values.key == 0) {
      data.growth = values.total;
    } else if (values.key == 1) {
      data.growth1 = values.total;
    } else {
      data.growth2 = values.total;
    }
    Vue.set(state.row_total_detail, values.index, data);
  },
  setAdjust: ({ state }, values) => {
    const adjust = state.row_adjust[values.indexDetail];
    if (values.index == 0) {
      adjust.adjust = values.adjust;
    } else if (values.index == 1) {
      adjust.adjust1 = values.adjust;
    } else {
      adjust.adjust2 = values.adjust;
    }
    Vue.set(state.row_adjust, values.indexDetail, adjust);
  },

  setAdjustByCode: ({ state }, values) => {
    // console.log("setAdjustByCode ",values)
    let indexDetail = state.row_adjust.findIndex(item => item.code === values.code);
    // console.log("indexDetail ",indexDetail)
    if(indexDetail != -1){
      const adjust = state.row_adjust[indexDetail];
      if (values.index == 0) {
        adjust.adjust = values.adjust;
      } else if (values.index == 1) {
        adjust.adjust1 = values.adjust;
      } else {
        adjust.adjust2 = values.adjust;
      }
      Vue.set(state.row_adjust, values.indexDetail, adjust);
    }
    
  },

  setAdjustByCheck: ({ state }, values) => {
    // console.log("setAdjustByCheck ",values)
    // console.log("sum_adjustmonth_detail",state.sum_adjustmonth_detail)
    let indexDetail = state.sum_adjustmonth_detail[values.table].findIndex(item => item.code === values.code);
    // console.log("indexDetail",indexDetail)
    if(indexDetail != -1){
      const adjust =
        state.sum_adjustmonth_detail[values.table][indexDetail];
      if (values.index == 0) {
        adjust.checked = values.status_check;
      }
    }
    // console.log("sum_adjustmonth_detail--> ",state.sum_adjustmonth_detail)
    
  },

  setAdjustDetail: ({ state }, values) => {
    
    let indexDetail = state.sum_adjustmonth_detail[values.table].findIndex(item => item.code === values.code);
    if(indexDetail != -1){
      const adjust =
        state.sum_adjustmonth_detail[values.table][indexDetail];
      if (values.index == 0) {
        adjust.adjust = values.adjust;
      } else if (values.index == 1) {
        adjust.adjust1 = values.adjust;
      } else {
        adjust.adjust2 = values.adjust;
      }
    }
  },
  setAdjustDB: ({ state }, values) => {
    for(var i= 0; i < (values.length-1); i++){
      const adjust = state.row_adjust[i];
      adjust.adjust_db = values[i].adjust;
      adjust.adjust_db1 = values[i].adjust1;
      adjust.adjust_db2 = values[i].adjust2;
      Vue.set(state.row_adjust,i, adjust);
    }
  },
  setRatio: ({ state }, values) => {
    const ratio = state.row_adjust[values.indexDetail];
    if ((values.index*1) == 0) {
      ratio.ratio = values.ratio_total;
    } else if ((values.index*1) == 1) {
      ratio.ratio1 = values.ratio_total;
    } else {
      ratio.ratio2 = values.ratio_total;
    }
    Vue.set(state.row_adjust, values.indexDetail, ratio);
  },
  setGrowth: ({ state }, values) => {
    const ratio = state.row_adjust[values.indexDetail];
    if (values.index == 0) {
      ratio.growth = values.growth;
    } else if (values.index == 1) {
      ratio.growth1 = values.growth;
    } else {
      ratio.growth2 = values.growth;
    }
    Vue.set(state.row_adjust, values.indexDetail, ratio);
  },
  setRatioDetail: ({ state }, values) => {
    let indexDetail = state.sum_adjustmonth_detail[values.table].findIndex(item => item.code === values.code);
    if(indexDetail != -1){
      const ratio =
        state.sum_adjustmonth_detail[values.table][indexDetail];
      if (values.index == 0) {
        ratio.ratio = values.ratio_total;
      } else if (values.index == 1) {
        ratio.ratio1 = values.ratio_total;
      } else {
        ratio.ratio2 = values.ratio_total;
      }
    }
  },

  setGrowthDetail: ({ state }, values) => {
    let indexDetail = state.sum_adjustmonth_detail[values.table].findIndex(item => item.code === values.code);
    if(indexDetail != -1){
      const ratio =
        state.sum_adjustmonth_detail[values.table][indexDetail];
      if (values.index == 0) {
        ratio.growth = values.growth;
      } else if (values.index == 1) {
        ratio.growth1 = values.growth;
      } else {
        ratio.growth2 = values.growth;
      }
    }
  },
  setCommentShow: ({ commit, state }, value) => {
    commit("SET_KEY_COMMENT", value);
    if (state.comments[value]) {
      commit("SET_COMMENT_SHOW", state.comments[value]);
    } else {
      commit("SET_COMMENT_SHOW", []);
    }
    //console.log(state.comments);
    //commentshow
    //commit('SET_KEY_COMMENT',value);
  },
  saveComment: ({ commit, state }, value) => {
    value.status_read = "N";
    value.code = state.keycomment;
    value.msg_to = state.user_id;
    commit("SET_COMMENT_APPEND", value);
    // value.status_read = "N";

    salePerformanceService
      .saveComment("/savecomment", value)
      .then(response => {
        if(response.data){
          commit("SET_COMMENT_UPDATE",response.data);
        }
      })
      .catch(error => console.log("/save comment error"));
  },
  savePerformance: ({ commit, state, dispatch }, value) => {
    state.show_progress = true;
    value.user_id = state.user_id;
    salePerformanceService
      .savePerformance("/saveperformance", value)
      .then(response => {
        if (value.type == "save") {
          dispatch("setAdjustDB", value.adjust);
          //const date = moment(response.senddate,'YYYY-MM-DD HH:mm:ss');
          //const header_step3 = {submitted:date.format('MMMM DD, YYYY at HH : mm'),userapprove:response.userapprove};
          //commit('SET_HEADER_STEP3',header_step3);
          if (response.header_status) {
            commit("SET_HEADER_STATUS", response.header_status);
          }
          commit("SET_AUTHEN_STEP", response.type);
          commit("SET_AUTHEN_STEP_CHECK", response.type);
          // if (response.comments) {
          //   commit("SET_COMMENTS", response.comments);
          // }
        } else if (value.type == "approve") {
          if (response.finish == false) {
            commit("SET_APPROVE_BUTTON", true);
            commit("SET_RECALL_BUTTON", false);
          } else {
            commit("SET_APPROVE_BUTTON", false);
            commit("SET_RECALL_BUTTON", false);
          }
        }
        if (response.comments) {
          commit("SET_COMMENTS", response.comments);
        }
        if (response.users) {
          commit("SET_USER_REQUEST", response.users[0]);
          if (response.users[0].type == "R" || response.users[0].type == "A") {
            commit("SET_APPROVE_BUTTON", false);
          }else if((response.users[0].type != "R" || response.users[0].type != "A") && response.finish == true){
            commit("SET_APPROVE_BUTTON", false);
          }else{
            commit("SET_APPROVE_BUTTON", true);
          }
          /* else{
            commit("SET_APPROVE_BUTTON", true);
          } */
          commit("SET_USERS_REQUEST", response.users);
          
          dispatch("setUserRequest", response.users[0]);
        } else {
          commit("SET_USER_REQUEST", {});
          commit("SET_USERS_REQUEST", []);
        }
        state.show_progress = false;
       /*  if(response.lock_process){
          commit("SET_LOCK_PROCESS", response.lock_process);
        } */
      })
      .catch(error => {
        state.show_progress = false;
        console.log("/save performance error")
      });
      // .catch(error => console.log("/save performance error"));
  },
  recallPerformance: ({ commit, state }, value) => {
    salePerformanceService
      .savePerformance("/recallperformance", value)
      .then(response => {
        commit("SET_STATUS_INPUT", false);
      })
      .catch(error => console.log("/recall performance error"));
  },
  setLoadStep3: ({ commit }, value) => {
    commit("SET_LOAD_STEP3", value);
  },
  setShowButtonSave: ({ commit }, value) => {
    commit("SET_SHOW_SAVE_BUTTON", value);
  },
  setShowExpand: ({ commit }, value) => {
    commit("SET_SHOW_EXPAND", value);
  },
  calculateSummary({ commit, state }) {
    const value = state.total_adjust_row;
    if (state.show_expand) {
      const total_adjust = (
        value[0].total_adjust * 1 +
        value[1].total_adjust * 1 +
        value[2].total_adjust * 1
      ).toFixed(0);
      const total_target = (
        value[0].total_target * 1 +
        value[1].total_target * 1 +
        value[2].total_target * 1
      ).toFixed(0);
      if (total_adjust != total_target) {
        commit("SET_SHOW_SUMMARY", true);
        commit("SET_SUMMARY_TOTAL_TARGET", (total_target * 1).toFixed(2));
        commit(
          "SET_SUMMARY_TOTAL_BALANCE",
          (total_adjust * 1).toFixed(2) - (total_target * 1).toFixed(2)
        );
      } else {
        commit("SET_SHOW_SUMMARY", false);
      }
    } else {
      if (
        (value[0].total_adjust * 1).toFixed(0) !=
        (value[0].total_target * 1).toFixed(0)
      ) {
        commit("SET_SHOW_SUMMARY", true);
        commit(
          "SET_SUMMARY_TOTAL_TARGET",
          (value[0].total_target * 1).toFixed(2)
        );
        commit(
          "SET_SUMMARY_TOTAL_BALANCE",
          (value[0].total_adjust * 1).toFixed(2) -
            (value[0].total_target * 1).toFixed(2)
        );
      } else {
        commit("SET_SHOW_SUMMARY", false);
      }
    }
  },
  setShowSummary: ({ commit }, value) => {
    commit("SET_SHOW_SUMMARY", value);
  },
  setAuthenStep: ({ commit }, value) => {
    commit("SET_AUTHEN_STEP", value);
  },
  setAuthenStepCheck: ({ commit }, value) => {
    commit("SET_AUTHEN_STEP_CHECK", value);
  },
  setUserRequest: ({ commit, dispatch }, value) => {
    commit("SET_USER_ID", value.emp_id);
    commit("SET_USER_REQUEST", value);
    commit("SET_CLEAR_TEAM_ORGANIZE");
    salePerformanceService
      .getDataOfUserRequest("/get-data-user-request", value.emp_id, value.type, value.status)
      .then(response => {
        commit("SELECTED_ORGANIZE", response.organize_type * 1);        
        //commit('SET_KEYWORD_PRODUCT',response.filter.product_keyword);
        commit("SET_ORGANIZE_SERVER", response.organizes);
        commit("SELECTED_PRODUCT", response.product_type * 1);
        commit("SET_PRODUCT_CHECKALL", response.products_checkall);

        //commit('SET_PRODUCT_SELECTED_FROM_SERVER',response.filter.products_check);
        commit("SET_CLEAR_PRODUCT_SELECTED");
        //commit('SET_PRODUCT_UNCHECK_FROM_SERVER',response.filter.products_uncheck);
        commit("SET_UNCHECK_PRODUCT_NULL");

        commit("SELECTED_TOTALTYPE", response.totaltype);

        commit("SELECTED_TOTALSECOND", response.totalsecond);

        commit("SELECTED_VIEWBY", response.viewby);

        let products_check = [];
        let organize_check = response.organizes;;
        let team_select = [];

        if(response.viewby == 1){
          products_check = JSON.parse(response.product_select);
        }else{
          products_check = response.products_check;
        }
        
        if(response.team_select){
          commit("SET_TEAM_ORGANIZE",JSON.parse(response.team_select));
          team_select = JSON.parse(response.team_select);
        }
        dispatch("getSumMainService2", {
          checkLoad: "userRequest",
          org_select_sev: _.cloneDeep(organize_check),
          pro_select_sev: _.cloneDeep(products_check),
          total_page: 1,
          product_keyword: "",
          organize_type: response.organize_type * 1,
          organizes: response.organizes,
          product_type: response.product_type * 1,
          products_uncheck: [],
          product_selected: [],
          product_checkall: true,
          viewby: response.viewby,
          totaltype: response.totaltype,
          totalfirst: response.totalfirst,
          totalsecond: response.totalsecond,
          monthfirst: response.monthfirst,
          monthsecond: response.monthsecond,
          team_select:  _.cloneDeep(team_select)
        });
      })
      .catch(error => {
        console.log("/get-main-sum-more error");
        commit("SET_LOADING", false);
      });
  },
  rejectSalePerformance: ({ commit, dispatch, state }) => {
    salePerformanceService
      .rejectPerformance("/rejectsaleperformance", state.user_id)
      .then(response => {
        if (response.users) {
          commit("SET_USER_REQUEST", response.users[0]);
          if (response.users[0].type == "R" || response.users[0].type == "A") {
            commit("SET_APPROVE_BUTTON", false);
          }else{
            if(response.users[0].status == 'reject' || response.users[0].status == 'approve'){
              if(response.users[0].sendto == Vue.localStorage.get("emp_id")){
                commit("SET_APPROVE_BUTTON", true);
              }else{
                commit("SET_APPROVE_BUTTON", false);
              }
              
            }else{
              commit("SET_APPROVE_BUTTON", true);
            }
          }
          commit("SET_USERS_REQUEST", response.users);
        } else {
          commit("SET_USER_REQUEST", {});
          commit("SET_USERS_REQUEST", []);
        }
        /* if(response.lock_process){
          commit("SET_LOCK_PROCESS", response.lock_process);
        } */

        dispatch("rejectResetView");
      })
      .catch(error => console.log("/recall performance error"));
  },
  rejectResetView: ({ commit, dispatch, state }) => {
    const users_request = state.users_request;
    // for(let x in users_request){
    //     if(users_request[x].emp_id == state.user_id){
    //         users_request.splice(x, 1);
    //         break;
    //     }
    // }
    if (users_request.length > 0) {
      // commit('SET_USERS_REQUEST',users_request);
      commit('SET_USER_REQUEST',users_request[0]);
      dispatch("setUserRequest", users_request[0]);
    } else {
      dispatch("setClearAllData");
      commit("SET_USERS_REQUEST", []);
      commit("SET_AUTHEN_STEP", "");
      commit("SET_AUTHEN_STEP_CHECK", "");
    }
  },
  recallApprove: ({ commit, dispatch, state }, value) => {
    for (let x in state.users_request) {
      if (state.users_request[x].emp_id == value.user_id) {
        const user = state.users_request[x];
        user.type = value.status;
        Vue.set(state.users_request, x, user);
        break;
      }
    }
  },
  setRecallButton: ({ commit }, value) => {
    commit("SET_RECALL_BUTTON", value);
  },
  setBackToFirst: ({ commit }, value) => {
    commit("SET_BACKTOFIRST", value);
  },
  deleteCompleteData: () => {
    salePerformanceService
      .deletePerformance("/deleteperformance")
      .then(response => {
        // console.log("delete success");
      });
  },
  updateComment: ({ commit, state }, value) => {
    value.code = state.keycomment;
    value.msg_to = state.user_id;
    salePerformanceService
      .updateComment("/updatecomment-performance", value)
      .then(response => {
        if(response.data){
          commit("SET_COMMENT_UPDATE",response.data);
        }
        
    })
      .catch(error => console.log("/save comment error"));
  },
  getAreaPerformance: ({ commit, state }, value) => {
    salePerformanceService
      .getChannel("/get-area-performance")
      .then(response => {
        // console.log(response);
        // const user_id = rootState.step2.user_id;
        // if (user_id == "")
        
      })
      .catch(error => console.log("error"));
  },
  setLoadSelectTeamStep2: ({ commit, dispatch }, value) => {
    let num = 0;
    let find_data ="";
    // if(value.team_select.length != state.team_select.length){
    if(state.team_select_step2.length == value.team_select.length){
      for (let i = 0; i < state.team_select_step2.length; i++) {
        find_data = value.team_select.find(item => item.id === state.team_select_step2[i]);
        if(find_data == undefined){
          num++;
        }
      }
      if(num > 0){
        dispatch("getSumMainService2", value);
      }

    }else{
      dispatch("getSumMainService2", value);
    }
  },
  getItemalance: ({ commit, dispatch }, value) => {
    state.display_balance = true
    salePerformanceService
      .getItemalance(value)
      .then(response => {

          let total_sum=0
          let total_dnss=0
          let total_dnmt=0

          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            element.total =  Number(element.dnmt) +Number(element.dnss) 
            
            total_sum += Number(element.total)
            total_dnss += Number(element.dnss)
            total_dnmt += Number(element.dnmt)
           
          }

          if(total_sum == 0 ){ 
            state.balance_total[0].sum_total = total_sum
            state.balance_total[0].sum_per_total = 0
          }else {
            state.balance_total[0].sum_total = total_sum
            state.balance_total[0].sum_per_total = (total_sum/total_sum)*100
          } 
          if(total_dnss == 0 ){
            state.balance_total[0].sum_dnss = total_dnss
            state.balance_total[0].sum_per_dnss = 0
          }else{
            state.balance_total[0].sum_dnss = total_dnss
            state.balance_total[0].sum_per_dnss = (total_dnss/total_sum)*100
          }
          if(total_dnmt == 0){
            state.balance_total[0].sum_dnmt = total_dnmt
            state.balance_total[0].sum_per_dnmt = 0
          }else{
             state.balance_total[0].sum_dnmt = total_dnmt
             state.balance_total[0].sum_per_dnmt = (total_dnmt/total_sum)*100
          }
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if(element.total == 0){
            element.per_total = 0
          }else {
            element.per_total = Number((element.total / total_sum)*100)
          }

          if(element.dnss  === '0'){
            element.per_dnss = 0
          }else {
            element.per_dnss = Number((element.dnss / total_sum)*100)
          }

          if(element.dnmt === '0'){
            element.per_dnmt = 0
          }else {
            element.per_dnmt = Number((element.dnmt / total_sum)*100)
          }

         
        }
        state.balance_detail = response.data
        state.display_balance = false
        // console.log(response.data);
      });
  },
 
  
  
 
};

const getters = {
  viewby: state => {
    return state.viewby;
  },
  getViewByValue: state => {
    let value = "";
    for (let x in state.viewby) {
      if (state.viewby[x].id == state.viewby_value) {
        value = state.viewby[x].name;
        break;
      }
    }
    return value;
  },
  getViewById: state => {
    return state.viewby_value;
  },
  getArrYear: state => {
    return state.arrYear;
  },
  getArrMonth: state => {
    return state.arrMonth;
  },
  getArrQuater: state => {
    return state.arrQuater;
  },
  getTotalType: state => {
    return state.total_type;
  },
  getTotalFirst: state => {
    return state.total_first;
  },
  getTotalSecond: state => {
    return state.total_second;
  },
  getMonthFirst: state => {
    return state.month_first;
  },
  getMonthSecond: state => {
    return state.month_second;
  },
  getTotalLabel: state => {
    let first, second;
    first = state.arrYear.find(o => o.id === state.total_first);
    if (state.total_type == 1) {
      second = state.arrQuater.find(o => o.id === state.total_second);
      return (
        state.total_label[state.total_type * 1 - 1] +
        " " +
        second.value +
        " " +
        first.value
      );
    } else if (state.total_type == 2) {
      return state.total_label[state.total_type * 1 - 1] + " " + first.value;
    } else if (state.total_type == 3) {
      second = state.arrMonth.find(o => o.id === state.total_second);
      return (
        state.total_label[state.total_type * 1 - 1] +
        " " +
        second.value +
        " " +
        first.value
      );
    } else if (state.total_type == 4) {
      second = state.arrQuater.find(o => o.id === state.total_second);
      return (
        state.total_label[state.total_type * 1 - 1] +
        " " +
        second.value +
        " " +
        first.value
      );
    } else if (state.total_type == 5) {
      return state.total_label[state.total_type * 1 - 1] + " " + first.value;
    }
  },
  getMonthLabel: state => {
    let first, second;
    first = state.arrYear.find(o => o.id == state.month_first);
    second = state.arrMonth.find(o => o.id == state.month_second);
    return second.value + " " + first.value;
  },
  getMonthAdjust: state => {
    const day = [];
    if (state.month_year_start == "") {
      day[0] = moment().format("MMM YYYY").toUpperCase();
      day[1] = moment().add(1, "months").format("MMM YYYY").toUpperCase();
      day[2] = moment().add(2, "months").format("MMM YYYY").toUpperCase();
    } else {
      const date = moment(state.month_year_start + "-01", "MM-YYYY-DD");
      day[0] = date.add(0, "months").format("MMM YYYY").toUpperCase();
      day[1] = date.add(1, "months").format("MMM YYYY").toUpperCase();
      day[2] = date.add(1, "months").format("MMM YYYY").toUpperCase();
    }
    state.month_adjust = day;
    return state.month_adjust;
  },
  getSumItems: state => {
    return state.items;
  },
  getSumTotal: state => {
    return state.sum_total;
  },
  getSumTotalDetail: state => index => {
    if (state.sum_total_detail[index] == undefined)
      state.sum_total_detail[index] = new Array();
    return state.sum_total_detail[index];
  },
  getSumPrevMonth: state => {
    return state.sum_prevmonth;
  },
  getSumPrevMonthDetail: state => index => {
    if (state.sum_prevmonth_detail[index] == undefined)
      state.sum_prevmonth_detail[index] = new Array();
    return state.sum_prevmonth_detail[index];
  },
  getAdjustMonthDetail: state => index => {
    if (state.sum_adjustmonth_detail[index] == undefined)
      state.sum_adjustmonth_detail[index] = new Array(); 
        // console.log('max_value',state.sum_adjustmonth_detail[index].max_value)
      // for (let index = 0; index < state.sum_adjustmonth_detail[index].length; index++) {
      //   const element = state.sum_adjustmonth_detail[index][index];

      //   if(element.adjust<element.max_value) {
      //     state.head_detail[index].status = 'true'
      //     console.log( state.head_detail[index].name)
         
      //   }
      // }
    return state.sum_adjustmonth_detail[index];
  },
  getAdjustMonthDetailAll: state => {
    return state.sum_adjustmonth_detail;
  },
  getShowTotal: state => {
    return state.show_total;
  },
  getShowTotalDetail: state => index => {
    if (state.show_total_detail[index] == undefined)
      state.show_total_detail[index] = false;
    return state.show_total_detail[index];
  },
  getRowTotal: state => {
    return state.row_total;
  },
  getRowTotalDetail: state => index => {
    if (state.row_total_detail[index] == undefined)
      state.row_total_detail[index] = {};
    return state.row_total_detail[index];
  },
  getRowTotalDetailAll: state => {
    return state.row_total_detail;
  },
  getLoadTotal: state => {
    return state.load_total;
  },
  getLoadDetail: state => {
    return state.load_detail;
  },
  getLoadDetailHead: state => {
    return state.load_detail_head;
  },
  getTotalPage: state => {
    return state.total_page;
  },
  getShowLoading: state => {
    return state.loading;
  },
  getShowDetail: state => {
    return state.show_detail;
  },
  getHeadDetail: state => {
    return state.head_detail; 
  },
  getHeadDetailByIndex: state => index => {
      Object.assign(state.head_detail[index], {tt: state.product_check[index].total});
      // state.head_detail ={total: state.product_check[index].total }
    return state.head_detail[index];
  },
  setHeadDetailByIndexStatus: state => index   =>{
     console.log( ' ---> ',state.sum_adjustmonth_detail[index.table])
    const status_box = state.sum_adjustmonth_detail[index.table].find(o => o.adjust < Number(o.max_value)); //check_statusDetail
    if(status_box != undefined){
      state.head_detail[index.table].status = 'true'
    }else {
      state.head_detail[index.table].status = 'false'
    }
  },
  
  getDetailDataByIndex: state => index => {
    // console.log(state.items_detail[index])
    return state.items_detail[index];
  },
  getItemsDetail: state => {
    return state.items_detail;
  },
  getHeadIndex: state => {
    return state.head_index;
  },
  getRowTotalAdjust: state => {
    return state.total_adjust_row;
  },
  getRowAdjust: state => {
    return state.row_adjust;
  },
  getComments: state => {
    return state.comments;
  },
  getComment: state => {
    /*if(!state.comments[state.keycomment]){
            state.comments[state.keycomment] = [];
            state.comments[state.keycomment]['all'] = [];
            state.comments[state.keycomment]['now'] = [];
            state.comments[state.keycomment]['before'] = [];
        }*/
    return state.commentshow;
  },
  getLoadStep3: state => {
    return state.load_step3;
  },
  getShowButtonSave: state => {
    return state.show_save_button;
  },
  getShowSummary: state => {
    return state.show_summary;
  },
  getSummaryTotalTarget: state => {
    return state.summary_total_target;
  },
  getSummaryTotalBalance: state => {
    return state.summary_total_balance;
  },
  getCheckAuthenStep: state => {
    return state.authen_step;
  },
  getUsersRequest: state => {
    return state.users_request;
  },
  getUserRequest: state => {
    return state.user_request;
  },
  getUserIdRequest: state => {
    return state.user_id;
  },
  getHeaderStatus: state => {
    return state.header_status;
  },
  getRecallButton: state => {
    return state.recall_button;
  },
  getBacktoFirstStep: state => {
    return state.backtofirst;
  },
  getApproveButton: state => {
    return state.approve_button;
  },
  keepExpand: state => {
    return state.keepExpand;
  },
  status_input: state => {
    return state.status_input;
  },
  show_progress: state => {
    return state.show_progress;
  },
  getCheckLockProcess: state => {
    return state.lock_process;
  },
  getCheckAuthenStepCheck: state => {
    return state.authen_step_check;
  },
  getTeamOrganize:  state => {
    return state.team_select;
  },
  getTeamByValue: state => {
    let value = "";
    for (let x in state.team_select) {
      if (state.team_select[x].id == state.value_team) {
        value = state.team_select[x].first_name_en;
        break;
      }
    }
    return value;
  },
  getTeamSelect: state => {
    var data = state.team_select.filter(team => {
      return team.checked == true;
    });
    return data;
  },
  // getTeamALL: state => {
  //   return state.team_select;
  // },
  getTeamSelectStep2: state => {
    return state.team_select_step2;
  },
  balance_detail:state => {
    return state.balance_detail
  },
  display_balance:state =>{
    return state.display_balance
  },
  load_hover:state =>{
    return state.load_hover
  },
  balance_total:state =>{
    return state.balance_total
  },
  sum_hover:state =>{
    return state.sum_hover
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
