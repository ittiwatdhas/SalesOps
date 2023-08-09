// import salePerformanceService from '../../services/performance/salePerformance'
import Vue from "vue";
import moment from "moment";
import salePlanService from "../../services/planning/salesplan";

const state = {
  sp_data: {
    total: { sum_quota: 0, sum_achieved: 0, sum_progress: 0 },
    by_area: [],
    by_cus: []
  },
  sp_data_temp: [],
  sp_arr_block3: {
    incentive: "630,381",
    descript: "Incentive"
  },
  sp_date_selected: {},
  sp_popup_date_selected: {},
  sp_promotion_cte: [
    {
      id: 1,
      type: "GLOBAL",
      promo_name: "CG 20122 - Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 2,
      type: "GLOBAL",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 3,
      type: "GLOBAL",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 4,
      type: "GLOBAL",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 5,
      type: "PRODUCT RECOMMENDATION",
      promo_name: "There is a 92% match for CG 30110 for this customer",
      selected: false
    },
    {
      id: 6,
      type: "PRODUCT RECOMMENDATION",
      promo_name: "There is a 92% match for CG 30110 for this customer",
      selected: false
    },
    {
      id: 7,
      type: "PRODUCT RECOMMENDATION",
      promo_name: "There is a 92% match for CG 30110 for this customer",
      selected: false
    },
    {
      id: 8,
      type: "PROMOTION SET",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 9,
      type: "PROMOTION SET",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 10,
      type: "PROMOTION SET",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    }
  ],
  sp_promotion_sbm: [
    {
      id: 1,
      type: "GLOBAL",
      promo_name: "CG 20122 - Buy more than 200 get 5% off",
      selected: true
    },
    {
      id: 2,
      type: "GLOBAL",
      promo_name: "Buy more than 200 get 5% off",
      selected: true
    },
    {
      id: 3,
      type: "GLOBAL",
      promo_name: "Buy more than 200 get 5% off",
      selected: true
    },
    {
      id: 4,
      type: "GLOBAL",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 5,
      type: "PRODUCT RECOMMENDATION",
      promo_name: "There is a 92% match for CG 30110 for this customer",
      selected: false
    },
    {
      id: 6,
      type: "PRODUCT RECOMMENDATION",
      promo_name: "There is a 92% match for CG 30110 for this customer",
      selected: false
    },
    {
      id: 7,
      type: "PRODUCT RECOMMENDATION",
      promo_name: "There is a 92% match for CG 30110 for this customer",
      selected: false
    },
    {
      id: 8,
      type: "PROMOTION SET",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 9,
      type: "PROMOTION SET",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    },
    {
      id: 10,
      type: "PROMOTION SET",
      promo_name: "Buy more than 200 get 5% off",
      selected: false
    }
  ],
  sp_arr_sales: [],
  sp_arr_sales_selected: [],
  sp_master_cg: [],
  sp_sales_achieved: 0,
  sp_cust_head: {
    cust_code: "",
    cust_name: "",
    month: "",
    year: "",
    full: [],
    rowIndex: "",
    indexDetail: ""
  },
  sp_cust_selected: {
    target: 0,
    achieved: 0,
    percent: 0
  },
  sp_sales_total: {
    sum_achieved: 0,
    sum_progress: 0,
    sum_quota: 0,
    sum_incentive: 0,
    sum_percent: 0,
    max_pass_percent: 0
  },
  sp_check_item_master: [],
  sp_check_itemstatus_master: false,
  sp_check_stock: 0,
  sp_spinner_loading: false,
  filter_DP: "all",
  sp_sthis: {
    temp: "",
    mode: false
  },
  sp_select_prov: [],
  sp_create_order: [],
  sp_create_order_go: [],
  sp_move_myorder: "",
  sp_check_color_btn: true,
  sp_disc_list: [
    { range: "0 - 199", low: 0, high: 199, percent: 0 },
    { range: "200 - 499", low: 200, high: 499, percent: 3 },
    { range: "500 - 999", low: 500, high: 999, percent: 5 },
    { range: "1000 - 1499", low: 1000, high: 1499, percent: 7 },
    { range: "> 1500", low: 1500, high: 9999999, percent: 12 }
  ]
};
const mutations = {
  SET_SP_ORDER_SALES(state, value) {
    state.sp_arr_sales = value;
  },
  SET_SP_ORDER_SALES_SELECTED(state, value) {
    state.sp_arr_sales_selected = value;
  },
  SET_SP_DATA(state, value) {
    state.sp_data = value;
  },
  SET_SP_DATA_TEMP(state, value) {
    state.sp_data_temp = value;
  },
  SET_SP_MASTER_CG(state, value) {
    state.sp_master_cg = value;
  },
  SET_SP_SALES_ACHIEVED(state, value) {
    state.sp_sales_achieved = value;
  },
  SET_SP_CUST_SELECTED(state, value) {
    state.sp_cust_selected = value;
  },
  SET_SP_CHECK_ITEM_MASTER(state, value) {
    state.sp_check_item_master = value;
  },
  SET_SP_CHECK_STOCK(state, value) {
    state.sp_check_stock = value;
  },
  SET_SP_CREATE_ORDER(state, value) {
    state.sp_create_order = value;
  },
  SET_SP_CREATE_ORDER_GO(state, value) {
    state.sp_create_order_go = value;
  },
  SET_SP_MOVE_MYORDER(state, value) {
    state.sp_move_myorder = value;
  },
  SET_SP_CHECK_COLOR_BTN(state, value) {
    state.sp_check_color_btn = value;
  },
  setFilterDP(state, value) {
    state.filter_DP = value;
  }
};

const actions = {
  getSalePlan: ({ commit, state }, value) => {
    state.sp_spinner_loading = true;
    let obj = {
      total: { sum_quota: 0, sum_achieved: 0, sum_progress: 0 },
      by_area: [],
      by_cus: []
    };
    state.sp_select_prov = [];
    commit("SET_SP_DATA", obj);
    salePlanService
      .getSalePlan(value.year, value.month)
      .then(response => {
        state.sp_spinner_loading = false;
        state.sp_sales_total = response.total;
        if (response.by_cus.length > 0) {
          // state.sp_select_prov.push(response.by_cus[0].prov_code)
        }
        commit("SET_SP_DATA", response);
      })
      .catch(error => console.error("error => getSalePlan"));
  },
  saveTargetPerCust: ({ commit, state }, values) => {
    salePlanService
      .saveTargetPerCust(values)
      .then(response => {
        let theArray = state.sp_data.by_cus;
        theArray[values.rowIndex].sum_sel_target = response.sum_sel_target;
        theArray[values.rowIndex].sum_checked = response.sum_checked;
        theArray[values.rowIndex].percent = response.percent;
      })
      .catch(error => console.error("error => saveTargetPerCust"));
  },
  bookmark: ({ dispatch, commit }, values) => {
    // commit("SET_SP_ORDER_SALES", []);
    // state.sp_spinner_loading = true;
    salePlanService
      .saveBookmark(values)
      .then(response => {
        // dispatch("getSalePlanByPro", {
        //   year: values.year,
        //   month: values.month,
        //   cust_code: values.cust_code,
        //   select: values.select
        // });
      })
      .catch(error => console.error("error => bookmark"));
  },
  getSalePlanByPro: ({ commit, state }, values) => {
    commit("SET_SP_ORDER_SALES", []);
    state.sp_spinner_loading = true;
    salePlanService
      .getSalePlanByPro(values)
      .then(response => {
        state.sp_spinner_loading = false;
        commit("SET_SP_CHECK_COLOR_BTN", false);
        commit("SET_SP_ORDER_SALES", response.by_pro);
        if (response.by_pro.length == 0) {
          commit("SET_SP_CHECK_COLOR_BTN", false);
        }
        commit("SET_SP_CUST_SELECTED", response.sum_bypro);
        state.sp_check_itemstatus_master = true;
        if (state.sp_sthis.mode) {
          state.sp_sthis.temp.setExpand(null);
          state.sp_sthis.mode = false;
        }
      })
      .catch(error => console.error("error => getSalePlan"));
  },
  saveOrderQtyOfItem: ({ commit, state }, values) => {
    // console.log("saveOrderQtyOfItem 1");
    salePlanService
      .saveOrderQtyOfItem(values)
      .then(response => {
        // console.log("saveOrderQtyOfItem 2");
      })
      .catch(error => console.error("error => saveOrderQtyOfItem"));
  },
  updateOrderQtyOfItem: ({ commit, state }, values) => {
    salePlanService
      .updateOrderQtyOfItem(values)
      .then(response => {
        // console.log("saveOrderQtyOfItem 2");
      })
      .catch(error => console.error("error => saveOrderQtyOfItem"));
  },
  searchItemsProduct: ({ commit, state }, values) => {
    salePlanService
      .searchItemsProduct(values)
      .then(response => {
        commit("SET_SP_CHECK_ITEM_MASTER", response.data);
        state.sp_check_itemstatus_master = response.status_data;
      })
      .catch(error => console.error("error => searchItemsProduct"));
  },
  autoComplete: ({ commit, state }, values) => {
    salePlanService
      .autoComplete(values)
      .then(response => {
        commit("SET_SP_MASTER_CG", response);
      })
      .catch(error => console.error("error => autoComplete"));
  },
  getStock: ({ commit, state }, values) => {
    state.sp_check_stock = 0;
    salePlanService
      .getStock(values)
      .then(response => {
        commit("SET_SP_CHECK_STOCK", response);
      })
      .catch(error => console.error("error => autoComplete"));
  },
  addItem: ({ commit, state, dispatch }, values) => {
    salePlanService
      .addItem(values)
      .then(response => {
        dispatch("getSalePlanByPro", {
          year: state.sp_date_selected.year,
          month: state.sp_date_selected.month_id,
          cust_code: state.sp_cust_head.cust_code,
          select: values.select
        });
      })
      .catch(error => console.error("error => addItem"));
  }
};

const getters = {
  sp_arr_block3: state => {
    return state.sp_arr_block3;
  },
  sp_date_selected: state => {
    return state.sp_date_selected;
  },
  sp_promotion_cte: state => {
    return state.sp_promotion_cte;
  },
  sp_promotion_sbm: state => {
    return state.sp_promotion_sbm;
  },
  sp_arr_sales: state => {
    return state.sp_arr_sales;
  },
  sp_popup_date_selected: state => {
    return state.sp_popup_date_selected;
  },
  sp_arr_sales_selected: state => {
    return state.sp_arr_sales_selected;
  },
  sp_data: state => {
    return state.sp_data;
  },
  sp_data_temp: state => {
    return state.sp_data_temp;
  },
  sp_master_cg: state => {
    return state.sp_master_cg;
  },
  sp_sales_achieved: state => {
    return state.sp_sales_achieved;
  },
  sp_cust_selected: state => {
    return state.sp_cust_selected;
  },
  sp_sales_total: state => {
    return state.sp_sales_total;
  },
  sp_cust_head: state => {
    return state.sp_cust_head;
  },
  sp_check_item_master: state => {
    return state.sp_check_item_master;
  },
  sp_check_itemstatus_master: state => {
    return state.sp_check_itemstatus_master;
  },
  sp_check_stock: state => {
    return state.sp_check_stock;
  },
  sp_spinner_loading: state => {
    return state.sp_spinner_loading;
  },
  sp_sthis: state => {
    return state.sp_sthis;
  },
  sp_select_prov: state => {
    return state.sp_select_prov;
  },
  sp_create_order: state => {
    return state.sp_create_order;
  },
  sp_move_myorder: state => {
    return state.sp_move_myorder;
  },
  sp_create_order_go: state => {
    return state.sp_create_order_go;
  },
  sp_check_color_btn: state => {
    return state.sp_check_color_btn;
  },
  sp_disc_list: state => {
    return state.sp_disc_list;
  },
  filter_DP: state => {
    return state.filter_DP;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
